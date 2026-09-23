import type { Metadata } from "next";
import StorySubmissionForm from "@/components/StorySubmissionForm";

export const metadata: Metadata = {
  title: "Get Involved",
  description: "Contribute, be a guest, collaborate, or partner with Vivid Network."
};

const WAYS_IN = [
  {
    title: "Become a Contributor",
    body: "Write articles, make videos, take photos, create art — bring your perspective to Vivid Network in whatever form fits it best."
  },
  {
    title: "Be a Guest",
    body: "Appear on Vivid Voices and talk honestly about something real — identity, school, friendships, social media, growing up."
  },
  {
    title: "Collaborate",
    body: "Have an idea for a creative project? Vivid Network is open to collaborating on things that don't fit a single category."
  },
  {
    title: "Partner With Us",
    body: "Schools, organizations, youth programs, and youth-focused brands — let's talk about working together."
  }
];

export default function GetInvolvedPage() {
  return (
    <div className="pb-24 pt-32 sm:pt-40">
      <header className="mx-auto max-w-2xl px-6 text-center">
        <p className="text-[11px] font-semibold uppercase tracking-widest2 text-gold">
          Get Involved
        </p>
        <h1 className="mt-4 font-display text-5xl text-bone sm:text-6xl">WANT IN?</h1>
      </header>

      <section className="mx-auto mt-16 grid max-w-5xl gap-6 px-6 sm:grid-cols-2">
        {WAYS_IN.map((way) => (
          <div
            key={way.title}
            className="rounded-2xl border border-white/[0.08] bg-ink-soft p-7 transition-colors hover:border-plum-500/40"
          >
            <h2 className="font-display text-xl text-bone sm:text-2xl">{way.title}</h2>
            <p className="mt-3 text-sm text-bone-muted">{way.body}</p>
          </div>
        ))}
      </section>

      <section id="share-your-story" className="mx-auto mt-24 max-w-2xl scroll-mt-28 px-6">
        <p className="text-[11px] font-semibold uppercase tracking-widest2 text-gold">
          Share Your Story
        </p>
        <h2 className="mt-3 font-display text-3xl text-bone sm:text-4xl">
          Tell us what you want to make.
        </h2>
        <p className="mt-4 text-sm text-bone-muted">
          Fill this out and someone from Vivid Network will get back to you.
        </p>
        <div className="mt-10">
          <StorySubmissionForm />
        </div>
      </section>
    </div>
  );
}
