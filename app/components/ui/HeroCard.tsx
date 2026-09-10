import Image from "next/image";

export type HeroCardProps = {
  icon: string;
  metric: string;
  label: string;
};

function parseMetric(metric: string) {
  if (metric.endsWith("+")) {
    return { value: metric.slice(0, -1), suffix: "+" };
  }

  return { value: metric, suffix: null };
}

export default function HeroCard({ icon, metric, label }: HeroCardProps) {
  const { value, suffix } = parseMetric(metric);

  return (
    <article className="flex min-h-[210px] min-w-[200px] flex-col gap-6 rounded-4xl border border-white/20 bg-white/10 p-6 backdrop-blur-md">
      <Image src={icon} alt="" width={56} height={56} aria-hidden />
      <div className="mt-auto flex flex-col gap-2">
        <span className="text-[50px] text-white">
          {value}
          {suffix && (
            <sub className="text-[24px] font-bold">{suffix}</sub>
          )}
        </span>
        <p className="text-base font-medium leading-tight text-white text-nowrap">
          {label}
        </p>
      </div>
    </article>
  );
}
