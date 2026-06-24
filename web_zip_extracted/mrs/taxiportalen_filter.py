import argparse
import csv
import os
import re
import sys
from html import unescape
from html.parser import HTMLParser
from typing import List
from urllib.parse import urlencode
from urllib.request import HTTPCookieProcessor, Request, build_opener


LOGIN_URL = "https://www.taxiportalen.no/logon.aspx"
TRIP_URL = "https://www.taxiportalen.no/TripViewCentral.aspx"
ADD_CAR_URL = "https://www.taxiportalen.no/addcar.aspx"
DEFAULT_KEYWORDS = ("rullestol", "storbil", "maxi")
EXCLUDED_KEYWORDS = ("skulerute",)
HEADERS = [
    "rekvirent",
    "taxi",
    "status",
    "utrop",
    "oppmote",
    "behandlingstid",
    "fra",
    "til",
    "navn",
    "melding_til_bil",
    "ref",
    "altturid",
    "tlf",
    "egenskap",
    "internnr",
]
DISPLAY_FIELDS = [
    "rekvirent",
    "taxi",
    "status",
    "utrop",
    "oppmote",
    "fra",
    "til",
    "navn",
    "melding_til_bil",
    "tlf",
    "egenskap",
]


class TripTableParser(HTMLParser):
    def __init__(self) -> None:
        super().__init__()
        self.in_trip_table = False
        self.in_row = False
        self.in_cell = False
        self.current_cell: List[str] = []
        self.current_row: List[str] = []
        self.rows: List[List[str]] = []

    def handle_starttag(self, tag: str, attrs) -> None:
        attrs_dict = dict(attrs)
        if tag == "table" and attrs_dict.get("id") == "gwTrip":
            self.in_trip_table = True
        elif self.in_trip_table and tag == "tr":
            self.in_row = True
            self.current_row = []
        elif self.in_row and tag in {"td", "th"}:
            self.in_cell = True
            self.current_cell = []
        elif self.in_cell and tag == "br":
            self.current_cell.append("\n")

    def handle_endtag(self, tag: str) -> None:
        if self.in_cell and tag in {"td", "th"}:
            text = unescape("".join(self.current_cell))
            text = re.sub(r"\s+", " ", text.replace("\xa0", " ")).strip()
            self.current_row.append(text)
            self.in_cell = False
        elif self.in_row and tag == "tr":
            if self.current_row:
                self.rows.append(self.current_row)
            self.in_row = False
        elif self.in_trip_table and tag == "table":
            self.in_trip_table = False

    def handle_data(self, data: str) -> None:
        if self.in_cell:
            self.current_cell.append(data)


def extract_hidden_fields(html: str) -> dict[str, str]:
    fields = {}
    for name in ("__VIEWSTATE", "__VIEWSTATEGENERATOR", "__EVENTVALIDATION"):
        match = re.search(
            rf'id="{re.escape(name)}"\s+value="([^"]*)"',
            html,
            re.IGNORECASE,
        )
        if not match:
            raise RuntimeError(f"Fant ikke skjult felt: {name}")
        fields[name] = match.group(1)
    fields["__EVENTTARGET"] = ""
    fields["__EVENTARGUMENT"] = ""
    return fields


def parse_input_value(html: str, name: str) -> str:
    match = re.search(rf'name="{re.escape(name)}"[^>]*value="([^"]*)"', html, re.IGNORECASE)
    return unescape(match.group(1)).strip() if match else ""


def fetch_text(opener, url: str, data: dict[str, str] | None = None) -> str:
    if data is None:
        request = Request(url, headers={"User-Agent": "Mozilla/5.0"})
    else:
        body = urlencode(data).encode("utf-8")
        request = Request(
            url,
            data=body,
            headers={
                "Content-Type": "application/x-www-form-urlencoded",
                "User-Agent": "Mozilla/5.0",
            },
        )
    with opener.open(request, timeout=30) as response:
        return response.read().decode("utf-8", errors="replace")


def create_authenticated_opener(username: str, password: str):
    opener = build_opener(HTTPCookieProcessor())
    login_page = fetch_text(opener, LOGIN_URL)
    form = extract_hidden_fields(login_page)
    form.update(
        {
            "txtUserName": username,
            "txtUserPass": password,
            "btnLogon": "Logg på",
        }
    )
    fetch_text(opener, LOGIN_URL, form)
    return opener


