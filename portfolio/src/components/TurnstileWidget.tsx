import { useEffect, useRef } from "react";

interface TurnstileRenderOptions {
  sitekey: string;
  action: "contact";
  theme: "light" | "dark" | "auto";
  callback: (token: string) => void;
  "expired-callback": () => void;
  "error-callback": () => void;
}

interface TurnstileApi {
  render(container: HTMLElement, options: TurnstileRenderOptions): string;
  remove(widgetId: string): void;
}

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

let turnstileScriptPromise: Promise<void> | null = null;

function loadTurnstile(): Promise<void> {
  if (window.turnstile) return Promise.resolve();
  if (turnstileScriptPromise) return turnstileScriptPromise;

  const promise = new Promise<void>((resolve, reject) => {
    const existing = document.getElementById("cloudflare-turnstile-script") as HTMLScriptElement | null;
    const script = existing ?? document.createElement("script");

    const onLoad = () => {
      if (window.turnstile) resolve();
      else reject(new Error("Turnstile loaded without its API"));
    };
    const onError = () => reject(new Error("Turnstile script could not be loaded"));

    script.addEventListener("load", onLoad, { once: true });
    script.addEventListener("error", onError, { once: true });

    if (!existing) {
      script.id = "cloudflare-turnstile-script";
      script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
    }
  }).catch((error: unknown) => {
    turnstileScriptPromise = null;
    throw error;
  });

  turnstileScriptPromise = promise;
  return promise;
}

interface TurnstileWidgetProps {
  siteKey: string;
  onToken: (token: string | null) => void;
  onLoadError: () => void;
}

export default function TurnstileWidget({
  siteKey,
  onToken,
  onLoadError,
}: TurnstileWidgetProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;
    let widgetId: string | null = null;

    void loadTurnstile()
      .then(() => {
        if (cancelled || !containerRef.current || !window.turnstile) return;

        widgetId = window.turnstile.render(containerRef.current, {
          sitekey: siteKey,
          action: "contact",
          theme: "light",
          callback: (token) => onToken(token),
          "expired-callback": () => onToken(null),
          "error-callback": () => {
            onToken(null);
            onLoadError();
          },
        });
      })
      .catch(() => {
        if (!cancelled) {
          onToken(null);
          onLoadError();
        }
      });

    return () => {
      cancelled = true;
      if (widgetId && window.turnstile) {
        window.turnstile.remove(widgetId);
      }
    };
  }, [siteKey, onToken, onLoadError]);

  return <div ref={containerRef} className="turnstile-widget" aria-label="Bot protection check" />;
}
