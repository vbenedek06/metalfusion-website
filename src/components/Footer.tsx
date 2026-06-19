import { Link } from 'react-router-dom';
import './Footer.css';

const pages = [
  { to: '/', label: 'Főoldal' },
  { to: '/rolunk', label: 'Rólunk' },
  { to: '/szolgaltatasok', label: 'Szolgáltatások' },
  { to: '/referenciak', label: 'Referenciák' },
  { to: '/geppark', label: 'Géppark' },
  { to: '/kapcsolat', label: 'Kapcsolat' },
];

const services = [
  'CNC marás',
  'CNC esztergálás',
  'Egyéb megmunkálás',
  'Összeszerelés',
  'Minőségbiztosítás',
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          <div className="footer__brand">
            <Link to="/" className="footer__brand-link" aria-label="MetalFusion főoldal">
              <img src="/images/logo.svg" alt="" />
              <span>
                METALFUSION
                <small>Precízió a fémben</small>
              </span>
            </Link>
            <p>
              Egyedi kis- és nagyszériás alkatrészgyártás magas minőségben, modern gépparkkal
              és tapasztalt szakembergárdával.
            </p>
          </div>

          <div className="footer__col">
            <h4>Gyors linkek</h4>
            <ul>
              {pages.map((page) => (
                <li key={page.to}>
                  <Link to={page.to}>{page.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer__col">
            <h4>Szolgáltatások</h4>
            <ul>
              {services.map((service) => (
                <li key={service}>{service}</li>
              ))}
            </ul>
          </div>

          <div className="footer__col">
            <h4>Elérhetőség</h4>
            <ul>
              <li>Budapest 10. ker. Kozma utca</li>
              <li><a href="tel:+36203331218">+36 20 333 1218</a></li>
              <li><a href="mailto:info@metalfusion.hu">info@metalfusion.hu</a></li>
            </ul>
          </div>
        </div>

        <div className="footer__bottom">
          <span>© {new Date().getFullYear()} MetalFusion. Minden jog fenntartva.</span>
          <span className="footer__meta">Precíziós megmunkálás · Budapest</span>
        </div>
      </div>
    </footer>
  );
}
