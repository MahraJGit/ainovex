import { getSupabaseServerClient } from "@/app/lib/supabase/server";
import {
  normalizeBlog,
  type Blog,
  type BlogListItem,
} from "@/app/lib/blogs";

const LIST_COLUMNS =
  "id, slug, title, excerpt, featured_image, featured_image_alt, author, category, tags, status, published_at, created_at, meta_title, meta_description, focus_keyword";

export async function getPublishedBlogs(): Promise<BlogListItem[]> {
  const supabase = getSupabaseServerClient();
  const { data, error } = await supabase
    .from("blogs")
    .select(LIST_COLUMNS)
    .eq("status", "published")
    .order("published_at", { ascending: false, nullsFirst: false });

  if (error) {
    console.error("getPublishedBlogs:", error.message);
    return [];
  }

  return (data ?? []).map((row) => normalizeBlog(row as BlogListItem));
}

export async function getPublishedBlogBySlug(
  slug: string
): Promise<Blog | null> {
  const supabase = getSupabaseServerClient();
  const { data, error } = await supabase
    .from("blogs")
    .select("*")
    .eq("slug", slug)
    .eq("status", "published")
    .maybeSingle();

  if (error) {
    console.error("getPublishedBlogBySlug:", error.message);
    return null;
  }

  return data ? normalizeBlog(data as Blog) : null;
}

export async function getPublishedCategories(): Promise<string[]> {
  const blogs = await getPublishedBlogs();
  const set = new Set<string>();
  for (const blog of blogs) {
    if (blog.category?.trim()) set.add(blog.category.trim());
  }
  return Array.from(set).sort((a, b) => a.localeCompare(b));
}

export async function getRelatedBlogs(
  slug: string,
  category: string,
  limit = 3
): Promise<BlogListItem[]> {
  const supabase = getSupabaseServerClient();
  const { data, error } = await supabase
    .from("blogs")
    .select(LIST_COLUMNS)
    .eq("status", "published")
    .eq("category", category)
    .neq("slug", slug)
    .order("published_at", { ascending: false, nullsFirst: false })
    .limit(limit);

  if (error) {
    console.error("getRelatedBlogs:", error.message);
    return [];
  }

  return (data ?? []).map((row) => normalizeBlog(row as BlogListItem));
}
