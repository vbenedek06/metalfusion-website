import { Link } from 'react-router-dom';
import './Footer.css';

const pages = [
  { to: '/', label: 'Home' },
  { to: '/rolunk', label: 'About' },
  { to: '/szolgaltatasok', label: 'Services' },
  { to: '/referenciak', label: 'References' },
  { to: '/geppark', label: 'Machine Park' },
  { to: '/kapcsolat', label: 'Contact' },
];

const services = [
  'CNC milling',
  'CNC turning',
  'Secondary machining',
  'Assembly',
  'Quality assurance',
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          <div className="footer__brand">
            <Link to="/" className="footer__brand-link" aria-label="MetalFusion home">
              <img src="/images/logo.png" alt="" />
              <span>
                METALFUSION
                <small>Precision in metal</small>
              </span>
            </Link>
            <p>
              Custom low- and high-volume component manufacturing with modern machinery,
              experienced specialists and consistently high quality.
            </p>
          </div>

          <div className="footer__col">
            <h4>Quick links</h4>
            <ul>
              {pages.map((page) => (
                <li key={page.to}>
                  <Link to={page.to}>{page.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer__col">
            <h4>Services</h4>
            <ul>
              {services.map((service) => (
                <li key={service}>{service}</li>
              ))}
            </ul>
          </div>

          <div className="footer__col">
            <h4>Contact</h4>
            <ul>
              <li>Budapest, District X, Kozma Street</li>
              <li><a href="tel:+36203331218">+36 20 333 1218</a></li>
              <li><a href="mailto:info@metalfusion.hu">info@metalfusion.hu</a></li>
            </ul>
          </div>
        </div>

        <div className="footer__bottom">
          <span>© {new Date().getFullYear()} MetalFusion. All rights reserved.</span>
          <span className="footer__bottom-links">
            <Link to="/adatvedelem">Privacy policy</Link>
            <span aria-hidden>·</span>
            <Link to="/impresszum">Imprint</Link>
            <span aria-hidden>·</span>
            <span className="footer__meta">Precision machining · Budapest</span>
          </span>
        </div>
      </div>
    </footer>
  );
}
