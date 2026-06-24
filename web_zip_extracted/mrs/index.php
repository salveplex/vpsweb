<?php
session_start();
mb_internal_encoding('UTF-8');
date_default_timezone_set('Europe/Oslo');

const LOGIN_URL = 'https://www.taxiportalen.no/logon.aspx';
const TRIP_URL = 'https://www.taxiportalen.no/TripViewCentral.aspx';
const ADDCAR_URL = 'https://www.taxiportalen.no/addcar.aspx';
const DEFAULT_KEYWORDS = ['rullestol', 'storbil', 'maxi'];
const EXCLUDED_KEYWORDS = ['skulerute'];
const HEADERS = [
    'rekvirent',
    'taxi',
    'status',
    'utrop',
    'oppmote',
    'behandlingstid',
    'fra',
    'til',
    'navn',
    'melding_til_bil',
    'ref',
    'altturid',
    'tlf',
    'egenskap',
    'internnr',
];
const FIELDS = [
    ['rekvirent', 'Type'],
    ['egenskap', 'Egenskap'],
    ['taxi', 'Taxi'],
    ['status', 'Status'],
    ['dato', 'Dato'],
    ['utrop', 'Utrop'],
    ['oppmote', 'Oppmøte'],
    ['behandlingstid', 'Time'],
    ['fra', 'Fra'],
    ['til', 'Til'],
    ['navn', 'Navn'],
    ['melding_til_bil', 'Melding til bil'],
    ['tlf', 'Tlf'],
];
const META_FIELDS = ['ref', 'utrop', 'oppmote', 'altturid', 'internnr'];
const DATE_FIELDS = ['utrop', 'oppmote'];
const COLUMN_CLASSES = [
    'open' => 'col-open',
    'rekvirent' => 'col-rekvirent',
    'egenskap' => 'col-egenskap',
    'taxi' => 'col-taxi',
    'status' => 'col-status',
    'dato' => 'col-dato',
    'utrop' => 'col-utrop',
    'oppmote' => 'col-oppmote',
    'behandlingstid' => 'col-behandlingstid',
    'fra' => 'col-fra',
    'til' => 'col-til',
    'navn' => 'col-navn',
    'melding_til_bil' => 'col-melding_til_bil',
    'tlf' => 'col-tlf',
];

function load_config(): array
{
    $config = [
        'username' => getenv('TAXIPORTALEN_USERNAME') ?: '',
        'password' => getenv('TAXIPORTALEN_PASSWORD') ?: '',
        'page_title' => 'Taxiportalen filter',
        'refresh_seconds' => 30,
    ];

    $configFile = __DIR__ . '/config.php';
    if (is_file($configFile)) {
        $fileConfig = require $configFile;
        if (is_array($fileConfig)) {
            $config = array_merge($config, $fileConfig);
        }
    }

    return $config;
}

