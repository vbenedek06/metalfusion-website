import { Link } from 'react-router-dom';
import PageHero from '../components/PageHero';
import { services } from '../data/services';
import { useSEO } from '../hooks/useSEO';
import './Szolgaltatasok.css';

const serviceVisuals: Record<string, { image: string; tag: string; icon: JSX.Element }> = {
  'cnc-maras': {
    image: '/images/gallery/nagygep1.jpg',
    tag: '3- · 4-tengely',
    icon: (
      <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 3v8" />
        <path d="M11 11h10l-3 9h-4z" />
        <path d="M5 24h22" />
        <path d="M9 24l-1 4M23 24l1 4" />
      </svg>
    ),
  },
  'cnc-esztergalas': {
    image: '/images/gallery/nagygep3.jpg',
    tag: 'Ø3 – Ø250 mm',
    icon: (
      <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <ellipse cx="16" cy="16" rx="12" ry="4" />
        <path d="M4 16v5c0 2.2 5.4 4 12 4s12-1.8 12-4v-5" />
        <path d="M11 16h10" />
      </svg>
    ),
  },
  'prototipusgyartas': {
    image: '/images/gallery/m1d.png',
    tag: 'STEP · IGES · DWG',
    icon: (
      <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 4l11 6v12L16 28 5 22V10z" />
        <path d="M16 16l11-6M16 16v12M16 16L5 10" />
      </svg>
    ),
  },
  'szerszamgyartas': {
    image: '/images/gallery/nagygep4.jpg',
    tag: 'Egyedi tervezés',
    icon: (
      <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M19.5 8a5.5 5.5 0 0 0-7.6 7.1L4 23.2 8.8 28l8.1-7.9A5.5 5.5 0 0 0 24 12.5l-3.4 3.4-2-2 3.4-3.4A5.5 5.5 0 0 0 19.5 8z" />
      </svg>
    ),
  },
  'kis-es-nagysorozat': {
    image: '/images/gallery/1.jpg',
    tag: '10 – 10 000 db',
    icon: (
      <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="14" width="6" height="14" />
        <rect x="13" y="8" width="6" height="20" />
        <rect x="22" y="18" width="6" height="10" />
      </svg>
    ),
  },
  'komplett-mechanika': {
    image: '/images/gallery/a-1.jpg',
    tag: 'Komplett részegység',
    icon: (
      <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3.5" />
        <circle cx="22" cy="20" r="3.5" />
        <path d="M12 5v3.5M12 15.5V19M5 12h3.5M15.5 12H19" />
        <path d="M22 13v3.5M22 23.5V27M15 20h3.5M25.5 20H29" />
      </svg>
    ),
  },
};

const capabilities = [
  '±0.01 mm tűréshatár',
  '5-tengelyes CNC központ',
  '24h válasz ajánlatkérésre',
  'STEP · IGES · DWG fájlok',
  '1 db-tól 10 000 db-ig',
  '3D koordináta mérőgép',
  'Acél · alumínium · rozsdamentes',
  '3 – 21 munkanap átfutás',
  'Mérési jegyzőkönyv',
  'Komplett mechanikai gyártás',
];

