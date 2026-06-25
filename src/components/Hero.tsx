import { Link } from 'react-router-dom';
import T from './T';
import './Hero.css';

const heroVideo = '/videos/home-hero-cnc-loop.mp4';
const heroPoster = '/images/hero-video-poster.jpg';

const values = [
  {
    title: 'Precision',
    text: 'Accurate, high-quality production on modern machining centres.',
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="9" />
        <circle cx="12" cy="12" r="4" />
        <path d="M12 3v3M12 18v3M3 12h3M18 12h3" />
      </svg>
    ),
  },
  {
    title: 'Reliability',
    text: 'Clear deadlines, dependable delivery and predictable communication.',
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </svg>
    ),
  },
  {
    title: 'Flexibility',
    text: 'Tailored solutions for one-off parts, prototypes and series production.',
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M3 12c4 0 4-6 8-6s4 6 8 6" />
        <path d="M3 18c4 0 4-6 8-6s4 6 8 6" />
      </svg>
    ),
  },
  {
    title: 'Experience',
    text: 'Years of metalworking knowledge across demanding industrial projects.',
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
      <div className="hero__bg" aria-hidden>
        <video
          className="hero__video"
          src={heroVideo}
          poster={heroPoster}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          disablePictureInPicture
        />
      </div>

      <div className="container hero__inner">
        <div className="hero__copy">
          <T k="home.hero.eyebrow" as="span" className="hero__eyebrow" />
          <h1 className="hero__title">
            <T k="home.hero.title" as="span" />
            <T k="home.hero.titleAccent" as="span" className="hero__title-accent" />
          </h1>
          <T k="home.hero.lead" as="p" className="hero__lead" />

          <div className="hero__actions">
            <Link to="/szolgaltatasok" className="btn btn--primary">
              Our services
              <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
                <path d="M9 18l6-6-6-6" />
              </svg>
            </Link>
            <Link to="/referenciak" className="btn btn--ghost">
              References
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
