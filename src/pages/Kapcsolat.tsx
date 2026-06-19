import ContactForm from '../components/ContactForm';
import { useSEO } from '../hooks/useSEO';
import './Kapcsolat.css';

export default function Kapcsolat() {
  useSEO({
    title: 'Kapcsolat – MetalFusion ajánlatkérés',
    description:
      'Ajánlatkérés CNC alkatrészgyártásra: műhelyrajz, 3D modell. Budapesti telephely, +36 20 333 1218, info@metalfusion.hu.',
  });

  return (
    <>
      <section className="page-hero">
        <div className="container page-hero__inner">
          <span className="page-hero__crumb">Kapcsolat</span>
          <h1>Kérjen ajánlatot — kötött határidővel válaszolunk.</h1>
          <p className="lead">
            Az alábbi űrlapot kitöltve elküldheti nekünk üzenetét és munkatársunk hamarosan felveszi
            önnel a kapcsolatot.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container kapcsolat__grid">
          <div className="kapcsolat__form-wrap">
            <span className="eyebrow">Ajánlatkérés</span>
            <h2>Írja le röviden a feladatot.</h2>
            <p className="lead kapcsolat__lead">
              Ha rendelkezésre áll műhelyrajz vagy 3D modell, azt feltöltheti e-mailben — a
              levelezőjében automatikusan előtöltjük az adatokat.
            </p>
            <ContactForm />
          </div>

          <aside className="kapcsolat__side">
            <div className="kapcsolat__card">
              <span className="eyebrow">Elérhetőségünk</span>
              <h3>MetalFusion Kft.</h3>
              <ul>
                <li>
                  <span>Cím</span>
                  1108 Budapest, Kozma utca
                </li>
                <li>
                  <span>Telefon</span>
                  <a href="tel:+36203331218">+36 20 333 1218</a>
                </li>
                <li>
                  <span>E-mail</span>
                  <a href="mailto:info@metalfusion.hu">info@metalfusion.hu</a>
                </li>
                <li>
                  <span>Nyitvatartás</span>
                  H–P: 7:00 – 16:00
                </li>
              </ul>
            </div>

            <div className="kapcsolat__map" aria-hidden>
              <div className="kapcsolat__map-grid" />
              <span className="kapcsolat__map-pin">Budapest · X. kerület</span>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
