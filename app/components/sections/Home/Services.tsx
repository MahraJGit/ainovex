// import Button from "../../ui/Button";
// import SectionGrid from "../../ui/SectionGrid";
// import ServiceCard from "../../ui/ServiceCard";
// import Tag from "../../ui/Tag";
// import { services } from "../../../lib/services";

// export default function Services() {
//   return (
//     <section id="services" className="relative overflow-hidden bg-[#0A0F1C]">
//       <SectionGrid placement="left" />

//       <div className="section-container-fluid relative z-10">
//         <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
//           <Tag label="Our Services" variant="outline" />

//           <h2 className="mt-6 max-w-[770px] text-white">
//             <span className="text-primary">Smart Digital</span> Solutions Designed
//             for Your Success
//           </h2>

//           <p className="mt-4 max-w-xl text-base font-medium leading-[140%] text-white/60">
//             We transform complex ideas into clean, intuitive designs that users
//             understand, enjoy, and trust.
//           </p>
//         </div>

//         <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
//           {services.map((service) => (
//             <ServiceCard key={service.title} {...service} />
//           ))}
//         </div>

//         <div className="mt-14 flex justify-center">
//           <Button href="/services" variant="solid">
//             View All Services
//           </Button>
//         </div>
//       </div>
//     </section>
//   );
// }


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