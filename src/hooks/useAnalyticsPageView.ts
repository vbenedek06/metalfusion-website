import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { trackPageView } from '../lib/analytics';

// Fires a GA4 page_view on every route change.
// Reads document.title AFTER a microtask so useSEO has had a chance to set it.
export function useAnalyticsPageView(): void {
  const location = useLocation();

  useEffect(() => {
    const id = window.setTimeout(() => {
      trackPageView(location.pathname + location.search, document.title);
    }, 30);
    return () => window.clearTimeout(id);
  }, [location.pathname, location.search]);
}
