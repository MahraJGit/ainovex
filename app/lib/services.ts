import { serviceSeedRaw, type SeedService } from "@/app/lib/serviceSeed";
import { slugify as sharedSlugify } from "@/app/lib/blogs";

export type ServiceStatus = "draft" | "published" | "archived";

export type ServiceFaq = {
  question: string;
  answer: string;
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
  deliverables: string[];
  technologies: string[];
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
  deliverables: string[];
  technologies: string[];
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

  const benefits = seed.benefits
    .map(
      (item) =>
        `<li><strong>${escapeHtml(item.title)}</strong> — ${escapeHtml(item.description)}</li>`
    )
    .join("");

  const process = seed.process
    .map(
      (item) =>
        `<li><strong>${escapeHtml(item.title)}</strong> — ${escapeHtml(item.description)}</li>`
    )
    .join("");

  return [
    overview,
    `<h2>Why teams choose Ainovex for ${escapeHtml(seed.title)}</h2>`,
    `<ul>${benefits}</ul>`,
    `<h2>How we deliver ${escapeHtml(seed.title)}</h2>`,
    `<ol>${process}</ol>`,
  ].join("");
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

export function normalizeService<T extends object>(
  row: T
): T & {
  faqs: ServiceFaq[];
  technologies: string[];
  keywords: string[];
  deliverables: string[];
} {
  const record = row as T & {
    faqs?: unknown;
    technologies?: unknown;
    keywords?: unknown;
    deliverables?: unknown;
  };

  return {
    ...row,
    faqs: parseFaqs(record.faqs),
    technologies: parseStringList(record.technologies),
    keywords: parseStringList(record.keywords),
    deliverables: parseStringList(record.deliverables),
  };
}

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
    deliverables: seed.deliverables,
    technologies: seed.technologies,
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
