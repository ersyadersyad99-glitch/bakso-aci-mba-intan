# PHASE 2 — BUSINESS INTEGRATION & CONVERSION TESTING REPORT
## Project: BAKSO ACI MBA INTAN | Official Culinary Website (VARDH.ID)

**Tanggal Pengujian:** 7 November 2026  
**Environment Lokal:** `http://localhost:5173/`  
**Status Keseluruhan:** **PASS (Seluruh Integrasi Bisnis & Alur Konversi Teruji)**

---

## 1. Fitur yang Berhasil Diintegrasikan

1. **Konsistensi Informasi Bisnis Resmi (`src/config/siteConfig.ts`, `index.html`, `SeoHead.tsx`, `Navbar.tsx`, `LocationSection.tsx`, `Footer.tsx`):**
   - **Business Name:** `BAKSO ACI MBA INTAN`
   - **Address:** `Jl. Palapa, Kebalen, Kec. Babelan, Kabupaten Bekasi, Jawa Barat 17610`
   - **WhatsApp:** `https://wa.me/6281299366705` (`+62 812-9936-6705`)
   - **GoFood:** `https://gofood.co.id/jakarta/restaurant/bakso-aci-mba-intan-babelan-295c3c1b-56fd-4c00-b980-25ba700966a2`
   - **Instagram:** `https://www.instagram.com/baci_mbaintan/` (`@baci_mbaintan`)
   - **Google Maps:** `https://share.google/E2kU59447ww7Xvc5T`
   - **Operating Hours:** `07.00–22.30 WIB`
   - **GrabFood:** Ditampilkan secara jujur sebagai **`Segera Hadir`** (`aria-disabled="true"`) tanpa tautan fiktif.
2. **Alur Pemesanan WhatsApp Terstruktur (`composeWhatsAppOrderMessage` di `src/config/siteConfig.ts` & `src/components/OrderModal.tsx`):**
   - Menyusun pesan WhatsApp otomatis yang memuat:
     1. Salam pembuka & Nama Pelanggan (apabila diisi).
     2. Daftar menu yang dipesan beserta kuantitas (`qty`).
     3. **Harga satuan (`Harga Satuan: Rp ...`) dan subtotal per produk (`Subtotal: Rp ...`)**.
     4. **Total Estimasi Pesanan** (`Total Estimasi Pesanan: Rp ... (Belum termasuk ongkir)`).
     5. Catatan atau permintaan khusus pelanggan (level pedas / patokan alamat).
     6. **Permintaan konfirmasi ketersediaan stok menu dan informasi ongkir** ke lokasi pelanggan.
   - Seluruh karakter (termasuk baris baru `\n`, simbol `•`, `|`, `&`, dan tanda baca) di-encode menggunakan `encodeURIComponent()` ke URL resmi `https://wa.me/6281299366705?text=...`.
3. **Integrasi Saluran Bisnis & Optimasi Konversi (CTA):**
   - **Pesan via WhatsApp:** Tersedia melalui Top Ribbon Navbar, Tombol `Pesan Menu Ini` di setiap kartu produk, Seksi Platform Pemesanan (`Pilih Menu & Hitung Subtotal WA` + `Chat WhatsApp Langsung`), Seksi Lokasi (`Chat WhatsApp`), Footer, dan Floating WhatsApp Button (Mobile & Desktop).
   - **Lihat Menu:** Tersedia melalui Navbar (`Menu Favorit`), Hero (`JELAJAHI MENU`), Category Quick-Jump Pills, Category Explorer, dan Final Conversion CTA (`LIHAT MENU`).
   - **Pesan melalui GoFood:** Tersedia di `OrderModal`, `OrderingPlatforms` (`Pesan di GoFood`), `ReviewSection` (`GoFood Reviews`), dan `Footer`.
   - **Lihat Lokasi (Google Maps):** Tersedia di Top Ribbon Navbar (`Kebalen, Babelan`), `LocationSection` (`Lokasi Google Maps`, `Ulasan Google`, `Buka Google Maps`, `Lihat di Google Maps`), `OrderModal` (`Maps →`), `ReviewSection`, dan `Footer`.
   - **Kunjungi Instagram:** Tersedia di Top Ribbon Navbar (`@baci_mbaintan`), `LocationSection` (`Instagram Resmi`), dan `Footer` (`Instagram @baci_mbaintan`).
