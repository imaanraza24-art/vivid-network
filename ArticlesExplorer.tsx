"use client";

import { useMemo, useState } from "react";
import type { Article } from "@/lib/types";
import { ARTICLE_CATEGORIES } from "@/lib/content";
import ArticleCard from "@/components/ArticleCard";
import EmptyState from "@/components/EmptyState";
import CategoryFilter from "@/components/CategoryFilter";

export default function ArticlesExplorer({ articles }: { articles: Article[] }) {
  const [category, setCategory] = useState<string>("All");

  const filtered = useMemo(() => {
    if (category === "All") return articles;
    return articles.filter((a) => a.category === category);
  }, [articles, category]);

  if (articles.length === 0) {
    return <EmptyState title="NO STORIES YET." body="New stories from Vivid Network are coming soon." />;
  }

  const [featured, ...rest] = filtered;

  return (
    <div>
      <CategoryFilter categories={ARTICLE_CATEGORIES} active={category} onChange={setCategory} />

      {filtered.length === 0 ? (
        <div className="mt-12">
          <EmptyState title="NO STORIES YET." body="No stories in this category yet — check back soon." />
        </div>
      ) : (
        <div className="mt-12 space-y-14">
          <ArticleCard article={featured} size="featured" />
          {rest.length > 0 && (
            <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
              {rest.map((article) => (
                <ArticleCard key={article.slug} article={article} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
