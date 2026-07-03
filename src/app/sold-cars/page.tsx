import CarInventoryPage from "@/components/CarInventoryPage";
import JsonLd from "@/components/JsonLd";
import { allCars } from "@/data/cars";
import { buildBreadcrumbListSchema, buildItemListSchema } from "@/lib/structuredData";
import { toFrontendCar } from "@/lib/cars";

export default async function SoldCarsPage() {
  const initialSoldCars = allCars
    .filter((car) => car.price === "SOLD")
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
    );

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
