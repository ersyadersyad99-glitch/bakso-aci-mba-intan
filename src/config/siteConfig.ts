export type CategoryId =
  | 'all'
  | 'bakso-aci'
  | 'pempek'
  | 'dimsum'
  | 'mentai'
  | 'frozen-food'
  | 'lainnya';

export type AvailabilityStatus = 'available' | 'limited' | 'sold_out' | 'unconfirmed';

export type ReviewPlatformId = 'google' | 'gofood' | 'grabfood';

const env = import.meta.env || {};

export const DEFAULT_PRODUCTION_DOMAIN = 'https://bakso-aci-mba-intan.vercel.app/';

/**
 * Normalizes a configured site URL into a canonical root URL with trailing slash.
 * Rejects localhost, 127.0.0.1, and non-HTTPS URLs so SEO metadata always points
 * to the active production domain.
 */
export function normalizeCanonicalSiteUrl(rawUrl?: string): string {
  const candidate = (rawUrl ?? env.VITE_SITE_URL ?? DEFAULT_PRODUCTION_DOMAIN).trim();
  if (
    !candidate ||
    candidate.includes('localhost') ||
    candidate.includes('127.0.0.1') ||
    !candidate.startsWith('https://')
  ) {
    return DEFAULT_PRODUCTION_DOMAIN;
  }
  return candidate.endsWith('/') ? candidate : `${candidate}/`;
}

/**
 * Confirmed Business & Ecosystem Constants for BAKSO ACI MBA INTAN.
 * Uses confirmed official URLs and contact details while keeping unconfirmed fields
 * (such as GrabFood merchant URL and operating days) transparent.
 */
export const CONFIGURABLE_URLS = {
  CANONICAL_SITE_URL: normalizeCanonicalSiteUrl(env.VITE_SITE_URL),
  GOFOOD_MERCHANT_URL: (
    env.VITE_GOFOOD_URL ||
    'https://gofood.co.id/jakarta/restaurant/bakso-aci-mba-intan-babelan-295c3c1b-56fd-4c00-b980-25ba700966a2'
  ).trim(),
  GRABFOOD_MERCHANT_URL: (env.VITE_GRABFOOD_URL || '').trim(), // Not yet provided — rendered as Upcoming
  WHATSAPP_NUMBER: (env.VITE_WHATSAPP_NUMBER || '6281299366705').trim(),
  WHATSAPP_DISPLAY: '+62 812-9936-6705',
  WHATSAPP_BASE_URL: 'https://wa.me/6281299366705',
  INSTAGRAM_URL: 'https://www.instagram.com/baci_mbaintan/',
  INSTAGRAM_HANDLE: '@baci_mbaintan',
  GOOGLE_MAPS_LOCATION_URL: (
    env.VITE_GOOGLE_MAPS_URL || 'https://share.google/E2kU59447ww7Xvc5T'
  ).trim(),
  GOOGLE_MAPS_DIRECTIONS_URL: (
    env.VITE_GOOGLE_MAPS_URL || 'https://share.google/E2kU59447ww7Xvc5T'
  ).trim(),
  GOOGLE_BUSINESS_PROFILE_URL: (
    env.VITE_GOOGLE_MAPS_URL || 'https://share.google/E2kU59447ww7Xvc5T'
  ).trim(),
  GOOGLE_REVIEWS_URL: (
    env.VITE_GOOGLE_REVIEW_URL || 'https://share.google/E2kU59447ww7Xvc5T'
  ).trim(),
  GA4_MEASUREMENT_ID: (env.VITE_GA_MEASUREMENT_ID || '').trim(),
  GSC_VERIFICATION_TOKEN: (env.VITE_GSC_VERIFICATION_TOKEN || '').trim(),
};

export interface ProductCategory {
  id: CategoryId;
  name: string;
  shortDesc: string;
  badgeText: string;
  seoAltText: string;
  imageWebp?: string | null;
}

