# Következő lépés — `/goal` prompt (production-ready befejezés)

> Holnap, ha újra van tokened, Claude Code-ban futtasd: **`/goal`** + másold be az alábbi „PROMPT" blokk teljes szövegét.
> Ez 5 hiányzó, fontos területet old meg: működő kapcsolati form, spam-védelem, impresszum, prerender/SEO, GA4 + cookie consent.

---

## Mielőtt elindítod — szükséges adatok

| Kell | Honnan | Megvan? |
|---|---|---|
| **Web3Forms access key** (form emailküldés) | web3forms.com — ingyenes, email megadásával | ☐ |
| **GA4 Measurement ID** (`G-XXXX`) | analytics.google.com → új property | ☐ |
| **Search Console verifikációs tag** | search.google.com/search-console | ☐ |
| **Élő domain** megerősítése | tényleg `metalfusion.hu`? | ☐ |
| **Cégadatok** (impresszumhoz) | cégjegyzékszám, adószám, házszám, cégnév-utótag (Kft./Bt./Zrt.) | ☐ |

Ha valamelyik nincs meg, a prompt akkor is lefut — placeholderrel dolgozik, és a végén megmondja, mit kell pótolnod.

---

## PROMPT (ezt másold a `/goal` után)

```text
CÉL: A MetalFusion weboldal (Vite + React + TypeScript SPA) productionre kész állapotba hozása 5 hiányzó, fontos területen. Dolgozz végig MINDEN feladatot, amíg kész és ellenőrzött. Tartsd meg a jelenlegi ipari/fém dizájnt (dark+light téma), ne törd el a meglévő működést. Magyar piacra készül.

FONTOS MUNKAMÓD:
- Minden szakasz után futtass: `npm run build`, `npm run typecheck`, `npm test` — egyiknek sem szabad elhasalnia.
- Vizuális ellenőrzéshez a headless Chrome ablaknak ~500px minimuma van; valódi telefon-szélességhez CDP `Emulation.setDeviceMetricsOverride`-ot használj (lásd memory/mobile-screenshot-verification).
- A NAP-adatok (cím, telefon, email, cégnév) forrása a `src/data/seo.ts` — ha látható helyen módosítasz adatot, ott is szinkronizáld (lásd CHANGELOG.md 5. szakasz).
- Ahol titok/ID kell (GA4, email API kulcs, domain), használj `.env` változót `VITE_` prefixszel, tedd be `.env.example`-be, és a VÉGÉN listázd ki, mit kell a felhasználónak kitöltenie. SOHA ne commitolj valódi kulcsot.
- A végén írj egy rövid összefoglalót a CHANGELOG.md-be.

FELADAT 1 — MŰKÖDŐ KAPCSOLATI FORM (legmagasabb prioritás)
Jelenleg a src/components/ContactForm.tsx csak `mailto:`-t nyit (window.location.href), ami megbízhatatlan. Cseréld valódi, szerver nélküli emailküldésre:
- Használj Web3Forms-ot (ingyenes, statikus oldalról működik, EU-barát): POST `https://api.web3forms.com/submit`, `access_key` a `VITE_WEB3FORMS_KEY` env változóból. (Ha jobbnak látod a Formspree-t, az is OK, de indokold.)
- Aszinkron submit: loading állapot a gombon (disabled + spinner/szöveg), majd siker- vagy hibaüzenet a form alatt (ne mailto, ne oldalváltás). A meglévő `status` state-et használd/bővítsd.
- Sikeres küldés után ürítsd a mezőket és mutass „Köszönjük, 24 órán belül válaszolunk" üzenetet.
- Validáció: kötelező mezők (név, email, üzenet), email formátum; hibák a mezőnél jelenjenek meg, jó kontraszttal mindkét témában.
- Tartsd meg a meglévő dizájnt és a mobil touch-méreteket. A „vagy írj közvetlenül info@metalfusion.hu" fallback maradjon.

FELADAT 2 — SPAM-VÉDELEM (a formhoz)
- Honeypot mező (rejtett input, pl. name="botcheck" / Web3Forms beépített `botcheck`), amit valódi user sosem tölt ki; ha ki van töltve, ne küldj.
- Időalapú védelem: ha a form <3 mp alatt lett kitöltve, gyanús — opcionális.
- (Opcionális, ha a Web3Forms támogatja) Cloudflare Turnstile beillesztés előkészítése env-kulccsal, de alapból a honeypot legyen aktív.

