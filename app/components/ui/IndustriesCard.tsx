import Image from "next/image";
import type { CSSProperties } from "react";

interface IndustriesCardProps {
  number: string;
  title: string;
  href: string;
  isActive?: boolean;
}

const DURATION = "1.1s";
const EASE = "cubic-bezier(0.65, 0, 0.35, 1)";

export default function IndustriesCard({ number, title, href, isActive = false }: IndustriesCardProps) {
  const numberStyle: CSSProperties = {
    backgroundImage: `
      linear-gradient(to top, rgba(255,255,255,0) 33.33%, #ffffff 66.66%),
      linear-gradient(to bottom, #EAF8FF 0%, #38BDF8 100%)
    `,
    backgroundSize: "100% 300%, 100% 100%",
    backgroundRepeat: "no-repeat",
    backgroundPosition: isActive ? "0 100%, 0 0" : "0 0%, 0 0",
    WebkitBackgroundClip: "text",
    backgroundClip: "text",
    color: "transparent",
    WebkitTextFillColor: "transparent",
    WebkitTextStrokeWidth: "1px",
    WebkitTextStrokeColor: isActive ? "rgba(134,134,134,0)" : "rgba(134,134,134,1)",
    transition: `background-position ${DURATION} ${EASE}, -webkit-text-stroke-color 0.6s ease ${isActive ? "0.5s" : "0s"}`,
  };

  return (
    <div
      className="relative w-full bg-white rounded-2xl py-6 px-6 md:py-8 md:px-10
        flex flex-col items-center lg:flex-row lg:items-center lg:justify-between lg:h-[300px]"
      style={{
        outline: isActive ? "1px solid transparent" : "1px solid #e5e7eb",
        outlineOffset: "-1px",
        transition: "outline-color 0.8s ease-in-out",
      }}
    >
      {/* Number — shrink-0 so it never squishes, fixed width on desktop */}
      <h3
        className="font-black leading-[100%] select-none shrink-0
          text-[80px] md:text-[120px] lg:text-[150px] xl:text-[195px]
          lg:w-[220px] xl:w-[280px]"
        style={numberStyle}
      >
        {number}
      </h3>

      {/* Mobile/tablet: title centered + arrow below, Desktop: title left + arrow far right */}
      <div className="flex flex-col items-center gap-4 w-full lg:flex-row lg:flex-1 lg:min-w-0 lg:items-center lg:justify-between lg:px-4">
        <h4
          className="font-black leading-[100%] text-black min-w-0
      text-[20px] md:text-[32px] lg:text-[34px] xl:text-[50px] tracking-[-2%]
      text-center lg:text-left"
        >
          {title}
        </h4>

        {/* Arrow — mobile/tablet only */}
        <div className="lg:hidden shrink-0 bg-primary rounded-full p-2 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center">
          <Image src="/icons/right-arrow.svg" alt="Arrow Right" width={24} height={24} />
        </div>
      </div>

      {/* Arrow — desktop only */}
      <div className="hidden lg:flex bg-primary rounded-full p-2 w-16 h-16 items-center justify-center shrink-0">
        <Image src="/icons/right-arrow.svg" alt="Arrow Right" width={44} height={44} />
      </div>
    </div>
  );
}