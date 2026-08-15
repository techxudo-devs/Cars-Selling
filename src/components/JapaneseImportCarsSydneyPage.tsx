import Image from "next/image";
import Link from "next/link";
import {
  AlertTriangle,
  ArrowRight,
  Check,
  Cog,
  Crown,
  FileText,
  Gauge,
  Leaf,
  Mail,
  MapPin,
  Phone,
  Settings,
  ShieldCheck,
  Users,
} from "lucide-react";

import heroCarMain3 from "@/assets/blog20.jpeg";
import type { FrontendCar } from "@/types/car";
import { getCarDetailRoute, isSoldCar } from "@/lib/carRoutes";
import { optimizeCloudinaryImage } from "@/lib/images";
import AuctionFaqs from "@/components/AuctionFaqs";
import BrowseCarsGrid from "@/components/BrowseCarsGrid";
import carsData from "../../browse_all_cars.json";

const sydneyFaqs = [
  {
    question: "Can I buy a Japanese imported car already available in Sydney?",
    answer:
      "Yes. If a suitable imported vehicle is already available through Elite Motor Cars, you can enquire about that specific vehicle rather than beginning a new sourcing search.",
  },
  {
    question: "Can Elite Motor Cars find a specific car for me in Japan?",
    answer:
      "Buyers can submit their preferred make, model, year, specification, mileage, colour and budget and discuss potential sourcing options.",
  },
  {
    question: "Can any Japanese car be imported into Australia?",
    answer:
      "No. The exact vehicle must fit an applicable Australian approval pathway. Import approval is required before a road vehicle is imported.",
  },
  {
    question: "Do I need import approval before shipping a car from Japan?",
    answer:
      "Yes. The Australian Government's published process places approval before arranging international shipment.",
  },
  {
    question: "Can an imported Japanese car be registered in NSW?",
    answer:
      "Yes, provided the vehicle satisfies the applicable import, compliance and NSW registration requirements. NSW maintains a specific process for registering imported vehicles.",
  },
  {
    question: "Are Japanese imported cars only JDM performance cars?",
    answer:
      "No. Japanese vehicle sourcing can include many categories such as hybrids, family vehicles, people movers, luxury vehicles and specialist performance models, subject to eligibility and availability.",
  },
  {
    question:
      "Can I buy a Japanese used car in Sydney without importing one myself?",
    answer:
      "Yes. One option is to purchase a suitable imported vehicle that is already available locally. If the required vehicle is not available, custom sourcing can then be considered.",
  },
  {
    question: "How much does a Japanese imported car cost?",
    answer:
      "The final cost depends on the individual vehicle and may include purchase, Japan-side charges, shipping, taxes, compliance, registration and other costs. Use the dedicated cost page for a detailed explanation.",
  },
  {
    question: "How long does importing from Japan take?",
    answer:
      "There is no guaranteed universal timeframe because sourcing, approval, shipping, customs, biosecurity, compliance and registration can all affect timing. Buyers should ask for a vehicle-specific estimate once the exact vehicle and pathway are known.",
  },
  {
    question: "Can Elite Motor Cars deliver outside Sydney?",
    answer:
      "Elite Motor Cars currently states that Australia-wide delivery is available as part of its service offering.",
  },
];

const trustBar = [
  "Sydney, NSW",
  "Dealer Licence: MD100405",
  "Japan Vehicle Sourcing",
  "Inspection & Auction Checks",
  "Import & Compliance Support",
  "Australia-Wide Delivery",
];

const optionOneSuitors = [
  "Want a vehicle sooner",
  "Prefer to review a specific available car",
  "Want greater certainty around the vehicle being purchased",
  "Do not require a rare specification",
  "Find that current stock already matches their requirements",
];

const optionTwoDetails = [
  "Preferred make and model",
  "Year range",
  "Exact variant if known",
  "Preferred mileage",
  "Colour",
  "Drivetrain",
  "Required equipment",
  "Condition expectations",
  "Total budget",
  "Sydney or NSW delivery location",
];

const carCategories = [
  {
    icon: Leaf,
    title: "Japanese Hybrid Cars",
    body: "For buyers interested in fuel-efficient daily transport, family vehicles or premium hybrid models.",
    checks: [
      "Condition",
      "Service history",
      "Warning codes",
      "Hybrid system health",
      "Australian parts and servicing support",
    ],
  },
  {
    icon: Users,
    title: "Family Cars & People Movers",
    body: "Japan offers numerous vehicle configurations designed around passenger space, flexible seating and family use.",
    checks: [
      "Seating layout",
      "Dimensions",
      "Safety equipment",
      "Practical storage",
      "Drivetrain",
      "Running costs",
      "Australian registration requirements",
    ],
  },
  {
    icon: Crown,
    title: "Japanese Luxury Cars",
    body: "Japanese-market luxury vehicles can provide specifications and equipment that may be difficult to find in Australian-delivered examples.",
    checks: [
      "Electronics",
      "Suspension",
      "Drivetrain",
      "Parts availability",
      "Overall condition",
    ],
  },
];

