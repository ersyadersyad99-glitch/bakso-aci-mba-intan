import React from 'react';
import { Utensils, ShoppingBag, Flame, Sparkles, MapPin, CheckCircle2 } from 'lucide-react';
import { SiteConfig, CategoryId } from '../config/siteConfig';

interface HeroSectionProps {
  config: SiteConfig;
  onExploreMenu: () => void;
  onOrderNow: () => void;
  onSelectCategory: (cat: CategoryId) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  config,
  onExploreMenu,
  onOrderNow,
  onSelectCategory,
}) => {
  return (
    <section
      id="home"
      className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24 bg-culinary-pattern"
    >
      {/* Warm Ambient Editorial Lighting */}
      <div
        className="pointer-events-none absolute -top-28 -right-28 w-96 h-96 rounded-full bg-brand-orange/20 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-0 -left-28 w-80 h-80 rounded-full bg-brand-red/15 blur-3xl"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Editorial Headline, Description & Primary CTAs */}
          <div className="lg:col-span-6 xl:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex flex-wrap items-center justify-center lg:justify-start gap-2">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-brand-red text-white font-poppins font-extrabold text-xs tracking-wide shadow-sm">
                <Sparkles className="w-3.5 h-3.5" />
                {config.brand.brandMessage}
              </span>
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white border border-brand-orange/40 text-brand-brown font-poppins font-semibold text-xs shadow-sm">
                <MapPin className="w-3.5 h-3.5 text-brand-red" />
                {config.brand.targetMarket}
              </span>
            </div>

            <div className="space-y-3">
              <p className="font-poppins font-bold text-sm sm:text-base text-brand-red uppercase tracking-wider">
                {config.brand.secondaryHeadline}
              </p>
              <h1 className="font-poppins font-extrabold text-3xl sm:text-5xl xl:text-[56px] text-brand-brown leading-[1.12] tracking-tight">
                Jajanan Favorit,{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-red via-brand-red to-brand-orange">
                  Rasa yang Bikin Nagih!
                </span>
              </h1>
            </div>

            <p className="text-base sm:text-lg text-brand-brownLight max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              {config.hero.description}
            </p>

            {/* Primary Hero Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
              <button
                type="button"
                onClick={onExploreMenu}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-brand-red hover:bg-brand-redDark text-white font-poppins font-extrabold text-sm sm:text-base tracking-wide uppercase inline-flex items-center justify-center gap-2.5 shadow-warm-lg hover:-translate-y-0.5 transition-all"
              >
                <Utensils className="w-5 h-5" />
                {config.hero.exploreButtonText}
              </button>
              <button
                type="button"
                onClick={onOrderNow}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-brand-orange hover:bg-brand-orangeDark text-white font-poppins font-extrabold text-sm sm:text-base tracking-wide uppercase inline-flex items-center justify-center gap-2.5 shadow-warm hover:-translate-y-0.5 transition-all"
              >
                <ShoppingBag className="w-5 h-5" />
                {config.hero.orderButtonText}
              </button>
            </div>

            {/* Category Quick-Jump Pills */}
            <div className="pt-4 border-t border-brand-brown/10">
              <p className="text-xs font-poppins font-bold uppercase tracking-wider text-brand-brownLight mb-3">
                Eksplorasi Kategori Menu MBA INTAN:
              </p>
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2">
                {config.categories
                  .filter((c) => c.id !== 'all')
                  .map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => onSelectCategory(cat.id)}
                      className="px-3.5 py-1.5 rounded-full bg-white hover:bg-brand-red hover:text-white border border-brand-brown/15 text-xs font-poppins font-bold text-brand-brown transition-all shadow-sm"
                    >
                      {cat.name}
                    </button>
                  ))}
              </div>
            </div>
          </div>

          {/* Right Column: Large Editorial Food Photography + Floating Elements & Promotional Sticker */}
          <div className="lg:col-span-6 xl:col-span-5">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Promotional Sticker (Top-Right Floating Seal) */}
              <div
                className="absolute -top-5 -right-3 sm:-right-5 z-20 w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-gradient-to-br from-brand-orange to-brand-red text-white shadow-warm-lg border-4 border-white flex flex-col items-center justify-center text-center p-2 rotate-12 hover:rotate-6 transition-transform select-none"
                aria-label="Promotional Sticker"
              >
                <span className="text-[9px] sm:text-[10px] font-poppins font-extrabold uppercase tracking-widest text-brand-cream">
                  {config.hero.promoStickerTop}
                </span>
                <span className="font-poppins font-extrabold text-sm sm:text-base leading-tight my-0.5">
                  {config.hero.promoStickerMain}
                </span>
                <span className="text-[9px] sm:text-[10px] font-medium text-white/90 leading-tight">
                  {config.hero.promoStickerSub}
                </span>
              </div>

              {/* Subtle Floating Decorative Element 1: Spicy Broth & Jeruk Limau Badge (Top-Left) */}
              <div className="hidden sm:flex absolute -left-5 top-8 z-20 items-center gap-2.5 px-3.5 py-2.5 rounded-2xl bg-white/95 backdrop-blur-md shadow-warm-lg border border-brand-brown/10 -rotate-3">
                <div className="w-9 h-9 rounded-xl bg-brand-redLight text-brand-red flex items-center justify-center shrink-0">
                  <Flame className="w-5 h-5" />
                </div>
                <div>
                  <span className="block font-poppins font-extrabold text-xs text-brand-brown">
                    Kuah Gurih Pedas
                  </span>
                  <span className="block text-[11px] text-brand-brownLight">
                    Segar Jeruk Limau & Pilus
                  </span>
                </div>
              </div>

              {/* Main Editorial Bakso Aci Showcase Frame (4:5 Mobile / 16:10 Editorial Aspect Ratio) */}
              <div className="relative rounded-card-lg bg-white p-3 sm:p-4 shadow-warm-lg border-2 border-brand-brown/10 overflow-hidden group">
                <div className="relative aspect-[4/5] sm:aspect-[16/10] rounded-2xl overflow-hidden bg-brand-brown">
                  <picture className="block w-full h-full">
                    {config.hero.heroImageUrl.endsWith('.webp') && (
                      <source srcSet={config.hero.heroImageUrl} type="image/webp" />
                    )}
                    <img
                      src={config.hero.heroImageUrl}
                      alt={config.hero.heroImageAlt}
                      width={960}
                      height={768}
                      fetchPriority="high"
                      decoding="sync"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </picture>
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-brown/85 via-transparent to-transparent" />

                  <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 flex items-end justify-between gap-2 text-white">
                    <div>
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-brand-red text-white font-poppins font-extrabold text-[10px] uppercase tracking-wider mb-1">
                        Signature Dish
                      </span>
                      <p className="font-poppins font-extrabold text-base sm:text-xl leading-tight">
                        Varian Paket Inces Bakso Aci
                      </p>
                      <p className="text-xs text-brand-cream/85 mt-0.5">
                        Tersedia juga Pempek, Dimsum, Mentai & Frozen Food
                      </p>
                    </div>
                  </div>
                </div>

                {/* Subtle Floating Decorative Element 2: Multi-Product Showcase Strip */}
                <div className="mt-3 grid grid-cols-3 gap-2">
                  {[
                    { label: 'Bakso Aci', sub: '5 Paket Inces', cat: 'bakso-aci' as CategoryId },
                    { label: 'Dimsum & Mentai', sub: 'Salmon & Reguler', cat: 'mentai' as CategoryId },
                    { label: 'Pempek & Frozen', sub: 'Pilihan Lengkap', cat: 'pempek' as CategoryId },
                  ].map((pill) => (
                    <button
                      key={pill.label}
                      type="button"
                      onClick={() => onSelectCategory(pill.cat)}
                      className="p-2.5 rounded-xl bg-brand-cream hover:bg-brand-orangeLight text-left border border-brand-brown/10 transition-colors"
                    >
                      <div className="flex items-center gap-1 text-brand-red font-poppins font-extrabold text-xs">
                        <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                        <span className="truncate">{pill.label}</span>
                      </div>
                      <span className="block text-[10px] text-brand-brownLight mt-0.5 truncate">
                        {pill.sub}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
