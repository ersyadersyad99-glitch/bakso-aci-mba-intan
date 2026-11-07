import React from 'react';
import { CategoryId, ReviewPlatformId } from '../config/siteConfig';

interface CategoryArtworkProps {
  categoryId: Exclude<CategoryId, 'all'>;
  imageWebp?: string | null;
  alt: string;
  className?: string;
  showPlaceholderBadge?: boolean;
  compact?: boolean;
}

/**
 * Renders an optimized image if a verified image URL is provided in config.
 * Otherwise renders a custom Indonesian culinary vector artwork for the category,
 * transparently labeled as a placeholder visual so no product photography is fabricated.
 */
export const CategoryArtwork: React.FC<CategoryArtworkProps> = ({
  categoryId,
  imageWebp,
  alt,
  className = 'w-full h-full',
  showPlaceholderBadge = false,
  compact = false,
}) => {
  if (imageWebp && imageWebp.trim() !== '') {
    const cleanSrc = imageWebp.trim();
    const isAvif = cleanSrc.endsWith('.avif');
    const isWebp = cleanSrc.endsWith('.webp');
    return (
      <div className={`relative overflow-hidden ${className}`}>
        <picture className="block w-full h-full">
          {isAvif && <source srcSet={cleanSrc} type="image/avif" />}
          {isWebp && <source srcSet={cleanSrc} type="image/webp" />}
          <img
            src={cleanSrc}
            alt={alt}
            width={600}
            height={600}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </picture>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden select-none ${className}`}>
      {categoryId === 'bakso-aci' && (
        <svg
          viewBox="0 0 400 300"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          role="img"
          aria-label={alt}
        >
          <rect width="400" height="300" fill="url(#bg-bakso)" />
          <circle cx="340" cy="50" r="85" fill="#F28C28" fillOpacity="0.18" />
          <circle cx="60" cy="250" r="95" fill="#D93636" fillOpacity="0.12" />
          {/* Steam waves */}
          <path
            d="M155 68C150 54 164 46 159 32"
            stroke="#D93636"
            strokeWidth="4"
            strokeLinecap="round"
            strokeOpacity="0.45"
          />
          <path
            d="M200 60C195 46 209 38 204 24"
            stroke="#F28C28"
            strokeWidth="4"
            strokeLinecap="round"
            strokeOpacity="0.55"
          />
          <path
            d="M245 68C240 54 254 46 249 32"
            stroke="#D93636"
            strokeWidth="4"
            strokeLinecap="round"
            strokeOpacity="0.45"
          />
          {/* Spicy Broth & Bowl */}
          <ellipse cx="200" cy="155" rx="118" ry="52" fill="#38251D" />
          <ellipse cx="200" cy="153" rx="110" ry="46" fill="#D93636" />
          <ellipse cx="200" cy="155" rx="98" ry="38" fill="#E84A3A" />
          {/* Cuanki / Batagor Lidah */}
          <path
            d="M118 140C112 114 146 102 162 126L145 152Z"
            fill="#F6C177"
            stroke="#38251D"
            strokeWidth="3"
          />
          <path
            d="M242 125C258 102 292 114 282 142L252 152Z"
            fill="#F28C28"
            stroke="#38251D"
            strokeWidth="3"
          />
          {/* Bakso Aci Balls */}
          <circle cx="165" cy="148" r="24" fill="#FFF4E6" stroke="#38251D" strokeWidth="3.5" />
          <circle cx="212" cy="142" r="26" fill="#FDE8D0" stroke="#38251D" strokeWidth="3.5" />
          <circle cx="192" cy="166" r="22" fill="#FFF4E6" stroke="#38251D" strokeWidth="3.5" />
          <circle cx="238" cy="162" r="20" fill="#FDE8D0" stroke="#38251D" strokeWidth="3.5" />
          {/* Jeruk Limau */}
          <circle cx="140" cy="162" r="15" fill="#4D9E34" stroke="#38251D" strokeWidth="3" />
          <circle cx="140" cy="162" r="10" fill="#A3E635" />
          {/* Pilus Cikur dots */}
          <circle cx="176" cy="135" r="4" fill="#F28C28" />
          <circle cx="222" cy="155" r="4.5" fill="#F28C28" />
          <circle cx="205" cy="132" r="3.5" fill="#F28C28" />
          {/* Bowl Base */}
          <path
            d="M82 155C88 222 136 250 200 250C264 250 312 222 318 155H82Z"
            fill="#38251D"
          />
          <path
            d="M105 182C135 196 265 196 295 182"
            stroke="#F28C28"
            strokeWidth="5"
            strokeLinecap="round"
          />
          <rect x="152" y="246" width="96" height="14" rx="7" fill="#D93636" />
          <defs>
            <linearGradient id="bg-bakso" x1="0" y1="0" x2="400" y2="300" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FFE8D6" />
              <stop offset="1" stopColor="#FFD6BA" />
            </linearGradient>
          </defs>
        </svg>
      )}

      {categoryId === 'pempek' && (
        <svg
          viewBox="0 0 400 300"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          role="img"
          aria-label={alt}
        >
          <rect width="400" height="300" fill="url(#bg-pempek)" />
          <circle cx="70" cy="60" r="80" fill="#F28C28" fillOpacity="0.18" />
          <circle cx="330" cy="240" r="90" fill="#D93636" fillOpacity="0.12" />
          <ellipse cx="200" cy="175" rx="135" ry="68" fill="#38251D" />
          <ellipse cx="200" cy="170" rx="124" ry="58" fill="#FFF4E6" />
          <path
            d="M115 162C115 124 162 114 195 138C215 152 212 182 182 190C144 198 115 186 115 162Z"
            fill="#F28C28"
            stroke="#38251D"
            strokeWidth="3.5"
          />
          <ellipse cx="160" cy="158" rx="22" ry="14" fill="#FACC15" stroke="#38251D" strokeWidth="2.5" />
          <rect
            x="195"
            y="124"
            width="78"
            height="32"
            rx="16"
            transform="rotate(14 195 124)"
            fill="#F6AD55"
            stroke="#38251D"
            strokeWidth="3.5"
          />
          <rect
            x="185"
            y="162"
            width="82"
            height="32"
            rx="16"
            transform="rotate(-8 185 162)"
            fill="#ED8936"
            stroke="#38251D"
            strokeWidth="3.5"
          />
          <circle cx="275" cy="145" r="32" fill="#38251D" />
          <circle cx="275" cy="145" r="25" fill="#5C2D16" />
          <circle cx="268" cy="140" r="4" fill="#D93636" />
          <circle cx="282" cy="148" r="3.5" fill="#4ADE80" />
          <rect x="128" y="182" width="14" height="14" rx="3" fill="#4ADE80" stroke="#38251D" strokeWidth="2" />
          <rect x="148" y="188" width="14" height="14" rx="3" fill="#86EFAC" stroke="#38251D" strokeWidth="2" />
          <defs>
            <linearGradient id="bg-pempek" x1="0" y1="0" x2="400" y2="300" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FFF0DB" />
              <stop offset="1" stopColor="#FDE2B8" />
            </linearGradient>
          </defs>
        </svg>
      )}

      {categoryId === 'dimsum' && (
        <svg
          viewBox="0 0 400 300"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          role="img"
          aria-label={alt}
        >
          <rect width="400" height="300" fill="url(#bg-dimsum)" />
          <circle cx="320" cy="70" r="75" fill="#D93636" fillOpacity="0.14" />
          <ellipse cx="200" cy="185" rx="126" ry="62" fill="#8C583A" stroke="#38251D" strokeWidth="4" />
          <ellipse cx="200" cy="165" rx="126" ry="62" fill="#D69E66" stroke="#38251D" strokeWidth="4" />
          <ellipse cx="200" cy="165" rx="108" ry="48" fill="#5C3A24" />
          <g>
            <circle cx="160" cy="152" r="32" fill="#FFF4E6" stroke="#38251D" strokeWidth="3.5" />
            <circle cx="160" cy="144" r="14" fill="#F28C28" />
          </g>
          <g>
            <circle cx="232" cy="150" r="32" fill="#FFF4E6" stroke="#38251D" strokeWidth="3.5" />
            <circle cx="232" cy="142" r="14" fill="#D93636" />
          </g>
          <g>
            <circle cx="196" cy="180" r="32" fill="#FFF4E6" stroke="#38251D" strokeWidth="3.5" />
            <circle cx="196" cy="172" r="14" fill="#F28C28" />
          </g>
          <defs>
            <linearGradient id="bg-dimsum" x1="0" y1="0" x2="400" y2="300" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FFEAD7" />
              <stop offset="1" stopColor="#FAD5B8" />
            </linearGradient>
          </defs>
        </svg>
      )}

      {categoryId === 'mentai' && (
        <svg
          viewBox="0 0 400 300"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          role="img"
          aria-label={alt}
        >
          <rect width="400" height="300" fill="url(#bg-mentai)" />
          <circle cx="80" cy="60" r="70" fill="#D93636" fillOpacity="0.15" />
          <circle cx="330" cy="230" r="85" fill="#F28C28" fillOpacity="0.2" />
          <rect x="76" y="108" width="248" height="128" rx="28" fill="#38251D" />
          <rect x="86" y="116" width="228" height="110" rx="22" fill="#FFF4E6" />
          {[132, 200, 268].map((cx, idx) => (
            <g key={idx}>
              <circle cx={cx} cy="172" r="31" fill="#FDE6C4" stroke="#38251D" strokeWidth="3.5" />
              <path
                d={`M${cx - 26} 166C${cx - 18} 142 ${cx + 18} 142 ${cx + 26} 166C${cx + 16} 182 ${cx - 16} 182 ${cx - 26} 166Z`}
                fill="#FF7A45"
                stroke="#38251D"
                strokeWidth="2.5"
              />
              <ellipse cx={cx} cy="158" rx="12" ry="6" fill="#D93636" />
              <rect x={cx - 8} y="152" width="16" height="5" rx="2" fill="#1F2937" />
            </g>
          ))}
          <defs>
            <linearGradient id="bg-mentai" x1="0" y1="0" x2="400" y2="300" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FFE6D5" />
              <stop offset="1" stopColor="#FFCBA8" />
            </linearGradient>
          </defs>
        </svg>
      )}

      {categoryId === 'frozen-food' && (
        <svg
          viewBox="0 0 400 300"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          role="img"
          aria-label={alt}
        >
          <rect width="400" height="300" fill="url(#bg-frozen)" />
          <circle cx="320" cy="65" r="75" fill="#F28C28" fillOpacity="0.16" />
          <rect
            x="105"
            y="62"
            width="190"
            height="182"
            rx="24"
            fill="#FFF4E6"
            stroke="#38251D"
            strokeWidth="4"
          />
          <rect x="122" y="80" width="156" height="36" rx="10" fill="#D93636" />
          <rect x="145" y="93" width="110" height="10" rx="5" fill="#FFF4E6" />
          <circle cx="156" cy="152" r="20" fill="#FDE2B8" stroke="#38251D" strokeWidth="3" />
          <circle cx="200" cy="152" r="20" fill="#FDE2B8" stroke="#38251D" strokeWidth="3" />
          <circle cx="244" cy="152" r="20" fill="#FDE2B8" stroke="#38251D" strokeWidth="3" />
          <rect x="138" y="186" width="56" height="32" rx="10" fill="#F28C28" stroke="#38251D" strokeWidth="3" />
          <rect x="206" y="186" width="56" height="32" rx="10" fill="#D93636" stroke="#38251D" strokeWidth="3" />
          <defs>
            <linearGradient id="bg-frozen" x1="0" y1="0" x2="400" y2="300" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FFF2DF" />
              <stop offset="1" stopColor="#F8DEC0" />
            </linearGradient>
          </defs>
        </svg>
      )}

      {categoryId === 'lainnya' && (
        <svg
          viewBox="0 0 400 300"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          role="img"
          aria-label={alt}
        >
          <rect width="400" height="300" fill="url(#bg-snacks)" />
          <path
            d="M225 105H305L293 225C292 234 284 240 275 240H255C246 240 238 234 237 225L225 105Z"
            fill="#F28C28"
            stroke="#38251D"
            strokeWidth="4"
          />
          <path d="M218 105H312" stroke="#38251D" strokeWidth="6" strokeLinecap="round" />
          <path d="M265 105L282 58" stroke="#D93636" strokeWidth="6" strokeLinecap="round" />
          <path
            d="M95 165H215L202 225C199 235 190 240 180 240H130C120 240 111 235 108 225L95 165Z"
            fill="#D93636"
            stroke="#38251D"
            strokeWidth="4"
          />
          <circle cx="132" cy="155" r="20" fill="#FACC15" stroke="#38251D" strokeWidth="3.5" />
          <circle cx="160" cy="148" r="22" fill="#F28C28" stroke="#38251D" strokeWidth="3.5" />
          <circle cx="186" cy="156" r="19" fill="#FACC15" stroke="#38251D" strokeWidth="3.5" />
          <defs>
            <linearGradient id="bg-snacks" x1="0" y1="0" x2="400" y2="300" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FFF0DC" />
              <stop offset="1" stopColor="#FCD9B6" />
            </linearGradient>
          </defs>
        </svg>
      )}

      {showPlaceholderBadge && !compact && (
        <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between gap-2 pointer-events-none">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] sm:text-[11px] font-medium bg-brand-brown/85 text-brand-cream backdrop-blur-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-orange" />
            Placeholder Visual • Foto Produk Dapat Dikonfigurasi
          </span>
        </div>
      )}
    </div>
  );
};

export const PlatformBadgeIcon: React.FC<{
  platform: ReviewPlatformId | 'whatsapp';
  className?: string;
}> = ({ platform, className = 'w-7 h-7' }) => {
  if (platform === 'google') {
    return (
      <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
        <path
          fill="#EA4335"
          d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
        />
        <path
          fill="#4285F4"
          d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
        />
        <path
          fill="#FBBC05"
          d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
        />
        <path
          fill="#34A853"
          d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
        />
      </svg>
    );
  }

  if (platform === 'gofood') {
    return (
      <div
        className={`inline-flex items-center justify-center rounded-xl bg-[#EE2737] text-white font-poppins font-extrabold text-xs tracking-tight shadow-sm ${className}`}
      >
        GoFood
      </div>
    );
  }

  if (platform === 'grabfood') {
    return (
      <div
        className={`inline-flex items-center justify-center rounded-xl bg-[#00B14F] text-white font-poppins font-extrabold text-xs tracking-tight shadow-sm ${className}`}
      >
        Grab
      </div>
    );
  }

  return (
    <div
      className={`inline-flex items-center justify-center rounded-xl bg-[#25D366] text-white font-poppins font-extrabold text-xs shadow-sm ${className}`}
    >
      WA
    </div>
  );
};
