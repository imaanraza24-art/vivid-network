import Link from "next/link";
import HeroBackground from "@/components/HeroBackground";
import ArticleCard from "@/components/ArticleCard";
import EpisodeCard from "@/components/EpisodeCard";
import EmptyState from "@/components/EmptyState";
import NewsletterSignup from "@/components/NewsletterSignup";
import {
  getFeaturedArticle,
  getFeaturedEpisode,
  getLatestArticles
} from "@/lib/content";

export default async function HomePage() {
  const [featuredArticle, featuredEpisode, latestArticles] = await Promise.all([
    getFeaturedArticle(),
    getFeaturedEpisode(),
    getLatestArticles(3)
  ]);

  return (
    <>
      {/* ---------------------------------------------------------------- */}
      {/* HERO                                                              */}
      {/* ---------------------------------------------------------------- */}
      <section className="relative flex min-h-[90vh] items-center justify-center overflow-hidden bg-ink sm:min-h-screen">
        <HeroBackground />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ink/40 via-transparent to-ink" />

        <div className="relative z-10 mx-auto max-w-4xl px-6 text-center animate-fade-in">
          <p className="text-[11px] font-semibold uppercase tracking-widest2 text-gold">
            Youth-Led Media
          </p>
          <h1 className="mt-5 font-display text-[15vw] leading-[0.92] text-bone sm:text-[9vw] lg:text-[7.5rem]">
            VIVID
            <br />
            NETWORK
          </h1>
          <p className="mt-6 text-sm font-semibold uppercase tracking-widest2 text-plum-200 sm:text-base">
            A youth brand.
          </p>
          <p className="mt-2 font-display text-lg italic text-bone-muted sm:text-xl">
            By youth. For youth.
          </p>
          <p className="mx-auto mt-6 max-w-xl text-sm text-bone-muted sm:text-base">
            A youth-led media platform creating space for teenagers to tell real stories, start
            conversations, explore culture, and make sense of growing up today.
          </p>

          <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/about"
              className="focus-ring w-full rounded-full bg-gold px-8 py-3.5 text-xs font-semibold uppercase tracking-widest2 text-ink transition-opacity hover:opacity-90 sm:w-auto"
            >
              Explore Vivid
            </Link>
            <Link
              href="/get-involved#share-your-story"
              className="focus-ring w-full rounded-full border border-white/25 px-8 py-3.5 text-xs font-semibold uppercase tracking-widest2 text-bone transition-colors hover:border-gold hover:text-gold sm:w-auto"
            >
              Share Your Story
            </Link>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* INTRODUCTION                                                      */}
      {/* ---------------------------------------------------------------- */}
      <section className="mx-auto max-w-4xl px-6 py-24 text-center sm:py-32">
        <p className="text-[11px] font-semibold uppercase tracking-widest2 text-plum-400">
          What Vivid Network is
        </p>
        <h2 className="mt-4 font-display text-4xl leading-tight text-bone sm:text-5xl">
          BY YOUTH.
          <br />
          FOR YOUTH.
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-base text-bone-muted sm:text-lg">
          Vivid Network is a home for the stories, conversations, and perspectives that come from
          actually being a teenager right now — not looking back on it. Articles, interviews,
          podcast conversations, and creative projects, made by young people, for young people.
        </p>
        <Link
          href="/about"
          className="focus-ring mt-8 inline-block text-sm font-semibold uppercase tracking-widest2 text-gold"
        >
          About Vivid →
        </Link>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* FEATURED ARTICLE                                                  */}
      {/* ---------------------------------------------------------------- */}
      <section className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
        <SectionLabel eyebrow="Featured Story" title="From the archive" />
        {featuredArticle ? (
          <ArticleCard article={featuredArticle} size="featured" />
        ) : (
          <EmptyState title="NO STORIES YET." body="Stories are coming soon." />
        )}
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* FEATURED VIVID VOICES EPISODE                                     */}
      {/* ---------------------------------------------------------------- */}
      <section className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
        <SectionLabel eyebrow="Vivid Voices" title="Latest conversation" />
        {featuredEpisode ? (
          <div className="max-w-2xl">
            <EpisodeCard episode={featuredEpisode} featured />
          </div>
        ) : (
          <EmptyState
            title="NEW CONVERSATIONS ARE COMING."
            body="Vivid Voices is getting ready. Check back soon."
          />
        )}
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* LATEST ARTICLES                                                   */}
      {/* ---------------------------------------------------------------- */}
      {latestArticles.length > 0 && (
        <section className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
          <SectionLabel eyebrow="Fresh" title="Latest articles" />
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {latestArticles.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link
              href="/articles"
              className="focus-ring text-sm font-semibold uppercase tracking-widest2 text-gold"
            >
              View All Articles →
            </Link>
          </div>
        </section>
      )}

      {/* ---------------------------------------------------------------- */}
      {/* WHY VIVID EXISTS                                                  */}
      {/* ---------------------------------------------------------------- */}
      <section className="atmosphere relative overflow-hidden bg-ink-soft px-6 py-24 text-center sm:py-32">
        <div className="relative mx-auto max-w-3xl">
          <p className="text-[11px] font-semibold uppercase tracking-widest2 text-plum-400">
            Why Vivid exists
          </p>
          <h2 className="mt-4 font-display text-4xl leading-tight text-bone sm:text-5xl">
            TEENAGERS SHOULD
            <br />
            GET TO TALK TOO.
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-base text-bone-muted">
            Most media about teenagers is made about them, not by them. Vivid Network flips that —
            handing the mic, the byline, and the camera to the people actually living it.
          </p>
          <Link
            href="/about"
            className="focus-ring mt-8 inline-block text-sm font-semibold uppercase tracking-widest2 text-gold"
          >
            About Vivid →
          </Link>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* FINAL CTA                                                         */}
      {/* ---------------------------------------------------------------- */}
      <section className="mx-auto max-w-3xl px-6 py-24 text-center sm:py-32">
        <h2 className="font-display text-4xl leading-tight text-bone sm:text-5xl">
          YOUR STORY BELONGS HERE.
        </h2>
        <Link
          href="/get-involved#share-your-story"
          className="focus-ring mt-8 inline-block rounded-full bg-gold px-9 py-4 text-xs font-semibold uppercase tracking-widest2 text-ink transition-opacity hover:opacity-90"
        >
          Share Your Story →
        </Link>
      </section>

      <section className="border-t border-white/[0.06] px-6 py-20">
        <NewsletterSignup />
      </section>
    </>
  );
}

function SectionLabel({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="mb-8 flex items-end justify-between">
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-widest2 text-plum-400">
          {eyebrow}
        </p>
        <h2 className="mt-2 font-display text-2xl text-bone sm:text-3xl">{title}</h2>
      </div>
    </div>
  );
}
