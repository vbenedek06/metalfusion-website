import PageHero from '../components/PageHero';
import { useSEO } from '../hooks/useSEO';
import './Adatvedelem.css';

export default function Adatvedelem() {
  useSEO({
    title: 'Adatvédelmi tájékoztató — MetalFusion',
    description:
      'A MetalFusion adatkezelési tájékoztatója a kapcsolati űrlap és ajánlatkérés vonatkozásában.',
  });

  return (
    <>
      <PageHero
        eyebrow="Adatvédelem"
        title={<>Adatvédelmi tájékoztató</>}
        lead="A tájékoztató a weboldalon keresztül történő kapcsolatfelvétel és ajánlatkérés adatkezelési kereteit foglalja össze. A hiányzó céges és szolgáltatói adatok véglegesítés előtt pontosítandók."
      />

      <section className="section privacy">
        <div className="container privacy__inner">
          <article className="privacy__doc">
            <p className="privacy__note">
              Ez a szöveg publikálás előtt jogi és céges adategyeztetést igényel. Nem tartalmaz
              olyan cégadatot vagy adatfeldolgozót, amely nem szerepel igazoltan a projektben.
            </p>

            <h2>1. Adatkezelő</h2>
            <p>MetalFusion</p>
            <ul>
              <li>Telephely: 1108 Budapest, Kozma utca</li>
              <li>
                E-mail: <a href="mailto:info@metalfusion.hu">info@metalfusion.hu</a>
              </li>
              <li>
                Telefon: <a href="tel:+36203331218">+36 20 333 1218</a>
              </li>
            </ul>
            <p className="privacy__note">
              Pontos cégnév, székhely, cégjegyzékszám, adószám és képviselő: ügyféltől bekérendő,
              ezt követően kerül feltüntetésre.
            </p>

            <h2>2. A kezelt adatok köre</h2>
            <p>
              Kizárólag azokat az adatokat kezeljük, amelyeket Ön a kapcsolati űrlap kitöltésével,
              illetve e-mailen vagy telefonon történő megkereséssel önként megad. Ezek tipikusan:
            </p>
            <ul>
              <li>név,</li>
              <li>e-mail cím,</li>
              <li>telefonszám (ha megadja),</li>
              <li>az üzenetben szereplő egyéb információ (műhelyrajz, projektleírás).</li>
            </ul>

            <h2>3. Adatkezelés célja</h2>
            <p>
              Az adatokat ajánlatkérés feldolgozása, kapcsolatfelvétel, valamint a szerződéses
              egyeztetés céljából kezeljük. Az adatok nem kerülnek átadásra harmadik fél részére
              marketing célból.
            </p>

            <h2>4. Adatkezelés jogalapja</h2>
            <p>
              Az adatkezelés jogalapja a GDPR 6. cikk (1) bekezdés b) pontja (szerződés
              megkötését megelőző lépések) és a) pontja (érintett hozzájárulása).
            </p>

            <h2>5. Adatok megőrzési ideje</h2>
            <p>
              Az ajánlatkéréshez kapcsolódó adatok megőrzési ideje a konkrét üzleti és jogi
              folyamattól függ. A végleges megőrzési időt az ügyfél belső adatkezelési gyakorlata
              és jogi egyeztetés alapján kell pontosítani.
            </p>

            <h2>6. Adatfeldolgozók</h2>
            <p className="privacy__note">
              A weboldal üzemeltetéséhez kapcsolódó adatfeldolgozók (tárhelyszolgáltató,
              levelezési szolgáltatás) konkrét megnevezése bekérendő az ügyféltől.
            </p>

            <h2>7. Az érintett jogai</h2>
            <p>
              Önnek joga van hozzáférni a róla kezelt személyes adatokhoz, helyesbítést,
              törlést, az adatkezelés korlátozását kérni, valamint adathordozhatósághoz és
              tiltakozáshoz. Ezeket írásban az{' '}
              <a href="mailto:info@metalfusion.hu">info@metalfusion.hu</a> címen jelezheti.
            </p>

            <h2>8. Jogorvoslat</h2>
            <p>
              Ha úgy ítéli meg, hogy az adatkezelés sérti a vonatkozó jogszabályokat, panaszt
              tehet a Nemzeti Adatvédelmi és Információszabadság Hatóságnál (NAIH, 1055
              Budapest, Falk Miksa utca 9-11.; <a href="https://naih.hu" target="_blank" rel="noreferrer">naih.hu</a>),
              illetve fordulhat bírósághoz.
            </p>

            <h2>9. Sütik (cookies)</h2>
            <p>
              A jelenlegi kódbázisban nem szerepel külső analitikai vagy marketing süti integráció.
              Ha később mérési, hirdetési vagy beágyazott külső szolgáltatás kerül bevezetésre,
              a sütitájékoztatót és a hozzájárulás-kezelést ennek megfelelően frissíteni kell.
            </p>

            <p className="privacy__updated">
              Tájékoztató utolsó technikai frissítése: 2026. június 19.
            </p>
          </article>
        </div>
      </section>
    </>
  );
}
