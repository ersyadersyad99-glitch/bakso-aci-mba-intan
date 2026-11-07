import React from 'react';
import { MessageCircle, ShoppingBag } from 'lucide-react';
import { SiteConfig, buildWhatsAppUrl } from '../config/siteConfig';
import { trackGa4Event } from '../utils/analytics';

interface FloatingWhatsAppProps {
  config: SiteConfig;
  onOpenOrderModal: () => void;
}

export const FloatingWhatsApp: React.FC<FloatingWhatsAppProps> = ({
  config,
  onOpenOrderModal,
}) => {
  const directWaUrl = buildWhatsAppUrl(
    config.orderingPlatforms.whatsappNumber,
    config.orderingPlatforms.whatsappDefaultGreeting
  );

  return (
    <>
      {/* Mobile Bottom Floating Action Bar */}
      <div className="fixed bottom-3 inset-x-3 z-30 sm:hidden">
        <div className="bg-brand-brown/95 backdrop-blur-md p-2 rounded-2xl shadow-warm-lg border border-white/15 flex items-center gap-2">
          {directWaUrl ? (
            <a
              href={directWaUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                trackGa4Event('click_whatsapp', { entry_point: 'mobile_floating_bar' })
              }
              className="flex-1 py-3 px-4 rounded-xl bg-[#25D366] text-white font-poppins font-extrabold text-xs uppercase tracking-wide flex items-center justify-center gap-2 shadow-md"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp</span>
            </a>
          ) : (
            <button
              type="button"
              onClick={() => {
                trackGa4Event('click_whatsapp', { entry_point: 'mobile_floating_bar' });
                onOpenOrderModal();
              }}
              className="flex-1 py-3 px-4 rounded-xl bg-[#25D366] text-white font-poppins font-extrabold text-xs uppercase tracking-wide flex items-center justify-center gap-2 shadow-md"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Pesan via WA</span>
            </button>
          )}

          <button
            type="button"
            onClick={onOpenOrderModal}
            className="flex-1 py-3 px-4 rounded-xl bg-brand-red text-white font-poppins font-extrabold text-xs uppercase tracking-wide flex items-center justify-center gap-1.5 shadow-md"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Pesan Sekarang</span>
          </button>
        </div>
      </div>

      {/* Desktop Floating WhatsApp & Order CTA */}
      <div className="hidden sm:flex fixed bottom-6 right-6 z-30 items-center gap-2.5">
        {directWaUrl ? (
          <a
            href={directWaUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() =>
              trackGa4Event('click_whatsapp', { entry_point: 'desktop_floating_button' })
            }
            className="flex items-center gap-2 px-5 py-3.5 rounded-full bg-[#25D366] hover:bg-[#1EBE5D] text-white font-poppins font-extrabold text-xs uppercase tracking-wider shadow-warm-lg hover:scale-105 transition-all border-2 border-white"
            aria-label="Pesan via WhatsApp"
          >
            <MessageCircle className="w-5 h-5" />
            <span>WhatsApp Order</span>
          </a>
        ) : (
          <button
            type="button"
            onClick={() => {
              trackGa4Event('click_whatsapp', { entry_point: 'desktop_floating_button' });
              onOpenOrderModal();
            }}
            className="flex items-center gap-2 px-5 py-3.5 rounded-full bg-[#25D366] hover:bg-[#1EBE5D] text-white font-poppins font-extrabold text-xs uppercase tracking-wider shadow-warm-lg hover:scale-105 transition-all border-2 border-white"
            aria-label="Susun Pesanan WhatsApp"
          >
            <MessageCircle className="w-5 h-5" />
            <span>WhatsApp Order</span>
          </button>
        )}
      </div>
    </>
  );
};
