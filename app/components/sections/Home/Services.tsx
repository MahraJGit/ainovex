import Button from "../../ui/Button";
import SectionGrid from "../../ui/SectionGrid";
import ServiceCard from "../../ui/ServiceCard";
import Tag from "../../ui/Tag";

const services = [
  {
    icon: "/icons/services/webdev.svg",
    title: "Web Development",
    description:
      "From landing pages to enterprise portals, we build custom websites that load fast, rank higher, and convert visitors into paying customers.",
  },
  {
    icon: "/icons/services/mobdev.svg",
    title: "Mobile App Development",
    description:
      "We build native and cross-platform apps for iOS and Android that deliver smooth user experiences and keep customers coming back.",
  },
  {
    icon: "/icons/services/uiux.svg",
    title: "UI/UX Design",
    description:
      "We design every screen with user behavior in mind, which reduces friction, improves navigation, and turns first time visitors into loyal customers.",
  },
  {
    icon: "/icons/services/ecommerce.svg",
    title: "Ecommerce Solutions",
    description:
      "We build fully custom online stores with secure payment integration, inventory management, and checkout experiences that reduce cart abandonment.",
  },
  {
    icon: "/icons/services/aidev.svg",
    title: "AI Development",
    description:
      "From chatbots to predictive analytics, we develop custom AI solutions that automate repetitive tasks and unlock smarter business decisions.",
  },
  {
    icon: "/icons/services/cloud.svg",
    title: "Cloud & DevOps",
    description:
      "We migrate, manage, and optimize your infrastructure on AWS, Azure, or Google Cloud with automated pipelines that reduce downtime and cut costs.",
  },
];

export default function Services() {
  return (
    <section id="services" className="relative overflow-hidden bg-[#0A0F1C]">
      <SectionGrid placement="left" />

      <div className="section-container-fluid relative z-10">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <Tag label="Our Services" variant="outline" />

          <h2 className="mt-6 max-w-[770px] text-white">
            <span className="text-primary">Smart Digital</span> Solutions Designed
            for Your Success
          </h2>

          <p className="mt-4 max-w-xl text-base font-medium leading-[140%] text-white/60">
            We transform complex ideas into clean, intuitive designs that users
            understand, enjoy, and trust.
          </p>
        </div>

        <div className="mx-auto mt-14 grid w-full max-w-[70%] grid-cols-1 gap-x-8 gap-y-8 md:grid-cols-3">
          {services.map((service) => (
            <ServiceCard key={service.title} {...service} />
          ))}
        </div>

        <div className="mt-14 flex justify-center">
          <Button href="/services" variant="solid">
            View All Services
          </Button>
        </div>
      </div>
    </section>
  );
}
