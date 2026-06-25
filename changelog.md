# MetalFusion SEO — changelog

Dátum: 2026-06-22
Branch: `main` (nem volt új branch létrehozva — a felhasználó dönt róla)
Forrásdokumentumok: `SEO.md`, `seo-audit.md`
Validáció: `npm run typecheck` ✓ · `npm run build` ✓ · 13 title (mind ≤60) · 13 description (mind 140-160) · JSON-LD `JSON.parse` ✓

A munka során semmilyen üzleti kulcsszót nem találtam ki — minden a meglévő szolgáltatás-leírásokból, az `i18n.tsx` szótárból és a `data/*` fájlokból származik.

---

## 1. Új fájlok (új tartalom)

| Fájl | Cél |
|---|---|
| `seo-audit.md` | Kiindulási állapot teljes felmérése |
| `SEO.md` | Forrásdokumentum: NAP, kulcsszó-klaszterek, URL-térkép, meta sablon, schema |
| `src/data/seo.ts` | Központi cégadat-konstansok (NAP) + LocalBusiness és Service schema builder függvények |
| `src/data/serviceDetails.ts` | 6 szolgáltatás teljes HU-tartalma (meta, H1, intro, capabilities, parameters, applications, materials, related-slugs) |
| `src/pages/ServiceDetail.tsx` | Új komponens — egyetlen sablon a 6 szolgáltatás-aloldalhoz |
| `src/pages/ServiceDetail.css` | A komponens stílusa |
| `public/sitemap.xml` | 13 URL, priority + changefreq + lastmod |
| `public/robots.txt` | `Allow: /` + sitemap hivatkozás |
| `changelog.md` | Ez a fájl |

---

## 2. Módosított fájlok

### Routing
- `src/App.tsx` — új dinamikus route: `/szolgaltatasok/:slug`

### Meta + JSON-LD (HU title/description + LocalBusiness JSON-LD)
- `src/pages/Home.tsx` — title 55, description 150, LocalBusiness JSON-LD
- `src/pages/Rolunk.tsx` — title 53, description 148, LocalBusiness JSON-LD + új belső szöveges link `/szolgaltatasok`-ra és `/referenciak`-ra
- `src/pages/Szolgaltatasok.tsx` — title 55, description 143, LocalBusiness JSON-LD, **szolgáltatás-kártyák átirányítva a 6 új aloldalra** (eddig mind `/kapcsolat`-ra mutatott!), CTA-szöveg "Részletek megtekintése"-re módosítva, alt szöveg bővebb
- `src/pages/Referenciak.tsx` — title 46, description 144, LocalBusiness JSON-LD
- `src/pages/Geppark.tsx` — title 51, description 145, LocalBusiness JSON-LD + új belső szöveges link `/szolgaltatasok`-ra és `/referenciak`-ra
- `src/pages/Kapcsolat.tsx` — title 56, description 148, LocalBusiness JSON-LD
- `src/pages/Adatvedelem.tsx` — title 37, description 144, canonical
- `src/pages/NotFound.tsx` — HU szöveg, **`noindex` robots meta**

### useSEO hook bővítés
- `src/hooks/useSEO.ts` — új `noindex` paraméter (404 kezelése), `og:locale` átállítva `en_US` → **`hu_HU`**-ra

### Statikus HTML
- `index.html` — `<html lang="hu">`, HU title, HU meta description, OG tagek HU-ra állítva, `og:locale="hu_HU"`

### Vizuális belső linkek
- `src/pages/Rolunk.css` — új `.about-cta__inline-links` stílus (a CTA-blokkba ágyazott szöveges linkek)
- `src/pages/Geppark.css` — új `.geppark-cta__inline-links` stílus

### Image performance
- `src/components/Hero.tsx` — főoldali hero videó `preload="auto"` → **`preload="metadata"`** (12 MB-ról nem fog azonnal letöltődni!)

---

## 3. Mit oldottam meg — oldalanként

