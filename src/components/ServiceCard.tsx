import type { Service } from '../data/services';
import './ServiceCard.css';

interface Props {
  service: Service;
  index: number;
}

export default function ServiceCard({ service, index }: Props) {
  return (
    <article className="service-card">
      <div className="service-card__num">{String(index + 1).padStart(2, '0')}</div>
      <h3 className="service-card__title">{service.title}</h3>
      <p className="service-card__short">{service.short}</p>
      <ul className="service-card__list">
        {service.bullets.map((b) => (
          <li key={b}>
            <span aria-hidden>—</span>
            {b}
          </li>
        ))}
      </ul>
    </article>
  );
}
