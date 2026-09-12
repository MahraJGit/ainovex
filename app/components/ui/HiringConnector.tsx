type HiringConnectorProps = {
  side: "left" | "right";
  id: string;
};

const W = 353; // 50% of card (307) + lane gap (46)
const H = 76;  // cardHeight / 2 - overlap
const R = 20;  // corner radius

export default function HiringConnector({ side, id }: HiringConnectorProps) {
  const isRight = side === "right";

  // Right card: run left→right, turn down at the far end.
  // Left card:  run right→left, turn down at the far end.
  const d = isRight
    ? `M 1 1 H ${W - R - 1} A ${R} ${R} 0 0 1 ${W - 1} ${R + 1} V ${H}`
    : `M ${W - 1} 1 H ${R + 1} A ${R} ${R} 0 0 0 1 ${R + 1} V ${H}`;

  const gradientId = `hiring-connector-${id}`;

  return (
    <svg
      aria-hidden
      width={W}
      height={H}
      viewBox={`0 0 ${W} ${H}`}
      fill="none"
      className="pointer-events-none absolute hidden lg:block"
      style={{
        top: -H,
        ...(isRight ? { left: -46 } : { right: -46 }),
      }}
    >
      <defs>
        <linearGradient
          id={gradientId}
          x1={isRight ? "0" : W}
          y1="0"
          x2={isRight ? W : "0"}
          y2={H}
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="10%" stopColor="#013E58" stopOpacity="0" />
          <stop offset="100%" stopColor="#38BDF8" stopOpacity="1" />
        </linearGradient>
      </defs>

      <path
        d={d}
        stroke={`url(#${gradientId})`}
        strokeWidth="1"
        strokeDasharray="6 7"
        strokeLinecap="round"
      />
    </svg>
  );
}