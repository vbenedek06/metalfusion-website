import { useEffect } from 'react';

const GSC_VERIFICATION = (import.meta.env.VITE_GSC_VERIFICATION ?? '').trim();

let gscApplied = false;
function ensureGscMeta(): void {
  if (gscApplied || !GSC_VERIFICATION || typeof document === 'undefined') return;
  const selector = 'meta[name="google-site-verification"]';
  if (!document.head.querySelector(selector)) {
    const m = document.createElement('meta');
    m.setAttribute('name', 'google-site-verification');
    m.setAttribute('content', GSC_VERIFICATION);
    document.head.appendChild(m);
  }
  gscApplied = true;
}

interface SEOInput {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  ogType?: 'website' | 'article';
  jsonLd?: Record<string, unknown>;
  noindex?: boolean;
}

function setMeta(selector: string, build: () => HTMLElement, attr: string, value: string): void {
  let el = document.head.querySelector<HTMLElement>(selector);
  if (!el) {
    el = build();
    document.head.appendChild(el);
  }
  el.setAttribute(attr, value);
}

function setLink(rel: string, href: string): void {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

function removeHeadElement(selector: string): void {
  document.head.querySelector(selector)?.remove();
}

function setJsonLd(json: Record<string, unknown> | undefined, id = 'seo-jsonld'): void {
  const existing = document.head.querySelector<HTMLScriptElement>(`script#${id}`);
  if (!json) {
    if (existing) existing.remove();
    return;
  }
  const script = existing ?? document.createElement('script');
  script.type = 'application/ld+json';
  script.id = id;
  script.text = JSON.stringify(json);
  if (!existing) document.head.appendChild(script);
}

export function useSEO({
  title,
  description,
  canonical,
  ogImage,
  ogType = 'website',
  jsonLd,
  noindex,
}: SEOInput): void {
  useEffect(() => {
    document.title = title;
    ensureGscMeta();

    if (noindex) {
      setMeta(
        'meta[name="robots"]',
        () => {
          const m = document.createElement('meta');
          m.setAttribute('name', 'robots');
          return m;
        },
        'content',
        'noindex, follow',
      );
    } else {
      removeHeadElement('meta[name="robots"]');
    }

    setMeta(
      'meta[name="description"]',
      () => {
        const m = document.createElement('meta');
        m.setAttribute('name', 'description');
        return m;
      },
      'content',
      description,
    );

    const ogPairs: Array<[string, string]> = [
      ['og:title', title],
      ['og:description', description],
      ['og:type', ogType],
      ['og:site_name', 'MetalFusion'],
      ['og:locale', 'hu_HU'],
    ];
    if (ogImage) {
      ogPairs.push(['og:image', new URL(ogImage, window.location.origin).toString()]);
    } else {
      removeHeadElement('meta[property="og:image"]');
    }
    if (canonical) ogPairs.push(['og:url', canonical]);
    if (!canonical) removeHeadElement('meta[property="og:url"]');

    for (const [property, content] of ogPairs) {
      setMeta(
        `meta[property="${property}"]`,
        () => {
          const m = document.createElement('meta');
          m.setAttribute('property', property);
          return m;
        },
        'content',
        content,
      );
    }

    setMeta(
      'meta[name="twitter:card"]',
      () => {
        const m = document.createElement('meta');
        m.setAttribute('name', 'twitter:card');
        return m;
      },
      'content',
      ogImage ? 'summary_large_image' : 'summary',
    );

    if (canonical) {
      setLink('canonical', canonical);
    } else {
      removeHeadElement('link[rel="canonical"]');
    }

    setJsonLd(jsonLd);
  }, [title, description, canonical, ogImage, ogType, jsonLd, noindex]);
}