def login_and_fetch(username: str, password: str) -> str:
    opener = create_authenticated_opener(username, password)
    trip_page = fetch_text(opener, TRIP_URL)
    if "gwTrip" not in trip_page:
        raise RuntimeError("Innloggingen ser ikke ut til a ha lykkes, eller turoversikten ble ikke funnet.")
    return trip_page


def parse_trip_rows(html: str) -> List[dict[str, str]]:
    parser = TripTableParser()
    parser.feed(html)
    trips = []
    for row in parser.rows:
        if len(row) != len(HEADERS):
            continue
        trips.append(dict(zip(HEADERS, row)))
    return trips


def filter_trips(trips: List[dict[str, str]], keywords: List[str]) -> List[dict[str, str]]:
    lowered = [keyword.lower() for keyword in keywords]
    excluded = [keyword.lower() for keyword in EXCLUDED_KEYWORDS]
    matches = []
    for trip in trips:
        value = trip.get("egenskap", "").lower()
        if any(keyword in value for keyword in excluded):
            continue
        if any(keyword in value for keyword in lowered):
            matches.append(trip)
    return matches


def normalize_status(status: str) -> str:
    cleaned = status.strip()
    if cleaned.lower() == "klar for fakturering":
        return "Køyrd"
    return cleaned


def project_trip(trip: dict[str, str], include_meta: bool = False) -> dict[str, str]:
    projected = {field: trip.get(field, "") for field in DISPLAY_FIELDS}
    projected["status"] = normalize_status(projected["status"])
    if include_meta:
        for key in ("ref", "altturid", "internnr"):
            projected[key] = trip.get(key, "")
    return projected


def get_filtered_trips(username: str, password: str, keywords: List[str] | None = None, include_meta: bool = False) -> List[dict[str, str]]:
    selected_keywords = keywords or list(DEFAULT_KEYWORDS)
    html = login_and_fetch(username, password)
    trips = parse_trip_rows(html)
    matches = filter_trips(trips, selected_keywords)
    return [project_trip(trip, include_meta=include_meta) for trip in matches]


def build_addcar_query(trip: dict[str, str]) -> str:
    params = {
        "ref": trip.get("ref", ""),
        "otime": trip.get("oppmote", ""),
        "utime": trip.get("utrop", ""),
        "altturid": trip.get("altturid", ""),
        "internnr": trip.get("internnr", ""),
    }
    return urlencode(params)


def fetch_addcar_page(opener, trip: dict[str, str]) -> str:
    url = f"{ADD_CAR_URL}?{build_addcar_query(trip)}"
    return fetch_text(opener, url)


def parse_car_options(html: str) -> List[str]:
    match = re.search(r'<select[^>]+name="ddlCars"[^>]*>(.*?)</select>', html, re.IGNORECASE | re.DOTALL)
    if not match:
        return []
    options_html = match.group(1)
    options = re.findall(r'<option[^>]+value="([^"]*)"', options_html, re.IGNORECASE)
    return [unescape(option).strip() for option in options]


def parse_detail_state(html: str) -> dict[str, object]:
    return {
        "cars": parse_car_options(html),
        "oppmote_date": {
            "year": parse_input_value(html, "txtYear"),
            "month": parse_input_value(html, "txtMonth"),
            "day": parse_input_value(html, "txtDay"),
            "hour": parse_input_value(html, "txtHour"),
            "minute": parse_input_value(html, "txtMinute"),
        },
        "utrop_date": {
            "year": parse_input_value(html, "txtYearU"),
            "month": parse_input_value(html, "txtMonthU"),
            "day": parse_input_value(html, "txtDayU"),
            "hour": parse_input_value(html, "txtHourU"),
            "minute": parse_input_value(html, "txtMinuteU"),
        },
        "message": parse_input_value(html, "lblMsg"),
    }


def get_trip_detail_state(username: str, password: str, trip: dict[str, str]) -> dict[str, object]:
    opener = create_authenticated_opener(username, password)
    html = fetch_addcar_page(opener, trip)
    return parse_detail_state(html)


