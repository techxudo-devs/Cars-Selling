import Link from "next/link";
import { ArrowUpRight, Calendar } from "lucide-react";

export type BrowseCar = {
    name: string;
    dates: string;
    image: string;
    link: string;
};

const getOptimizedUrl = (url: string) => {
    if (url && url.includes("cloudinary.com")) {
        return url.replace("/upload/", "/upload/f_auto,q_auto/");
    }
    return url;
};

const BrowseCarsGrid = ({ cars }: { cars: BrowseCar[] }) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {cars.map((car, index) => (
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
                        <div className="absolute top-0 right-0 bg-[#F23410] text-black font-medium text-[10px] px-3 py-1 uppercase">
                            Available
                        </div>
                    </div>

                    <div className="p-4 md:p-5">
                        <div className="flex items-start justify-between gap-4 mb-4">
                            <h3 className="text-base md:text-lg font-medium leading-tight group-hover:text-[#F23410] transition-colors duration-300">
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
                            <span className="text-[10px] font-medium text-white uppercase tracking-wider bg-[#F23410] px-4 py-2 cursor-pointer hover:bg-[#E01D00] active:bg-[#C21800] transition-all duration-300 rounded-tr-xl">
                                Get Quote
                            </span>
                            <div className="h-1.5 w-1.5 rounded-full bg-zinc-800 group-hover:bg-[#F23410] transition-colors" />
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
};

export default BrowseCarsGrid;
