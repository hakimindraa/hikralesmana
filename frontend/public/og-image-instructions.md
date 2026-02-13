# Open Graph Image Instructions

## Buat OG Image untuk Social Media Sharing

### Ukuran yang Dibutuhkan:
- **Dimensi**: 1200 x 630 pixels
- **Format**: JPG atau PNG
- **Nama file**: `og-image.jpg`
- **Lokasi**: Taruh di folder `frontend/public/`

### Isi yang Disarankan:
1. **Background**: Salah satu foto terbaik Anda
2. **Text Overlay**:
   - "HIKRA LESMANA"
   - "Professional Photography & Videography"
   - "Tanjungpinang, Kepulauan Riau"
3. **Logo/Watermark**: (optional)
4. **Contact**: Instagram handle atau website

### Tools untuk Membuat:
- Canva (gratis, mudah): https://www.canva.com/
- Photoshop
- Figma

### Template Canva:
1. Buka Canva
2. Pilih "Custom Size" → 1200 x 630 px
3. Pilih template "Facebook Post" atau "Twitter Post"
4. Customize dengan foto dan text Anda
5. Download sebagai JPG
6. Rename menjadi `og-image.jpg`
7. Taruh di `frontend/public/og-image.jpg`

### Contoh Layout:
```
┌─────────────────────────────────────┐
│                                     │
│     [Background: Your Best Photo]   │
│                                     │
│     HIKRA LESMANA                   │
│     Professional Photography        │
│     & Videography                   │
│                                     │
│     📍 Tanjungpinang, Kepri         │
│     📸 @hakimlesmna                 │
│                                     │
└─────────────────────────────────────┘
```

### Testing:
Setelah upload, test dengan:
- Facebook Sharing Debugger: https://developers.facebook.com/tools/debug/
- Twitter Card Validator: https://cards-dev.twitter.com/validator
- LinkedIn Post Inspector: https://www.linkedin.com/post-inspector/

### Temporary Solution:
Kalau belum sempat buat, bisa pakai foto portfolio terbaik Anda:
1. Resize ke 1200x630px
2. Rename jadi `og-image.jpg`
3. Taruh di `frontend/public/`
