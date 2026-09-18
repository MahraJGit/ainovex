import SectionGrid from "../../ui/SectionGrid";
import Tag from "../../ui/Tag";
import FeatureItem from "../../ui/FeatureItem";

const features = [
  {
    icon: "/icons/about/project-ownership.svg",
    title: "Project Ownership",
    description:
      "You receive complete ownership of all code, assets, and files once your project is successfully delivered.",
  },
  {
    icon: "/icons/about/zero-costs.svg",
    title: "Zero Hidden Costs",
    description:
      "Your quoted price is your final price. No surprise charges, no mid-project additions, no vague estimates.",
  },
  {
    icon: "/icons/about/lifetime-support.svg",
    title: "Lifetime Support",
    description:
      "Our support continues after launch, ensuring timely fixes, updates, and improvements whenever required.",
  },
  {
    icon: "/icons/about/direct-collab.svg",
    title: "Direct Collaboration",
    description:
      "You get a dedicated point of contact, ensuring clear communication and timely updates throughout the project.",
  },
  {
    icon: "/icons/about/long-growth.svg",
    title: "Long Term Growth",
    description:
      "Every solution is built to scale with your business, eliminating costly rebuilds and growth limitations.",
  },
  {
    icon: "/icons/about/time-delivery.svg",
    title: "On-Time Delivery",
    description:
      "We stick to agreed timelines, so your project launches when promised, means no unnecessary delays or missed deadlines.",
  },
];

export default function WhyChooseUs() {
  return (
    <section id="why-choose-us" className="relative overflow-hidden bg-white">
      <SectionGrid placement="center" />

      <div className="section-container relative z-10 py-[104px]! lg:py-[120px]!">
        <div className="mx-auto flex max-w-[852px] flex-col items-center text-center">
          <Tag label="Why Us" />
          <h2 className="mt-6 text-black-v1/87 tracking-[-2.25px]">
            Why Choose <span className="text-primary">Ainovex Technologies</span>?
          </h2>
        </div>

        <div className="mt-14 grid grid-cols-1 justify-items-center gap-y-4 gap-x-8 md:grid-cols-[max-content_max-content] md:justify-center">
          {features.map((feature) => (
            <FeatureItem key={feature.title} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
}