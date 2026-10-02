"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Blog, BlogStatus } from "@/app/lib/blogs";
import { getSupabaseBrowserClient } from "@/app/lib/supabase/client";
import { FiEdit2, FiExternalLink, FiPlus, FiSearch, FiTrash2 } from "react-icons/fi";

function isValidImageSrc(value: string) {
  const src = value.trim();
  if (!src) return false;
  if (src.startsWith("/") || src.startsWith("data:image/")) return true;
  try {
    const url = new URL(src);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

export default function BlogsManager() {
  const [items, setItems] = useState<Blog[]>([]);
  const [ready, setReady] = useState(false);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | BlogStatus>("all");

  const loadBlogs = async () => {
    const supabase = getSupabaseBrowserClient();
    const { data, error } = await supabase
      .from("blogs")
      .select("*")
      .order("updated_at", { ascending: false });

    if (error) {
      console.error(error.message);
      setItems([]);
    } else {
      setItems((data ?? []) as Blog[]);
    }
    setReady(true);
  };

  useEffect(() => {
    void loadBlogs();
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items.filter((blog) => {
      const statusOk = statusFilter === "all" || blog.status === statusFilter;
      if (!statusOk) return false;
      if (!q) return true;
      return (
        blog.title.toLowerCase().includes(q) ||
        blog.slug.toLowerCase().includes(q) ||
        blog.category.toLowerCase().includes(q) ||
        blog.focus_keyword.toLowerCase().includes(q) ||
        blog.tags.some((t) => t.toLowerCase().includes(q))
      );
    });
  }, [items, query, statusFilter]);

  const handleDelete = async (id: string, title: string) => {
    const ok = window.confirm(`Delete “${title}”? This cannot be undone.`);
    if (!ok) return;

    const supabase = getSupabaseBrowserClient();
    const { error } = await supabase.from("blogs").delete().eq("id", id);
    if (error) {
      alert(error.message);
      return;
    }
    await loadBlogs();
  };

  if (!ready) {
    return (
      <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-8 text-white/60">
        Loading blogs…
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-[28px] font-semibold tracking-tight text-white sm:text-[32px]">
            Blogs
          </h1>
          <p className="mt-2 text-[15px] text-white/60">
            Create SEO-ready articles with rich content, tags, and FAQs.
          </p>
        </div>
        <Link
          href="/admin/blogs/new"
          className="inline-flex h-11 cursor-pointer items-center justify-center gap-2 rounded-xl bg-primary px-4 text-[14px] font-semibold text-black-v0 transition hover:bg-primary/90"
        >
          <FiPlus size={18} />
          New blog
        </Link>
      </div>

      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <FiSearch className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search title, tag, keyword…"
            className="h-11 w-full rounded-xl border border-white/10 bg-white/5 pl-10 pr-4 text-[14px] text-white outline-none placeholder:text-white/35 focus:border-primary/50"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) =>
            setStatusFilter(e.target.value as "all" | BlogStatus)
          }
          className="h-11 cursor-pointer rounded-xl border border-white/10 bg-[#0F172A] px-3 text-[14px] text-white outline-none focus:border-primary/50"
        >
          <option value="all">All statuses</option>
          <option value="draft">Draft</option>
          <option value="published">Published</option>
          <option value="archived">Archived</option>
        </select>
      </div>

      <div className="overflow-hidden rounded-2xl border border-white/10">
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-[14px]">
            <thead className="bg-white/[0.04] text-[12px] uppercase tracking-wide text-white/45">
              <tr>
                <th className="px-4 py-3 font-medium">Article</th>
                <th className="px-4 py-3 font-medium">Category</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Updated</th>
                <th className="px-4 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {filtered.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="px-4 py-10 text-center text-white/50"
                  >
                    No blogs yet.{" "}
                    <Link
                      href="/admin/blogs/new"
                      className="cursor-pointer text-primary hover:underline"
                    >
                      Create your first article
                    </Link>
                    .
                  </td>
                </tr>
              ) : (
                filtered.map((blog) => (
                  <tr key={blog.id} className="bg-white/[0.015]">
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <div className="relative h-12 w-16 overflow-hidden rounded-lg bg-white/5">
                          {isValidImageSrc(blog.featured_image) ? (
                            <Image
                              src={blog.featured_image}
                              alt=""
                              fill
                              className="object-cover"
                              sizes="64px"
                            />
                          ) : null}
                        </div>
                        <div className="min-w-0">
                          <p className="truncate font-medium text-white">
                            {blog.title}
                          </p>
                          <p className="truncate text-[12px] text-white/45">
                            /blog/{blog.slug}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-white/70">{blog.category}</td>
                    <td className="px-4 py-4">
                      <span
                        className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide ${
                          blog.status === "published"
                            ? "bg-emerald-500/15 text-emerald-300"
                            : blog.status === "draft"
                              ? "bg-amber-500/15 text-amber-300"
                              : "bg-white/10 text-white/60"
                        }`}
                      >
                        {blog.status}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-white/55">
                      {new Date(blog.updated_at).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center justify-end gap-2">
                        {blog.status === "published" ? (
                          <Link
                            href={`/blog/${blog.slug}`}
                            target="_blank"
                            className="cursor-pointer rounded-lg p-2 text-white/55 transition hover:bg-white/5 hover:text-white"
                            aria-label="View"
                          >
                            <FiExternalLink size={16} />
                          </Link>
                        ) : null}
                        <Link
                          href={`/admin/blogs/${blog.id}/edit`}
                          className="cursor-pointer rounded-lg p-2 text-white/55 transition hover:bg-white/5 hover:text-primary"
                          aria-label="Edit"
                        >
                          <FiEdit2 size={16} />
                        </Link>
                        <button
                          type="button"
                          onClick={() => void handleDelete(blog.id, blog.title)}
                          className="cursor-pointer rounded-lg p-2 text-white/55 transition hover:bg-white/5 hover:text-red-300"
                          aria-label="Delete"
                        >
                          <FiTrash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
