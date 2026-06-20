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
    title: 'CNC milling',
    short: '3- and 4-axis machining centres for complex geometries.',
    description:
      'Milling of steel, aluminium, copper alloys and engineering plastics. We machine custom tools, housings, prototypes and production parts to tight tolerances.',
    bullets: ['3- and 4-axis machining centres', 'Steel · aluminium · copper · plastics', 'Tolerances down to ±0.01 mm'],
  },
  {
    slug: 'cnc-esztergalas',
    title: 'CNC turning',
    short: 'Machining of shafts, bushings and turned components.',
    description:
      'Shafts, bushings and complete turned parts are produced on CNC lathes with driven tooling. From one-off machining to high-volume production.',
    bullets: ['Driven-tool CNC lathe', 'Diameter range Ø3-Ø250 mm', 'Deburring and machining in one setup'],
  },
  {
    slug: 'prototipusgyartas',
    title: 'Prototype manufacturing',
    short: 'One-off parts from technical drawings or 3D models.',
    description:
      'For new product development, we provide fast and accurate prototype manufacturing. From model to finished part in one workshop, with flexible scheduling.',
    bullets: ['STEP / IGES / DWG file support', 'Fast turnaround', 'Engineer-to-engineer consultation'],
  },
  {
    slug: 'szerszamgyartas',
    title: 'Tooling and fixture manufacturing',
    short: 'Moulds, forming tools, press tools and fixtures.',
    description:
      'We deliver complete solutions for shaped moulds, press tools, drilling templates and production fixtures, from design support to manufacturing.',
    bullets: ['Shaped moulds', 'Press and cutting tools', 'Production fixtures and templates'],
  },
  {
    slug: 'kis-es-nagysorozat',
    title: 'Low- and high-volume production',
    short: 'Reliable scheduling and consistent quality.',
    description:
      'We also handle recurring weekly or monthly production runs. Each batch is checked for quality and delivered against fixed deadlines.',
    bullets: ['Series production from 10 to 10,000 pcs', 'Fixed deadlines', 'Inspection report on request'],
  },
  {
    slug: 'komplett-mechanika',
    title: 'Complete mechanical manufacturing',
    short: 'Full production of machines, assemblies and subassemblies.',
    description:
      'Complete mechanical production for packaging machines, medical devices and industrial equipment, including part manufacturing and assembly.',
    bullets: ['From design to assembly', 'One responsible partner', 'Documented production process'],
  },
];
