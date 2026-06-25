# MetalFusion — SEO forrásdokumentum

Ez a fájl a SEO-implementáció **igazságforrása**. Minden meta tag, JSON-LD, sitemap entry és belső link ebből épül. Ha eltérés van a kód és ezen dokumentum között, **ez nyer** (kivéve, ha a kód mögöttes adatában tényleges üzleti változás történt — akkor először ezt frissítjük).

A felhasználó döntései (2026-06-22):
- URL: **flat alap + 6 szolgáltatás-aloldal** (a `/szolgaltatasok` hub marad)
- SEO nyelv: **HU only** (EN tartalom marad UI-szinten, SEO-szempontból nem kezeljük külön)
- NAP-adatok: amennyi van a kódban, azt használjuk, hiányzó részekhez `TODO_*` placeholder + changelog entry

---

## 1. NAP — Name, Address, Phone (cégadatok)

A LocalBusiness JSON-LD-hez, az `Adatvedelem` oldalhoz, a Footer-hez és minden meta description-höz ezek a forrás-adatok.

| Mező | Érték | Forrás | Állapot |
|---|---|---|---|
| Cégnév | **MetalFusion** (utótag pontosítandó) | UI | ⚠️ `TODO_LEGAL_NAME` — `Kft.` / `Bt.` / `Zrt.` |
| Telephely (utca) | **Kozma utca** | `Kapcsolat.tsx` | ⚠️ `TODO_STREET_NUMBER` |
| Telephely (irányítószám) | **1108** | `Kapcsolat.tsx` | ✅ |
| Telephely (város) | **Budapest** | `Kapcsolat.tsx` | ✅ |
| Telephely (kerület) | **X. kerület (Kőbánya)** | `Rolunk.tsx` | ✅ |
| Ország | **HU** | – | ✅ |
| Földrajzi szélesség | **47.4783** | `Kapcsolat.tsx` map iframe | ✅ |
| Földrajzi hosszúság | **19.1880** | `Kapcsolat.tsx` map iframe | ✅ |
| Telefonszám | **+36 20 333 1218** | `Kapcsolat.tsx`, `Home.tsx`, `Rolunk.tsx` | ✅ |
| E-mail | **info@metalfusion.hu** | `Kapcsolat.tsx`, `Home.tsx`, `Rolunk.tsx` | ✅ |
| Nyitvatartás | **H–P 7:00–16:00** (Szo–V zárva) | `Kapcsolat.tsx` | ✅ |
| Aktív gyártás óta | **2010** | `Rolunk.tsx` | ✅ |
| Cégjegyzékszám | – | – | ⚠️ `TODO_REGISTRATION_NUMBER` (opcionális) |
| Adószám | – | – | ⚠️ `TODO_TAX_ID` (opcionális) |
| Élő domain | feltételezett: `https://metalfusion.hu` | – | ⚠️ `TODO_BASE_URL` — visszaigazolás kell |
| Logo URL | `/images/logo.png` és `/images/logo.svg` | `public/` | ✅ |
| OG-kép | – | – | ⚠️ `TODO_OG_IMAGE` (1200×630) |

**A `TODO_*` placeholder-ek a `src/data/seo.ts` konstansban szerepelnek**, és a `changelog.md` végén explicit listázásra kerülnek. Csere `Edit` tool-lal egysorosan elvégezhető, amint a felhasználó megadja a valódi értékeket.

---

## 2. Kulcsszó-klaszterek

Minden klasztert a meglévő szolgáltatás-szövegekből és a B2B gyártóipari intent-ből vezettem le, NEM találtam ki új kulcsszót. Mind helyi (Budapest), mind szolgáltatás-specifikus intent-re lőünk.

### 2.1 Főoldal (`/`)
**Fő kulcsszó:** `CNC alkatrészgyártás Budapest`
**Másodlagos:** precíziós megmunkálás, egyedi alkatrészgyártás, kis- és nagyszériás gyártás, fémmegmunkálás Budapest, CNC műhely

