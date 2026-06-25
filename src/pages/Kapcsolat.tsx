import { useEffect, useMemo, useState } from 'react';
import { useSEO } from '../hooks/useSEO';
import { canonical, localBusinessSchema, OG_IMAGE_PATH } from '../data/seo';
import ContactForm from '../components/ContactForm';
import './Kapcsolat.css';

const channels = [
  {
    key: 'phone',
    label: 'Phone',
    sub: 'Mon-Fri · 7:00-16:00',
    value: '+36 20 333 1218',
    href: 'tel:+36203331218',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.97.36 1.92.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.89.34 1.84.57 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
    ),
  },
  {
    key: 'email',
    label: 'Email',
    sub: 'Guaranteed 24h response',
    value: 'info@metalfusion.hu',
    href: 'mailto:info@metalfusion.hu',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="M3 7l9 6 9-6" />
      </svg>
    ),
  },
  {
    key: 'addr',
    label: 'Workshop',
    sub: 'By appointment',
    value: '1108 Budapest, Kozma Street',
    href: 'https://www.openstreetmap.org/?mlat=47.4783&mlon=19.1880#map=17/47.4783/19.1880',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s7-6.2 7-12a7 7 0 1 0-14 0c0 5.8 7 12 7 12z" />
        <circle cx="12" cy="10" r="2.5" />
      </svg>
    ),
  },
];

function getOpenStatus(now: Date) {
  const day = now.getDay();
  const minutes = now.getHours() * 60 + now.getMinutes();
  const isWeekday = day >= 1 && day <= 5;
  const openMin = 7 * 60;
  const closeMin = 16 * 60;
  if (isWeekday && minutes >= openMin && minutes < closeMin) {
    return { open: true, label: 'Workshop open', sub: 'Someone is available now' };
  }
  if (isWeekday && minutes < openMin) {
    return { open: false, label: 'Opening soon', sub: 'In the workshop from 7:00' };
  }
  return { open: false, label: 'Closed now', sub: 'Mon-Fri 7:00-16:00' };
}

