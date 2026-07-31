import type { Metadata } from "next";
import { notFound } from "next/navigation";

import JsonLd from "@/components/JsonLd";
import CarDetailsContent from "@/app/cars/[id]/CarDetailsContent";
import { getSoldCars } from "@/lib/inventory";
import { slugifyCarRoute, toFrontendCar } from "@/lib/cars";
import { buildBreadcrumbListSchema, buildVehicleSchema } from "@/lib/structuredData";

type Params = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const car = (await getSoldCars())
    .map(toFrontendCar)
    .find(
      (item) =>
        slug === slugifyCarRoute(item.name, item.id) ||
        item.id === slug ||
        slug.endsWith(`-${item.id}`),
    );

  if (!car) {
    return {};
  }

  return {
    title: `${car.name} | Sold Cars`,
    description: car.description,
    alternates: {
      canonical: `/sold-cars/${slugifyCarRoute(car.name, car.id)}`,
    },
  };
}

export async function generateStaticParams() {
  const cars = await getSoldCars();
  return cars.map((car) => ({
    slug: slugifyCarRoute(car.name, car.slug || car._id),
  }));
}

export default async function SoldCarPage({ params }: Params) {
  const { slug } = await params;
  const car = (await getSoldCars())
    .map(toFrontendCar)
    .find(
      (item) =>
        slug === slugifyCarRoute(item.name, item.id) ||
        item.id === slug ||
        slug.endsWith(`-${item.id}`),
    );

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
          { name: "Sold Cars", path: "/sold-cars" },
          { name: car.name, path: `/sold-cars/${slugifyCarRoute(car.name, car.id)}` },
        ])}
      />
      <CarDetailsContent id={car.id} initialCarData={car} />
    </>
  );
}
