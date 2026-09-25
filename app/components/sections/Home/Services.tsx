import SectionGrid from "../../ui/SectionGrid";
import Button from "../../ui/Button";
import ServiceCard from "../../ui/ServiceCard";
import Tag from "../../ui/Tag";
import { services } from "../../../lib/services";

export default function Services() {
  const displayed = services.slice(0, 6);

  return (
    <section id="services" className="relative overflow-hidden bg-[#05080F]">
      <SectionGrid placement="left" />

      <div className="section-container relative z-10 !pt-[104px] lg:!pt-[120px] pb-20">
        <div className="mb-12 flex flex-col items-center text-center">
          <Tag label="Our Services" variant="outline" />
          <h2 className="mt-6 max-w-[770px] text-white">
            <span className="text-primary">Smart Digital</span> Solutions Designed
            for Your Success
          </h2>
          <p className="mt-4 text-center text-base font-medium text-white/80">
            We transform complex ideas into clean, intuitive designs that users
            understand, enjoy, and trust.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {displayed.map((service) => (
            <ServiceCard key={service.title} {...service} />
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <Button href="/services#our-services" variant="solid">
            View All Services
          </Button>
        </div>
      </div>
    </section>
  );
}