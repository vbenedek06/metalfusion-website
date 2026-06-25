# MetalFusion — SEO audit (kiindulási állapot)

Dátum: 2026-06-22
Auditált branch: `main`
Auditált commit: `a858465`

A jelenlegi SEO-állapot feltérképezése. Minden javaslat a tényleges kódbázisra épül, nem feltevésekre. Az implementáció utáni állapotot a `changelog.md` fogja rögzíteni.

---

## 0. Architekturális helyzetkép

| Tétel | Állapot |
|---|---|
| Framework | React 18 + Vite + react-router-dom 6.26 (CSR SPA) |
| Útvonalak | 7 darab flat route + 404 |
| Head-manager | **Saját `useSEO` hook** (`src/hooks/useSEO.ts`) — title, description, OG, canonical, twitter:card, JSON-LD támogatott |
| i18n | Kliensoldali szövegcsere `MutationObserver`-rel (`src/i18n.tsx`) — HU és EN **ugyanazon az URL-en** |
| SSR/SSG | nincs (sima SPA) |

**Következmény SEO szempontból:** a Google Bot pozitívan render-el JS-t, így az `useSEO`-val beállított meta tag-eket *jellemzően* látja, de a kezdeti HTML title/description statikus és minden route-on ugyanaz, amíg a kliens nem renderel. Egy SSR-réteg (pl. `vite-plugin-ssg`) plusz biztonságot adna, de a jelenlegi prioritás a tartalmi SEO.

A bilingvális i18n kliensoldali szövegcseréje **nem indexel két nyelvi verziót** — a Google csak az alapnyelvet (most: HU) látja meg. Külön EN SEO most nem cél (lásd korábbi döntés).

---

## 1. Title és meta description — oldalanként

A `useSEO` hook már be van kötve minden route-on. A jelenlegi értékek **angolul** vannak, és HU-célzott SEO-hoz át kell írni magyarra, valamint hosszra optimalizálni.

| Oldal | Jelenlegi title (hossz) | Description hossz | Probléma |
|---|---|---|---|
| `/` (Home) | `MetalFusion - Precision CNC component manufacturing in Budapest` (63) | 121 | Title **3 karakterrel hosszabb** a 60-as ajánlásnál; description **rövidebb** a 140 minimumnál; **angolul van** |
| `/rolunk` | `About us - MetalFusion CNC workshop` (35) | 153 | OK hossz, de **angolul**, és nincs kulcsszó-fókusz |
| `/szolgaltatasok` | `Services - CNC milling, turning and tooling \| MetalFusion` (57) | 175 | Description **15 karakterrel hosszabb** a 160 max-nál; **angolul** |
| `/referenciak` | `References - MetalFusion manufacturing projects` (47) | 138 | Description **2 karakterrel rövidebb** a 140 minimumnál; **angolul** |
| `/geppark` | `Machine Park - CNC machining centres and lathes \| MetalFusion` (60) | 138 | Description rövidebb; **angolul** |
| `/kapcsolat` | `Contact - MetalFusion quote request` (35) | 142 | OK hossz, **angolul**; nem kulcsszó-fókuszú ("CNC ajánlatkérés Budapest" hiányzik) |
| `/adatvedelem` | `Privacy Policy - MetalFusion` (28) | 80 | Description **túl rövid**; nincs `noindex` (jogi oldal, de egyetértés szerint nem releváns ranking-szempontból) |
| `*` (404) | `404 - Page not found \| MetalFusion` (35) | 73 | **Kell `noindex` meta** (404 oldal nem indexelhető) |

**Render-blokkolás:** a `useSEO` futás közben módosítja a `<head>`-et, így az `index.html` statikus title és description (`MetalFusion – Precision CNC component manufacturing` / EN) marad az első HTML-ben. A social preview-k (FB/LinkedIn) és Google Cache **ezt láthatják** addig, amíg a JS le nem fut. → Javasolt: az `index.html` statikus tag-eit is HU-ra átírni, így a Bot azonnali HU-tartalmat lát.

**`og:locale`** jelenleg `en_US` (statikus index.html és useSEO is). HU-célzáshoz **`hu_HU`** kell.

---

## 2. Heading hierarchia (H1)

| Oldal | H1 forrás | Darabszám | Állapot |
|---|---|---|---|
| `/` | `Hero.tsx` — `<h1 className="hero__title">` | 1 | ✅ OK |
| `/rolunk` | `PageHero.tsx` (eyebrow: "About us") | 1 | ✅ OK |
| `/szolgaltatasok` | `PageHero.tsx` (eyebrow: "Services") | 1 | ✅ OK |
| `/referenciak` | `PageHero.tsx` (eyebrow: "References") | 1 | ✅ OK |
| `/geppark` | `PageHero.tsx` (eyebrow: "Machine Park") | 1 | ✅ OK |
| `/kapcsolat` | `Kapcsolat.tsx` — `<h1 className="contact-hero__title">Request your quote.</h1>` | 1 | ✅ OK |
| `/adatvedelem` | `PageHero.tsx` ("Privacy Policy") | 1 | ✅ OK |
| `*` (404) | `PageHero.tsx` ("Page not found.") | 1 | ✅ OK |

