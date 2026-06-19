import { useState, type FormEvent } from 'react';
import './ContactForm.css';

interface FormState {
  name: string;
  email: string;
  phone: string;
  message: string;
}

const empty: FormState = { name: '', email: '', phone: '', message: '' };

export default function ContactForm() {
  const [data, setData] = useState<FormState>(empty);
  const [status, setStatus] = useState<'idle' | 'sent'>('idle');

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setData((d) => ({ ...d, [key]: value }));
  }

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const subject = encodeURIComponent('Ajánlatkérés – ' + (data.name || 'MetalFusion'));
    const body = encodeURIComponent(
      `Név: ${data.name}\nE-mail: ${data.email}\nTelefon: ${data.phone}\n\nÜzenet:\n${data.message}`,
    );
    window.location.href = `mailto:info@metalfusion.hu?subject=${subject}&body=${body}`;
    setStatus('sent');
  }

  return (
    <form className="contact-form" onSubmit={onSubmit} noValidate>
      <div className="contact-form__row">
        <label className="contact-form__field">
          <span>Név</span>
          <input
            required
            type="text"
            value={data.name}
            onChange={(e) => update('name', e.target.value)}
            autoComplete="name"
            placeholder="Kovács János"
          />
        </label>
        <label className="contact-form__field">
          <span>E-mail cím</span>
          <input
            required
            type="email"
            value={data.email}
            onChange={(e) => update('email', e.target.value)}
            autoComplete="email"
            placeholder="nev@cegnev.hu"
          />
        </label>
      </div>

      <label className="contact-form__field">
        <span>Telefonszám</span>
        <input
          type="tel"
          value={data.phone}
          onChange={(e) => update('phone', e.target.value)}
          autoComplete="tel"
          placeholder="+36 20 123 4567"
        />
      </label>

      <label className="contact-form__field">
        <span>Üzenet</span>
        <textarea
          required
          rows={6}
          value={data.message}
          onChange={(e) => update('message', e.target.value)}
          placeholder="Anyagminőség, mennyiség, határidő, csatolt műhelyrajz / 3D modell elérhetősége…"
        />
      </label>

      <div className="contact-form__footer">
        <button type="submit" className="btn btn--primary">
          Ajánlatkérés elküldése
        </button>
        {status === 'sent' && (
          <span className="contact-form__note">Megnyitottuk a levelezőjét — küldje el az üzenetet.</span>
        )}
      </div>
      <p className="contact-form__hint">
        Az űrlap elküldése a beépített e-mail kliensét nyitja meg. Ha gyorsabban szeretne válaszolni,
        írjon közvetlenül: <a href="mailto:info@metalfusion.hu">info@metalfusion.hu</a>
      </p>
    </form>
  );
}
