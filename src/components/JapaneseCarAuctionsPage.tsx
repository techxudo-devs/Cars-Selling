import Image from "next/image";
import Link from "next/link";
import {
    ArrowRight,
    BadgeCheck,
    Calendar,
    CheckCircle,
    ClipboardCheck,
    FileSearch,
    Handshake,
    MapPin,
    Phone,
    Ship,
    ShieldCheck,
} from "lucide-react";

import heroCarMain2 from "@/assets/blog18.png";
import type { FrontendCar } from "@/types/car";
import { slugifyCarRoute } from "@/lib/cars";
import AuctionSearchForm from "@/components/AuctionSearchForm";
import AuctionFaqs from "@/components/AuctionFaqs";
import carsData from "../../browse_all_cars.json";

export const auctionFaqs = [
    {
        question: "What is a Japanese car auction?",
        answer:
            "Japanese car auctions are organised sales where used and near-new vehicles are offered to licensed buyers across Japan. Vehicles are listed with auction information including mileage, condition grades, equipment and any noted damage. Dealers such as Elite Motor Cars can search these auctions and bid on suitable vehicles on your behalf.",
    },
    {
        question: "Can I buy a car from a Japanese auction?",
        answer:
            "Japanese car auctions generally require buyers to be registered with an auction house. Elite Motor Cars can search auction listings for you, review the auction information and bid on a suitable vehicle as part of a structured sourcing process.",
    },
    {
        question: "How do Japanese car auctions work?",
        answer:
            "Vehicles are listed at auction with an auction sheet summarising condition, mileage, grade and history. After reviewing the information and completing any inspection, a registered buyer places a bid before or during the auction. When a bid is successful, payment, export documentation and shipping are coordinated.",
    },
    {
        question: "Do I need to attend a Japanese car auction in person?",
        answer:
            "No. Auctions are generally accessed through registered buyers and auction houses in Japan. Elite Motor Cars can coordinate the search, review and bidding on your behalf from Australia.",
    },
    {
        question: "What is a Japanese car auction sheet?",
        answer:
            "An auction sheet is a document issued for a vehicle listed at auction. It records details such as the auction date, registration information, mileage, condition grade, previous damage, repair history, equipment and an overall condition score. It is a summary and should be considered alongside a physical inspection.",
    },
    {
        question: "What do the grades on a Japanese auction sheet mean?",
        answer:
            "Grades such as R, S, 4.5, 4, 3.5 and 3 indicate the recorded overall condition of a vehicle, from near-new to average. Grade ratings can vary between auction houses, so auction information should be reviewed on a per-vehicle basis.",
    },
    {
        question: "Are cars at Japanese auctions in good condition?",
        answer:
            "Condition varies between vehicles. Auction sheets and inspection reports help identify the recorded condition of each vehicle. Elite Motor Cars reviews auction information and can arrange a physical inspection before any purchase decision.",
    },
    {
        question: "Can I get a vehicle inspected before bidding?",
        answer:
            "Yes. Elite Motor Cars can arrange a physical inspection of a shortlisted vehicle in Japan before bidding, helping to confirm the condition reported on the auction sheet.",
    },
    {
        question:
            "How much does it cost to import a car from a Japanese auction to Australia?",
        answer:
            "The total cost includes the bid price, auction fees, export handling, shipping, customs duty, GST, Australian compliance and delivery. Elite Motor Cars can provide a breakdown of the expected costs for the vehicle you want to source.",
    },
    {
        question: "Can you import a car from a Japanese auction for me?",
        answer:
            "Yes. Elite Motor Cars can search Japanese auctions, review auction information, arrange inspections, bid on your behalf and support the import and compliance process for a suitable vehicle.",
    },
    {
        question:
            "How long does it take to import a car from a Japanese auction to Australia?",
        answer:
            "Timeframes depend on vehicle selection, auction availability, shipping schedules and Australian compliance requirements. Elite Motor Cars can provide an estimated timeline once a suitable vehicle has been identified.",
    },
    {
        question: "What import rules apply to cars from Japanese auctions?",
        answer:
            "Australian import rules require the correct approval pathway to be confirmed before shipment. This includes vehicle eligibility, import approval, customs clearance, biosecurity and compliance. Elite Motor Cars can help confirm the requirements for a specific vehicle.",
    },
    {
        question:
            "Can you help me source a specific vehicle from a Japanese auction?",
        answer:
            "Yes. Tell Elite Motor Cars the make, model, year, specification and budget you are looking for. The team can search Japanese auctions and shortlist suitable vehicles for you.",
    },
];

const trustBar = [
    "Japan Vehicle Search",
    "Original Auction Information",
    "Vehicle Inspection",
    "Bidding Support",
    "Import & Compliance Support",
    "Australia-Wide Delivery",
];

