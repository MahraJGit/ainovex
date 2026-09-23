import SectionGrid from "../../ui/SectionGrid";
import TurnSkillsCard from "../../ui/Turnskillscard";

const cards = [
  { icon: "/icons/careers/impact/real-world.svg", title: "Real-World Solutions", description: "We don't build for the sake of building. Every project we take on solves an actual problem for an actual business." },
  { icon: "/icons/careers/impact/client-partnership.svg", title: "Client Partnership", description: "We work alongside our clients, not just for them. Understanding their goals helps us deliver work that truly fits." },
  { icon: "/icons/careers/impact/ownership.svg", title: "Ownership Of Ideas", description: "Your ideas don't get lost in the process. We listen, and the best ones shape how a project comes together." },
  { icon: "/icons/careers/impact/cross-industry.svg", title: "Cross-Industry Exposure", description: "Every project brings a new industry. Working across different sectors keeps the work fresh and the learning constant." },
  { icon: "/icons/careers/impact/results.svg", title: "Driving Measurable Results", description: "Impact isn't just a feeling, it's a number. We track outcomes so our work's value is clear and proven." },
  { icon: "/icons/careers/impact/grow.svg", title: "Room To Grow", description: "Your growth matters as much as the project's. We invest in your skills so today's work builds tomorrow's expertise." },
];

export default function TurnSkills() {
  return (
    <section id="turn-skills-into-impact" className="relative overflow-hidden bg-[#05080F]">
      <SectionGrid placement="left" />

      <div className="section-container relative z-10 py-[104px]! lg:py-[120px]!">
        {/* Header */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-16 mb-14">
          <div className="text-center lg:text-left">
            <h2 className="text-white">
              <span className="text-primary">Turn</span> Your Skills Into Lasting Impact
            </h2>
          </div>
          <div className="flex items-center justify-center lg:justify-end">
            <p className="text-base font-medium leading-relaxed text-white/80 text-center lg:text-right max-w-sm lg:max-w-none">
              Great work doesn't stay on a screen, it shows up in real results
              for real clients in the real world.
            </p>
          </div>
        </div>

        {/* Grid — 1 col mobile, 2 col tablet, 3 col desktop */}
        <div className="grid mx-auto justify-items-center grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 max-w-[1032px]">
          {cards.map((card) => (
            <TurnSkillsCard key={card.title} {...card} />
          ))}
        </div>
      </div>
    </section>
  );
}