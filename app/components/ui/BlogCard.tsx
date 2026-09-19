import Image from "next/image";
import Link from "next/link";
import { formatDate } from "@/app/lib/libFormat";

export type BlogCardProps = {
  slug: string;
  image: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
};

export default function BlogCard({
  slug,
  image,
  title,
  excerpt,
  date,
  category,
}: BlogCardProps) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[24px] border-2 border-white bg-[#05080F] transition-colors duration-300 hover:border-primary">

      {/* Image */}
      <Link
        href={`/blog/${slug}`}
        className="relative block aspect-[16/11] overflow-hidden"
      >
        <Image
          src={image}
          alt={title}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        />
        <span className="absolute left-4 top-4 rounded-full bg-primary px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.08em] text-white">
          {category}
        </span>
      </Link>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-4 p-6 transition-transform duration-500 ease-out group-hover:-translate-y-2">

        {/* Title */}
        <h3 className="text-[21px] font-bold leading-[1.25] text-white transition-colors duration-300 group-hover:text-primary">
          <Link href={`/blog/${slug}`}>
            {title}
          </Link>
        </h3>

        {/* Excerpt */}
        <p className="flex-1 text-[15px] leading-[1.6] text-white/80">{excerpt}</p>

        {/* Footer */}
        <div className="flex items-center justify-between gap-4 border-t border-primary pt-5">
          <Link
            href={`/blog/${slug}`}
            className="inline-flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.1em] text-white transition-colors duration-300 group-hover:text-primary"
          >
            Read More <span aria-hidden>&rarr;</span>
          </Link>
          <time dateTime={date} className="text-[12px] font-medium text-white/70">
            {formatDate(date)}
          </time>
        </div>

      </div>
    </article>
  );
}