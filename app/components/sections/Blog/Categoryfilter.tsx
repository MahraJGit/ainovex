"use client";

import { categories } from "../../../lib/post";

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
            className={`rounded-full border px-4 py-2 text-[13px] font-medium transition-colors duration-200 ${
              isActive
                ? "border-[#38BDF8] bg-[#38BDF8] text-black"
                : "border-white/20 bg-white/[0.06] text-white/70 hover:border-white/40 hover:text-white"
            }`}
          >
            {cat}
          </button>
        );
      })}
    </div>
  );
}