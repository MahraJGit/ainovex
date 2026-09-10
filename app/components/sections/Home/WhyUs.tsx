import Image from "next/image";
import SectionGrid from "../../ui/SectionGrid";
import Tag from "../../ui/Tag";

const features = [
  {
    icon: "/icons/why-us/transparent.svg",
    title: "Transparent Process",
    description:
      "You stay informed at every stage with clear milestones, regular updates, and full visibility into how your project progresses.",
  },
  {
    icon: "/icons/why-us/future.svg",
    title: "Future Ready Technology",
    description:
      "We build using modern, scalable technologies so your platform stays secure, fast, and adaptable as industry standards evolve.",
  },
  {
    icon: "/icons/why-us/dedicated.svg",
    title: "Dedicated Expert Team",
    description:
      "Every project is handled by experienced specialists who understand your industry and bring proven solutions to real challenges.",
  },
  {
    icon: "/icons/why-us/flexible.svg",
    title: "Flexible Engagement Models",
    description:
      "Work with us the way that fits you best, whether it's a fixed project, ongoing retainer, or dedicated team.",
  },
  {
    icon: "/icons/why-us/result.svg",
    title: "Result Driven Approach",
    description:
      "We focus on measurable outcomes, ensuring every solution we build directly contributes to your business growth and success.",
  },
  {
    icon: "/icons/why-us/proven.svg",
    title: "Proven Track Record",
    description:
      "A consistent history of successful deliveries has earned us long term trust from clients across diverse industries and markets.",
  },
];

function FeatureItem({
  icon,
  title,
  description,
}: {
  icon: string;
  title: string;
  description: string;
}) {
  return (
    <article className="flex w-full max-w-[420px] gap-5">
      <div className="size-[80px] shrink-0">
        <Image
          src={icon}
          alt=""
          width={80}
          height={80}
          className="size-[80px]"
          aria-hidden
        />
      </div>
      <div className="flex flex-col">
        <h3 className="text-[21px] font-medium text-[#161C2D]">{title}</h3>
        <p className="mt-2 text-sm font-normal leading-[100%] text-text-black-v1/87 max-w-[280px]">
          {description}
        </p>
      </div>
    </article>
  );
}

export default function WhyUs() {
  return (
    <section id="why-us" className="relative overflow-hidden bg-white">
      <SectionGrid placement="center" />

      <div className="section-container relative z-10 !pt-[104px] lg:!pt-[120px]">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <Tag label="Why Choose Ainovex Technologies?" />

          <h2 className="mt-6 text-black-v1/87">
            Your{" "}
            <span className="text-primary">Trusted Partner</span> in Digital
            Transformation
          </h2>

          <p className="mt-4 text-base font-medium leading-[100%] text-text-black-v1/87">
            We combine technical expertise, transparency, and long term
            commitment to help businesses transform digitally with confidence
            and lasting results.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 justify-items-center gap-y-8 md:grid-cols-[max-content_max-content] md:justify-center md:gap-x-8 md:gap-y-12">
          {features.map((feature) => (
            <FeatureItem key={feature.title} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
}
