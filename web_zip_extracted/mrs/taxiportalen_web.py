import argparse
import html
import os
import re
from datetime import datetime
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from urllib.parse import parse_qs, urlencode, urlparse

from taxiportalen_filter import DEFAULT_KEYWORDS, assign_car, get_filtered_trips, get_trip_detail_state, update_trip_time

HOST = "127.0.0.1"
PORT = 8000
REFRESH_SECONDS = 30
PAGE_TITLE = "Taxiportalen filter"

CSS = """
:root {
    color-scheme: light dark;
    --bg: #f6efe5;
    --surface: rgba(255, 250, 244, 0.94);
    --surface-strong: #fff7ec;
    --ink: #1f2933;
    --muted: #6b7280;
    --line: rgba(123, 92, 52, 0.16);
    --accent: #0f766e;
    --accent-strong: #115e59;
    --badge: #f59e0b;
    --danger: #b91c1c;
    --shadow: 0 18px 50px rgba(70, 48, 22, 0.12);
    --hero-bg: linear-gradient(135deg, rgba(255,255,255,0.88), rgba(255,244,227,0.92));
    --table-head: #f7ebd7;
    --row-alt: rgba(255, 255, 255, 0.52);
    --row-hover: rgba(15, 118, 110, 0.06);
    --input-bg: #ffffff;
    --button-ink: #ffffff;
}
:root[data-theme="dark"] {
    --bg: #0f1720;
    --surface: rgba(19, 29, 37, 0.94);
    --surface-strong: #16222c;
    --ink: #e8eef2;
    --muted: #9fb0bd;
    --line: rgba(148, 163, 184, 0.16);
    --accent: #2dd4bf;
    --accent-strong: #7ee7d8;
    --badge: #fbbf24;
    --danger: #fca5a5;
    --shadow: 0 18px 50px rgba(0, 0, 0, 0.35);
    --hero-bg: linear-gradient(135deg, rgba(17,24,39,0.94), rgba(24,39,51,0.98));
    --table-head: #1d2b36;
    --row-alt: rgba(255, 255, 255, 0.02);
    --row-hover: rgba(45, 212, 191, 0.08);
    --input-bg: #0f1a22;
    --button-ink: #05211d;
}
@media (prefers-color-scheme: dark) {
    :root:not([data-theme="light"]) {
        --bg: #0f1720;
        --surface: rgba(19, 29, 37, 0.94);
        --surface-strong: #16222c;
        --ink: #e8eef2;
        --muted: #9fb0bd;
        --line: rgba(148, 163, 184, 0.16);
        --accent: #2dd4bf;
        --accent-strong: #7ee7d8;
        --badge: #fbbf24;
        --danger: #fca5a5;
        --shadow: 0 18px 50px rgba(0, 0, 0, 0.35);
        --hero-bg: linear-gradient(135deg, rgba(17,24,39,0.94), rgba(24,39,51,0.98));
        --table-head: #1d2b36;
        --row-alt: rgba(255, 255, 255, 0.02);
        --row-hover: rgba(45, 212, 191, 0.08);
        --input-bg: #0f1a22;
        --button-ink: #05211d;
    }
}
* { box-sizing: border-box; }
body {
    margin: 0;
    font-family: "Segoe UI", sans-serif;
    color: var(--ink);
    background:
        radial-gradient(circle at top right, rgba(245, 158, 11, 0.18), transparent 32%),
        radial-gradient(circle at top left, rgba(15, 118, 110, 0.14), transparent 28%),
        linear-gradient(180deg, color-mix(in srgb, var(--bg) 65%, white 35%) 0%, var(--bg) 100%);
}
main {
    width: min(100%, 1180px);
    margin: 0 auto;
    padding: 18px 14px 28px;
}
.hero, .panel {
    background: var(--hero-bg);
    border: 1px solid var(--line);
    border-radius: 24px;
    padding: 18px;
    box-shadow: var(--shadow);
    backdrop-filter: blur(10px);
}
.hero h1, .panel h2, .panel h3 {
    margin: 0;
    line-height: 1.05;
}
.hero h1, .panel h2 {
    font-size: clamp(1.4rem, 4vw, 2.1rem);
}
.panel h3 {
    font-size: 1rem;
}
.hero p, .panel p {
    margin: 10px 0 0;
    color: var(--muted);
}
.meta {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-top: 14px;
}
.meta-chip {
    background: color-mix(in srgb, var(--surface) 75%, white 25%);
    border: 1px solid var(--line);
    border-radius: 999px;
    padding: 8px 12px;
    font-size: 0.92rem;
}
.actions {
    display: flex;
    gap: 10px;
    margin-top: 16px;
    flex-wrap: wrap;
}
.button {
    appearance: none;
    border: 0;
    text-decoration: none;
    background: var(--accent);
    color: var(--button-ink);
    border-radius: 999px;
    padding: 12px 16px;
    font-weight: 700;
    font-size: 0.95rem;
    cursor: pointer;
}
.button.secondary {
    background: color-mix(in srgb, var(--accent) 16%, transparent);
    color: var(--accent-strong);
    border: 1px solid var(--line);
}
.button.warn {
    background: #d97706;
    color: white;
}
.theme-toggle {
    background: color-mix(in srgb, var(--surface) 72%, white 28%);
    color: var(--ink);
    border: 1px solid var(--line);
}
.table-wrap {
    margin-top: 18px;
    border: 1px solid var(--line);
    border-radius: 22px;
    overflow-x: auto;
    overflow-y: hidden;
    box-shadow: var(--shadow);
    background: var(--surface);
    -webkit-overflow-scrolling: touch;
}
table {
    width: max-content;
    min-width: 100%;
    border-collapse: collapse;
}
thead th {
    position: sticky;
    top: 0;
    z-index: 1;
    background: var(--table-head);
    text-align: left;
    padding: 12px 10px;
    font-size: 0.76rem;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    color: color-mix(in srgb, var(--ink) 70%, #9a6700 30%);
    border-bottom: 1px solid var(--line);
    white-space: nowrap;
}
tbody td {
    padding: 10px;
    vertical-align: top;
    border-bottom: 1px solid color-mix(in srgb, var(--line) 75%, transparent);
    font-size: 0.93rem;
    line-height: 1.35;
    overflow-wrap: anywhere;
}
tbody tr:nth-child(even) {
    background: var(--row-alt);
}
tbody tr:hover {
    background: var(--row-hover);
}
thead th:last-child,
tbody td:last-child {
    padding-right: 24px;
}
.col-open { min-width: 64px; }
.col-rekvirent { min-width: 72px; max-width: 110px; }
.col-egenskap { width: auto; min-width: 110px; max-width: none; white-space: nowrap; font-weight: 800; color: var(--badge); }
.col-taxi { min-width: 74px; }
.col-status { min-width: 92px; font-weight: 800; color: var(--accent-strong); }
.col-utrop { min-width: 72px; }
.col-oppmote { min-width: 72px; }
.col-fra { min-width: 220px; max-width: 260px; }
.col-til { min-width: 220px; max-width: 260px; }
.col-navn { min-width: 150px; max-width: 210px; }
.col-melding_til_bil { min-width: 220px; max-width: 260px; }
.col-tlf { min-width: 96px; }
.date-block {
    display: inline-flex;
    flex-direction: column;
    gap: 2px;
    line-height: 1.2;
    white-space: nowrap;
}
.date-block .day {
    font-weight: 700;
}
.date-block .time {
    color: var(--muted);
    font-size: 0.85rem;
}
.row-link {
    color: inherit;
    text-decoration: none;
    font-weight: 700;
}
.row-link:hover {
    text-decoration: underline;
}
.notice, .error, .success {
    margin-top: 18px;
    padding: 16px;
    border-radius: 18px;
    font-weight: 600;
}
.notice {
    background: color-mix(in srgb, var(--surface) 75%, white 25%);
    border: 1px dashed var(--line);
    color: var(--muted);
    text-align: center;
}
.error {
    background: color-mix(in srgb, #b91c1c 10%, var(--surface) 90%);
    border: 1px solid color-mix(in srgb, #b91c1c 25%, transparent);
    color: var(--danger);
}
.success {
    background: color-mix(in srgb, var(--accent) 10%, var(--surface) 90%);
    border: 1px solid color-mix(in srgb, var(--accent) 24%, transparent);
    color: var(--accent-strong);
}
.detail-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 12px;
    margin-top: 18px;
}
.detail-item, .edit-card {
    padding: 12px 14px;
    background: var(--surface-strong);
    border-radius: 16px;
    border: 1px solid color-mix(in srgb, var(--line) 75%, transparent);
}
.label {
    display: block;
    font-size: 0.74rem;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--muted);
    margin-bottom: 4px;
}
.value {
    font-weight: 650;
    line-height: 1.4;
    word-break: break-word;
}
.assign-row, .time-row {
    display: flex;
    gap: 12px;
    align-items: center;
    flex-wrap: wrap;
    margin-top: 18px;
}
select, input[type="text"] {
    min-width: 90px;
    padding: 12px 14px;
    border-radius: 14px;
    border: 1px solid var(--line);
    background: var(--input-bg);
    color: var(--ink);
    font-size: 1rem;
}
.edit-sections {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 12px;
    margin-top: 18px;
}
@media (max-width: 900px) {
    .edit-sections { grid-template-columns: 1fr; }
}
@media (max-width: 640px) {
    main { padding: 12px 10px 24px; }
    .hero, .panel { border-radius: 20px; padding: 16px; }
    .detail-grid { grid-template-columns: 1fr; }
}
"""

