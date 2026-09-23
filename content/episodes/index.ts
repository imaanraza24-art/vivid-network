import type { Episode } from "@/lib/types";

// ---------------------------------------------------------------------------
// VIVID VOICES — EPISODE CONTENT SOURCE
//
// Single source of truth for every podcast episode. Ships EMPTY — no fake
// episodes, no fake guests, no fake Spotify/Apple/YouTube links.
//
// HOW TO PUBLISH A REAL EPISODE
// Add an object matching the `Episode` type in lib/types.ts and set
// `published: true`. Leave any listening link as `null` until the real URL
// exists — the UI automatically renders that platform as "Coming soon" and
// activates the button the moment a real URL is added.
//
// HOW TO CONNECT A REAL RSS FEED LATER
// This project is RSS-ready by design: the `Episode` type already carries
// every field a standard podcast RSS <item> provides (title, description,
// artwork, audio URL, publication date, duration, episode number). To wire
// up a real feed:
//   1. Set PODCAST_RSS_URL in your environment (see .env.example).
//   2. Replace `getAllEpisodesFromSource()` below with a fetch + parse of
//      that feed (e.g. using an RSS parser library), mapping each <item>
//      into the `Episode` shape.
//   3. Everything downstream — the archive, episode pages, search, the
//      homepage's featured episode — keeps working unchanged.
// No RSS URL is invented here; do not add one until Vivid Voices has a real
// feed to point to.
// ---------------------------------------------------------------------------

export const episodes: Episode[] = [
  // Example shape for when Vivid Voices is ready to publish its first
  // episode — copy this structure. Left commented out on purpose:
  // production must start at zero real episodes.
  //
  // {
  //   id: "e1",
  //   slug: "i-thought-i-had-to-change-to-belong",
  //   episodeNumber: 1,
  //   season: 1,
  //   title: "I Thought I Had to Change to Belong",
  //   subtitle: "A conversation about code-switching and losing yourself to fit in.",
  //   description: "A short description of the conversation.",
  //   guest: null,
  //   date: "2026-09-01",
  //   duration: 32,
  //   thumbnail: "",
  //   audioUrl: null,
  //   links: { spotify: null, applePodcasts: null, youtube: null },
  //   episodeNotes: "Episode notes go here.",
  //   category: "Identity",
  //   featured: true,
  //   published: true
  // }
];

export async function getAllEpisodesFromSource(): Promise<Episode[]> {
  // Swap for a real RSS fetch/parse once PODCAST_RSS_URL is set, e.g.:
  // if (process.env.PODCAST_RSS_URL) {
  //   const feed = await parsePodcastRss(process.env.PODCAST_RSS_URL);
  //   return feed.map(mapRssItemToEpisode);
  // }
  return episodes;
}
