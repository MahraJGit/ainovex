"use client";

import { useState } from "react";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBox({ value, onChange }: Props) {
  const [focused, setFocused] = useState(false);

  return (
    <div
      className={`flex h-11 w-full items-center gap-2 rounded-full border-2 px-4 transition-colors duration-200 lg:w-[280px] ${
        focused
          ? "border-primary bg-primary/5"
          : "border-ink/20 bg-ink/[0.06]"
      }`}
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className={`shrink-0 transition-colors duration-200 ${
          focused ? "text-primary" : "text-ink/50"
        }`}
        aria-hidden
      >
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-3.5-3.5" strokeLinecap="round" />
      </svg>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder="Search articles"
        aria-label="Search articles"
        className="w-full bg-transparent text-[14px] text-ink outline-none placeholder:text-ink/45"
      />
    </div>
  );
}