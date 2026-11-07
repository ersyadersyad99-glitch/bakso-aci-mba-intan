import React, { useEffect } from 'react';
import { Utensils, ArrowLeft, MapPin } from 'lucide-react';
import { SiteConfig } from '../config/siteConfig';

interface NotFoundPageProps {
  config: SiteConfig;
  onReturnHome: () => void;
}

export const NotFoundPage: React.FC<NotFoundPageProps> = ({ config, onReturnHome }) => {
  useEffect(() => {
    document.title = `404 Halaman Tidak Ditemukan — ${config.brand.name}`;
    const robotsMeta = document.querySelector('meta[name="robots"]');
    const previousRobots = robotsMeta?.getAttribute('content') || 'index, follow';
    if (robotsMeta) {
      robotsMeta.setAttribute('content', 'noindex, follow');
    }
    return () => {
      if (robotsMeta) {
        robotsMeta.setAttribute('content', previousRobots);
      }
    };
  }, [config.brand.name]);

  return (
    <main className="min-h-screen bg-brand-cream flex items-center justify-center p-6">
      <div className="max-w-lg w-full bg-white rounded-card-lg p-8 sm:p-10 text-center shadow-warm-lg border-2 border-brand-brown/10 space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-brand-redLight text-brand-red flex items-center justify-center mx-auto">
          <Utensils className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <span className="inline-block px-3.5 py-1 rounded-full bg-brand-redLight text-brand-red font-poppins font-extrabold text-xs uppercase tracking-wider">
            Error 404 • Halaman Tidak Ditemukan
          </span>
          <h1 className="font-poppins font-extrabold text-2xl sm:text-3xl text-brand-brown">
            Waduh, Halaman Ini Tidak Tersedia!
          </h1>
          <p className="text-sm text-brand-brownLight leading-relaxed">
            Halaman yang kamu cari tidak ditemukan. Yuk kembali ke halaman utama{' '}
            <strong>{config.brand.name}</strong> untuk menjelajahi menu Bakso Aci, Pempek, Dimsum,
            dan Mentai favoritmu di Kebalen, Babelan, Bekasi!
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            type="button"
            onClick={onReturnHome}
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-brand-red hover:bg-brand-redDark text-white font-poppins font-extrabold text-xs uppercase tracking-wider inline-flex items-center justify-center gap-2 shadow-md transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            Kembali ke Beranda
          </button>
          <a
            href={config.locationAndContact.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-5 py-3.5 rounded-xl bg-brand-cream hover:bg-brand-orangeLight text-brand-brown border border-brand-brown/15 font-poppins font-bold text-xs inline-flex items-center justify-center gap-1.5 transition-colors"
          >
            <MapPin className="w-4 h-4 text-brand-red" />
            Lokasi Google Maps
          </a>
        </div>
      </div>
    </main>
  );
};
