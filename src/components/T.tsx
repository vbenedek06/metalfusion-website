import { createElement, type CSSProperties } from 'react';
import siteTexts from '../content/site-texts.json';
import { useLanguage, type Language } from '../i18n';

type Leaf = { hu: string; en: string };
type Node = { [k: string]: Node | Leaf };

const ROOT = siteTexts as unknown as Node;

function isLeaf(v: unknown): v is Leaf {
  return !!v && typeof v === 'object' && typeof (v as Leaf).hu === 'string' && typeof (v as Leaf).en === 'string';
}

function lookup(key: string): Leaf | undefined {
  const parts = key.split('.');
  let cur: unknown = ROOT;
  for (const p of parts) {
    if (!cur || typeof cur !== 'object' || !(p in (cur as Record<string, unknown>))) return undefined;
    cur = (cur as Record<string, unknown>)[p];
  }
  return isLeaf(cur) ? cur : undefined;
}

export function t(key: string, lang: Language): string {
  const leaf = lookup(key);
  if (!leaf) return `[${key}]`;
  return leaf[lang];
}

interface TProps {
  k: string;
  as?: keyof JSX.IntrinsicElements;
  className?: string;
  style?: CSSProperties;
}

export default function T({ k, as = 'span', className, style }: TProps) {
  const { lang } = useLanguage();
  const value = t(k, lang);

  const props: Record<string, unknown> = {
    className,
    style,
    suppressContentEditableWarning: true,
  };

  if (import.meta.env.DEV) {
    props['data-edit-key'] = `${k}.${lang}`;
  }

  return createElement(as, props, value);
}
