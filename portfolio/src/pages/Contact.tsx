import { useState } from "react";
import PageHeader from "../components/PageHeader";
import Reveal from "../components/Reveal";
import "./Contact.css";

export default function Contact() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    setStatus("loading");

    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    try {
      const response = await fetch("https://contact-backend.yashm15082005.workers.dev", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Contact request failed");

      form.reset();
      setStatus("success");
    } catch (error) {
      console.error("Contact form submission failed:", error);
      setStatus("error");
    }
  };

  return (
    <div className="contact-dark">
      <PageHeader
        eyebrow="Contact"
        title="Let's build a product people actually care about."
        sub="Tell me what you're working on — I read every message myself."
      />

      <section className="container contact-grid">
        <Reveal>
          <div className="contact-info">
            <div className="contact-info__block">
              <span className="contact-info__label">Email</span>
              <a href="mailto:yashsunilmalik@gmail.com" className="contact-info__value">
                yashsunilmalik@gmail.com
              </a>
            </div>
            <div className="contact-info__block">
              <span className="contact-info__label">Based in</span>
              <p className="contact-info__value">Delhi NCR, India</p>
            </div>
            <div className="contact-info__block">
              <span className="contact-info__label">Elsewhere</span>
              <div className="contact-info__links">
                <a href="https://github.com/yash936936" target="_blank" rel="noreferrer">GitHub</a>
                <a href="https://linkedin.com/in/yashmalik-" target="_blank" rel="noreferrer">LinkedIn</a>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={100}>
          {status === "success" ? (
            <div className="contact-success" role="status" aria-live="polite">
              <h3>Message sent.</h3>
              <p>Thanks for reaching out — I'll get back to you within a couple of days.</p>
            </div>
          ) : (
            <form
              className="contact-form"
              onSubmit={handleSubmit}
              aria-busy={status === "loading"}
            >
              <label className="contact-form__honeypot" aria-hidden="true">
                <span>Leave this field empty</span>
                <input type="text" name="website" tabIndex={-1} autoComplete="off" />
              </label>
              <label className="contact-form__field">
                <span>Name</span>
                <input
                  type="text"
                  name="name"
                  autoComplete="name"
                  maxLength={120}
                  required
                />
              </label>
              <label className="contact-form__field">
                <span>Email</span>
                <input
                  type="email"
                  name="email"
                  autoComplete="email"
                  maxLength={254}
                  required
                />
              </label>
              <label className="contact-form__field">
                <span>What are you building?</span>
                <textarea
                  name="message"
                  rows={5}
                  maxLength={5000}
                  required
                />
              </label>
              <button type="submit" className="contact-form__submit" disabled={status === "loading"}>
                {status === "loading" ? "Sending..." : "Send Message"}
              </button>
              {status === "error" && (
                <p className="contact-error" role="alert" aria-live="assertive">
                  Your message could not be sent. Please check your connection and try again.
                </p>
              )}
            </form>
          )}
        </Reveal>
      </section>
    </div>
  );
}
