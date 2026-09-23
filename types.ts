// ---------------------------------------------------------------------------
// Vivid Network — content types
//
// These types define the shape of ALL content on the site. They are the
// contract between the content source (right now: local files in /content;
// later: a real CMS or database) and the presentation layer (components,
// pages). Nothing about an article or episode should ever be hard-coded
// into a component — it should flow through these types instead.
// ---------------------------------------------------------------------------

export type ArticleCategory =
  | "Culture"
  | "Identity"
  | "School"
  | "Friendships"
  | "Social Media"
  | "Growing Up"
  | "Music"
  | "Arts";

export type EpisodeCategory =
  | "Identity"
  | "Culture"
  | "School"
  | "Friendships"
  | "Social Media"
  | "Growing Up"
  | "Mental Health"
  | "Creativity";

export interface ArticleImage {
  /** Path or URL to the full hero image. Leave empty ("") to use the branded placeholder. */
  hero: string;
  /** Path or URL to the smaller card/thumbnail image. Leave empty ("") to use the branded placeholder. */
  thumbnail: string;
  /** Required whenever hero/thumbnail is set — describes the image for screen readers. */
  alt: string;
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  excerpt: string;
  /** Full article body. Supports basic markdown-style paragraphs (split on blank lines). */
  content: string;
  author: string;
  date: string; // ISO date, e.g. "2026-08-01"
  category: ArticleCategory;
  image: ArticleImage;
  featured: boolean;
  published: boolean;
  tags: string[];
}

export interface EpisodeLinks {
  /** null/empty = not yet available. The UI will render this platform as "Coming soon". */
  spotify: string | null;
  applePodcasts: string | null;
  youtube: string | null;
}

export interface Episode {
  id: string;
  slug: string;
  episodeNumber: number;
  season: number;
  title: string;
  subtitle: string;
  description: string;
  guest: string | null;
  date: string; // ISO date
  /** Duration in minutes. */
  duration: number;
  thumbnail: string; // "" = use branded placeholder
  audioUrl: string | null;
  links: EpisodeLinks;
  episodeNotes: string;
  category: EpisodeCategory;
  featured: boolean;
  published: boolean;
}

export type SearchResultType = "article" | "episode";

export interface SearchResult {
  type: SearchResultType;
  slug: string;
  title: string;
  category: string;
  description: string;
  date: string;
  href: string;
}
