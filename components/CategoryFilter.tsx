"use client";

export default function CategoryFilter({
  categories,
  active,
  onChange
}: {
  categories: readonly string[];
  active: string;
  onChange: (category: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter by category">
      {categories.map((category) => {
        const isActive = category === active;
        return (
          <button
            key={category}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(category)}
            className={`focus-ring rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-widest2 transition-colors ${
              isActive
                ? "border-gold bg-gold text-ink"
                : "border-white/15 text-bone-muted hover:border-plum-400/60 hover:text-bone"
            }`}
          >
            {category}
          </button>
        );
      })}
    </div>
  );
}
