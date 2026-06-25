import { useEffect, useRef, useState, type FormEvent } from 'react';
import { useLanguage } from '../i18n';
import { trackGenerateLead } from '../lib/analytics';
import { EMAIL } from '../data/seo';
import './ContactForm.css';

// Hungarian contact form for MetalFusion.
// Submits asynchronously to Web3Forms (https://web3forms.com)
// when VITE_WEB3FORMS_KEY is provided. Falls back to a visible
// mailto link if the key is missing or if Web3Forms returns an error.
//
// Spam mitigations:
//   • Honeypot field (`botcheck`) — bots fill it, humans don't.
//   • Time gate — submissions under MIN_SECONDS are rejected.
//
// Web3Forms is preferred over Formspree because:
//   • EU-hosted by default (GDPR-friendly)
//   • Free tier: 250 submissions/month — enough for a B2B quote form
//   • No JS dependency, plain HTTPS POST
//   • Built-in honeypot support (`botcheck` field)

const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit';
const WEB3FORMS_KEY = (import.meta.env.VITE_WEB3FORMS_KEY ?? '').trim();
const MIN_SECONDS = 3;

interface FormState {
  name: string;
  company: string;
  email: string;
  phone: string;
  topic: string;
  message: string;
}

const empty: FormState = {
  name: '',
  company: '',
  email: '',
  phone: '',
  topic: 'Quote request',
  message: '',
};

const topics = [
  'Quote request',
  'Prototype / small batch',
  'Series production',
  'Workshop visit',
  'Other',
];

const acceptedFormats = ['STEP', 'IGES', 'DWG', 'STL', 'PDF', 'JPG'];

type Status = 'idle' | 'sending' | 'sent' | 'error';

interface FieldErrors {
  name?: string;
  email?: string;
  message?: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function ContactForm() {
  const { t } = useLanguage();
  const [data, setData] = useState<FormState>(empty);
  const [status, setStatus] = useState<Status>('idle');
  const [errors, setErrors] = useState<FieldErrors>({});
  const mountedAt = useRef<number>(Date.now());

  useEffect(() => {
    mountedAt.current = Date.now();
  }, []);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setData((d) => ({ ...d, [key]: value }));
    if (errors[key as keyof FieldErrors]) {
      setErrors((e) => ({ ...e, [key]: undefined }));
    }
  }

  function validate(d: FormState): FieldErrors {
    const next: FieldErrors = {};
    if (!d.name.trim()) next.name = t('This field is required.');
    if (!d.email.trim()) next.email = t('This field is required.');
    else if (!EMAIL_RE.test(d.email.trim())) next.email = t('Please enter a valid email address.');
    if (!d.message.trim()) next.message = t('This field is required.');
    return next;
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // Honeypot — silently accept (do nothing) so bots think it worked
    const form = e.currentTarget;
    const botcheck = (form.elements.namedItem('botcheck') as HTMLInputElement | null)?.value;
    if (botcheck) {
      setStatus('sent');
      setData(empty);
      return;
    }

    // Time gate
    const elapsed = (Date.now() - mountedAt.current) / 1000;
    if (elapsed < MIN_SECONDS) {
      setStatus('sent'); // appear to succeed without sending
      setData(empty);
      return;
    }

    const v = validate(data);
    if (Object.keys(v).length > 0) {
      setErrors(v);
      return;
    }

    if (!WEB3FORMS_KEY) {
      // No key configured — keep mailto fallback visible and report error so the user can act
      setStatus('error');
      return;
    }

    setStatus('sending');
    setErrors({});

    try {
      const payload = {
        access_key: WEB3FORMS_KEY,
        subject: `${data.topic} — ${data.name}`,
        from_name: data.name,
        reply_to: data.email,
        name: data.name,
        company: data.company,
        email: data.email,
        phone: data.phone,
        topic: data.topic,
        message: data.message,
        botcheck: '',
      };

      const res = await fetch(WEB3FORMS_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }
      const result = (await res.json()) as { success?: boolean };
      if (!result.success) {
        throw new Error('Web3Forms rejected');
      }

      trackGenerateLead({ method: 'contact_form' });
      setStatus('sent');
      setData(empty);
    } catch (err) {
      console.error('ContactForm submission failed:', err);
      setStatus('error');
    }
  }

  const isSending = status === 'sending';

