# Panduan Desain & UI/UX (E-Commerce Sederhana)

Dokumen ini memuat panduan visual, sistem komponen, dan standar styling untuk proyek e-commerce ini. Tujuannya adalah untuk menjaga konsistensi tampilan (UI) dan pengalaman pengguna (UX) agar tetap bersih, modern, dan responsif.

## 1. Pendekatan Desain Utama

* **Gaya Visual:** Minimalis, bersih, dan fokus pada konten (produk). Terinspirasi dari gaya komponen *shadcn/ui*.
* **Styling Engine:** Tailwind CSS. Semua penataan gaya harus menggunakan utility classes dari Tailwind. Hindari penambahan file `.css` kustom kecuali untuk konfigurasi global di `globals.css`.
* **Responsivitas:** Menggunakan pendekatan *Mobile-First*. Desain default diperuntukkan bagi layar kecil (HP), lalu disesuaikan untuk layar besar menggunakan breakpoint Tailwind (`sm:`, `md:`, `lg:`).

## 2. Prinsip "Anti AI-Slop" (PENTING)

Untuk menghindari tampilan yang terkesan "murahan" atau seperti hasil *generate* AI yang serampangan, ikuti aturan ketat berikut:

* **Tanpa Ornamen Kosong:** Jangan gunakan efek *glassmorphism* berlebihan, gradien latar belakang yang rumit, atau *drop shadow* berlapis-lapis tanpa alasan struktural. Gunakan batas (border) tipis (`border-slate-200`) dan bayangan ringan (`shadow-sm`) saja.
* **Konsistensi Spasi Terukur:** Jangan gunakan padding atau margin sembarangan (misal hindari nilai *arbitrary* seperti `p-[17px]`). Selalu patuhi skala ukuran standar Tailwind (seperti `p-4`, `p-6`, `gap-4`). Kerapian spasi adalah kunci desain "manusiawi".
* **Minimalkan Animasi:** Hindari animasi masuk (fade-in/slide-in) yang lambat dan berlebihan setiap kali men-scroll halaman. Animasi hanya boleh digunakan untuk interaksi (misal: *hover state* pada tombol dengan `transition-colors duration-200`).
* **Micro-copy Realistis:** Hindari penggunaan teks *placeholder* berlebihan atau gaya bahasa yang terlalu muluk-muluk khas AI. Gunakan bahasa yang lugas, fungsional, dan sesuai konteks e-commerce.

## 3. Sistem Warna (Color Palette)

Karena ini e-commerce sederhana, kita menggunakan palet warna monokromatik dengan satu warna utama (*primary*) untuk aksi.

* **Background:** Putih (`bg-white`) atau abu-abu sangat terang (`bg-slate-50`) untuk membedakan area konten.
* **Teks Utama:** Abu-abu sangat gelap (`text-slate-900`) untuk keterbacaan optimal.
* **Teks Sekunder:** Abu-abu sedang (`text-slate-500`) untuk deskripsi atau teks pendukung.
* **Warna Utama (Primary):** Hitam pekat (`bg-black text-white`) atau biru gelap (`bg-blue-600`) untuk tombol utama (Call to Action) seperti "Add to Cart" dan "Checkout".
* **Aksen/Peringatan:** Merah (`text-red-500`) untuk pesan error atau tombol hapus dari keranjang.

## 4. Tipografi

* **Font Utama:** Menggunakan font bawaan Next.js (seperti `Inter` atau `Geist`) yang diset di `layout.jsx`.
* **Hirarki Ukuran:**
  * Judul Halaman / Logo: `text-2xl font-bold`
  * Judul Produk: `text-lg font-semibold`
  * Harga: `text-xl font-bold`
  * Teks Paragraf/Deskripsi: `text-sm` atau `text-base`

## 5. Standar Komponen UI

Berdasarkan struktur di folder `src/components/ui/`, berikut standar penggunaannya:

* **`Button` (`button.jsx`):** Memiliki varian gaya. `default` (hitam/warna utama penuh), `outline` (garis pinggir, transparan), dan `ghost` (tanpa latar/garis, untuk ikon). Selalu berikan efek *hover* yang tegas dan cepat.
* **`Card` (`card.jsx` & `card_component.jsx`):** Digunakan untuk membungkus produk. Gunakan border tipis (`border border-slate-200`), *rounded corners* (`rounded-lg`), dan sedikit bayangan (`shadow-sm`). Tidak boleh ada efek *glowing* 3D.
* **`Input` (`input.jsx`):** Digunakan untuk `SearchBar`. Desain simpel dengan border abu-abu (`border-slate-300`), *rounded corners*, dan outline jelas saat fokus (`focus:ring-2 focus:ring-slate-900 focus:outline-none`).
* **`Badge` (`badge.jsx`):** Digunakan untuk indikator jumlah item di ikon keranjang belanja (Cart) atau label kategori produk. Biasanya berwarna merah atau warna utama dengan teks kecil (`text-xs`).

## 6. Struktur Layout Halaman Utama

### A. Navbar (Global)
* Posisi *Sticky* di atas layar dengan latar belakang solid (putih/abu-abu), hindari efek transparan/blur yang berlebihan.
* Kiri: Logo/Nama Toko (bisa diklik kembali ke beranda).
* Tengah: `SearchBar` (lebar disesuaikan, responsif).
* Kanan: Ikon Keranjang Belanja (Cart) yang menampilkan komponen `Badge` berisi total kuantitas barang.

### B. Daftar Produk (Product Grid)
* Menggunakan CSS Grid: `grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6`.
* Gambar produk menggunakan properti `object-contain` dan rasio aspek tetap (misal: `aspect-square`, `aspect-video`) agar gambar dari Fake Store API tidak terlihat gepeng, *stretch*, atau terpotong secara aneh.

### C. Keranjang Belanja (Cart UI)
* Ditampilkan sebagai *Drawer* (panel yang muncul dari samping kanan) atau *Modal/Dialog* di tengah layar.
* Menampilkan daftar ringkas: Thumbnail kecil, Nama Produk (terpotong jika panjang dengan `truncate`), Harga, Kontrol Kuantitas (- / +), dan tombol Hapus.
* Di bagian bawah: Total Harga dan tombol "Checkout" yang kontras.

## 7. Aksesibilitas Dasar (a11y)

* Pastikan semua gambar produk memiliki atribut `alt` yang mendeskripsikan produk tersebut secara jelas (jangan biarkan kosong atau diisi nama file).
* Gunakan properti `aria-label` pada tombol yang hanya berisi ikon (misal: tombol keranjang atau tombol hapus) agar mudah dibaca oleh *screen reader*.