import { Link } from 'react-router-dom';
import PageHero from '../components/PageHero';
import { useSEO } from '../hooks/useSEO';
import './Rolunk.css';

const principles = [
  {
    num: '01',
    title: 'Precision',
    text: 'Every part leaves the workshop with documented inspection results. Accuracy is not an option - it is the baseline.',
    meta: '±0.01 mm tolerance',
    icon: (
      <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
        <circle cx="16" cy="16" r="11" />
        <circle cx="16" cy="16" r="6.5" />
        <circle cx="16" cy="16" r="2" fill="currentColor" stroke="none" />
        <path d="M16 2v5M16 25v5M2 16h5M25 16h5" />
      </svg>
    ),
  },
  {
    num: '02',
    title: 'Reliability',
    text: 'We deliver what we commit to: on time, under clearly agreed conditions and with industrial predictability.',
    meta: 'Deadline reliability · 98%',
    icon: (
      <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 3l11 4.5v8c0 6.5-4.6 11.2-11 13.5-6.4-2.3-11-7-11-13.5v-8z" />
        <path d="M10.5 16.5l3.5 3.5 8-8.5" />
      </svg>
    ),
  },
  {
    num: '03',
    title: 'Flexibility',
    text: 'From a single prototype to thousands of parts, with the same workshop discipline and attention to detail.',
    meta: '1 pc - 10,000 pcs',
    icon: (
      <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="16" cy="16" r="3.4" />
        <path d="M16 3v4.5M16 24.5V29M3 16h4.5M24.5 16H29M6.7 6.7l3.2 3.2M22.1 22.1l3.2 3.2M6.7 25.3l3.2-3.2M22.1 9.9l3.2-3.2" />
      </svg>
    ),
  },
  {
    num: '04',
    title: 'Experience',
    text: 'More than a decade of metalworking for chemical, automotive and machine-building customers.',
    meta: '15+ years in business',
    icon: (
      <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 27h24" />
        <path d="M7 27V15M14 27V9M21 27V12M28 27V6" />
        <path d="M7 15l7-6 7 3 7-6" />
      </svg>
    ),
  },
];

const stats = [
  { value: '15+', label: 'years of experience', sub: 'active production since 2010' },
  { value: '5000+', label: 'parts manufactured', sub: 'annual production volume' },
  { value: '50+', label: 'active partners', sub: 'returning customers' },
  { value: '±0.01', label: 'mm tolerance', sub: 'documented inspection' },
];

const milestones = [
  {
    year: '2010',
    title: 'The beginning',
    text: 'MetalFusion started in a small Budapest workshop, focused on precision custom manufacturing and building long-term customer trust.',
  },
  {
    year: '2014',
    title: 'First CNC technology',
    text: 'With the first 3-axis CNC milling machine, we stepped up to more complex geometries and better repeatability.',
  },
  {
    year: '2018',
    title: 'Workshop expansion',
    text: 'Growing demand led us to a modern site in Kobanya, with more machines and more space for logistics and production.',
  },
  {
    year: '2021',
    title: '5-axis machining',
    text: 'We expanded the machine park with a new 5-axis CNC centre for complex parts in a single setup and with fewer handling risks.',
  },
  {
    year: 'Today',
    title: 'Complete mechanical partner',
    text: 'From milling and turning to assembly, we provide a complete mechanical manufacturing process through one responsible partner.',
  },
];

const machines = [
  '3-axis CNC milling machine',
  '4- and 5-axis CNC machining centre',
  'CNC lathe',
  'Conventional lathes and milling machines',
  'Welding and assembly workstation',
  '3D coordinate measuring machine',
];

const materials = [
  'Structural and heat-treated steel',
  'Stainless steel (V2A, V4A)',
  'Aluminium alloys',
  'Brass, copper and bronze',
  'Engineering plastics (POM, PA, PEEK)',
];

