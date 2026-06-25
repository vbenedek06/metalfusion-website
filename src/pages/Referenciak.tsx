import { useMemo, useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import PageHero from '../components/PageHero';
import Lightbox, { type LightboxImage } from '../components/Lightbox';
import { references, workshopGallery } from '../data/references';
import { useSEO } from '../hooks/useSEO';
import { canonical, localBusinessSchema, OG_IMAGE_PATH } from '../data/seo';
import './Referenciak.css';

type Filter = 'all' | string;

const industries = [
  'Pharmaceuticals',
  'Medical technology',
  'Machine building',
  'Packaging technology',
  'Food industry',
  'Plastics industry',
  'Construction hardware',
  'Prototype development',
];

export default function Referenciak() {
  useSEO({
    title: 'Referenciák — gyártási projektek | MetalFusion',
    description:
      'MetalFusion gyártási referenciák: gyógyszeripari, orvostechnikai, gépgyártó és csomagolástechnikai partnerek egyedi alkatrészei és berendezései.',
    canonical: canonical('/referenciak'),
    ogImage: OG_IMAGE_PATH,
    jsonLd: localBusinessSchema(),
  });

  const [filter, setFilter] = useState<Filter>('all');
  const [lightbox, setLightbox] = useState<{ images: LightboxImage[]; index: number } | null>(null);
  const mosaicRef = useRef<HTMLUListElement>(null);

  const refIndustries = useMemo(() => {
    const map = new Map<string, number>();
    references.forEach((r) => map.set(r.industry, (map.get(r.industry) ?? 0) + 1));
    return Array.from(map.entries()).sort((a, b) => b[1] - a[1]);
  }, []);

  const filteredRefs = useMemo(() => {
    if (filter === 'all') return references;
    return references.filter((r) => r.industry === filter);
  }, [filter]);

  useEffect(() => {
    if (!mosaicRef.current) return;
    const items = mosaicRef.current.querySelectorAll<HTMLElement>('.refs-mosaic__item');
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-in');
            io.unobserve(e.target);
          }
        });
      },
      { rootMargin: '120px 0px', threshold: 0.05 }
    );
    items.forEach((it) => io.observe(it));
    return () => io.disconnect();
  }, []);

  const openProjectGallery = (refSlug: string, startIndex = 0) => {
    const r = references.find((x) => x.slug === refSlug);
    if (!r) return;
    const images: LightboxImage[] = r.gallery.map((src, i) => ({
      src,
      alt: `${r.title} – ${i + 1}`,
      meta: `${r.industry} · ${r.year}`,
      caption: r.title,
    }));
    setLightbox({ images, index: startIndex });
  };

  const openWorkshop = (i: number) => {
    const images: LightboxImage[] = workshopGallery.map((w) => ({
      src: w.src,
      alt: w.alt,
      meta: w.category,
      caption: w.alt,
    }));
    setLightbox({ images, index: i });
  };

  return (
    <div className="refs-page">
      <PageHero
        eyebrow="References"
        title={<>Real manufacturing projects <br />for real customers.</>}
        lead="A curated selection of completed work. Our industrial partners include pharmaceutical, medical technology and machine-building companies."
        bgImage="/images/gallery/Screenshot_20211014-220249_Gallery.webp"
      />

      <div className="refs-filter">
        <div className="container refs-filter__row">
          <span className="refs-filter__label">Filter by industry</span>
          <div className="refs-filter__chips" role="tablist">
            <button
              type="button"
              role="tab"
              aria-selected={filter === 'all'}
              className={`refs-chip${filter === 'all' ? ' refs-chip--active' : ''}`}
              onClick={() => setFilter('all')}
            >
              All
              <span className="refs-chip__count">{references.length}</span>
            </button>
            {refIndustries.map(([name, count]) => (
              <button
                key={name}
                type="button"
                role="tab"
                aria-selected={filter === name}
                className={`refs-chip${filter === name ? ' refs-chip--active' : ''}`}
                onClick={() => setFilter(name)}
              >
                {name}
                <span className="refs-chip__count">{count}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <section className="refs-cases-section">
        <div className="container">
          <header className="refs-head" data-reveal>
            <div className="refs-head__meta">
              <span className="refs-num">01 / 03</span>
              <span className="refs-tag">Case studies</span>
            </div>
            <div className="refs-head__copy">
              <h2>{filter === 'all' ? 'Completed projects.' : `${filter} - ${filteredRefs.length} projects`}</h2>
              <p>Click a project cover image to open the full gallery.</p>
            </div>
          </header>

          {filteredRefs.length === 0 ? (
            <div className="refs-empty">
              <p>No reference case has been published for this industry yet.</p>
              <button type="button" className="btn btn--ghost" onClick={() => setFilter('all')}>
                Show all
              </button>
            </div>
          ) : (
            <ul className="refs-cases" data-reveal-stagger>
              {filteredRefs.map((r, i) => (
                <li key={r.slug} className={`refs-case refs-case--${i % 2 === 0 ? 'l' : 'r'}`}>
                  <button
                    type="button"
                    className="refs-case__media"
                    onClick={() => openProjectGallery(r.slug, 0)}
                    aria-label={`Open gallery for ${r.title}`}
                  >
                    <img
                      src={r.cover}
                      alt={r.title}
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="refs-case__overlay" aria-hidden />
                    <div className="refs-case__corners" aria-hidden>
                      <span /><span /><span /><span />
                    </div>
                    <span className="refs-case__zoom" aria-hidden>
                      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
                        <circle cx="11" cy="11" r="7" />
                        <path d="M16 16l5 5M9 11h4M11 9v4" />
                      </svg>
                    </span>
                    <span className="refs-case__count">{r.gallery.length} images</span>
                  </button>

                  <div className="refs-case__body">
                    <div className="refs-case__tags">
                      <span className="refs-case__tag">{r.industry}</span>
                      <span className="refs-case__sep" aria-hidden />
                      <span className="refs-case__year">{r.year}</span>
                    </div>
                    <h3 className="refs-case__title">{r.title}</h3>
                    <p className="refs-case__client">{r.client}</p>
                    <p className="refs-case__summary">{r.summary}</p>
                    <button
                      type="button"
                      className="refs-case__cta"
                      onClick={() => openProjectGallery(r.slug, 0)}
                    >
                      Open gallery
                      <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
                        <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      <section className="refs-mosaic-section">
        <div className="container">
          <header className="refs-head" data-reveal>
            <div className="refs-head__meta">
              <span className="refs-num">02 / 03</span>
              <span className="refs-tag">Workshop &amp; components</span>
            </div>
            <div className="refs-head__copy">
              <h2>Snapshots from everyday production.</h2>
              <p>A selection of machines, precision parts and work-in-progress moments. Click any image to enlarge it.</p>
            </div>
          </header>

          <ul ref={mosaicRef} className="refs-mosaic">
            {workshopGallery.map((img, i) => (
              <li key={img.src} className="refs-mosaic__item">
                <button
                  type="button"
                  className="refs-mosaic__btn"
                  onClick={() => openWorkshop(i)}
                  aria-label={`Enlarge image: ${img.alt}`}
                >
                  <img
                    src={img.src}
                    alt={img.alt}
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="refs-mosaic__overlay" aria-hidden>
                    <span className="refs-mosaic__cat">{img.category}</span>
                    <span className="refs-mosaic__zoom" aria-hidden>
                      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
                        <circle cx="11" cy="11" r="7" />
                        <path d="M16 16l5 5M9 11h4M11 9v4" />
                      </svg>
                    </span>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="refs-industries-section">
        <div className="container">
          <header className="refs-head" data-reveal>
            <div className="refs-head__meta">
              <span className="refs-num">03 / 03</span>
              <span className="refs-tag">Industries</span>
            </div>
            <div className="refs-head__copy">
              <h2>A supplier for almost every industrial sector.</h2>
              <p>From pharmaceutical, medical technology and machine-building companies to the food industry, custom manufacturing needs appear everywhere.</p>
            </div>
          </header>

          <ul className="refs-industries" data-reveal-stagger>
            {industries.map((i) => (
              <li key={i} className="refs-industry">
                <span className="refs-industry__dot" aria-hidden />
                {i}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="refs-cta">
        <div className="container">
          <div className="refs-cta__box" data-reveal>
            <div className="refs-cta__grid" aria-hidden />
            <div className="refs-cta__copy">
              <span className="refs-num refs-num--light">Let's talk</span>
              <h2>Looking for a supplier for a similar project?</h2>
              <p>Send us your technical drawing or 3D model and we will respond with a quote within 24 hours.</p>
              <div className="refs-cta__actions">
                <Link to="/kapcsolat" className="btn btn--primary">
                  Request a quote
                  <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
                    <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
                <Link to="/szolgaltatasok" className="btn btn--ghost">
                  Services
                  <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
                    <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {lightbox && (
        <Lightbox
          images={lightbox.images}
          index={lightbox.index}
          onClose={() => setLightbox(null)}
          onIndexChange={(i) => setLightbox((s) => (s ? { ...s, index: i } : s))}
        />
      )}
    </div>
  );
}