  return (
    <form className="contact-form" onSubmit={onSubmit} noValidate aria-busy={isSending}>
      {/* Honeypot — visually hidden, never auto-filled by real users */}
      <label className="contact-form__honeypot" aria-hidden="true">
        <span>Leave this field empty</span>
        <input type="text" name="botcheck" tabIndex={-1} autoComplete="off" />
      </label>

      <div className="contact-form__row">
        <label className="contact-form__field">
          <span className="contact-form__label">{t('Name')}</span>
          <input
            required
            type="text"
            value={data.name}
            onChange={(e) => update('name', e.target.value)}
            autoComplete="name"
            placeholder={t('John Smith')}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? 'cf-err-name' : undefined}
            disabled={isSending}
          />
          {errors.name && (
            <span id="cf-err-name" className="contact-form__error" role="alert">
              {errors.name}
            </span>
          )}
        </label>
        <label className="contact-form__field">
          <span className="contact-form__label">{t('Company')}</span>
          <input
            type="text"
            value={data.company}
            onChange={(e) => update('company', e.target.value)}
            autoComplete="organization"
            placeholder={t('Example Ltd.')}
            disabled={isSending}
          />
        </label>
      </div>

      <div className="contact-form__row">
        <label className="contact-form__field">
          <span className="contact-form__label">{t('Email address')}</span>
          <input
            required
            type="email"
            value={data.email}
            onChange={(e) => update('email', e.target.value)}
            autoComplete="email"
            placeholder={t('name@company.com')}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? 'cf-err-email' : undefined}
            disabled={isSending}
          />
          {errors.email && (
            <span id="cf-err-email" className="contact-form__error" role="alert">
              {errors.email}
            </span>
          )}
        </label>
        <label className="contact-form__field">
          <span className="contact-form__label">{t('Phone number')}</span>
          <input
            type="tel"
            value={data.phone}
            onChange={(e) => update('phone', e.target.value)}
            autoComplete="tel"
            placeholder="+36 20 123 4567"
            disabled={isSending}
          />
        </label>
      </div>

      <fieldset className="contact-form__topic" disabled={isSending}>
        <legend className="contact-form__label">{t('Topic')}</legend>
        <div className="contact-form__chips">
          {topics.map((tp) => (
            <label key={tp} className={`contact-form__chip${data.topic === tp ? ' contact-form__chip--active' : ''}`}>
              <input
                type="radio"
                name="topic"
                value={tp}
                checked={data.topic === tp}
                onChange={() => update('topic', tp)}
              />
              {t(tp)}
            </label>
          ))}
        </div>
      </fieldset>

      <label className="contact-form__field">
        <span className="contact-form__label">{t('Message')}</span>
        <textarea
          required
          rows={6}
          value={data.message}
          onChange={(e) => update('message', e.target.value)}
          placeholder={t('Material grade, quantity, deadline, attached drawing / 3D model availability...')}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? 'cf-err-message' : undefined}
          disabled={isSending}
        />
        {errors.message && (
          <span id="cf-err-message" className="contact-form__error" role="alert">
            {errors.message}
          </span>
        )}
      </label>

      <div className="contact-form__attach">
        <span className="contact-form__attach-head">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M21 12.5l-9 9a5 5 0 0 1-7-7l9-9a3.5 3.5 0 0 1 5 5l-9 9a2 2 0 0 1-3-3l8-8" />
          </svg>
          {t('Accepted file formats by email')}
        </span>
        <ul className="contact-form__formats">
          {acceptedFormats.map((f) => (
            <li key={f}>{f}</li>
          ))}
        </ul>
      </div>

      <div className="contact-form__footer">
        <button
          type="submit"
          className="contact-form__submit"
          disabled={isSending}
        >
          <span>{isSending ? t('Sending…') : t('Send quote request')}</span>
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
            <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <span className="contact-form__legal">
          {t('Your data will only be used to respond to your quote request.')}
        </span>
      </div>

      {status === 'sent' && (
        <div className="contact-form__sent" role="status">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M5 12l5 5L20 7" />
          </svg>
          {t('Thank you, we will respond within 24 hours.')}
        </div>
      )}

      {status === 'error' && (
        <div className="contact-form__error-banner" role="alert">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <circle cx="12" cy="12" r="9" />
            <path d="M12 8v4M12 16h.01" />
          </svg>
          <span>
            {t('Sending failed. Please try again, or write to us directly.')}{' '}
            <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
          </span>
        </div>
      )}

      {status !== 'sent' && (
        <p className="contact-form__hint">
          {t('Or write directly to')} <a href={`mailto:${EMAIL}`}>{EMAIL}</a>.
        </p>
      )}
    </form>
  );
}
