import type { MetadataRoute } from "next";
import { getPublishedArticles, getPublishedEpisodes } from "@/lib/content";
import { siteUrl } from "@/lib/format";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [articles, episodes] = await Promise.all([getPublishedArticles(), getPublishedEpisodes()]);

  const staticRoutes: MetadataRoute.Sitemap = [
    "/",
    "/articles",
    "/vivid-voices",
    "/about",
    "/get-involved",
    "/contact",
    "/search"
  ].map((path) => ({
    url: siteUrl(path),
    lastModified: new Date()
  }));

  const articleRoutes: MetadataRoute.Sitemap = articles.map((a) => ({
    url: siteUrl(`/articles/${a.slug}`),
    lastModified: a.date
  }));

  const episodeRoutes: MetadataRoute.Sitemap = episodes.map((e) => ({
    url: siteUrl(`/vivid-voices/${e.slug}`),
    lastModified: e.date
  }));

  return [...staticRoutes, ...articleRoutes, ...episodeRoutes];
}
