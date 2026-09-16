import Image from "next/image";

const logos = [
  "/icons/logos/partner-1.svg",
  "/icons/logos/partner-2.svg",
  "/icons/logos/partner-3.svg",
  "/icons/logos/partner-4.svg",
  "/icons/logos/partner-5.svg",
  "/icons/logos/partner-6.svg",
];

function LogoItem({ src }: { src: string }) {
  return (
    <div className="flex shrink-0 items-center px-12">
      <img src={src} alt="Partner logo" className="h-[41px] w-[180px] object-contain" />
    </div>
  );
}

export default function LogoRow() {
  return (
    <div className="w-full overflow-hidden">
      <div className="marquee-track flex w-max">
        {[...logos, ...logos].map((src, i) => (
          <LogoItem key={i} src={src} />
        ))}
      </div>
    </div>
  );
}