SCRIPT = """
(function () {
    const storageKey = 'taxiportalen-theme';
    const root = document.documentElement;
    const button = document.getElementById('theme-toggle');
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    function systemTheme() { return media.matches ? 'dark' : 'light'; }
    function currentMode() { return localStorage.getItem(storageKey) || 'system'; }
    function applyTheme(mode) {
        if (mode === 'light') root.setAttribute('data-theme', 'light');
        else if (mode === 'dark') root.setAttribute('data-theme', 'dark');
        else root.removeAttribute('data-theme');
        updateButton();
    }
    function updateButton() {
        if (!button) return;
        const mode = currentMode();
        const labels = { system: 'Tema: Auto', light: 'Tema: Lys', dark: 'Tema: Mork' };
        button.textContent = labels[mode];
        button.title = 'Aktivt tema: ' + (mode === 'system' ? systemTheme() : mode);
    }
    function nextMode(mode) { if (mode === 'system') return 'light'; if (mode === 'light') return 'dark'; return 'system'; }
    applyTheme(currentMode());
    if (button) {
        button.addEventListener('click', function () {
            const mode = nextMode(currentMode());
            if (mode === 'system') localStorage.removeItem(storageKey);
            else localStorage.setItem(storageKey, mode);
            applyTheme(mode);
        });
    }
    if (media.addEventListener) {
        media.addEventListener('change', function () {
            if (currentMode() === 'system') applyTheme('system');
        });
    }
})();
"""

