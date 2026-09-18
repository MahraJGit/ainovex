import SectionGrid from "../../ui/SectionGrid";

interface PolicyItem {
  label: string;
  detail: string;
}

interface PolicySection {
  title: string;
  content?: string;
  highlighted?: boolean;
  items?: PolicyItem[];
  bullets?: string[];
  additionalContent?: string;
}

interface PolicyContentProps {
  intro: string;
  sections: PolicySection[];
}

export default function PolicyContent({ intro, sections }: PolicyContentProps) {
  return (
    <section className="relative bg-white">
      <SectionGrid placement="center" className="mt-5"/>

      <div className="section-container relative z-10 py-[104px]! lg:py-[120px]!">

        <p className="text-[20px] font-normal leading-snug text-[#878787]">
          {intro}
        </p>

        <div className="mt-8 flex flex-col gap-8">
          {sections.map((section) => {
            const inner = (
              <>
                <h3 className="text-[32px] font-semibold leading-tight text-black">
                  {section.title}
                </h3>

                {section.content && (
                  <p className="mt-3 max-w-[1150px] text-[18px] font-normal leading-snug text-[#707070]">
                    {section.content}
                  </p>
                )}

                {section.items && (
                  <div className="mt-3 flex flex-col gap-2">
                    {section.items.map((item) => (
                      <div key={item.label}>
                        <p className="text-[18px] font-semibold text-black">{item.label}</p>
                        <ul className="ml-12 list-disc">
                          <li className="text-[18px] font-normal leading-snug text-[#707070]">
                            {item.detail}
                          </li>
                        </ul>
                      </div>
                    ))}
                  </div>
                )}

                {section.bullets && (
                  <ul className="mt-3 ml-8 list-disc flex flex-col gap-1">
                    {section.bullets.map((bullet) => (
                      <li key={bullet} className="text-[18px] font-medium leading-snug text-ink">
                        {bullet}
                      </li>
                    ))}
                  </ul>
                )}

                {section.additionalContent && (
                  <p className="mt-3 max-w-[1150px] text-[18px] font-normal leading-snug text-[#707070]">
                    {section.additionalContent}
                  </p>
                )}
              </>
            );

            return section.highlighted ? (
              <div
                key={section.title}
                className="relative rounded-[16px] overflow-hidden bg-[#F2F2F2] py-6 pl-9 pr-8"
              >
                <span
                  aria-hidden
                  className="absolute inset-y-0 left-0 w-[9px] bg-[#38BDF8]"
                />
                {inner}
              </div>
            ) : (
              <div key={section.title} className="px-1">
                {inner}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}