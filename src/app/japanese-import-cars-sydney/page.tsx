import type { Metadata } from "next";

import JapaneseImportCarsSydneyPage from "@/components/JapaneseImportCarsSydneyPage";
import JsonLd from "@/components/JsonLd";
import { getAvailableCars } from "@/lib/inventory";
import { toFrontendCar } from "@/lib/cars";
import { buildBreadcrumbListSchema } from "@/lib/structuredData";

export const metadata: Metadata = {
    title: "Japanese Import Cars Sydney",
    description:
        "Browse Japanese imported cars in Sydney or request a specific vehicle from Japan. Elite Motor Cars assists with sourcing, inspections, shipping, compliance guidance and delivery across Australia.",
    alternates: {
        canonical: "/japanese-import-cars-sydney",
    },
};

export default async function JapaneseImportCarsSydneyRoute() {
    const initialAvailableCars = (await getAvailableCars()).map(toFrontendCar);

    return (
        <>
            <JsonLd
                id="japanese-import-cars-sydney-breadcrumb-schema"
                data={buildBreadcrumbListSchema([
                    { name: "Home", path: "/" },
                    {
                        name: "Japanese Import Cars Sydney",
                        path: "/japanese-import-cars-sydney",
                    },
                ])}
            />
            <JapaneseImportCarsSydneyPage
                initialAvailableCars={initialAvailableCars}
            />
        </>
    );
}
