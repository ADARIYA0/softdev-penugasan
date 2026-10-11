# Arsitektur Proyek E-Commerce (Next.js 16.3.5)

Dokumen ini menjelaskan struktur direktori, pola rendering, dan alur data dalam proyek e-commerce sederhana ini. Proyek ini mengadopsi pendekatan **Arsitektur Monolitik (Monolithic Architecture)**, di mana seluruh antarmuka pengguna (UI), routing, *state management*, dan logika *server-side* disatukan di dalam satu repositori tunggal. Arsitektur ini dirancang untuk menjaga kode tetap modular, mudah dibaca, dan memanfaatkan fitur bawaan React dan Next.js (JavaScript murni).

## 1. Pendekatan Arsitektur Monolitik

*   **Single Codebase:** Seluruh komponen *frontend* (Client Components) dan pemrosesan logika di sisi server (Server Components) hidup berdampingan di satu tempat (`/src`). Tidak ada layanan *backend* atau *microservices* internal yang dipisah.
*   **Direct Third-Party Integration:** Aplikasi monolit ini langsung mengkonsumsi data dari layanan eksternal (Fake Store API) melalui Server Components, bertindak sebagai penyaji UI sekaligus "backend" pengelola data bagi dirinya sendiri.

## 2. Struktur Direktori

Proyek ini menggunakan direktori `src/` sebagai pusat kode sumber. Berikut adalah peta struktur dan fungsi masing-masing foldernya:

```text
📦 src
 ┣ 📂 app                  # App Router (Routing, Halaman, dan Layout)
 ┃ ┣ 📜 layout.jsx         # Root layout (Tempat membungkus CartProvider)
 ┃ ┣ 📜 page.jsx           # Halaman utama (Server Component, fetch produk & handle searchParams)
 ┃ ┣ 📜 globals.css        # Styling global Tailwind
 ┃ ┗ 📂 product            # (Rencana) Routing untuk detail produk
 ┃   ┗ 📂 [id]
 ┃     ┗ 📜 page.jsx       # Halaman detail produk (Server Component)
 ┣ 📂 components           # Reusable UI Components
 ┃ ┣ 📂 ui                 # Komponen UI dasar (badge, button, card, input)
 ┃ ┗ 📂 features           # (Rencana) Komponen spesifik fitur (ProductList, SearchBar, CartDrawer)
 ┣ 📂 context              # (Rencana) React Context untuk Global State
 ┃ ┗ 📜 CartContext.jsx    # State management untuk keranjang belanja (Client Component)
 ┗ 📂 lib                  # (Rencana) Utility functions
   ┗ 📜 utils.js           # Fungsi pembantu (misal: format mata uang, fetcher helper)
```

## 3. Pola Rendering (Server & Client Components)

Arsitektur monolit ini sangat membedakan antara komponen server dan klien untuk optimalisasi performa dalam satu basis kode:

*   **Server Components (Default):** Digunakan untuk `page.jsx`, `layout.jsx`, dan komponen yang tugasnya hanya menampilkan data (seperti `ProductCard` jika tidak ada state interaktif di dalamnya). Ini meminimalisir beban di sisi klien.
*   **Client Components (`"use client"`):** Hanya digunakan pada titik interaktivitas.
    *   `CartContext.jsx` (karena menggunakan React hook `useState`/`useEffect`).
    *   Komponen `SearchBar.jsx` (karena menangani input user dan merubah URL via `useRouter`).
    *   Tombol `AddToCartButton.jsx` (karena berinteraksi dengan `CartContext`).

## 4. Alur Data Fitur Utama

### A. Fetching Data & Pencarian (URL-based Search)
1. User mengetik di komponen `SearchBar` (Client Component).
2. `SearchBar` memperbarui URL dengan parameter (contoh: `/?query=jacket`).
3. Komponen `page.jsx` (Server Component) membaca `searchParams.query`.
4. `page.jsx` melakukan `fetch` ke Fake Store API. Jika ada `query`, data difilter di server.
5. `page.jsx` meneruskan data (props) ke komponen list produk untuk dirender.

### B. Sistem Keranjang Belanja (Add to Cart)
1. File `CartContext.jsx` menyimpan state array `cart` dan mengekspos fungsi `addToCart`, `removeFromCart`.
2. `CartContext` menggunakan `useEffect` untuk menyinkronkan state dengan `localStorage` (agar cart bertahan saat refresh).
3. `CartContext.Provider` dibungkus di dalam `layout.jsx` agar bisa diakses secara global di seluruh halaman.
4. Saat user menekan tombol di `AddToCartButton`, fungsi dari context dipanggil untuk meng-update state global.

## 5. Panduan Pengembangan Kedepan (Best Practices)
*   **Pertahankan Sifat Monolitik:** Jangan membuat API endpoint internal (`/app/api/...`) kecuali benar-benar dibutuhkan (misalnya untuk menyembunyikan API Key rahasia). Selama memungkinkan, lakukan *fetching* langsung di Server Components.
*   **Keep it Simple:** Jangan membuat komponen terlalu kompleks. Jika sebuah komponen UI di `components/ui/` mulai memiliki *business logic* (seperti fetching), pisahkan logic tersebut.
*   **Prop Drilling:** Karena sudah ada `CartContext`, hindari melempar props berlapis-lapis (prop drilling) untuk urusan keranjang belanja. Komponen yang butuh data cart cukup memanggil `useCart()` dari context.
*   **Error Handling:** Selalu siapkan penanganan jika Fake Store API sedang down (misalnya membuat file `error.jsx` di direktori `app/`).