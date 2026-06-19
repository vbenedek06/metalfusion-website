export interface Service {
  slug: string;
  title: string;
  short: string;
  description: string;
  bullets: string[];
}

export const services: Service[] = [
  {
    slug: 'cnc-maras',
    title: 'CNC marás',
    short: '3- és 4-tengelyes megmunkálóközpontok, komplex geometriák.',
    description:
      'Acél, alumínium, rézötvözetek és műanyagok marása. Egyedi szerszámok, tokozatok, prototípusok és sorozatdarabok megmunkálása szoros tűréssel.',
    bullets: ['3- és 4-tengelyes központok', 'Acél · alumínium · réz · műanyag', 'Tűrés akár ±0,01 mm'],
  },
  {
    slug: 'cnc-esztergalas',
    title: 'CNC esztergálás',
    short: 'Forgástestek, tengelyek, perselyek megmunkálása.',
    description:
      'Hajtott szerszámos esztergagépeken készülnek a tengelyek, perselyek és komplett forgástestek. Egydarabos megmunkálástól nagyszériáig.',
    bullets: ['Hajtott szerszámos eszterga', 'Átmérő tartomány Ø3 – Ø250 mm', 'Sorjázás és megmunkálás egy felfogásban'],
  },
  {
    slug: 'prototipusgyartas',
    title: 'Prototípusgyártás',
    short: 'Műhelyrajzból vagy 3D modellből egyedi darabok.',
    description:
      'Új termékfejlesztés esetén gyors, pontos prototípusgyártást vállalunk. A modelltől a kész alkatrészig egy helyen, rugalmas ütemezéssel.',
    bullets: ['STEP / IGES / DWG fájlok kezelése', 'Gyors átfutás', 'Egyeztetés mérnöki szinten'],
  },
  {
    slug: 'szerszamgyartas',
    title: 'Szerszám- és készülékgyártás',
    short: 'Öntő-, sajtoló- és alakos szerszámok.',
    description:
      'Alakos öntőszerszámok, sajtolószerszámok, fúrósablonok és gyártási készülékek tervezéséhez és gyártásához nyújtunk komplett megoldást.',
    bullets: ['Alakos öntőszerszámok', 'Sajtoló- és vágószerszámok', 'Gyártási készülékek, sablonok'],
  },
  {
    slug: 'kis-es-nagysorozat',
    title: 'Kis- és nagyszériás gyártás',
    short: 'Megbízható ütemezés, állandó minőség.',
    description:
      'Heti vagy havi rendszerességű ismétlődő gyártásokat is vállalunk. Minőségellenőrzés minden batch után, kötött határidőkkel.',
    bullets: ['Sorozatgyártás 10 – 10 000 db', 'Kötött határidők', 'Mérőjegyzőkönyv kérésre'],
  },
  {
    slug: 'komplett-mechanika',
    title: 'Komplett mechanikai gyártás',
    short: 'Berendezések és részegységek teljes legyártása.',
    description:
      'Csomagológépek, orvosi eszközök, ipari berendezések komplett mechanikai legyártása, beleértve az alkatrészek készítését és az összeszerelést.',
    bullets: ['Tervtől összeszerelésig', 'Egy felelős partner', 'Dokumentált gyártási folyamat'],
  },
];
