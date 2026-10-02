import type { Metadata } from "next";
import BlogHero from "@/app/components/sections/Blog/Hero";
import BlogListing from "@/app/components/sections/Blog/BlogListing";
import {
  getPublishedBlogs,
  getPublishedCategories,
} from "@/app/lib/blogQueries";

export const metadata: Metadata = {
  title: "Blog | Ainovex Technologies",
  description:
    "Notes from the build. Practical writing on AI, cloud, web development and design from the Ainovex team.",
  openGraph: {
    title: "Blog | Ainovex Technologies",
    description:
      "Practical writing on AI, cloud, web development and design from the Ainovex team.",
    type: "website",
  },
};

export const revalidate = 60;

export default async function BlogPage() {
  const [posts, categories] = await Promise.all([
    getPublishedBlogs(),
    getPublishedCategories(),
  ]);

  return (
    <>
      <BlogHero total={posts.length} />
      <BlogListing posts={posts} categories={categories} />
    </>
  );
}
