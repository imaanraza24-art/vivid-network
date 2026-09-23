import type { Metadata } from "next";
import BrandedPlaceholder from "@/components/BrandedPlaceholder";

export const metadata: Metadata = {
  title: "About",
  description: "What Vivid Network is, why it exists, and who it's for."
};

export default function AboutPage() {
  return (
    <div className="pb-24 pt-32 sm:pt-40">
      <header className="mx-auto max-w-3xl px-6 text-center">
        <p className="text-[11px] font-semibold uppercase tracking-widest2 text-gold">Vivid Network</p>
        <h1 className="mt-4 font-display text-5xl text-bone sm:text-6xl">A YOUTH BRAND.</h1>
        <p className="mt-4 font-display text-xl italic text-plum-200">By youth. For youth.</p>
      </header>

      <section className="mx-auto mt-16 max-w-2xl space-y-6 px-6 text-base leading-relaxed text-bone/90 sm:text-lg">
        <p>
          Vivid Network is a youth-led media platform — a place for teenagers to tell real stories,
          start real conversations, explore culture, and make sense of what it actually feels like
          to grow up right now. Articles, interviews, the Vivid Voices podcast, and creative
          projects, all made by young people, for young people.
        </p>
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest2 text-bone-muted">
            Why it exists
          </p>
          <p>
            Most media about teenagers is made about them, not by them. Vivid Network exists to
            close that gap — handing the mic, the byline, and the camera directly to the people
            living this stage of life, instead of speaking for them.
          </p>
        </div>
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest2 text-bone-muted">
            Who it&rsquo;s for
          </p>
          <p>
            Teenagers who want to tell their own stories, and anyone who wants to actually hear
            what growing up looks like from the inside — not filtered through an adult&rsquo;s
            memory of it.
          </p>
        </div>
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest2 text-bone-muted">
            The mission
          </p>
          <p>
            Give young people a real platform — not a token one — to build media, tell stories, and
            start conversations on their own terms.
          </p>
        </div>
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest2 text-bone-muted">
            The vision
          </p>
          <p>
            A growing network of youth-made articles, podcasts, videos, and creative projects —
            built by a community of young contributors, not just one person.
          </p>
        </div>
      </section>

      <section className="mx-auto mt-24 max-w-4xl px-6">
        <div className="grid gap-10 sm:grid-cols-2 sm:items-center">
          <BrandedPlaceholder label="Imaan Raza" className="aspect-[4/5] rounded-2xl" />
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-widest2 text-gold">
              Founder
            </p>
            <h2 className="mt-3 font-display text-3xl text-bone sm:text-4xl">HI, I&rsquo;M IMAAN.</h2>
            <p className="mt-4 text-base leading-relaxed text-bone-muted">
              I&rsquo;m a teenager, creator, and the person behind Vivid Network. I started Vivid
              because I kept noticing how little space teenagers actually get to speak for
              ourselves — in the media, in conversations about us, in the stories that get told
              about what this age is like. Vivid Network is my attempt to build that space for
              real, starting with my own voice and growing into a network of them.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