FIELDS = [
    ("rekvirent", "Rekvirent"),
    ("egenskap", "Egenskap"),
    ("taxi", "Taxi"),
    ("status", "Status"),
    ("utrop", "Utrop"),
    ("oppmote", "Oppmote"),
    ("fra", "Fra"),
    ("til", "Til"),
    ("navn", "Navn"),
    ("melding_til_bil", "Melding til bil"),
    ("tlf", "Tlf"),
]
META_FIELDS = ["ref", "utrop", "oppmote", "altturid", "internnr"]
DATE_FIELDS = {"utrop", "oppmote"}
COLUMN_CLASSES = {
    "open": "col-open",
    "rekvirent": "col-rekvirent",
    "egenskap": "col-egenskap",
    "taxi": "col-taxi",
    "status": "col-status",
    "utrop": "col-utrop",
    "oppmote": "col-oppmote",
    "fra": "col-fra",
    "til": "col-til",
    "navn": "col-navn",
    "melding_til_bil": "col-melding_til_bil",
    "tlf": "col-tlf",
}


def normalize_text(value):
    if not value:
        return "-"
    text = value.strip()
    if not text:
        return "-"
    letters = [char for char in text if char.isalpha()]
    if len(letters) < 3:
        return text
    uppercase_ratio = sum(1 for char in letters if char.isupper()) / len(letters)
    if uppercase_ratio < 0.85:
        return text
    return text.title()


