import { Link } from 'react-router-dom';
import { useSEO } from '../hooks/useSEO';
import './Rolunk.css';

const values = [
  {
    title: 'Precizitás',
    text: 'Pontos és minőségi munkavégzés minden projektünkben.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="8" />
        <circle cx="12" cy="12" r="3" />
        <path d="M12 2v4M12 18v4M2 12h4M18 12h4" />
      </svg>
    ),
  },
  {
    title: 'Megbízhatóság',
    text: 'Határidőinket tartjuk, ügyfeleink bizalmát minden nap kiérdemeljük.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 3l8 4v5c0 5-3.4 8-8 9-4.6-1-8-4-8-9V7z" />
        <path d="M8.5 12.4l2.2 2.2 4.9-5" />
      </svg>
    ),
  },
  {
    title: 'Rugalmasság',
    text: 'Egyedi igényekre szabott gyártási megoldások, rövid átfutási idővel.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.8 1.8 0 0 0 .36 1.98l.05.05a2.1 2.1 0 1 1-2.97 2.97l-.05-.05a1.8 1.8 0 0 0-1.98-.36 1.8 1.8 0 0 0-1.1 1.66V21a2.1 2.1 0 1 1-4.2 0v-.08a1.8 1.8 0 0 0-1.1-1.66 1.8 1.8 0 0 0-1.98.36l-.05.05a2.1 2.1 0 1 1-2.97-2.97l.05-.05a1.8 1.8 0 0 0 .36-1.98 1.8 1.8 0 0 0-1.66-1.1H3a2.1 2.1 0 1 1 0-4.2h.08a1.8 1.8 0 0 0 1.66-1.1 1.8 1.8 0 0 0-.36-1.98l-.05-.05A2.1 2.1 0 1 1 7.3 3.27l.05.05a1.8 1.8 0 0 0 1.98.36A1.8 1.8 0 0 0 10.43 2V2a2.1 2.1 0 1 1 4.2 0v.08a1.8 1.8 0 0 0 1.1 1.66 1.8 1.8 0 0 0 1.98-.36l.05-.05a2.1 2.1 0 1 1 2.97 2.97l-.05.05a1.8 1.8 0 0 0-.36 1.98 1.8 1.8 0 0 0 1.66 1.1H21a2.1 2.1 0 1 1 0 4.2h-.08A1.8 1.8 0 0 0 19.4 15z" />
      </svg>
    ),
  },
  {
    title: 'Tapasztalat',
    text: 'Több mint egy évtizedes szakmai tapasztalat a fémiparban.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M16 21v-2a4 4 0 0 0-8 0v2" />
        <circle cx="12" cy="8" r="4" />
        <path d="M4 21v-2a4 4 0 0 1 3-3.87M20 21v-2a4 4 0 0 0-3-3.87" />
      </svg>
    ),
  },
];

const stats = [
  { value: '15+', label: 'év tapasztalat' },
  { value: '5000+', label: 'legyártott alkatrész' },
  { value: '50+', label: 'elégedett partner' },
  { value: '100%', label: 'minőségi garancia' },
];

export default function Rolunk() {
  useSEO({
    title: 'Rólunk – MetalFusion CNC alkatrészgyártás',
    description:
      'A MetalFusion egyedi kis- és nagyszériás fémalkatrész gyártással foglalkozik. Modern géppark, tapasztalt szakemberek, precíz minőség.',
  });

  return (
    <div className="about-page">
      <section className="about-hero">
        <div className="about-hero__bg" aria-hidden />
        <div className="container about-hero__inner">
          <div className="about-hero__copy">
            <div className="about-hero__crumb">
              <Link to="/">Főoldal</Link>
              <span>/</span>
              <span>Rólunk</span>
            </div>
            <h1>Rólunk</h1>
            <p className="about-hero__tagline">Precizitás. Megbízhatóság. Rugalmasság.</p>
            <p>
              A Metalfusion 2010 óta foglalkozik egyedi kis- és nagyszériás fémalkatrészek
              gyártásával. Modern gépparkunkkal, tapasztalt szakembergárdánkkal és minőség
              iránti elkötelezettségünkkel megbízható beszállítója vagyunk partnereinknek.
            </p>
            <p>
              Célunk, hogy ügyfeleink elképzeléseit a legmagasabb minőségben, pontos
              határidővel és versenyképes áron valósítsuk meg.
            </p>
          </div>
        </div>
      </section>

      <section className="about-values">
        <div className="container">
          <ul className="about-values__grid">
            {values.map((item) => (
              <li key={item.title} className="about-values__item">
                <span className="about-values__icon" aria-hidden>
                  {item.icon}
                </span>
                <div>
                  <h2>{item.title}</h2>
                  <p>{item.text}</p>
                </div>
              </li>
            ))}
          </ul>

          <ul className="about-stats">
            {stats.map((stat) => (
              <li key={stat.label}>
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="about-story">
        <div className="container about-story__grid">
          <div className="about-copy">
            <span className="about-kicker">Cégünk története</span>
            <h2>Egy kis műhelyből megbízható partner</h2>
            <p>
              Kezdetben egy kis műhelyként indultunk, mára azonban modern gépparkkal és
              tapasztalt csapattal dolgozunk azon, hogy ügyfeleink számára komplex,
              megbízható megoldásokat nyújtsunk.
            </p>
            <p>
              Folyamatosan fejlesztjük technológiánkat és folyamatainkat, hogy lépést
              tartsunk a legmagasabb ipari elvárásokkal.
            </p>
          </div>

          <figure className="about-image about-image--cnc">
            <img src="/images/hero-cnc.png" alt="CNC megmunkálás közben" />
          </figure>

          <figure className="about-image about-image--drawing">
            <img src="/images/gallery/m1d.png" alt="Műhelyrajzok és elkészült fémalkatrészek" />
          </figure>

          <div className="about-copy about-copy--team">
            <span className="about-kicker">Szakértő csapat</span>
            <h2>Emberek, akikre számíthat</h2>
            <p>
              Munkatársaink magasan képzett szakemberek, akik elhivatottak a minőség és
              a precizitás iránt. Hiszünk a folyamatos tanulásban és a csapatmunka erejében.
            </p>
          </div>
        </div>
      </section>

      <section className="about-cta">
        <div className="container">
          <div className="about-cta__box">
            <div className="about-cta__copy">
              <h2>Dolgozzunk együtt a következő projektjén!</h2>
              <p>Kérjen ajánlatot most, és 24 órán belül válaszolunk.</p>
              <div className="about-cta__actions">
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

            <ul className="about-cta__contact">
              <li>
                <span aria-hidden>
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.6">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.97.36 1.92.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.89.34 1.84.57 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </span>
                <a href="tel:+36203331218">+36 20 333 1218</a>
              </li>
              <li>
                <span aria-hidden>
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.6">
                    <rect x="3" y="5" width="18" height="14" rx="2" />
                    <path d="M3 7l9 6 9-6" />
                  </svg>
                </span>
                <a href="mailto:info@metalfusion.hu">info@metalfusion.hu</a>
              </li>
              <li>
                <span aria-hidden>
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.6">
                    <path d="M12 22s7-6.2 7-12a7 7 0 1 0-14 0c0 5.8 7 12 7 12z" />
                    <circle cx="12" cy="10" r="2.5" />
                  </svg>
                </span>
                <span>Budapest 10. ker. Kozma utca</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
