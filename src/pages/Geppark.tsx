import { Link } from 'react-router-dom';
import { useEffect, useMemo, useRef, useState } from 'react';
import PageHero from '../components/PageHero';
import { machines } from '../data/machines';
import { useSEO } from '../hooks/useSEO';
import './Geppark.css';

const stats = [
  { value: '6', label: 'machines in-house', sub: 'CNC + auxiliary machines' },
  { value: '4', label: 'max axes', sub: 'Hurco VMX24' },
  { value: '12,000', label: 'max rpm', sub: 'spindle speed' },
  { value: '±0.01', label: 'mm tolerance', sub: 'documented inspection' },
];

const categoryLabels: Record<string, string> = {
  milling: 'Milling',
  turning: 'Turning',
  manual: 'Auxiliary',
  quality: 'Inspection',
};

export default function Geppark() {
  useSEO({
    title: 'Machine Park - CNC machining centres and lathes | MetalFusion',
    description:
      'Hurco and Doosan CNC machining centres, a Hwacheon driven-tool lathe and precision measuring equipment in our Budapest workshop.',
  });

  const production = useMemo(
    () => machines.filter((m) => m.category !== 'quality'),
    []
  );
  const quality = useMemo(() => machines.find((m) => m.category === 'quality'), []);

  const [activeId, setActiveId] = useState<string | null>(null);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const id = (e.target as HTMLElement).id;
            if (id) setActiveId(id);
          }
        });
      },
      { rootMargin: '-30% 0px -55% 0px', threshold: 0 }
    );
    Object.values(sectionRefs.current).forEach((el) => {
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  const scrollTo = (slug: string) => {
    const el = sectionRefs.current[slug];
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 120;
    window.scrollTo({ top, behavior: 'smooth' });
  };

  return (
    <div className="geppark-page">
      <PageHero
        eyebrow="Machine Park"
        title={<>Modern CNC capacity <br />in our Budapest workshop.</>}
        lead="3- and 4-axis machining centres, driven-tool CNC lathes and auxiliary machines ensure consistent quality and reliable delivery dates."
        bgImage="/images/gallery/nagygep2.jpg"
      />

      <section className="geppark-stats">
        <div className="container">
          <ul className="geppark-stats__row">
            {stats.map((s) => (
              <li key={s.label} className="geppark-stats__cell">
                <span className="geppark-stats__value">{s.value}</span>
                <span className="geppark-stats__label">{s.label}</span>
                <span className="geppark-stats__sub">{s.sub}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <nav className="geppark-nav" aria-label="Machine navigation">
        <div className="container geppark-nav__row">
          <span className="geppark-nav__label">Machines</span>
          <div className="geppark-nav__chips">
            {production.map((m) => (
              <button
                key={m.slug}
                type="button"
                className={`geppark-nav__chip${activeId === m.slug ? ' geppark-nav__chip--active' : ''}`}
                onClick={() => m.slug && scrollTo(m.slug)}
              >
                <span className="geppark-nav__chip-cat">{m.category && categoryLabels[m.category]}</span>
                {m.name}
              </button>
            ))}
          </div>
        </div>
      </nav>

      <section className="geppark-fleet">
        <div className="container">
          <header className="geppark-head">
            <div className="geppark-head__meta">
              <span className="geppark-num">01 / 03</span>
              <span className="geppark-tag">Production machines</span>
            </div>
            <div className="geppark-head__copy">
              <h2>Machining centres and lathes.</h2>
              <p>Hurco machining centres, a Hwacheon driven-tool lathe and a Doosan shaft lathe in one workshop.</p>
            </div>
          </header>

          <ol className="geppark-list">
            {production.map((m, i) => (
              <li
                key={m.slug}
                id={m.slug}
                ref={(el) => {
                  if (m.slug) sectionRefs.current[m.slug] = el;
                }}
                className={`geppark-card geppark-card--${i % 2 === 0 ? 'l' : 'r'}`}
              >
                <figure className="geppark-card__media">
                  <img src={m.image} alt={m.name} loading="lazy" decoding="async" />
                  <div className="geppark-card__media-overlay" aria-hidden />
                  <div className="geppark-card__corners" aria-hidden>
                    <span /><span /><span /><span />
                  </div>
                  <span className="geppark-card__badge">{m.brand}</span>
                  {m.axes && (
                    <span className="geppark-card__axes">
                      <span className="geppark-card__axes-num">{m.axes}</span>
                      <span className="geppark-card__axes-lbl">axes</span>
                    </span>
                  )}
                </figure>

                <div className="geppark-card__body">
                  <div className="geppark-card__top">
                    <span className="geppark-card__index">{String(i + 1).padStart(2, '0')}</span>
                    <span className="geppark-card__type">{m.type}</span>
                  </div>

                  <h3 className="geppark-card__name">{m.name}</h3>
                  <p className="geppark-card__short">{m.short ?? m.specs[0]}</p>

                  {m.description && (
                    <p className="geppark-card__desc">{m.description}</p>
                  )}

                  {m.detailedSpecs && m.detailedSpecs.length > 0 && (
                    <dl className="geppark-card__specs">
                      {m.detailedSpecs.map((s) => (
                        <div key={s.label} className="geppark-card__spec">
                          <dt>{s.label}</dt>
                          <dd>{s.value}</dd>
                        </div>
                      ))}
                    </dl>
                  )}

                  {m.highlights && m.highlights.length > 0 && (
                    <ul className="geppark-card__tags">
                      {m.highlights.map((h) => (
                        <li key={h} className="geppark-card__tag">
                          <span className="geppark-card__tag-dot" aria-hidden />
                          {h}
                        </li>
                      ))}
                    </ul>
                  )}

                  {m.commissioned && (
                    <span className="geppark-card__year">
                      {`In operation since ${m.commissioned}`}
                    </span>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="geppark-matrix-section">
        <div className="container">
          <header className="geppark-head">
            <div className="geppark-head__meta">
              <span className="geppark-num">02 / 03</span>
              <span className="geppark-tag">Comparison</span>
            </div>
            <div className="geppark-head__copy">
              <h2>Which machine is best for which task?</h2>
              <p>A quick overview to match part size and operation type with the right machine.</p>
            </div>
          </header>

          <div className="geppark-matrix">
            <table className="geppark-table">
              <thead>
                <tr>
                  <th scope="col">Machine</th>
                  <th scope="col">Category</th>
                  <th scope="col">Axes</th>
                  <th scope="col">Work envelope / chuck</th>
                  <th scope="col">Typical use</th>
                </tr>
              </thead>
              <tbody>
                {production.map((m) => (
                  <tr key={m.slug}>
                    <th scope="row">
                      <span className="geppark-table__name">{m.name}</span>
                      <span className="geppark-table__sub">{m.brand}</span>
                    </th>
                    <td>
                      <span className={`geppark-table__pill geppark-table__pill--${m.category}`}>
                        {m.category && categoryLabels[m.category]}
                      </span>
                    </td>
                    <td className="geppark-table__num">{m.axes ?? '—'}</td>
                    <td>
                      {m.category === 'turning'
                        ? m.detailedSpecs?.find((s) => s.label === 'Chuck')?.value ?? '—'
                        : m.detailedSpecs?.find((s) => s.label.startsWith('Work envelope'))?.value ?? '—'}
                    </td>
                    <td>{m.highlights?.join(' · ') ?? '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {quality && (
        <section className="geppark-quality">
          <div className="container">
            <header className="geppark-head">
              <div className="geppark-head__meta">
                <span className="geppark-num">03 / 03</span>
                <span className="geppark-tag">Quality assurance</span>
              </div>
              <div className="geppark-head__copy">
                <h2>Inspection and documented quality.</h2>
                <p>Dimensional inspection during and after machining. We can verify part tolerances in an inspection report on request.</p>
              </div>
            </header>

            <div className="geppark-quality__box">
              <figure className="geppark-quality__media">
                <img src={quality.image} alt={quality.name} loading="lazy" decoding="async" />
                <div className="geppark-card__corners" aria-hidden>
                  <span /><span /><span /><span />
                </div>
                <span className="geppark-quality__icon" aria-hidden>
                  <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 3l11 4.5v8c0 6.5-4.6 11.2-11 13.5C9.6 26.7 5 22 5 15.5v-8z" />
                    <path d="M10.5 16.5l3.5 3.5 8-8.5" />
                  </svg>
                </span>
              </figure>

              <div className="geppark-quality__content">
                <h3>{quality.name}</h3>
                <p className="geppark-quality__desc">{quality.description}</p>

                <dl className="geppark-quality__specs">
                  {quality.detailedSpecs?.map((s) => (
                    <div key={s.label} className="geppark-quality__spec">
                      <dt>{s.label}</dt>
                      <dd>{s.value}</dd>
                    </div>
                  ))}
                </dl>

                <ul className="geppark-quality__tags">
                  {quality.highlights?.map((h) => (
                    <li key={h}>
                      <span aria-hidden />
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="geppark-cta">
        <div className="container">
          <div className="geppark-cta__box">
            <div className="geppark-cta__grid" aria-hidden />
            <div className="geppark-cta__copy">
              <span className="geppark-num geppark-num--light">Let's talk</span>
              <h2>Complex part? Let's review manufacturability.</h2>
              <p>Our manufacturability feedback can save time and material. Send us the model and we will walk through the machining strategy.</p>
              <div className="geppark-cta__actions">
                <Link to="/kapcsolat" className="btn btn--primary">
                  Request a quote
                  <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
                    <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
                <Link to="/szolgaltatasok" className="btn btn--ghost">
                  Services
                  <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
                    <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
