import { Link } from 'react-router-dom';
import './CTASection.css';

interface Props {
  title?: string;
  text?: string;
  primaryLabel?: string;
  primaryTo?: string;
  secondaryLabel?: string;
  secondaryTo?: string;
}

export default function CTASection({
  title = 'Van egy gyártási feladata? Kérjen ajánlatot.',
  text = 'Küldje el a műhelyrajzot vagy 3D modellt — 1-2 munkanapon belül visszajelzünk.',
  primaryLabel = 'Ajánlatkérés',
  primaryTo = '/kapcsolat',
  secondaryLabel = 'Szolgáltatások megtekintése',
  secondaryTo = '/szolgaltatasok',
}: Props) {
  return (
    <section className="cta section">
      <div className="container">
        <div className="cta__box">
          <div className="cta__copy">
            <span className="eyebrow">Beszéljünk</span>
            <h2>{title}</h2>
            <p>{text}</p>
          </div>
          <div className="cta__actions">
            <Link to={primaryTo} className="btn btn--primary">
              {primaryLabel}
            </Link>
            <Link to={secondaryTo} className="btn btn--ghost">
              {secondaryLabel}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
