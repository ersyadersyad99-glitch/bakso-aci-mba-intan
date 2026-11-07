# PHASE 3 — SEO, GOOGLE INDEXING & LOCAL SEARCH OPTIMIZATION REPORT
## Project: BAKSO ACI MBA INTAN | Official Culinary Website (VARDH.ID)

**Tanggal Audit & Implementasi:** 7 November 2026  
**Environment Lokal:** `http://localhost:5173/`  

---

## 1. Technical SEO Implementation

Seluruh komponen Technical SEO telah diaudit dan diimplementasikan tanpa mengubah arsitektur atau merusak alur pemesanan yang sudah lulus Phase 1.5 & Phase 2:

| Elemen Technical SEO | Lokasi Implementasi | Detail Konfigurasi & Validasi | Status |
| :--- | :--- | :--- | :---: |
| **Title Tag Unik & Relevan** | `index.html`, `src/config/siteConfig.ts`, `src/components/SeoHead.tsx` | `Bakso Aci MBA INTAN \| Bakso Aci, Dimsum & Pempek di Kebalen, Babelan, Bekasi` | **PASS** |
| **Meta Description** | `index.html`, `src/config/siteConfig.ts`, `src/components/SeoHead.tsx` | `Nikmati Bakso Aci Kebalen, Bakso Aci Babelan, Dimsum Babelan, Pempek Babelan, dan Bakso Aci Frozen Food Bekasi di BAKSO ACI MBA INTAN (Jl. Palapa, Kebalen, Kabupaten Bekasi). Pesan via GoFood atau WhatsApp.` | **PASS** |
| **Canonical URL & Proteksi Localhost** | `index.html`, `src/components/SeoHead.tsx` (`sanitizeProductionUrl`) | Menggunakan URL template produksi `https://baksoacimbaintan.vardh.id/` (dapat diatur via `VITE_SITE_URL`) dan memblokir penggunaan `localhost` / `127.0.0.1` pada `<link rel="canonical">`. Ditandai sebagai `pending_owner_domain` hingga domain kustom final dikonfirmasi owner. | **PASS** |
| **Robots Meta Tag** | `index.html` | `index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1` | **PASS** |
| **`robots.txt`** | `public/robots.txt` | Mengizinkan crawling seluruh halaman publik (`Allow: /`), memblokir `/404`, dan menunjuk ke `Sitemap: https://baksoacimbaintan.vardh.id/sitemap.xml` (tanpa `localhost`). | **PASS** |
| **`sitemap.xml`** | `public/sitemap.xml` | XML valid dengan namespace `sitemap-image/1.1` yang memuat URL utama serta 9 aset gambar `.webp` produk & hero beserta `<image:title>` dan `<image:caption>`. | **PASS** |
| **Open Graph & Twitter Card** | `index.html`, `src/components/SeoHead.tsx` | `og:type="restaurant"`, `og:locale="id_ID"`, `og:title`, `og:description`, `og:url`, `og:image`, `og:image:alt`, dan `twitter:card="summary_large_image"` tersinkronisasi dinamis. | **PASS** |
| **Favicon & Theme Color** | `index.html`, `public/favicon.svg` | Vector SVG favicon (`/favicon.svg`) + `meta name="theme-color" content="#D93636"`. | **PASS** |
| **Hierarki Heading (`H1` -> `H2` -> `H3`)** | Seluruh komponen seksi | Hanya terdapat **1 `H1`** di `HeroSection.tsx`, diikuti **`H2`** untuk setiap judul seksi utama (`BrandHighlights`, `CategoryExplorer`, `ProductGrid`, `OrderingPlatforms`, `ReviewSection`, `AboutSection`, `LocationSection`, `FinalConversionCta`) dan **`H3`** untuk judul kartu/produk. | **PASS** |
| **Internal Anchor Navigation** | `Navbar.tsx`, `Footer.tsx`, `App.tsx` | Tautan internal `#main-content` (skip link), `#home`, `#highlights`, `#categories`, `#menu`, `#reviews`, `#about`, dan `#location` berfungsi penuh. | **PASS** |

---

## 2. Local SEO Implementation

