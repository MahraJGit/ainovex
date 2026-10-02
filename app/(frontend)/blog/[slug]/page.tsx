import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import BlogFaqs from "@/app/components/sections/Blog/BlogFaqs";
import TableOfContents from "@/app/components/sections/Blog/TableOfContents";
import ReadingProgress from "@/app/components/sections/Blog/ReadingProgress";
import BlogCard from "@/app/components/ui/BlogCard";
import {
  extractToc,
  injectHeadingIds,
  readingTimeMinutes,
} from "@/app/lib/blogs";
import {
  getPublishedBlogBySlug,
  getPublishedBlogs,
  getRelatedBlogs,
} from "@/app/lib/blogQueries";
import { formatDate } from "@/app/lib/libFormat";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export const revalidate = 60;

export async function generateStaticParams() {
  const blogs = await getPublishedBlogs();
  return blogs.map((blog) => ({ slug: blog.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const blog = await getPublishedBlogBySlug(slug);
  if (!blog) {
    return { title: "Article not found | Ainovex" };
  }

  const title = blog.meta_title || blog.title;
  const description =
    blog.meta_description || blog.excerpt || "Read more on the Ainovex blog.";
  const image = blog.featured_image || undefined;
  const keywords = [blog.focus_keyword, ...blog.tags, blog.category].filter(
    Boolean
  );

  return {
    title: `${title} | Ainovex`,
    description,
    keywords: keywords.length ? keywords : undefined,
    authors: [{ name: blog.author }],
    alternates: {
      canonical: `/blog/${blog.slug}`,
    },
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime: blog.published_at || blog.created_at,
      modifiedTime: blog.updated_at,
      authors: [blog.author],
      tags: blog.tags,
      images: image
        ? [{ url: image, alt: blog.featured_image_alt || title }]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: image ? [image] : undefined,
    },
  };
}

export default async function BlogDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const blog = await getPublishedBlogBySlug(slug);
  if (!blog) notFound();

  const contentHtml = injectHeadingIds(blog.content);
  const toc = extractToc(contentHtml);
  const related = await getRelatedBlogs(blog.slug, blog.category, 3);
  const minutes = readingTimeMinutes(blog.content);
  const published = blog.published_at || blog.created_at;
  const hasImage = Boolean(blog.featured_image?.trim());
  const authorInitials = blog.author
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: blog.meta_title || blog.title,
    description: blog.meta_description || blog.excerpt,
    image: blog.featured_image || undefined,
    datePublished: published,
    dateModified: blog.updated_at,
    author: {
      "@type": "Person",
      name: blog.author,
    },
    publisher: {
      "@type": "Organization",
      name: "Ainovex Technologies",
    },
    keywords: [blog.focus_keyword, ...blog.tags].filter(Boolean).join(", "),
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `/blog/${blog.slug}`,
    },
  };

  const faqLd =
    blog.faqs.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: blog.faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: faq.answer,
            },
          })),
        }
      : null;

  const shell = "relative z-10 mx-auto w-full max-w-[1280px] px-4";

  return (
    <article className="bg-white" data-blog-article>
      <ReadingProgress />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }}
      />
      {faqLd ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
        />
      ) : null}

      <header className="relative overflow-hidden bg-[#05080F]">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 70% 55% at 50% -15%, rgba(56,189,248,0.3), transparent 60%)",
          }}
        />
        <div className={`${shell} pt-36 pb-14 lg:pt-40 lg:pb-16`}>
          <div className="text-center">
            <nav className="mb-7 flex flex-wrap items-center justify-center gap-2 text-[13px] text-white/50">
              <Link href="/" className="transition hover:text-primary">
                Home
              </Link>
              <span>/</span>
              <Link href="/blog" className="transition hover:text-primary">
                Blog
              </Link>
              <span>/</span>
              <span className="truncate text-white/70">{blog.category}</span>
            </nav>

            <div className="mb-5 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-[12px] font-semibold uppercase tracking-[0.08em] text-white/65">
              <span className="rounded-full bg-primary px-3 py-1.5 text-white">
                {blog.category}
              </span>
              <time dateTime={published}>{formatDate(published)}</time>
              <span className="text-white/25">•</span>
              <span>{minutes} min read</span>
            </div>

            <h1 className="mx-auto max-w-[900px] text-[34px] font-bold leading-[1.12] tracking-[-0.03em] text-white sm:text-[44px] lg:text-[52px]">
              {blog.title}
            </h1>

            {blog.excerpt ? (
              <p className="mx-auto mt-5 max-w-[720px] text-[16px] leading-relaxed text-white/70 sm:text-[18px]">
                {blog.excerpt}
              </p>
            ) : null}

            <p className="mt-6 text-[14px] text-white/50">By {blog.author}</p>
          </div>
        </div>
      </header>

      <div className={`${shell} py-10 lg:py-14`}>
        {hasImage ? (
          <div className="relative mb-10 aspect-[21/9] w-full overflow-hidden rounded-[20px] shadow-[0_16px_50px_rgba(0,0,0,0.1)] sm:aspect-[2.2/1]">
            <Image
              src={blog.featured_image}
              alt={blog.featured_image_alt || blog.title}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1280px) 100vw, 1280px"
            />
          </div>
        ) : null}

        {toc.length > 0 ? (
          <div className="mb-10">
            <TableOfContents items={toc} variant="inline" />
          </div>
        ) : null}

        <div
          className="blog-content"
          dangerouslySetInnerHTML={{ __html: contentHtml }}
        />

        {blog.tags.length > 0 ? (
          <div className="mt-12 flex flex-wrap gap-2 border-t border-black-v1/10 pt-8">
            {blog.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-black-v1/10 bg-[#F8FAFC] px-3.5 py-1.5 text-[12px] font-semibold text-black-v1/70"
              >
                #{tag}
              </span>
            ))}
          </div>
        ) : null}

        <div className="mt-8 flex items-center gap-4 rounded-2xl border border-black-v1/10 bg-[#F8FAFC] p-5">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#05080F] text-[14px] font-bold text-white">
            {authorInitials}
          </div>
          <div>
            <p className="text-[12px] font-bold uppercase tracking-[0.12em] text-black-v1/40">
              Written by
            </p>
            <p className="mt-0.5 text-[16px] font-semibold text-black-v1">
              {blog.author}
            </p>
          </div>
        </div>

        <BlogFaqs faqs={blog.faqs} />

        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-black-v1/10 pt-8">
          <Link
            href="/blog"
            className="inline-flex cursor-pointer items-center gap-2 text-[13px] font-bold uppercase tracking-[0.1em] text-primary hover:underline"
          >
            ← Back to blog
          </Link>
          <p className="text-[13px] text-black-v1/45">
            Updated {formatDate(blog.updated_at)}
          </p>
        </div>

        {related.length > 0 ? (
          <section className="mt-16 w-full border-t border-black-v1/10 pt-14 lg:mt-20">
            <h2 className="mb-8 text-[28px] font-bold text-black-v1">
              Related <span className="text-primary">articles</span>
            </h2>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item) => (
                <BlogCard
                  key={item.id}
                  slug={item.slug}
                  image={item.featured_image || "/icons/blogs/ai.svg"}
                  title={item.title}
                  excerpt={item.excerpt}
                  date={item.published_at || item.created_at}
                  category={item.category}
                  variant="light"
                />
              ))}
            </div>
          </section>
        ) : null}
      </div>
    </article>
  );
}
