"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  BLOG_CATEGORIES,
  slugify,
  type Blog,
  type BlogFaq,
  type BlogInput,
  type BlogStatus,
} from "@/app/lib/blogs";
import { getSupabaseBrowserClient } from "@/app/lib/supabase/client";
import RichTextEditor from "@/app/components/admin/RichTextEditor";
import AdminSelect from "@/app/components/admin/AdminSelect";
import {
  FiArrowLeft,
  FiCheckCircle,
  FiChevronDown,
  FiImage,
  FiPlus,
  FiTrash2,
} from "react-icons/fi";

type FormState = BlogInput;

const emptyForm: FormState = {
  slug: "",
  title: "",
  excerpt: "",
  content: "",
  featured_image: "",
  featured_image_alt: "",
  author: "Ainovex Team",
  category: BLOG_CATEGORIES[0],
  tags: [],
  status: "draft",
  published_at: null,
  meta_title: "",
  meta_description: "",
  focus_keyword: "",
  faqs: [],
};

const fieldClass =
  "h-11 w-full rounded-xl border border-white/10 bg-white/[0.04] px-3.5 text-[14px] text-white outline-none transition placeholder:text-white/30 focus:border-primary/50 focus:bg-white/[0.06]";
const areaClass =
  "w-full rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-3 text-[14px] text-white outline-none transition placeholder:text-white/30 focus:border-primary/50 focus:bg-white/[0.06]";
const labelClass =
  "mb-2 block text-[12px] font-semibold uppercase tracking-[0.08em] text-white/50";
const helpClass = "mt-1.5 text-[12px] text-white/35";

function tagsToString(tags: string[]) {
  return tags.join(", ");
}

function parseTags(value: string) {
  return value
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);
}

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

