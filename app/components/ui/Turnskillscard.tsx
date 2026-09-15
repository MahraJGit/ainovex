type TurnSkillsCardProps = {
  icon: string;
  title: string;
  description: string;
};

export default function TurnSkillsCard({
  icon,
  title,
  description,
}: TurnSkillsCardProps) {
  return (
    <article className="rounded-3xl bg-white border p-4 max-w-[324px] h-full relative overflow-hidden">
          <div className="absolute -top-0.5 left-0 h-2 w-full bg-[#38BDF8]" />

      {/* Icon circle */}
      <div className="mb-4 flex items-center rounded-full">
        <img src={icon} alt="" className="h-14 w-14" aria-hidden />
      </div>
      <h3 className="text-lg font-bold text-ink max-w-[252px] whitespace-nowrap">{title}</h3>
      <p className="mt-2 text-sm tracking-[-0.5px] font-normal leading-snug text-black-v1/87">
        {description}
      </p>
    </article>
  );
}