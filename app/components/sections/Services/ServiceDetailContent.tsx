import Link from "next/link";
import Faq from "../common/Faq";
import CTABanner from "../common/CTAbanner";
import ServiceCard from "../../ui/ServiceCard";
import SectionGrid from "../../ui/SectionGrid";
import Tag from "../../ui/Tag";
import {
  getServiceCardProps,
  type Service,
  type ServiceListItem,
} from "@/app/lib/services";

type ServiceDetailContentProps = {
  service: Service;
  related: ServiceListItem[];
};

export default function ServiceDetailContent({
  service,
  related,
}: ServiceDetailContentProps) {
  const hasSidebar =
    service.deliverables.length > 0 || service.technologies.length > 0;

  return (
    <>
      <section className="relative overflow-hidden bg-white">
        <SectionGrid placement="left-light" />
        <div className="section-container relative z-10 py-16 lg:py-24">
          <div
            className={`grid gap-12 lg:gap-16 ${
              hasSidebar ? "lg:grid-cols-[1.15fr_0.85fr]" : ""
            }`}
          >
            <div>
              <Tag
                label="Overview"
                variant="outline"
                className="[&_span]:text-black-v1"
              />
              <h2 className="mt-6 text-black-v1">
                What you get with our{" "}
                <span className="text-primary">{service.title}</span>
              </h2>
              <div
                className="blog-content mt-6"
                dangerouslySetInnerHTML={{ __html: service.content }}
              />
            </div>

            {hasSidebar ? (
              <aside className="rounded-2xl border border-black-v1/10 bg-[#F8FAFC] p-6 lg:h-fit lg:p-8">
                {service.deliverables.length > 0 ? (
                  <>
                    <h3 className="text-[20px] font-semibold text-black-v1">
                      Key deliverables
                    </h3>
                    <ul className="mt-5 space-y-3">
                      {service.deliverables.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-3 text-[15px] leading-relaxed text-black-v1/75"
                        >
                          <span className="mt-1.5 size-2 shrink-0 rounded-full bg-primary" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </>
                ) : null}

                {service.technologies.length > 0 ? (
                  <div
                    className={
                      service.deliverables.length > 0
                        ? "mt-8 border-t border-black-v1/10 pt-6"
                        : ""
                    }
                  >
                    <h3 className="text-[16px] font-semibold text-black-v1">
                      Technologies & tools
                    </h3>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {service.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-full border border-black-v1/10 bg-white px-3 py-1.5 text-[12px] font-semibold text-black-v1/70"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                ) : null}
              </aside>
            ) : null}
          </div>
        </div>
      </section>

      {service.faqs.length > 0 ? <Faq faqs={service.faqs} /> : null}

      {related.length > 0 ? (
        <section className="relative overflow-hidden bg-[#05080F]">
          <SectionGrid placement="left" />
          <div className="section-container relative z-10 py-16 lg:py-24">
            <div className="mb-12 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <Tag label="Explore more" variant="outline" />
                <h2 className="mt-6 text-white">
                  Related <span className="text-primary">services</span>
                </h2>
              </div>
              <Link
                href="/services#our-services"
                className="text-[13px] font-bold uppercase tracking-[0.1em] text-primary hover:underline"
              >
                View all services →
              </Link>
            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
              {related.map((item) => (
                <ServiceCard key={item.slug} {...getServiceCardProps(item)} />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <CTABanner
        heading={
          <>
            Ready to start your{" "}
            <span className="text-primary">{service.title}</span> project?
          </>
        }
        description="Tell us about your goals and we will recommend a practical path, timeline, and team fit — with no obligation."
        buttonText="Book My Free Call"
        href="/contact-us#contact-form"
      />
    </>
  );
}