4. **SEO & Local Business Schema (`index.html` & `src/components/SeoHead.tsx`):**
   - Sinkronisasi nama bisnis, alamat lengkap (`Jl. Palapa, Kebalen, Kec. Babelan, Kabupaten Bekasi, Jawa Barat 17610`), nomor telepon (`+62-812-9936-6705`), URL peta (`hasMap`), `sameAs` (Instagram, GoFood, Google Maps), serta skema `Menu` dan `MenuItem` (termasuk status `InStock` vs `OutOfStock` untuk `Dimsum Salmon (Isi 6)`).
   - Tanpa rating fiktif (`aggregateRating` tidak dibuat) dan tanpa asumsi hari operasional.

---

## 2. Daftar Tautan yang Sudah Diuji

Seluruh tautan internal dan eksternal telah diuji dan diverifikasi:

| Lokasi Komponen | Label Tautan / Tombol | URL Tujuan | Atribut Keamanan | Status Uji |
| :--- | :--- | :--- | :--- | :---: |
| **Navbar (Top Ribbon)** | `+62 812-9936-6705` | `https://wa.me/6281299366705?text=...` | `target="_blank" rel="noopener noreferrer"` | **PASS** |
| **Navbar (Top Ribbon)** | `@baci_mbaintan` | `https://www.instagram.com/baci_mbaintan/` | `target="_blank" rel="noopener noreferrer"` | **PASS** |
| **Navbar (Top Ribbon)** | `Kebalen, Babelan` | `https://share.google/E2kU59447ww7Xvc5T` | `target="_blank" rel="noopener noreferrer"` | **PASS** |
| **Navbar (Main)** | `Beranda`, `Keunggulan`, `Kategori`, `Menu Favorit`, `Ulasan`, `Tentang Kami`, `Lokasi` | `#home`, `#highlights`, `#categories`, `#menu`, `#reviews`, `#about`, `#location` | Smooth scroll anchor | **PASS** |
| **OrderingPlatforms** | `Pesan di GoFood` | `https://gofood.co.id/jakarta/restaurant/bakso-aci-mba-intan-babelan-295c3c1b-56fd-4c00-b980-25ba700966a2` | `target="_blank" rel="noopener noreferrer"` | **PASS** |
| **OrderingPlatforms** | `Pilih Menu & Hitung Subtotal WA` | Membuka `OrderModal` | Interactive Modal | **PASS** |
| **OrderingPlatforms** | `Chat WhatsApp Langsung (+62 812-9936-6705)` | `https://wa.me/6281299366705?text=...` | `target="_blank" rel="noopener noreferrer"` | **PASS** |
| **OrderingPlatforms** | `Segera Hadir di GrabFood` | Non-clickable (`aria-disabled="true"`) | Tanpa link fiktif | **PASS** |
| **ReviewSection** | `Lihat Halaman Resmi Google` | `https://share.google/E2kU59447ww7Xvc5T` | `target="_blank" rel="noopener noreferrer"` | **PASS** |
| **ReviewSection** | `Lihat Halaman Resmi GoFood` | `https://gofood.co.id/jakarta/restaurant/bakso-aci-mba-intan-babelan-295c3c1b-56fd-4c00-b980-25ba700966a2` | `target="_blank" rel="noopener noreferrer"` | **PASS** |
| **ReviewSection** | `Halaman GrabFood Segera Hadir` | Non-clickable badge | Tanpa link fiktif | **PASS** |
| **LocationSection** | `WhatsApp Resmi (+62 812-9936-6705)` & `Chat WhatsApp` | `https://wa.me/6281299366705?text=...` | `target="_blank" rel="noopener noreferrer"` | **PASS** |
| **LocationSection** | `Instagram Resmi (@baci_mbaintan)` | `https://www.instagram.com/baci_mbaintan/` | `target="_blank" rel="noopener noreferrer"` | **PASS** |
| **LocationSection** | `Lokasi Google Maps`, `Ulasan Google`, `Buka Google Maps`, `Lihat di Google Maps` | `https://share.google/E2kU59447ww7Xvc5T` | `target="_blank" rel="noopener noreferrer"` | **PASS** |
| **OrderModal** | `Pesan via GoFood` | `https://gofood.co.id/jakarta/restaurant/bakso-aci-mba-intan-babelan-295c3c1b-56fd-4c00-b980-25ba700966a2` | `target="_blank" rel="noopener noreferrer"` | **PASS** |
| **OrderModal** | `Kirim Pesanan ke WhatsApp (+62 812-9936-6705)` | `https://wa.me/6281299366705?text=...` | `target="_blank" rel="noopener noreferrer"` | **PASS** |
| **OrderModal** | `Maps →` | `https://share.google/E2kU59447ww7Xvc5T` | `target="_blank" rel="noopener noreferrer"` | **PASS** |
| **Footer** | `Instagram @baci_mbaintan`, `GoFood`, `WhatsApp`, `Google Maps` | URL resmi masing-masing platform | `target="_blank" rel="noopener noreferrer"` | **PASS** |
| **FloatingWhatsApp** | `WhatsApp` / `WhatsApp Order` & `Pesan Sekarang` | `https://wa.me/6281299366705?text=...` & `OrderModal` | `target="_blank" rel="noopener noreferrer"` | **PASS** |

