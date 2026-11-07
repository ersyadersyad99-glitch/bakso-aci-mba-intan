import React from 'react';
import {
  MapPin,
  Clock,
  PhoneCall,
  Navigation,
  ExternalLink,
  MessageCircle,
  Star,
  Store,
  Instagram,
} from 'lucide-react';
import { SiteConfig, buildWhatsAppUrl, formatWhatsAppDisplay } from '../config/siteConfig';
import { trackGa4Event } from '../utils/analytics';

interface LocationSectionProps {
  config: SiteConfig;
  onOpenOrderModal: () => void;
  onOpenConfigModal: () => void;
}

export const LocationSection: React.FC<LocationSectionProps> = ({
  config,
  onOpenOrderModal,
}) => {
  const directWaUrl = buildWhatsAppUrl(
    config.orderingPlatforms.whatsappNumber,
    config.orderingPlatforms.whatsappDefaultGreeting
  );
  const waDisplay =
    config.orderingPlatforms.whatsappDisplay ||
    formatWhatsAppDisplay(config.orderingPlatforms.whatsappNumber);

  return (
    <section
      id="location"
      aria-labelledby="location-section-heading"
      className="py-16 lg:py-24 bg-white border-t border-brand-brown/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-brand-redLight text-brand-red font-poppins font-extrabold text-xs uppercase tracking-wider">
            <MapPin className="w-3.5 h-3.5" />
            Lokasi & Kontak Resmi
          </span>
          <h2
            id="location-section-heading"
            className="font-poppins font-extrabold text-3xl sm:text-4xl text-brand-brown"
          >
            Kunjungi Outlet Kami di Kebalen, Babelan
          </h2>
          <p className="text-sm sm:text-base text-brand-brownLight">
            Temukan lokasi resmi <strong>{config.locationAndContact.businessName}</strong> di Jl.
            Palapa, Kebalen, Kecamatan Babelan, Kabupaten Bekasi.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left: Confirmed Location Details & Contact Card */}
          <div className="lg:col-span-5 bg-brand-cream rounded-card-lg p-6 sm:p-8 border border-brand-brown/10 flex flex-col justify-between space-y-6 shadow-warm">
            <div className="space-y-6">
              <div>
                <span className="text-xs font-poppins font-extrabold uppercase tracking-wider text-brand-red">
                  Official Location & Contact
                </span>
                <h3 className="font-poppins font-extrabold text-2xl text-brand-brown mt-1">
                  {config.locationAndContact.businessName}
                </h3>
              </div>

              <div className="space-y-4">
                {/* Semantic Address */}
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-brand-red text-white flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-poppins font-extrabold text-sm text-brand-brown">
                      Alamat Lengkap
                    </p>
                    <address className="not-italic text-sm text-brand-brownLight mt-0.5 leading-relaxed">
                      {config.locationAndContact.address}
                    </address>
                  </div>
                </div>

                {/* Operating Hours (without assuming operating days) */}
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-brand-brown text-white flex items-center justify-center shrink-0 mt-0.5">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-poppins font-extrabold text-sm text-brand-brown">
                      Jam Operasional
                    </p>
                    <p className="text-sm font-poppins font-bold text-brand-red mt-0.5">
                      {config.locationAndContact.operatingHours || '07.00–22.30 WIB'}
                    </p>
                    <p className="text-xs text-brand-brownLight mt-0.5">
                      {config.locationAndContact.operatingDays
                        ? `Hari operasional: ${config.locationAndContact.operatingDays}`
                        : 'Hari operasional: Menunggu konfirmasi (Silakan hubungi via WhatsApp)'}
                    </p>
                  </div>
                </div>

                {/* Confirmed WhatsApp Contact */}
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-[#25D366] text-white flex items-center justify-center shrink-0 mt-0.5">
                    <PhoneCall className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-poppins font-extrabold text-sm text-brand-brown">
                      WhatsApp Resmi
                    </p>
                    {directWaUrl && (
                      <a
                        href={directWaUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() =>
                          trackGa4Event('click_whatsapp', { entry_point: 'location_section' })
                        }
                        className="text-sm font-poppins font-extrabold text-brand-red hover:underline mt-0.5 inline-flex items-center gap-1"
                      >
                        <span>{waDisplay}</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>

                {/* Confirmed Instagram Profile */}
                {config.socialMedia?.instagramUrl && (
                  <div className="flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-brand-orange text-white flex items-center justify-center shrink-0 mt-0.5">
                      <Instagram className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-poppins font-extrabold text-sm text-brand-brown">
                        Instagram Resmi
                      </p>
                      <a
                        href={config.socialMedia.instagramUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-poppins font-bold text-brand-brownLight hover:text-brand-red hover:underline mt-0.5 inline-flex items-center gap-1"
                      >
                        <span>{config.socialMedia.instagramHandle || '@baci_mbaintan'}</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                )}
              </div>

              {/* Google Business Profile Integration-Ready Quick Links */}
              <div className="p-4 rounded-2xl bg-white border border-brand-brown/10 space-y-2.5">
                <p className="text-[11px] font-poppins font-extrabold uppercase tracking-wider text-brand-brownLight">
                  Google Maps & Ulasan Resmi
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <a
                    href={config.locationAndContact.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() =>
                      trackGa4Event('click_google_maps', {
                        entry_point: 'gbp_profile_link',
                      })
                    }
                    className="px-3 py-2 rounded-xl bg-brand-cream hover:bg-brand-orangeLight text-brand-brown font-poppins font-bold text-xs inline-flex items-center justify-between gap-1.5 border border-brand-brown/10 transition-colors"
                  >
                    <span className="inline-flex items-center gap-1.5 truncate">
                      <Store className="w-3.5 h-3.5 text-brand-red shrink-0" />
                      Lokasi Google Maps
                    </span>
                    <ExternalLink className="w-3 h-3 shrink-0" />
                  </a>

                  <a
                    href={config.locationAndContact.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() =>
                      trackGa4Event('click_google_maps', {
                        entry_point: 'gbp_customer_reviews',
                      })
                    }
                    className="px-3 py-2 rounded-xl bg-brand-cream hover:bg-brand-orangeLight text-brand-brown font-poppins font-bold text-xs inline-flex items-center justify-between gap-1.5 border border-brand-brown/10 transition-colors"
                  >
                    <span className="inline-flex items-center gap-1.5 truncate">
                      <Star className="w-3.5 h-3.5 text-brand-orange shrink-0" />
                      Ulasan Google
                    </span>
                    <ExternalLink className="w-3 h-3 shrink-0" />
                  </a>
                </div>
              </div>
            </div>

            {/* Directions & WhatsApp Buttons */}
            <div className="pt-4 border-t border-brand-brown/10 flex flex-col sm:flex-row gap-3">
              <a
                href={config.locationAndContact.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  trackGa4Event('click_google_maps', { entry_point: 'business_directions_btn' })
                }
                className="flex-1 py-3.5 px-4 rounded-xl bg-brand-red hover:bg-brand-redDark text-white font-poppins font-extrabold text-xs uppercase tracking-wider inline-flex items-center justify-center gap-2 shadow-sm transition-colors"
              >
                <Navigation className="w-4 h-4" />
                Buka Google Maps
              </a>
              {directWaUrl ? (
                <a
                  href={directWaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() =>
                    trackGa4Event('click_whatsapp', { entry_point: 'location_contact_btn' })
                  }
                  className="flex-1 py-3.5 px-4 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white font-poppins font-extrabold text-xs uppercase tracking-wider inline-flex items-center justify-center gap-2 shadow-sm transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  Chat WhatsApp
                </a>
              ) : (
                <button
                  type="button"
                  onClick={onOpenOrderModal}
                  className="flex-1 py-3.5 px-4 rounded-xl bg-brand-brown hover:bg-brand-brownLight text-white font-poppins font-extrabold text-xs uppercase tracking-wider inline-flex items-center justify-center gap-2 transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  Hubungi Kami
                </button>
              )}
            </div>
          </div>

          {/* Right: Map Embed Card */}
          <div className="lg:col-span-7 rounded-card-lg overflow-hidden border-2 border-brand-brown/10 shadow-warm bg-brand-cream flex flex-col">
            <div className="relative flex-1 min-h-[320px]">
              <iframe
                title="Peta Lokasi Bakso Aci Mba Intan Jl. Palapa Kebalen Babelan Bekasi"
                src={config.locationAndContact.mapEmbedUrl}
                className="w-full h-full min-h-[320px] border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <div className="p-4 bg-white border-t border-brand-brown/10 flex flex-wrap items-center justify-between gap-3">
              <div className="text-xs text-brand-brown">
                <strong>Alamat Resmi:</strong> {config.locationAndContact.address}
              </div>
              <a
                href={config.locationAndContact.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  trackGa4Event('click_google_maps', { entry_point: 'map_embed_footer_link' })
                }
                className="px-3.5 py-2 rounded-xl bg-brand-redLight text-brand-red font-poppins font-extrabold text-xs inline-flex items-center gap-1.5 hover:bg-brand-red hover:text-white transition-colors"
              >
                <span>Lihat di Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
