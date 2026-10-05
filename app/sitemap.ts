import type { MetadataRoute } from "next";
import { getPublishedServices } from "@/app/lib/serviceQueries";
import { absoluteUrl } from "@/app/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const services = await getPublishedServices();

  const staticRoutes: MetadataRoute.Sitemap = [
    "",
    "/services",
    "/about-us",
    "/careers",
    "/contact-us",
    "/blog",
    "/privacy-policy",
    "/terms-and-conditions",
  ].map((path) => ({
    url: absoluteUrl(path || "/"),
    lastModified: now,
    changeFrequency: path === "" || path === "/services" ? "weekly" : "monthly",
    priority: path === "" ? 1 : path === "/services" ? 0.9 : 0.7,
  }));

  const serviceRoutes: MetadataRoute.Sitemap = services.map((service) => ({
    url: absoluteUrl(`/services/${service.slug}`),
    lastModified: service.updated_at
      ? new Date(service.updated_at)
      : now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...staticRoutes, ...serviceRoutes];
}
