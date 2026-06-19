import { useMemo, useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import PageHero from '../components/PageHero';
import Lightbox, { type LightboxImage } from '../components/Lightbox';
import { references, workshopGallery } from '../data/references';
import { useSEO } from '../hooks/useSEO';
import './Referenciak.css';

type Filter = 'all' | string;

const industries = [
  'Gyógyszeripar',
  'Orvostechnika',
  'Gépgyártás',
  'Csomagolástechnika',
  'Élelmiszeripar',
  'Műanyagipar',
  'Építőipari vasalat',
  'Prototípusfejlesztés',
];

export default function Referenciak() {
  useSEO({
    title: 'Referenciák — MetalFusion gyártási projektek',
    description:
      'Gyógyszeripari, orvostechnikai és gépgyártó vállalatoknak gyártott egyedi alkatrészek és komplett mechanikák.',
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
        eyebrow="Referenciák"
        title={<>Valós gyártási projektek, <br />valós ügyfeleknek.</>}
        lead="Egy bemutató válogatás megvalósult munkáinkból. Iparági partnereink között gyógyszergyártó, orvostechnikai és gépgyártó vállalatok egyaránt megtalálhatók."
        bgImage="/images/gallery/Screenshot_20211014-220249_Gallery.jpg"
      />

      <div className="refs-filter">
        <div className="container refs-filter__row">
          <span className="refs-filter__label">Szűrés iparág szerint</span>
          <div className="refs-filter__chips" role="tablist">
            <button
              type="button"
              role="tab"
              aria-selected={filter === 'all'}
              className={`refs-chip${filter === 'all' ? ' refs-chip--active' : ''}`}
              onClick={() => setFilter('all')}
            >
              Mind
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
          <header className="refs-head">
            <div className="refs-head__meta">
              <span className="refs-num">01 / 03</span>
              <span className="refs-tag">Esettanulmányok</span>
            </div>
            <div className="refs-head__copy">
              <h2>{filter === 'all' ? 'Megvalósult projektek.' : `${filter} — ${filteredRefs.length} projekt`}</h2>
              <p>Kattints egy projekt borítóképére a teljes galéria megnyitásához.</p>
            </div>
          </header>

          {filteredRefs.length === 0 ? (
            <div className="refs-empty">
              <p>Ehhez az iparághoz még nem publikáltunk referencia esetet.</p>
              <button type="button" className="btn btn--ghost" onClick={() => setFilter('all')}>
                Mind mutatása
              </button>
            </div>
          ) : (
            <ul className="refs-cases">
              {filteredRefs.map((r, i) => (
                <li key={r.slug} className={`refs-case refs-case--${i % 2 === 0 ? 'l' : 'r'}`}>
                  <button
                    type="button"
                    className="refs-case__media"
                    onClick={() => openProjectGallery(r.slug, 0)}
                    aria-label={`${r.title} galéria megnyitása`}
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
                    <span className="refs-case__count">{r.gallery.length} kép</span>
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
                      Galéria megnyitása
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
          <header className="refs-head">
            <div className="refs-head__meta">
              <span className="refs-num">02 / 03</span>
              <span className="refs-tag">Műhely &amp; alkatrészek</span>
            </div>
            <div className="refs-head__copy">
              <h2>Pillanatképek a hétköznapokból.</h2>
              <p>Egy válogatás a gépparkról, finomalkatrészekről és a munka közbeni állapotokról. Kattints bármelyik képre a nagyításhoz.</p>
            </div>
          </header>

          <ul ref={mosaicRef} className="refs-mosaic">
            {workshopGallery.map((img, i) => (
              <li key={img.src} className="refs-mosaic__item">
                <button
                  type="button"
                  className="refs-mosaic__btn"
                  onClick={() => openWorkshop(i)}
                  aria-label={`Kép nagyítása: ${img.alt}`}
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
          <header className="refs-head">
            <div className="refs-head__meta">
              <span className="refs-num">03 / 03</span>
              <span className="refs-tag">Iparágak</span>
            </div>
            <div className="refs-head__copy">
              <h2>Beszállítóként szinte minden iparágban otthon.</h2>
              <p>A gyógyszer-, orvostechnika- és gépgyártó vállalatoktól az élelmiszeriparig — egyedi gyártási igények mindenhol.</p>
            </div>
          </header>

          <ul className="refs-industries">
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
          <div className="refs-cta__box">
            <div className="refs-cta__grid" aria-hidden />
            <div className="refs-cta__copy">
              <span className="refs-num refs-num--light">Beszéljünk</span>
              <h2>Hasonló projekttel keres beszállítót?</h2>
              <p>Küldje el a műhelyrajzot vagy 3D modellt — 24 órán belül árajánlattal jelentkezünk.</p>
              <div className="refs-cta__actions">
                <Link to="/kapcsolat" className="btn btn--primary">
                  Ajánlatot kérek
                  <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
                    <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
                <Link to="/szolgaltatasok" className="btn btn--ghost">
                  Szolgáltatások
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
