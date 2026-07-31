import type { Metadata } from "next";
import CarInventoryPage from "@/components/CarInventoryPage";
import JsonLd from "@/components/JsonLd";
import { getSoldCars } from "@/lib/inventory";
import { buildBreadcrumbListSchema, buildItemListSchema } from "@/lib/structuredData";
import { slugifyCarRoute, toFrontendCar } from "@/lib/cars";

export const metadata: Metadata = {
  title: "Recently Imported and Sold Cars | Elite Motor Cars Australia",
  description:
    "View Japanese and premium imported vehicles recently sourced, imported and sold by Elite Motor Cars in Australia.",
  alternates: {
    canonical: "/sold-cars",
  },
};

export default async function SoldCarsPage() {
  const initialSoldCars = (await getSoldCars()).map(toFrontendCar);

  return (
    <>
      <JsonLd
        id="sold-cars-breadcrumb-schema"
        data={buildBreadcrumbListSchema([
          { name: "Home", path: "/" },
          { name: "Sold Cars", path: "/sold-cars" },
        ])}
      />
      <JsonLd
        id="sold-cars-itemlist-schema"
        data={buildItemListSchema(
          initialSoldCars.map((car) => ({
            name: car.name,
            path:
              "/sold-cars/" +
              encodeURIComponent(slugifyCarRoute(car.name, car.id)),
          })),
          "Sold Cars",
        )}
      />
      <CarInventoryPage mode="sold" initialSoldCars={initialSoldCars} />
    </>
  );
}
