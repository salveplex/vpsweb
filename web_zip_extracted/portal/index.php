<?php
session_start();
mb_internal_encoding('UTF-8');

const APP_TIMEZONE = 'Europe/Oslo';

const LOGIN_URL = 'https://www.taxiportalen.no/logon.aspx';
const TRIP_URL = 'https://www.taxiportalen.no/TripViewCentral.aspx';
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
const BOARD_FIELDS = [
    ['dato', 'Dato'],
    ['rekvirent', 'Rekvirent'],
    ['type', 'Type'],
    ['egenskap', 'Egenskap'],
    ['taxi', 'Taxi'],
    ['status', 'Status'],
    ['utrop', 'Utrop'],
    ['oppmote', 'Oppmøte'],
    ['behandlingstid', 'Time'],
    ['fra', 'Frå'],
    ['til', 'Til'],
    ['navn', 'Navn'],
];
const DATE_FIELDS = ['utrop', 'oppmote'];
const COLUMN_CLASSES = [
    'rekvirent' => 'col-rekvirent',
    'type' => 'col-type',
    'taxi' => 'col-taxi',
    'status' => 'col-status',
    'egenskap' => 'col-egenskap',
    'dato' => 'col-dato',
    'behandlingstid' => 'col-behandlingstid',
    'oppmote' => 'col-oppmote',
    'utrop' => 'col-utrop',
    'fra' => 'col-fra',
    'til' => 'col-til',
    'navn' => 'col-navn',
    'melding_til_bil' => 'col-melding_til_bil',
];
const LOCAL_POSTCODES = [
    '5274' => true,
    '5275' => true,
    '5700' => true,
    '5701' => true,
    '5702' => true,
    '5703' => true,
    '5704' => true,
    '5705' => true,
    '5706' => true,
    '5707' => true,
    '5708' => true,
    '5709' => true,
    '5710' => true,
    '5711' => true,
    '5712' => true,
    '5713' => true,
    '5714' => true,
    '5715' => true,
    '5723' => true,
];

date_default_timezone_set(APP_TIMEZONE);

function app_timezone(): DateTimeZone
{
    static $timezone = null;
    if (!$timezone instanceof DateTimeZone) {
        $timezone = new DateTimeZone(APP_TIMEZONE);
    }

    return $timezone;
}

function load_config(): array
{
    $config = [
        'username' => '',
        'password' => '',
        'login_password' => '',
        'page_title' => 'Taxiportalen oversikt',
        'refresh_seconds' => 20,
    ];

    foreach (['config.php', 'config.local.php'] as $fileName) {
        $configFile = __DIR__ . '/' . $fileName;
        if (is_file($configFile)) {
            $fileConfig = require $configFile;
            if (is_array($fileConfig)) {
                $config = array_merge($config, $fileConfig);
            }
        }
    }

    foreach ([
        'username' => 'TAXIPORTALEN_USERNAME',
        'password' => 'TAXIPORTALEN_PASSWORD',
        'login_password' => 'TAXIPORTALEN_BOARD_PASSWORD',
    ] as $key => $envVar) {
        $value = getenv($envVar);
        if ($value !== false && $value !== '') {
            $config[$key] = $value;
        }
    }

    return $config;
}

