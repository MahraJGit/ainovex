import Image from "next/image";

type GrowthCardProps = {
  image: string;
  icon: string;
  title: string;
  description: string;
};

export default function GrowthCard({
  image,
  icon,
  title,
  description,
}: GrowthCardProps) {
  return (
    <article className="flex h-[300px] w-full flex-col overflow-visible rounded-2xl bg-white p-[7px]">
      {/* Top image area */}
      <div className="relative h-[107px] w-full shrink-0 overflow-hidden rounded-2xl">
        <Image
          src={image}
          alt=""
          fill
          className="object-cover"
          aria-hidden
        />
      </div>

      {/* Icon — large circle, overlaps left edge and image bottom */}
      <div className="relative">
        <div className="absolute -top-9 left-4 flex items-center justify-center">
          <Image src={icon} alt="" width={86} height={86} aria-hidden />
        </div>
      </div>

      {/* Content — top padding clears the icon */}
      <div className="px-[22px] pt-12">
        <h3 className="text-md mt-1 font-bold text-[#161C2D]">{title}</h3>
        <p className="mt-2 text-sm font-medium leading-tight text-[#6B7387]">
          {description}
        </p>
      </div>
    </article>
  );
}