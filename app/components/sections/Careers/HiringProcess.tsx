import SectionGrid from "../../ui/SectionGrid";
import Tag from "../../ui/Tag";
import HiringStepCard from "../../ui/Hiringstepcard";
import HiringConnector from "../../ui/HiringConnector";

const steps = [
  { step: "First Step", title: "Application Review", description: "Every application is reviewed with care, looking beyond the resume to find genuine alignment between your skills, experience, and the role.", side: "left" },
  { step: "Second Step", title: "Initial Interview", description: "A genuine conversation about your background, your goals, and where you could thrive within our team.", side: "right" },
  { step: "Third Step", title: "Skill Assessment", description: "A chance to demonstrate your expertise in action, showing how you think, solve, and approach real challenges.", side: "left" },
  { step: "Fourth Step", title: "Final Discussion", description: "An in-depth conversation covering expectations and responsibilities, ensuring alignment on both sides before moving forward.", side: "right" },
  { step: "Fifth Step", title: "Welcome Onboard", description: "Once selected, your journey begins with thoughtful onboarding, built to set you up for success from day one.", side: "left" },
];

const OVERLAP = "lg:-mt-[60px]";

export default function HiringProcess() {
  return (
    <section id="hiring-process" className="relative overflow-hidden bg-[#05080F]">
      <SectionGrid placement="left" />

      <div className="section-container relative z-10 py-[104px]! lg:py-[120px]!">
        {/* Header */}
        <div className="mb-16 flex flex-col gap-4 lg:grid lg:grid-cols-2 lg:items-center">
          <div className="flex flex-col gap-4 items-center">
            <Tag label="Process" className="w-fit" />
            <h2 className="text-white text-center lg:text-left">
              Our <span className="text-primary">Hiring</span> Process
            </h2>
          </div>
          <p className="text-base font-medium leading-tight text-white/80 text-center lg:text-right max-w-[822px] mx-auto lg:mx-0">
            We believe hiring should be transparent and straightforward, built
            to understand who you are, while giving you a clear view of what
            lies ahead.
          </p>
        </div>

        {/* Mobile: simple numbered list */}
        <div className="flex flex-col gap-6 lg:hidden">
          {steps.map((step, index) => (
            <div key={step.step} className="flex gap-4 rounded-2xl border border-white/10 bg-white/5 p-5">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">
                {index + 1}
              </div>
              <div>
                <p className="text-xs font-semibold text-primary/80 uppercase tracking-wide">{step.step}</p>
                <h3 className="mt-0.5 text-[16px] font-bold text-white">{step.title}</h3>
                <p className="mt-1 text-sm font-normal leading-snug text-white/60">{step.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop: zigzag */}
        <div className="mx-auto hidden max-w-[1274px] flex-col gap-6 lg:flex lg:gap-0">
          {steps.map((step, index) => {
            const isRight = step.side === "right";
            return (
              <div
                key={step.step}
                className={[
                  "relative w-full lg:w-[48.2%]",
                  isRight ? "lg:ml-auto" : "",
                  index !== 0 ? OVERLAP : "",
                ].join(" ")}
              >
                {index !== 0 && (
                  <HiringConnector side={isRight ? "right" : "left"} id={String(index)} />
                )}
                <div className="relative z-10">
                  <HiringStepCard step={step.step} title={step.title} description={step.description} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}