**Nincs duplikált H1 sehol.** A hierarchia jól rétegezett (H1 → szakasz H2-k → kártyán belül H3). Strukturális javítás itt nem kell.

**Tartalmi probléma:** a H1-ek **angolul** vannak, és nem főkulcsszó-fókuszúak. Pl. a `/szolgaltatasok` H1 jelenleg `"Complex manufacturing processes through one partner."` — magyarul, kulcsszóval, jobb lenne `"CNC megmunkálás és szerszámgyártás Budapesten"`. Lásd 1. pont.

---

## 3. Képek és alt szövegek

### 3.1 Alt szöveg helyzet

Az audit szempontjából **kifejezetten jó hír**: nincs `kep1.jpg` / üres / generikus alt sehol. Minden `<img>` tag rendelkezik leíró alt-tal:

| Forrás | Alt minőség | Példa |
|---|---|---|
| `Rolunk.tsx` workshop kép | leíró ✅ | `"MetalFusion CNC workshop in operation"` |
| `Szolgaltatasok.tsx` szolgáltatás-tile | rövid, **fejleszthető** ⚠️ | `alt={s.title}` → `"CNC milling"` (csak a szolgáltatás neve, mehetne több kontextus) |
| `Referenciak.tsx` projekt cover | leíró ✅ | `alt={r.title}` → `"Custom pharmaceutical packaging machine mechanics"` |
| `Referenciak.tsx` workshop mosaic | leíró ✅ | `workshopGallery` adatban már mind kitöltött (`alt: 'Hurco VM10i CNC machining centre'` stb.) |
| `Geppark.tsx` gépkép | leíró ✅ | `alt={m.name}` → `"3-axis CNC machining centre"` |

**Egységes nyelvi probléma:** minden alt **angolul** van. Mivel a `i18n.tsx` `MutationObserver`-rel a runtime alt-okat is átfordítja, a vizuális/screen-reader UX jó, **de a Google Bot a kezdeti HTML-ből angol alt-okat olvas**, és csak akkor lát HU verziót, ha render-eli a JS-t.

→ **Javaslat:** alapnyelv legyen HU az alt-okban is (i18n forrás), az EN változat legyen a fordított oldal. Ez technikailag az `i18n.tsx` `pairs` tömb sorrendjének megfordítását jelentheti, vagy az alt-okat HU-ban tárolni és EN-re fordítani futtatáskor.

### 3.2 Kép-méret katasztrófa (Core Web Vitals)

| Fájl | Méret | Helyszín | Probléma |
|---|---|---|---|
| `public/videos/home-hero-cnc-loop.mp4` | **12 MB** | Home hero | **above-the-fold**, `preload="auto"` — azonnal letöltődik |
| `public/images/hero-cnc.png` | **2.3 MB** | (nem hivatkozott, csak meta-poster) | felesleges méret |
| `public/videos/contact-hero.mp4` | **3.9 MB** | Kapcsolat hero | `preload="metadata"` ✅ jobb |
| `public/images/contact-hero-poster.jpg` | 171 KB | poster | OK |
| `public/images/hero-video-poster.jpg` | 159 KB | poster | OK |
| `public/images/logo.png` | 70 KB | logo | OK (kicsi), de SVG-re cserélhető — már van `logo.svg` is |
| `public/images/gallery/*.jpg` (79 db) | **2-4 MB / kép** | referenciák, mosaic, hero háttér | **összesen ~250 MB**, közvetlenül kiszolgálva |

**Lazy-loading állapot:**
- `<img>` tag-ek: **mindenhol `loading="lazy"`** ✅
- **`PageHero.tsx` `bgImage` viszont CSS background-image-et használ** → ez **NEM lazy-loadable**, és **3-4 MB-os gallery képek** vannak hero háttérnek (pl. `Screenshot_20211014-220249_Gallery.jpg` 3-4 MB az above-the-fold-on minden aloldalon). **Kritikus probléma.**

**WebP konverzió:** sehol nincs WebP. A galéria újrakódolása WebP/AVIF-be 80-90%-os méretcsökkenést hozna (4 MB → 300-500 KB).

