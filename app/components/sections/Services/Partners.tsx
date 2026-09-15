"use client";

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
      <img src={src} alt="Partner logo" className="h-[41px] w-auto object-contain" />
    </div>
  );
}

export default function TrustedPartners() {
  return (
    <section id="trusted-partners" className="relative overflow-hidden bg-[#0A0F1C] py-30">
      {/* Heading */}
      <div className="mb-8 flex flex-col items-center text-center">
        <h2 className="text-white tracking-[-2.25px]">
          <span className="text-primary">Trusted</span> Partners
        </h2>
      </div>

      {/* Marquee — uses global .marquee-track class */}
      <div className="w-full overflow-hidden">
        <div className="marquee-track flex w-max">
          {[...logos, ...logos].map((src, i) => (
            <LogoItem key={i} src={src} />
          ))}
        </div>
      </div>
    </section>
  );
}