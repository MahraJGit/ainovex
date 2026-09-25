import Image from "next/image";
import SectionGrid from "../../ui/SectionGrid";
import Tag from "../../ui/Tag";
import Button from "../../ui/Button";

const reasons = [
  {
    icon: "/icons/careers/growth.svg",
    title: "Growth Opportunities",
    description:
      "From day one, you'll work on problems that stretch you, backed by mentorship, real training, and genuine opportunities to lead, not just learn.",
    col: 1,
  },
  {
    icon: "/icons/careers/environment.svg",
    title: "Supportive Work Environment",
    description:
      "A culture built on respect, not hierarchy. Teammates who collaborate instead of compete, because the best work happens when people actually have each other's backs.",
    col: 2,
  },
  {
    icon: "/icons/careers/projects.svg",
    title: "Meaningful Projects",
    description:
      "Your work won't sit in a drawer. You'll help real businesses solve real problems, and see the impact of what you build.",
    col: 1,
  },
  {
    icon: "/icons/careers/recognition.svg",
    title: "Recognition and Appreciation",
    description:
      "Effort doesn't go unnoticed here. We celebrate the big wins and the quiet, consistent work that keeps everything moving forward.",
    col: 2,
  },
  {
    icon: "/icons/careers/projects.svg",
    title: "Long Term Career Development",
    description:
      "We're not hiring for a role, we're investing in a career. Expect new challenges, new skills, and a clear path forward as you grow with us.",
    col: 1,
  },
];

function ReasonCard({ icon, title, description }: { icon: string; title: string; description: string }) {
  return (
    <article className="w-full rounded-4xl bg-[#EBF8FE] p-5 sm:max-w-[324px]">
      <Image src={icon} alt="" width={56} height={56} className="mb-3" aria-hidden />
      <h3 className="text-[17px] font-semibold text-[#161C2D]">{title}</h3>
      <p className="mt-1.5 text-sm font-normal leading-snug text-text-black-v1/87">{description}</p>
    </article>
  );
}

export default function WhyUs() {
  const col1 = reasons.filter((r) => r.col === 1);
  const col2 = reasons.filter((r) => r.col === 2);

  return (
    <section id="why-join-us" className="relative overflow-hidden bg-white">
      <SectionGrid placement="left-light" />

      <div className="section-container relative z-10 py-[104px]! lg:py-[120px]!">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-0">

          {/* Left */}
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left max-w-[474px] mx-auto lg:mx-0">
            <Tag label="Why Us" />
            <h2 className="mt-6 text-black-v1/87 tracking-[-2.25px]">
              Why <span className="text-primary">Join</span> Our Team?
            </h2>
            <p className="mt-4 text-base font-medium text-text-black-v1/87 max-w-sm">
              Join a workplace built on trust, where ideas are heard, effort is
              recognized, and growth isn't a promise, it's a practice.
            </p>
          </div>

          {/* Right: staggered 2-col on sm+, single col on mobile */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-4 items-end lg:items-center">
              {col1.map((r) => <ReasonCard key={r.title} {...r} />)}
            </div>
            <div className="flex flex-col gap-4 lg:items-center sm:mt-[46px]">
              {col2.map((r) => <ReasonCard key={r.title} {...r} />)}
            </div>
          </div>
        </div>

        {/* <div className="mt-8 flex justify-center">
          <Button variant="primary">View all</Button>
        </div> */}
      </div>
    </section>
  );
}