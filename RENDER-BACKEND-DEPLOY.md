# Deploy Backend Laravel ke Render.com

## Kenapa Render?
- Lebih mudah untuk Laravel dibanding Railway
- Free tier yang bagus (750 jam/bulan)
- Auto-deploy dari GitHub
- Built-in PostgreSQL/MySQL database
- Lebih stabil dan reliable

---

## 🚀 Step-by-Step Deploy ke Render

### STEP 1: Buat Akun Render

1. Buka https://render.com
2. Klik **"Get Started"** atau **"Sign Up"**
3. Pilih **"Sign up with GitHub"**
4. Authorize Render untuk akses GitHub
5. Setelah login, masuk ke Dashboard

---

### STEP 2: Buat Web Service Baru

1. Di Dashboard Render, klik **"New +"** (pojok kanan atas)
2. Pilih **"Web Service"**
3. Klik **"Connect a repository"**
4. Jika belum connect GitHub:
   - Klik **"Configure account"**
   - Pilih repository yang mau di-akses
   - Atau pilih "All repositories"
   - Klik **"Save"**
5. Pilih repository **hikralesmana** dari list
6. Klik **"Connect"**

---

### STEP 3: Configure Web Service

Isi form dengan data berikut:

**Basic Settings:**
- **Name**: `hikra-backend` (atau nama lain yang Anda mau)
- **Region**: Pilih yang terdekat (Singapore untuk Indonesia)
- **Branch**: `main` (atau branch yang Anda pakai)
- **Root Directory**: `backend` (PENTING!)
- **Runtime**: Pilih **"Docker"** ATAU biarkan auto-detect

**Build & Deploy:**
- **Build Command**:
  ```bash
  composer install --optimize-autoloader --no-dev && php artisan config:cache && php artisan route:cache && php artisan view:cache
  ```

- **Start Command**:
  ```bash
  php artisan serve --host=0.0.0.0 --port=$PORT
  ```

**Instance Type:**
- Pilih **"Free"** (untuk testing)
- Atau **"Starter"** ($7/bulan untuk production)

---

### STEP 4: Tambah Environment Variables

Scroll ke bawah ke bagian **"Environment Variables"**

Klik **"Add Environment Variable"** dan tambahkan satu per satu:

```
APP_NAME=Hikra
APP_ENV=production
APP_KEY=base64:PASTE_KEY_ANDA_DISINI
APP_DEBUG=false
APP_URL=https://hikra-backend.onrender.com

LOG_CHANNEL=stack
LOG_LEVEL=error

DB_CONNECTION=mysql
DB_HOST=AKAN_DIISI_NANTI
DB_PORT=3306
DB_DATABASE=hikra
DB_USERNAME=AKAN_DIISI_NANTI
DB_PASSWORD=AKAN_DIISI_NANTI

SESSION_DRIVER=file
QUEUE_CONNECTION=sync

FRONTEND_URL=http://localhost:3000
```

**PENTING:**
- Ganti `APP_KEY` dengan hasil dari: `php artisan key:generate --show`
- `APP_URL` akan otomatis sesuai dengan URL Render Anda
- `DB_*` akan diisi setelah buat database

---

### STEP 5: Buat MySQL Database

**Opsi A: Pakai Database External (Recommended)**

Render tidak punya MySQL built-in, jadi pakai external:

1. **PlanetScale** (Recommended - Free tier bagus):
   - Buka https://planetscale.com
   - Sign up dengan GitHub
   - Create database baru: `hikra-db`
   - Get connection string
   - Copy credentials ke Render environment variables

2. **Railway MySQL** (Alternatif):
   - Buka https://railway.app
   - Create project baru
   - Add MySQL database saja (tanpa service)
   - Copy credentials ke Render

3. **Aiven MySQL** (Alternatif):
   - Buka https://aiven.io
   - Free tier 1GB MySQL
   - Create database
   - Copy credentials

**Opsi B: Pakai PostgreSQL (Render Built-in)**

Jika mau lebih mudah, pakai PostgreSQL:

1. Di Render Dashboard, klik **"New +"** → **"PostgreSQL"**
2. Isi:
   - **Name**: `hikra-db`
   - **Database**: `hikra`
   - **User**: `hikra_user`
   - **Region**: Same as web service
   - **Instance Type**: Free
