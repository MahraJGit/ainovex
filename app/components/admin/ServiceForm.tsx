"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  slugify,
  normalizeService,
  type Service,
  type ServiceFaq,
  type ServiceInput,
  type ServicePoint,
  type ServiceReason,
  type ServiceStatus,
  type ServiceWhyChooseUs,
} from "@/app/lib/services";
import { SERVICE_ICON_OPTIONS } from "@/app/lib/adminServices";
import { getSupabaseBrowserClient } from "@/app/lib/supabase/client";
import { revalidateServicePages } from "@/app/lib/serviceActions";
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

type FormState = ServiceInput;

const emptyWhyChooseUs: ServiceWhyChooseUs = {
  eyebrow: "Why choose us",
  heading: "More Than Just Development.",
  description: "",
  cta_text: "Get Started",
  cta_href: "/contact-us#contact-form",
  items: [],
};

const emptyForm: FormState = {
  slug: "",
  title: "",
  description: "",
  content: "",
  icon: SERVICE_ICON_OPTIONS[0].value,
  hero_headline: "",
  hero_description: "",
  process_heading: "Our Delivery Process",
  deliverables: [],
  technologies: [],
  process_steps: [],
  why_choose_us: emptyWhyChooseUs,
  status: "draft",
  sort_order: 0,
  meta_title: "",
  meta_description: "",
  focus_keyword: "",
  keywords: [],
  faqs: [],
};

const fieldClass =
  "h-11 w-full rounded-xl border border-white/10 bg-white/[0.04] px-3.5 text-[14px] text-white outline-none transition placeholder:text-white/30 focus:border-primary/50 focus:bg-white/[0.06]";
const areaClass =
  "w-full rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-3 text-[14px] text-white outline-none transition placeholder:text-white/30 focus:border-primary/50 focus:bg-white/[0.06]";
const labelClass =
  "mb-2 block text-[12px] font-semibold uppercase tracking-[0.08em] text-white/50";
const helpClass = "mt-1.5 text-[12px] text-white/35";
const whyChooseIconOptions = [
  { label: "No icon", value: "" },
  ...SERVICE_ICON_OPTIONS.filter((icon) =>
    icon.value.startsWith("/icons/why-us/")
  ),
];

function listToString(items: string[]) {
  return items.join(", ");
}

function listToLines(items: string[]) {
  return items.join("\n");
}

function parseList(value: string) {
  return value
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);
}

