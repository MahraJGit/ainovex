import SectionGrid from "../../ui/SectionGrid";
import Tag from "../../ui/Tag";
import HiringStepCard from "../../ui/Hiringstepcard";
import HiringConnector from "../../ui/HiringConnector";

const steps = [
    {
        step: "First Step",
        title: "Application Review",
        description:
            "Every application is reviewed with care, looking beyond the resume to find genuine alignment between your skills, experience, and the role.",
        side: "left",
    },
    {
        step: "Second Step",
        title: "Initial Interview",
        description:
            "A genuine conversation about your background, your goals, and where you could thrive within our team.",
        side: "right",
    },
    {
        step: "Third Step",
        title: "Skill Assessment",
        description:
            "A chance to demonstrate your expertise in action, showing how you think, solve, and approach real challenges.",
        side: "left",
    },
    {
        step: "Fourth Step",
        title: "Final Discussion",
        description:
            "An in-depth conversation covering expectations and responsibilities, ensuring alignment on both sides before moving forward.",
        side: "right",
    },
    {
        step: "Fifth Step",
        title: "Welcome Onboard",
        description:
            "Once selected, your journey begins with thoughtful onboarding, built to set you up for success from day one.",
        side: "left",
    },
];

/**
 * Zigzag geometry (Figma, content width 1274):
 *   card width = 614  →  48.2% of the container
 *   lane gap   =  46px
 *   overlap    =  60px
 *   drop       = cardHeight / 2 - overlap = 271 / 2 - 60 ≈ 76px
 *
 * The connector is ONE box: border-top draws the horizontal leg,
 * border-right (or left) draws the vertical leg, and the rounded
 * corner joins them. Dashes wrap the radius on their own.
 */
const LANE_GAP = "40px";
const DROP = "76px";
const OVERLAP = "lg:-mt-[60px]";

export default function HiringProcess() {
    return (
        <section id="hiring-process" className="relative overflow-hidden bg-[#05080F]">
            <SectionGrid placement="left" />

            <div className="section-container relative z-10 py-[104px]! pb-20 lg:py-[120px]!">
                {/* Header */}
                <div className="mb-16 grid grid-cols-1 gap-4">
                    <Tag label="Process" className="w-fit" />

                    <div className="flex items-center">
                        <h2 className="text-white">
                            Our <span className="text-primary">Hiring</span> Process
                        </h2>
                        <p className="text-base font-medium leading-tight tracking-[-2%] text-white/80 lg:text-right max-w-[822px]">
                            We believe hiring should be transparent and straightforward, built
                            to understand who you are, while giving you a clear view of what
                            lies ahead.
                        </p>
                    </div>
                </div>

                {/* Zigzag steps */}
                <div className="mx-auto flex max-w-[1274px] flex-col gap-6 lg:gap-0">
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
                                {/* Elbow: across from the previous card, rounded turn, then down */}
                                {index !== 0 && (
                                    <HiringConnector side={isRight ? "right" : "left"} id={String(index)} />
                                )}

                                <div className="relative z-10">
                                    <HiringStepCard
                                        step={step.step}
                                        title={step.title}
                                        description={step.description}
                                    />
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}