3. Klik **"Create Database"**
4. Tunggu sampai status "Available"
5. Copy **Internal Database URL**
6. Update environment variables di web service:
   ```
   DB_CONNECTION=pgsql
   DB_HOST=xxx.oregon-postgres.render.com
   DB_PORT=5432
   DB_DATABASE=hikra
   DB_USERNAME=hikra_user
   DB_PASSWORD=xxx
   ```

---

### STEP 6: Deploy!

1. Scroll ke bawah
2. Klik **"Create Web Service"**
3. Render akan mulai build dan deploy
4. Tunggu 5-10 menit (first deploy lebih lama)
5. Lihat progress di **"Logs"** tab
6. Tunggu sampai status jadi **"Live"** (hijau)

---

### STEP 7: Run Migrations

Setelah deploy berhasil:

1. Di Render Dashboard, buka web service Anda
2. Klik tab **"Shell"** (di menu atas)
3. Klik **"Launch Shell"**
4. Tunggu terminal terbuka
5. Jalankan commands:

```bash
# Run migrations
php artisan migrate --force

# Seed admin user
php artisan db:seed --class=AdminSeeder
```

Atau via Render CLI (install dulu):

```bash
# Install Render CLI
npm install -g @render/cli

# Login
render login

# Run command
render run php artisan migrate --force
render run php artisan db:seed --class=AdminSeeder
```

---

### STEP 8: Update APP_URL & FRONTEND_URL

1. Setelah deploy, copy URL Render Anda (misal: `https://hikra-backend.onrender.com`)
2. Klik tab **"Environment"**
3. Update variables:
   - `APP_URL` = `https://hikra-backend.onrender.com`
   - `FRONTEND_URL` = (nanti diisi setelah deploy frontend)
4. Klik **"Save Changes"**
5. Render akan auto-redeploy

---

### STEP 9: Test API

1. Buka browser
2. Test endpoint:
   ```
   https://hikra-backend.onrender.com/api/projects
   ```
3. Harus return JSON (bisa empty array atau data)
4. Jika berhasil → **Backend sudah online!** ✅

---

## ✅ Checklist

- [ ] Akun Render sudah dibuat
- [ ] Repository connected
- [ ] Web service configured (root directory = backend)
- [ ] Environment variables set (termasuk APP_KEY)
- [ ] Database created (PostgreSQL atau MySQL external)
- [ ] Database credentials added to env vars
- [ ] Deploy success (status Live)
- [ ] Migrations run
- [ ] Admin user seeded
- [ ] API endpoint tested dan return JSON

---

## 🔧 Troubleshooting

### Build Failed
- Cek **Logs** tab untuk error detail
- Pastikan **Root Directory** = `backend`
- Pastikan **Build Command** benar
- Cek `composer.json` tidak ada error

### Database Connection Error
- Cek `DB_*` credentials benar
- Pastikan database service sudah "Available"
- Test connection dari Shell: `php artisan tinker`

### 500 Error saat akses API
- Cek Logs tab
- Pastikan `APP_KEY` sudah di-set
- Pastikan migrations sudah run
- Cek database connection

### Free Tier Sleep
- Render free tier akan sleep setelah 15 menit tidak ada traffic
- First request setelah sleep akan lambat (30 detik)
- Upgrade ke Starter ($7/bulan) untuk always-on

---

## 💡 Tips

**Auto-Deploy:**
- Setiap push ke GitHub akan auto-trigger deploy
- Bisa disable di Settings → Build & Deploy

**Custom Domain:**
- Settings → Custom Domains → Add domain
- Update DNS records sesuai instruksi

**Monitoring:**
- Metrics tab untuk lihat CPU, Memory, Request stats
- Logs tab untuk real-time logs

**Database Backup:**
- PostgreSQL Render: Auto backup daily
- External MySQL: Setup backup sendiri

---

## 📝 Info Penting

**Backend URL:**
```
https://hikra-backend.onrender.com
```

**API Base URL:**
```
https://hikra-backend.onrender.com/api
```

**Admin Credentials:**
- Email: `admin@visual.com`
- Password: `admin123`

**Free Tier Limits:**
- 750 jam/bulan (cukup untuk 1 service always-on)
- 100GB bandwidth/bulan
- Service sleep setelah 15 menit idle
- PostgreSQL: 1GB storage, 90 hari retention

---

## 🎯 Next Step

Setelah backend berhasil, deploy frontend ke Vercel!

Baca: `VERCEL-FRONTEND-DEPLOY.md`

---

**Render lebih mudah dan stabil untuk Laravel dibanding Railway!**
