import React from 'react';
import { UtensilsCrossed, Flame, Truck } from 'lucide-react';
import { SiteConfig } from '../config/siteConfig';

interface BrandHighlightsProps {
  config: SiteConfig;
}

export const BrandHighlights: React.FC<BrandHighlightsProps> = ({ config }) => {
  const icons = [UtensilsCrossed, Flame, Truck];

  return (
    <section
      id="highlights"
      aria-labelledby="highlights-section-heading"
      className="py-12 lg:py-16 bg-brand-brown text-brand-cream border-y border-white/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 id="highlights-section-heading" className="sr-only">
          Keunggulan Kuliner BAKSO ACI MBA INTAN di Kebalen, Babelan, Kabupaten Bekasi
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {config.highlights.map((item, idx) => {
            const IconComponent = icons[idx % icons.length];
            return (
              <div
                key={item.id}
                className="p-6 rounded-card bg-white/5 hover:bg-white/10 border border-white/10 transition-all flex items-start gap-4"
              >
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-brand-red to-brand-orange text-white flex items-center justify-center shrink-0 shadow-md">
                  <IconComponent className="w-6 h-6" />
                </div>
                <div className="space-y-1.5">
                  <span className="inline-block text-[11px] font-poppins font-extrabold uppercase tracking-wider text-brand-orange">
                    {item.badge}
                  </span>
                  <h3 className="font-poppins font-extrabold text-base sm:text-lg text-white leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-brand-cream/80 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
