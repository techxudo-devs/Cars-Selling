"use client";

import { useState } from "react";

export type AuctionFaq = { question: string; answer: string };

const AuctionFaqs = ({ faqs }: { faqs: AuctionFaq[] }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="max-w-3xl mx-auto space-y-3">
      {faqs.map((faq, index) => {
        const isOpen = openIndex === index;
        return (
          <div
            key={faq.question}
            className={`overflow-hidden rounded-2xl border bg-zinc-950 transition-colors duration-300 ${
              isOpen
                ? "border-[#F23410]/60 shadow-lg shadow-[#F23410]/5"
                : "border-zinc-800 hover:border-zinc-600"
            }`}
          >
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : index)}
              aria-expanded={isOpen}
              className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left cursor-pointer"
            >
              <span className="text-sm md:text-base font-semibold text-white">
                {faq.question}
              </span>
              <span
                className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${
                  isOpen
                    ? "rotate-45 bg-[#F23410] text-white"
                    : "bg-zinc-800 text-zinc-400"
                }`}
              >
                <svg
                  className="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2.5}
                  strokeLinecap="round"
                >
                  <path d="M12 5v14M5 12h14" />
                </svg>
              </span>
            </button>
            <div
              className={`grid transition-all duration-300 ease-in-out ${
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <p className="px-5 pb-5 text-sm text-zinc-400 leading-7">
                  {faq.answer}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AuctionFaqs;
