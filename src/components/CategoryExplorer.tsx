import React from 'react';
import { Sparkles, ChevronRight } from 'lucide-react';
import { SiteConfig, CategoryId, matchesProductCategory } from '../config/siteConfig';
import { CategoryArtwork } from './CulinaryVisuals';

interface CategoryExplorerProps {
  config: SiteConfig;
  selectedCategory: CategoryId;
  onSelectCategory: (categoryId: CategoryId, scrollToMenu?: boolean) => void;
}

export const CategoryExplorer: React.FC<CategoryExplorerProps> = ({
  config,
  selectedCategory,
  onSelectCategory,
}) => {
  const visualCategories = config.categories.filter(
    (c): c is typeof c & { id: Exclude<CategoryId, 'all'> } => c.id !== 'all'
  );

  return (
    <section id="categories" className="py-16 lg:py-20 bg-white border-b border-brand-brown/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <span className="inline-flex items-center gap-1.5 text-brand-red font-poppins font-extrabold text-xs uppercase tracking-wider mb-2">
              <Sparkles className="w-4 h-4" />
              Eksplorasi Kategori Kuliner
            </span>
            <h2 className="font-poppins font-extrabold text-2xl sm:text-4xl text-brand-brown">
              Satu Tempat, Banyak Pilihan Lezat
            </h2>
          </div>
          <p className="text-sm text-brand-brownLight max-w-md">
            Pilih kategori menu di bawah ini untuk memfilter sajian favoritmu di{' '}
            <strong className="text-brand-brown">BAKSO ACI MBA INTAN</strong>.
          </p>
        </div>

        {/* Visual Category Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5 sm:gap-4">
          {visualCategories.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            const count = config.products.filter((p) =>
              matchesProductCategory(p, cat.id)
            ).length;

            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => onSelectCategory(cat.id, true)}
                className={`group text-left rounded-card p-3 transition-all border-2 flex flex-col justify-between ${
                  isSelected
                    ? 'bg-brand-red text-white border-brand-red shadow-warm-lg -translate-y-1'
                    : 'bg-brand-cream/60 hover:bg-brand-cream text-brand-brown border-brand-brown/10 hover:border-brand-orange shadow-sm hover:-translate-y-1'
                }`}
              >
                <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden mb-3 border border-black/5 bg-white">
                  <CategoryArtwork
                    categoryId={cat.id}
                    imageWebp={cat.imageWebp}
                    alt={cat.seoAltText || cat.name}
                    compact
                  />
                </div>
                <div>
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <span
                      className={`text-[10px] sm:text-[11px] font-poppins font-extrabold px-2 py-0.5 rounded-full ${
                        isSelected
                          ? 'bg-white/20 text-white'
                          : 'bg-brand-orange/15 text-brand-brown'
                      }`}
                    >
                      {count} Menu
                    </span>
                    <ChevronRight
                      className={`w-4 h-4 transition-transform group-hover:translate-x-0.5 ${
                        isSelected ? 'text-white' : 'text-brand-red'
                      }`}
                    />
                  </div>
                  <h3 className="font-poppins font-extrabold text-sm sm:text-base leading-snug">
                    {cat.name}
                  </h3>
                  <p
                    className={`text-[11px] mt-1 line-clamp-2 ${
                      isSelected ? 'text-white/85' : 'text-brand-brownLight'
                    }`}
                  >
                    {cat.shortDesc}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
