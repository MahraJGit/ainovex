import SectionGrid from "../../ui/SectionGrid";
import Button from "../../ui/Button";
import ServiceCard from "../../ui/ServiceCard";

const services = [
  {
    icon: "/icons/services/webdev.svg",
    title: "Web Development",
    description:
      "From landing pages to enterprise portals, we build custom websites that load fast, rank higher, and convert visitors into paying customers.",
    href: "#",
  },
  {
    icon: "/icons/services/mobiledev.svg",
    title: "Mobile App Development",
    description:
      "We build native and cross-platform apps for iOS and Android that deliver smooth user experiences and keep customers coming back.",
    href: "#",
  },
  {
    icon: "/icons/services/uiux.svg",
    title: "UI/UX Design",
    description:
      "We design every screen with user behavior in mind, which reduces friction, improves navigation, and turns first time visitors into loyal customers.",
    href: "#",
  },
  {
    icon: "/icons/services/ecommerce.svg",
    title: "Ecommerce Solutions",
    description:
      "We build fully custom online stores with secure payment integration, inventory management, and checkout experiences that reduce cart abandonment.",
    href: "#",
  },
  {
    icon: "/icons/services/aidev.svg",
    title: "AI Development",
    description:
      "From chatbots to predictive analytics, we develop custom AI solutions that automate repetitive tasks and unlock smarter business decisions.",
    href: "#",
  },
  {
    icon: "/icons/services/cloud.svg",
    title: "Cloud & DevOps",
    description:
      "We migrate, manage, and optimize your infrastructure on AWS, Azure, or Google Cloud with automated pipelines that reduce downtime and cut costs.",
    href: "#",
  },
];

export default function OurServices() {
  return (
    <section id="our-services" className="relative overflow-hidden bg-[#0A0F1C]">
      <SectionGrid placement="left" />

      <div className="section-container relative z-10 !pt-[104px] lg:!pt-[120px] pb-20">

        {/* Centered heading */}
        <div className="mb-12 flex flex-col items-center text-center">
          <h2 className="text-white tracking-[-2.25px]">
            Our <span className="text-primary">Services</span>
          </h2>
        </div>

        {/* 3×2 card grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <ServiceCard key={service.title} {...service} />
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 flex justify-center">
          <Button variant="solid">View All Services</Button>
        </div>

      </div>
    </section>
  );
}