@echo off
echo ========================================
echo  FIX DATABASE - Drop and Recreate
echo ========================================
echo.

cd backend

echo [1/2] Dropping all tables completely...
php artisan db:wipe

echo.
echo [2/2] Running all migrations...
php artisan migrate

echo.
echo [3/3] Seeding admin user...
php artisan db:seed --class=AdminSeeder

echo.
echo ========================================
echo  DATABASE FIX COMPLETE!
echo ========================================
echo.
echo Admin credentials:
echo Email: admin@visual.com
echo Password: admin123
echo.
echo Now start the backend server:
echo   php artisan serve
echo.
pause
