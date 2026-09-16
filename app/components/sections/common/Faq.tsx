"use client";

import Image from "next/image";
import { useState } from "react";
import { IoAdd, IoClose } from "react-icons/io5";
import SectionGrid from "../../ui/SectionGrid";
import Tag from "../../ui/Tag";

interface FaqItem {
  question: string;
  answer: string;
}

interface FaqProps {
  faqs: FaqItem[];
}

export default function Faq({ faqs }: FaqProps) {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faq" className="relative overflow-hidden bg-[#05080F]">
      <SectionGrid
        placement="left"
        fadeTo="#05080F"
        lineColor="rgba(56,189,248,0.12)"
        height={480}
      />

      <div className="section-container relative z-10 !pt-[104px] lg:!pt-[120px]">
        <div className="mx-auto flex flex-col items-center text-center">
          <Tag label="FAQs" variant="outline" className="[&_span]:text-primary" />
          <h2 className="mt-6 max-w-3xl text-white">
            <span className="text-primary">Frequently</span> Asked Questions
          </h2>
        </div>

        <div className="mt-14 grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="relative mx-auto w-full max-w-[480px] lg:mx-0">
            <Image
              src="/images/faq.png"
              alt="Person thinking about frequently asked questions"
              width={560}
              height={560}
              className="h-auto w-full"
              priority={false}
            />
          </div>

          <div className="flex flex-col gap-4">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;

              return (
                <div
                  key={faq.question}
                  className="rounded-2xl border border-white/8 bg-[#0C1222]"
                >
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpenIndex(isOpen ? -1 : index)}
                    className="flex w-full items-start justify-between gap-4 px-5 py-5 text-left"
                  >
                    <span className="text-base font-medium leading-[140%] text-white">
                      {faq.question}
                    </span>
                    <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center text-primary">
                      {isOpen ? <IoClose size={20} /> : <IoAdd size={22} />}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5">
                      <p className="max-w-xl text-sm font-medium leading-[160%] text-white/65">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}