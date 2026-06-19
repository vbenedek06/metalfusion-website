export interface Machine {
  name: string;
  type: string;
  specs: string[];
  image: string;
  slug?: string;
  brand?: string;
  axes?: number;
  short?: string;
  description?: string;
  category?: 'milling' | 'turning' | 'manual' | 'quality';
  detailedSpecs?: { label: string; value: string }[];
  highlights?: string[];
  commissioned?: string;
}

export const machines: Machine[] = [
  {
    slug: 'hurco-vm10i',
    name: 'Hurco VM10i',
    brand: 'Hurco',
    axes: 3,
    type: '3-tengelyes CNC megmunkálóközpont',
    short: 'Sokoldalú belépő-szintű marógép pontos sorozatgyártáshoz.',
    description:
      'A Hurco VM10i kompakt 3-tengelyes megmunkálóközpont, amelyet kisebb és közepes méretű alkatrészek precíz marásához használunk. A WinMax vezérlés gyors átállást és intuitív programozást tesz lehetővé.',
    specs: ['Munkatér 660 × 406 × 508 mm', '10 000 ford/perc', 'WinMax vezérlés'],
    detailedSpecs: [
      { label: 'Tengely', value: '3' },
      { label: 'Munkatér (X×Y×Z)', value: '660 × 406 × 508 mm' },
      { label: 'Fordulatszám', value: '10 000 ford/perc' },
      { label: 'Vezérlés', value: 'Hurco WinMax' },
      { label: 'Szerszámtár', value: '20 pozíciós' },
    ],
    highlights: ['Egyedi marás', 'Prototípus', 'Kisszéria'],
    image: '/images/gallery/nagygep1.jpg',
    category: 'milling',
    commissioned: '2017',
  },
  {
    slug: 'hurco-vmx24',
    name: 'Hurco VMX24',
    brand: 'Hurco',
    axes: 4,
    type: '4-tengelyes CNC megmunkálóközpont',
    short: 'Komplex geometriák megmunkálása egyetlen befogással.',
    description:
      'A Hurco VMX24 4-tengelyes megmunkálóközpont nagyobb munkateret és 12 000 ford/perc orsót kínál. A 4. tengely lehetőséget ad komplex geometriák egy felfogásban történő gyártására — kevesebb hiba, gyorsabb átfutás.',
    specs: ['Munkatér 610 × 508 × 610 mm', '12 000 ford/perc', '4. tengely opció'],
    detailedSpecs: [
      { label: 'Tengely', value: '4' },
      { label: 'Munkatér (X×Y×Z)', value: '610 × 508 × 610 mm' },
      { label: 'Fordulatszám', value: '12 000 ford/perc' },
      { label: 'Vezérlés', value: 'Hurco WinMax' },
      { label: 'Szerszámtár', value: '24 pozíciós' },
    ],
    highlights: ['4. tengely', 'Komplex geometria', 'Egy befogás'],
    image: '/images/gallery/nagygep2.jpg',
    category: 'milling',
    commissioned: '2019',
  },
  {
    slug: 'hwacheon-cutex-160a',
    name: 'Hwacheon Cutex 160A',
    brand: 'Hwacheon',
    axes: 3,
    type: 'CNC eszterga, hajtott szerszámokkal',
    short: 'Hajtott szerszámos eszterga komplett forgástestek megmunkálásához.',
    description:
      'A Hwacheon Cutex 160A hajtott szerszámos esztergagép Y-tengely opcióval. Egy felfogásban végzünk esztergálási, marási és fúrási műveleteket, így a forgástestek gyorsan és pontosan készülnek.',
    specs: ['Tokmány Ø200 mm', 'Forgácsolt átmérő Ø340 mm', 'Y-tengely opció'],
    detailedSpecs: [
      { label: 'Típus', value: 'Hajtott szerszámos eszterga' },
      { label: 'Tokmány', value: 'Ø200 mm' },
      { label: 'Max átmérő', value: 'Ø340 mm' },
      { label: 'Forgácsolt hossz', value: '500 mm' },
      { label: 'Extra', value: 'Y-tengely' },
    ],
    highlights: ['Hajtott szerszám', 'Y-tengely', 'Forgástest'],
    image: '/images/gallery/nagygep3.jpg',
    category: 'turning',
    commissioned: '2018',
  },
  {
    slug: 'doosan-puma-2600',
    name: 'Doosan Puma 2600',
    brand: 'Doosan',
    axes: 2,
    type: 'CNC eszterga, nagyméretű tengelyekhez',
    short: 'Nagyméretű forgástestek és hosszú tengelyek megmunkálása.',
    description:
      'A Doosan Puma 2600 nagy tokmányú, hosszú forgácsolási úttal rendelkező eszterga. Tengelyek, perselyek és nagyméretű forgástestek gyártására ideális, akár 1 méteres munkadarab hosszig.',
    specs: ['Tokmány Ø300 mm', 'Forgácsolt hossz 1085 mm', 'Tengelygyártáshoz'],
    detailedSpecs: [
      { label: 'Típus', value: 'CNC eszterga' },
      { label: 'Tokmány', value: 'Ø300 mm' },
      { label: 'Max átmérő', value: 'Ø460 mm' },
      { label: 'Forgácsolt hossz', value: '1085 mm' },
      { label: 'Felhasználás', value: 'Tengelygyártás' },
    ],
    highlights: ['Nagy tokmány', 'Hosszú tengely', 'Robusztus'],
    image: '/images/gallery/nagygep4.jpg',
    category: 'turning',
    commissioned: '2020',
  },
  {
    slug: 'hagyomanyos-marogep',
    name: 'Hagyományos marógép',
    brand: 'Egyedi',
    axes: 3,
    type: 'Segéd- és egyedi műveleti gép',
    short: 'Gyors átállás, egyedi felfogások, kiegészítő műveletek.',
    description:
      'Hagyományos marógép a CNC gépeket kiegészítve: gyors egyedi felfogások, sorjázás, javítások és nem-sorozatjellegű feladatok elvégzésére. Ahol a CNC programozási idő nem lenne gazdaságos.',
    specs: ['Munkatér 800 × 320 mm', 'Egyedi felfogás', 'Gyors átszerelés'],
    detailedSpecs: [
      { label: 'Típus', value: 'Hagyományos marógép' },
      { label: 'Munkatér', value: '800 × 320 mm' },
      { label: 'Felhasználás', value: 'Egyedi műveletek' },
      { label: 'Erősség', value: 'Gyors átszerelés' },
    ],
    highlights: ['Egyedi felfogás', 'Sorjázás', 'Javítás'],
    image: '/images/gallery/nagygep5.jpg',
    category: 'manual',
  },
  {
    slug: 'meroeszkozok',
    name: 'Mérőeszközök',
    brand: 'Mitutoyo & co.',
    type: 'Minőségellenőrzés és dokumentált mérés',
    short: 'Dokumentált, ismételhető mérés minden megmunkálás után.',
    description:
      'Digitális tolómérők, mikrométerek, magasságmérő és 3D koordináta mérőgép. A mérési eredményeket kérésre dokumentált mérőjegyzőkönyvben adjuk át, így a beszállított alkatrészek tűréseit nyomon követhetően igazoljuk.',
    specs: ['Digitális tolómérők, mikrométerek', 'Magasságmérő', 'Mérőjegyzőkönyv kérésre'],
    detailedSpecs: [
      { label: 'Eszközök', value: 'Digitális tolómérő, mikrométer' },
      { label: 'Magasságmérő', value: 'Igen' },
      { label: '3D mérés', value: 'Koordináta mérőgép' },
      { label: 'Dokumentáció', value: 'Mérőjegyzőkönyv' },
    ],
    highlights: ['Ismételhető mérés', '3D CMM', 'Jegyzőkönyv'],
    image: '/images/gallery/20200827_133345.jpg',
    category: 'quality',
  },
];
