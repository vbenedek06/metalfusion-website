import { Link } from 'react-router-dom';
import { useEffect, useMemo, useRef, useState } from 'react';
import PageHero from '../components/PageHero';
import { machines } from '../data/machines';
import { useSEO } from '../hooks/useSEO';
import './Geppark.css';

const stats = [
  { value: '6', label: 'gép a parkban', sub: 'CNC + segédgépek' },
  { value: '4', label: 'max tengely', sub: 'Hurco VMX24' },
  { value: '12 000', label: 'max ford/perc', sub: 'orsófordulat' },
  { value: '±0.01', label: 'mm tűrés', sub: 'dokumentált mérés' },
];

const categoryLabels: Record<string, string> = {
  milling: 'Marás',
  turning: 'Esztergálás',
  manual: 'Segédgép',
  quality: 'Mérés',
};

export default function Geppark() {
  useSEO({
    title: 'Géppark — CNC megmunkálóközpontok és esztergagépek | MetalFusion',
    description:
      'Hurco és Doosan CNC megmunkálóközpontok, Hwacheon hajtott szerszámos eszterga és precíziós mérőeszközök budapesti műhelyünkben.',
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
        eyebrow="Géppark"
        title={<>Modern CNC kapacitás <br />budapesti műhelyünkben.</>}
        lead="3- és 4-tengelyes megmunkálóközpontok, hajtott szerszámos esztergák és kiegészítő gépek biztosítják az egyenletes minőséget és a kötött határidőket."
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

      <nav className="geppark-nav" aria-label="Gépek navigációja">
        <div className="container geppark-nav__row">
          <span className="geppark-nav__label">Gépek</span>
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
              <span className="geppark-tag">Gyártó gépek</span>
            </div>
            <div className="geppark-head__copy">
              <h2>Megmunkálóközpontok és esztergák.</h2>
              <p>Hurco megmunkálóközpontok, Hwacheon hajtott szerszámos eszterga és Doosan tengelyeszterga — egyetlen műhelyben.</p>
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
                      <span className="geppark-card__axes-lbl">tengely</span>
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
                      Üzemben {m.commissioned} óta
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
              <span className="geppark-tag">Összehasonlítás</span>
            </div>
            <div className="geppark-head__copy">
              <h2>Melyik gép, mire való?</h2>
              <p>Egy rövid összefoglaló — alkatrész-méret és művelet alapján gyorsan eldönthető, melyik gép a megfelelő.</p>
            </div>
          </header>

          <div className="geppark-matrix">
            <table className="geppark-table">
              <thead>
                <tr>
                  <th scope="col">Gép</th>
                  <th scope="col">Kategória</th>
                  <th scope="col">Tengely</th>
                  <th scope="col">Munkatér / Tokmány</th>
                  <th scope="col">Tipikus felhasználás</th>
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
                        ? m.detailedSpecs?.find((s) => s.label === 'Tokmány')?.value ?? '—'
                        : m.detailedSpecs?.find((s) => s.label.startsWith('Munkatér'))?.value ?? '—'}
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
                <span className="geppark-tag">Minőségbiztosítás</span>
              </div>
              <div className="geppark-head__copy">
                <h2>Mérés és dokumentált minőség.</h2>
                <p>Méretellenőrzés a megmunkálás közben és után. A leadott alkatrészek tűréseit kérésre mérőjegyzőkönyvben igazoljuk.</p>
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
              <span className="geppark-num geppark-num--light">Beszéljünk</span>
              <h2>Bonyolultabb darab? Egyeztessünk a megmunkálhatóságról.</h2>
              <p>A gyárthatósági javaslatainkkal időt és anyagot is spórolhat. Küldje el a modellt — végigvesszük a megmunkálási stratégiát.</p>
              <div className="geppark-cta__actions">
                <Link to="/kapcsolat" className="btn btn--primary">
                  Ajánlatot kérek
                  <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
                    <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
                <Link to="/szolgaltatasok" className="btn btn--ghost">
                  Szolgáltatások
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
