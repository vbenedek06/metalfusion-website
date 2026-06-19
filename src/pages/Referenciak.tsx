import ReferenceCard from '../components/ReferenceCard';
import CTASection from '../components/CTASection';
import { references } from '../data/references';
import { useSEO } from '../hooks/useSEO';
import './Referenciak.css';

export default function Referenciak() {
  useSEO({
    title: 'Referenciák – MetalFusion gyártási projektek',
    description:
      'Megvalósult CNC gyártási projektjeink: gyógyszercsomagoló gép, orvosi szerszámok, alakos öntőszerszámok és egyedi kilincsek.',
  });

  return (
    <>
      <section className="page-hero">
        <div className="container page-hero__inner">
          <span className="page-hero__crumb">Referenciák</span>
          <h1>Valós gyártási projektek, valós ügyfeleknek.</h1>
          <p className="lead">
            Egy bemutató válogatás megvalósult munkáinkból. Az ipari partnereink között gyógyszergyártó,
            orvostechnikai és gépgyártó vállalatok egyaránt megtalálhatók.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="grid grid--3 refs__grid">
            {references.map((r) => (
              <ReferenceCard key={r.slug} reference={r} />
            ))}
          </div>
        </div>
      </section>

      <section className="section section--alt">
        <div className="container refs__industries">
          <div className="section-head">
            <span className="eyebrow">Iparágak</span>
            <h2>Beszállítóként szinte minden iparágban otthon vagyunk.</h2>
          </div>
          <ul>
            {[
              'Gyógyszeripar',
              'Orvostechnika',
              'Gépgyártás',
              'Csomagolástechnika',
              'Élelmiszeripar',
              'Műanyagipar',
              'Építőipari vasalat',
              'Prototípusfejlesztés',
            ].map((i) => (
              <li key={i}>{i}</li>
            ))}
          </ul>
        </div>
      </section>

      <CTASection
        title="Hasonló projekttel keres beszállítót?"
        text="Az új feladatokra mindig nyitottak vagyunk — kérje ajánlatunkat."
      />
    </>
  );
}
