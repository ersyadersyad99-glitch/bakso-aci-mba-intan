# PHASE 1.5 — QUALITY ASSURANCE & UI/UX AUDIT REPORT
## BAKSO ACI MBA INTAN | Official Culinary Website (VARDH.ID)

**Tanggal Audit:** 7 November 2026  
**Environment Lokal:** `http://localhost:5173/`  
**Status Keseluruhan:** **PASS (Siap Melanjutkan ke Phase 2)**

---

## 1. Test Results (Ringkasan Hasil Pengujian)

| Area Pengujian | Komponen / File yang Diaudit | Status | Catatan Hasil |
| :--- | :--- | :---: | :--- |
| **1. Product Data Validation** | `src/config/siteConfig.ts` | **PASS** | Seluruh produk GoFood telah divalidasi terhadap tangkapan layar resmi GoFood (`Resto's top picks` & `Frozenfood`), tanpa penggabungan varian atau harga fiktif. |
| **2. Order Modal Testing** | `src/components/OrderModal.tsx` | **PASS** | Tambah item (`+`), kurangi (`-`), hapus item (`Trash2`), kosongkan keranjang (`Kosongkan Pilihan`), kalkulasi subtotal akurat, proteksi item `Habis` (`sold_out`), tombol `Escape` & klik backdrop berfungsi penuh. |
| **3. UI/UX Audit (11 Seksi)** | `Navbar`, `HeroSection`, `BrandHighlights`, `CategoryExplorer`, `ProductGrid`, `ProductCard`, `OrderingPlatforms`, `ReviewSection`, `AboutSection`, `LocationSection`, `FinalConversionCta`, `Footer` | **PASS** | Tipografi (`Poppins ExtraBold` + `Inter`), palet warna (`#D93636`, `#F28C28`, `#FFF4E6`, `#38251D`, `#FFFFFF`), hierarki heading (`H1` -> `H2` -> `H3`), badge `Resto's Top Pick` & `Dapat dicustom` tampil konsisten. |
| **4. Responsive Testing** | Viewport `375px`, `390px`, `768px`, `1024px`, `1440px` | **PASS** | Tidak ada horizontal overflow (`overflow-x-hidden`), kartu produk 2 kolom di mobile (`grid-cols-2`) dan 3 kolom di desktop (`lg:grid-cols-3`), tab kategori horizontal scrollable, modal responsif. |
| **5. Functional Testing** | Navigasi anchor, filter kategori, pencarian, tombol GoFood/WA/Maps/Instagram | **PASS** | Seluruh anchor `#home`, `#highlights`, `#categories`, `#menu`, `#reviews`, `#about`, `#location` dan eksternal link (`target="_blank" rel="noopener noreferrer"`) berfungsi. |
| **6. Technical & Build Verification** | `tsc -b && vite build`, `SeoHead.tsx`, `index.html` | **PASS** | `0` error TypeScript, `0` broken import, JSON-LD `Restaurant` + `MenuItem` valid dan sinkron dengan status stok produk. |

---

## 2. Bugs Discovered (Temuan Bug Sebelum Perbaikan)

1. **[BUG-01] Item berstatus `Habis` (`sold_out`) masih dapat ditambahkan di dalam `OrderModal.tsx`:**
   - Pada `OrderModal.tsx`, daftar pemilih menu sebelumnya tidak memeriksa `item.availability === 'sold_out'`, sehingga pengguna masih bisa menekan tombol `+` pada menu **Dimsum Salmon (Isi 6)** yang sedang `Habis` di GoFood dan memasukkannya ke subtotal.
2. **[BUG-02] Belum tersedia tombol Hapus Item (`Remove`) langsung & `Kosongkan Pilihan` (`Clear Cart`) di `OrderModal.tsx`:**
   - Pengguna harus menekan tombol `-` berulang kali untuk menghapus item dengan kuantitas banyak, serta belum ada tombol satu-klik untuk mengosongkan seluruh pilihan menu.
3. **[BUG-03] Penutupan Modal (`OrderModal` & `ConfigModal`) belum mendukung tombol `Escape` dan klik area luar (`Backdrop`):**
   - Sebelumnya modal hanya dapat ditutup melalui tombol ikon `X` di pojok kanan atas.
4. **[BUG-04] Filter Kategori tunggal (`categoryId === selectedCategory`) menyebabkan item lintas-kategori tersembunyi atau diduplikasi:**
   - Pada GoFood, **Paket Inces I** ditampilkan dengan foto kemasan vakum di bawah kategori **Frozenfood** (`Rp 19.000`), sementara **Paket Inces II, III, JUMBO, Hemat** adalah paket Bakso Aci yang juga tercantum pada bagian katalog tersebut. Sebelumnya dibuat entri ke-7 terpisah (`menu-frozen-food` / *"Paket Inces Frozen Food"* seharga `Rp 15.000` dengan deskripsi rentang harga gabungan `Rp 15.000 – Rp 38.000`) yang melanggar aturan larangan menggabungkan varian produk.

---

## 3. Bugs Fixed (Perbaikan yang Telah Diterapkan)