const specs = [
  { label: 'Tolerance', value: '±0.01 mm' },
  { label: 'Batch size', value: '1-10,000 pcs' },
  { label: 'Workpiece', value: 'up to 1500 × 800 × 600 mm' },
  { label: 'Lead time', value: '3-21 business days' },
  { label: 'Inspection', value: '3D coordinate measuring machine' },
  { label: 'Documentation', value: 'Inspection report' },
];

export default function Rolunk() {
  useSEO({
    title: 'About us - MetalFusion CNC workshop',
    description:
      'For more than a decade, we have manufactured CNC components in Budapest. Complete mechanical production, precise execution and documented quality.',
  });

  return (
    <div className="about-page">
      <PageHero
        eyebrow="About us"
        title={<>Workshop, machines and engineers <br />through one partner.</>}
        lead="Since 2010, MetalFusion has manufactured custom low- and high-volume metal components in Budapest. Modern machinery, experienced specialists and engineering thinking through a single point of contact."
        bgImage="/images/gallery/Screenshot_20211014-220249_Gallery.jpg"
      />

      <div className="about-marker">
        <div className="container about-marker__row">
          <span className="about-marker__chip">
            <span className="about-marker__dot" aria-hidden />
            Active workshop · since 2010
          </span>
          <span className="about-marker__chip">
            Budapest, District X, Kozma Street
          </span>
          <span className="about-marker__chip">
            Complete mechanical manufacturing
          </span>
        </div>
      </div>

      <section className="about-manifesto">
        <div className="container about-manifesto__grid">
          <aside className="about-manifesto__label">
            <span className="about-num">01 / 05</span>
            <span className="about-section-tag">Who we are</span>
          </aside>

          <div className="about-manifesto__copy">
            <h2 className="about-manifesto__title">
              A partner that turns <span>technical drawings into parts, not assumptions</span>.
            </h2>
            <div className="about-manifesto__text">
              <p>
                MetalFusion has manufactured custom metal components in Hungary since 2010. From the beginning, we have followed one principle: precision is not marketing language, it is something measurable.
              </p>
              <p>
                We believe reliable manufacturing should be visible in the delivered part, not in a brochure. That is why every order is documented and every step has a responsible engineer behind it.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="about-stats">
        <div className="container">
          <ul className="about-stats__row">
            {stats.map((s) => (
              <li key={s.label} className="about-stats__cell">
                <span className="about-stats__value">{s.value}</span>
                <span className="about-stats__label">{s.label}</span>
                <span className="about-stats__sub">{s.sub}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="about-principles">
        <div className="container">
          <header className="about-head">
            <div className="about-head__meta">
              <span className="about-num">02 / 05</span>
              <span className="about-section-tag">Our principles</span>
            </div>
            <div className="about-head__copy">
              <h2>The principles behind our production.</h2>
              <p>Not slogans, but operating rules visible in every order from the first drawing review to the final inspection.</p>
            </div>
          </header>

          <ul className="about-principles__grid">
            {principles.map((p) => (
              <li key={p.title} className="about-principle">
                <div className="about-principle__corner" aria-hidden>
                  <span /> <span /> <span /> <span />
                </div>
                <div className="about-principle__top">
                  <span className="about-principle__num">{p.num}</span>
                  <span className="about-principle__icon" aria-hidden>
                    {p.icon}
                  </span>
                </div>
                <h3 className="about-principle__title">{p.title}</h3>
                <p className="about-principle__text">{p.text}</p>
                <div className="about-principle__meta">
                  <span className="about-principle__meta-dot" aria-hidden />
                  {p.meta}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="about-timeline">
        <div className="container">
          <header className="about-head">
            <div className="about-head__meta">
              <span className="about-num">03 / 05</span>
              <span className="about-section-tag">Our story</span>
            </div>
            <div className="about-head__copy">
              <h2>15+ years, step by step.</h2>
              <p>From a small workshop to a reliable industrial partner. Key milestones in MetalFusion's development.</p>
            </div>
          </header>

          <ol className="about-milestones">
            <span className="about-milestones__rail" aria-hidden />
            {milestones.map((m) => (
              <li key={m.year} className="about-milestone">
                <div className="about-milestone__year">
                  <span className="about-milestone__dot" aria-hidden />
                  {m.year}
                </div>
                <div className="about-milestone__card">
                  <h3>{m.title}</h3>
                  <p>{m.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="about-workshop">
        <div className="container about-workshop__grid">
          <figure className="about-workshop__visual">
            <img
              src="/images/gallery/nagygep1.jpg"
              alt="MetalFusion CNC workshop in operation"
              loading="lazy"
            />
            <figcaption className="about-workshop__caption">
              <span className="about-workshop__cap-label">Workshop</span>
              <span className="about-workshop__cap-val">Budapest · Kobanya</span>
            </figcaption>
            <div className="about-workshop__corners" aria-hidden>
              <span /><span /><span /><span />
            </div>
          </figure>

          <div className="about-workshop__content">
            <div className="about-head about-head--inline">
              <div className="about-head__meta">
                <span className="about-num">04 / 05</span>
                <span className="about-section-tag">Workshop &amp; capabilities</span>
              </div>
              <div className="about-head__copy">
                <h2>Modern machines, disciplined process.</h2>
                <p>Everything a long-term industrial partner needs in one place, with one responsible contact.</p>
              </div>
            </div>

            <div className="about-spec">
              <div className="about-spec__col">
                <h4 className="about-spec__head">Machine park</h4>
                <ul className="about-spec__list">
                  {machines.map((item) => (
                    <li key={item}>
                      <span className="about-spec__bullet" aria-hidden />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="about-spec__col">
                <h4 className="about-spec__head">Materials</h4>
                <ul className="about-spec__list">
                  {materials.map((item) => (
                    <li key={item}>
                      <span className="about-spec__bullet" aria-hidden />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="about-spec__col about-spec__col--data">
                <h4 className="about-spec__head">Parameters</h4>
                <dl className="about-spec__dl">
                  {specs.map((s) => (
                    <div key={s.label} className="about-spec__row">
                      <dt>{s.label}</dt>
                      <dd>{s.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="about-cta">
        <div className="container">
          <div className="about-cta__box">
            <div className="about-cta__copy">
              <span className="about-num about-num--light">05 / 05 · Let's talk</span>
              <h2>Let's work together on your next project.</h2>
              <p>Send us your drawing or 3D model and we will respond with a quote within 24 hours.</p>
              <div className="about-cta__actions">
                <Link to="/kapcsolat" className="btn btn--primary">
                  Request a quote
                  <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </Link>
                <Link to="/kapcsolat" className="btn btn--ghost">
                  Contact
                  <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </Link>
              </div>
            </div>

            <ul className="about-cta__contact">
              <li>
                <span className="about-cta__icon" aria-hidden>
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.6">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.97.36 1.92.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.89.34 1.84.57 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </span>
                <div className="about-cta__line">
                  <span className="about-cta__line-key">Phone</span>
                  <a href="tel:+36203331218">+36 20 333 1218</a>
                </div>
              </li>
              <li>
                <span className="about-cta__icon" aria-hidden>
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.6">
                    <rect x="3" y="5" width="18" height="14" rx="2" />
                    <path d="M3 7l9 6 9-6" />
                  </svg>
                </span>
                <div className="about-cta__line">
                  <span className="about-cta__line-key">Email</span>
                  <a href="mailto:info@metalfusion.hu">info@metalfusion.hu</a>
                </div>
              </li>
              <li>
                <span className="about-cta__icon" aria-hidden>
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.6">
                    <path d="M12 22s7-6.2 7-12a7 7 0 1 0-14 0c0 5.8 7 12 7 12z" />
                    <circle cx="12" cy="10" r="2.5" />
                  </svg>
                </span>
                <div className="about-cta__line">
                  <span className="about-cta__line-key">Workshop</span>
                  <span>Budapest, District X, Kozma Street</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
