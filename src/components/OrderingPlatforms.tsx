import React from 'react';
import { ShoppingBag, ExternalLink, MessageCircle, Clock } from 'lucide-react';
import { SiteConfig, buildWhatsAppUrl, formatWhatsAppDisplay } from '../config/siteConfig';
import { PlatformBadgeIcon } from './CulinaryVisuals';
import { trackGa4Event } from '../utils/analytics';

interface OrderingPlatformsProps {
  config: SiteConfig;
  onOpenOrderModal: () => void;
  onOpenConfigModal: () => void;
}

export const OrderingPlatforms: React.FC<OrderingPlatformsProps> = ({
  config,
  onOpenOrderModal,
}) => {
  const gofoodUrl = config.orderingPlatforms.gofoodUrl.trim();
  const grabfoodUrl = config.orderingPlatforms.grabfoodUrl.trim();
  const directWaUrl = buildWhatsAppUrl(
    config.orderingPlatforms.whatsappNumber,
    config.orderingPlatforms.whatsappDefaultGreeting
  );
  const waDisplay =
    config.orderingPlatforms.whatsappDisplay ||
    formatWhatsAppDisplay(config.orderingPlatforms.whatsappNumber);

  return (
    <section
      id="order-platforms"
      aria-labelledby="ordering-platforms-heading"
      className="py-16 lg:py-24 bg-gradient-to-b from-brand-brown to-[#241610] text-white relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-brand-orange/20 text-brand-orange font-poppins font-extrabold text-xs uppercase tracking-wider border border-brand-orange/30">
            <ShoppingBag className="w-3.5 h-3.5" />
            {config.orderingPlatforms.sectionSubtitle}
          </span>
          <h2
            id="ordering-platforms-heading"
            className="font-poppins font-extrabold text-3xl sm:text-4xl text-white"
          >
            {config.orderingPlatforms.sectionTitle}
          </h2>
          <p className="text-sm sm:text-base text-brand-cream/80">
            Pesan menu <strong>BAKSO ACI MBA INTAN</strong> di Kebalen, Babelan, Bekasi melalui
            merchant resmi <strong>GoFood</strong> atau hubungi langsung via{' '}
            <strong>WhatsApp</strong>.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: GOFOOD (Confirmed Official Merchant URL) */}
          <div className="bg-white text-brand-brown rounded-card-lg p-6 sm:p-7 shadow-warm-lg border-2 border-transparent hover:border-[#EE2737] transition-all flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-2">
                <PlatformBadgeIcon platform="gofood" className="w-16 h-12" />
                <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 font-poppins font-extrabold text-[11px]">
                  Official Merchant
                </span>
              </div>

              <div>
                <h3 className="font-poppins font-extrabold text-2xl text-brand-brown">GOFOOD</h3>
                <p className="text-sm text-brand-brownLight mt-1 leading-relaxed">
                  Pesan langsung melalui halaman merchant resmi{' '}
                  <strong>Bakso Aci Mba Intan, Babelan</strong> di GoFood. Praktis pilih Paket
                  Inces, Dimsum Salmon, dan varian lainnya.
                </p>
              </div>
            </div>

            {gofoodUrl ? (
              <a
                href={gofoodUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  trackGa4Event('click_gofood', { entry_point: 'ordering_platforms_section' })
                }
                className="w-full py-3.5 px-5 rounded-xl bg-[#EE2737] hover:bg-[#D11F2E] text-white font-poppins font-extrabold text-xs uppercase tracking-wider inline-flex items-center justify-center gap-2 shadow-md transition-all"
              >
                <span>Pesan di GoFood</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            ) : (
              <button
                type="button"
                onClick={onOpenOrderModal}
                className="w-full py-3.5 px-5 rounded-xl bg-[#EE2737] text-white font-poppins font-extrabold text-xs uppercase tracking-wider inline-flex items-center justify-center gap-2"
              >
                <span>Pesan Sekarang</span>
              </button>
            )}
          </div>

          {/* Card 2: WHATSAPP (Confirmed Official WhatsApp +62 812-9936-6705) */}
          <div className="bg-white text-brand-brown rounded-card-lg p-6 sm:p-7 shadow-warm-lg border-2 border-transparent hover:border-[#25D366] transition-all flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-2">
                <PlatformBadgeIcon platform="whatsapp" className="w-16 h-12" />
                <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 font-poppins font-extrabold text-[11px]">
                  {waDisplay}
                </span>
              </div>

              <div>
                <h3 className="font-poppins font-extrabold text-2xl text-brand-brown">
                  WHATSAPP
                </h3>
                <p className="text-sm text-brand-brownLight mt-1 leading-relaxed">
                  Hubungi langsung WhatsApp resmi <strong>{waDisplay}</strong> dengan pesan
                  otomatis bahasa Indonesia untuk tanya stok harian, harga, atau pemesanan langsung.
                </p>
              </div>
            </div>

            <div className="space-y-2.5">
              <button
                type="button"
                onClick={() => {
                  trackGa4Event('click_whatsapp', {
                    entry_point: 'ordering_platforms_composer',
                  });
                  onOpenOrderModal();
                }}
                className="w-full py-3.5 px-5 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white font-poppins font-extrabold text-xs uppercase tracking-wider inline-flex items-center justify-center gap-2 shadow-md transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Pilih Menu & Hitung Subtotal WA</span>
              </button>
              {directWaUrl && (
                <a
                  href={directWaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() =>
                    trackGa4Event('click_whatsapp', { entry_point: 'ordering_platforms_section' })
                  }
                  className="w-full py-2.5 px-4 rounded-xl bg-brand-cream hover:bg-brand-orangeLight text-brand-brown font-poppins font-bold text-xs inline-flex items-center justify-center gap-1.5 border border-brand-brown/15 transition-colors"
                >
                  <span>Chat WhatsApp Langsung ({waDisplay})</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </div>

          {/* Card 3: GRABFOOD (Upcoming Platform until merchant URL is provided) */}
          <div className="bg-white/95 text-brand-brown rounded-card-lg p-6 sm:p-7 shadow-warm-lg border-2 border-transparent transition-all flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-2">
                <PlatformBadgeIcon platform="grabfood" className="w-16 h-12 opacity-85" />
                {grabfoodUrl ? (
                  <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 font-poppins font-extrabold text-[11px]">
                    Official Merchant
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-brand-orangeLight text-brand-orangeDark font-poppins font-extrabold text-[11px] border border-brand-orange/30">
                    <Clock className="w-3 h-3" />
                    Segera Hadir
                  </span>
                )}
              </div>

              <div>
                <h3 className="font-poppins font-extrabold text-2xl text-brand-brown">
                  GRABFOOD
                </h3>
                <p className="text-sm text-brand-brownLight mt-1 leading-relaxed">
                  {grabfoodUrl
                    ? 'Pesan melalui halaman merchant resmi GrabFood untuk wilayah Kebalen, Babelan, dan Bekasi.'
                    : 'Tautan merchant GrabFood sedang dalam tahap integrasi. Saat ini silakan memesan melalui GoFood atau WhatsApp resmi kami.'}
                </p>
              </div>
            </div>

            {grabfoodUrl ? (
              <a
                href={grabfoodUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  trackGa4Event('click_grabfood', { entry_point: 'ordering_platforms_section' })
                }
                className="w-full py-3.5 px-5 rounded-xl bg-[#00B14F] hover:bg-[#009943] text-white font-poppins font-extrabold text-xs uppercase tracking-wider inline-flex items-center justify-center gap-2 shadow-md transition-all"
              >
                <span>Pesan di GrabFood</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            ) : (
              <div
                aria-disabled="true"
                className="w-full py-3.5 px-5 rounded-xl bg-brand-cream text-brand-brownLight border border-brand-brown/15 font-poppins font-extrabold text-xs uppercase tracking-wider inline-flex items-center justify-center gap-2 select-none"
              >
                <Clock className="w-4 h-4 text-brand-orange" />
                <span>Segera Hadir di GrabFood</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