function h(string $value): string
{
    return htmlspecialchars($value, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
}

function is_authenticated(): bool
{
    return !empty($_SESSION['taxiportalen_board_logged_in']);
}

function require_login(array $config): void
{
    $loginPassword = (string) ($config['login_password'] ?? '');
    $passwordFingerprint = hash('sha256', $loginPassword);

    if (
        is_authenticated()
        && (!isset($_SESSION['taxiportalen_board_login_fingerprint']) || !hash_equals((string) $_SESSION['taxiportalen_board_login_fingerprint'], $passwordFingerprint))
    ) {
        unset($_SESSION['taxiportalen_board_logged_in'], $_SESSION['taxiportalen_board_login_fingerprint']);
    }

    if ($loginPassword === '' || is_authenticated()) {
        return;
    }

    $error = '';
    if (($_POST['action'] ?? '') === 'login') {
        $submitted = (string) ($_POST['login_password'] ?? '');
        if (hash_equals($loginPassword, $submitted)) {
            $_SESSION['taxiportalen_board_logged_in'] = true;
            $_SESSION['taxiportalen_board_login_fingerprint'] = $passwordFingerprint;
            header('Location: ' . strtok($_SERVER['REQUEST_URI'] ?? '/', '?'));
            exit;
        }
        $error = 'Feil passord.';
    }

    render_login_page($config, $error);
    exit;
}

function handle_logout(): void
{
    unset($_SESSION['taxiportalen_board_logged_in'], $_SESSION['taxiportalen_board_login_fingerprint']);
    session_regenerate_id(true);
    header('Location: ' . strtok($_SERVER['REQUEST_URI'] ?? '/', '?'));
    exit;
}

function render_login_page(array $config, string $error = ''): void
{
    $pageTitle = h((string) ($config['page_title'] ?? 'Taxiportalen oversikt'));
    $cssVersion = (string) (@filemtime(__DIR__ . '/index.php.css') ?: time());
    $errorHtml = $error === '' ? '' : '<div class="login-error">' . h($error) . '</div>';

    echo '<!doctype html><html lang="no"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover"><title>' . $pageTitle . ' innlogging</title><link rel="stylesheet" href="index.php.css?v=' . h($cssVersion) . '"></head><body><main><section class="hero login-hero"><div><p class="eyebrow">Taxiportalen</p><h1>' . $pageTitle . '</h1><p class="intro">Logg inn for å opne oversikta.</p></div></section><section class="board-panel login-panel"><form class="login-form" method="post"><input type="hidden" name="action" value="login"><label class="login-label" for="login_password">Passord</label><input class="login-input" id="login_password" name="login_password" type="password" autocomplete="current-password" autofocus required>' . $errorHtml . '<button class="sound-toggle login-button" type="submit">Logg inn</button></form></section></main></body></html>';
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

    if (($upper / max(count($letters), 1)) < 0.85) {
        return $text;
    }

    return mb_convert_case(mb_strtolower($text, 'UTF-8'), MB_CASE_TITLE, 'UTF-8');
}

function normalize_status(string $status): string
{
    $clean = trim($status);
    if ($clean === '') {
        return '-';
    }
    $lower = mb_strtolower($clean, 'UTF-8');
    if ($lower === 'klar for fakturering') {
        return 'Køyrd';
    }
    if ($lower === 'under sending') {
        return 'Sender';
    }
    if ($lower === 'beh. manuelt' || $lower === 'beh manuelt' || $lower === 'behandles manuelt') {
        return 'Manuell';
    }
    return normalize_text($clean);
}

function normalize_field_value(string $field, ?string $value): string
{
    $text = normalize_text($value);
    if ($field === 'status') {
        return normalize_status($text);
    }
    if ($field === 'fra' || $field === 'til') {
        return normalize_location_text($text);
    }
    if ($field === 'egenskap') {
        $lower = mb_strtolower($text, 'UTF-8');
        if (str_contains($lower, 'manuell rullestol')) {
            return 'M-rullestol';
        }
        if (str_contains($lower, 'aleinebil')) {
            return 'Aleinebil';
        }
    }
    if ($field === 'taxi') {
        $compact = mb_strtolower(str_replace('.', '', $text), 'UTF-8');
        if (in_array($compact, ['venter paa bil', 'venter på bil'], true)) {
            return 'Venter';
        }
    }
    if ($field === 'melding_til_bil') {
        return normalize_message_text($text);
    }
    return $text;
}

function normalize_message_text(string $text): string
{
    $clean = trim($text);
    if ($clean === '' || $clean === '-') {
        return $clean === '' ? '-' : $clean;
    }

    $clean = dedupe_phone_numbers_in_message_text($clean);
    $clean = dedupe_obs_segments_in_message($clean);
    $normalized = preg_replace('/\s*([,;|\/])\s*/u', '$1 ', $clean) ?? $clean;
    $normalized = preg_replace('/\s+/u', ' ', $normalized) ?? $normalized;
    $parts = preg_split('/\s*(?:\||;|,)\s*/u', $normalized) ?: [$normalized];

    $uniqueParts = [];
    $seen = [];

    foreach ($parts as $part) {
        $item = trim($part);
        if ($item === '' || $item === '-') {
            continue;
        }

        $item = dedupe_phone_numbers_in_message_part($item);
        $canonical = canonical_message_part($item);
        if ($canonical === '' || isset($seen[$canonical])) {
            continue;
        }

        $seen[$canonical] = true;
        $uniqueParts[] = $item;
    }

    if ($uniqueParts === []) {
        return '-';
    }

    return implode(', ', $uniqueParts);
}

function dedupe_obs_segments_in_message(string $text): string
{
    preg_match_all('/obs\s*[:!.\-]?\s*([^,|;]+(?:\s+[^,|;]+)*)/iu', $text, $matches, PREG_OFFSET_CAPTURE);
    $segments = $matches[0] ?? [];
    if (count($segments) < 2) {
        return $text;
    }

    $seen = [];
    $updated = $text;

    for ($index = count($segments) - 1; $index >= 0; $index--) {
        [$fullMatch, $offset] = $segments[$index];
        $canonical = canonical_message_part((string) $fullMatch);
        if ($canonical === '') {
            continue;
        }
        if (!isset($seen[$canonical])) {
            $seen[$canonical] = true;
            continue;
        }

        $updated = substr_replace($updated, '', (int) $offset, mb_strlen($fullMatch, 'UTF-8'));
    }

    $updated = preg_replace('/\s{2,}/u', ' ', $updated) ?? $updated;
    $updated = preg_replace('/,\s*,/u', ', ', $updated) ?? $updated;
    $updated = preg_replace('/,\s*\./u', '.', $updated) ?? $updated;
    return trim($updated, " \t\n\r\0\x0B,;:-");
}

function dedupe_phone_numbers_in_message_text(string $text): string
{
    $seen = [];
    $updated = preg_replace_callback('/(?:\+?\d[\d\s-]{5,}\d)/u', function (array $matches) use (&$seen): string {
        $phone = $matches[0];
        $canonical = preg_replace('/\D+/u', '', $phone) ?? $phone;
        if ($canonical === '') {
            return $phone;
        }
        if (isset($seen[$canonical])) {
            return '';
        }
        $seen[$canonical] = true;
        return $phone;
    }, $text);

    if ($updated === null) {
        return $text;
    }

    $updated = preg_replace('/\s*,\s*(?=[,.;:])/u', '', $updated) ?? $updated;
    $updated = preg_replace('/(?:\s*,\s*){2,}/u', ', ', $updated) ?? $updated;
    $updated = preg_replace('/\s+,/u', ',', $updated) ?? $updated;
    $updated = preg_replace('/,\s*\./u', '.', $updated) ?? $updated;
    $updated = preg_replace('/\s{2,}/u', ' ', $updated) ?? $updated;
    $updated = preg_replace('/,\s*,/u', ', ', $updated) ?? $updated;

    return trim($updated, " \t\n\r\0\x0B,");
}

function dedupe_phone_numbers_in_message_part(string $text): string
{
    preg_match_all('/(?:\+?\d[\d\s-]{5,}\d)/u', $text, $matches);
    $phones = $matches[0] ?? [];
    if (count($phones) < 2) {
        return $text;
    }

    $unique = [];
    $seen = [];
    foreach ($phones as $phone) {
        $canonical = preg_replace('/\D+/u', '', $phone) ?? $phone;
        if ($canonical === '' || isset($seen[$canonical])) {
            continue;
        }
        $seen[$canonical] = true;
        $unique[] = trim($phone);
    }

    if (count($unique) === count($phones)) {
        return $text;
    }

    $collapsed = preg_replace(
        '/(?:\+?\d[\d\s-]{5,}\d)(?:\s*[\/,;|]\s*(?:\+?\d[\d\s-]{5,}\d))+?/u',
        implode(' / ', $unique),
        $text,
        1
    );

    if ($collapsed !== null && $collapsed !== $text) {
        return trim($collapsed);
    }

    $result = $text;
    $seen = [];
    foreach ($phones as $phone) {
        $canonical = preg_replace('/\D+/u', '', $phone) ?? $phone;
        if (!isset($seen[$canonical])) {
            $seen[$canonical] = true;
            continue;
        }
        $quotedPhone = preg_quote($phone, '/');
        $result = preg_replace('/(?:\s*[\/,;|]?\s*)' . $quotedPhone . '/u', '', $result, 1) ?? $result;
    }

    return trim(preg_replace('/\s{2,}/u', ' ', $result) ?? $result);
}

function canonical_message_part(string $text): string
{
    $canonical = mb_strtolower(trim($text), 'UTF-8');
    $canonical = preg_replace('/[^\p{L}\p{N}]+/u', ' ', $canonical) ?? $canonical;
    return trim($canonical);
}

function normalize_location_text(string $text): string
{
    if (!str_contains($text, '/')) {
        return remove_duplicate_trailing_place($text);
    }

    [$left, $right] = array_map(
        fn(string $part): string => trim($part),
        explode('/', $text, 2)
    );

    if ($left === '' || $right === '') {
        return $text;
    }

    $normalizedLeft = normalize_location_match_key($left);
    $normalizedRight = normalize_location_match_key($right);

    if ($normalizedLeft !== '' && str_starts_with($normalizedRight, $normalizedLeft)) {
        return remove_duplicate_trailing_place(normalize_text($right));
    }

    return remove_duplicate_trailing_place($text);
}

function postcode_from_text(?string $value): string
{
    $text = normalize_spaces((string) $value);
    if ($text === '') {
        return '';
    }

    if (preg_match('/\b(\d{4})\b/u', $text, $matches) === 1) {
        return (string) ($matches[1] ?? '');
    }

    return '';
}

function trip_type_label(array $trip): string
{
    foreach (['fra', 'til'] as $field) {
        $postcode = postcode_from_text((string) ($trip[$field] ?? ''));
        if ($postcode === '') {
            continue;
        }

        if (!isset(LOCAL_POSTCODES[$postcode])) {
            return 'Inter';
        }
    }

    return 'Lokal';
}

function normalize_location_match_key(string $text): string
{
    $text = preg_replace('/\([^)]*\)/u', ' ', $text) ?? $text;
    $text = mb_strtolower($text, 'UTF-8');
    $text = preg_replace('/[^\p{L}\p{N}]+/u', ' ', $text) ?? $text;
    return trim(preg_replace('/\s+/u', ' ', $text) ?? $text);
}

function remove_duplicate_trailing_place(string $text): string
{
    $clean = trim($text);
    if ($clean === '') {
        return $clean;
    }

    $updated = preg_replace('/,\s*([^,]+),\s*\1\s*$/iu', ', $1', $clean);
    $updated = $updated === null ? $clean : trim($updated);
    $updated = remove_local_voss_postcode($updated);
    $updated = remove_local_place_tail($updated);
    return trim(remove_trailing_unit_number($updated));
}

function remove_local_voss_postcode(string $text): string
{
    $clean = trim($text);
    if ($clean === '') {
        return $clean;
    }

    $updated = preg_replace('/,?\s*57\d{2}\b.*$/u', '', $clean);
    return $updated === null ? $clean : rtrim(trim($updated), ',');
}

function remove_local_place_tail(string $text): string
{
    $clean = trim($text);
    if ($clean === '') {
        return $clean;
    }

    $updated = preg_replace('/,\s*(sentrum|voss)\s*$/iu', '', $clean);
    if ($updated === null) {
        return $clean;
    }

    $updated = trim($updated);
    $updated = preg_replace('/,\s*(sentrum|voss)\s*$/iu', '', $updated) ?? $updated;
    return rtrim(trim($updated), ',');
}

function remove_trailing_unit_number(string $text): string
{
    $clean = trim($text);
    if ($clean === '') {
        return $clean;
    }

    $updated = preg_replace('/(\b\d+)\s+\d{1,2}\s*$/u', '$1', $clean);
    return $updated === null ? $clean : trim($updated);
}

function parse_trip_datetime(?string $value): ?DateTime
{
    $raw = trim((string) $value);
    if ($raw === '') {
        return null;
    }

    $parsed = DateTime::createFromFormat('Y-m-d H:i', $raw, app_timezone());
    return $parsed instanceof DateTime ? $parsed : null;
}

function format_date_cell(array $trip): string
{
    return '<span class="date-sticky-label">' . h(get_trip_date_key($trip)) . '</span>';
}

function format_time_cell(?string $value): string
{
    $parsed = parse_trip_datetime($value);
    if (!$parsed instanceof DateTime) {
        $raw = trim((string) $value);
        return $raw === '' ? '-' : h($raw);
    }

    return '<span class="time-only">' . h($parsed->format('H:i')) . '</span>';
}

function format_clock_only(?string $value): string
{
    $raw = trim((string) $value);
    if ($raw === '') {
        return '-';
    }

    if (preg_match('/^\d{2}:\d{2}$/', $raw) === 1) {
        return '<span class="time-only">' . h($raw) . '</span>';
    }

    return '-';
}

function get_trip_utrop_iso(array $trip): string
{
    $parsed = parse_trip_datetime($trip['utrop'] ?? '');
    if (!$parsed instanceof DateTime) {
        return '';
    }

    return $parsed->format(DateTimeInterface::ATOM);
}

function get_trip_utrop_sort_value(array $trip): string
{
    $parsed = parse_trip_datetime($trip['utrop'] ?? '');
    if (!$parsed instanceof DateTime) {
        return '9999-12-31 23:59';
    }

    return $parsed->format('Y-m-d H:i');
}

function get_trip_date_key(array $trip): string
{
    $parsed = parse_trip_datetime($trip['oppmote'] ?? '') ?? parse_trip_datetime($trip['utrop'] ?? '');
    if (!$parsed instanceof DateTime) {
        return '-';
    }

    return $parsed->format('d/m');
}

function is_trip_utrop_highlighted(array $trip, ?DateTimeInterface $now = null): bool
{
    $parsed = parse_trip_datetime($trip['utrop'] ?? '');
    if (!$parsed instanceof DateTime) {
        return false;
    }

    $status = status_slug(normalize_field_value('status', (string) ($trip['status'] ?? '')));
    if (in_array($status, ['koyrd', 'tildelt', 'ferdig', 'klar-for-fakturering', 'ja-svar', 'avbestilt', 'kansellert', 'forsent', 'feil'], true)) {
        return false;
    }

    $currentTime = $now ?? new DateTimeImmutable('now', app_timezone());
    $timestamp = $parsed->getTimestamp();
    $startTime = $timestamp - (2 * 60);
    $endTime = $timestamp + (3 * 60);

    return $currentTime->getTimestamp() >= $startTime && $currentTime->getTimestamp() <= $endTime;
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

function count_today_trips(array $trips): int
{
    $today = (new DateTime('now', app_timezone()))->format('d/m');
    $count = 0;

    foreach ($trips as $trip) {
        if (get_trip_date_key($trip) === $today) {
            $count++;
        }
    }

    return $count;
}

function trip_has_assigned_taxi(array $trip): bool
{
    $taxi = normalize_field_value('taxi', (string) ($trip['taxi'] ?? ''));
    if ($taxi === '-' || $taxi === '') {
        return false;
    }

    if (preg_match('/venter/iu', $taxi) === 1) {
        return false;
    }

    return true;
}

function trip_belongs_in_ongoing(array $trip): bool
{
    $status = status_slug(normalize_field_value('status', (string) ($trip['status'] ?? '')));
    if ($status === 'ja-svar') {
        return true;
    }

    return $status === 'man-sendt' && trip_has_assigned_taxi($trip);
}

function count_active_today_trips(array $trips): int
{
    $today = (new DateTime('now', app_timezone()))->format('d/m');
    $count = 0;

    foreach ($trips as $trip) {
        if (get_trip_date_key($trip) !== $today) {
            continue;
        }

        $status = status_slug(normalize_field_value('status', (string) ($trip['status'] ?? '')));
        if ($status === 'koyrd' || trip_belongs_in_ongoing($trip)) {
            continue;
        }

        $count++;
    }

    return $count;
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

function build_shared_ref_groups(array $trips): array
{
    $groups = [];
    $total = count($trips);

    for ($index = 0; $index < $total; $index++) {
        $ref = trim((string) ($trips[$index]['ref'] ?? ''));
        if ($ref === '') {
            continue;
        }

        $previousRef = $index > 0 ? trim((string) ($trips[$index - 1]['ref'] ?? '')) : '';
        if ($previousRef === $ref) {
            continue;
        }

        $size = 1;
        for ($cursor = $index + 1; $cursor < $total; $cursor++) {
            $nextRef = trim((string) ($trips[$cursor]['ref'] ?? ''));
            if ($nextRef !== $ref) {
                break;
            }
            $size++;
        }

        if ($size < 2) {
            continue;
        }

        for ($offset = 0; $offset < $size; $offset++) {
            $rowIndex = $index + $offset;
            $groups[$rowIndex] = [
                'size' => $size,
                'position' => $offset + 1,
                'is_start' => $offset === 0,
                'is_end' => $offset === ($size - 1),
            ];
        }
    }

    return $groups;
}

function split_trips_by_completion(array $trips): array
{
    $active = [];
    $ongoing = [];
    $finished = [];

    foreach ($trips as $trip) {
        $status = status_slug(normalize_field_value('status', (string) ($trip['status'] ?? '')));
        if ($status === 'koyrd') {
            $finished[] = $trip;
            continue;
        }

        if (trip_belongs_in_ongoing($trip)) {
            $ongoing[] = $trip;
            continue;
        }

        $active[] = $trip;
    }

    return [$active, $ongoing, $finished];
}

function should_render_detail_message(?string $value): bool
{
    $clean = trim((string) $value);
    if ($clean === '' || $clean === '-') {
        return false;
    }

    return mb_strlen($clean, 'UTF-8') > 1;
}

function should_use_fra_instead_of_navn(?string $value): bool
{
    $clean = normalize_field_value('navn', $value);
    if ($clean === '-' || $clean === '') {
        return true;
    }

    return mb_strlen(trim($clean), 'UTF-8') <= 1;
}

function navn_column_value(array $trip): string
{
    if (should_use_fra_instead_of_navn((string) ($trip['navn'] ?? ''))) {
        return normalize_field_value('fra', (string) ($trip['fra'] ?? ''));
    }

    return normalize_field_value('navn', (string) ($trip['navn'] ?? ''));
}

function column_width_ch(array $trips, string $field, int $extra, int $minimum, ?int $maximum = null): int
{
    $longest = 0;
    foreach ($trips as $trip) {
        $rawValue = $field === 'navn' ? navn_column_value($trip) : trim((string) ($trip[$field] ?? ''));
        $length = mb_strlen(trim($rawValue), 'UTF-8');
        if ($length > $longest) {
            $longest = $length;
        }
    }

    $width = max($minimum, $longest + $extra);
    if ($maximum !== null) {
        $width = min($maximum, $width);
    }

    return $width;
}

function trip_dom_key(array $trip): string
{
    $ref = trim((string) ($trip['ref'] ?? ''));
    if ($ref !== '') {
        return 'ref:' . $ref;
    }

    $altTurId = trim((string) ($trip['altturid'] ?? ''));
    if ($altTurId !== '') {
        return 'alt:' . $altTurId;
    }

    return 'row:' . md5(implode('|', [
        (string) ($trip['dato'] ?? ''),
        (string) ($trip['utrop'] ?? ''),
        (string) ($trip['oppmote'] ?? ''),
        (string) ($trip['navn'] ?? ''),
        (string) ($trip['fra'] ?? ''),
        (string) ($trip['til'] ?? ''),
    ]));
}

function render_value(string $field, ?string $value, array $trip = []): string
{
    $status = normalize_field_value('status', (string) ($trip['status'] ?? ''));
    $statusSlug = status_slug($status);
    $useDoneTimePill = $statusSlug === 'koyrd'
        || (in_array($statusSlug, ['tildelt', 'man-sendt'], true) && trip_has_assigned_taxi($trip));
    if ($field === 'dato') {
        return format_date_cell($trip);
    }
    if ($field === 'behandlingstid') {
        $pillClass = $useDoneTimePill ? 'time-pill-koyrd' : 'time-pill-soft';
        return '<span class="time-pill ' . $pillClass . '">' . format_clock_only($value) . '</span>';
    }
    if (in_array($field, DATE_FIELDS, true)) {
        $timeHtml = format_time_cell($value);
        if ($field === 'utrop') {
            $pillClass = $useDoneTimePill ? 'time-pill-koyrd' : 'time-pill-alert';
            return '<span class="time-pill ' . $pillClass . '">' . $timeHtml . '</span>';
        }
        if ($field === 'oppmote') {
            $pillClass = $useDoneTimePill ? 'time-pill-koyrd' : 'time-pill-alert';
            return '<span class="time-pill ' . $pillClass . '">' . $timeHtml . '</span>';
        }
        return $timeHtml;
    }
    if ($field === 'taxi') {
        $taxiText = normalize_field_value('taxi', $value);
        if ($taxiText === '') {
            $taxiText = '-';
        }

        $classes = ['taxi-pill'];
        if ($statusSlug === 'koyrd') {
            $classes[] = 'taxi-pill-done';
        } elseif ($taxiText !== '-' && preg_match('/venter/iu', $taxiText) === 1) {
            $classes[] = 'taxi-pill-wait';
        } elseif ($taxiText !== '-') {
            $classes[] = 'taxi-pill-has-car';
        }

        return '<span class="' . h(implode(' ', $classes)) . '">' . h($taxiText) . '</span>';
    }
    if ($field === 'navn' && $trip !== []) {
        return h(navn_column_value($trip));
    }
    if ($field === 'egenskap') {
        $normalized = normalize_field_value($field, $value);
        $parts = preg_split('/\s*,\s*/u', $normalized) ?: [$normalized];
        $parts = array_values(array_filter(array_map(
            static fn(string $part): string => trim($part),
            $parts
        ), static fn(string $part): bool => $part !== '' && $part !== '-'));

        if ($parts === []) {
            return '-';
        }
        if (count($parts) === 1) {
            return h($parts[0]);
        }

        $htmlParts = array_map(
            static fn(string $part): string => '<span class="egenskap-line">' . h($part) . '</span>',
            $parts
        );
        return '<span class="egenskap-lines">' . implode('', $htmlParts) . '</span>';
    }

    return h(normalize_field_value($field, $value));
}

function column_class(string $field): string
{
    return COLUMN_CLASSES[$field] ?? '';
}

function create_cookie_file(): string
{
    $file = tempnam(sys_get_temp_dir(), 'taxi_board_');
    if ($file === false) {
        throw new RuntimeException('Klarte ikkje opprette cookie-fil.');
    }
    return $file;
}

function request_page(string $url, ?array $postData, string $cookieFile): array
{
    $ch = curl_init($url);
    if ($ch === false) {
        throw new RuntimeException('Klarte ikkje starte cURL.');
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

    $headerSize = (int) curl_getinfo($ch, CURLINFO_HEADER_SIZE);
    $status = (int) curl_getinfo($ch, CURLINFO_RESPONSE_CODE);
    curl_close($ch);

    return [
        'status' => $status,
        'body' => (string) substr($response, $headerSize),
    ];
}

function extract_hidden_fields(string $html): array
{
    $fields = [];
    foreach (['__VIEWSTATE', '__VIEWSTATEGENERATOR', '__EVENTVALIDATION'] as $name) {
        if (!preg_match('/id="' . preg_quote($name, '/') . '"\s+value="([^"]*)"/i', $html, $matches)) {
            throw new RuntimeException('Fant ikkje skjult felt: ' . $name);
        }
        $fields[$name] = html_entity_decode($matches[1], ENT_QUOTES | ENT_HTML5, 'UTF-8');
    }
    $fields['__EVENTTARGET'] = '';
    $fields['__EVENTARGUMENT'] = '';
    return $fields;
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
        throw new RuntimeException('Mangler brukarnamn eller passord i config.php.');
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

function get_board_trips(array $config): array
{
    return with_authenticated_cookie($config, function (string $cookieFile) {
        $page = request_page(TRIP_URL, null, $cookieFile);
        if (!str_contains($page['body'], 'gwTrip')) {
            throw new RuntimeException('Fant ikkje turoversikta etter innlogging.');
        }

        $trips = parse_trip_rows($page['body']);
        $now = new DateTimeImmutable('now', app_timezone());
        $groupSortKeys = build_ref_sort_keys($trips, $now);
        usort($trips, function (array $a, array $b) use ($groupSortKeys, $now): int {
            $refA = trim((string) ($a['ref'] ?? ''));
            $refB = trim((string) ($b['ref'] ?? ''));

            $groupKeyA = $refA !== '' ? ($groupSortKeys[$refA] ?? '') : build_trip_sort_key($a, $now);
            $groupKeyB = $refB !== '' ? ($groupSortKeys[$refB] ?? '') : build_trip_sort_key($b, $now);

            $groupCompare = strcmp($groupKeyA, $groupKeyB);
            if ($groupCompare !== 0) {
                return $groupCompare;
            }

            $refCompare = strcmp($refA, $refB);
            if ($refCompare !== 0) {
                return $refCompare;
            }

            $utropCompare = strcmp((string) ($a['utrop'] ?? ''), (string) ($b['utrop'] ?? ''));
            if ($utropCompare !== 0) {
                return $utropCompare;
            }

            $oppmoteCompare = strcmp((string) ($a['oppmote'] ?? ''), (string) ($b['oppmote'] ?? ''));
            if ($oppmoteCompare !== 0) {
                return $oppmoteCompare;
            }

            return strcmp((string) ($a['navn'] ?? ''), (string) ($b['navn'] ?? ''));
        });
        return $trips;
    });
}

function build_trip_sort_key(array $trip, DateTimeImmutable $now): string
{
    $priority = is_trip_utrop_highlighted($trip, $now) ? '0' : '1';
    return $priority . '|' . get_trip_utrop_sort_value($trip);
}

function build_ref_sort_keys(array $trips, DateTimeImmutable $now): array
{
    $keys = [];

    foreach ($trips as $trip) {
        $ref = trim((string) ($trip['ref'] ?? ''));
        if ($ref === '') {
            continue;
        }

        $candidate = build_trip_sort_key($trip, $now);

        if (!isset($keys[$ref]) || strcmp($candidate, $keys[$ref]) < 0) {
            $keys[$ref] = $candidate;
        }
    }

    return $keys;
}

function status_slug(string $status): string
{
    $clean = mb_strtolower(trim($status), 'UTF-8');
    $clean = strtr($clean, ['æ' => 'ae', 'ø' => 'o', 'å' => 'a']);
    $clean = preg_replace('/[^a-z0-9]+/u', '-', $clean) ?? '';
    $clean = trim($clean, '-');
    return $clean === '' ? 'unknown' : $clean;
}

function status_snapshot(array $trips): string
{
    $snapshot = [];
    foreach ($trips as $trip) {
        $ref = trim((string) ($trip['ref'] ?? ''));
        if ($ref !== '') {
            $snapshot[$ref] = normalize_field_value('status', (string) ($trip['status'] ?? ''));
        }
    }
    return h(json_encode($snapshot, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES) ?: '{}');
}

function render_status_badge(string $status): string
{
    $label = normalize_field_value('status', $status);
    return '<span class="status-pill status-' . h(status_slug($label)) . '">' . h($label) . '</span>';
}

function render_trip_type_badge(array $trip): string
{
    $label = trip_type_label($trip);
    $slug = mb_strtolower($label, 'UTF-8');
    return '<span class="trip-type-badge trip-type-' . h($slug) . '">' . h($label) . '</span>';
}

function render_trip_table(array $trips, DateTimeImmutable $now, bool $isFinishedTable = false, string $emptyMessage = ''): string
{
    if (!$trips) {
        $message = $emptyMessage !== '' ? $emptyMessage : ($isFinishedTable ? 'Ingen ferdige turar enno.' : 'Ingen turar å vise akkurat no.');
        return '<div class="notice">' . h($message) . '</div>';
    }

    $mainFields = array_values(array_filter(
        BOARD_FIELDS,
        static fn(array $fieldConfig): bool => !in_array($fieldConfig[0], ['fra', 'til', 'melding_til_bil'], true)
    ));
    $detailColspan = count($mainFields) - 1;
    $dateRowspans = build_date_rowspans($trips);
    $refCounts = build_ref_counts($trips);
    $sharedRefGroups = build_shared_ref_groups($trips);
    $tableClass = $isFinishedTable ? 'board-table board-table-finished' : 'board-table';
    $nameWidth = column_width_ch($trips, 'navn', 10, 18, 42);
    $fraWidth = column_width_ch($trips, 'fra', 4, 18, 36);
    $taxiWidth = 11;
    $html = '<div class="table-shell" style="' . h('--col-navn-width:' . $nameWidth . 'ch; --taxi-pill-width:' . $taxiWidth . 'ch;') . '" data-col-width-name="' . h((string) $nameWidth) . '" data-col-width-fra="' . h((string) $fraWidth) . '" data-status-snapshot="' . status_snapshot($trips) . '"><table class="' . $tableClass . '"><thead><tr>';

    foreach ($mainFields as [$field, $label]) {
        $attrs = ' class="' . h(column_class($field)) . '"';
        if ($field === 'navn') {
            $attrs .= ' data-last-column-header="true"';
        }
        $html .= '<th' . $attrs . '>' . h($label) . '</th>';
    }

    $html .= '</tr></thead><tbody>';
    foreach ($trips as $index => $trip) {
        $rowStatus = status_slug(normalize_field_value('status', (string) ($trip['status'] ?? '')));
        $ref = trim((string) ($trip['ref'] ?? ''));
        $hasSharedRef = $ref !== '' && (($refCounts[$ref] ?? 0) > 1);
        $sharedRefGroup = $sharedRefGroups[$index] ?? null;
        $rowClasses = ['row-status-' . $rowStatus];
        if (isset($dateRowspans[$index])) {
            $rowClasses[] = 'date-group-start';
        }
        if ($hasSharedRef) {
            $rowClasses[] = 'row-shared-ref';
            if (($sharedRefGroup['is_start'] ?? false) === true) {
                $rowClasses[] = 'row-shared-ref-start';
            }
            if (($sharedRefGroup['is_end'] ?? false) === true) {
                $rowClasses[] = 'row-shared-ref-end';
            }
        }
        if (!$isFinishedTable && is_trip_utrop_highlighted($trip, $now)) {
            $rowClasses[] = 'row-utrop-soon';
        }
        $utropIso = get_trip_utrop_iso($trip);
        $tripKey = trip_dom_key($trip);
        $hasMessage = should_render_detail_message($trip['melding_til_bil'] ?? '');
        $hasAssignedTaxi = trip_has_assigned_taxi($trip);
        $rowAttrs = ' class="' . h(implode(' ', $rowClasses)) . '"';
        if (!$isFinishedTable && $utropIso !== '') {
            $rowAttrs .= ' data-utrop-at="' . h($utropIso) . '"';
        }
        $rowAttrs .= ' data-has-assigned-taxi="' . ($hasAssignedTaxi ? 'true' : 'false') . '"';
        $rowAttrs .= ' data-trip-key="' . h($tripKey) . '"';

        $html .= '<tr' . $rowAttrs . '>';
        foreach ($mainFields as [$field]) {
            if ($field === 'dato' && !isset($dateRowspans[$index])) {
                continue;
            }
            $attrs = ' class="' . h(column_class($field)) . '"';
            if ($field === 'dato' && isset($dateRowspans[$index])) {
                $attrs .= ' rowspan="' . ($dateRowspans[$index] * 2) . '"';
            }
            $html .= '<td' . $attrs . '>';
            if ($field === 'status') {
                $html .= render_status_badge((string) ($trip[$field] ?? ''));
            } elseif ($field === 'type') {
                $html .= render_trip_type_badge($trip);
            } elseif ($field === 'navn') {
                $html .= '<span class="last-column-value" data-last-column="name">' . render_value('navn', $trip['navn'] ?? '', $trip) . '</span>';
                $html .= '<span class="last-column-value is-hidden" data-last-column="fra">' . render_value('fra', $trip['fra'] ?? '', $trip) . '</span>';
                if ($hasMessage) {
                    $html .= '<button class="message-toggle" type="button" data-message-toggle="true" aria-expanded="false" aria-label="Vis melding til bil">Melding</button>';
                }
            } else {
                $html .= render_value($field, $trip[$field] ?? '', $trip);
            }
            if ($field === 'rekvirent' && $hasSharedRef) {
                $html .= '<span class="shared-ref-badge">Samkøyring</span>';
            }
            $html .= '</td>';
        }
        $html .= '</tr>';
        $detailRowClasses = ['board-detail-row', 'row-status-' . $rowStatus];
        if ($hasSharedRef) {
            $detailRowClasses[] = 'row-shared-ref';
            if (($sharedRefGroup['is_start'] ?? false) === true) {
                $detailRowClasses[] = 'row-shared-ref-start';
            }
            if (($sharedRefGroup['is_end'] ?? false) === true) {
                $detailRowClasses[] = 'row-shared-ref-end';
            }
        }
        $detailRowClass = implode(' ', $detailRowClasses);
        $html .= '<tr class="' . h($detailRowClass) . '" data-trip-key="' . h($tripKey) . '" data-detail-fra="' . h(normalize_field_value('fra', (string) ($trip['fra'] ?? ''))) . '" data-detail-til="' . h(normalize_field_value('til', (string) ($trip['til'] ?? ''))) . '" data-detail-navn="' . h(normalize_field_value('navn', (string) ($trip['navn'] ?? ''))) . '">';
        $html .= '<td class="board-detail-cell" colspan="' . $detailColspan . '">';
        $html .= '<div class="board-detail-grid">';
        $html .= '<div class="board-detail-item" data-detail-slot="a"><span class="board-detail-label">Frå</span><span class="board-detail-value">' . render_value('fra', $trip['fra'] ?? '', $trip) . '</span></div>';
        $html .= '<div class="board-detail-item" data-detail-slot="b"><span class="board-detail-label">Til</span><span class="board-detail-value">' . render_value('til', $trip['til'] ?? '', $trip) . '</span></div>';
        if ($hasMessage) {
            $html .= '<div class="board-detail-item board-detail-item-wide board-detail-message" data-detail-message="true"><span class="board-detail-label">Melding</span><span class="board-detail-value">' . render_value('melding_til_bil', $trip['melding_til_bil'] ?? '', $trip) . '</span></div>';
        }
        $html .= '</div>';
        $html .= '</td>';
        $html .= '</tr>';
    }

    $html .= '</tbody></table></div>';
    return $html;
}

function render_layout(array $config, string $body, int $count): void
{
    $pageTitle = h((string) ($config['page_title'] ?? 'Taxiportalen oversikt'));
    $refresh = (int) ($config['refresh_seconds'] ?? 20);
    $timestamp = h(date('d/m - H:i:s'));
    $cssVersion = (string) (@filemtime(__DIR__ . '/index.php.css') ?: time());
    $jsVersion = (string) (@filemtime(__DIR__ . '/index.php.js') ?: time());
    echo '<!doctype html><html lang="no"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover"><title>' . $pageTitle . '</title><link rel="stylesheet" href="index.php.css?v=' . h($cssVersion) . '"></head><body data-refresh-default="' . $refresh . '" data-sender-sound="send.mp3" data-forsent-sound="alarm2.mp3" data-forsent-sound-fallback="forsent.mp3"><main><section class="hero"><div class="hero-top"><div><p class="eyebrow">Taxiportalen</p><h1>' . $pageTitle . '</h1><p class="intro">Ny oversikt over turar frå taxiportalen.</p></div></div><div class="meta"><div class="meta-chip">Total treff: ' . $count . '</div><div class="meta-chip">Oppdatert: ' . $timestamp . '</div><label class="meta-chip refresh-chip" for="refresh-seconds">Autooppdatering <select id="refresh-seconds"><option value="5">5 sek</option><option value="30">30 sek</option><option value="15">15 sek</option><option value="20">20 sek</option><option value="30">30 sek</option></select></label><button class="meta-chip meta-button" id="theme-toggle" type="button">Tema: Mørkt</button><button class="meta-chip meta-button" id="sound-toggle" type="button">Lyd: På</button><label class="meta-chip volume-chip" for="sound-volume"><span>Volum</span><input id="sound-volume" type="range" min="1" max="10" step="1" value="7"><strong id="sound-volume-value">7</strong></label><form class="inline-form" method="post"><input type="hidden" name="action" value="logout"><button class="meta-chip meta-button" type="submit">Logg ut</button></form></div></section>';
    echo $body;
    echo '</main><script src="index.php.js?v=' . h($jsVersion) . '"></script></body></html>';
}

function render_board(array $config): void
{
    try {
        $trips = get_board_trips($config);
        [$activeTrips, $ongoingTrips, $finishedTrips] = split_trips_by_completion($trips);
        $now = new DateTimeImmutable('now', app_timezone());
        $body = '<section class="board-panel"><div class="board-top"><div><h2>Turar</h2></div><div class="legend"><span class="legend-label">Status:</span><span class="legend-chip legend-active">Aktiv</span><span class="legend-chip legend-wait">Venter</span><span class="legend-chip legend-done">Ferdig</span><span class="legend-chip legend-utrop">Utrop</span></div></div>';
        $body .= '<div class="board-tabs">';
        $body .= '<div class="board-tab-group" role="tablist" aria-label="Turoversikt">';
        $body .= '<button class="board-tab is-active" type="button" data-board-tab="active" aria-selected="true">Aktive idag <span class="board-tab-count">' . count_active_today_trips($trips) . '</span></button>';
        $body .= '<button class="board-tab" type="button" data-board-tab="ongoing" aria-selected="false">Pågåande <span class="board-tab-count">' . count($ongoingTrips) . '</span></button>';
        $body .= '<button class="board-tab" type="button" data-board-tab="finished" aria-selected="false">Ferdige <span class="board-tab-count">' . count($finishedTrips) . '</span></button>';
        $body .= '</div>';
        $body .= '<div class="board-view-group" role="tablist" aria-label="Visning">';
        $body .= '<button class="board-tab board-view-tab" type="button" data-board-view="compact" aria-selected="false">Kompakt</button>';
        $body .= '<button class="board-tab board-view-tab is-active" type="button" data-board-view="full" aria-selected="true">Full</button>';
        $body .= '</div>';
        $body .= '<div class="board-column-group" role="tablist" aria-label="Siste kolonne">';
        $body .= '<button class="board-tab board-column-tab is-active" type="button" data-last-column-mode="name" aria-selected="true">Navn</button>';
        $body .= '<button class="board-tab board-column-tab" type="button" data-last-column-mode="fra" aria-selected="false">Frå</button>';
        $body .= '</div>';
        $body .= '</div>';
        $body .= '<div class="board-tab-panel is-active" data-board-panel="active">';
        $body .= render_trip_table($activeTrips, $now, false);
        $body .= '</div>';
        $body .= '<div class="board-tab-panel" data-board-panel="ongoing">';
        $body .= render_trip_table($ongoingTrips, $now, false, 'Ingen pågåande turar akkurat no.');
        $body .= '</div>';
        $body .= '<div class="board-tab-panel" data-board-panel="finished">';
        $body .= render_trip_table($finishedTrips, $now, true);
        $body .= '</div>';
        $body .= '</section>';
        render_layout($config, $body, count_today_trips($trips));
    } catch (Throwable $e) {
        $body = '<section class="board-panel"><div class="error">' . h($e->getMessage()) . '</div></section>';
        render_layout($config, $body, 0);
    }
}

if (($_GET['action'] ?? '') === 'health') {
    header('Content-Type: text/plain; charset=utf-8');
    echo 'ok';
    exit;
}

$config = load_config();
if (($_POST['action'] ?? '') === 'logout') {
    handle_logout();
}
require_login($config);
render_board($config);


