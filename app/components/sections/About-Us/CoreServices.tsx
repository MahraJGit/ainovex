import SectionGrid from "../../ui/SectionGrid";
import Button from "../../ui/Button";
import ServiceCard from "../../ui/ServiceCard";
import { services } from "../../../lib/services";
import Tag from "../../ui/Tag";


export default function OurServices() {
  return (
    <section id="our-services" className="relative overflow-hidden bg-[#05080F]">
      <SectionGrid placement="left" />

      <div className="section-container relative z-10 !pt-[104px] lg:!pt-[120px] pb-20">
        <div className="mb-12 flex flex-col items-center text-center">
          <Tag label="Our Core Services" variant="outline" />

          <h2 className="mt-6 max-w-[770px] text-white">
            <span className="text-primary">Our</span> Core Services
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <ServiceCard key={service.title} {...service} />
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <Button variant="solid">View All Services</Button>
        </div>
      </div>
    </section>
  );
}