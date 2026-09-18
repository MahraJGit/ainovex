import SectionGrid from "../../ui/SectionGrid";

function HeroGlow() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute top-[-400px] z-0 h-[690px] w-[790px]"
      style={{
        left: "calc(50% - 449px)",
        filter: "blur(95px)",
      }}
    >
      <svg
        viewBox="0 0 790 690"
        className="h-full w-full overflow-visible"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id="pageHeroGlowFill" cx="52%" cy="48%" r="55%">
            <stop offset="0%" stopColor="#1F66E0" />
            <stop offset="45%" stopColor="#1854B8" />
            <stop offset="100%" stopColor="#12478C" />
          </radialGradient>
        </defs>
        <path
          d="M240 50
             C290 42 350 70 400 97
             C450 104 540 88 600 130
             C660 160 715 230 733 290
             C745 350 720 395 660 440
             C600 480 560 520 520 580
             C490 620 460 635 440 626
             C400 610 370 560 330 490
             C300 440 240 420 180 390
             C120 350 85 290 78 220
             C75 150 110 105 150 80
             C180 60 210 54 240 50 Z"
          fill="url(#pageHeroGlowFill)"
          fillOpacity="1"
        />
      </svg>
    </div>
  );
}

interface PageHeroProps {
  heading: React.ReactNode;
  description?: string;
}

export default function PageHero({ heading, description }: PageHeroProps) {
  return (
    <section className="relative flex min-h-[60dvh] flex-col overflow-hidden bg-[#05080F]">
      <HeroGlow />
      <SectionGrid placement="center-dark" className="mt-25"/>

      <div className="relative z-10 flex w-full flex-col items-center justify-center mt-50 text-center">
        <h1 className="mx-auto max-w-[820px] text-[48px]! font-bold text-white">
          {heading}
        </h1>

        {description && (
          <p className="mx-auto mt-6 max-w-[704px] text-lg leading-normal text-white">
            {description}
          </p>
        )}
      </div>
    </section>
  );
}