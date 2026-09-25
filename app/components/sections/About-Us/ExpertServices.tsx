import Image from "next/image";
import Link from "next/link";
import SectionGrid from "../../ui/SectionGrid";
import Tag from "../../ui/Tag";
import Button from "../../ui/Button";

const services = [
    { icon: "/icons/about/ai-dev.svg", title: "AI Development", href: "#" },
    { icon: "/icons/about/cloud.svg", title: "Cloud & DevOps", href: "#" },
    { icon: "/icons/about/cyber.svg", title: "Cyber Security", href: "#" },
    { icon: "/icons/about/ai-robot.svg", title: "AI & Automation", href: "#" },
    { icon: "/icons/about/custom-software.svg", title: "Custom Software Development", href: "#" },
    { icon: "/icons/about/it.svg", title: "IT Consulting", href: "#" },
    { icon: "/icons/about/it.svg", title: "QA & Testing", href: "#" },
    { icon: "/icons/about/it.svg", title: "Enterprise Solutions", href: "#" }
];

function ServiceCard({ icon, title, href }: { icon: string; title: string; href: string }) {
  return (
    <Link
      href={href}
      className="group flex flex-col justify-between rounded-3xl bg-white px-6 py-5 min-h-[206px]"
    >
      <div className="flex items-center justify-center rounded-2xl w-fit">
        <Image src={icon} alt="" width={102} height={102} aria-hidden />
      </div>

      <div className="flex items-center justify-between gap-4">
        <h3 className="text-xl text-ink tracking-tight font-semibold">{title}</h3>
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary">
          <Image src="/icons/right-arrow.svg" alt="" width={18} height={18} aria-hidden />
        </div>
      </div>
    </Link>
  );
}
export default function ExpertServices() {
    return (
        <section className="relative overflow-hidden bg-[#05080F]">
            <SectionGrid placement="left" />

            <div className="section-container relative z-10 py-[104px]! lg:py-[120px]!">
                <div className="flex flex-col items-center text-center">
                    <Tag label="Our Core Services" />
                    <h2 className="mt-6 text-white">
                        <span className="text-primary">Our</span> Expertise Services
                    </h2>
                </div>

                <div className="mt-14 mx-auto w-full max-w-[952px]">
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {services.map((service) => (
                            <ServiceCard key={service.title} {...service} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}