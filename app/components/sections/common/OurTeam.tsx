import Image from "next/image";
import SectionGrid from "../../ui/SectionGrid";
import Tag from "../../ui/Tag";

const columns = [
    {
        photos: [
            { src: "/images/team/member-1.png", size: "lg" },
            { src: "/images/team/member-2.png", size: "sm" },
        ],
    },
    {
        photos: [
            { src: "/images/team/member-3.png", size: "sm" },
            { src: "/images/team/member-4.png", size: "lg" },
        ],
    },
    {
        photos: [
            { src: "/images/team/member-5.png", size: "lg" },
            { src: "/images/team/member-6.png", size: "sm" },
        ],
    },
    {
        photos: [
            { src: "/images/team/member-7.png", size: "sm" },
            { src: "/images/team/member-8.png", size: "lg" },
        ],
    },
] as const;

function TeamPhoto({ src, size }: { src: string; size: "sm" | "lg" }) {
    return (
        <div
            className={`relative overflow-hidden rounded-full
                w-[96px] lg:w-[116px]
                ${size === "lg"
                    ? "h-[148px] lg:h-[178px]"
                    : "h-[52px] lg:h-[64px]"
                }`}
        >
            <Image
                src={src}
                alt="Team member"
                fill
                sizes="(max-width: 1024px) 96px, 116px"
                className={`object-cover ${size === "lg" ? "object-top" : "object-[50%_20%]"}`}
            />
        </div>
    );
}

export default function MeetOurTeam() {
    return (
        <section id="meet-our-team" className="relative overflow-hidden bg-[#05080F]">
            <SectionGrid placement="left" />

            <div className="section-container relative z-10 py-16 md:py-[104px]! lg:py-[120px]! flex flex-col gap-4">
                {/* Centered heading */}
                <div className="mx-auto flex flex-col items-center text-center gap-3 md:gap-4 max-w-[90%] md:max-w-[600px] lg:max-w-none">
                    <Tag label="Our Team" />
                    <h2 className="mt-3 md:mt-6 text-white text-2xl md:text-3xl lg:text-4xl">
                        <span className="text-primary">Meet</span> Our Talented Team
                    </h2>
                    <p className="text-sm md:text-base leading-relaxed text-white">
                        Behind every successful project is a team that truly cares. Our experts
                        bring skill, passion, and purpose to everything they build.
                    </p>
                </div>

                {/* Team photos */}
                {/* Team photos */}
                <div className="grid gap-3 md:flex md:flex-nowrap md:items-start md:justify-center md:gap-3 lg:gap-4 mt-4 md:mt-6"
                    style={{ gridTemplateColumns: 'repeat(2, 96px)', justifyContent: 'center' }}
                >
                    {columns.map((col, i) => (
                        <div key={i} className="flex flex-col gap-3 lg:gap-4 items-center">
                            {col.photos.map((photo) => (
                                <TeamPhoto key={photo.src} src={photo.src} size={photo.size} />
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}