export interface ProductItem {
  id: string;
  name: string;
  categoryId: Exclude<CategoryId, 'all'>;
  /** Optional additional categories this item belongs to (e.g. Bakso Aci & Frozen Food) without duplicating items */
  secondaryCategoryIds?: Exclude<CategoryId, 'all'>[];
  /** Composition or description from verified reference; null uses clear placeholder */
  shortDescription: string | null;
  /** Explicit verified ingredient list from GoFood catalog */
  ingredients?: string[];
  /** Verified IDR price; null uses clear placeholder so prices are never invented */
  price: number | null;
  /** Availability status; defaults to 'unconfirmed' placeholder until verified */
  availability: AvailabilityStatus;
  /** Whether the item has the GoFood 'Dapat dicustom' badge */
  isCustomizable?: boolean;
  /** Whether the item is featured in GoFood "Resto's top picks" */
  isTopPick?: boolean;
  /** Variant distinction label (e.g. Frozen Pack vs Ready-to-Eat Bowl) */
  variantLabel?: string;
  /** Optional verified product photo URL */
  imageWebp: string | null;
  /** Descriptive SEO alt text for product image */
  seoAlt: string;
  /** Reference source badge */
  sourceLabel: string;
  isPopular?: boolean;
}

export function matchesProductCategory(product: ProductItem, categoryId: CategoryId): boolean {
  if (categoryId === 'all') return true;
  if (product.categoryId === categoryId) return true;
  return Boolean(product.secondaryCategoryIds && product.secondaryCategoryIds.includes(categoryId));
}

export interface VerifiedReviewItem {
  id: string;
  platform: ReviewPlatformId;
  starRating: number;
  reviewText: string;
  reviewerName?: string | null;
  reviewDate?: string | null;
}

export interface PlatformReviewSummary {
  platformId: ReviewPlatformId;
  tabLabel: 'Google' | 'GoFood' | 'GrabFood';
  platformName: 'Google Reviews' | 'GoFood Reviews' | 'GrabFood Reviews';
  /** Verified average rating for this specific platform; null when not yet verified */
  overallRating: number | null;
  /** Verified total review count for this specific platform; null when not yet verified */
  reviewCount: number | null;
  /** Official platform URL (empty string if awaiting merchant link configuration) */
  platformReviewUrl: string;
  /** Verified customer review items */
  reviews: VerifiedReviewItem[];
}

export interface SeoAndGoogleConfig {
  canonicalUrl: string;
  /** Tracks whether custom production domain is confirmed by owner or still pending ('pending_owner_domain' | 'confirmed') */
  productionDomainStatus?: 'pending_owner_domain' | 'confirmed';
  metaTitle: string;
  metaDescription: string;
  ogImageUrl: string;
  ga4MeasurementId: string;
  gscVerificationToken: string;
  googleBusinessProfileUrl: string;
  googleMapsDirectionsUrl: string;
  /** Only populated when exact coordinates are verified by business owner; null otherwise */
  verifiedLatitude: number | null;
  verifiedLongitude: number | null;
}

export interface SiteConfig {
  brand: {
    name: string;
    showcaseBy: string;
    brandMessage: string;
    primaryTagline: string;
    secondaryHeadline: string;
    targetMarket: string;
  };
  seo: SeoAndGoogleConfig;
  hero: {
    headline: string;
    description: string;
    exploreButtonText: string;
    orderButtonText: string;
    promoStickerTop: string;
    promoStickerMain: string;
    promoStickerSub: string;
    heroImageUrl: string;
    heroImageAlt: string;
  };
  highlights: {
    id: string;
    title: string;
    description: string;
    badge: string;
  }[];
  orderingPlatforms: {
    sectionTitle: string;
    sectionSubtitle: string;
    gofoodUrl: string;
    grabfoodUrl: string;
    whatsappNumber: string;
    whatsappDisplay: string;
    whatsappDefaultGreeting: string;
  };
  socialMedia: {
    instagramUrl: string;
    instagramHandle: string;
  };
  locationAndContact: {
    businessName: string;
    streetAddress: string;
    subdistrict: string;
    district: string;
    regency: string;
    province: string;
    postalCode: string;
    address: string;
    googleMapsUrl: string;
    mapEmbedUrl: string;
    /** Confirmed operating hours: 07:00–22:30 WIB */
    operatingHours: string | null;
    /** Operating days: null until confirmed. Do not assume daily operation. */
    operatingDays: string | null;
  };
  about: {
    headline: string;
    subheadline: string;
    paragraphs: string[];
    pillars: {
      title: string;
      description: string;
    }[];
    businessPhotoWebp: string | null;
  };
  categories: ProductCategory[];
  products: ProductItem[];
  reviewPlatforms: PlatformReviewSummary[];
}

