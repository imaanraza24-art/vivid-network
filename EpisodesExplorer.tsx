"use client";

import { useMemo, useState } from "react";
import type { Episode } from "@/lib/types";
import { EPISODE_CATEGORIES } from "@/lib/content";
import EpisodeCard from "@/components/EpisodeCard";
import EmptyState from "@/components/EmptyState";
import CategoryFilter from "@/components/CategoryFilter";

export default function EpisodesExplorer({ episodes }: { episodes: Episode[] }) {
  const [category, setCategory] = useState<string>("All");

  const filtered = useMemo(() => {
    if (category === "All") return episodes;
    return episodes.filter((e) => e.category === category);
  }, [episodes, category]);

  if (episodes.length === 0) {
    return (
      <EmptyState
        title="NEW CONVERSATIONS ARE COMING."
        body="Vivid Voices is getting ready. Check back soon."
      />
    );
  }

  return (
    <div>
      <CategoryFilter categories={EPISODE_CATEGORIES} active={category} onChange={setCategory} />

      {filtered.length === 0 ? (
        <div className="mt-12">
          <EmptyState
            title="NO EPISODES YET."
            body="No conversations in this category yet — check back soon."
          />
        </div>
      ) : (
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((episode) => (
            <EpisodeCard key={episode.slug} episode={episode} />
          ))}
        </div>
      )}
    </div>
  );
}
