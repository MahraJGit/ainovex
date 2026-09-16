import Image from "next/image";
import SectionGrid from "../ui/SectionGrid";
import Tag from "../ui/Tag";

// Figma layout: 4 columns, all top aligned, no offsets.
// Tall and short pills alternate, so columns 1 and 3 start tall
// and columns 2 and 4 start short. Every column ends at the same height.
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
            className={`relative w-[116px] overflow-hidden rounded-full ${size === "lg" ? "h-[178px]" : "h-[64px]"
                }`}
        >
            <Image
                src={src}
                alt="Team member"
                fill
                sizes="116px"
                className={`object-cover ${size === "lg" ? "object-top" : "object-[50%_20%]"}`}
            />
        </div>
    );
}

export default function MeetOurTeam() {
    return (
        <section id="meet-our-team" className="relative overflow-hidden bg-[#0A0F1C]">
            <SectionGrid placement="left" />

            <div className="section-container relative z-10 py-[104px]! lg:py-[120px]! flex flex-col gap-4">
                {/* Centered heading */}
                <div className="mx-auto flex flex-col items-center text-center gap-4">
                    <Tag label="Our Team" />
                    <h2 className="mt-6 text-white">
                        <span className="text-primary">Meet</span> Our Talented Team
                    </h2>
                    <p className=" text-base leading-relaxed text-white">
                        Behind every successful project is a team that truly cares. Our experts
                        bring skill, passion, and purpose to everything they build.
                    </p>
                </div>

                {/* Team photos: 4 top aligned columns */}
                <div className="flex items-start justify-center gap-4">
                    {columns.map((col, i) => (
                        <div key={i} className="flex flex-col gap-4">
                            {col.photos.map((photo) => (
                                <TeamPhoto key={photo.src} {...photo} />
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}