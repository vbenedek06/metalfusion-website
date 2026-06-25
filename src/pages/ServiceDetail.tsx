import { useParams, Link, Navigate } from 'react-router-dom';
import PageHero from '../components/PageHero';
import { useSEO } from '../hooks/useSEO';
import {
  getServiceDetail,
  serviceDetails,
  type ServiceDetail as ServiceDetailType,
} from '../data/serviceDetails';
import { canonical, localBusinessWithServiceSchema, SITE_BASE_URL, OG_IMAGE_PATH } from '../data/seo';
import './ServiceDetail.css';

function buildRelated(detail: ServiceDetailType) {
  return detail.relatedSlugs
    .map((slug) => serviceDetails.find((s) => s.slug === slug))
    .filter((s): s is ServiceDetailType => Boolean(s));
}

export default function ServiceDetail() {
  const { slug } = useParams<{ slug: string }>();
  const detail = slug ? getServiceDetail(slug) : undefined;

  const route = detail ? `/szolgaltatasok/${detail.slug}` : '/szolgaltatasok';

  useSEO({
    title: detail?.metaTitle ?? 'Szolgáltatások | MetalFusion',
    description:
      detail?.metaDescription ??
      'CNC marás, esztergálás, prototípusgyártás, szerszámgyártás, kis- és nagyszériás termelés Budapesten.',
    canonical: canonical(route),
    ogImage: OG_IMAGE_PATH,
    jsonLd: detail
      ? localBusinessWithServiceSchema({
          name: detail.h1,
          description: detail.metaDescription,
          url: `${SITE_BASE_URL}${route}`,
        })
      : undefined,
  });

  if (!detail) {
    return <Navigate to="/szolgaltatasok" replace />;
  }

  const related = buildRelated(detail);

  return (
    <div className="service-detail-page">
      <PageHero
        eyebrow={detail.eyebrow}
        title={detail.h1}
        lead={detail.lead}
        bgImage={detail.bgImage}
      />

      <section className="sd-intro">
        <div className="container sd-intro__grid">
          <aside className="sd-intro__side">
            <span className="sd-intro__kicker">Áttekintés</span>
            <p className="sd-intro__breadcrumb">
              <Link to="/szolgaltatasok">Szolgáltatások</Link>
              <span aria-hidden> / </span>
              <span>{detail.h1.split(' Budapest')[0]}</span>
            </p>
          </aside>
          <div className="sd-intro__copy">
            <p>{detail.intro}</p>
          </div>
        </div>
      </section>

      <section className="sd-section">
        <div className="container sd-twocol">
          <header className="sd-twocol__head">
            <h2>Amit nyújtunk</h2>
            <p>Konkrét képességek és paraméterek erre a szolgáltatásra.</p>
          </header>

          <div className="sd-twocol__panels">
            <div className="sd-panel" data-reveal>
              <h3>Képességek</h3>
              <ul className="sd-bullets">
                {detail.capabilities.map((cap) => (
                  <li key={cap}>
                    <span className="sd-bullet-dot" aria-hidden />
                    {cap}
                  </li>
                ))}
              </ul>
            </div>

            <div className="sd-panel" data-reveal>
              <h3>Műszaki paraméterek</h3>
              <dl className="sd-params">
                {detail.parameters.map((p) => (
                  <div key={p.label} className="sd-params__row">
                    <dt>{p.label}</dt>
                    <dd>{p.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </section>

      <section className="sd-section sd-section--alt">
        <div className="container sd-twocol">
          <header className="sd-twocol__head">
            <h2>Tipikus alkalmazások és anyagok</h2>
            <p>Hol használjuk ezt a megoldást, és milyen anyagokkal dolgozunk.</p>
          </header>

          <div className="sd-twocol__panels">
            <div className="sd-panel" data-reveal>
              <h3>Tipikus alkalmazások</h3>
              <ul className="sd-bullets">
                {detail.applications.map((app) => (
                  <li key={app}>
                    <span className="sd-bullet-dot" aria-hidden />
                    {app}
                  </li>
                ))}
              </ul>
            </div>

            <div className="sd-panel" data-reveal>
              <h3>Anyagok</h3>
              <ul className="sd-bullets">
                {detail.materials.map((mat) => (
                  <li key={mat}>
                    <span className="sd-bullet-dot" aria-hidden />
                    {mat}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="sd-section">
        <div className="container">
          <header className="sd-related-head">
            <h2>Kapcsolódó szolgáltatások</h2>
            <p>
              Ha ezzel a megoldással foglalkozol, valószínűleg ezekre is szükséged lehet —
              vagy nézd meg a <Link to="/szolgaltatasok">teljes szolgáltatás-listát</Link>,
              illetve a <Link to="/referenciak">korábbi gyártási projekteket</Link>.
            </p>
          </header>

          <ul className="sd-related-grid" data-reveal-stagger>
            {related.map((r) => (
              <li key={r.slug} className="sd-related-card">
                <Link to={`/szolgaltatasok/${r.slug}`} className="sd-related-link">
                  <span className="sd-related-kicker">Szolgáltatás</span>
                  <h3>{r.h1.split(' Budapest')[0]}</h3>
                  <p>{r.lead}</p>
                  <span className="sd-related-cta">
                    Megnézem
                    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
                      <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="sd-cta">
        <div className="container">
          <div className="sd-cta__box" data-reveal>
            <div className="sd-cta__copy">
              <span className="sd-cta__kicker">Ajánlatkérés</span>
              <h2>Küldje el a műhelyrajzot, 24 órán belül válaszolunk.</h2>
              <p>
                STEP, IGES, DWG vagy PDF — egy felelős mérnök visszajelez ajánlattal és
                gyárthatósági javaslattal. Lássuk a <Link to="/referenciak">korábbi projekteket</Link>,
                ha hasonlóra van szüksége.
              </p>
              <div className="sd-cta__actions">
                <Link to="/kapcsolat" className="btn btn--primary">
                  Ajánlatkérés
                  <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
                    <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
                <Link to="/szolgaltatasok" className="btn btn--ghost">
                  Vissza a szolgáltatásokhoz
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
