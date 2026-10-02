"use client";

import { useEffect, useRef, useState } from "react";
import { FiChevronDown, FiCheck } from "react-icons/fi";
import { cn } from "@/app/lib/utils";

export type AdminSelectOption = {
  label: string;
  value: string;
};

type AdminSelectProps = {
  value: string;
  onChange: (value: string) => void;
  options: AdminSelectOption[];
  className?: string;
  id?: string;
};

export default function AdminSelect({
  value,
  onChange,
  options,
  className,
  id,
}: AdminSelectProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const selected = options.find((o) => o.value === value) ?? options[0];

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div ref={rootRef} className={cn("relative w-full", className)}>
      <button
        id={id}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="flex h-11 w-full cursor-pointer items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/[0.04] px-3.5 text-left text-[14px] text-white outline-none transition hover:bg-white/[0.06] focus:border-primary/50"
      >
        <span className="truncate">{selected?.label ?? "Select"}</span>
        <FiChevronDown
          size={16}
          className={cn(
            "shrink-0 text-white/45 transition",
            open && "rotate-180 text-primary"
          )}
        />
      </button>

      {open ? (
        <ul
          role="listbox"
          className="absolute z-50 mt-2 max-h-64 w-full overflow-auto rounded-xl border border-white/10 bg-[#0F172A] p-1.5 shadow-2xl shadow-black/50"
        >
          {options.map((option) => {
            const isActive = option.value === value;
            return (
              <li key={option.value}>
                <button
                  type="button"
                  role="option"
                  aria-selected={isActive}
                  onClick={() => {
                    onChange(option.value);
                    setOpen(false);
                  }}
                  className={cn(
                    "flex w-full cursor-pointer items-center justify-between gap-2 rounded-lg px-3 py-2.5 text-left text-[14px] transition",
                    isActive
                      ? "bg-primary/15 text-primary"
                      : "text-white/80 hover:bg-white/[0.06] hover:text-white"
                  )}
                >
                  <span>{option.label}</span>
                  {isActive ? <FiCheck size={15} /> : null}
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}
