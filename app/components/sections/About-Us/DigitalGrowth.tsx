import Image from "next/image";
import SectionGrid from "../../ui/SectionGrid";

const items = [
  { icon: "/icons/about/strategy.svg", label: "Strategy driven solutions", align: "left" },
  { icon: "/icons/about/results.svg", label: "Results focused execution", align: "right" },
  { icon: "/icons/about/success.svg", label: "Built for long term success", align: "left" },
  { icon: "/icons/about/side-support.svg", label: "Always by your side", align: "right" },
] as const;

export default function DigitalGrowth() {
  return (
    <section className="relative overflow-hidden bg-[#05080F]">
      <SectionGrid placement="left" />

      <div className="section-container relative z-10 py-[104px]! lg:py-[120px]!">
        <div className="grid grid-cols-1 items-center lg:grid-cols-[1.2fr_1fr]">

          {/* Left — centered below lg */}
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
            <h2 className="text-[36px] font-bold leading-[1.25] tracking-[-2.25px] text-white lg:text-[48px]">
              The <span className="text-[#38BDF8]">Partner</span> Behind Your
              <br className="hidden sm:block" /> Digital Growth
            </h2>
            <p className="mt-8 max-w-[490px] text-[16px] font-normal leading-[1.35] text-white">
              We don't just build products. We build businesses. Every solution
              we create is focused on pushing your brand further and growing
              stronger.
            </p>
          </div>

          {/* Right: feature pills — centered below lg, mt for spacing on small screens */}
          <div className="mt-10 flex w-full flex-col items-center gap-7 lg:mt-0">
            {items.map((item) => {
              const isRight = item.align === "right";

              return (
                <div
                  key={item.label}
                  className={`flex h-[94px] w-full max-w-[564px] items-center gap-8 rounded-[14px] px-2 ${
                    isRight ? "flex-row-reverse" : "flex-row"
                  }`}
                  style={{
                    background: `linear-gradient(${isRight ? "to left" : "to right"}, #05080F 0%, #05080F 20%, #38BDF8 92%)`,
                    boxShadow: "0 0 24px rgba(0,0,0,0.55)",
                  }}
                >
                  <div className="flex h-[80px] w-[80px] shrink-0 items-center justify-center">
                    <Image src={item.icon} alt="" width={80} height={80} aria-hidden />
                  </div>
                  <span
                    className={`flex-1 text-[18px] font-medium text-white ${
                      isRight ? "text-right" : "text-left"
                    }`}
                  >
                    {item.label}
                  </span>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}