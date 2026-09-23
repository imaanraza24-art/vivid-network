"use client";

import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import type { SearchResult } from "@/lib/types";
import { formatDate } from "@/lib/format";

export default function SearchExperience() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") ?? "";

  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [status, setStatus] = useState<"idle" | "loading" | "done">("idle");

  useEffect(() => {
    const q = initialQuery.trim();
    if (!q) {
      setStatus("idle");
      setResults([]);
      return;
    }
    let cancelled = false;
    setStatus("loading");
    fetch(`/api/search?q=${encodeURIComponent(q)}`)
      .then((res) => res.json())
      .then((data) => {
        if (cancelled) return;
        setResults(data.results ?? []);
        setStatus("done");
      })
      .catch(() => {
        if (!cancelled) setStatus("done");
      });
    return () => {
      cancelled = true;
    };
  }, [initialQuery]);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (query.trim()) params.set("q", query.trim());
    router.push(`/search?${params.toString()}`);
  }

  return (
    <div className="mx-auto max-w-3xl px-6 pb-24 pt-32 sm:pt-40">
      <header className="text-center">
        <p className="text-[11px] font-semibold uppercase tracking-widest2 text-gold">Search</p>
        <h1 className="mt-4 font-display text-5xl text-bone sm:text-6xl">SEARCH VIVID</h1>
      </header>

      <form onSubmit={handleSubmit} className="mt-10">
        <label htmlFor="search-input" className="sr-only">
          Search articles and episodes
        </label>
        <input
          id="search-input"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search articles, episodes, topics…"
          autoFocus
          className="focus-ring w-full rounded-full border border-white/15 bg-transparent px-6 py-4 text-base text-bone placeholder:text-bone-muted/50"
        />
      </form>

      <div className="mt-12">
        {status === "loading" && <p className="text-center text-sm text-bone-muted">Searching…</p>}

        {status === "done" && results.length === 0 && (
          <p className="text-center font-display text-xl text-bone-muted">
            NO STORIES FOUND. TRY ANOTHER SEARCH.
          </p>
        )}

        {results.length > 0 && (
          <ul className="space-y-6">
            {results.map((result) => (
              <li key={`${result.type}-${result.slug}`}>
                <Link
                  href={result.href}
                  className="focus-ring block rounded-xl border border-white/[0.07] bg-ink-soft p-5 transition-colors hover:border-plum-500/40"
                >
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="rounded-full bg-plum-600/30 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest2 text-plum-200">
                      {result.type === "article" ? "Article" : "Episode"}
                    </span>
                    <span className="text-[11px] uppercase tracking-widest2 text-bone-muted/70">
                      {result.category}
                    </span>
                  </div>
                  <p className="mt-3 font-display text-xl text-bone">{result.title}</p>
                  <p className="mt-1 line-clamp-2 text-sm text-bone-muted">{result.description}</p>
                  <p className="mt-3 text-xs uppercase tracking-widest2 text-bone-muted/60">
                    {formatDate(result.date)}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