const process = [
  {
    num: '01',
    title: 'Briefing',
    text: 'Műhelyrajz, 3D modell, mennyiség, határidő. Egy felelős mérnök válaszol, nem call center.',
    icon: (
      <svg viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 6h18v12H10l-5 4z" />
        <path d="M9 11h10M9 14h6" />
      </svg>
    ),
  },
  {
    num: '02',
    title: 'Ajánlat',
    text: '24 órán belül árajánlat — anyagköltség, megmunkálás, határidő, opciók egyértelműen kibontva.',
    icon: (
      <svg viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M7 4h10l4 4v16H7z" />
        <path d="M17 4v4h4" />
        <path d="M11 14h6M11 17h4" />
      </svg>
    ),
  },
  {
    num: '03',
    title: 'CAM &amp; előkészítés',
    text: 'Megmunkálási stratégia, szerszámlista, befogás. A gép „elindításáig" minden eldől.',
    icon: (
      <svg viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="5" width="20" height="14" rx="1" />
        <path d="M4 19l4 4M24 19l-4 4M9 23h10" />
        <path d="M8 9h12M8 12h7M8 15h10" />
      </svg>
    ),
  },
  {
    num: '04',
    title: 'Gyártás',
    text: 'CNC marás, esztergálás, kiegészítő műveletek — saját műhelyben, dokumentált folyamatban.',
    icon: (
      <svg viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="14" cy="14" r="3" />
        <path d="M14 4v3M14 21v3M4 14h3M21 14h3M7 7l2.1 2.1M18.9 18.9L21 21M7 21l2.1-2.1M18.9 9.1L21 7" />
      </svg>
    ),
  },
  {
    num: '05',
    title: 'Minőségellenőrzés',
    text: '3D koordináta mérőgép, vizuális kontroll, dokumentált mérési jegyzőkönyv kérésre.',
    icon: (
      <svg viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 3l9 4v6c0 5-3.8 9-9 11-5.2-2-9-6-9-11V7z" />
        <path d="M9.5 14l3 3 6-6.5" />
      </svg>
    ),
  },
  {
    num: '06',
    title: 'Szállítás',
    text: 'Csomagolás, szállítólevél, futárszolgálat vagy személyes átvétel — kérés szerint.',
    icon: (
      <svg viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 9h13v11H2z" />
        <path d="M15 13h6l4 4v3h-10z" />
        <circle cx="8" cy="22" r="2.2" />
        <circle cx="20" cy="22" r="2.2" />
      </svg>
    ),
  },
];

const materials = [
  { name: 'Szerkezeti acél', note: 'S235, S355', swatch: '#8a93a0' },
  { name: 'Nemesített acél', note: '42CrMo4, C45', swatch: '#6f7884' },
  { name: 'Rozsdamentes acél', note: 'V2A, V4A', swatch: '#aeb6c1' },
  { name: 'Alumínium', note: 'AlMg, AlCuMg', swatch: '#cdd2da' },
  { name: 'Sárgaréz · vörösréz', note: 'MS58, Cu-ETP', swatch: '#c7a37a' },
  { name: 'Műszaki műanyagok', note: 'POM · PA · PEEK', swatch: '#d9d9d9' },
];

const tolerances = [
  { label: 'Méretpontosság', value: '±0.01 mm' },
  { label: 'Felületi érdesség', value: 'Ra 0.8 – 3.2' },
  { label: 'Munkadarab méret', value: '1500 × 800 × 600 mm-ig' },
  { label: 'Sorozat', value: '1 – 10 000 db' },
  { label: 'Átfutási idő', value: '3 – 21 munkanap' },
  { label: 'Bemenet', value: 'STEP · IGES · DWG · PDF' },
];

