import SectionGrid from "../../ui/SectionGrid";
import Button from "../../ui/Button";
import ServiceCard from "../../ui/ServiceCard";
import { getServiceCardProps } from "../../../lib/services";
import { getPublishedServices } from "../../../lib/serviceQueries";
import Tag from "../../ui/Tag";

export default async function OurServices() {
  const displayed = (await getPublishedServices()).slice(0, 6);

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

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {displayed.map((service) => (
            <ServiceCard
              key={service.slug}
              {...getServiceCardProps(service)}
            />
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
