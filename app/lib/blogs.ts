export type BlogStatus = "draft" | "published" | "archived";

export type BlogFaq = {
  question: string;
  answer: string;
};

export type Blog = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  featured_image: string;
  featured_image_alt: string;
  author: string;
  category: string;
  tags: string[];
  status: BlogStatus;
  published_at: string | null;
  created_by: string | null;
  created_at: string;
  updated_at: string;
  meta_title: string;
  meta_description: string;
  focus_keyword: string;
  faqs: BlogFaq[];
};

export type BlogListItem = Pick<
  Blog,
  | "id"
  | "slug"
  | "title"
  | "excerpt"
  | "featured_image"
  | "featured_image_alt"
  | "author"
  | "category"
  | "tags"
  | "status"
  | "published_at"
  | "created_at"
  | "meta_title"
  | "meta_description"
  | "focus_keyword"
>;

export type BlogInput = {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  featured_image: string;
  featured_image_alt: string;
  author: string;
  category: string;
  tags: string[];
  status: BlogStatus;
  published_at: string | null;
  meta_title: string;
  meta_description: string;
  focus_keyword: string;
  faqs: BlogFaq[];
};

export const BLOG_CATEGORIES = [
  "AI & Automation",
  "Web Development",
  "Cloud",
  "Design",
  "Engineering Culture",
  "Product",
  "General",
] as const;

export function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-");
}

export function parseFaqs(value: unknown): BlogFaq[] {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => {
      if (!item || typeof item !== "object") return null;
      const q = "question" in item ? String(item.question ?? "").trim() : "";
      const a = "answer" in item ? String(item.answer ?? "").trim() : "";
      if (!q || !a) return null;
      return { question: q, answer: a };
    })
    .filter((item): item is BlogFaq => Boolean(item));
}

export function normalizeBlog<T extends { faqs?: unknown; tags?: unknown }>(
  row: T
): T & { faqs: BlogFaq[]; tags: string[] } {
  return {
    ...row,
    faqs: parseFaqs(row.faqs),
    tags: Array.isArray(row.tags)
      ? row.tags.map((t) => String(t).trim()).filter(Boolean)
      : [],
  };
}

export type TocItem = {
  id: string;
  text: string;
  level: 1 | 2 | 3;
};

export function extractToc(html: string): TocItem[] {
  if (!html) return [];
  const headingRegex = /<h([1-3])([^>]*)>([\s\S]*?)<\/h\1>/gi;
  const items: TocItem[] = [];
  const usedIds = new Set<string>();
  let match: RegExpExecArray | null;

  while ((match = headingRegex.exec(html)) !== null) {
    const level = Number(match[1]) as 1 | 2 | 3;
    const attrs = match[2] ?? "";
    const inner = match[3] ?? "";
    const text = inner.replace(/<[^>]+>/g, "").trim();
    if (!text) continue;

    const idFromAttr = attrs.match(/\sid=["']([^"']+)["']/i)?.[1];
    let id = idFromAttr || slugify(text) || `section-${items.length + 1}`;
    let unique = id;
    let i = 2;
    while (usedIds.has(unique)) {
      unique = `${id}-${i}`;
      i += 1;
    }
    usedIds.add(unique);
    items.push({ id: unique, text, level });
  }

  return items;
}

export function injectHeadingIds(html: string): string {
  if (!html) return "";
  const usedIds = new Set<string>();

  return html.replace(
    /<h([1-3])([^>]*)>([\s\S]*?)<\/h\1>/gi,
    (full, level, attrs, inner) => {
      const text = String(inner).replace(/<[^>]+>/g, "").trim();
      const existing = String(attrs).match(/\sid=["']([^"']+)["']/i)?.[1];
      let id = existing || slugify(text) || `section-${usedIds.size + 1}`;
      let unique = id;
      let i = 2;
      while (usedIds.has(unique)) {
        unique = `${id}-${i}`;
        i += 1;
      }
      usedIds.add(unique);

      if (/\sid=/i.test(attrs)) {
        return `<h${level}${String(attrs).replace(/\sid=["'][^"']*["']/i, ` id="${unique}"`)}>${inner}</h${level}>`;
      }
      return `<h${level}${attrs} id="${unique}">${inner}</h${level}>`;
    }
  );
}

export function readingTimeMinutes(html: string) {
  const text = html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  const words = text ? text.split(" ").length : 0;
  return Math.max(1, Math.ceil(words / 200));
}