FELADAT 3 — IMPRESSZUM OLDAL
- Új oldal: src/pages/Impresszum.tsx + route `/impresszum` az App.tsx-ben + link a Footerben (és az Adatvédelem mellett).
- Tartalom az Ekertv. szerint, a src/data/seo.ts konstansaiból (COMPANY_NAME, STREET_ADDRESS, email, telefon) építve: cégnév, székhely, cégjegyzékszám, adószám, képviselő, email, telefon, tárhelyszolgáltató. Ahol nincs adat (cégjegyzékszám/adószám/házszám), tegyél egyértelmű `TODO_*` placeholdert, és a végén listázd.
- useSEO-val saját title/description + canonical + `noindex` NEM kell (indexelhető maradhat). Stílus illeszkedjen az Adatvédelem oldalhoz.
- A sitemap.xml-be vedd fel az /impresszum URL-t.

FELADAT 4 — PRERENDER / STATIKUS META (SEO + OG)
- A per-oldal meta most csak JS-ből áll be (useSEO), amit a közösségi crawlerek nem látnak. Oldd meg, hogy minden route statikus HTML-t kapjon a helyes title/description/canonical/OG/JSON-LD tagekkel.
- Elsődleges javaslat: `react-snap` (build utáni prerender, minimális kódváltozás) — integráld a package.json `postbuild` scriptbe, konfiguráld a route-listát (a sitemap/route-ok alapján), és győződj meg róla, hogy a useSEO által beállított `<head>` bekerül a statikus HTML-be.
- Ha react-snap nem stabil ezzel a setuppal, válts `vite-react-ssg`-re és végezd el a szükséges minimális route-refaktort.
- Ellenőrzés: build után a `dist/<route>/index.html` fájlokban a forrás-HTML-ben (JS futtatás NÉLKÜL) szerepeljen a helyes <title> és og: tag. Igazold legalább 3 oldalon (/, /szolgaltatasok, /kapcsolat).

FELADAT 5 — GA4 + SEARCH CONSOLE + KONVERZIÓMÉRÉS (consent mögött!)
- GA4: gtag betöltése a `VITE_GA4_ID` env-ből. NE töltsd be, amíg a felhasználó nem fogad el (lásd Feladat 6 — consent).
- SPA oldalváltás-követés: route változáskor küldj `page_view` eseményt (react-router useLocation).
- Konverziók: a kapcsolati form sikeres elküldése küldjön `generate_lead` eseményt; az „Ajánlatkérés" gombokra `cta_click` esemény. Ezek legyenek a Google Ads-ben konverzióként importálhatók.
- Google Search Console: tedd lehetővé a HTML-meta vagy DNS verifikációt — a meta verifikációs taghez `VITE_GSC_VERIFICATION` env, ami az index.html-be / prerender headbe kerül, ha meg van adva.
- Minden mérőkód GDPR-konform: alapból KIKAPCSOLVA, csak elfogadott consent után aktiválódik.

FELADAT 6 — COOKIE CONSENT SÁV (GDPR)
- Készíts egy cookie-consent komponenst (src/components/CookieConsent.tsx): alul/sarokban megjelenő sáv, „Elfogadom" / „Csak szükséges" / „Beállítások" gombokkal, link az Adatvédelemre.
- Kétnyelvű (HU/EN) az i18n rendszeren keresztül, a dizájnhoz illő, mobilon is jól kezelhető (touch-méretek), reduced-motion-barát.
- A döntést tárold localStorage-ban; a GA4/Ads CSAK „elfogadom" (analytics/marketing) után töltődjön be. Megtagadáskor semmi nem töltődik.
- Legyen mód a hozzájárulás visszavonására (link az Adatvédelem oldalon vagy a footerben).
- Frissítsd az Adatvédelem oldalt a cookie-szakasszal (milyen sütik, GA4 stb.).

ZÁRÁS
- Futtasd: build + typecheck + test → mind zöld.
- Vizuálisan ellenőrizd valódi 360/390px telefonszélességen: form (loading/siker/hiba), consent sáv, impresszum, hogy semmi se csússzon ki (nincs vízszintes scroll).
- A CHANGELOG.md-be írd be, mit csináltál és milyen env-változókat kell a felhasználónak kitöltenie.
- A legvégén EGY listában add meg a felhasználónak: milyen kulcsokat/ID-kat kell beszereznie és hova (VITE_WEB3FORMS_KEY, VITE_GA4_ID, VITE_GSC_VERIFICATION, élő domain), és milyen TODO_* adat maradt (házszám, cégjegyzékszám, adószám, cégnév-utótag).
```

---

## Sorrend / prioritás emlékeztető
1. **Working form + spam-védelem** — ez az oldal tényleges célja (ajánlatkérés), most nem működik megbízhatóan.
2. **Impresszum** — jogi kötelezettség (Ekertv.).
3. **Prerender** — enélkül a már megcsinált SEO/OG láthatatlan a crawlereknek.
4. **GA4 + konverziómérés** — mérés, hirdetés alapja.
5. **Cookie consent** — a GA4/Ads miatt jogilag kötelező.
