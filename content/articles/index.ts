import type { Article } from "@/lib/types";

// ---------------------------------------------------------------------------
// ARTICLES — CONTENT SOURCE
//
// This file is the single source of truth for every article on the site.
// It intentionally ships EMPTY. Vivid Network's own rule is "real content
// only" — no placeholder stories, no fake authors, no fake dates.
//
// HOW TO PUBLISH A REAL ARTICLE
// Add an object to the array below that matches the `Article` type in
// lib/types.ts, then set `published: true`. The homepage, /articles archive,
// category filters, search, and the article's own page at
// /articles/[slug] will all pick it up automatically — nothing else needs
// to change.
//
// HOW TO CONNECT A REAL CMS LATER
// Replace the static `articles` array below with a fetch from your CMS
// (e.g. Sanity, Contentful, a headless WordPress, or a database) inside
// `getAllArticlesFromSource()`. Every function in lib/content.ts that reads
// from this file will keep working unchanged, because they only depend on
// the `Article[]` shape — not on where it comes from.
// ---------------------------------------------------------------------------

export const articles: Article[] = [
  // Example of the exact shape a real article should take — copy this
  // structure when Vivid Network is ready to publish. Left commented out
  // on purpose: production must start at zero real articles.
  //
  // {
  //   id: "a1",
  //   slug: "the-year-i-stopped-performing-happy",
  //   title: "The Year I Stopped Performing Happy",
  //   subtitle: "What it actually took to stop pretending I was fine online.",
  //   excerpt: "I posted like everything was fine. It wasn't. Here's what changed.",
  //   content: "Full article body goes here...\n\nParagraphs are separated by a blank line.",
  //   author: "Imaan Raza",
  //   date: "2026-09-01",
  //   category: "Social Media",
  //   image: { hero: "", thumbnail: "", alt: "" },
  //   featured: true,
  //   published: true,
  //   tags: ["social media", "mental health", "identity"]
  // }
];

export async function getAllArticlesFromSource(): Promise<Article[]> {
  // Swap this for a real fetch once a CMS is connected, e.g.:
  // const res = await fetch(process.env.CMS_ARTICLES_ENDPOINT!, { next: { revalidate: 60 } });
  // return res.json();
  return articles;
}
