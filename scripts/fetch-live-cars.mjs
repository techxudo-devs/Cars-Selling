// Fetches the live car inventory from the backend and writes it to
// src/data/live-cars.json so the static export build (Hostinger) can
// generate detail pages for every current car. Exits 0 even on failure,
// keeping the last known snapshot so the build never breaks.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_FILE = path.join(__dirname, "..", "src", "data", "live-cars.json");

const API_BASE_URL = (
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  readEnv("NEXT_PUBLIC_API_BASE_URL") ||
  "https://elite-motors-backend.vercel.app"
).replace(/\/$/, "");

const PAGE_SIZE = 50;
const MAX_PAGES = 20;

function readEnv(key) {
  try {
    const envPath = path.join(__dirname, "..", ".env");
    const content = fs.readFileSync(envPath, "utf-8");
    const match = content.split("\n").find((line) => line.startsWith(key + "="));
    return match ? match.slice(key.length + 1).trim() : null;
  } catch {
    return null;
  }
}

async function fetchAllCars() {
  const cars = [];
  let page = 1;
  let totalPages = 1;

  while (page <= totalPages && page <= MAX_PAGES) {
    const url = `${API_BASE_URL}/api/cars?page=${page}&limit=${PAGE_SIZE}&sort=sortOrder_asc`;
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 45000);

    let response;
    try {
      response = await fetch(url, { signal: controller.signal });
    } finally {
      clearTimeout(timer);
    }

    if (!response.ok) {
      throw new Error(`GET ${url} returned ${response.status}`);
    }

    const payload = await response.json();
    if (!Array.isArray(payload.data)) {
      throw new Error(`Unexpected payload from ${url}`);
    }

    cars.push(...payload.data);
    totalPages = payload.pagination?.totalPages ?? 1;
    page += 1;
  }

  return cars;
}

async function main() {
  try {
    console.log(`[fetch-live-cars] Fetching inventory from ${API_BASE_URL} ...`);
    const cars = await fetchAllCars();
    const grouped = cars.reduce(
      (acc, car) => {
        acc[car.status] = (acc[car.status] ?? 0) + 1;
        return acc;
      },
      {},
    );
    fs.writeFileSync(OUT_FILE, JSON.stringify(cars, null, 2));
    console.log(
      `[fetch-live-cars] Wrote ${cars.length} cars to ${path.relative(process.cwd(), OUT_FILE)} ${JSON.stringify(grouped)}`,
    );
  } catch (error) {
    if (fs.existsSync(OUT_FILE)) {
      const existing = JSON.parse(fs.readFileSync(OUT_FILE, "utf-8"));
      console.warn(
        `[fetch-live-cars] Failed to refresh (${error.message}). Keeping existing snapshot with ${existing.length} cars.`,
      );
    } else {
      console.warn(
        `[fetch-live-cars] Failed to fetch (${error.message}). Build will fall back to bundled car data.`,
      );
    }
  }
}

main();