function h(string $value): string
{
    return htmlspecialchars($value, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
}

function normalize_spaces(string $value): string
{
    $value = html_entity_decode($value, ENT_QUOTES | ENT_HTML5, 'UTF-8');
    $value = str_replace("\xc2\xa0", ' ', $value);
    $value = preg_replace('/\s+/u', ' ', $value) ?? $value;
    return trim($value);
}

function normalize_text(?string $value): string
{
    $text = trim((string) $value);
    if ($text === '') {
        return '-';
    }

    preg_match_all('/\p{L}/u', $text, $matches);
    $letters = $matches[0] ?? [];
    if (count($letters) < 3) {
        return $text;
    }

    $upper = 0;
    foreach ($letters as $letter) {
        if (mb_strtoupper($letter, 'UTF-8') === $letter) {
            $upper++;
        }
    }

    $ratio = $upper / max(count($letters), 1);
    if ($ratio < 0.85) {
        return $text;
    }

    return mb_convert_case(mb_strtolower($text, 'UTF-8'), MB_CASE_TITLE, 'UTF-8');
}

function dedupe_address_segments(string $value): string
{
    $parts = preg_split('/\s*,\s*/u', $value) ?: [$value];
    $seen = [];
    $unique = [];

    foreach ($parts as $part) {
        $part = normalize_spaces($part);
        if ($part === '') {
            continue;
        }

        $key = mb_strtolower($part, 'UTF-8');
        if (isset($seen[$key])) {
            continue;
        }

        $seen[$key] = true;
        $unique[] = $part;
    }

    return implode(', ', $unique);
}

function normalize_voss_address(string $value): string
{
    $text = normalize_spaces($value);
    if ($text === '' || $text === '-') {
        return $text === '' ? '-' : $text;
    }

    $parts = preg_split('/\s*,\s*/u', dedupe_address_segments($text)) ?: [$text];
    $isVossHerad = false;
    $cleanParts = [];

    foreach ($parts as $part) {
        $part = normalize_spaces($part);
        if ($part === '') {
            continue;
        }

        if (preg_match('/^57\d{2}\s+/u', $part) === 1) {
            $isVossHerad = true;
            continue;
        }

        $cleanParts[] = $part;
    }

    if ($isVossHerad) {
        $cleanParts = array_values(array_filter($cleanParts, static function (string $part): bool {
            $lower = mb_strtolower($part, 'UTF-8');
            return !in_array($lower, ['voss', 'vossevangen'], true);
        }));
    }

    $text = implode(', ', $cleanParts);
    $text = trim($text, " \t\n\r\0\x0B,");

    if ($isVossHerad) {
        $text = preg_replace('/\b(\d+[A-Za-z]?)\s+\S+$/u', '$1', $text) ?? $text;
    }

    $text = normalize_spaces($text);
    return $text === '' ? '-' : $text;
}

function normalize_field_value(string $field, ?string $value): string
{
    $text = normalize_text($value);
    if (in_array($field, ['fra', 'til'], true)) {
        return normalize_voss_address($text);
    }
    if ($field === 'taxi') {
        $compact = mb_strtolower(str_replace('.', '', $text), 'UTF-8');
        if (in_array($compact, ['venter paa bil', 'venter pÃƒÂ¥ bil'], true)) {
            return 'Venter';
        }
    }
    if ($field === 'navn') {
        $text = preg_replace('/\b(\d{2})-(\d{2})-(\d{4})\b/u', '$1/$2-$3', $text) ?? $text;
    }
    return $text;
}

function parse_trip_datetime(?string $value): ?DateTime
{
    $raw = trim((string) $value);
    if ($raw === '') {
        return null;
    }

    $parsed = DateTime::createFromFormat('Y-m-d H:i', $raw);
    return $parsed instanceof DateTime ? $parsed : null;
}

function format_trip_date(array $trip): string
{
    $parsed = parse_trip_datetime($trip['oppmote'] ?? '') ?? parse_trip_datetime($trip['utrop'] ?? '');
    if (!$parsed instanceof DateTime) {
        return '-';
    }

    return h($parsed->format('d/m'));
}

function format_trip_time(?string $value): string
{
    $parsed = parse_trip_datetime($value);
    if ($parsed instanceof DateTime) {
        return '<span class="time-inline">' . h($parsed->format('H:i')) . '</span>';
    }

    $raw = trim((string) $value);
    return $raw === '' ? '-' : h($raw);
}

function trip_sort_timestamp(array $trip, string $field): int
{
    $parsed = parse_trip_datetime($trip[$field] ?? '');
    return $parsed instanceof DateTime ? $parsed->getTimestamp() : PHP_INT_MAX;
}

function build_ref_counts(array $trips): array
{
    $counts = [];
    foreach ($trips as $trip) {
        $ref = trim((string) ($trip['ref'] ?? ''));
        if ($ref === '') {
            continue;
        }
        $counts[$ref] = ($counts[$ref] ?? 0) + 1;
    }
    return $counts;
}

function sort_trips_for_display(array $trips): array
{
    foreach ($trips as $index => &$trip) {
        $trip['__index'] = $index;
    }
    unset($trip);

    usort($trips, static function (array $a, array $b): int {
        $utropCompare = trip_sort_timestamp($a, 'utrop') <=> trip_sort_timestamp($b, 'utrop');
        if ($utropCompare !== 0) {
            return $utropCompare;
        }

        $aRef = trim((string) ($a['ref'] ?? ''));
        $bRef = trim((string) ($b['ref'] ?? ''));
        if ($aRef !== '' && $bRef !== '') {
            $refCompare = strcmp($aRef, $bRef);
            if ($refCompare !== 0) {
                return $refCompare;
            }
        }

        $oppmoteCompare = trip_sort_timestamp($a, 'oppmote') <=> trip_sort_timestamp($b, 'oppmote');
        if ($oppmoteCompare !== 0) {
            return $oppmoteCompare;
        }

        return ($a['__index'] ?? 0) <=> ($b['__index'] ?? 0);
    });

    foreach ($trips as &$trip) {
        unset($trip['__index']);
    }
    unset($trip);

    return $trips;
}

function format_clock_only(?string $value): string
{
    $raw = trim((string) $value);
    if ($raw === '') {
        return '-';
    }

    if (preg_match('/^\d{2}:\d{2}$/', $raw) === 1) {
        return '<span class="time-inline">' . h($raw) . '</span>';
    }

    return '-';
}

function shorten_display_text(string $value, int $maxLength = 34): string
{
    $text = normalize_spaces($value);
    if ($text === '' || $text === '-') {
        return $text === '' ? '-' : $text;
    }

    if (mb_strlen($text, 'UTF-8') <= $maxLength) {
        return $text;
    }

    return rtrim(mb_substr($text, 0, $maxLength - 1, 'UTF-8')) . '…';
}

function build_tel_href(string $value): ?string
{
    $clean = preg_replace('/[^\d+]+/', '', trim($value)) ?? '';
    if ($clean === '') {
        return null;
    }

    return str_starts_with($clean, '+') ? 'tel:' . $clean : 'tel:' . preg_replace('/[^\d]+/', '', $clean);
}

function get_trip_date_key(array $trip): string
{
    $parsed = parse_trip_datetime($trip['oppmote'] ?? '') ?? parse_trip_datetime($trip['utrop'] ?? '');
    if (!$parsed instanceof DateTime) {
        return '-';
    }

    return $parsed->format('d/m');
}

function build_date_rowspans(array $trips): array
{
    $rowspans = [];
    $currentDate = null;
    $groupStart = null;
    $groupSize = 0;

    foreach ($trips as $index => $trip) {
        $dateKey = get_trip_date_key($trip);
        if ($currentDate === null) {
            $currentDate = $dateKey;
            $groupStart = $index;
            $groupSize = 1;
            continue;
        }

        if ($dateKey === $currentDate) {
            $groupSize++;
            continue;
        }

        $rowspans[$groupStart] = $groupSize;
        $currentDate = $dateKey;
        $groupStart = $index;
        $groupSize = 1;
    }

    if ($groupStart !== null) {
        $rowspans[$groupStart] = $groupSize;
    }

    return $rowspans;
}

function render_value(string $field, ?string $value, array $trip = []): string
{
    if ($field === 'dato') {
        return '<span class="date-chip">' . format_trip_date($trip) . '</span>';
    }
    if ($field === 'behandlingstid') {
        return format_clock_only($value);
    }
    if (in_array($field, DATE_FIELDS, true)) {
        $time = format_trip_time($value);
        if ($field === 'utrop') {
            $status = normalize_status((string) ($trip['status'] ?? ''));
            $class = mb_strtolower($status, 'UTF-8') === 'køyrd' ? 'time-inline-muted' : 'time-inline-warning';
            return str_replace('time-inline', 'time-inline ' . $class, $time);
        }
        return $time;
    }
    if ($field === 'rekvirent') {
        $text = normalize_field_value($field, $value);
        $isShared = !empty($trip['is_samkoyring']);
        $isNissy = str_contains(mb_strtolower($text, 'UTF-8'), 'nissy');
        $badge = ($isShared && $isNissy) ? ' <span class="mini-tag">Samkøyring</span>' : '';
        return '<span class="info-pill info-pill-type">' . h($text) . '</span>' . $badge;
    }
    if ($field === 'status') {
        $status = normalize_status((string) $value);
        $statusClass = mb_strtolower($status, 'UTF-8') === 'sender' ? ' info-pill-status-sending' : '';
        return '<span class="info-pill info-pill-status' . $statusClass . '">' . h($status) . '</span>';
    }
    if ($field === 'tlf') {
        $text = normalize_field_value($field, $value);
        $href = build_tel_href($text);
        if ($href !== null && $text !== '-') {
            return '<a class="phone-link" href="' . h($href) . '">' . h($text) . '</a>';
        }
        return h($text);
    }
    if (in_array($field, ['fra', 'til', 'navn', 'melding_til_bil'], true)) {
        return h(normalize_field_value($field, $value));
    }
    return h(normalize_field_value($field, $value));
}

function column_class(string $field): string
{
    return COLUMN_CLASSES[$field] ?? '';
}

function flash(?string $kind = null, ?string $message = null): ?array
{
    if ($kind !== null && $message !== null) {
        $_SESSION['flash'] = ['kind' => $kind, 'message' => $message];
        return null;
    }

    if (!isset($_SESSION['flash'])) {
        return null;
    }

    $flash = $_SESSION['flash'];
    unset($_SESSION['flash']);
    return $flash;
}

function build_trip_query(array $trip): string
{
    $payload = [];
    foreach (array_merge(META_FIELDS, array_map(fn($field) => $field[0], FIELDS)) as $key) {
        $payload[$key] = $trip[$key] ?? '';
    }
    return http_build_query($payload);
}

function build_addcar_query(array $trip): string
{
    return http_build_query([
        'ref' => $trip['ref'] ?? '',
        'otime' => $trip['oppmote'] ?? '',
        'utime' => $trip['utrop'] ?? '',
        'altturid' => $trip['altturid'] ?? '',
        'internnr' => $trip['internnr'] ?? '',
    ]);
}

function extract_trip(array $source): array
{
    $trip = [];
    foreach (array_merge(META_FIELDS, array_map(fn($field) => $field[0], FIELDS)) as $key) {
        $trip[$key] = isset($source[$key]) ? trim((string) $source[$key]) : '';
    }
    return $trip;
}

function current_list_view(): string
{
    $view = $_GET['view'] ?? $_POST['view'] ?? 'list';
    return $view === 'cards' ? 'cards' : 'list';
}

function view_url(string $view): string
{
    return '?view=' . rawurlencode($view);
}

function build_trip_url(array $trip, ?string $view = null): string
{
    $url = '?action=trip&' . build_trip_query($trip);
    if ($view !== null) {
        $url .= '&view=' . rawurlencode($view);
    }
    return $url;
}

function create_cookie_file(): string
{
    $file = tempnam(sys_get_temp_dir(), 'taxiportalen_');
    if ($file === false) {
        throw new RuntimeException('Klarte ikke opprette cookie-fil.');
    }
    return $file;
}

function request_page(string $url, ?array $postData, string $cookieFile): array
{
    $ch = curl_init($url);
    if ($ch === false) {
        throw new RuntimeException('Klarte ikke starte cURL.');
    }

    curl_setopt_array($ch, [
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_FOLLOWLOCATION => true,
        CURLOPT_COOKIEJAR => $cookieFile,
        CURLOPT_COOKIEFILE => $cookieFile,
        CURLOPT_USERAGENT => 'Mozilla/5.0',
        CURLOPT_TIMEOUT => 30,
        CURLOPT_SSL_VERIFYPEER => true,
        CURLOPT_SSL_VERIFYHOST => 2,
        CURLOPT_HEADER => true,
    ]);

    if ($postData !== null) {
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($postData));
    }

    $response = curl_exec($ch);
    if ($response === false) {
        $error = curl_error($ch);
        curl_close($ch);
        throw new RuntimeException('Nettverksfeil: ' . $error);
    }

    $status = (int) curl_getinfo($ch, CURLINFO_RESPONSE_CODE);
    $headerSize = (int) curl_getinfo($ch, CURLINFO_HEADER_SIZE);
    $finalUrl = (string) curl_getinfo($ch, CURLINFO_EFFECTIVE_URL);
    curl_close($ch);

    return [
        'status' => $status,
        'url' => $finalUrl,
        'body' => (string) substr($response, $headerSize),
    ];
}

