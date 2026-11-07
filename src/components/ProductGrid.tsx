import React, { useMemo, useState, useEffect, useRef } from 'react';
import { Flame, Search, SlidersHorizontal, Star } from 'lucide-react';
import {
  SiteConfig,
  CategoryId,
  ProductItem,
  matchesProductCategory,
  formatVerifiedPrice,
} from '../config/siteConfig';
import { ProductCard } from './ProductCard';
import { trackGa4Event } from '../utils/analytics';

interface ProductGridProps {
  config: SiteConfig;
  selectedCategory: CategoryId;
  onSelectCategory: (cat: CategoryId) => void;
  onOrderProduct: (product: ProductItem) => void;
  onOpenConfigModal: () => void;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  config,
  selectedCategory,
  onSelectCategory,
  onOrderProduct,
  onOpenConfigModal,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [onlyTopPicks, setOnlyTopPicks] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);
  const hasTrackedMenuView = useRef(false);

  // Track GA4 `view_menu` when the menu section enters the viewport
  useEffect(() => {
    const el = sectionRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasTrackedMenuView.current) {
            hasTrackedMenuView.current = true;
            trackGa4Event('view_menu', { section: 'popular_menu_showcase' });
          }
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const topPickProducts = useMemo(
    () => config.products.filter((p) => p.isTopPick),
    [config.products]
  );

  const filteredProducts = useMemo(() => {
    return config.products.filter((item) => {
      const matchesCat = matchesProductCategory(item, selectedCategory);
      const matchesTopPick = !onlyTopPicks || Boolean(item.isTopPick);
      const q = searchQuery.trim().toLowerCase();
      if (!q) return matchesCat && matchesTopPick;
      const catName =
        config.categories.find((c) => c.id === item.categoryId)?.name.toLowerCase() || '';
      return (
        matchesCat &&
        matchesTopPick &&
        (item.name.toLowerCase().includes(q) ||
          catName.includes(q) ||
          (item.shortDescription && item.shortDescription.toLowerCase().includes(q)))
      );
    });
  }, [config.products, config.categories, selectedCategory, searchQuery, onlyTopPicks]);

  return (
    <section
      id="menu"
      ref={sectionRef}
      aria-labelledby="menu-section-heading"
      className="py-16 lg:py-24 bg-brand-cream"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-brand-redLight text-brand-red font-poppins font-extrabold text-xs uppercase tracking-wider">
            <Flame className="w-3.5 h-3.5" />
            Popular Menu Showcase
          </span>
          <h2
            id="menu-section-heading"
            className="font-poppins font-extrabold text-3xl sm:text-4xl text-brand-brown"
          >
            Menu Favorit Pilihan Pelanggan
          </h2>
          <p className="text-sm sm:text-base text-brand-brownLight">
            Temukan pilihan menu <strong>BAKSO ACI MBA INTAN</strong> di Kebalen, Kec. Babelan,
            Kabupaten Bekasi — mulai dari paket Bakso Aci berkuah gurih pedas, stok Frozen Food
            praktis untuk di rumah, hingga sajian Pempek, Dimsum, dan Mentai.
          </p>
        </div>

        {/* Resto's Top Picks Highlight Strip (Verified GoFood Top Picks) */}
        {topPickProducts.length > 0 && (
          <div className="mb-6 p-4 sm:p-5 rounded-card bg-gradient-to-r from-brand-brown via-brand-brown to-[#4D3227] text-white shadow-warm border border-brand-orange/30">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3.5">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-brand-orange text-white font-poppins font-extrabold text-xs">
                  <Star className="w-3.5 h-3.5 fill-white" />
                  Resto&rsquo;s Top Picks
                </span>
                <span className="text-xs sm:text-sm text-brand-cream/90 font-medium">
                  Menu unggulan terpopuler sesuai katalog resmi GoFood
                </span>
              </div>
              <button
                type="button"
                onClick={() => setOnlyTopPicks((prev) => !prev)}
                className={`self-start sm:self-auto px-3.5 py-1.5 rounded-xl font-poppins font-extrabold text-xs transition-all border ${
                  onlyTopPicks
                    ? 'bg-brand-orange text-white border-brand-orange shadow-sm'
                    : 'bg-white/10 hover:bg-white/20 text-brand-cream border-white/20'
                }`}
              >
                {onlyTopPicks ? 'Tampilkan Semua Menu' : 'Filter Hanya Top Picks'}
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {topPickProducts.map((tp) => {
                const isSoldOut = tp.availability === 'sold_out';
                return (
                  <div
                    key={tp.id}
                    className="flex items-center justify-between gap-2 p-3 rounded-2xl bg-white/10 border border-white/15 backdrop-blur-sm"
                  >
                    <div className="min-w-0">
                      <p className="font-poppins font-extrabold text-xs sm:text-sm text-white truncate">
                        {tp.name}
                      </p>
                      <p className="text-[11px] text-brand-cream/85 font-semibold">
                        {formatVerifiedPrice(tp.price) || 'Cek Harga'}
                        {isSoldOut && (
                          <span className="ml-1.5 inline-block px-1.5 py-0.2 rounded bg-red-600 text-white text-[10px] font-bold">
                            Habis
                          </span>
                        )}
                      </p>
                    </div>
                    <button
                      type="button"
                      disabled={isSoldOut}
                      onClick={() => {
                        if (!isSoldOut) onOrderProduct(tp);
                      }}
                      className={`shrink-0 px-3 py-1.5 rounded-xl font-poppins font-extrabold text-[11px] transition-colors ${
                        isSoldOut
                          ? 'bg-white/15 text-white/50 cursor-not-allowed'
                          : 'bg-brand-red hover:bg-brand-orange text-white'
                      }`}
                    >
                      {isSoldOut ? 'Habis' : 'Pesan'}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Interactive Visual Category Tabs & Search Bar */}
        <div className="bg-white p-3.5 sm:p-4 rounded-card shadow-warm border border-brand-brown/10 mb-8 space-y-3">
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3.5">
            {/* Visual Category Tabs */}
            <div
              className="flex items-center gap-2 overflow-x-auto pb-1 lg:pb-0 no-scrollbar"
              role="tablist"
              aria-label="Filter Kategori Menu"
            >
              {config.categories.map((cat) => {
                const active = selectedCategory === cat.id;
                const count = config.products.filter((p) =>
                  matchesProductCategory(p, cat.id)
                ).length;

                return (
                  <button
                    key={cat.id}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => onSelectCategory(cat.id)}
                    className={`px-4 py-2.5 rounded-xl font-poppins font-extrabold text-xs whitespace-nowrap transition-all inline-flex items-center gap-1.5 ${
                      active
                        ? 'bg-brand-red text-white shadow-md'
                        : 'bg-brand-cream text-brand-brown hover:bg-brand-orangeLight'
                    }`}
                  >
                    <span>{cat.name}</span>
                    <span
                      className={`px-1.5 py-0.5 rounded-full text-[10px] ${
                        active ? 'bg-white/20 text-white' : 'bg-brand-brown/10 text-brand-brown'
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Search Input */}
            <div className="relative min-w-[230px]">
              <Search className="w-4 h-4 text-brand-brownLight absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Cari menu Bakso Aci, Pempek, atau Dimsum"
                placeholder="Cari Paket Inces, Dimsum Salmon..."
                className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-brand-cream/60 border border-brand-brown/15 text-xs text-brand-brown placeholder:text-brand-brownLight focus:outline-none focus:border-brand-red"
              />
            </div>
          </div>
        </div>

        {/* Two-column mobile product grid (grid-cols-2) expanding to 3 columns on desktop */}
        {filteredProducts.length === 0 ? (
          <div className="bg-white rounded-card p-10 text-center border border-brand-brown/10">
            <p className="font-poppins font-extrabold text-lg text-brand-brown mb-2">
              Menu tidak ditemukan pada kategori / kata kunci ini
            </p>
            <p className="text-sm text-brand-brownLight mb-4">
              Silakan pilih tab &ldquo;Semua Menu&rdquo; atau hapus kata kunci pencarian.
            </p>
            <button
              type="button"
              onClick={() => {
                onSelectCategory('all');
                setSearchQuery('');
              }}
              className="px-5 py-2.5 rounded-xl bg-brand-red text-white font-poppins font-extrabold text-xs uppercase"
            >
              Tampilkan Semua Menu
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-6">
            {filteredProducts.map((product) => {
              const catLabel =
                config.categories.find((c) => c.id === product.categoryId)?.name || 'Menu';
              return (
                <ProductCard
                  key={product.id}
                  product={product}
                  categoryLabel={catLabel}
                  onOrderProduct={onOrderProduct}
                />
              );
            })}
          </div>
        )}

        {/* Transparent Data Configuration Banner */}
        <div className="mt-8 p-4 rounded-2xl bg-white/90 border border-brand-brown/15 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-brand-brownLight">
          <div className="flex items-center gap-2.5">
            <SlidersHorizontal className="w-4 h-4 text-brand-red shrink-0" />
            <span>
              <strong className="text-brand-brown font-poppins">
                Katalog Produk Configurable:
              </strong>{' '}
              Nama produk diambil dari referensi GoFood & konfirmasi owner. Placeholder harga,
              deskripsi, dan foto dapat diisi melalui panel konfigurasi tanpa data fiktif.
            </span>
          </div>
          <button
            type="button"
            onClick={onOpenConfigModal}
            className="shrink-0 px-4 py-2 rounded-xl bg-brand-brown text-white font-poppins font-extrabold text-xs hover:bg-brand-red transition-colors"
          >
            Atur Harga & Produk
          </button>
        </div>
      </div>
    </section>
  );
};
