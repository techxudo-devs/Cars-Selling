import fs from "node:fs";
import path from "node:path";

import type { BackendCar } from "@/types/car";
import { allCars, type CarDetails } from "@/data/cars";

const LIVE_CARS_FILE = path.join(process.cwd(), "src", "data", "live-cars.json");

function staticCarToBackendCar(car: CarDetails): BackendCar {
  const sold = car.price === "SOLD";
  return {
    _id: String(car.id),
    slug: String(car.id),
    name: car.name,
    tagline: car.tagline,
    description: car.description,
    priceAUD: sold ? null : Number(car.price.replace(/,/g, "")),
    status: sold ? "sold" : "available",
    specs: {
      mileageKm: Number(car.specs.mileage.replace(/[^0-9]/g, "")),
      engineDisplacement: car.specs.engine,
      transmission: car.specs.transmission,
      fuelType: car.specs.fuel,
      year: Number(car.specs.year),
      color: car.specs.color,
    },
    highlights: car.highlights,
    images: car.images.map((image) => image.src),
    thumbnailUrl: car.images[0]?.src ?? "",
    tags: [],
    isFeatured: false,
    dealer: car.dealer,
    dealerLocation: car.dealerLocation,
    licenseNumber: car.license,
    sortOrder: car.id,
    createdAt: "",
    updatedAt: "",
  };
}

function readLiveCars(): BackendCar[] {
  try {
    const raw = fs.readFileSync(LIVE_CARS_FILE, "utf-8");
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      return parsed as BackendCar[];
    }
  } catch {
    // File missing or malformed — fall through to bundled data.
  }
  return [];
}

let cachedBackendCars: BackendCar[] | null = null;

export async function getInventoryCars(): Promise<BackendCar[]> {
  if (cachedBackendCars) {
    return cachedBackendCars;
  }

  const live = readLiveCars();
  if (live.length > 0) {
    cachedBackendCars = live;
  } else {
    console.warn(
      "[inventory] No live car snapshot found, falling back to bundled car data.",
    );
    cachedBackendCars = allCars.map(staticCarToBackendCar);
  }

  return cachedBackendCars;
}

export async function getAvailableCars(): Promise<BackendCar[]> {
  const cars = await getInventoryCars();
  return cars.filter((car) => car.status === "available");
}

export async function getSoldCars(): Promise<BackendCar[]> {
  const cars = await getInventoryCars();
  return cars.filter((car) => car.status === "sold");
}
