# Floating Buttons - WhatsApp & Scroll to Top

## Fitur yang Ditambahkan

### 1. WhatsApp Floating Button
- **Posisi**: Pojok kanan bawah (paling atas dari 2 tombol)
- **Warna**: Hijau WhatsApp (#25D366)
- **Fitur**:
  - Langsung buka WhatsApp dengan pesan template
  - Pulse animation untuk menarik perhatian
  - Tooltip "Chat via WhatsApp" saat hover
  - Smooth hover effect dengan scale
  - Shadow effect untuk depth

### 2. Scroll to Top Button
- **Posisi**: Pojok kanan bawah (di bawah tombol WhatsApp)
- **Behavior**: 
  - Muncul setelah scroll 300px ke bawah
  - Smooth scroll animation ke atas
  - Tooltip "Back to Top" saat hover
  - Hover effect dengan perubahan warna

## Cara Mengubah Nomor WhatsApp

Edit file: `frontend/src/components/FloatingButtons.tsx`

Cari baris:
```typescript
const whatsappNumber = '6283137412551'
```

Ganti dengan nomor WhatsApp Anda (format: kode negara + nomor tanpa 0 di depan)

## Cara Mengubah Pesan WhatsApp Template

Edit file: `frontend/src/components/FloatingButtons.tsx`

Cari baris:
```typescript
const whatsappMessage = encodeURIComponent(
  'Halo! Saya tertarik dengan jasa photography/videography Anda. Bisa diskusi lebih lanjut?'
)
```

Ganti teks di dalam tanda kutip dengan pesan yang Anda inginkan.

## Cara Menonaktifkan Salah Satu Tombol

### Nonaktifkan WhatsApp Button:
Hapus atau comment section WhatsApp Button di file `FloatingButtons.tsx`

### Nonaktifkan Scroll to Top:
Hapus atau comment section Scroll to Top Button di file `FloatingButtons.tsx`

## Styling & Customization

### Mengubah Posisi
Edit di `FloatingButtons.tsx`:
```typescript
<div className="fixed bottom-8 right-8 z-50 flex flex-col gap-3">
```
- `bottom-8`: jarak dari bawah (8 = 32px)
- `right-8`: jarak dari kanan (8 = 32px)
- `gap-3`: jarak antar tombol (3 = 12px)

### Mengubah Ukuran Tombol
Cari `w-14 h-14` dan ganti dengan ukuran lain:
- `w-12 h-12` = lebih kecil (48px)
- `w-16 h-16` = lebih besar (64px)

### Mengubah Warna WhatsApp Button
Cari `bg-[#25D366]` dan ganti dengan warna lain.

## Mobile Responsive
Tombol otomatis responsive dan tetap terlihat di semua ukuran layar.

## Browser Support
- Chrome ✅
- Firefox ✅
- Safari ✅
- Edge ✅
- Mobile browsers ✅
