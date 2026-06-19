import { useEffect, useState } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const links = [
  { to: '/', label: 'Főoldal' },
  { to: '/rolunk', label: 'Rólunk' },
  { to: '/szolgaltatasok', label: 'Szolgáltatások' },
  { to: '/referenciak', label: 'Referenciák' },
  { to: '/geppark', label: 'Géppark' },
  { to: '/kapcsolat', label: 'Kapcsolat' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <header className={`nav ${scrolled ? 'nav--scrolled' : ''} ${open ? 'nav--open' : ''}`}>
      <div className="container nav__inner">
        <Link to="/" className="nav__brand" aria-label="MetalFusion főoldal">
          <span className="nav__brand-mark" aria-hidden>
            <img src="/images/logo.svg" alt="" />
          </span>
          <span className="nav__brand-block">
            <span className="nav__brand-text">METALFUSION</span>
            <span className="nav__brand-tag">Precízió a fémben</span>
          </span>
        </Link>

        <nav className="nav__links" aria-label="Főmenü">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === '/'}
              className={({ isActive }) => `nav__link ${isActive ? 'nav__link--active' : ''}`}
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="nav__lang" aria-label="Nyelvválasztó">
          <button type="button" className="nav__lang-flag nav__lang-flag--active" aria-pressed="true" title="Magyar">
            <span className="nav__lang-hu" aria-hidden />
          </button>
          <button type="button" className="nav__lang-flag" aria-pressed="false" title="English">
            <span className="nav__lang-en" aria-hidden />
          </button>
        </div>

        <Link to="/kapcsolat" className="btn btn--primary nav__cta">
          Ajánlatkérés
          <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.9" aria-hidden>
            <path d="M9 18l6-6-6-6" />
          </svg>
        </Link>

        <button
          className="nav__toggle"
          aria-label="Menü"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <div className="nav__mobile" role="dialog" aria-hidden={!open}>
        <nav className="nav__mobile-links" aria-label="Mobil menü">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === '/'}
              className={({ isActive }) =>
                `nav__mobile-link ${isActive ? 'nav__mobile-link--active' : ''}`
              }
            >
              {l.label}
            </NavLink>
          ))}
          <Link to="/kapcsolat" className="btn btn--primary nav__mobile-cta">
            Ajánlatkérés
            <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.9" aria-hidden>
              <path d="M9 18l6-6-6-6" />
            </svg>
          </Link>
        </nav>
      </div>
    </header>
  );
}
