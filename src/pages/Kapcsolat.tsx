import { useEffect, useMemo, useState, type FormEvent } from 'react';
import { useSEO } from '../hooks/useSEO';
import './Kapcsolat.css';

interface FormState {
  name: string;
  company: string;
  email: string;
  phone: string;
  topic: string;
  message: string;
}

const empty: FormState = {
  name: '',
  company: '',
  email: '',
  phone: '',
  topic: 'Ajánlatkérés',
  message: '',
};

const topics = [
  'Ajánlatkérés',
  'Prototípus / kis széria',
  'Sorozatgyártás',
  'Műhely-látogatás',
  'Egyéb',
];

const acceptedFormats = ['STEP', 'IGES', 'DWG', 'STL', 'PDF', 'JPG'];

const channels = [
  {
    key: 'phone',
    label: 'Telefon',
    sub: 'H–P · 7:00 – 16:00',
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
    label: 'E-mail',
    sub: 'Garantált 24h válasz',
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
    label: 'Műhely',
    sub: 'Időpont-egyeztetéssel',
    value: '1108 Budapest, Kozma utca',
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
    return { open: true, label: 'Műhely nyitva', sub: 'Most felveszi valaki' };
  }
  if (isWeekday && minutes < openMin) {
    return { open: false, label: 'Hamarosan nyitunk', sub: '7:00-kor a műhelyben' };
  }
  return { open: false, label: 'Most zárva', sub: 'H–P 7:00 – 16:00' };
}

