import React, { useState } from 'react';
import { Star, ExternalLink, MessageSquareHeart, ShieldCheck, Clock } from 'lucide-react';
import { SiteConfig, ReviewPlatformId } from '../config/siteConfig';
import { PlatformBadgeIcon } from './CulinaryVisuals';
import { trackGa4Event } from '../utils/analytics';

interface ReviewSectionProps {
  config: SiteConfig;
  onOpenConfigModal: () => void;
}

export const ReviewSection: React.FC<ReviewSectionProps> = ({ config }) => {
  const [activePlatform, setActivePlatform] = useState<ReviewPlatformId>('google');

  const currentPlatform =
    config.reviewPlatforms.find((p) => p.platformId === activePlatform) ||
    config.reviewPlatforms[0];

  const hasVerifiedRating =
    currentPlatform.overallRating !== null || currentPlatform.reviewCount !== null;
  const hasVerifiedReviews = currentPlatform.reviews.length > 0;
  const platformUrl = currentPlatform.platformReviewUrl.trim();

  const handleTrackReviewClick = (platformId: ReviewPlatformId) => {
    if (platformId === 'google') {
      trackGa4Event('click_google_maps', { entry_point: 'review_section_google' });
    } else if (platformId === 'gofood') {
      trackGa4Event('click_gofood', { entry_point: 'review_section_gofood' });
    } else if (platformId === 'grabfood') {
      trackGa4Event('click_grabfood', { entry_point: 'review_section_grabfood' });
    }
  };

  return (
    <section
      id="reviews"
      aria-labelledby="reviews-section-heading"
      className="py-16 lg:py-24 bg-white border-b border-brand-brown/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-brand-orangeLight text-brand-orangeDark font-poppins font-extrabold text-xs uppercase tracking-wider">
            <Star className="w-3.5 h-3.5 fill-brand-orange text-brand-orange" />
            Loved by Our Customers!
          </span>
          <h2
            id="reviews-section-heading"
            className="font-poppins font-extrabold text-3xl sm:text-4xl text-brand-brown"
          >
            Happy Customers, Happy Moments!
          </h2>
          <p className="text-sm sm:text-base text-brand-brownLight">
            Ulasan dan rating pelanggan ditampilkan secara terpisah berdasarkan sumber platform
            asli (<strong>Google</strong>, <strong>GoFood</strong>, dan <strong>GrabFood</strong>)
            tanpa pernah digabungkan atau direkayasa.
          </p>
        </div>

        {/* Three Review Source Tabs: Google | GoFood | GrabFood */}
        <div className="flex justify-center mb-8">
          <div
            className="inline-flex p-1.5 rounded-2xl bg-brand-cream border border-brand-brown/15 gap-1.5"
            role="tablist"
            aria-label="Sumber Ulasan Pelanggan"
          >
            {config.reviewPlatforms.map((plat) => {
              const isSelected = plat.platformId === activePlatform;
              return (
                <button
                  key={plat.platformId}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setActivePlatform(plat.platformId)}
                  className={`px-5 py-2.5 rounded-xl font-poppins font-extrabold text-xs sm:text-sm inline-flex items-center gap-2 transition-all ${
                    isSelected
                      ? 'bg-brand-red text-white shadow-md'
                      : 'text-brand-brown hover:bg-white/70'
                  }`}
                >
                  <PlatformBadgeIcon
                    platform={plat.platformId}
                    className="w-5 h-5 text-[9px] rounded-md"
                  />
                  <span>{plat.tabLabel}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Platform Review Container */}
        <div className="max-w-4xl mx-auto rounded-card-lg bg-brand-cream/60 border-2 border-brand-brown/10 p-6 sm:p-8 shadow-warm space-y-6">
          {/* Platform Identity & Verified Rating Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-brand-brown/10">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-white border border-brand-brown/10 flex items-center justify-center shadow-sm shrink-0">
                <PlatformBadgeIcon platform={currentPlatform.platformId} className="w-10 h-10" />
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-poppins font-extrabold text-xl text-brand-brown">
                    {currentPlatform.platformName}
                  </h3>
                  <span className="px-2.5 py-0.5 rounded-full bg-white border border-brand-brown/15 text-[11px] font-poppins font-semibold text-brand-brownLight">
                    Sumber Terpisah
                  </span>
                </div>
                <p className="text-xs text-brand-brownLight mt-1">
                  Rating dan jumlah ulasan hanya berlaku untuk platform{' '}
                  <strong>{currentPlatform.tabLabel}</strong>.
                </p>
              </div>
            </div>

            {/* Verified Rating & Count Display */}
            <div className="sm:text-right bg-white px-4 py-3 rounded-2xl border border-brand-brown/10 shrink-0">
              {hasVerifiedRating ? (
                <div>
                  <div className="inline-flex items-center gap-1.5 font-poppins font-extrabold text-2xl text-brand-brown">
                    <Star className="w-6 h-6 fill-amber-400 text-amber-400" />
                    <span>
                      {currentPlatform.overallRating !== null
                        ? currentPlatform.overallRating.toFixed(1)
                        : '—'}
                    </span>
                    <span className="text-xs font-normal text-brand-brownLight">/ 5.0</span>
                  </div>
                  <p className="text-xs font-medium text-brand-brownLight">
                    {currentPlatform.reviewCount !== null
                      ? `${currentPlatform.reviewCount} ulasan terverifikasi`
                      : 'Rating terverifikasi'}
                  </p>
                </div>
              ) : (
                <div className="space-y-0.5">
                  <span className="block font-poppins font-extrabold text-xs text-brand-brown">
                    Cek Langsung di {currentPlatform.tabLabel}
                  </span>
                  <span className="block text-[11px] text-brand-brownLight">
                    Tanpa klaim angka rating fiktif
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Customer Review Cards OR Elegant Empty State */}
          {hasVerifiedReviews ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {currentPlatform.reviews.map((rev) => (
                <article
                  key={rev.id}
                  className="p-5 rounded-2xl bg-white border border-brand-brown/10 shadow-sm flex flex-col justify-between space-y-3"
                >
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1">
                        {Array.from({ length: 5 }).map((_, idx) => (
                          <Star
                            key={idx}
                            className={`w-4 h-4 ${
                              idx < rev.starRating
                                ? 'fill-amber-400 text-amber-400'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      {rev.reviewDate && (
                        <span className="text-[11px] text-brand-brownLight font-medium">
                          {rev.reviewDate}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-brand-brown leading-relaxed">
                      &ldquo;{rev.reviewText}&rdquo;
                    </p>
                  </div>

                  <div className="pt-2 border-t border-brand-brown/10 flex items-center justify-between text-xs">
                    <span className="font-poppins font-bold text-brand-brown">
                      {rev.reviewerName || 'Pelanggan Terverifikasi'}
                    </span>
                    <span className="text-[11px] text-brand-brownLight">
                      via {currentPlatform.tabLabel}
                    </span>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl p-8 text-center border border-dashed border-brand-brown/20 space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-brand-redLight text-brand-red flex items-center justify-center mx-auto">
                <MessageSquareHeart className="w-7 h-7" />
              </div>

              <div className="max-w-lg mx-auto space-y-2">
                <span className="inline-flex items-center gap-1.5 text-xs font-poppins font-bold text-brand-red">
                  <ShieldCheck className="w-4 h-4" />
                  100% Tanpa Testimoni Fiktif
                </span>
                <p className="font-poppins font-extrabold text-lg sm:text-xl text-brand-brown">
                  &ldquo;Jadilah bagian dari pelanggan MBA INTAN dan bagikan pengalamanmu!&rdquo;
                </p>
                <p className="text-xs sm:text-sm text-brand-brownLight leading-relaxed">
                  Kami menjaga keaslian informasi dengan tidak membuat skor atau kutipan ulasan
                  rekayasa. Lihat ulasan pelanggan atau tulis pengalaman Anda langsung di halaman
                  resmi <strong>{currentPlatform.platformName}</strong>.
                </p>
              </div>

              <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                {platformUrl ? (
                  <a
                    href={platformUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => handleTrackReviewClick(currentPlatform.platformId)}
                    className="px-6 py-3 rounded-xl bg-brand-red hover:bg-brand-redDark text-white font-poppins font-extrabold text-xs uppercase tracking-wider inline-flex items-center gap-2 shadow-sm transition-all"
                  >
                    <span>Lihat Halaman Resmi {currentPlatform.tabLabel}</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                ) : (
                  <span className="px-5 py-3 rounded-xl bg-brand-cream text-brand-brownLight border border-brand-brown/15 font-poppins font-extrabold text-xs uppercase tracking-wider inline-flex items-center gap-2">
                    <Clock className="w-4 h-4 text-brand-orange" />
                    <span>Halaman {currentPlatform.tabLabel} Segera Hadir</span>
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Bottom Platform Action Bar when reviews exist */}
          {hasVerifiedReviews && platformUrl && (
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <span className="text-xs text-brand-brownLight">
                Sumber data: Ulasan resmi {currentPlatform.platformName}
              </span>
              <a
                href={platformUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => handleTrackReviewClick(currentPlatform.platformId)}
                className="px-4 py-2 rounded-xl bg-brand-brown hover:bg-brand-red text-white font-poppins font-extrabold text-xs inline-flex items-center gap-1.5 transition-colors"
              >
                <span>Buka {currentPlatform.platformName}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
