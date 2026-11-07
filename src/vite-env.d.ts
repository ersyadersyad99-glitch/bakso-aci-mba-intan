/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SITE_URL?: string;
  readonly VITE_GA_MEASUREMENT_ID?: string;
  readonly VITE_WHATSAPP_NUMBER?: string;
  readonly VITE_GOFOOD_URL?: string;
  readonly VITE_GRABFOOD_URL?: string;
  readonly VITE_GOOGLE_MAPS_URL?: string;
  readonly VITE_GOOGLE_REVIEW_URL?: string;
  readonly VITE_GSC_VERIFICATION_TOKEN?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
