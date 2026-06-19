import { Link } from 'react-router-dom';
import './Hero.css';

const values = [
  {
    title: 'Precizitás',
    text: 'Pontosság és minőség modern megmunkálóközpontokkal.',
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="9" />
        <circle cx="12" cy="12" r="4" />
        <path d="M12 3v3M12 18v3M3 12h3M18 12h3" />
      </svg>
    ),
  },
  {
    title: 'Megbízhatóság',
    text: 'Tartjuk a határidőket, számíthat ránk.',
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </svg>
    ),
  },
  {
    title: 'Rugalmasság',
    text: 'Egyedi igényekre szabott megoldások.',
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M3 12c4 0 4-6 8-6s4 6 8 6" />
        <path d="M3 18c4 0 4-6 8-6s4 6 8 6" />
      </svg>
    ),
  },
  {
    title: 'Tapasztalat',
    text: 'Évek óta a fémiparban, széleskörű szakértelemmel.',
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
        <rect x="3" y="7" width="18" height="13" rx="2" />
        <path d="M3 12h18" />
      </svg>
    ),
  },
];

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero__bg" aria-hidden />

      <div className="container hero__inner">
        <div className="hero__copy">
          <span className="hero__eyebrow">Egyedi gyártás • Precízió • Megbízhatóság</span>
          <h1 className="hero__title">
            Egyedi kis- és nagyszériás alkatrészgyártás
            <span className="hero__title-accent">magas minőségben, megfizethető áron</span>
          </h1>
          <p className="hero__lead">
            Precíziós megmunkálás modern gépparkkal, tapasztalt szakemberekkel és megbízható
            határidővel.
          </p>

          <div className="hero__actions">
            <Link to="/szolgaltatasok" className="btn btn--primary">
              Szolgáltatásaink
              <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
                <path d="M9 18l6-6-6-6" />
              </svg>
            </Link>
            <Link to="/referenciak" className="btn btn--ghost">
              Referenciáink
              <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
                <path d="M9 18l6-6-6-6" />
              </svg>
            </Link>
          </div>

          <ul className="hero__values">
            {values.map((v) => (
              <li className="hero__value" key={v.title}>
                <span className="hero__value-icon" aria-hidden>
                  {v.icon}
                </span>
                <div className="hero__value-body">
                  <h3 className="hero__value-title">{v.title}</h3>
                  <p className="hero__value-text">{v.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