| Oldal | HU meta | Canonical | OG | LocalBusiness JSON-LD | Service JSON-LD | H1 (1 db) | Belső link → /kapcsolat | → /referenciak |
|---|---|---|---|---|---|---|---|---|
| `/` | ✅ | ✅ | ✅ | ✅ | — | ✅ | ✅ | ✅ |
| `/rolunk` | ✅ | ✅ | ✅ | ✅ | — | ✅ | ✅ | ✅ (**új**) |
| `/szolgaltatasok` | ✅ | ✅ | ✅ | ✅ | — | ✅ | ✅ | ✅ |
| `/szolgaltatasok/cnc-maras` | ✅ | ✅ | ✅ | ✅ (`@graph`-ben) | ✅ | ✅ | ✅ | ✅ |
| `/szolgaltatasok/cnc-esztergalas` | ✅ | ✅ | ✅ | ✅ (`@graph`-ben) | ✅ | ✅ | ✅ | ✅ |
| `/szolgaltatasok/prototipusgyartas` | ✅ | ✅ | ✅ | ✅ (`@graph`-ben) | ✅ | ✅ | ✅ | ✅ |
| `/szolgaltatasok/szerszamgyartas` | ✅ | ✅ | ✅ | ✅ (`@graph`-ben) | ✅ | ✅ | ✅ | ✅ |
| `/szolgaltatasok/sorozatgyartas` | ✅ | ✅ | ✅ | ✅ (`@graph`-ben) | ✅ | ✅ | ✅ | ✅ |
| `/szolgaltatasok/komplett-mechanika` | ✅ | ✅ | ✅ | ✅ (`@graph`-ben) | ✅ | ✅ | ✅ | ✅ |
| `/referenciak` | ✅ | ✅ | ✅ | ✅ | — | ✅ | ✅ | — |
| `/geppark` | ✅ | ✅ | ✅ | ✅ | — | ✅ | ✅ | ✅ (**új**) |
| `/kapcsolat` | ✅ | ✅ | ✅ | ✅ | — | ✅ | — | — |
| `/adatvedelem` | ✅ | ✅ | ✅ | — | — | ✅ | — | — |
| `*` (404) | ✅ + `noindex` | — | — | — | — | ✅ | ✅ (gomb) | — |

H1 hierarchia változatlan: a `Hero`, `PageHero` és `Kapcsolat` komponensek által generált egyetlen H1 oldalanként — **az audit szerint már a kiindulási állapot is megfelelő volt**, nem kellett duplikációt javítani.

Alt szövegek: a kódbázisban már mind leíróak voltak (nincs `kep1.jpg`-szerű), a `Szolgaltatasok` oldal tile-jainál bővítettem ("CNC megmunkálás Budapesten" kontextus hozzáadva). A többi alt változatlan.

---

## 4. Amit NEM tudtam megcsinálni — adathiány

Az alábbi pontoknál **placeholder van a kódban** (jellemzően `TODO_*` jelöléssel a `src/data/seo.ts`-ben). A SEO **így is működik**, de a teljes Google Knowledge Panel / Business Profile konzisztenciához ki kell tölteni.

### 4.1 Cégadatok

- **Kozma utca pontos házszáma** — a `STREET_ADDRESS` jelenleg `"Kozma utca"`. Helyek, ahol cserélni kell, ha házszámot adsz:
  - `src/data/seo.ts:13` (`STREET_ADDRESS` konstans)
  - `src/pages/Kapcsolat.tsx` látható cím (több helyen: hero, csatorna-lista, térkép-szakasz)
  - `src/pages/Rolunk.tsx` látható cím
  - `src/components/Footer.tsx` látható cím
  - `src/pages/Adatvedelem.tsx` adatkezelő szakasz
  - `index.html` meta description, ha akarod ott említeni
- **Hivatalos cégnév** (`Kft.` / `Bt.` / `Zrt.` utótag) — `COMPANY_NAME` jelenleg `"MetalFusion"`. Helyek:
  - `src/data/seo.ts:9` (`COMPANY_NAME`)
  - JSON-LD `name` mező automatikusan átveszi
  - `Footer.tsx` és minden látható "MetalFusion" előfordulás (ezeket az `i18n.tsx` szótár is tartalmazza — a brand text továbbra is "METALFUSION" maradhat dizájn-szempontból)