const whyUseAuction = [
    "A wider range of vehicle models",
    "Access to specific models",
    "Clear condition information",
    "Fair market pricing",
    "Comprehensive inspection",
    "A professional import pathway",
];

const sourcingSteps = [
    { title: "Tell Us What You Want" },
    { title: "Vehicle Search in Japan" },
    { title: "Auction Information and History Review" },
    { title: "Physical Vehicle Inspection" },
    { title: "Auction Registration and Bidding" },
    { title: "Payment and Export Documentation" },
    { title: "Shipping from Japan" },
    { title: "Customs Clearance in Australia" },
    { title: "Australian Compliance" },
    { title: "Vehicle Registration" },
    { title: "Registration and Delivery" },
];

const auctionSheetDetails = [
    {
        term: "Auction sheet date",
        description: "The date the auction sheet was prepared for the vehicle listing.",
    },
    {
        term: "Auction house and registration details",
        description: "The auction house holding the sale and the vehicle information.",
    },
    {
        term: "Vehicle grade",
        description: "A condition grade assigned to the vehicle.",
    },
    {
        term: "Mileage",
        description: "The recorded odometer reading at the time of listing.",
    },
    {
        term: "Inspection marks",
        description: "Symbols noting specific areas of the vehicle.",
    },
    {
        term: "Previous damage",
        description: "Any recorded previous damage or repairs.",
    },
    {
        term: "Repair history",
        description: "Recorded repairs completed before the listing.",
    },
    {
        term: "Equipment and options",
        description: "Factory and aftermarket equipment fitted to the vehicle.",
    },
    {
        term: "Auction records",
        description: "Previous auction appearances and outcomes.",
    },
    {
        term: "Overall condition code",
        description: "A summary score used to indicate overall condition.",
    },
];

const comparisonRows = [
    { aspect: "Overall condition", auctionSheet: "Recorded grade and condition codes", inspection: "Visual assessment of the actual vehicle" },
    { aspect: "Engine and transmission", auctionSheet: "Rarely detailed in depth", inspection: "Operation and general condition reviewed" },
    { aspect: "Suspension", auctionSheet: "Limited information", inspection: "Components and condition reviewed" },
    { aspect: "Electronics", auctionSheet: "Limited information", inspection: "Systems checked where possible" },
    { aspect: "Interior condition", auctionSheet: "Summary noted", inspection: "Wear, damage and condition assessed" },
    { aspect: "Structural condition", auctionSheet: "Damage marks noted", inspection: "Inspected for previous repairs and corrosion" },
    { aspect: "Panel gaps", auctionSheet: "Generally not recorded", inspection: "Alignment and fit reviewed" },
    { aspect: "Full history", auctionSheet: "Limited to auction records", inspection: "Service and repair records reviewed where available" },
    { aspect: "Vehicle identification", auctionSheet: "Registration and frame details listed", inspection: "VIN and details confirmed against the vehicle" },
];

const auctionGrades = [
    { grade: "R", description: "Exceptionally clean, near-new condition", note: "Rare" },
    { grade: "S", description: "Outstanding condition, very close to new" },
    { grade: "4.5", description: "Excellent overall condition with very light wear" },
    { grade: "4", description: "Good overall condition with light wear" },
    { grade: "3.5", description: "Above-average condition for age and mileage" },
    { grade: "3", description: "Average condition for age and mileage" },
];

const verificationChecks = [
    {
        title: "Check the vehicle's identity",
        description: "Confirm the registration details and frame number on the auction sheet against the vehicle being listed.",
    },
    {
        title: "Confirm the reported mileage",
        description: "Review the recorded odometer reading and supporting documentation for consistency.",
    },
    {
        title: "Review the repair history",
        description: "Consider any previous damage, repairs and auction records noted on the sheet.",
    },
    {
        title: "Assess the overall condition",
        description: "Use the grade and condition codes as a starting point, and arrange a physical inspection to confirm the details.",
    },
];

const beforeBiddingChecks = [
    {
        title: "Vehicle identity and eligibility",
        description: "Confirm the vehicle's identity, auction history and Australian import eligibility before bidding.",
    },
    {
        title: "Vehicle history and condition",
        description: "Review the auction sheet, prior auction records, mileage evidence and any noted repairs or damage.",
    },
    {
        title: "Total landed cost",
        description: "Consider the bid price plus shipping, customs, import duty, GST, compliance and delivery costs.",
    },
    {
        title: "Australian compliance requirements",
        description: "Verify the vehicle can be complied and registered under the applicable Australian import pathway.",
    },
];

const pricingAreas = [
    {
        title: "Japan Sourcing",
        description: "Auction price, auction fees and export handling in Japan.",
    },
    {
        title: "Shipping and Import",
        description: "Freight, customs duty, GST and import-related costs.",
    },
    {
        title: "Compliance and Registration",
        description: "Australian compliance work and registration support where applicable.",
    },
];

