import SectionGrid from "../../ui/SectionGrid";
import Button from "../../ui/Button";
import ServiceCard from "../../ui/ServiceCard";
import { services } from "../../../lib/services";

export default function OurServices() {
  return (
    <section id="our-services" className="relative overflow-hidden bg-[#05080F]">
      <SectionGrid placement="left" />

      <div className="section-container relative z-10 pt-[104px]! lg:py-[120px]!">
        <div className="mb-12 flex flex-col items-center text-center">
          <h2 className="text-white tracking-[-2.25px]">
            Our <span className="text-primary">Services</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
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