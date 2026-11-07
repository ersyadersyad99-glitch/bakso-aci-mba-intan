import React, { useState, useEffect } from 'react';
import {
  Menu,
  X,
  ShoppingBag,
  Flame,
  MapPin,
  Settings,
  PhoneCall,
  Instagram,
} from 'lucide-react';
import { SiteConfig, buildWhatsAppUrl, formatWhatsAppDisplay } from '../config/siteConfig';
import { trackGa4Event } from '../utils/analytics';

interface NavbarProps {
  config: SiteConfig;
  onOpenOrderModal: () => void;
  onOpenConfigModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  config,
  onOpenOrderModal,
  onOpenConfigModal,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { label: 'Beranda', href: '#home' },
    { label: 'Keunggulan', href: '#highlights' },
    { label: 'Kategori', href: '#categories' },
    { label: 'Menu Favorit', href: '#menu' },
    { label: 'Ulasan', href: '#reviews' },
    { label: 'Tentang Kami', href: '#about' },
    { label: 'Lokasi', href: '#location' },
  ];

  const directWaUrl = buildWhatsAppUrl(
    config.orderingPlatforms.whatsappNumber,
    config.orderingPlatforms.whatsappDefaultGreeting
  );
  const waDisplay =
    config.orderingPlatforms.whatsappDisplay ||
    formatWhatsAppDisplay(config.orderingPlatforms.whatsappNumber);

  return (
    <>
      {/* Top Editorial Brand & Confirmed Contact Ribbon */}
      <div className="bg-brand-brown text-brand-cream text-xs py-2 px-4 border-b border-white/10">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-brand-red text-white font-poppins font-extrabold text-[10px] tracking-wide uppercase">
              <Flame className="w-3 h-3" />
              {config.brand.brandMessage}
            </span>
            <span className="hidden lg:inline text-brand-cream/85 font-medium">
              Jam Buka: {config.locationAndContact.operatingHours || '07.00–22.30 WIB'}
            </span>
          </div>
          <div className="flex items-center gap-3.5 ml-auto flex-wrap">
            {directWaUrl && (
              <a
                href={directWaUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  trackGa4Event('click_whatsapp', { entry_point: 'top_navbar_ribbon' })
                }
                className="inline-flex items-center gap-1 text-brand-cream/95 hover:text-brand-orange transition-colors font-medium"
              >
                <PhoneCall className="w-3.5 h-3.5 text-[#25D366] shrink-0" />
                <span>{waDisplay}</span>
              </a>
            )}
            {config.socialMedia?.instagramUrl && (
              <a
                href={config.socialMedia.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-brand-cream/95 hover:text-brand-orange transition-colors font-medium"
              >
                <Instagram className="w-3.5 h-3.5 text-brand-orange shrink-0" />
                <span className="hidden sm:inline">
                  {config.socialMedia.instagramHandle || '@baci_mbaintan'}
                </span>
              </a>
            )}
            <a
              href={config.locationAndContact.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                trackGa4Event('click_google_maps', { entry_point: 'top_navbar_location' })
              }
              className="inline-flex items-center gap-1 text-brand-cream/90 hover:text-brand-orange transition-colors font-medium"
            >
              <MapPin className="w-3.5 h-3.5 text-brand-orange shrink-0" />
              <span className="truncate max-w-[150px] sm:max-w-none">
                Kebalen, Babelan
              </span>
            </a>
            <button
              type="button"
              onClick={onOpenConfigModal}
              className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white/10 hover:bg-white/20 text-brand-cream text-[11px] font-medium transition-colors"
              title="Konfigurasi Data UMKM & SEO"
            >
              <Settings className="w-3 h-3 text-brand-orange" />
              <span className="hidden sm:inline">Konfigurasi</span>
            </button>
          </div>
        </div>
      </div>

      {/* Section 1: Sticky Navigation */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-warm border-b border-brand-brown/10 py-3'
            : 'bg-brand-cream/95 backdrop-blur-sm border-b border-brand-brown/5 py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-3">
          {/* Brand Logo */}
          <a
            href="#home"
            className="flex items-center gap-3 group focus:outline-none shrink-0"
            aria-label={config.brand.name}
          >
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-brand-red to-brand-orange flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
              <span className="font-poppins font-extrabold text-lg tracking-tighter">MI</span>
            </div>
            <div>
              <span className="block font-poppins font-extrabold text-base sm:text-lg tracking-tight text-brand-brown leading-none">
                BAKSO ACI <span className="text-brand-red">MBA INTAN</span>
              </span>
              <span className="block text-[10px] sm:text-[11px] font-semibold text-brand-brownLight mt-0.5 tracking-wide">
                OFFICIAL CULINARY • {config.brand.showcaseBy}
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-1" aria-label="Main Navigation">
            {navLinks.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="px-3 py-2 rounded-xl font-poppins font-semibold text-xs text-brand-brown hover:text-brand-red hover:bg-brand-redLight/50 transition-colors"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden sm:flex items-center gap-2.5 shrink-0">
            <button
              type="button"
              onClick={onOpenOrderModal}
              className="px-5 py-2.5 rounded-2xl bg-brand-red hover:bg-brand-redDark text-white font-poppins font-extrabold text-xs tracking-wide uppercase inline-flex items-center gap-2 shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all"
            >
              <ShoppingBag className="w-4 h-4" />
              PESAN SEKARANG
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="xl:hidden p-2.5 rounded-xl bg-white border border-brand-brown/15 text-brand-brown hover:bg-brand-redLight transition-colors"
            aria-label="Buka menu navigasi"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Compact Dropdown */}
        {mobileMenuOpen && (
          <div className="xl:hidden border-t border-brand-brown/10 bg-white px-4 pt-3 pb-5 mt-3 space-y-1.5 shadow-warm-lg">
            {navLinks.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-2.5 rounded-xl font-poppins font-semibold text-sm text-brand-brown hover:bg-brand-redLight/60 hover:text-brand-red transition-colors"
              >
                {item.label}
              </a>
            ))}
            <div className="pt-2 border-t border-brand-brown/10 flex flex-col gap-2">
              {directWaUrl && (
                <a
                  href={directWaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    trackGa4Event('click_whatsapp', { entry_point: 'mobile_navbar_menu' });
                  }}
                  className="w-full py-3 px-4 rounded-xl bg-[#25D366] text-white font-poppins font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm"
                >
                  <PhoneCall className="w-4 h-4" />
                  WhatsApp ({waDisplay})
                </a>
              )}
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenOrderModal();
                }}
                className="w-full py-3.5 px-4 rounded-xl bg-brand-red text-white font-poppins font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md"
              >
                <ShoppingBag className="w-4 h-4" />
                PESAN SEKARANG
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
