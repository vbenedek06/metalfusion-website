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
    cover: '/images/gallery/Screenshot_20211014-220249_Gallery.jpg',
    summary:
      'Complete mechanical manufacturing for a custom pharmaceutical packaging machine, built from stainless steel and aluminium structural elements to food-grade requirements.',
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
    title: 'Robot-arm gripper jaws',
    client: 'Automation partner',
    industry: 'Machine building',
    year: '2024',
    cover: '/images/gallery/20200827_133317.jpg',
    summary:
      'Precision gripper jaws for robotic arms, manufactured repeatably with documented inspection reports.',
    gallery: [
      '/images/gallery/20200827_133246.jpg',
      '/images/gallery/20200827_133308.jpg',
      '/images/gallery/20200827_133317.jpg',
    ],
  },
  {
    slug: 'nagy-zsaner',
    title: 'Heavy-duty hinge',
    client: 'Industrial equipment manufacturer',
    industry: 'Steel industry',
    year: '2023',
    cover: '/images/gallery/3.jpg',
    summary:
      'Precision-machined stainless-steel component designed for high-load industrial use.',
    gallery: [
      '/images/gallery/3.jpg',
      '/images/gallery/4.jpg',
    ],
  },
  {
    slug: 'hajlito-betet',
    title: 'Custom bending insert',
    client: 'Manufacturing technology customer',
    industry: 'Metalworking',
    year: '2022',
    cover: '/images/gallery/20210614_150722.jpg',
    summary:
      'Custom-geometry bending insert for metalworking machines, produced to tight tolerances.',
    gallery: [
      '/images/gallery/20210614_150722.jpg',
      '/images/gallery/20210614_150738.jpg',
    ],
  },
];

export interface WorkshopImage {
  src: string;
  alt: string;
  category: 'Machine park' | 'Component' | 'Workshop' | 'Drawing';
}

export const workshopGallery: WorkshopImage[] = [
  { src: '/images/gallery/nagygep1.jpg', alt: 'Hurco VM10i CNC machining centre', category: 'Machine park' },
  { src: '/images/gallery/1.jpg', alt: 'Machined components', category: 'Component' },
  { src: '/images/gallery/nagygep3.jpg', alt: 'Hwacheon CNC lathe', category: 'Machine park' },
  { src: '/images/gallery/b-1.jpg', alt: 'CNC-machined metal components', category: 'Component' },
  { src: '/images/gallery/20200827_133045.jpg', alt: 'Series production in progress', category: 'Workshop' },
  { src: '/images/gallery/m1d.png', alt: 'Technical drawing', category: 'Drawing' },
  { src: '/images/gallery/nagygep2.jpg', alt: '4-axis Hurco machining centre', category: 'Machine park' },
  { src: '/images/gallery/b-5.jpg', alt: 'Precision component', category: 'Component' },
  { src: '/images/gallery/20200826_211504.jpg', alt: 'Workshop operation', category: 'Workshop' },
  { src: '/images/gallery/5.jpg', alt: 'Machined metal component', category: 'Component' },
  { src: '/images/gallery/nagygep4.jpg', alt: 'Doosan Puma 2600 CNC lathe', category: 'Machine park' },
  { src: '/images/gallery/b-6.jpg', alt: 'Turned component', category: 'Component' },
  { src: '/images/gallery/20200827_133302.jpg', alt: 'Component sorting in the workshop', category: 'Workshop' },
  { src: '/images/gallery/m2.png', alt: 'Engineering drawing', category: 'Drawing' },
  { src: '/images/gallery/nagygep5.jpg', alt: 'Conventional milling machine', category: 'Machine park' },
  { src: '/images/gallery/a-1.jpg', alt: 'Custom component series', category: 'Component' },
  { src: '/images/gallery/6.jpg', alt: 'Machined aluminium component', category: 'Component' },
  { src: '/images/gallery/20210521_200336.jpg', alt: 'Workshop detail', category: 'Workshop' },
  { src: '/images/gallery/b-8.jpg', alt: 'Complex-geometry component', category: 'Component' },
  { src: '/images/gallery/20200827_133416.jpg', alt: 'Finished machined part', category: 'Component' },
  { src: '/images/gallery/a-2.jpg', alt: 'Batch of machined components', category: 'Component' },
  { src: '/images/gallery/20200826_211418.jpg', alt: 'Manufacturing in progress', category: 'Workshop' },
  { src: '/images/gallery/b-9.jpg', alt: 'Machined bushings', category: 'Component' },
  { src: '/images/gallery/b-10.jpg', alt: 'Complex turned part', category: 'Component' },
];
