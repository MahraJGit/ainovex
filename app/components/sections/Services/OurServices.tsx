import SectionGrid from "../../ui/SectionGrid";
import ServiceCard from "../../ui/ServiceCard";
import Tag from "../../ui/Tag";
import { services } from "../../../lib/services";

export default function OurServices() {
  return (
    <section id="our-services" className="relative overflow-hidden bg-[#05080F]">
      <SectionGrid placement="left" />

      <div className="section-container relative z-10 !pt-[104px] lg:!pt-[120px] pb-20">
        <div className="mb-12 flex flex-col items-center text-center">
          <h2 className="mt-6 max-w-[770px] text-white">
            Our <span className="text-primary">Services</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <ServiceCard key={service.title} {...service} />
          ))}
        </div>
      </div>
    </section>
  );
}