export default function Kapcsolat() {
  useSEO({
    title: 'Kapcsolat — MetalFusion ajánlatkérés',
    description:
      'Küldje el műhelyrajzát vagy 3D modelljét — 24 órán belül válaszolunk. Telefon, e-mail, budapesti műhely.',
  });

  const [data, setData] = useState<FormState>(empty);
  const [status, setStatus] = useState<'idle' | 'sent'>('idle');
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 60_000);
    return () => window.clearInterval(id);
  }, []);

  const liveStatus = useMemo(() => getOpenStatus(now), [now]);
  const localTime = now.toLocaleTimeString('hu-HU', {
    hour: '2-digit',
    minute: '2-digit',
  });

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setData((d) => ({ ...d, [key]: value }));
  }

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const subject = encodeURIComponent(`${data.topic} – ${data.name || 'MetalFusion'}`);
    const body = encodeURIComponent(
      `Név: ${data.name}\nCég: ${data.company}\nE-mail: ${data.email}\nTelefon: ${data.phone}\nTéma: ${data.topic}\n\nÜzenet:\n${data.message}`
    );
    window.location.href = `mailto:info@metalfusion.hu?subject=${subject}&body=${body}`;
    setStatus('sent');
  }

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
          poster="/images/gallery/nagygep2.jpg"
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

            <h1 className="contact-hero__title">Kérje ajánlatát.</h1>

            <p className="contact-hero__lead">
              Műhelyrajz, 3D modell vagy PDF — küldje el, és egy felelős mérnök még ma jelentkezik
              árajánlattal, gyárthatósági javaslatokkal és reális határidővel.
            </p>

            <div className="contact-hero__meta">
              <div className="contact-hero__meta-item">
                <span className="contact-hero__meta-label">Helyi idő</span>
                <span className="contact-hero__meta-value">{localTime} <small>Budapest</small></span>
              </div>
              <div className="contact-hero__meta-item">
                <span className="contact-hero__meta-label">Válaszidő</span>
                <span className="contact-hero__meta-value">&lt; 24 óra</span>
              </div>
              <div className="contact-hero__meta-item">
                <span className="contact-hero__meta-label">Nyelv</span>
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
          <div className="contact-form-card">
            <header className="contact-form-card__head">
              <span className="contact-form-card__eyebrow">Ajánlatkérő űrlap</span>
              <h2>Írja le röviden a feladatot.</h2>
              <p>Minél több részletet ad meg (anyag, mennyiség, határidő, csatolt rajz), annál pontosabb árajánlatot küldünk.</p>
            </header>

            <form className="contact-form" onSubmit={onSubmit} noValidate>
              <div className="contact-form__row">
                <label className="contact-form__field">
                  <span className="contact-form__label">Név</span>
                  <input
                    required
                    type="text"
                    value={data.name}
                    onChange={(e) => update('name', e.target.value)}
                    autoComplete="name"
                    placeholder="Kovács János"
                  />
                </label>
                <label className="contact-form__field">
                  <span className="contact-form__label">Cégnév</span>
                  <input
                    type="text"
                    value={data.company}
                    onChange={(e) => update('company', e.target.value)}
                    autoComplete="organization"
                    placeholder="Példa Kft."
                  />
                </label>
              </div>

              <div className="contact-form__row">
                <label className="contact-form__field">
                  <span className="contact-form__label">E-mail cím</span>
                  <input
                    required
                    type="email"
                    value={data.email}
                    onChange={(e) => update('email', e.target.value)}
                    autoComplete="email"
                    placeholder="nev@cegnev.hu"
                  />
                </label>
                <label className="contact-form__field">
                  <span className="contact-form__label">Telefonszám</span>
                  <input
                    type="tel"
                    value={data.phone}
                    onChange={(e) => update('phone', e.target.value)}
                    autoComplete="tel"
                    placeholder="+36 20 123 4567"
                  />
                </label>
              </div>

              <fieldset className="contact-form__topic">
                <legend className="contact-form__label">Téma</legend>
                <div className="contact-form__chips">
                  {topics.map((t) => (
                    <label key={t} className={`contact-form__chip${data.topic === t ? ' contact-form__chip--active' : ''}`}>
                      <input
                        type="radio"
                        name="topic"
                        value={t}
                        checked={data.topic === t}
                        onChange={() => update('topic', t)}
                      />
                      {t}
                    </label>
                  ))}
                </div>
              </fieldset>

              <label className="contact-form__field">
                <span className="contact-form__label">Üzenet</span>
                <textarea
                  required
                  rows={6}
                  value={data.message}
                  onChange={(e) => update('message', e.target.value)}
                  placeholder="Anyagminőség, mennyiség, határidő, csatolt műhelyrajz / 3D modell elérhetősége…"
                />
              </label>

              <div className="contact-form__attach">
                <span className="contact-form__attach-head">
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <path d="M21 12.5l-9 9a5 5 0 0 1-7-7l9-9a3.5 3.5 0 0 1 5 5l-9 9a2 2 0 0 1-3-3l8-8" />
                  </svg>
                  Elfogadott fájlok az e-mailben
                </span>
                <ul className="contact-form__formats">
                  {acceptedFormats.map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>
              </div>

              <div className="contact-form__footer">
                <button type="submit" className="contact-form__submit">
                  <span>Ajánlatkérés elküldése</span>
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
                    <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                <span className="contact-form__legal">
                  Az adatait kizárólag az ajánlatkérés megválaszolására használjuk.
                </span>
              </div>

              {status === 'sent' && (
                <div className="contact-form__sent" role="status">
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <path d="M5 12l5 5L20 7" />
                  </svg>
                  Megnyitottuk a levelezőjét — küldje el az üzenetet, és 24 órán belül jelentkezünk.
                </div>
              )}
            </form>
          </div>

          {/* CHANNELS SIDEBAR */}
          <aside className="contact-side">
            <ul className="contact-channels">
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

            <div className="contact-hours">
              <span className="contact-hours__head">Nyitvatartás</span>
              <ul>
                <li><span>H – P</span><strong>7:00 – 16:00</strong></li>
                <li><span>Szo – V</span><strong>Zárva</strong></li>
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
          <header className="contact-map-head">
            <div>
              <span className="contact-map-head__eyebrow">Műhely</span>
              <h2>1108 Budapest, Kozma utca</h2>
              <p>A X. kerületi műhelyünkbe előzetes időpont-egyeztetés után szívesen várjuk.</p>
            </div>
            <a
              href="https://www.google.com/maps/dir/?api=1&destination=1108+Budapest+Kozma+utca"
              target="_blank"
              rel="noreferrer noopener"
              className="contact-map-head__btn"
            >
              Útvonal Google Maps-ben
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
                <path d="M7 17L17 7M9 7h8v8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </header>

          <div className="contact-map">
            <iframe
              title="MetalFusion műhely – térkép"
              src="https://www.openstreetmap.org/export/embed.html?bbox=19.180%2C47.475%2C19.196%2C47.482&amp;layer=mapnik&amp;marker=47.4783%2C19.1880"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <div className="contact-map__overlay" aria-hidden />
            <div className="contact-map__pin">
              <span className="contact-map__pin-dot" aria-hidden />
              <div>
                <strong>MetalFusion műhely</strong>
                <span>1108 Budapest, Kozma utca</span>
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
          <div className="contact-faq__intro">
            <span className="contact-faq__eyebrow">Gyakori kérdések</span>
            <h2>Mielőtt elküldi az ajánlatkérést.</h2>
            <p>Néhány válasz a leggyakoribb kérdésekre — ha valamelyik nincs a listán, írjon bátran.</p>
          </div>

          <ul className="contact-faq">
            <li>
              <details>
                <summary>
                  Milyen fájlformátumot fogadtok?
                  <span aria-hidden />
                </summary>
                <p>STEP, IGES, DWG, STL, PDF és JPG — minden szokványos műhelyrajz és 3D modell formátumot. Ha a fájlja nagyobb 10 MB-nál, küldjön WeTransfer / Google Drive linket.</p>
              </details>
            </li>
            <li>
              <details>
                <summary>
                  Mennyi az átfutási idő?
                  <span aria-hidden />
                </summary>
                <p>A feladattól függően általában 3 – 21 munkanap. Egyszerű alkatrésznél akár pár nap, komplex sorozatnál 2–3 hét. A pontos határidőt mindig az ajánlatban rögzítjük.</p>
              </details>
            </li>
            <li>
              <details>
                <summary>
                  Vállaltok-e egyetlen prototípust?
                  <span aria-hidden />
                </summary>
                <p>Igen — 1 db-tól is dolgozunk. Prototípusgyártásnál külön figyelemmel egyeztetjük a gyárthatóságot, hogy a sorozatra is felkészüljünk.</p>
              </details>
            </li>
            <li>
              <details>
                <summary>
                  Mit ír az ajánlatban?
                  <span aria-hidden />
                </summary>
                <p>Anyagköltség, megmunkálási idő, teljes ár, határidő, fizetési feltételek, csomagolás és szállítás. Opciók esetén alternatívákat is jelölünk.</p>
              </details>
            </li>
            <li>
              <details>
                <summary>
                  Lehet-e a műhelyt meglátogatni?
                  <span aria-hidden />
                </summary>
                <p>Igen, előzetes időpont-egyeztetést követően szívesen fogadunk. Telefonon vagy e-mailben tudja egyeztetni a látogatást.</p>
              </details>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}