1. **Konsistensi NAP (Name, Address, Phone) di Seluruh Website & Schema:**
   - **Business Name:** `BAKSO ACI MBA INTAN`
   - **Address:** `Jl. Palapa, Kebalen, Kec. Babelan, Kabupaten Bekasi, Jawa Barat 17610`
   - **Telephone / WhatsApp:** `+62 812-9936-6705` (`https://wa.me/6281299366705`)
   - **Operating Hours:** `07.00–22.30 WIB` (ditampilkan di UI tanpa mengasumsikan hari operasional; disimpan di luar JSON-LD sampai hari operasional dikonfirmasi owner).
2. **Geo Meta Tags (`index.html`):**
   - `meta name="geo.region" content="ID-JB"`
   - `meta name="geo.placename" content="Kebalen, Kec. Babelan, Kabupaten Bekasi, Jawa Barat"`
3. **Integrasi Peta & Saluran Resmi Lokal:**
   - Terhubung ke tautan Google Maps resmi (`https://share.google/E2kU59447ww7Xvc5T`), merchant GoFood resmi (`https://gofood.co.id/jakarta/restaurant/bakso-aci-mba-intan-babelan-295c3c1b-56fd-4c00-b980-25ba700966a2`), dan Instagram resmi (`https://www.instagram.com/baci_mbaintan/`).

---

## 3. Structured Data yang Digunakan (`JSON-LD`)

Diimplementasikan menggunakan satu blok `<script id="structured-data-jsonld" type="application/ld+json">` berbasis `@graph` di `index.html` yang diperbarui secara dinamis oleh `src/components/SeoHead.tsx` (tanpa duplikasi tag script):

1. **`WebSite` (`#website`):**
   - Memuat `name`, `url`, `description`, `inLanguage: "id-ID"`, dan relasi `publisher` ke `#organization`.
2. **`Organization` (`#organization`):**
   - Memuat `name: "BAKSO ACI MBA INTAN"`, `url`, `telephone: "+62 812-9936-6705"`, `logo`, `address` (`PostalAddress`), dan `sameAs` (Instagram, GoFood, Google Maps).
3. **`Restaurant` / `FoodEstablishment` / `LocalBusiness` (`#restaurant`):**
   - Memuat `name`, `alternateName`, `slogan`, `description`, `url`, `telephone`, `image`, `servesCuisine` (`Indonesian`, `Bakso Aci`, `Pempek`, `Dimsum`, `Dimsum Mentai`, `Frozen Food`), `address` (`PostalAddress`), `areaServed` (`Kebalen, Kec. Babelan, Kabupaten Bekasi` & `Kabupaten Bekasi, Jawa Barat`), `hasMap`, dan `sameAs`.
4. **`Menu` & `MenuItem` (`#menu`):**
   - Memuat `MenuSection` per kategori produk beserta daftar `MenuItem`.
   - Hanya menyertakan objek `Offer` (`price`, `priceCurrency: "IDR"`, `availability`) untuk 6 produk dengan harga terverifikasi GoFood (`Paket Inces I`, `II`, `III`, `JUMBO`, `Hemat` berstatus `https://schema.org/InStock`, serta `Dimsum Salmon (Isi 6)` berstatus `https://schema.org/OutOfStock`).
   - **Zero Fabrication:** Tidak menyertakan `aggregateRating`, `review`, `openingHoursSpecification` (karena hari operasional belum dikonfirmasi), maupun `GeoCoordinates` tebakan.

---

## 4. Keyword Strategy (Strategi Kata Kunci Pencarian Lokal)

Kata kunci lokal disisipkan secara natural ke dalam judul halaman, deskripsi meta, ringkasan keunggulan, deskripsi tentang bisnis, dan teks alternatif gambar (`alt`) tanpa melakukan *keyword stuffing* dan tanpa klaim sepihak ("terbaik" / "nomor satu"):

- **Primary Keywords:**
  1. `Bakso Aci Babelan` — digunakan secara natural pada Meta Description, Brand Highlights, About Section, dan `seoAlt` produk.
  2. `Bakso Aci Kebalen` — digunakan pada Meta Description, Brand Highlights, About Section, dan `seoAlt` Hero/Produk.
  3. `Bakso Aci Kabupaten Bekasi` — digunakan pada Brand Highlights, About Pillars, dan `sitemap.xml`.
- **Secondary Keywords:**
  1. `Jajanan Kebalen` — digunakan pada subheadline About Section dan deskripsi keunggulan.
  2. `Dimsum Babelan` — digunakan pada deskripsi kategori Dimsum, Meta Description, dan About Section.
  3. `Pempek Babelan` — digunakan pada deskripsi kategori Pempek, Meta Description, dan About Section.
  4. `Kuliner Babelan` — digunakan pada subheadline About Section dan deskripsi keunggulan.
  5. `Bakso Aci Frozen Food Bekasi` — digunakan pada Meta Description, Brand Highlights, dan About Section untuk menjelaskan produk kemasan vakum siap masak.

