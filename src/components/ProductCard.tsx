import React from 'react';
import { ShoppingBag, CheckCircle2, Star, SlidersHorizontal, Ban } from 'lucide-react';
import { ProductItem, formatVerifiedPrice } from '../config/siteConfig';
import { CategoryArtwork } from './CulinaryVisuals';

interface ProductCardProps {
  product: ProductItem;
  categoryLabel: string;
  onOrderProduct: (product: ProductItem) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  categoryLabel,
  onOrderProduct,
}) => {
  const verifiedPrice = formatVerifiedPrice(product.price);
  const isSoldOut = product.availability === 'sold_out';

  const renderAvailabilityBadge = (status: ProductItem['availability']) => {
    switch (status) {
      case 'available':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
            Tersedia
          </span>
        );
      case 'limited':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-semibold bg-amber-100 text-amber-800 border border-amber-200 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-600" />
            Terbatas
          </span>
        );
      case 'sold_out':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-extrabold bg-red-600 text-white border border-red-700 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-white" />
            Habis
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-medium bg-brand-cream text-brand-brown border border-brand-brown/15 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-orange" />
            Stok: Konfirmasi
          </span>
        );
    }
  };

  return (
    <article
      className={`group bg-white rounded-card sm:rounded-card-lg border overflow-hidden shadow-warm hover:shadow-warm-lg transition-all duration-300 flex flex-col ${
        product.isTopPick ? 'border-brand-orange/45 ring-1 ring-brand-orange/20' : 'border-brand-brown/10'
      }`}
    >
      {/* Product Visual — 1:1 Square Aspect Ratio for Product Cards */}
      <div className="relative aspect-square bg-brand-cream overflow-hidden border-b border-brand-brown/10">
        <div className={`w-full h-full ${isSoldOut ? 'grayscale opacity-80 transition-all' : ''}`}>
          <CategoryArtwork
            categoryId={product.categoryId}
            imageWebp={product.imageWebp}
            alt={product.seoAlt || product.name}
            showPlaceholderBadge={false}
          />
        </div>
        <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between gap-1.5 flex-wrap">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-white/95 backdrop-blur-sm text-brand-brown font-poppins font-extrabold text-[10px] sm:text-xs shadow-sm">
              {categoryLabel}
            </span>
            {product.isTopPick && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full bg-brand-orange text-white font-poppins font-extrabold text-[10px] sm:text-xs shadow-sm">
                <Star className="w-3 h-3 fill-white" />
                Resto&rsquo;s Top Pick
              </span>
            )}
          </div>
          {renderAvailabilityBadge(product.availability)}
        </div>
        <div className="absolute bottom-2 left-2.5 right-2.5 flex items-center justify-between pointer-events-none">
          <span className="px-2 py-0.5 rounded-md bg-brand-brown/75 text-brand-cream/95 backdrop-blur-sm text-[9px] sm:text-[10px] font-medium">
            Visualisasi Sajian • Configurable
          </span>
        </div>
      </div>

      {/* Product Body */}
      <div className="p-3.5 sm:p-5 flex-1 flex flex-col justify-between space-y-3.5">
        <div className="space-y-1.5 sm:space-y-2">
          <div className="flex items-center justify-between gap-1.5 flex-wrap">
            <div className="flex items-center gap-1 text-[10px] sm:text-[11px] font-medium text-brand-orangeDark min-w-0">
              <CheckCircle2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-brand-orange shrink-0" />
              <span className="truncate">{product.sourceLabel}</span>
            </div>
            {product.isCustomizable && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-brand-cream text-brand-brown border border-brand-brown/15 text-[10px] font-poppins font-bold">
                <SlidersHorizontal className="w-2.5 h-2.5 text-brand-red" />
                Dapat dicustom
              </span>
            )}
          </div>

          <h3 className="font-poppins font-extrabold text-sm sm:text-lg text-brand-brown group-hover:text-brand-red transition-colors leading-snug">
            {product.name}
          </h3>

          {product.variantLabel && (
            <p className="text-[10px] sm:text-[11px] font-poppins font-semibold text-brand-brownLight bg-brand-cream/70 px-2.5 py-1 rounded-lg border border-brand-brown/10 inline-block">
              {product.variantLabel}
            </p>
          )}

          {product.shortDescription ? (
            <p className="text-xs sm:text-sm text-brand-brownLight leading-relaxed line-clamp-3">
              {product.shortDescription}
            </p>
          ) : (
            <p className="text-[11px] sm:text-xs text-brand-brownLight/90 bg-brand-cream/55 p-2 sm:p-2.5 rounded-xl border border-dashed border-brand-brown/15 leading-relaxed">
              <strong className="font-poppins text-brand-brown">[Placeholder Deskripsi]</strong>{' '}
              Rincian komposisi menu mengacu pada katalog resmi merchant.
            </p>
          )}
        </div>

        {/* Price & Easy-to-Tap Order Button */}
        <div className="pt-2.5 sm:pt-3 border-t border-brand-brown/10 space-y-2.5">
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
            <span className="text-[10px] sm:text-xs text-brand-brownLight font-medium">
              Harga Resmi:
            </span>
            {verifiedPrice ? (
              <span
                className={`font-poppins font-extrabold text-sm sm:text-lg ${
                  isSoldOut ? 'text-brand-brownLight line-through' : 'text-brand-red'
                }`}
              >
                {verifiedPrice}
              </span>
            ) : (
              <span className="inline-block font-poppins font-bold text-[10px] sm:text-xs text-brand-brown bg-brand-orangeLight px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-lg border border-brand-orange/30">
                [Placeholder Harga • Cek Saat Pesan]
              </span>
            )}
          </div>

          <button
            type="button"
            disabled={isSoldOut}
            onClick={() => {
              if (!isSoldOut) onOrderProduct(product);
            }}
            className={`w-full py-2.5 sm:py-3 px-3 rounded-xl font-poppins font-extrabold text-xs uppercase tracking-wide inline-flex items-center justify-center gap-1.5 shadow-sm transition-all ${
              isSoldOut
                ? 'bg-gray-200 text-gray-600 cursor-not-allowed border border-gray-300'
                : 'bg-brand-red hover:bg-brand-redDark text-white active:scale-[0.99]'
            }`}
          >
            {isSoldOut ? (
              <>
                <Ban className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 text-red-600" />
                <span>Stok Habis (GoFood)</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                <span>Pesan Menu Ini</span>
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  );
};
