import CarInventoryPage from "@/components/CarInventoryPage";
import JsonLd from "@/components/JsonLd";
import { buildBreadcrumbListSchema, buildItemListSchema } from "@/lib/structuredData";
import { getCars } from "@/lib/api";
import { toFrontendCar } from "@/lib/cars";

export default async function AllCarsPage() {
  const [availableResponse, soldResponse] = await Promise.all([
    getCars("status=available&limit=50&sort=sortOrder_asc"),
    getCars("status=sold&limit=50&sort=sortOrder_asc"),
  ]);
  const initialAvailableCars = availableResponse.data.map(toFrontendCar);
  const initialSoldCars = soldResponse.data.map(toFrontendCar);

  return (
    <>
      <JsonLd
        id="all-cars-breadcrumb-schema"
        data={buildBreadcrumbListSchema([
          { name: "Home", path: "/" },
          { name: "All Cars", path: "/all-cars" },
        ])}
      />
      <JsonLd
        id="all-cars-itemlist-schema"
        data={buildItemListSchema(
          initialAvailableCars.concat(initialSoldCars).map((car) => ({
            name: car.name,
            path: "/" + (car.price === "SOLD" ? "sold" : "available") + "-cars/" + encodeURIComponent(car.id),
          })),
          "All Cars",
        )}
      />
      <CarInventoryPage
        mode="all"
        initialAvailableCars={initialAvailableCars}
        initialSoldCars={initialSoldCars}
      />
    </>
  );
}
