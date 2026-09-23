import type { Metadata } from "next";
import { getFeaturedEpisode, getPublishedEpisodes } from "@/lib/content";
import EpisodeCard from "@/components/EpisodeCard";
import EpisodesExplorer from "@/components/EpisodesExplorer";

export const metadata: Metadata = {
  title: "Vivid Voices",
  description: "The conversations we wish someone had started sooner."
};

export default async function VividVoicesPage() {
  const [episodes, featured] = await Promise.all([getPublishedEpisodes(), getFeaturedEpisode()]);

  return (
    <div className="mx-auto max-w-6xl px-6 pb-24 pt-32 sm:pt-40">
      <header className="mb-14 max-w-2xl">
        <p className="text-[11px] font-semibold uppercase tracking-widest2 text-gold">
          Vivid Network Podcast
        </p>
        <h1 className="mt-3 font-display text-5xl text-bone sm:text-6xl">VIVID VOICES</h1>
        <p className="mt-4 font-display text-xl italic text-plum-200">
          The conversations we wish someone had started sooner.
        </p>
        <p className="mt-4 text-base text-bone-muted">
          Vivid Voices is a teen-led podcast where young people talk honestly about identity,
          culture, friendships, school, pressure, belonging, social media, and growing up.
        </p>
      </header>

      {featured && (
        <section className="mb-16">
          <p className="mb-6 text-[11px] font-semibold uppercase tracking-widest2 text-plum-400">
            Featured episode
          </p>
          <div className="max-w-2xl">
            <EpisodeCard episode={featured} featured />
          </div>
        </section>
      )}

      <section>
        <p className="mb-6 text-[11px] font-semibold uppercase tracking-widest2 text-plum-400">
          All episodes
        </p>
        <EpisodesExplorer episodes={episodes} />
      </section>
    </div>
  );
}
