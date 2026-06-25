#!/usr/bin/env node
// Post-build prerender script for MetalFusion.
//
// What it does:
//   • Reads dist/index.html (the Vite-built SPA shell)
//   • For every route in the sitemap, writes dist/<route>/index.html with
//     the correct <title>, <meta name="description">, OG tags, canonical
//     and JSON-LD inlined into <head> as static HTML
//   • The bundled JS still hydrates the SPA on the client — visitors keep
//     the smooth SPA experience, while crawlers (Google, Bing) and social
//     bots (Facebook, LinkedIn, Twitter, Slack) see the correct per-page
//     metadata without executing JS
//
// Why not react-snap / Puppeteer:
//   • react-snap pulls in Puppeteer (~150 MB), brittle on React 18 + Vite
//   • This script has zero runtime deps and is fully deterministic
//
// IMPORTANT — keep ROUTE_META in sync with the useSEO() calls in
// src/pages/* and src/data/serviceDetails.ts. The dev workflow:
//   1. Update meta in a page or service-details data file
//   2. Mirror the change here
//   3. CHANGELOG.md gets a one-liner if the route list changes
//
// Triggered by `npm run build` via the `postbuild` script.

import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');
const DIST = path.join(ROOT, 'dist');

const SITE_BASE_URL = (process.env.VITE_SITE_BASE_URL || 'https://metalfusion.hu').replace(/\/$/, '');
const OG_IMAGE_PATH = '/images/og-default.jpg';

const LOCAL_BUSINESS_ID = `${SITE_BASE_URL}/#localbusiness`;

function buildLocalBusinessNode() {
  return {
    '@type': 'LocalBusiness',
    '@id': LOCAL_BUSINESS_ID,
    name: 'MetalFusion',
    url: SITE_BASE_URL,
    logo: `${SITE_BASE_URL}/images/logo.png`,
    image: `${SITE_BASE_URL}/images/logo.png`,
    telephone: '+36203331218',
    email: 'info@metalfusion.hu',
    foundingDate: '2010',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Kozma utca',
      addressLocality: 'Budapest',
      postalCode: '1108',
      addressRegion: 'Budapest',
      addressCountry: 'HU',
    },
    geo: { '@type': 'GeoCoordinates', latitude: 47.4783, longitude: 19.188 },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '07:00',
        closes: '16:00',
      },
    ],
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

function localBusinessSchema() {
  return { '@context': 'https://schema.org', ...buildLocalBusinessNode() };
}

function serviceSchema(service) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      buildLocalBusinessNode(),
      {
        '@type': 'Service',
        name: service.name,
        serviceType: 'ManufacturingService',
        description: service.description,
        url: `${SITE_BASE_URL}${service.route}`,
        areaServed: { '@type': 'Country', name: 'Hungary' },
        provider: { '@id': LOCAL_BUSINESS_ID },
      },
    ],
  };
}

// --- Route → meta map (keep in sync with src/pages/* useSEO calls) ---

