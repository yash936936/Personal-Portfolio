import PageHeader from "../components/PageHeader";
import Reveal from "../components/Reveal";
import "./LegalNotice.css";

export default function LegalNotice() {
  return (
    <div className="legal-page">
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
                This website is the personal and professional portfolio of <strong>Yash Malik</strong>. It serves as a digital showcase of projects, services, and research in Artificial Intelligence, Machine Learning, and Full-Stack Web Development.
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
                All content on this website, including but not limited to text, graphics, logos, UI designs, and codebase excerpts, is the property of Yash Malik unless otherwise explicitly stated or credited to third-party open-source licenses.
              </p>
              <p>
                You may not reproduce, distribute, or modify the visual design or proprietary content of this site without prior written consent. Projects linked to public GitHub repositories are subject to their respective repository licenses (e.g., MIT, GPL).
              </p>
            </section>
          </Reveal>

          <Reveal delay={150}>
            <section className="legal__section">
              <h2>3. Disclaimer of Liability</h2>
              <p>
                The information provided on this website is for general informational purposes only. While I strive to keep the information up to date and correct, I make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, or suitability of the information, products, services, or related graphics contained on the website.
              </p>
              <p>
                Any reliance you place on such information is therefore strictly at your own risk. I will not be liable for any loss or damage arising out of, or in connection with, the use of this website or the deployment of any code snippets provided herein.
              </p>
            </section>
          </Reveal>

          <Reveal delay={200}>
            <section className="legal__section">
              <h2>4. Privacy Policy & Data Collection</h2>
              <p>
                I am committed to ensuring that your privacy is protected. This website operates with minimal data collection:
              </p>
              <ul className="legal__list">
                <li><strong>Contact Forms:</strong> If you use a contact form or email link, the information you provide (name, email, message) is strictly used to respond to your inquiry. It is never sold or distributed to third parties.</li>
                <li><strong>Analytics:</strong> This site may use basic, anonymized web analytics to monitor traffic and improve performance. This data does not personally identify you.</li>
                <li><strong>External Links:</strong> This website contains links to external sites (such as GitHub, LinkedIn, and project deployments). I am not responsible for the privacy practices or the content of those external websites.</li>
              </ul>
            </section>
          </Reveal>

          <Reveal delay={250}>
            <section className="legal__section">
              <h2>5. Updates to these Terms</h2>
              <p>
                These terms and policies may be updated periodically to reflect changes in services or legal requirements. The latest version will always be available on this page.
              </p>
              <p className="legal__last-updated">Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</p>
            </section>
          </Reveal>
        </div>
      </div>
    </div>
  );
}