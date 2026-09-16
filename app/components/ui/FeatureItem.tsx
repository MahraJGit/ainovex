import Image from "next/image";

interface FeatureItemProps {
  icon: string;
  title: string;
  description: string;
}

export default function FeatureItem({ icon, title, description }: FeatureItemProps) {
  return (
    <article className="flex w-full max-w-[420px] gap-5 pb-9">
      <div className="size-[80px] shrink-0">
        <Image src={icon} alt="" width={80} height={80} className="size-[80px]" aria-hidden />
      </div>
      <div className="flex flex-col">
        <h3 className="text-[21px] font-medium text-[#161C2D]">{title}</h3>
        <p className="mt-2 text-sm font-normal leading-[100%] text-text-black-v1/87 max-w-[280px]">
          {description}
        </p>
      </div>
    </article>
  );
}