### 2.2 Rólunk (`/rolunk`)
**Fő:** `CNC műhely Budapest`
**Másodlagos:** MetalFusion Kft., precíziós fémipari beszállító, Kőbánya CNC műhely, ipari gyártó partner

### 2.3 Szolgáltatások hub (`/szolgaltatasok`)
**Fő:** `CNC megmunkálás Budapest`
**Másodlagos:** CNC marás esztergálás, szerszámgyártás, prototípusgyártás, sorozatgyártás, komplett mechanikai gyártás

### 2.4 CNC marás (`/szolgaltatasok/cnc-maras`)
**Fő:** `CNC marás Budapest`
**Másodlagos:** 3-tengelyes CNC marás, 4-tengelyes megmunkálóközpont, Hurco VM10i, Hurco VMX24, alumínium acél marás
**Tartalom-pontok:** anyagok (acél, alumínium, réz, műanyag), tűrés (±0.01 mm), munkatér (1500×800×600 mm), példa-alkalmazások (szerszámok, tokozatok, prototípus, sorozat)

### 2.5 CNC esztergálás (`/szolgaltatasok/cnc-esztergalas`)
**Fő:** `CNC esztergálás Budapest`
**Másodlagos:** hajtott szerszámos eszterga, Hwacheon Cutex 160A, Doosan Puma 2600, tengelygyártás, perselygyártás
**Tartalom-pontok:** átmérő tartomány (Ø3–Ø250 mm), Y-tengely, megmunkálási hossz, egy befogásban végzett műveletek

### 2.6 Prototípusgyártás (`/szolgaltatasok/prototipusgyartas`)
**Fő:** `prototípusgyártás Budapest`
**Másodlagos:** egyedi alkatrészgyártás, gyors prototípus, STEP IGES DWG, 3D modell alapján gyártás
**Tartalom-pontok:** mérnöki egyeztetés, fájlformátumok, fast turnaround, manufacturability feedback

### 2.7 Szerszámgyártás (`/szolgaltatasok/szerszamgyartas`)
**Fő:** `szerszámgyártás Budapest`
**Másodlagos:** alakos öntőszerszám, sajtolószerszám, vágószerszám, fúrósablon, gyártási készülék
**Tartalom-pontok:** tervezéstámogatás, példa iparágak, méret-paraméterek

### 2.8 Sorozatgyártás (`/szolgaltatasok/sorozatgyartas`)
**Fő:** `kis- és nagyszériás gyártás Budapest`
**Másodlagos:** sorozatgyártás 10-10000 db, ismétlődő gyártás, ipari beszállító, kötött határidők
**Tartalom-pontok:** batch-méret, mérési jegyzőkönyv, heti/havi futás

### 2.9 Komplett mechanikai gyártás (`/szolgaltatasok/komplett-mechanika`)
**Fő:** `komplett mechanikai gyártás Budapest`
**Másodlagos:** gépgyártás, csomagológép, részegység, mechanikai összeszerelés
**Tartalom-pontok:** tervtől összeszerelésig, dokumentált folyamat, példa-iparágak

### 2.10 Referenciák (`/referenciak`)
**Fő:** `MetalFusion referenciák`
**Másodlagos:** gyógyszeripari beszállító, orvostechnikai alkatrész, gépgyártó partner, csomagolástechnika

### 2.11 Géppark (`/geppark`)
**Fő:** `CNC géppark Budapest`
**Másodlagos:** Hurco megmunkálóközpont, Hwacheon eszterga, Doosan eszterga, 3D koordináta mérőgép

### 2.12 Kapcsolat (`/kapcsolat`)
**Fő:** `CNC ajánlatkérés Budapest`
**Másodlagos:** árajánlat alkatrészgyártásra, műhelyrajz alapján gyártás, 24 órás ajánlat

### 2.13 Adatvédelem (`/adatvedelem`)
Nem SEO-célzott (jogi). Meta description rövid, vagy `noindex`.

---

## 3. Oldaltérkép (URL-struktúra)

