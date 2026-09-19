import type { Metadata } from "next";
import BlogHero from "@/app/components/sections/Blog/Hero";
import BlogListing from "@/app/components/sections/Blog/BlogListing";
import { posts } from "@/app/lib/post";

export const metadata: Metadata = {
  title: "Blog | Ainovex Technologies",
  description:
    "Notes from the build. Practical writing on AI, cloud, web development and design from the Ainovex team.",
};

export default function BlogPage() {
  const sorted = [...posts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <>
      <BlogHero total={sorted.length} />
      <BlogListing posts={sorted} />
    </>
  );
}