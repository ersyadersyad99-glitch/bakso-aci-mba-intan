import React, { useState, useEffect } from 'react';
import {
  X,
  MessageCircle,
  ExternalLink,
  ShoppingBag,
  MapPin,
  Clock,
  Plus,
  Minus,
  Trash2,
  RotateCcw,
} from 'lucide-react';
import {
  SiteConfig,
  ProductItem,
  formatVerifiedPrice,
  buildWhatsAppUrl,
  formatWhatsAppDisplay,
  composeWhatsAppOrderMessage,
} from '../config/siteConfig';
import { PlatformBadgeIcon } from './CulinaryVisuals';
import { trackGa4Event } from '../utils/analytics';

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: SiteConfig;
  initialProduct?: ProductItem | null;
  onOpenConfigModal: () => void;
}

export const OrderModal: React.FC<OrderModalProps> = ({
  isOpen,
  onClose,
  config,
  initialProduct,
}) => {
  const [selectedItems, setSelectedItems] = useState<Record<string, number>>({});
  const [customerName, setCustomerName] = useState('');
  const [customerNotes, setCustomerNotes] = useState('');

  // Auto-select initialProduct only if it is NOT sold_out
  useEffect(() => {
    if (isOpen && initialProduct && initialProduct.availability !== 'sold_out') {
      setSelectedItems((prev) => ({
        ...prev,
        [initialProduct.id]: Math.max(1, prev[initialProduct.id] || 1),
      }));
    }
  }, [isOpen, initialProduct]);

  // Close modal on Escape key press
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const updateQty = (productId: string, delta: number) => {
    const targetProduct = config.products.find((p) => p.id === productId);
    if (!targetProduct || targetProduct.availability === 'sold_out') {
      return;
    }

    setSelectedItems((prev) => {
      const next = { ...prev };
      const current = Number.isFinite(next[productId]) ? next[productId] : 0;
      const updated = Math.max(0, Math.min(99, Math.floor(current + delta)));
      if (updated <= 0) {
        delete next[productId];
      } else {
        next[productId] = updated;
      }
      return next;
    });
  };

  const removeProduct = (productId: string) => {
    setSelectedItems((prev) => {
      const next = { ...prev };
      delete next[productId];
      return next;
    });
  };

  const clearCart = () => {
    setSelectedItems({});
  };

  const selectedProductList = Object.entries(selectedItems)
    .map(([id, qty]) => {
      const prod = config.products.find((p) => p.id === id);
      if (!prod || prod.availability === 'sold_out' || qty <= 0) return null;
      return { product: prod, qty };
    })
    .filter((item): item is { product: ProductItem; qty: number } => item !== null);

  const totalItemCount = selectedProductList.reduce((acc, item) => acc + item.qty, 0);

  const estimatedSubtotal = selectedProductList.reduce((sum, { product, qty }) => {
    if (typeof product.price === 'number' && Number.isFinite(product.price) && product.price > 0) {
      return sum + product.price * qty;
    }
    return sum;
  }, 0);

  const waMessage = composeWhatsAppOrderMessage({
    greeting: config.orderingPlatforms.whatsappDefaultGreeting,
    customerName,
    customerNotes,
    items: selectedProductList,
    estimatedSubtotal,
  });
  const waUrl = buildWhatsAppUrl(config.orderingPlatforms.whatsappNumber, waMessage);
  const waDisplay =
    config.orderingPlatforms.whatsappDisplay ||
    formatWhatsAppDisplay(config.orderingPlatforms.whatsappNumber);
  const gofoodUrl = config.orderingPlatforms.gofoodUrl.trim();
  const grabfoodUrl = config.orderingPlatforms.grabfoodUrl.trim();

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-brand-brown/65 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="order-modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-brand-cream rounded-card-lg border-2 border-brand-brown/15 shadow-warm-lg">
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between px-4 sm:px-6 py-4 bg-brand-red text-white">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-white/15">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h3 id="order-modal-title" className="font-poppins font-extrabold text-base sm:text-lg leading-tight">
                Pesan Menu Favoritmu
              </h3>
              <p className="text-xs text-white/85">
                {config.brand.name} • Jam Buka: {config.locationAndContact.operatingHours}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/20 transition-colors"
            aria-label="Tutup modal pemesanan"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 sm:p-6 space-y-6">
          {/* Online Platform Cards */}
          <div>
            <p className="text-xs font-poppins font-extrabold uppercase tracking-wider text-brand-brownLight mb-3">
              1. Saluran Aplikasi Pesan-Antar
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {gofoodUrl && (
                <a
                  href={gofoodUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackGa4Event('click_gofood', { entry_point: 'order_modal' })}
                  className="flex items-center justify-between p-3.5 rounded-2xl bg-white border-2 border-[#EE2737]/25 hover:border-[#EE2737] transition-all group shadow-sm"
                >
                  <div className="flex items-center gap-3">
                    <PlatformBadgeIcon platform="gofood" className="w-12 h-10" />
                    <div>
                      <span className="block font-poppins font-extrabold text-sm text-brand-brown">
                        Pesan via GoFood
                      </span>
                      <span className="text-xs text-emerald-700 font-medium">
                        Merchant Resmi GoFood
                      </span>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-[#EE2737]" />
                </a>
              )}

              {grabfoodUrl ? (
                <a
                  href={grabfoodUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackGa4Event('click_grabfood', { entry_point: 'order_modal' })}
                  className="flex items-center justify-between p-3.5 rounded-2xl bg-white border-2 border-[#00B14F]/25 hover:border-[#00B14F] transition-all group shadow-sm"
                >
                  <div className="flex items-center gap-3">
                    <PlatformBadgeIcon platform="grabfood" className="w-12 h-10" />
                    <div>
                      <span className="block font-poppins font-extrabold text-sm text-brand-brown">
                        Pesan via GrabFood
                      </span>
                      <span className="text-xs text-brand-brownLight">
                        Merchant Resmi GrabFood
                      </span>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-[#00B14F]" />
                </a>
              ) : (
                <div
                  aria-disabled="true"
                  className="flex items-center justify-between p-3.5 rounded-2xl bg-white/75 border border-brand-brown/15 text-left select-none"
                >
                  <div className="flex items-center gap-3">
                    <PlatformBadgeIcon platform="grabfood" className="w-12 h-10 opacity-75" />
                    <div>
                      <span className="block font-poppins font-extrabold text-sm text-brand-brownLight">
                        GrabFood
                      </span>
                      <span className="text-xs text-brand-orangeDark font-semibold inline-flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        Segera Hadir
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* WhatsApp Direct Order Builder */}
          <div className="p-4 sm:p-5 rounded-card bg-white border border-brand-brown/10 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
              <div className="flex items-center gap-2.5">
                <PlatformBadgeIcon platform="whatsapp" className="w-11 h-10 shrink-0" />
                <div>
                  <h4 className="font-poppins font-extrabold text-sm sm:text-base text-brand-brown">
                    2. Pesan Langsung via WhatsApp ({waDisplay})
                  </h4>
                  <p className="text-xs text-brand-brownLight">
                    Pilih menu di bawah ini untuk membuat pesan WhatsApp otomatis
                  </p>
                </div>
              </div>
              {selectedProductList.length > 0 && (
                <button
                  type="button"
                  onClick={clearCart}
                  className="self-start sm:self-auto inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-brand-redLight text-brand-red hover:bg-brand-red hover:text-white font-poppins font-bold text-[11px] transition-colors"
                >
                  <RotateCcw className="w-3 h-3" />
                  Kosongkan Pilihan
                </button>
              )}
            </div>

            {/* Product Selector */}
            <div className="max-h-60 overflow-y-auto pr-1 space-y-2 border-y border-brand-brown/10 py-3">
              {config.products.map((item) => {
                const isSoldOut = item.availability === 'sold_out';
                const qty = isSoldOut ? 0 : selectedItems[item.id] || 0;
                const priceLabel = formatVerifiedPrice(item.price);
                return (
                  <div
                    key={item.id}
                    className={`flex items-center justify-between p-2.5 rounded-xl border transition-colors ${
                      isSoldOut
                        ? 'bg-gray-50 border-gray-200 opacity-75'
                        : qty > 0
                          ? 'bg-brand-orangeLight/60 border-brand-orange'
                          : 'bg-brand-cream/40 border-brand-brown/10'
                    }`}
                  >
                    <div className="min-w-0 pr-2">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <p className="font-poppins font-bold text-xs sm:text-sm text-brand-brown truncate">
                          {item.name}
                        </p>
                        {item.isCustomizable && !isSoldOut && (
                          <span className="px-1.5 py-0.2 rounded bg-white text-[10px] font-poppins font-semibold text-brand-brown border border-brand-brown/15">
                            Dapat dicustom
                          </span>
                        )}
                        {isSoldOut && (
                          <span className="px-1.5 py-0.2 rounded bg-red-600 text-white text-[10px] font-poppins font-bold">
                            Habis
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-brand-brownLight mt-0.5">
                        {priceLabel ? (
                          <span
                            className={`font-semibold ${
                              isSoldOut ? 'text-brand-brownLight line-through' : 'text-brand-red'
                            }`}
                          >
                            {priceLabel}
                            {qty > 0 && !isSoldOut && item.price && (
                              <span className="ml-1.5 text-brand-brown">
                                • Subtotal: {formatVerifiedPrice(item.price * qty)}
                              </span>
                            )}
                          </span>
                        ) : (
                          <span>Tanya harga & stok via WA</span>
                        )}
                      </p>
                    </div>
                    <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                      {qty > 0 && !isSoldOut && (
                        <button
                          type="button"
                          onClick={() => removeProduct(item.id)}
                          className="w-7 h-7 rounded-lg flex items-center justify-center text-brand-red hover:bg-brand-redLight transition-colors"
                          aria-label={`Hapus ${item.name} dari pesanan`}
                          title="Hapus item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => updateQty(item.id, -1)}
                        disabled={qty === 0 || isSoldOut}
                        className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center bg-white border border-brand-brown/20 text-brand-brown disabled:opacity-40 hover:bg-brand-red hover:text-white transition-colors"
                        aria-label={`Kurangi ${item.name}`}
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="w-6 text-center font-poppins font-extrabold text-xs sm:text-sm">
                        {qty}
                      </span>
                      <button
                        type="button"
                        onClick={() => updateQty(item.id, 1)}
                        disabled={isSoldOut}
                        className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center bg-brand-red text-white disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed hover:bg-brand-redDark transition-colors"
                        aria-label={`Tambah ${item.name}`}
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Cart Status & Subtotal */}
            {selectedProductList.length === 0 ? (
              <div className="px-3.5 py-2.5 rounded-xl bg-brand-cream/70 border border-dashed border-brand-brown/20 text-xs text-brand-brownLight flex items-center justify-between gap-2">
                <span>
                  Belum ada menu yang dipilih. Klik tombol <strong>(+)</strong> di atas atau langsung
                  chat WhatsApp untuk tanya stok hari ini.
                </span>
              </div>
            ) : (
              <div className="px-3.5 py-3 rounded-xl bg-brand-cream border border-brand-brown/15 space-y-2 text-xs">
                <div className="space-y-1 border-b border-brand-brown/10 pb-2">
                  {selectedProductList.map(({ product, qty }) => {
                    const unitStr = formatVerifiedPrice(product.price);
                    const subStr =
                      product.price && product.price > 0
                        ? formatVerifiedPrice(product.price * qty)
                        : null;
                    return (
                      <div key={product.id} className="flex items-center justify-between gap-2">
                        <span className="text-brand-brown font-medium truncate">
                          {product.name} ({qty}x {unitStr ? `@ ${unitStr}` : ''})
                        </span>
                        <span className="font-poppins font-bold text-brand-brown shrink-0">
                          {subStr || 'Konfirmasi via WA'}
                        </span>
                      </div>
                    );
                  })}
                </div>
                <div className="flex items-center justify-between text-brand-brownLight">
                  <span>Total Kuantitas:</span>
                  <span className="font-poppins font-bold text-brand-brown">
                    {totalItemCount} Porsi / Pack ({selectedProductList.length} Menu)
                  </span>
                </div>
                {estimatedSubtotal > 0 && (
                  <div className="flex items-center justify-between pt-1 border-t border-brand-brown/10">
                    <span className="font-semibold text-brand-brown">
                      Total Estimasi Pesanan (Belum Ongkir):
                    </span>
                    <span className="font-poppins font-extrabold text-sm sm:text-base text-brand-red">
                      {formatVerifiedPrice(estimatedSubtotal)}
                    </span>
                  </div>
                )}
              </div>
            )}

            {/* Customer Name & Notes */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-brand-brown mb-1">
                  Nama Pemesan (Opsional)
                </label>
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="Contoh: Kak Rina"
                  className="w-full px-3 py-2 rounded-xl border border-brand-brown/20 bg-brand-cream/30 text-sm focus:outline-none focus:border-brand-red"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-brand-brown mb-1">
                  Catatan Level Pedas / Alamat (Opsional)
                </label>
                <input
                  type="text"
                  value={customerNotes}
                  onChange={(e) => setCustomerNotes(e.target.value)}
                  placeholder="Contoh: Pedas sedang, Kebalen"
                  className="w-full px-3 py-2 rounded-xl border border-brand-brown/20 bg-brand-cream/30 text-sm focus:outline-none focus:border-brand-red"
                />
              </div>
            </div>

            {waUrl && (
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  trackGa4Event('click_whatsapp', {
                    entry_point: 'order_modal_send',
                    selected_items_count: selectedProductList.length,
                  })
                }
                className="w-full py-3.5 px-5 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white font-poppins font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all"
              >
                <MessageCircle className="w-5 h-5" />
                Kirim Pesanan ke WhatsApp ({waDisplay})
              </a>
            )}
          </div>

          {/* Location Reference */}
          <div className="flex items-center justify-between p-4 rounded-2xl bg-brand-creamDark/60 border border-brand-brown/10 text-xs">
            <div className="flex items-center gap-2.5">
              <MapPin className="w-4 h-4 text-brand-red shrink-0" />
              <span className="text-brand-brown">
                Lokasi: <strong>{config.locationAndContact.address}</strong>
              </span>
            </div>
            <a
              href={config.locationAndContact.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackGa4Event('click_google_maps', { entry_point: 'order_modal' })}
              className="shrink-0 font-poppins font-bold text-brand-red hover:underline ml-2"
            >
              Maps →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
