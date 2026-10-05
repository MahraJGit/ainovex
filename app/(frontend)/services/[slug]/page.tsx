import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ServiceDetailContent from "@/app/components/sections/Services/ServiceDetailContent";
import ServiceDetailHero from "@/app/components/sections/Services/ServiceDetailHero";
import {
  getAllServiceSlugs,
  getPublishedServiceBySlug,
  getRelatedServices,
} from "@/app/lib/serviceQueries";
import { absoluteUrl, siteConfig } from "@/app/lib/site";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export const revalidate = 60;

export async function generateStaticParams() {
  const slugs = await getAllServiceSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = await getPublishedServiceBySlug(slug);

  if (!service) {
    return { title: `Service not found | ${siteConfig.shortName}` };
  }

  const title = `${service.meta_title || service.title} | ${siteConfig.name}`;
  const description = service.meta_description || service.description;
  const url = absoluteUrl(`/services/${service.slug}`);
  const keywords = [
    service.focus_keyword,
    ...service.keywords,
  ].filter(Boolean);

  return {
    title,
    description,
    keywords: keywords.length ? keywords : undefined,
    alternates: {
      canonical: `/services/${service.slug}`,
    },
    openGraph: {
      title: service.meta_title || service.title,
      description,
      type: "website",
      url,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      images: service.icon
        ? [
            {
              url: absoluteUrl(service.icon),
              alt: `${service.title} | ${siteConfig.name}`,
            },
          ]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: service.meta_title || service.title,
      description,
      images: service.icon ? [absoluteUrl(service.icon)] : undefined,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
  };
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const service = await getPublishedServiceBySlug(slug);
  if (!service) notFound();

  const related = await getRelatedServices(service.slug, 3);
  const pageUrl = absoluteUrl(`/services/${service.slug}`);

  const serviceLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.meta_description || service.description,
    url: pageUrl,
    image: service.icon ? absoluteUrl(service.icon) : undefined,
    provider: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
      email: siteConfig.email,
    },
    areaServed: "Worldwide",
    serviceType: service.title,
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: absoluteUrl("/"),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Services",
        item: absoluteUrl("/services"),
      },
      {
        "@type": "ListItem",
        position: 3,
        name: service.title,
        item: pageUrl,
      },
    ],
  };

  const faqLd =
    service.faqs.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: service.faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: faq.answer,
            },
          })),
        }
      : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      {faqLd ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
        />
      ) : null}

      <ServiceDetailHero
        title={service.title}
        headline={service.hero_headline || service.title}
        description={service.hero_description || service.description}
        icon={service.icon}
      />
      <ServiceDetailContent service={service} related={related} />
    </>
  );
}
