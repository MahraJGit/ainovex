import Image from "next/image";
import SectionGrid from "../../ui/SectionGrid";
import { cn } from "@/app/lib/utils";

const icons = [
  { src: "/icons/build/top-left.svg",     className: "left-4 top-4 md:left-2 md:top-4 lg:left-4 lg:top-6" },
  { src: "/icons/build/top-right.svg",    className: "right-4 top-4 md:right-2 md:top-4 lg:right-4 lg:top-6" },
  { src: "/icons/build/bottom-left.svg",  className: "bottom-4 left-4 md:bottom-4 md:left-2 lg:bottom-6 lg:left-10" },
  { src: "/icons/build/bottom-right.svg", className: "bottom-4 right-4 md:bottom-4 md:right-2 lg:right-4 lg:bottom-6" },
];

interface QueryBannerProps {
  heading: React.ReactNode;
  description: string;
}

export default function QueryBanner({ heading, description }: QueryBannerProps) {
  return (
    <section className="relative overflow-hidden bg-white">
      <SectionGrid placement="center" height={560} />

      <div className="py-8 md:py-10 relative">
        <div className="relative mx-auto flex min-h-60 max-w-5xl items-center justify-center md:min-h-80 lg:min-h-105">
          {icons.map((icon) => (
            <Image
              key={icon.src}
              src={icon.src}
              alt=""
              width={103}
              height={103}
              className={cn(
                "pointer-events-none absolute hidden size-14 md:block md:size-18 lg:size-25.75",
                icon.className
              )}
              aria-hidden
            />
          ))}

          <div className="mx-auto flex max-w-[852px] flex-col items-center px-6 md:px-16 lg:px-24 text-center">
            <h2 className="text-black-v1/87 text-2xl md:text-3xl lg:text-4xl">{heading}</h2>
            <p className="mt-3 md:mt-6 text-sm md:text-base font-medium leading-[160%] text-black-v1/70">
              {description}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}