# Quick Start: Deploy Hikra Portfolio

## 🚀 Langkah Cepat (15 menit)

### 1️⃣ Deploy Backend ke Railway (5 menit)

1. Buka https://railway.app → Login dengan GitHub
2. "New Project" → "Deploy from GitHub repo" → Pilih repo Anda
3. Railway auto-detect Laravel
4. Klik "Add MySQL" database
5. Tambahkan environment variables (copy dari `backend/.env.production`):
   - Isi `APP_KEY` dengan hasil command: `php artisan key:generate --show`
   - Isi `APP_URL` dengan URL Railway Anda
   - `DB_*` akan auto-filled dari MySQL service
6. Deploy! ✅

### 2️⃣ Run Migrations & Seed Admin (2 menit)

Di Railway, buka "Settings" → klik ikon terminal, atau install Railway CLI:

```bash
# Install Railway CLI
npm i -g @railway/cli

# Login
railway login

# Link project
railway link

# Run migrations
railway run php artisan migrate --force

# Seed admin user
railway run php artisan db:seed --class=AdminSeeder
```

**Admin Credentials:**
- Email: `admin@visual.com`
- Password: `admin123`

### 3️⃣ Deploy Frontend ke Vercel (5 menit)

1. Buka https://vercel.com → Login dengan GitHub
2. "Add New" → "Project" → Import repo Anda
3. **PENTING**: Set "Root Directory" = `frontend`
4. Tambahkan Environment Variables:
   ```
   NEXT_PUBLIC_API_URL=https://your-backend.railway.app/api
   NEXT_PUBLIC_IMGBB_API_KEY=e94d9c13eb70addd89e9934496164b46
   ```
5. Deploy! ✅

### 4️⃣ Update CORS (1 menit)

Setelah Vercel deploy, copy URL Anda (misal: `https://hikra.vercel.app`)

1. Buka Railway → Backend project → Variables
2. Tambahkan:
   ```
   FRONTEND_URL=https://hikra.vercel.app
   ```
3. Redeploy backend

### 5️⃣ Test (2 menit)

1. Buka `https://your-app.vercel.app` → Homepage harus load
2. Login admin: `https://your-app.vercel.app/admin/login`
3. Upload test image di admin panel
4. Cek homepage, image harus muncul

---

## ✅ Checklist

- [ ] Backend deployed di Railway
- [ ] MySQL database created
- [ ] Migrations run
- [ ] Admin user seeded
- [ ] Frontend deployed di Vercel
- [ ] Environment variables set
- [ ] CORS configured
- [ ] Admin login works
- [ ] Image upload works

---

## 🆘 Troubleshooting Cepat

**Backend error 500:**
- Cek Railway logs: Deployments → View Logs
- Pastikan `APP_KEY` sudah di-generate
- Cek database credentials

**Frontend tidak bisa fetch data:**
- Cek `NEXT_PUBLIC_API_URL` di Vercel
- Pastikan ada `/api` di akhir URL
- Cek CORS: `FRONTEND_URL` di Railway

**Admin tidak bisa login:**
- Pastikan seeder sudah run
- Test credentials: `admin@visual.com` / `admin123`

---

## 📝 URLs Penting

Setelah deploy, simpan URLs ini:

- **Frontend**: https://your-app.vercel.app
- **Backend**: https://your-backend.railway.app
- **Admin Panel**: https://your-app.vercel.app/admin/login
- **API Test**: https://your-backend.railway.app/api/projects

---

## 🔄 Update Code

Push ke GitHub → Auto-deploy di Vercel & Railway!

```bash
git add .
git commit -m "Update content"
git push origin main
```

---

Butuh panduan lengkap? Baca `DEPLOYMENT-STEPS.md`
