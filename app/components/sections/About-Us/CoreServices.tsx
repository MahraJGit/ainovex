import Button from "../../ui/Button";
import SectionGrid from "../../ui/SectionGrid";
import ServiceCard from "../../ui/ServiceCard";
import Tag from "../../ui/Tag";
import { services } from "../../../lib/services";

export default function CoreServices() {
  return (
    <section id="services" className="relative overflow-hidden bg-[#0A0F1C]">
      <SectionGrid placement="left" />

      <div className="section-container-fluid relative z-10 py-[104px]! lg:py-[120px]!">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <Tag label="Our Core Services" variant="outline" />

          <h2 className="mt-6 max-w-[770px] text-white">
            <span className="text-primary">Our</span> Core Services
          </h2>
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