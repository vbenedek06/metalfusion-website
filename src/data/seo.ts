// Central SEO config + schema builders for MetalFusion.
// Hard-coded business data lives here. When the values below change,
// also update: public/sitemap.xml, index.html, Footer, Kapcsolat, Adatvedelem.
// See memory/nap-seo-sync.md for the lockstep update protocol.

// Override via VITE_SITE_BASE_URL if the live site lives elsewhere.
// Falls back to the assumed metalfusion.hu domain.
const ENV_BASE = (import.meta.env.VITE_SITE_BASE_URL ?? '').replace(/\/$/, '');
export const SITE_BASE_URL = ENV_BASE || 'https://metalfusion.hu'; // TODO: confirm live domain

export const COMPANY_NAME = 'MetalFusion'; // TODO_LEGAL_NAME: append Kft. / Bt. / Zrt.
export const COMPANY_NAME_DISPLAY = 'MetalFusion';

export const STREET_ADDRESS = 'Kozma utca'; // TODO_STREET_NUMBER
export const POSTAL_CODE = '1108';
export const CITY = 'Budapest';
export const REGION = 'Budapest';
export const COUNTRY = 'HU';

export const GEO_LAT = 47.4783;
export const GEO_LON = 19.188;

export const PHONE = '+36203331218';
export const PHONE_DISPLAY = '+36 20 333 1218';
export const EMAIL = 'info@metalfusion.hu';

export const FOUNDING_YEAR = '2010';

export const OG_IMAGE_PATH = '/images/og-default.jpg'; // TODO_OG_IMAGE: create 1200x630 PNG/JPG
export const LOGO_PATH = '/images/logo.png';

export const OPENING_HOURS = [
  { dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '07:00', closes: '16:00' },
];

const LOCAL_BUSINESS_ID = `${SITE_BASE_URL}/#localbusiness`;

interface JsonObject {
  [key: string]: unknown;
}

function buildLocalBusinessNode(): JsonObject {
  return {
    '@type': 'LocalBusiness',
    '@id': LOCAL_BUSINESS_ID,
    name: COMPANY_NAME,
    url: SITE_BASE_URL,
    logo: `${SITE_BASE_URL}${LOGO_PATH}`,
    image: `${SITE_BASE_URL}${LOGO_PATH}`,
    telephone: PHONE,
    email: EMAIL,
    foundingDate: FOUNDING_YEAR,
    address: {
      '@type': 'PostalAddress',
      streetAddress: STREET_ADDRESS,
      addressLocality: CITY,
      postalCode: POSTAL_CODE,
      addressRegion: REGION,
      addressCountry: COUNTRY,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: GEO_LAT,
      longitude: GEO_LON,
    },
    openingHoursSpecification: OPENING_HOURS.map((h) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: h.dayOfWeek,
      opens: h.opens,
      closes: h.closes,
    })),
    areaServed: { '@type': 'Country', name: 'Hungary' },
    knowsAbout: [
      'CNC marás',
      'CNC esztergálás',
      'prototípusgyártás',
      'szerszámgyártás',
      'kis- és nagyszériás gyártás',
      'komplett mechanikai gyártás',
      'fémmegmunkálás',
    ],
  };
}

export function localBusinessSchema(): JsonObject {
  return {
    '@context': 'https://schema.org',
    ...buildLocalBusinessNode(),
  };
}

export interface ServiceSchemaInput {
  name: string;
  description: string;
  url: string;
  serviceType?: string;
}

export function localBusinessWithServiceSchema(service: ServiceSchemaInput): JsonObject {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      buildLocalBusinessNode(),
      {
        '@type': 'Service',
        name: service.name,
        serviceType: service.serviceType ?? 'ManufacturingService',
        description: service.description,
        url: service.url,
        areaServed: { '@type': 'Country', name: 'Hungary' },
        provider: { '@id': LOCAL_BUSINESS_ID },
      },
    ],
  };
}

export function canonical(path: string): string {
  if (path === '/') return SITE_BASE_URL + '/';
  return `${SITE_BASE_URL}${path}`;
}
