import Link from "next/link";
import Button from "../../ui/Button";
import SectionGrid from "../../ui/SectionGrid";

type ServiceDetailHeroProps = {
  title: string;
  headline: string;
  description: string;
  icon: string;
};

export default function ServiceDetailHero({
  title,
  headline,
  description,
  icon,
}: ServiceDetailHeroProps) {
  return (
    <section className="relative overflow-hidden bg-[#05080F]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 55% at 50% -15%, rgba(56,189,248,0.28), transparent 60%)",
        }}
      />
      <SectionGrid placement="center-dark" className="mt-20 opacity-70" />

      <div className="section-container relative z-10 !pt-[150px] pb-16 sm:!pt-[168px] lg:!pt-[180px] lg:pb-20">
        <nav
          aria-label="Breadcrumb"
          className="mb-8 flex flex-wrap items-center gap-2 text-[13px] text-white/50"
        >
          <Link href="/" className="transition hover:text-primary">
            Home
          </Link>
          <span aria-hidden>/</span>
          <Link href="/services" className="transition hover:text-primary">
            Services
          </Link>
          <span aria-hidden>/</span>
          <span className="truncate text-white/70">{title}</span>
        </nav>

        <div className="grid items-center gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <div className="mb-5 inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/5 px-4 py-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={icon}
                alt=""
                width={22}
                height={22}
                className="size-[22px] object-contain"
                aria-hidden
              />
              <span className="text-[12px] font-semibold uppercase tracking-[0.12em] text-white/70">
                {title}
              </span>
            </div>

            <h1 className="max-w-[740px] text-[34px] font-bold leading-[1.12] tracking-[-0.03em] text-white sm:text-[44px] lg:text-[52px]">
              {headline}
            </h1>

            <p className="mt-5 max-w-[640px] text-[16px] leading-relaxed text-white/70 sm:text-[18px]">
              {description}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/contact-us#contact-form" variant="solid">
                Get Free Consultation
              </Button>
              <Button href="/services#our-services" variant="outline">
                All Services
              </Button>
            </div>
          </div>

          <div className="relative mx-auto flex h-[240px] w-full max-w-[360px] items-center justify-center rounded-[28px] border border-[#21325E] bg-[#0C1222] lg:h-[300px] lg:max-w-none">
            <div
              aria-hidden
              className="absolute inset-6 rounded-[22px] bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.18),transparent_70%)]"
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={icon}
              alt={`${title} icon`}
              width={96}
              height={96}
              className="relative z-10 size-20 object-contain lg:size-24"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
