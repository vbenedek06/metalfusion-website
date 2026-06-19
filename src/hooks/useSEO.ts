import { useEffect } from 'react';

interface SEOInput {
  title: string;
  description: string;
}

export function useSEO({ title, description }: SEOInput): void {
  useEffect(() => {
    document.title = title;
    const meta = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (meta) {
      meta.setAttribute('content', description);
    } else {
      const el = document.createElement('meta');
      el.name = 'description';
      el.content = description;
      document.head.appendChild(el);
    }
  }, [title, description]);
}
