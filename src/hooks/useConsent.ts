import { useCallback, useEffect, useState } from 'react';

// GDPR cookie consent store.
// Persists the user's choice in localStorage, supports categories
// (necessary is always true; analytics + marketing are opt-in),
// and broadcasts changes via a custom event so listeners (analytics
// loader, footer revoke button) stay in sync.

export interface ConsentState {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
  decidedAt: number | null;
}

const STORAGE_KEY = 'mf-consent';
const EVENT_NAME = 'mf-consent:change';

const ALL_ACCEPTED: ConsentState = {
  necessary: true,
  analytics: true,
  marketing: true,
  decidedAt: 0,
};

const NECESSARY_ONLY: ConsentState = {
  necessary: true,
  analytics: false,
  marketing: false,
  decidedAt: 0,
};

const PENDING: ConsentState = {
  necessary: true,
  analytics: false,
  marketing: false,
  decidedAt: null,
};

function readStored(): ConsentState {
  if (typeof window === 'undefined') return PENDING;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return PENDING;
    const parsed = JSON.parse(raw) as Partial<ConsentState>;
    if (typeof parsed.decidedAt !== 'number') return PENDING;
    return {
      necessary: true,
      analytics: Boolean(parsed.analytics),
      marketing: Boolean(parsed.marketing),
      decidedAt: parsed.decidedAt,
    };
  } catch {
    return PENDING;
  }
}

function writeStored(state: ConsentState): void {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  window.dispatchEvent(new CustomEvent<ConsentState>(EVENT_NAME, { detail: state }));
}

export function getConsentSync(): ConsentState {
  return readStored();
}

export function hasDecidedConsent(): boolean {
  return readStored().decidedAt !== null;
}

export function useConsent() {
  const [consent, setConsent] = useState<ConsentState>(() => readStored());

  useEffect(() => {
    const onChange = (e: Event) => {
      const detail = (e as CustomEvent<ConsentState>).detail;
      if (detail) setConsent(detail);
      else setConsent(readStored());
    };
    const onStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) setConsent(readStored());
    };
    window.addEventListener(EVENT_NAME, onChange);
    window.addEventListener('storage', onStorage);
    return () => {
      window.removeEventListener(EVENT_NAME, onChange);
      window.removeEventListener('storage', onStorage);
    };
  }, []);

  const acceptAll = useCallback(() => {
    writeStored({ ...ALL_ACCEPTED, decidedAt: Date.now() });
  }, []);

  const acceptNecessary = useCallback(() => {
    writeStored({ ...NECESSARY_ONLY, decidedAt: Date.now() });
  }, []);

  const setCategories = useCallback((next: { analytics: boolean; marketing: boolean }) => {
    writeStored({
      necessary: true,
      analytics: next.analytics,
      marketing: next.marketing,
      decidedAt: Date.now(),
    });
  }, []);

  const revoke = useCallback(() => {
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem(STORAGE_KEY);
      window.dispatchEvent(new CustomEvent<ConsentState>(EVENT_NAME, { detail: PENDING }));
    }
  }, []);

  return { consent, acceptAll, acceptNecessary, setCategories, revoke };
}

export const CONSENT_EVENT = EVENT_NAME;