const jdmCategory = {
  icon: Gauge,
  title: "JDM & Performance Cars",
  body: "Sydney enthusiasts looking for specialist Japanese performance vehicles can explore eligible JDM models and variants.",
  note: "Eligibility is vehicle-specific. A model being popular in the JDM community does not automatically make every version eligible for Australian import.",
  cta: "Explore JDM Imports Australia",
  href: "/jdm-imports-australia/",
};

const usedCarsCategory = {
  icon: FileText,
  title: "Japanese Used Cars",
  body: "Buyers looking for a used vehicle from Japan should focus on the specific car rather than assumptions about Japanese vehicles generally.",
  checks: [
    "Auction documentation",
    "Chassis information",
    "Mileage evidence",
    "Previous repairs",
    "Mechanical condition",
    "Modifications",
    "Rust and corrosion",
    "Applicable import requirements",
  ],
  cta: "Explore Japanese Used Cars Australia",
  href: "/japanese-used-cars-australia/",
};

const importSteps = [
  {
    title: "Tell Us What You Want",
    body: "Start with the vehicle rather than the auction. Tell Elite Motor Cars your make, model, year, specification, preferred mileage, colour, features and budget. This helps narrow the search to vehicles that genuinely match your requirements.",
  },
  {
    title: "Check the Vehicle and Import Pathway",
    body: "Before committing to an overseas vehicle, its exact identity and potential Australian import pathway should be assessed. Relevant information can include model, variant, chassis or model code, build date, drivetrain and the applicable approval pathway.",
    link: {
      label: "Vehicle import approval Australia",
      href: "/vehicle-import-approval-australia/",
    },
  },
  {
    title: "Search and Inspect Suitable Vehicles",
    body: "Once the requirements are established, suitable vehicles can be considered through relevant Japanese sourcing channels. The individual vehicle should be reviewed for identity, auction documentation where available, mileage evidence, accident and repair history, mechanical condition, modifications and overall condition.",
    link: {
      label: "Used car inspection before importing from Japan",
      href: "/blogs/used-car-inspection-before-importing-from-japan/",
    },
  },
  {
    title: "Purchase and Import",
    body: "After the appropriate process and approval requirements are satisfied, the vehicle can proceed through purchase, export preparation and shipping. The Australian Government's published sequence places import approval before international shipment.",
  },
  {
    title: "Customs, Biosecurity and Compliance",
    body: "After arrival, imported vehicles may need to complete the relevant customs process, biosecurity process, compliance requirements, RAV-related requirements and other applicable steps. The requirements differ according to the exact vehicle and approval pathway.",
  },
  {
    title: "NSW Registration and Handover",
    body: "Federal import approval and NSW registration are separate processes. NSW Government guidance states that imported vehicles require the appropriate import approval and compliance evidence before registration requirements can be completed. Once complete, the vehicle can proceed toward NSW registration and handover.",
  },
];

const localQuestions = [
  "Is the vehicle already available in Australia?",
  "If not, can a suitable vehicle be sourced from Japan?",
  "Is the exact vehicle potentially eligible?",
  "What inspection information is available?",
  "What stages remain before NSW registration?",
  "What is included in the quoted price?",
  "Where will the final vehicle be handed over or delivered?",
  "What documentation will be supplied?",
];

const costFactors = [
  "Vehicle purchase price",
  "Japan-side charges",
  "Inspection",
  "Import approval",
  "Inland transport",
  "International shipping",
  "Insurance",
  "Customs and applicable taxes",
  "Biosecurity",
  "Compliance",
  "Registration",
  "Repairs or servicing",
  "Delivery",
];

const inspectionChecks = [
  "Exact chassis information",
  "Auction sheet where applicable",
  "Mileage evidence",
  "Accident repairs",
  "Rust and corrosion",
  "Mechanical condition",
  "Diagnostic faults",
  "Hybrid battery condition where relevant",
  "Modifications",
  "Documents",
];

const whyChoose = [
  {
    title: "Buy or Source",
    body: "Choose from imported vehicles already available for sale or ask about sourcing a particular car from Japan.",
  },
  {
    title: "Vehicle-Focused Search",
    body: "Begin with your required make, model, specification, mileage and budget rather than choosing blindly from whatever is currently listed.",
  },
  {
    title: "Inspection-Focused Process",
    body: "Vehicle condition and documentation should be assessed before the purchase decision wherever practical.",
  },
  {
    title: "Import Process Support",
    body: "Elite Motor Cars' live service positioning includes sourcing, inspections, shipping, customs, compliance support and delivery.",
  },
  {
    title: "Sydney-Based Buyer Support",
    body: "Contact the business directly from Sydney, NSW regarding current stock or a custom sourcing request.",
  },
  {
    title: "Australia-Wide Delivery",
    body: "Customers outside Sydney can also discuss vehicle delivery options after the applicable import, compliance and preparation stages are completed.",
  },
];

