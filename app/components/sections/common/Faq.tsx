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

      <div className="section-container relative z-10 !pt-[104px] !pb-[104px] lg:!pt-[120px] lg:!pb-[120px]">
        <div className="mx-auto flex flex-col items-center text-center">
          <Tag label="FAQs" variant="outline" className="[&_span]:text-primary" />
          <h2 className="mt-6 max-w-3xl text-white">
            <span className="text-primary">Frequently</span> Asked Questions
          </h2>
        </div>

        <div className="mt-14 grid grid-cols-1 items-center gap-10 lg:grid-cols-[1fr_1.5fr] lg:gap-16">
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

          <div className="flex flex-col gap-3">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;

              return (
                <div
                  key={faq.question}
                  className={`rounded-xl border transition-colors duration-300 ${isOpen
                      ? "border-[#142023] bg-[#242424]/70"
                      : "border-[#142023] bg-[#242424]/70 hover:border-white/15"
                    }`}
                >
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpenIndex(isOpen ? -1 : index)}
                    className="flex w-full items-center justify-between gap-4 px-4 py-4 text-left"
                  >
                    <span className="text-base leading-[140%] text-white">
                      {faq.question}
                    </span>
                    <span className="flex shrink-0 items-center justify-center text-primary">
                      {isOpen ? <IoClose size={20} /> : <IoAdd size={22} />}
                    </span>
                  </button>

                  <div
                    className={`grid transition-all duration-300 ease-in-out ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                      }`}
                  >
                    <div className="overflow-hidden">
                      <p className="px-4 pb-4 max-w-xl text-sm font-medium leading-[160%] text-[#C1C1C1]">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}