function extract_hidden_fields(string $html): array
{
    $fields = [];
    foreach (['__VIEWSTATE', '__VIEWSTATEGENERATOR', '__EVENTVALIDATION'] as $name) {
        if (!preg_match('/id="' . preg_quote($name, '/') . '"\s+value="([^"]*)"/i', $html, $matches)) {
            throw new RuntimeException('Fant ikke skjult felt: ' . $name);
        }
        $fields[$name] = html_entity_decode($matches[1], ENT_QUOTES | ENT_HTML5, 'UTF-8');
    }
    $fields['__EVENTTARGET'] = '';
    $fields['__EVENTARGUMENT'] = '';
    return $fields;
}

function parse_input_value(string $html, string $name): string
{
    if (preg_match('/name="' . preg_quote($name, '/') . '"[^>]*value="([^"]*)"/i', $html, $matches)) {
        return normalize_spaces($matches[1]);
    }
    if (preg_match('/id="' . preg_quote($name, '/') . '"[^>]*>(.*?)</is', $html, $matches)) {
        return normalize_spaces(strip_tags($matches[1]));
    }
    return '';
}

function create_authenticated_cookie(string $username, string $password): string
{
    $cookieFile = create_cookie_file();
    $loginPage = request_page(LOGIN_URL, null, $cookieFile);
    $form = extract_hidden_fields($loginPage['body']);
    $form['txtUserName'] = $username;
    $form['txtUserPass'] = $password;
    $form['btnLogon'] = 'Logg pa';
    request_page(LOGIN_URL, $form, $cookieFile);
    return $cookieFile;
}

