import React from 'react';
import { HeartHandshake, Award, CheckCircle2 } from 'lucide-react';
import { SiteConfig } from '../config/siteConfig';
import { CategoryArtwork } from './CulinaryVisuals';

interface AboutSectionProps {
  config: SiteConfig;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ config }) => {
  return (
    <section id="about" className="py-16 lg:py-24 bg-brand-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left: Editorial Brand Frame */}
          <div className="lg:col-span-5">
            <div className="bg-white p-4 rounded-card-lg shadow-warm-lg border border-brand-brown/10 space-y-4">
              <div className="aspect-[4/5] sm:aspect-[16/9] lg:aspect-[4/5] rounded-2xl overflow-hidden border border-brand-brown/10 bg-brand-cream">
                {config.about.businessPhotoWebp ? (
                  <img
                    src={config.about.businessPhotoWebp}
                    alt={`Sajian Kuliner ${config.brand.name} — Kebalen, Babelan, Bekasi`}
                    width={800}
                    height={1000}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <CategoryArtwork
                    categoryId="bakso-aci"
                    imageWebp={config.hero.heroImageUrl}
                    alt={`Sajian Kuliner ${config.brand.name} — Kebalen, Babelan, Bekasi`}
                  />
                )}
              </div>

              <div className="p-4 rounded-2xl bg-brand-red text-white flex items-center justify-between gap-3">
                <div>
                  <p className="font-poppins font-extrabold text-sm sm:text-base">
                    &ldquo;{config.brand.brandMessage}&rdquo;
                  </p>
                  <p className="text-xs text-white/85 mt-0.5">{config.brand.primaryTagline}</p>
                </div>
                <Award className="w-8 h-8 text-brand-orange shrink-0" />
              </div>
            </div>
          </div>

          {/* Right: Brand Story & Pillars */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <span className="inline-flex items-center gap-1.5 text-brand-red font-poppins font-extrabold text-xs uppercase tracking-wider">
                <HeartHandshake className="w-4 h-4" />
                Tentang BAKSO ACI MBA INTAN
              </span>
              <h2 className="font-poppins font-extrabold text-3xl sm:text-4xl text-brand-brown">
                {config.about.headline}
              </h2>
              <p className="font-poppins font-semibold text-sm sm:text-base text-brand-orangeDark">
                {config.about.subheadline}
              </p>
            </div>

            <div className="space-y-4 text-sm sm:text-base text-brand-brownLight leading-relaxed">
              {config.about.paragraphs.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              {config.about.pillars.map((pillar, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-white border border-brand-brown/10 shadow-sm space-y-1.5"
                >
                  <div className="flex items-center gap-1.5 text-brand-red font-poppins font-extrabold text-sm">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <h3 className="text-brand-brown">{pillar.title}</h3>
                  </div>
                  <p className="text-xs text-brand-brownLight leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
