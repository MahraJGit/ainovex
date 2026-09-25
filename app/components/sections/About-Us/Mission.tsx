import Image from "next/image";

const cards = [
  {
    tag: "OUR MISSION",
    icon: "/icons/about/mission.svg",
    title: "Aim of Ainovex",
    description:
      "We help businesses grow with smart digital solutions. Our goal is to deliver results that matter and make technology work for you.",
  },
  {
    tag: "OUR VISION",
    icon: "/icons/about/vision.svg",
    title: "Ainovex Goal",
    description:
      "To be a global leader in digital innovation, we aim to build a future where every business thrives through cutting-edge technology.",
  },
  {
    tag: "OUR APPROACH",
    icon: "/icons/about/approach.svg",
    title: "How We Do It",
    description:
      "We listen, plan, and execute with precision. Every solution is tailored to your needs, ensuring quality, speed, and lasting impact.",
  },
];

export default function MissionVision() {
  return (
    <section className="relative w-full overflow-hidden bg-white">
      <div className="grid w-full grid-cols-1 md:grid-cols-3">
        {cards.map((card, index) => {
          const isFirst = index === 0;

          return (
            <div
              key={card.tag}
              className="relative flex min-h-[307px] flex-col bg-white pb-10 pl-[34px] pr-8 pt-10"
            >
              {/* Left bar — md+ always, mobile only for first card: never */}
              <span
                aria-hidden
                className="absolute inset-y-0 left-0 w-[10px] rounded-r-[10px] bg-[#38BDF8] hidden md:block"
              />

              {/* Top bar — mobile only, 2nd and 3rd cards only */}
              {!isFirst && (
                <span
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-[10px] rounded-b-[10px] bg-[#38BDF8] md:hidden"
                />
              )}

              <span className="text-[16px] font-medium uppercase leading-none text-black">
                {card.tag}
              </span>

              <Image
                src={card.icon}
                alt={card.tag}
                width={56}
                height={56}
                aria-hidden
                className="mt-5 h-14 w-14"
              />

              <h3 className="mt-4 text-[24px] font-semibold leading-tight text-black">
                {card.title}
              </h3>

              <p className="mt-4 max-w-[393px] text-[14px] font-medium leading-tight text-text-black-v1/87">
                {card.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}