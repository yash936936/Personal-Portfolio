import { useState } from "react";
import PageHeader from "../components/PageHeader";
import Reveal from "../components/Reveal";
import "./Contact.css";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className="contact-dark">
      <PageHeader
        eyebrow="Contact"
        title="Let's build something worth shipping."
        sub="Tell me what you're working on — I read every message myself."
      />

      <section className="container contact-grid">
        <Reveal>
          <div className="contact-info">
            <div className="contact-info__block">
              <span className="contact-info__label">Email</span>
              <a href="mailto:hello@example.com" className="contact-info__value">
                hello@example.com
              </a>
            </div>
            <div className="contact-info__block">
              <span className="contact-info__label">Based in</span>
              <p className="contact-info__value">Gurugram, India</p>
            </div>
            <div className="contact-info__block">
              <span className="contact-info__label">Elsewhere</span>
              <div className="contact-info__links">
                <a href="https://github.com" target="_blank" rel="noreferrer">GitHub</a>
                <a href="https://linkedin.com" target="_blank" rel="noreferrer">LinkedIn</a>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={100}>
          {submitted ? (
            <div className="contact-success">
              <h3>Message sent.</h3>
              <p>Thanks for reaching out — I'll get back to you within a couple of days.</p>
            </div>
          ) : (
            <form className="contact-form" onSubmit={handleSubmit}>
              <label className="contact-form__field">
                <span>Name</span>
                <input type="text" name="name" required placeholder="Your name" />
              </label>
              <label className="contact-form__field">
                <span>Email</span>
                <input type="email" name="email" required placeholder="you@company.com" />
              </label>
              <label className="contact-form__field">
                <span>What are you building?</span>
                <textarea name="message" rows={5} required placeholder="A few lines about the project..." />
              </label>
              <button type="submit" className="contact-form__submit">
                Send message
              </button>
            </form>
          )}
        </Reveal>
      </section>
    </div>
  );
}