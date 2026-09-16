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
    // Two background layers clipped to the text:
    // 1. Top layer: a white "cover" 3x taller than the text. Top third transparent,
    //    middle third soft fade, bottom third white. Sliding it down uncovers the fill
    //    from top to bottom with a soft edge.
    // 2. Bottom layer: the actual fill, light blue at the top to #38BDF8 at the bottom.
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
      className="w-full h-[300px] bg-white rounded-2xl flex justify-between items-center py-8 px-10"
      style={{
        outline: isActive ? "1px solid transparent" : "1px solid #e5e7eb",
        outlineOffset: "-1px",
        transition: "outline-color 0.8s ease-in-out",
      }}
    >
      <div className="flex items-center gap-6">
        <h3 className="text-[195px] font-black leading-[100%] select-none" style={numberStyle}>
          {number}
        </h3>

        <h4 className="text-[50px] font-black leading-[100%] text-black">
          {title}
        </h4>
      </div>

      <div className="bg-primary rounded-full p-2 w-16 h-16 flex items-center justify-center">
        <Image src="/icons/right-arrow.svg" alt="Arrow Right" width={44} height={44} />
      </div>
    </div>
  );
}