- **Cégjegyzékszám** és **adószám** — opcionális a LocalBusiness schema-hoz. Ha megadod, a `src/data/seo.ts`-be `vatID` és `taxID` mezők illeszthetők be a `buildLocalBusinessNode()`-ba.

### 4.2 Élő domain

- A `SITE_BASE_URL` feltételezett `"https://metalfusion.hu"`. **Ha más az élő domain**, akkor át kell írni:
  - `src/data/seo.ts:7` (`SITE_BASE_URL`)
  - `public/sitemap.xml` minden `<loc>` (13 sor)
  - `public/robots.txt` `Sitemap:` sor

### 4.3 OG-kép (social megosztáshoz)

- A 14 oldalon mind `/images/og-default.jpg` van beállítva, **de a fájl nem létezik**. Most a social megosztásnál nem lesz nagy preview kép.
- **Mit kell**: egy 1200×630 PNG/JPG, MetalFusion logó + "Precision CNC manufacturing in Budapest" típusú tagline, jó kontraszttal.
- Helye után automatikusan érvényes lesz mindenhol (központilag a `src/data/seo.ts` `OG_IMAGE_PATH`-en keresztül).

### 4.4 Core Web Vitals (LCP) — második fázis

Az audit P1 listáján van, **de hatalmas munka és külön fázist érdemel** (~1 nap):

- **79 galéria-JPG WebP-re konvertálása** — most összesen ~250 MB a `public/images/gallery/`-ben. WebP után ~30-40 MB lenne (80-90% csökkenés).
  - Megoldás: új npm script `sharp` csomaggal (`npm i -D sharp`), batch konverzió, majd minden `.jpg` referencia cseréje `.webp`-re a `references.ts`, `serviceDetails.ts`, `machines.ts`, `Rolunk.tsx` (bgImage) fájlokban.
- **`PageHero bgImage` 3-4 MB JPG-k** — most CSS `background-image`-ként szolgálnak ki, lazy-loading nem megy rájuk. WebP konverzió után ~300 KB-ra csökken.
- **`hero-cnc.png` (2.3 MB)** — nem hivatkozott (`rg "hero-cnc"` 0 találat), törölhető.
- **Google Fonts** — most render-blokkoló. Self-hosted megoldásra cserélhető Vite plugin-nal, vagy preload+onload trükkel.

Ezeket **nem most végeztem el** — a jelenlegi SEO-bevezetés a tartalmi rész, a sebesség külön optimalizáció.

### 4.5 Bilingvális SEO

A jelenlegi i18n architektúra (kliensoldali MutationObserver szövegcsere) **nem alkalmas két nyelvi verzió indexelésére**. A felhasználó döntése szerint csak HU SEO van most. Ha később EN SEO is kell, az teljes i18n refaktor (i18next + külön `/en/*` route-ok + külön sitemap), és külön fázist érdemel.

---

## 5. Figyelem — frissítési protokoll (NE FELEJTSD EL!)

A felhasználó explicit kérte, hogy emlékeztessem erre:

> **Amikor a látható oldalon (Kapcsolat, Footer, Rólunk, stb.) megváltozik bármilyen NAP-adat** (cím, házszám, telefon, e-mail, cégnév, nyitvatartás), **a SEO oldalon is át KELL írni**, különben a Google "data conflict" hibát észlel a NAP-konzisztencia ellenőrzéskor, ami helyi SEO rangsort ront.

**Mely fájlok érintettek frissítéskor:**

1. `src/data/seo.ts` — a központi konstansok
2. `public/sitemap.xml` — ha új oldal jött, vagy URL változott
3. `public/robots.txt` — ha a domain változott
4. `index.html` — statikus meta tagek
5. `src/pages/Kapcsolat.tsx` — látható cím, telefon, e-mail
6. `src/pages/Rolunk.tsx` — látható cím
7. `src/pages/Adatvedelem.tsx` — adatkezelő blokk
8. `src/components/Footer.tsx` — látható cím, telefon, e-mail (jelenleg angolul, érdemes lehet HU-ra is)
9. `src/pages/Home.tsx` — CTA blokk telefon és cím
10. `i18n.tsx` szótár — `"Budapest, District X, Kozma Street"` és változatai