const whyEliteMotorCars = [
    {
        title: "Japanese Vehicle Auctions",
        description: "Access to the Japanese auction network for sourcing specific vehicles.",
    },
    {
        title: "Vehicle Inspections",
        description: "Auction information review and physical inspections before bidding.",
    },
    {
        title: "Auction Bidding Support",
        description: "Assistance with bidding and the auction process in Japan.",
    },
    {
        title: "Import and Compliance Handling",
        description: "Support through shipping, customs and Australian compliance.",
    },
    {
        title: "Transparent Pricing",
        description: "A clear breakdown of expected sourcing and import costs.",
    },
    {
        title: "Australia-Wide Delivery",
        description: "Delivery of the complied vehicle to buyers across Australia.",
    },
    {
        title: "Ongoing Support",
        description: "Help at every stage, from the initial search to final handover.",
    },
];

const japaneseCarsLinks = [
    {
        eyebrow: "Japanese Used Cars",
        title: "Browse Japanese Used Cars",
        body: "Buy an already-imported vehicle that is available in Australia with local inspection and a clearer idea of the final price.",
        cta: "Browse Japanese Used Cars",
        href: "/japanese-used-cars-australia/",
    },
    {
        eyebrow: "JDM Auction Sourcing",
        title: "Source a JDM Vehicle",
        body: "Use Japan's auction network to find a specific Japanese Domestic Market vehicle, with support through inspection and import.",
        cta: "Source a JDM Vehicle",
        href: "/import-cars-from-japan-to-australia/",
    },
];

const SectionHeading = ({
    eyebrow,
    title,
    body,
}: {
    eyebrow?: string;
    title: string;
    body?: string;
}) => (
    <div className="max-w-3xl mx-auto text-center mb-10 md:mb-10">
        {eyebrow ? (
            <p className="text-[#F23410] text-xs font-medium uppercase tracking-wide mb-3">
                {eyebrow}
            </p>
        ) : null}
        <h2 className="orb text-2xl sm:text-3xl md:text-4xl font-extrabold uppercase leading-tight mb-4">
            {title}
        </h2>
        {body ? (
            <p className="text-zinc-400 text-sm md:text-base leading-6">{body}</p>
        ) : null}
    </div>
);

const CtaButton = ({
    href,
    children,
    variant = "solid",
}: {
    href: string;
    children: React.ReactNode;
    variant?: "solid" | "outline";
}) => (
    <Link
        href={href}
        className={
            variant === "solid"
                ? "group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#F23410] to-[#ff6c3f] px-8 py-3.5 text-sm font-semibold uppercase tracking-wide text-white shadow-lg shadow-[#F23410]/30 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#F23410]/25 active:translate-y-0 active:scale-95"
                : "group inline-flex items-center gap-2 rounded-full border border-[#F23410]/70 px-8 py-3.5 text-sm font-semibold uppercase tracking-wide text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#F23410] hover:shadow-lg hover:shadow-[#F23410]/30 active:translate-y-0 active:scale-95"
        }
    >
        {children}
        <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
    </Link>
);

const getOptimizedUrl = (url: string) => {
    if (url && url.includes("cloudinary.com")) {
        return url.replace("/upload/", "/upload/f_auto,q_auto/");
    }
    return url;
};

