"use client";

import { useMemo, useState } from "react";
import SectionGrid from "../../ui/SectionGrid";
import type { Post } from "../../../lib/post";
import FeaturedPost from "./Featuredpost";
import CategoryFilter from "./Categoryfilter";
import SearchBox from "./Searchbox";
import BlogGrid from "./Bloggrid";
import NewsletterStrip from "./Newsletterstrip";

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

export default function BlogListing({ posts }: { posts: Post[] }) {
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");

  // posts are already sorted by date from page.tsx — first is always newest
  const featured = posts[0];
  const rest = posts.slice(1);
  const visible = useMemo(() => filterPosts(rest, category, query), [rest, category, query]);

  if (!featured) {
    return (
      <section className="relative overflow-hidden bg-white">
        <SectionGrid placement="center" />
        <div className="section-container relative z-10 py-[100px]!">
          <p className="text-center text-[15px] text-ink/60">
            No articles published yet. Check back soon.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="relative overflow-hidden bg-white">
      <SectionGrid placement="center" />

      <div className="section-container relative z-10 py-[80px]! lg:py-[100px]!">
        <FeaturedPost post={featured} />

        <div className="mt-16 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <CategoryFilter active={category} onChange={setCategory} />
          <SearchBox value={query} onChange={setQuery} />
        </div>

        <BlogGrid posts={visible} />

        <div className="mt-20">
          <NewsletterStrip />
        </div>
      </div>
    </section>
  );
}