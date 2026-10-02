import type { Metadata } from "next";
import BlogForm from "@/app/components/admin/BlogForm";

export const metadata: Metadata = {
  title: "Edit Blog | Ainovex Admin",
  robots: { index: false, follow: false },
};

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function AdminEditBlogPage({ params }: PageProps) {
  const { id } = await params;
  return <BlogForm mode="edit" blogId={id} />;
}
