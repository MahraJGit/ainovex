// import type { Metadata } from "next";
// import BlogHero from "@/app/components/sections/Blog/Hero";
// import BlogListing from "@/app/components/sections/Blog/BlogListing";
// import { posts } from "@/app/lib/post";

// export const metadata: Metadata = {
//   title: "Blog | Ainovex Technologies",
//   description:
//     "Notes from the build. Practical writing on AI, cloud, web development and design from the Ainovex team.",
// };

// export default function BlogPage() {
//   const sorted = [...posts].sort(
//     (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
//   );

//   return (
//     <>
//       <BlogHero total={sorted.length} />
//       <BlogListing posts={sorted} />
//     </>
//   );
// }

"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";

/* ---- 1. Types and data. Move these out later if you want ---- */

export interface Post {
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: number;
  image: string;
  featured?: boolean;
}

const categories = ["All", "AI & Automation", "Web Development", "Cloud", "Design"];

const defaultPosts: Post[] = [
  {
    slug: "shipping-ai-features-without-breaking-trust",
    category: "AI & Automation",
    title: "Shipping AI Features Without Breaking User Trust",
    excerpt:
      "Every team wants an AI feature on the roadmap. The hard part is not the model, it is designing the moments where it is wrong and the user still stays with you.",
    date: "2026-09-15",
    readTime: 8,
    image: "/images/blog/ai-trust.png",
    featured: true,
  },
  {
    slug: "cutting-cloud-spend-without-cutting-corners",
    category: "Cloud",
    title: "Cutting Cloud Spend Without Cutting Corners",
    excerpt:
      "We reduced one client's monthly bill by 41 percent without touching a single feature. Here is the audit we run, step by step.",
    date: "2026-09-11",
    readTime: 6,
    image: "/images/blog/cloud-spend.png",
  },
  {
    slug: "design-systems-that-survive-handoff",
    category: "Design",
    title: "Design Systems That Actually Survive Handoff",
    excerpt:
      "Most systems die in the gap between Figma and production. The fix is boring, and it starts with naming things once.",
    date: "2026-09-09",
    readTime: 7,
    image: "/images/blog/design-systems.png",
  },
  {
    slug: "server-components-in-production",
    category: "Web Development",
    title: "A Year of React Server Components in Production",
    excerpt:
      "What got faster, what got harder, and the three patterns we now reach for on every new build.",
    date: "2026-09-02",
    readTime: 10,
    image: "/images/blog/server-components.png",
  },
];

/* ---- 2. Helpers ---- */

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
}

function filterPosts(posts: Post[], category: string, query: string) {
  const term = query.trim().toLowerCase();

  return posts.filter((post) => {
    const matchesCategory = category === "All" || post.category === category;
    const matchesQuery =
      term === "" ||
      `${post.title} ${post.excerpt} ${post.category}`.toLowerCase().includes(term);
    return matchesCategory && matchesQuery;
  });
}

/* ---- 3. Pieces ---- */

