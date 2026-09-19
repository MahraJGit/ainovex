import Image from "next/image";
import Link from "next/link";
import type { Post } from "../../../lib/post";
import { formatDate } from "../../../lib/libFormat";

export default function FeaturedPost({ post }: { post: Post }) {
  return (
    <div>
      {/* Heading */}
      <h2 className="text-ink mb-8">
        Latest <span className="text-primary">Blog</span>
      </h2>

      {/* Card */}
      <Link
        href={`/blog/${post.slug}`}
        className="group grid overflow-hidden rounded-[24px] border-4 border-white bg-[#05080F] transition-colors duration-300 hover:border-primary lg:grid-cols-2"
      >
        {/* Image */}
        <div className="relative aspect-[16/10] overflow-hidden lg:aspect-auto lg:h-full lg:min-h-[340px]">
          <Image
            src={post.image}
            alt={post.title}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
            priority
          />
        </div>

        {/* Content */}
        <div className="flex flex-col justify-center gap-5 p-8 lg:p-12">
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-primary px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.08em] text-white">
              Latest
            </span>
            <span className="text-[12px] font-semibold uppercase tracking-[0.1em] text-white/80">
              {post.category}
            </span>
          </div>

          <h2 className="text-[28px] font-bold leading-[1.2] text-white transition-colors duration-300 group-hover:text-primary group-hover:scale-[1.02] lg:text-[36px]">
            {post.title}
          </h2>

          <p className="max-w-[520px] text-[15px] leading-[1.65] text-white/80">
            {post.excerpt}
          </p>

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
            <span className="text-[12px] font-medium text-white/70">
              {formatDate(post.date)}
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
}