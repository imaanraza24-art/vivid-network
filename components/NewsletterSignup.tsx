"use client";

import { FormEvent, useState } from "react";

type Status = "idle" | "loading" | "success" | "error" | "duplicate";

export default function NewsletterSignup({
  variant = "section"
}: {
  variant?: "section" | "footer";
}) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
      });
      const data = await res.json();

      if (res.status === 409) {
        setStatus("duplicate");
        setMessage(data.message ?? "You're already on the list.");
        return;
      }
      if (!res.ok) {
        setStatus("error");
        setMessage(data.message ?? "Something went wrong. Try again in a moment.");
        return;
      }
      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
      setMessage("Something went wrong. Try again in a moment.");
    }
  }

  if (status === "success") {
    return (
      <div className={variant === "footer" ? "" : "text-center"}>
        <p className="font-display text-2xl text-bone">YOU&rsquo;RE IN.</p>
        <p className="mt-1 text-sm text-bone-muted">Vivid Mailbox will land in your inbox soon.</p>
      </div>
    );
  }

  return (
    <div className={variant === "footer" ? "max-w-lg" : "mx-auto max-w-lg text-center"}>
      <p className="text-[11px] font-semibold uppercase tracking-widest2 text-gold">Vivid Mailbox</p>
      <p className="mt-2 font-display text-2xl text-bone sm:text-3xl">
        Stories, ideas, and conversations worth opening.
      </p>
      <form
        onSubmit={handleSubmit}
        className={`mt-5 flex flex-col gap-3 sm:flex-row ${variant === "footer" ? "" : "sm:justify-center"}`}
      >
        <label htmlFor={`mailbox-email-${variant}`} className="sr-only">
          Email address
        </label>
        <input
          id={`mailbox-email-${variant}`}
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          className="focus-ring w-full rounded-full border border-white/15 bg-transparent px-5 py-3 text-sm text-bone placeholder:text-bone-muted/60 sm:max-w-xs"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="focus-ring shrink-0 rounded-full bg-gold px-6 py-3 text-xs font-semibold uppercase tracking-widest2 text-ink transition-opacity hover:opacity-90 disabled:opacity-60"
        >
          {status === "loading" ? "Joining…" : "Join the Mailbox →"}
        </button>
      </form>
      {(status === "error" || status === "duplicate") && (
        <p className="mt-3 text-xs text-bone-muted" role="alert">
          {message}
        </p>
      )}
    </div>
  );
}
