import Image from "next/image";
import SectionGrid from "../../ui/SectionGrid";

export default function HowWeWork() {
  return (
    <section id="how-we-work" className="relative overflow-hidden bg-white">
      <SectionGrid placement="left-light" />

      <div className="section-container relative z-10 py-[104px]! lg:py-[120px]!">

        {/* Header — heading left, description right */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-16 mb-12">
          <div>
            <h2 className="text-ink">
              <span className="text-primary">How</span> We Work
            </h2>
          </div>
          <div className="flex items-center lg:justify-end">
            <p className="text-base leading-snug text-ink lg:text-right max-w-[563px]">
              Explore exciting career opportunities and join a team where your
              skills, ideas, and hard work truly make a difference.
            </p>
          </div>
        </div>

        {/* Full-width process image */}
        <div className="w-full overflow-hidden rounded-2xl">
          <Image
            src="/images/services/how-we-work.jpg"
            alt="How We Work — 8 step process from Initiation to Project Deliver"
            width={1287}
            height={396}
            className="w-full h-auto"
          />
        </div>

      </div>
    </section>
  );
}