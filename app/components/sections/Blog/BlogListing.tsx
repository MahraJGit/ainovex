"use client";

import { useMemo, useState } from "react";
import SectionGrid from "../../ui/SectionGrid";
import type { Post } from "../../../lib/post";
import FeaturedPost from "../Blog/Featuredpost";
import CategoryFilter from "../Blog/Categoryfilter";
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

  const featured = posts.find((p) => p.featured) ?? posts[0];
  const rest = posts.filter((p) => p.slug !== featured.slug);
  const visible = useMemo(() => filterPosts(rest, category, query), [rest, category, query]);

  if (!featured) {
    return (
      <section className="relative overflow-hidden bg-[#05080F]">
        <SectionGrid placement="center-dark" />
        <div className="section-container relative z-10 py-[100px]!">
          <p className="text-center text-[15px] text-white/60">
            No articles published yet. Check back soon.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="relative overflow-hidden bg-[#05080F]">
      <SectionGrid placement="center-dark" />

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