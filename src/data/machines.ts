export interface Machine {
  name: string;
  type: string;
  specs: string[];
  image: string;
}

export const machines: Machine[] = [
  {
    name: 'Hurco VM10i',
    type: '3-tengelyes CNC megmunkálóközpont',
    specs: ['Munkatér 660 × 406 × 508 mm', '10 000 ford/perc', 'WinMax vezérlés'],
    image: '/images/gallery/nagygép1.jpg',
  },
  {
    name: 'Hurco VMX24',
    type: '4-tengelyes CNC megmunkálóközpont',
    specs: ['Munkatér 610 × 508 × 610 mm', '12 000 ford/perc', '4. tengely opció'],
    image: '/images/gallery/nagygép2.jpg',
  },
  {
    name: 'Hwacheon Cutex 160A',
    type: 'CNC eszterga, hajtott szerszámokkal',
    specs: ['Tokmány Ø200 mm', 'Forgácsolt átmérő Ø340 mm', 'Y-tengely opció'],
    image: '/images/gallery/nagygép3.jpg',
  },
  {
    name: 'Doosan Puma 2600',
    type: 'CNC eszterga',
    specs: ['Tokmány Ø300 mm', 'Forgácsolt hossz 1085 mm', 'Tengelygyártáshoz'],
    image: '/images/gallery/nagygép4.jpg',
  },
  {
    name: 'Hagyományos marógép',
    type: 'Egyedi és segédműveleti gép',
    specs: ['Munkatér 800 × 320 mm', 'Egyedi felfogás', 'Gyors átszerelés'],
    image: '/images/gallery/nagygép5.jpg',
  },
  {
    name: 'Mérőeszközök',
    type: 'Minőségellenőrzés',
    specs: ['Digitális tolómérők, mikrométerek', 'Magasságmérő', 'Mérőjegyzőkönyv kérésre'],
    image: '/images/Magunkról.jpg',
  },
];