13 nyilvános URL + 404. Mind HU-célzott, mind `https://TODO_BASE_URL` alá kerül a canonical-ben.

| URL | Title (HU) | Type | Prioritás (sitemap) |
|---|---|---|---|
| `/` | MetalFusion — precíziós CNC alkatrészgyártás Budapesten | Home | 1.0 |
| `/rolunk` | Rólunk — 15+ éves CNC műhely Budapesten \| MetalFusion | About | 0.7 |
| `/szolgaltatasok` | Szolgáltatások — CNC megmunkálás és szerszámgyártás \| MetalFusion | Hub | 0.9 |
| `/szolgaltatasok/cnc-maras` | CNC marás Budapest — 3- és 4-tengelyes \| MetalFusion | Service | 0.8 |
| `/szolgaltatasok/cnc-esztergalas` | CNC esztergálás Budapest — hajtott szerszámmal \| MetalFusion | Service | 0.8 |
| `/szolgaltatasok/prototipusgyartas` | Prototípusgyártás Budapest — gyors precíz \| MetalFusion | Service | 0.8 |
| `/szolgaltatasok/szerszamgyartas` | Szerszámgyártás Budapest — sajtoló öntő \| MetalFusion | Service | 0.8 |
| `/szolgaltatasok/sorozatgyartas` | Kis- és nagyszériás gyártás Budapest \| MetalFusion | Service | 0.8 |
| `/szolgaltatasok/komplett-mechanika` | Komplett mechanikai gyártás Budapest \| MetalFusion | Service | 0.8 |
| `/referenciak` | Referenciák — gyártási projektek \| MetalFusion | List | 0.7 |
| `/geppark` | Géppark — CNC megmunkálóközpontok és esztergák \| MetalFusion | List | 0.7 |
| `/kapcsolat` | Kapcsolat — CNC ajánlatkérés 24 órán belül \| MetalFusion | Convert | 0.9 |
| `/adatvedelem` | Adatvédelmi tájékoztató — MetalFusion | Legal | 0.3 |
| `*` | 404 — Az oldal nem található \| MetalFusion | 404 | (sitemap-ben nincs, `noindex`) |

---

## 4. Meta tag sablon

Minden oldal `useSEO({ title, description, canonical, ogImage, jsonLd })` hívással szabályozza. A statikus `<head>` (index.html) HU-alapra változik.

### 4.1 Sablon
```ts
useSEO({
  title: '<oldal-specifikus title — max 60 karakter>',
  description: '<oldal-specifikus leírás — 140-160 karakter>',
  canonical: 'https://TODO_BASE_URL<route>',
  ogImage: '/images/og-default.jpg', // TODO_OG_IMAGE
  jsonLd: <oldal-specifikus JSON-LD vagy localBusinessSchema>,
});
```

### 4.2 Konkrét értékek oldalanként

