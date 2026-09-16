import Image from "next/image";
import HeroCard from "../../ui/HeroCard"; // adjust path to where HeroCard lives

const stats = [
  { icon: "/icons/about/satisfaction.svg", metric: "98%", label: "Client Satisfaction" },
  { icon: "/icons/about/delivery.svg", metric: "150+", label: "Projects Delivered" },
  { icon: "/icons/about/growth.svg", metric: "40%", label: "Efficiency Growth" },
  { icon: "/icons/about/support.svg", metric: "24/7", label: "Expert Support" },
  { icon: "/icons/about/support.svg", metric: "24/7", label: "Expert Support" },
  { icon: "/icons/about/support.svg", metric: "24/7", label: "Expert Support" },
];

export default function AboutHero() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-black">
      {/* Illustration: anchored to the RIGHT edge of the screen.
          In Figma the 721 x 703 box starts 550px from the right edge and runs 171px past it. */}
      <div className="pointer-events-none absolute right-[-171px] top-[190px] hidden h-[703px] w-[721px] lg:block">
        <Image
          src="/images/aboutus/about-hero.svg"
          alt="About Ainovex"
          fill
          sizes="721px"
          className="object-contain object-left"
          priority
        />
      </div>

      {/* Same 1280px width as the navbar, no inner padding, so the text lines up with the navbar's left edge */}
      <div className="relative z-10 mx-auto w-full max-w-[1280px] px-6 pb-16 pt-40 xl:px-0 lg:pt-[260px]">
        <h1 className="max-w-[800px] text-[40px] font-medium leading-[1.07] text-white sm:text-[48px] lg:text-[56px]">
          <span className="font-bold text-[#38BDF8]">Creating</span> Digital Experiences
          <br className="hidden sm:block" /> That{" "}
          <span className="font-bold text-[#38BDF8]">Deliver Results</span>
          <br className="hidden sm:block" />{" "}
          <span className="font-bold text-[#38BDF8]">and Success</span>
        </h1>

        <p className="mt-8 max-w-[600px] font-medium text-white text-[18px]">
          We at Ainovex Technologies build smart digital solutions that
          transform ideas into impactful experiences, driving measurable
          growth for businesses worldwide.
        </p>

        <button
          type="button"
          className="mt-8 inline-flex h-12 items-center justify-center rounded-full bg-white px-8 text-[16px] font-medium text-black transition-colors hover:bg-white/90"
        >
          View Our Team
        </button>

        <div className="mt-8 grid w-fit grid-cols-2 gap-[14px] sm:grid-cols-4">
          {stats.map((stat, i) => (
            <HeroCard key={i} {...stat} size="sm" />
          ))}
        </div>
      </div>
    </section>
  );
}