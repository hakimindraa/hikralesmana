# Quick Start Guide

## Langkah-langkah Menjalankan Aplikasi

### 1. Pastikan Prerequisites
- ✅ WAMP/XAMPP sudah terinstall dan running
- ✅ Node.js sudah terinstall
- ✅ Composer sudah terinstall

### 2. Setup Database
1. Buka phpMyAdmin: http://localhost/phpmyadmin
2. Buat database baru: `portofolio`
3. Atau jalankan SQL:
   ```sql
   CREATE DATABASE portofolio;
   ```

### 3. Setup Backend (Laravel)

**Cara Cepat:**
```bash
# Double click file ini:
setup-backend.bat
```

**Atau Manual:**
```bash
cd backend
composer install
copy .env.example .env
php artisan key:generate
php artisan migrate
php artisan db:seed --class=AdminSeeder
```

### 4. Setup Frontend (Next.js)

**Cara Cepat:**
```bash
# Double click file ini:
setup-frontend.bat
```

**Atau Manual:**
```bash
cd frontend
npm install
```

Buat file `frontend/.env.local`:
```
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

### 5. Jalankan Aplikasi

**Terminal 1 - Backend:**
```bash
# Double click: start-backend.bat
# Atau:
cd backend
php artisan serve
```
Server akan berjalan di: http://localhost:8000

**Terminal 2 - Frontend:**
```bash
# Double click: start-frontend.bat
# Atau:
cd frontend
npm run dev
```
Server akan berjalan di: http://localhost:3000

### 6. Akses Aplikasi

**Portfolio (Public):**
- URL: http://localhost:3000
- Halaman utama portfolio

**Admin Panel:**
- URL: http://localhost:3000/admin/login
- Email: `admin@visual.com`
- Password: `admin123`

### 7. Test API (Optional)

Buka browser dan akses:
```
http://localhost:8000/api/projects
http://localhost:8000/api/skills
http://localhost:8000/api/testimonials
```

Harus return JSON (bisa array kosong jika belum ada data).

## Troubleshooting

### Login Gagal?

1. **Cek Laravel server running:**
   - Buka http://localhost:8000
   - Harus muncul halaman Laravel

2. **Cek Browser Console (F12):**
   - Lihat tab Console
   - Cek error message detail

3. **Cek .env.local:**
   - File harus ada di folder `frontend/`
   - Isi: `NEXT_PUBLIC_API_URL=http://localhost:8000/api`

4. **Reset Admin User:**
   ```bash
   cd backend
   php artisan db:seed --class=AdminSeeder
   ```

### Database Error?

1. **Pastikan WAMP/MySQL running**
   - Ikon WAMP harus hijau
   - Atau start MySQL service

2. **Cek koneksi database:**
   ```bash
   cd backend
   php artisan migrate:status
   ```

3. **Reset database:**
   ```bash
   cd backend
   php artisan migrate:fresh
   php artisan db:seed --class=AdminSeeder
   ```

## Struktur URL

```
Portfolio:
├── http://localhost:3000/              → Homepage
├── http://localhost:3000/#about        → About Section
├── http://localhost:3000/#projects     → Projects Section
├── http://localhost:3000/#skills       → Skills Section
├── http://localhost:3000/#contact      → Contact Section
│
Admin Panel:
├── http://localhost:3000/admin/login          → Login Page
├── http://localhost:3000/admin/dashboard      → Dashboard
├── http://localhost:3000/admin/projects       → Manage Projects
├── http://localhost:3000/admin/skills         → Manage Skills
└── http://localhost:3000/admin/testimonials   → Manage Testimonials
```

## Tips

1. **Selalu jalankan kedua server** (backend dan frontend)
2. **Jangan tutup terminal** saat server berjalan
3. **Restart server** setelah mengubah .env
4. **Clear browser cache** jika ada masalah tampilan
5. **Cek console** untuk debug error

## Next Steps

Setelah login berhasil:
1. Tambah projects dari admin panel
2. Tambah skills
3. Tambah testimonials
4. Lihat perubahan di homepage portfolio

Selamat menggunakan! 🎉