function with_authenticated_cookie(array $config, callable $callback)
{
    if (($config['username'] ?? '') === '' || ($config['password'] ?? '') === '') {
        throw new RuntimeException('Mangler brukernavn eller passord i config.php.');
    }

    $cookieFile = create_authenticated_cookie($config['username'], $config['password']);
    try {
        return $callback($cookieFile);
    } finally {
        @unlink($cookieFile);
    }
}

function parse_trip_rows(string $html): array
{
    libxml_use_internal_errors(true);
    $dom = new DOMDocument();
    $dom->loadHTML('<?xml encoding="utf-8" ?>' . $html);
    $xpath = new DOMXPath($dom);
    $rows = $xpath->query('//table[@id="gwTrip"]//tr[td]');
    $trips = [];

    if ($rows !== false) {
        foreach ($rows as $row) {
            $cells = [];
            foreach ($xpath->query('./td', $row) ?: [] as $cell) {
                $cells[] = normalize_spaces($cell->textContent ?? '');
            }
            if (count($cells) !== count(HEADERS)) {
                continue;
            }
            $trips[] = array_combine(HEADERS, $cells);
        }
    }

    libxml_clear_errors();
    return $trips;
}

function filter_trips(array $trips, array $keywords): array
{
    $included = array_map(fn($item) => mb_strtolower($item, 'UTF-8'), $keywords);
    $excluded = array_map(fn($item) => mb_strtolower($item, 'UTF-8'), EXCLUDED_KEYWORDS);
    $matches = [];

    foreach ($trips as $trip) {
        $value = mb_strtolower($trip['egenskap'] ?? '', 'UTF-8');
        $skip = false;
        foreach ($excluded as $needle) {
            if ($needle !== '' && str_contains($value, $needle)) {
                $skip = true;
                break;
            }
        }
        if ($skip) {
            continue;
        }
        foreach ($included as $needle) {
            if ($needle !== '' && str_contains($value, $needle)) {
                $matches[] = $trip;
                break;
            }
        }
    }

    return $matches;
}

