import Image from "next/image";
import { cn } from "@/app/lib/utils";

type TagProps = {
  label: string;
  icon?: string;
  variant?: "solid" | "outline";
  className?: string;
};

export default function Tag({
  label,
  icon = "/icons/tag.svg",
  variant = "solid",
  className,
}: TagProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 rounded-full px-4 py-2",
        variant === "solid" && "bg-[#02081D] border border-primary",
        variant === "outline" && "border border-primary/80 bg-transparent",
        className
      )}
    >
      <Image
        src={icon}
        alt=""
        width={18}
        height={20}
        className="h-4 w-auto"
        aria-hidden
      />
      <span className="text-sm font-medium text-white">{label}</span>
    </div>
  );
}
