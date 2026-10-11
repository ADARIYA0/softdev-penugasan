# Simple E-Commerce dengan Next.js 16.3.5

Aplikasi e-commerce sederhana yang dibangun dengan Next.js 16.3.5, menggunakan Fake Store API sebagai sumber data produk.

## 🎯 Fitur Utama

- ✅ **Daftar Produk**: Menampilkan semua produk dari Fake Store API
- ✅ **Pencarian Produk**: Pencarian berbasis URL dengan real-time filtering
- ✅ **Detail Produk**: Halaman detail lengkap dengan rating dan deskripsi
- ✅ **Keranjang Belanja**: Sistem cart dengan localStorage persistence
- ✅ **Responsive Design**: Mobile-first design dengan Tailwind CSS

## 🛠️ Tech Stack

- **Framework**: Next.js 16.3.5 (App Router)
- **Styling**: Tailwind CSS v4
- **State Management**: React Context API
- **Data Source**: Fake Store API (https://fakestoreapi.com)
- **Language**: JavaScript (tanpa TypeScript)

## 📁 Struktur Proyek

```
src/
├── app/
│   ├── layout.jsx              # Root layout dengan CartProvider
│   ├── page.jsx                # Halaman utama (Server Component)
│   ├── globals.css             # Tailwind CSS configuration
│   └── product/
│       └── [id]/
│           └── page.jsx        # Halaman detail produk
├── components/
│   ├── ui/                     # Komponen UI dasar
│   │   ├── button.jsx          # Button dengan varian
│   │   ├── card.jsx            # Card component
│   │   ├── input.jsx           # Input field
│   │   └── badge.jsx           # Badge untuk notifikasi
│   └── features/               # Komponen fitur spesifik
│       ├── Navbar.jsx          # Navigation bar
│       ├── SearchBar.jsx       # Search dengan URL state
│       ├── ProductCard.jsx     # Card produk
│       ├── AddToCartButton.jsx # Tombol add to cart
│       └── CartDrawer.jsx      # Drawer keranjang belanja
├── context/
│   └── CartContext.jsx         # Global state untuk cart
└── lib/
    └── (utilities bila diperlukan)
```

## 🚀 Cara Menjalankan

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Jalankan development server**:
   ```bash
   npm run dev
   ```

3. **Buka browser** di:
   ```
   http://localhost:3000
   ```

4. **Build untuk production**:
   ```bash
   npm run build
   npm start
   ```

## 📋 Fitur Detail

### 1. Server Components (RSC)
- Halaman utama (`page.jsx`) dan detail produk (`product/[id]/page.jsx`) adalah Server Components
- Data fetching dilakukan di server untuk performa optimal
- Tidak ada client-side JavaScript untuk rendering data produk

### 2. URL-Based Search
- Pencarian menggunakan URL parameters (`/?query=...`)
- State search tersinkronisasi dengan URL
- SEO-friendly dan shareable URLs

### 3. Cart Management
- Global state menggunakan React Context API
- Persistence dengan localStorage
- CRUD operations lengkap: add, remove, update quantity, clear
- Real-time update total quantity dan price

### 4. Design Principles
- **Minimalis**: Desain bersih tanpa ornamen berlebihan
- **Anti AI-Slop**: Mengikuti prinsip desain yang konsisten dan terukur
- **Responsive**: Mobile-first approach dengan breakpoints Tailwind
- **Accessible**: ARIA labels dan alt text pada gambar

## 🎨 Komponen UI

### Button
Memiliki 3 varian:
- `default`: Background hitam dengan teks putih
- `outline`: Border dengan background transparan
- `ghost`: Tanpa border atau background

### Card
Komponen pembungkus dengan border tipis dan shadow minimal, terdiri dari:
- `CardHeader`
- `CardBody`
- `CardFooter`

### Input
Input field dengan focus ring dan styling konsisten.

### Badge
Notifikasi kecil untuk jumlah item di cart atau label kategori.

## 📝 Catatan Implementasi

1. **Tailwind CSS v4**: Menggunakan `@import "tailwindcss"` alih-alih direktif v3
2. **Suspense Boundary**: SearchBar dibungkus Suspense untuk menghindari error pada useSearchParams
3. **Image Optimization**: Menggunakan `next/image` dengan `remotePatterns` konfigurasi
4. **No TypeScript**: Semua file menggunakan `.jsx` extension
5. **localStorage**: Cart data persisted di browser untuk pengalaman yang lebih baik

## 🔧 Konfigurasi

### next.config.mjs
```javascript
{
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'fakestoreapi.com',
        pathname: '/img/**',
      },
    ],
  },
}
```

## 📖 Dokumentasi Tambahan

Lihat file-file berikut untuk panduan lengkap:
- `AGENT.md` - Instruksi AI Agent dan panduan implementasi
- `ARCHITECTURE.md` - Arsitektur dan pola rendering
- `DESIGN.md` - Panduan desain dan UI/UX

## 📄 License

Project ini dibuat untuk keperluan pembelajaran.
