import PageHero from '../components/PageHero';
import { useSEO } from '../hooks/useSEO';
import {
  canonical,
  localBusinessSchema,
  OG_IMAGE_PATH,
  COMPANY_NAME,
  STREET_ADDRESS,
  POSTAL_CODE,
  CITY,
  PHONE_DISPLAY,
  PHONE,
  EMAIL,
} from '../data/seo';
import './Adatvedelem.css';

// Mandatory imprint per Hungarian Electronic Commerce Act
// (Ekertv. 2001. évi CVIII. törvény 4. §).
// Pulls cégadatok from src/data/seo.ts so a single update propagates everywhere.

export default function Impresszum() {
  useSEO({
    title: 'Impresszum — MetalFusion',
    description:
      'A MetalFusion kötelező cégadatai az Ekertv. szerint: cég neve, székhely, cégjegyzékszám, adószám, képviselő, elérhetőség, tárhelyszolgáltató.',
    canonical: canonical('/impresszum'),
    ogImage: OG_IMAGE_PATH,
    jsonLd: localBusinessSchema(),
  });

  return (
    <>
      <PageHero
        eyebrow="Impresszum"
        title={<>Impresszum</>}
        lead="Kötelező cégadatok a magyar elektronikus kereskedelmi törvény (Ekertv.) szerint."
      />

      <section className="section privacy">
        <div className="container privacy__inner">
          <article className="privacy__doc">
            <p className="privacy__note">
              Az alábbi adatok az elektronikus kereskedelmi szolgáltatások, valamint az
              információs társadalommal összefüggő szolgáltatások egyes kérdéseiről szóló
              2001. évi CVIII. törvény (Ekertv.) 4. §-a alapján közöltetnek.
            </p>

            <h2>1. Szolgáltató (cégadatok)</h2>
            <ul>
              <li>
                <strong>Cég neve:</strong> {COMPANY_NAME}{' '}
                <span className="privacy__todo">— TODO_LEGAL_SUFFIX (Kft. / Bt. / Zrt.)</span>
              </li>
              <li>
                <strong>Székhely:</strong> {POSTAL_CODE} {CITY}, {STREET_ADDRESS}{' '}
                <span className="privacy__todo">— TODO_STREET_NUMBER</span>
              </li>
              <li>
                <strong>Cégjegyzékszám:</strong>{' '}
                <span className="privacy__todo">TODO_COMPANY_REGISTRATION_NUMBER</span>
              </li>
              <li>
                <strong>Adószám:</strong>{' '}
                <span className="privacy__todo">TODO_TAX_NUMBER</span>
              </li>
              <li>
                <strong>Képviselő:</strong>{' '}
                <span className="privacy__todo">TODO_LEGAL_REPRESENTATIVE</span>
              </li>
              <li>
                <strong>Nyilvántartásba vevő bíróság:</strong> Fővárosi Törvényszék
                Cégbírósága
              </li>
            </ul>

            <h2>2. Elérhetőség</h2>
            <ul>
              <li>
                <strong>E-mail:</strong> <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
              </li>
              <li>
                <strong>Telefon:</strong>{' '}
                <a href={`tel:${PHONE}`}>{PHONE_DISPLAY}</a>
              </li>
              <li>
                <strong>Postacím:</strong> {POSTAL_CODE} {CITY}, {STREET_ADDRESS}
              </li>
            </ul>

            <h2>3. Tevékenység</h2>
            <p>
              Egyedi precíziós CNC alkatrészgyártás ipari partnereknek: CNC marás,
              CNC esztergálás, prototípusgyártás, szerszámgyártás, kis- és nagyszériás
              gyártás, valamint komplett mechanikai gyártás.
            </p>

            <h2>4. Felügyeleti szerv (panaszkezelés)</h2>
            <ul>
              <li>
                Budapest Főváros Kormányhivatala — Fogyasztóvédelmi Főosztály
              </li>
              <li>
                Nemzeti Adatvédelmi és Információszabadság Hatóság (NAIH) —
                1055 Budapest, Falk Miksa utca 9–11.,{' '}
                <a href="https://naih.hu" target="_blank" rel="noreferrer noopener">
                  naih.hu
                </a>
              </li>
            </ul>

            <h2>5. Tárhelyszolgáltató</h2>
            <p className="privacy__note">
              <span className="privacy__todo">
                TODO_HOSTING_PROVIDER — a tárhelyszolgáltató neve, székhelye és
                elérhetősége az élesítés előtt pontosítandó (pl. Vercel Inc., Cloudflare,
                Hetzner stb. — a használt szolgáltatótól függően).
              </span>
            </p>

            <h2>6. Szerzői jogok</h2>
            <p>
              A weboldalon szereplő tartalmak (szövegek, képek, ábrák, kódok) a{' '}
              {COMPANY_NAME} szellemi tulajdonát képezik, hacsak az oldalon eltérő
              megjelölés nem szerepel. A tartalmak felhasználása csak előzetes írásbeli
              engedéllyel megengedett.
            </p>

            <p className="privacy__updated">
              Tájékoztató utolsó technikai frissítése: 2026. június 22.
            </p>
          </article>
        </div>
      </section>
    </>
  );
}
