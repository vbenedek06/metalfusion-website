import MachineCard from '../components/MachineCard';
import CTASection from '../components/CTASection';
import { machines } from '../data/machines';
import { useSEO } from '../hooks/useSEO';

export default function Geppark() {
  useSEO({
    title: 'Géppark – MetalFusion CNC kapacitások',
    description:
      'Modern CNC megmunkálóközpontok és esztergagépek, mérőeszközök. 3- és 4-tengelyes marók, hajtott szerszámos esztergák.',
  });

  return (
    <>
      <section className="page-hero">
        <div className="container page-hero__inner">
          <span className="page-hero__crumb">Géppark</span>
          <h1>Modern CNC kapacitás budapesti műhelyünkben.</h1>
          <p className="lead">
            3- és 4-tengelyes megmunkálóközpontok, hajtott szerszámos esztergák és kiegészítő gépek
            biztosítják az egyenletes minőséget és a kötött határidőket.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="grid grid--3">
            {machines.map((m) => (
              <MachineCard key={m.name} machine={m} />
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Bonyolultabb darab? Egyeztessünk a megmunkálhatóságról."
        text="A gyárthatósági javaslatainkkal időt és anyagot is spórolhat."
      />
    </>
  );
}
