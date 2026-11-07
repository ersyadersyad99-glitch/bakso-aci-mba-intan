# VERCEL DEPLOYMENT CHECKLIST — BAKSO ACI MBA INTAN
## Final Production Domain: `https://baksoacimbaintan.vardh.id/`

Dokumen ini berisi panduan dan daftar periksa lengkap untuk men-deploy website **BAKSO ACI MBA INTAN** ke **Vercel** menggunakan domain produksi resmi `https://baksoacimbaintan.vardh.id/`.

> **Catatan Status:** Konfigurasi domain produksi pada kode proyek telah selesai dan divalidasi secara lokal (`npm run build` lulus). Proses deployment ke Vercel dan pengaturan DNS pada domain `vardh.id` dilakukan secara manual mengikuti langkah di bawah ini.

---

## 1. Git Repository & Deployment Prerequisites

Sebelum menghubungkan project ke Vercel, pastikan:
- [ ] Seluruh perubahan terbaru telah di-commit ke repositori Git (GitHub / GitLab / Bitbucket).
- [ ] File `.gitignore` mengecualikan `node_modules/`, `dist/`, dan file `.env` lokal.
- [ ] File statis utama tersedia di folder `public/`:
  - `public/robots.txt` (mengarah ke `https://baksoacimbaintan.vardh.id/sitemap.xml`)
  - `public/sitemap.xml` (mengarah ke `https://baksoacimbaintan.vardh.id/`)
  - `public/favicon.svg`
  - `public/404.html`
  - `public/images/hero/hero-bakso-aci.webp` & `public/images/products/*.webp`
- [ ] Build lokal lulus tanpa error (`npm run build` -> `tsc -b && vite build`).

---

## 2. Vercel Project Configuration

Saat mengimpor repositori ke dashboard [Vercel](https://vercel.com/new):

| Pengaturan Vercel | Nilai Konfigurasi |
| :--- | :--- |
| **Framework Preset** | `Vite` |
| **Root Directory** | `./` |
| **Build Command** | `npm run build` |
| **Output Directory** | `dist` |
| **Install Command** | `npm install` |
| **Node.js Version** | `20.x` (atau LTS terbaru) |

---

## 3. Production Environment Variables

Tambahkan Environment Variables berikut di **Vercel Dashboard -> Project Settings -> Environment Variables** (aktifkan untuk environment **Production**, **Preview**, dan **Development**):

```env
VITE_SITE_URL=https://baksoacimbaintan.vardh.id
VITE_WHATSAPP_NUMBER=6281299366705
VITE_GOFOOD_URL=https://gofood.co.id/jakarta/restaurant/bakso-aci-mba-intan-babelan-295c3c1b-56fd-4c00-b980-25ba700966a2
VITE_GRABFOOD_URL=
VITE_GOOGLE_MAPS_URL=https://share.google/E2kU59447ww7Xvc5T
VITE_GOOGLE_REVIEW_URL=https://share.google/E2kU59447ww7Xvc5T
VITE_INSTAGRAM_URL=https://www.instagram.com/baci_mbaintan/
VITE_GA_MEASUREMENT_ID=
VITE_GSC_VERIFICATION_TOKEN=
```

> **Catatan:** Fungsi `normalizeCanonicalSiteUrl()` di `src/config/siteConfig.ts` secara otomatis menormalisasi `VITE_SITE_URL=https://baksoacimbaintan.vardh.id` menjadi `https://baksoacimbaintan.vardh.id/` pada tag `<link rel="canonical">`, `og:url`, dan JSON-LD `@id`, serta menolak URL `localhost`, `127.0.0.1`, maupun URL preview sementara `.vercel.app`.

---

## 4. Custom Domain Setup Instructions (Vercel)

1. Buka project di **Vercel Dashboard** -> tab **Settings** -> menu **Domains**.
2. Masukkan domain kustom:
   ```text
   baksoacimbaintan.vardh.id
   ```
3. Klik tombol **Add**.
4. Vercel akan menampilkan instruksi konfigurasi DNS untuk subdomain `baksoacimbaintan` pada domain induk `vardh.id`.

---

## 5. DNS CNAME Configuration Reminder

Masuk ke panel manajemen DNS tempat domain `vardh.id` dikelola (misalnya Cloudflare, Niagahoster/Hostinger, Rumahweb, atau registrar domain Anda), lalu tambahkan record **CNAME** berikut:

| Tipe Record | Name / Host | Target / Value (Gunakan Target Persis dari Vercel) | TTL | Proxy Status (Jika Cloudflare) |
| :--- | :--- | :--- | :--- | :--- |
| **CNAME** | `baksoacimbaintan` | Gunakan target CNAME persis yang ditampilkan di dashboard Vercel Anda (contoh: `cname.vercel-dns.com.` atau hash unik project Vercel Anda) | Auto / 3600 | **DNS Only (Grey Cloud)** saat verifikasi SSL awal |

> **Penting:** Selalu salin nilai target CNAME persis seperti yang ditampilkan pada layar **Vercel -> Settings -> Domains** untuk project Anda.

---

## 6. HTTPS & SSL Verification

Setelah record DNS CNAME ditambahkan:
- [ ] Kembali ke **Vercel -> Settings -> Domains** dan tunggu hingga status `baksoacimbaintan.vardh.id` berubah menjadi **Valid Configuration** (centang biru/hijau).
- [ ] Pastikan sertifikat SSL Let's Encrypt dari Vercel telah terbit secara otomatis.
- [ ] Buka `http://baksoacimbaintan.vardh.id` dan pastikan otomatis dialihkan (*redirect* `308`/`301`) ke **`https://baksoacimbaintan.vardh.id/`**.
- [ ] Pastikan ikon gembok HTTPS di browser valid tanpa peringatan *mixed content*.

---

## 7. Post-Deployment Testing

Setelah domain `https://baksoacimbaintan.vardh.id/` aktif, lakukan pengujian akhir berikut:

1. **Verifikasi Halaman & SEO Endpoints:**
   - [ ] `https://baksoacimbaintan.vardh.id/` terbuka dengan lancar di mobile & desktop.
   - [ ] `https://baksoacimbaintan.vardh.id/robots.txt` menampilkan `Sitemap: https://baksoacimbaintan.vardh.id/sitemap.xml`.
   - [ ] `https://baksoacimbaintan.vardh.id/sitemap.xml` menampilkan XML valid dengan `<loc>https://baksoacimbaintan.vardh.id/</loc>`.
   - [ ] View Page Source (`Ctrl+U`): pastikan `<link rel="canonical" href="https://baksoacimbaintan.vardh.id/" />`, `og:url`, dan JSON-LD `@id` semuanya menggunakan `https://baksoacimbaintan.vardh.id/`.
2. **Verifikasi Fungsional & Konversi:**
   - [ ] Klik tombol **Pesan Menu Ini** -> pastikan modal keranjang terbuka, perhitungan subtotal akurat, dan item `Dimsum Salmon (Isi 6)` berstatus `Habis` tidak dapat ditambahkan.
   - [ ] Klik **Kirim Pesanan ke WhatsApp** -> pastikan mengarah ke `https://wa.me/6281299366705?text=...` dengan format pesan lengkap.
   - [ ] Klik tombol **GoFood**, **Instagram**, dan **Google Maps** -> pastikan mengarah ke halaman resmi masing-masing.
3. **Pendaftaran Google Search Console:**
   - [ ] Tambahkan properti `https://baksoacimbaintan.vardh.id/` di [Google Search Console](https://search.google.com/search-console).
   - [ ] Submit `sitemap.xml` dan jalankan **URL Inspection -> Request Indexing**.
