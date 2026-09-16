import Image from "next/image";

const logos = [
  "/icons/partnerLogos/partner-1.svg",
  "/icons/partnerLogos/partner-2.svg",
  "/icons/partnerLogos/partner-3.svg",
  "/icons/partnerLogos/partner-4.svg",
  "/icons/partnerLogos/partner-5.svg",
  "/icons/partnerLogos/partner-6.svg",
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