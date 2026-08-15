"use client";

import { useState } from "react";

export type AuctionFaq = { question: string; answer: string };

type Variant = "dark" | "light";

const AuctionFaqs = ({
    faqs,
    variant = "dark",
}: {
    faqs: AuctionFaq[];
    variant?: Variant;
}) => {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const isLight = variant === "light";

    const cardClass = isLight
        ? "bg-white border-orange-100"
        : "bg-zinc-950 border-zinc-800";
    const openCardClass = isLight
        ? "border-[#F23410]/50 shadow-lg shadow-[#F23410]/5"
        : "border-[#F23410]/60 shadow-lg shadow-[#F23410]/5";
    const hoverCardClass = isLight
        ? "hover:border-orange-300"
        : "hover:border-zinc-600";
    const questionClass = isLight ? "text-gray-900" : "text-white";
    const answerClass = isLight ? "text-gray-600" : "text-zinc-400";
    const iconClosedClass = isLight
        ? "bg-orange-100 text-[#F23410]"
        : "bg-zinc-800 text-zinc-400";
    const iconOpenClass = "bg-[#F23410] text-white";

    return (
        <div className={isLight ? "max-w-3xl mx-auto space-y-3" : "max-w-3xl mx-auto space-y-3"}>
            {faqs.map((faq, index) => {
                const isOpen = openIndex === index;
                return (
                    <div
                        key={faq.question}
                        className={`overflow-hidden rounded-2xl border transition-colors duration-300 ${cardClass} ${
                            isOpen ? openCardClass : hoverCardClass
                        }`}
                    >
                        <button
                            type="button"
                            onClick={() => setOpenIndex(isOpen ? null : index)}
                            aria-expanded={isOpen}
                            className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left cursor-pointer"
                        >
                            <span className={`text-sm md:text-base font-semibold ${questionClass}`}>
                                {faq.question}
                            </span>
                            <span
                                className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${
                                    isOpen ? iconOpenClass : iconClosedClass
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
                                <p className={`px-5 pb-5 text-sm leading-7 ${answerClass}`}>
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
