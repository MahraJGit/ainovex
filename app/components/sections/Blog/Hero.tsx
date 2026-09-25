import PageHero from "../common/PageHero";

export default function BlogHero({ total }: { total: number }) {
  return (
    <PageHero
      heading={
        <>
          Notes From The <span className="font-bold text-[#38BDF8]">Build</span>
        </>
      }
      description="What we are learning while shipping software for real businesses. No fluff, no trend chasing, just the decisions behind the work."
    />
  );
}