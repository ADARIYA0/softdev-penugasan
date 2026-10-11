# Instruksi AI Agent: Next.js 16.3.5 E-Commerce

## 🎯 Deskripsi Proyek

Proyek ini adalah aplikasi e-commerce sederhana yang dibangun menggunakan **Next.js versi 16.3.5 (App Router)**. Proyek ini mengutamakan kesederhanaan, performa dasar, dan menghindari kompleksitas yang tidak perlu. Data produk tiruan akan di-fetch dari [Fake Store API](https://fakestoreapi.com/).

## 🛠️ Tech Stack Utama

* **Framework:** Next.js 16.3.5 (App Router)
* **Styling:** Tailwind CSS
* **Bahasa:** JavaScript murni (TIDAK MENGGUNAKAN TypeScript)
* **State Management (Cart):** React Context API (Bawaan React, tanpa library eksternal)
* **Data Fetching:** Native `fetch` API dengan React Server Components (RSC).

## 📋 Fitur Inti & Panduan Implementasi

### 1. Data Fetching (Fake Store API)

* **Base URL:** `https://fakestoreapi.com/products`
* **Aturan Implementasi:**
  * Utamakan **React Server Components (RSC)** untuk melakukan fetching data produk.
  * Komponen halaman utama dan halaman detail produk sebisa mungkin berjalan di sisi server (jangan gunakan `"use client"` kecuali sangat diperlukan).
  * Manfaatkan file `loading.js` sederhana untuk skeleton/indikator loading dan `error.js` untuk penanganan error dasar.

### 2. Sistem Add to Cart (React Context)

* **Aturan Implementasi:**
  * Buat sebuah global state menggunakan **React Context API** (misal: `CartContext.js`) untuk menyimpan data keranjang belanja.
  * Gunakan hook bawaan `useState` atau `useReducer` di dalam Context tersebut.
  * **Persistensi Sederhana:** Gunakan hook `useEffect` untuk menyimpan array keranjang ke `localStorage` setiap kali ada perubahan, dan mengambilnya dari `localStorage` saat komponen pertama kali dimuat (agar cart tidak hilang saat di-refresh).
  * State cukup menyimpan data dasar: id produk, nama, harga, gambar, dan jumlah (quantity).
  * Gunakan direktif `"use client"` pada file Context ini dan pada komponen yang berinteraksi langsung dengan keranjang (seperti tombol "Add to Cart" dan komponen tampilan Cart).

### 3. Fitur Pencarian (Searching)

* **Aturan Implementasi:**
  * Gunakan **URL-based state** (contoh: `/?query=baju`) untuk fitur pencarian. Ini sangat disarankan di Next.js.
  * Gunakan hooks `useSearchParams`, `usePathname`, dan `useRouter` dari `next/navigation` pada komponen input pencarian (Client Component) untuk mengubah URL saat user mengetik.
  * Di halaman utama (`page.js` Server Component), tangkap nilai `searchParams` untuk memfilter data produk yang didapat dari Fake Store API sebelum menampilkannya ke layar.

## 📐 Standar Koding & Konvensi

* **Struktur Folder:** Pisahkan kode secara sederhana. Buat folder `/components` (untuk UI), dan `/context` atau `/provider` (untuk React Context). Routing tetap berada di dalam `/app`.
* **Tanpa TypeScript:** Karena menggunakan JavaScript murni, abaikan penulisan interface/type. Pastikan saja nama variabel (props) jelas dan deskriptif.
* **Komponen Gambar:** Tetap gunakan `<Image />` dari `next/image`. **Penting bagi AI:** Jangan lupa untuk menambahkan `fakestoreapi.com` ke daftar `remotePatterns` atau `domains` di dalam file `next.config.mjs` (atau `next.config.js`).