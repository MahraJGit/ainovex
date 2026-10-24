import Link from "next/link";
import Image from "next/image";
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
  const whyChooseUs = service.why_choose_us;
  const hasValidCtaHref = whyChooseUs
    ? (whyChooseUs.cta_href.startsWith("/") &&
        !whyChooseUs.cta_href.startsWith("//")) ||
      /^https?:\/\//i.test(whyChooseUs.cta_href)
    : false;

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
              <h2 className="mt-6 text-primary">
                {service.overview_heading}
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

      {service.process_steps.length > 0 ? (
        <section className="relative overflow-hidden bg-white">
          <SectionGrid placement="left-light" />
          <div className="section-container relative z-10 py-16 lg:py-24">
            <Tag
              label="Our delivery process"
              variant="outline"
              className="[&_span]:text-black-v1"
            />
            <h2 className="mt-5 text-black-v1">
              {service.process_heading || "Our Delivery Process"}
            </h2>
            <div className="mt-10 grid gap-7 sm:grid-cols-2 lg:grid-cols-4">
              {service.process_steps.map((step, index) => (
                <article key={`${step.title}-${index}`} className="relative">
                  {index < service.process_steps.length - 1 ? (
                    <span
                      aria-hidden="true"
                      className="absolute right-0 top-3 hidden text-2xl text-primary lg:block"
                    >
                      →
                    </span>
                  ) : null}
                  <span className="flex size-14 items-center justify-center rounded-full bg-primary text-[16px] font-bold text-white">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-5 text-[18px] font-bold text-black-v1">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-black-v1/65">
                    {step.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {whyChooseUs &&
      (whyChooseUs.items.length > 0 ||
        whyChooseUs.heading ||
        whyChooseUs.description) ? (
        <section className="relative overflow-hidden bg-[#05080F]">
          <SectionGrid placement="left" />
          <div className="section-container relative z-10 py-16 lg:py-24">
            <div className="grid gap-10 lg:grid-cols-[0.8fr_1.8fr] lg:items-center">
              <div>
                {whyChooseUs.eyebrow ? (
                  <Tag label={whyChooseUs.eyebrow} variant="outline" />
                ) : null}
                <h2 className="mt-5 text-white">
                  {whyChooseUs.heading || "Why choose us"}
                </h2>
                {whyChooseUs.description ? (
                  <p className="mt-4 max-w-md text-[15px] leading-relaxed text-white/65">
                    {whyChooseUs.description}
                  </p>
                ) : null}
                {whyChooseUs.cta_text && hasValidCtaHref ? (
                  <Link
                    href={whyChooseUs.cta_href}
                    className="mt-6 inline-flex items-center gap-2 text-[13px] font-semibold text-white transition hover:text-primary"
                  >
                    {whyChooseUs.cta_text} <span aria-hidden="true">→</span>
                  </Link>
                ) : null}
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {whyChooseUs.items.map((item, index) => (
                  <article
                    key={`${item.title}-${index}`}
                    className="rounded-xl border border-white/10 bg-gradient-to-br from-[#0C2039] to-[#071224] p-5"
                  >
                    {item.icon ? (
                      <Image
                        src={item.icon}
                        alt=""
                        width={32}
                        height={32}
                        unoptimized
                        aria-hidden="true"
                      />
                    ) : null}
                    <p className="mt-3 text-[11px] font-bold text-primary">
                      {String(index + 1).padStart(2, "0")}
                    </p>
                    <h3 className="mt-1 text-[16px] font-semibold text-white">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-[13px] leading-relaxed text-white/60">
                      {item.description}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>
      ) : null}

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
