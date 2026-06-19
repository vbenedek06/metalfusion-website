import ServiceCard from '../components/ServiceCard';
import CTASection from '../components/CTASection';
import { services } from '../data/services';
import { useSEO } from '../hooks/useSEO';

export default function Szolgaltatasok() {
  useSEO({
    title: 'Szolgáltatások – MetalFusion CNC megmunkálás',
    description:
      'CNC marás, esztergálás, prototípusgyártás, szerszámkészítés és komplett mechanikai gyártás. Műhelyrajz vagy 3D modell alapján.',
  });

  return (
    <>
      <section className="page-hero">
        <div className="container page-hero__inner">
          <span className="page-hero__crumb">Szolgáltatások</span>
          <h1>Komplex gyártási folyamatok, egy partnerrel.</h1>
          <p className="lead">
            Várjuk megkeresésüket bármilyen alkatrész gyártásával kapcsolatban. Egyszerű alkatrészek
            gyártásától az alakos öntőszerszámok megmunkálásáig. Műhelyrajz és/vagy 3D-s modell alapján
            dolgozunk, minden esetben figyelembe véve a megrendelőink egyedi igényeit is.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="grid grid--3">
            {services.map((s, i) => (
              <ServiceCard key={s.slug} service={s} index={i} />
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Nem találja, amire szüksége van?"
        text="Keressen minket bizalommal — az egyedi feladatokat is szívesen vállaljuk."
      />
    </>
  );
}