| Route | Title (≤60) | Description (140–160) |
|---|---|---|
| `/` | MetalFusion — precíziós CNC alkatrészgyártás Budapesten *(60)* | Egyedi kis- és nagyszériás CNC alkatrészgyártás Budapesten. Precíziós megmunkálás, megbízható határidő, 24 órás ajánlat műhelyrajzból. *(146)* |
| `/rolunk` | Rólunk — 15+ éves CNC műhely Budapesten \| MetalFusion *(54)* | 2010 óta gyártunk egyedi CNC alkatrészeket Budapesten. Modern géppark, dokumentált minőség, mérnöki gondolkodás egy partnerrel. *(141)* |
| `/szolgaltatasok` | Szolgáltatások — CNC megmunkálás Budapest \| MetalFusion *(56)* | CNC marás, esztergálás, prototípusgyártás, szerszámgyártás, kis- és nagyszériás termelés, komplett mechanikai gyártás műhelyrajzból. *(149)* |
| `/szolgaltatasok/cnc-maras` | CNC marás Budapest — 3- és 4-tengelyes \| MetalFusion *(54)* | CNC marás 3- és 4-tengelyes Hurco megmunkálóközpontokon. Acél, alumínium, műanyag, ±0,01 mm tűrés. Prototípus és sorozat egy műhelyben. *(154)* |
| `/szolgaltatasok/cnc-esztergalas` | CNC esztergálás Budapest — hajtott szerszámmal *(48)* | Hajtott szerszámos CNC esztergálás Ø3–Ø250 mm tartományban. Tengelyek, perselyek, komplett forgástestek egy befogásban, sorozatban is. *(149)* |
| `/szolgaltatasok/prototipusgyartas` | Prototípusgyártás Budapest — gyors precíz \| MetalFusion *(58)* | Egyedi prototípusgyártás műhelyrajz vagy 3D modell alapján. STEP, IGES, DWG fájlok, mérnöki egyeztetés, gyors átfutás. 24 órás ajánlat. *(149)* |
| `/szolgaltatasok/szerszamgyartas` | Szerszámgyártás Budapest — sajtoló öntő \| MetalFusion *(56)* | Alakos öntőszerszámok, sajtoló- és vágószerszámok, fúrósablonok, gyártási készülékek. Tervezéstámogatástól a gyártásig egy műhelyben. *(145)* |
| `/szolgaltatasok/sorozatgyartas` | Kis- és nagyszériás gyártás Budapest \| MetalFusion *(55)* | Sorozatgyártás 10-től 10 000 darabig kötött határidőkkel. Mérési jegyzőkönyv kérésre. Heti és havi rendszerességű futások beszállítóként. *(148)* |
| `/szolgaltatasok/komplett-mechanika` | Komplett mechanikai gyártás Budapest \| MetalFusion *(53)* | Gépek, részegységek és komplett berendezések mechanikai gyártása alkatrésztől összeszerelésig. Egy felelős partner, dokumentált folyamat. *(151)* |
| `/referenciak` | Referenciák — gyártási projektek \| MetalFusion *(45)* | MetalFusion gyártási referenciák: gyógyszeripari, orvostechnikai, gépgyártó és csomagolástechnikai partnerek egyedi alkatrészei és gépei. *(146)* |
| `/geppark` | Géppark — Hurco, Hwacheon, Doosan CNC \| MetalFusion *(53)* | Hurco CNC megmunkálóközpontok, Hwacheon hajtott szerszámos eszterga, Doosan tengelyeszterga és precíziós 3D mérőeszközök egy műhelyben. *(149)* |
| `/kapcsolat` | Kapcsolat — CNC ajánlatkérés 24 órán belül \| MetalFusion *(55)* | Küldje el műhelyrajzát vagy 3D modelljét: 24 órán belül árajánlattal és gyárthatósági visszajelzéssel válaszolunk. Budapest, Kozma utca. *(147)* |
| `/adatvedelem` | Adatvédelmi tájékoztató \| MetalFusion *(36)* | A MetalFusion adatkezelési tájékoztatója a kapcsolatfelvételhez és ajánlatkéréshez tartozó személyes adatok GDPR-szerinti kezeléséről. *(145)* |
| 404 | 404 — Az oldal nem található \| MetalFusion *(43)* | A keresett oldal nem található. Térjen vissza a főoldalra, vagy nézze meg szolgáltatásainkat és referenciáinkat. *(120, `noindex`)* |

---

## 5. LocalBusiness JSON-LD

Közös konstans a `src/data/seo.ts`-ben. Minden oldal `useSEO` hívás `jsonLd` paraméterén kap.

```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://TODO_BASE_URL/#localbusiness",
  "name": "MetalFusion TODO_LEGAL_NAME",
  "url": "https://TODO_BASE_URL",
  "logo": "https://TODO_BASE_URL/images/logo.png",
  "image": "https://TODO_BASE_URL/images/logo.png",
  "telephone": "+36203331218",
  "email": "info@metalfusion.hu",
  "foundingDate": "2010",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Kozma utca TODO_STREET_NUMBER",
    "addressLocality": "Budapest",
    "postalCode": "1108",
    "addressRegion": "Budapest",
    "addressCountry": "HU"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 47.4783,
    "longitude": 19.1880
  },
  "openingHoursSpecification": [{
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    "opens": "07:00",
    "closes": "16:00"
  }],
  "areaServed": {
    "@type": "Country",
    "name": "Hungary"
  },
  "knowsAbout": [
    "CNC marás",
    "CNC esztergálás",
    "prototípusgyártás",
    "szerszámgyártás",
    "kis- és nagyszériás gyártás",
    "komplett mechanikai gyártás",
    "fémmegmunkálás"
  ]
}
```