function normalize_status(string $status): string
{
    $clean = trim($status);
    if (mb_strtolower($clean, 'UTF-8') === 'klar for fakturering') {
        return 'Køyrd';
    }
    if (mb_strtolower($clean, 'UTF-8') === 'under sending') {
        return 'Sender';
    }
    return $clean;
}

function project_trip(array $trip, bool $includeMeta = false): array
{
    $projected = [];
    foreach (FIELDS as [$field]) {
        $projected[$field] = $trip[$field] ?? '';
    }
    $projected['status'] = normalize_status($projected['status'] ?? '');
    if ($includeMeta) {
        foreach (META_FIELDS as $field) {
            $projected[$field] = $trip[$field] ?? '';
        }
    }
    return $projected;
}

function get_filtered_trips(array $config, bool $includeMeta = false): array
{
    return with_authenticated_cookie($config, function (string $cookieFile) use ($includeMeta) {
        $page = request_page(TRIP_URL, null, $cookieFile);
        if (!str_contains($page['body'], 'gwTrip')) {
            throw new RuntimeException('Fant ikke turoversikten etter innlogging.');
        }
        $rows = parse_trip_rows($page['body']);
        $matches = filter_trips($rows, DEFAULT_KEYWORDS);
        $projected = array_map(fn($trip) => project_trip($trip, $includeMeta), $matches);
        $projected = sort_trips_for_display($projected);
        $refCounts = build_ref_counts($projected);

        foreach ($projected as &$trip) {
            $ref = trim((string) ($trip['ref'] ?? ''));
            $trip['is_samkoyring'] = $ref !== '' && ($refCounts[$ref] ?? 0) > 1;
        }
        unset($trip);

        return $projected;
    });
}

function fetch_addcar_page(string $cookieFile, array $trip): array
{
    return request_page(ADDCAR_URL . '?' . build_addcar_query($trip), null, $cookieFile);
}

