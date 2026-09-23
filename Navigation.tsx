"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/articles", label: "Articles" },
  { href: "/vivid-voices", label: "Vivid Voices" },
  { href: "/about", label: "About" },
  { href: "/get-involved", label: "Get Involved" },
  { href: "/contact", label: "Contact" }
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "border-b border-white/[0.06] bg-ink/70 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:h-20 sm:px-8">
        <Link
          href="/"
          className="focus-ring font-display text-lg tracking-wide text-bone sm:text-xl"
        >
          VIVID NETWORK
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`focus-ring font-body text-[13px] font-medium uppercase tracking-widest2 transition-colors hover:text-gold ${
                pathname === link.href ? "text-gold" : "text-bone-muted"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/search"
            aria-label="Search Vivid Network"
            className="focus-ring text-bone-muted transition-colors hover:text-gold"
          >
            <SearchIcon />
          </Link>
          <Link
            href="/get-involved#share-your-story"
            className="focus-ring rounded-full border border-gold/70 px-5 py-2 text-[12px] font-semibold uppercase tracking-widest2 text-gold transition-colors hover:bg-gold hover:text-ink"
          >
            Share Your Story
          </Link>
        </nav>

        {/* Mobile controls */}
        <div className="flex items-center gap-4 lg:hidden">
          <Link
            href="/search"
            aria-label="Search Vivid Network"
            className="focus-ring text-bone-muted"
          >
            <SearchIcon />
          </Link>
          <button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
            className="focus-ring flex h-9 w-9 flex-col items-center justify-center gap-[5px]"
          >
            <span
              className={`h-px w-6 bg-bone transition-transform ${
                menuOpen ? "translate-y-[6px] rotate-45" : ""
              }`}
            />
            <span className={`h-px w-6 bg-bone transition-opacity ${menuOpen ? "opacity-0" : ""}`} />
            <span
              className={`h-px w-6 bg-bone transition-transform ${
                menuOpen ? "-translate-y-[6px] -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {/* Mobile menu panel */}
      <div
        className={`lg:hidden ${menuOpen ? "block" : "hidden"} border-t border-white/[0.06] bg-ink/95 backdrop-blur-md`}
      >
        <nav className="flex flex-col gap-1 px-5 py-6" aria-label="Mobile">
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="focus-ring py-3 font-display text-2xl text-bone"
            >
              {link.label}
            </Link>
          ))}
          <Link href="/search" className="focus-ring py-3 font-display text-2xl text-bone">
            Search
          </Link>
          <Link
            href="/get-involved#share-your-story"
            className="focus-ring mt-4 rounded-full border border-gold px-5 py-3 text-center text-[13px] font-semibold uppercase tracking-widest2 text-gold"
          >
            Share Your Story
          </Link>
        </nav>
      </div>
    </header>
  );
}

function SearchIcon() {
  return (
    <svg width="19" height="19" viewBox="0 0 19 19" fill="none" aria-hidden="true">
      <circle cx="8.25" cy="8.25" r="6.25" stroke="currentColor" strokeWidth="1.4" />
      <path d="M13 13L17.5 17.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}
