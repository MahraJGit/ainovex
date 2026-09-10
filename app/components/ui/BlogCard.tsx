import Image from "next/image";
import Link from "next/link";

export type BlogCardProps = {
  image: string;
  title: string;
  readTime: string;
  date: string;
  href?: string;
  icon?: string;
};

export default function BlogCard({
  image,
  title,
  readTime,
  date,
  href = "#",
  icon = "/icons/blogs/ai.svg",
}: BlogCardProps) {
  return (
    <article className="overflow-hidden rounded-t-2xl rounded-b-xl border border-white/8 bg-[#0C1222]">
      <div className="relative">
        <Image
          src={image}
          alt={title}
          width={420}
          height={240}
          className="h-50 w-full object-cover"
        />
        <div className="absolute bottom-0 left-5 z-10 translate-y-1/2">
          <Image
            src={icon}
            alt=""
            width={64}
            height={64}
            className="size-16"
            aria-hidden
          />
        </div>
      </div>

      <div className="flex flex-col gap-5 px-5 pb-5 pt-10">
        <h3 className="text-lg font-semibold leading-[130%] text-white">
          {title}
        </h3>

        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-lg border border-[#DEDEDE] px-2 py-1 text-xs font-medium text-white/60">
            {readTime}
          </span>
          <span className="rounded-lg border border-[#DEDEDE] px-3 py-1 text-xs font-medium text-white/60">
            {date}
          </span>
          <Link
            href={href}
            className="ml-auto inline-flex items-center justify-center rounded-[100px] bg-primary px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-primary/90"
          >
            Read More
          </Link>
        </div>
      </div>
    </article>
  );
}
