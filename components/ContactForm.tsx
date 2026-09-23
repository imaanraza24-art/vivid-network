"use client";

import { FormEvent, useState } from "react";

type Status = "idle" | "loading" | "success" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });
      const json = await res.json();
      if (!res.ok) {
        setStatus("error");
        setErrorMessage(json.message ?? "Your message couldn't be sent. Please try again.");
        return;
      }
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
      setErrorMessage("Your message couldn't be sent. Please try again.");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-white/[0.08] bg-ink-soft px-8 py-14 text-center">
        <p className="font-display text-3xl text-bone">THANK YOU.</p>
        <p className="mt-2 text-sm text-bone-muted">Your message has been sent to Vivid Network.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Name" name="name" required autoComplete="name" />
        <Field label="Email" name="email" type="email" required autoComplete="email" />
      </div>
      <Field label="Subject" name="subject" required />
      <div>
        <label htmlFor="message" className="mb-2 block text-xs font-semibold uppercase tracking-widest2 text-bone-muted">
          Message *
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          className="focus-ring w-full rounded-lg border border-white/15 bg-transparent px-4 py-3 text-sm text-bone placeholder:text-bone-muted/50"
        />
      </div>

      {status === "error" && (
        <p className="text-sm text-gold" role="alert">
          {errorMessage}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="focus-ring rounded-full bg-gold px-7 py-3 text-xs font-semibold uppercase tracking-widest2 text-ink transition-opacity hover:opacity-90 disabled:opacity-60"
      >
        {status === "loading" ? "Sending…" : "Send Message"}
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required = false,
  autoComplete
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-2 block text-xs font-semibold uppercase tracking-widest2 text-bone-muted">
        {label} {required && "*"}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        className="focus-ring w-full rounded-lg border border-white/15 bg-transparent px-4 py-3 text-sm text-bone placeholder:text-bone-muted/50"
      />
    </div>
  );
}
