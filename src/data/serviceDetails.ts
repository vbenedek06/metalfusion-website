// Per-service HU content for the /szolgaltatasok/<slug> sub-pages.
// Each entry drives the ServiceDetail page: SEO meta, hero, intro, specs,
// related-services links and JSON-LD Service schema.

export interface ServiceDetail {
  slug: string;
  // Page-level SEO
  metaTitle: string;
  metaDescription: string;
  // Page content
  eyebrow: string;
  h1: string;
  lead: string;
  intro: string;
  bgImage: string;
  // What we offer (bullet list)
  capabilities: string[];
  // Technical parameters
  parameters: { label: string; value: string }[];
  // Typical applications / examples
  applications: string[];
  // Materials we work with on this service
  materials: string[];
  // Related sub-page slugs to cross-link
  relatedSlugs: string[];
}

export const serviceDetails: ServiceDetail[] = [
  {
    slug: 'cnc-maras',
    metaTitle: 'CNC marás Budapest — 3- és 4-tengelyes | MetalFusion',
    metaDescription:
      'CNC marás Budapesten 3- és 4-tengelyes Hurco megmunkálóközpontokon. Acél, alumínium, műanyag, ±0,01 mm tűrés. Prototípus és sorozat egy műhelyben.',
    eyebrow: 'Szolgáltatás',
    h1: 'CNC marás Budapesten — 3- és 4-tengelyes megmunkálóközpontokon',
    lead: 'Hurco megmunkálóközpontokon precíziós marás acél, alumínium, rézötvözet és műanyag alkatrészekhez, ±0,01 mm tűréssel.',
    intro:
      'Egyedi szerszámokat, tokozatokat, prototípusokat és sorozatdarabokat munkálunk meg 3- és 4-tengelyes Hurco megmunkálóközpontjainkon. A 4. tengely lehetővé teszi a komplex geometriájú alkatrészek egy befogással történő gyártását, ami kevesebb kezelési hibát és rövidebb átfutást eredményez.',
    bgImage: '/images/gallery/nagygep1.webp',
    capabilities: [
      '3-tengelyes Hurco VM10i kompakt megmunkálóközpont',
      '4-tengelyes Hurco VMX24 nagyobb munkatérrel',
      'Munkatér akár 660 × 406 × 508 mm (VM10i) és 610 × 508 × 610 mm (VMX24)',
      'Orsófordulat 10 000–12 000 rpm',
      '20–24 pozíciós szerszámtár, gyors átállás',
      'Tűrés akár ±0,01 mm',
    ],
    parameters: [
      { label: 'Tengelyek', value: '3 vagy 4' },
      { label: 'Munkatér (VM10i)', value: '660 × 406 × 508 mm' },
      { label: 'Munkatér (VMX24)', value: '610 × 508 × 610 mm' },
      { label: 'Orsófordulat', value: '10 000 / 12 000 rpm' },
      { label: 'Tűrés', value: '±0,01 mm' },
      { label: 'Vezérlés', value: 'Hurco WinMax' },
    ],
    applications: [
      'Egyedi szerszámok és készülékek',
      'Tokozatok és borítók',
      'Prototípusok',
      'Sorozatdarabok 10–10 000 db között',
      'Komplex geometriájú alkatrészek (4. tengely)',
    ],
    materials: [
      'Szerkezeti acél (S235, S355)',
      'Nemesített acél (42CrMo4, C45)',
      'Rozsdamentes acél (V2A, V4A)',
      'Alumínium ötvözetek',
      'Sárgaréz, vörösréz',
      'Műszaki műanyagok (POM, PA, PEEK)',
    ],
    relatedSlugs: ['cnc-esztergalas', 'prototipusgyartas', 'sorozatgyartas'],
  },
  {
    slug: 'cnc-esztergalas',
    metaTitle: 'CNC esztergálás Budapest — hajtott szerszámmal | MetalFusion',
    metaDescription:
      'Hajtott szerszámos CNC esztergálás Budapesten Ø3–Ø250 mm tartományban. Tengelyek, perselyek, komplett forgástestek egy befogásban, sorozatban is.',
    eyebrow: 'Szolgáltatás',
    h1: 'CNC esztergálás Budapesten — hajtott szerszámos megmunkálás',
    lead: 'Hwacheon Cutex 160A és Doosan Puma 2600 CNC esztergagépeken tengelyek, perselyek és komplett forgástestek gyártása.',
    intro:
      'A Hwacheon Cutex 160A hajtott szerszámos eszterga Y-tengely lehetőséggel: az esztergálási, marási és fúrási műveletek egy befogásban végezhetők, ami gyors és pontos gyártást tesz lehetővé. Nagyobb tengelyekhez és hosszú forgástestekhez a Doosan Puma 2600 robusztus esztergát használjuk, akár ~1 méteres munkadarabhosszig.',
    bgImage: '/images/gallery/nagygep3.webp',
    capabilities: [
      'Hajtott szerszámos Hwacheon Cutex 160A Y-tengellyel',
      'Doosan Puma 2600 nagyobb forgástestekhez',
      'Átmérő tartomány Ø3 – Ø250 mm (esztergálás)',
      'Tokmány Ø200 mm (Hwacheon), Ø300 mm (Doosan)',
      'Megmunkálási hossz akár 1085 mm (Doosan)',
      'Egy befogásban végzett esztergálás + marás + fúrás',
    ],
    parameters: [
      { label: 'Átmérő tartomány', value: 'Ø3 – Ø250 mm' },
      { label: 'Tokmány (Hwacheon)', value: 'Ø200 mm' },
      { label: 'Tokmány (Doosan)', value: 'Ø300 mm' },
      { label: 'Megmunkálási hossz (Doosan)', value: '1085 mm' },
      { label: 'Extra', value: 'Hajtott szerszámok, Y-tengely' },
      { label: 'Sorjázás', value: 'Egy felfogásban' },
    ],
    applications: [
      'Tengelyek (rövid és hosszú)',
      'Perselyek',
      'Komplett forgástestek',
      'Esztergált és mart alkatrészek egy befogásban',
      'Egyedi és sorozatgyártott darabok',
    ],
    materials: [
      'Szerkezeti és nemesített acél',
      'Rozsdamentes acél',
      'Alumínium ötvözetek',
      'Sárgaréz, vörösréz, bronz',
      'Műszaki műanyagok',
    ],
    relatedSlugs: ['cnc-maras', 'sorozatgyartas', 'komplett-mechanika'],
  },
  {
    slug: 'prototipusgyartas',
    metaTitle: 'Prototípusgyártás Budapest — gyors precíz | MetalFusion',
    metaDescription:
      'Egyedi prototípusgyártás Budapesten műhelyrajz vagy 3D modell alapján. STEP, IGES, DWG fájlok, mérnöki egyeztetés, gyors átfutás. 24 órás ajánlat.',
    eyebrow: 'Szolgáltatás',
    h1: 'Prototípusgyártás Budapesten — egyedi darabok rajzból vagy 3D modellből',
    lead: 'Termékfejlesztéshez gyors és pontos prototípusgyártás: a modelltől a kész alkatrészig egy műhelyben, rugalmas ütemezéssel.',
    intro:
      'Egy darabtól is dolgozunk. A prototípusoknál külön figyelünk a gyárthatóságra, hogy az alkatrész később sorozatgyártásra is előkészíthető legyen. A felelős mérnök 24 órán belül visszajelez ajánlattal, gyárthatósági javaslattal és reális határidővel.',
    bgImage: '/images/gallery/m1d.webp',
    capabilities: [
      'Egy darabtól is vállalunk gyártást',
      'STEP, IGES, DWG, STL, PDF fájlformátumok',
      'Mérnöki egyeztetés a gyárthatóságról',
      'Gyors átfutás (akár néhány nap)',
      'Felelős mérnök, nem call center',
      'Sorozatgyártásra előkészített prototípus, ha kell',
    ],
    parameters: [
      { label: 'Mennyiség', value: '1 darabtól' },
      { label: 'Fájlformátumok', value: 'STEP · IGES · DWG · STL · PDF' },
      { label: 'Tűrés', value: '±0,01 mm' },
      { label: 'Átfutás', value: '3–21 munkanap (komplexitástól függően)' },
      { label: 'Ajánlat válasz', value: '< 24 óra' },
      { label: 'Mérési jegyzőkönyv', value: 'kérésre' },
    ],
    applications: [
      'Új termékfejlesztés első darabjai',
      'Funkciópróba alkatrészek',
      'Bemutató és minta darabok',
      'Műszaki tervek validációja',
      'Sorozatgyártást megelőző iteráció',
    ],
    materials: [
      'Acél (szerkezeti és nemesített)',
      'Rozsdamentes acél',
      'Alumínium',
      'Réz, sárgaréz, bronz',
      'Műszaki műanyagok (POM, PA, PEEK)',
    ],
    relatedSlugs: ['cnc-maras', 'cnc-esztergalas', 'szerszamgyartas'],
  },
  {
    slug: 'szerszamgyartas',
    metaTitle: 'Szerszámgyártás Budapest — sajtoló öntő | MetalFusion',
    metaDescription:
      'Alakos öntőszerszámok, sajtoló- és vágószerszámok, fúrósablonok és gyártási készülékek Budapesten. Tervezéstámogatástól a gyártásig egy műhelyben.',
    eyebrow: 'Szolgáltatás',
    h1: 'Szerszám- és készülékgyártás Budapesten',
    lead: 'Alakos öntőszerszámok, sajtoló- és vágószerszámok, fúrósablonok és gyártási készülékek a tervezéstámogatástól a kivitelezésig.',
    intro:
      'Komplett szerszám- és készülékgyártási megoldásokat adunk alakos öntőszerszámokhoz, sajtoló- és vágószerszámokhoz, fúrósablonokhoz és gyártási készülékekhez. Tervezéstámogatást is biztosítunk, hogy a kész szerszám valóban gyártásra optimalizált legyen.',
    bgImage: '/images/gallery/nagygep4.webp',
    capabilities: [
      'Alakos öntőszerszámok',
      'Sajtoló- és vágószerszámok',
      'Fúrósablonok',
      'Gyártási készülékek és felfogók',
      'Tervezéstámogatás a kivitelezés előtt',
      'Egyedi geometriák szoros tűréssel',
    ],
    parameters: [
      { label: 'Tűrés', value: '±0,01 mm' },
      { label: 'Megmunkálás', value: '3- és 4-tengelyes CNC marás + esztergálás' },
      { label: 'Méret', value: 'akár 1500 × 800 × 600 mm munkadarabig' },
      { label: 'Anyagok', value: 'szerszámacél, nemesített acél, rozsdamentes' },
      { label: 'Dokumentáció', value: 'mérési jegyzőkönyv kérésre' },
    ],
    applications: [
      'Műanyagipari sajtolószerszámok',
      'Fémipari vágó- és hajlítószerszámok',
      'Fúrási és összeszerelési készülékek',
      'Gyártósori felfogók',
      'Prototípus és sorozat szerszámok',
    ],
    materials: [
      'Szerszámacél',
      'Nemesített acél (42CrMo4)',
      'Rozsdamentes acél',
      'Alumínium ötvözetek (gyártási készülékekhez)',
    ],
    relatedSlugs: ['cnc-maras', 'cnc-esztergalas', 'komplett-mechanika'],
  },
  {
    slug: 'sorozatgyartas',
    metaTitle: 'Kis- és nagyszériás gyártás Budapest | MetalFusion',
    metaDescription:
      'Sorozatgyártás Budapesten 10-től 10 000 darabig kötött határidőkkel. Mérési jegyzőkönyv kérésre. Heti és havi rendszerességű futások beszállítóként.',
    eyebrow: 'Szolgáltatás',
    h1: 'Kis- és nagyszériás gyártás Budapesten',
    lead: 'Megbízható ütemezés és állandó minőség 10-től 10 000 darabos szériákban, heti vagy havi rendszerességű futásokkal.',
    intro:
      'Heti vagy havi rendszerességű ismétlődő gyártásokat vállalunk. Minden batch minőségellenőrzésen megy át, kötött határidőkkel. Ipari beszállítóként hosszú távon számíthat ránk.',
    bgImage: '/images/gallery/1.webp',
    capabilities: [
      'Sorozatgyártás 10–10 000 darabig',
      'Heti vagy havi rendszerességű ismétlődő futás',
      'Kötött határidők',
      'Minden batch minőségellenőrzéssel',
      'Mérési jegyzőkönyv kérésre',
      'Saját műhely, dokumentált folyamat',
    ],
    parameters: [
      { label: 'Sorozatnagyság', value: '10 – 10 000 db' },
      { label: 'Tűrés', value: '±0,01 mm' },
      { label: 'Átfutás', value: '3–21 munkanap (sorozatmérettől függően)' },
      { label: 'Ismétlés', value: 'heti vagy havi futások' },
      { label: 'Minőség', value: 'batch-szintű ellenőrzés' },
      { label: 'Dokumentáció', value: 'mérési jegyzőkönyv kérésre' },
    ],
    applications: [
      'Ismétlődő ipari alkatrész-gyártás',
      'Gépépítő beszállítói futások',
      'Gyógyszer- és orvostechnikai komponensek',
      'Csomagolástechnikai részegységek',
      'Élelmiszeripari alkatrészek',
    ],
    materials: [
      'Szerkezeti és nemesített acél',
      'Rozsdamentes acél (V2A, V4A)',
      'Alumínium ötvözetek',
      'Sárgaréz, vörösréz',
      'Műszaki műanyagok',
    ],
    relatedSlugs: ['cnc-maras', 'cnc-esztergalas', 'komplett-mechanika'],
  },
  {
    slug: 'komplett-mechanika',
    metaTitle: 'Komplett mechanikai gyártás Budapest | MetalFusion',
    metaDescription:
      'Gépek, részegységek és komplett berendezések mechanikai gyártása Budapesten alkatrésztől összeszerelésig. Egy felelős partner, dokumentált folyamat.',
    eyebrow: 'Szolgáltatás',
    h1: 'Komplett mechanikai gyártás Budapesten',
    lead: 'Gépek, szerelvények és részegységek teljes legyártása az alkatrésztől az összeszerelésig egy felelős partnerrel.',
    intro:
      'Csomagológépek, orvosi eszközök és ipari berendezések komplett mechanikai gyártását vállaljuk, az alkatrészgyártással és az összeszereléssel együtt. Egy felelős kapcsolattartó, dokumentált gyártási folyamat a teljes gyártási láncon át.',
    bgImage: '/images/gallery/a-1.webp',
    capabilities: [
      'Komplett gépek mechanikai gyártása',
      'Részegységek és szerelvények',
      'Alkatrészgyártás + összeszerelés egy helyen',
      'Egy felelős kapcsolattartó',
      'Dokumentált gyártási folyamat',
      'Hegesztés és felületkezelés is',
    ],
    parameters: [
      { label: 'Méret', value: 'akár 1500 × 800 × 600 mm alkatrész' },
      { label: 'Tűrés', value: '±0,01 mm' },
      { label: 'Folyamat', value: 'tervezéstől összeszerelésig' },
      { label: 'Anyagok', value: 'rozsdamentes acél, szerkezeti acél, alumínium' },
      { label: 'Dokumentáció', value: 'gyártási folyamat dokumentálva' },
    ],
    applications: [
      'Gyógyszercsomagoló gépek mechanikája',
      'Orvostechnikai berendezések',
      'Csomagolástechnikai gépek',
      'Egyedi ipari gépek és modulok',
      'Részegységek külső beszállítóként',
    ],
    materials: [
      'Rozsdamentes acél (V2A, V4A) — élelmiszeripari, gyógyszeripari elvárásokhoz',
      'Szerkezeti és nemesített acél',
      'Alumínium szerkezeti elemek',
      'Műszaki műanyagok funkcionális részekhez',
    ],
    relatedSlugs: ['cnc-maras', 'cnc-esztergalas', 'szerszamgyartas'],
  },
];

export function getServiceDetail(slug: string): ServiceDetail | undefined {
  return serviceDetails.find((s) => s.slug === slug);
}