function parse_detail_state(string $html): array
{
    $cars = [];
    if (preg_match('/<select[^>]+name="ddlCars"[^>]*>(.*?)<\/select>/is', $html, $selectMatch)) {
        if (preg_match_all('/<option[^>]+value="([^"]*)"/i', $selectMatch[1], $optionMatches)) {
            foreach ($optionMatches[1] as $option) {
                $cars[] = normalize_spaces($option);
            }
        }
    }

    return [
        'cars' => $cars,
        'oppmote_date' => [
            'year' => parse_input_value($html, 'txtYear'),
            'month' => parse_input_value($html, 'txtMonth'),
            'day' => parse_input_value($html, 'txtDay'),
            'hour' => parse_input_value($html, 'txtHour'),
            'minute' => parse_input_value($html, 'txtMinute'),
        ],
        'utrop_date' => [
            'year' => parse_input_value($html, 'txtYearU'),
            'month' => parse_input_value($html, 'txtMonthU'),
            'day' => parse_input_value($html, 'txtDayU'),
            'hour' => parse_input_value($html, 'txtHourU'),
            'minute' => parse_input_value($html, 'txtMinuteU'),
        ],
        'message' => parse_input_value($html, 'lblMsg'),
    ];
}

function get_trip_detail_state(array $config, array $trip): array
{
    return with_authenticated_cookie($config, function (string $cookieFile) use ($trip) {
        $page = fetch_addcar_page($cookieFile, $trip);
        return parse_detail_state($page['body']);
    });
}

function assign_car(array $config, array $trip, string $car): void
{
    with_authenticated_cookie($config, function (string $cookieFile) use ($trip, $car) {
        $page = fetch_addcar_page($cookieFile, $trip);
        $form = extract_hidden_fields($page['body']);
        $form['ddlCars'] = $car;
        $form['btnAddCarN'] = 'Velg vogn';
        request_page(ADDCAR_URL . '?' . build_addcar_query($trip), $form, $cookieFile);
    });
}

function update_trip_time(array $config, array $trip, string $kind, string $hour, string $minute): void
{
    with_authenticated_cookie($config, function (string $cookieFile) use ($trip, $kind, $hour, $minute) {
        $page = fetch_addcar_page($cookieFile, $trip);
        $form = extract_hidden_fields($page['body']);
        if ($kind === 'oppmote') {
            $form['txtHour'] = $hour;
            $form['txtMinute'] = $minute;
            $form['btnChangeTime'] = 'Endre Oppmotetid';
        } elseif ($kind === 'utrop') {
            $form['txtHourU'] = $hour;
            $form['txtMinuteU'] = $minute;
            $form['btnChangeTimeU'] = 'Endre Utropstid';
        } else {
            throw new RuntimeException('Ukjent tidstype.');
        }
        request_page(ADDCAR_URL . '?' . build_addcar_query($trip), $form, $cookieFile);
    });
}

function render_layout(array $config, string $title, string $intro, string $body, ?int $count = null): void
{
    $refresh = (int) ($config['refresh_seconds'] ?? 30);
    $pageTitle = h($title);
    $introText = h($intro);
    $timestamp = h(date('d/m - H:i:s'));
    $countChip = $count === null ? '' : '<div class="meta-chip">Treff: ' . $count . '</div>';
    $view = current_list_view();
    $viewSwitch = '';

    if (($_GET['action'] ?? $_POST['action'] ?? 'list') === 'list') {
        $viewSwitch = '<div class="view-switch"><a class="button secondary' . ($view === 'list' ? ' is-active' : '') . '" href="' . h(view_url('list')) . '">Liste</a><a class="button secondary' . ($view === 'cards' ? ' is-active' : '') . '" href="' . h(view_url('cards')) . '">Kort</a></div>';
    }

    echo '<!doctype html><html lang="no"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover"><meta http-equiv="refresh" content="' . $refresh . '"><title>' . $pageTitle . '</title><style>';
    echo get_css();
    echo '</style></head><body><main><section class="hero"><h1>' . $pageTitle . '</h1><p>' . $introText . '</p><div class="meta">' . $countChip . '<div class="meta-chip">Oppdatert: ' . $timestamp . '</div><div class="meta-chip">Autooppdatering: ' . $refresh . ' sek</div></div><div class="actions"><a class="button" href="' . h(view_url($view)) . '">Oppdater no</a>' . $viewSwitch . '<button class="button theme-toggle" id="theme-toggle" type="button">Tema: Auto</button></div></section>';
    echo $body;
    echo '</main><script>' . get_theme_script() . '</script></body></html>';
}

