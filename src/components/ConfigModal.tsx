import React, { useState, useEffect } from 'react';
import {
  X,
  Settings,
  Save,
  RotateCcw,
  Plus,
  Trash2,
  ShieldCheck,
  Store,
  UtensilsCrossed,
  Star,
  Globe,
  Activity,
  CheckCircle2,
} from 'lucide-react';
import {
  SiteConfig,
  AvailabilityStatus,
  CategoryId,
  ReviewPlatformId,
  ProductItem,
} from '../config/siteConfig';
import {
  getRecentAnalyticsEvents,
  subscribeAnalyticsLog,
  LoggedAnalyticsEvent,
} from '../utils/analytics';

interface ConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: SiteConfig;
  onSaveConfig: (nextConfig: SiteConfig) => void;
  onResetConfig: () => void;
}

export const ConfigModal: React.FC<ConfigModalProps> = ({
  isOpen,
  onClose,
  config,
  onSaveConfig,
  onResetConfig,
}) => {
  const [draft, setDraft] = useState<SiteConfig>(config);
  const [activeTab, setActiveTab] = useState<'general' | 'products' | 'reviews' | 'seo'>(
    'general'
  );
  const [newProductName, setNewProductName] = useState('');
  const [newProductCategory, setNewProductCategory] =
    useState<Exclude<CategoryId, 'all'>>('bakso-aci');
  const [eventLogs, setEventLogs] = useState<LoggedAnalyticsEvent[]>([]);

  useEffect(() => {
    setDraft(config);
  }, [config, isOpen]);

  useEffect(() => {
    setEventLogs(getRecentAnalyticsEvents());
    const unsub = subscribeAnalyticsLog(() => {
      setEventLogs(getRecentAnalyticsEvents());
    });
    return unsub;
  }, [isOpen]);

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

  const selectableCategories = draft.categories.filter(
    (c): c is typeof c & { id: Exclude<CategoryId, 'all'> } => c.id !== 'all'
  );

  const handleProductChange = (
    productId: string,
    field: keyof ProductItem,
    value: string | number | boolean | null
  ) => {
    setDraft((prev) => ({
      ...prev,
      products: prev.products.map((p) => (p.id === productId ? { ...p, [field]: value } : p)),
    }));
  };

  const handleAddProduct = () => {
    if (!newProductName.trim()) return;
    const newItem: ProductItem = {
      id: `custom-${Date.now()}`,
      name: newProductName.trim(),
      categoryId: newProductCategory,
      shortDescription: null,
      price: null,
      availability: 'unconfirmed',
      imageWebp: null,
      seoAlt: `${newProductName.trim()} — Bakso Aci Mba Intan Kebalen Babelan Bekasi`,
      sourceLabel: 'Kategori Terkonfirmasi Owner',
      isPopular: true,
    };
    setDraft((prev) => ({
      ...prev,
      products: [...prev.products, newItem],
    }));
    setNewProductName('');
  };

  const handleDeleteProduct = (productId: string) => {
    setDraft((prev) => ({
      ...prev,
      products: prev.products.filter((p) => p.id !== productId),
    }));
  };

  const handlePlatformRatingChange = (
    platformId: ReviewPlatformId,
    field: 'overallRating' | 'reviewCount' | 'platformReviewUrl',
    val: string
  ) => {
    setDraft((prev) => ({
      ...prev,
      reviewPlatforms: prev.reviewPlatforms.map((rp) => {
        if (rp.platformId !== platformId) return rp;
        if (field === 'platformReviewUrl') {
          return { ...rp, platformReviewUrl: val };
        }
        const parsed = val.trim() === '' ? null : Number(val);
        return {
          ...rp,
          [field]: parsed !== null && !Number.isNaN(parsed) ? parsed : null,
        };
      }),
    }));
  };

  const handleAddVerifiedReview = (platformId: ReviewPlatformId) => {
    setDraft((prev) => ({
      ...prev,
      reviewPlatforms: prev.reviewPlatforms.map((rp) => {
        if (rp.platformId !== platformId) return rp;
        return {
          ...rp,
          reviews: [
            ...rp.reviews,
            {
              id: `rev-${Date.now()}`,
              platform: platformId,
              starRating: 5,
              reviewText: '',
              reviewerName: '',
              reviewDate: '',
            },
          ],
        };
      }),
    }));
  };

  const handleUpdateVerifiedReview = (
    platformId: ReviewPlatformId,
    reviewId: string,
    field: 'starRating' | 'reviewText' | 'reviewerName' | 'reviewDate',
    value: string | number
  ) => {
    setDraft((prev) => ({
      ...prev,
      reviewPlatforms: prev.reviewPlatforms.map((rp) => {
        if (rp.platformId !== platformId) return rp;
        return {
          ...rp,
          reviews: rp.reviews.map((r) => (r.id === reviewId ? { ...r, [field]: value } : r)),
        };
      }),
    }));
  };

  const handleRemoveVerifiedReview = (platformId: ReviewPlatformId, reviewId: string) => {
    setDraft((prev) => ({
      ...prev,
      reviewPlatforms: prev.reviewPlatforms.map((rp) => {
        if (rp.platformId !== platformId) return rp;
        return {
          ...rp,
          reviews: rp.reviews.filter((r) => r.id !== reviewId),
        };
      }),
    }));
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-brown/70 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="config-modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="relative w-full max-w-4xl max-h-[92vh] flex flex-col bg-brand-cream rounded-card-lg border-2 border-brand-brown/20 shadow-warm-lg overflow-hidden">
        {/* Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 bg-brand-brown text-brand-cream shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-brand-red text-white">
              <Settings className="w-5 h-5" />
            </div>
            <div>
              <h3 id="config-modal-title" className="font-poppins font-extrabold text-lg">
                Panel Konfigurasi Data Resmi UMKM & SEO (Owner / VARDH.ID)
              </h3>
              <p className="text-xs text-brand-cream/75">
                Konfigurasi URL Merchant, Nomor WA, Harga, Ulasan, GA4 & Google Search Console
                tanpa data fiktif.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/10 transition-colors"
            aria-label="Tutup konfigurasi"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-brand-brown/15 bg-white px-6 gap-2 shrink-0 overflow-x-auto">
          <button
            type="button"
            onClick={() => setActiveTab('general')}
            className={`flex items-center gap-2 py-3.5 px-4 font-poppins font-bold text-xs border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'general'
                ? 'border-brand-red text-brand-red'
                : 'border-transparent text-brand-brownLight hover:text-brand-brown'
            }`}
          >
            <Store className="w-4 h-4" />
            Kontak & URL Platform
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('products')}
            className={`flex items-center gap-2 py-3.5 px-4 font-poppins font-bold text-xs border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'products'
                ? 'border-brand-red text-brand-red'
                : 'border-transparent text-brand-brownLight hover:text-brand-brown'
            }`}
          >
            <UtensilsCrossed className="w-4 h-4" />
            Katalog Produk ({draft.products.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('reviews')}
            className={`flex items-center gap-2 py-3.5 px-4 font-poppins font-bold text-xs border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'reviews'
                ? 'border-brand-red text-brand-red'
                : 'border-transparent text-brand-brownLight hover:text-brand-brown'
            }`}
          >
            <Star className="w-4 h-4" />
            Rating & Ulasan
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('seo')}
            className={`flex items-center gap-2 py-3.5 px-4 font-poppins font-bold text-xs border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'seo'
                ? 'border-brand-red text-brand-red'
                : 'border-transparent text-brand-brownLight hover:text-brand-brown'
            }`}
          >
            <Globe className="w-4 h-4" />
            SEO, GA4 & Search Console
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          <div className="flex items-center gap-2.5 p-3.5 rounded-xl bg-brand-redLight/70 border border-brand-red/25 text-xs text-brand-brown">
            <ShieldCheck className="w-5 h-5 text-brand-red shrink-0" />
            <span>
              <strong>Zero Fabrication Policy:</strong> Biarkan kolom kosong jika data belum
              dikonfirmasi oleh pemilik bisnis; UI dan Schema JSON-LD tidak akan membuat data
              palsu.
            </span>
          </div>

          {activeTab === 'general' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="p-4 rounded-2xl bg-white border border-brand-brown/10 space-y-3">
                <h4 className="font-poppins font-extrabold text-sm text-brand-brown">
                  Kontak WhatsApp & Jam Operasional
                </h4>
                <div>
                  <label className="block text-xs font-medium text-brand-brown mb-1">
                    Nomor WhatsApp Resmi (Contoh: 6281234567890)
                  </label>
                  <input
                    type="text"
                    value={draft.orderingPlatforms.whatsappNumber}
                    onChange={(e) =>
                      setDraft((prev) => ({
                        ...prev,
                        orderingPlatforms: {
                          ...prev.orderingPlatforms,
                          whatsappNumber: e.target.value,
                        },
                      }))
                    }
                    placeholder="Kosong = [Placeholder Nomor WA]"
                    className="w-full px-3 py-2 rounded-xl border border-brand-brown/20 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-brand-brown mb-1">
                    Jam Operasional (Terkonfirmasi: 07:00–22:30 WIB)
                  </label>
                  <input
                    type="text"
                    value={draft.locationAndContact.operatingHours || ''}
                    onChange={(e) =>
                      setDraft((prev) => ({
                        ...prev,
                        locationAndContact: {
                          ...prev.locationAndContact,
                          operatingHours: e.target.value.trim() ? e.target.value : null,
                        },
                      }))
                    }
                    placeholder="07:00–22:30 WIB"
                    className="w-full px-3 py-2 rounded-xl border border-brand-brown/20 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-brand-brown mb-1">
                    Hari Operasional (Kosongkan jika belum dikonfirmasi)
                  </label>
                  <input
                    type="text"
                    value={draft.locationAndContact.operatingDays || ''}
                    onChange={(e) =>
                      setDraft((prev) => ({
                        ...prev,
                        locationAndContact: {
                          ...prev.locationAndContact,
                          operatingDays: e.target.value.trim() ? e.target.value : null,
                        },
                      }))
                    }
                    placeholder="Belum dikonfirmasi (Jangan diasumsikan buka setiap hari)"
                    className="w-full px-3 py-2 rounded-xl border border-brand-brown/20 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-brand-brown mb-1">
                    URL Instagram Resmi
                  </label>
                  <input
                    type="url"
                    value={draft.socialMedia?.instagramUrl || ''}
                    onChange={(e) =>
                      setDraft((prev) => ({
                        ...prev,
                        socialMedia: {
                          ...prev.socialMedia,
                          instagramUrl: e.target.value,
                        },
                      }))
                    }
                    placeholder="https://www.instagram.com/baci_mbaintan/"
                    className="w-full px-3 py-2 rounded-xl border border-brand-brown/20 text-sm"
                  />
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-brand-brown/10 space-y-3">
                <h4 className="font-poppins font-extrabold text-sm text-brand-brown">
                  URL Merchant Resmi (GoFood & GrabFood)
                </h4>
                <div>
                  <label className="block text-xs font-medium text-brand-brown mb-1">
                    URL Merchant GoFood Resmi
                  </label>
                  <input
                    type="url"
                    value={draft.orderingPlatforms.gofoodUrl}
                    onChange={(e) =>
                      setDraft((prev) => ({
                        ...prev,
                        orderingPlatforms: {
                          ...prev.orderingPlatforms,
                          gofoodUrl: e.target.value,
                        },
                      }))
                    }
                    placeholder="https://gofood.co.id/..."
                    className="w-full px-3 py-2 rounded-xl border border-brand-brown/20 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-brand-brown mb-1">
                    URL Merchant GrabFood Resmi
                  </label>
                  <input
                    type="url"
                    value={draft.orderingPlatforms.grabfoodUrl}
                    onChange={(e) =>
                      setDraft((prev) => ({
                        ...prev,
                        orderingPlatforms: {
                          ...prev.orderingPlatforms,
                          grabfoodUrl: e.target.value,
                        },
                      }))
                    }
                    placeholder="https://food.grab.com/..."
                    className="w-full px-3 py-2 rounded-xl border border-brand-brown/20 text-sm"
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'products' && (
            <div className="space-y-5">
              {/* Add New Product */}
              <div className="p-4 rounded-2xl bg-white border border-brand-brown/10 flex flex-wrap items-end gap-3">
                <div className="flex-1 min-w-[200px]">
                  <label className="block text-xs font-medium text-brand-brown mb-1">
                    Tambah Produk Baru ke Katalog
                  </label>
                  <input
                    type="text"
                    value={newProductName}
                    onChange={(e) => setNewProductName(e.target.value)}
                    placeholder="Nama Produk (Contoh: Pempek Kapal Selam)"
                    className="w-full px-3 py-2 rounded-xl border border-brand-brown/20 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-brand-brown mb-1">
                    Kategori
                  </label>
                  <select
                    value={newProductCategory}
                    onChange={(e) =>
                      setNewProductCategory(e.target.value as Exclude<CategoryId, 'all'>)
                    }
                    className="px-3 py-2 rounded-xl border border-brand-brown/20 text-sm bg-white"
                  >
                    {selectableCategories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>
                <button
                  type="button"
                  onClick={handleAddProduct}
                  className="px-4 py-2 rounded-xl bg-brand-red text-white font-poppins font-bold text-sm flex items-center gap-1.5 hover:bg-brand-redDark transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Tambah Produk
                </button>
              </div>

              {/* Product List Editor */}
              <div className="space-y-3">
                {draft.products.map((prod) => (
                  <div
                    key={prod.id}
                    className="p-4 rounded-2xl bg-white border border-brand-brown/10 space-y-3"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-poppins font-extrabold text-sm text-brand-brown">
                          {prod.name}
                        </span>
                        <span className="px-2.5 py-0.5 rounded-full text-[11px] bg-brand-cream text-brand-brown font-medium">
                          {draft.categories.find((c) => c.id === prod.categoryId)?.name}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleDeleteProduct(prod.id)}
                        className="p-1.5 rounded-lg text-brand-red hover:bg-brand-redLight transition-colors"
                        title="Hapus produk"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-[11px] font-medium text-brand-brownLight mb-1">
                          Harga Resmi (Rp) — Kosong = Placeholder
                        </label>
                        <input
                          type="number"
                          min="0"
                          value={prod.price ?? ''}
                          onChange={(e) => {
                            const val = e.target.value.trim();
                            handleProductChange(
                              prod.id,
                              'price',
                              val === '' ? null : Number(val)
                            );
                          }}
                          placeholder="[Placeholder Harga]"
                          className="w-full px-3 py-1.5 rounded-xl border border-brand-brown/20 text-xs"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-medium text-brand-brownLight mb-1">
                          Status Ketersediaan
                        </label>
                        <select
                          value={prod.availability}
                          onChange={(e) =>
                            handleProductChange(
                              prod.id,
                              'availability',
                              e.target.value as AvailabilityStatus
                            )
                          }
                          className="w-full px-3 py-1.5 rounded-xl border border-brand-brown/20 text-xs bg-white"
                        >
                          <option value="unconfirmed">Stok: Konfirmasi</option>
                          <option value="available">Tersedia</option>
                          <option value="limited">Terbatas</option>
                          <option value="sold_out">Habis</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-[11px] font-medium text-brand-brownLight mb-1">
                          URL Foto Produk (.webp / .avif)
                        </label>
                        <input
                          type="text"
                          value={prod.imageWebp ?? ''}
                          onChange={(e) =>
                            handleProductChange(
                              prod.id,
                              'imageWebp',
                              e.target.value.trim() ? e.target.value : null
                            )
                          }
                          placeholder="/images/produk.webp"
                          className="w-full px-3 py-1.5 rounded-xl border border-brand-brown/20 text-xs"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-medium text-brand-brownLight mb-1">
                        Deskripsi Komposisi Resmi (Kosong = Placeholder)
                      </label>
                      <input
                        type="text"
                        value={prod.shortDescription ?? ''}
                        onChange={(e) =>
                          handleProductChange(
                            prod.id,
                            'shortDescription',
                            e.target.value.trim() ? e.target.value : null
                          )
                        }
                        placeholder="Contoh: Isi bakso aci, cuanki lidah, tahu kering, pilus cikur & jeruk limau"
                        className="w-full px-3 py-1.5 rounded-xl border border-brand-brown/20 text-xs"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="space-y-5">
              {draft.reviewPlatforms.map((rp) => (
                <div
                  key={rp.platformId}
                  className="p-4 rounded-2xl bg-white border border-brand-brown/10 space-y-4"
                >
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <h4 className="font-poppins font-extrabold text-sm text-brand-brown">
                      {rp.platformName} (Independen & Tidak Digabung)
                    </h4>
                    <button
                      type="button"
                      onClick={() => handleAddVerifiedReview(rp.platformId)}
                      className="px-3 py-1.5 rounded-xl bg-brand-orange text-white font-poppins font-bold text-xs flex items-center gap-1"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      Tambah Ulasan Terverifikasi
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[11px] font-medium text-brand-brownLight mb-1">
                        Rating Resmi Platform (1.0 - 5.0)
                      </label>
                      <input
                        type="number"
                        step="0.1"
                        min="1"
                        max="5"
                        value={rp.overallRating ?? ''}
                        onChange={(e) =>
                          handlePlatformRatingChange(
                            rp.platformId,
                            'overallRating',
                            e.target.value
                          )
                        }
                        placeholder="Kosong = Menunggu Verifikasi"
                        className="w-full px-3 py-1.5 rounded-xl border border-brand-brown/20 text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-medium text-brand-brownLight mb-1">
                        Jumlah Ulasan Resmi
                      </label>
                      <input
                        type="number"
                        min="0"
                        value={rp.reviewCount ?? ''}
                        onChange={(e) =>
                          handlePlatformRatingChange(
                            rp.platformId,
                            'reviewCount',
                            e.target.value
                          )
                        }
                        placeholder="Kosong = Menunggu Verifikasi"
                        className="w-full px-3 py-1.5 rounded-xl border border-brand-brown/20 text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-medium text-brand-brownLight mb-1">
                        URL Halaman Ulasan Platform Asli
                      </label>
                      <input
                        type="url"
                        value={rp.platformReviewUrl}
                        onChange={(e) =>
                          handlePlatformRatingChange(
                            rp.platformId,
                            'platformReviewUrl',
                            e.target.value
                          )
                        }
                        placeholder="https://..."
                        className="w-full px-3 py-1.5 rounded-xl border border-brand-brown/20 text-xs"
                      />
                    </div>
                  </div>

                  {rp.reviews.length > 0 && (
                    <div className="space-y-2 pt-2 border-t border-brand-brown/10">
                      {rp.reviews.map((rev) => (
                        <div
                          key={rev.id}
                          className="grid grid-cols-1 sm:grid-cols-12 gap-2 items-center bg-brand-cream/40 p-2.5 rounded-xl"
                        >
                          <input
                            type="text"
                            value={rev.reviewerName || ''}
                            onChange={(e) =>
                              handleUpdateVerifiedReview(
                                rp.platformId,
                                rev.id,
                                'reviewerName',
                                e.target.value
                              )
                            }
                            placeholder="Nama pengulas"
                            className="sm:col-span-3 px-2.5 py-1.5 rounded-lg border border-brand-brown/20 text-xs bg-white"
                          />
                          <input
                            type="text"
                            value={rev.reviewText}
                            onChange={(e) =>
                              handleUpdateVerifiedReview(
                                rp.platformId,
                                rev.id,
                                'reviewText',
                                e.target.value
                              )
                            }
                            placeholder="Isi ulasan asli terverifikasi"
                            className="sm:col-span-5 px-2.5 py-1.5 rounded-lg border border-brand-brown/20 text-xs bg-white"
                          />
                          <select
                            value={rev.starRating}
                            onChange={(e) =>
                              handleUpdateVerifiedReview(
                                rp.platformId,
                                rev.id,
                                'starRating',
                                Number(e.target.value)
                              )
                            }
                            className="sm:col-span-2 px-2 py-1.5 rounded-lg border border-brand-brown/20 text-xs bg-white"
                          >
                            {[5, 4, 3, 2, 1].map((s) => (
                              <option key={s} value={s}>
                                {s} Bintang
                              </option>
                            ))}
                          </select>
                          <input
                            type="text"
                            value={rev.reviewDate || ''}
                            onChange={(e) =>
                              handleUpdateVerifiedReview(
                                rp.platformId,
                                rev.id,
                                'reviewDate',
                                e.target.value
                              )
                            }
                            placeholder="Tanggal"
                            className="sm:col-span-1 px-2 py-1.5 rounded-lg border border-brand-brown/20 text-xs bg-white"
                          />
                          <button
                            type="button"
                            onClick={() => handleRemoveVerifiedReview(rp.platformId, rev.id)}
                            className="sm:col-span-1 p-1.5 text-brand-red hover:bg-brand-redLight rounded-lg flex justify-center"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {activeTab === 'seo' && (
            <div className="space-y-5">
              {/* GA4 & Google Search Console Settings */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="p-4 rounded-2xl bg-white border border-brand-brown/10 space-y-3">
                  <h4 className="font-poppins font-extrabold text-sm text-brand-brown">
                    Google Analytics 4 & Search Console
                  </h4>
                  <div>
                    <label className="block text-xs font-medium text-brand-brown mb-1">
                      GA4 Measurement ID (Contoh: G-XXXXXXXXXX)
                    </label>
                    <input
                      type="text"
                      value={draft.seo.ga4MeasurementId}
                      onChange={(e) =>
                        setDraft((prev) => ({
                          ...prev,
                          seo: { ...prev.seo, ga4MeasurementId: e.target.value },
                        }))
                      }
                      placeholder="G-XXXXXXXXXX"
                      className="w-full px-3 py-2 rounded-xl border border-brand-brown/20 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-brand-brown mb-1">
                      Google Search Console HTML Verification Token
                    </label>
                    <input
                      type="text"
                      value={draft.seo.gscVerificationToken}
                      onChange={(e) =>
                        setDraft((prev) => ({
                          ...prev,
                          seo: { ...prev.seo, gscVerificationToken: e.target.value },
                        }))
                      }
                      placeholder="Token meta google-site-verification"
                      className="w-full px-3 py-2 rounded-xl border border-brand-brown/20 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-brand-brown mb-1">
                      Canonical Website URL
                    </label>
                    <input
                      type="url"
                      value={draft.seo.canonicalUrl}
                      onChange={(e) =>
                        setDraft((prev) => ({
                          ...prev,
                          seo: { ...prev.seo, canonicalUrl: e.target.value },
                        }))
                      }
                      className="w-full px-3 py-2 rounded-xl border border-brand-brown/20 text-sm"
                    />
                  </div>
                </div>

                {/* Google Business Profile & Verified GeoCoordinates */}
                <div className="p-4 rounded-2xl bg-white border border-brand-brown/10 space-y-3">
                  <h4 className="font-poppins font-extrabold text-sm text-brand-brown">
                    Google Business Profile & Koordinat Terverifikasi
                  </h4>
                  <div>
                    <label className="block text-xs font-medium text-brand-brown mb-1">
                      URL Google Business Profile Resmi
                    </label>
                    <input
                      type="url"
                      value={draft.seo.googleBusinessProfileUrl}
                      onChange={(e) =>
                        setDraft((prev) => ({
                          ...prev,
                          seo: { ...prev.seo, googleBusinessProfileUrl: e.target.value },
                        }))
                      }
                      className="w-full px-3 py-2 rounded-xl border border-brand-brown/20 text-sm"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-brand-brown mb-1">
                        Latitude Terverifikasi
                      </label>
                      <input
                        type="number"
                        step="any"
                        value={draft.seo.verifiedLatitude ?? ''}
                        onChange={(e) => {
                          const val = e.target.value.trim();
                          setDraft((prev) => ({
                            ...prev,
                            seo: {
                              ...prev.seo,
                              verifiedLatitude: val === '' ? null : Number(val),
                            },
                          }));
                        }}
                        placeholder="Kosong jika belum"
                        className="w-full px-3 py-2 rounded-xl border border-brand-brown/20 text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-brand-brown mb-1">
                        Longitude Terverifikasi
                      </label>
                      <input
                        type="number"
                        step="any"
                        value={draft.seo.verifiedLongitude ?? ''}
                        onChange={(e) => {
                          const val = e.target.value.trim();
                          setDraft((prev) => ({
                            ...prev,
                            seo: {
                              ...prev.seo,
                              verifiedLongitude: val === '' ? null : Number(val),
                            },
                          }));
                        }}
                        placeholder="Kosong jika belum"
                        className="w-full px-3 py-2 rounded-xl border border-brand-brown/20 text-xs"
                      />
                    </div>
                  </div>
                  <p className="text-[11px] text-brand-brownLight">
                    Koordinat hanya ditambahkan ke JSON-LD <code>GeoCoordinates</code> apabila
                    diisi dengan titik terverifikasi.
                  </p>
                </div>
              </div>

              {/* Live GA4 Event Inspector */}
              <div className="p-4 rounded-2xl bg-white border border-brand-brown/10 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Activity className="w-4 h-4 text-brand-red" />
                    <h4 className="font-poppins font-extrabold text-sm text-brand-brown">
                      Live GA4 Event Tracker Log (Tanpa Data Pribadi / PII)
                    </h4>
                  </div>
                  <span className="text-[11px] text-brand-brownLight">
                    7 Event Terintegrasi: page_view, view_menu, select_category, click_whatsapp,
                    click_gofood, click_grabfood, click_google_maps
                  </span>
                </div>
                <div className="max-h-36 overflow-y-auto bg-brand-cream/50 rounded-xl p-3 space-y-1.5 font-mono text-xs border border-brand-brown/10">
                  {eventLogs.length === 0 ? (
                    <p className="text-brand-brownLight">Belum ada event tercatat di sesi ini.</p>
                  ) : (
                    eventLogs.map((ev) => (
                      <div
                        key={ev.id}
                        className="flex items-center justify-between gap-2 py-1 border-b border-brand-brown/5 last:border-0"
                      >
                        <span className="font-bold text-brand-red">{ev.eventName}</span>
                        <span className="text-brand-brown truncate">
                          {JSON.stringify(ev.params)}
                        </span>
                        <span className="text-brand-brownLight shrink-0">{ev.timestamp}</span>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Search Console & SEO Deployment Checklist Summary */}
              <div className="p-4 rounded-2xl bg-white border border-brand-brown/10 space-y-2.5">
                <h4 className="font-poppins font-extrabold text-sm text-brand-brown">
                  Checklist Deployment SEO & Google Search Console (Owner Guide)
                </h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-brand-brownLight">
                  {[
                    'Verifikasi kepemilikan domain via DNS TXT record (Direkomendasikan) atau HTML meta tag.',
                    'Pastikan HTTPS aktif & Canonical URL sesuai dengan domain produksi.',
                    'Submit /sitemap.xml di Google Search Console setelah domain terverifikasi.',
                    'Gunakan fitur URL Inspection di Search Console pada URL homepage (/).',
                    'Masukkan GA4 Measurement ID (G-XXXXXXXXXX) untuk mulai merekam konversi.',
                    'Tautkan URL Google Business Profile resmi untuk Maps, Directions & Reviews.',
                  ].map((step, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between px-6 py-4 bg-white border-t border-brand-brown/15 shrink-0">
          <button
            type="button"
            onClick={() => {
              onResetConfig();
              onClose();
            }}
            className="px-4 py-2.5 rounded-xl border border-brand-brown/20 text-brand-brown font-poppins font-bold text-xs flex items-center gap-2 hover:bg-brand-cream transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            Reset ke Default
          </button>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-brand-brownLight font-poppins font-bold text-xs hover:text-brand-brown"
            >
              Batal
            </button>
            <button
              type="button"
              onClick={() => {
                onSaveConfig(draft);
                onClose();
              }}
              className="px-5 py-2.5 rounded-xl bg-brand-red hover:bg-brand-redDark text-white font-poppins font-extrabold text-xs flex items-center gap-2 shadow-md transition-all"
            >
              <Save className="w-4 h-4" />
              Simpan Konfigurasi
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
