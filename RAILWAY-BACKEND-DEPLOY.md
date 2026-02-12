# Step-by-Step Deploy Backend Laravel ke Railway

## 📋 Persiapan Sebelum Deploy

### 1. Push Code ke GitHub

Pastikan semua code sudah di-push ke GitHub:

```bash
git add .
git commit -m "Prepare for deployment"
git push origin main
```

### 2. Generate APP_KEY (Simpan dulu)

Jalankan di local untuk generate APP_KEY:

```bash
cd backend
php artisan key:generate --show
```

Copy hasilnya (format: `base64:xxxxxxxxxxxxx`), simpan di notepad. Nanti akan dipakai.

---

## 🚂 Deploy ke Railway

### STEP 1: Buat Akun & Login Railway

1. Buka browser, ke https://railway.app
2. Klik **"Login"** di pojok kanan atas
3. Pilih **"Login with GitHub"**
4. Authorize Railway untuk akses GitHub Anda
5. Setelah login, Anda akan masuk ke Dashboard Railway

---

### STEP 2: Buat Project Baru

1. Di Dashboard Railway, klik tombol **"New Project"** (warna ungu)
2. Pilih **"Deploy from GitHub repo"**
3. Jika ini pertama kali:
   - Klik **"Configure GitHub App"**
   - Pilih repository mana yang mau di-akses Railway
   - Atau pilih "All repositories" untuk akses semua repo
   - Klik **"Save"**
4. Setelah itu, pilih **repository Hikra Portfolio** Anda dari list
5. Railway akan mulai analyze repository Anda

---

### STEP 3: Configure Service (Backend)

1. Railway akan detect bahwa ini Laravel project
2. Anda akan lihat service baru dengan nama repo Anda
3. Klik service tersebut untuk masuk ke settings
4. Di tab **"Settings"**:
   - **Service Name**: Ganti jadi `hikra-backend` (optional, biar jelas)
   - **Root Directory**: Isi dengan `backend` (PENTING!)
   - Scroll ke bawah, klik **"Save Changes"**

---

### STEP 4: Tambah MySQL Database

1. Kembali ke Project view (klik nama project di atas)
2. Klik tombol **"+ New"** 
3. Pilih **"Database"**
4. Pilih **"Add MySQL"**
5. Railway akan create MySQL service baru
6. Tunggu beberapa detik sampai status jadi "Active" (hijau)

---

### STEP 5: Set Environment Variables

1. Klik service **hikra-backend** (bukan MySQL)
2. Klik tab **"Variables"**
3. Klik **"+ New Variable"** atau **"Raw Editor"** (lebih cepat)
4. Jika pakai Raw Editor, paste ini:

```env
APP_NAME=Hikra
APP_ENV=production
APP_KEY=base64:PASTE_KEY_YANG_TADI_ANDA_GENERATE
APP_DEBUG=false
APP_URL=https://hikra-backend-production.up.railway.app

LOG_CHANNEL=stack
LOG_LEVEL=error

DB_CONNECTION=mysql
DB_HOST=${{MySQL.MYSQL_HOST}}
DB_PORT=${{MySQL.MYSQL_PORT}}
DB_DATABASE=${{MySQL.MYSQL_DATABASE}}
DB_USERNAME=${{MySQL.MYSQL_USER}}
DB_PASSWORD=${{MySQL.MYSQL_PASSWORD}}

BROADCAST_DRIVER=log
CACHE_DRIVER=file
FILESYSTEM_DISK=local
QUEUE_CONNECTION=sync
SESSION_DRIVER=file
SESSION_LIFETIME=120

FRONTEND_URL=http://localhost:3000
```

**PENTING:**
- Ganti `APP_KEY` dengan key yang tadi Anda generate
- `APP_URL` akan otomatis, tapi bisa diganti nanti setelah deploy
- `DB_*` variables pakai syntax `${{MySQL.MYSQL_*}}` untuk auto-connect ke MySQL
- `FRONTEND_URL` nanti diganti setelah deploy frontend

5. Klik **"Save"** atau **"Update Variables"**

---

### STEP 6: Deploy!

1. Railway akan otomatis trigger deployment setelah save variables
2. Atau klik tab **"Deployments"** → klik **"Deploy"**
3. Tunggu proses deployment (biasanya 2-5 menit)
4. Lihat progress di **"View Logs"**
5. Tunggu sampai status jadi **"Success"** (hijau) atau **"Active"**

---

### STEP 7: Dapatkan Public URL

