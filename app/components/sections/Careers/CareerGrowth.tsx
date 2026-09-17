import SectionGrid from "../../ui/SectionGrid";
import GrowthCard from "../../ui/GrowthCard";

const cards = [
    {
        image: "/images/careers/skill-development.png",
        icon: "/icons/careers/growth/skill.svg",
        title: "Skill Development",
        description:
            "Theory only gets you so far. We hand you real projects, real stakes, and the room to figure things out.",
    },
    {
        image: "/images/careers/mentorship.png",
        icon: "/icons/careers/growth/mentorship.svg",
        title: "Mentorship",
        description:
            "No one navigates a career alone. Our senior team shares the lessons that took them years to learn, so you don't have to relearn them the hard way.",
    },
    {
        image: "/images/careers/training.png",
        icon: "/icons/careers/growth/training.svg",
        title: "Training Opportunities",
        description:
            "Skills age fast in this industry. Our programs keep yours skills sharp, current, and ahead of the curve.",
    },
    {
        image: "/images/careers/leadership.png",
        icon: "/icons/careers/growth/leadership.svg",
        title: "Path to Leadership",
        description:
            "Leadership isn't a title handed out, it's a muscle we help you build, one responsibility at a time.",
    },
    {
        image: "/images/careers/promotions.png",
        icon: "/icons/careers/growth/promotions.svg",
        title: "Internal Promotions",
        description:
            "We'd rather promote the person who already knows our work than hire someone who doesn't. That's why we look inward first.",
    },
];

export default function CareerGrowth() {
    const row1 = cards.slice(0, 3);
    const row2 = cards.slice(3);

    return (
        <section id="career-growth" className="relative overflow-hidden bg-[#05080F]">
            <SectionGrid placement="left" />

            <div className="section-container relative z-10 !pt-[104px] lg:!pt-[120px] py-26!">
                {/* Heading */}
                <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
                    <h2 className="text-white">
                        Career <span className="text-primary">Growth</span> &amp; Learning
                    </h2>
                    <p className="mt-4 text-base font-medium text-white/60">
                        Your career shouldn't stop growing the day you stop asking questions.
                        <br />
                        We make sure it never does.
                    </p>
                </div>

                {/* Cards */}
                <div className="mx-auto mt-16 flex max-w-[1072px] flex-col items-center gap-[26px]">
                    {/* Row 1 — 3 cards, 26px gaps */}
                    <div className="flex w-full flex-wrap justify-center gap-[26px]">
                        {row1.map((card) => (
                            <div key={card.title} className="w-full sm:w-[340px]">
                                <GrowthCard {...card} />
                            </div>
                        ))}
                    </div>

                    {/* Row 2 — 2 cards, centered, 51px gap */}
                    <div className="flex w-full flex-wrap justify-center gap-[26px] sm:gap-[51px]">
                        {row2.map((card) => (
                            <div key={card.title} className="w-full sm:w-[340px]">
                                <GrowthCard {...card} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}