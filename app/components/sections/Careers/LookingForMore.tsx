import SectionGrid from "../../ui/SectionGrid";

const leftIcons = [
  { src: "/icons/careers/banner/ai.svg", position: "top-12 left-28" },
  { src: "/icons/careers/banner/code.svg", position: "bottom-16 left-28" },
];

const rightIcons = [
  { src: "/icons/careers/banner/megaphone.svg", position: "top-12 right-28" },
  { src: "/icons/careers/banner/idea.svg", position: "bottom-16 right-28" },
];

function FloatingIcon({ src, position }: { src: string; position: string }) {
  return (
    <div
      className={`absolute ${position} flex items-center justify-center`}
    >
      <img src={src} alt="" className="h-[102.27px] w-[102.27px]" aria-hidden />
    </div>
  );
}

export default function LookingForMore() {
  return (
    <section id="looking-for-more" className="section-container relative overflow-hidden bg-white py-[120px]!">
      <SectionGrid placement="center" />

      {/* Floating icons */}
      {leftIcons.map((icon) => (
        <FloatingIcon key={icon.src} {...icon} />
      ))}
      {rightIcons.map((icon) => (
        <FloatingIcon key={icon.src} {...icon} />
      ))}

      {/* Centered content */}
      <div className="relative z-10 flex flex-col items-center text-center px-4">
        <h2 className="text-ink leading-14">
          Looking for More Than
          <br />
          <span className="text-primary">Just a Job?</span>
        </h2>
        <p className="mt-4 text-base font-medium text-text-black-v1/87">
          Join a workplace where learning, collaboration, and growth come together.
        </p>
      </div>
    </section>
  );
}