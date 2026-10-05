import SectionGrid from "../../ui/SectionGrid";
import ServiceCard from "../../ui/ServiceCard";
import { getServiceCardProps } from "../../../lib/services";
import { getPublishedServices } from "../../../lib/serviceQueries";

export default async function OurServices() {
  const services = await getPublishedServices();

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
            <ServiceCard
              key={service.slug}
              {...getServiceCardProps(service)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
