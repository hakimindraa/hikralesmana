# Panduan Deployment Hikra Portfolio

## Overview
- **Frontend (Next.js)**: Deploy ke Vercel
- **Backend (Laravel)**: Deploy ke Railway
- **Database**: MySQL di Railway

---

## BAGIAN 1: Deploy Backend ke Railway

### Step 1: Persiapan Backend

1. Pastikan file `.env.example` sudah lengkap
2. Buat file `Procfile` di folder `backend/`:
```
web: php artisan serve --host=0.0.0.0 --port=$PORT
```

3. Buat file `nixpacks.toml` di folder `backend/`:
```toml
[phases.setup]
nixPkgs = ['php82', 'php82Packages.composer']

[phases.build]
cmds = ['composer install --no-dev --optimize-autoloader']

[phases.deploy]
cmds = ['php artisan config:cache', 'php artisan route:cache', 'php artisan view:cache']

[start]
cmd = 'php artisan serve --host=0.0.0.0 --port=$PORT'
```

### Step 2: Deploy ke Railway

1. Buka https://railway.app dan login dengan GitHub
2. Klik "New Project" → "Deploy from GitHub repo"
3. Pilih repository Anda
4. Railway akan auto-detect Laravel project
5. Klik "Add variables" dan tambahkan environment variables:

```
APP_NAME=Hikra
APP_ENV=production
APP_KEY=base64:GENERATE_THIS_LATER
APP_DEBUG=false
APP_URL=https://your-backend-url.railway.app

DB_CONNECTION=mysql
DB_HOST=RAILWAY_WILL_PROVIDE
DB_PORT=3306
DB_DATABASE=railway
DB_USERNAME=RAILWAY_WILL_PROVIDE
DB_PASSWORD=RAILWAY_WILL_PROVIDE

SESSION_DRIVER=file
QUEUE_CONNECTION=sync
```

### Step 3: Setup MySQL Database di Railway

1. Di Railway project, klik "New" → "Database" → "Add MySQL"
2. Railway akan auto-generate credentials
3. Copy credentials ke environment variables backend:
   - `DB_HOST` → dari MySQL service
   - `DB_DATABASE` → `railway`
   - `DB_USERNAME` → dari MySQL service
   - `DB_PASSWORD` → dari MySQL service

### Step 4: Generate APP_KEY

1. Di Railway, buka "Settings" → "Variables"
2. Klik "Raw Editor"
3. Generate APP_KEY dengan command (jalankan di local):
```bash
cd backend
php artisan key:generate --show
```
4. Copy hasilnya (format: `base64:xxxxx`) dan paste ke `APP_KEY`

### Step 5: Run Migrations

1. Di Railway, buka tab "Deployments"
2. Tunggu deployment selesai
3. Klik "View Logs"
4. Buka "Settings" → "Variables" dan tambahkan temporary variable:
```
RUN_MIGRATIONS=true
```
5. Atau jalankan manual via Railway CLI:
```bash
railway run php artisan migrate --force
```

### Step 6: Seed Admin User

Jalankan seeder untuk create admin user:
```bash
railway run php artisan db:seed --class=AdminSeeder
```

Atau manual insert ke database via Railway MySQL console:
```sql
INSERT INTO users (name, email, password, created_at, updated_at) 
VALUES ('Admin', 'admin@visual.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', NOW(), NOW());
```
Password: `admin123`

### Step 7: Setup CORS

1. Pastikan `APP_URL` di Railway sudah benar
2. Nanti setelah deploy frontend, tambahkan Vercel URL ke CORS allowed origins
3. Update environment variable di Railway:
```
FRONTEND_URL=https://your-app.vercel.app
```

---

## BAGIAN 2: Deploy Frontend ke Vercel

### Step 1: Persiapan Frontend

1. Pastikan file `.env.local` ada (tapi jangan di-commit ke Git)
2. Update `.gitignore` untuk exclude `.env.local`

### Step 2: Deploy ke Vercel

1. Buka https://vercel.com dan login dengan GitHub
2. Klik "Add New" → "Project"
3. Import repository Anda
4. Vercel akan auto-detect Next.js
5. **PENTING**: Set "Root Directory" ke `frontend`
6. Klik "Environment Variables" dan tambahkan:

