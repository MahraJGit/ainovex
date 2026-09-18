import Image from "next/image";
import Link from "next/link";
import type { Post } from "../../../lib/post";
import { formatDate } from "../../../lib/libFormat";

export default function FeaturedPost({ post }: { post: Post }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group grid overflow-hidden rounded-[24px] border border-white/12 bg-white/[0.04] backdrop-blur-md transition-colors duration-300 hover:border-[#38BDF8]/50 lg:grid-cols-2"
    >
      <div className="relative aspect-[16/10] overflow-hidden lg:aspect-auto lg:h-full">
        <Image
          src={post.image}
          alt={post.title}
          fill
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
          priority
        />
        <span
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent"
        />
      </div>

      <div className="flex flex-col justify-center gap-5 p-8 lg:p-12">
        <div className="flex flex-wrap items-center gap-3">
          <span className="rounded-full bg-[#38BDF8] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.08em] text-black">
            Featured
          </span>
          <span className="text-[12px] font-semibold uppercase tracking-[0.1em] text-white/50">
            {post.category}
          </span>
        </div>

        <h2 className="text-[28px] font-bold leading-[1.2] text-white lg:text-[36px]">
          {post.title}
        </h2>

        <p className="max-w-[520px] text-[15px] leading-[1.65] text-white/60">
          {post.excerpt}
        </p>

        <div className="mt-2 flex items-center justify-between gap-4 border-t border-white/10 pt-5">
          <span className="inline-flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.1em] text-[#38BDF8]">
            Read Article
            <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">
              &rarr;
            </span>
          </span>
          <span className="text-[12px] font-medium text-white/45">
            {formatDate(post.date)} &middot; {post.readTime} min read
          </span>
        </div>
      </div>
    </Link>
  );
}