---

## 3. Hasil Pengujian Pemesanan WhatsApp

Pengujian dilakukan pada fungsi `composeWhatsAppOrderMessage` dan `buildWhatsAppUrl` di `src/config/siteConfig.ts` serta komponen `OrderModal.tsx`:

### Skenario Uji A: Pemesanan Multi-Produk dengan Nama & Catatan Khusus
- **Input:**
  - Nama Pelanggan: `Rina`
  - Produk 1: `Paket Inces II` (`2x` @ `Rp 22.000` -> Subtotal `Rp 44.000`)
  - Produk 2: `Paket Inces I` (`1x` @ `Rp 19.000` -> Subtotal `Rp 19.000`)
  - Catatan: `Pedas sedang, kirim ke Perumahan Taman Kebalen`
- **Pesan WhatsApp yang Dihasilkan (Decoded):**
  ```text
  Halo BAKSO ACI MBA INTAN! Saya mengunjungi website resmi dan ingin memesan / menanyakan ketersediaan menu serta info ongkir:

  Nama Pelanggan: Rina

  Daftar Pesanan:
  1. Paket Inces II (2x) — Harga Satuan: Rp 22.000 | Subtotal: Rp 44.000
  2. Paket Inces I (1x) — Harga Satuan: Rp 19.000 | Subtotal: Rp 19.000

  Total Estimasi Pesanan: Rp 63.000
  (Belum termasuk ongkir)

  Catatan / Permintaan Khusus: Pedas sedang, kirim ke Perumahan Taman Kebalen

  Mohon konfirmasi ketersediaan stok menu dan informasi ongkir ke lokasi saya. Terima kasih!
  ```
- **Validasi Encoding & Nomor Tujuan:**
  - Diawali dengan `https://wa.me/6281299366705?text=` dan seluruh karakter khusus di-encode dengan `encodeURIComponent()`.
  - **Hasil:** **PASS**

### Skenario Uji B: Proteksi Produk `Habis` (`Dimsum Salmon (Isi 6)`)
- **Pengujian:** Mencoba menekan tombol order pada kartu produk `Dimsum Salmon (Isi 6)` dan mencoba menekan tombol `+` di dalam `OrderModal`.
- **Hasil:** Tombol pada kartu produk berstatus `disabled` (`Stok Habis (GoFood)`), dan tombol `+` di `OrderModal` juga `disabled` dengan label merah `Habis`. Produk `sold_out` tidak dapat masuk ke subtotal maupun pesan WhatsApp. (**PASS**)

### Skenario Uji C: Keranjang Kosong (Pertanyaan Umum via Modal)
- **Pengujian:** Membuka `OrderModal` tanpa memilih item (`0` item) lalu menekan `Kirim Pesanan ke WhatsApp`.
- **Hasil:** Menghasilkan pesan sopan yang menanyakan daftar menu yang tersedia hari ini beserta konfirmasi stok dan ongkir ke nomor `6281299366705`. (**PASS**)

---

## 4. Hasil Pengujian CTA dan Responsivitas

- **Visibilitas & Hierarki CTA:**
  - Di **Desktop (`1024px–1440px`)**: Tombol `PESAN SEKARANG` di sticky header, `JELAJAHI MENU` & `PESAN SEKARANG` di Hero, tombol `Pesan Menu Ini` di setiap kartu produk, serta tombol `WhatsApp Order` mengambang di kanan bawah tampil jelas dan mudah dijangkau tanpa menutupi konten utama.
  - Di **Mobile (`375px–390px`)**: Bar bawah mengambang (*Mobile Bottom Floating Action Bar*) menyediakan dua aksi cepat (`WhatsApp` dan `Pesan Sekarang`), sementara kartu produk tersusun rapi dalam 2 kolom (`grid-cols-2`) dengan rasio gambar `1:1` (`aspect-square`).
- **Pengujian Endpoint & Aset Lokal (`http://localhost:5173`):**
  - Seluruh 15 endpoint utama (halaman `/`, foto hero `.webp`, 10 foto produk `.webp`, `/robots.txt`, `/sitemap.xml`, `/favicon.svg`) mengembalikan status **`200 OK`** tanpa broken image atau network error.

---