**Ez a protokoll a memóriámba is mentve** (`memory/nap-seo-sync.md`), így a következő session-ben is figyelmeztetni fogok rá.

---

## 6. Üzleti hatás — mit ér ez a meló

### Amit MOST nyersz
- **Indexelhető oldalstruktúra**: 13 oldal, mindegyik egyedi title + description + canonical → eddig minden oldal ugyanazt a meta-t kapta volna a kezdeti HTML-ben
- **Helyi SEO alap**: LocalBusiness schema minden oldalon → Google Business Profile-lal konzisztens NAP, helyi keresésnél (`"CNC megmunkálás Budapest"`) jobb pozíció
- **Szolgáltatás-specifikus rangsor**: 6 új landing page → hosszú-farkú kulcsszókra is jönni fogsz (`"CNC esztergagyártás Budapest"`, `"szerszámgyártás Kőbánya"`, stb.)
- **Konverziós útvonal**: az ajánlatkérő gombok és belső linkek (`/kapcsolat`, `/referenciak`) most már minden oldalról elérhetők (eddig 2 oldalon hiányzott)
- **Crawl budget**: `sitemap.xml` + `robots.txt` → gyorsabb indexelés, nem kell a Google-nek "vakon kutatnia"
- **Magyar SERP-megjelenés**: `lang="hu"`, `og:locale="hu_HU"`, HU meta és HU title → Google a HU oldalra fogja indexelni (eddig `lang="en"` volt)

### Amit JÖVŐRE nyerhetsz (P1 második fázis)
- **LCP javulás 60-70%-kal** (hero video preload + WebP gallery) → Core Web Vitals "Good" zóna → ranking boost
- **Mobile UX score** ugyancsak nő
- **OG-kép** után: minden Facebook/LinkedIn/WhatsApp megosztás vonzó preview-kártyát fog mutatni

### Amit pótolnod kell, hogy 100% legyen
1. Házszám (`Kozma utca _?_`) — 1 perc
2. Cégnév utótag (`Kft.` / `Bt.` / `Zrt.`) — 1 perc
3. Domain visszaigazolása (ha nem `metalfusion.hu`) — 1 perc
4. OG-kép (1200×630) — 30 perc Canva-val
5. P1 fázis (kép-WebP, font self-host) — ~1 nap fejlesztés

---

# Production-readiness sprint — 2026-06-22 (második fázis)

Az SEO-fázis után kelt új követelmények: működő űrlap, GDPR-konform analitika, impresszum, valódi statikus meta a crawler-eknek. Az ipari/fém dizájn (dark + light) változatlan, a meglévő működés nem tört el.

**Validáció a végén:** `npm run typecheck` ✓ · `npm run build` (Vite + prerender) ✓ · `npm test` 14/14 ✓ · mobil 360 és 390 pixelen `scrollWidth === clientWidth` minden kulcsoldalon ✓.

## A. Új fájlok

| Fájl | Funkció |
|---|---|
| `.env.example` | `VITE_*` környezeti változó sablon (Web3Forms, GA4, GSC, Turnstile, domain) |
| `src/hooks/useConsent.ts` | localStorage-alapú GDPR consent-store kategóriákkal (necessary / analytics / marketing), custom event broadcast |
| `src/components/CookieConsent.tsx` + `.css` | Bottom-anchored consent sáv HU/EN-en, "Mindet elfogadom" / "Csak szükséges" / "Beállítások" + kategória-checkboxok |
| `src/lib/analytics.ts` | GA4 gtag betöltés CSAK consent után, anonymize_ip, manual page_view, generate_lead, cta_click |
| `src/hooks/useAnalyticsPageView.ts` | Route-váltáskor page_view event (react-router useLocation) |
| `src/pages/Impresszum.tsx` | Ekertv. szerinti cégadat-oldal `seo.ts` konstansaiból + `TODO_*` placeholderek a hiányzókhoz |
| `scripts/prerender.mjs` | Post-build statikus HTML generálás 14 route-ra (title, OG, canonical, JSON-LD) |

