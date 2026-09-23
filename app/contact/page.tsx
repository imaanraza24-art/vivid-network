import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description: "Have a story idea, want to collaborate, or just want to say hi? Reach out to Vivid Network."
};

export default function ContactPage() {
  return (
    <div className="pb-24 pt-32 sm:pt-40">
      <header className="mx-auto max-w-2xl px-6 text-center">
        <p className="text-[11px] font-semibold uppercase tracking-widest2 text-gold">Contact</p>
        <h1 className="mt-4 font-display text-5xl text-bone sm:text-6xl">LET&rsquo;S TALK.</h1>
        <p className="mt-4 text-base text-bone-muted">
          Have a story idea, want to collaborate, want to be on the podcast, or just want to say
          hi?
        </p>
      </header>

      <section className="mx-auto mt-14 max-w-xl px-6">
        <ContactForm />
      </section>
    </div>
  );
}
