"use client";

import { useMemo, useState, useEffect, useRef } from "react";
import { IoChevronForward, IoChevronBack } from "react-icons/io5";
import SectionGrid from "../../ui/SectionGrid";
import type { BlogListItem } from "@/app/lib/blogs";
import FeaturedPost from "./Featuredpost";
import CategoryFilter from "../../ui/Categoryfilter";
import SearchBox from "../../ui/Searchbox";
import BlogGrid from "../../ui/Bloggrid";

const POSTS_PER_PAGE = 6;
const PLACEHOLDER_IMAGE = "/icons/blogs/ai.svg";

function toCardPost(blog: BlogListItem) {
  const image =
    blog.featured_image &&
    (blog.featured_image.startsWith("http") ||
      blog.featured_image.startsWith("/"))
      ? blog.featured_image
      : PLACEHOLDER_IMAGE;

  return {
    slug: blog.slug,
    category: blog.category || "General",
    title: blog.title,
    excerpt: blog.excerpt || "Read the full article on the Ainovex blog.",
    date: blog.published_at || blog.created_at,
    image,
    author: {
      name: blog.author || "Ainovex Team",
      role: "Ainovex",
      avatar: "/logo.svg",
    },
  };
}

function filterPosts(
  posts: BlogListItem[],
  category: string,
  query: string
) {
  const term = query.trim().toLowerCase();
  return posts.filter((post) => {
    const matchesCategory = category === "All" || post.category === category;
    const matchesQuery =
      term === "" ||
      `${post.title} ${post.excerpt} ${post.category} ${post.tags.join(" ")} ${post.focus_keyword}`
        .toLowerCase()
        .includes(term);
    return matchesCategory && matchesQuery;
  });
}

export default function BlogListing({
  posts,
  categories,
}: {
  posts: BlogListItem[];
  categories: string[];
}) {
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const sectionRef = useRef<HTMLDivElement>(null);

  const isFiltering = category !== "All" || query.trim() !== "";

  const filtered = useMemo(
    () => filterPosts(posts, category, query),
    [posts, category, query]
  );

  // Featured only when browsing all with 2+ posts.
  // Grid always shows every matching article so "All" is never empty.
  const featured =
    !isFiltering && filtered.length >= 2 ? filtered[0] : null;
  const gridSource = filtered;

  useEffect(() => {
    setPage(1);
  }, [category, query]);

  const totalPages = Math.max(1, Math.ceil(gridSource.length / POSTS_PER_PAGE));
  const start = (page - 1) * POSTS_PER_PAGE;
  const paginated = gridSource
    .slice(start, start + POSTS_PER_PAGE)
    .map(toCardPost);

  const scrollToTop = () => {
    sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  if (posts.length === 0) {
    return (
      <section className="relative overflow-hidden bg-white">
        <SectionGrid placement="center" />
        <div className="section-container relative z-10 py-[100px]!">
          <div className="mx-auto max-w-lg rounded-3xl border border-black-v1/10 bg-[#F8FAFC] px-8 py-14 text-center">
            <p className="text-[18px] font-semibold text-black-v1">
              No articles yet
            </p>
            <p className="mt-2 text-[15px] text-black-v1/60">
              New insights from the Ainovex team will appear here soon.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative overflow-hidden bg-white">
      <SectionGrid placement="center" />

      <div className="section-container relative z-10 py-[80px]! lg:py-[100px]!">
        {featured ? <FeaturedPost post={toCardPost(featured)} /> : null}

        <div
          ref={sectionRef}
          className={`flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between ${
            featured ? "mt-16" : ""
          }`}
        >
          <CategoryFilter
            categories={categories}
            active={category}
            onChange={setCategory}
          />
          <SearchBox value={query} onChange={setQuery} />
        </div>

        <div className="mt-4 flex items-center justify-between gap-3 text-[13px] text-black-v1/50">
          <p>
            {filtered.length} article{filtered.length === 1 ? "" : "s"}
            {isFiltering ? " found" : ""}
          </p>
          {isFiltering ? (
            <button
              type="button"
              onClick={() => {
                setCategory("All");
                setQuery("");
              }}
              className="cursor-pointer font-semibold text-primary hover:underline"
            >
              Clear filters
            </button>
          ) : null}
        </div>

        {paginated.length > 0 ? (
          <BlogGrid posts={paginated} />
        ) : (
          <div className="mt-12 rounded-2xl border border-dashed border-black-v1/15 px-6 py-12 text-center">
            <p className="text-[15px] font-medium text-black-v1/70">
              No articles match your search.
            </p>
            <button
              type="button"
              onClick={() => {
                setCategory("All");
                setQuery("");
              }}
              className="mt-3 cursor-pointer text-[14px] font-semibold text-primary hover:underline"
            >
              View all articles
            </button>
          </div>
        )}

        {totalPages > 1 ? (
          <div className="mt-12 flex items-center justify-center gap-2">
            <button
              type="button"
              aria-label="Previous blog page"
              onClick={() => {
                setPage((p) => Math.max(1, p - 1));
                scrollToTop();
              }}
              disabled={page === 1}
              className="flex size-12 cursor-pointer items-center justify-center rounded-xl border border-black-v1/15 bg-white text-black-v1/70 transition-colors hover:border-primary hover:bg-primary hover:text-white disabled:pointer-events-none disabled:opacity-30"
            >
              <IoChevronBack size={22} />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => {
                  setPage(p);
                  scrollToTop();
                }}
                className={`flex h-12 w-12 cursor-pointer items-center justify-center rounded-xl text-sm font-bold transition-colors ${
                  p === page
                    ? "border border-primary bg-primary text-white"
                    : "border border-black-v1/15 bg-white text-black-v1/70 hover:bg-primary hover:text-white"
                }`}
              >
                {p}
              </button>
            ))}

            <button
              type="button"
              aria-label="Next blog page"
              onClick={() => {
                setPage((p) => Math.min(totalPages, p + 1));
                scrollToTop();
              }}
              disabled={page === totalPages}
              className="flex size-12 cursor-pointer items-center justify-center rounded-xl border border-black-v1/15 bg-white text-black-v1/70 transition-colors hover:border-primary hover:bg-primary hover:text-white disabled:pointer-events-none disabled:opacity-30"
            >
              <IoChevronForward size={22} />
            </button>
          </div>
        ) : null}
      </div>
    </section>
  );
}
