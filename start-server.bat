@echo off
echo ================================
echo   NOIR ATELIER TRAVEL - Local Server
echo ================================
echo.
echo Open in browser (PC):
echo   http://localhost:8080
echo.
echo Open on phone (same WiFi):
echo   http://10.10.10.215:8080
echo.
echo Keep this window open while using the site.
echo Close this window to stop the server.
echo.
cd /d "%~dp0"
python -m http.server 8080 --bind 0.0.0.0
pause
