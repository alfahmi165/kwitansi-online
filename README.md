# Kwitansi Online - React to Print Edition 🎉

Aplikasi web untuk membuat dan mencetak kwitansi (bukti pembayaran) dalam format PDF dengan presisi tinggi menggunakan **React to Print**.

## ✨ Fitur Utama

- ✅ **React to Print** - Rendering PDF lebih presisi dan akurat
- ✅ **Real-time Preview** - Preview kwitansi saat mengisi form
- ✅ **Konversi Angka ke Terbilang** - Automatic conversion ke bahasa Indonesia
- ✅ **Format Mata Uang** - Automatic formatting untuk nominal (Rp)
- ✅ **Responsive Design** - Dapat digunakan di desktop dan mobile
- ✅ **Print Optimization** - Optimized untuk hasil print yang sempurna
- ✅ **Tailwind CSS** - Modern styling dengan Tailwind

## 🔄 Migrasi dari Versi Lama

### Yang Berubah

| Aspek | Versi Lama | Versi Baru |
|-------|-----------|-----------|
| Library PDF | `jsPDF + html2canvas` | **React to Print** |
| Rendering | Canvas-based (raster) | **DOM-based (native print)** |
| Presisi PDF | Sedang | **Tinggi ✓** |
| Ukuran Bundle | ~250KB | **~20KB ✓** |
| Performance | Slower (canvas render) | **Faster ✓** |
| Browser Print Dialog | Tidak | **Ya ✓** |

### Keuntungan React to Print

1. **Presisi Lebih Tinggi** - Menggunakan native browser print engine
2. **Lebih Cepat** - Tidak perlu render canvas
3. **Bundle Lebih Kecil** - Dependency berkurang drastis
4. **Support Layout Kompleks** - CSS print media query fully supported
5. **Better Typography** - Fonts dan text rendering lebih natural
6. **No Extra Processing** - Direct to browser's print system

## 🚀 Quick Start

### Prerequisites
- Node.js >= 16
- npm atau yarn

### Installation

```bash
# Clone atau extract project
cd kwitansi-online-improved

# Install dependencies
npm install

# Start development server
npm run dev
```

Server akan berjalan di `http://localhost:5173`

### Build untuk Production

```bash
npm run build
```

Hasil build ada di folder `dist/`

## 📁 Struktur Folder

```
kwitansi-online-improved/
├── src/
│   ├── components/
│   │   ├── KwitansiForm.jsx        # Form input & print controller
│   │   └── KwitansiPreview.jsx     # Komponen kwitansi (dengan ref untuk print)
│   ├── utils/
│   │   └── numberToWords.js        # Utility functions
│   ├── img/
│   │   └── kwitansi-bg.png         # Background template
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── index.html
├── package.json
├── tailwind.config.js
├── postcss.config.js
├── vite.config.js
└── README.md
```

## 💻 Cara Menggunakan

### Di Browser

1. Buka aplikasi di browser
2. Isi semua field yang diperlukan:
   - No. Kwitansi (required)
   - Telah Terima Dari (required)
   - Uang Sejumlah (required)
   - Untuk Pembayaran (required)
   - Kota (required)
   - Tanggal (required)
3. Preview kwitansi otomatis muncul di sebelah kanan
4. Klik tombol "🖨️ Cetak PDF"
5. Browser's print dialog akan terbuka
6. Pilih "Save as PDF" dan simpan file

### Tips Untuk Hasil Terbaik

- Gunakan **Chrome/Chromium** untuk hasil terbaik
- Pastikan **Margin** di print dialog diatur ke **None/Minimal**
- Jangan gunakan **Background graphics** dalam print settings
- Test print ke PDF dulu sebelum print ke kertas

## 🛠️ Teknologi yang Digunakan

- **React 18** - UI Library
- **React to Print** - Print/PDF generation
- **Tailwind CSS** - Styling
- **Vite** - Build tool & dev server
- **PostCSS** - CSS processing

## 📝 File Penting

### KwitansiForm.jsx
- Main form component
- Handles form state management
- Setup print hook dengan `useReactToPrint`
- Real-time preview

### KwitansiPreview.jsx
- Komponen untuk ditampilkan di preview dan saat print
- Menggunakan `forwardRef` untuk react-to-print
- Styling optimized untuk print

### numberToWords.js
- Convert number ke terbilang (Rp 100.000 → seratus ribu)
- Format currency
- Utility functions

## 🐛 Troubleshooting

### Printing tidak muncul di preview?
- Pastikan semua field sudah diisi
- Refresh halaman dan coba lagi

### Font tidak sesuai saat print?
- Font yang digunakan adalah Times New Roman (serif)
- Pastikan font tersedia di sistem
- Bisa di-customize di `KwitansiPreview.jsx`

### Layout berantakan saat print?
- Cek ukuran monitor/zoom browser
- Reset zoom ke 100% (Ctrl+0 atau Cmd+0)
- Pastikan tidak ada extension browser yang interfere

### Background tidak muncul?
- Print settings harus mengaktifkan "Background graphics"
- Bisa set default di browser print settings

## 📱 Responsive Design

Aplikasi responsif di semua ukuran layar:
- **Desktop** - Full layout dengan preview di samping
- **Tablet** - Stack layout, preview di bawah
- **Mobile** - Optimized untuk mobile browsing

## 🔐 Security

- Tidak ada data yang dikirim ke server
- Semua processing dilakukan di client-side
- PDF dihasilkan di browser lokal

## 📄 License

Bebas digunakan untuk keperluan pribadi dan komersial.

## 🤝 Support & Issues

Jika menemukan bug atau ada saran, silahkan laporkan.

---

**Selamat menggunakan Aplikasi Kwitansi Online! 🎉**
