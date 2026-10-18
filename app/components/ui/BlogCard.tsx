"use client";

import Image from "next/image";
import Link from "next/link";
import { formatDate } from "@/app/lib/libFormat";

export type BlogCardProps = {
  slug: string;
  image: string;
  imageAlt?: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  variant?: "dark" | "light";
  tags?: string[];
  author?: { name: string; image?: string };
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
  imageAlt,
  title,
  excerpt,
  date,
  category,
  variant = "dark",
  tags = [],
  author,
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
            alt={imageAlt || title}
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

        {tags.length > 0 ? (
          <ul className="flex flex-wrap gap-2" aria-label="Article tags">
            {tags.map((tag) => (
              <li
                key={tag}
                className="rounded-full border border-white/15 bg-white/[0.06] px-2.5 py-1 text-[11px] font-medium text-white/75"
              >
                #{tag}
              </li>
            ))}
          </ul>
        ) : null}

        {author ? (
          <div className="flex min-w-0 items-center gap-2">
            <div className="relative flex size-8 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white/10 text-[10px] font-semibold text-white">
              {author.image ? (
                <Image
                  src={author.image}
                  alt={author.name}
                  fill
                  sizes="32px"
                  className="object-cover"
                />
              ) : (
                author.name
                  .split(/\s+/)
                  .map((part) => part[0])
                  .join("")
                  .slice(0, 2)
                  .toUpperCase()
              )}
            </div>
            <span className="truncate text-[12px] font-medium text-white/70">
              {author.name}
            </span>
          </div>
        ) : null}

        <div className="flex items-center justify-between gap-4 border-t border-white/10 pt-5">
          <Link
            href={`/blog/${slug}`}
            className="inline-flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.1em] text-white transition-colors duration-300 group-hover:text-primary"
          >
            Read More <span aria-hidden>&rarr;</span>
          </Link>
          <time
            dateTime={date}
            className="rounded-full border border-white/15 bg-white/[0.06] px-3 py-1.5 text-[11px] font-medium text-white/75"
          >
            {formatDate(date)}
          </time>
        </div>
      </div>
    </article>
  );
}
