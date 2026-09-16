import Image from "next/image";
import type { CSSProperties } from "react";

export type HeroCardProps = {
  icon: string;
  metric: string;
  label: string;
  size?: "md" | "sm";
};

// Splits "98%", "150+", "24/7" into the big number and the small suffix
function parseMetric(metric: string) {
  const match = metric.match(/^([\d.,]+)(.*)$/);
  if (!match) return { value: metric, suffix: null };
  return { value: match[1], suffix: match[2] || null };
}

// Fill: WHITE radial gradient at low opacity, lit from the top left corner.
// Because it's only white with transparency, it tints whatever is behind it:
// grey on the black About hero, light blue on the blue landing hero.
const cardFill: CSSProperties = {
  background:
    "radial-gradient(circle farthest-corner at 0% 0%, rgba(255,255,255,0.40) 0%, rgba(255,255,255,0.23) 40%, rgba(255,255,255,0.10) 75%, rgba(255,255,255,0.04) 100%) padding-box",
  borderWidth: "1px",
  borderStyle: "solid",
  borderTopColor: "rgba(255,255,255,0.40)",
  borderLeftColor: "rgba(255,255,255,0.40)",
  borderRightColor: "rgba(255,255,255,0.40)",
  borderBottomColor: "rgba(255,255,255,0.40)",
};


const sizes = {
  // Landing page
  md: {
    card: "min-h-[210px] min-w-[200px] rounded-[30px] pt-6 pl-5 pr-6 pb-9",
    icon: 54,
    text: "pl-1 gap-4",
    value: "text-[46px]",
    suffix: "text-[24px]",
    label: "text-base",
  },
  // About Us hero, Figma values: 137 x 142, radius 20.72
  sm: {
    card: "h-[142px] w-[137px] rounded-[20.72px] pt-4 px-3 pb-[24px]",
    icon: 36,
    text: "pl-[10px] gap-[14px]",
    value: "text-[30px]",
    suffix: "text-[16px]",
    label: "text-[10px]",
  },
};

export default function HeroCard({ icon, metric, label, size = "md" }: HeroCardProps) {
  const { value, suffix } = parseMetric(metric);
  const s = sizes[size];

  return (
    <article
      className={`relative flex flex-col  backdrop-blur-md ${s.card}`}
      style={cardFill}
    >
      {/* Gradient border ring */}
      

      <Image src={icon} alt="" width={s.icon} height={s.icon} aria-hidden />

      <div className={`mt-auto flex flex-col ${s.text}`}>
        <span className={`font-normal leading-none text-white ${s.value}`}>
          {value}
          {suffix && (
            <span className={`ml-0.5 font-normal ${s.suffix}`}>{suffix}</span>
          )}
        </span>
        <p className={`font-normal leading-tight text-white text-nowrap ${s.label}`}>
          {label}
        </p>
      </div>
    </article>
  );
}