## 5. Bug yang Ditemukan dan Perbaikannya (Phase 2)

1. **[FIXED] Rincian Subtotal Per Produk & Permintaan Konfirmasi Ongkir pada Pesan WhatsApp (`OrderModal.tsx` & `siteConfig.ts`):**
   - **Temuan:** Sebelumnya pesan WhatsApp hanya mencantumkan harga satuan (`@ Rp 22.000`) tanpa subtotal per baris produk (`Subtotal: Rp 44.000`) dan belum mencantumkan kalimat permintaan konfirmasi ketersediaan stok & ongkir di akhir pesan.
   - **Perbaikan:** Dibuat fungsi `composeWhatsAppOrderMessage` di `src/config/siteConfig.ts` yang menyertakan `Harga Satuan` dan `Subtotal` pada setiap baris produk, `Total Estimasi Pesanan (Belum termasuk ongkir)`, serta kalimat penutup `"Mohon konfirmasi ketersediaan stok menu dan informasi ongkir ke lokasi saya. Terima kasih!"`. Rincian subtotal per produk juga ditampilkan secara visual di dalam ringkasan `OrderModal.tsx`.
2. **[FIXED] Konsistensi Penulisan Alamat & Jam Operasional (`siteConfig.ts`, `Navbar.tsx`, `LocationSection.tsx`, `index.html`):**
   - **Temuan:** Penulisan kecamatan dan tanda pemisah jam operasional perlu diseragamkan penuh menjadi `Jl. Palapa, Kebalen, Kec. Babelan, Kabupaten Bekasi, Jawa Barat 17610` dan `07.00–22.30 WIB`.
   - **Perbaikan:** Diseragamkan di `DEFAULT_SITE_CONFIG`, `Navbar`, `LocationSection`, `index.html`, dan kunci penyimpanan `localStorage` diperbarui ke `v9` agar browser langsung memuat konfigurasi terbaru.
3. **[FIXED] Opsi Ganda Pemesanan WhatsApp pada Seksi `OrderingPlatforms.tsx`:**
   - **Temuan:** Kartu WhatsApp pada seksi *Online Ordering Platforms* sebelumnya hanya membuka tautan WA langsung tanpa memberi opsi membuka kalkulator/keranjang menu (`OrderModal`).
   - **Perbaikan:** Ditambahkan tombol utama `Pilih Menu & Hitung Subtotal WA` (membuka `OrderModal`) yang didampingi tombol sekunder `Chat WhatsApp Langsung (+62 812-9936-6705)`.

---

## 6. Item yang Masih Membutuhkan Data dari Owner

Sesuai prinsip **Zero Fabrication**, item berikut tidak dikarang dan siap diisi kapan saja melalui `src/config/siteConfig.ts` atau tombol **Konfigurasi Data UMKM & SEO** di website:

1. **URL Merchant GrabFood Resmi:** Saat ini belum tersedia dari owner (ditampilkan sebagai *Segera Hadir*).
2. **Hari Operasional Pasti:** Jam operasional (`07.00–22.30 WIB`) sudah aktif, namun hari buka (misal: Senin–Minggu atau libur hari tertentu) menunggu konfirmasi owner.
3. **Harga, Deskripsi Detail & Foto Asli untuk Kategori Tambahan (`Pempek`, `Dimsum Reguler`, `Dimsum Mentai`, `Aneka Jajanan & Minuman`):** Saat ini menggunakan placeholder harga/deskripsi jujur dan foto demonstrasi berlabel `"Visualisasi Sajian • Configurable"`.
4. **Ulasan & Rating Pelanggan Terverifikasi (Google / GoFood / GrabFood):** Saat ini mengarahkan pengunjung langsung ke halaman resmi Google Maps & GoFood tanpa menampilkan angka rating rekayasa.
5. **Koordinat GPS Presisi (Latitude & Longitude) serta Token GA4 / Google Search Console:** Opsional untuk dilengkapi saat deployment ke domain produksi.

---

## 7. Status Production Build

- **Perintah:** `npm run build` (`tsc -b && vite build`)
- **Hasil Kompilasi TypeScript (`tsc -b`):** `0 errors`
- **Hasil Bundle Vite (`vite build`):** **PASS (Berhasil dalam 5.65s)**
  - `dist/index.html` (`5.29 kB`)
  - `dist/assets/index-DoP3EEPY.css` (`38.86 kB`)
  - `dist/assets/icons-vendor-b9PoFUwt.js` (`22.99 kB`)
  - `dist/assets/react-vendor-BHwcpp-6.js` (`133.92 kB`)
  - `dist/assets/index-BwvxXvNU.js` (`140.22 kB`)
