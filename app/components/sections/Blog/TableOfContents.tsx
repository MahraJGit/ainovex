"use client";

import { useEffect, useMemo, useState } from "react";
import { FiChevronDown, FiList } from "react-icons/fi";
import type { TocItem } from "@/app/lib/blogs";

function preferTocItems(items: TocItem[]) {
  const h2 = items.filter((item) => item.level === 2);
  if (h2.length >= 2) return h2;

  const primary = items.filter((item) => item.level === 1 || item.level === 2);
  if (primary.length > 0) return primary;

  return items;
}

function TocList({
  items,
  activeId,
  onSelect,
  compact = false,
}: {
  items: TocItem[];
  activeId: string;
  onSelect: (id: string) => void;
  compact?: boolean;
}) {
  return (
    <ul className={compact ? "grid gap-1 sm:grid-cols-2" : "space-y-0.5"}>
      {items.map((item, index) => {
        const isActive = activeId === item.id;
        return (
          <li key={item.id}>
            <button
              type="button"
              onClick={() => onSelect(item.id)}
              className={`group flex w-full cursor-pointer items-start gap-2.5 rounded-xl px-3 py-2.5 text-left transition ${
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-black-v1/70 hover:bg-black/[0.03] hover:text-black-v1"
              }`}
            >
              <span
                className={`mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md text-[10px] font-bold ${
                  isActive
                    ? "bg-primary text-white"
                    : "bg-black/[0.05] text-black-v1/45"
                }`}
              >
                {index + 1}
              </span>
              <span className="text-[13px] font-medium leading-snug">
                {item.text}
              </span>
            </button>
          </li>
        );
      })}
    </ul>
  );
}

export default function TableOfContents({
  items,
  variant = "inline",
}: {
  items: TocItem[];
  variant?: "desktop" | "mobile" | "inline";
}) {
  const navItems = useMemo(() => preferTocItems(items), [items]);
  const [activeId, setActiveId] = useState<string>("");
  const [open, setOpen] = useState(true);

  useEffect(() => {
    if (navItems.length === 0) return;
    setActiveId(navItems[0].id);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target.id) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: "-20% 0px -65% 0px", threshold: [0, 0.25, 0.6] }
    );

    for (const item of navItems) {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, [navItems]);

  if (navItems.length === 0) return null;

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    setActiveId(id);
  };

  // Unified inline contents card — used on article pages
  if (variant === "inline" || variant === "mobile" || variant === "desktop") {
    return (
      <div className="overflow-hidden rounded-2xl border border-black-v1/10 bg-[#F8FAFC]">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex w-full cursor-pointer items-center justify-between gap-3 px-4 py-3.5 text-left sm:px-5"
        >
          <span className="inline-flex items-center gap-2 text-[14px] font-semibold text-black-v1">
            <FiList size={16} className="text-primary" />
            Table of contents
            <span className="rounded-full bg-black/[0.05] px-2 py-0.5 text-[11px] font-bold text-black-v1/45">
              {navItems.length}
            </span>
          </span>
          <FiChevronDown
            size={18}
            className={`shrink-0 text-black-v1/45 transition ${open ? "rotate-180" : ""}`}
          />
        </button>
        {open ? (
          <nav
            aria-label="Table of contents"
            className="border-t border-black-v1/10 px-2 py-2 sm:px-3 sm:py-3"
          >
            <TocList
              items={navItems}
              activeId={activeId}
              onSelect={scrollTo}
              compact
            />
          </nav>
        ) : null}
      </div>
    );
  }

  return null;
}
