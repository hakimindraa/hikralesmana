# 🚀 START HERE - Cara Menjalankan Aplikasi

## ⚠️ PENTING - Baca Ini Dulu!

Error "route api/admin/login could not be found" sudah DIPERBAIKI!

## 📋 Langkah-langkah (HARUS URUT!)

### 1️⃣ Pastikan WAMP/MySQL Running
- Buka WAMP
- Pastikan ikon WAMP di system tray berwarna HIJAU
- Jika merah/orange, klik dan pilih "Start All Services"

### 2️⃣ Pastikan Database Sudah Ada
- Buka browser: http://localhost/phpmyadmin
- Cek apakah database `portofolio` sudah ada
- Jika belum, buat dengan SQL: `CREATE DATABASE portofolio;`

### 3️⃣ Jalankan Laravel Server (WAJIB!)

**Buka Terminal/CMD Baru (Terminal 1):**
```bash
cd backend
php artisan serve
```

**ATAU double-click file:** `start-backend.bat`

**Tunggu sampai muncul:**
```
INFO  Server running on [http://127.0.0.1:8000]
```

**⚠️ JANGAN TUTUP TERMINAL INI!**

### 4️⃣ Test Laravel API (Optional tapi Recommended)

**Buka browser baru, akses:**
```
http://localhost:8000/api/projects
```

**Harus muncul:** `[]` (array kosong) atau data JSON

**Jika error 404 atau tidak bisa akses:**
- Laravel server belum jalan
- Kembali ke langkah 3

### 5️⃣ Jalankan Next.js Server

**Buka Terminal/CMD Baru (Terminal 2):**
```bash
cd frontend
npm run dev
```

**ATAU double-click file:** `start-frontend.bat`

**Tunggu sampai muncul:**
```
- Local:        http://localhost:3000
```

**⚠️ JANGAN TUTUP TERMINAL INI!**

### 6️⃣ Login ke Admin Panel

1. Buka browser: http://localhost:3000/admin/login
2. Masukkan kredensial:
   - **Email:** `admin@visual.com`
   - **Password:** `admin123`
3. Klik LOGIN

**Jika berhasil:** Akan redirect ke Dashboard

**Jika masih error:**
- Cek apakah kedua server (Laravel & Next.js) masih running
- Buka Browser Console (F12) → Tab Console
- Screenshot error dan tanyakan ke saya

## 🎯 Checklist Sebelum Login

Pastikan semua ini ✅:

- [ ] WAMP ikon hijau
- [ ] Database `portofolio` sudah ada
- [ ] Terminal 1: Laravel server running (http://localhost:8000)
- [ ] Terminal 2: Next.js server running (http://localhost:3000)
- [ ] Browser bisa akses http://localhost:8000/api/projects
- [ ] File `frontend/.env.local` ada dan isinya benar

## 🔧 Jika Masih Error

### Error: "route api/admin/login could not be found"

**Penyebab:** Laravel server tidak jalan

**Solusi:**
1. Pastikan Terminal 1 masih running
2. Jika tidak, jalankan lagi: `cd backend && php artisan serve`
3. Refresh halaman login

### Error: "Network Error" atau "ERR_CONNECTION_REFUSED"

**Penyebab:** Salah satu server tidak jalan

**Solusi:**
1. Cek Terminal 1 (Laravel) masih running
2. Cek Terminal 2 (Next.js) masih running
3. Restart kedua server jika perlu

### Error: "Invalid credentials"

**Penyebab:** Password salah atau admin user belum di-seed

**Solusi:**
```bash
cd backend
php artisan db:seed --class=AdminSeeder
```

Kredensial yang benar:
- Email: `admin@visual.com`
- Password: `admin123`

## 📱 Setelah Login Berhasil

Anda akan masuk ke Dashboard dengan menu:
- **Projects** - Manage portfolio projects
- **Skills** - Manage skills
- **Testimonials** - Manage testimonials

Tambahkan data dari admin panel, lalu lihat di homepage: http://localhost:3000

## 💡 Tips

1. **Selalu jalankan 2 terminal** (Laravel + Next.js)
2. **Jangan tutup terminal** saat aplikasi berjalan
3. **Jika edit .env**, restart server
4. **Jika masih error**, cek Browser Console (F12)

## 🆘 Butuh Bantuan?

1. Screenshot error di browser
2. Screenshot terminal Laravel
3. Screenshot terminal Next.js
4. Tanyakan ke saya dengan detail error

---

**File yang sudah diperbaiki:**
- ✅ RouteServiceProvider dibuat
- ✅ Controller base class dibuat
- ✅ Routes sudah terdaftar
- ✅ CORS sudah dikonfigurasi
- ✅ Admin user sudah di-seed

**Sekarang tinggal jalankan kedua server dan login!** 🎉
