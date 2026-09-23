export default function EmptyState({
  title,
  body
}: {
  title: string;
  body: string;
}) {
  return (
    <div className="atmosphere relative overflow-hidden rounded-2xl border border-white/[0.08] bg-ink-soft px-8 py-20 text-center sm:py-28">
      <div className="relative">
        <p className="font-display text-3xl text-bone sm:text-4xl">{title}</p>
        <p className="mx-auto mt-4 max-w-md text-sm text-bone-muted sm:text-base">{body}</p>
      </div>
    </div>
  );
}
