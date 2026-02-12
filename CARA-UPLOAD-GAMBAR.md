# 📸 Cara Upload Gambar - Panduan Lengkap

## 🎯 Ringkasan Cepat

Anda menggunakan **ImgBB** untuk upload gambar:
- ✅ Gratis unlimited storage & bandwidth
- ✅ Max 32MB per file
- ✅ Upload langsung dari admin panel
- ✅ Tidak perlu backend

**API Key:** `e94d9c13eb70addd89e9934496164b46`

---

## 🚀 Cara Upload (Development)

### Step 1: Pastikan Server Berjalan

```bash
# Terminal 1 - Backend
cd backend
php artisan serve

# Terminal 2 - Frontend
cd frontend
npm run dev
```

### Step 2: Login ke Admin Panel

1. Buka browser: http://localhost:3000/admin/login
2. Login dengan:
   - Email: `admin@visual.com`
   - Password: `admin123`

### Step 3: Upload Gambar

#### Option A: Upload File Langsung

1. Klik "Projects" atau "Testimonials"
2. Klik "Add New Project" / "Add New Testimonial"
3. Scroll ke bagian "Image URL"
4. Klik "Choose File" di bawah input URL
5. Pilih gambar dari komputer (max 5MB)
6. Tunggu upload selesai (muncul alert "Image uploaded successfully!")
7. URL gambar otomatis terisi
8. Isi field lainnya
9. Klik "Create Project" / "Create Testimonial"

#### Option B: Paste URL Langsung

1. Buka https://unsplash.com atau https://pexels.com
2. Cari gambar yang diinginkan
3. Klik kanan gambar → "Copy image address"
4. Paste di field "Image URL"
5. Isi field lainnya
6. Klik "Create"

---

## 🎨 Tips Memilih Gambar

### Untuk Projects
- **Ratio:** 16:9 atau 4:3 (landscape)
- **Ukuran:** Min 1200x800px
- **Format:** JPG atau PNG
- **Contoh:** Foto hasil editing, video thumbnail

### Untuk Gallery
- **Ratio:** Bebas (portrait/landscape)
- **Ukuran:** Min 800x1200px (portrait) atau 1200x800px (landscape)
- **Format:** JPG atau PNG
- **Contoh:** Portfolio foto terbaik

### Untuk Testimonials
- **Ratio:** 1:1 (square) atau 3:4 (portrait)
- **Ukuran:** Min 400x400px
- **Format:** JPG atau PNG
- **Contoh:** Foto client

---

## 🔧 Troubleshooting

### Error: "File too large! Max 5MB"

**Penyebab:** File lebih dari 5MB

**Solusi:**
1. Compress gambar di https://tinypng.com
2. Atau resize di https://imageresizer.com
3. Upload ulang

### Error: "Failed to upload image"

**Penyebab:** API key tidak valid atau network error

**Solusi:**
1. Cek `frontend/.env.local`:
   ```
   NEXT_PUBLIC_IMGBB_API_KEY=e94d9c13eb70addd89e9934496164b46
   ```
2. Restart Next.js server:
   ```bash
   # Ctrl+C untuk stop
   npm run dev
   ```
3. Coba upload lagi

### Upload berhasil tapi gambar tidak muncul

**Penyebab:** URL tidak tersimpan ke database

**Solusi:**
1. Cek browser console (F12)
2. Pastikan backend running di http://localhost:8000
3. Test API: http://localhost:8000/api/projects
4. Cek database di phpMyAdmin

---

## 🌐 Cara Upload (Production - Setelah Deploy)

### Step 1: Set Environment Variable di Vercel

1. Login ke https://vercel.com
2. Pilih project Anda
3. Klik "Settings" → "Environment Variables"
4. Tambahkan:
   ```
   Name: NEXT_PUBLIC_IMGBB_API_KEY
   Value: e94d9c13eb70addd89e9934496164b46
   ```
5. Klik "Save"
6. Redeploy: Deployments → Latest → "Redeploy"

### Step 2: Upload Seperti Biasa