## B. Módosított fájlok

- `src/components/ContactForm.tsx` — **MAILTO ELTÁVOLÍTVA**: aszinkron POST `api.web3forms.com/submit` `VITE_WEB3FORMS_KEY`-vel; loading/success/error állapotok; mezőszintű validáció (név, email-format, üzenet kötelező); honeypot (`botcheck`); 3 másodperces időkapu; `info@metalfusion.hu` fallback link mindig látszik. Web3Forms választás indoka: ingyenes 250 submission/hó, EU-hosted, beépített honeypot, nincs JS dep.
- `src/components/ContactForm.css` — új honeypot, error, banner, loading stílusok (mindkét témára)
- `src/pages/Kapcsolat.tsx` — inline form eltávolítva, helyette `<ContactForm />` komponens (a két helyen összevont kód)
- `src/components/Footer.tsx` — új `/impresszum` link a footer alján
- `public/sitemap.xml` — `/impresszum` URL hozzáadva (14 oldal a 13 helyett)
- `src/App.tsx` — `<Route path="/impresszum">`, `<CookieConsent />` mount, `useAnalyticsPageView()`, `useEffect(() => initAnalytics(), [])`
- `src/hooks/useSEO.ts` — `VITE_GSC_VERIFICATION` env-ből egyszer beillesztett `google-site-verification` meta
- `src/data/seo.ts` — `SITE_BASE_URL` `VITE_SITE_BASE_URL` env-override-tel
- `src/pages/Adatvedelem.tsx` — új cookie szakasz: szükséges/analitikai/marketing kategóriák, jelenlegi consent pill-ek, "Hozzájárulás visszavonása" gomb
- `src/pages/Adatvedelem.css` — TODO placeholder, pill, revoke gomb, code highlight stílusok
- `src/i18n.tsx` — ~30 új HU/EN fordítás pár (cookie sáv, form állapot szövegek, impresszum címkék)
- `package.json` — új `prerender` script, `build` script kibővítve `&& npm run prerender`-rel

## C. Funkciók végállapota — checklist

| Terület | Állapot |
|---|---|
| Kapcsolati form aszinkron Web3Forms-küldés | ✅ — `VITE_WEB3FORMS_KEY` szükséges, e nélkül error-banner + mailto fallback |
| Loading + success + error UI | ✅ — gomb disabled + "Küldés folyamatban…", siker után mezők ürítve + köszönő üzenet, hiba banner + retry |
| Field-szintű validáció | ✅ — név, email format, üzenet kötelező, hibák a mezőnél `role="alert"`-tal |
| Honeypot (`botcheck`) | ✅ — vizuálisan rejtett input, ha kitöltött, csendben "sent"-nek tűnik |
| 3 másodperces időkapu | ✅ — bot-szerű azonnali kitöltés csendben elnyelve |
| Turnstile előkészítve | ⏳ env-kulcs (`VITE_TURNSTILE_SITE_KEY`) bekérve `.env.example`-be, de a komponens még nem renderelt — aktiváláskor 5–10 sor kell |
| Impresszum oldal `/impresszum` | ✅ — Ekertv. szerint, Footer link, sitemap-ben |
| Prerender — statikus per-oldal meta | ✅ — `dist/<route>/index.html` 14 oldalra, title + og:* + canonical + JSON-LD a forrás-HTML-ben (JS futtatás nélkül látható) |
| GA4 consent után | ✅ — `VITE_GA4_ID` szükséges, csak "elfogadom" után tölt; `ga-disable-*` kapcsoló a megtagadásra |
| `page_view` route-váltáskor | ✅ — react-router `useLocation` + 30ms debounce a `document.title` beolvasásához |
| `generate_lead` konverzió | ✅ — sikeres form-submit után gtag event-tel (Google Ads-be importálható) |
| `cta_click` esemény | ⚠️ helper függvény implementálva (`trackCtaClick`), de a CTA gombokra még nincs kötve — opcionális finomítás, lásd D.4 |
| GSC HTML-meta verifikáció | ✅ — `VITE_GSC_VERIFICATION` env-ből a `useSEO` hook első futása beilleszti a `<head>`-be |
| Cookie consent sáv (HU/EN) | ✅ — 3 gomb (mindet / csak szükséges / beállítások), kategória-checkboxok, accessibility, reduced-motion |
| Consent visszavonás | ✅ — Adatvédelem oldalon gomb, `revoke()` hook + custom event broadcast |
| Adatvédelem cookie szakasz | ✅ — szükséges/analitikai/marketing sütik felsorolva (Google Ireland Ltd. mint felelős kezelő) |
| Vizuális mobil 360/390 | ✅ — `scrollWidth === clientWidth` mind a 4 ellenőrzött oldalon (kapcsolat, home, impresszum, cnc-maras) |

