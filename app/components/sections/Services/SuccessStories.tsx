import SectionGrid from "../../ui/SectionGrid";
import Tag from "../../ui/Tag";
import CaseStudyCard from "../../ui/CaseStudyCard";

const caseStudies = [
  {
    image: "/images/services/case-study-1.png",
    title: "The Web Apps-solutions, marketing solutions and Web Apps.",
    href: "#",
  },
  {
    image: "/images/services/case-study-2.png",
    title: "The work software development and build solutions",
    href: "#",
  },
  {
    image: "/images/services/case-study-3.png",
    title: "The Web Apps-solutions, marketing solutions and Web Apps",
    href: "#",
  },
];

export default function ClientSuccessStories() {
  return (
    <section id="client-success-stories" className="relative overflow-hidden bg-white">
      <SectionGrid placement="center" />

      <div className="section-container relative z-10 py-[104px]! lg:py-[120px]! max-w-[1330px]!">

        {/* Centered heading */}
        <div className="mx-auto flex flex-col items-center text-center gap-4 max-w-[852px] mb-16">
          <Tag label="Client Success Stories" />
          <h2 className="mt-6 text-text-black-v1">
            Where Our Words{" "}
            <span className="text-primary">Speaks Louder</span>
            <br className="hidden md:block"/>
            {" "}Than Words
          </h2>
          <p className="mt-4 text-base max-w-[563px] font-normal leading-snug text-ink">
            Real campaigns, real impact, and real growth stories from clients who
            chose Ainovex and never regretted it.
          </p>
        </div>

        {/* 3-col card grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-[1280px]">
          {caseStudies.map((cs) => (
            <CaseStudyCard key={cs.title} {...cs} />
          ))}
        </div>

      </div>
    </section>
  );
}