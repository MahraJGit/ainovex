import Image from "next/image";
import SectionGrid from "../../ui/SectionGrid";

const row1 = [
  {
    icon: "/icons/about/fast-delivery.svg",
    title: "Fast Delivery",
    description: "Quality work delivered on schedule, every single time.",
    size: "small",
  },
  {
    icon: "/icons/about/proven-experts.svg",
    title: "Proven Experts",
    description: "Skilled professionals with real-world experience across industries.",
    size: "large",
  },
  {
    icon: "/icons/about/custom-built.svg",
    title: "Custom Built",
    description: "Tailored solutions designed specifically for your business needs.",
    size: "small",
  },
];

const row2 = [
  {
    icon: "/icons/about/clear-process.svg",
    title: "Clear Process",
    description: "Simple, honest communication at every project stage.",
    size: "large",
  },
  {
    icon: "/icons/about/real-results.svg",
    title: "Real Results",
    description: "Measurable growth, better performance, and lasting impact.",
    size: "large",
  },
];

function ReasonCard({ icon, title, description }: { icon: string; title: string; description: string }) {
  return (
    <div className="flex flex-col gap-2 rounded-2xl bg-white p-6 h-[178px] justify-center">
      <Image src={icon} alt={title} width={32} height={32} aria-hidden />
      <h3 className="text-lg font-bold text-ink">{title}</h3>
      <p className="text-sm text-text-black-v1/87">{description}</p>
    </div>
  );
}

export default function WhyAinovex() {
  return (
    <section className="relative overflow-hidden bg-[#05080F]">
        <SectionGrid placement="left" />
      <div className="section-container relative z-10 py-[104px]! lg:py-[120px]!">

        <h2 className="text-center text-white mb-16 tracking-[-2.25px]">
          Why <span className="text-primary">Ainovex</span>?
        </h2>

        {/* Row 1 — small(1fr) large(2fr) small(1fr) */}
        <div
          className="grid gap-6"
          style={{ gridTemplateColumns: "1fr 2fr 1fr" }}
        >
          {row1.map((card) => (
            <ReasonCard key={card.title} {...card} />
          ))}
        </div>

        {/* Row 2 — large(1fr) large(1fr) */}
        <div
          className="grid gap-6 mt-6"
          style={{ gridTemplateColumns: "1fr 1fr" }}
        >
          {row2.map((card) => (
            <ReasonCard key={card.title} {...card} />
          ))}
        </div>

      </div>
    </section>
  );
}