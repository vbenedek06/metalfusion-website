import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import ReferenceCard from '../components/ReferenceCard';
import { references } from '../data/references';
import { useSEO } from '../hooks/useSEO';
import './Home.css';

const serviceIcons: Record<string, JSX.Element> = {
  'cnc-maras': (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 3v6" />
      <path d="M9 9h6l-2 6h-2z" />
      <path d="M5 18h14" />
      <path d="M7 18l-1 3M17 18l1 3" />
    </svg>
  ),
  'cnc-esztergalas': (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5">
      <ellipse cx="12" cy="12" rx="9" ry="3" />
      <path d="M3 12v4c0 1.7 4 3 9 3s9-1.3 9-3v-4" />
    </svg>
  ),
  'prototipusgyartas': (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 3l8 4.5v9L12 21l-8-4.5v-9z" />
      <path d="M12 12l8-4.5M12 12v9M12 12L4 7.5" />
    </svg>
  ),
  'szerszamgyartas': (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 0 0 5.4-5.4l-2.5 2.5-1.4-1.4z" />
    </svg>
  ),
  'kis-es-nagysorozat': (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="3" y="10" width="5" height="10" />
      <rect x="9.5" y="6" width="5" height="14" />
      <rect x="16" y="13" width="5" height="7" />
    </svg>
  ),
  'komplett-mechanika': (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M4.9 19.1L7 17M17 7l2.1-2.1" />
    </svg>
  ),
  'egyeb-megmunkalas': (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M4 20h16" />
      <path d="M7 17l2-9h6l2 9" />
      <path d="M9 8l3-5 3 5" />
      <path d="M8 13h8" />
    </svg>
  ),
  osszeszereles: (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M6 8h7a5 5 0 0 1 5 5v3" />
      <path d="M6 8l3-3M6 8l3 3" />
      <rect x="4" y="15" width="6" height="5" rx="1" />
      <rect x="14" y="15" width="6" height="5" rx="1" />
    </svg>
  ),
  minosegbiztositas: (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 3l8 4v5c0 5-3.4 8-8 9-4.6-1-8-4-8-9V7z" />
      <path d="M8.5 12.5l2.3 2.3 4.8-5" />
    </svg>
  ),
};

const homeCapabilities = [
  {
    slug: 'cnc-maras',
    title: 'CNC marás',
    text: 'Nagy pontosságú CNC marás 3-, 4- és 5-tengelyes gépekkel',
  },
  {
    slug: 'cnc-esztergalas',
    title: 'CNC esztergálás',
    text: 'Kis- és nagyszériás esztergálás komplex alkatrészek gyártása',
  },
  {
    slug: 'egyeb-megmunkalas',
    title: 'Egyéb megmunkálás',
    text: 'Köszörülés, fúrás, menetvágás, hegesztés, felületkezelés',
  },
  {
    slug: 'osszeszereles',
    title: 'Összeszerelés',
    text: 'Gépösszeállítás, modulok és komplett berendezések',
  },
  {
    slug: 'minosegbiztositas',
    title: 'Minőségbiztosítás',
    text: 'Mérések 3D mérőgéppel, precíz minőségellenőrzés',
  },
];

const materials = ['Acél, rozsdamentes acél', 'Alumínium, sárgaréz', 'Műanyagok'];

export default function Home() {
  useSEO({
    title: 'MetalFusion – Precíziós CNC alkatrészgyártás Budapesten',
    description:
      'Egyedi kis- és nagyszériás CNC megmunkálás, prototípusgyártás és szerszámkészítés. Műhelyrajz vagy 3D modell alapján, prémium minőségben.',
  });

  const featuredRefs = references.slice(0, 4);
  return (
    <>
      <Hero />

      <section className="home__refs-band">
        <div className="container">
          <div className="home__refs-head">
            <div className="home__refs-title-block">
              <span className="home__section-kicker">Referenciáink</span>
              <h2 className="home__refs-title">Valós megoldások, valós projektek</h2>
            </div>
            <Link to="/referenciak" className="home__refs-link">
              Összes referencia megtekintése
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          <div className="home__refs-grid">
            {featuredRefs.map((r) => (
              <Link key={r.slug} to="/referenciak" className="home__ref-link">
                <ReferenceCard reference={r} compact />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="home__services-band">
        <div className="container">
          <span className="home__section-kicker">Szolgáltatásaink</span>
          <div className="home__services-shell">
            <ul className="home__services-row">
              {homeCapabilities.map((s) => (
                <li key={s.slug} className="home__service-item">
                  <Link to="/szolgaltatasok" className="home__service-link">
                    <span className="home__service-icon" aria-hidden>
                      {serviceIcons[s.slug]}
                    </span>
                    <div className="home__service-body">
                      <h3 className="home__service-title">{s.title}</h3>
                      <p className="home__service-text">{s.text}</p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>

            <aside className="home__materials" aria-label="Anyagok, amelyekkel dolgozunk">
              <h3>Anyagok, amelyekkel dolgozunk</h3>
              <ul>
                {materials.map((m) => (
                  <li key={m}>
                    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                    {m}
                  </li>
                ))}
              </ul>
            </aside>
          </div>
        </div>
      </section>

      <section className="home__cta-bar">
        <div className="container home__cta-inner">
          <div className="home__cta-copy">
            <h2 className="home__cta-title">Kérjen <span>ajánlatot</span> projektjére!</h2>
            <p className="home__cta-lead">
              Műhelyrajz vagy 3D modell, és 24 órán belül válaszolunk.
            </p>
            <div className="home__cta-actions">
              <Link to="/kapcsolat" className="btn btn--primary">
                Ajánlatkérés
                <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </Link>
              <Link to="/kapcsolat" className="btn btn--ghost">
                Kapcsolat
                <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </Link>
            </div>
          </div>

          <ul className="home__cta-contact">
            <li>
              <span className="home__cta-ico" aria-hidden>
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.97.36 1.92.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.89.34 1.84.57 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
              </span>
              <a href="tel:+36203331218">+36 20 333 1218</a>
            </li>
            <li>
              <span className="home__cta-ico" aria-hidden>
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <rect x="3" y="5" width="18" height="14" rx="2" />
                  <path d="M3 7l9 6 9-6" />
                </svg>
              </span>
              <a href="mailto:info@metalfusion.hu">info@metalfusion.hu</a>
            </li>
            <li>
              <span className="home__cta-ico" aria-hidden>
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <path d="M12 22s7-6.2 7-12a7 7 0 1 0-14 0c0 5.8 7 12 7 12z" />
                  <circle cx="12" cy="10" r="2.5" />
                </svg>
              </span>
              <span>Budapest 10. ker. Kozma utca</span>
            </li>
          </ul>
        </div>
      </section>
    </>
  );
}