export const DEFAULT_SITE_CONFIG: SiteConfig = {
  brand: {
    name: 'BAKSO ACI MBA INTAN',
    showcaseBy: 'VARDH.ID',
    brandMessage: 'One Place, Many Delicious Choices.',
    primaryTagline: 'Jajanan Favorit, Rasa yang Bikin Nagih!',
    secondaryHeadline: 'Lagi Laper? Saatnya Nikmati Jajanan Favoritmu!',
    targetMarket: 'Kebalen, Babelan, Kabupaten Bekasi',
  },
  seo: {
    canonicalUrl: CONFIGURABLE_URLS.CANONICAL_SITE_URL,
    productionDomainStatus: 'confirmed',
    metaTitle: 'Bakso Aci MBA INTAN | Bakso Aci, Dimsum & Pempek di Kebalen, Babelan, Bekasi',
    metaDescription:
      'Nikmati Bakso Aci Kebalen, Bakso Aci Babelan, Dimsum Babelan, Pempek Babelan, dan Bakso Aci Frozen Food Bekasi di BAKSO ACI MBA INTAN (Jl. Palapa, Kebalen, Kabupaten Bekasi). Pesan via GoFood atau WhatsApp.',
    ogImageUrl: `${CONFIGURABLE_URLS.CANONICAL_SITE_URL.replace(/\/$/, '')}/images/hero-bakso-aci.jpg`,
    ga4MeasurementId: CONFIGURABLE_URLS.GA4_MEASUREMENT_ID,
    gscVerificationToken: CONFIGURABLE_URLS.GSC_VERIFICATION_TOKEN,
    googleBusinessProfileUrl: CONFIGURABLE_URLS.GOOGLE_BUSINESS_PROFILE_URL,
    googleMapsDirectionsUrl: CONFIGURABLE_URLS.GOOGLE_MAPS_DIRECTIONS_URL,
    verifiedLatitude: null,
    verifiedLongitude: null,
  },
  hero: {
    headline: 'Jajanan Favorit, Rasa yang Bikin Nagih!',
    description:
      'Dari Bakso Aci yang gurih pedas, Pempek yang nikmat, sampai Dimsum dan Mentai yang menggoda. Semua favoritmu ada di MBA INTAN!',
    exploreButtonText: 'JELAJAHI MENU',
    orderButtonText: 'PESAN SEKARANG',
    promoStickerTop: 'ONE PLACE',
    promoStickerMain: 'BIKIN NAGIH!',
    promoStickerSub: 'Many Delicious Choices',
    heroImageUrl: '/images/hero/hero-bakso-aci.webp',
    heroImageAlt:
      'Semangkuk Bakso Aci MBA INTAN gurih pedas dengan bakso urat, cuanki lidah, tahu bakso, pilus cikur dan jeruk limau — kuliner Bakso Aci Kebalen Babelan Kabupaten Bekasi',
  },
  highlights: [
    {
      id: 'multi-menu',
      badge: '01 • Banyak Pilihan',
      title: 'One Place, Many Delicious Choices',
      description:
        'Pilihan kuliner lengkap di satu tempat: sajian Bakso Aci Babelan, Pempek Babelan, Dimsum Babelan, hingga Bakso Aci Frozen Food Bekasi untuk stok praktis di rumah.',
    },
    {
      id: 'taste',
      badge: '02 • Cita Rasa Khas',
      title: 'Kuah Gurih Pedas & Topping Lengkap',
      description:
        'Racikan Bakso Aci Kebalen dengan bakso urat, cuanki lidah, tahu bakso, pangsit, dan pilus cikur yang menjadi pilihan jajanan Kebalen dan kuliner Babelan.',
    },
    {
      id: 'easy-order',
      badge: '03 • Pesan Online Mudah',
      title: 'Pesan lewat GoFood atau WhatsApp Resmi',
      description:
        'Melayani pemesanan Bakso Aci Kabupaten Bekasi dan sekitarnya melalui merchant resmi GoFood maupun kontak langsung WhatsApp (+62 812-9936-6705).',
    },
  ],
  orderingPlatforms: {
    sectionTitle: 'Pesan dari Platform Favoritmu!',
    sectionSubtitle: 'Order Your Favorite Food!',
    gofoodUrl: CONFIGURABLE_URLS.GOFOOD_MERCHANT_URL,
    grabfoodUrl: CONFIGURABLE_URLS.GRABFOOD_MERCHANT_URL,
    whatsappNumber: CONFIGURABLE_URLS.WHATSAPP_NUMBER,
    whatsappDisplay: CONFIGURABLE_URLS.WHATSAPP_DISPLAY,
    whatsappDefaultGreeting:
      'Halo BAKSO ACI MBA INTAN! Saya mengunjungi website resmi dan ingin memesan / menanyakan ketersediaan menu serta info ongkir:',
  },
  socialMedia: {
    instagramUrl: CONFIGURABLE_URLS.INSTAGRAM_URL,
    instagramHandle: CONFIGURABLE_URLS.INSTAGRAM_HANDLE,
  },
  locationAndContact: {
    businessName: 'BAKSO ACI MBA INTAN',
    streetAddress: 'Jl. Palapa, Kebalen',
    subdistrict: 'Kebalen',
    district: 'Kec. Babelan',
    regency: 'Kabupaten Bekasi',
    province: 'Jawa Barat',
    postalCode: '17610',
    address: 'Jl. Palapa, Kebalen, Kec. Babelan, Kabupaten Bekasi, Jawa Barat 17610',
    googleMapsUrl: CONFIGURABLE_URLS.GOOGLE_MAPS_LOCATION_URL,
    mapEmbedUrl:
      'https://maps.google.com/maps?q=Bakso%20Aci%20Mba%20Intan%20Jl.%20Palapa%20Kebalen%20Babelan%20Bekasi&t=&z=15&ie=UTF8&iwloc=&output=embed',
    operatingHours: '07.00–22.30 WIB',
    operatingDays: null, // Operating days not yet confirmed; do not assume daily operation
  },
  about: {
    headline: 'Lebih dari Sekadar Bakso Aci!',
    subheadline:
      'Kuliner Babelan & Jajanan Kebalen di Kabupaten Bekasi — Bakso Aci, Pempek, Dimsum & Frozen Food',
    paragraphs: [
      'Berlokasi di Jl. Palapa, Kebalen, Kec. Babelan, Kabupaten Bekasi, Jawa Barat 17610, BAKSO ACI MBA INTAN menghadirkan berbagai sajian kuliner ("One Place, Many Delicious Choices") untuk warga Kebalen, Babelan, dan wilayah Kabupaten Bekasi.',
      'Menu kami mencakup pilihan Paket Inces Bakso Aci Kebalen dan Bakso Aci Babelan (Paket Inces I, II, III, JUMBO, hingga Paket Inces Hemat), sajian Pempek Babelan dengan kuah cuko, Dimsum Babelan & Dimsum Salmon, serta Bakso Aci Frozen Food Bekasi yang praktis dimasak di rumah. Pemesanan dilayani pada jam operasional 07.00–22.30 WIB melalui GoFood atau WhatsApp resmi (+62 812-9936-6705).',
    ],
    pillars: [
      {
        title: 'Pilihan Menu Beragam',
        description:
          'Menyediakan Bakso Aci Kabupaten Bekasi (5 varian Paket Inces), Pempek, Dimsum, Mentai, dan Frozen Food.',
      },
      {
        title: 'Lokasi & Pemesanan Mudah',
        description:
          'Berada di Jl. Palapa, Kebalen, Kec. Babelan, Kabupaten Bekasi dan dapat dipesan via GoFood atau WhatsApp.',
      },
      {
        title: 'Informasi Jujur & Transparan',
        description:
          'Rincian komposisi menu, harga resmi, jam operasional (07.00–22.30 WIB), dan tautan lokasi disajikan apa adanya.',
      },
    ],
    businessPhotoWebp: '/images/hero/hero-bakso-aci.webp',
  },
  categories: [
    {
      id: 'all',
      name: 'Semua Menu',
      shortDesc: 'Tampilkan seluruh koleksi menu MBA INTAN',
      badgeText: 'Semua Kategori',
      seoAltText: 'Katalog lengkap Bakso Aci MBA INTAN Kebalen Babelan Bekasi',
    },
    {
      id: 'bakso-aci',
      name: 'Bakso Aci',
      shortDesc: 'Varian Paket Inces Bakso Aci Kebalen & Babelan berkuah gurih pedas',
      badgeText: 'Signature Menu',
      seoAltText: 'Bakso Aci Kebalen dan Bakso Aci Babelan — Paket Inces Bakso Aci MBA INTAN',
      imageWebp: '/images/categories/bakso-aci.webp',
    },
    {
      id: 'pempek',
      name: 'Pempek',
      shortDesc: 'Sajian Pempek Babelan gurih dengan paduan kuah cuko yang nikmat',
      badgeText: 'Favorit',
      seoAltText: 'Menu Pempek Babelan nikmat di Bakso Aci MBA INTAN Kebalen Bekasi',
      imageWebp: '/images/categories/pempek.webp',
    },
    {
      id: 'dimsum',
      name: 'Dimsum',
      shortDesc: 'Pilihan Dimsum Babelan hangat bertekstur lembut untuk teman santai',
      badgeText: 'Hangat & Gurih',
      seoAltText: 'Dimsum Babelan hangat di Bakso Aci MBA INTAN Kebalen',
      imageWebp: '/images/categories/dimsum.webp',
    },
    {
      id: 'mentai',
      name: 'Mentai',
      shortDesc: 'Dimsum Salmon & kreasi Dimsum Mentai Bekasi yang creamy dan menggoda',
      badgeText: 'Spesial Mentai & Salmon',
      seoAltText: 'Dimsum Mentai Bekasi dan Dimsum Salmon di Bakso Aci MBA INTAN Babelan',
      imageWebp: '/images/categories/mentai.webp',
    },
    {
      id: 'frozen-food',
      name: 'Frozen Food',
      shortDesc: 'Kemasan praktis siap masak kapan saja untuk stok di rumah',
      badgeText: 'Stok Praktis',
      seoAltText: 'Frozen Food praktis di Kebalen Babelan Bekasi — Bakso Aci MBA INTAN',
      imageWebp: '/images/categories/frozen-food.webp',
    },
    {
      id: 'lainnya',
      name: 'Lainnya',
      shortDesc: 'Aneka jajanan pelengkap dan minuman segar pilihan',
      badgeText: 'Snacks & Drinks',
      seoAltText: 'Aneka jajanan dan minuman pendamping Bakso Aci MBA INTAN Babelan Bekasi',
      imageWebp: '/images/categories/lainnya.webp',
    },
  ],
  products: [
    {
      id: 'paket-inces-1',
      name: 'Paket Inces I',
      categoryId: 'frozen-food',
      secondaryCategoryIds: ['bakso-aci'],
      shortDescription:
        '2 Baso Urat, 4 Baso Aci, Cuanki Lidah, Pangsit, Tahu Baso, Cikur',
      ingredients: [
        '2 Baso Urat',
        '4 Baso Aci',
        'Cuanki Lidah',
        'Pangsit',
        'Tahu Baso',
        'Cikur',
      ],
      price: 19000,
      availability: 'available',
      isCustomizable: true,
      isTopPick: false,
      variantLabel: 'Kemasan Frozen Pack • Katalog Frozenfood GoFood',
      imageWebp: '/images/products/bakso-aci-paket-inces-1.webp',
      seoAlt:
        'Paket Inces I berisi 2 Baso Urat, 4 Baso Aci, Cuanki Lidah, Pangsit, Tahu Baso dan Cikur — Bakso Aci MBA INTAN Kebalen Babelan',
      sourceLabel: 'Terkonfirmasi Katalog GoFood',
      isPopular: true,
    },
    {
      id: 'paket-inces-2',
      name: 'Paket Inces II',
      categoryId: 'bakso-aci',
      secondaryCategoryIds: ['frozen-food'],
      shortDescription:
        '4 Baso Aci, 3 Baso Urat, Pangsit, Tahu Baso, 2 Ceker, Cuanki Lidah, Cikur',
      ingredients: [
        '4 Baso Aci',
        '3 Baso Urat',
        'Pangsit',
        'Tahu Baso',
        '2 Ceker',
        'Cuanki Lidah',
        'Cikur',
      ],
      price: 22000,
      availability: 'available',
      isCustomizable: true,
      isTopPick: true,
      variantLabel: 'Sajian Siap Santap & Katalog Frozenfood GoFood',
      imageWebp: '/images/products/bakso-aci-paket-inces-2.webp',
      seoAlt:
        'Paket Inces II berisi 4 Baso Aci, 3 Baso Urat, Pangsit, Tahu Baso, 2 Ceker, Cuanki Lidah dan Cikur — Bakso Aci MBA INTAN Babelan',
      sourceLabel: 'Resto’s Top Pick • GoFood',
      isPopular: true,
    },
    {
      id: 'paket-inces-3',
      name: 'Paket Inces III',
      categoryId: 'bakso-aci',
      secondaryCategoryIds: ['frozen-food'],
      shortDescription:
        '2 Bakso Aci Telur, 2 Bakso Urat, 3 Bakso Aci, Tahu Bakso, Pangsit, Cuanki Lidah, Cikur',
      ingredients: [
        '2 Bakso Aci Telur',
        '2 Bakso Urat',
        '3 Bakso Aci',
        'Tahu Bakso',
        'Pangsit',
        'Cuanki Lidah',
        'Cikur',
      ],
      price: 23000,
      availability: 'available',
      isCustomizable: true,
      isTopPick: false,
      variantLabel: 'Sajian Siap Santap & Katalog Frozenfood GoFood',
      imageWebp: '/images/products/bakso-aci-paket-inces-3.webp',
      seoAlt:
        'Paket Inces III berisi 2 Bakso Aci Telur, 2 Bakso Urat, 3 Bakso Aci, Tahu Bakso, Pangsit, Cuanki Lidah dan Cikur — Bakso Aci MBA INTAN Bekasi',
      sourceLabel: 'Terkonfirmasi Katalog GoFood',
      isPopular: true,
    },
    {
      id: 'paket-inces-jumbo',
      name: 'Paket Inces JUMBO',
      categoryId: 'bakso-aci',
      secondaryCategoryIds: ['frozen-food'],
      shortDescription:
        '8 Baso Aci, 4 Baso Urat, 2 Tahu Baso, 2 Pangsit, 4 Cuanki Lidah, Cikur',
      ingredients: [
        '8 Baso Aci',
        '4 Baso Urat',
        '2 Tahu Baso',
        '2 Pangsit',
        '4 Cuanki Lidah',
        'Cikur',
      ],
      price: 38000,
      availability: 'available',
      isCustomizable: true,
      isTopPick: true,
      variantLabel: 'Porsi Jumbo Siap Santap & Frozenfood GoFood',
      imageWebp: '/images/products/bakso-aci-jumbo.webp',
      seoAlt:
        'Paket Inces JUMBO berisi 8 Baso Aci, 4 Baso Urat, 2 Tahu Baso, 2 Pangsit, 4 Cuanki Lidah dan Cikur — Bakso Aci MBA INTAN Babelan Bekasi',
      sourceLabel: 'Resto’s Top Pick • GoFood',
      isPopular: true,
    },
    {
      id: 'paket-inces-hemat',
      name: 'Paket Inces Hemat',
      categoryId: 'bakso-aci',
      secondaryCategoryIds: ['frozen-food'],
      shortDescription:
        '2 Bakso Urat, 2 Bakso Aci, Mie Kuning, 1 Cuanki Lidah, 1 Pangsit, Cikur',
      ingredients: [
        '2 Bakso Urat',
        '2 Bakso Aci',
        'Mie Kuning',
        '1 Cuanki Lidah',
        '1 Pangsit',
        'Cikur',
      ],
      price: 15000,
      availability: 'available',
      isCustomizable: true,
      isTopPick: false,
      variantLabel: 'Paket Hemat • Katalog Frozenfood GoFood',
      imageWebp: '/images/products/bakso-aci-hemat.webp',
      seoAlt:
        'Paket Inces Hemat berisi 2 Bakso Urat, 2 Bakso Aci, Mie Kuning, 1 Cuanki Lidah, 1 Pangsit dan Cikur — Bakso Aci MBA INTAN Kebalen',
      sourceLabel: 'Terkonfirmasi Katalog GoFood',
      isPopular: true,
    },
    {
      id: 'dimsum-salmon',
      name: 'Dimsum Salmon (Isi 6)',
      categoryId: 'mentai',
      secondaryCategoryIds: ['dimsum'],
      shortDescription: 'Salmon, Wortel, Jamur, Beef',
      ingredients: ['Salmon', 'Wortel', 'Jamur', 'Beef'],
      price: 19000,
      availability: 'sold_out',
      isCustomizable: false,
      isTopPick: true,
      variantLabel: 'Isi 6 Pcs • Katalog GoFood',
      imageWebp: '/images/products/dimsum-salmon.webp',
      seoAlt:
        'Dimsum Salmon (Isi 6) dengan topping Salmon, Wortel, Jamur dan Beef — Bakso Aci MBA INTAN Babelan Bekasi',
      sourceLabel: 'Resto’s Top Pick • GoFood',
      isPopular: true,
    },
    {
      id: 'dimsum-mentai-spesial',
      name: 'Varian Dimsum Mentai',
      categoryId: 'mentai',
      shortDescription: null,
      price: null,
      availability: 'unconfirmed',
      isCustomizable: false,
      isTopPick: false,
      imageWebp: '/images/products/dimsum-mentai.webp',
      seoAlt: 'Varian Dimsum Mentai Bekasi saus mentai torched di Bakso Aci MBA INTAN Kebalen Babelan',
      sourceLabel: 'Kategori Terkonfirmasi Owner',
      isPopular: false,
    },
    {
      id: 'menu-pempek-pilihan',
      name: 'Varian Menu Pempek',
      categoryId: 'pempek',
      shortDescription: null,
      price: null,
      availability: 'unconfirmed',
      isCustomizable: false,
      isTopPick: false,
      imageWebp: '/images/products/pempek.webp',
      seoAlt: 'Varian Pempek Palembang dengan kuah cuko dan timun di Bakso Aci MBA INTAN Babelan Bekasi',
      sourceLabel: 'Kategori Terkonfirmasi Owner',
      isPopular: true,
    },
    {
      id: 'menu-dimsum-reguler',
      name: 'Varian Menu Dimsum',
      categoryId: 'dimsum',
      shortDescription: null,
      price: null,
      availability: 'unconfirmed',
      isCustomizable: false,
      isTopPick: false,
      imageWebp: '/images/products/dimsum-reguler.webp',
      seoAlt: 'Varian Dimsum kukus hangat dengan saus sambal di Bakso Aci MBA INTAN Kebalen Babelan',
      sourceLabel: 'Kategori Terkonfirmasi Owner',
      isPopular: true,
    },
    {
      id: 'menu-snacks-beverages',
      name: 'Aneka Jajanan & Minuman',
      categoryId: 'lainnya',
      shortDescription: null,
      price: null,
      availability: 'unconfirmed',
      isCustomizable: false,
      isTopPick: false,
      imageWebp: '/images/products/snacks-beverages.webp',
      seoAlt: 'Aneka jajanan renyah dan minuman segar di Bakso Aci MBA INTAN Babelan Bekasi',
      sourceLabel: 'Kategori Terkonfirmasi Owner',
      isPopular: false,
    },
  ],
  reviewPlatforms: [
    {
      platformId: 'google',
      tabLabel: 'Google',
      platformName: 'Google Reviews',
      overallRating: null, // Never invent Google review scores or counts
      reviewCount: null,
      platformReviewUrl: CONFIGURABLE_URLS.GOOGLE_REVIEWS_URL,
      reviews: [],
    },
    {
      platformId: 'gofood',
      tabLabel: 'GoFood',
      platformName: 'GoFood Reviews',
      overallRating: null,
      reviewCount: null,
      platformReviewUrl: CONFIGURABLE_URLS.GOFOOD_MERCHANT_URL,
      reviews: [],
    },
    {
      platformId: 'grabfood',
      tabLabel: 'GrabFood',
      platformName: 'GrabFood Reviews',
      overallRating: null,
      reviewCount: null,
      platformReviewUrl: CONFIGURABLE_URLS.GRABFOOD_MERCHANT_URL,
      reviews: [],
    },
  ],
};