const ROUTE_META = [
  {
    route: '/',
    title: 'MetalFusion — precíziós CNC alkatrészgyártás Budapesten',
    description:
      'Egyedi kis- és nagyszériás CNC alkatrészgyártás Budapesten. Precíziós megmunkálás, modern géppark, megbízható határidő, 24 órás ajánlat műhelyrajzból.',
    jsonLd: localBusinessSchema(),
  },
  {
    route: '/rolunk',
    title: 'Rólunk — 15+ éves CNC műhely Budapesten | MetalFusion',
    description:
      'MetalFusion: 2010 óta gyártunk egyedi CNC alkatrészeket Budapesten. Modern géppark, dokumentált minőség, mérnöki gondolkodás egy felelős partnerrel.',
    jsonLd: localBusinessSchema(),
  },
  {
    route: '/szolgaltatasok',
    title: 'Szolgáltatások — CNC megmunkálás Budapest | MetalFusion',
    description:
      'CNC marás, esztergálás, prototípusgyártás, szerszámgyártás, kis- és nagyszériás termelés, komplett mechanikai gyártás Budapesten műhelyrajzból.',
    jsonLd: localBusinessSchema(),
  },
  {
    route: '/szolgaltatasok/cnc-maras',
    title: 'CNC marás Budapest — 3- és 4-tengelyes | MetalFusion',
    description:
      'CNC marás Budapesten 3- és 4-tengelyes Hurco megmunkálóközpontokon. Acél, alumínium, műanyag, ±0,01 mm tűrés. Prototípus és sorozat egy műhelyben.',
    jsonLd: serviceSchema({
      name: 'CNC marás Budapesten — 3- és 4-tengelyes megmunkálóközpontokon',
      description: 'CNC marás 3- és 4-tengelyes Hurco megmunkálóközpontokon.',
      route: '/szolgaltatasok/cnc-maras',
    }),
  },
  {
    route: '/szolgaltatasok/cnc-esztergalas',
    title: 'CNC esztergálás Budapest — hajtott szerszámmal | MetalFusion',
    description:
      'Hajtott szerszámos CNC esztergálás Budapesten Ø3–Ø250 mm tartományban. Tengelyek, perselyek, komplett forgástestek egy befogásban, sorozatban is.',
    jsonLd: serviceSchema({
      name: 'CNC esztergálás Budapesten — hajtott szerszámos megmunkálás',
      description: 'Hajtott szerszámos CNC esztergálás Ø3–Ø250 mm tartományban.',
      route: '/szolgaltatasok/cnc-esztergalas',
    }),
  },
  {
    route: '/szolgaltatasok/prototipusgyartas',
    title: 'Prototípusgyártás Budapest — gyors precíz | MetalFusion',
    description:
      'Egyedi prototípusgyártás Budapesten műhelyrajz vagy 3D modell alapján. STEP, IGES, DWG fájlok, mérnöki egyeztetés, gyors átfutás. 24 órás ajánlat.',
    jsonLd: serviceSchema({
      name: 'Prototípusgyártás Budapesten — egyedi darabok rajzból vagy 3D modellből',
      description: 'Egyedi prototípusgyártás műhelyrajz vagy 3D modell alapján.',
      route: '/szolgaltatasok/prototipusgyartas',
    }),
  },
  {
    route: '/szolgaltatasok/szerszamgyartas',
    title: 'Szerszámgyártás Budapest — sajtoló öntő | MetalFusion',
    description:
      'Alakos öntőszerszámok, sajtoló- és vágószerszámok, fúrósablonok és gyártási készülékek Budapesten. Tervezéstámogatástól a gyártásig egy műhelyben.',
    jsonLd: serviceSchema({
      name: 'Szerszám- és készülékgyártás Budapesten',
      description: 'Alakos öntőszerszámok, sajtoló- és vágószerszámok, fúrósablonok és gyártási készülékek.',
      route: '/szolgaltatasok/szerszamgyartas',
    }),
  },
  {
    route: '/szolgaltatasok/sorozatgyartas',
    title: 'Kis- és nagyszériás gyártás Budapest | MetalFusion',
    description:
      'Sorozatgyártás Budapesten 10-től 10 000 darabig kötött határidőkkel. Mérési jegyzőkönyv kérésre. Heti és havi rendszerességű futások beszállítóként.',
    jsonLd: serviceSchema({
      name: 'Kis- és nagyszériás gyártás Budapesten',
      description: 'Sorozatgyártás 10-10000 db kötött határidőkkel.',
      route: '/szolgaltatasok/sorozatgyartas',
    }),
  },
  {
    route: '/szolgaltatasok/komplett-mechanika',
    title: 'Komplett mechanikai gyártás Budapest | MetalFusion',
    description:
      'Gépek, részegységek és komplett berendezések mechanikai gyártása Budapesten alkatrésztől összeszerelésig. Egy felelős partner, dokumentált folyamat.',
    jsonLd: serviceSchema({
      name: 'Komplett mechanikai gyártás Budapesten',
      description: 'Gépek, részegységek és komplett berendezések mechanikai gyártása.',
      route: '/szolgaltatasok/komplett-mechanika',
    }),
  },
  {
    route: '/referenciak',
    title: 'Referenciák — gyártási projektek | MetalFusion',
    description:
      'MetalFusion gyártási referenciák: gyógyszeripari, orvostechnikai, gépgyártó és csomagolástechnikai partnerek egyedi alkatrészei és berendezései.',
    jsonLd: localBusinessSchema(),
  },
  {
    route: '/geppark',
    title: 'Géppark — Hurco, Hwacheon, Doosan CNC | MetalFusion',
    description:
      'Hurco CNC megmunkálóközpontok, Hwacheon hajtott szerszámos eszterga, Doosan tengelyeszterga és precíziós 3D mérőeszközök egy budapesti műhelyben.',
    jsonLd: localBusinessSchema(),
  },
  {
    route: '/kapcsolat',
    title: 'Kapcsolat — CNC ajánlatkérés 24 órán belül | MetalFusion',
    description:
      'Küldje el műhelyrajzát vagy 3D modelljét: 24 órán belül árajánlattal és gyárthatósági visszajelzéssel válaszolunk. Budapest, Kozma utca, X. kerület.',
    jsonLd: localBusinessSchema(),
  },
  {
    route: '/impresszum',
    title: 'Impresszum — MetalFusion',
    description:
      'A MetalFusion kötelező cégadatai az Ekertv. szerint: cég neve, székhely, cégjegyzékszám, adószám, képviselő, elérhetőség, tárhelyszolgáltató.',
    jsonLd: localBusinessSchema(),
  },
  {
    route: '/adatvedelem',
    title: 'Adatvédelmi tájékoztató | MetalFusion',
    description:
      'A MetalFusion adatkezelési tájékoztatója a kapcsolatfelvételhez és ajánlatkéréshez tartozó személyes adatok GDPR szerinti, jogszerű kezeléséről.',
  },
];

