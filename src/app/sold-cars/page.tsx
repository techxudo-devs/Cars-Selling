import CarInventoryPage from "@/components/CarInventoryPage";
import JsonLd from "@/components/JsonLd";
import { buildBreadcrumbListSchema, buildItemListSchema } from "@/lib/structuredData";
import { getCars } from "@/lib/api";
import { toFrontendCar } from "@/lib/cars";

export default async function SoldCarsPage() {
  const response = await getCars("status=sold&limit=50&sort=sortOrder_asc");
  const initialSoldCars = response.data.map(toFrontendCar);

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
            path: "/sold-cars/" + encodeURIComponent(car.id),
          })),
          "Sold Cars",
        )}
      />
      <CarInventoryPage mode="sold" initialSoldCars={initialSoldCars} />
    </>
  );
}
