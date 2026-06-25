// GA4 + Google Ads conversion wiring.
// Loads gtag only AFTER the visitor accepts analytics cookies.
// Until then, no third-party network calls are made.

import { CONSENT_EVENT, getConsentSync, type ConsentState } from '../hooks/useConsent';

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

const GA4_ID = (import.meta.env.VITE_GA4_ID ?? '').trim();

let gtagScriptLoaded = false;
let gtagInitialised = false;

function loadGtag(): void {
  if (gtagScriptLoaded || !GA4_ID || typeof document === 'undefined') return;
  gtagScriptLoaded = true;

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(GA4_ID)}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer ?? [];
  window.gtag = function gtag(...args: unknown[]) {
    window.dataLayer!.push(args);
  };
  window.gtag('js', new Date());

  // Default consent state: deny ads, allow analytics (we already gated this behind consent).
  window.gtag('consent', 'default', {
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    analytics_storage: 'granted',
  });

  window.gtag('config', GA4_ID, {
    anonymize_ip: true,
    send_page_view: false, // we trigger page_view manually on route change
  });
  gtagInitialised = true;
}

function unloadGtag(): void {
  // We don't strip the script tag, but we stop sending events.
  // GA4 respects window.gtag.disable for that ID:
  if (GA4_ID && typeof window !== 'undefined') {
    (window as unknown as Record<string, boolean>)[`ga-disable-${GA4_ID}`] = true;
  }
}

function applyConsent(consent: ConsentState): void {
  if (consent.analytics) {
    if (!gtagScriptLoaded) loadGtag();
    if (window.gtag) {
      window.gtag('consent', 'update', {
        analytics_storage: 'granted',
        ad_storage: consent.marketing ? 'granted' : 'denied',
        ad_user_data: consent.marketing ? 'granted' : 'denied',
        ad_personalization: consent.marketing ? 'granted' : 'denied',
      });
    }
    if (GA4_ID && typeof window !== 'undefined') {
      (window as unknown as Record<string, boolean>)[`ga-disable-${GA4_ID}`] = false;
    }
  } else {
    unloadGtag();
  }
}

export function initAnalytics(): () => void {
  if (typeof window === 'undefined') return () => {};

  applyConsent(getConsentSync());

  const onChange = (e: Event) => {
    const detail = (e as CustomEvent<ConsentState>).detail;
    if (detail) applyConsent(detail);
    else applyConsent(getConsentSync());
  };
  window.addEventListener(CONSENT_EVENT, onChange);
  return () => window.removeEventListener(CONSENT_EVENT, onChange);
}

export function trackPageView(path: string, title: string): void {
  if (!gtagInitialised || !window.gtag) return;
  window.gtag('event', 'page_view', {
    page_path: path,
    page_title: title,
    page_location: typeof window !== 'undefined' ? window.location.href : path,
  });
}

export function trackEvent(name: string, params?: Record<string, unknown>): void {
  if (!gtagInitialised || !window.gtag) return;
  window.gtag('event', name, params ?? {});
}

export function trackGenerateLead(params: { value?: number; currency?: string; method?: string }): void {
  trackEvent('generate_lead', {
    currency: params.currency ?? 'HUF',
    value: params.value ?? 0,
    method: params.method ?? 'contact_form',
  });
}

export function trackCtaClick(label: string, location?: string): void {
  trackEvent('cta_click', { cta_label: label, cta_location: location ?? 'unknown' });
}
