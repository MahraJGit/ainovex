import Image from "next/image";
import Button from "./Button";

export type ServiceCardProps = {
  icon: string;
  title: string;
  description: string;
  href?: string;
};

export default function ServiceCard({
  icon,
  title,
  description,
  href = "#",
}: ServiceCardProps) {
  return (
    <article className="flex flex-col justify-between rounded-2xl border border-[#21325E] bg-[#0C1222] p-6 h-full">
      {/* Top row: title + icon */}
      <div>
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-[17px] font-semibold leading-snug tracking-[-0.02em] text-white max-w-[260px]">
            {title}
          </h3>
          <Image
            src={icon}
            alt=""
            width={36}
            height={36}
            className="size-9 shrink-0 mt-0.5"
            aria-hidden
          />
        </div>

        {/* Description */}
        <p className="mt-4 text-sm font-normal leading-relaxed tracking-[-0.01em] text-white/70">
          {description}
        </p>
      </div>

      {/* Button — always at bottom */}
      <div className="mt-6">
        <Button href={href} variant="outline-dark" className="!px-5 !py-2 text-sm">
          Explore more
        </Button>
      </div>
    </article>
  );
}