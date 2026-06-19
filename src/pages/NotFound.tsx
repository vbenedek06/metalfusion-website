import { Link } from 'react-router-dom';
import { useSEO } from '../hooks/useSEO';

export default function NotFound() {
  useSEO({
    title: '404 – Az oldal nem található | MetalFusion',
    description: 'A keresett oldal nem található. Térjen vissza a főoldalra.',
  });

  return (
    <section className="page-hero" style={{ minHeight: '70vh' }}>
      <div className="container page-hero__inner">
        <span className="page-hero__crumb">404</span>
        <h1>Az oldal nem található.</h1>
        <p className="lead">
          A keresett oldal nem létezik vagy átkerült. Térjen vissza a főoldalra, vagy keressen
          minket közvetlenül.
        </p>
        <div style={{ display: 'flex', gap: 12, marginTop: 8, flexWrap: 'wrap' }}>
          <Link to="/" className="btn btn--primary">
            Vissza a főoldalra
          </Link>
          <Link to="/kapcsolat" className="btn btn--ghost">
            Kapcsolat
          </Link>
        </div>
      </div>
    </section>
  );
}
