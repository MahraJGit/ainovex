"use client";

import { useMemo, useState, useEffect, useRef } from "react";
import { IoChevronForward, IoChevronBack } from "react-icons/io5";
import SectionGrid from "../../ui/SectionGrid";
import type { Post } from "../../../lib/post";
import FeaturedPost from "./Featuredpost";
import CategoryFilter from "../../ui/Categoryfilter";
import SearchBox from "../../ui/Searchbox";
import BlogGrid from "../../ui/Bloggrid";

const POSTS_PER_PAGE = 6;

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
    const [page, setPage] = useState(1);

    const sectionRef = useRef<HTMLDivElement>(null);

    const postsRef = useRef(posts);
    const latest = postsRef.current[0];
    const rest = postsRef.current.slice(1);

    const filtered = useMemo(
        () => filterPosts(rest, category, query),
        [rest, category, query]
    );

    useEffect(() => {
        setPage(1);
    }, [category, query]);

    const totalPages = Math.max(1, Math.ceil(filtered.length / POSTS_PER_PAGE));
    const start = (page - 1) * POSTS_PER_PAGE;
    const paginated = filtered.slice(start, start + POSTS_PER_PAGE);

    const scrollToTop = () => {
        sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    if (!latest) {
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
                <FeaturedPost post={latest} />

                <div ref={sectionRef} className="mt-16 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                    <CategoryFilter active={category} onChange={setCategory} />
                    <SearchBox value={query} onChange={setQuery} />
                </div>

                <BlogGrid posts={paginated} />

                <div className="mt-12 flex items-center justify-center gap-2">
                    <button
                        type="button"
                        aria-label="Previous blog page"
                        onClick={() => { setPage((p) => Math.max(1, p - 1)); scrollToTop(); }}
                        disabled={page === 1}
                        className="flex size-12 items-center justify-center rounded-xl border border-black-v1/15 bg-white text-black-v1/70 transition-colors hover:text-white hover:bg-[#05080F] hover:border-[#05080F] disabled:pointer-events-none disabled:opacity-30"
                    >
                        <IoChevronBack size={22} />
                    </button>

                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                        <button
                            key={p}
                            onClick={() => { setPage(p); scrollToTop(); }}
                            className={`flex h-12 w-12 items-center justify-center rounded-xl text-sm font-bold transition-colors ${p === page
                                ? "bg-primary text-white border border-primary"
                                : "border border-black-v1/15 bg-white text-black-v1/70 hover:text-white hover:bg-[#05080F]"
                                }`}
                        >
                            {p}
                        </button>
                    ))}

                    <button
                        type="button"
                        aria-label="Next blog page"
                        onClick={() => { setPage((p) => Math.min(totalPages, p + 1)); scrollToTop(); }}
                        disabled={page === totalPages}
                        className="flex size-12 items-center justify-center rounded-xl border border-black-v1/15 bg-white text-black-v1/70 transition-colors hover:text-white hover:bg-[#05080F] hover:border-[#05080F] disabled:pointer-events-none disabled:opacity-30"
                    >
                        <IoChevronForward size={22} />
                    </button>
                </div>
            </div>
        </section>
    );
}