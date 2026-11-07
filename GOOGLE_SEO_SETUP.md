# GOOGLE SEARCH CONSOLE & SEO SETUP GUIDE — BAKSO ACI MBA INTAN
**Client Showcase Project | VARDH.ID**  
**Status Verifikasi Saat Ini:** *Siap Diverifikasi (Belum Diverifikasi / Belum Diindeks di Produksi)*

> **Catatan Penting:** Dokumen ini adalah panduan teknis bagi pemilik bisnis / administrator domain untuk menghubungkan website **BAKSO ACI MBA INTAN** ke Google Search Console setelah dideploy ke domain produksi. Pengaturan teknis pada kode telah disiapkan sepenuhnya, namun verifikasi kepemilikan domain dan pengindeksan hanya dapat dilakukan setelah domain produksi aktif.

---

## 1. Cara Menambahkan Domain ke Google Search Console

1. Buka [Google Search Console](https://search.google.com/search-console) dan masuk menggunakan akun Google resmi milik bisnis **BAKSO ACI MBA INTAN** atau pengelola **VARDH.ID**.
2. Klik dropdown pemilih properti di pojok kiri atas, lalu pilih **+ Add property** (*Tambahkan properti*).
3. Anda akan melihat dua pilihan tipe properti:
   - **Domain (Direkomendasikan):** Mencakup seluruh subdomain (`www` dan non-`www`) serta protokol (`http` dan `https`). Masukkan nama domain tanpa `https://` (contoh: `baksoacimbaintan.id`).
   - **URL Prefix (Alternatif):** Hanya mencakup satu awalan URL spesifik (contoh: `https://baksoacimbaintan.vardh.id/`).

---

## 2. Cara Memverifikasi Kepemilikan Domain Menggunakan DNS (TXT Record)

Metode **DNS TXT Record** adalah metode utama yang paling stabil:

1. Pada layar verifikasi properti **Domain** di Google Search Console, pilih metode **DNS record (TXT)**, lalu salin teks token yang diberikan oleh Google (formatnya seperti: `google-site-verification=AbCdEfGhIjKlMnOpQrStUvWxYz123456`).
2. Masuk ke dashboard penyedia domain/DNS Anda (misalnya Cloudflare, Niagahoster, Domainesia, Rumahweb, atau Route53).
3. Buka menu **DNS Management / Zone Editor** dan tambahkan record baru dengan detail berikut:
   - **Type:** `TXT`
   - **Name / Host:** `@` (atau kosongkan sesuai aturan provider DNS untuk root domain)
   - **TTL:** `Auto` atau `3600`
   - **Content / Value:** Tempel string `google-site-verification=...` dari Google Search Console.
4. Simpan perubahan DNS. Tunggu sekitar 5–15 menit agar propagasi DNS selesai, lalu kembali ke Google Search Console dan klik tombol **Verify**.

### Alternatif: Verifikasi Menggunakan HTML Meta Tag (Properti URL Prefix)
Jika Anda menggunakan tipe properti **URL Prefix**:
1. Pilih metode verifikasi **HTML tag** di Google Search Console.
2. Salin kode token yang berada di dalam atribut `content="..."` dari tag `<meta name="google-site-verification" content="TOKEN_ANDA" />`.
3. Masukkan nilai token tersebut ke dalam variabel environment `VITE_GSC_VERIFICATION_TOKEN=` pada file `.env` produksi Anda (atau melalui panel **Konfigurasi Data → Tab SEO, GA4 & Search Console**).
4. Komponen [`SeoHead.tsx`](src/components/SeoHead.tsx) akan otomatis menyuntikkan `<meta name="google-site-verification" content="TOKEN_ANDA" />` ke dalam `<head>`.

---

## 3. Cara Mengirimkan (Submit) `sitemap.xml`

Website ini telah dilengkapi file [`public/sitemap.xml`](public/sitemap.xml) dan [`public/robots.txt`](public/robots.txt) yang otomatis ter-deploy ke root domain (`/sitemap.xml` dan `/robots.txt`).

1. Sebelum deploy ke domain khusus, pastikan URL domain di dalam [`public/sitemap.xml`](public/sitemap.xml) dan [`public/robots.txt`](public/robots.txt) telah disesuaikan dengan domain produksi resmi Anda.
2. Buka dashboard **Google Search Console** properti Anda.
3. Pada menu navigasi kiri, klik **Indexing → Sitemaps**.
4. Pada kolom **Add a new sitemap**, ketik:
   ```text
   sitemap.xml
   ```
5. Klik **Submit**.
6. Pastikan status berubah menjadi **Success** (*Berhasil*).

---

## 4. Cara Menginspeksi URL Homepage (URL Inspection)

Untuk mempercepat proses perayapan (*crawling*) awal oleh Googlebot:

1. Di bagian paling atas halaman Google Search Console, klik bilah pencarian **Inspect any URL in "..."**.
2. Masukkan URL lengkap halaman utama produksi Anda (contoh: `https://baksoacimbaintan.vardh.id/`) lalu tekan **Enter**.
3. Klik tombol **Test Live URL** (*Uji URL Aktif*) di pojok kanan atas untuk memastikan Googlebot dapat merender halaman, membaca konten menu, serta memvalidasi structured data JSON-LD `Restaurant` tanpa kendala.
4. Setelah hasil uji menunjukkan bahwa URL dapat diindeks (*URL is available to Google*), klik tombol **Request Indexing** (*Minta Pengindeksan*).

---

## 5. Cara Memantau Status Pengindeksan & Performa Pencarian Lokal

Setelah website mulai dirayapi oleh Google:

1. **Memantau Status Indexing:**
   - Buka menu **Indexing → Pages** untuk memeriksa apakah halaman utama sudah masuk ke kategori **Indexed** dan memastikan tidak ada error pemblokiran `robots.txt` atau `noindex`.
2. **Memantau Rich Results / Schema:**
   - Buka menu **Enhancements** di bilah kiri untuk memantau validitas structured data (`Restaurant` / `LocalBusiness` / `Menu`).
3. **Memantau Performa Kata Kunci Lokal (Search Performance):**
   - Buka menu **Performance → Search results**.
   - Pantau metrik **Total Clicks**, **Total Impressions**, **Average CTR**, dan **Average Position** untuk kueri lokal seperti:
     - *Bakso Aci Babelan*
     - *Bakso Aci Kebalen*
     - *Bakso Aci Bekasi*
     - *Dimsum Babelan*
     - *Pempek Babelan*
     - *Jajanan Babelan Bekasi*
4. **Memantau Core Web Vitals:**
   - Buka menu **Experience → Core Web Vitals** untuk memantau metrik **LCP**, **INP**, dan **CLS** dari pengguna nyata di perangkat Mobile maupun Desktop.
