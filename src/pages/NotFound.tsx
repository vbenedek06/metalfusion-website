import { Link } from 'react-router-dom';
import PageHero from '../components/PageHero';
import { useSEO } from '../hooks/useSEO';

export default function NotFound() {
  useSEO({
    title: '404 — Az oldal nem található | MetalFusion',
    description:
      'A keresett oldal nem található. Térjen vissza a főoldalra, vagy nézze meg szolgáltatásainkat és referenciáinkat.',
    noindex: true,
  });

  return (
    <>
      <PageHero
        eyebrow="404"
        title={<>Az oldal nem található.</>}
        lead="A keresett oldal nem létezik vagy áthelyezésre került. Térjen vissza a főoldalra, vagy lépjen velünk kapcsolatba."
        showCrumb={false}
      />
      <section className="section section--tight">
        <div className="container">
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
    </>
  );
}