const JapaneseCarAuctionsPage = ({
    initialAvailableCars,
}: {
    initialAvailableCars: FrontendCar[];
}) => {
    const displayedCars = carsData.slice(0, 8);
    const featuredAvailableCars = initialAvailableCars.slice(0, 6);

    return (
        <div className="bg-black text-white">
            {/* Hero */}
            <section className="relative overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <Image
                        src={heroCarMain2}
                        alt="Japanese car auctions Australia vehicle sourcing"
                        fill
                        priority
                        className="object-cover opacity-40"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black" />
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-20 md:py-20 text-center">
                    <p className="text-[#F23410] text-xs font-medium uppercase tracking-wide mb-4">
                        Japan Vehicle Sourcing
                    </p>
                    <h1 className="orb text-3xl sm:text-5xl md:text-6xl font-black uppercase leading-tight mb-5">
                        Japanese Car Auctions Australia
                    </h1>
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-5">
                        Source Your Next Car Through Japanese Vehicle Auctions
                    </h2>
                    <p className="max-w-3xl mx-auto text-zinc-300 text-sm md:text-base leading-7 mb-10">
                        Japanese car auctions provide access to a wide range of
                        vehicles from Japan, from family cars and hybrids to
                        luxury sedans and specialist JDM models. Elite Motor
                        Cars can search auctions, review auction information and
                        support you through inspection, bidding, shipping,
                        customs and Australian compliance.
                    </p>

                    <div className="flex flex-wrap items-center justify-center gap-4 mb-14">
                        <CtaButton href="/contact-us/">
                            Request an Auction Vehicle
                        </CtaButton>
                        <CtaButton href="/browse-cars/" variant="outline">
                            Browse Cars We Can Import
                        </CtaButton>
                        <CtaButton href="/available-cars/" variant="outline">
                            Browse Available Imported Cars
                        </CtaButton>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                        {trustBar.map((item) => (
                            <div
                                key={item}
                                className="flex items-center justify-center gap-2 bg-white/5 border border-white/10 px-3 py-3 text-left"
                            >
                                <BadgeCheck className="w-4 h-4 text-[#F23410] shrink-0" />
                                <span className="text-[11px] font-semibold uppercase leading-tight">
                                    {item}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why use Japanese car auctions */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 py-10 md:py-10">
                <SectionHeading
                    eyebrow="Why use Japanese vehicle auctions"
                    title="Why Use Japanese Car Auctions?"
                    body="Japanese vehicle auctions connect buyers with a large, organised market of used and near-new cars. For the right vehicle, an auction-based search can be a practical way to find exactly what you are looking for."
                />

                <ul className="max-w-3xl mx-auto grid sm:grid-cols-2 gap-4 mb-12">
                    {whyUseAuction.map((item) => (
                        <li
                            key={item}
                            className="flex items-start gap-3 border border-zinc-800 bg-zinc-950 px-5 py-4"
                        >
                            <CheckCircle className="w-5 h-5 text-[#F23410] shrink-0 mt-0.5" />
                            <span className="text-sm md:text-base text-zinc-200">
                                {item}
                            </span>
                        </li>
                    ))}
                </ul>

                <div className="text-center">
                    <CtaButton href="/contact-us/">
                        Search for a Vehicle on Japan&apos;s Auction Network
                    </CtaButton>
                </div>
            </section>

            {/* Buy available stock or search auctions */}
            <section className="border-y border-zinc-900 bg-zinc-950/40">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 md:py-10">
                    <SectionHeading
                        eyebrow="Two ways to buy"
                        title="Buy Available Stock or Search Japanese Auctions"
                        body="There are two main ways to buy a Japanese vehicle with Elite Motor Cars. Choose the option that best matches your timing and requirements."
                    />

                    <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
                        <div className="border border-zinc-800 bg-zinc-950 p-8">
                            <h3 className="orb text-lg md:text-xl font-bold uppercase text-[#F23410] mb-3">
                                Buy an Already-Imported Car
                            </h3>
                            <p className="text-zinc-400 text-sm leading-7 mb-8">
                                Vehicles already in Australia can be inspected
                                locally and purchased without waiting for a
                                shipment. This is a faster route when current
                                stock matches your needs.
                            </p>
                            <CtaButton href="/available-cars/">
                                Browse Available Cars
                            </CtaButton>
                        </div>
                        <div className="border border-zinc-800 bg-zinc-950 p-8">
                            <h3 className="orb text-lg md:text-xl font-bold uppercase text-[#F23410] mb-3">
                                Search Japanese Auctions for a Specific Car
                            </h3>
                            <p className="text-zinc-400 text-sm leading-7 mb-8">
                                If you need a particular model, year, variant or
                                specification, a custom auction search can target
                                exactly what you are looking for, with
                                inspections and import handled end to end.
                            </p>
                            <CtaButton href="/contact-us/">
                                Request an Auction Vehicle
                            </CtaButton>
                        </div>
                    </div>
                </div>
            </section>

            {/* 11 step process */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 py-10 md:py-10">
                <SectionHeading
                    eyebrow="How it works"
                    title="Sourcing a Car Through Japanese Auctions"
                    body="The process of sourcing a vehicle from a Japanese auction can be managed for you from start to finish."
                />

                <ol className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
                    {sourcingSteps.map((step, index) => (
                        <li
                            key={step.title}
                            className="flex items-start gap-4 border border-zinc-800 bg-zinc-950 px-5 py-5"
                        >
                            <span className="orb text-3xl font-black text-[#F23410] leading-none shrink-0">
                                {index + 1}
                            </span>
                            <span className="text-sm md:text-base font-semibold text-zinc-100 pt-1">
                                {step.title}
                            </span>
                        </li>
                    ))}
                </ol>

                <div className="text-center">
                    <CtaButton href="/contact-us/">
                        Start Your Japan Vehicle Search
                    </CtaButton>
                </div>
            </section>

            {/* What is an auction sheet */}
            <section className="border-y border-zinc-900 bg-zinc-950/40">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 md:py-10">
                    <SectionHeading
                        title="What Is a Japanese Car Auction Sheet?"
                        body="A Japanese car auction sheet is a printed record prepared for a vehicle listed at auction. It summarises the key details a buyer needs to review, including the vehicle's identity, condition and history. Auction sheets are produced by each auction house and the format can vary, but most include the following:"
                    />

                    <dl className="max-w-4xl mx-auto grid sm:grid-cols-2 gap-x-8 gap-y-6 mb-12">
                        {auctionSheetDetails.map((item) => (
                            <div key={item.term}>
                                <dt className="flex items-center gap-2 text-sm md:text-base font-bold text-white mb-1">
                                    <FileSearch className="w-4 h-4 text-[#F23410] shrink-0" />
                                    {item.term}
                                </dt>
                                <dd className="text-sm text-zinc-400 leading-6">
                                    {item.description}
                                </dd>
                            </div>
                        ))}
                    </dl>

                    <p className="max-w-4xl mx-auto text-sm md:text-base text-zinc-300 leading-7 border-l-4 border-[#F23410] pl-5">
                        The auction sheet provides a useful overview, but it does
                        not replace a physical inspection. Mechanical condition,
                        electrical systems, interior wear and other details are
                        best confirmed by an inspection of the actual vehicle.
                    </p>
                </div>
            </section>

            {/* Auction sheet vs physical inspection */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 py-10 md:py-10">
                <SectionHeading
                    title="Auction Sheet vs Physical Inspection"
                    body="Auction information and a physical inspection each play a role in understanding a vehicle before you bid."
                />

                <div className="max-w-4xl mx-auto overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-zinc-800">
                                <th className="py-4 pr-4 text-xs font-bold uppercase tracking-wider text-zinc-400 w-1/4">
                                    Aspect
                                </th>
                                <th className="py-4 pr-4 text-xs font-bold uppercase tracking-wider text-[#F23410]">
                                    Auction Sheet
                                </th>
                                <th className="py-4 text-xs font-bold uppercase tracking-wider text-[#F23410]">
                                    Physical Inspection
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {comparisonRows.map((row, index) => (
                                <tr
                                    key={row.aspect}
                                    className={
                                        index % 2 === 0
                                            ? "border-b border-zinc-900 bg-zinc-950"
                                            : "border-b border-zinc-900"
                                    }
                                >
                                    <td className="py-4 pr-4 text-sm font-semibold text-white pl-2">
                                        {row.aspect}
                                    </td>
                                    <td className="py-4 pr-4 text-sm text-zinc-400">
                                        {row.auctionSheet}
                                    </td>
                                    <td className="py-4 text-sm text-zinc-400">
                                        {row.inspection}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <p className="max-w-4xl mx-auto text-center text-sm md:text-base text-zinc-300 leading-7 mt-10">
                    The auction sheet provides a summary. A physical inspection
                    provides the details.
                </p>
            </section>

            {/* Auction grades */}
            <section className="border-y border-zinc-900 bg-zinc-950/40">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 md:py-10">
                    <SectionHeading
                        title="Understanding Japanese Auction Grades"
                        body="Auction houses assign grades to describe the recorded overall condition of each vehicle. The scale can vary between auction houses, but higher grades generally indicate better recorded condition."
                    />

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl mx-auto mb-12">
                        {auctionGrades.map((item) => (
                            <div
                                key={item.grade}
                                className="border border-zinc-800 bg-zinc-950 p-6 text-center"
                            >
                                <p className="orb text-4xl md:text-5xl font-black text-[#F23410] mb-2">
                                    {item.grade}
                                </p>
                                <p className="text-sm text-zinc-200 leading-6">
                                    {item.description}
                                </p>
                                {item.note ? (
                                    <p className="text-[10px] uppercase tracking-wider text-zinc-500 mt-2">
                                        {item.note}
                                    </p>
                                ) : null}
                            </div>
                        ))}
                    </div>

                    <p className="max-w-3xl mx-auto text-center text-sm text-zinc-400 leading-7 mb-12">
                        Grades can vary between auction houses. Always review the
                        auction sheet for a specific vehicle and consider a
                        physical inspection before deciding to bid.
                    </p>

                    <div className="text-center">
                        <CtaButton href="/contact-us/">
                            Search for an Auction Vehicle Today
                        </CtaButton>
                    </div>
                </div>
            </section>

            {/* Auction sheet verification */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 py-10 md:py-10">
                <SectionHeading
                    title="Auction Sheet Verification"
                    body="An auction sheet is a helpful record, but it should be reviewed carefully. Before relying on auction information, our team confirms the key details with you."
                />

                <div className="grid sm:grid-cols-2 gap-4 max-w-4xl mx-auto mb-12">
                    {verificationChecks.map((item) => (
                        <div
                            key={item.title}
                            className="border border-zinc-800 bg-zinc-950 p-6"
                        >
                            <h3 className="flex items-center gap-2 text-sm md:text-base font-bold text-white mb-2">
                                <ClipboardCheck className="w-5 h-5 text-[#F23410] shrink-0" />
                                {item.title}
                            </h3>
                            <p className="text-sm text-zinc-400 leading-6">
                                {item.description}
                            </p>
                        </div>
                    ))}
                </div>

                <div className="text-center">
                    <CtaButton href="/contact-us/">
                        Verify Auction Information Before You Bid
                    </CtaButton>
                </div>
            </section>

            {/* What should be checked before bidding */}
            <section className="border-y border-zinc-900 bg-zinc-950/40">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 md:py-10">
                    <SectionHeading
                        title="What Should Be Checked Before Bidding"
                        body="Bidding on a vehicle at a Japanese auction should follow a careful review of the information available. Here are the main areas to consider."
                    />

                    <div className="grid sm:grid-cols-2 gap-4 max-w-4xl mx-auto mb-12">
                        {beforeBiddingChecks.map((item) => (
                            <div
                                key={item.title}
                                className="border border-zinc-800 bg-zinc-950 p-6"
                            >
                                <h3 className="flex items-center gap-2 text-sm md:text-base font-bold text-white mb-2">
                                    <ShieldCheck className="w-5 h-5 text-[#F23410] shrink-0" />
                                    {item.title}
                                </h3>
                                <p className="text-sm text-zinc-400 leading-6">
                                    {item.description}
                                </p>
                            </div>
                        ))}
                    </div>

                    <div className="text-center">
                        <CtaButton href="/contact-us/">
                            Talk to an Import Specialist
                        </CtaButton>
                    </div>
                </div>
            </section>

            {/* Do not judge only by price */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 py-10 md:py-10">
                <SectionHeading
                    title="Do Not Judge an Auction Vehicle Only by Price"
                    body="A low bid price can seem attractive, but the total cost of a Japanese auction vehicle includes shipping, import charges, compliance and any repairs needed after arrival in Australia."
                />
                <p className="max-w-3xl mx-auto text-center text-sm md:text-base text-zinc-400 leading-7 mb-8">
                    The condition and history of a vehicle matter as much as its
                    price. Two vehicles of the same model and year can be listed
                    with very different conditions, mileage and repair records.
                    Review the auction information, consider a physical
                    inspection and factor the full landed cost into your
                    decision.
                </p>
                <div className="text-center">
                    <CtaButton href="/contact-us/">
                        Request a Japan Vehicle Search
                    </CtaButton>
                </div>
            </section>

            {/* Landed and complied pricing */}
            <section className="border-y border-zinc-900 bg-zinc-950/40">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 md:py-10">
                    <SectionHeading
                        title="Landed and Complied Pricing"
                        body="The final cost of a Japanese auction vehicle is made up of more than the bid price. When you request an auction search, Elite Motor Cars can explain the expected breakdown, including the following areas:"
                    />

                    <div className="grid md:grid-cols-3 gap-4 max-w-5xl mx-auto mb-10">
                        {pricingAreas.map((item) => (
                            <div
                                key={item.title}
                                className="border border-zinc-800 bg-zinc-950 p-6"
                            >
                                <Ship className="w-6 h-6 text-[#F23410] mb-4" />
                                <h3 className="orb text-base font-bold uppercase text-white mb-2">
                                    {item.title}
                                </h3>
                                <p className="text-sm text-zinc-400 leading-6">
                                    {item.description}
                                </p>
                            </div>
                        ))}
                    </div>

                    <p className="max-w-3xl mx-auto text-center text-sm md:text-base text-zinc-300 leading-7">
                        A clear breakdown helps you compare options and decide
                        what fits your budget before any bidding begins.
                    </p>
                </div>
            </section>

            {/* Auction search request form */}
            <section
                id="auction-request-form"
                className="max-w-7xl mx-auto px-4 sm:px-6 py-10 md:py-10"
            >
                <SectionHeading
                    eyebrow="Start your search"
                    title="Tell Us Which Vehicle You Want"
                    body="Complete the form below and the Elite Motor Cars team will search Japanese auctions for a vehicle that matches your requirements. There is no obligation to purchase."
                />
                <AuctionSearchForm />
            </section>

            {/* Browse cars available to source */}
            <section className="border-y border-zinc-900 bg-zinc-950/40">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 md:py-24">
                    <SectionHeading
                        eyebrow="Sourcing catalogue"
                        title="Browse Cars Available to Source"
                        body="Explore a range of models that can be sourced from Japanese vehicle auctions and dealer networks. Select a vehicle or tell us your preferred model for a custom search."
                    />

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
                        {displayedCars.map((car, index) => (
                            <Link
                                key={index}
                                href={`/contact-us?car=${encodeURIComponent(car.name)}`}
                                className="group relative bg-zinc-950 border border-zinc-800 hover:border-[#F23410] transition-colors duration-500 overflow-hidden"
                            >
                                <div className="relative aspect-[16/10] overflow-hidden bg-zinc-900">
                                    <img
                                        loading="lazy"
                                        src={getOptimizedUrl(car.image)}
                                        alt={`${car.name} available to source from Japan`}
                                        className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                                    />
                                    <div className="absolute top-0 right-0 bg-[#F23410] text-black font-bold text-[10px] px-3 py-1 uppercase">
                                        Source
                                    </div>
                                </div>
                                <div className="p-4 md:p-5">
                                    <h3 className="text-sm md:text-base font-bold leading-tight group-hover:text-[#F23410] transition-colors duration-300 mb-3">
                                        {car.name}
                                    </h3>
                                    <div className="flex items-center gap-2 text-zinc-500 mb-4">
                                        <Calendar className="w-4 h-4" />
                                        <span className="text-xs font-medium uppercase">
                                            {car.dates}
                                        </span>
                                    </div>
                                    <div className="w-full h-[1px] bg-zinc-800 group-hover:bg-[#F23410]/30 transition-colors" />
                                    <div className="mt-4 flex items-center justify-between">
                                        <span className="text-[10px] font-bold text-white uppercase tracking-wider bg-[#F23410] px-4 py-2 transition-all duration-300 rounded-tr-xl">
                                            Get Quote
                                        </span>
                                        <div className="h-1.5 w-1.5 rounded-full bg-zinc-800 group-hover:bg-[#F23410] transition-colors" />
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>

                    <div className="text-center">
                        <CtaButton href="/browse-cars/" variant="outline">
                            Browse More Cars We Can Import
                        </CtaButton>
                    </div>
                </div>
            </section>

            {/* Eligibility */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 py-10 md:py-10">
                <SectionHeading
                    title="Check Which Cars May Be Eligible"
                    body="Australian import rules are specific to each vehicle. Eligibility depends on the model, year, specification and condition. Confirm the requirements before bidding on a vehicle."
                />
                <div className="flex flex-wrap items-center justify-center gap-4">
                    <CtaButton href="/vehicle-import-approval-australia/">
                        Check Which Cars May Be Eligible
                    </CtaButton>
                    <CtaButton href="/browse-cars/" variant="outline">
                        Browse Importable Cars
                    </CtaButton>
                </div>
            </section>

            {/* Available imported cars */}
            <section className="border-y border-zinc-900 bg-zinc-950/40">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 md:py-24">
                    <SectionHeading
                        eyebrow="Already in Australia"
                        title="Prefer a Car Already in Australia?"
                        body="If you want to avoid waiting for a shipment, browse vehicles that are already imported, complied and available in Australia."
                    />

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
                        {featuredAvailableCars.map((car) => (
                            <Link
                                key={car.id}
                                href={`/available-cars/${encodeURIComponent(slugifyCarRoute(car.name, car.id))}`}
                                className="group relative bg-zinc-950 border border-zinc-800 hover:border-[#F23410] transition-colors duration-500 overflow-hidden"
                            >
                                <div className="relative aspect-[16/10] overflow-hidden bg-zinc-900">
                                    <img
                                        loading="lazy"
                                        src={getOptimizedUrl(car.images[0] ?? "")}
                                        alt={`${car.name} available imported car in Australia`}
                                        className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                                    />
                                    <div className="absolute top-0 right-0 bg-[#F23410] text-black font-bold text-[10px] px-3 py-1 uppercase">
                                        Available
                                    </div>
                                </div>
                                <div className="p-4 md:p-5">
                                    <h3 className="text-sm md:text-base font-bold leading-tight group-hover:text-[#F23410] transition-colors duration-300 mb-2">
                                        {car.name}
                                    </h3>
                                    <p className="text-xs text-zinc-500 mb-4">
                                        {car.specs.year} -{" "}
                                        {car.specs.transmission}
                                    </p>
                                    <div className="flex items-center justify-between">
                                        <span className="text-lg font-bold text-[#F23410]">
                                            ${car.price}
                                        </span>
                                        <ArrowRight className="w-5 h-5 text-zinc-600 group-hover:text-[#F23410] transition-all" />
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>

                    <div className="text-center">
                        <CtaButton href="/available-cars/" variant="outline">
                            Browse All Available Imported Cars
                        </CtaButton>
                    </div>
                </div>
            </section>

            {/* Japanese used cars links */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 py-10 md:py-10">
                <SectionHeading
                    eyebrow="Keep exploring"
                    title="Japanese Used Cars"
                    body="Continue exploring Japanese vehicles with these additional guides."
                />

                <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                    {japaneseCarsLinks.map((card) => (
                        <div
                            key={card.title}
                            className="border border-zinc-800 bg-zinc-950 p-8 flex flex-col"
                        >
                            <p className="text-[#F23410] text-xs font-bold uppercase tracking-wide mb-3">
                                {card.eyebrow}
                            </p>
                            <h3 className="orb text-lg md:text-xl font-bold uppercase text-white mb-3">
                                {card.title}
                            </h3>
                            <p className="text-sm text-zinc-400 leading-7 mb-8 flex-1">
                                {card.body}
                            </p>
                            <CtaButton href={card.href} variant="outline">
                                {card.cta}
                            </CtaButton>
                        </div>
                    ))}
                </div>
            </section>

            {/* Sydney section */}
            <section className="border-y border-zinc-900 bg-zinc-950/40">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 md:py-10 text-center">
                    <SectionHeading
                        eyebrow="Local support"
                        title="Japanese Car Auctions for Sydney Buyers"
                        body="Elite Motor Cars is based in Sydney and can help local buyers search Japanese auctions, arrange inspections and manage the import process. Buyers across Australia can also request vehicle sourcing support."
                    />
                    <div className="flex flex-wrap items-center justify-center gap-4">
                        <CtaButton href="/contact-us/">
                            Contact Our Sydney Team
                        </CtaButton>
                        <CtaButton href="tel:+61466318074" variant="outline">
                            <Phone className="w-4 h-4" />
                            Call +61 466 318 074
                        </CtaButton>
                    </div>
                    <div className="mt-8">
                        <Link
                            href="/japanese-import-cars-sydney/"
                            className="inline-flex items-center gap-2 text-sm font-semibold text-[#F23410] hover:text-[#ff6c3f] transition-colors"
                        >
                            Browse Japanese import cars Sydney
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Why use Elite Motor Cars */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 py-10 md:py-10">
                <SectionHeading
                    eyebrow="Working with us"
                    title="Why Use Elite Motor Cars"
                    body="Sourcing a vehicle through Japanese auctions is a multi-step process. We support you through each stage with clear communication and local Australian guidance."
                />

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
                    {whyEliteMotorCars.map((item) => (
                        <div
                            key={item.title}
                            className="border border-zinc-800 bg-zinc-950 p-6"
                        >
                            <div className="flex items-center gap-3 mb-3">
                                <Handshake className="w-5 h-5 text-[#F23410] shrink-0" />
                                <h3 className="text-sm md:text-base font-bold text-white">
                                    {item.title}
                                </h3>
                            </div>
                            <p className="text-sm text-zinc-400 leading-6">
                                {item.description}
                            </p>
                        </div>
                    ))}
                    <div className="flex items-center justify-center border border-[#F23410] bg-[#F23410]/10 p-6">
                        <Link
                            href="/contact-us/"
                            className="inline-flex items-center gap-2 text-[#F23410] font-bold uppercase tracking-wide text-sm hover:gap-3 transition-all"
                        >
                            Start Your Search <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* FAQs */}
            <section className="border-y border-zinc-900 bg-zinc-950/40">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 md:py-10">
                    <SectionHeading
                        eyebrow="Common questions"
                        title="Japanese Car Auction FAQs"
                        body="Answers to common questions about sourcing vehicles through Japanese car auctions."
                    />

                    <AuctionFaqs faqs={auctionFaqs} />
                </div>
            </section>

            {/* Final conversion */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 py-10 md:py-10">
                <SectionHeading
                    eyebrow="Get started"
                    title="Start Your Japan Vehicle Search"
                    body="Tell us the make, model, specification and budget you need. Our team will search Japanese auctions and share suitable options with you."
                />

                <div className="text-center mb-12">
                    <CtaButton href="/contact-us/">
                        Request a Vehicle Search
                    </CtaButton>
                </div>

                <div className="max-w-3xl mx-auto grid sm:grid-cols-3 gap-4 text-center">
                    <div className="border border-zinc-800 bg-zinc-950 p-6">
                        <Phone className="w-6 h-6 text-[#F23410] mx-auto mb-3" />
                        <a
                            href="tel:+61466318074"
                            className="text-sm font-semibold text-white hover:text-[#F23410] transition-colors"
                        >
                            +61 466 318 074
                        </a>
                    </div>
                    <div className="border border-zinc-800 bg-zinc-950 p-6">
                        <svg
                            className="w-6 h-6 text-[#F23410] mx-auto mb-3"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                            />
                        </svg>
                        <a
                            href="mailto:sales@elitemotorcars.com.au"
                            className="text-sm font-semibold text-white hover:text-[#F23410] transition-colors break-all"
                        >
                            sales@elitemotorcars.com.au
                        </a>
                    </div>
                    <div className="border border-zinc-800 bg-zinc-950 p-6">
                        <MapPin className="w-6 h-6 text-[#F23410] mx-auto mb-3" />
                        <p className="text-sm font-semibold text-white">
                            Sydney, NSW, 2000
                        </p>
                        <p className="text-xs text-zinc-500 mt-1">
                            Dealer Licence: MD100405
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default JapaneseCarAuctionsPage;