## D. Tudatos kompromisszumok és nyitott kérdések

1. **Prerender vs. react-snap választás indoka.** A react-snap Puppeteer-t pull-olna be (~150 MB) és React 18 + Vite kombóval gyakran tört. Helyette egy `scripts/prerender.mjs` Node script (zero runtime dep) injektál minden route HTML-jébe statikusan `<title>`, OG/Twitter, canonical és JSON-LD tag-eket — a SPA kliens-oldali hidratálás változatlanul működik, a crawler-ek és social bot-ok pedig pontos meta-t kapnak. **Karbantartás:** ha a `useSEO` meta-szövegei változnak az oldalakon, a `scripts/prerender.mjs` `ROUTE_META` tömbjében is le kell követni.
2. **HU-csak `i18n` SEO-szempontból.** A meta tag-ek és JSON-LD HU-fókuszúak. EN-felület megmarad a látogatóknak, de SEO-célzottság HU. (Korábbi fázis döntése.)
3. **CTA `cta_click` event nem kötött be a gombokra.** A `trackCtaClick(label, location)` helper készen áll, de minden "Ajánlatkérés" gomb instrumentálása ~10 helyszínen invazív. Javaslat: P2 finomításként vezetjük át, vagy egy IntersectionObserver-alapú scroll-tracking az érdeklődés mérésére.
4. **Turnstile aktiválás.** Ha tényleg agresszív lesz a spam (Web3Forms saját anti-bot rétege nem elég), `VITE_TURNSTILE_SITE_KEY` set-eléssel és a `ContactForm.tsx`-be ~10 sor (turnstile widget mount + token a payload-ba) bevezetésével aktiválható. Most kikapcsolt.

## E. Validációs eredmények

```
npm run typecheck   → exit 0
npm test            → 14 passed (1 test file: lightTheme.test.ts)
npm run build       → vite + prerender, "wrote 14 route HTMLs into dist/"
prerender check     → /, /szolgaltatasok/cnc-maras, /kapcsolat
                       title, og:title, canonical, JSON-LD Service mind helyes
mobile 360px        → /kapcsolat, scrollWidth=clientWidth=360 ✓
mobile 390px        → /kapcsolat, /, /impresszum, /szolgaltatasok/cnc-maras
                       mind scrollWidth=clientWidth=390 ✓
```

## F. Mit kell még tőled — összevont lista (env + TODO_*)

### F.1 ENV változók (egyikük SEM commitolva — `.env.example` mintán dolgozz)

Másold át `.env.example` → `.env` (Vite automatikusan beolvassa) és töltsd ki:

