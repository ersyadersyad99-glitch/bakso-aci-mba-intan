# SEO & Google Ecosystem Deployment Checklist — BAKSO ACI MBA INTAN
**Client Showcase Project | VARDH.ID**  
**Lokasi Utama:** Jl. Palapa, Kebalen, Kecamatan Babelan, Kabupaten Bekasi, Jawa Barat 17610

---

## 1. Persiapan Domain & HTTPS
- [ ] Pastikan domain produksi aktif dan menggunakan **HTTPS** (SSL/TLS otomatis aktif di Vercel / Netlify / Cloudflare Pages / Firebase Hosting).
- [ ] Perbarui konstanta `CANONICAL_SITE_URL` di [`src/config/siteConfig.ts`](src/config/siteConfig.ts) (atau melalui tombol **"Konfigurasi Data" → Tab "SEO, GA4 & Search Console"**) agar sesuai dengan domain produksi resmi.
- [ ] Perbarui domain pada [`public/sitemap.xml`](public/sitemap.xml) dan [`public/robots.txt`](public/robots.txt) jika menggunakan domain khusus selain `https://baksoacimbaintan.vardh.id/`.

---

## 2. Verifikasi Google Search Console (GSC)
Pilih **salah satu** metode verifikasi kepemilikan domain berikut di [Google Search Console](https://search.google.com/search-console):

### Opsi A — DNS TXT Record (Direkomendasikan untuk Properti Domain)
1. Buka Google Search Console → **Add Property** → pilih **Domain** (contoh: `baksoacimbaintan.id`).
2. Salin baris TXT record yang diberikan Google (contoh: `google-site-verification=xxxxx`).
3. Masuk ke pengelola DNS domain Anda (Cloudflare / Niagahoster / Rumahweb / Domainesia), tambahkan record baru:
   - **Type:** `TXT`
   - **Name / Host:** `@`
   - **Value:** `google-site-verification=xxxxx`
4. Klik **Verify** di Google Search Console.

### Opsi B — HTML Meta Tag (Alternatif URL Prefix)
1. Buka Google Search Console → **Add Property** → pilih **URL Prefix** (`https://...`).
2. Pilih metode **HTML tag** dan salin nilai `content="..."` dari tag `<meta name="google-site-verification" content="TOKEN_ANDA" />`.
3. Tempel nilai token tersebut ke `GSC_VERIFICATION_TOKEN` di [`src/config/siteConfig.ts`](src/config/siteConfig.ts) (atau tambahkan langsung di `<head>` pada [`index.html`](index.html)).
4. Deploy ulang dan klik **Verify** di Google Search Console.

---

## 3. Submit Sitemap & Inspeksi URL di Search Console
- [ ] Setelah properti terverifikasi di Google Search Console, buka menu **Sitemaps** di panel kiri.
- [ ] Masukkan `sitemap.xml` dan klik **Submit**.
- [ ] Buka menu **URL Inspection**, masukkan URL homepage utama (`https://domain-anda.id/`), lalu klik **Request Indexing**.
- [ ] Pastikan tidak ada direktif `noindex` pada halaman utama (hanya halaman `/404.html` yang menggunakan `noindex, follow`).

---

## 4. Konfigurasi Google Analytics 4 (GA4)
- [ ] Buat properti GA4 baru di [Google Analytics](https://analytics.google.com/) dan salin **Measurement ID** (`G-XXXXXXXXXX`).
- [ ] Masukkan Measurement ID ke `GA4_MEASUREMENT_ID` di [`src/config/siteConfig.ts`](src/config/siteConfig.ts) atau melalui tab **"SEO, GA4 & Search Console"** di dalam website.
- [ ] Verifikasi di **GA4 DebugView / Realtime** bahwa ke-7 event berikut berjalan tanpa mengirimkan data pribadi (PII) pelanggan:
  - `page_view`
  - `view_menu`
  - `select_category`
  - `click_whatsapp`
  - `click_gofood`
  - `click_grabfood`
  - `click_google_maps`

---

## 5. Integrasi Google Business Profile & Validasi Schema
- [ ] Salin URL resmi **Google Business Profile** dan ulasan Google Maps untuk **BAKSO ACI MBA INTAN** (Kebalen, Babelan, Bekasi), lalu masukkan ke `GOOGLE_BUSINESS_PROFILE_URL` dan `GOOGLE_REVIEWS_URL` di [`src/config/siteConfig.ts`](src/config/siteConfig.ts).
- [ ] Jika nomor telepon/WhatsApp, jam operasional, harga menu, dan titik koordinat (`verifiedLatitude`, `verifiedLongitude`) sudah dikonfirmasi oleh pemilik bisnis, masukkan ke [`src/config/siteConfig.ts`](src/config/siteConfig.ts) agar otomatis disertakan dalam structured data JSON-LD (`Restaurant`, `LocalBusiness`, `PostalAddress`, `Menu`, `MenuItem`).
- [ ] Uji URL produksi di [Google Rich Results Test](https://search.google.com/test/rich-results) dan [Schema Markup Validator](https://validator.schema.org/) untuk memastikan JSON-LD valid 100%.
- [ ] Uji performa halaman di [Google PageSpeed Insights](https://pagespeed.web.dev/) untuk memastikan target Core Web Vitals terpenuhi (`LCP <= 2.5s`, `INP <= 200ms`, `CLS <= 0.1`).

> **Catatan Penting:** Implementasi SEO menyiapkan website agar mudah dirayapi (*crawlable*) dan diindeks secara optimal oleh mesin pencari, namun pengindeksan dan peringkat di hasil pencarian Google bergantung sepenuhnya pada algoritma Google.
