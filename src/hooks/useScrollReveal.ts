import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Global scroll-reveal. Watches every element marked with `data-reveal` or
 * `data-reveal-stagger` and adds `is-revealed` once it scrolls into view.
 *
 * - Respects `prefers-reduced-motion`: reveals everything immediately, no motion.
 * - Re-scans on route change so freshly-mounted pages animate in.
 * - Reveal-once: each element is unobserved after it appears.
 */
export function useScrollReveal() {
  const { pathname } = useLocation();

  useEffect(() => {
    const els = Array.from(
      document.querySelectorAll<HTMLElement>('[data-reveal], [data-reveal-stagger]'),
    );
    if (els.length === 0) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const compactViewport = window.matchMedia('(max-width: 720px)').matches;
    if (reduce || compactViewport || !('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add('is-revealed'));
      return;
    }

    const io = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            obs.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.12 },
    );

    // Anything already in view on load reveals on the next frame (avoids a flash).
    const raf = requestAnimationFrame(() => {
      els.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.92) {
          el.classList.add('is-revealed');
        } else {
          io.observe(el);
        }
      });
    });

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
    };
  }, [pathname]);
}
