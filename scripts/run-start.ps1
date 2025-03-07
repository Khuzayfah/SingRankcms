# PowerShell script to run the production server
# File: scripts/run-start.ps1

param(
    [int]$Port = 3000  # Default port is 3000, but can be overridden
)

Write-Host "Starting SingRank production server on port $Port..." -ForegroundColor Green

# Ensure we're in the project directory
Set-Location $PSScriptRoot\..

# Kill any existing processes on the specified port
$processes = netstat -ano | Select-String ":$Port" | ForEach-Object { ($_ -split "\s+")[5] } | Where-Object { $_ -match '^\d+$' } | Select-Object -Unique
if ($processes) {
    Write-Host "Found processes using port $Port. Attempting to kill them..." -ForegroundColor Yellow
    foreach ($process in $processes) {
        try {
            Stop-Process -Id $process -Force -ErrorAction SilentlyContinue
            Write-Host "Killed process with ID: $process" -ForegroundColor Cyan
        } catch {
            Write-Host "Failed to kill process with ID: $process" -ForegroundColor Red
        }
    }
}

# Start the production server with the specified port
Write-Host "Starting Next.js production server on port $Port..." -ForegroundColor Green
npx next start -p $Port 