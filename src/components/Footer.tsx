import React from 'react';
import {
  Settings,
  MapPin,
  PhoneCall,
  Instagram,
  Clock,
  ExternalLink,
} from 'lucide-react';
import {
  SiteConfig,
  CategoryId,
  buildWhatsAppUrl,
  formatWhatsAppDisplay,
} from '../config/siteConfig';
import { trackGa4Event } from '../utils/analytics';

interface FooterProps {
  config: SiteConfig;
  onSelectCategory: (cat: CategoryId, scrollToMenu?: boolean) => void;
  onOpenOrderModal: () => void;
  onOpenConfigModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  config,
  onSelectCategory,
  onOpenConfigModal,
}) => {
  const directWaUrl = buildWhatsAppUrl(
    config.orderingPlatforms.whatsappNumber,
    config.orderingPlatforms.whatsappDefaultGreeting
  );
  const waDisplay =
    config.orderingPlatforms.whatsappDisplay ||
    formatWhatsAppDisplay(config.orderingPlatforms.whatsappNumber);
  const gofoodUrl = config.orderingPlatforms.gofoodUrl.trim();
  const grabfoodUrl = config.orderingPlatforms.grabfoodUrl.trim();

  return (
    <footer className="bg-brand-brown text-brand-cream pt-14 pb-24 sm:pb-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-10 border-b border-white/10">
          {/* Col 1: Brand Identity & Social Media */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-brand-red to-brand-orange flex items-center justify-center text-white font-poppins font-extrabold text-base">
                MI
              </div>
              <div>
                <span className="block font-poppins font-extrabold text-lg text-white leading-none">
                  {config.brand.name}
                </span>
                <span className="text-xs text-brand-orange font-poppins font-bold">
                  Client Showcase Project | {config.brand.showcaseBy}
                </span>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-brand-cream/80 leading-relaxed">
              <strong>&ldquo;{config.brand.brandMessage}&rdquo;</strong> —{' '}
              {config.brand.primaryTagline} Menyajikan Bakso Aci, Pempek, Dimsum, Mentai, dan
              Frozen Food di Kebalen, Kecamatan Babelan, Kabupaten Bekasi.
            </p>
            {config.socialMedia?.instagramUrl && (
              <div className="pt-1">
                <a
                  href={config.socialMedia.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/10 hover:bg-brand-orange text-white font-poppins font-bold text-xs transition-colors"
                >
                  <Instagram className="w-4 h-4" />
                  <span>Instagram {config.socialMedia.instagramHandle || '@baci_mbaintan'}</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            )}
          </div>

          {/* Col 2: Navigation */}
          <div className="lg:col-span-2 space-y-3">
            <h3 className="font-poppins font-extrabold text-xs text-white uppercase tracking-wider">
              Navigasi
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-brand-cream/80">
              {[
                { label: 'Beranda', href: '#home' },
                { label: 'Keunggulan', href: '#highlights' },
                { label: 'Kategori', href: '#categories' },
                { label: 'Menu Favorit', href: '#menu' },
                { label: 'Ulasan', href: '#reviews' },
                { label: 'Tentang Kami', href: '#about' },
                { label: 'Lokasi', href: '#location' },
              ].map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="hover:text-brand-orange transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Categories */}
          <div className="lg:col-span-2 space-y-3">
            <h3 className="font-poppins font-extrabold text-xs text-white uppercase tracking-wider">
              Kategori Produk
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-brand-cream/80">
              {config.categories
                .filter((c) => c.id !== 'all')
                .map((cat) => (
                  <li key={cat.id}>
                    <button
                      type="button"
                      onClick={() => onSelectCategory(cat.id, true)}
                      className="hover:text-brand-orange transition-colors text-left"
                    >
                      {cat.name}
                    </button>
                  </li>
                ))}
            </ul>
          </div>

          {/* Col 4: Confirmed Contact, Hours & Ordering Platforms */}
          <div className="lg:col-span-4 space-y-3">
            <h3 className="font-poppins font-extrabold text-xs text-white uppercase tracking-wider">
              Kontak, Jam Buka & Pemesanan
            </h3>
            <address className="not-italic space-y-2 text-xs text-brand-cream/85 leading-relaxed">
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-brand-orange shrink-0 mt-0.5" />
                <span>{config.locationAndContact.address}</span>
              </p>
              {directWaUrl && (
                <p className="flex items-center gap-2">
                  <PhoneCall className="w-4 h-4 text-[#25D366] shrink-0" />
                  <a
                    href={directWaUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackGa4Event('click_whatsapp', { entry_point: 'footer' })}
                    className="hover:text-brand-orange font-poppins font-semibold"
                  >
                    WhatsApp: {waDisplay}
                  </a>
                </p>
              )}
              <p className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-brand-orange shrink-0 mt-0.5" />
                <span>
                  Jam Operasional: <strong>{config.locationAndContact.operatingHours}</strong>{' '}
                  <span className="text-brand-cream/65">
                    ({config.locationAndContact.operatingDays || 'Hari operasional menunggu konfirmasi'})
                  </span>
                </span>
              </p>
            </address>

            <div className="pt-2 flex flex-wrap gap-2">
              {gofoodUrl && (
                <a
                  href={gofoodUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackGa4Event('click_gofood', { entry_point: 'footer' })}
                  className="px-3.5 py-2 rounded-xl bg-[#EE2737] hover:bg-[#D11F2E] text-white font-poppins font-extrabold text-xs inline-flex items-center gap-1.5 transition-colors"
                >
                  <span>GoFood</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
              {directWaUrl && (
                <a
                  href={directWaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackGa4Event('click_whatsapp', { entry_point: 'footer_btn' })}
                  className="px-3.5 py-2 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white font-poppins font-extrabold text-xs inline-flex items-center gap-1.5 transition-colors"
                >
                  <span>WhatsApp</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
              {grabfoodUrl ? (
                <a
                  href={grabfoodUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackGa4Event('click_grabfood', { entry_point: 'footer' })}
                  className="px-3.5 py-2 rounded-xl bg-[#00B14F] text-white font-poppins font-extrabold text-xs inline-flex items-center gap-1.5"
                >
                  <span>GrabFood</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              ) : (
                <span className="px-3 py-2 rounded-xl bg-white/5 text-brand-cream/55 font-poppins font-semibold text-xs border border-white/10">
                  GrabFood (Segera Hadir)
                </span>
              )}
              <a
                href={config.locationAndContact.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackGa4Event('click_google_maps', { entry_point: 'footer' })}
                className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-poppins font-bold text-xs inline-flex items-center gap-1.5 transition-colors"
              >
                <span>Google Maps</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Admin Config Trigger */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-brand-cream/70">
          <p>
            &copy; {new Date().getFullYear()} <strong>{config.brand.name}</strong>. Official
            Culinary Website by <strong>{config.brand.showcaseBy}</strong>.
          </p>
          <button
            type="button"
            onClick={onOpenConfigModal}
            className="inline-flex items-center gap-1.5 text-brand-orange hover:underline font-poppins font-semibold"
          >
            <Settings className="w-3.5 h-3.5" />
            Konfigurasi Data UMKM & SEO
          </button>
        </div>
      </div>
    </footer>
  );
};
