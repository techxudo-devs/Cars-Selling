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

const API_BASE_URL = (
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000"
).replace(/\/$/, "");

async function fetchInventoryFromApi(): Promise<BackendCar[]> {
  const cars: BackendCar[] = [];
  let page = 1;
  let totalPages = 1;

  while (page <= totalPages && page <= 20) {
    const response = await fetch(
      `${API_BASE_URL}/api/cars?page=${page}&limit=50&sort=sortOrder_asc`,
      { cache: "no-store" },
    );
    if (!response.ok) {
      throw new Error(`GET /api/cars returned ${response.status}`);
    }

    const payload = await response.json();
    if (!Array.isArray(payload.data)) {
      throw new Error("Unexpected payload from /api/cars");
    }

    cars.push(...payload.data);
    totalPages = payload.pagination?.totalPages ?? 1;
    page += 1;
  }

  return cars;
}

export async function getInventoryCars(): Promise<BackendCar[]> {
  const isDev = process.env.NODE_ENV === "development";

  // In development always resolve against the live backend so cars added or
  // updated from the dashboard are immediately visible to generateStaticParams
  // and the [slug] pages (otherwise Next.js throws the "missing param" error).
  if (isDev) {
    try {
      const live = await fetchInventoryFromApi();
      if (live.length > 0) {
        return live;
      }
    } catch {
      // Backend unreachable — fall through to snapshot/bundled data.
    }
  } else if (cachedBackendCars) {
    return cachedBackendCars;
  }

  const liveFile = readLiveCars();
  if (liveFile.length > 0) {
    if (!isDev) {
      cachedBackendCars = liveFile;
    }
    return liveFile;
  }

  console.warn(
    "[inventory] No live car snapshot found, falling back to bundled car data.",
  );
  const bundled = allCars.map(staticCarToBackendCar);
  if (!isDev) {
    cachedBackendCars = bundled;
  }
  return bundled;
}

export async function getAvailableCars(): Promise<BackendCar[]> {
  const cars = await getInventoryCars();
  return cars.filter((car) => car.status === "available");
}

export async function getSoldCars(): Promise<BackendCar[]> {
  const cars = await getInventoryCars();
  return cars.filter((car) => car.status === "sold");
}
