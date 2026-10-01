import type { Metadata } from "next";
import ServicesManager from "@/app/components/admin/ServicesManager";

export const metadata: Metadata = {
  title: "Manage Services | Ainovex Admin",
  robots: { index: false, follow: false },
};

export default function AdminServicesPage() {
  return <ServicesManager />;
}
