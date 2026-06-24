param(
    [int]$Port = 8080
)

$ErrorActionPreference = 'Stop'

$projectRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
$phpPath = 'C:\xampp\php\php.exe'

if (-not (Test-Path -LiteralPath $phpPath)) {
    throw "Fant ikke PHP på $phpPath"
}

$existing = Get-CimInstance Win32_Process |
    Where-Object {
        $_.Name -eq 'php.exe' -and
        $_.CommandLine -like "* -S localhost:$Port*" -and
        $_.CommandLine -like "*$projectRoot*"
    } |
    Select-Object -First 1

if (-not $existing) {
    Start-Process -FilePath $phpPath `
        -ArgumentList '-S', "localhost:$Port", '-t', $projectRoot `
        -WorkingDirectory $projectRoot `
        -WindowStyle Hidden

    Start-Sleep -Seconds 2
}

$url = "http://localhost:$Port/"

try {
    $response = Invoke-WebRequest -Uri $url -UseBasicParsing -TimeoutSec 10
    if ($response.StatusCode -ne 200) {
        throw "Server svarte med HTTP $($response.StatusCode)"
    }
} catch {
    throw "Klarte ikke å starte lokal server på $url. $($_.Exception.Message)"
}

Write-Host "Taxiportalen-board kjører på $url"
