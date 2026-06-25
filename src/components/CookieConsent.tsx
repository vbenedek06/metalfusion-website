import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useConsent } from '../hooks/useConsent';
import { useLanguage } from '../i18n';
import './CookieConsent.css';

// Bottom-anchored consent banner.
// Renders only when the visitor has not yet made a choice (decidedAt === null).
// Three actions: accept all, only necessary, expand to category settings.

export default function CookieConsent() {
  const { consent, acceptAll, acceptNecessary, setCategories } = useConsent();
  const { t } = useLanguage();
  const [showSettings, setShowSettings] = useState(false);
  const [analytics, setAnalytics] = useState(true);
  const [marketing, setMarketing] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Defer first paint so the banner slides in instead of flashing
    const id = window.requestAnimationFrame(() => setMounted(true));
    return () => window.cancelAnimationFrame(id);
  }, []);

  if (consent.decidedAt !== null) return null;

  return (
    <div
      className={`cookie-consent${mounted ? ' cookie-consent--in' : ''}`}
      role="dialog"
      aria-labelledby="cookie-consent-title"
      aria-describedby="cookie-consent-desc"
    >
      <div className="cookie-consent__panel">
        <div className="cookie-consent__copy">
          <span className="cookie-consent__kicker">{t('Cookie settings')}</span>
          <h2 id="cookie-consent-title">{t('We use cookies to improve the site.')}</h2>
          <p id="cookie-consent-desc">
            {t('Necessary cookies are always active. Analytics and marketing cookies are loaded only after your consent.')}
            {' '}
            <Link to="/adatvedelem">{t('Read more in the Privacy Policy.')}</Link>
          </p>
        </div>

        {showSettings && (
          <fieldset className="cookie-consent__categories">
            <legend className="visually-hidden">{t('Cookie categories')}</legend>

            <label className="cookie-consent__category cookie-consent__category--locked">
              <input type="checkbox" checked readOnly aria-readonly="true" />
              <span className="cookie-consent__category-body">
                <span className="cookie-consent__category-title">{t('Necessary')}</span>
                <span className="cookie-consent__category-desc">
                  {t('Essential for the site to work (language preference, theme).')}
                </span>
              </span>
            </label>

            <label className="cookie-consent__category">
              <input
                type="checkbox"
                checked={analytics}
                onChange={(e) => setAnalytics(e.target.checked)}
              />
              <span className="cookie-consent__category-body">
                <span className="cookie-consent__category-title">{t('Analytics')}</span>
                <span className="cookie-consent__category-desc">
                  {t('Google Analytics — anonymised visitor statistics to improve the site.')}
                </span>
              </span>
            </label>

            <label className="cookie-consent__category">
              <input
                type="checkbox"
                checked={marketing}
                onChange={(e) => setMarketing(e.target.checked)}
              />
              <span className="cookie-consent__category-body">
                <span className="cookie-consent__category-title">{t('Marketing')}</span>
                <span className="cookie-consent__category-desc">
                  {t('Conversion measurement for ad campaigns. Inactive by default.')}
                </span>
              </span>
            </label>
          </fieldset>
        )}

        <div className="cookie-consent__actions">
          {!showSettings && (
            <button
              type="button"
              className="cookie-consent__btn cookie-consent__btn--ghost"
              onClick={() => setShowSettings(true)}
            >
              {t('Settings')}
            </button>
          )}
          {showSettings ? (
            <button
              type="button"
              className="cookie-consent__btn cookie-consent__btn--ghost"
              onClick={() => setCategories({ analytics, marketing })}
            >
              {t('Save choices')}
            </button>
          ) : (
            <button
              type="button"
              className="cookie-consent__btn cookie-consent__btn--ghost"
              onClick={acceptNecessary}
            >
              {t('Only necessary')}
            </button>
          )}
          <button
            type="button"
            className="cookie-consent__btn cookie-consent__btn--primary"
            onClick={acceptAll}
          >
            {t('Accept all')}
          </button>
        </div>
      </div>
    </div>
  );
}