/**
 * Formats an IDR price when a verified number is provided.
 * Returns null if the price has not been configured yet so the UI displays a clear placeholder.
 */
export function formatVerifiedPrice(price: number | null): string | null {
  if (price === null || Number.isNaN(price) || price <= 0) {
    return null;
  }
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

/**
 * Formats a phone number into readable Indonesian display format (+62 812-9936-6705).
 */
export function formatWhatsAppDisplay(rawPhone: string): string {
  const cleaned = rawPhone.replace(/[^0-9]/g, '');
  if (!cleaned) return '';
  if (cleaned === '6281299366705' || cleaned === '081299366705') {
    return '+62 812-9936-6705';
  }
  const normalized = cleaned.startsWith('0')
    ? `62${cleaned.slice(1)}`
    : cleaned.startsWith('62')
      ? cleaned
      : `62${cleaned}`;
  return `+${normalized}`;
}

export interface WhatsAppOrderLineItem {
  product: ProductItem;
  qty: number;
}

export interface ComposeWhatsAppOrderParams {
  greeting: string;
  customerName?: string;
  customerNotes?: string;
  items: WhatsAppOrderLineItem[];
  estimatedSubtotal: number;
}

/**
 * Generates a structured Indonesian WhatsApp order message containing:
 * 1. Greeting & Customer Name (if provided)
 * 2. Ordered items with quantity, unit price, and per-item subtotal
 * 3. Total estimated order amount
 * 4. Special notes / requests
 * 5. Request for stock availability & delivery fee (ongkir) confirmation
 */
export function composeWhatsAppOrderMessage({
  greeting,
  customerName = '',
  customerNotes = '',
  items,
  estimatedSubtotal,
}: ComposeWhatsAppOrderParams): string {
  const lines: string[] = [
    greeting.trim() ||
      'Halo BAKSO ACI MBA INTAN! Saya ingin memesan menu melalui website resmi:',
    '',
  ];

  if (customerName.trim()) {
    lines.push(`Nama Pelanggan: ${customerName.trim()}`);
    lines.push('');
  }

  if (items.length > 0) {
    lines.push('Daftar Pesanan:');
    items.forEach(({ product, qty }, idx) => {
      const unitPriceStr = formatVerifiedPrice(product.price);
      const itemSubtotal =
        typeof product.price === 'number' && Number.isFinite(product.price) && product.price > 0
          ? product.price * qty
          : null;
      const itemSubtotalStr = formatVerifiedPrice(itemSubtotal);

      if (unitPriceStr && itemSubtotalStr) {
        lines.push(
          `${idx + 1}. ${product.name} (${qty}x) — Harga Satuan: ${unitPriceStr} | Subtotal: ${itemSubtotalStr}`
        );
      } else {
        lines.push(
          `${idx + 1}. ${product.name} (${qty}x) — [Mohon info harga satuan & subtotal]`
        );
      }
    });

    lines.push('');
    if (estimatedSubtotal > 0) {
      lines.push(`Total Estimasi Pesanan: ${formatVerifiedPrice(estimatedSubtotal)}`);
      lines.push('(Belum termasuk ongkir)');
    } else {
      lines.push('Total Estimasi Pesanan: Menunggu konfirmasi harga menu');
    }
  } else {
    lines.push('Daftar Pesanan:');
    lines.push('- Mohon info daftar menu yang tersedia hari ini');
  }

  if (customerNotes.trim()) {
    lines.push('');
    lines.push(`Catatan / Permintaan Khusus: ${customerNotes.trim()}`);
  }

  lines.push('');
  lines.push(
    'Mohon konfirmasi ketersediaan stok menu dan informasi ongkir ke lokasi saya. Terima kasih!'
  );

  return lines.join('\n');
}

/**
 * Builds a verified wa.me deep link with a prefilled Indonesian message.
 * Uses https://wa.me/6281299366705 by default.
 */
export function buildWhatsAppUrl(rawPhone: string, message: string): string | null {
  const cleaned = rawPhone.replace(/[^0-9]/g, '');
  if (!cleaned) return null;
  const normalized = cleaned.startsWith('0')
    ? `62${cleaned.slice(1)}`
    : cleaned.startsWith('62')
      ? cleaned
      : `62${cleaned}`;
  const encodedText = encodeURIComponent(message);
  return `https://wa.me/${normalized}?text=${encodedText}`;
}