1. **Perbaikan Proteksi Stok `Habis` & Validasi Kuantitas di `src/components/OrderModal.tsx`:**
   - Menonaktifkan tombol `+` dan `-` untuk produk dengan `availability === 'sold_out'`, menampilkan badge merah **`Habis`**, serta mencegah `initialProduct` menambahkan produk yang sedang habis ke keranjang.
   - Membatasi kuantitas hanya pada bilangan bulat positif valid (`0` hingga `99`) menggunakan `Math.max(0, Math.min(99, Math.floor(current + delta)))`.
2. **Penambahan Fitur Hapus Item, Kosongkan Keranjang & Empty State di `src/components/OrderModal.tsx`:**
   - Menambahkan tombol ikon tempat sampah (`Trash2`) di samping setiap item yang dipilih (`qty > 0`) untuk menghapus produk secara instan.
   - Menambahkan tombol **`Kosongkan Pilihan`** untuk mereset seluruh item keranjang.
   - Menambahkan informasi ringkasan saat keranjang kosong (*empty cart state*) maupun saat terisi (menampilkan jumlah porsi/pack, jumlah menu, dan **Estimasi Subtotal Menu** yang akurat).
3. **Peningkatan Aksesibilitas Penutupan Modal (`src/components/OrderModal.tsx` & `src/components/ConfigModal.tsx`):**
   - Menambahkan event listener `keydown` untuk tombol `Escape` dan handler klik pada overlay backdrop.
4. **Dukungan Multi-Kategori Tanpa Duplikasi (`matchesProductCategory` di `src/config/siteConfig.ts`, `CategoryExplorer.tsx`, `ProductGrid.tsx`) & Badge Visual di `src/components/ProductCard.tsx`:**
   - Menambahkan properti `secondaryCategoryIds`, `ingredients`, `isCustomizable`, `isTopPick`, dan `variantLabel` pada `ProductItem`.
   - Menghapus entri gabungan fiktif `menu-frozen-food` (*"Paket Inces Frozen Food"*).
   - Menampilkan strip khusus **Resto's Top Picks** di `ProductGrid.tsx` serta badge **`★ Resto's Top Pick`**, **`Dapat dicustom`**, dan **`Habis`** langsung pada `ProductCard.tsx`.

---

## 4. Remaining Issues (Masalah yang Tersisa)

- **Tidak ada bug fungsional, UI/UX, maupun kompilasi yang tersisa.**
- Catatan data bisnis yang memang menunggu konfirmasi owner (sesuai aturan *Zero Fabrication*):
  1. **URL Merchant GrabFood:** Saat ini belum tersedia dari owner, sehingga ditampilkan secara jujur dengan status **"Segera Hadir"** (`Upcoming`).
  2. **Hari Operasional:** Jam operasional (`07:00–22:30 WIB`) telah ditampilkan, sedangkan hari operasional belum dikonfirmasi sehingga tidak diasumsikan buka setiap hari dan `openingHoursSpecification` tidak dimasukkan ke JSON-LD sampai hari operasional dikonfirmasi.
  3. **Rincian Harga Varian Pempek, Dimsum Reguler, Dimsum Mentai & Minuman:** Menggunakan placeholder jujur (`price: null`, `shortDescription: null`, `availability: 'unconfirmed'`) yang dapat diatur kapan saja melalui panel konfigurasi.

---

## 5. Product Data Discrepancies & Resolution (Audit Data Produk vs GoFood)

Berikut perbandingan data produk terhadap tangkapan layar GoFood resmi dan hasil koreksinya di `src/config/siteConfig.ts`:

| No | Nama Produk (GoFood) | Harga Resmi | Komposisi / Ingredients (GoFood) | Top Pick | Custom Label | Status Stok | Kategori & Varian |
| :-: | :--- | :--- | :--- | :-: | :-: | :-: | :--- |
| 1 | **Paket Inces I** | `Rp 19.000` | `2 Baso Urat, 4 Baso Aci, Cuanki Lidah, Pangsit, Tahu Baso, Cikur` | Tidak | `Dapat dicustom` | `Tersedia` (`available`) | Primary: `frozen-food`, Secondary: `bakso-aci` (*Kemasan Frozen Pack*) |
| 2 | **Paket Inces II** | `Rp 22.000` | `4 Baso Aci, 3 Baso Urat, Pangsit, Tahu Baso, 2 Ceker, Cuanki Lidah, Cikur` | **Ya (`Resto's Top Pick`)** | `Dapat dicustom` | `Tersedia` (`available`) | Primary: `bakso-aci`, Secondary: `frozen-food` (*Siap Santap & Katalog Frozenfood*) |
| 3 | **Paket Inces III** | `Rp 23.000` | `2 Bakso Aci Telur, 2 Bakso Urat, 3 Bakso Aci, Tahu Bakso, Pangsit, Cuanki Lidah, Cikur` | Tidak | `Dapat dicustom` | `Tersedia` (`available`) | Primary: `bakso-aci`, Secondary: `frozen-food` (*Siap Santap & Katalog Frozenfood*) |
| 4 | **Paket Inces JUMBO** | `Rp 38.000` | `8 Baso Aci, 4 Baso Urat, 2 Tahu Baso, 2 Pangsit, 4 Cuanki Lidah, Cikur` | **Ya (`Resto's Top Pick`)** | `Dapat dicustom` | `Tersedia` (`available`) | Primary: `bakso-aci`, Secondary: `frozen-food` (*Porsi Jumbo Siap Santap*) |
| 5 | **Paket Inces Hemat** | `Rp 15.000` | `2 Bakso Urat, 2 Bakso Aci, Mie Kuning, 1 Cuanki Lidah, 1 Pangsit, Cikur` | Tidak | `Dapat dicustom` | `Tersedia` (`available`) | Primary: `bakso-aci`, Secondary: `frozen-food` (*Paket Hemat*) |
| 6 | **Dimsum Salmon (Isi 6)** | `Rp 19.000` | `Salmon, Wortel, Jamur, Beef` | **Ya (`Resto's Top Pick`)** | Tidak | **`Habis` (`sold_out`)** | Primary: `mentai`, Secondary: `dimsum` (*Isi 6 Pcs*) |

