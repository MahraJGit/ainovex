import Image from "next/image";
import SectionGrid from "../../ui/SectionGrid";
import Tag from "../../ui/Tag";
import FeatureItem from "../../ui/FeatureItem";

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

export default function WhyUs() {
  return (
    <section id="why-us" className="relative overflow-hidden bg-white">
      <SectionGrid placement="center" />

      <div className="section-container relative z-10 py-[104px]! lg:py-[120px]!">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <Tag label="Why Choose Ainovex Technologies?" />

          <h2 className="mt-6 text-black-v1/87">
            Your
            <span className="text-primary"> Trusted Partner</span> in Digital
            Transformation
          </h2>

          <p className="mt-4 text-base font-medium leading-[100%] text-text-black-v1/87">
            We combine technical expertise, transparency, and long term
            commitment to help businesses transform digitally with confidence
            and lasting results.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 justify-items-center gap-y-4 gap-x-6 md:grid-cols-2 md:max-w-[700px] md:mx-auto lg:max-w-none lg:gap-x-8 lg:grid-cols-[max-content_max-content] lg:justify-center">
          {features.map((feature) => (
            <FeatureItem key={feature.title} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
}
