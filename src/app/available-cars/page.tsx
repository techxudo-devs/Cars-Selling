import type { Metadata } from "next";
import CarInventoryPage from "@/components/CarInventoryPage";
import JsonLd from "@/components/JsonLd";
import { getAvailableCars } from "@/lib/inventory";
import { buildBreadcrumbListSchema, buildItemListSchema } from "@/lib/structuredData";
import { slugifyCarRoute, toFrontendCar } from "@/lib/cars";

export const metadata: Metadata = {
  title: "Available Imported Cars in Australia",
  description:
    "Browse available imported and premium used cars from Elite Motor Cars, including Japanese and European vehicles available for Australian buyers.",
  alternates: {
    canonical: "/available-cars",
  },
};

export default async function AvailableCarsPage() {
  const initialAvailableCars = (await getAvailableCars()).map(toFrontendCar);

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
            path:
              "/available-cars/" +
              encodeURIComponent(slugifyCarRoute(car.name, car.id)),
          })),
          "Available Cars",
        )}
      />
      <CarInventoryPage mode="available" initialAvailableCars={initialAvailableCars} />
    </>
  );
}