function Section({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-white/10 bg-[#0F172A]/80 p-5 sm:p-6">
        <div className="mb-5 border-b border-white/[0.08] pb-4">
        <h2 className="text-[16px] font-semibold text-white">{title}</h2>
        {description ? (
          <p className="mt-1 text-[13px] text-white/45">{description}</p>
        ) : null}
      </div>
      <div className="space-y-5">{children}</div>
    </section>
  );
}

type BlogFormProps = {
  mode: "create" | "edit";
  blogId?: string;
};

export default function BlogForm({ mode, blogId }: BlogFormProps) {
  const router = useRouter();
  const [form, setForm] = useState<FormState>(emptyForm);
  const [tagsInput, setTagsInput] = useState("");
  const [formError, setFormError] = useState("");
  const [saving, setSaving] = useState(false);
  const [savedFlash, setSavedFlash] = useState(false);
  const [loading, setLoading] = useState(mode === "edit");
  const [slugManual, setSlugManual] = useState(mode === "edit");
  const [uploading, setUploading] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  useEffect(() => {
    if (mode !== "edit" || !blogId) return;

    void (async () => {
      const supabase = getSupabaseBrowserClient();
      const { data, error } = await supabase
        .from("blogs")
        .select("*")
        .eq("id", blogId)
        .maybeSingle();

      if (error || !data) {
        setFormError(error?.message || "Blog not found.");
        setLoading(false);
        return;
      }

      const blog = data as Blog;
      setForm({
        slug: blog.slug,
        title: blog.title,
        excerpt: blog.excerpt,
        content: blog.content,
        featured_image: blog.featured_image,
        featured_image_alt: blog.featured_image_alt,
        author: blog.author,
        category: blog.category,
        tags: blog.tags ?? [],
        status: blog.status,
        published_at: blog.published_at,
        meta_title: blog.meta_title,
        meta_description: blog.meta_description,
        focus_keyword: blog.focus_keyword,
        faqs: Array.isArray(blog.faqs) ? blog.faqs : [],
      });
      setTagsInput(tagsToString(blog.tags ?? []));
      setLoading(false);
    })();
  }, [mode, blogId]);

  const seoTitleLen = form.meta_title.length;
  const seoDescLen = form.meta_description.length;
  const tagCount = useMemo(() => parseTags(tagsInput).length, [tagsInput]);
  const featuredImageSrc = form.featured_image.trim();
  const hasValidFeaturedImage = isValidImageSrc(featuredImageSrc);

  const uploadImage = async (file: File) => {
    setUploading(true);
    try {
      const supabase = getSupabaseBrowserClient();
      const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
      const path = `${crypto.randomUUID()}.${ext}`;
      const { error } = await supabase.storage
        .from("blog-images")
        .upload(path, file, { cacheControl: "3600", upsert: false });
      if (error) {
        setFormError(error.message);
        return null;
      }
      const { data } = supabase.storage.from("blog-images").getPublicUrl(path);
      return data.publicUrl;
    } finally {
      setUploading(false);
    }
  };

  const updateFaq = (index: number, key: keyof BlogFaq, value: string) => {
    setForm((prev) => {
      const faqs = [...prev.faqs];
      faqs[index] = { ...faqs[index], [key]: value };
      return { ...prev, faqs };
    });
  };

  const addFaq = () => {
    setForm((prev) => ({
      ...prev,
      faqs: [{ question: "", answer: "" }, ...prev.faqs],
    }));
    setOpenFaqIndex(0);
  };

  const removeFaq = (index: number) => {
    setForm((prev) => ({
      ...prev,
      faqs: prev.faqs.filter((_, i) => i !== index),
    }));
    setOpenFaqIndex((current) => {
      if (current === null) return null;
      if (current === index) return null;
      if (current > index) return current - 1;
      return current;
    });
  };

  const toggleFaq = (index: number) => {
    setOpenFaqIndex((current) => (current === index ? null : index));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setFormError("");

    const title = form.title.trim();
    const slug = (form.slug || slugify(title)).trim();
    if (!title) {
      setFormError("Title is required.");
      return;
    }
    if (!slug || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
      setFormError("Slug must be lowercase letters, numbers, and hyphens.");
      return;
    }
    if (!form.content.trim()) {
      setFormError("Content is required.");
      return;
    }

    const cleanFaqs = form.faqs
      .map((f) => ({
        question: f.question.trim(),
        answer: f.answer.trim(),
      }))
      .filter((f) => f.question && f.answer);

    const payload: BlogInput = {
      ...form,
      title,
      slug,
      excerpt: form.excerpt.trim(),
      content: form.content,
      featured_image: form.featured_image.trim(),
      featured_image_alt: form.featured_image_alt.trim() || title,
      author: form.author.trim() || "Ainovex Team",
      category: form.category.trim() || "General",
      tags: parseTags(tagsInput),
      meta_title: form.meta_title.trim() || title,
      meta_description:
        form.meta_description.trim() || form.excerpt.trim().slice(0, 160),
      focus_keyword: form.focus_keyword.trim(),
      faqs: cleanFaqs,
      published_at:
        form.status === "published"
          ? form.published_at || new Date().toISOString()
          : form.published_at,
    };

    setSaving(true);
    const supabase = getSupabaseBrowserClient();

    if (mode === "edit" && blogId) {
      const { error } = await supabase
        .from("blogs")
        .update(payload)
        .eq("id", blogId);
      setSaving(false);
      if (error) {
        setFormError(error.message);
        return;
      }
    } else {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      const { error } = await supabase.from("blogs").insert({
        ...payload,
        created_by: user?.id ?? null,
      });
      setSaving(false);
      if (error) {
        setFormError(error.message);
        return;
      }
    }

    setSavedFlash(true);
    window.setTimeout(() => {
      router.push("/admin/blogs");
      router.refresh();
    }, 450);
  };

  if (loading) {
    return (
      <div className="w-full space-y-4">
        <div className="h-10 w-40 animate-pulse rounded-lg bg-white/5" />
        <div className="h-24 animate-pulse rounded-2xl bg-white/5" />
        <div className="h-72 animate-pulse rounded-2xl bg-white/5" />
      </div>
    );
  }

  return (
    <div className="w-full pb-28">
      <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <Link
            href="/admin/blogs"
            className="mb-3 inline-flex cursor-pointer items-center gap-2 text-[13px] text-white/55 transition hover:text-primary"
          >
            <FiArrowLeft size={16} />
            Back to blogs
          </Link>
          <h1 className="text-[28px] font-semibold tracking-tight text-white sm:text-[32px]">
            {mode === "edit" ? "Edit blog" : "New blog"}
          </h1>
          <p className="mt-2 text-[15px] text-white/55">
            Write SEO-ready content with tags, FAQs, and rich formatting.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span
            className={`inline-flex rounded-full px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wide ${
              form.status === "published"
                ? "bg-emerald-500/15 text-emerald-300"
                : form.status === "draft"
                  ? "bg-amber-500/15 text-amber-300"
                  : "bg-white/10 text-white/60"
            }`}
          >
            {form.status}
          </span>
          {form.slug ? (
            <span className="hidden truncate rounded-full border border-white/10 px-3 py-1.5 text-[12px] text-white/45 sm:inline-flex">
              /blog/{form.slug}
            </span>
          ) : null}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="w-full space-y-5">
        <Section
          title="Basics"
          description="Core details readers and search engines see first."
        >
          <div>
            <label className={labelClass}>Title</label>
            <input
              required
              value={form.title}
              placeholder="e.g. How we ship AI features without breaking trust"
              onChange={(e) => {
                const title = e.target.value;
                setForm((prev) => ({
                  ...prev,
                  title,
                  slug: slugManual ? prev.slug : slugify(title),
                  meta_title: prev.meta_title ? prev.meta_title : title,
                }));
              }}
              className={fieldClass}
            />
          </div>

          <div>
            <label className={labelClass}>Slug</label>
            <div className="flex overflow-hidden rounded-xl border border-white/10 bg-white/[0.04] focus-within:border-primary/50">
              <span className="hidden items-center border-r border-white/10 px-3 text-[13px] text-white/35 sm:inline-flex">
                /blog/
              </span>
              <input
                required
                value={form.slug}
                onChange={(e) => {
                  setSlugManual(true);
                  setForm((prev) => ({
                    ...prev,
                    slug: slugify(e.target.value),
                  }));
                }}
                className="h-11 w-full bg-transparent px-3.5 text-[14px] text-white outline-none placeholder:text-white/30"
                placeholder="url-friendly-slug"
              />
            </div>
            <p className={helpClass}>Auto-generated from the title. Edit anytime.</p>
          </div>

          <div className="grid gap-5 lg:grid-cols-3">
            <div>
              <label className={labelClass}>Category</label>
              <AdminSelect
                value={form.category}
                onChange={(category) =>
                  setForm((prev) => ({ ...prev, category }))
                }
                options={BLOG_CATEGORIES.map((cat) => ({
                  label: cat,
                  value: cat,
                }))}
              />
            </div>
            <div>
              <label className={labelClass}>Status</label>
              <AdminSelect
                value={form.status}
                onChange={(status) =>
                  setForm((prev) => ({
                    ...prev,
                    status: status as BlogStatus,
                  }))
                }
                options={[
                  { label: "Draft", value: "draft" },
                  { label: "Published", value: "published" },
                  { label: "Archived", value: "archived" },
                ]}
              />
            </div>
            <div>
              <label className={labelClass}>Author</label>
              <input
                value={form.author}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, author: e.target.value }))
                }
                className={fieldClass}
              />
            </div>
          </div>

          <div>
            <label className={labelClass}>Excerpt</label>
            <textarea
              rows={3}
              value={form.excerpt}
              placeholder="A short summary shown on listing cards and social previews."
              onChange={(e) =>
                setForm((prev) => ({ ...prev, excerpt: e.target.value }))
              }
              className={areaClass}
            />
          </div>
        </Section>

        <Section
          title="Content"
          description="Use headings for a clean table of contents on the article page."
        >
          <RichTextEditor
            value={form.content}
            onChange={(content) => setForm((prev) => ({ ...prev, content }))}
            onUploadImage={uploadImage}
            className="w-full"
          />
        </Section>

        <Section
          title="Media & tags"
          description="Featured image and discoverability tags."
        >
          <div>
            <label className={labelClass}>Featured image</label>
            <div className="flex flex-col gap-3 sm:flex-row">
              <input
                value={form.featured_image}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    featured_image: e.target.value,
                  }))
                }
                placeholder="Paste image URL or upload"
                className={fieldClass}
              />
              <label className="inline-flex h-11 cursor-pointer items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/[0.04] px-4 text-[13px] font-medium text-white/80 transition hover:border-primary/40 hover:text-primary">
                <FiImage size={16} />
                {uploading ? "Uploading…" : "Upload"}
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;
                    const url = await uploadImage(file);
                    if (url) {
                      setForm((prev) => ({
                        ...prev,
                        featured_image: url,
                      }));
                    }
                    e.target.value = "";
                  }}
                />
              </label>
            </div>
            {hasValidFeaturedImage ? (
              <div className="relative mt-4 h-52 w-full overflow-hidden rounded-2xl border border-white/10 sm:h-72">
                <Image
                  src={featuredImageSrc}
                  alt={form.featured_image_alt || form.title || "Featured"}
                  fill
                  unoptimized={featuredImageSrc.startsWith("data:")}
                  className="object-cover"
                  sizes="100vw"
                />
                <button
                  type="button"
                  onClick={() =>
                    setForm((prev) => ({ ...prev, featured_image: "" }))
                  }
                  className="absolute right-3 top-3 inline-flex cursor-pointer items-center gap-1 rounded-lg bg-black/60 px-2.5 py-1.5 text-[12px] text-white backdrop-blur hover:bg-black/80"
                >
                  <FiTrash2 size={12} /> Remove
                </button>
              </div>
            ) : (
              <div className="mt-3 flex h-36 flex-col items-center justify-center gap-1 rounded-2xl border border-dashed border-white/15 bg-white/[0.02] px-4 text-center text-[13px] text-white/35">
                <span>No featured image yet</span>
                {featuredImageSrc ? (
                  <span className="text-[12px] text-amber-300/80">
                    Enter a full image URL (https://…) or upload a file
                  </span>
                ) : null}
              </div>
            )}
          </div>

          <div>
            <label className={labelClass}>Featured image alt text</label>
            <input
              value={form.featured_image_alt}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  featured_image_alt: e.target.value,
                }))
              }
              placeholder="Describe the image for accessibility and SEO"
              className={fieldClass}
            />
          </div>

          <div>
            <label className={labelClass}>Tags</label>
            <input
              value={tagsInput}
              onChange={(e) => setTagsInput(e.target.value)}
              placeholder="AI, Next.js, SEO"
              className={fieldClass}
            />
            <p className={helpClass}>
              Comma-separated · {tagCount} tag{tagCount === 1 ? "" : "s"}
            </p>
          </div>
        </Section>

        <Section
          title="SEO"
          description="These fields power search snippets and social cards."
        >
          <div>
            <div className="mb-2 flex items-center justify-between">
              <label className="text-[12px] font-semibold uppercase tracking-[0.08em] text-white/50">
                Meta title
              </label>
              <span
                className={`text-[11px] ${
                  seoTitleLen > 60 ? "text-amber-300" : "text-white/35"
                }`}
              >
                {seoTitleLen}/70
              </span>
            </div>
            <input
              value={form.meta_title}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  meta_title: e.target.value,
                }))
              }
              maxLength={70}
              className={fieldClass}
            />
          </div>

          <div>
            <div className="mb-2 flex items-center justify-between">
              <label className="text-[12px] font-semibold uppercase tracking-[0.08em] text-white/50">
                Meta description
              </label>
              <span
                className={`text-[11px] ${
                  seoDescLen > 155 ? "text-amber-300" : "text-white/35"
                }`}
              >
                {seoDescLen}/160
              </span>
            </div>
            <textarea
              rows={3}
              value={form.meta_description}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  meta_description: e.target.value,
                }))
              }
              maxLength={160}
              className={areaClass}
            />
          </div>

          <div>
            <label className={labelClass}>Focus keyword</label>
            <input
              value={form.focus_keyword}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  focus_keyword: e.target.value,
                }))
              }
              placeholder="Primary keyphrase for this article"
              className={fieldClass}
            />
          </div>

          <div className="rounded-xl border border-white/10 bg-[#070B14] p-4">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-white/35">
              Search preview
            </p>
            <p className="mt-2 truncate text-[18px] text-[#8ab4f8]">
              {form.meta_title || form.title || "Page title"}
            </p>
            <p className="mt-1 truncate text-[13px] text-emerald-400/80">
              ainovex.com/blog/{form.slug || "article-slug"}
            </p>
            <p className="mt-1 line-clamp-2 text-[13px] text-white/55">
              {form.meta_description ||
                form.excerpt ||
                "Meta description will appear here."}
            </p>
          </div>
        </Section>

        <Section
          title="FAQs"
          description="Optional Q&A shown on the article and included in FAQ schema."
        >
          <div className="flex items-center justify-between gap-3">
            <p className="text-[13px] text-white/45">
              {form.faqs.length} FAQ{form.faqs.length === 1 ? "" : "s"} added
            </p>
            <button
              type="button"
              onClick={addFaq}
              className="inline-flex cursor-pointer items-center gap-1.5 rounded-xl border border-primary/30 bg-primary/10 px-3 py-2 text-[13px] font-medium text-primary transition hover:bg-primary/15"
            >
              <FiPlus size={15} /> Add FAQ
            </button>
          </div>

          {form.faqs.length === 0 ? (
            <div className="rounded-xl border border-dashed border-white/15 px-4 py-8 text-center text-[13px] text-white/40">
              No FAQs yet. Add a few common questions to improve SEO and clarity.
            </div>
          ) : (
            <div className="space-y-3">
              {form.faqs.map((faq, index) => {
                const isOpen = openFaqIndex === index;
                const preview =
                  faq.question.trim() || `Untitled FAQ ${index + 1}`;

                return (
                  <div
                    key={index}
                    className="overflow-hidden rounded-xl border border-white/10 bg-white/[0.03]"
                  >
                    <div className="flex items-center gap-2 px-3 py-2.5">
                      <button
                        type="button"
                        onClick={() => toggleFaq(index)}
                        aria-expanded={isOpen}
                        className="flex min-w-0 flex-1 cursor-pointer items-center gap-3 text-left"
                      >
                        <FiChevronDown
                          size={16}
                          className={`shrink-0 text-white/45 transition ${
                            isOpen ? "rotate-180 text-primary" : ""
                          }`}
                        />
                        <div className="min-w-0">
                          <p className="text-[11px] font-semibold uppercase tracking-wide text-white/35">
                            FAQ {index + 1}
                          </p>
                          <p className="truncate text-[14px] text-white/85">
                            {preview}
                          </p>
                        </div>
                      </button>
                      <button
                        type="button"
                        onClick={() => removeFaq(index)}
                        className="inline-flex shrink-0 cursor-pointer items-center gap-1 rounded-lg px-2 py-1.5 text-[12px] text-white/40 transition hover:bg-red-500/10 hover:text-red-300"
                      >
                        <FiTrash2 size={13} /> Remove
                      </button>
                    </div>

                    <div
                      className={`grid transition-all duration-300 ease-in-out ${
                        isOpen
                          ? "grid-rows-[1fr] opacity-100"
                          : "grid-rows-[0fr] opacity-0"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <div className="space-y-3 border-t border-white/10 px-4 pb-4 pt-3">
                          <input
                            value={faq.question}
                            onChange={(e) =>
                              updateFaq(index, "question", e.target.value)
                            }
                            placeholder="Question"
                            className={fieldClass}
                          />
                          <textarea
                            value={faq.answer}
                            onChange={(e) =>
                              updateFaq(index, "answer", e.target.value)
                            }
                            placeholder="Answer"
                            rows={3}
                            className={areaClass}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </Section>

        {formError ? (
          <div
            role="alert"
            className="rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-[13px] text-red-200"
          >
            {formError}
          </div>
        ) : null}

        <div className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-[#0B1220]/95 backdrop-blur-md">
          <div className="mx-auto flex max-w-[1600px] flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between lg:px-8">
            <div className="flex items-center gap-2 text-[13px] text-white/45">
              {savedFlash ? (
                <span className="inline-flex items-center gap-1.5 text-emerald-300">
                  <FiCheckCircle size={15} /> Saved
                </span>
              ) : (
                <span>
                  {mode === "edit"
                    ? "Changes save to your live blog list."
                    : "Ready when you are."}
                </span>
              )}
            </div>
            <div className="flex gap-3">
              <Link
                href="/admin/blogs"
                className="inline-flex h-11 flex-1 cursor-pointer items-center justify-center rounded-xl border border-white/15 px-4 text-[14px] font-medium text-white/75 transition hover:bg-white/5 sm:flex-none"
              >
                Cancel
              </Link>
              <button
                type="submit"
                disabled={saving}
                className="h-11 flex-1 cursor-pointer rounded-xl bg-primary px-6 text-[14px] font-semibold text-black-v0 transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60 sm:flex-none"
              >
                {saving
                  ? "Saving…"
                  : mode === "edit"
                    ? "Update blog"
                    : "Create blog"}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
