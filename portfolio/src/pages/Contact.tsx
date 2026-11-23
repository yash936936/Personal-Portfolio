import { useState } from "react";
import PageHeader from "../components/PageHeader";
import Reveal from "../components/Reveal";
import "./Contact.css";

const CONTACT_ENDPOINT =
  import.meta.env.VITE_CONTACT_API_URL ??
  "https://contact-backend.yashm15082005.workers.dev";

export default function Contact() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formElement = event.currentTarget;
    setStatus("loading");

    const formData = new FormData(formElement);
    const data = Object.fromEntries(formData);

    try {
      const response = await fetch(CONTACT_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Contact submission failed");

      formElement.reset();
      setStatus("success");
    } catch (error) {
      console.error("Submission failed:", error);
      setStatus("error");
    }
  };

  return (
    <div className="contact-dark">
      <PageHeader
        eyebrow="Contact"
        title="Let&apos;s build a product people actually care about."
        sub="Tell me what you&apos;re working on — I read every message myself."
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
                <a href="https://linkedin.com/in/yashmalik-/" target="_blank" rel="noreferrer">LinkedIn</a>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={100}>
          {status === "success" ? (
            <div className="contact-success" role="status" aria-live="polite">
              <h3>Message sent.</h3>
              <p>Thanks for reaching out — I&apos;ll get back to you within a couple of days.</p>
            </div>
          ) : (
            <form className="contact-form" onSubmit={handleSubmit} aria-busy={status === "loading"}>
              <label className="contact-form__field">
                <span>Name</span>
                <input
                  type="text"
                  name="name"
                  autoComplete="name"
                  maxLength={100}
                  required
                  placeholder="Your name"
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
                  placeholder="you@example.com"
                />
              </label>
              <label className="contact-form__field">
                <span>What are you building?</span>
                <textarea
                  name="message"
                  rows={5}
                  maxLength={5000}
                  required
                  placeholder="A few lines about the project..."
                />
              </label>
              <button type="submit" className="contact-form__submit" disabled={status === "loading"}>
                {status === "loading" ? "Sending..." : "Send Message"}
              </button>
              {status === "error" && (
                <p className="text-red-500 mt-4" role="alert">
                  Something went wrong. Please try again or email me directly.
                </p>
              )}
            </form>
          )}
        </Reveal>
      </section>
    </div>
  );
}
