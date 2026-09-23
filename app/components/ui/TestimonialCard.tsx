import Image from "next/image";
import { cn } from "@/app/lib/utils";

export type TestimonialCardProps = {
  quote: string;
  name: string;
  role: string;
  avatar: string;
  rating?: number;
  active?: boolean;
  tilt?: "cw" | "ccw";
  className?: string;
};

const CARD_SHAPE =
  "M 0,16 A 16,16 0 0,1 16,0 H 127.5 C 137.5,0 137.5,40 172.5,40 C 207.5,40 207.5,0 217.5,0 H 329 A 16,16 0 0,1 345,16 V 389 A 16,16 0 0,1 329,405 H 16 A 16,16 0 0,1 0,389 Z";

function Stars({ count }: { count: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-hidden>
      {Array.from({ length: count }).map((_, index) => (
        <svg key={index} width="14" height="14" viewBox="0 0 24 24" fill="#F5C518">
          <path d="M12 2.5l2.47 6.53 6.91.42-5.4 4.27 1.86 6.68L12 16.9l-5.84 3.5 1.86-6.68-5.4-4.27 6.91-.42L12 2.5z" />
        </svg>
      ))}
    </div>
  );
}

export default function TestimonialCard({
  quote,
  name,
  role,
  avatar,
  rating = 5,
  active = false,
  tilt = "ccw",
  className,
}: TestimonialCardProps) {
  return (
    <div
      className={cn(
        "relative w-[345px] shrink-0 pt-[40px]",
        "md:scale-[0.75] lg:scale-[0.88] xl:scale-100",
        "md:origin-top lg:origin-top",
        className
      )}
    >
      <div
        aria-hidden
        className={cn(
          "absolute inset-x-1 bottom-0 top-[35px] -z-0 rounded-[16px]",
          active ? "bg-primary" : "bg-[#E8E8E8]",
          tilt === "cw" ? "rotate-[12deg]" : "rotate-[12deg]"
        )}
      />

      <svg
        className="pointer-events-none absolute top-[40px] left-0 z-[1] h-[405px] w-[345px] overflow-visible drop-shadow-[0_10px_20px_rgba(0,0,0,0.08)]"
        viewBox="0 0 345 405"
        width={345}
        height={405}
        fill="none"
        aria-hidden
      >
        <path
          d={CARD_SHAPE}
          fill="#ffffff"
          stroke="#CACACA"
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      <div className="absolute -top-[10px] left-1/2 z-[2] size-[80px] -translate-x-1/2 overflow-hidden rounded-full">
        <Image src={avatar} alt={name} width={80} height={80} className="size-full object-cover" />
      </div>

      <div className="relative z-[2] flex h-[405px] flex-col px-6 pb-6 pt-[70px]">
        <div className="mb-4 flex items-center gap-2">
          <span className="text-sm font-semibold text-black-v1">{rating.toFixed(1)}</span>
          <Stars count={Math.round(rating)} />
        </div>
        <p className="text-sm font-medium leading-[160%] text-black-v1/80">{quote}</p>
        <div className="mt-auto">
          <p className="text-base font-semibold text-black-v1">{name}</p>
          <p className="mt-1 text-sm font-medium text-black-v1/55">{role}</p>
        </div>
      </div>
    </div>
  );
}