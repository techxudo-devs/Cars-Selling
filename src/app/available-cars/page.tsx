import CarInventoryPage from "@/components/CarInventoryPage";
import JsonLd from "@/components/JsonLd";
import { buildBreadcrumbListSchema, buildItemListSchema } from "@/lib/structuredData";
import { getCars } from "@/lib/api";
import { toFrontendCar } from "@/lib/cars";

export default async function AvailableCarsPage() {
  const response = await getCars("status=available&limit=50&sort=sortOrder_asc");
  const initialAvailableCars = response.data.map(toFrontendCar);

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
