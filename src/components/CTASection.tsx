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
  title = 'Have a manufacturing task? Request a quote.',
  text = 'Send us your drawing or 3D model and we will get back to you within 1-2 business days.',
  primaryLabel = 'Request a quote',
  primaryTo = '/kapcsolat',
  secondaryLabel = 'View services',
  secondaryTo = '/szolgaltatasok',
}: Props) {
  return (
    <section className="cta section">
      <div className="container">
        <div className="cta__box">
          <div className="cta__copy">
            <span className="eyebrow">Let's talk</span>
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