**Koreksi Discrepancy yang Dilakukan:**
1. **Koreksi Status `Dimsum Salmon (Isi 6)`:** Diubah dari `limited` (*Terbatas*) menjadi `sold_out` (**`Habis`**) sesuai tangkapan layar GoFood, dengan tombol order dinonaktifkan (`Stok Habis (GoFood)`) dan schema JSON-LD `https://schema.org/OutOfStock`.
2. **Penghapusan Entri ke-7 Gabungan (`Paket Inces Frozen Food`):** Entri `menu-frozen-food` yang sebelumnya menggabungkan rentang harga `Rp 15.000 – Rp 38.000` dengan harga `Rp 15.000` dihapus agar tidak ada penggabungan varian berbeda maupun duplikasi harga. Sebagai gantinya, **Paket Inces I** (`Rp 19.000`) ditetapkan pada kategori `frozen-food` (serta `bakso-aci`) sesuai foto kemasan vakum di katalog `Frozenfood` GoFood.
3. **Pemisahan Metadata Badge dari Deskripsi Produk:** Label `Resto's Top Pick` dan `Dapat dicustom` dipindahkan dari teks `shortDescription` ke field boolean tersendiri (`isTopPick` & `isCustomizable`) sehingga `shortDescription` murni berisi komposisi bahan dari GoFood.

---

## 6. Responsive Testing Results (Hasil Pengujian Responsif)

| Viewport | Target Perangkat | Layout Grid & Navigasi | Hasil Audit |
| :--- | :--- | :--- | :---: |
| **`375px`** | Small Mobile (iPhone SE / Mini) | Hamburger menu aktif, grid produk 2 kolom (`grid-cols-2 gap-3.5`), tombol CTA penuh (`w-full`), floating WA di kanan bawah tidak menutupi footer (`pb-24`). | **PASS** |
| **`390px`** | Modern Mobile (iPhone 14/15/16) | Proporsi kartu produk 2 kolom rapi, teks nama produk & harga mudah dibaca, tab kategori dapat digeser horizontal (`overflow-x-auto no-scrollbar`). | **PASS** |
| **`768px`** | Tablet (`md` / `sm`) | Kategori explorer 3 kolom (`sm:grid-cols-3`), tombol Hero berdampingan (`sm:flex-row`), form pemesanan WhatsApp 2 kolom. | **PASS** |
| **`1024px`** | Small Laptop (`lg`) | Split-screen Hero (`lg:grid-cols-12`), kategori explorer 6 kolom (`lg:grid-cols-6`), produk 3 kolom (`lg:grid-cols-3`), peta lokasi berdampingan dengan kartu kontak. | **PASS** |
| **`1440px`** | Large Desktop (`xl`) | Navigasi penuh (`xl:flex`), kontainer terpusat (`max-w-7xl mx-auto`), pencahayaan editorial dan stiker dekoratif tampil proporsional tanpa overflow. | **PASS** |

---

## 7. Production Build Status (Status Build Produksi)

- **Perintah Build:** `npm run build` (`tsc -b && vite build`)
- **TypeScript Check (`tsc -b`):** `0 errors`, `0 warnings`
- **Vite Production Bundle:** Berhasil dikompilasi ke direktori `dist/` tanpa broken imports.

---

## 8. Recommendation for Phase 2 (Rekomendasi untuk Phase 2)

Website **BAKSO ACI MBA INTAN** telah lulus seluruh tahapan **Phase 1.5 — Quality Assurance & UI/UX Audit** dengan data produk yang 100% akurat terhadap katalog GoFood, kalkulasi modal pemesanan yang teruji, serta tampilan responsif di seluruh ukuran layar.

**Rekomendasi:** Proyek **SIAP (READY)** untuk melanjutkan ke **Phase 2** (Integrasi lanjutan / persiapan aset foto produk asli WebP dari owner, konfirmasi hari operasional & link GrabFood jika sudah tersedia, serta tahap *deployment*).