1. Klik service **hikra-backend**
2. Klik tab **"Settings"**
3. Scroll ke bagian **"Networking"**
4. Klik **"Generate Domain"**
5. Railway akan generate URL seperti: `hikra-backend-production.up.railway.app`
6. Copy URL ini, simpan di notepad

---

### STEP 8: Update APP_URL

1. Masih di service hikra-backend
2. Klik tab **"Variables"**
3. Cari variable **APP_URL**
4. Update dengan URL yang baru di-generate:
   ```
   APP_URL=https://hikra-backend-production.up.railway.app
   ```
5. Klik **"Save"**
6. Railway akan auto-redeploy

---

### STEP 9: Run Database Migrations

Ada 2 cara:

#### Cara 1: Via Railway CLI (Recommended)

1. Install Railway CLI di komputer Anda:
   ```bash
   npm install -g @railway/cli
   ```

2. Login ke Railway:
   ```bash
   railway login
   ```
   Browser akan terbuka, klik "Authorize"

3. Link ke project Anda:
   ```bash
   railway link
   ```
   Pilih project "Hikra" dari list

4. Run migrations:
   ```bash
   railway run php artisan migrate --force
   ```
   Ketik `yes` jika diminta konfirmasi

5. Seed admin user:
   ```bash
   railway run php artisan db:seed --class=AdminSeeder
   ```

#### Cara 2: Via Railway Dashboard (Alternative)

1. Klik service **hikra-backend**
2. Klik tab **"Settings"**
3. Scroll ke **"Service"** section
4. Klik **"Deploy"** dropdown → **"Run a Command"**
5. Ketik command:
   ```
   php artisan migrate --force
   ```
6. Klik **"Run"**
7. Tunggu sampai selesai
8. Ulangi untuk seed admin:
   ```
   php artisan db:seed --class=AdminSeeder
   ```

---

### STEP 10: Test Backend API

1. Buka browser
2. Test endpoint ini (ganti dengan URL Anda):
   ```
   https://hikra-backend-production.up.railway.app/api/projects
   ```
3. Harus return JSON (bisa empty array `[]` atau data projects)
4. Jika return JSON → **Backend berhasil deploy!** ✅
5. Jika error 500 → cek logs di Railway

---

## ✅ Checklist Backend Deployment

- [ ] Code sudah di-push ke GitHub
- [ ] APP_KEY sudah di-generate
- [ ] Project Railway sudah dibuat
- [ ] MySQL database sudah ditambahkan
- [ ] Environment variables sudah di-set
- [ ] Root directory = `backend`
- [ ] Deployment success (status hijau)
- [ ] Public URL sudah di-generate
- [ ] APP_URL sudah di-update
- [ ] Migrations sudah di-run
- [ ] Admin user sudah di-seed
- [ ] API endpoint bisa diakses dan return JSON

---

## 🔍 Troubleshooting

### Error: "Application key not set"
- Pastikan `APP_KEY` di variables sudah benar
- Format harus: `base64:xxxxx`
- Generate ulang: `php artisan key:generate --show`

### Error: "Connection refused" atau database error
- Cek `DB_*` variables
- Pastikan pakai syntax: `${{MySQL.MYSQL_HOST}}`
- Pastikan MySQL service sudah active (hijau)

### Error 500 saat akses API
- Klik tab "Deployments" → "View Logs"
- Cari error message di logs
- Biasanya masalah di APP_KEY atau database

### Migrations tidak jalan
- Pastikan Railway CLI sudah terinstall
- Pastikan sudah `railway link` ke project yang benar
- Cek MySQL service sudah active
- Coba manual via Railway dashboard

### URL tidak bisa diakses
- Pastikan sudah "Generate Domain" di Settings → Networking
- Tunggu 1-2 menit untuk DNS propagation
- Coba akses dengan https:// (bukan http://)

---

## 📝 Info Penting

**Backend URL Anda:**
```
https://hikra-backend-production.up.railway.app
```

**API Base URL:**
```
https://hikra-backend-production.up.railway.app/api
```

**Admin Credentials:**
- Email: `admin@visual.com`
- Password: `admin123`

**Test Endpoints:**
- Projects: `/api/projects`
- Skills: `/api/skills`
- Gallery: `/api/gallery`
- Testimonials: `/api/testimonials`
- Hero: `/api/hero-settings`
- About: `/api/about-settings`

---

## 🎯 Next Step

Setelah backend berhasil deploy, lanjut deploy frontend ke Vercel!

Baca: `VERCEL-FRONTEND-DEPLOY.md` (akan saya buat)

---

**Butuh bantuan?**
- Railway Docs: https://docs.railway.app
- Railway Discord: https://discord.gg/railway
