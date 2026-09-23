import { getAllArticlesFromSource } from "@/content/articles";
import { getAllEpisodesFromSource } from "@/content/episodes";
import type { Article, Episode, SearchResult } from "@/lib/types";

// ---------------------------------------------------------------------------
// This is the ONLY module that pages/components should import from to read
// content. It sits between the raw content source (content/articles,
// content/episodes — today static files, tomorrow a CMS or RSS feed) and
// every page/component that displays that content. Nothing here is
// component-specific, so swapping the source never touches presentation.
// ---------------------------------------------------------------------------

function byDateDesc<T extends { date: string }>(a: T, b: T): number {
  return new Date(b.date).getTime() - new Date(a.date).getTime();
}

// ----- Articles --------------------------------------------------------

export async function getPublishedArticles(): Promise<Article[]> {
  const all = await getAllArticlesFromSource();
  return all.filter((a) => a.published).sort(byDateDesc);
}

export async function getFeaturedArticle(): Promise<Article | null> {
  const published = await getPublishedArticles();
  return published.find((a) => a.featured) ?? published[0] ?? null;
}

export async function getLatestArticles(limit = 3): Promise<Article[]> {
  const published = await getPublishedArticles();
  return published.slice(0, limit);
}

export async function getArticlesByCategory(category: string): Promise<Article[]> {
  const published = await getPublishedArticles();
  if (category === "All") return published;
  return published.filter((a) => a.category.toLowerCase() === category.toLowerCase());
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const published = await getPublishedArticles();
  return published.find((a) => a.slug === slug) ?? null;
}

export async function getRelatedArticles(current: Article, limit = 3): Promise<Article[]> {
  const published = await getPublishedArticles();
  return published
    .filter((a) => a.slug !== current.slug && a.category === current.category)
    .slice(0, limit);
}

export async function getAllArticleSlugs(): Promise<string[]> {
  const published = await getPublishedArticles();
  return published.map((a) => a.slug);
}

// ----- Episodes ----------------------------------------------------------

export async function getPublishedEpisodes(): Promise<Episode[]> {
  const all = await getAllEpisodesFromSource();
  return all.filter((e) => e.published).sort(byDateDesc);
}

export async function getFeaturedEpisode(): Promise<Episode | null> {
  const published = await getPublishedEpisodes();
  return published.find((e) => e.featured) ?? published[0] ?? null;
}

export async function getEpisodesByCategory(category: string): Promise<Episode[]> {
  const published = await getPublishedEpisodes();
  if (category === "All") return published;
  return published.filter((e) => e.category.toLowerCase() === category.toLowerCase());
}

export async function getEpisodeBySlug(slug: string): Promise<Episode | null> {
  const published = await getPublishedEpisodes();
  return published.find((e) => e.slug === slug) ?? null;
}

export async function getRelatedEpisodes(current: Episode, limit = 3): Promise<Episode[]> {
  const published = await getPublishedEpisodes();
  return published
    .filter((e) => e.slug !== current.slug && e.category === current.category)
    .slice(0, limit);
}

export async function getAllEpisodeSlugs(): Promise<string[]> {
  const published = await getPublishedEpisodes();
  return published.map((e) => e.slug);
}

// ----- Search --------------------------------------------------------------

export async function searchContent(query: string): Promise<SearchResult[]> {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  const [articles, episodes] = await Promise.all([
    getPublishedArticles(),
    getPublishedEpisodes()
  ]);

  const matchesText = (...fields: (string | null | undefined)[]) =>
    fields.some((f) => f?.toLowerCase().includes(q));

  const articleResults: SearchResult[] = articles
    .filter((a) => matchesText(a.title, a.subtitle, a.excerpt, a.category, ...a.tags))
    .map((a) => ({
      type: "article",
      slug: a.slug,
      title: a.title,
      category: a.category,
      description: a.excerpt,
      date: a.date,
      href: `/articles/${a.slug}`
    }));

  const episodeResults: SearchResult[] = episodes
    .filter((e) => matchesText(e.title, e.subtitle, e.description, e.category, e.guest))
    .map((e) => ({
      type: "episode",
      slug: e.slug,
      title: e.title,
      category: e.category,
      description: e.description,
      date: e.date,
      href: `/vivid-voices/${e.slug}`
    }));

  return [...articleResults, ...episodeResults].sort(byDateDesc);
}

export const ARTICLE_CATEGORIES = [
  "All",
  "Culture",
  "Identity",
  "School",
  "Friendships",
  "Social Media",
  "Growing Up",
  "Music",
  "Arts"
] as const;

export const EPISODE_CATEGORIES = [
  "All",
  "Identity",
  "Culture",
  "School",
  "Friendships",
  "Social Media",
  "Growing Up",
  "Mental Health",
  "Creativity"
] as const;
