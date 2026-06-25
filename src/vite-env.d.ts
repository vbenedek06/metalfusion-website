/// <reference types="vite/client" />

declare module '*.css';

interface ImportMetaEnv {
  readonly VITE_WEB3FORMS_KEY?: string;
  readonly VITE_TURNSTILE_SITE_KEY?: string;
  readonly VITE_GA4_ID?: string;
  readonly VITE_GSC_VERIFICATION?: string;
  readonly VITE_SITE_BASE_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
