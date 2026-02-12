# 🚀 Panduan Deploy - Vercel + Railway

## Yang Anda Butuhkan
- [ ] Akun GitHub
- [ ] Akun Vercel (https://vercel.com)
- [ ] Akun Railway (https://railway.app)
- [ ] Akun ImgBB (https://imgbb.com) - untuk upload gambar

---

## BAGIAN 1: Persiapan

### 1. Push ke GitHub

```bash
# Di root project
git init
git add .
git commit -m "Initial commit - Portfolio website"
git branch -M main

# Buat repository di GitHub, lalu:
git remote add origin https://github.com/USERNAME/portfolio.git
git push -u origin main
```

### 2. Pastikan .gitignore Benar

File `.gitignore` di root:
```
node_modules/
.env
.env.local
.next/
vendor/
storage/logs/
storage/framework/cache/
bootstrap/cache/
```

---

## BAGIAN 2: Deploy Backend ke Railway

### Step 1: Buat File Konfigurasi

**File: `backend/Procfile`**
```
web: php artisan serve --host=0.0.0.0 --port=$PORT
```

**File: `backend/railway.json`**
```json
{
  "build": {
    "builder": "NIXPACKS"
  },
  "deploy": {
    "startCommand": "php artisan serve --host=0.0.0.0 --port=$PORT"
  }
}
```

### Step 2: Deploy ke Railway

1. Buka https://railway.app
2. Login dengan GitHub
3. Klik "New Project"
4. Pilih "Deploy from GitHub repo"
5. Pilih repository Anda
6. Railway akan auto-detect Laravel

### Step 3: Tambah MySQL Database

1. Di Railway dashboard, klik "New"
2. Pilih "Database" → "Add MySQL"
3. Railway akan auto-generate credentials

### Step 4: Set Environment Variables

Klik project → "Variables" → Tambahkan semua ini:

```env
APP_NAME=Portfolio
APP_ENV=production
APP_KEY=base64:k7dQe7yGf4qKmU0RLUAn6OQEZgvSfPNjXd4/s4ehhCI=
APP_DEBUG=false
APP_URL=https://your-backend.railway.app

# Database (Railway auto-fill ini dari MySQL service)
DB_CONNECTION=mysql
DB_HOST=${{MYSQL_HOST}}
DB_PORT=${{MYSQL_PORT}}
DB_DATABASE=${{MYSQL_DATABASE}}
DB_USERNAME=${{MYSQL_USER}}
DB_PASSWORD=${{MYSQL_PASSWORD}}

# CORS
FRONTEND_URL=https://your-frontend.vercel.app
```

### Step 5: Run Migrations

**Option A: Via Railway CLI**
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login
railway login

# Link project
railway link

# Run migrations
railway run php artisan migrate --force
railway run php artisan db:seed --class=AdminSeeder
```

**Option B: Via Railway Dashboard**
1. Klik "Settings" → "Deploy Triggers"
2. Add custom command: `php artisan migrate --force && php artisan db:seed --class=AdminSeeder`

### Step 6: Dapatkan Backend URL

Setelah deploy selesai:
1. Klik "Settings" → "Domains"
2. Copy URL (contoh: `https://portfolio-backend-production.up.railway.app`)
3. Simpan URL ini untuk frontend

---

## BAGIAN 3: Deploy Frontend ke Vercel

### Step 1: Deploy ke Vercel

1. Buka https://vercel.com
2. Login dengan GitHub
3. Klik "Add New" → "Project"
4. Import repository Anda
5. **PENTING:** Set "Root Directory" ke `frontend`
6. Framework Preset: Next.js (auto-detect)

### Step 2: Set Environment Variables

Di Vercel dashboard:
1. Klik "Settings" → "Environment Variables"
2. Tambahkan 2 variable ini:

```
Name: NEXT_PUBLIC_API_URL
Value: https://your-backend.railway.app/api

Name: NEXT_PUBLIC_IMGBB_API_KEY
Value: e94d9c13eb70addd89e9934496164b46
```

3. Klik "Save"

### Step 3: Deploy

1. Klik "Deploy"
2. Tunggu build selesai (2-3 menit)
3. Vercel akan berikan URL (contoh: `https://portfolio.vercel.app`)

---

## BAGIAN 4: Setup ImgBB (Upload Gambar)

### Kenapa ImgBB?
- ✅ Gratis selamanya
- ✅ Unlimited storage & bandwidth
- ✅ Max 32MB per file
- ✅ 5000 requests/hour
- ✅ Tidak perlu backend, upload langsung dari frontend
- ✅ Sangat simple!

### API Key Sudah Ada!

API key ImgBB sudah tersedia: `e94d9c13eb70addd89e9934496164b46`

Sudah dikonfigurasi di:
- `frontend/.env.local` (development)
- Nanti di Vercel environment variables (production)

### Cara Kerja Upload:

1. User pilih gambar di admin panel
2. Frontend upload langsung ke ImgBB API
3. ImgBB return URL gambar
4. URL disimpan ke database Laravel
5. Gambar tampil di homepage

**Tidak perlu backend untuk upload!** 🎉

---

## BAGIAN 5: Testing

### Test Backend

```bash
# Test API
curl https://your-backend.railway.app/api/projects

# Test Login
curl -X POST https://your-backend.railway.app/api/admin/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@visual.com","password":"admin123"}'
```

### Test Frontend

1. Buka https://your-frontend.vercel.app
2. Cek homepage loading
3. Test admin login: https://your-frontend.vercel.app/admin/login
   - Email: `admin@visual.com`
   - Password: `admin123`

---

## BAGIAN 6: Update CORS

Setelah deploy, update CORS di Railway:

**File: `backend/config/cors.php`**
```php
'allowed_origins' => [
    'https://your-frontend.vercel.app',
    'http://localhost:3000', // untuk development
],
```

Push changes:
```bash
git add .
git commit -m "Update CORS for production"
git push
```

Railway akan auto-redeploy.

---

## 🎯 Cara Upload Gambar Setelah Deploy

### Via Admin Panel (Recommended)

1. Login ke admin: https://your-frontend.vercel.app/admin/login
2. Klik "Projects" → "Add New Project"
3. **Option 1:** Upload gambar langsung (max 5MB)
   - Klik "Choose File"
   - Pilih gambar
   - Otomatis upload ke ImgBB
4. **Option 2:** Paste URL dari Unsplash/Pexels
   - Copy image URL
   - Paste di field "Image URL"

### Tips Upload:
- Gunakan gambar landscape untuk Projects (ratio 16:9 atau 4:3)
- Gunakan gambar portrait untuk Gallery (ratio 3:4 atau 9:16)
- Compress gambar dulu di https://tinypng.com untuk loading cepat
- Max 5MB per file

---

## 📱 Custom Domain (Optional)

### Vercel (Frontend)

1. Beli domain (Namecheap, GoDaddy, dll)
2. Di Vercel: Settings → Domains
3. Add domain: `www.yourportfolio.com`
4. Update DNS records sesuai instruksi Vercel

### Railway (Backend)

1. Di Railway: Settings → Domains
2. Add custom domain: `api.yourportfolio.com`
3. Update DNS records

---

## 🔧 Troubleshooting

### Error: "CORS policy"
**Solusi:**
- Update `backend/config/cors.php`
- Tambahkan domain Vercel ke `allowed_origins`
- Push ke GitHub (Railway auto-redeploy)

### Error: "Database connection failed"
**Solusi:**
- Cek Railway MySQL credentials
- Pastikan environment variables benar
- Restart Railway service

### Error: "Image upload failed"
**Solusi:**
- Cek `NEXT_PUBLIC_IMGBB_API_KEY` di Vercel
- Pastikan file < 5MB
- Cek browser console untuk error detail

### Frontend tidak load data
**Solusi:**
- Cek `NEXT_PUBLIC_API_URL` di Vercel
- Test backend URL di browser: `https://your-backend.railway.app/api/projects`
- Cek browser console untuk error
- Pastikan migrations sudah dijalankan di Railway

### Admin login tidak bisa
**Solusi:**
- Pastikan seeder sudah dijalankan: `railway run php artisan db:seed --class=AdminSeeder`
- Cek credentials: email `admin@visual.com`, password `admin123`
- Cek Railway logs untuk error

---

## 📊 Monitoring

### Railway
- Dashboard → Metrics
- Lihat CPU, Memory, Network usage
- Klik "View Logs" untuk debug

### Vercel
- Dashboard → Analytics
- Lihat page views, performance
- Cek "Deployments" untuk build logs

---

## 💰 Biaya

### Free Tier Limits:

**Railway:**
- $5 credit/month gratis
- Cukup untuk portfolio kecil-menengah
- Setelah habis, bayar $5/month

**Vercel:**
- 100GB bandwidth/month
- Unlimited deployments
- Gratis untuk personal projects

**ImgBB:**
- Unlimited storage
- Unlimited bandwidth
- 32MB max file size
- 5000 requests/hour
- Gratis selamanya

**Total: $0/month** untuk portfolio personal! 🎉

---

## 🚀 Checklist Deploy

### Persiapan
- [ ] Push code ke GitHub
- [ ] Pastikan .gitignore benar

### Backend (Railway)
- [ ] Deploy backend ke Railway
- [ ] Tambah MySQL database
- [ ] Set environment variables
- [ ] Run migrations
- [ ] Run seeder (AdminSeeder)
- [ ] Test API endpoint

### Frontend (Vercel)
- [ ] Deploy frontend ke Vercel
- [ ] Set root directory ke `frontend`
- [ ] Tambah environment variables:
  - [ ] `NEXT_PUBLIC_API_URL`
  - [ ] `NEXT_PUBLIC_IMGBB_API_KEY`
- [ ] Test homepage
- [ ] Test admin login

### Testing
- [ ] Login ke admin panel
- [ ] Upload test image
- [ ] Create test project
- [ ] Cek project muncul di homepage
- [ ] Test responsive di mobile

### Final
- [ ] Update CORS di backend
- [ ] Share portfolio URL! 🎊

---

## 📞 Butuh Bantuan?

Jika ada masalah:
1. Cek Railway logs: Dashboard → View Logs
2. Cek Vercel deployment logs: Deployments → Latest
3. Cek browser console: F12 → Console
4. Screenshot error dan tanyakan

---

## 🎓 Penjelasan Singkat

### Kenapa Railway untuk Backend?
- Auto-detect Laravel
- Free MySQL database
- Easy deployment
- Good free tier

### Kenapa Vercel untuk Frontend?
- Optimized untuk Next.js
- CDN global (loading cepat)
- Auto SSL
- Unlimited bandwidth

### Kenapa ImgBB untuk Upload?
- Gratis unlimited
- Tidak perlu backend
- Simple API
- Reliable

---

Good luck dengan deployment! 🚀

Jika sudah live, jangan lupa share URL portfolio-nya! 🎨
