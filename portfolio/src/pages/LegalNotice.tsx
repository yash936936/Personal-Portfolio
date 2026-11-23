import PageHeader from "../components/PageHeader";
import Reveal from "../components/Reveal";
import "./LegalNotice.css";

export default function LegalNotice() {
  return (
    <main className="legal-page">
      <PageHeader
        eyebrow="Legal"
        title="Legal Notice & Privacy Policy"
        sub="Information regarding the terms of use, intellectual property, and data privacy for this website."
      />

      <div className="container legal__container">
        <div className="legal__content">
          <Reveal>
            <section className="legal__section">
              <h2>1. General Information</h2>
              <p>
                This website is the personal and professional portfolio of <strong>Yash Malik</strong>. It presents selected projects, services and technical writing across AI, machine learning and full-stack software development.
              </p>
              <ul className="legal__list">
                <li><strong>Owner:</strong> Yash Malik</li>
                <li><strong>Email:</strong> yashsunilmalik@gmail.com</li>
                <li><strong>Location:</strong> Delhi NCR, India</li>
              </ul>
            </section>
          </Reveal>

          <Reveal delay={100}>
            <section className="legal__section">
              <h2>2. Intellectual Property</h2>
              <p>
                Website text, original graphics, logos and visual design are owned by Yash Malik unless a different owner or licence is stated. Third-party logos, libraries and project materials remain subject to their respective owners and licences.
              </p>
              <p>
                Public GitHub repositories are governed by the licence included in each repository. A project link does not grant rights beyond that licence.
              </p>
            </section>
          </Reveal>

          <Reveal delay={150}>
            <section className="legal__section">
              <h2>3. Disclaimer</h2>
              <p>
                The information on this website is provided for general information. Project descriptions reflect the state and evidence available when they were written; prototypes and research projects are identified as such and should not be treated as production guarantees.
              </p>
              <p>
                Technical examples are provided without a warranty that they will suit a particular use. Review code, licences, security and operational requirements before using it in another system.
              </p>
            </section>
          </Reveal>

          <Reveal delay={200}>
            <section className="legal__section">
              <h2>4. Privacy and Data Processing</h2>
              <p>
                The contact form collects the name, email address and message that a visitor submits. The Cloudflare Worker validates the submission and sends it through Resend so that the owner can reply. The inquiry is also retained in the recipient's email mailbox. Do not submit passwords, payment details or other highly sensitive information through this form.
              </p>
              <ul className="legal__list">
                <li><strong>Contact service:</strong> Cloudflare processes the request at the Worker endpoint, and Resend processes the email delivery. Their own privacy and retention terms apply to that processing.</li>
                <li><strong>Analytics:</strong> Plausible analytics is optional and remains disabled unless a site domain is configured for the deployment. When enabled, it records aggregate page-view and referral measurements without using tracking cookies.</li>
                <li><strong>External links:</strong> Links to GitHub, LinkedIn and other services take visitors to third-party websites with their own privacy practices.</li>
              </ul>
            </section>
          </Reveal>

          <Reveal delay={250}>
            <section className="legal__section">
              <h2>5. Updates</h2>
              <p>
                This notice may be updated when the website's features, service providers or applicable requirements change. The current version is published on this page.
              </p>
              <p className="legal__last-updated">Last updated: {new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" })}</p>
            </section>
          </Reveal>
        </div>
      </div>
    </main>
  );
}
