import Image from "next/image";
import Button from "./Button";

type CaseStudyCardProps = {
  image: string;
  title: string;
  href?: string;
};

export default function CaseStudyCard({
  image,
  title,
  href = "#",
}: CaseStudyCardProps) {
  return (
    <article className="flex flex-col rounded-2xl bg-[#0D1321] overflow-hidden px-6 py-4 gap-4">
      {/* Image */}
      <div className="relative h-[144px] w-full rounded-xl overflow-hidden">
        <Image src={image} alt={title} fill className="object-cover" />
      </div>

      {/* Badge + title + button */}
      <div className="flex flex-col gap-3 px-2 pb-2">
        <span className="w-fit rounded-full px-2.5 py-1.5 text-[10px] bg-[#194662] font-medium text-white">
          Case Study
        </span>
        <h3 className="text-[17px] font-bold leading-snug text-white">{title}</h3>
        <div>
          <Button
            variant="outline-dark"
            href={href}
            className="inline-flex items-center justify-center font-medium"
          >
            View Case Study
          </Button>
        </div>
      </div>
    </article>
  );
}