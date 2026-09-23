import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getAllArticleSlugs, getArticleBySlug, getRelatedArticles } from "@/lib/content";
import { formatDate, siteUrl } from "@/lib/format";
import BrandedPlaceholder from "@/components/BrandedPlaceholder";
import ArticleCard from "@/components/ArticleCard";
import NewsletterSignup from "@/components/NewsletterSignup";

export async function generateStaticParams() {
  const slugs = await getAllArticleSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const article = await getArticleBySlug(params.slug);
  if (!article) return { title: "Story not found" };

  return {
    title: article.title,
    description: article.excerpt,
    alternates: { canonical: siteUrl(`/articles/${article.slug}`) },
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: "article",
      publishedTime: article.date,
      authors: [article.author],
      images: article.image.hero ? [article.image.hero] : undefined
    }
  };
}

export default async function ArticlePage({ params }: { params: { slug: string } }) {
  const article = await getArticleBySlug(params.slug);
  if (!article) notFound();

  const related = await getRelatedArticles(article);
  const paragraphs = article.content.split(/\n\s*\n/).filter(Boolean);
  const shareUrl = siteUrl(`/articles/${article.slug}`);

  return (
    <article className="pt-28 sm:pt-36">
      <header className="mx-auto max-w-3xl px-6 text-center">
        <p className="text-[11px] font-semibold uppercase tracking-widest2 text-gold">
          {article.category}
        </p>
        <h1 className="mt-4 font-display text-4xl leading-tight text-bone sm:text-5xl">
          {article.title}
        </h1>
        {article.subtitle && (
          <p className="mx-auto mt-4 max-w-xl text-base text-bone-muted sm:text-lg">
            {article.subtitle}
          </p>
        )}
        <p className="mt-6 text-xs uppercase tracking-widest2 text-bone-muted/80">
          {article.author} · {formatDate(article.date)}
        </p>
      </header>

      <div className="mx-auto mt-10 max-w-5xl px-6">
        <div className="relative aspect-[16/9] overflow-hidden rounded-2xl">
          {article.image.hero ? (
            <Image
              src={article.image.hero}
              alt={article.image.alt || article.title}
              fill
              sizes="(min-width: 1024px) 80vw, 100vw"
              className="object-cover"
              priority
            />
          ) : (
            <BrandedPlaceholder label="Vivid Network" className="h-full w-full" />
          )}
        </div>
      </div>

      <div className="mx-auto mt-14 max-w-2xl px-6">
        <div className="space-y-6 text-base leading-relaxed text-bone/90 sm:text-lg">
          {paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>

        {article.tags.length > 0 && (
          <div className="mt-10 flex flex-wrap gap-2 border-t border-white/[0.06] pt-6">
            {article.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-white/15 px-3 py-1 text-[11px] uppercase tracking-widest2 text-bone-muted"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="mt-10 flex items-center gap-4 border-t border-white/[0.06] pt-6">
          <span className="text-xs font-semibold uppercase tracking-widest2 text-bone-muted">
            Share
          </span>
          <ShareLink
            href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(article.title)}`}
            label="X"
          />
          <ShareLink
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
            label="Facebook"
          />
          <ShareLink
            href={`mailto:?subject=${encodeURIComponent(article.title)}&body=${encodeURIComponent(shareUrl)}`}
            label="Email"
          />
        </div>
      </div>

      {related.length > 0 && (
        <section className="mx-auto mt-24 max-w-6xl px-6 pb-24">
          <p className="mb-8 text-[11px] font-semibold uppercase tracking-widest2 text-plum-400">
            Related stories
          </p>
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((r) => (
              <ArticleCard key={r.slug} article={r} />
            ))}
          </div>
        </section>
      )}

      <section className="border-t border-white/[0.06] px-6 py-20">
        <NewsletterSignup />
      </section>
    </article>
  );
}

function ShareLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      className="focus-ring text-xs font-semibold uppercase tracking-widest2 text-bone/80 hover:text-gold"
    >
      {label}
    </a>
  );
}
