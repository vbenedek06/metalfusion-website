import { Link } from 'react-router-dom';
import PageHero from '../components/PageHero';
import { useSEO } from '../hooks/useSEO';
import './Rolunk.css';

const principles = [
  {
    num: '01',
    title: 'Precizitás',
    text: 'Minden alkatrész dokumentált mérési eredménnyel kerül ki a műhelyből. A pontosság nem opció — alapelvárás.',
    meta: '±0.01 mm tűréshatár',
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
    title: 'Megbízhatóság',
    text: 'Amit ígérünk, azt teljesítjük. Határidőre, leírt feltételekkel, kiszámítható módon — ipari mércével.',
    meta: 'Határidő · 98%',
    icon: (
      <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 3l11 4.5v8c0 6.5-4.6 11.2-11 13.5-6.4-2.3-11-7-11-13.5v-8z" />
        <path d="M10.5 16.5l3.5 3.5 8-8.5" />
      </svg>
    ),
  },
  {
    num: '03',
    title: 'Rugalmasság',
    text: 'Egyetlen prototípustól több ezres szériáig — ugyanazzal a műhellyel, ugyanazzal az igényességgel.',
    meta: '1 db – 10 000 db',
    icon: (
      <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="16" cy="16" r="3.4" />
        <path d="M16 3v4.5M16 24.5V29M3 16h4.5M24.5 16H29M6.7 6.7l3.2 3.2M22.1 22.1l3.2 3.2M6.7 25.3l3.2-3.2M22.1 9.9l3.2-3.2" />
      </svg>
    ),
  },
  {
    num: '04',
    title: 'Tapasztalat',
    text: 'Több mint egy évtizednyi fémmegmunkálás vegyipari, járműipari és gépgyártó megrendelők szolgálatában.',
    meta: '15+ év a piacon',
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
  { value: '15+', label: 'év tapasztalat', sub: 'aktív gyártás 2010 óta' },
  { value: '5000+', label: 'legyártott alkatrész', sub: 'éves volumen' },
  { value: '50+', label: 'aktív partner', sub: 'visszatérő megrendelő' },
  { value: '±0.01', label: 'mm tűréshatár', sub: 'dokumentált mérés' },
];

const milestones = [
  {
    year: '2010',
    title: 'A kezdetek',
    text: 'A MetalFusion egy kis budapesti műhelyben indult, fókuszban a precíz egyedi gyártással és a partneri bizalom építésével.',
  },
  {
    year: '2014',
    title: 'Első CNC technológia',
    text: 'Az első 3-tengelyes CNC marógép üzembe helyezésével új minőségi szintre léptünk — bonyolultabb geometriák, jobb ismételhetőség.',
  },
  {
    year: '2018',
    title: 'Műhelybővítés',
    text: 'A megnövekedett megrendelési igények miatt új, korszerű telephelyre költöztünk Kőbányára, ahol több gépet és nagyobb logisztikai teret üzemeltetünk.',
  },
  {
    year: '2021',
    title: '5-tengelyes megmunkálás',
    text: 'Új 5-tengelyes CNC központtal bővítettük a gépparkot. Komplex alkatrészek egyetlen befogással, kisebb hibalehetőséggel.',
  },
  {
    year: 'Ma',
    title: 'Komplett mechanikai partner',
    text: 'Marástól és esztergálástól az összeszerelésig — komplett mechanikai gyártási folyamat egyetlen partneren keresztül.',
  },
];

const machines = [
  '3-tengelyes CNC marógép',
  '4- és 5-tengelyes CNC központ',
  'CNC esztergagép',
  'Hagyományos esztergák és marógépek',
  'Hegesztő- és összeszerelő munkaállomás',
  '3D koordináta mérőgép',
];

const materials = [
  'Szerkezeti és nemesített acél',
  'Rozsdamentes acél (V2A, V4A)',
  'Alumínium ötvözetek',
  'Sárgaréz, vörösréz, bronz',
  'Műszaki műanyagok (POM, PA, PEEK)',
];

const specs = [
  { label: 'Tűréshatár', value: '±0.01 mm' },
  { label: 'Sorozatnagyság', value: '1 – 10 000 db' },
  { label: 'Munkadarab', value: '1500 × 800 × 600 mm-ig' },
  { label: 'Átfutási idő', value: '3 – 21 munkanap' },
  { label: 'Mérés', value: '3D koordináta mérőgép' },
  { label: 'Dokumentáció', value: 'Mérési jegyzőkönyv' },
];

export default function Rolunk() {
  useSEO({
    title: 'Rólunk — MetalFusion CNC műhely',
    description:
      'Több mint egy évtizede gyártunk CNC alkatrészeket Budapesten. Komplett mechanikai gyártás, precíz kivitelezés, dokumentált minőség.',
  });

  return (
    <div className="about-page">
      <PageHero
        eyebrow="Rólunk"
        title={<>Műhely, gépek, mérnökök <br />— egy partnerrel.</>}
        lead="A MetalFusion 2010 óta gyárt egyedi kis- és nagyszériás fémalkatrészeket Budapesten. Modern géppark, tapasztalt szakemberek, mérnöki gondolkodás — egyetlen kapcsolaton keresztül."
        bgImage="/images/gallery/Screenshot_20211014-220249_Gallery.jpg"
      />

      <div className="about-marker">
        <div className="container about-marker__row">
          <span className="about-marker__chip">
            <span className="about-marker__dot" aria-hidden />
            Aktív műhely · 2010 óta
          </span>
          <span className="about-marker__chip">
            Budapest, X. ker., Kozma utca
          </span>
          <span className="about-marker__chip">
            Komplett mechanikai gyártás
          </span>
        </div>
      </div>

      <section className="about-manifesto">
        <div className="container about-manifesto__grid">
          <aside className="about-manifesto__label">
            <span className="about-num">01 / 05</span>
            <span className="about-section-tag">Kik vagyunk</span>
          </aside>

          <div className="about-manifesto__copy">
            <h2 className="about-manifesto__title">
              Olyan partner, amelyik <span>a műhelyrajzból nem feltevést, hanem alkatrészt</span> készít.
            </h2>
            <div className="about-manifesto__text">
              <p>
                A MetalFusion 2010 óta gyárt egyedi fémalkatrészeket Magyarországon. Indulás óta egyetlen elven dolgozunk: a precizitás nem marketingszöveg, hanem mérhető kategória.
              </p>
              <p>
                Hiszünk abban, hogy a megbízható gyártásnak nem a brosúrában, hanem az átadott alkatrészben kell látszania. Ezért minden megrendelést dokumentálunk, és minden lépésnél felelős mérnök áll a vonal másik végén.
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
              <span className="about-section-tag">Elveink</span>
            </div>
            <div className="about-head__copy">
              <h2>Elvek, amelyek mentén gyártunk.</h2>
              <p>Nem szlogenek — operatív szabályok, amelyek minden megrendelésünkben tetten érhetők, a műhelyrajz beérkezésétől az utolsó méréséig.</p>
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
              <span className="about-section-tag">Történetünk</span>
            </div>
            <div className="about-head__copy">
              <h2>15+ év — lépésről lépésre.</h2>
              <p>Egy kis műhelyből megbízható ipari partnerré. A MetalFusion fejlődésének főbb mérföldkövei.</p>
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
              alt="MetalFusion CNC műhely, üzem közben"
              loading="lazy"
            />
            <figcaption className="about-workshop__caption">
              <span className="about-workshop__cap-label">Műhely</span>
              <span className="about-workshop__cap-val">Budapest · Kőbánya</span>
            </figcaption>
            <div className="about-workshop__corners" aria-hidden>
              <span /><span /><span /><span />
            </div>
          </figure>

          <div className="about-workshop__content">
            <div className="about-head about-head--inline">
              <div className="about-head__meta">
                <span className="about-num">04 / 05</span>
                <span className="about-section-tag">Műhely &amp; képességek</span>
              </div>
              <div className="about-head__copy">
                <h2>Korszerű géppark, fegyelmezett folyamat.</h2>
                <p>Minden, ami egy hosszú távú ipari partnerhez kell — egy helyen, egy felelős kapcsolattartóval.</p>
              </div>
            </div>

            <div className="about-spec">
              <div className="about-spec__col">
                <h4 className="about-spec__head">Géppark</h4>
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
                <h4 className="about-spec__head">Anyagok</h4>
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
                <h4 className="about-spec__head">Paraméterek</h4>
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
              <span className="about-num about-num--light">05 / 05 · Beszéljünk</span>
              <h2>Dolgozzunk együtt a következő projektjén.</h2>
              <p>Küldje el a műhelyrajzot vagy a 3D modellt — 24 órán belül árajánlattal jelentkezünk.</p>
              <div className="about-cta__actions">
                <Link to="/kapcsolat" className="btn btn--primary">
                  Ajánlatot kérek
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
                <span className="about-cta__icon" aria-hidden>
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.6">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.97.36 1.92.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.89.34 1.84.57 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </span>
                <div className="about-cta__line">
                  <span className="about-cta__line-key">Telefon</span>
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
                  <span className="about-cta__line-key">E-mail</span>
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
                  <span className="about-cta__line-key">Műhely</span>
                  <span>Budapest 10. ker. Kozma utca</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
