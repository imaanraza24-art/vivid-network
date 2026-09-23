"use client";

import { FormEvent, useState } from "react";

type Status = "idle" | "loading" | "success" | "error";

const CONTRIBUTION_TYPES = ["Article", "Podcast guest", "Video", "Photography", "Art", "Other"];
const AGE_RANGES = ["13–15", "16–17", "18–19"];

export default function StorySubmissionForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const res = await fetch("/api/story-submission", {
        method: "POST",
        body: formData
      });
      const json = await res.json();
      if (!res.ok) {
        setStatus("error");
        setErrorMessage(json.message ?? "Your submission couldn't be sent. Please try again.");
        return;
      }
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
      setErrorMessage("Your submission couldn't be sent. Please try again.");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-white/[0.08] bg-ink-soft px-8 py-14 text-center">
        <p className="font-display text-3xl text-bone">THANK YOU.</p>
        <p className="mt-2 text-sm text-bone-muted">
          Your idea has been sent to Vivid Network for review. We&rsquo;ll be in touch.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate encType="multipart/form-data">
      <div className="grid gap-5 sm:grid-cols-2">
        <TextField label="Name" name="name" required autoComplete="name" />
        <TextField label="Email" name="email" type="email" required autoComplete="email" />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="ageRange" className="mb-2 block text-xs font-semibold uppercase tracking-widest2 text-bone-muted">
            Age range *
          </label>
          <select
            id="ageRange"
            name="ageRange"
            required
            className="focus-ring w-full rounded-lg border border-white/15 bg-ink px-4 py-3 text-sm text-bone"
          >
            <option value="">Select one</option>
            {AGE_RANGES.map((range) => (
              <option key={range} value={range}>
                {range}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="contributionType" className="mb-2 block text-xs font-semibold uppercase tracking-widest2 text-bone-muted">
            Contribution type *
          </label>
          <select
            id="contributionType"
            name="contributionType"
            required
            className="focus-ring w-full rounded-lg border border-white/15 bg-ink px-4 py-3 text-sm text-bone"
          >
            <option value="">Select one</option>
            {CONTRIBUTION_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
      </div>

      <TextField label="Story or idea title" name="ideaTitle" required />

      <div>
        <label htmlFor="ideaDetails" className="mb-2 block text-xs font-semibold uppercase tracking-widest2 text-bone-muted">
          Tell us about your idea *
        </label>
        <textarea
          id="ideaDetails"
          name="ideaDetails"
          required
          rows={6}
          className="focus-ring w-full rounded-lg border border-white/15 bg-transparent px-4 py-3 text-sm text-bone placeholder:text-bone-muted/50"
        />
      </div>

      <TextField label="Social media (optional)" name="socialMedia" required={false} placeholder="@yourhandle" />

      <div>
        <label htmlFor="file" className="mb-2 block text-xs font-semibold uppercase tracking-widest2 text-bone-muted">
          File upload (optional)
        </label>
        <input
          id="file"
          name="file"
          type="file"
          className="focus-ring block w-full text-sm text-bone-muted file:mr-4 file:rounded-full file:border-0 file:bg-plum-600 file:px-4 file:py-2 file:text-xs file:font-semibold file:uppercase file:tracking-widest2 file:text-bone"
        />
      </div>

      <p className="text-xs text-bone-muted">Submissions are reviewed before publication.</p>

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
        {status === "loading" ? "Sending…" : "Submit Your Story"}
      </button>
    </form>
  );
}

function TextField({
  label,
  name,
  type = "text",
  required = false,
  autoComplete,
  placeholder
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
  placeholder?: string;
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
        placeholder={placeholder}
        className="focus-ring w-full rounded-lg border border-white/15 bg-transparent px-4 py-3 text-sm text-bone placeholder:text-bone-muted/50"
      />
    </div>
  );
}
