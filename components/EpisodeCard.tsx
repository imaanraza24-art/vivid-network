import Link from "next/link";
import Image from "next/image";
import type { Episode } from "@/lib/types";
import { formatDate, formatDuration } from "@/lib/format";
import BrandedPlaceholder from "@/components/BrandedPlaceholder";

const PLATFORMS: { key: keyof Episode["links"]; label: string }[] = [
  { key: "spotify", label: "Spotify" },
  { key: "applePodcasts", label: "Apple Podcasts" },
  { key: "youtube", label: "YouTube" }
];

export default function EpisodeCard({
  episode,
  featured = false
}: {
  episode: Episode;
  featured?: boolean;
}) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-white/[0.07] bg-ink-soft transition-colors hover:border-plum-500/40">
      <Link href={`/vivid-voices/${episode.slug}`} className="focus-ring block">
        <div className={`relative overflow-hidden ${featured ? "aspect-[16/9]" : "aspect-square sm:aspect-[4/3]"}`}>
          {episode.thumbnail ? (
            <Image
              src={episode.thumbnail}
              alt={`${episode.title} episode artwork`}
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            />
          ) : (
            <BrandedPlaceholder label="Vivid Voices" className="h-full w-full" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/10 to-transparent" />
          <span className="absolute bottom-4 left-5 flex h-11 w-11 items-center justify-center rounded-full bg-gold text-ink shadow-glow">
            <PlayIcon />
          </span>
        </div>
      </Link>

      <div className="p-5 sm:p-6">
        <p className="text-[11px] font-semibold uppercase tracking-widest2 text-plum-400">
          Episode {String(episode.episodeNumber).padStart(2, "0")}
        </p>
        <Link href={`/vivid-voices/${episode.slug}`} className="focus-ring">
          <h3 className={`mt-2 font-display leading-snug text-bone ${featured ? "text-2xl sm:text-3xl" : "text-xl"}`}>
            {episode.title}
          </h3>
        </Link>
        <p className="mt-2 line-clamp-2 text-sm text-bone-muted">{episode.description}</p>
        <p className="mt-3 text-xs uppercase tracking-widest2 text-bone-muted/70">
          {formatDate(episode.date)} · {formatDuration(episode.duration)}
        </p>

        <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-white/[0.06] pt-4">
          {PLATFORMS.map((platform) => {
            const url = episode.links[platform.key];
            return url ? (
              <a
                key={platform.key}
                href={url}
                target="_blank"
                rel="noreferrer noopener"
                className="focus-ring text-xs font-semibold uppercase tracking-widest2 text-bone/80 hover:text-gold"
              >
                {platform.label}
              </a>
            ) : (
              <span key={platform.key} className="text-xs uppercase tracking-widest2 text-bone-muted/40">
                {platform.label} — coming soon
              </span>
            );
          })}
        </div>
      </div>
    </article>
  );
}

function PlayIcon() {
  return (
    <svg width="14" height="16" viewBox="0 0 14 16" fill="currentColor" aria-hidden="true">
      <path d="M0 0.7C0 0.05 0.72 -0.34 1.28 0L13.28 7.3C13.8 7.62 13.8 8.38 13.28 8.7L1.28 16C0.72 16.34 0 15.95 0 15.3V0.7Z" />
    </svg>
  );
}
