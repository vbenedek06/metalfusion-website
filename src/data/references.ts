export interface Reference {
  slug: string;
  title: string;
  client: string;
  industry: string;
  year: string;
  cover: string;
  summary: string;
  gallery: string[];
}

export const references: Reference[] = [
  {
    slug: 'gyogyszercsomagolo-gep',
    title: 'Egyedi gyógyszercsomagoló gép komplett mechanika',
    client: 'Osztrák gyógyszerészeti vállalat',
    industry: 'Gyógyszeripar',
    year: '2023',
    cover: '/images/gallery/Screenshot_20211014-220249_Gallery.jpg',
    summary:
      'Egyedi gyógyszercsomagoló berendezés teljes mechanikai gyártása rozsdamentes acél és alumínium szerkezeti elemekkel, élelmiszeripari előírások szerint.',
    gallery: [
      '/images/gallery/Screenshot_20211014-220245_Gallery.jpg',
      '/images/gallery/Screenshot_20211014-220249_Gallery.jpg',
      '/images/gallery/Screenshot_20211014-220252_Gallery.jpg',
      '/images/gallery/Screenshot_20211014-220256_Gallery.jpg',
      '/images/gallery/Screenshot_20211014-220301_Gallery.jpg',
    ],
  },
  {
    slug: 'robotkar-megfogo',
    title: 'Robotkar megfogó pofák',
    client: 'Automatizálási partner',
    industry: 'Gépgyártás',
    year: '2024',
    cover: '/images/gallery/20200827_133317.jpg',
    summary:
      'Precíziós megfogó pofák robotkarokhoz, ismételhető gyártással, dokumentált mérési jegyzőkönyvvel.',
    gallery: [
      '/images/gallery/20200827_133246.jpg',
      '/images/gallery/20200827_133308.jpg',
      '/images/gallery/20200827_133317.jpg',
    ],
  },
  {
    slug: 'nagy-zsaner',
    title: 'Nagy teherbírású zsanér',
    client: 'Ipari berendezésgyártó',
    industry: 'Acélipar',
    year: '2023',
    cover: '/images/gallery/3.jpg',
    summary:
      'Rozsdamentes alkatrész precíz megmunkálása, magas igénybevételhez méretezve.',
    gallery: [
      '/images/gallery/3.jpg',
      '/images/gallery/4.jpg',
    ],
  },
  {
    slug: 'hajlito-betet',
    title: 'Egyedi hajlító betét',
    client: 'Gyártástechnológiai megrendelő',
    industry: 'Fémipar',
    year: '2022',
    cover: '/images/gallery/20210614_150722.jpg',
    summary:
      'Egyedi geometriájú hajlító betét fémmegmunkáló gépekhez, szoros tűréssel.',
    gallery: [
      '/images/gallery/20210614_150722.jpg',
      '/images/gallery/20210614_150738.jpg',
    ],
  },
];

export interface WorkshopImage {
  src: string;
  alt: string;
  category: 'Géppark' | 'Alkatrész' | 'Műhely' | 'Rajz';
}

export const workshopGallery: WorkshopImage[] = [
  { src: '/images/gallery/nagygep1.jpg', alt: 'Hurco VM10i CNC megmunkálóközpont', category: 'Géppark' },
  { src: '/images/gallery/1.jpg', alt: 'Megmunkált alkatrészek', category: 'Alkatrész' },
  { src: '/images/gallery/nagygep3.jpg', alt: 'Hwacheon CNC esztergagép', category: 'Géppark' },
  { src: '/images/gallery/b-1.jpg', alt: 'Forgácsolt fémalkatrészek', category: 'Alkatrész' },
  { src: '/images/gallery/20200827_133045.jpg', alt: 'Sorozatgyártás közben', category: 'Műhely' },
  { src: '/images/gallery/m1d.png', alt: 'Műhelyrajz', category: 'Rajz' },
  { src: '/images/gallery/nagygep2.jpg', alt: '4-tengelyes Hurco megmunkálóközpont', category: 'Géppark' },
  { src: '/images/gallery/b-5.jpg', alt: 'Precíziós alkatrész', category: 'Alkatrész' },
  { src: '/images/gallery/20200826_211504.jpg', alt: 'Műhelymunka', category: 'Műhely' },
  { src: '/images/gallery/5.jpg', alt: 'Megmunkált fémalkatrész', category: 'Alkatrész' },
  { src: '/images/gallery/nagygep4.jpg', alt: 'Doosan Puma 2600 CNC eszterga', category: 'Géppark' },
  { src: '/images/gallery/b-6.jpg', alt: 'Forgástest alkatrész', category: 'Alkatrész' },
  { src: '/images/gallery/20200827_133302.jpg', alt: 'Alkatrész szortírozás', category: 'Műhely' },
  { src: '/images/gallery/m2.png', alt: 'Műszaki rajz', category: 'Rajz' },
  { src: '/images/gallery/nagygep5.jpg', alt: 'Hagyományos marógép', category: 'Géppark' },
  { src: '/images/gallery/a-1.jpg', alt: 'Egyedi alkatrész-sorozat', category: 'Alkatrész' },
  { src: '/images/gallery/6.jpg', alt: 'Megmunkált alumínium alkatrész', category: 'Alkatrész' },
  { src: '/images/gallery/20210521_200336.jpg', alt: 'Műhelyrészlet', category: 'Műhely' },
  { src: '/images/gallery/b-8.jpg', alt: 'Komplex geometriájú darab', category: 'Alkatrész' },
  { src: '/images/gallery/20200827_133416.jpg', alt: 'Gyártott alkatrész', category: 'Alkatrész' },
  { src: '/images/gallery/a-2.jpg', alt: 'Alkatrész-csomag', category: 'Alkatrész' },
  { src: '/images/gallery/20200826_211418.jpg', alt: 'Gyártás közben', category: 'Műhely' },
  { src: '/images/gallery/b-9.jpg', alt: 'Megmunkált perselyek', category: 'Alkatrész' },
  { src: '/images/gallery/b-10.jpg', alt: 'Komplex forgástest', category: 'Alkatrész' },
];