function parseLines(value: string) {
  return value
    .split(/\r?\n/)
    .map((line) => line.trim())
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

type ServiceFormProps = {
  mode: "create" | "edit";
  serviceId?: string;
};

export default function ServiceForm({ mode, serviceId }: ServiceFormProps) {
  const router = useRouter();
  const [form, setForm] = useState<FormState>(emptyForm);
  const [technologiesInput, setTechnologiesInput] = useState("");
  const [keywordsInput, setKeywordsInput] = useState("");
  const [deliverablesInput, setDeliverablesInput] = useState("");
  const [formError, setFormError] = useState("");
  const [saving, setSaving] = useState(false);
  const [savedFlash, setSavedFlash] = useState(false);
  const [loading, setLoading] = useState(mode === "edit");
  const [slugManual, setSlugManual] = useState(mode === "edit");
  const [uploading, setUploading] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [iconQuery, setIconQuery] = useState("");

  useEffect(() => {
    if (mode !== "edit" || !serviceId) return;

    void (async () => {
      const supabase = getSupabaseBrowserClient();
      const { data, error } = await supabase
        .from("services")
        .select("*")
        .eq("id", serviceId)
        .maybeSingle();

      if (error || !data) {
        setFormError(error?.message || "Service not found.");
        setLoading(false);
        return;
      }

      const service = normalizeService(data as Service);
      setForm({
        slug: service.slug,
        title: service.title,
        description: service.description,
        content: service.content,
        icon: service.icon,
        hero_headline: service.hero_headline,
        hero_description: service.hero_description,
        process_heading: service.process_heading || "Our Delivery Process",
        deliverables: Array.isArray(service.deliverables)
          ? service.deliverables
          : [],
        technologies: service.technologies ?? [],
        process_steps: service.process_steps,
        why_choose_us: service.why_choose_us ?? emptyWhyChooseUs,
        status: service.status,
        sort_order: service.sort_order ?? 0,
        meta_title: service.meta_title,
        meta_description: service.meta_description,
        focus_keyword: service.focus_keyword,
        keywords: service.keywords ?? [],
        faqs: Array.isArray(service.faqs) ? service.faqs : [],
      });
      setTechnologiesInput(listToString(service.technologies ?? []));
      setKeywordsInput(listToString(service.keywords ?? []));
      setDeliverablesInput(
        listToLines(
          Array.isArray(service.deliverables) ? service.deliverables : []
        )
      );
      setLoading(false);
    })();
  }, [mode, serviceId]);

  const seoTitleLen = form.meta_title.length;
  const seoDescLen = form.meta_description.length;
  const hasValidIcon = isValidImageSrc(form.icon);

  const filteredIcons = useMemo(() => {
    const q = iconQuery.trim().toLowerCase();
    if (!q) return SERVICE_ICON_OPTIONS;
    return SERVICE_ICON_OPTIONS.filter(
      (icon) =>
        icon.label.toLowerCase().includes(q) ||
        icon.value.toLowerCase().includes(q)
    );
  }, [iconQuery]);

  const uploadImage = async (file: File) => {
    setUploading(true);
    try {
      const supabase = getSupabaseBrowserClient();
      const ext = file.name.split(".").pop()?.toLowerCase() || "png";
      const path = `services/${crypto.randomUUID()}.${ext}`;
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

  const updateFaq = (index: number, key: keyof ServiceFaq, value: string) => {
    setForm((prev) => {
      const faqs = [...prev.faqs];
      faqs[index] = { ...faqs[index], [key]: value };
      return { ...prev, faqs };
    });
  };

  const updateProcessStep = (
    index: number,
    key: keyof ServicePoint,
    value: string
  ) => {
    setForm((prev) => {
      const process_steps = [...prev.process_steps];
      process_steps[index] = { ...process_steps[index], [key]: value };
      return { ...prev, process_steps };
    });
  };

  const updateWhyChooseUs = (
    key: keyof Omit<ServiceWhyChooseUs, "items">,
    value: string
  ) => {
    setForm((prev) => ({
      ...prev,
      why_choose_us: {
        ...(prev.why_choose_us ?? emptyWhyChooseUs),
        [key]: value,
      },
    }));
  };

  const updateWhyChooseUsItem = (
    index: number,
    key: keyof ServiceReason,
    value: string
  ) => {
    setForm((prev) => {
      const section = prev.why_choose_us ?? emptyWhyChooseUs;
      const items = [...section.items];
      items[index] = { ...items[index], [key]: value };
      return { ...prev, why_choose_us: { ...section, items } };
    });
  };

  const addProcessStep = () =>
    setForm((prev) => ({
      ...prev,
      process_steps: [
        ...prev.process_steps,
        { title: "", description: "" },
      ],
    }));

  const removeProcessStep = (index: number) =>
    setForm((prev) => ({
      ...prev,
      process_steps: prev.process_steps.filter((_, i) => i !== index),
    }));

  const addWhyChooseUsItem = () =>
    setForm((prev) => {
      const section = prev.why_choose_us ?? emptyWhyChooseUs;
      return {
        ...prev,
        why_choose_us: {
          ...section,
          items: [...section.items, { icon: "", title: "", description: "" }],
        },
      };
    });

  const removeWhyChooseUsItem = (index: number) =>
    setForm((prev) => {
      const section = prev.why_choose_us ?? emptyWhyChooseUs;
      return {
        ...prev,
        why_choose_us: {
          ...section,
          items: section.items.filter((_, i) => i !== index),
        },
      };
    });

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
    if (!form.description.trim()) {
      setFormError("Short description is required.");
      return;
    }
    if (!form.content.trim()) {
      setFormError("Detail content is required.");
      return;
    }
    if (!form.icon.trim()) {
      setFormError("Please choose or upload an icon.");
      return;
    }

    const cleanFaqs = form.faqs
      .map((f) => ({
        question: f.question.trim(),
        answer: f.answer.trim(),
      }))
      .filter((f) => f.question && f.answer);
    const processSteps = form.process_steps
      .map((step) => ({
        title: step.title.trim(),
        description: step.description.trim(),
      }))
      .filter((step) => step.title && step.description);
    const whyChooseUs = form.why_choose_us
      ? {
          ...form.why_choose_us,
          eyebrow: form.why_choose_us.eyebrow.trim(),
          heading: form.why_choose_us.heading.trim(),
          description: form.why_choose_us.description.trim(),
          cta_text: form.why_choose_us.cta_text.trim(),
          cta_href: form.why_choose_us.cta_href.trim(),
          items: form.why_choose_us.items
            .map((item) => ({
              ...item,
              icon: item.icon.trim(),
              title: item.title.trim(),
              description: item.description.trim(),
            }))
            .filter((item) => item.title && item.description),
        }
      : null;

    const payload: ServiceInput = {
      ...form,
      title,
      slug,
      description: form.description.trim(),
      content: form.content,
      icon: form.icon.trim(),
      hero_headline: form.hero_headline.trim() || title,
      hero_description:
        form.hero_description.trim() || form.description.trim(),
      process_heading: form.process_heading.trim() || "Our Delivery Process",
      process_steps: processSteps,
      deliverables: parseLines(deliverablesInput),
      technologies: parseList(technologiesInput),
      why_choose_us: whyChooseUs,
      keywords: parseList(keywordsInput),
      meta_title: form.meta_title.trim() || title,
      meta_description:
        form.meta_description.trim() || form.description.trim().slice(0, 160),
      focus_keyword: form.focus_keyword.trim(),
      faqs: cleanFaqs,
      sort_order: Number.isFinite(form.sort_order) ? form.sort_order : 0,
    };

    setSaving(true);
    const supabase = getSupabaseBrowserClient();

    if (mode === "edit" && serviceId) {
      const { data, error } = await supabase
        .from("services")
        .update(payload)
        .eq("id", serviceId)
        .select("id")
        .maybeSingle();
      setSaving(false);
      if (error) {
        setFormError(error.message);
        return;
      }
      if (!data) {
        setFormError(
          "The service was not updated. Check your admin permissions and try again."
        );
        return;
      }
    } else {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      const { error } = await supabase
        .from("services")
        .insert({
          ...payload,
          created_by: user?.id ?? null,
        })
        .select("id")
        .single();
      setSaving(false);
      if (error) {
        setFormError(error.message);
        return;
      }
    }

    await revalidateServicePages();
    setSavedFlash(true);
    window.setTimeout(() => {
      router.push("/admin/services");
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
            href="/admin/services"
            className="mb-3 inline-flex cursor-pointer items-center gap-2 text-[13px] text-white/55 transition hover:text-primary"
          >
            <FiArrowLeft size={16} />
            Back to services
          </Link>
          <h1 className="text-[28px] font-semibold tracking-tight text-white sm:text-[32px]">
            {mode === "edit" ? "Edit service" : "New service"}
          </h1>
          <p className="mt-2 text-[15px] text-white/55">
            Build a full service detail page with rich content, SEO, and FAQs.
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
              /services/{form.slug}
            </span>
          ) : null}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="w-full space-y-5">
        <Section
          title="Basics"
          description="Core details shown on cards and the service hero."
        >
          <div>
            <label className={labelClass}>Title</label>
            <input
              required
              value={form.title}
              placeholder="e.g. Web Development"
              onChange={(e) => {
                const title = e.target.value;
                setForm((prev) => ({
                  ...prev,
                  title,
                  slug: slugManual ? prev.slug : slugify(title),
                  meta_title: prev.meta_title ? prev.meta_title : title,
                  hero_headline: prev.hero_headline
                    ? prev.hero_headline
                    : title,
                }));
              }}
              className={fieldClass}
            />
          </div>

          <div>
            <label className={labelClass}>Slug</label>
            <div className="flex overflow-hidden rounded-xl border border-white/10 bg-white/[0.04] focus-within:border-primary/50">
              <span className="hidden items-center border-r border-white/10 px-3 text-[13px] text-white/35 sm:inline-flex">
                /services/
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
              <label className={labelClass}>Status</label>
              <AdminSelect
                value={form.status}
                onChange={(status) =>
                  setForm((prev) => ({
                    ...prev,
                    status: status as ServiceStatus,
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
              <label className={labelClass}>Sort order</label>
              <input
                type="number"
                value={form.sort_order}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    sort_order: Number(e.target.value || 0),
                  }))
                }
                className={fieldClass}
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
                placeholder="Primary service keyphrase"
                className={fieldClass}
              />
            </div>
          </div>

          <div>
            <label className={labelClass}>Short description</label>
            <textarea
              rows={3}
              value={form.description}
              placeholder="Shown on service cards and listing previews."
              onChange={(e) =>
                setForm((prev) => ({ ...prev, description: e.target.value }))
              }
              className={areaClass}
            />
          </div>

          <div className="grid gap-5 lg:grid-cols-2">
            <div>
              <label className={labelClass}>Hero headline</label>
              <input
                value={form.hero_headline}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    hero_headline: e.target.value,
                  }))
                }
                className={fieldClass}
              />
            </div>
            <div>
              <label className={labelClass}>Hero description</label>
              <input
                value={form.hero_description}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    hero_description: e.target.value,
                  }))
                }
                className={fieldClass}
              />
            </div>
          </div>
        </Section>

        <Section
          title="Icon"
          description="Pick from the library, paste a URL, or upload your own icon."
        >
          <div className="flex flex-col gap-3 sm:flex-row">
            <input
              value={form.icon}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, icon: e.target.value }))
              }
              placeholder="Paste icon URL or choose below"
              className={fieldClass}
            />
            <label className="inline-flex h-11 cursor-pointer items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/[0.04] px-4 text-[13px] font-medium text-white/80 transition hover:border-primary/40 hover:text-primary">
              <FiImage size={16} />
              {uploading ? "Uploading…" : "Upload"}
              <input
                type="file"
                accept="image/*,.svg"
                className="hidden"
                onChange={async (e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  const url = await uploadImage(file);
                  if (url) {
                    setForm((prev) => ({ ...prev, icon: url }));
                  }
                  e.target.value = "";
                }}
              />
            </label>
          </div>

          {hasValidIcon ? (
            <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-primary/10">
                <Image src={form.icon} alt="" width={36} height={36} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[13px] font-medium text-white">Selected icon</p>
                <p className="truncate text-[12px] text-white/45">{form.icon}</p>
              </div>
              <button
                type="button"
                onClick={() => setForm((prev) => ({ ...prev, icon: "" }))}
                className="inline-flex cursor-pointer items-center gap-1 rounded-lg px-2.5 py-1.5 text-[12px] text-white/50 hover:bg-red-500/10 hover:text-red-300"
              >
                <FiTrash2 size={12} /> Clear
              </button>
            </div>
          ) : null}

          <div>
            <input
              value={iconQuery}
              onChange={(e) => setIconQuery(e.target.value)}
              placeholder="Search icons…"
              className={fieldClass}
            />
            <div className="mt-3 grid max-h-[320px] grid-cols-3 gap-2 overflow-y-auto custom-scrollbar sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8">
              {filteredIcons.map((icon) => {
                const selected = form.icon === icon.value;
                return (
                  <button
                    key={icon.value}
                    type="button"
                    title={icon.label}
                    onClick={() =>
                      setForm((prev) => ({ ...prev, icon: icon.value }))
                    }
                    className={`flex flex-col items-center gap-2 rounded-xl border p-3 transition ${
                      selected
                        ? "border-primary/60 bg-primary/10"
                        : "border-white/10 bg-white/[0.03] hover:border-primary/30"
                    }`}
                  >
                    <Image src={icon.value} alt="" width={28} height={28} />
                    <span className="line-clamp-2 text-center text-[10px] text-white/55">
                      {icon.label}
                    </span>
                  </button>
                );
              })}
            </div>
            <p className={helpClass}>
              {filteredIcons.length} icons available · upload custom anytime
            </p>
          </div>
        </Section>

        <Section
          title="Detail content"
          description="Write the service overview and supporting content. Manage process steps and benefit cards in their dedicated sections below."
        >
          <RichTextEditor
            value={form.content}
            onChange={(content) => setForm((prev) => ({ ...prev, content }))}
            onUploadImage={uploadImage}
            placeholder="Write the full service page content..."
            className="w-full"
          />
        </Section>

        <Section
          title="Sidebar details"
          description="Optional lists shown beside the detail content."
        >
          <div>
            <label className={labelClass}>Deliverables</label>
            <textarea
              rows={5}
              value={deliverablesInput}
              onChange={(e) => setDeliverablesInput(e.target.value)}
              placeholder={"Custom responsive website\nCMS setup\nSEO foundations"}
              className={areaClass}
            />
            <p className={helpClass}>One deliverable per line</p>
          </div>
          <div>
            <label className={labelClass}>Technologies</label>
            <input
              value={technologiesInput}
              onChange={(e) => setTechnologiesInput(e.target.value)}
              placeholder="Next.js, React, TypeScript"
              className={fieldClass}
            />
            <p className={helpClass}>Comma-separated list</p>
          </div>
        </Section>

        <Section
          title="Delivery process"
          description="Add the steps visitors will see in the service delivery timeline."
        >
          <div>
            <label className={labelClass}>Section heading</label>
            <input
              value={form.process_heading}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  process_heading: e.target.value,
                }))
              }
              placeholder="Our Delivery Process"
              className={fieldClass}
            />
          </div>

          <div className="space-y-3">
            {form.process_steps.map((step, index) => (
              <div
                key={index}
                className="rounded-xl border border-white/10 bg-white/[0.025] p-4"
              >
                <div className="mb-3 flex items-center justify-between">
                  <p className="text-[13px] font-semibold text-white/75">
                    Step {String(index + 1).padStart(2, "0")}
                  </p>
                  <button
                    type="button"
                    onClick={() => removeProcessStep(index)}
                    className="inline-flex cursor-pointer items-center gap-1 rounded-lg px-2 py-1 text-[12px] text-white/45 hover:bg-red-500/10 hover:text-red-300"
                  >
                    <FiTrash2 size={13} /> Remove
                  </button>
                </div>
                <div className="grid gap-3 lg:grid-cols-2">
                  <input
                    value={step.title}
                    onChange={(e) =>
                      updateProcessStep(index, "title", e.target.value)
                    }
                    placeholder="Step title"
                    className={fieldClass}
                  />
                  <input
                    value={step.description}
                    onChange={(e) =>
                      updateProcessStep(index, "description", e.target.value)
                    }
                    placeholder="Briefly describe this step"
                    className={fieldClass}
                  />
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={addProcessStep}
              className="inline-flex h-10 cursor-pointer items-center gap-2 rounded-xl border border-white/15 px-3.5 text-[13px] font-medium text-white/75 transition hover:border-primary/40 hover:text-primary"
            >
              <FiPlus size={15} /> Add process step
            </button>
          </div>
        </Section>

        <Section
          title="Why choose us"
          description="Customize the introduction, call to action, and benefit cards for this service."
        >
          {(() => {
            const section = form.why_choose_us ?? emptyWhyChooseUs;
            return (
              <>
                <div className="grid gap-5 lg:grid-cols-2">
                  <div>
                    <label className={labelClass}>Eyebrow</label>
                    <input
                      value={section.eyebrow}
                      onChange={(e) =>
                        updateWhyChooseUs("eyebrow", e.target.value)
                      }
                      placeholder="Why choose us"
                      className={fieldClass}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Heading</label>
                    <input
                      value={section.heading}
                      onChange={(e) =>
                        updateWhyChooseUs("heading", e.target.value)
                      }
                      placeholder="More Than Just Development."
                      className={fieldClass}
                    />
                  </div>
                </div>
                <div>
                  <label className={labelClass}>Description</label>
                  <textarea
                    rows={3}
                    value={section.description}
                    onChange={(e) =>
                      updateWhyChooseUs("description", e.target.value)
                    }
                    placeholder="Explain what makes your approach different."
                    className={areaClass}
                  />
                </div>
                <div className="grid gap-5 lg:grid-cols-2">
                  <div>
                    <label className={labelClass}>Call-to-action label</label>
                    <input
                      value={section.cta_text}
                      onChange={(e) =>
                        updateWhyChooseUs("cta_text", e.target.value)
                      }
                      placeholder="Get Started"
                      className={fieldClass}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Call-to-action link</label>
                    <input
                      value={section.cta_href}
                      onChange={(e) =>
                        updateWhyChooseUs("cta_href", e.target.value)
                      }
                      placeholder="/contact-us#contact-form"
                      className={fieldClass}
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-[13px] font-semibold text-white/75">
                      Benefit cards
                    </h3>
                    <span className="text-[12px] text-white/40">
                      {section.items.length} cards
                    </span>
                  </div>
                  {section.items.map((item, index) => (
                    <div
                      key={index}
                      className="rounded-xl border border-white/10 bg-white/[0.025] p-4"
                    >
                      <div className="mb-3 flex items-center justify-between">
                        <p className="text-[13px] font-semibold text-white/75">
                          Card {String(index + 1).padStart(2, "0")}
                        </p>
                        <button
                          type="button"
                          onClick={() => removeWhyChooseUsItem(index)}
                          className="inline-flex cursor-pointer items-center gap-1 rounded-lg px-2 py-1 text-[12px] text-white/45 hover:bg-red-500/10 hover:text-red-300"
                        >
                          <FiTrash2 size={13} /> Remove
                        </button>
                      </div>
                      <div className="grid gap-3 lg:grid-cols-[0.7fr_1fr_1.5fr]">
                        <AdminSelect
                          value={item.icon}
                          onChange={(value) =>
                            updateWhyChooseUsItem(index, "icon", value)
                          }
                          options={whyChooseIconOptions}
                        />
                        <input
                          value={item.title}
                          onChange={(e) =>
                            updateWhyChooseUsItem(
                              index,
                              "title",
                              e.target.value
                            )
                          }
                          placeholder="Benefit title"
                          className={fieldClass}
                        />
                        <input
                          value={item.description}
                          onChange={(e) =>
                            updateWhyChooseUsItem(
                              index,
                              "description",
                              e.target.value
                            )
                          }
                          placeholder="Short benefit description"
                          className={fieldClass}
                        />
                      </div>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addWhyChooseUsItem}
                    className="inline-flex h-10 cursor-pointer items-center gap-2 rounded-xl border border-white/15 px-3.5 text-[13px] font-medium text-white/75 transition hover:border-primary/40 hover:text-primary"
                  >
                    <FiPlus size={15} /> Add benefit card
                  </button>
                </div>
              </>
            );
          })()}
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
                setForm((prev) => ({ ...prev, meta_title: e.target.value }))
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
            <label className={labelClass}>Keywords</label>
            <input
              value={keywordsInput}
              onChange={(e) => setKeywordsInput(e.target.value)}
              placeholder="web development, Next.js, custom websites"
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
              ainovex.com/services/{form.slug || "service-slug"}
            </p>
            <p className="mt-1 line-clamp-2 text-[13px] text-white/55">
              {form.meta_description ||
                form.description ||
                "Meta description will appear here."}
            </p>
          </div>
        </Section>

        <Section
          title="FAQs"
          description="Optional Q&A shown on the detail page and included in FAQ schema."
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
              No FAQs yet. Add common questions to improve SEO and clarity.
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
                    ? "Changes save to your live services list."
                    : "Ready when you are."}
                </span>
              )}
            </div>
            <div className="flex gap-3">
              <Link
                href="/admin/services"
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
                    ? "Update service"
                    : "Create service"}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