def get_car_options(username: str, password: str, trip: dict[str, str]) -> List[str]:
    return list(get_trip_detail_state(username, password, trip).get("cars", []))


def assign_car(username: str, password: str, trip: dict[str, str], car: str) -> str:
    opener = create_authenticated_opener(username, password)
    detail_html = fetch_addcar_page(opener, trip)
    form = extract_hidden_fields(detail_html)
    form.update(
        {
            "ddlCars": car,
            "btnAddCarN": "Velg vogn",
        }
    )
    url = f"{ADD_CAR_URL}?{build_addcar_query(trip)}"
    response_html = fetch_text(opener, url, form)
    lower = response_html.lower()
    if "feil" in lower or "error" in lower:
        raise RuntimeError("Taxiportalen returnerte en feil ved tildeling av vogn.")
    return response_html


def update_trip_time(username: str, password: str, trip: dict[str, str], *, kind: str, hour: str, minute: str) -> str:
    opener = create_authenticated_opener(username, password)
    detail_html = fetch_addcar_page(opener, trip)
    form = extract_hidden_fields(detail_html)
    if kind == "oppmote":
        form.update({
            "txtHour": hour,
            "txtMinute": minute,
            "btnChangeTime": "Endre Oppmøtetid",
        })
    elif kind == "utrop":
        form.update({
            "txtHourU": hour,
            "txtMinuteU": minute,
            "btnChangeTimeU": "Endre Utropstid",
        })
    else:
        raise RuntimeError("Ukjent tidstype.")
    url = f"{ADD_CAR_URL}?{build_addcar_query(trip)}"
    response_html = fetch_text(opener, url, form)
    return response_html


def print_trips(trips: List[dict[str, str]]) -> None:
    if not trips:
        print("Ingen treff.")
        return

    for trip in trips:
        print("-" * 60)
        print(f"Rekvirent: {trip['rekvirent'] or '-'}")
        print(f"Taxi: {trip['taxi'] or '-'}")
        print(f"Status: {trip['status'] or '-'}")
        print(f"Utrop: {trip['utrop'] or '-'}")
        print(f"Oppmote: {trip['oppmote'] or '-'}")
        print(f"Fra: {trip['fra'] or '-'}")
        print(f"Til: {trip['til'] or '-'}")
        print(f"Navn: {trip['navn'] or '-'}")
        print(f"Melding til bil: {trip['melding_til_bil'] or '-'}")
        print(f"Tlf: {trip['tlf'] or '-'}")
        print(f"Egenskap: {trip['egenskap'] or '-'}")


def write_csv(path: str, trips: List[dict[str, str]]) -> None:
    with open(path, "w", newline="", encoding="utf-8") as handle:
        writer = csv.DictWriter(handle, fieldnames=DISPLAY_FIELDS)
        writer.writeheader()
        writer.writerows(trips)


def main() -> int:
    parser = argparse.ArgumentParser(
        description="Logger inn pa Taxiportalen og finner turer med bestemte egenskaper."
    )
    parser.add_argument("--username", default=os.getenv("TAXIPORTALEN_USERNAME"))
    parser.add_argument("--password", default=os.getenv("TAXIPORTALEN_PASSWORD"))
    parser.add_argument(
        "--keywords",
        nargs="+",
        default=list(DEFAULT_KEYWORDS),
        help="Ord som skal finnes i kolonnen EGENSKAP.",
    )
    parser.add_argument("--csv", help="Valgfri CSV-fil for a lagre treffene.")
    args = parser.parse_args()

    if not args.username or not args.password:
        print(
            "Mangler brukernavn eller passord. Sett TAXIPORTALEN_USERNAME og "
            "TAXIPORTALEN_PASSWORD, eller bruk --username og --password.",
            file=sys.stderr,
        )
        return 2

    try:
        matches = get_filtered_trips(args.username, args.password)
    except Exception as exc:
        print(f"Feil: {exc}", file=sys.stderr)
        return 1

    print_trips(matches)
    if args.csv:
        write_csv(args.csv, matches)
        print(f"\nLagret {len(matches)} treff til {args.csv}")
    else:
        print(f"\nFant {len(matches)} treff.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
