import type { Metadata } from "next";
import { notFound } from "next/navigation";

import JsonLd from "@/components/JsonLd";
import CarDetailsContent from "@/app/cars/[id]/CarDetailsContent";
import { getAvailableCars } from "@/lib/inventory";
import { matchesCarSlug, slugifyCarRoute, toFrontendCar } from "@/lib/cars";
import { buildBreadcrumbListSchema, buildVehicleSchema } from "@/lib/structuredData";

type Params = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const car = (await getAvailableCars())
    .map(toFrontendCar)
    .find((item) => matchesCarSlug(slug, item));

  if (!car) {
    return {};
  }

  return {
    title: `${car.name} for Sale in Australia`,
    description: car.description,
    alternates: {
      canonical: `/available-cars/${slugifyCarRoute(car.name, car.id)}`,
    },
  };
}

export async function generateStaticParams() {
  const cars = await getAvailableCars();
  return cars.map((car) => ({
    slug: slugifyCarRoute(car.name, car.slug || car._id),
  }));
}

export default async function AvailableCarPage({ params }: Params) {
  const { slug } = await params;
  const car = (await getAvailableCars())
    .map(toFrontendCar)
    .find((item) => matchesCarSlug(slug, item));

  if (!car) {
    notFound();
  }

  return (
    <>
      <JsonLd id={`vehicle-schema-${car.id}`} data={buildVehicleSchema(car)} />
      <JsonLd
        id={`vehicle-breadcrumb-schema-${car.id}`}
        data={buildBreadcrumbListSchema([
          { name: "Home", path: "/" },
          { name: "Available Cars", path: "/available-cars" },
          { name: car.name, path: `/available-cars/${slugifyCarRoute(car.name, car.id)}` },
        ])}
      />
      <CarDetailsContent id={car.id} initialCarData={car} />
    </>
  );
}
