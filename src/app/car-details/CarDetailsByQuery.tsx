"use client";

import { useSearchParams } from "next/navigation";
import CarDetailsContent from "@/app/cars/[id]/CarDetailsContent";
import { allCars } from "@/data/cars";
import { toFrontendCar } from "@/lib/cars";
import type { FrontendCar } from "@/types/car";

function findStaticCar(id: string): FrontendCar | undefined {
  const match = allCars.find((item) => String(item.id) === id);
  if (!match) return undefined;

  const isSold = match.price === "SOLD";
  return toFrontendCar({
    _id: String(match.id),
    slug: String(match.id),
    name: match.name,
    tagline: match.tagline,
    description: match.description,
    priceAUD: isSold ? null : Number(match.price.replace(/,/g, "")),
    status: isSold ? "sold" : "available",
    specs: {
      mileageKm: Number(match.specs.mileage.replace(/[^0-9]/g, "")),
      engineDisplacement: match.specs.engine,
      transmission: match.specs.transmission,
      fuelType: match.specs.fuel,
      year: Number(match.specs.year),
      color: match.specs.color,
    },
    highlights: match.highlights,
    images: match.images.map((image) => image.src),
    thumbnailUrl: match.images[0]?.src ?? "",
    tags: [],
    isFeatured: false,
    dealer: match.dealer,
    dealerLocation: match.dealerLocation,
    licenseNumber: match.license,
    sortOrder: match.id,
    createdAt: "",
    updatedAt: "",
  } as any);
}

export default function CarDetailsByQuery() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  if (!id) {
    return (
      <div className="min-h-screen bg-black px-4 py-16 text-center text-white">
        <h1 className="orb text-3xl font-bold text-[#f23410]">Car Not Found</h1>
        <p className="mt-3 text-zinc-400">No vehicle id was provided.</p>
      </div>
    );
  }

  const staticCar = findStaticCar(id);

  return <CarDetailsContent id={id} initialCarData={staticCar} />;
}