def normalize_field_value(field, value):
    text = normalize_text(value)
    if field == "taxi":
        compact = text.lower().replace(".", "").strip()
        if compact in {"venter paa bil", "venter på bil"}:
            return "Venter"
    if field == "navn":
        text = re.sub(r"\b(\d{2})-(\d{2})-(\d{4})\b", r"\1/\2-\3", text)
    return text


def format_datetime_compact(value):
    raw = (value or "").strip()
    if not raw:
        return '<span class="date-block"><span class="day">-</span></span>'
    try:
        parsed = datetime.strptime(raw, "%Y-%m-%d %H:%M")
        return (
            '<span class="date-block">'
            f'<span class="day">{parsed.strftime("%d/%m")}</span>'
            f'<span class="time">{parsed.strftime("%H:%M")}</span>'
            '</span>'
        )
    except ValueError:
        return html.escape(raw)


def escape(value):
    return html.escape(normalize_text(value))


def raw_escape(value):
    return html.escape(value or "")


def render_value(field, value):
    if field in DATE_FIELDS:
        return format_datetime_compact(value)
    return html.escape(normalize_field_value(field, value))


def column_class(field):
    return COLUMN_CLASSES.get(field, "")


def base_shell(title, intro, body, count=None):
    now = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    chips = [f'<div class="meta-chip">Oppdatert: {raw_escape(now)}</div>', f'<div class="meta-chip">Autooppdatering: {REFRESH_SECONDS} sek</div>']
    if count is not None:
        chips.insert(0, f'<div class="meta-chip">Treff: {count}</div>')
    return f"""<!doctype html>
<html lang="no">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
    <meta http-equiv="refresh" content="{REFRESH_SECONDS}">
    <title>{raw_escape(title)}</title>
    <style>{CSS}</style>
</head>
<body>
    <main>
        <section class="hero">
            <h1>{raw_escape(title)}</h1>
            <p>{raw_escape(intro)}</p>
            <div class="meta">{''.join(chips)}</div>
            <div class="actions">
                <a class="button" href="/">Oppdater no</a>
                <a class="button secondary" href="/health">Status</a>
                <button class="button theme-toggle" id="theme-toggle" type="button">Tema: Auto</button>
            </div>
        </section>
        {body}
    </main>
    <script>{SCRIPT}</script>
</body>
</html>"""


def trip_query(trip):
    return urlencode({key: trip.get(key, "") for key in META_FIELDS + [field for field, _ in FIELDS]})


def hidden_trip_fields(trip):
    items = []
    for key in META_FIELDS + [field for field, _ in FIELDS]:
        items.append(f'<input type="hidden" name="{html.escape(key)}" value="{raw_escape(trip.get(key, ""))}">')
    return ''.join(items)


def render_list(trips, error_message=None, success_message=None):
    content = []
    if success_message:
        content.append(f'<div class="success">{escape(success_message)}</div>')
    if error_message:
        content.append(f'<div class="error">{escape(error_message)}</div>')
    elif not trips:
        content.append('<div class="notice">Ingen treff med rullestol, storbil eller maxi akkurat no.</div>')
    if trips:
        content.append('<div class="table-wrap"><table><thead><tr>')
        content.append(f'<th class="{column_class("open")}">Val</th>')
        for key, label in FIELDS:
            content.append(f'<th class="{column_class(key)}">{raw_escape(label)}</th>')
        content.append('</tr></thead><tbody>')
        for trip in trips:
            query = trip_query(trip)
            content.append('<tr>')
            content.append(f'<td class="{column_class("open")}"><a class="row-link" href="/trip?{query}">Opne</a></td>')
            for key, _label in FIELDS:
                value = trip.get(key) or '-'
                content.append(f'<td class="{column_class(key)}">{render_value(key, value)}</td>')
            content.append('</tr>')
        content.append('</tbody></table></div>')
    body = ''.join(content)
    return base_shell(PAGE_TITLE, "Mobilvisning av turer med eigenskapane rullestol, storbil eller maxi.", body, count=len(trips))


