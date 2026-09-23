export default function BrandedPlaceholder({
  label,
  className = ""
}: {
  label: string;
  className?: string;
}) {
  return (
    <div
      className={`atmosphere relative flex items-center justify-center overflow-hidden bg-gradient-to-br from-ink-raised via-ink-soft to-ink ${className}`}
    >
      <span className="relative font-display text-lg italic tracking-wide text-bone-muted/70 sm:text-xl">
        {label}
      </span>
    </div>
  );
}
