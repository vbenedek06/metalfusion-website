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
    slug: 'orvosi-szerszam',
    title: 'Robotkar megfogó pofák',
    client: 'Automatizálási partner',
    industry: 'Gépgyártás',
    year: '2024',
    cover: '/images/gallery/20200827_133317.jpg',
    summary:
      'Egyedi fémalkatrészek gyártása több területről.',
    gallery: [
      '/images/gallery/20200827_133246.jpg',
      '/images/gallery/20200827_133308.jpg',
      '/images/gallery/20200827_133317.jpg',
    ],
  },
  {
    slug: 'oentoszerszam',
    title: 'Nagy teherbírású zsanér',
    client: 'Ipari berendezésgyártó',
    industry: 'Acélipar',
    year: '2023',
    cover: '/images/gallery/3.jpg',
    summary:
      'Rozsdamentes alkatrész, precíz megmunkálása.',
    gallery: [
      '/images/gallery/3.jpg',
      '/images/gallery/4.jpg',
    ],
  },
  {
    slug: 'kilincs-prototipus',
    title: 'Egyedi hajlító betét',
    client: 'Gyártástechnológiai megrendelő',
    industry: 'Fémipar',
    year: '2022',
    cover: '/images/gallery/20210614_150722.jpg',
    summary:
      'Különféle fémalkatrészek gyártása.',
    gallery: [
      '/images/gallery/20210614_150722.jpg',
      '/images/gallery/20210614_150738.jpg',
    ],
  },
];
