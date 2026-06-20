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
    type: '3-axis CNC machining centre',
    short: 'Versatile compact milling capacity for accurate series production.',
    description:
      'The Hurco VM10i is a compact 3-axis machining centre used for precision milling of small and medium-sized parts. The WinMax control enables fast changeovers and intuitive programming.',
    specs: ['Work envelope 660 × 406 × 508 mm', '10,000 rpm', 'WinMax control'],
    detailedSpecs: [
      { label: 'Axes', value: '3' },
      { label: 'Work envelope (X×Y×Z)', value: '660 × 406 × 508 mm' },
      { label: 'Spindle speed', value: '10,000 rpm' },
      { label: 'Control', value: 'Hurco WinMax' },
      { label: 'Tool changer', value: '20 positions' },
    ],
    highlights: ['Custom milling', 'Prototype', 'Small series'],
    image: '/images/gallery/nagygep1.jpg',
    category: 'milling',
    commissioned: '2017',
  },
  {
    slug: 'hurco-vmx24',
    name: 'Hurco VMX24',
    brand: 'Hurco',
    axes: 4,
    type: '4-axis CNC machining centre',
    short: 'Complex geometries machined in a single setup.',
    description:
      'The Hurco VMX24 4-axis machining centre offers a larger work envelope and a 12,000 rpm spindle. The fourth axis allows complex geometries to be produced in one setup, reducing handling error and lead time.',
    specs: ['Work envelope 610 × 508 × 610 mm', '12,000 rpm', '4th-axis option'],
    detailedSpecs: [
      { label: 'Axes', value: '4' },
      { label: 'Work envelope (X×Y×Z)', value: '610 × 508 × 610 mm' },
      { label: 'Spindle speed', value: '12,000 rpm' },
      { label: 'Control', value: 'Hurco WinMax' },
      { label: 'Tool changer', value: '24 positions' },
    ],
    highlights: ['4th axis', 'Complex geometry', 'Single setup'],
    image: '/images/gallery/nagygep2.jpg',
    category: 'milling',
    commissioned: '2019',
  },
  {
    slug: 'hwacheon-cutex-160a',
    name: 'Hwacheon Cutex 160A',
    brand: 'Hwacheon',
    axes: 3,
    type: 'CNC lathe with driven tools',
    short: 'Driven-tool turning for complete machined rotational parts.',
    description:
      'The Hwacheon Cutex 160A is a driven-tool CNC lathe with Y-axis capability. Turning, milling and drilling operations can be completed in one setup for fast, accurate production of rotational components.',
    specs: ['Chuck Ø200 mm', 'Machining diameter Ø340 mm', 'Y-axis option'],
    detailedSpecs: [
      { label: 'Type', value: 'Driven-tool CNC lathe' },
      { label: 'Chuck', value: 'Ø200 mm' },
      { label: 'Max diameter', value: 'Ø340 mm' },
      { label: 'Machining length', value: '500 mm' },
      { label: 'Extra', value: 'Y-axis' },
    ],
    highlights: ['Driven tools', 'Y-axis', 'Rotational parts'],
    image: '/images/gallery/nagygep3.jpg',
    category: 'turning',
    commissioned: '2018',
  },
  {
    slug: 'doosan-puma-2600',
    name: 'Doosan Puma 2600',
    brand: 'Doosan',
    axes: 2,
    type: 'CNC lathe for larger shafts',
    short: 'Machining of larger rotational parts and long shafts.',
    description:
      'The Doosan Puma 2600 is a robust lathe with a large chuck and long machining travel. It is well suited for shafts, bushings and larger turned parts up to approximately one metre in length.',
    specs: ['Chuck Ø300 mm', 'Machining length 1085 mm', 'For shaft production'],
    detailedSpecs: [
      { label: 'Type', value: 'CNC lathe' },
      { label: 'Chuck', value: 'Ø300 mm' },
      { label: 'Max diameter', value: 'Ø460 mm' },
      { label: 'Machining length', value: '1085 mm' },
      { label: 'Use case', value: 'Shaft production' },
    ],
    highlights: ['Large chuck', 'Long shafts', 'Robust'],
    image: '/images/gallery/nagygep4.jpg',
    category: 'turning',
    commissioned: '2020',
  },
  {
    slug: 'hagyomanyos-marogep',
    name: 'Conventional milling machine',
    brand: 'Custom',
    axes: 3,
    type: 'Auxiliary and custom-operation machine',
    short: 'Fast setup changes, custom workholding and secondary operations.',
    description:
      'Our conventional milling machine supports the CNC equipment with fast custom workholding, deburring, repairs and one-off tasks where CNC programming time would not be economical.',
    specs: ['Work envelope 800 × 320 mm', 'Custom workholding', 'Fast setup changes'],
    detailedSpecs: [
      { label: 'Type', value: 'Conventional milling machine' },
      { label: 'Work envelope', value: '800 × 320 mm' },
      { label: 'Use case', value: 'Custom operations' },
      { label: 'Strength', value: 'Fast setup changes' },
    ],
    highlights: ['Custom workholding', 'Deburring', 'Repair'],
    image: '/images/gallery/nagygep5.jpg',
    category: 'manual',
  },
  {
    slug: 'meroeszkozok',
    name: 'Measuring equipment',
    brand: 'Mitutoyo & co.',
    type: 'Quality control and documented measurement',
    short: 'Documented, repeatable inspection after machining.',
    description:
      'Digital calipers, micrometers, height gauges and a coordinate measuring machine support repeatable inspection. Measurement results can be supplied in an inspection report on request.',
    specs: ['Digital calipers and micrometers', 'Height gauge', 'Inspection report on request'],
    detailedSpecs: [
      { label: 'Tools', value: 'Digital caliper, micrometer' },
      { label: 'Height gauge', value: 'Yes' },
      { label: '3D inspection', value: 'Coordinate measuring machine' },
      { label: 'Documentation', value: 'Inspection report' },
    ],
    highlights: ['Repeatable inspection', '3D CMM', 'Report'],
    image: '/images/gallery/20200827_133345.jpg',
    category: 'quality',
  },
];
