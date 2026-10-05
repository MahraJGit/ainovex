import type { Metadata } from "next";
import Industries from "@/app/components/sections/common/Industries";
import SuccessStories from "@/app/components/sections/Services/SuccessStories";
import Hero from "@/app/components/sections/Services/Hero";
import HowWeWork from "@/app/components/sections/common/HowweWork";
import OurServices from "@/app/components/sections/Services/OurServices";
import MeetOurTeam from "@/app/components/sections/common/OurTeam";
import TrustedPartners from "@/app/components/sections/Services/Partners";
import CTABanner from "@/app/components/sections/common/CTAbanner";
import { getPublishedServices } from "@/app/lib/serviceQueries";
import { absoluteUrl, siteConfig } from "@/app/lib/site";

const title = `IT & Digital Services | ${siteConfig.name}`;
const description =
  "Explore Ainovex services across web development, mobile apps, UI/UX, AI, ecommerce, cloud, cybersecurity, and custom software — built to help businesses grow.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "IT services",
    "web development services",
    "mobile app development",
    "AI development",
    "UI UX design",
    "digital marketing",
    "Ainovex Technologies",
  ],
  alternates: {
    canonical: "/services",
  },
  openGraph: {
    title,
    description,
    type: "website",
    url: absoluteUrl("/services"),
    siteName: siteConfig.name,
    locale: siteConfig.locale,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
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

export const revalidate = 60;

export default async function ServicesPage() {
  const services = await getPublishedServices();

  const itemListLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: title,
    description,
    url: absoluteUrl("/services"),
    isPartOf: {
      "@type": "WebSite",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: services.map((service, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: service.title,
        url: absoluteUrl(`/services/${service.slug}`),
        description: service.description,
      })),
    },
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
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />

      <Hero />
      <OurServices />
      <Industries />
      <HowWeWork />
      <SuccessStories />
      <MeetOurTeam />
      <TrustedPartners />
      <CTABanner
        heading={
          <>
            Your Next <span className="text-primary">Level</span> is One Click
            Away
          </>
        }
        description="Tell us about your business and get a tailored growth strategy delivered straight to your inbox."
        buttonText="Book My Free Call"
        href="/contact-us#connect-with-team"
      />
    </>
  );
}
