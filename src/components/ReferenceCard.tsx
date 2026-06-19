import type { Reference } from '../data/references';
import './ReferenceCard.css';

interface Props {
  reference: Reference;
  compact?: boolean;
}

export default function ReferenceCard({ reference, compact }: Props) {
  return (
    <article className={`ref-card ${compact ? 'ref-card--compact' : ''}`}>
      <div className="ref-card__media">
        <img src={reference.cover} alt={reference.title} loading="lazy" />
        <div className="ref-card__media-overlay" aria-hidden />
        <span className="ref-card__industry">{reference.industry}</span>
      </div>
      <div className="ref-card__body">
        <div className="ref-card__meta">
          <span>{reference.client}</span>
          <span aria-hidden>·</span>
          <span>{reference.year}</span>
        </div>
        <h3 className="ref-card__title">{reference.title}</h3>
        <p className="ref-card__summary">{reference.summary}</p>
      </div>
    </article>
  );
}
