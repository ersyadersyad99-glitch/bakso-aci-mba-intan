# BAKSO ACI MBA INTAN — Official Culinary Website (PRD V2)
**Publisher:** VARDH.ID  
**Target Area:** Kebalen, Kec. Babelan, Kabupaten Bekasi, Jawa Barat 17610

## Brand Positioning
- **Brand Message:** `"One Place, Many Delicious Choices."`
- **Primary Tagline:** `"Jajanan Favorit, Rasa yang Bikin Nagih!"`

## Fitur & Spesifikasi Sesuai PRD V2
1. **9 Bagian Website Responsif:**
   - Sticky Navigation (`Home`, `Categories`, `Menu`, `About`, `Reviews`, `Location`, `Order Now`)
   - Hero Section dengan Headline, Subheadline, dan 2 CTA utama (`Explore Menu` & `Order Now`)
   - Visual Product Categories (6 kategori utama dengan thumbnail visual)
   - Popular Menu dengan filter kategori & pencarian real-time
   - Online Ordering Platforms (`GoFood`, `GrabFood`, dan `WhatsApp`)
   - Customer Reviews & Ratings (3 sumber terpisah: `Google Reviews`, `GoFood Reviews`, `GrabFood Reviews` — tanpa menggabungkan rating dan tanpa testimoni rekayasa)
   - About Us (`"Lebih dari Sekadar Bakso Aci!"`)
   - Location & Contact (`Jl. Palapa, Kebalen, Kec. Babelan, Kabupaten Bekasi, Jawa Barat 17610` + integrasi Google Maps)
   - Footer & Mobile Floating Order Bar
2. **Tanpa Data Rekayasa (Zero Fabrication Policy):**
   - Seluruh harga produk, ketersediaan stok, deskripsi, foto produk (`.webp`), nomor WhatsApp, jam operasional (`To be confirmed`), serta ulasan pelanggan dapat dikonfigurasi melalui:
     - File konfigurasi terpusat: [`src/config/siteConfig.ts`](src/config/siteConfig.ts)
     - Panel interaktif di dalam website: tombol **"Konfigurasi Data"** di bagian atas/bawah halaman.

## Cara Menjalankan Proyek
```bash
# Jalankan server development
npm run dev

# Build untuk produksi
npm run build
```
