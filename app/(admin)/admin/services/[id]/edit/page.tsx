import type { Metadata } from "next";
import ServiceForm from "@/app/components/admin/ServiceForm";

export const metadata: Metadata = {
  title: "Edit Service | Ainovex Admin",
  robots: { index: false, follow: false },
};

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function AdminEditServicePage({ params }: PageProps) {
  const { id } = await params;
  return <ServiceForm mode="edit" serviceId={id} />;
}
