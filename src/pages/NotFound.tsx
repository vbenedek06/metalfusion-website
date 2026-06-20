import { Link } from 'react-router-dom';
import PageHero from '../components/PageHero';
import { useSEO } from '../hooks/useSEO';

export default function NotFound() {
  useSEO({
    title: '404 - Page not found | MetalFusion',
    description: 'The page you are looking for could not be found. Return to the home page.',
  });

  return (
    <>
      <PageHero
        eyebrow="404"
        title={<>Page not found.</>}
        lead="The page you are looking for does not exist or has been moved. Return to the home page or contact us directly."
        showCrumb={false}
      />
      <section className="section section--tight">
        <div className="container">
        <div style={{ display: 'flex', gap: 12, marginTop: 8, flexWrap: 'wrap' }}>
          <Link to="/" className="btn btn--primary">
            Back to home
          </Link>
          <Link to="/kapcsolat" className="btn btn--ghost">
            Contact
          </Link>
        </div>
        </div>
      </section>
    </>
  );
}
