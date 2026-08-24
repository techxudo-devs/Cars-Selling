"use client";

import Link from "next/link";
import { useEffect, useState, useSyncExternalStore } from "react";

import CarDetailsContent from "@/app/cars/[id]/CarDetailsContent";
import { matchesCarSlug, toFrontendCar } from "@/lib/cars";
import type { BackendCar, CarsResponse, FrontendCar } from "@/types/car";

const API_BASE_URL = (
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000"
).replace(/\/$/, "");

// Matches detail URLs like /available-cars/toyota-supra-abc123/ including the
// trailing slash produced by the trailingSlash export config.
const CAR_DETAIL_PATH_PATTERN = /^\/(available|sold)-cars\/([^/]+)$/;

function extractSlugFromPath(pathname: string): string | null {
  const normalized = pathname.replace(/\/+$/, "");
  const match = CAR_DETAIL_PATH_PATTERN.exec(normalized);
  if (!match) {
    return null;
  }
  return decodeURIComponent(match[2]);
}

function subscribeToLocation() {
  return () => {};
}

function getLocationPathname() {
  return window.location.pathname;
}

function getServerLocationPathname() {
  return "";
}

async function fetchAllCars(): Promise<BackendCar[]> {
  const cars: BackendCar[] = [];
  let page = 1;
  let totalPages = 1;

  while (page <= totalPages && page <= 20) {
    const response = await fetch(
      `${API_BASE_URL}/api/cars?page=${page}&limit=50&sort=sortOrder_asc`,
    );
    if (!response.ok) {
      throw new Error(`Failed to load inventory (${response.status})`);
    }

    const payload: CarsResponse = await response.json();
    cars.push(...payload.data);
    totalPages = payload.pagination?.totalPages ?? 1;
    page += 1;
  }

  return cars;
}

type ResolveResult =
  | { kind: "resolving" }
  | { kind: "car"; car: FrontendCar }
  | { kind: "missing" };

export default function NotFound() {
  const pathname = useSyncExternalStore(
    subscribeToLocation,
    getLocationPathname,
    getServerLocationPathname,
  );
  const slug = extractSlugFromPath(pathname);
  const [resolveState, setResolveState] = useState<ResolveResult>({
    kind: "resolving",
  });

  useEffect(() => {
    if (!slug) {
      return;
    }

    let cancelled = false;

    fetchAllCars()
      .then((cars) => {
        if (cancelled) {
          return;
        }
        const match = cars
          .map(toFrontendCar)
          .find((car) => matchesCarSlug(slug, car));
        setResolveState(match ? { kind: "car", car: match } : { kind: "missing" });
      })
      .catch(() => {
        if (!cancelled) {
          setResolveState({ kind: "missing" });
        }
      });

    return () => {
      cancelled = true;
    };
  }, [slug]);

  // A vehicle URL that was not part of the last static export (e.g. a car
  // added or marked sold in the dashboard after deploy) is recovered here:
  // the host served 404.html, but we can still render the live details page.
  if (slug && resolveState.kind === "resolving") {
    return (
      <div className="min-h-screen bg-black pb-10 px-4 pt-10">
        <div className="container mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 animate-pulse">
          <div className="lg:col-span-7 space-y-4">
            <div className="h-[500px] rounded-2xl border border-[#f23410] bg-zinc-900" />
            <div className="h-64 rounded-2xl border border-[#f23410] bg-zinc-900" />
          </div>
          <div className="lg:col-span-5 space-y-6">
            <div className="h-96 rounded-2xl border border-[#f23410] bg-zinc-900" />
            <div className="h-52 rounded-2xl bg-zinc-900" />
          </div>
        </div>
      </div>
    );
  }

  if (slug && resolveState.kind === "car") {
    return <CarDetailsContent id={resolveState.car.id} initialCarData={resolveState.car} />;
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4 py-20">
      <div className="text-center max-w-md">
        <p className="orb text-7xl sm:text-8xl font-extrabold text-[#f23410]">404</p>
        <h1 className="orb text-xl sm:text-2xl font-bold text-white mt-4">
          Page Not Found
        </h1>
        <p className="text-gray-400 mt-3 text-sm sm:text-base">
          {slug
            ? "We could not find this vehicle — it may have been removed or the listing has changed."
            : "The page you are looking for does not exist or may have been moved."}
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/available-cars/"
            className="bg-[#f23410] hover:bg-[#d92c0d] text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 orb cursor-pointer"
          >
            Browse Available Cars
          </Link>
          <Link
            href="/"
            className="border border-[#f23410]/60 hover:border-[#f23410] text-[#f23410] font-bold py-3 px-6 rounded-lg transition-all duration-300 orb cursor-pointer"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
