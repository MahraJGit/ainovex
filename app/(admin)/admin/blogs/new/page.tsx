import type { Metadata } from "next";
import BlogForm from "@/app/components/admin/BlogForm";

export const metadata: Metadata = {
  title: "New Blog | Ainovex Admin",
  robots: { index: false, follow: false },
};

export default function AdminNewBlogPage() {
  return <BlogForm mode="create" />;
}
