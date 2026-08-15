import type { Metadata } from "next";
import React from "react";
import Image from "next/image";
import ImportCalculator from "@/components/ImportCalculator";

export const metadata: Metadata = {
  title: "Import Brokering and Calculator – Elite Motor Cars Australia",
  description:
    "A direct broker for cars from Japan to Australia, offering a seamless process for sourcing, buying, importing and registering your vehicle. Calculate estimated landed costs easily.",
};

const importSteps = [
  {
    stepNumber: 1,
    title: "Step 1: Initial consultation",
    subtitle: "Tell us what you're looking for",
    description:
      "We discuss your preferences, budget, and vehicle requirements to find the perfect car.",
    image: "/import-brokering/step1.jpg",
  },
  {
    stepNumber: 2,
    title: "Step 2: Ocean auction access",
    subtitle: "Gain access to Japan's top auctions",
    description:
      "Browse thousands of vehicle listings updated daily with full condition reports.",
    image: "/import-brokering/step2.jpg",
  },
  {
    stepNumber: 3,
    title: "Step 3: Vehicle selection and inspection",
    subtitle: "Thorough pre-purchase inspection",
    description:
      "We arrange detailed physical checks and translated auction sheets to ensure top quality.",
    image: "/import-brokering/step3.jpg",
  },
  {
    stepNumber: 4,
    title: "Step 4: Bidding",
    subtitle: "Professional bidding strategy",
    description:
      "We place bids on your behalf based on your maximum budget, ensuring the best deal.",
    image: "/import-brokering/step4.jpg",
  },
  {
    stepNumber: 5,
    title: "Step 5: Payment & Transport",
    subtitle: "Secure payment & export logistics",
    description:
      "Once won, we handle payment processing and arrange inland transport to the Japanese port.",
    image: "/import-brokering/step5.jpg",
  },
  {
    stepNumber: 6,
    title: "Step 6: Import Inspection",
    subtitle: "Pre-shipping verification",
    description:
      "Comprehensive checks before loading onto the vessel to meet Australian import standards.",
    image: "/import-brokering/step6.jpg",
  },
  {
    stepNumber: 7,
    title: "Step 7: Shipping to Australia",
    subtitle: "Safe & tracked sea freight",
    description:
      "Your vehicle is loaded into containers or Ro-Ro vessels with full tracking provided.",
    image: "/import-brokering/step7.jpg",
  },
  {
    stepNumber: 8,
    title: "Step 8: Compliance and Registration",
    subtitle: "RAWS compliance & registration",
    description:
      "We complete compliance testing, roadworthy inspections, and final registration paperwork.",
    image: "/import-brokering/step8.jpg",
  },
  {
    stepNumber: 9,
    title: "Step 9: Delivery",
    subtitle: "Handover of your imported car",
    description:
      "Pick up your fully compliant, registered car or have it delivered straight to your door.",
    image: "/import-brokering/step9.jpg",
  },
];

export default function ImportBrokeringPage() {
  return (
    <div className="w-full bg-white text-gray-900 min-h-screen py-12 md:py-20">
      {/* Top Header Section */}
      <div className="max-w-5xl mx-auto text-center px-4 mb-16 relative">
        <p className="text-sm md:text-base font-bold orb uppercase tracking-widest text-[#f23410] mb-3">
          Importing Made Easy
        </p>

        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-black orb uppercase tracking-tight mb-8">
          Import Brokering and <br className="hidden sm:inline" /> Calculator
        </h1>

        <p className="text-gray-600 text-base md:text-xl leading-relaxed max-w-3xl mx-auto mb-6 font-normal">
          A direct broker for cars from Japan to Australia, offering a seamless process for sourcing, buying, importing and registering your vehicle. Let us handle the complexities while you enjoy a smooth import experience.
        </p>

        <p className="text-gray-500 text-sm md:text-base leading-relaxed max-w-2xl mx-auto mb-8">
          Calculate the estimated total cost of importing a vehicle from Japan to Australia using our easy-to-use calculator below.
        </p>

        <div className="flex justify-center md:justify-end md:absolute md:right-0 md:bottom-2 mt-4 md:mt-0">
          <a
            href="#calculator"
            className="text-sm font-bold text-gray-500 hover:text-[#f23410] underline transition-colors cursor-pointer"
          >
            Calculator ↓
          </a>
        </div>
      </div>

      {/* Steps Grid Section - Doubled Card Height and Container Width */}
      <div className="max-w-7xl mx-auto px-4 space-y-10 md:space-y-14">
        {importSteps.map((step) => {
          const isEven = step.stepNumber % 2 === 0;

          return (
            <div
              key={step.stepNumber}
              className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-stretch min-h-[480px] md:min-h-[620px]"
            >
              {/* Text Card Box - Doubled Padding and Typography */}
              <div
                className={`bg-black text-white rounded-3xl md:rounded-[36px] p-10 sm:p-14 md:p-20 flex flex-col justify-center items-center text-center shadow-2xl transition-all duration-300 hover:scale-[1.01] ${
                  isEven ? "md:order-2" : "md:order-1"
                }`}
              >
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold orb mb-5 tracking-wide leading-tight">
                  {step.title}
                </h2>

                <p className="text-[#f23410] text-sm sm:text-base md:text-lg font-bold mb-5 tracking-wide uppercase">
                  {step.subtitle}
                </p>

                <p className="text-gray-300 text-sm sm:text-base md:text-xl leading-relaxed max-w-md font-light">
                  {step.description}
                </p>
              </div>

              {/* Image Box - Doubled Height */}
              <div
                className={`relative w-full h-[400px] md:h-auto min-h-[400px] md:min-h-[620px] rounded-3xl md:rounded-[36px] overflow-hidden shadow-xl ${
                  isEven ? "md:order-1" : "md:order-2"
                }`}
              >
                <Image
                  src={step.image}
                  alt={step.title}
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority={step.stepNumber <= 2}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Import Calculator Section */}
      <ImportCalculator />
    </div>
  );
}
