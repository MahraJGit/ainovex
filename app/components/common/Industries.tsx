import Button from "../ui/Button";
import IndustriesCard from "../ui/IndustriesCard";
import SectionGrid from "../ui/SectionGrid";
import Tag from "../ui/Tag";

export default function Industries() {
    return (
        <section id="industries" className="relative overflow-hidden bg-[#0A0F1C]">
            <SectionGrid placement="left" width="60%" />
            <div className="section-container relative z-10 py-[104px]! lg:py-[120px]!">
                <div className="mx-auto flex flex-col items-center text-center">
                    <Tag label="Industries We Serve" />
                    <h2 className="my-6 text-white max-w-3xl"><span className="text-primary">Building Success</span> Across
                        Diverse Markets</h2>
                    <p className="text-base font-medium leading-[100%] text-white/80">We deliver industry focused digital solutions designed to address unique challenges, audiences, and growth opportunities.</p>
                </div>
                <div className="flex flex-col mt-16 gap-y-8">
                    <IndustriesCard />
                    <IndustriesCard />
                    <IndustriesCard />
                </div>
                <div className="flex justify-center mt-16">
                    <Button variant="solid">
                        View All
                    </Button>
                </div>
            </div>

        </section>
    );
}