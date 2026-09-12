
type HiringStepCardProps = {
  step: string;
  title: string;
  description: string;
};

export default function HiringStepCard({
  step,
  title,
  description,
}: HiringStepCardProps) {
  return (
    <article className="relative flex min-h-[271px] w-full items-center rounded-xl bg-white">
      {/* Floating gradient capsule — inset inside the card, not flush to the edge */}
      <div className="absolute bottom-5 left-5 top-4 flex w-[50px] items-center justify-center rounded-full bg-gradient-to-b from-[#38BDF8] to-[#0B2149]">
        <span className="rotate-180 whitespace-nowrap text-2xl font-semibold tracking-wide text-white [writing-mode:vertical-rl]">
          {step}
        </span>
      </div>

      {/* Content — left padding clears the capsule */}
      <div className="w-full py-8 pl-[86px] pr-[32px]">
        <h3 className="text-2xl font-semibold text-ink">{title}</h3>
        <p className="mt-3 text-xl font-normal leading-relaxed text-[#242424]">
          {description}
        </p>
      </div>
    </article>
  );
}