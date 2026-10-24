import { serviceSeedRaw, type SeedService } from "@/app/lib/serviceSeed";
import { slugify as sharedSlugify } from "@/app/lib/blogs";

export type ServiceStatus = "draft" | "published" | "archived";

export type ServiceFaq = {
  question: string;
  answer: string;
};

export type ServicePoint = {
  title: string;
  description: string;
};

export type ServiceReason = ServicePoint & {
  icon: string;
};

export type ServiceWhyChooseUs = {
  eyebrow: string;
  heading: string;
  description: string;
  cta_text: string;
  cta_href: string;
  items: ServiceReason[];
};

export type Service = {
  id: string;
  slug: string;
  title: string;
  description: string;
  content: string;
  icon: string;
  hero_headline: string;
  hero_description: string;
  overview_heading: string;
  process_heading: string;
  deliverables: string[];
  technologies: string[];
  process_steps: ServicePoint[];
  why_choose_us: ServiceWhyChooseUs | null;
  status: ServiceStatus;
  sort_order: number;
  meta_title: string;
  meta_description: string;
  focus_keyword: string;
  keywords: string[];
  faqs: ServiceFaq[];
  created_by: string | null;
  created_at: string;
  updated_at: string;
};

export type ServiceListItem = Pick<
  Service,
  | "id"
  | "slug"
  | "title"
  | "description"
  | "icon"
  | "status"
  | "sort_order"
  | "meta_title"
  | "meta_description"
  | "focus_keyword"
  | "updated_at"
>;

export type ServiceInput = {
  slug: string;
  title: string;
  description: string;
  content: string;
  icon: string;
  hero_headline: string;
  hero_description: string;
  overview_heading: string;
  process_heading: string;
  deliverables: string[];
  technologies: string[];
  process_steps: ServicePoint[];
  why_choose_us: ServiceWhyChooseUs | null;
  status: ServiceStatus;
  sort_order: number;
  meta_title: string;
  meta_description: string;
  focus_keyword: string;
  keywords: string[];
  faqs: ServiceFaq[];
};

export const slugify = sharedSlugify;

export function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function buildServiceContentHtml(seed: SeedService) {
  const overview = seed.overview
    .map((p) => `<p>${escapeHtml(p)}</p>`)
    .join("");

  return overview;
}

export function parseStringList(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value.map((item) => String(item ?? "").trim()).filter(Boolean);
}

export function parseFaqs(value: unknown): ServiceFaq[] {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => {
      if (!item || typeof item !== "object") return null;
      const question =
        "question" in item ? String(item.question ?? "").trim() : "";
      const answer = "answer" in item ? String(item.answer ?? "").trim() : "";
      if (!question || !answer) return null;
      return { question, answer };
    })
    .filter((item): item is ServiceFaq => Boolean(item));
}

function removeLegacyGeneratedSections(
  content: unknown,
  title: unknown
): string {
  if (typeof content !== "string" || typeof title !== "string" || !title) {
    return typeof content === "string" ? content : "";
  }

  const escapedTitle = escapeHtml(title);
  const benefitsHeading = `<h2>Why teams choose Ainovex for ${escapedTitle}</h2>`;
  const processHeading = `<h2>How we deliver ${escapedTitle}</h2>`;
  const benefitsStart = content.indexOf(benefitsHeading);
  if (benefitsStart === -1) return content;

  const processStart = content.indexOf(processHeading, benefitsStart);
  if (processStart === -1) return content;

  const processEnd = content.indexOf("</ol>", processStart);
  if (processEnd === -1) return content;

  return `${content.slice(0, benefitsStart)}${content
    .slice(processEnd + "</ol>".length)
    .replace(/^(?:<p><\/p>)+/i, "")}`;
}

function parseServicePoints(value: unknown): ServicePoint[] | null {
  if (!Array.isArray(value)) return null;
  return value
    .map((item) => {
      if (!item || typeof item !== "object") return null;
      const point = item as Record<string, unknown>;
      const title = String(point.title ?? "").trim();
      const description = String(point.description ?? "").trim();
      if (!title || !description) return null;
      return { title, description };
    })
    .filter((item): item is ServicePoint => Boolean(item));
}

function parseServiceWhyChooseUs(value: unknown): ServiceWhyChooseUs | null {
  if (!value || typeof value !== "object") return null;

  const section = value as Record<string, unknown>;
  const items = Array.isArray(section.items)
    ? section.items
        .map((item) => {
          if (!item || typeof item !== "object") return null;
          const reason = item as Record<string, unknown>;
          const title = String(reason.title ?? "").trim();
          const description = String(reason.description ?? "").trim();
          const icon = String(reason.icon ?? "").trim();
          if (!title || !description) return null;
          return { title, description, icon };
        })
        .filter((item): item is ServiceReason => Boolean(item))
    : [];

  return {
    eyebrow: String(section.eyebrow ?? "").trim(),
    heading: String(section.heading ?? "").trim(),
    description: String(section.description ?? "").trim(),
    cta_text: String(section.cta_text ?? "").trim(),
    cta_href: String(section.cta_href ?? "").trim(),
    items,
  };
}

