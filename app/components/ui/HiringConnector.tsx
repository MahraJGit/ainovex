type HiringConnectorProps = {
  side: "left" | "right" | "straight";
  id: string;
};

const W = 353;
const H = 76;
const R = 20;

const STRAIGHT_W = 2;
const STRAIGHT_H = 120;

export default function HiringConnector({ side, id }: HiringConnectorProps) {
  const isRight = side === "right";
  const gradientId = `hiring-connector-${id}`;

  if (side === "straight") {
    return (
      <svg
        aria-hidden
        width={STRAIGHT_W}
        height={STRAIGHT_H}
        viewBox={`0 0 ${STRAIGHT_W} ${STRAIGHT_H}`}
        fill="none"
        className="pointer-events-none block mx-auto"
      >
        <defs>
          <linearGradient
            id={gradientId}
            x1="0"
            y1="0"
            x2="0"
            y2={STRAIGHT_H}
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="#013E58" stopOpacity="0" />
            <stop offset="50%" stopColor="#38BDF8" stopOpacity="1" />
          </linearGradient>
        </defs>
        <path
          d={`M 1 0 V ${STRAIGHT_H}`}
          stroke={`url(#${gradientId})`}
          strokeWidth="1"
          strokeDasharray="6 7"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  const d = isRight
    ? `M 1 1 H ${W - R - 1} A ${R} ${R} 0 0 1 ${W - 1} ${R + 1} V ${H}`
    : `M ${W - 1} 1 H ${R + 1} A ${R} ${R} 0 0 0 1 ${R + 1} V ${H}`;

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