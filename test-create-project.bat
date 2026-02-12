@echo off
echo Testing Create Project API...
echo.

curl -X POST http://localhost:8000/api/admin/projects ^
  -H "Content-Type: application/json" ^
  -d "{\"title\":\"Test Project\",\"description\":\"Test description\",\"image\":\"https://images.unsplash.com/photo-1542038784456-1ea8e935640e\",\"category\":\"Photography\",\"client\":\"Test Client\",\"date\":\"2024-02-12\"}"

echo.
echo.
echo Done! Check the response above.
pause