---

## 5. Google Ecosystem Readiness

Website telah disiapkan agar dapat dihubungkan ke ekosistem Google melalui variabel lingkungan (`.env` / `.env.example`) maupun melalui **Panel Konfigurasi Data UMKM & SEO** di UI:

1. **Google Search Console (`VITE_GSC_VERIFICATION_TOKEN`):**
   - Apabila token diisi, `SeoHead.tsx` secara otomatis menyuntikkan `<meta name="google-site-verification" content="..." />` ke dalam `<head>`.
   - File `/sitemap.xml` dan `/robots.txt` sudah siap disubmit ke Google Search Console begitu domain produksi aktif.
2. **Google Analytics 4 (`VITE_GA_MEASUREMENT_ID`):**
   - `src/utils/analytics.ts` memuat skrip `gtag.js` secara non-blocking hanya ketika Measurement ID (`G-XXXXXXXXXX`) dikonfigurasi, serta melacak event konversi (`page_view`, `view_menu`, `select_category`, `click_whatsapp`, `click_gofood`, `click_grabfood`, `click_google_maps`).
3. **Google Business Profile (`VITE_GOOGLE_MAPS_URL` / `VITE_GOOGLE_REVIEW_URL`):**
   - Seluruh tombol lokasi dan ulasan Google telah terhubung ke `https://share.google/E2kU59447ww7Xvc5T` dan direferensikan pada properti `hasMap` & `sameAs` di JSON-LD.

---

## 6. Performance dan Accessibility Audit

1. **Image SEO & Core Web Vitals Performance:**
   - Seluruh 18 aset gambar produk, kategori, dan hero menggunakan format **`.webp`** terkompresi (`49 KB – 121 KB`) dengan nama file deskriptif (`bakso-aci-paket-inces-1.webp`, `dimsum-salmon.webp`, `pempek.webp`, dll.).
   - Gambar Hero menggunakan `<link rel="preload" as="image" href="/images/hero/hero-bakso-aci.webp" type="image/webp" fetchpriority="high" />` untuk mengoptimalkan **Largest Contentful Paint (LCP)**.
   - Seluruh gambar di bawah lipatan layar (*below-the-fold*) menggunakan `loading="lazy"` dan `decoding="async"` serta atribut eksplisit `width` dan `height` beserta container `aspect-square` / `aspect-[4/5]` untuk menjaga **Cumulative Layout Shift (CLS) = 0**.
   - Label transparansi `"Visualisasi Sajian • Configurable"` tetap dipertahankan pada kartu produk.
2. **Accessibility (A11y) & Semantic HTML:**
   - Ditambahkan tautan **Skip to Content** (`Langsung ke Konten Utama` -> `#main-content`) untuk pengguna navigasi keyboard.
   - Menggunakan elemen HTML5 semantik (`<header>`, `<nav>`, `<main id="main-content">`, `<section aria-labelledby="...">`, `<article>`, `<address>`, `<footer>`).
   - Modal interaktif (`OrderModal` & `ConfigModal`) memiliki atribut `role="dialog"`, `aria-modal="true"`, `aria-labelledby`, penutupan dengan tombol `Escape`, dan klik backdrop.
   - Seluruh tombol ikon memiliki `aria-label` yang jelas dan rasio kontras warna memenuhi standar keterbacaan.

---

## 7. Build & Validation Status

Pengujian teknis telah dijalankan secara nyata dengan hasil:
- **`npm run build` (`tsc -b && vite build`):** **PASS** (`0` error TypeScript, `0` warning, selesai dalam `5.4s`).
- **Validasi Anti-Localhost (`dist/index.html`, `dist/robots.txt`, `dist/sitemap.xml`):** **PASS** (`0` kemunculan `localhost` atau `127.0.0.1`).
- **Validasi Sintaks & Struktur JSON-LD (`@graph`):** **PASS** (3 node valid: `WebSite`, `Organization`, `Restaurant`/`LocalBusiness` + `Menu`, `0` rating fiktif).

---

## 8. Hal yang Masih Membutuhkan Akses atau Konfirmasi Owner

