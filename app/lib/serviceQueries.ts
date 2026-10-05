import { getSupabaseServerClient } from "@/app/lib/supabase/server";
import {
  defaultServices,
  getRelatedServices as getRelatedFromSeed,
  normalizeService,
  type Service,
  type ServiceListItem,
} from "@/app/lib/services";

const LIST_COLUMNS =
  "id, slug, title, description, icon, status, sort_order, meta_title, meta_description, focus_keyword, updated_at";

function sortServices<T extends { sort_order: number; title: string }>(
  items: T[]
) {
  return [...items].sort((a, b) => {
    if (a.sort_order !== b.sort_order) return a.sort_order - b.sort_order;
    return a.title.localeCompare(b.title);
  });
}

export async function getPublishedServices(): Promise<ServiceListItem[]> {
  try {
    const supabase = getSupabaseServerClient();
    const { data, error } = await supabase
      .from("services")
      .select(LIST_COLUMNS)
      .eq("status", "published")
      .order("sort_order", { ascending: true })
      .order("title", { ascending: true });

    if (error) {
      console.error("getPublishedServices:", error.message);
      return sortServices(defaultServices);
    }

    const rows = (data ?? []).map(
      (row) => normalizeService(row) as ServiceListItem
    );
    return rows.length > 0 ? rows : sortServices(defaultServices);
  } catch (error) {
    console.error("getPublishedServices:", error);
    return sortServices(defaultServices);
  }
}

export async function getPublishedServiceBySlug(
  slug: string
): Promise<Service | null> {
  try {
    const supabase = getSupabaseServerClient();
    const { data, error } = await supabase
      .from("services")
      .select("*")
      .eq("slug", slug)
      .eq("status", "published")
      .maybeSingle();

    if (error) {
      console.error("getPublishedServiceBySlug:", error.message);
      return defaultServices.find((item) => item.slug === slug) ?? null;
    }

    if (data) return normalizeService(data as Service);

    return defaultServices.find((item) => item.slug === slug) ?? null;
  } catch (error) {
    console.error("getPublishedServiceBySlug:", error);
    return defaultServices.find((item) => item.slug === slug) ?? null;
  }
}

export async function getRelatedServices(
  slug: string,
  limit = 3
): Promise<ServiceListItem[]> {
  try {
    const supabase = getSupabaseServerClient();
    const { data, error } = await supabase
      .from("services")
      .select(LIST_COLUMNS)
      .eq("status", "published")
      .neq("slug", slug)
      .order("sort_order", { ascending: true })
      .limit(limit);

    if (error) {
      console.error("getRelatedServices:", error.message);
      return getRelatedFromSeed(slug, limit);
    }

    const rows = (data ?? []).map(
      (row) => normalizeService(row) as ServiceListItem
    );
    return rows.length > 0 ? rows : getRelatedFromSeed(slug, limit);
  } catch (error) {
    console.error("getRelatedServices:", error);
    return getRelatedFromSeed(slug, limit);
  }
}

export async function getAllServiceSlugs(): Promise<string[]> {
  const services = await getPublishedServices();
  return services.map((service) => service.slug);
}