const comparisonRows = [
  {
    aspect: "Vehicle",
    available: "Already selected",
    custom: "Search based on your requirements",
  },
  {
    aspect: "Timing",
    available: "Faster when suitable stock exists",
    custom: "Additional import timeline",
  },
  {
    aspect: "Choice",
    available: "Limited to current stock",
    custom: "Wider choice",
  },
  {
    aspect: "Specification",
    available: "Current stock only",
    custom: "Target preferred year and specification",
  },
  {
    aspect: "Pricing",
    available: "Greater price certainty",
    custom: "Final cost depends on selected vehicle",
  },
  {
    aspect: "Best for",
    available: "When current stock matches",
    custom: "When current stock does not match",
  },
];

const japaneseMakes = [
  "toyota",
  "lexus",
  "nissan",
  "honda",
  "mitsubishi",
  "mazda",
  "subaru",
  "suzuki",
  "isuzu",
  "daihatsu",
  "infiniti",
];

const SectionHeader = ({
  eyebrow,
  title,
  tone = "light",
  center = false,
}: {
  eyebrow?: string;
  title: string;
  tone?: "light" | "dark";
  center?: boolean;
}) => (
  <div className={`mb-12 md:mb-16 ${center ? "text-center" : ""}`}>
    {eyebrow ? (
      <p className="text-xs font-medium uppercase tracking-wide text-[#F23410] mb-3">
        {eyebrow}
      </p>
    ) : null}
    <h2
      className={`orb text-2xl sm:text-3xl md:text-4xl font-bold max-w-3xl mx-auto uppercase leading-tight ${
        tone === "light" ? "text-gray-900" : "text-white"
      }`}
    >
      {title}
    </h2>
    <div
      className={`mt-4 h-[2px] w-16 bg-[#F23410] ${center ? "mx-auto" : ""}`}
    />
  </div>
);

const SolidAction = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => (
  <Link
    href={href}
    className="inline-flex items-center justify-center gap-2 bg-[#F23410] text-white px-7 py-4 text-xs font-medium uppercase tracking-wide rounded-md transition-all duration-300 hover:bg-white hover:text-black cursor-pointer"
  >
    {children}
    <ArrowRight className="w-4 h-4" />
  </Link>
);

