import type { Metadata } from "next";
import BlogsManager from "@/app/components/admin/BlogsManager";

export const metadata: Metadata = {
  title: "Manage Blogs | Ainovex Admin",
  robots: { index: false, follow: false },
};

export default function AdminBlogsPage() {
  return <BlogsManager />;
}
