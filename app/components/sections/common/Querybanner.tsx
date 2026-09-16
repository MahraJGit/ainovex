import Image from "next/image";
import SectionGrid from "../../ui/SectionGrid";
import { cn } from "@/app/lib/utils";

const icons = [
  { src: "/icons/build/top-left.svg",     className: "left-0 top-0 lg:left-4 lg:top-6" },
  { src: "/icons/build/top-right.svg",    className: "right-0 top-0 lg:right-4 lg:top-6" },
  { src: "/icons/build/bottom-left.svg",  className: "bottom-0 left-0 lg:bottom-6 lg:left-10" },
  { src: "/icons/build/bottom-right.svg", className: "bottom-0 right-0 lg:right-4 lg:bottom-6" },
];

interface QueryBannerProps {
  heading: React.ReactNode;
  description: string;
}

export default function QueryBanner({ heading, description }: QueryBannerProps) {
  return (
    <section className="relative overflow-hidden bg-white">
      <SectionGrid placement="center" height={560} />

      <div className="py-[40px] relative">
        <div className="relative mx-auto flex min-h-80 max-w-5xl items-center justify-center md:min-h-105">
          {icons.map((icon) => (
            <Image
              key={icon.src}
              src={icon.src}
              alt=""
              width={103}
              height={103}
              className={cn(
                "pointer-events-none absolute hidden size-22 md:block lg:size-25.75",
                icon.className
              )}
              aria-hidden
            />
          ))}

          <div className="mx-auto flex max-w-[852px] flex-col items-center px-4 text-center md:px-24">
            <h2 className="text-black-v1/87">{heading}</h2>
            <p className="mt-6 text-base font-medium leading-[160%] text-black-v1/70">
              {description}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}