import Image from "next/image";

const LOGOS = Array.from({ length: 8 }, (_, index) => index);

function LogoRow() {
  return (
    <div className="flex shrink-0 items-center gap-16 px-8">
      {LOGOS.map((index) => (
        <Image
          key={index}
          src="/icons/workedwith/logoipsum.svg"
          alt=""
          width={180}
          height={41}
          className="h-[41px] w-[180px] max-w-none"
          aria-hidden
        />
      ))}
    </div>
  );
}

export default function WorkedWith() {
  return (
    <section
      id="worked-with"
      aria-label="Companies we've worked with"
      className="relative w-full overflow-hidden bg-[#05080F] py-10 lg:py-14"
    >
      <div className="marquee-track flex w-max">
        <LogoRow />
        <LogoRow />
      </div>
    </section>
  );
}