**Javaslatok ranglista (LCP-prioritás):**
1. **Home hero videó (12 MB) → `preload="metadata"`** (most `auto`) — 1 sor edit, nagy nyereség
2. **PageHero `bgImage` 3-4 MB gallery JPG-k → WebP, ~300 KB** — `<picture>` + lazy + retina változatok
3. **79 gallery JPG → WebP batch konverzió** — `sharp` npm script vagy egyszeri offline futtatás
4. **`hero-cnc.png` (2.3 MB) törlése**, ha nem referenciát kap kódból (gyors ellenőrzés)

---

## 4. Render-blokkoló erőforrások (`index.html` `<head>`)

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600&family=Space+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet" />
```

- A `preconnect` jó ✅
- A Google Fonts `<link rel="stylesheet">` **render-blokkoló** (sok font-súly + 3 család egyszerre = 30-50 KB CSS, plusz a tényleges woff2-k)
- `display=swap` ✅ (legalább a szövegek nem várnak FOIT-tel)

**Javaslat:** vagy
- **self-hosted fonts** (Vite-tel könnyen, kisebb font-súly készlettel — csak 400, 500, 700 mindegyikből), vagy
- **preload + onload trick** a CSS-re: `<link rel="preload" as="style" onload="this.rel='stylesheet'" ...>`

Ez **prioritás 2** (Core Web Vitals LCP segít), de nem blokkolja a SEO-bevezetést.

A `<script type="module" src="/src/main.tsx"></script>` defer-szerűen tölt (ES module = `defer`), így nem render-blokkoló. ✅

---

## 5. sitemap.xml + robots.txt

| Fájl | Helyzet |
|---|---|
| `public/sitemap.xml` | **HIÁNYZIK** |
| `public/robots.txt` | **HIÁNYZIK** |

A Google ezeket úgyis megtalálja kanyargós úton, de explicit jelenlétük gyorsabb indexelést és tisztább crawl-budgetet ad. **Mindkettő statikus fájlként mehet a `public/`-ba, Vite változtatás nélkül kiszolgálja.**

---

## 6. Belső linkstruktúra

Az audit a hub-és-spoke konverziós oldalakra fókuszál: minden oldalról legyen elérhető a **`/kapcsolat` (= ajánlatkérés)** és a **`/referenciak`** (bizalmi proof).

| Oldal | → /kapcsolat | → /referenciak | → /szolgaltatasok | Hiányzó link |
|---|---|---|---|---|
| `/` (Home) | ✅ (2× gomb) | ✅ (Hero + kártyák) | ✅ (Hero) | – |
| `/rolunk` | ✅ (CTA box) | ❌ | ❌ | **/referenciak, /szolgaltatasok** |
| `/szolgaltatasok` | ✅ (kártyák + CTA) | ✅ (CTA box) | – | – |
| `/referenciak` | ✅ (CTA box) | – | ✅ (CTA box) | – |
| `/geppark` | ✅ (CTA box) | ❌ | ✅ (CTA box) | **/referenciak** |
| `/kapcsolat` | – | ❌ | ❌ | (destination — alacsony prioritás) |
| `/adatvedelem` | ❌ | ❌ | ❌ | (jogi — alacsony prioritás) |

**Konkrét javítások:**
1. `/rolunk` CTA-szakaszában adjunk hozzá természetes szöveges linket `/referenciak`-ra és `/szolgaltatasok`-ra (ne csak gomb).
2. `/geppark` zárószakaszban link `/referenciak`-ra.

**Ezeken túl** — ha megépítjük a 6 szolgáltatás-aloldalt — minden szolgáltatás-aloldalról automatikusan kell:
- 1× link a `/kapcsolat`-ra (CTA)
- 1× link a `/referenciak`-ra (releváns iparági projektek)
- 1× link a hub `/szolgaltatasok`-ra (visszanavigálás)
- 2-3× horizontális link a kapcsolódó másik szolgáltatás-aloldalakra (pl. CNC marás → CNC esztergálás)

---

## 7. JSON-LD strukturált adat

| Schema | Jelenleg | Cél |
|---|---|---|
| `LocalBusiness` | **nincs** | Kell minden oldalon |
| `Service` | **nincs** | Kell minden szolgáltatás-aloldalon |
| `BreadcrumbList` | **nincs** | Opcionális, jó-de-nem-kritikus |
| `Organization` | nincs | `LocalBusiness` kiterjesztésével fedve |
| `WebSite` (sitelinks search) | nincs | Nem prioritás (nincs site-search) |

Az `useSEO` hook **támogatja a `jsonLd` paramétert** — ez egyszerű bevezetés.

### LocalBusiness — szükséges mezők

| Mező | Jelenleg ismert | Hiányzó |
|---|---|---|
| `@type` | `LocalBusiness` | – |
| `name` | "MetalFusion" | **Kft. / Bt. / Zrt. utótag** |
| `image` | logo.png / logo.svg | URL formába kell tenni |
| `telephone` | `+36 20 333 1218` | ✅ |
| `email` | `info@metalfusion.hu` | ✅ |
| `address.streetAddress` | "Kozma utca" | **házszám hiányzik** |
| `address.addressLocality` | "Budapest" | ✅ |
| `address.postalCode` | "1108" | ✅ |
| `address.addressCountry` | – | "HU" |
| `geo.latitude` | `47.4783` | ✅ |
| `geo.longitude` | `19.1880` | ✅ |
| `openingHours` | "Mo-Fr 07:00-16:00" | ✅ |
| `url` | – | `https://metalfusion.hu` (vagy a tényleges domain) |
| `vatID` | – | adószám (opcionális, ajánlott) |
| `taxID` | – | cégjegyzékszám (opcionális, ajánlott) |

