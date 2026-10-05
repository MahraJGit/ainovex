export type SeedFaq = {
  question: string;
  answer: string;
};

export type SeedPoint = {
  title: string;
  description: string;
};

export type SeedService = {
  slug: string;
  title: string;
  description: string;
  icon: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  heroHeadline: string;
  heroDescription: string;
  overview: string[];
  benefits: SeedPoint[];
  process: SeedPoint[];
  deliverables: string[];
  technologies: string[];
  faqs: SeedFaq[];
  relatedSlugs: string[];
};

function service(
  data: Omit<SeedService, "metaTitle" | "metaDescription"> & {
    metaTitle?: string;
    metaDescription?: string;
  }
): SeedService {
  return {
    ...data,
    metaTitle: data.metaTitle ?? `${data.title} Services`,
    metaDescription: data.metaDescription ?? data.description,
  };
}

export const serviceSeedRaw = [
  service({
    slug: "web-development",
    icon: "/icons/services/webdev.svg",
    title: "Web Development",
    description:
      "From landing pages to enterprise portals, we build custom websites that load fast, rank higher, and convert visitors into paying customers.",
    keywords: [
      "web development",
      "custom website development",
      "Next.js development",
      "responsive websites",
      "Ainovex",
    ],
    heroHeadline: "Websites Built to Perform, Rank, and Convert",
    heroDescription:
      "We design and engineer modern websites that feel fast, look sharp, and turn traffic into measurable business results.",
    overview: [
      "Your website is often the first sales conversation your brand has. We build it to load quickly, communicate clearly, and guide visitors toward action — whether that means booking a call, requesting a quote, or making a purchase.",
      "From marketing sites and product platforms to internal portals, our team combines clean UI, solid engineering, and SEO foundations so your site works as a growth channel, not just a digital brochure.",
    ],
    benefits: [
      {
        title: "Conversion-focused UX",
        description:
          "Clear information architecture, persuasive sections, and frictionless CTAs designed around how buyers actually decide.",
      },
      {
        title: "Performance by default",
        description:
          "Optimized assets, modern rendering patterns, and Core Web Vitals-minded builds that keep bounce rates down.",
      },
      {
        title: "SEO-ready structure",
        description:
          "Semantic markup, metadata, and crawlable content patterns that help pages rank and get discovered.",
      },
      {
        title: "Scalable architecture",
        description:
          "Codebases built to grow — new pages, integrations, and campaigns without rewriting everything later.",
      },
    ],
    process: [
      {
        title: "Discovery & strategy",
        description:
          "We map goals, audiences, competitors, and conversion paths before a single screen is designed.",
      },
      {
        title: "Design & prototyping",
        description:
          "Wireframes and UI designs establish hierarchy, messaging, and the user journey.",
      },
      {
        title: "Development & integrations",
        description:
          "We build with modern frameworks, connect CMS/CRM/analytics, and keep the stack maintainable.",
      },
      {
        title: "Launch & iteration",
        description:
          "QA, SEO checks, deployment, and post-launch improvements based on real traffic and feedback.",
      },
    ],
    deliverables: [
      "Custom responsive website",
      "Component-based UI system",
      "CMS or admin-ready content structure",
      "Analytics and form integrations",
      "SEO metadata and technical foundations",
      "Launch support and handover docs",
    ],
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Supabase",
      "Vercel",
      "WordPress",
    ],
    faqs: [
      {
        question: "How long does a custom website usually take?",
        answer:
          "Most marketing websites take 3–8 weeks depending on page count, integrations, and content readiness. Larger platforms can take longer and are scoped after discovery.",
      },
      {
        question: "Will my website be mobile-friendly and SEO-ready?",
        answer:
          "Yes. Every site we ship is responsive, accessible by default, and structured with metadata, headings, and performance practices that support SEO.",
      },
      {
        question: "Can you redesign or rebuild an existing website?",
        answer:
          "Absolutely. We can modernize design, improve performance, migrate content, and rebuild on a cleaner stack without losing what already works.",
      },
    ],
    relatedSlugs: ["ui-ux-design", "ecommerce-solutions", "digital-marketing"],
  }),
  service({
    slug: "mobile-app-development",
    icon: "/icons/services/mobdev.svg",
    title: "Mobile App Development",
    description:
      "We build native and cross-platform apps for iOS and Android that deliver smooth user experiences and keep customers coming back.",
    keywords: [
      "mobile app development",
      "iOS app development",
      "Android app development",
      "React Native",
      "Flutter apps",
    ],
    heroHeadline: "Mobile Apps Users Love to Open Again",
    heroDescription:
      "From MVP to production-scale products, we build apps that feel native, stay stable, and support real business workflows.",
    overview: [
      "Great apps are not just feature lists — they are products people trust enough to keep using. We help you define the right scope, ship a polished experience, and build the backend that keeps everything reliable.",
      "Whether you need a customer-facing product, an internal operations app, or a marketplace experience, we design for clarity, speed, and retention.",
    ],
    benefits: [
      {
        title: "Native feel, cross-platform efficiency",
        description:
          "Ship on iOS and Android with shared code where it makes sense, without sacrificing UX quality.",
      },
      {
        title: "Product thinking baked in",
        description:
          "We prioritize onboarding, retention loops, and the workflows that make an app worth downloading.",
      },
      {
        title: "Secure backend foundations",
        description:
          "Auth, APIs, notifications, and data models designed for growth and maintainability.",
      },
      {
        title: "Store-ready delivery",
        description:
          "Testing, release pipelines, and App Store / Play Store launch support included in the process.",
      },
    ],
    process: [
      {
        title: "Product discovery",
        description:
          "Clarify users, MVP scope, platforms, and success metrics before engineering begins.",
      },
      {
        title: "UX & visual design",
        description:
          "Flows, wireframes, and high-fidelity screens that make complex actions feel simple.",
      },
      {
        title: "App & API development",
        description:
          "Frontend, backend, and third-party integrations built in iterative milestones.",
      },
      {
        title: "QA, launch & support",
        description:
          "Device testing, store submission, monitoring, and ongoing feature releases.",
      },
    ],
    deliverables: [
      "iOS and/or Android application",
      "Admin panel or CMS when needed",
      "API and authentication setup",
      "Push notification foundations",
      "QA across key devices",
      "Store submission support",
    ],
    technologies: [
      "React Native",
      "Flutter",
      "Swift",
      "Kotlin",
      "Firebase",
      "Node.js",
      "Supabase",
    ],
    faqs: [
      {
        question: "Should we build native or cross-platform?",
        answer:
          "It depends on timeline, budget, and feature complexity. Many products start with React Native or Flutter for speed, then go native for highly specialized needs.",
      },
      {
        question: "Can you build an MVP first?",
        answer:
          "Yes. We often recommend a focused MVP that validates the core user journey before investing in advanced modules.",
      },
      {
        question: "Do you help after launch?",
        answer:
          "We can handle maintenance, performance monitoring, crash fixes, and iterative feature development after release.",
      },
    ],
    relatedSlugs: ["ui-ux-design", "ai-development", "maintenance-support"],
  }),
  service({
    slug: "ui-ux-design",
    icon: "/icons/services/uiux.svg",
    title: "UI/UX Design",
    description:
      "We design every screen with user behavior in mind, which reduces friction, improves navigation, and turns first time visitors into loyal customers.",
    keywords: [
      "UI UX design",
      "product design",
      "user experience design",
      "interface design",
      "design systems",
    ],
    heroHeadline: "Interfaces Designed Around Real User Behavior",
    heroDescription:
      "We craft clear, elegant product experiences that reduce friction, build trust, and make every interaction feel intentional.",
    overview: [
      "Design is where strategy becomes something people can use. We combine research, information architecture, and visual craft so your product feels simple — even when the business logic is not.",
      "From websites and SaaS dashboards to mobile apps, we design systems that scale across screens and stay consistent as your product grows.",
    ],
    benefits: [
      {
        title: "Research-led decisions",
        description:
          "Flows and layouts shaped by user goals, not guesswork or trend-chasing.",
      },
      {
        title: "Higher conversion & retention",
        description:
          "Clear hierarchy, better onboarding, and fewer dead ends in the journey.",
      },
      {
        title: "Reusable design systems",
        description:
          "Components, tokens, and patterns that keep future pages and features consistent.",
      },
      {
        title: "Dev-ready handoff",
        description:
          "Specs and assets prepared so engineering can implement without ambiguity.",
      },
    ],
    process: [
      {
        title: "Research & audit",
        description:
          "Understand users, competitors, and friction points in the current experience.",
      },
      {
        title: "Information architecture",
        description:
          "Map structure, navigation, and key journeys before visual design begins.",
      },
      {
        title: "UI design & prototyping",
        description:
          "High-fidelity screens and interactive prototypes for stakeholder alignment.",
      },
      {
        title: "Handoff & design QA",
        description:
          "We support implementation so the final product matches the intended experience.",
      },
    ],
    deliverables: [
      "User flows and wireframes",
      "High-fidelity UI designs",
      "Interactive prototypes",
      "Design system foundations",
      "Developer handoff assets",
      "Design QA during build",
    ],
    technologies: ["Figma", "FigJam", "Adobe CC", "Framer", "Prototype tools"],
    faqs: [
      {
        question: "Do you design only, or also develop?",
        answer:
          "We can do either. Many clients start with UX/UI design, then continue into development with the same team for continuity.",
      },
      {
        question: "Can you improve an existing product's design?",
        answer:
          "Yes. We audit the current experience, identify friction, and redesign the journeys that have the biggest impact on conversion or usability.",
      },
      {
        question: "Will we get a design system?",
        answer:
          "For most product engagements we deliver reusable components and style foundations so future screens stay consistent.",
      },
    ],
    relatedSlugs: ["web-development", "mobile-app-development", "ecommerce-solutions"],
  }),
  service({
    slug: "ecommerce-solutions",
    icon: "/icons/services/ecommerce.svg",
    title: "Ecommerce Solutions",
    description:
      "We build fully custom online stores with secure payment integration, inventory management, and checkout experiences that reduce cart abandonment.",
    keywords: [
      "ecommerce development",
      "online store development",
      "Shopify development",
      "custom ecommerce",
      "checkout optimization",
    ],
    heroHeadline: "Online Stores Built to Sell More With Less Friction",
    heroDescription:
      "We create ecommerce experiences that make browsing easy, checkout smooth, and operations manageable as you scale.",
    overview: [
      "Selling online is more than listing products. We build storefronts and commerce systems around discovery, trust, conversion, and fulfillment — so customers buy and operations stay under control.",
      "Whether you need a custom storefront, a Shopify-powered brand site, or advanced catalog and inventory workflows, we tailor the stack to your commerce model.",
    ],
    benefits: [
      {
        title: "Checkout that converts",
        description:
          "Streamlined cart and payment flows designed to reduce abandonment.",
      },
      {
        title: "Catalog flexibility",
        description:
          "Variants, collections, filters, and merchandising tools that grow with your catalog.",
      },
      {
        title: "Secure payments & data",
        description:
          "Reliable payment integrations and practices that protect customer trust.",
      },
      {
        title: "Ops-ready tooling",
        description:
          "Inventory, order, and admin workflows that keep your team efficient.",
      },
    ],
    process: [
      {
        title: "Commerce discovery",
        description:
          "Define catalog structure, channels, payments, shipping, and growth goals.",
      },
      {
        title: "Store UX & brand design",
        description:
          "Design product discovery, PDP layouts, and trust-building pages.",
      },
      {
        title: "Build & integrations",
        description:
          "Implement storefront, payments, inventory, and marketing tools.",
      },
      {
        title: "Launch & optimization",
        description:
          "Go live with analytics, then improve conversion based on real shopper behavior.",
      },
    ],
    deliverables: [
      "Custom or platform-based storefront",
      "Payment gateway integration",
      "Product catalog setup",
      "Order and inventory workflows",
      "SEO-friendly product pages",
      "Post-launch conversion support",
    ],
    technologies: [
      "Shopify",
      "Next.js",
      "Stripe",
      "WooCommerce",
      "Headless commerce",
      "Analytics",
    ],
    faqs: [
      {
        question: "Custom build or Shopify — which is better?",
        answer:
          "Shopify is excellent for many brands that need speed and ops simplicity. Custom or headless builds make sense when you need unique UX, complex logic, or deeper integrations.",
      },
      {
        question: "Can you migrate an existing store?",
        answer:
          "Yes. We can migrate products, customers, and content while improving design, performance, and checkout in the process.",
      },
      {
        question: "Do you handle payment integrations?",
        answer:
          "We integrate trusted payment providers and configure the checkout flow around your markets and business rules.",
      },
    ],
    relatedSlugs: ["web-development", "digital-marketing", "ui-ux-design"],
  }),
  service({
    slug: "digital-marketing",
    icon: "/icons/services/webdev.svg",
    title: "Digital Marketing",
    description:
      "From SEO to paid ads, we build data driven campaigns that increase qualified traffic, generate leads, and deliver measurable ROI.",
    keywords: [
      "digital marketing",
      "SEO services",
      "paid ads",
      "lead generation",
      "content marketing",
    ],
    heroHeadline: "Marketing Systems That Attract the Right Customers",
    heroDescription:
      "We combine SEO, content, and paid acquisition into campaigns that grow qualified demand — not vanity metrics.",
    overview: [
      "Traffic alone is not the goal. We help you attract people who are ready to engage, then turn that attention into leads and revenue with clear messaging and measurable funnels.",
      "Our approach blends technical SEO, content strategy, and paid media so your brand compounds organic growth while accelerating results where paid spend makes sense.",
    ],
    benefits: [
      {
        title: "Qualified traffic growth",
        description:
          "Target keywords, audiences, and offers that match real buying intent.",
      },
      {
        title: "Full-funnel thinking",
        description:
          "From awareness to conversion, every campaign has a clear next step.",
      },
      {
        title: "Transparent reporting",
        description:
          "Track what matters — leads, conversions, and ROI — not just clicks.",
      },
      {
        title: "Creative + technical SEO",
        description:
          "Content, on-page structure, and technical foundations working together.",
      },
    ],
    process: [
      {
        title: "Audit & positioning",
        description:
          "Review your current channels, competitors, and conversion paths.",
      },
      {
        title: "Channel strategy",
        description:
          "Choose the right mix of SEO, content, and paid campaigns for your goals.",
      },
      {
        title: "Execution & testing",
        description:
          "Launch campaigns, publish assets, and iterate based on performance data.",
      },
      {
        title: "Optimization & scale",
        description:
          "Double down on what converts and cut waste from what does not.",
      },
    ],
    deliverables: [
      "SEO and keyword strategy",
      "On-page optimization support",
      "Content or landing page guidance",
      "Paid campaign setup and management",
      "Analytics and conversion tracking",
      "Monthly performance insights",
    ],
    technologies: [
      "Google Analytics",
      "Search Console",
      "Google Ads",
      "Meta Ads",
      "SEO tooling",
      "CRM integrations",
    ],
    faqs: [
      {
        question: "How soon can we see results?",
        answer:
          "Paid campaigns can generate leads quickly. SEO and content usually compound over months. We set expectations based on your market and starting point.",
      },
      {
        question: "Do you only run ads?",
        answer:
          "No. We can combine SEO, content, landing pages, and paid acquisition so growth is not dependent on a single channel.",
      },
      {
        question: "Will reporting be clear?",
        answer:
          "Yes. We focus reporting on leads, conversions, and cost efficiency so you always know what the work is producing.",
      },
    ],
    relatedSlugs: ["web-development", "ecommerce-solutions", "ui-ux-design"],
  }),
  service({
    slug: "maintenance-support",
    icon: "/icons/services/mobdev.svg",
    title: "Maintenance & Support",
    description:
      "We monitor performance, fix bugs, push security updates, and ensure your website or app stays fast, secure, and fully functional 24/7.",
    keywords: [
      "website maintenance",
      "app support",
      "IT support retainer",
      "security updates",
      "performance monitoring",
    ],
    heroHeadline: "Keep Your Product Fast, Secure, and Always On",
    heroDescription:
      "After launch is when reliability matters most. We handle monitoring, fixes, updates, and ongoing improvements so your team can stay focused.",
    overview: [
      "Software does not stay healthy on its own. Dependencies change, traffic spikes, browsers update, and edge cases appear. Our maintenance retainers keep your product stable and ready for growth.",
      "We combine proactive monitoring with responsive support so issues are caught early and improvements continue after launch.",
    ],
    benefits: [
      {
        title: "Proactive monitoring",
        description:
          "Catch downtime, errors, and performance regressions before customers do.",
      },
      {
        title: "Security & dependency updates",
        description:
          "Stay current with patches and package updates that reduce risk.",
      },
      {
        title: "Predictable support",
        description:
          "A clear retainer model for bug fixes, small enhancements, and priority response.",
      },
      {
        title: "Continuous improvement",
        description:
          "Ship refinements based on real usage instead of letting products stagnate.",
      },
    ],
    process: [
      {
        title: "Health audit",
        description:
          "Review hosting, dependencies, backups, analytics, and known issues.",
      },
      {
        title: "Support plan setup",
        description:
          "Define SLAs, communication channels, and monthly improvement priorities.",
      },
      {
        title: "Monitor & maintain",
        description:
          "Ongoing updates, fixes, and performance checks across the stack.",
      },
      {
        title: "Report & improve",
        description:
          "Regular updates on what changed, what broke, and what should improve next.",
      },
    ],
    deliverables: [
      "Monthly maintenance retainer",
      "Uptime and error monitoring",
      "Bug fixes and patch updates",
      "Backup and recovery checks",
      "Performance recommendations",
      "Priority support channel",
    ],
    technologies: [
      "Vercel",
      "AWS",
      "Sentry",
      "Uptime monitoring",
      "CI/CD",
      "Supabase",
    ],
    faqs: [
      {
        question: "What is included in a maintenance plan?",
        answer:
          "Typical plans include monitoring, dependency updates, bug fixes, security patches, and a set number of improvement hours each month.",
      },
      {
        question: "Can you support products you did not build?",
        answer:
          "Yes. We begin with an audit to understand the codebase, hosting setup, and risks before taking ownership of support.",
      },
      {
        question: "How fast do you respond to issues?",
        answer:
          "Response times depend on the retainer tier. Critical production issues are prioritized immediately within the agreed SLA.",
      },
    ],
    relatedSlugs: ["web-development", "cloud-devops", "cyber-security"],
  }),
  service({
    slug: "ai-development",
    icon: "/icons/services/aidev.svg",
    title: "AI Development",
    description:
      "From chatbots to predictive analytics, we develop custom AI solutions that automate repetitive tasks and unlock smarter business decisions.",
    keywords: [
      "AI development",
      "custom AI solutions",
      "chatbot development",
      "machine learning",
      "LLM applications",
    ],
    heroHeadline: "Custom AI Systems That Automate Real Work",
    heroDescription:
      "We design and ship practical AI products — assistants, automation workflows, and intelligent features that save time and improve decisions.",
    overview: [
      "AI only creates value when it is wired into real business processes. We help you identify high-impact use cases, choose the right models, and build reliable products around them.",
      "From customer support assistants and document intelligence to recommendation engines and internal copilots, we focus on accuracy, safety, and measurable outcomes.",
    ],
    benefits: [
      {
        title: "Use-case first approach",
        description:
          "We start with workflows worth automating, not technology for its own sake.",
      },
      {
        title: "Reliable LLM applications",
        description:
          "Prompting, retrieval, evaluation, and guardrails designed for production use.",
      },
      {
        title: "Integration with your stack",
        description:
          "Connect AI features to CRMs, databases, websites, and internal tools.",
      },
      {
        title: "Human-in-the-loop design",
        description:
          "Keep people in control where accuracy, compliance, or trust matters most.",
      },
    ],
    process: [
      {
        title: "Opportunity mapping",
        description:
          "Identify processes where AI can reduce cost, speed up work, or improve quality.",
      },
      {
        title: "Prototype & evaluate",
        description:
          "Validate model quality, latency, and business value with a focused pilot.",
      },
      {
        title: "Production build",
        description:
          "Implement APIs, UI, retrieval layers, monitoring, and safety controls.",
      },
      {
        title: "Improve continuously",
        description:
          "Track outcomes and refine prompts, data, and workflows after launch.",
      },
    ],
    deliverables: [
      "AI use-case roadmap",
      "Working prototype or MVP",
      "Production AI feature or assistant",
      "Data/retrieval integrations",
      "Evaluation and monitoring setup",
      "Documentation for your team",
    ],
    technologies: [
      "OpenAI",
      "Claude",
      "LangChain",
      "Python",
      "Vector databases",
      "Next.js",
      "Supabase",
    ],
    faqs: [
      {
        question: "Do we need our own training data?",
        answer:
          "Not always. Many solutions start with foundation models plus your documents or business rules. Custom training is only recommended when the use case clearly needs it.",
      },
      {
        question: "Can AI be added to an existing product?",
        answer:
          "Yes. We often embed AI features into websites, apps, and internal tools already in production.",
      },
      {
        question: "How do you handle accuracy and safety?",
        answer:
          "Through evaluation, retrieval grounding, permission controls, and human review where needed — especially for customer-facing or high-risk workflows.",
      },
    ],
    relatedSlugs: ["ai-automation", "custom-software-development", "it-consulting"],
  }),
  service({
    slug: "cloud-devops",
    icon: "/icons/services/cloud.svg",
    title: "Cloud & DevOps",
    description:
      "We migrate, manage, and optimize your infrastructure on AWS, Azure, or Google Cloud with automated pipelines that reduce downtime and cut costs.",
    keywords: [
      "cloud devops",
      "AWS consulting",
      "CI CD pipelines",
      "cloud migration",
      "infrastructure automation",
    ],
    heroHeadline: "Cloud Infrastructure Built for Speed and Reliability",
    heroDescription:
      "We modernize hosting, automate deployments, and optimize cloud costs so your product ships faster with fewer outages.",
    overview: [
      "Strong products need infrastructure that can keep up. We help teams migrate to the cloud, harden environments, and put CI/CD in place so releases are routine instead of risky.",
      "From cost optimization and containerization to observability and security baselines, we make your platform easier to operate and scale.",
    ],
    benefits: [
      {
        title: "Faster, safer releases",
        description:
          "Automated pipelines reduce manual deployment risk and accelerate delivery.",
      },
      {
        title: "Scalable architecture",
        description:
          "Infrastructure that grows with traffic without constant firefighting.",
      },
      {
        title: "Cost visibility",
        description:
          "Right-size resources and cut wasteful cloud spend with clear monitoring.",
      },
      {
        title: "Operational confidence",
        description:
          "Logging, alerts, backups, and recovery practices that keep teams calm.",
      },
    ],
    process: [
      {
        title: "Infrastructure audit",
        description:
          "Assess hosting, deployments, security posture, and cost drivers.",
      },
      {
        title: "Target architecture",
        description:
          "Design the cloud and DevOps setup that fits your product stage.",
      },
      {
        title: "Migration & automation",
        description:
          "Implement environments, pipelines, and monitoring with minimal disruption.",
      },
      {
        title: "Optimize & handover",
        description:
          "Tune performance and costs, then document everything for your team.",
      },
    ],
    deliverables: [
      "Cloud architecture plan",
      "CI/CD pipeline setup",
      "Environment configuration",
      "Monitoring and alerting",
      "Backup and recovery basics",
      "Cost optimization recommendations",
    ],
    technologies: [
      "AWS",
      "Azure",
      "Google Cloud",
      "Docker",
      "Kubernetes",
      "GitHub Actions",
      "Terraform",
    ],
    faqs: [
      {
        question: "Can you migrate us without downtime?",
        answer:
          "We plan migrations carefully and use staged cutovers whenever possible. Exact downtime depends on the current architecture and constraints.",
      },
      {
        question: "Do you work with startups and enterprises?",
        answer:
          "Yes. Early-stage teams often need a clean foundation and CI/CD; larger teams may need cost control, hardening, and multi-environment maturity.",
      },
      {
        question: "Will our team still own the infrastructure?",
        answer:
          "Absolutely. We document systems and can train your team, or continue supporting operations through a retainer.",
      },
    ],
    relatedSlugs: ["cyber-security", "maintenance-support", "enterprise-solutions"],
  }),
  service({
    slug: "cyber-security",
    icon: "/icons/services/uiux.svg",
    title: "Cyber Security",
    description:
      "We conduct security audits, implement threat detection, and build multi layer protection systems that keep your business and customer data safe.",
    keywords: [
      "cyber security",
      "security audit",
      "application security",
      "vulnerability assessment",
      "data protection",
    ],
    heroHeadline: "Protect Your Product, Data, and Customer Trust",
    heroDescription:
      "We identify risks early and harden your applications, infrastructure, and processes against modern threats.",
    overview: [
      "Security is not a one-time checklist. We help you understand where risk lives in your product and put practical controls in place — without slowing delivery to a halt.",
      "From audits and vulnerability remediation to authentication hardening and monitoring, we focus on protections that match your stage and threat profile.",
    ],
    benefits: [
      {
        title: "Clear risk visibility",
        description:
          "Know what is exposed, what matters most, and what to fix first.",
      },
      {
        title: "Application hardening",
        description:
          "Strengthen auth, access control, input validation, and secrets handling.",
      },
      {
        title: "Compliance-minded practices",
        description:
          "Align with practical security standards that support customer and partner trust.",
      },
      {
        title: "Ongoing vigilance",
        description:
          "Monitoring and review rhythms that keep security from becoming stale.",
      },
    ],
    process: [
      {
        title: "Security assessment",
        description:
          "Review architecture, code risks, access patterns, and infrastructure posture.",
      },
      {
        title: "Prioritized remediation",
        description:
          "Fix critical issues first with clear ownership and verification.",
      },
      {
        title: "Control implementation",
        description:
          "Add monitoring, hardening, and policy improvements where they matter.",
      },
      {
        title: "Review & maintain",
        description:
          "Reassess as the product changes so new features do not reopen old risks.",
      },
    ],
    deliverables: [
      "Security audit report",
      "Vulnerability remediation plan",
      "Hardening recommendations",
      "Auth and access improvements",
      "Monitoring guidance",
      "Team security checklist",
    ],
    technologies: [
      "OWASP practices",
      "Auth0 / Clerk / Supabase Auth",
      "WAF",
      "Secrets management",
      "SIEM / logging",
      "Penetration testing tools",
    ],
    faqs: [
      {
        question: "Do you perform penetration testing?",
        answer:
          "We can run security assessments and coordinate deeper pen-testing where needed. Scope depends on the systems and compliance requirements involved.",
      },
      {
        question: "Is this only for large companies?",
        answer:
          "No. Startups and growing products often need security foundations early — especially before handling sensitive customer data or enterprise deals.",
      },
      {
        question: "Can you secure an existing app?",
        answer:
          "Yes. We audit the current system, prioritize risks, and implement fixes in a practical order that balances urgency with delivery.",
      },
    ],
    relatedSlugs: ["cloud-devops", "maintenance-support", "enterprise-solutions"],
  }),
  service({
    slug: "custom-software-development",
    icon: "/icons/services/ecommerce.svg",
    title: "Custom Software Development",
    description:
      "We design and build tailored software that solves unique business problems and scales smoothly as your company keeps growing.",
    keywords: [
      "custom software development",
      "bespoke software",
      "business software",
      "SaaS development",
      "internal tools",
    ],
    heroHeadline: "Software Tailored to How Your Business Actually Works",
    heroDescription:
      "When off-the-shelf tools fall short, we build custom systems that fit your workflows, data, and growth plans.",
    overview: [
      "Generic software forces your team to adapt. Custom software adapts to your team. We build platforms, portals, and internal tools that remove operational friction and create durable competitive advantage.",
      "Every engagement starts with clarity on the problem, then moves into product design and engineering that can evolve as your business does.",
    ],
    benefits: [
      {
        title: "Exact-fit workflows",
        description:
          "Build around your process instead of bending people around a rigid tool.",
      },
      {
        title: "Owned IP and roadmap",
        description:
          "You control the product, priorities, and future development path.",
      },
      {
        title: "Integration-friendly",
        description:
          "Connect CRMs, ERPs, payment systems, and the tools your team already uses.",
      },
      {
        title: "Built to scale",
        description:
          "Architecture that can grow from early usage into multi-team operations.",
      },
    ],
    process: [
      {
        title: "Problem framing",
        description:
          "Define users, workflows, constraints, and the outcomes that matter.",
      },
      {
        title: "Solution design",
        description:
          "Shape product scope, UX, and technical architecture before heavy build.",
      },
      {
        title: "Iterative development",
        description:
          "Ship in milestones so stakeholders can validate progress early.",
      },
      {
        title: "Deploy & evolve",
        description:
          "Launch with monitoring, then expand modules based on real adoption.",
      },
    ],
    deliverables: [
      "Product and technical specification",
      "Custom web or platform application",
      "Admin and role-based access",
      "Third-party integrations",
      "QA and deployment pipeline",
      "Documentation and training",
    ],
    technologies: [
      "Next.js",
      "Node.js",
      "Python",
      "PostgreSQL",
      "Supabase",
      "AWS",
      "REST / GraphQL",
    ],
    faqs: [
      {
        question: "When does custom software make sense?",
        answer:
          "When existing tools create too much manual work, cannot support unique workflows, or become more expensive to force-fit than to build the right system.",
      },
      {
        question: "Can you start with an MVP?",
        answer:
          "Yes. We recommend shipping a focused first version that proves value, then expanding modules once usage patterns are clear.",
      },
      {
        question: "Who owns the code?",
        answer:
          "You do. We deliver source code and documentation as part of the engagement.",
      },
    ],
    relatedSlugs: ["enterprise-solutions", "ai-development", "it-consulting"],
  }),
  service({
    slug: "ai-automation",
    icon: "/icons/services/aidev.svg",
    title: "AI & Automation",
    description:
      "We automate manual workflows and connect your tools with smart AI systems that save time, cut costs, and boost efficiency.",
    keywords: [
      "AI automation",
      "workflow automation",
      "business process automation",
      "RPA",
      "intelligent automation",
    ],
    heroHeadline: "Automate Busywork. Free Your Team for High-Value Work.",
    heroDescription:
      "We connect your tools and add AI where it helps, turning repetitive processes into reliable, low-touch workflows.",
    overview: [
      "Most teams lose hours every week to copy-paste tasks, status chasing, and tool switching. We map those processes and automate the steps that should never require manual effort.",
      "From lead routing and document processing to reporting and customer operations, our automations reduce errors while keeping people in control of exceptions.",
    ],
    benefits: [
      {
        title: "Hours back every week",
        description:
          "Remove repetitive work so your team can focus on customers and strategy.",
      },
      {
        title: "Fewer human errors",
        description:
          "Consistent workflows reduce missed handoffs and data entry mistakes.",
      },
      {
        title: "Connected systems",
        description:
          "Make CRMs, spreadsheets, inboxes, and apps talk to each other reliably.",
      },
      {
        title: "AI where it counts",
        description:
          "Use AI for classification, summarization, and decisions — not vanity demos.",
      },
    ],
    process: [
      {
        title: "Workflow discovery",
        description:
          "Identify bottlenecks, handoffs, and the highest-ROI automation targets.",
      },
      {
        title: "Automation design",
        description:
          "Define triggers, rules, AI steps, and human approval points.",
      },
      {
        title: "Build & connect",
        description:
          "Implement integrations, test edge cases, and validate with real data.",
      },
      {
        title: "Monitor & refine",
        description:
          "Track failures and savings, then improve the workflow over time.",
      },
    ],
    deliverables: [
      "Automation opportunity map",
      "Integrated workflow automations",
      "AI-assisted processing steps",
      "Error handling and alerts",
      "Ops documentation",
      "Training for your team",
    ],
    technologies: [
      "Zapier / Make",
      "n8n",
      "OpenAI",
      "Supabase",
      "Custom APIs",
      "CRM integrations",
    ],
    faqs: [
      {
        question: "What processes are best to automate first?",
        answer:
          "High-volume, rule-based workflows with clear inputs and outputs — like lead assignment, invoicing prep, reporting, ticket triage, or document extraction.",
      },
      {
        question: "Do automations replace our team?",
        answer:
          "They replace repetitive tasks, not ownership. The best systems free people to handle exceptions, relationships, and decisions.",
      },
      {
        question: "Can you automate across tools we already use?",
        answer:
          "Yes. We typically connect the stack you already rely on and only introduce new tools when they clearly improve reliability or cost.",
      },
    ],
    relatedSlugs: ["ai-development", "custom-software-development", "it-consulting"],
  }),
  service({
    slug: "it-consulting",
    icon: "/icons/services/cloud.svg",
    title: "IT Consulting",
    description:
      "We assess your technology stack and guide smarter decisions on infrastructure, tools, and strategy that drive real growth.",
    keywords: [
      "IT consulting",
      "technology consulting",
      "digital transformation",
      "tech strategy",
      "stack assessment",
    ],
    heroHeadline: "Clear Technology Advice Before Expensive Mistakes",
    heroDescription:
      "We help you choose the right systems, vendors, and architecture so every tech investment supports growth instead of creating drag.",
    overview: [
      "Technology decisions compound. The wrong stack, vendor, or roadmap can cost years. We give leadership teams a practical view of what to build, buy, fix, or retire.",
      "Whether you are modernizing legacy systems, planning a product launch, or aligning IT with business goals, we bring clarity before you commit budget.",
    ],
    benefits: [
      {
        title: "Independent guidance",
        description:
          "Recommendations based on outcomes — not forced into a single product or stack.",
      },
      {
        title: "Reduced delivery risk",
        description:
          "Spot architecture, staffing, and process gaps before they become project failures.",
      },
      {
        title: "Budget clarity",
        description:
          "Prioritize investments with a phased roadmap tied to business value.",
      },
      {
        title: "Execution support",
        description:
          "We can stay on to implement, or guide your internal team through delivery.",
      },
    ],
    process: [
      {
        title: "Current-state assessment",
        description:
          "Review systems, team capacity, costs, and operational pain points.",
      },
      {
        title: "Opportunity & risk analysis",
        description:
          "Identify where technology can unlock growth or is quietly creating risk.",
      },
      {
        title: "Roadmap & recommendations",
        description:
          "Deliver a prioritized plan with options, tradeoffs, and sequencing.",
      },
      {
        title: "Implementation guidance",
        description:
          "Support vendor selection, architecture decisions, and delivery oversight.",
      },
    ],
    deliverables: [
      "Technology assessment report",
      "Stack and vendor recommendations",
      "Phased transformation roadmap",
      "Risk and dependency analysis",
      "Budget and timeline ranges",
      "Optional implementation support",
    ],
    technologies: [
      "Cloud platforms",
      "SaaS ecosystems",
      "Modern web stacks",
      "Data platforms",
      "DevOps tooling",
      "Security frameworks",
    ],
    faqs: [
      {
        question: "Is consulting only advisory, or can you also build?",
        answer:
          "Both. Some clients need a roadmap and vendor guidance. Others ask us to stay on and implement the recommended solution.",
      },
      {
        question: "How long does an assessment take?",
        answer:
          "Focused assessments often take 1–3 weeks depending on system complexity and stakeholder availability.",
      },
      {
        question: "Who is this for?",
        answer:
          "Founders, product leaders, and operations teams making high-impact technology decisions with limited room for expensive missteps.",
      },
    ],
    relatedSlugs: [
      "custom-software-development",
      "cloud-devops",
      "enterprise-solutions",
    ],
  }),
  service({
    slug: "qa-testing",
    icon: "/icons/services/webdev.svg",
    title: "QA & Testing",
    description:
      "We test every layer of your product, identify bugs before launch, and ensure a smooth, error free experience for every single user.",
    keywords: [
      "QA testing",
      "software testing",
      "quality assurance",
      "automation testing",
      "manual testing",
    ],
    heroHeadline: "Ship With Confidence. Catch Issues Before Customers Do.",
    heroDescription:
      "Our QA process protects launches with structured manual testing, automation where it pays off, and clear defect reporting.",
    overview: [
      "Bugs after launch cost more than bugs before launch. We help product teams validate critical journeys, edge cases, and regressions so releases feel controlled instead of stressful.",
      "Whether you need pre-release QA, regression suites, or ongoing quality support, we tailor coverage to your risk profile and release cadence.",
    ],
    benefits: [
      {
        title: "Fewer production surprises",
        description:
          "Validate core flows thoroughly before customers hit them.",
      },
      {
        title: "Clear defect reporting",
        description:
          "Reproducible bugs with severity, steps, and impact — not vague screenshots.",
      },
      {
        title: "Automation where useful",
        description:
          "Automate stable, high-value checks so regression testing scales with the product.",
      },
      {
        title: "Release confidence",
        description:
          "Give stakeholders a clear go / no-go view before shipping.",
      },
    ],
    process: [
      {
        title: "Scope & risk mapping",
        description:
          "Identify critical journeys, platforms, and release risks to cover first.",
      },
      {
        title: "Test planning",
        description:
          "Define cases for functional, UI, regression, and integration testing.",
      },
      {
        title: "Execution & reporting",
        description:
          "Run tests, log defects, and communicate blockers in real time.",
      },
      {
        title: "Retest & sign-off",
        description:
          "Verify fixes and provide a final quality summary before release.",
      },
    ],
    deliverables: [
      "Test plan and case coverage",
      "Manual QA execution",
      "Automation suite where needed",
      "Bug reports with severity",
      "Regression testing support",
      "Release readiness summary",
    ],
    technologies: [
      "Playwright",
      "Cypress",
      "Jest",
      "Postman",
      "BrowserStack",
      "Manual QA workflows",
    ],
    faqs: [
      {
        question: "Do you offer manual and automated testing?",
        answer:
          "Yes. Manual testing is excellent for exploratory and UX-sensitive checks. Automation is ideal for stable regression coverage over time.",
      },
      {
        question: "Can you QA a product built by another team?",
        answer:
          "Absolutely. We can plug into an existing release process and provide independent quality coverage.",
      },
      {
        question: "When should QA get involved?",
        answer:
          "As early as possible. Involving QA during planning prevents many defects from ever reaching late-stage testing.",
      },
    ],
    relatedSlugs: [
      "web-development",
      "mobile-app-development",
      "maintenance-support",
    ],
  }),
  service({
    slug: "enterprise-solutions",
    icon: "/icons/services/mobdev.svg",
    title: "Enterprise Solutions",
    description:
      "We build powerful, scalable systems designed for large businesses that need reliable performance, seamless integration, and long-term stability.",
    keywords: [
      "enterprise software",
      "enterprise solutions",
      "large scale systems",
      "system integration",
      "enterprise platforms",
    ],
    heroHeadline: "Enterprise Systems Built for Scale, Integration, and Trust",
    heroDescription:
      "We design and deliver platforms that support complex operations, multiple stakeholders, and long-term business growth.",
    overview: [
      "Enterprise environments demand more than features — they need reliability, access control, integration discipline, and systems that multiple teams can depend on. We build with that reality in mind.",
      "From internal platforms and customer portals to large-scale product systems, we focus on architecture, governance, and delivery practices that hold up under real operational pressure.",
    ],
    benefits: [
      {
        title: "Architecture for scale",
        description:
          "Systems designed for growth in users, data, and organizational complexity.",
      },
      {
        title: "Deep integrations",
        description:
          "Connect ERP, CRM, identity, and internal tools into coherent workflows.",
      },
      {
        title: "Security & governance",
        description:
          "Roles, auditability, and controls that enterprise stakeholders expect.",
      },
      {
        title: "Long-term maintainability",
        description:
          "Clean boundaries and documentation so platforms remain evolvable.",
      },
    ],
    process: [
      {
        title: "Stakeholder alignment",
        description:
          "Clarify business goals, compliance needs, and success criteria across teams.",
      },
      {
        title: "Architecture & governance",
        description:
          "Define system boundaries, integration patterns, and delivery standards.",
      },
      {
        title: "Phased delivery",
        description:
          "Ship in controlled releases with QA, migration plans, and change management.",
      },
      {
        title: "Operate & expand",
        description:
          "Support production operations and continue evolving modules over time.",
      },
    ],
    deliverables: [
      "Enterprise architecture blueprint",
      "Scalable platform or portal",
      "Role-based access and admin tools",
      "System integrations",
      "QA and release process",
      "Operational documentation",
    ],
    technologies: [
      "Next.js",
      "Node.js",
      "Java / .NET as needed",
      "PostgreSQL",
      "AWS / Azure",
      "SSO / IAM",
      "API gateways",
    ],
    faqs: [
      {
        question: "Can you work with our internal IT and vendors?",
        answer:
          "Yes. Enterprise projects usually succeed through collaboration. We can lead delivery or work as an embedded partner beside your team and existing vendors.",
      },
      {
        question: "Do you support legacy modernization?",
        answer:
          "We do. Many engagements involve wrapping, replacing, or gradually migrating legacy systems without disrupting operations.",
      },
      {
        question: "How do you handle security and access control?",
        answer:
          "We design around role-based access, secure authentication, audit needs, and the compliance expectations of your industry and stakeholders.",
      },
    ],
    relatedSlugs: [
      "custom-software-development",
      "cloud-devops",
      "cyber-security",
    ],
  }),
];

