"use client";

import Link from "next/link";
import carsData from "../../../browse_all_cars.json";
import BrowseCarsGrid from "@/components/BrowseCarsGrid";

const PAGE_SIZE = 20;

type BrowseCarsClientProps = {
  page?: number;
};

const BrowseCarsClient = ({ page = 1 }: BrowseCarsClientProps) => {
  const totalPages = Math.ceil(carsData.length / PAGE_SIZE);
  const safePage = Math.min(Math.max(page, 1), totalPages);
  const pageStart = (safePage - 1) * PAGE_SIZE;
  const displayedCars = carsData.slice(pageStart, pageStart + PAGE_SIZE);

  return (
    <div className="min-h-screen bg-black text-white py-10 px-4 sm:px-6 md:px-10">
      <div className="max-w-7xl mx-auto text-center mb-16">
        <h1 className="text-3xl sm:text-4xl md:text-6xl font-black leading-none uppercase mb-4 text-[#F23410]">
          Browse Cars Available to Import from Japan
        </h1>
        <p className="max-w-2xl mx-auto text-zinc-400 text-sm md:text-base leading-normal md:leading-6">
          Explore vehicles available to source from Japan with support for
          selection, inspections, shipping, customs and Australian compliance.
        </p>
      </div>

      <BrowseCarsGrid cars={displayedCars} />

      <nav
        aria-label="Browse cars pagination"
        className="max-w-7xl mx-auto flex items-center justify-center gap-4 mt-16"
      >
        {safePage > 1 ? (
          <Link
            rel="prev"
            href={safePage === 2 ? "/browse-cars/" : `/browse-cars/page/${safePage - 1}/`}
            className="px-8 py-3 border border-[#F23410] text-white font-semibold uppercase tracking-wide hover:bg-[#F23410] transition-all duration-300"
          >
            Previous
          </Link>
        ) : null}
        <span className="text-sm text-zinc-400">
          Page {safePage} of {totalPages}
        </span>
        {safePage < totalPages ? (
          <Link
            rel="next"
            href={`/browse-cars/page/${safePage + 1}/`}
            className="px-10 py-3 bg-[#F23410] text-white font-semibold uppercase tracking-wide hover:bg-[#E01D00] transition-all duration-300 hover:scale-105 active:scale-95"
          >
            Next
          </Link>
        ) : null}
      </nav>
    </div>
  );
};

export default BrowseCarsClient;
