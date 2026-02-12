# Troubleshooting Guide

## Admin Login Issues

### Error: "Login failed"

**Kemungkinan Penyebab:**

1. **Laravel server tidak berjalan**
   - Solusi: Jalankan `start-backend.bat` atau `cd backend && php artisan serve`
   - Pastikan server berjalan di http://localhost:8000

2. **Database tidak terkoneksi**
   - Cek file `backend/.env`
   - Pastikan WAMP/MySQL sudah running
   - Pastikan database `portofolio` sudah dibuat
   - Test koneksi: `cd backend && php artisan migrate:status`

3. **Admin user belum di-seed**
   - Jalankan: `cd backend && php artisan db:seed --class=AdminSeeder`
   - Kredensial default:
     - Email: admin@visual.com
     - Password: admin123

4. **CORS Error**
   - Pastikan `backend/config/cors.php` sudah di-update
   - Pastikan `FRONTEND_URL=http://localhost:3000` ada di `backend/.env`
   - Restart Laravel server setelah perubahan

5. **API URL tidak benar**
   - Cek file `frontend/.env.local`
   - Pastikan: `NEXT_PUBLIC_API_URL=http://localhost:8000/api`
   - Restart Next.js server setelah perubahan

### Cara Test Manual

1. **Test Laravel API:**
```bash
# Buka browser dan akses:
http://localhost:8000/api/projects
# Harus return JSON (bisa kosong array)
```

2. **Test Login API dengan Postman/Browser Console:**
```javascript
fetch('http://localhost:8000/api/admin/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'admin@visual.com',
    password: 'admin123'
  })
})
.then(r => r.json())
.then(console.log)
```

3. **Cek Browser Console:**
   - Buka Developer Tools (F12)
   - Tab Console
   - Lihat error message detail saat login

## Database Issues

### Error: "SQLSTATE[HY000] [1049] Unknown database"

**Solusi:**
1. Buka phpMyAdmin (http://localhost/phpmyadmin)
2. Buat database baru bernama `portofolio`
3. Atau jalankan SQL: `CREATE DATABASE portofolio;`
4. Jalankan migrations: `cd backend && php artisan migrate`

### Error: "SQLSTATE[HY000] [2002] No connection"

**Solusi:**
1. Pastikan WAMP/MySQL sudah running
2. Cek ikon WAMP di system tray (harus hijau)
3. Cek `backend/.env`:
   ```
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_USERNAME=root
   DB_PASSWORD=
   ```

## Frontend Issues

### Error: "Cannot find module" atau Import Error

**Solusi:**
```bash
cd frontend
rm -rf node_modules
rm package-lock.json
npm install
```

### Port 3000 sudah digunakan

**Solusi:**
```bash
# Gunakan port lain
cd frontend
npm run dev -- -p 3001
```

Jangan lupa update `backend/.env`:
```
FRONTEND_URL=http://localhost:3001
```

## Quick Reset

Jika semua tidak berfungsi, reset dari awal:

```bash
# Backend
cd backend
composer install
copy .env.example .env
php artisan key:generate
# Edit .env untuk database
php artisan migrate:fresh
php artisan db:seed --class=AdminSeeder

# Frontend
cd frontend
npm install
# Buat .env.local dengan NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

## Checklist Sebelum Login

- [ ] WAMP/MySQL running (ikon hijau)
- [ ] Database `portofolio` sudah dibuat
- [ ] Laravel server running di http://localhost:8000
- [ ] Next.js server running di http://localhost:3000
- [ ] File `backend/.env` sudah dikonfigurasi
- [ ] File `frontend/.env.local` sudah dibuat
- [ ] Migrations sudah dijalankan
- [ ] Admin user sudah di-seed
- [ ] Browser console tidak ada CORS error

## Kontak

Jika masih ada masalah, cek:
1. Browser console (F12) untuk error detail
2. Laravel logs di `backend/storage/logs/laravel.log`
3. Terminal output dari kedua server
