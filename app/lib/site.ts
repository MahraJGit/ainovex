export const siteConfig = {
  name: "Ainovex Technologies",
  shortName: "Ainovex",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://ainovex.com",
  description:
    "Ainovex Technologies builds AI-powered websites, apps, and digital systems that help businesses grow, compete, and scale.",
  email: "info@ainovex.com",
  locale: "en_US",
} as const;

export function absoluteUrl(path = "/") {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${siteConfig.url}${normalized === "/" ? "" : normalized}`;
}
