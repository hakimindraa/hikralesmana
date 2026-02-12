@echo off
echo Testing Laravel API...
echo.
echo 1. Testing API Root:
curl http://localhost:8000/api/projects
echo.
echo.
echo 2. Testing Admin Login:
curl -X POST http://localhost:8000/api/admin/login -H "Content-Type: application/json" -d "{\"email\":\"admin@visual.com\",\"password\":\"admin123\"}"
echo.
echo.
pause
