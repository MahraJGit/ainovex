import SectionGrid from "../../ui/SectionGrid";

export default function BlogHero({ total }: { total: number }) {
  return (
    <section className="relative overflow-hidden bg-black">
      {/* Blue glow, same language as the other heroes */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[520px]"
        style={{
          background:
            "radial-gradient(520px 420px at 50% 0%, rgba(17,69,136,1) 0%, rgba(17,69,136,0.55) 45%, rgba(17,69,136,0.18) 75%, transparent 100%)",
        }}
      />
      <SectionGrid placement="center-dark" />
<div className="header-padding" />
      <div className="section-container relative z-10 pb-16 pt-40 text-center lg:pt-[230px]">
        <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-[12px] font-medium text-white backdrop-blur-md">
          <span className="h-1.5 w-1.5 rounded-full bg-[#38BDF8]" />
          {total} articles and counting
        </span>

        <h1 className="mx-auto mt-8 max-w-[860px] text-[40px] font-medium leading-[1.1] text-white lg:text-[56px]">
          Notes From The <span className="font-bold text-[#38BDF8]">Build</span>
        </h1>

        <p className="mx-auto mt-6 max-w-[620px] text-[16px] leading-[1.5] text-white lg:text-[18px]">
          What we are learning while shipping software for real businesses. No
          fluff, no trend chasing, just the decisions behind the work.
        </p>
      </div>
    </section>
  );
}