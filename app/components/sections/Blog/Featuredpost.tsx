"use client";

import Image from "next/image";
import Link from "next/link";
import type { Post } from "../../../lib/post";
import { formatDate } from "../../../lib/libFormat";

function isRemoteOrLocalImage(src: string) {
  if (!src) return false;
  if (src.startsWith("/")) return true;
  try {
    const url = new URL(src);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

export default function FeaturedPost({ post }: { post: Post }) {
  const hasImage = isRemoteOrLocalImage(post.image);

  return (
    <div>
      <h2 className="mb-8 text-[28px] font-bold text-black-v1 sm:text-[36px] lg:text-[48px]">
        Latest <span className="text-primary">Blog</span>
      </h2>

      <Link
        href={`/blog/${post.slug}`}
        className="group grid overflow-hidden rounded-[24px] bg-[#05080F] transition-all duration-300 lg:grid-cols-2"
        style={{ boxShadow: "0 4px 18px rgba(0, 0, 0, 0.7)" }}
      >
        <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-[#0B1220] via-[#12324A] to-primary/40 lg:aspect-auto lg:h-full lg:min-h-[340px]">
          {hasImage ? (
            <Image
              src={post.image}
              alt={post.imageAlt || post.title}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
              priority
            />
          ) : null}
        </div>

        <div className="flex flex-col justify-center gap-5 p-8 transition-transform duration-500 ease-out group-hover:-translate-y-2 lg:p-12">
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-primary px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.08em] text-white">
              Latest
            </span>
            <span className="text-[12px] font-semibold uppercase tracking-[0.1em] text-white/80">
              {post.category}
            </span>
          </div>

          {post.tags?.length ? (
            <ul className="flex flex-wrap gap-2" aria-label="Article tags">
              {post.tags.map((tag) => (
                <li
                  key={tag}
                  className="rounded-full border border-white/15 bg-white/[0.06] px-2.5 py-1 text-[11px] font-medium text-white/75"
                >
                  #{tag}
                </li>
              ))}
            </ul>
          ) : null}

          <h2 className="text-[28px] font-bold leading-[1.2] text-white transition-colors duration-300 group-hover:text-primary lg:text-[36px]">
            {post.title}
          </h2>

          <p className="max-w-[520px] text-[15px] leading-[1.65] text-white/80">
            {post.excerpt}
          </p>

          <div className="flex min-w-0 items-center gap-2">
            <div className="relative size-8 shrink-0 overflow-hidden rounded-full bg-white/10">
              <Image
                src={post.author.avatar}
                alt={post.author.name}
                fill
                sizes="32px"
                className="object-cover"
              />
            </div>
            <span className="truncate text-[12px] font-medium text-white/70">
              {post.author.name}
            </span>
          </div>

          <div className="mt-2 flex items-center justify-between gap-4 border-t border-white/10 pt-5">
            <span className="inline-flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.1em] text-white transition-colors duration-300 group-hover:text-primary">
              Read Article
              <span
                aria-hidden
                className="transition-transform duration-300 group-hover:translate-x-1"
              >
                &rarr;
              </span>
            </span>
            <time
              dateTime={post.date}
              className="rounded-full border border-white/15 bg-white/[0.06] px-3 py-1.5 text-[11px] font-medium text-white/75"
            >
              {formatDate(post.date)}
            </time>
          </div>
        </div>
      </Link>
    </div>
  );
}
