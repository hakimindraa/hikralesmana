# Font Setup

Untuk menggunakan custom font dari DaFont:

1. Download 2 font dari https://www.dafont.com/
   - Rekomendasi: Montserrat, Poppins, Raleway, atau Inter
   - Download versi Bold (untuk heading) dan Regular (untuk body)

2. Rename file font:
   - `heading.ttf` - untuk judul (Bold/tebal)
   - `body.ttf` - untuk teks biasa (Regular/tipis)

3. Letakkan kedua file di folder ini (`frontend/public/fonts/`)

4. Edit `frontend/src/app/layout.tsx`:
   - Uncomment bagian localFont
   - Comment bagian Google Fonts

Saat ini menggunakan Inter dari Google Fonts sebagai fallback.
