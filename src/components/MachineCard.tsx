import type { Machine } from '../data/machines';
import './MachineCard.css';

interface Props {
  machine: Machine;
}

export default function MachineCard({ machine }: Props) {
  return (
    <article className="machine-card">
      <div className="machine-card__media">
        <img src={machine.image} alt={machine.name} loading="lazy" />
      </div>
      <div className="machine-card__body">
        <span className="machine-card__type">{machine.type}</span>
        <h3 className="machine-card__name">{machine.name}</h3>
        <ul className="machine-card__specs">
          {machine.specs.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
      </div>
    </article>
  );
}
