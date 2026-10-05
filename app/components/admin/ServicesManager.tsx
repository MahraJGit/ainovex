"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  getDefaultServiceInputs,
  type Service,
  type ServiceStatus,
} from "@/app/lib/services";
import { getSupabaseBrowserClient } from "@/app/lib/supabase/client";
import {
  FiDownload,
  FiEdit2,
  FiExternalLink,
  FiPlus,
  FiSearch,
  FiTrash2,
} from "react-icons/fi";

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

export default function ServicesManager() {
  const [items, setItems] = useState<Service[]>([]);
  const [ready, setReady] = useState(false);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | ServiceStatus>("all");
  const [importing, setImporting] = useState(false);
  const [message, setMessage] = useState("");

  const loadServices = async () => {
    const supabase = getSupabaseBrowserClient();
    const { data, error } = await supabase
      .from("services")
      .select("*")
      .order("sort_order", { ascending: true })
      .order("updated_at", { ascending: false });

    if (error) {
      console.error(error.message);
      setItems([]);
      setMessage(error.message);
    } else {
      setItems((data ?? []) as Service[]);
      setMessage("");
    }
    setReady(true);
  };

  useEffect(() => {
    void loadServices();
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items.filter((service) => {
      const statusOk =
        statusFilter === "all" || service.status === statusFilter;
      if (!statusOk) return false;
      if (!q) return true;
      return (
        service.title.toLowerCase().includes(q) ||
        service.slug.toLowerCase().includes(q) ||
        service.description.toLowerCase().includes(q) ||
        service.focus_keyword.toLowerCase().includes(q)
      );
    });
  }, [items, query, statusFilter]);

  const handleDelete = async (id: string, title: string) => {
    const ok = window.confirm(`Delete “${title}”? This cannot be undone.`);
    if (!ok) return;

    const supabase = getSupabaseBrowserClient();
    const { error } = await supabase.from("services").delete().eq("id", id);
    if (error) {
      alert(error.message);
      return;
    }
    await loadServices();
  };

  const importDefaults = async () => {
    setImporting(true);
    setMessage("");
    const supabase = getSupabaseBrowserClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const payload = getDefaultServiceInputs().map((item) => ({
      ...item,
      created_by: user?.id ?? null,
    }));

    const { error } = await supabase.from("services").upsert(payload, {
      onConflict: "slug",
      ignoreDuplicates: false,
    });

    setImporting(false);
    if (error) {
      setMessage(error.message);
      return;
    }
    setMessage(`Imported ${payload.length} default services.`);
    await loadServices();
  };

  if (!ready) {
    return (
      <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-8 text-white/60">
        Loading services…
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-[28px] font-semibold tracking-tight text-white sm:text-[32px]">
            Services
          </h1>
          <p className="mt-2 text-[15px] text-white/60">
            Create SEO-ready service pages with rich content, icons, and FAQs.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => void importDefaults()}
            disabled={importing}
            className="inline-flex h-11 cursor-pointer items-center justify-center gap-2 rounded-xl border border-white/15 px-4 text-[14px] font-semibold text-white/80 transition hover:border-primary/40 hover:text-primary disabled:opacity-60"
          >
            <FiDownload size={18} />
            {importing
              ? "Importing…"
              : items.length === 0
                ? "Import defaults"
                : "Sync defaults"}
          </button>
          <Link
            href="/admin/services/new"
            className="inline-flex h-11 cursor-pointer items-center justify-center gap-2 rounded-xl bg-primary px-4 text-[14px] font-semibold text-black-v0 transition hover:bg-primary/90"
          >
            <FiPlus size={18} />
            New service
          </Link>
        </div>
      </div>

      {message ? (
        <div className="mb-4 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-[13px] text-white/70">
          {message}
        </div>
      ) : null}

      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <FiSearch className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search title, slug, keyword…"
            className="h-11 w-full rounded-xl border border-white/10 bg-white/5 pl-10 pr-4 text-[14px] text-white outline-none placeholder:text-white/35 focus:border-primary/50"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) =>
            setStatusFilter(e.target.value as "all" | ServiceStatus)
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
                <th className="px-4 py-3 font-medium">Service</th>
                <th className="px-4 py-3 font-medium">Order</th>
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
                    No services yet.{" "}
                    <Link
                      href="/admin/services/new"
                      className="cursor-pointer text-primary hover:underline"
                    >
                      Create your first service
                    </Link>{" "}
                    or import defaults.
                  </td>
                </tr>
              ) : (
                filtered.map((service) => (
                  <tr key={service.id} className="bg-white/[0.015]">
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <div className="relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-lg bg-primary/10">
                          {isValidImageSrc(service.icon) ? (
                            <Image
                              src={service.icon}
                              alt=""
                              width={28}
                              height={28}
                            />
                          ) : null}
                        </div>
                        <div className="min-w-0">
                          <p className="truncate font-medium text-white">
                            {service.title}
                          </p>
                          <p className="truncate text-[12px] text-white/45">
                            /services/{service.slug}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-white/70">
                      {service.sort_order}
                    </td>
                    <td className="px-4 py-4">
                      <span
                        className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide ${
                          service.status === "published"
                            ? "bg-emerald-500/15 text-emerald-300"
                            : service.status === "draft"
                              ? "bg-amber-500/15 text-amber-300"
                              : "bg-white/10 text-white/60"
                        }`}
                      >
                        {service.status}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-white/55">
                      {new Date(service.updated_at).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center justify-end gap-2">
                        {service.status === "published" ? (
                          <Link
                            href={`/services/${service.slug}`}
                            target="_blank"
                            className="cursor-pointer rounded-lg p-2 text-white/55 transition hover:bg-white/5 hover:text-white"
                            aria-label="View"
                          >
                            <FiExternalLink size={16} />
                          </Link>
                        ) : null}
                        <Link
                          href={`/admin/services/${service.id}/edit`}
                          className="cursor-pointer rounded-lg p-2 text-white/55 transition hover:bg-white/5 hover:text-primary"
                          aria-label="Edit"
                        >
                          <FiEdit2 size={16} />
                        </Link>
                        <button
                          type="button"
                          onClick={() =>
                            void handleDelete(service.id, service.title)
                          }
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