### 5.1 Service schema (a 6 szolgáltatás-aloldalon, plusz a LocalBusiness mellé)
```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "<szolgáltatás magyar neve>",
  "serviceType": "<schema.org típus, pl. ManufacturingService>",
  "areaServed": { "@type": "Country", "name": "Hungary" },
  "provider": { "@id": "https://TODO_BASE_URL/#localbusiness" },
  "description": "<oldal description>",
  "url": "https://TODO_BASE_URL/szolgaltatasok/<slug>"
}
```

---

## 6. Belső linkstruktúra

Minden szolgáltatás-aloldal alján:
1. Természetes szöveges link a kapcsolódó másik szolgáltatás-aloldalakra (pl. CNC marás → CNC esztergálás, prototípusgyártás)
2. CTA link `/kapcsolat`-ra ("Kérjen ajánlatot")
3. Másodlagos link `/referenciak`-ra ("Lásd, milyen projekteken dolgoztunk")
4. Vissza a hub `/szolgaltatasok`-ra (breadcrumb)

Audit-javítások (lásd `seo-audit.md` 6. pont):
- `/rolunk` → természetes link `/referenciak` és `/szolgaltatasok`-ra
- `/geppark` → link `/referenciak`-ra

---

## 7. Sitemap és robots

`public/sitemap.xml` — 13 oldal, priority és `lastmod` mezővel. Mindegyik `<loc>https://TODO_BASE_URL{route}</loc>` formával.

`public/robots.txt`:
```
User-agent: *
Allow: /
Disallow: /adatvedelem

Sitemap: https://TODO_BASE_URL/sitemap.xml
```

*(megjegyzés: az Adatvédelem nem `Disallow`-olt, mert jogi tájékoztatóként Google fontosnak tartja a transzparenciát. Csak `noindex` lesz rajta. Lásd 4.2-ben a Privacy descr-t.)*

→ **A `robots.txt`-ben tehát `Disallow` nincs**, csak az `Adatvedelem` route-on `noindex` meta. Frissítendő:

```
User-agent: *
Allow: /

Sitemap: https://TODO_BASE_URL/sitemap.xml
```

---

## 8. Validáció

A `changelog.md`-ben oldalanként:
- Title hossz tényleg ≤ 60 (mérve karakter)
- Description hossz 140–160 között (mérve karakter)
- JSON-LD JSON.parse() hibamentes
- Canonical URL minden oldalon szerepel
- `og:locale` = `hu_HU` és `<html lang="hu">`

---

## 9. Frissítési protokoll (FIGYELEM!)

**Amikor a felhasználó megadja a `TODO_*` placeholder-eket** (házszám, cégnév utótag, élő domain, OG-kép, cégjegyzék, adószám), a következő helyeken kell átvezetni:

1. **`src/data/seo.ts`** — `localBusinessSchema` konstans
2. **`public/sitemap.xml`** — `<loc>` URL-ek
3. **`public/robots.txt`** — `Sitemap:` URL
4. **`index.html`** — `og:url`, statikus canonical, statikus meta description
5. **`src/pages/Kapcsolat.tsx`** — látható cím (csak ha házszám is változik)
6. **`src/pages/Adatvedelem.tsx`** — adatkezelő szakasz (csak ha cégadatok változnak)
7. **`src/components/Footer.tsx`** — látható cégnév és cím

**Ez a kötelezettség a memóriába is bekerült** (`memory/nap-seo-sync.md`), hogy a jövőbeli session-ök is figyelmeztessenek.