1. **Nama Domain Produksi Final (`VITE_SITE_URL`):** Saat ini menggunakan placeholder template `https://baksoacimbaintan.vardh.id/` (status: `pending_owner_domain`). Perlu diperbarui jika owner menggunakan domain kustom lain (misal `.com` atau `.id`).
2. **Kredensial Google Search Console & Google Analytics 4 (`VITE_GSC_VERIFICATION_TOKEN` & `VITE_GA_MEASUREMENT_ID`):** Menunggu akses akun Google milik owner.
3. **Hari Operasional Pasti:** Jam operasional (`07.00–22.30 WIB`) telah terpasang, namun hari buka mingguan belum dikonfirmasi sehingga belum dimasukkan ke `openingHoursSpecification` JSON-LD.
4. **URL Merchant GrabFood & Harga Detail Kategori Pendamping (`Pempek`, `Dimsum`, `Mentai`, `Lainnya`):** Menunggu data resmi dari owner.

---

## 9. Langkah Manual Menghubungkan Domain ke Google Search Console & Google Business Profile

> **Catatan Penting:** Pembuatan `sitemap.xml` dan structured data **belum** berarti website otomatis terindeks di Google. Website harus di-deploy ke domain publik (HTTPS) dan didaftarkan ke Google Search Console terlebih dahulu.

### A. Langkah Menghubungkan ke Google Search Console (GSC)
1. Deploy folder hasil build (`dist/`) ke layanan hosting produksi dengan HTTPS aktif dan hubungkan domain resmi.
2. Perbarui `VITE_SITE_URL` di `.env.production` serta domain pada `public/robots.txt` dan `public/sitemap.xml` jika domain produksi berbeda dari `https://baksoacimbaintan.vardh.id/`.
3. Buka [Google Search Console](https://search.google.com/search-console) menggunakan akun Google resmi bisnis.
4. Pilih **Add Property** -> gunakan metode **URL Prefix** (masukkan URL lengkap `https://domain-anda.com/`).
5. Pilih metode verifikasi **HTML Tag**, salin nilai `content="..."` dari meta tag yang diberikan Google, lalu tempelkan ke variabel `VITE_GSC_VERIFICATION_TOKEN` (atau melalui menu **Konfigurasi Data UMKM & SEO -> Tab SEO** di website), lalu klik **Verify** di GSC.
6. Setelah terverifikasi, buka menu **Sitemaps** di panel kiri GSC, masukkan `sitemap.xml`, dan klik **Submit**.
7. Gunakan fitur **URL Inspection** pada halaman utama (`/`), lalu klik **Request Indexing** untuk mempercepat proses perayapan awal oleh Googlebot.

### B. Langkah Menghubungkan ke Google Business Profile (GBP)
1. Buka dashboard pengelolaan **Google Business Profile** untuk lokasi **BAKSO ACI MBA INTAN** (`https://share.google/E2kU59447ww7Xvc5T`).
2. Klik **Edit Profile (Edit Profil)** -> bagian **Contact (Kontak)** -> pada kolom **Website**, masukkan URL domain produksi resmi yang sudah aktif.
3. Pastikan **Nama Bisnis** (`BAKSO ACI MBA INTAN`), **Alamat** (`Jl. Palapa, Kebalen, Kec. Babelan, Kabupaten Bekasi, Jawa Barat 17610`), **Nomor Telepon** (`+62 812-9936-6705`), dan **Jam Operasional** (`07.00–22.30 WIB`) di Google Business Profile sama persis dengan yang tertulis di website untuk memperkuat sinyal Local SEO.

---

## Final Status

- **READY FOR DOMAIN DEPLOYMENT:** **YES (PASS)** — Build produksi (`dist/`), aset `.webp`, keamanan tautan, dan konfigurasi environment telah siap di-deploy ke hosting HTTPS.
- **READY FOR GOOGLE INDEXING:** **YES (TECHNICAL READINESS PASS)** — Sitemap XML, `robots.txt`, Canonical URL, Meta Tags, dan Schema.org JSON-LD (`@graph`) telah valid dan siap di-submit ke Google Search Console segera setelah domain produksi live.
- **PENDING OWNER ACTIONS:** **YES** — Menunggu konfirmasi domain produksi final, token verifikasi Google Search Console (`VITE_GSC_VERIFICATION_TOKEN`), ID Google Analytics 4 (`VITE_GA_MEASUREMENT_ID`), konfirmasi hari operasional, serta tautan GrabFood dari owner.
