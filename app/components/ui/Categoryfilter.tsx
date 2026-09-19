"use client";

import { categories } from "../../lib/post";

interface Props {
  active: string;
  onChange: (category: string) => void;
}

export default function CategoryFilter({ active, onChange }: Props) {
  return (
    <div className="flex flex-wrap gap-2.5">
      {categories.map((cat) => {
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