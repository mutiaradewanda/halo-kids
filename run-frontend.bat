@echo off
title HaloKids Frontend Server
cd /d "%~dp0frontend"
echo ==============================================
echo Menjalankan Frontend HaloKids (Vite/Port 5173)
echo ==============================================
npm run dev
pause
