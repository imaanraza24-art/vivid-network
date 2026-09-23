import Link from "next/link";
import NewsletterSignup from "@/components/NewsletterSignup";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/articles", label: "Articles" },
  { href: "/vivid-voices", label: "Vivid Voices" },
  { href: "/about", label: "About" },
  { href: "/get-involved", label: "Get Involved" },
  { href: "/contact", label: "Contact" }
];

// Real URLs are not invented here. Replace `null` with the live profile URL
// as each one goes live — the footer activates the link automatically.
const SOCIALS: { label: string; url: string | null }[] = [
  { label: "Instagram", url: null },
  { label: "TikTok", url: null },
  { label: "YouTube", url: null },
  { label: "Spotify", url: null },
  { label: "LinkedIn", url: null }
];

export default function Footer() {
  return (
    <footer className="relative border-t border-white/[0.06] bg-ink">
      <div className="mx-auto max-w-7xl px-5 pb-10 pt-16 sm:px-8">
        <div className="mb-14">
          <NewsletterSignup variant="footer" />
        </div>

        <div className="grid gap-10 border-t border-white/[0.06] pt-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <p className="font-display text-2xl text-bone">VIVID NETWORK</p>
            <p className="mt-2 text-sm uppercase tracking-widest2 text-bone-muted">
              A youth brand.
            </p>
            <p className="mt-3 max-w-xs text-sm text-bone-muted">By youth. For youth.</p>
          </div>

          <div>
            <p className="mb-4 text-[12px] font-semibold uppercase tracking-widest2 text-bone-muted">
              Explore
            </p>
            <ul className="space-y-2">
              {LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="focus-ring text-sm text-bone/80 transition-colors hover:text-gold"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-4 text-[12px] font-semibold uppercase tracking-widest2 text-bone-muted">
              Follow
            </p>
            <ul className="space-y-2">
              {SOCIALS.map((social) =>
                social.url ? (
                  <li key={social.label}>
                    <a
                      href={social.url}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="focus-ring text-sm text-bone/80 transition-colors hover:text-gold"
                    >
                      {social.label}
                    </a>
                  </li>
                ) : (
                  <li key={social.label} className="text-sm text-bone-muted/50">
                    {social.label} <span className="text-[11px]">— coming soon</span>
                  </li>
                )
              )}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-white/[0.06] pt-6 text-xs text-bone-muted sm:flex-row sm:items-center">
          <p className="uppercase tracking-widest2">Real stories. Real teens. Real impact.</p>
          <p>© {new Date().getFullYear()} Vivid Network</p>
        </div>
      </div>
    </footer>
  );
}