---

## 8. Egyéb találatok

- **`document.documentElement.lang`**: az `i18n.tsx` `applyLanguageToDom` futtatáskor beállítja a `lang` attribútumot, de az `index.html` `<html lang="en">` a kezdeti renderben. **Javasolt: `<html lang="hu">`** az index.html-ben.
- **Favicon**: van `favicon.svg` (jó), nincs PNG fallback régi böngészőknek (alacsony prioritás).
- **Canonical URL**: jelenleg sehol nincs `useSEO`-ban megadva — minden oldalnak kellene egy canonical-je az élés domain-nel.
- **OG image**: nincs sehol megadva. Social megosztásnál nem lesz preview kép. **Kell egy 1200×630 OG kép** (céges logó + tagline).
- **Twitter Card**: `summary` van, OG image után automatikusan `summary_large_image` lenne — kellene OG kép.
- **Adatvédelem oldal**: a meta description csonka ("MetalFusion privacy information for contact form submissions and quote requests." = 80 char). Bővíthető 140+-ra, vagy `noindex`-szel kivonható az indexből.
- **404 oldal**: kell `meta name="robots" content="noindex"`.

---

## 9. Action items — prioritás szerint

### P0 — SEO bevezetés blokkolói (most kell megcsinálni)

1. **HU-ra fordítani minden title és description-t** az `useSEO` hívásokban (7 oldal + 6 új sub-page)
2. **`og:locale` = `hu_HU`**, `<html lang="hu">` index.html-ben
3. **LocalBusiness JSON-LD** bevezetése egy közös segéd-konstans + minden oldalon a `useSEO` `jsonLd` param-ján keresztül
4. **6 szolgáltatás-aloldal** megépítése (`/szolgaltatasok/cnc-maras` stb.) + Service schema mindegyiken
5. **sitemap.xml + robots.txt** a public/-ba
6. **NotFound oldalra `noindex`**
7. **Alt szöveg refaktor** — főkulcsszó-tartalom, HU verzió legyen alapnyelv

### P1 — Core Web Vitals (LCP/CLS azonnali hatás)

8. Home hero video `preload="auto"` → `preload="metadata"`
9. `PageHero bgImage` → WebP, ~300 KB / kép (a 3-4 MB hero háttérkép a legdurvább LCP-rontó)
10. Galéria 79 JPG → WebP batch (offline `sharp` script)
11. Google Fonts → self-hosted vagy preload+onload, kevesebb font-súly

### P2 — Finomítás (utána)

12. Belső szöveges link `/rolunk` és `/geppark` oldalakon `/referenciak`-ra
13. Adatvedelem description bővítése vagy `noindex`
14. OG image (1200×630) tervezése + minden oldalra beállítása
15. Breadcrumb JSON-LD (csak Plus érték, nem kötelező)

---

## 10. Még szükséges adatok a teljes implementációhoz

Az alábbi pontoknál placeholder marad a kódban, amíg a felhasználó meg nem adja:

- [ ] **Pontos utca + házszám** (jelenleg csak "Kozma utca")
- [ ] **Cég pontos neve** (Kft. / Bt. / Zrt. utótag) a LocalBusiness `name`-hez
- [ ] **Élő domain** a canonical URL-ekhez és sitemap-hez (`https://metalfusion.hu`?)
- [ ] **OG-kép** (1200×630 PNG/JPG) — vagy generálni, vagy mellékelni
- [ ] (Opcionális) Cégjegyzékszám és adószám a JSON-LD-hez
- [ ] (Opcionális) Google Maps tényleges Place URL — ha be van regisztrálva Google Business Profile-on

**A felhasználó által nem szolgáltatott adatok hiányában** a `changelog.md` minden ilyen TODO-t expliciten fel fog sorolni.
