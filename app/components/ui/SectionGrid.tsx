import { cn } from "@/app/lib/utils";

export type SectionGridPlacement = "center" | "center-dark" | "left" | "left-light";

export type SectionGridProps = {
  placement?: SectionGridPlacement;
  lineColor?: string;
  fadeTo?: string;
  cellSize?: number;
  height?: number;
  width?: string;
  maxWidth?: string;
  offsetTop?: boolean;
  className?: string;
};

const placementConfig = {
  center: {
    lineColor: "rgba(56,189,248,0.25)",
    fadeTo: "#FFFFFF",
    mask: "radial-gradient(ellipse 65% 85% at 50% 0%, #000 18%, transparent 70%)",
    maskComposite: undefined as undefined,
    position: "left-1/2 w-full max-w-[1440px] -translate-x-1/2",
  },
  "center-dark": {
    lineColor: "rgba(255,255,255,0.07)",
    fadeTo: "#0A0F1C",
    mask: "radial-gradient(ellipse 65% 85% at 50% 0%, #000 18%, transparent 70%)",
    maskComposite: undefined as undefined,
    position: "left-1/2 w-full max-w-[1440px] -translate-x-1/2",
  },
  left: {
    lineColor: "rgba(248,233,254,0.12)",
    fadeTo: "#0A0F1C",
    mask: "linear-gradient(to bottom, #000 0%, #000 80%, transparent 75%), linear-gradient(to right, #000 0%, #000 80%, transparent 85%)",
    maskComposite: "intersect" as const,
    position: "left-0 w-[70%]",
  },
  "left-light": {
    lineColor: "rgba(56,189,248,0.2)",
    fadeTo: "#FFFFFF",
    mask: "linear-gradient(to bottom, #000 0%, #000 61%, transparent 64%), linear-gradient(to right, #000 0%, #000 30%, transparent 75%)",
    maskComposite: "intersect" as const,
    position: "left-0 w-[70%]",
  },
} as const;

export default function SectionGrid({
  placement = "center",
  lineColor,
  fadeTo,
  cellSize = 52,
  height = 460,
  width,
  maxWidth,
  offsetTop = true,
  className,
}: SectionGridProps) {
  const config = placementConfig[placement];
  const resolvedLineColor = lineColor ?? config.lineColor;
  const resolvedFadeTo = fadeTo ?? config.fadeTo;

  const isLeftVariant = placement === "left" || placement === "left-light";
  const isCenterVariant = placement === "center" || placement === "center-dark";
  const maskComposite = config.maskComposite;

  const gridStyle = {
    height,
    ...(isLeftVariant && width ? { width } : {}),
    ...(isCenterVariant && maxWidth ? { maxWidth } : {}),
    backgroundImage: `linear-gradient(to right, ${resolvedLineColor} 1px, transparent 1px), linear-gradient(to bottom, ${resolvedLineColor} 1px, transparent 1px)`,
    backgroundSize: `${cellSize}px ${cellSize}px`,
    WebkitMaskImage: config.mask,
    maskImage: config.mask,
    ...(maskComposite ? {
      WebkitMaskComposite: maskComposite,
      maskComposite,
    } : {}),
  };

  const fadeStyle = {
    height,
    ...(isLeftVariant && width ? { width } : {}),
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
          isCenterVariant ? "inset-x-0" : config.position,
          offsetTop ? "-top-5" : "top-0"
        )}
        style={fadeStyle}
      />
    </>
  );
}