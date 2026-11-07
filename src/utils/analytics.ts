export type Ga4EventName =
  | 'page_view'
  | 'view_menu'
  | 'select_category'
  | 'click_whatsapp'
  | 'click_gofood'
  | 'click_grabfood'
  | 'click_google_maps';

export interface LoggedAnalyticsEvent {
  id: string;
  timestamp: string;
  eventName: Ga4EventName;
  params: Record<string, string | number | boolean>;
}

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    __ga4InitializedId?: string;
  }
}

const recentEvents: LoggedAnalyticsEvent[] = [];
const listeners: Set<() => void> = new Set();
let lastTrackedPageViewPath: string | null = null;

function notifyListeners() {
  listeners.forEach((fn) => fn());
}

export function subscribeAnalyticsLog(listener: () => void): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function getRecentAnalyticsEvents(): LoggedAnalyticsEvent[] {
  return [...recentEvents];
}

/**
 * Resolves the active GA4 Measurement ID from VITE_GA_MEASUREMENT_ID or runtime config.
 */
export function resolveGa4MeasurementId(configOverride?: string | null): string {
  const fromEnv = (import.meta.env.VITE_GA_MEASUREMENT_ID || '').trim();
  const fromConfig = (configOverride || '').trim();
  return fromConfig || fromEnv;
}

/**
 * Initializes Google Analytics 4 dynamically when a valid Measurement ID (G-XXXXXXXXXX) is configured.
 * Disables automatic gtag page_view so duplicate page_view events are prevented.
 */
export function initGa4(measurementId?: string | null): void {
  if (typeof window === 'undefined') return;
  const cleanId = resolveGa4MeasurementId(measurementId);

  if (!cleanId || !/^G-[A-Z0-9]+$/i.test(cleanId)) {
    return;
  }

  if (window.__ga4InitializedId === cleanId) {
    return;
  }

  window.__ga4InitializedId = cleanId;
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag(...args: unknown[]) {
    window.dataLayer?.push(args);
  };

  window.gtag('js', new Date());
  window.gtag('config', cleanId, {
    send_page_view: false, // Prevent automatic duplicate page_view
    anonymize_ip: true,
  });

  const existingScript = document.querySelector(`script[src*="googletagmanager.com/gtag/js"]`);
  if (!existingScript) {
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(cleanId)}`;
    document.head.appendChild(script);
  }
}

/**
 * Fires a single deduplicated page_view event per route path to prevent duplicate page_view events.
 */
export function trackPageViewOnce(pagePath: string, pageLocation?: string): void {
  const normalizedPath = pagePath || '/';
  if (lastTrackedPageViewPath === normalizedPath) {
    return;
  }
  lastTrackedPageViewPath = normalizedPath;
  trackGa4Event('page_view', {
    page_path: normalizedPath,
    page_location:
      pageLocation || (typeof window !== 'undefined' ? window.location.href : normalizedPath),
  });
}

/**
 * Fires a privacy-safe GA4 event.
 * Never transmits personal customer information (names, phone numbers, or addresses).
 */
export function trackGa4Event(
  eventName: Ga4EventName,
  rawParams: Record<string, string | number | boolean | undefined | null> = {}
): void {
  const forbiddenKeys = ['customer_name', 'phone', 'address', 'notes', 'email', 'user_name'];
  const safeParams: Record<string, string | number | boolean> = {};

  Object.entries(rawParams).forEach(([key, value]) => {
    if (
      value !== undefined &&
      value !== null &&
      !forbiddenKeys.includes(key.toLowerCase())
    ) {
      safeParams[key] = value;
    }
  });

  const entry: LoggedAnalyticsEvent = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    timestamp: new Date().toLocaleTimeString('id-ID'),
    eventName,
    params: safeParams,
  };

  recentEvents.unshift(entry);
  if (recentEvents.length > 25) {
    recentEvents.pop();
  }
  notifyListeners();

  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', eventName, safeParams);
  }
}
