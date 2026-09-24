"use client";
import Button from "../../ui/Button";

export default function ServicesHero() {
  return (
    <section
      id="services-hero"
      className="relative flex min-h-[100dvh] flex-col overflow-hidden bg-black"
    >
      {/* Glow: blurred blob shape traced from the Figma vector (532 x 673, rotated ~13deg).
          Most of the shape sits above the section, so only its lower half shows, blurred. */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-[-336px] z-0 h-[690px] w-[790px]"
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
            <radialGradient id="heroGlowFill" cx="52%" cy="48%" r="55%">
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
            fill="url(#heroGlowFill)"
            fillOpacity="1"
          />
        </svg>
      </div>

      {/* Grid on top of the glow: neutral lines that pick up the blue where the light is */}
      <HeroGrid cell={130}/>

      {/* Text block, vertically centered in the space between navbar and network graphic */}
      <div className="header-padding" />
      <div className="relative z-10 flex w-full flex-col items-center justify-center px-4 py-10 lg:px-8 lg:py-16 text-center">
        <h1 className="mx-auto max-w-[820px] font-normal leading-[1.15] text-white sm:text-[46px] lg:text-[56px]">
          <span className="font-bold text-[#3FA9F5]">Turning</span> Bold Ideas
          into Measurable <span className="font-bold">Impact</span>
        </h1>

        <p className="max-w-[580px] hero-desc">
          Your idea is the spark, but our execution is the fire that makes
          your business truly unstoppable.
        </p>

        <Button variant="solid" className="mt-8">
          Get Free Consultation
        </Button>
      </div>

      {/* Network graphic pinned flush to the bottom of the section, lines run off the bottom edge */}
      <div className="relative z-10 w-full mt-20 md:mt-0">
        <NetworkGraphic />
      </div>
    </section>
  );
}

function HeroGrid({ cell = 130 }: { cell?: number }) {
  // Visible across the middle, fading toward the far edges and out before the network graphic
  const mask =
    "radial-gradient(ellipse 70% 75% at 50% 15%, black 0%, rgba(0,0,0,0.85) 45%, transparent 85%)";

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-[1]"
      style={{
        backgroundImage: `
          linear-gradient(to right, rgba(255,255,255,0.07) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(255,255,255,0.07) 1px, transparent 1px)
        `,
        backgroundSize: `${cell}px ${cell}px`,
        backgroundPosition: "center top",
        maskImage: mask,
        WebkitMaskImage: mask,
      }}
    />
  );
}

type Pt = { x: number; y: number };

function NetworkGraphic() {
  // Nodes traced from the Figma frame, mapped to a 1600 x 274 viewBox
  const n: Record<string, Pt> = {
    k: { x: 2, y: 265 },
    a: { x: 187, y: 126 },
    b: { x: 361, y: 101 },
    c: { x: 567, y: 206 },
    d: { x: 751, y: 102 },
    e: { x: 1010, y: 183 },
    f: { x: 1141, y: 75 },
    g: { x: 1157, y: 123 },
    h: { x: 1291, y: 35 },
    i: { x: 1436, y: 204 },
    j: { x: 1539, y: 126 },
  };

  const B = 280; // below the viewBox so the legs run off the bottom edge
  const p = (x: number, y: number): Pt => ({ x, y });

  const edges: Array<[Pt, Pt]> = [
    // ridge and cross links
    [p(-5, 109), n.a],
    [n.a, n.b],
    [n.b, n.c],
    [n.c, n.d],
    [n.d, n.e],
    [n.e, n.f],
    [n.e, n.g],
    [n.f, n.h],
    [n.f, n.i],
    [n.g, n.h],
    [n.g, n.i],
    [n.h, n.i],
    [n.h, n.j],
    [n.j, n.i],

    // legs down to the bottom edge
    [p(-5, 140), p(92, B)],
    [n.a, n.k],
    [n.a, p(170, B)],
    [n.a, p(354, B)],
    [n.b, p(230, B)],
    [n.b, p(410, B)],
    [n.c, p(498, B)],
    [n.c, p(567, B)],
    [n.c, p(722, B)],
    [n.d, p(622, B)],
    [n.d, p(776, B)],
    [n.d, p(852, B)],
    [n.e, p(976, B)],
    [n.e, p(1108, B)],
    [n.g, p(1026, B)],
    [n.g, p(1175, B)],
    [n.g, p(1238, B)],
    [n.h, p(1586, B)],
    [n.j, p(1590, B)],
    [n.i, p(1312, B)],
    [n.i, p(1410, B)],
    [n.i, p(1468, B)],
    [n.i, p(1580, B)],
  ];

  // Fade the whole graphic slightly toward the bottom, like the Figma
  const fade = "linear-gradient(to bottom, black 0%, black 55%, rgba(0,0,0,0.45) 100%)";

  return (
    <svg
      viewBox="0 0 1600 290"
      className="block h-auto w-full"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      style={{ maskImage: fade, WebkitMaskImage: fade }}
    >
      <defs>
        {/* Position based color: lighter gray at the top, darker toward the bottom */}
        <linearGradient
          id="netShade"
          gradientUnits="userSpaceOnUse"
          x1="0"
          y1="30"
          x2="0"
          y2="260"
        >
          <stop offset="0%" stopColor="#8E8E8E" />
          <stop offset="50%" stopColor="#6A6A6A" />
          <stop offset="100%" stopColor="#2E2E2E" />
        </linearGradient>
      </defs>

      {edges.map(([a, b], k) => (
        <line
          key={k}
          x1={a.x}
          y1={a.y}
          x2={b.x}
          y2={b.y}
          stroke="url(#netShade)"
          strokeWidth="2"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
      ))}

      {Object.values(n).map((pt, k) => (
        <circle key={k} cx={pt.x} cy={pt.y} r="10" fill="url(#netShade)" />
      ))}
    </svg>
  );
}