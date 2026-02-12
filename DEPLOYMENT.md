# 🚀 Deployment Guide - Vercel + Railway

## Prerequisites
- [ ] GitHub account
- [ ] Vercel account (https://vercel.com)
- [ ] Railway account (https://railway.app)
- [ ] Cloudinary account (https://cloudinary.com) - untuk upload gambar

---

## PART 1: Persiapan

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

### 2. Buat .gitignore

Pastikan file ini ada di root:
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

## PART 2: Deploy Backend ke Railway

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

Klik project → "Variables" → Add semua ini:

```env
APP_NAME=Portfolio
APP_ENV=production
APP_KEY=base64:k7dQe7yGf4qKmU0RLUAn6OQEZgvSfPNjXd4/s4ehhCI=
APP_DEBUG=false
APP_URL=https://your-backend.railway.app

# Database (Railway auto-fill ini)
DB_CONNECTION=mysql
DB_HOST=${{MYSQL_HOST}}
DB_PORT=${{MYSQL_PORT}}
DB_DATABASE=${{MYSQL_DATABASE}}
DB_USERNAME=${{MYSQL_USER}}
DB_PASSWORD=${{MYSQL_PASSWORD}}

# CORS
FRONTEND_URL=https://your-frontend.vercel.app

# Cloudinary (untuk upload gambar)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
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
2. Add custom command: `php artisan migrate --force`

### Step 6: Get Backend URL

Setelah deploy selesai:
1. Klik "Settings" → "Domains"
2. Copy URL (contoh: `https://portfolio-backend-production.up.railway.app`)
3. Simpan URL ini untuk frontend

---

## PART 3: Deploy Frontend ke Vercel

### Step 1: Buat .env.production

**File: `frontend/.env.production`**
```
NEXT_PUBLIC_API_URL=https://your-backend.railway.app/api
```

### Step 2: Deploy ke Vercel

1. Buka https://vercel.com
2. Login dengan GitHub
3. Klik "Add New" → "Project"
4. Import repository Anda
5. **PENTING:** Set "Root Directory" ke `frontend`
6. Framework Preset: Next.js (auto-detect)

### Step 3: Set Environment Variables

Di Vercel dashboard:
1. Klik "Settings" → "Environment Variables"
2. Add:
   ```
   Name: NEXT_PUBLIC_API_URL
   Value: https://your-backend.railway.app/api
   ```
3. Klik "Save"

### Step 4: Deploy

1. Klik "Deploy"
2. Tunggu build selesai (2-3 menit)
3. Vercel akan berikan URL (contoh: `https://portfolio.vercel.app`)

---

## PART 4: Setup Cloudinary (Upload Gambar)

### Step 1: Daftar Cloudinary

1. Buka https://cloudinary.com/users/register/free
2. Daftar dengan email
3. Verify email

### Step 2: Get Credentials

1. Login ke Cloudinary Dashboard
2. Copy:
   - Cloud Name
   - API Key
   - API Secret

### Step 3: Update Railway Environment

Tambahkan di Railway Variables:
```
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### Step 4: Install Package

```bash
cd backend
composer require cloudinary/cloudinary_php
git add .
git commit -m "Add Cloudinary support"
git push
```

Railway akan auto-redeploy.

---

## PART 5: Testing

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

---

## PART 6: Update CORS

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

---

## 🎯 Cara Upload Gambar Setelah Deploy

### Option 1: Via Admin Panel (Recommended)

1. Login ke admin: https://your-frontend.vercel.app/admin/login
2. Klik "Projects" → "Add New Project"
3. Upload gambar langsung (akan ke Cloudinary)
4. Atau paste URL dari Unsplash/ImgBB

### Option 2: Via Cloudinary Dashboard

1. Login ke Cloudinary
2. Upload gambar manual
3. Copy URL
4. Paste di admin panel

### Option 3: Via ImgBB

1. Buka https://imgbb.com
2. Upload gambar
3. Copy "Direct link"
4. Paste di admin panel

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
- Update `backend/config/cors.php`
- Tambahkan domain Vercel ke `allowed_origins`
- Redeploy Railway

### Error: "Database connection failed"
- Cek Railway MySQL credentials
- Pastikan environment variables benar
- Restart Railway service

### Error: "Image upload failed"
- Cek Cloudinary credentials
- Pastikan package terinstall
- Cek Railway logs

### Frontend tidak load data
- Cek `NEXT_PUBLIC_API_URL` di Vercel
- Test backend URL di browser
- Cek browser console untuk error

---

## 📊 Monitoring

### Railway
- Dashboard → Metrics
- Lihat CPU, Memory, Network usage
- Cek logs untuk error

### Vercel
- Dashboard → Analytics
- Lihat page views, performance
- Cek deployment logs

---

## 💰 Biaya

### Free Tier Limits:

**Railway:**
- $5 credit/month gratis
- Cukup untuk portfolio kecil-menengah

**Vercel:**
- 100GB bandwidth/month
- Unlimited deployments
- Gratis untuk personal projects

**Cloudinary:**
- 25GB storage
- 25GB bandwidth/month
- Gratis selamanya

**Total: $0/month** untuk portfolio personal! 🎉

---

## 🚀 Next Steps

1. [ ] Deploy backend ke Railway
2. [ ] Deploy frontend ke Vercel
3. [ ] Setup Cloudinary
4. [ ] Test upload gambar
5. [ ] Tambah projects via admin panel
6. [ ] Share portfolio URL! 🎊

---

## 📞 Support

Jika ada masalah:
1. Cek Railway logs
2. Cek Vercel deployment logs
3. Cek browser console
4. Screenshot error dan tanyakan ke saya

Good luck! 🚀
