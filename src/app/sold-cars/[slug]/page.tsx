import type { Metadata } from "next";
import { notFound } from "next/navigation";

import JsonLd from "@/components/JsonLd";
import CarDetailsContent from "@/app/cars/[id]/CarDetailsContent";
import { allCars } from "@/data/cars";
import { toFrontendCar } from "@/lib/cars";
import { buildBreadcrumbListSchema, buildVehicleSchema } from "@/lib/structuredData";

type Params = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const car = allCars
    .filter((item) => item.price === "SOLD")
    .map((item) =>
      toFrontendCar({
        _id: String(item.id),
        slug: String(item.id),
        name: item.name,
        tagline: item.tagline,
        description: item.description,
        priceAUD: null,
        status: "sold",
        specs: {
          mileageKm: Number(item.specs.mileage.replace(/[^0-9]/g, "")),
          engineDisplacement: item.specs.engine,
          transmission: item.specs.transmission,
          fuelType: item.specs.fuel,
          year: Number(item.specs.year),
          color: item.specs.color,
        },
        highlights: item.highlights,
        images: item.images.map((image) => image.src),
        thumbnailUrl: item.images[0]?.src ?? "",
        tags: [],
        isFeatured: false,
        dealer: item.dealer,
        dealerLocation: item.dealerLocation,
        licenseNumber: item.license,
        sortOrder: item.id,
        createdAt: "",
        updatedAt: "",
      } as any),
    )
    .find((item) => item.id === slug);

  if (!car) {
    return {};
  }

  return {
    title: `${car.name} | Sold Cars`,
    description: car.description,
    alternates: {
      canonical: `/sold-cars/${slug}`,
    },
  };
}

export async function generateStaticParams() {
  return allCars
    .filter((car) => car.price === "SOLD")
    .map((car) => ({
      slug: String(car.id),
    }));
}

export default async function SoldCarPage({ params }: Params) {
  const { slug } = await params;
  const car = allCars
    .filter((item) => item.price === "SOLD")
    .map((item) =>
      toFrontendCar({
        _id: String(item.id),
        slug: String(item.id),
        name: item.name,
        tagline: item.tagline,
        description: item.description,
        priceAUD: null,
        status: "sold",
        specs: {
          mileageKm: Number(item.specs.mileage.replace(/[^0-9]/g, "")),
          engineDisplacement: item.specs.engine,
          transmission: item.specs.transmission,
          fuelType: item.specs.fuel,
          year: Number(item.specs.year),
          color: item.specs.color,
        },
        highlights: item.highlights,
        images: item.images.map((image) => image.src),
        thumbnailUrl: item.images[0]?.src ?? "",
        tags: [],
        isFeatured: false,
        dealer: item.dealer,
        dealerLocation: item.dealerLocation,
        licenseNumber: item.license,
        sortOrder: item.id,
        createdAt: "",
        updatedAt: "",
      } as any),
    )
    .find((item) => item.id === slug);

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
          { name: car.name, path: `/sold-cars/${car.id}` },
        ])}
      />
      <CarDetailsContent id={car.id} initialCarData={car} />
    </>
  );
}
