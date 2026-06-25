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
    title: 'Custom pharmaceutical packaging machine mechanics',
    client: 'Austrian pharmaceutical company',
    industry: 'Pharmaceuticals',
    year: '2023',
    cover: '/images/gallery/Screenshot_20211014-220249_Gallery.webp',
    summary:
      'Complete mechanical manufacturing for a custom pharmaceutical packaging machine, built from stainless steel and aluminium structural elements to food-grade requirements.',
    gallery: [
      '/images/gallery/Screenshot_20211014-220245_Gallery.webp',
      '/images/gallery/Screenshot_20211014-220249_Gallery.webp',
      '/images/gallery/Screenshot_20211014-220252_Gallery.webp',
      '/images/gallery/Screenshot_20211014-220256_Gallery.webp',
      '/images/gallery/Screenshot_20211014-220301_Gallery.webp',
    ],
  },
  {
    slug: 'robotkar-megfogo',
    title: 'Robot-arm gripper jaws',
    client: 'Automation partner',
    industry: 'Machine building',
    year: '2024',
    cover: '/images/gallery/20200827_133317.webp',
    summary:
      'Precision gripper jaws for robotic arms, manufactured repeatably with documented inspection reports.',
    gallery: [
      '/images/gallery/20200827_133246.webp',
      '/images/gallery/20200827_133308.webp',
      '/images/gallery/20200827_133317.webp',
    ],
  },
  {
    slug: 'nagy-zsaner',
    title: 'Heavy-duty hinge',
    client: 'Industrial equipment manufacturer',
    industry: 'Steel industry',
    year: '2023',
    cover: '/images/gallery/3.webp',
    summary:
      'Precision-machined stainless-steel component designed for high-load industrial use.',
    gallery: [
      '/images/gallery/3.webp',
      '/images/gallery/4.webp',
    ],
  },
  {
    slug: 'hajlito-betet',
    title: 'Custom bending insert',
    client: 'Manufacturing technology customer',
    industry: 'Metalworking',
    year: '2022',
    cover: '/images/gallery/20210614_150722.webp',
    summary:
      'Custom-geometry bending insert for metalworking machines, produced to tight tolerances.',
    gallery: [
      '/images/gallery/20210614_150722.webp',
      '/images/gallery/20210614_150738.webp',
    ],
  },
];

export interface WorkshopImage {
  src: string;
  alt: string;
  category: 'Machine park' | 'Component' | 'Workshop' | 'Drawing';
}

export const workshopGallery: WorkshopImage[] = [
  { src: '/images/gallery/nagygep1.webp', alt: 'Hurco VM10i CNC machining centre', category: 'Machine park' },
  { src: '/images/gallery/1.webp', alt: 'Machined components', category: 'Component' },
  { src: '/images/gallery/nagygep3.webp', alt: 'Hwacheon CNC lathe', category: 'Machine park' },
  { src: '/images/gallery/b-1.webp', alt: 'CNC-machined metal components', category: 'Component' },
  { src: '/images/gallery/20200827_133045.webp', alt: 'Series production in progress', category: 'Workshop' },
  { src: '/images/gallery/m1d.webp', alt: 'Technical drawing', category: 'Drawing' },
  { src: '/images/gallery/nagygep2.webp', alt: '4-axis Hurco machining centre', category: 'Machine park' },
  { src: '/images/gallery/b-5.webp', alt: 'Precision component', category: 'Component' },
  { src: '/images/gallery/20200826_211504.webp', alt: 'Workshop operation', category: 'Workshop' },
  { src: '/images/gallery/5.webp', alt: 'Machined metal component', category: 'Component' },
  { src: '/images/gallery/nagygep4.webp', alt: 'Doosan Puma 2600 CNC lathe', category: 'Machine park' },
  { src: '/images/gallery/b-6.webp', alt: 'Turned component', category: 'Component' },
  { src: '/images/gallery/20200827_133302.webp', alt: 'Component sorting in the workshop', category: 'Workshop' },
  { src: '/images/gallery/m2.webp', alt: 'Engineering drawing', category: 'Drawing' },
  { src: '/images/gallery/nagygep5.webp', alt: 'Conventional milling machine', category: 'Machine park' },
  { src: '/images/gallery/a-1.webp', alt: 'Custom component series', category: 'Component' },
  { src: '/images/gallery/6.webp', alt: 'Machined aluminium component', category: 'Component' },
  { src: '/images/gallery/20210521_200336.webp', alt: 'Workshop detail', category: 'Workshop' },
  { src: '/images/gallery/b-8.webp', alt: 'Complex-geometry component', category: 'Component' },
  { src: '/images/gallery/20200827_133416.webp', alt: 'Finished machined part', category: 'Component' },
  { src: '/images/gallery/a-2.webp', alt: 'Batch of machined components', category: 'Component' },
  { src: '/images/gallery/20200826_211418.webp', alt: 'Manufacturing in progress', category: 'Workshop' },
  { src: '/images/gallery/b-9.webp', alt: 'Machined bushings', category: 'Component' },
  { src: '/images/gallery/b-10.webp', alt: 'Complex turned part', category: 'Component' },
];
