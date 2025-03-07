# PowerShell script to run the development server
# File: scripts/run-dev.ps1

Write-Host "Starting SingRank development server..." -ForegroundColor Green

# Ensure we're in the project directory
Set-Location $PSScriptRoot\..

# Kill any existing processes on port 3000 (common issue)
$processes = netstat -ano | Select-String ":3000" | ForEach-Object { ($_ -split "\s+")[5] } | Where-Object { $_ -match '^\d+$' } | Select-Object -Unique
if ($processes) {
    Write-Host "Found processes using port 3000. Attempting to kill them..." -ForegroundColor Yellow
    foreach ($process in $processes) {
        try {
            Stop-Process -Id $process -Force -ErrorAction SilentlyContinue
            Write-Host "Killed process with ID: $process" -ForegroundColor Cyan
        } catch {
            Write-Host "Failed to kill process with ID: $process" -ForegroundColor Red
        }
    }
}

# Clean the .next directory first
Write-Host "Cleaning .next directory..." -ForegroundColor Cyan
npm run clean

# Start the development server
Write-Host "Starting Next.js development server..." -ForegroundColor Green
npm run dev 