const LineAction = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => (
  <Link
    href={href}
    className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-[#F23410] border-b-2 border-[#F23410]/60 pb-1.5 hover:gap-3 hover:border-[#F23410] transition-all"
  >
    {children}
    <ArrowRight className="w-4 h-4" />
  </Link>
);

const JapaneseImportCarsSydneyPage = ({
  initialAvailableCars,
}: {
  initialAvailableCars: FrontendCar[];
}) => {
  const japaneseCars = initialAvailableCars.filter((car) => {
    const tokens = car.name.toLowerCase().split(/[^a-z]+/);
    return tokens.some((token) => japaneseMakes.includes(token));
  });
  const featuredCars = japaneseCars.slice(0, 6);

  return (
    <div className="bg-black text-white">
      {/* Hero */}
      <section className="relative overflow-hidden bg-black">
        <div className="absolute -top-32 -right-32 h-[500px] w-[500px] rounded-full bg-[#F23410]/10 blur-[120px]" />
        <div className="absolute -bottom-40 -left-40 h-[400px] w-[400px] rounded-full bg-[#F23410]/5 blur-[100px]" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-10 md:py-20">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <p className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-[#F23410] border border-[#F23410]/40 rounded-full px-4 py-1.5">
                Sydney &amp; NSW Import Specialists
              </p>
              <h1 className="orb text-3xl sm:text-4xl md:text-5xl font-black uppercase leading-[1.05] mt-7">
                Japanese
                <br />
                Import Cars <span className="text-[#F23410]">Sydney</span>
              </h1>
              <h2 className="text-xl md:text-2xl font-semibold mt-7">
                Looking for a Japanese Imported Car in Sydney?
              </h2>
              <p className="mt-4 text-zinc-300 leading-7 max-w-xl">
                Elite Motor Cars helps Sydney and NSW buyers purchase imported
                vehicles already available in Australia or source a specific new
                or used vehicle from Japan. Whether you are searching for a
                Japanese hybrid, luxury vehicle, family car, people mover or
                specialist JDM model, our process is designed to help you move
                from vehicle selection through inspection, import and delivery
                with greater clarity.
              </p>
              <div className="mt-10 flex flex-wrap items-center gap-4">
                <SolidAction href="/available-cars/">
                  Browse Available Imported Cars
                </SolidAction>
                <LineAction href="/contact-us/">
                  Request a Car from Japan
                </LineAction>
                <LineAction href="/browse-cars/">
                  Browse Cars We Can Import
                </LineAction>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -top-4 -right-4 h-full w-full border-2 border-[#F23410]/50" />
              <Image
                src={heroCarMain3}
                alt="Japanese import cars available for Sydney and NSW buyers"
                priority
                className="relative w-full aspect-[4/3] object-cover"
              />
              <div className="absolute top-6 right-6 bg-[#F23410] px-4 py-2 text-[11px] font-medium uppercase tracking-wide text-white">
                Japan to Sydney
              </div>
            </div>
          </div>
        </div>

        <div className="relative border-t border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 flex flex-wrap justify-center md:justify-start gap-x-8 gap-y-3">
            {trustBar.map((item) => (
              <span
                key={item}
                className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-zinc-300"
              >
                <Check className="w-4 h-4 text-[#F23410]" />
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Buy or Source */}
      <section className="bg-black py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionHeader
            eyebrow="Two practical routes"
            title="Buy an Imported Car in Sydney or Have One Sourced from Japan"
            tone="dark"
            center
          />
          <p className="max-w-3xl mx-auto text-center text-zinc-400 text-sm md:text-base leading-7 mb-12">
            Sydney buyers do not always need to manage an overseas import
            themselves. Elite Motor Cars provides two practical routes depending
            on the vehicle you want and how quickly you need it.
          </p>

          <div className="grid lg:grid-cols-2 gap-6">
            <div className="relative overflow-hidden bg-zinc-900 rounded-3xl border border-zinc-800 p-8 md:p-10">
              <p className="relative text-xs font-medium uppercase tracking-wide text-[#F23410] mb-4">
                Option 01
              </p>
              <h3 className="orb relative text-lg md:text-xl font-medium uppercase leading-snug mb-4">
                Buy an Imported Car Already Available
              </h3>
              <p className="relative text-sm text-zinc-400 leading-7 mb-6">
                If a suitable vehicle is already available through Elite Motor
                Cars, you can review the specific car rather than waiting for
                another vehicle to be sourced from Japan.
              </p>
              <p className="relative text-sm font-medium text-white mb-4">
                This route may suit buyers who:
              </p>
              <ul className="relative space-y-2.5 mb-9">
                {optionOneSuitors.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-sm text-zinc-400"
                  >
                    <Check className="w-4 h-4 text-[#F23410] shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
              <SolidAction href="/available-cars/">
                View Available Imported Cars
              </SolidAction>
            </div>

            <div className="relative overflow-hidden bg-[#F23410] rounded-3xl p-8 md:p-10 text-white">
              <p className="relative text-xs font-medium uppercase tracking-wide text-black/70 mb-4">
                Option 02
              </p>
              <h3 className="orb relative text-lg md:text-xl font-medium uppercase leading-snug mb-4">
                Request a Specific Car from Japan
              </h3>
              <p className="relative text-sm text-orange-50 leading-7 mb-6">
                When the right vehicle is not currently available, tell us what
                you are looking for.
              </p>
              <p className="relative text-sm font-medium text-white mb-4">
                Provide your:
              </p>
              <ul className="relative grid sm:grid-cols-2 gap-x-4 gap-y-2.5 mb-9">
                {optionTwoDetails.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-sm text-orange-50"
                  >
                    <Check className="w-4 h-4 shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href="/contact-us/"
                className="inline-flex items-center gap-2 bg-white text-[#F23410] px-7 py-4 text-xs font-medium uppercase tracking-wide rounded-md transition-all duration-300 hover:bg-black hover:text-white cursor-pointer"
              >
                Request Japanese Vehicle Sourcing
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Current stock — homepage FeaturedCars design */}
      <section className="px-4 sm:px-10 py-10 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold orb text-[#f23410]">
              AVAILABLE JAPANESE STOCK
            </h2>
            <Link href="/available-cars/">
              <button className="bg-[#f23410] text-white px-6 py-3 rounded-lg font-medium hover:scale-98 transition-all duration-300 cursor-pointer orb sm:text-base text-sm w-full sm:w-fit">
                SHOW ALL
              </button>
            </Link>
          </div>

          {featuredCars.length === 0 ? (
            <div className="max-w-2xl mx-auto text-center border border-[#E5E5E5] rounded-2xl p-10">
              <p className="text-zinc-300 text-sm md:text-base leading-7 mb-8">
                Can&apos;t find the Japanese vehicle you want? Tell us the
                model, year, specification and budget and ask our team about
                sourcing options from Japan.
              </p>
              <SolidAction href="/contact-us/">
                Request a Car from Japan
              </SolidAction>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4">
                {featuredCars.map((car) => {
                  const sold = isSoldCar(car);
                  const detailHref = getCarDetailRoute(car.id, sold, car.name);
                  return (
                    <div
                      key={car.id}
                      className="border border-[#E5E5E5] rounded-2xl p-4 mb-4"
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-zinc-900 shrink-0">
                          <img
                            src={optimizeCloudinaryImage(car.images[0], 96)}
                            alt={car.name}
                            width={48}
                            height={48}
                            loading="lazy"
                            decoding="async"
                            className="w-full h-full object-cover object-center"
                          />
                        </div>
                        <div>
                          <h3 className="font-semibold orb text-base sm:text-lg leading-none text-white">
                            {car.name}
                          </h3>
                          <p className="text-sm text-zinc-400">{car.tagline}</p>
                        </div>
                      </div>

                      <div className="relative h-[400px] sm:h-[450px] w-full mb-4 rounded-xl overflow-hidden group bg-zinc-900">
                        <img
                          src={optimizeCloudinaryImage(car.images[0], 720)}
                          alt={car.name}
                          width={720}
                          height={900}
                          loading="lazy"
                          decoding="async"
                          className="w-full h-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105 cursor-pointer"
                        />
                      </div>

                      <div className="bg-black text-white rounded-xl space-y-4">
                        <div className="grid grid-cols-3 gap-4 text-center text-xs sm:text-sm border border-orange-950 rounded-xl py-3 pl-2 pr-1">
                          <div className="flex flex-col items-center gap-1">
                            <Gauge className="w-4 sm:w-5 h-4 sm:h-5" />
                            <span className="text-sm mt-0">
                              {car.specs.mileage}
                            </span>
                          </div>
                          <div className="flex flex-col items-center gap-1">
                            <Cog className="w-4 sm:w-5 h-4 sm:h-5" />
                            <span className="text-sm mt-0">
                              {car.specs.engine}
                            </span>
                          </div>
                          <div className="flex flex-col items-center gap-1">
                            <Settings className="w-4 sm:w-5 h-4 sm:h-5" />
                            <span className="text-sm mt-0">
                              {car.specs.transmission}
                            </span>
                          </div>
                        </div>

                        <p className="text-xl orb font-semibold">
                          {sold ? "SOLD" : "AUD $" + car.price}
                        </p>

                        <Link href={detailHref}>
                          <button className="w-full bg-[#f23410] text-white py-3 rounded-xl font-medium hover:bg-[#d92c0d] orb transition-all duration-300 cursor-pointer sm:text-base text-sm">
                            SEE DETAILS
                          </button>
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="text-center mt-6">
                <LineAction href="/available-cars/">
                  View All Available Imported Cars
                </LineAction>
              </div>
            </>
          )}
        </div>
      </section>

      {/* Categories — bento grid */}
      <section className="bg-black py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionHeader
            eyebrow="What can you find?"
            title="Japanese Cars for Sydney Buyers"
            tone="dark"
            center
          />
          <p className="max-w-3xl mx-auto text-center text-zinc-400 text-sm md:text-base leading-7 mb-12">
            Japanese vehicle sourcing is not limited to one type of buyer.
            Depending on Australian eligibility and actual vehicle availability,
            buyers may investigate vehicles across many categories.
          </p>

          <div className="grid md:grid-cols-6 gap-4">
            {carCategories.map((category, index) => (
              <div
                key={category.title}
                className={
                  "bg-zinc-900 rounded-3xl border border-zinc-800 p-7 hover:-translate-y-1 hover:shadow-lg hover:shadow-[#F23410]/5 transition-all duration-300 " +
                  (index === 0 ? "md:col-span-3" : "md:col-span-3")
                }
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#F23410] text-white mb-5">
                  <category.icon className="w-6 h-6" />
                </span>
                <h3 className="orb text-sm sm:text-base md:text-lg font-medium uppercase leading-snug mb-3">
                  {category.title}
                </h3>
                <p className="text-sm sm:text-base text-zinc-400 leading-6 mb-4">
                  {category.body}
                </p>
                <ul className="space-y-2">
                  {category.checks.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 text-sm text-zinc-400"
                    >
                      <Check className="w-3.5 h-3.5 text-[#F23410] shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div className="bg-[#F23410] rounded-3xl p-7 text-white md:col-span-3 flex flex-col">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/20 mb-5">
                <jdmCategory.icon className="w-6 h-6" />
              </span>
              <h3 className="orb text-sm sm:text-base md:text-lg font-medium uppercase leading-snug mb-3">
                {jdmCategory.title}
              </h3>
              <p className="text-sm sm:text-base text-orange-50 leading-6 mb-4">
                {jdmCategory.body}
              </p>
              <p className="text-sm text-orange-100 leading-5 border-l-2 border-white/50 pl-3 mb-6">
                {jdmCategory.note}
              </p>
              <Link
                href={jdmCategory.href}
                className="mt-auto inline-flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-white border-b-2 border-white/60 pb-1.5 hover:gap-3 transition-all w-fit"
              >
                {jdmCategory.cta}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="bg-zinc-900 rounded-3xl border border-zinc-800 p-7 md:col-span-6 hover:-translate-y-1 hover:shadow-lg hover:shadow-[#F23410]/5 transition-all duration-300">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#F23410] text-white mb-5">
                    <usedCarsCategory.icon className="w-6 h-6" />
                  </span>
                  <h3 className="orb text-sm sm:text-base md:text-lg font-medium uppercase leading-snug mb-3">
                    {usedCarsCategory.title}
                  </h3>
                  <p className="text-sm sm:text-base text-zinc-400 leading-6 mb-6">
                    {usedCarsCategory.body}
                  </p>
                  <LineAction href={usedCarsCategory.href}>
                    {usedCarsCategory.cta}
                  </LineAction>
                </div>
                <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-2.5">
                  {usedCarsCategory.checks.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 text-sm text-zinc-400"
                    >
                      <Check className="w-4 h-4 text-[#F23410] shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How importing works — timeline */}
      <section className="bg-black py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionHeader
            eyebrow="The process"
            title="How Japanese Car Importing Works for Sydney Buyers"
            tone="dark"
            center
          />

          <div className="relative max-w-3xl mx-auto">
            <div className="absolute left-[22px] top-3 bottom-3 w-px bg-zinc-800" />
            <ol className="space-y-10">
              {importSteps.map((step, index) => (
                <li key={step.title} className="relative pl-16">
                  <span className="absolute left-0 top-0 flex h-11 w-11 items-center justify-center rounded-full border border-[#F23410] bg-black text-[#F23410] orb font-black text-sm">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-base md:text-lg font-medium text-white">
                    {step.title}
                  </h3>
                  <p className="text-sm text-zinc-400 leading-6 mt-2">
                    {step.body}
                  </p>
                  {step.link ? (
                    <Link
                      href={step.link.href}
                      className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-[#F23410] border-b border-[#F23410]/50 pb-0.5 mt-3 hover:gap-3 transition-all"
                    >
                      {step.link.label}
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  ) : null}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Local questions */}
      <section className="bg-black py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionHeader
            eyebrow="Local focus"
            title="Japanese Car Imports for Sydney and NSW Buyers"
            tone="dark"
            center
          />
          <p className="max-w-3xl mx-auto text-center text-zinc-400 text-sm md:text-base leading-7 mb-10">
            Elite Motor Cars identifies Sydney, NSW as its location while
            offering vehicle sourcing and Australia-wide delivery support. For a
            Sydney or NSW buyer, the process should therefore answer local
            questions such as:
          </p>

          <div className="grid sm:grid-cols-2 gap-3 max-w-4xl mx-auto">
            {localQuestions.map((question, index) => (
              <div
                key={question}
                className="flex items-center gap-4 rounded-2xl border border-zinc-800 bg-zinc-900/80 p-6 backdrop-blur transition-colors duration-300 hover:border-[#F23410]/50"
              >
                <span className="orb flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#F23410]/10 text-[#F23410] font-black text-sm">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="text-sm text-zinc-200 font-medium leading-6">
                  {question}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Import approval and NSW registration */}
      <section className="bg-black py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionHeader
            eyebrow="Know the rules"
            title="Import Approval and NSW Registration"
            tone="dark"
            center
          />

          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            <div className="border border-zinc-800 bg-zinc-950 rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-5">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F23410]/15 text-[#F23410]">
                  <ShieldCheck className="w-5 h-5" />
                </span>
                <h3 className="orb text-sm font-medium uppercase">
                  Federal - Import Approval
                </h3>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start gap-3 text-sm text-zinc-300">
                  <Check className="w-4 h-4 text-[#F23410] shrink-0 mt-0.5" />
                  Before importing a road vehicle into Australia, the
                  appropriate approval must be obtained through the federal Road
                  Vehicle Standards process.
                </li>
                <li className="flex items-start gap-3 text-sm text-zinc-300">
                  <Check className="w-4 h-4 text-[#F23410] shrink-0 mt-0.5" />
                  Approval applications are managed through ROVER.
                </li>
              </ul>
            </div>

            <div className="border border-zinc-800 bg-zinc-950 rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-5">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F23410]/15 text-[#F23410]">
                  <MapPin className="w-5 h-5" />
                </span>
                <h3 className="orb text-sm font-medium uppercase">
                  NSW - Registration
                </h3>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start gap-3 text-sm text-zinc-300">
                  <Check className="w-4 h-4 text-[#F23410] shrink-0 mt-0.5" />
                  Additional state requirements apply in NSW for imported
                  vehicles.
                </li>
                <li className="flex items-start gap-3 text-sm text-zinc-300">
                  <Check className="w-4 h-4 text-[#F23410] shrink-0 mt-0.5" />
                  Compliance evidence and the appropriate import approval are
                  required before registration.
                </li>
                <li className="flex items-start gap-3 text-sm text-zinc-300">
                  <Check className="w-4 h-4 text-[#F23410] shrink-0 mt-0.5" />A
                  vehicle subject to the current Road Vehicle Standards system
                  may require an entry on the Register of Approved Vehicles
                  before registration.
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-6 max-w-5xl mx-auto rounded-2xl border border-amber-500/40 bg-amber-500/5 p-6 flex gap-4">
            <AlertTriangle className="text-amber-400 shrink-0 mt-0.5" />
            <p className="text-sm text-amber-200/90 leading-6">
              Because the exact requirements depend on the vehicle, buyers
              should confirm the pathway before purchase rather than assuming
              that another version of the same model can be imported and
              registered in exactly the same way.
            </p>
          </div>

          <div className="mt-10 text-center">
            <LineAction href="/vehicle-import-approval-australia/">
              Learn About Vehicle Import Approval
            </LineAction>
          </div>
        </div>
      </section>

      {/* Cost */}
      <section className="bg-black py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionHeader
            eyebrow="Budget planning"
            title="How Much Does It Cost to Import a Car from Japan to Sydney?"
            tone="dark"
            center
          />
          <p className="max-w-2xl mx-auto text-center text-zinc-400 text-sm md:text-base leading-7 mb-12">
            There is no single fixed landed price for every Japanese vehicle.
            The total budget can depend on the items listed here.
          </p>

          <div className="max-w-4xl mx-auto overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950">
            <div className="flex items-center justify-between px-8 py-4 border-b border-zinc-800">
              <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">
                Estimated cost factors
              </p>
              <span className="text-xs text-zinc-500">
                {costFactors.length} factors
              </span>
            </div>
            <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-4 px-8 py-6">
              {costFactors.map((factor, index) => (
                <li key={factor} className="flex items-center gap-4">
                  <span className="orb w-4 shrink-0 text-sm md:text-base font-medium text-[#F23410]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="text-sm md:text-base text-zinc-200 leading-6">
                    {factor}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-10 text-center">
            <SolidAction href="/cost-to-import-car-from-japan-to-australia/">
              See the Complete Car Import Cost Guide
            </SolidAction>
          </div>
        </div>
      </section>

      {/* Why inspect */}
      <section className="bg-black py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionHeader
            eyebrow="Inspection matters"
            title="Why Inspect a Japanese Used Car Before Purchase?"
            tone="dark"
            center
          />

          <blockquote className="max-w-3xl mx-auto text-center text-xl md:text-2xl font-medium leading-snug">
            &quot;An attractive auction price or high-quality listing image is{" "}
            <span className="text-[#F23410]">not enough</span> to judge a used
            vehicle.&quot;
          </blockquote>

          <p className="mt-8 max-w-2xl mx-auto text-center text-zinc-400 text-sm md:text-base leading-7">
            Before purchasing, the available evidence should be reviewed across
            multiple areas. Important checks may include:
          </p>

          <div className="max-w-3xl mx-auto grid sm:grid-cols-2 gap-3 mt-10">
            {inspectionChecks.map((item) => (
              <div
                key={item}
                className="flex items-center gap-3 bg-zinc-950 border border-zinc-800 rounded-xl px-5 py-4"
              >
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded bg-[#F23410]/15 text-[#F23410]">
                  <Check className="w-4 h-4" />
                </span>
                <span className="text-sm text-zinc-200">{item}</span>
              </div>
            ))}
          </div>

          <p className="max-w-2xl mx-auto text-center text-zinc-400 text-base leading-6 mt-10">
            The purpose is not simply to determine whether the car looks good.
            The real question is whether the exact vehicle represents a sensible
            purchase once condition, eligibility, compliance and total cost are
            considered together.
          </p>

          <div className="text-center mt-10">
            <SolidAction href="/blogs/used-car-inspection-before-importing-from-japan/">
              Read the Used Car Inspection Checklist
            </SolidAction>
          </div>
        </div>
      </section>

      {/* Why choose — editorial numbered rows */}
      <section className="bg-black py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionHeader
            eyebrow="Working with us"
            title="Why Choose Elite Motor Cars for Japanese Imports in Sydney?"
            tone="dark"
            center
          />

          <div className="max-w-4xl mx-auto divide-y divide-zinc-800 border-t border-zinc-800">
            {whyChoose.map((item, index) => (
              <div
                key={item.title}
                className="flex flex-col md:flex-row md:items-center gap-2 md:gap-8 py-6 hover:bg-zinc-900 hover:px-6 transition-all duration-300"
              >
                <span className="orb text-[#F23410] font-medium text-lg shrink-0">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="orb text-sm md:text-base font-medium uppercase text-white md:w-56 shrink-0">
                  {item.title}
                </h3>
                <p className="text-sm text-zinc-400 leading-6">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison table */}
      <section className="bg-black py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionHeader
            eyebrow="Which route fits?"
            title="Imported Cars Already Available vs Custom Japan Sourcing"
            tone="dark"
            center
          />

          <div className="max-w-4xl mx-auto overflow-x-auto rounded-2xl border border-zinc-800">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-zinc-950 border-b border-zinc-800">
                  <th className="py-4 px-6 text-xs font-medium uppercase tracking-wider text-zinc-400 w-1/3">
                    Consideration
                  </th>
                  <th className="py-4 px-6 text-xs font-medium uppercase tracking-wider text-white">
                    <span className="inline-block border-b-2 border-[#F23410] pb-1">
                      Available Imported Car
                    </span>
                  </th>
                  <th className="py-4 px-6 text-xs font-medium uppercase tracking-wider text-white">
                    Custom Japan Sourcing
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row, index) => (
                  <tr
                    key={row.aspect}
                    className={
                      "border-b border-zinc-900 " +
                      (index % 2 === 0 ? "bg-zinc-950/40" : "bg-black")
                    }
                  >
                    <td className="py-4 px-6 text-sm font-semibold text-white">
                      {row.aspect}
                    </td>
                    <td className="py-4 px-6 text-sm text-zinc-300">
                      {row.available}
                    </td>
                    <td className="py-4 px-6 text-sm text-zinc-300">
                      {row.custom}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-10 text-center space-y-2">
            <Link href={"/browse-cars"} className="text-sm text-zinc-400">
              {" "}
              <span className="text-white font-semibold">
                Browse Available Cars
              </span>
            </Link>
            <p className="text-sm text-zinc-400">
              If nothing suitable matches:{" "}
              <Link
                href="/contact-us/"
                className="inline-flex items-center gap-1.5 text-[#F23410] font-medium uppercase tracking-wide border-b border-[#F23410]/60 pb-0.5 hover:gap-3 transition-all"
              >
                Request a Car from Japan
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* Browse cars we can source — row list */}
      <section className="bg-black py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionHeader
            eyebrow="Sourcing catalogue"
            title="Browse Cars We Can Source from Japan"
            tone="dark"
            center
          />
          <p className="max-w-3xl mx-auto text-center text-zinc-400 text-sm md:text-base leading-7 mb-10">
            Filter by make, model or year to explore vehicles that can be
            sourced from Japan through Elite Motor Cars.
          </p>

          <BrowseCarsGrid cars={carsData.slice(0, 8)} />

          <div className="text-center pt-10">
            <LineAction href="/browse-cars/">Browse Cars We Import</LineAction>
          </div>
        </div>
      </section>

      {/* Eligibility */}
      <section className="bg-[#F23410] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-black/70 text-xs font-medium uppercase tracking-wide">
            Before you buy
          </p>
          <h2 className="orb text-2xl md:text-4xl font-black uppercase text-white leading-tight mt-3">
            Check Cars Eligible for Import to Australia
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-orange-50 text-sm md:text-base leading-7">
            Not every Japanese vehicle or variant is automatically eligible for
            import. Confirm the exact model, variant, build date and applicable
            pathway before purchase.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/list-of-cars/"
              className="inline-flex items-center justify-center gap-2 bg-white text-[#F23410] px-7 py-4 text-xs font-medium uppercase tracking-wide rounded-md transition-all duration-300 hover:bg-black hover:text-white cursor-pointer"
            >
              View Cars Eligible for Import
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="bg-black py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionHeader
            eyebrow="Common questions"
            title="Sydney Japanese Import FAQs"
            tone="dark"
            center
          />
          <AuctionFaqs faqs={sydneyFaqs} variant="dark" />
        </div>
      </section>

      {/* Final conversion */}
      <section className="bg-black py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionHeader
            eyebrow="Get started"
            title="Find Your Japanese Imported Car in Sydney"
            tone="dark"
            center
          />
          <p className="max-w-2xl mx-auto text-center text-zinc-400 text-sm md:text-base leading-7">
            Already know what you want? Tell Elite Motor Cars your make, model,
            year, preferred mileage, specification, budget and delivery
            location. Or browse imported vehicles that are already available.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <SolidAction href="/available-cars/">
              Browse Available Imported Cars
            </SolidAction>
            <SolidAction href="/contact-us/">
              Request a Car from Japan
            </SolidAction>
            <SolidAction href="/browse-cars/">
              Browse Cars We Can Import
            </SolidAction>
          </div>

          <div className="mt-14 grid sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
            <div className="border border-zinc-800 bg-zinc-950 p-6 flex items-center justify-center flex-col">
              <Phone className="w-6 h-6 text-[#F23410] mx-auto mb-3" />
              <a
                href="tel:+61466318074"
                className="text-sm font-semibold text-white hover:text-[#F23410] transition-colors"
              >
                +61 466 318 074
              </a>
            </div>
            <div className="border border-zinc-800 bg-zinc-950 p-6 flex items-center justify-center flex-col">
              <Mail className="w-6 h-6 text-[#F23410] mx-auto mb-3" />
              <a
                href="mailto:sales@elitemotorcars.com.au"
                className="text-sm font-semibold text-white hover:text-[#F23410] transition-colors break-all"
              >
                sales@elitemotorcars.com.au
              </a>
            </div>
            <div className="border border-zinc-800 bg-zinc-950 p-6 flex items-center justify-center flex-col">
              <MapPin className="w-6 h-6 text-[#F23410] mx-auto mb-3" />
              <p className="text-sm font-semibold text-white">
                Sydney, NSW, 2000
              </p>
              <p className="text-xs text-zinc-500 mt-1">
                Dealer Licence: MD100405
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default JapaneseImportCarsSydneyPage;