```
NEXT_PUBLIC_API_URL=https://your-backend-url.railway.app/api
NEXT_PUBLIC_IMGBB_API_KEY=e94d9c13eb70addd89e9934496164b46
```

7. Klik "Deploy"

### Step 3: Update Backend CORS

Setelah frontend deploy, copy URL Vercel Anda (misal: `https://hikra.vercel.app`)

1. Buka Railway → Backend project → Variables
2. Update `FRONTEND_URL`:
```
FRONTEND_URL=https://hikra.vercel.app
```
3. Redeploy backend

---

## BAGIAN 3: Testing & Verification

### Test Backend
1. Buka `https://your-backend-url.railway.app/api/projects`
2. Harus return JSON (bisa empty array `[]`)

### Test Frontend
1. Buka `https://your-app.vercel.app`
2. Homepage harus load dengan benar
3. Test admin login: `https://your-app.vercel.app/admin/login`
   - Email: `admin@visual.com`
   - Password: `admin123`

### Test Upload Images
1. Login ke admin panel
2. Upload image via ImgBB (sudah auto-configured)
3. Pastikan image muncul di homepage

---

## BAGIAN 4: Custom Domain (Optional)

### Setup Custom Domain di Vercel
1. Buka Vercel project → Settings → Domains
2. Add domain Anda (misal: `hikra.com`)
3. Update DNS records sesuai instruksi Vercel
4. Tunggu DNS propagation (5-30 menit)

### Update Backend CORS untuk Custom Domain
1. Buka Railway → Backend → Variables
2. Update `FRONTEND_URL`:
```
FRONTEND_URL=https://hikra.com
```

---

## Troubleshooting

### Backend tidak bisa connect ke database
- Cek `DB_HOST`, `DB_USERNAME`, `DB_PASSWORD` di Railway variables
- Pastikan MySQL service sudah running
- Cek logs: Railway → Deployments → View Logs

### Frontend tidak bisa fetch data dari backend
- Cek `NEXT_PUBLIC_API_URL` di Vercel environment variables
- Pastikan backend URL benar dan include `/api`
- Cek CORS: pastikan `FRONTEND_URL` di backend sudah benar

### Images tidak muncul
- ImgBB API key sudah benar di Vercel variables
- Cek browser console untuk error
- Test upload manual di admin panel

### Admin tidak bisa login
- Pastikan admin user sudah di-seed
- Cek password hash di database
- Test dengan credentials: `admin@visual.com` / `admin123`

---

## Environment Variables Summary

### Railway (Backend)
```
APP_NAME=Hikra
APP_ENV=production
APP_KEY=base64:xxxxx
APP_DEBUG=false
APP_URL=https://your-backend.railway.app
DB_CONNECTION=mysql
DB_HOST=xxx.railway.internal
DB_PORT=3306
DB_DATABASE=railway
DB_USERNAME=root
DB_PASSWORD=xxxxx
FRONTEND_URL=https://your-app.vercel.app
SESSION_DRIVER=file
QUEUE_CONNECTION=sync
```

### Vercel (Frontend)
```
NEXT_PUBLIC_API_URL=https://your-backend.railway.app/api
NEXT_PUBLIC_IMGBB_API_KEY=e94d9c13eb70addd89e9934496164b46
```

---

## Post-Deployment Checklist

- [ ] Backend deployed dan accessible
- [ ] Database migrations run successfully
- [ ] Admin user created
- [ ] Frontend deployed dan accessible
- [ ] API calls working (check browser console)
- [ ] Admin login working
- [ ] Image upload working
- [ ] All pages loading correctly
- [ ] Mobile responsive working
- [ ] CORS configured correctly

---

## Maintenance

### Update Content
1. Login ke admin panel: `https://your-app.vercel.app/admin/login`
2. Edit content via admin interface
3. Changes reflect immediately on homepage

### Update Code
1. Push changes to GitHub
2. Vercel auto-deploys frontend
3. Railway auto-deploys backend
4. Check deployment logs for errors

### Backup Database
Railway provides automatic backups, but you can also:
1. Export via Railway MySQL console
2. Or use `mysqldump` via Railway CLI

---

Selamat! Portfolio Anda sudah online 🎉
