"use client";

interface Props {
  categories: string[];
  active: string;
  onChange: (category: string) => void;
}

export default function CategoryFilter({
  categories,
  active,
  onChange,
}: Props) {
  const items = categories.includes("All")
    ? categories
    : ["All", ...categories];

  return (
    <div className="flex flex-wrap gap-2.5">
      {items.map((cat) => {
        const isActive = cat === active;
        return (
          <button
            key={cat}
            type="button"
            onClick={() => onChange(cat)}
            aria-pressed={isActive}
            className={`rounded-full border-2 px-4 py-2 text-[13px] font-bold transition-colors duration-200 ${
              isActive
                ? "border-primary bg-[#05080F] text-primary"
                : "hover:border-primary hover:text-primary"
            }`}
          >
            {cat}
          </button>
        );
      })}
    </div>
  );
}
