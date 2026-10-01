export type AdminService = {
  id: string;
  title: string;
  description: string;
  icon: string;
};

export const ICON_OPTIONS = [
  { label: "Web Development", value: "/icons/services/webdev.svg" },
  { label: "Mobile Development", value: "/icons/services/mobdev.svg" },
  { label: "UI/UX Design", value: "/icons/services/uiux.svg" },
  { label: "Ecommerce", value: "/icons/services/ecommerce.svg" },
  { label: "AI Development", value: "/icons/services/aidev.svg" },
  { label: "Cloud & DevOps", value: "/icons/services/cloud.svg" },
] as const;

export function createServiceId() {
  return `svc_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

export function seedAdminServices(
  items: { title: string; description: string; icon: string }[]
): AdminService[] {
  return items.map((item, index) => ({
    id: `svc_seed_${index + 1}`,
    title: item.title,
    description: item.description,
    icon: item.icon,
  }));
}
