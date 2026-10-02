"use client";

import Image from "next/image";
import Link from "next/link";
import { formatDate } from "@/app/lib/libFormat";

export type BlogCardProps = {
  slug: string;
  image: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  variant?: "dark" | "light";
};

function isUsableImage(src: string) {
  if (!src) return false;
  if (src.startsWith("/")) return true;
  try {
    const url = new URL(src);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

export default function BlogCard({
  slug,
  image,
  title,
  excerpt,
  date,
  category,
  variant = "dark",
}: BlogCardProps) {
  const shadowStyle =
    variant === "light"
      ? "0 4px 18px rgba(0, 0, 0, 0.7)"
      : "0 4px 18px rgba(120, 120, 120, 0.2)";
  const hasImage = isUsableImage(image);

  return (
    <article
      className="group flex h-full flex-col overflow-hidden rounded-[24px] bg-[#05080F] transition-all duration-300"
      style={{ boxShadow: shadowStyle }}
    >
      <Link
        href={`/blog/${slug}`}
        className="relative block aspect-[16/11] overflow-hidden bg-gradient-to-br from-[#0B1220] via-[#12324A] to-primary/40"
      >
        {hasImage ? (
          <Image
            src={image}
            alt={title}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          />
        ) : null}
        <span className="absolute left-4 top-4 rounded-full bg-primary px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.08em] text-white">
          {category}
        </span>
      </Link>

      <div className="flex flex-1 flex-col gap-4 p-6 transition-transform duration-500 ease-out group-hover:-translate-y-2">
        <h3 className="text-[21px] font-bold leading-[1.25] text-white transition-colors duration-300 group-hover:text-primary">
          <Link href={`/blog/${slug}`}>{title}</Link>
        </h3>

        <p className="line-clamp-3 flex-1 text-[15px] leading-[1.6] text-white/80">
          {excerpt}
        </p>

        <div className="flex items-center justify-between gap-4 border-t border-white/10 pt-5">
          <Link
            href={`/blog/${slug}`}
            className="inline-flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.1em] text-white transition-colors duration-300 group-hover:text-primary"
          >
            Read More <span aria-hidden>&rarr;</span>
          </Link>
          <time dateTime={date} className="text-[12px] font-medium text-white/70">
            {formatDate(date)}
          </time>
        </div>
      </div>
    </article>
  );
}
