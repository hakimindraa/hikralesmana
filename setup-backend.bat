@echo off
echo Setting up Laravel Backend...
cd backend
composer install
copy .env.example .env
php artisan key:generate
echo.
echo Setup selesai!
echo Jangan lupa:
echo 1. Edit backend/.env untuk database config
echo 2. Buat database 'portfolio' di MySQL
echo 3. Jalankan: php artisan migrate
echo 4. Jalankan: php artisan serve
pause
