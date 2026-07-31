import CarInventoryPage from "@/components/CarInventoryPage";
import JsonLd from "@/components/JsonLd";
import { getAvailableCars, getSoldCars } from "@/lib/inventory";
import { buildBreadcrumbListSchema, buildItemListSchema } from "@/lib/structuredData";
import { slugifyCarRoute, toFrontendCar } from "@/lib/cars";
import { isSoldCar } from "@/lib/cars";

export default async function AllCarsPage() {
  const initialAvailableCars = (await getAvailableCars()).map(toFrontendCar);
  const initialSoldCars = (await getSoldCars()).map(toFrontendCar);

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
            path:
              "/" +
              (isSoldCar(car) ? "sold" : "available") +
              "-cars/" +
              encodeURIComponent(slugifyCarRoute(car.name, car.id)),
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