export default function Szolgaltatasok() {
  useSEO({
    title: 'Szolgáltatások — CNC marás, esztergálás, szerszámgyártás | MetalFusion',
    description:
      'CNC marás, esztergálás, prototípusgyártás, kis- és nagyszériás gyártás, szerszámkészítés és komplett mechanikai megoldások. Műhelyrajz vagy 3D modell alapján.',
  });

  return (
    <div className="services-page">
      <PageHero
        eyebrow="Szolgáltatások"
        title={<>Komplex gyártási folyamatok, <br />egy partnerrel.</>}
        lead="A megmunkálástól az összeszerelésig: marás, esztergálás, szerszámkészítés és dokumentált sorozatgyártás. Műhelyrajz és/vagy 3D modell alapján dolgozunk."
        bgImage="/images/gallery/nagygep2.jpg"
      />

      <div className="services-marquee">
        <div className="services-marquee__track">
          {capabilities.map((cap) => (
            <span key={cap} className="services-marquee__item">
              <span className="services-marquee__dot" aria-hidden />
              {cap}
            </span>
          ))}
        </div>
      </div>

      <section className="services-grid-section">
        <div className="container">
          <header className="services-head">
            <div className="services-head__meta">
              <span className="services-num">01 / 04</span>
              <span className="services-tag">Amit gyártunk</span>
            </div>
            <div className="services-head__copy">
              <h2>Hat szolgáltatás, egy felelős partner.</h2>
              <p>Saját műhely, képzett szakemberek, dokumentált folyamatok. Egyetlen kapcsolattartón keresztül a teljes gyártási láncon végig.</p>
            </div>
          </header>

          <ul className="services-grid">
            {services.map((s, i) => {
              const visual = serviceVisuals[s.slug];
              return (
                <li key={s.slug} className="service-tile">
                  <Link to="/kapcsolat" className="service-tile__link" aria-label={`Ajánlatkérés: ${s.title}`}>
                    <div className="service-tile__media">
                      {visual?.image && (
                        <img src={visual.image} alt={s.title} loading="lazy" />
                      )}
                      <div className="service-tile__overlay" aria-hidden />
                      <span className="service-tile__num">{String(i + 1).padStart(2, '0')}</span>
                      {visual?.tag && (
                        <span className="service-tile__tag">{visual.tag}</span>
                      )}
                      <span className="service-tile__icon" aria-hidden>{visual?.icon}</span>
                      <div className="service-tile__corners" aria-hidden>
                        <span /><span /><span /><span />
                      </div>
                    </div>

                    <div className="service-tile__body">
                      <h3 className="service-tile__title">{s.title}</h3>
                      <p className="service-tile__desc">{s.description}</p>

                      <ul className="service-tile__specs">
                        {s.bullets.map((b) => (
                          <li key={b}>
                            <span className="service-tile__bullet" aria-hidden />
                            {b}
                          </li>
                        ))}
                      </ul>

                      <span className="service-tile__cta">
                        Ajánlatot kérek
                        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
                          <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <section className="services-process">
        <div className="container">
          <header className="services-head">
            <div className="services-head__meta">
              <span className="services-num">02 / 04</span>
              <span className="services-tag">Folyamat</span>
            </div>
            <div className="services-head__copy">
              <h2>A briefingtől a szállításig.</h2>
              <p>Egy egyértelmű, hat lépésből álló folyamat. Minden lépésnél tudja, hol tart a megrendelése, és ki a felelős mérnök.</p>
            </div>
          </header>

          <ol className="process">
            <span className="process__rail" aria-hidden />
            {process.map((step, i) => (
              <li key={step.num} className="process__step" style={{ '--step-i': i } as React.CSSProperties}>
                <div className="process__node">
                  <span className="process__icon" aria-hidden>{step.icon}</span>
                  <span className="process__num">{step.num}</span>
                </div>
                <div className="process__copy">
                  <h3 dangerouslySetInnerHTML={{ __html: step.title }} />
                  <p>{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="services-tech">
        <div className="container services-tech__grid">
          <header className="services-head services-head--inline services-tech__head">
            <div className="services-head__meta">
              <span className="services-num">03 / 04</span>
              <span className="services-tag">Anyag &amp; tolerancia</span>
            </div>
            <div className="services-head__copy">
              <h2>Mivel és milyen pontossággal.</h2>
              <p>Acéltól a műszaki műanyagokig, prototípustól a nagyszériáig — mérnöki precizitással.</p>
            </div>
          </header>

          <div className="services-materials">
            <h4 className="services-materials__head">
              <span /> Megmunkált anyagok
            </h4>
            <ul className="services-materials__list">
              {materials.map((m) => (
                <li key={m.name}>
                  <span
                    className="services-materials__swatch"
                    style={{ background: `linear-gradient(135deg, ${m.swatch} 0%, rgba(20,30,40,0.6) 100%)` }}
                    aria-hidden
                  />
                  <div className="services-materials__info">
                    <span className="services-materials__name">{m.name}</span>
                    <span className="services-materials__note">{m.note}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="services-specs">
            <h4 className="services-materials__head">
              <span /> Műszaki paraméterek
            </h4>
            <dl className="services-specs__dl">
              {tolerances.map((t) => (
                <div key={t.label} className="services-specs__row">
                  <dt>{t.label}</dt>
                  <dd>{t.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section className="services-cta">
        <div className="container">
          <div className="services-cta__box">
            <div className="services-cta__grid" aria-hidden />
            <div className="services-cta__copy">
              <span className="services-num services-num--light">04 / 04 · Beszéljünk</span>
              <h2>Küldje el a műhelyrajzot — 24 órán belül árajánlattal jelentkezünk.</h2>
              <p>STEP, IGES, DWG vagy PDF. Egyetlen alkatrésztől a több ezres szériáig — ugyanazzal az igényességgel.</p>
              <div className="services-cta__actions">
                <Link to="/kapcsolat" className="btn btn--primary">
                  Ajánlatot kérek
                  <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
                    <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
                <Link to="/referenciak" className="btn btn--ghost">
                  Referenciák
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
