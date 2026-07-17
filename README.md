# Aplikasi Kwitansi Online

Aplikasi web untuk membuat dan mencetak kwitansi dalam format PDF dengan mudah. Dibangun menggunakan React, Vite, Tailwind CSS, dan jsPDF.

## Fitur

- ✅ Form input yang user-friendly untuk data kwitansi
- ✅ Preview real-time kwitansi
- ✅ Export ke PDF format A4 Portrait
- ✅ Konversi nominal ke terbilang otomatis
- ✅ Format mata uang Rupiah otomatis
- ✅ Responsive design dengan Tailwind CSS
- ✅ Validasi form sebelum print

## Tech Stack

- **React 18.3** - UI Library
- **Vite 5.1** - Build tool
- **Tailwind CSS 3.4** - Styling
- **jsPDF 2.5** - PDF generation
- **html2canvas 1.4** - HTML to canvas conversion

## Instalasi

### Prerequisites
- Node.js (v16 atau lebih tinggi)
- npm atau yarn

### Step-by-step

1. **Clone atau download project**
```bash
cd kwitansi-app
```

2. **Install dependencies**
```bash
npm install
```

3. **Run development server**
```bash
npm run dev
```

Aplikasi akan membuka di `http://localhost:5173`

4. **Build untuk production**
```bash
npm run build
```

Hasil build akan tersimpan di folder `dist/`

## Penggunaan

1. **Isi Form Data:**
   - No. Kwitansi: Nomor identitas kwitansi (misal: KW-2025-001)
   - Telah Terima Dari: Nama yang menerima pembayaran
   - Uang Sejumlah: Jumlah nominal dalam Rupiah
   - Untuk Pembayaran: Keterangan tujuan pembayaran
   - Kota: Kota penerbitan kwitansi
   - Tanggal: Tanggal penerbitan kwitansi

2. **Preview:**
   - Lihat preview real-time di sebelah kanan form
   - Data akan otomatis ter-update saat Anda mengetik

3. **Export PDF:**
   - Klik tombol "📥 Cetak PDF"
   - File PDF akan langsung terunduh ke perangkat Anda
   - Nama file otomatis: `Kwitansi_[No]_[timestamp].pdf`

4. **Reset Form:**
   - Klik tombol "🔄 Reset Form" untuk menghapus semua data

## Struktur Folder

```
kwitansi-app/
├── src/
│   ├── components/
│   │   ├── KwitansiForm.jsx      # Form input utama
│   │   └── KwitansiPreview.jsx   # Preview layout kwitansi
│   ├── utils/
│   │   └── pdfGenerator.js       # Fungsi generate PDF
│   ├── App.jsx                   # Main component
│   ├── main.jsx                  # React entry point
│   └── index.css                 # Global styles
├── index.html                    # HTML entry point
├── package.json                  # Dependencies
├── vite.config.js               # Vite configuration
├── tailwind.config.js           # Tailwind configuration
├── postcss.config.js            # PostCSS configuration
└── README.md                    # Documentation
```

## Fitur Detail

### Konversi Nominal ke Terbilang
- Otomatis mengkonversi angka ke kata-kata Bahasa Indonesia
- Contoh: 99999999 → "sembilan puluh sembilan juta sembilan ratus sembilan puluh sembilan ribu sembilan ratus sembilan puluh sembilan rupiah"

### Format Mata Uang
- Menggunakan format Rupiah Indonesia (Rp)
- Contoh: 99999999 → Rp 99.999.999

### Validasi Form
- Semua field harus terisi sebelum print
- Alert akan muncul jika ada field yang kosong

### Export PDF
- Ukuran kertas: A4 Portrait (210mm x 297mm)
- Kualitas tinggi (scale: 2)
- Background putih untuk hasil print yang baik

## Tips & Trik

1. **Nomor Kwitansi:**
   - Gunakan format konsisten seperti KW-YYYY-XXX
   - Mudah untuk tracking dan dokumentasi

2. **Deskripsi Pembayaran:**
   - Jelaskan detail pembayaran dengan jelas
   - Contoh: "Pembayaran Biaya Sewa Ruang Kantor Bulan Januari 2025"

3. **Format Tanggal:**
   - Gunakan format standar Indonesia untuk konsistensi
   - Contoh: 15 Januari 2025

4. **Printing:**
   - PDF sudah siap untuk print
   - Pastikan printer dalam kondisi baik untuk hasil optimal

## Troubleshooting

### PDF tidak terunduh
- Periksa pengaturan browser untuk pop-up blocker
- Pastikan JavaScript diaktifkan

### Layout PDF tidak sempurna
- Refresh halaman dan coba lagi
- Pastikan menggunakan browser terbaru (Chrome, Firefox, Safari)

### Preview tidak muncul
- Klik tombol "Show" di bagian Preview
- Atau refresh halaman

## Lisensi

MIT License - Bebas digunakan untuk keperluan personal maupun komersial

## Support

Jika ada pertanyaan atau menemukan bug, silakan buat issue atau hubungi developer.

---

**Version:** 1.0.0  
**Last Updated:** 2025
