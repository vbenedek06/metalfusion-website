import PageHero from '../components/PageHero';
import { useSEO } from '../hooks/useSEO';
import './Adatvedelem.css';

export default function Adatvedelem() {
  useSEO({
    title: 'Privacy Policy - MetalFusion',
    description:
      'MetalFusion privacy information for contact form submissions and quote requests.',
  });

  return (
    <>
      <PageHero
        eyebrow="Privacy"
        title={<>Privacy Policy</>}
        lead="This notice summarizes the data processing framework for contact requests and quote requests submitted through the website. Missing company and service-provider details should be finalized before publication."
      />

      <section className="section privacy">
        <div className="container privacy__inner">
          <article className="privacy__doc">
            <p className="privacy__note">
              This text requires legal and company-data review before publication. It does not include
              company details or processors that have not been verified in the project.
            </p>

            <h2>1. Data controller</h2>
            <p>MetalFusion</p>
            <ul>
              <li>Site: 1108 Budapest, Kozma Street</li>
              <li>
                Email: <a href="mailto:info@metalfusion.hu">info@metalfusion.hu</a>
              </li>
              <li>
                Phone: <a href="tel:+36203331218">+36 20 333 1218</a>
              </li>
            </ul>
            <p className="privacy__note">
              Exact company name, registered seat, company registration number, tax number and
              representative must be requested from the client and added after confirmation.
            </p>

            <h2>2. Categories of data processed</h2>
            <p>
              We only process data that you voluntarily provide via the contact form, by email or by
              phone. This typically includes:
            </p>
            <ul>
              <li>name,</li>
              <li>email address,</li>
              <li>phone number, if provided,</li>
              <li>other information included in the message, such as drawings or project descriptions.</li>
            </ul>

            <h2>3. Purpose of processing</h2>
            <p>
              Data is processed to handle quote requests, contact enquiries and pre-contractual
              communication. Data is not transferred to third parties for marketing purposes.
            </p>

            <h2>4. Legal basis</h2>
            <p>
              The legal basis for processing is Article 6(1)(b) GDPR (steps prior to entering into a
              contract) and Article 6(1)(a) GDPR (consent of the data subject).
            </p>

            <h2>5. Retention period</h2>
            <p>
              The retention period for quote-request data depends on the specific business and legal
              process. The final retention period should be confirmed based on the client's internal
              data-processing practice and legal review.
            </p>

            <h2>6. Data processors</h2>
            <p className="privacy__note">
              The specific processors connected to website operation, such as hosting and email
              services, must be requested from the client.
            </p>

            <h2>7. Rights of the data subject</h2>
            <p>
              You have the right to access your personal data, request rectification, erasure,
              restriction of processing, data portability and object to processing. You can exercise
              these rights in writing at <a href="mailto:info@metalfusion.hu">info@metalfusion.hu</a>.
            </p>

            <h2>8. Remedies</h2>
            <p>
              If you believe that processing violates applicable law, you may lodge a complaint with
              the Hungarian National Authority for Data Protection and Freedom of Information (NAIH,
              1055 Budapest, Falk Miksa utca 9-11.; <a href="https://naih.hu" target="_blank" rel="noreferrer">naih.hu</a>)
              or turn to the courts.
            </p>

            <h2>9. Cookies</h2>
            <p>
              The current codebase does not include external analytics or marketing cookie
              integrations. If measurement, advertising or embedded third-party services are added
              later, the cookie notice and consent management must be updated accordingly.
            </p>

            <p className="privacy__updated">
              Last technical update: June 19, 2026.
            </p>
          </article>
        </div>
      </section>
    </>
  );
}
