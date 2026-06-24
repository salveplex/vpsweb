<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=UTF-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['ok' => false, 'error' => 'Kun POST er tillatt.']);
    exit;
}

$payload = json_decode(file_get_contents('php://input') ?: '', true);
if (!is_array($payload)) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'Ugyldig JSON.']);
    exit;
}

$group1 = normalize_group($payload['group1'] ?? null);
$group2 = normalize_group($payload['group2'] ?? null);
$properties = normalize_properties($payload['properties'] ?? null);

write_locked_file(
    __DIR__ . DIRECTORY_SEPARATOR . 'skift.txt',
    "  const GROUP1 = [" . implode(',', $group1) . "];\n"
    . "  const GROUP2 = [" . implode(',', $group2) . "];\n"
);

write_locked_file(
    __DIR__ . DIRECTORY_SEPARATOR . 'egenskaper.json',
    json_encode($properties, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES) . "\n"
);

echo json_encode(['ok' => true]);

function write_locked_file(string $filePath, string $content): void
{
    $handle = @fopen($filePath, 'c+b');
    if (!$handle) {
        throw_error('Kunne ikke apne fil for lagring.');
    }

    $saved = false;
    if (flock($handle, LOCK_EX)) {
        ftruncate($handle, 0);
        rewind($handle);
        $saved = fwrite($handle, $content) !== false;
        fflush($handle);
        flock($handle, LOCK_UN);
    }

    fclose($handle);

    if (!$saved) {
        throw_error('Kunne ikke skrive fil.');
    }
}

function normalize_group(mixed $values): array
{
    if (!is_array($values)) {
        throw_error('Mangler skift-data.');
    }

    $cleaned = [];
    foreach ($values as $value) {
        if (!is_string($value)) {
            throw_error('Ugyldig loyveformat.');
        }

        $entry = trim($value);
        if ($entry === '') {
            continue;
        }

        if (preg_match('/[,;\\[\\]{}]/', $entry)) {
            throw_error('Ugyldige tegn i loyve.');
        }

        if (!preg_match('/^[A-Za-z0-9()\\- ]+$/', $entry)) {
            throw_error('Kun bokstaver, tall, mellomrom, parentes og bindestrek er tillatt.');
        }

        $cleaned[] = $entry;
    }

    return $cleaned;
}

function normalize_properties(mixed $values): array
{
    if (!is_array($values)) {
        throw_error('Mangler egenskaper.');
    }

    $cleaned = [];
    foreach ($values as $value) {
        if (!is_string($value)) {
            throw_error('Ugyldig egenskap.');
        }

        $entry = trim($value);
        if ($entry === '') {
            continue;
        }

        if (!preg_match('/^[A-Za-z0-9()\\- ]+$/', $entry)) {
            throw_error('Ugyldige tegn i egenskap.');
        }

        $upper = strtoupper($entry);
        if (in_array($upper, array_map('strtoupper', $cleaned), true)) {
            throw_error('Egenskaper ma vaere unike.');
        }

        $cleaned[] = $entry;
    }

    if (!$cleaned) {
        throw_error('Det ma finnes minst en egenskap.');
    }

    return $cleaned;
}

function throw_error(string $message): never
{
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => $message]);
    exit;
}
