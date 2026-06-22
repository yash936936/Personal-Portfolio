import { useState } from "react";
import PageHeader from "../components/PageHeader";
import Reveal from "../components/Reveal";
import "./Contact.css";

export default function Contact() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);

    try {
      const response = await fetch("https://contact-backend.yashm15082005.workers.dev", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Network response was not ok");
      
      setStatus("success");
      e.currentTarget.reset();

    } catch (error) {
      console.error("Submission failed:", error);
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
                <input type="email" name="email" required placeholder="you@example.com" />
              </label>
              <label className="contact-form__field">
                <span>What are you building?</span>
                <textarea name="message" rows={5} required placeholder="A few lines about the project..." />
              </label>
              <button type="submit" className="contact-form__submit" disabled={status === "loading"}>
                {status === "loading" ? "Sending..." : "Send Message"}
              </button>
              {status === "error" && <p className="text-red-500 mt-4">Something went wrong. Please try again.</p>}
            </form>
          )}
        </Reveal>
      </section>
    </div>
  );
}