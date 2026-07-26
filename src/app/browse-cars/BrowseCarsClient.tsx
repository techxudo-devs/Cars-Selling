"use client";

import Link from "next/link";
import { ArrowUpRight, Calendar } from "lucide-react";
import carsData from "../../../browse_all_cars.json";

const PAGE_SIZE = 20;

type BrowseCarsClientProps = {
  page?: number;
};

const BrowseCarsClient = ({ page = 1 }: BrowseCarsClientProps) => {
  const totalPages = Math.ceil(carsData.length / PAGE_SIZE);
  const safePage = Math.min(Math.max(page, 1), totalPages);
  const pageStart = (safePage - 1) * PAGE_SIZE;
  const displayedCars = carsData.slice(pageStart, pageStart + PAGE_SIZE);

  const getOptimizedUrl = (url: string) => {
    if (url && url.includes("cloudinary.com")) {
      return url.replace("/upload/", "/upload/f_auto,q_auto/");
    }
    return url;
  };

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

      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
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
                alt={`${car.name} available to import to Australia`}
                className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
              />
              <div className="absolute top-0 right-0 bg-[#F23410] text-black font-bold text-[10px] px-3 py-1 uppercase">
                Available
              </div>
            </div>

            <div className="p-4 md:p-5">
              <div className="flex items-start justify-between gap-4 mb-4">
                <h3 className="text-base md:text-lg font-bold leading-tight group-hover:text-[#F23410] transition-colors duration-300">
                  {car.name}
                </h3>
                <ArrowUpRight className="w-5 h-5 text-zinc-600 group-hover:text-[#F23410] transition-all" />
              </div>

              <div className="flex items-center gap-2 text-zinc-500 mb-6">
                <Calendar className="w-4 h-4" />
                <span className="text-xs font-medium uppercase">
                  {car.dates}
                </span>
              </div>

              <div className="w-full h-[1px] bg-zinc-800 group-hover:bg-[#F23410]/30 transition-colors" />

              <div className="mt-4 flex items-center justify-between">
                <span className="text-[10px] font-bold text-white uppercase tracking-wider bg-[#F23410] px-4 py-2 cursor-pointer hover:bg-[#E01D00] active:bg-[#C21800] transition-all duration-300 rounded-tr-xl">
                  Get Quote
                </span>
                <div className="h-1.5 w-1.5 rounded-full bg-zinc-800 group-hover:bg-[#F23410] transition-colors" />
              </div>
            </div>
          </Link>
        ))}
      </div>

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
