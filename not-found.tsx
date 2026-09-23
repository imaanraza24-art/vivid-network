import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-6 pt-24 text-center">
      <p className="text-[11px] font-semibold uppercase tracking-widest2 text-gold">404</p>
      <h1 className="mt-4 font-display text-4xl text-bone sm:text-5xl">PAGE NOT FOUND.</h1>
      <p className="mt-4 max-w-sm text-sm text-bone-muted">
        Whatever you were looking for isn&rsquo;t here. Let&rsquo;s get you back on track.
      </p>
      <Link
        href="/"
        className="focus-ring mt-8 rounded-full bg-gold px-7 py-3 text-xs font-semibold uppercase tracking-widest2 text-ink transition-opacity hover:opacity-90"
      >
        Back to Vivid Network
      </Link>
    </div>
  );
}
