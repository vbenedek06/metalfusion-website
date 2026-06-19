import type { ReactNode } from 'react';
import './SectionTitle.css';

interface Props {
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  align?: 'left' | 'center';
  as?: 'h2' | 'h3';
}

export default function SectionTitle({
  eyebrow,
  title,
  lead,
  align = 'left',
  as = 'h2',
}: Props) {
  const Tag = as;
  return (
    <header className={`section-title section-title--${align}`}>
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <Tag className="section-title__heading">{title}</Tag>
      {lead && <p className="section-title__lead lead">{lead}</p>}
    </header>
  );
}
