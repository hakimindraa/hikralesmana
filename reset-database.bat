@echo off
echo ========================================
echo  RESET DATABASE - Portfolio
echo ========================================
echo.
echo WARNING: This will delete all data!
echo Press Ctrl+C to cancel, or
pause

cd backend

echo.
echo [1/3] Dropping all tables...
php artisan migrate:fresh

echo.
echo [2/3] Running migrations...
php artisan migrate

echo.
echo [3/3] Seeding admin user...
php artisan db:seed --class=AdminSeeder

echo.
echo ========================================
echo  DATABASE RESET COMPLETE!
echo ========================================
echo.
echo Admin credentials:
echo Email: admin@visual.com
echo Password: admin123
echo.
pause
