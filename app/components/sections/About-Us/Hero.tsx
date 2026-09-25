import Image from "next/image";
import Button from "../../ui/Button";
import HeroCard from "../../ui/HeroCard";

const stats = [
  { icon: "/icons/about/satisfaction.svg", metric: "98%", label: "Client Satisfaction" },
  { icon: "/icons/about/delivery.svg", metric: "150+", label: "Projects Delivered" },
  { icon: "/icons/about/growth.svg", metric: "40%", label: "Efficiency Growth" },
  { icon: "/icons/about/support.svg", metric: "24/7", label: "Expert Support" },
  { icon: "/icons/about/support.svg", metric: "15+", label: "Global Partners" },
  { icon: "/icons/about/support.svg", metric: "95%", label: "On-Time Delivery" },
];

export default function AboutHero() {
  const handleScrollToTeam = () => {
    const section = document.getElementById("meet-our-team");
    if (section) section.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="about-hero" className="relative min-h-screen overflow-hidden bg-black">
      {/* Illustration: desktop only, anchored to right edge */}
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
      <div className="header-padding"/>
      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-[1280px] px-6 xl:px-0 pb-16 pt-8 sm:pt-12 lg:pt-[260px] flex flex-col items-center text-center lg:items-start lg:text-left"
      >

        <h1 className="max-w-[800px] text-white">
          <span className="font-bold text-[#38BDF8]">Creating</span> Digital Experiences
          <br className="hidden sm:block" /> That{" "}
          <span className="font-bold text-[#38BDF8]">Deliver Results</span>
          <br className="hidden sm:block" />{" "}
          <span className="font-bold text-[#38BDF8]">and Success</span>
        </h1>

        <p className="mt-6 max-w-[600px] font-medium text-white/80 hero-desc">
          We at Ainovex Technologies build smart digital solutions that
          transform ideas into impactful experiences, driving measurable
          growth for businesses worldwide.
        </p>

        <Button
          variant="solid"
          className="mt-8"
          onClick={handleScrollToTeam}
        >
          View Our Team
        </Button>

        <div className="mt-8 grid w-fit text-left grid-cols-2 gap-[14px] sm:grid-cols-3 lg:grid-cols-4 mx-auto lg:mx-0">
          {stats.map((stat, i) => (
            <HeroCard key={i} {...stat} size="sm" />
          ))}
        </div>
      </div>
    </section>
  );
}