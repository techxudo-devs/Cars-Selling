import { notFound } from "next/navigation";

import CarDetailsContent from "@/app/cars/[id]/CarDetailsContent";
import { getCars } from "@/lib/api";
import { toFrontendCar } from "@/lib/cars";

type Params = {
  params: Promise<{ slug: string }>;
};

export default async function AvailableCarPage({ params }: Params) {
  const { slug } = await params;
  const response = await getCars("status=available&limit=50&sort=sortOrder_asc");
  const car = response.data.map(toFrontendCar).find((item) => item.id === slug);

  if (!car) {
    notFound();
  }

  return <CarDetailsContent id={car.id} initialCarData={car} />;
}