export function normalizeService<T extends object>(
  row: T
): T & {
  faqs: ServiceFaq[];
  technologies: string[];
  keywords: string[];
  deliverables: string[];
  process_heading: string;
  process_steps: ServicePoint[];
  why_choose_us: ServiceWhyChooseUs | null;
} {
  const record = row as T & {
    faqs?: unknown;
    technologies?: unknown;
    keywords?: unknown;
    deliverables?: unknown;
    process_steps?: unknown;
    process_heading?: unknown;
    overview_heading?: unknown;
    why_choose_us?: unknown;
    content?: unknown;
    title?: unknown;
    slug?: unknown;
  };
  const seededService =
    typeof record.slug === "string"
      ? defaultServices.find((service) => service.slug === record.slug)
      : undefined;

  return {
    ...row,
    content: removeLegacyGeneratedSections(record.content, record.title),
    faqs: parseFaqs(record.faqs),
    technologies: parseStringList(record.technologies),
    keywords: parseStringList(record.keywords),
    deliverables: parseStringList(record.deliverables),
    overview_heading: String(
      record.overview_heading ??
        seededService?.overview_heading ??
        (typeof record.title === "string"
          ? `What you get with our ${record.title}`
          : "")
    ).trim(),
    process_heading: String(
      record.process_heading ??
        seededService?.process_heading ??
        "Our Delivery Process"
    ),
    process_steps:
      parseServicePoints(record.process_steps) ??
      seededService?.process_steps ??
      [],
    why_choose_us:
      parseServiceWhyChooseUs(record.why_choose_us) ??
      seededService?.why_choose_us ??
      null,
  };
}

const whyChooseIcons = [
  "/icons/why-us/proven.svg",
  "/icons/why-us/result.svg",
  "/icons/why-us/flexible.svg",
  "/icons/why-us/future.svg",
];

export function seedToServiceInput(
  seed: SeedService,
  index: number
): ServiceInput {
  return {
    slug: seed.slug,
    title: seed.title,
    description: seed.description,
    content: buildServiceContentHtml(seed),
    icon: seed.icon,
    hero_headline: seed.heroHeadline,
    hero_description: seed.heroDescription,
    overview_heading: `What you get with our ${seed.title}`,
    process_heading: "Our Delivery Process",
    deliverables: seed.deliverables,
    technologies: seed.technologies,
    process_steps: seed.process,
    why_choose_us: {
      eyebrow: "Why choose us",
      heading: `More Than Just ${seed.title}.`,
      description:
        "We pair thoughtful strategy with experienced delivery to build solutions that support your business goals and keep you moving forward.",
      cta_text: "Get Started",
      cta_href: "/contact-us#contact-form",
      items: seed.benefits.map((item, itemIndex) => ({
        ...item,
        icon: whyChooseIcons[itemIndex % whyChooseIcons.length],
      })),
    },
    status: "published",
    sort_order: index,
    meta_title: seed.metaTitle,
    meta_description: seed.metaDescription,
    focus_keyword: seed.keywords[0] || seed.title,
    keywords: seed.keywords,
    faqs: seed.faqs,
  };
}

export function seedToService(seed: SeedService, index: number): Service {
  const input = seedToServiceInput(seed, index);
  const now = new Date(0).toISOString();
  return {
    id: `seed-${seed.slug}`,
    ...input,
    created_by: null,
    created_at: now,
    updated_at: now,
  };
}

/** Static fallback used when Supabase has no published services yet. */
export const defaultServices: Service[] = serviceSeedRaw.map(seedToService);

/** @deprecated Prefer defaultServices / service queries */
export const services = defaultServices;

export function getAllServices() {
  return defaultServices;
}

export function getServiceBySlug(slug: string) {
  return defaultServices.find((service) => service.slug === slug) ?? null;
}

export function getRelatedServices(slug: string, limit = 3) {
  const current = serviceSeedRaw.find((item) => item.slug === slug);
  const preferred = current?.relatedSlugs ?? [];

  const related = preferred
    .map((relatedSlug) => getServiceBySlug(relatedSlug))
    .filter((item): item is Service => Boolean(item));

  if (related.length >= limit) return related.slice(0, limit);

  const extras = defaultServices.filter(
    (item) =>
      item.slug !== slug && !related.some((r) => r.slug === item.slug)
  );

  return [...related, ...extras].slice(0, limit);
}

export function getServiceCardProps(service: Pick<Service, "slug" | "icon" | "title" | "description">) {
  return {
    slug: service.slug,
    icon: service.icon,
    title: service.title,
    description: service.description,
    href: `/services/${service.slug}`,
  };
}

export function getDefaultServiceInputs(): ServiceInput[] {
  return serviceSeedRaw.map(seedToServiceInput);
}
