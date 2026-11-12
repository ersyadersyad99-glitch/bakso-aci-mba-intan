import { useState, useEffect } from 'react';
import {
  DEFAULT_SITE_CONFIG,
  SiteConfig,
  CategoryId,
  ProductItem,
} from './config/siteConfig';
import { initGa4, trackGa4Event, trackPageViewOnce } from './utils/analytics';
import { SeoHead } from './components/SeoHead';
import { NotFoundPage } from './components/NotFoundPage';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { BrandHighlights } from './components/BrandHighlights';
import { CategoryExplorer } from './components/CategoryExplorer';
import { ProductGrid } from './components/ProductGrid';
import { OrderingPlatforms } from './components/OrderingPlatforms';
import { ReviewSection } from './components/ReviewSection';
import { AboutSection } from './components/AboutSection';
import { LocationSection } from './components/LocationSection';
import { FinalConversionCta } from './components/FinalConversionCta';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { OrderModal } from './components/OrderModal';
import { ConfigModal } from './components/ConfigModal';

const STORAGE_KEY = 'bakso_aci_mba_intan_master_config_v12';

export function App() {
  const [config, setConfig] = useState<SiteConfig>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return {
          ...DEFAULT_SITE_CONFIG,
          ...(JSON.parse(saved) as Partial<SiteConfig>),
          seo: {
            ...DEFAULT_SITE_CONFIG.seo,
            ...((JSON.parse(saved) as Partial<SiteConfig>).seo || {}),
          },
        };
      }
    } catch {
      // Fallback to default
    }
    return DEFAULT_SITE_CONFIG;
  });

  const [currentPath, setCurrentPath] = useState<string>(() =>
    typeof window !== 'undefined' ? window.location.pathname : '/'
  );
  const [selectedCategory, setSelectedCategory] = useState<CategoryId>('all');
  const [orderModalOpen, setOrderModalOpen] = useState(false);
  const [activeOrderProduct, setActiveOrderProduct] = useState<ProductItem | null>(null);
  const [configModalOpen, setConfigModalOpen] = useState(false);

  // Initialize GA4 & fire page_view event
  useEffect(() => {
    initGa4(config.seo.ga4MeasurementId);
  }, [config.seo.ga4MeasurementId]);

  useEffect(() => {
    trackPageViewOnce(
      currentPath,
      typeof window !== 'undefined' ? window.location.href : '/'
    );
  }, [currentPath]);

  const handleSaveConfig = (nextConfig: SiteConfig) => {
    setConfig(nextConfig);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(nextConfig));
    } catch {
      // Ignore storage quota issues
    }
  };

  const handleResetConfig = () => {
    setConfig(DEFAULT_SITE_CONFIG);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignore
    }
  };

  const handleOpenOrder = (product?: ProductItem) => {
    setActiveOrderProduct(product ?? null);
    setOrderModalOpen(true);
  };

  const handleScrollToMenu = () => {
    trackGa4Event('view_menu', { trigger: 'cta_button' });
    const el = document.getElementById('menu');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectCategory = (cat: CategoryId, scrollToMenu = false) => {
    setSelectedCategory(cat);
    const catObj = config.categories.find((c) => c.id === cat);
    trackGa4Event('select_category', {
      category_id: cat,
      category_name: catObj?.name || cat,
    });
    if (scrollToMenu) {
      const el = document.getElementById('menu');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const isNotFoundRoute =
    currentPath !== '/' &&
    currentPath !== '/index.html' &&
    !currentPath.endsWith('/index.html');

  if (isNotFoundRoute) {
    return (
      <NotFoundPage
        config={config}
        onReturnHome={() => {
          window.history.pushState({}, '', '/');
          setCurrentPath('/');
        }}
      />
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-brand-cream text-brand-brown overflow-x-hidden selection:bg-brand-red selection:text-white">
      {/* Keyboard Accessibility Skip Link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:px-4 focus:py-2.5 focus:rounded-xl focus:bg-brand-red focus:text-white focus:font-poppins focus:font-extrabold focus:text-xs focus:shadow-lg"
      >
        Langsung ke Konten Utama
      </a>

      {/* Dynamic SEO Metadata & JSON-LD Schema */}
      <SeoHead config={config} />

      {/* 1. Sticky Navigation */}
      <Navbar
        config={config}
        onOpenOrderModal={() => handleOpenOrder()}
        onOpenConfigModal={() => setConfigModalOpen(true)}
      />

      <main id="main-content" className="flex-1">
        {/* 2. Hero Section */}
        <HeroSection
          config={config}
          onExploreMenu={handleScrollToMenu}
          onOrderNow={() => handleOpenOrder()}
          onSelectCategory={(cat) => handleSelectCategory(cat, true)}
        />

        {/* 3. Brand Highlights */}
        <BrandHighlights config={config} />

        {/* 4. Food Category Explorer */}
        <CategoryExplorer
          config={config}
          selectedCategory={selectedCategory}
          onSelectCategory={handleSelectCategory}
        />

        {/* 5. Popular Menu Showcase */}
        <ProductGrid
          config={config}
          selectedCategory={selectedCategory}
          onSelectCategory={(cat) => handleSelectCategory(cat, false)}
          onOrderProduct={(prod) => handleOpenOrder(prod)}
          onOpenConfigModal={() => setConfigModalOpen(true)}
        />

        {/* 6. Online Ordering Platforms */}
        <OrderingPlatforms
          config={config}
          onOpenOrderModal={() => handleOpenOrder()}
          onOpenConfigModal={() => setConfigModalOpen(true)}
        />

        {/* 7. Customer Reviews and Ratings */}
        <ReviewSection
          config={config}
          onOpenConfigModal={() => setConfigModalOpen(true)}
        />

        {/* 8. About the Business */}
        <AboutSection config={config} />

        {/* 9. Location and Contact */}
        <LocationSection
          config={config}
          onOpenOrderModal={() => handleOpenOrder()}
          onOpenConfigModal={() => setConfigModalOpen(true)}
        />

        {/* 10. Final Conversion CTA */}
        <FinalConversionCta
          config={config}
          onOrderNow={() => handleOpenOrder()}
          onExploreMenu={handleScrollToMenu}
        />
      </main>

      {/* 11. Footer */}
      <Footer
        config={config}
        onSelectCategory={handleSelectCategory}
        onOpenOrderModal={() => handleOpenOrder()}
        onOpenConfigModal={() => setConfigModalOpen(true)}
      />

      {/* Mobile & Desktop Floating WhatsApp CTA */}
      <FloatingWhatsApp
        config={config}
        onOpenOrderModal={() => handleOpenOrder()}
      />

      {/* Interactive Modals */}
      <OrderModal
        isOpen={orderModalOpen}
        onClose={() => setOrderModalOpen(false)}
        config={config}
        initialProduct={activeOrderProduct}
        onOpenConfigModal={() => setConfigModalOpen(true)}
      />

      <ConfigModal
        isOpen={configModalOpen}
        onClose={() => setConfigModalOpen(false)}
        config={config}
        onSaveConfig={handleSaveConfig}
        onResetConfig={handleResetConfig}
      />
    </div>
  );
}

export default App;
