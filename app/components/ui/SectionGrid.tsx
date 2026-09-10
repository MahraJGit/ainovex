import { cn } from "@/app/lib/utils";

export type SectionGridPlacement = "center" | "left";

export type SectionGridProps = {
  /** `center` — V spotlight (Why Us). `left` — spans left → right (Services). */
  placement?: SectionGridPlacement;
  /** Grid line color. Defaults per placement. */
  lineColor?: string;
  /** Section background the fade blends into. */
  fadeTo?: string;
  /** Grid cell size in px. */
  cellSize?: number;
  /** Height of the grid area in px. */
  height?: number;
  /** Override width for `left` placement (default `70%`). */
  width?: string;
  /** Override max-width for `center` placement (default `1440px`). */
  maxWidth?: string;
  /** Shift grid slightly above the section edge. */
  offsetTop?: boolean;
  className?: string;
};

const placementConfig = {
  center: {
    lineColor: "#F8E9FE",
    fadeTo: "#FFFFFF",
    mask: "radial-gradient(ellipse 65% 85% at 50% 0%, #000 18%, transparent 70%)",
    position: "left-1/2 w-full max-w-[1440px] -translate-x-1/2",
  },
  left: {
    lineColor: "rgba(248,233,254,0.12)",
    fadeTo: "#0A0F1C",
    mask: "linear-gradient(to bottom, #000 0%, #000 55%, transparent 100%)",
    position: "left-0 w-[70%]",
  },
} as const;

export default function SectionGrid({
  placement = "center",
  lineColor,
  fadeTo,
  cellSize = 52,
  height = 420,
  width,
  maxWidth,
  offsetTop = true,
  className,
}: SectionGridProps) {
  const config = placementConfig[placement];
  const resolvedLineColor = lineColor ?? config.lineColor;
  const resolvedFadeTo = fadeTo ?? config.fadeTo;

  const gridStyle = {
    height,
    ...(placement === "left" && width ? { width } : {}),
    ...(placement === "center" && maxWidth ? { maxWidth } : {}),
    backgroundImage: `linear-gradient(to right, ${resolvedLineColor} 1px, transparent 1px), linear-gradient(to bottom, ${resolvedLineColor} 1px, transparent 1px)`,
    backgroundSize: `${cellSize}px ${cellSize}px`,
    WebkitMaskImage: config.mask,
    maskImage: config.mask,
  };

  const fadeStyle = {
    height,
    ...(placement === "left" && width ? { width } : {}),
    background: `linear-gradient(to bottom, transparent 0%, transparent 45%, ${resolvedFadeTo} 100%)`,
  };

  return (
    <>
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute z-0",
          config.position,
          offsetTop ? "-top-5" : "top-0",
          className
        )}
        style={gridStyle}
      />
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute z-0",
          placement === "center" ? "inset-x-0" : config.position,
          offsetTop ? "-top-5" : "top-0"
        )}
        style={fadeStyle}
      />
    </>
  );
}