function Hero({ total }: { total: number }) {
  return (
    <section className="relative overflow-hidden bg-black">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[520px]"
        style={{
          background:
            "radial-gradient(520px 420px at 50% 0%, rgba(17,69,136,1) 0%, rgba(17,69,136,0.55) 45%, rgba(17,69,136,0.18) 75%, transparent 100%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-[1280px] px-6 pb-16 pt-40 text-center lg:pt-[230px]">
        <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-[12px] font-medium text-white backdrop-blur-md">
          <span className="h-1.5 w-1.5 rounded-full bg-[#38BDF8]" />
          {total} articles and counting
        </span>

        <h1 className="mx-auto mt-8 max-w-[860px] text-[40px] font-medium leading-[1.1] text-white lg:text-[56px]">
          Notes From The <span className="font-bold text-[#38BDF8]">Build</span>
        </h1>

        <p className="mx-auto mt-6 max-w-[620px] text-[16px] leading-[1.5] text-white lg:text-[18px]">
          What we are learning while shipping software for real businesses. No
          fluff, no trend chasing, just the decisions behind the work.
        </p>
      </div>
    </section>
  );
}

function Featured({ post }: { post: Post }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group grid overflow-hidden rounded-[24px] border border-white/10 bg-white/[0.04] backdrop-blur-md transition-colors duration-300 hover:border-[#38BDF8]/50 lg:grid-cols-2"
    >
      <div className="relative aspect-[16/10] overflow-hidden lg:aspect-auto lg:h-full lg:min-h-[340px]">
        <Image
          src={post.image}
          alt={post.title}
          fill
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
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

        <p className="max-w-[520px] text-[15px] leading-[1.65] text-white/60">{post.excerpt}</p>

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

function Card({ post }: { post: Post }) {
  return (
    <article className="group flex h-full flex-col">
      <Link
        href={`/blog/${post.slug}`}
        className="relative block aspect-[16/11] overflow-hidden rounded-[18px] border border-white/10"
      >
        <Image
          src={post.image}
          alt={post.title}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        />
        <span className="absolute left-4 top-4 rounded-full bg-[#38BDF8] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.08em] text-black">
          {post.category}
        </span>
      </Link>

      <p className="mt-6 text-[11px] font-semibold uppercase tracking-[0.12em] text-white/45">
        Ainovex / Insights &middot; {post.readTime} min read
      </p>

      <h3 className="mt-3 text-[21px] font-bold leading-[1.25] text-white">
        <Link
          href={`/blog/${post.slug}`}
          className="transition-colors duration-200 group-hover:text-[#38BDF8]"
        >
          {post.title}
        </Link>
      </h3>

      <p className="mt-4 text-[15px] leading-[1.6] text-white/60">{post.excerpt}</p>

      <div className="mt-6 flex items-center justify-between gap-4 border-t border-white/10 pt-5 [margin-top:auto]">
        <Link
          href={`/blog/${post.slug}`}
          className="inline-flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.1em] text-[#38BDF8]"
        >
          Read More <span aria-hidden>&rarr;</span>
        </Link>

        <time dateTime={post.date} className="text-[12px] font-medium text-white/45">
          {formatDate(post.date)}
        </time>
      </div>
    </article>
  );
}

/* ---- 4. Page ---- */

export default function BlogPage({ posts = defaultPosts }: { posts?: Post[] }) {
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");

  const list = posts ?? [];
  const featured = list.find((p) => p.featured) ?? list[0];
  const rest = featured ? list.filter((p) => p.slug !== featured.slug) : [];
  const visible = useMemo(() => filterPosts(rest, category, query), [rest, category, query]);

  return (
    <>
      <Hero total={list.length} />

      <section className="relative overflow-hidden bg-[#05080F]">
        <div className="relative z-10 mx-auto max-w-[1280px] px-6 py-[80px] lg:py-[100px]">
          {featured && <Featured post={featured} />}

          <div className="mt-16 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-wrap gap-2.5">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setCategory(cat)}
                  className={`rounded-full border px-4 py-2 text-[13px] font-medium transition-colors duration-200 ${
                    cat === category
                      ? "border-[#38BDF8] bg-[#38BDF8] text-black"
                      : "border-white/20 bg-white/[0.06] text-white/70 hover:border-white/40 hover:text-white"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search articles"
              aria-label="Search articles"
              className="h-11 w-full rounded-full border border-white/20 bg-white/[0.06] px-5 text-[14px] text-white outline-none placeholder:text-white/45 lg:w-[280px]"
            />
          </div>

          {visible.length > 0 ? (
            <div className="mt-12 grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
              {visible.map((post) => (
                <Card key={post.slug} post={post} />
              ))}
            </div>
          ) : (
            <p className="mt-16 text-center text-[15px] text-white/60">
              Nothing here yet. Try another category or search term.
            </p>
          )}
        </div>
      </section>
    </>
  );
}