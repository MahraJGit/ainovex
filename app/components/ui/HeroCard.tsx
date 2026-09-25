import Image from "next/image";
import type { CSSProperties } from "react";

export type HeroCardProps = {
  icon: string;
  metric: string;
  label: string;
  size?: "md" | "sm";
};

function parseMetric(metric: string) {
  const match = metric.match(/^([\d.,]+)(.*)$/);
  if (!match) return { value: metric, suffix: null };
  return { value: match[1], suffix: match[2] || null };
}

const cardFill: CSSProperties = {
  background:
    "radial-gradient(circle farthest-corner at 0% 0%, rgba(255,255,255,0.40) 0%, rgba(255,255,255,0.23) 40%, rgba(255,255,255,0.10) 75%, rgba(255,255,255,0.04) 100%) padding-box",
  borderWidth: "1px",
  borderStyle: "solid",
  borderColor: "rgba(255,255,255,0.40)",
};

const sizes = {
  md: {
    // fluid — no fixed min-w, height scales with breakpoints
    card: "w-full rounded-[20px] p-4 min-h-[140px] sm:rounded-[30px] sm:pt-6 sm:pl-5 sm:pr-6 sm:pb-9 sm:min-h-[210px]",
    icon: 36,
    text: "pl-0 gap-2 sm:pl-1 sm:gap-4",
    value: "text-[28px] sm:text-[36px] lg:text-[46px]",
    suffix: "text-[14px] sm:text-[18px] lg:text-[24px]",
    label: "text-[11px] sm:text-sm lg:text-base",
  },
  sm: {
    card: "h-[142px] w-[137px] rounded-[20.72px] pt-4 px-3 pb-[24px]",
    icon: 36,
    text: "pl-[5px] gap-[14px]",
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
      className={`relative flex flex-col backdrop-blur-md ${s.card}`}
      style={cardFill}
    >
      <Image
        src={icon}
        alt=""
        width={s.icon}
        height={s.icon}
        aria-hidden
        className={size === "md" ? "w-8 h-8 sm:w-[54px] sm:h-[54px]" : ""}
      />

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