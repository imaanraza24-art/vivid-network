import type { Metadata } from "next";
import { getPublishedArticles } from "@/lib/content";
import ArticlesExplorer from "@/components/ArticlesExplorer";

export const metadata: Metadata = {
  title: "Articles",
  description: "Stories, perspectives, culture, and conversations from young people."
};

export default async function ArticlesPage() {
  const articles = await getPublishedArticles();

  return (
    <div className="mx-auto max-w-6xl px-6 pb-24 pt-32 sm:pt-40">
      <header className="mb-14 max-w-2xl">
        <p className="text-[11px] font-semibold uppercase tracking-widest2 text-gold">Vivid Network</p>
        <h1 className="mt-3 font-display text-5xl text-bone sm:text-6xl">ARTICLES</h1>
        <p className="mt-4 text-base text-bone-muted">
          Stories, perspectives, culture, and conversations from young people.
        </p>
      </header>

      <ArticlesExplorer articles={articles} />
    </div>
  );
}
