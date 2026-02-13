# SEO Setup Guide - Hikra Lesmana Portfolio

## ✅ Yang Sudah Disetup:

### 1. Meta Tags (SEO Basics)
- ✅ Title tags dengan keyword "hikralesmana"
- ✅ Meta description yang menarik
- ✅ Keywords targeting
- ✅ Author & creator tags
- ✅ Robots meta tags

### 2. Open Graph (Social Media)
- ✅ OG tags untuk Facebook, Instagram, LinkedIn
- ✅ Twitter Card tags
- ✅ Image preview setup (butuh upload og-image.jpg)

### 3. Structured Data (Rich Snippets)
- ✅ Person schema (untuk personal branding)
- ✅ Professional Service schema (untuk bisnis)
- ✅ Contact information
- ✅ Location data

### 4. Technical SEO
- ✅ Sitemap.xml (auto-generated)
- ✅ Robots.txt (auto-generated)
- ✅ Proper HTML lang attribute
- ✅ Mobile-friendly design
- ✅ Fast loading (lazy loading, optimized)

---

## 🚀 Langkah Selanjutnya (Setelah Deploy):

### 1. Upload OG Image
📁 **File**: `frontend/public/og-image.jpg`
📐 **Size**: 1200 x 630 pixels
📝 **Lihat**: `og-image-instructions.md` untuk panduan

### 2. Update Domain di Config
Ganti semua `https://hikralesmana.com` dengan domain Anda yang sebenarnya di:
- `frontend/src/app/layout.tsx` (metadata.metadataBase)
- `frontend/src/app/sitemap.ts` (baseUrl)
- `frontend/src/app/robots.ts` (baseUrl)

### 3. Google Search Console Setup
1. Buka: https://search.google.com/search-console
2. Add property dengan domain Anda
3. Verify ownership (pilih HTML tag method)
4. Copy verification code
5. Paste di `layout.tsx` → `metadata.verification.google`
6. Submit sitemap: `https://yourdomain.com/sitemap.xml`

### 4. Google Business Profile (Optional tapi Recommended)
1. Buka: https://business.google.com
2. Create business profile
3. Kategori: "Photographer" atau "Videographer"
4. Tambahkan lokasi: Tanjungpinang, Kepulauan Riau
5. Upload foto portfolio
6. Verify bisnis Anda

### 5. Social Media Optimization
**Instagram**:
- Bio: Tambahkan link website
- Highlight: Buat "Portfolio" highlight
- Post regularly dengan hashtag lokal

**Facebook Page** (Optional):
- Create business page
- Link ke website
- Post portfolio

---

## 🎯 Keyword Strategy untuk Ranking #1

### Primary Keywords (Target Utama):
1. **hikralesmana** ← Nama Anda (paling mudah ranking #1)
2. **hikra lesmana**
3. **photographer tanjungpinang**
4. **videographer tanjungpinang**
5. **wedding photographer kepri**

### Secondary Keywords:
- product photography tanjungpinang
- event photographer kepulauan riau
- corporate video tanjungpinang
- jasa foto tanjungpinang
- jasa video tanjungpinang

### Long-tail Keywords:
- "photographer tanjungpinang untuk wedding"
- "jasa foto produk tanjungpinang"
- "videographer event kepulauan riau"

---

## 📈 Tips Ranking #1 di Google:

### 1. Content is King
✅ **Sudah ada**: Portfolio projects dengan deskripsi
📝 **Tambahan**: 
- Update portfolio regularly
- Tulis deskripsi project yang detail
- Gunakan keyword naturally

### 2. Backlinks (Penting!)
Cara dapat backlinks:
- List di direktori photographer Indonesia
- Guest post di blog photography
- Kolaborasi dengan vendor wedding
- Feature di media lokal Tanjungpinang
- Instagram bio link

### 3. Local SEO
✅ **Sudah ada**: Location di structured data
📝 **Tambahan**:
- Google Business Profile (WAJIB!)
- Mention "Tanjungpinang" di content
- Get reviews dari client

### 4. Social Signals
- Post portfolio di Instagram regularly
- Engage dengan followers
- Use hashtags: #photographertanjungpinang #keprifotografer
- Tag lokasi Tanjungpinang di posts

### 5. Technical Performance
✅ **Sudah optimal**:
- Fast loading
- Mobile-friendly
- Lazy loading images
- Clean code

---

## 🔍 Monitoring & Analytics

### Google Analytics (Recommended)
1. Buka: https://analytics.google.com
2. Create property
3. Get tracking ID
4. Install di website (bisa pakai Google Tag Manager)

### Track These Metrics:
- Organic search traffic
- Keyword rankings
- Bounce rate
- Page views
- Conversion (contact form submissions)

### Tools untuk Check Ranking:
- Google Search Console (gratis)
- Ubersuggest (gratis, limited)
- SEMrush (berbayar)
- Ahrefs (berbayar)

---

## ⏱️ Timeline Ranking #1:

### Keyword "hikralesmana":
- **Week 1-2**: Indexed oleh Google
- **Week 3-4**: Mulai muncul di halaman 1-3
- **Month 2**: Ranking #1 (karena nama unik)

### Keyword "photographer tanjungpinang":
- **Month 1-2**: Mulai muncul di halaman 2-5
- **Month 3-6**: Naik ke halaman 1
- **Month 6-12**: Bisa ranking #1-3 (dengan backlinks & content)

### Faktor yang Mempercepat:
✅ Google Business Profile verified
✅ Backlinks dari website lokal
✅ Regular content updates
✅ Client reviews
✅ Social media active

---

## 📋 Checklist Setelah Deploy:

- [ ] Upload og-image.jpg
- [ ] Update domain di semua config files
- [ ] Submit ke Google Search Console
- [ ] Submit sitemap
- [ ] Create Google Business Profile
- [ ] Install Google Analytics
- [ ] Update Instagram bio dengan link website
- [ ] Post announcement di Instagram
- [ ] Ask clients untuk review
- [ ] Monitor ranking weekly

---

## 🆘 Troubleshooting:

**Q: Website tidak muncul di Google setelah 2 minggu?**
A: 
1. Check Google Search Console → Coverage
2. Submit URL inspection
3. Pastikan robots.txt tidak block Google
4. Check apakah ada error di structured data

**Q: OG image tidak muncul saat share?**
A:
1. Clear cache: https://developers.facebook.com/tools/debug/
2. Pastikan og-image.jpg ada di public folder
3. Check file size < 8MB
4. Format harus JPG atau PNG

**Q: Ranking tidak naik-naik?**
A:
1. Fokus ke backlinks (paling penting!)
2. Update content regularly
3. Get client reviews
4. Active di social media
5. Sabar, SEO butuh waktu 3-6 bulan

---

## 📞 Need Help?

Kalau ada pertanyaan tentang SEO setup, bisa:
1. Check Google Search Console Help
2. Join komunitas SEO Indonesia
3. Konsultasi dengan SEO specialist

**Good luck ranking #1! 🚀**
