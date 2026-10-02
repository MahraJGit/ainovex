"use client";

import { useState } from "react";
import { IoAdd, IoClose } from "react-icons/io5";
import type { BlogFaq } from "@/app/lib/blogs";

export default function BlogFaqs({ faqs }: { faqs: BlogFaq[] }) {
  const [openIndex, setOpenIndex] = useState(0);

  if (!faqs.length) return null;

  return (
    <section className="mt-14 rounded-2xl border border-black-v1/10 bg-[#F8FAFC] p-6 sm:p-8">
      <h2 className="text-[24px] font-bold text-black-v1 sm:text-[28px]">
        Frequently asked questions
      </h2>
      <p className="mt-2 text-[14px] text-black-v1/55">
        Quick answers related to this article.
      </p>
      <div className="mt-6 flex flex-col gap-3">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={`${faq.question}-${index}`}
              className="rounded-xl border border-black-v1/10 bg-white shadow-[0_1px_2px_rgba(0,0,0,0.03)]"
            >
              <button
                type="button"
                aria-expanded={isOpen}
                onClick={() => setOpenIndex(isOpen ? -1 : index)}
                className="flex w-full cursor-pointer items-center justify-between gap-4 px-4 py-4 text-left"
              >
                <span className="text-[15px] font-semibold text-black-v1">
                  {faq.question}
                </span>
                <span className="shrink-0 text-primary">
                  {isOpen ? <IoClose size={20} /> : <IoAdd size={22} />}
                </span>
              </button>
              <div
                className={`grid transition-all duration-300 ${
                  isOpen
                    ? "grid-rows-[1fr] opacity-100"
                    : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden">
                  <p className="px-4 pb-4 text-[14px] leading-relaxed text-black-v1/70">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
