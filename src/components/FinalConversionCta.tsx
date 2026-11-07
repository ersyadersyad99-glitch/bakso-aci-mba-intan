import React from 'react';
import { ShoppingBag, Utensils, Flame } from 'lucide-react';
import { SiteConfig } from '../config/siteConfig';

interface FinalConversionCtaProps {
  config: SiteConfig;
  onOrderNow: () => void;
  onExploreMenu: () => void;
}

export const FinalConversionCta: React.FC<FinalConversionCtaProps> = ({
  config,
  onOrderNow,
  onExploreMenu,
}) => {
  return (
    <section className="py-16 lg:py-20 bg-brand-cream px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="relative overflow-hidden rounded-card-lg bg-gradient-to-r from-brand-red via-brand-red to-brand-orange text-white p-8 sm:p-12 lg:p-14 shadow-warm-lg">
          {/* Decorative Circles */}
          <div
            className="pointer-events-none absolute -top-24 -right-24 w-72 h-72 rounded-full bg-white/10"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute -bottom-24 -left-24 w-64 h-64 rounded-full bg-brand-brown/15"
            aria-hidden="true"
          />

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8 text-center lg:text-left">
            <div className="max-w-2xl space-y-3">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/20 text-white font-poppins font-extrabold text-xs uppercase tracking-wider">
                <Flame className="w-3.5 h-3.5" />
                {config.brand.brandMessage}
              </span>
              <h2 className="font-poppins font-extrabold text-2xl sm:text-4xl leading-tight">
                {config.brand.secondaryHeadline}
              </h2>
              <p className="text-sm sm:text-base text-white/90 leading-relaxed">
                Nikmati sensasi Bakso Aci, Pempek, Dimsum, Mentai, dan Frozen Food favoritmu hari
                ini di <strong>{config.brand.name}</strong>.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3.5 w-full sm:w-auto shrink-0">
              <button
                type="button"
                onClick={onOrderNow}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white text-brand-red hover:bg-brand-cream font-poppins font-extrabold text-sm uppercase tracking-wider inline-flex items-center justify-center gap-2 shadow-lg transition-all"
              >
                <ShoppingBag className="w-5 h-5" />
                PESAN SEKARANG
              </button>
              <button
                type="button"
                onClick={onExploreMenu}
                className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-brand-brown/90 hover:bg-brand-brown text-white font-poppins font-extrabold text-sm uppercase tracking-wider inline-flex items-center justify-center gap-2 transition-all"
              >
                <Utensils className="w-5 h-5" />
                LIHAT MENU
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