// --- HTML rewriter ---

function escapeAttr(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function buildHeadTags(meta) {
  const url = `${SITE_BASE_URL}${meta.route === '/' ? '/' : meta.route}`;
  const ogImage = `${SITE_BASE_URL}${OG_IMAGE_PATH}`;

  const tags = [
    `<meta name="description" content="${escapeAttr(meta.description)}">`,
    `<meta property="og:title" content="${escapeAttr(meta.title)}">`,
    `<meta property="og:description" content="${escapeAttr(meta.description)}">`,
    `<meta property="og:type" content="website">`,
    `<meta property="og:site_name" content="MetalFusion">`,
    `<meta property="og:locale" content="hu_HU">`,
    `<meta property="og:url" content="${escapeAttr(url)}">`,
    `<meta property="og:image" content="${escapeAttr(ogImage)}">`,
    `<meta name="twitter:card" content="summary_large_image">`,
    `<link rel="canonical" href="${escapeAttr(url)}">`,
  ];
  if (meta.jsonLd) {
    const jsonStr = JSON.stringify(meta.jsonLd).replace(/</g, '\\u003C');
    tags.push(`<script type="application/ld+json">${jsonStr}</script>`);
  }
  return tags.join('\n    ');
}

function injectMeta(shellHtml, meta) {
  let html = shellHtml;

  // Replace title
  html = html.replace(/<title>[^<]*<\/title>/, `<title>${escapeAttr(meta.title)}</title>`);

  // Strip existing description and OG / Twitter / canonical / JSON-LD meta tags
  // we know the Vite shell included — they'll be re-inserted with route-specific values.
  const toStrip = [
    /<meta name="description"[^>]*>/g,
    /<meta property="og:(title|description|type|site_name|locale|url|image)"[^>]*>/g,
    /<meta name="twitter:card"[^>]*>/g,
    /<link rel="canonical"[^>]*>/g,
    /<script type="application\/ld\+json">[\s\S]*?<\/script>/g,
  ];
  for (const re of toStrip) {
    html = html.replace(re, '');
  }

  // Insert the new tags right before </head>
  const headTags = buildHeadTags(meta);
  html = html.replace('</head>', `    ${headTags}\n  </head>`);

  return html;
}

async function exists(p) {
  try {
    await fs.access(p);
    return true;
  } catch {
    return false;
  }
}

async function main() {
  if (!(await exists(DIST))) {
    console.error('[prerender] dist/ not found — run `npm run build` first.');
    process.exit(1);
  }

  const shellPath = path.join(DIST, 'index.html');
  const shell = await fs.readFile(shellPath, 'utf8');

  let written = 0;
  for (const meta of ROUTE_META) {
    const html = injectMeta(shell, meta);

    let outPath;
    if (meta.route === '/') {
      outPath = path.join(DIST, 'index.html');
    } else {
      const dir = path.join(DIST, meta.route);
      await fs.mkdir(dir, { recursive: true });
      outPath = path.join(dir, 'index.html');
    }
    await fs.writeFile(outPath, html, 'utf8');
    written += 1;
  }

  console.log(`[prerender] wrote ${written} route HTMLs into dist/`);
}

main().catch((err) => {
  console.error('[prerender] failed:', err);
  process.exit(1);
});