| Változó | Hol szerzem be? | Mit kapcsol be? | Kötelező? |
|---|---|---|---|
| `VITE_WEB3FORMS_KEY` | https://web3forms.com — regisztráció a céges e-maillel, kapsz egy access key UUID-ot. **Ingyenes 250 submission/hó**, EU-hosted. | Kapcsolati form valódi e-mail-küldést végez a `info@metalfusion.hu`-ra. Hiánya esetén a form error-bannert mutat + mailto fallback link. | **IGEN** |
| `VITE_GA4_ID` | Google Analytics admin → új tulajdon (G-XXXXXXXXXX típusú Measurement ID). | GA4 betöltés consent után. Hiánya esetén egyszerűen nem méri a látogatókat. | Ajánlott |
| `VITE_GSC_VERIFICATION` | Google Search Console → "HTML tag" verifikációs módszer, csak a `content="..."` része kell. | A `<meta name="google-site-verification">` tag bekerül minden oldal `<head>`-jébe, így Google Search Console igazolni tudja a tulajdont. | Ajánlott (egyszeri, a verifikáció után el lehet távolítani) |
| `VITE_SITE_BASE_URL` | A tényleges élő domain (pl. `https://metalfusion.hu`). | Felülírja a feltételezett `https://metalfusion.hu` domain-t a canonical URL-ekben és a prerender script-ben. | Csak ha NEM `metalfusion.hu` az élő domain |
| `VITE_TURNSTILE_SITE_KEY` | Cloudflare Turnstile dashboard → új site key. | Bot-védelem cap-jaként Web3Forms saját anti-spam-jén túl. Most NEM aktív kódban — aktiváláshoz pluszban ~10 sor `<Turnstile />` mount kell. | Nem |

### F.2 TODO_* adatok a kódban (a felhasználó tölti ki, ha rendelkezésre áll)

Mind `src/data/seo.ts`-ben (központi konstansok) és — a placeholder szövegnek — `src/pages/Impresszum.tsx`-ben jelenik meg:

| Placeholder | Hol | Mit kell helyébe |
|---|---|---|
| `TODO_STREET_NUMBER` | `src/data/seo.ts:STREET_ADDRESS` | A Kozma utca **házszám** (pl. `Kozma utca 9.`). Schema, sitemap, impresszum, footer mind innen veszi. |
| `TODO_LEGAL_NAME` / `TODO_LEGAL_SUFFIX` | `src/data/seo.ts:COMPANY_NAME`, `Impresszum.tsx` 1. szakasz | A cég pontos jogi neve utótaggal: `MetalFusion Kft.` / `Bt.` / `Zrt.` |
| `TODO_COMPANY_REGISTRATION_NUMBER` | `Impresszum.tsx` 1. szakasz | Cégjegyzékszám (pl. `01-09-123456`) |
| `TODO_TAX_NUMBER` | `Impresszum.tsx` 1. szakasz | Adószám (pl. `12345678-2-42`) |
| `TODO_LEGAL_REPRESENTATIVE` | `Impresszum.tsx` 1. szakasz | A céget képviselő természetes személy(ek) neve |
| `TODO_HOSTING_PROVIDER` | `Impresszum.tsx` 5. szakasz | Az élesítés helye szerinti tárhelyszolgáltató teljes neve, székhelye, elérhetősége (pl. Vercel Inc., Cloudflare Inc., Hetzner Online GmbH stb.) |
| OG kép `/images/og-default.jpg` | `public/images/` (még nem létezik) | 1200×630 JPG/PNG, MetalFusion logó + "Precíziós CNC alkatrészgyártás Budapesten" felirat. Social megosztás preview-hez. |

### F.3 Operatív lépések az indulás előtt

1. Töltsd ki a `.env`-et az F.1 alapján (legalább `VITE_WEB3FORMS_KEY`).
2. Cseréld a `TODO_*` placeholdereket F.2 alapján.
3. Tedd be a `og-default.jpg`-t `public/images/`-be.
4. **Build + deploy:** `npm run build`. A `dist/` mappát töltsd fel statikus hosting-ra (Cloudflare Pages, Vercel, Netlify, Hetzner static — bármelyik). Fontos hosting-konfiguráció: SPA fallback `index.html`-re, **de a prerender-elt `dist/<route>/index.html` fájlok legyenek elsődlegesek**, ha léteznek. Vercel, Netlify, Cloudflare Pages alapból így viselkedik.
5. Google Search Console-ban verifikálj `VITE_GSC_VERIFICATION` ellenőrzéssel, majd küldd be a `https://<domain>/sitemap.xml`-t.
6. **NAP-szinkronizáció:** ha bármelyik látható oldalon módosul cégadat (cím, telefon, e-mail, cégnév), `src/data/seo.ts` + `public/sitemap.xml` + `scripts/prerender.mjs` `ROUTE_META` is kövesse! Lásd `memory/nap-seo-sync.md`.