def render_time_editor(title, action, trip, date_state, button_text):
    return (
        '<section class="edit-card">'
        f'<h3>{raw_escape(title)}</h3>'
        '<div class="time-row">'
        f'<span class="label">Dato</span><span class="value">{raw_escape(date_state.get("day", ""))}/{raw_escape(date_state.get("month", ""))}</span>'
        '</div>'
        f'<form method="post" action="/{action}">'
        f'{hidden_trip_fields(trip)}'
        '<div class="time-row">'
        f'<input type="text" name="hour" value="{raw_escape(date_state.get("hour", ""))}" inputmode="numeric" maxlength="2" placeholder="TT">'
        f'<input type="text" name="minute" value="{raw_escape(date_state.get("minute", ""))}" inputmode="numeric" maxlength="2" placeholder="MM">'
        f'<button class="button" type="submit">{raw_escape(button_text)}</button>'
        '</div>'
        '</form>'
        '</section>'
    )


def render_trip_detail(trip, detail_state, error_message=None, success_message=None):
    cars = detail_state.get("cars", [])
    oppmote_date = detail_state.get("oppmote_date", {})
    utrop_date = detail_state.get("utrop_date", {})
    content = ['<section class="panel">', '<h2>Detaljar og endringar</h2>', '<p>Her kan du tildele vogn og endre oppmote eller utropstid med same skjema som i original Taxiportalen.</p>']
    if success_message:
        content.append(f'<div class="success">{escape(success_message)}</div>')
    if error_message:
        content.append(f'<div class="error">{escape(error_message)}</div>')
    content.append('<div class="detail-grid">')
    for key, label in FIELDS:
        content.append(
            '<div class="detail-item">'
            f'<span class="label">{raw_escape(label)}</span>'
            f'<div class="value">{render_value(key, trip.get(key) or "-")}</div>'
            '</div>'
        )
    content.append('</div>')
    content.append('<div class="edit-sections">')
    content.append('<section class="edit-card"><h3>Velg vogn</h3><form method="post" action="/assign">')
    content.append(hidden_trip_fields(trip))
    content.append('<div class="assign-row"><select name="car">')
    for car in cars:
        content.append(f'<option value="{raw_escape(car)}">{escape(car)}</option>')
    content.append('</select><button class="button warn" type="submit">Tildel vogn</button></div></form></section>')
    content.append(render_time_editor("Oppmote", "update-oppmote", trip, oppmote_date, "Endre oppmote"))
    content.append(render_time_editor("Utropstid", "update-utrop", trip, utrop_date, "Endre utropstid"))
    content.append('</div>')
    content.append(f'<div class="actions"><a class="button secondary" href="/?highlight={raw_escape(trip.get("ref", ""))}">Tilbake</a></div>')
    content.append('</section>')
    body = ''.join(content)
    return base_shell("Tildel vogn og tid", f"Tur {trip.get('ref', '-')}", body)


def get_credentials():
    username = os.getenv("TAXIPORTALEN_USERNAME")
    password = os.getenv("TAXIPORTALEN_PASSWORD")
    if not username or not password:
        raise RuntimeError("Manglar TAXIPORTALEN_USERNAME eller TAXIPORTALEN_PASSWORD i miljoet.")
    return username, password


def extract_trip(data):
    trip = {key: data.get(key, [""])[0] for key in META_FIELDS + [field for field, _ in FIELDS]}
    return trip


def load_detail_state(trip):
    username, password = get_credentials()
    return get_trip_detail_state(username, password, trip)


