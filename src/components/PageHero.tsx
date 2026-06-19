import { Link } from 'react-router-dom';
import type { ReactNode } from 'react';
import './PageHero.css';

interface Props {
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
  bgImage?: string;
  showCrumb?: boolean;
}

export default function PageHero({ eyebrow, title, lead, bgImage, showCrumb = true }: Props) {
  return (
    <section className={`page-hero${bgImage ? ' page-hero--with-bg' : ''}`}>
      {bgImage && (
        <div
          className="page-hero__bg"
          style={{ backgroundImage: `url(${bgImage})` }}
          aria-hidden
        />
      )}
      <div className="page-hero__veil" aria-hidden />
      <div className="container page-hero__inner">
        {showCrumb && (
          <div className="page-hero__crumb">
            <Link to="/">Főoldal</Link>
            <span aria-hidden>/</span>
            <span>{eyebrow}</span>
          </div>
        )}
        <span className="eyebrow page-hero__eyebrow">{eyebrow}</span>
        <h1 className="page-hero__title">{title}</h1>
        {lead && <p className="page-hero__lead lead">{lead}</p>}
      </div>
    </section>
  );
}
