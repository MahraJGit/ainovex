import type { Metadata } from "next";
import ServiceForm from "@/app/components/admin/ServiceForm";

export const metadata: Metadata = {
  title: "New Service | Ainovex Admin",
  robots: { index: false, follow: false },
};

export default function AdminNewServicePage() {
  return <ServiceForm mode="create" />;
}
