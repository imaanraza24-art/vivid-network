import Link from "next/link";
import Image from "next/image";
import type { Article } from "@/lib/types";
import { formatDate } from "@/lib/format";
import BrandedPlaceholder from "@/components/BrandedPlaceholder";

export default function ArticleCard({
  article,
  size = "regular"
}: {
  article: Article;
  size?: "featured" | "regular";
}) {
  const isFeatured = size === "featured";

  return (
    <Link
      href={`/articles/${article.slug}`}
      className="focus-ring group block overflow-hidden rounded-xl"
    >
      <div
        className={`relative overflow-hidden rounded-xl ${
          isFeatured ? "aspect-[16/10]" : "aspect-[4/3]"
        }`}
      >
        {article.image.thumbnail ? (
          <Image
            src={article.image.thumbnail}
            alt={article.image.alt || article.title}
            fill
            sizes={isFeatured ? "(min-width: 1024px) 60vw, 100vw" : "(min-width: 1024px) 33vw, 100vw"}
            className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          />
        ) : (
          <BrandedPlaceholder label="Vivid Network" className="h-full w-full" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent" />
      </div>

      <div className="mt-4">
        <p className="text-[11px] font-semibold uppercase tracking-widest2 text-gold">
          {article.category}
        </p>
        <h3
          className={`mt-2 font-display leading-snug text-bone transition-colors group-hover:text-plum-200 ${
            isFeatured ? "text-2xl sm:text-3xl" : "text-lg sm:text-xl"
          }`}
        >
          {article.title}
        </h3>
        <p className="mt-2 line-clamp-2 text-sm text-bone-muted">{article.excerpt}</p>
        <p className="mt-3 text-xs uppercase tracking-widest2 text-bone-muted/70">
          {article.author} · {formatDate(article.date)}
        </p>
      </div>
    </Link>
  );
}
