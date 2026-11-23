import { useCallback, useState, type FormEvent } from "react";
import PageHeader from "../components/PageHeader";
import Reveal from "../components/Reveal";
import TurnstileWidget from "../components/TurnstileWidget";
import "./Contact.css";

const CONTACT_ENDPOINT =
  import.meta.env.VITE_CONTACT_API_URL ??
  "https://contact-backend.yashm15082005.workers.dev";
const TURNSTILE_SITE_KEY = import.meta.env.VITE_TURNSTILE_SITE_KEY;

export default function Contact() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [turnstileReset, setTurnstileReset] = useState(0);
  const [turnstileError, setTurnstileError] = useState(false);

  const handleTurnstileError = useCallback(() => {
    setTurnstileError(true);
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formElement = event.currentTarget;

    if (TURNSTILE_SITE_KEY && !turnstileToken) {
      setStatus("error");
      return;
    }

    setStatus("loading");
    setTurnstileError(false);

    const formData = new FormData(formElement);
    const payload = {
      ...Object.fromEntries(formData),
      ...(TURNSTILE_SITE_KEY ? { turnstileToken } : {}),
    };

    try {
      const response = await fetch(CONTACT_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(pay¶»§q«^