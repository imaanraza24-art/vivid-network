export default function Loading() {
  return (
    <div className="mx-auto max-w-6xl px-6 pb-24 pt-32 sm:pt-40">
      <div className="mb-14 h-10 w-56 animate-pulse rounded bg-white/5" />
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {[0, 1, 2].map((i) => (
          <div key={i} className="aspect-square animate-pulse rounded-2xl bg-white/5" />
        ))}
      </div>
    </div>
  );
}