export default function Kapcsolat() {
  useSEO({
    title: 'Kapcsolat — CNC ajánlatkérés 24 órán belül | MetalFusion',
    description:
      'Küldje el műhelyrajzát vagy 3D modelljét: 24 órán belül árajánlattal és gyárthatósági visszajelzéssel válaszolunk. Budapest, Kozma utca, X. kerület.',
    canonical: canonical('/kapcsolat'),
    ogImage: OG_IMAGE_PATH,
    jsonLd: localBusinessSchema(),
  });

  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 60_000);
    return () => window.clearInterval(id);
  }, []);

  const liveStatus = useMemo(() => getOpenStatus(now), [now]);
  const localTime = now.toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className="contact-page">
      {/* HERO — split screen */}
      <section className="contact-hero">
        <video
          className="contact-hero__video"
          src="/videos/contact-hero.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/images/contact-hero-poster.jpg"
          aria-hidden="true"
        />
        <div className="contact-hero__video-overlay" aria-hidden />
        <div className="container contact-hero__inner">
          <div className="contact-hero__left">
            <div className={`contact-hero__status${liveStatus.open ? ' contact-hero__status--open' : ''}`}>
              <span className="contact-hero__status-dot" aria-hidden />
              <span className="contact-hero__status-label">{liveStatus.label}</span>
              <span className="contact-hero__status-sep" aria-hidden />
              <span className="contact-hero__status-sub">{liveStatus.sub}</span>
            </div>

            <h1 className="contact-hero__title">Request your quote.</h1>

            <p className="contact-hero__lead">
              Send a technical drawing, 3D model or PDF and a responsible engineer will get back to
              you with a quote, manufacturability feedback and a realistic lead time.
            </p>

            <div className="contact-hero__meta">
              <div className="contact-hero__meta-item">
                <span className="contact-hero__meta-label">Local time</span>
                <span className="contact-hero__meta-value">{localTime} <small>Budapest</small></span>
              </div>
              <div className="contact-hero__meta-item">
                <span className="contact-hero__meta-label">Response time</span>
                <span className="contact-hero__meta-value">&lt; 24 hours</span>
              </div>
              <div className="contact-hero__meta-item">
                <span className="contact-hero__meta-label">Languages</span>
                <span className="contact-hero__meta-value">HU · EN · DE</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* FORM + CONTACT CHANNELS */}
      <section className="contact-main">
        <div className="container contact-main__grid">
          {/* FORM CARD */}
          <div className="contact-form-card" data-reveal>
            <header className="contact-form-card__head">
              <span className="contact-form-card__eyebrow">Quote request form</span>
              <h2>Briefly describe the task.</h2>
              <p>The more details you provide - material, quantity, deadline and drawings - the more accurate our quote can be.</p>
            </header>

            <ContactForm />
          </div>

          {/* CHANNELS SIDEBAR */}
          <aside className="contact-side">
            <ul className="contact-channels" data-reveal-stagger>
              {channels.map((c) => (
                <li key={c.key} className="contact-channel">
                  <a
                    href={c.href}
                    target={c.key === 'addr' ? '_blank' : undefined}
                    rel={c.key === 'addr' ? 'noreferrer noopener' : undefined}
                    className="contact-channel__link"
                  >
                    <span className="contact-channel__icon" aria-hidden>{c.icon}</span>
                    <div className="contact-channel__body">
                      <span className="contact-channel__label">{c.label}</span>
                      <span className="contact-channel__value">{c.value}</span>
                      <span className="contact-channel__sub">{c.sub}</span>
                    </div>
                    <span className="contact-channel__arrow" aria-hidden>
                      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M7 17L17 7M9 7h8v8" />
                      </svg>
                    </span>
                  </a>
                </li>
              ))}
            </ul>

            <div className="contact-hours" data-reveal>
              <span className="contact-hours__head">Opening hours</span>
              <ul>
                <li><span>Mon-Fri</span><strong>7:00-16:00</strong></li>
                <li><span>Sat-Sun</span><strong>Closed</strong></li>
              </ul>
              <div className={`contact-hours__pill${liveStatus.open ? ' contact-hours__pill--open' : ''}`}>
                <span className="contact-hours__pill-dot" aria-hidden />
                {liveStatus.label} · {localTime}
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* MAP */}
      <section className="contact-map-section">
        <div className="container">
          <header className="contact-map-head" data-reveal>
            <div>
              <span className="contact-map-head__eyebrow">Workshop</span>
              <h2>1108 Budapest, Kozma Street</h2>
              <p>Visits to our District X workshop are welcome by prior appointment.</p>
            </div>
            <a
              href="https://www.google.com/maps/dir/?api=1&destination=1108+Budapest+Kozma+utca"
              target="_blank"
              rel="noreferrer noopener"
              className="contact-map-head__btn"
            >
              Directions in Google Maps
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
                <path d="M7 17L17 7M9 7h8v8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </header>

          <div className="contact-map">
            <iframe
              title="MetalFusion workshop - map"
              src="https://www.openstreetmap.org/export/embed.html?bbox=19.180%2C47.475%2C19.196%2C47.482&amp;layer=mapnik&amp;marker=47.4783%2C19.1880"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <div className="contact-map__overlay" aria-hidden />
            <div className="contact-map__pin">
              <span className="contact-map__pin-dot" aria-hidden />
              <div>
                <strong>MetalFusion workshop</strong>
                <span>1108 Budapest, Kozma Street</span>
              </div>
            </div>
            <div className="contact-map__corners" aria-hidden>
              <span /><span /><span /><span />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="contact-faq-section">
        <div className="container contact-faq__grid">
          <div className="contact-faq__intro" data-reveal>
            <span className="contact-faq__eyebrow">FAQ</span>
            <h2>Before you send a quote request.</h2>
            <p>A few answers to common questions. If something is missing, feel free to write to us.</p>
          </div>

          <ul className="contact-faq" data-reveal-stagger>
            <li>
              <details>
                <summary>
                  Which file formats do you accept?
                  <span aria-hidden />
                </summary>
                <p>STEP, IGES, DWG, STL, PDF and JPG - all common technical drawing and 3D model formats. If your file is larger than 10 MB, send a WeTransfer or Google Drive link.</p>
              </details>
            </li>
            <li>
              <details>
                <summary>
                  What is the typical lead time?
                  <span aria-hidden />
                </summary>
                <p>Depending on the task, it is usually 3-21 business days. Simple parts can take only a few days, while complex series may take 2-3 weeks. The exact deadline is always stated in the quote.</p>
              </details>
            </li>
            <li>
              <details>
                <summary>
                  Do you accept a single prototype?
                  <span aria-hidden />
                </summary>
                <p>Yes, we work from a single piece. For prototypes, we pay special attention to manufacturability so the part can be prepared for series production later.</p>
              </details>
            </li>
            <li>
              <details>
                <summary>
                  What is included in the quote?
                  <span aria-hidden />
                </summary>
                <p>Material cost, machining time, total price, deadline, payment terms, packaging and delivery. If there are options, we also list the alternatives.</p>
              </details>
            </li>
            <li>
              <details>
                <summary>
                  Can I visit the workshop?
                  <span aria-hidden />
                </summary>
                <p>Yes, we are happy to welcome visitors by prior appointment. You can arrange a visit by phone or email.</p>
              </details>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}
