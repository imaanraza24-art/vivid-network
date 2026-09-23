import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getAllEpisodeSlugs, getEpisodeBySlug, getRelatedEpisodes, getPublishedArticles } from "@/lib/content";
import { formatDate, formatDuration, siteUrl } from "@/lib/format";
import BrandedPlaceholder from "@/components/BrandedPlaceholder";
import EpisodeCard from "@/components/EpisodeCard";
import ArticleCard from "@/components/ArticleCard";
import NewsletterSignup from "@/components/NewsletterSignup";

export async function generateStaticParams() {
  const slugs = await getAllEpisodeSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const episode = await getEpisodeBySlug(params.slug);
  if (!episode) return { title: "Episode not found" };

  return {
    title: `${episode.title} — Vivid Voices`,
    description: episode.description,
    alternates: { canonical: siteUrl(`/vivid-voices/${episode.slug}`) },
    openGraph: {
      title: episode.title,
      description: episode.description,
      type: "music.song",
      images: episode.thumbnail ? [episode.thumbnail] : undefined
    }
  };
}

const PLATFORMS: { key: "spotify" | "applePodcasts" | "youtube"; label: string }[] = [
  { key: "spotify", label: "Spotify" },
  { key: "applePodcasts", label: "Apple Podcasts" },
  { key: "youtube", label: "YouTube" }
];

export default async function EpisodePage({ params }: { params: { slug: string } }) {
  const episode = await getEpisodeBySlug(params.slug);
  if (!episode) notFound();

  const [relatedEpisodes, allArticles] = await Promise.all([
    getRelatedEpisodes(episode),
    getPublishedArticles()
  ]);
  const relatedArticles = allArticles
    .filter((a) => a.category.toLowerCase() === episode.category.toLowerCase())
    .slice(0, 3);

  return (
    <article className="pt-28 sm:pt-36">
      <div className="mx-auto max-w-5xl px-6">
        <p className="text-center text-[11px] font-semibold uppercase tracking-widest2 text-plum-400">
          Episode {String(episode.episodeNumber).padStart(2, "0")}
          {episode.season > 1 ? ` · Season ${episode.season}` : ""}
        </p>
        <h1 className="mt-4 text-center font-display text-4xl leading-tight text-bone sm:text-5xl">
          {episode.title}
        </h1>
        {episode.subtitle && (
          <p className="mx-auto mt-4 max-w-xl text-center text-base text-bone-muted sm:text-lg">
            {episode.subtitle}
          </p>
        )}
        <p className="mt-6 text-center text-xs uppercase tracking-widest2 text-bone-muted/80">
          {episode.guest ? `With ${episode.guest} · ` : ""}
          {formatDate(episode.date)} · {formatDuration(episode.duration)}
        </p>
      </div>

      <div className="mx-auto mt-10 max-w-4xl px-6">
        <div className="relative aspect-video overflow-hidden rounded-2xl">
          {episode.thumbnail ? (
            <Image
              src={episode.thumbnail}
              alt={`${episode.title} episode artwork`}
              fill
              sizes="(min-width: 1024px) 70vw, 100vw"
              className="object-cover"
              priority
            />
          ) : (
            <BrandedPlaceholder label="Vivid Voices" className="h-full w-full" />
          )}
        </div>

        {episode.audioUrl ? (
          <audio controls className="mt-6 w-full" src={episode.audioUrl}>
            Your browser does not support the audio element.
          </audio>
        ) : (
          <p className="mt-6 rounded-lg border border-white/10 px-4 py-3 text-center text-sm text-bone-muted">
            Audio for this episode is coming soon.
          </p>
        )}

        <div className="mt-8">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest2 text-bone-muted">
            Listen on
          </p>
          <div className="flex flex-wrap gap-4">
            {PLATFORMS.map((platform) => {
              const url = episode.links[platform.key];
              return url ? (
                <a
                  key={platform.key}
                  href={url}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="focus-ring rounded-full border border-gold/70 px-5 py-2 text-xs font-semibold uppercase tracking-widest2 text-gold hover:bg-gold hover:text-ink"
                >
                  {platform.label}
                </a>
              ) : (
                <span
                  key={platform.key}
                  className="rounded-full border border-white/10 px-5 py-2 text-xs uppercase tracking-widest2 text-bone-muted/50"
                >
                  {platform.label} — coming soon
                </span>
              );
            })}
          </div>
        </div>
      </div>

      <div className="mx-auto mt-14 max-w-2xl px-6">
        <p className="text-base leading-relaxed text-bone/90 sm:text-lg">{episode.description}</p>

        {episode.episodeNotes && (
          <div className="mt-10 border-t border-white/[0.06] pt-6">
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest2 text-bone-muted">
              Episode notes
            </p>
            <p className="text-sm leading-relaxed text-bone-muted">{episode.episodeNotes}</p>
          </div>
        )}
      </div>

      {relatedArticles.length > 0 && (
        <section className="mx-auto mt-24 max-w-6xl px-6">
          <p className="mb-8 text-[11px] font-semibold uppercase tracking-widest2 text-plum-400">
            Related articles
          </p>
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {relatedArticles.map((a) => (
              <ArticleCard key={a.slug} article={a} />
            ))}
          </div>
        </section>
      )}

      {relatedEpisodes.length > 0 && (
        <section className="mx-auto mt-16 max-w-6xl px-6 pb-24">
          <p className="mb-8 text-[11px] font-semibold uppercase tracking-widest2 text-plum-400">
            Related episodes
          </p>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {relatedEpisodes.map((e) => (
              <EpisodeCard key={e.slug} episode={e} />
            ))}
          </div>
        </section>
      )}

      <section className="border-t border-white/[0.06] px-6 py-20">
        <NewsletterSignup />
      </section>
    </article>
  );
}
