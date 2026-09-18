"use client";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBox({ value, onChange }: Props) {
  return (
    <div className="flex h-11 w-full items-center gap-2 rounded-full border border-white/20 bg-white/[0.06] px-4 lg:w-[280px]">
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className="shrink-0 text-white/50"
        aria-hidden
      >
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-3.5-3.5" strokeLinecap="round" />
      </svg>

      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search articles"
        aria-label="Search articles"
        className="w-full bg-transparent text-[14px] text-white outline-none placeholder:text-white/45"
      />
    </div>
  );
}