1. Buka https://your-portfolio.vercel.app/admin/login
2. Login dengan credentials yang sama
3. Upload gambar seperti di development

---

## 📊 Limits ImgBB

### Free Plan (Yang Anda Pakai)
- ✅ Unlimited storage
- ✅ Unlimited bandwidth
- ✅ Max 32MB per file
- ✅ 5000 requests/hour
- ✅ Gratis selamanya

### Jika Butuh Lebih
- Upgrade ke Premium: $3.99/month
- Max 100MB per file
- 10,000 requests/hour
- Priority support

**Untuk portfolio, Free Plan sudah lebih dari cukup!**

---

## 🎓 Cara Kerja Upload

### Flow Upload:

```
1. User pilih gambar di admin panel
   ↓
2. Frontend upload ke ImgBB API
   ↓
3. ImgBB return URL gambar
   ↓
4. Frontend simpan URL ke database Laravel
   ↓
5. Gambar tampil di homepage
```

### Keuntungan Metode Ini:
- ✅ Tidak perlu storage di server
- ✅ Tidak perlu konfigurasi backend
- ✅ Loading cepat (CDN ImgBB)
- ✅ Gratis unlimited
- ✅ Simple!

---

## 🔐 Keamanan API Key

### Apakah Aman?

**Development (localhost):**
- ✅ Aman, hanya Anda yang akses

**Production (Vercel):**
- ✅ Aman, API key di environment variable
- ✅ Tidak terlihat di source code
- ✅ Hanya admin yang bisa upload

### Best Practices:
- ✅ Jangan commit `.env.local` ke GitHub
- ✅ Gunakan environment variables di Vercel
- ✅ Jangan share API key di public
- ✅ Ganti API key jika bocor

---

## 📝 Contoh Penggunaan

### Upload Project

```
Title: Wedding Photography - Sarah & John
Category: Photography
Description: Dokumentasi pernikahan di Bali dengan konsep outdoor dan natural lighting
Image: [Upload file atau paste URL]
Client: Sarah & John
Date: 2024-02-10
```

### Upload Testimonial

```
Name: Sarah Johnson
Position: Bride
Company: -
Content: "Hasil foto pernikahannya luar biasa! Sangat profesional dan detail."
Rating: 5
Image: [Upload foto client]
```

---

## 🎯 Checklist Upload

### Sebelum Upload
- [ ] Gambar sudah di-compress (< 5MB)
- [ ] Gambar sudah di-resize sesuai kebutuhan
- [ ] Backend server running (development)
- [ ] Frontend server running (development)
- [ ] Sudah login ke admin panel

### Saat Upload
- [ ] Pilih file atau paste URL
- [ ] Tunggu upload selesai
- [ ] Cek URL terisi otomatis
- [ ] Isi field lainnya
- [ ] Klik "Create"

### Setelah Upload
- [ ] Cek gambar muncul di list admin
- [ ] Buka homepage
- [ ] Cek gambar muncul di homepage
- [ ] Test responsive di mobile

---

## 💡 Tips & Tricks

### Compress Gambar
- https://tinypng.com - Best untuk JPG/PNG
- https://squoosh.app - Advanced options
- https://imagecompressor.com - Batch compress

### Resize Gambar
- https://imageresizer.com - Simple & fast
- https://bulkresizephotos.com - Batch resize

### Free Stock Photos
- https://unsplash.com - High quality
- https://pexels.com - Free & commercial use
- https://pixabay.com - Large collection

### Edit Gambar Online
- https://photopea.com - Photoshop alternative
- https://canva.com - Design & edit
- https://remove.bg - Remove background

---

## 🆘 Butuh Bantuan?

### Jika Upload Gagal:
1. Cek browser console (F12 → Console)
2. Screenshot error message
3. Cek file size (max 5MB)
4. Cek internet connection
5. Restart server

### Jika Gambar Tidak Muncul:
1. Cek database di phpMyAdmin
2. Test API: http://localhost:8000/api/projects
3. Cek browser console
4. Clear cache browser (Ctrl+Shift+R)

---

Selamat mengupload! 📸✨
