export interface Post {
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  date: string;        // ISO date
  readTime: number;    // minutes
  image: string;
  author: { name: string; role: string; avatar: string };
  featured?: boolean;
}

export const categories = [
  "All",
  "AI & Automation",
  "Web Development",
  "Cloud",
  "Design",
  "Engineering Culture",
] as const;

export const posts: Post[] = [
  {
    slug: "shipping-ai-features-without-breaking-trust",
    category: "AI & Automation",
    title: "Shipping AI Features Without Breaking User Trust",
    excerpt:
      "Every team wants an AI feature on the roadmap. The hard part is not the model, it is designing the moments where it is wrong and the user still stays with you.",
    date: "2026-09-15",
    readTime: 8,
    image: "/icons/blog/ai.svg",
    author: { name: "Ainovex Team", role: "Engineering", avatar: "/images/blog/authors/team.png" },
    featured: true,
  },
  {
    slug: "cutting-cloud-spend-without-cutting-corners",
    category: "Cloud",
    title: "Cutting Cloud Spend Without Cutting Corners",
    excerpt:
      "We reduced one client's monthly bill by 41 percent without touching a single feature. Here is the audit we run, step by step.",
    date: "2026-09-11",
    readTime: 6,
    image: "/icons/blog/ai.svg",
    author: { name: "Ainovex Team", role: "Cloud", avatar: "/images/blog/authors/team.png" },
  },
  {
    slug: "design-systems-that-survive-handoff",
    category: "Design",
    title: "Design Systems That Actually Survive Handoff",
    excerpt:
      "Most systems die in the gap between Figma and production. The fix is boring, and it starts with naming things once.",
    date: "2026-09-09",
    readTime: 7,
    image: "/icons/blog/ai.svg",
    author: { name: "Ainovex Team", role: "Design", avatar: "/images/blog/authors/team.png" },
  },
  {
    slug: "server-components-in-production",
    category: "Web Development",
    title: "A Year of React Server Components in Production",
    excerpt:
      "What got faster, what got harder, and the three patterns we now reach for on every new build.",
    date: "2026-09-02",
    readTime: 10,
    image: "/icons/blog/ai.svg",
    author: { name: "Ainovex Team", role: "Engineering", avatar: "/images/blog/authors/team.png" },
  },
  {
    slug: "code-review-culture",
    category: "Engineering Culture",
    title: "The Code Review Culture We Wish We Started With",
    excerpt:
      "Reviews are where standards are taught, not enforced. Small changes to how we comment changed how fast we ship.",
    date: "2026-08-26",
    readTime: 5,
    image: "/icons/blog/ai.svg",
    author: { name: "Ainovex Team", role: "Engineering", avatar: "/images/blog/authors/team.png" },
  },
  {
    slug: "automating-back-office-workflows",
    category: "AI & Automation",
    title: "Automating Back Office Work Nobody Wants To Do",
    excerpt:
      "Invoices, onboarding, reconciliation. The unglamorous workflows where automation pays for itself in weeks.",
    date: "2026-08-19",
    readTime: 6,
    image: "/icons/blog/ai.svg",
    author: { name: "Ainovex Team", role: "Automation", avatar: "/images/blog/authors/team.png" },
  },
];