class TaxiPortalHandler(BaseHTTPRequestHandler):
    def do_GET(self):
        parsed = urlparse(self.path)
        if parsed.path == "/health":
            self.send_response(200)
            self.send_header("Content-Type", "text/plain; charset=utf-8")
            self.end_headers()
            self.wfile.write(b"ok")
            return
        if parsed.path == "/trip":
            self.handle_trip_detail(parse_qs(parsed.query))
            return
        if parsed.path != "/":
            self.send_response(404)
            self.send_header("Content-Type", "text/plain; charset=utf-8")
            self.end_headers()
            self.wfile.write("Ikkje funnen".encode("utf-8"))
            return
        try:
            username, password = get_credentials()
            trips = get_filtered_trips(username, password, include_meta=True)
            payload = render_list(trips)
            self.send_response(200)
        except Exception as exc:
            payload = render_list([], error_message=str(exc))
            self.send_response(500)
        self.send_header("Content-Type", "text/html; charset=utf-8")
        self.end_headers()
        self.wfile.write(payload.encode("utf-8"))

    def do_POST(self):
        parsed = urlparse(self.path)
        content_length = int(self.headers.get("Content-Length", "0"))
        raw = self.rfile.read(content_length).decode("utf-8")
        form = parse_qs(raw)
        trip = extract_trip(form)
        if parsed.path == "/assign":
            self.handle_assign(trip, form)
            return
        if parsed.path == "/update-oppmote":
            self.handle_time_update(trip, form, kind="oppmote")
            return
        if parsed.path == "/update-utrop":
            self.handle_time_update(trip, form, kind="utrop")
            return
        self.send_response(404)
        self.send_header("Content-Type", "text/plain; charset=utf-8")
        self.end_headers()
        self.wfile.write("Ikkje funnen".encode("utf-8"))

    def handle_assign(self, trip, form):
        car = form.get("car", [""])[0]
        try:
            username, password = get_credentials()
            if not car:
                raise RuntimeError("Vel ei vogn før du sender inn.")
            assign_car(username, password, trip, car)
            detail_state = get_trip_detail_state(username, password, trip)
            payload = render_trip_detail(trip, detail_state, success_message=f"Vogn {car} sendt til Taxiportalen for tur {trip.get('ref', '-')}.")
            self.send_response(200)
        except Exception as exc:
            try:
                detail_state = load_detail_state(trip)
            except Exception:
                detail_state = {"cars": [car] if car else [], "oppmote_date": {}, "utrop_date": {}}
            payload = render_trip_detail(trip, detail_state, error_message=str(exc))
            self.send_response(500)
        self.send_header("Content-Type", "text/html; charset=utf-8")
        self.end_headers()
        self.wfile.write(payload.encode("utf-8"))

    def handle_time_update(self, trip, form, *, kind):
        hour = form.get("hour", [""])[0].strip()
        minute = form.get("minute", [""])[0].strip()
        try:
            username, password = get_credentials()
            if not (hour.isdigit() and minute.isdigit() and 0 <= int(hour) <= 23 and 0 <= int(minute) <= 59):
                raise RuntimeError("Tid må vere gyldig i format timar og minutt.")
            update_trip_time(username, password, trip, kind=kind, hour=hour.zfill(2), minute=minute.zfill(2))
            detail_state = get_trip_detail_state(username, password, trip)
            label = "Oppmote" if kind == "oppmote" else "Utropstid"
            payload = render_trip_detail(trip, detail_state, success_message=f"{label} sendt til Taxiportalen som {hour.zfill(2)}:{minute.zfill(2)}.")
            self.send_response(200)
        except Exception as exc:
            try:
                detail_state = load_detail_state(trip)
            except Exception:
                detail_state = {"cars": [], "oppmote_date": {}, "utrop_date": {}}
            payload = render_trip_detail(trip, detail_state, error_message=str(exc))
            self.send_response(500)
        self.send_header("Content-Type", "text/html; charset=utf-8")
        self.end_headers()
        self.wfile.write(payload.encode("utf-8"))

    def handle_trip_detail(self, query):
        trip = extract_trip(query)
        try:
            detail_state = load_detail_state(trip)
            payload = render_trip_detail(trip, detail_state)
            self.send_response(200)
        except Exception as exc:
            payload = render_trip_detail(trip, {"cars": [], "oppmote_date": {}, "utrop_date": {}}, error_message=str(exc))
            self.send_response(500)
        self.send_header("Content-Type", "text/html; charset=utf-8")
        self.end_headers()
        self.wfile.write(payload.encode("utf-8"))

    def log_message(self, format, *args):
        return


def main() -> int:
    parser = argparse.ArgumentParser(description="Start lokal mobilvennlig Taxiportalen-side.")
    parser.add_argument("--host", default=HOST)
    parser.add_argument("--port", type=int, default=PORT)
    args = parser.parse_args()
    server = ThreadingHTTPServer((args.host, args.port), TaxiPortalHandler)
    print(f"Server starta pa http://{args.host}:{args.port}")
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        pass
    finally:
        server.server_close()
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
