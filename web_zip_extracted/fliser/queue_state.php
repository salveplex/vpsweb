<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=UTF-8');
header('Cache-Control: no-store, no-cache, must-revalidate, max-age=0');
header('Pragma: no-cache');
header('Expires: 0');

$stateFile = __DIR__ . DIRECTORY_SEPARATOR . 'queue_state.json';

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (!is_file($stateFile)) {
        echo json_encode([
            'ok' => true,
            'state' => [
                'queue' => [],
                'statuses' => new stdClass(),
                'savedAt' => 0,
            ],
        ]);
        exit;
    }

    $raw = file_get_contents($stateFile);
    if ($raw === false) {
        http_response_code(500);
        echo json_encode(['ok' => false, 'error' => 'Kunne ikke lese lagret ko.']);
        exit;
    }

    $decoded = json_decode($raw, true);
    if (!is_array($decoded)) {
        $decoded = ['queue' => [], 'statuses' => []];
    }

    echo json_encode([
        'ok' => true,
        'state' => [
            'queue' => normalize_queue($decoded['queue'] ?? []),
            'statuses' => normalize_statuses($decoded['statuses'] ?? []),
            'savedAt' => normalize_saved_at($decoded['savedAt'] ?? 0),
        ],
    ]);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['ok' => false, 'error' => 'Kun GET og POST er tillatt.']);
    exit;
}

$rawInput = file_get_contents('php://input') ?: '';
$payload = json_decode($rawInput, true);
if (!is_array($payload)) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'Ugyldig JSON.']);
    exit;
}

$queue = normalize_queue($payload['queue'] ?? []);
$statuses = normalize_statuses($payload['statuses'] ?? []);
$savedAt = normalize_saved_at($payload['savedAt'] ?? 0);
$currentSavedAt = read_current_saved_at($stateFile);

if ($savedAt > 0 && $currentSavedAt > $savedAt) {
    echo json_encode([
        'ok' => true,
        'ignored' => true,
        'savedAt' => $currentSavedAt,
    ]);
    exit;
}

$json = json_encode(
    [
        'queue' => $queue,
        'statuses' => $statuses,
        'savedAt' => $savedAt > 0 ? $savedAt : (int) floor(microtime(true) * 1000),
    ],
    JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES
);

if (!is_string($json)) {
    http_response_code(500);
    echo json_encode(['ok' => false, 'error' => 'Kunne ikke serialisere state.']);
    exit;
}

write_locked_file($stateFile, $json . "\n");
echo json_encode(['ok' => true]);

function normalize_queue(mixed $values): array
{
    if (!is_array($values)) {
        return [];
    }

    $cleaned = [];
    foreach ($values as $value) {
        if (!is_string($value) && !is_numeric($value)) {
            continue;
        }

        $entry = trim((string) $value);
        if ($entry === '') {
            continue;
        }

        $cleaned[] = $entry;
    }

    return array_values($cleaned);
}

function normalize_statuses(mixed $values): array
{
    if (!is_array($values)) {
        return [];
    }

    $allowed = ['ready', 'battery', 'train'];
    $cleaned = [];

    foreach ($values as $key => $value) {
        if (!is_string($key) && !is_numeric($key)) {
            continue;
        }

        $entryKey = trim((string) $key);
        $entryValue = is_string($value) ? trim($value) : '';
        if ($entryKey === '' || !in_array($entryValue, $allowed, true)) {
            continue;
        }

        $cleaned[$entryKey] = $entryValue;
    }

    return $cleaned;
}

function normalize_saved_at(mixed $value): int
{
    if (is_numeric($value)) {
        $normalized = (int) $value;
        return max(0, $normalized);
    }

    return 0;
}

function read_current_saved_at(string $filePath): int
{
    if (!is_file($filePath)) {
        return 0;
    }

    $raw = file_get_contents($filePath);
    if ($raw === false) {
        return 0;
    }

    $decoded = json_decode($raw, true);
    if (!is_array($decoded)) {
        return 0;
    }

    return normalize_saved_at($decoded['savedAt'] ?? 0);
}

function write_locked_file(string $filePath, string $content): void
{
    $handle = @fopen($filePath, 'c+b');
    if (!$handle) {
        http_response_code(500);
        echo json_encode(['ok' => false, 'error' => 'Kunne ikke apne state-fil.']);
        exit;
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
        http_response_code(500);
        echo json_encode(['ok' => false, 'error' => 'Kunne ikke skrive state-fil.']);
        exit;
    }
}
