@echo off
echo Starting Portfolio Development Servers...
start "Laravel Backend" cmd /k "cd backend && php artisan serve"
timeout /t 3
start "Next.js Frontend" cmd /k "cd frontend && npm run dev"
echo.
echo Servers started!
echo Backend: http://localhost:8000
echo Frontend: http://localhost:3000
