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
    const subject = encodeURIComponent('Quote request - ' + (data.name || 'MetalFusion'));
    const body = encodeURIComponent(
      `Name: ${data.name}\nEmail: ${data.email}\nPhone: ${data.phone}\n\nMessage:\n${data.message}`,
    );
    window.location.href = `mailto:info@metalfusion.hu?subject=${subject}&body=${body}`;
    setStatus('sent');
  }

  return (
    <form className="contact-form" onSubmit={onSubmit} noValidate>
      <div className="contact-form__row">
        <label className="contact-form__field">
          <span>Name</span>
          <input
            required
            type="text"
            value={data.name}
            onChange={(e) => update('name', e.target.value)}
            autoComplete="name"
            placeholder="John Smith"
          />
        </label>
        <label className="contact-form__field">
          <span>Email address</span>
          <input
            required
            type="email"
            value={data.email}
            onChange={(e) => update('email', e.target.value)}
            autoComplete="email"
            placeholder="name@company.com"
          />
        </label>
      </div>

      <label className="contact-form__field">
        <span>Phone number</span>
        <input
          type="tel"
          value={data.phone}
          onChange={(e) => update('phone', e.target.value)}
          autoComplete="tel"
          placeholder="+36 20 123 4567"
        />
      </label>

      <label className="contact-form__field">
        <span>Message</span>
        <textarea
          required
          rows={6}
          value={data.message}
          onChange={(e) => update('message', e.target.value)}
          placeholder="Material grade, quantity, deadline, drawing / 3D model availability..."
        />
      </label>

      <div className="contact-form__footer">
        <button type="submit" className="btn btn--primary">
          Send quote request
        </button>
        {status === 'sent' && (
          <span className="contact-form__note">Your email client is open - please send the message.</span>
        )}
      </div>
      <p className="contact-form__hint">
        Submitting the form opens your default email client. For the fastest response, write to us
        directly at <a href="mailto:info@metalfusion.hu">info@metalfusion.hu</a>
      </p>
    </form>
  );
}
