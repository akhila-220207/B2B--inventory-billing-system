@echo off
color 0A
echo ==================================================
echo         INVENTA B2B SYSTEM - UNIFIED START
echo ==================================================
echo.

echo [*] Cleaning up old processes to free ports 3000 and 5000...
powershell -Command "Get-Process node -ErrorAction SilentlyContinue | Stop-Process -Force"

echo.
echo [*] Starting both Frontend and Backend together...
echo.
npm run dev

pause