function get_css(): string
{
    return file_get_contents(__FILE__ . '.css') ?: '';
}

function get_theme_script(): string
{
    return file_get_contents(__FILE__ . '.js') ?: '';
}

function render_list_page(array $config): void
{
    $flash = flash();
    $view = current_list_view();
    try {
        $trips = get_filtered_trips($config, true);
        $body = '';
        if ($flash) {
            $body .= '<div class="' . h($flash['kind']) . '">' . h($flash['message']) . '</div>';
        }
        if (!$trips) {
            $body .= '<div class="notice">Ingen treff med rullestol, storbil eller maxi akkurat no.</div>';
        } elseif ($view === 'cards') {
            $body .= '<div class="cards-grid">';
            foreach ($trips as $trip) {
                $body .= '<article class="trip-card"><div class="trip-card-top"><div><div class="trip-card-title">Tur ' . h($trip['ref'] ?? '-') . '</div><div class="trip-card-meta">' . format_trip_date($trip) . ' | ' . render_value('utrop', $trip['utrop'] ?? '', $trip) . ' | ' . render_value('oppmote', $trip['oppmote'] ?? '', $trip) . '</div></div><a class="row-link edit-link" href="' . h(build_trip_url($trip, $view)) . '" title="Rediger tur" aria-label="Rediger tur">&#9998;</a></div><div class="trip-card-grid">';
                foreach (FIELDS as [$key, $label]) {
                    $body .= '<div class="trip-card-item"><span class="label">' . h($label) . '</span><div class="value">' . render_value($key, $trip[$key] ?? '', $trip) . '</div></div>';
                }
                $body .= '</div></article>';
            }
            $body .= '</div>';
        } else {
            $dateRowspans = build_date_rowspans($trips);
            $body .= '<div class="table-wrap"><table><thead><tr><th class="' . column_class('open') . '">Val</th>';
            foreach (FIELDS as [$key, $label]) {
                $body .= '<th class="' . h(column_class($key)) . '">' . h($label) . '</th>';
            }
            $body .= '</tr></thead><tbody>';
            foreach ($trips as $index => $trip) {
                $body .= '<tr><td class="' . column_class('open') . '"><a class="row-link edit-link" href="' . h(build_trip_url($trip, $view)) . '" title="Rediger tur" aria-label="Rediger tur">&#9998;</a></td>';
                foreach (FIELDS as [$key]) {
                    if ($key === 'dato' && !isset($dateRowspans[$index])) {
                        continue;
                    }
                    $attrs = ' class="' . h(column_class($key)) . '"';
                    if ($key === 'dato' && isset($dateRowspans[$index])) {
                        $attrs .= ' rowspan="' . $dateRowspans[$index] . '"';
                    }
                    $body .= '<td' . $attrs . '>' . render_value($key, $trip[$key] ?? '', $trip) . '</td>';
                }
                $body .= '</tr>';
            }
            $body .= '</tbody></table></div>';
        }
        render_layout($config, (string) ($config['page_title'] ?? PAGE_TITLE), 'Mobilvisning av turer med eigenskapane rullestol, storbil eller maxi.', $body, count($trips));
    } catch (Throwable $e) {
        $body = '<div class="error">' . h($e->getMessage()) . '</div>';
        render_layout($config, (string) ($config['page_title'] ?? PAGE_TITLE), 'Mobilvisning av turer med eigenskapane rullestol, storbil eller maxi.', $body, 0);
    }
}

function render_time_editor(string $title, string $action, array $trip, array $dateState, string $buttonText): string
{
    return '<section class="edit-card"><h3>' . h($title) . '</h3><div class="time-row"><span class="label">Dato</span><span class="value">' . h(($dateState['day'] ?? '') . '/' . ($dateState['month'] ?? '')) . '</span></div><form method="post" action="?action=' . h($action) . '">' . hidden_trip_fields($trip) . '<div class="time-row"><input type="text" name="hour" value="' . h($dateState['hour'] ?? '') . '" inputmode="numeric" maxlength="2" placeholder="TT"><input type="text" name="minute" value="' . h($dateState['minute'] ?? '') . '" inputmode="numeric" maxlength="2" placeholder="MM"><button class="button" type="submit">' . h($buttonText) . '</button></div></form></section>';
}

function hidden_trip_fields(array $trip): string
{
    $html = '';
    foreach (array_merge(META_FIELDS, array_map(fn($field) => $field[0], FIELDS)) as $key) {
        $html .= '<input type="hidden" name="' . h($key) . '" value="' . h($trip[$key] ?? '') . '">';
    }
    $html .= '<input type="hidden" name="view" value="' . h(current_list_view()) . '">';
    return $html;
}

