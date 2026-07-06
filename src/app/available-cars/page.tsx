import type { Metadata } from "next";
import CarInventoryPage from "@/components/CarInventoryPage";
import JsonLd from "@/components/JsonLd";
import { allCars } from "@/data/cars";
import { buildBreadcrumbListSchema, buildItemListSchema } from "@/lib/structuredData";
import { toFrontendCar } from "@/lib/cars";

export const metadata: Metadata = {
  title: "Available Cars",
  description: "Browse the current available used cars at Elite Motor Cars.",
  alternates: {
    canonical: "/available-cars",
  },
};

export default async function AvailableCarsPage() {
  const initialAvailableCars = allCars
    .filter((car) => car.price !== "SOLD")
    .map((item) =>
      toFrontendCar({
        _id: String(item.id),
        slug: String(item.id),
        name: item.name,
        tagline: item.tagline,
        description: item.description,
        priceAUD: Number(item.price.replace(/,/g, "")),
        status: "available",
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
    );

  return (
    <>
      <JsonLd
        id="available-cars-breadcrumb-schema"
        data={buildBreadcrumbListSchema([
          { name: "Home", path: "/" },
          { name: "Available Cars", path: "/available-cars" },
        ])}
      />
      <JsonLd
        id="available-cars-itemlist-schema"
        data={buildItemListSchema(
          initialAvailableCars.map((car) => ({
            name: car.name,
            path: "/available-cars/" + encodeURIComponent(car.id),
          })),
          "Available Cars",
        )}
      />
      <CarInventoryPage mode="available" initialAvailableCars={initialAvailableCars} />
    </>
  );
}