function render_trip_page(array $config, array $trip): void
{
    $flash = flash();
    try {
        $detail = get_trip_detail_state($config, $trip);
        $body = '<section class="panel"><h2>Velg vogn og tider</h2><p>Her kan du tildele vogn og endre oppmøte eller utropstid for tur ' . h($trip['ref'] ?? '-') . '.</p>';
        if ($flash) {
            $body .= '<div class="' . h($flash['kind']) . '">' . h($flash['message']) . '</div>';
        }
        $body .= '<div class="edit-sections">';
        $body .= '<section class="edit-card"><h3>Velg vogn</h3><form method="post" action="?action=assign">' . hidden_trip_fields($trip) . '<div class="assign-row"><select name="car">';
        foreach ($detail['cars'] as $car) {
            $body .= '<option value="' . h($car) . '">' . h(normalize_text($car)) . '</option>';
        }
        $body .= '</select><button class="button warn" type="submit">Tildel vogn</button></div></form></section>';
        $body .= render_time_editor('Oppmøte', 'update-oppmote', $trip, $detail['oppmote_date'], 'Endre oppmøte');
        $body .= render_time_editor('Utropstid', 'update-utrop', $trip, $detail['utrop_date'], 'Endre utropstid');
        $body .= '</div><div class="actions"><a class="button secondary" href="' . h(view_url(current_list_view())) . '">Tilbake</a></div></section>';
        render_layout($config, 'Tildel vogn og tid', 'Tur ' . ($trip['ref'] ?? '-'), $body);
    } catch (Throwable $e) {
        $body = '<div class="error">' . h($e->getMessage()) . '</div>';
        render_layout($config, 'Tildel vogn og tid', 'Tur ' . ($trip['ref'] ?? '-'), $body);
    }
}

function redirect_to_trip(array $trip): void
{
    header('Location: ' . build_trip_url($trip, current_list_view()));
    exit;
}

function handle_assign_action(array $config): void
{
    $trip = extract_trip($_POST);
    $car = trim((string) ($_POST['car'] ?? ''));
    try {
        if ($car === '') {
            throw new RuntimeException('Vel ei vogn for du sender inn.');
        }
        assign_car($config, $trip, $car);
        flash('success', 'Vogn ' . $car . ' sendt til Taxiportalen for tur ' . ($trip['ref'] ?? '-') . '.');
    } catch (Throwable $e) {
        flash('error', $e->getMessage());
    }
    redirect_to_trip($trip);
}

function handle_time_update_action(array $config, string $kind): void
{
    $trip = extract_trip($_POST);
    $hour = str_pad(trim((string) ($_POST['hour'] ?? '')), 2, '0', STR_PAD_LEFT);
    $minute = str_pad(trim((string) ($_POST['minute'] ?? '')), 2, '0', STR_PAD_LEFT);

    try {
        if (!ctype_digit($hour) || !ctype_digit($minute) || (int) $hour > 23 || (int) $minute > 59) {
            throw new RuntimeException('Tid ma vere gyldig i format timar og minutt.');
        }
        update_trip_time($config, $trip, $kind, $hour, $minute);
        $label = $kind === 'oppmote' ? 'Oppmøte' : 'Utropstid';
        flash('success', $label . ' sendt til Taxiportalen som ' . $hour . ':' . $minute . '.');
    } catch (Throwable $e) {
        flash('error', $e->getMessage());
    }

    redirect_to_trip($trip);
}

function render_health(): void
{
    header('Content-Type: text/plain; charset=utf-8');
    echo 'ok';
}

$config = load_config();
$action = $_GET['action'] ?? ($_POST['action'] ?? 'list');
$requestMethod = $_SERVER['REQUEST_METHOD'] ?? 'GET';

if ($action === 'health') {
    render_health();
    exit;
}
if ($requestMethod === 'POST' && $action === 'assign') {
    handle_assign_action($config);
}
if ($requestMethod === 'POST' && $action === 'update-oppmote') {
    handle_time_update_action($config, 'oppmote');
}
if ($requestMethod === 'POST' && $action === 'update-utrop') {
    handle_time_update_action($config, 'utrop');
}
if ($action === 'trip') {
    render_trip_page($config, extract_trip($_GET));
    exit;
}
render_list_page($config);


