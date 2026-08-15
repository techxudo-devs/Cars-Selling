import type { Metadata } from "next";

import JapaneseCarAuctionsPage, { auctionFaqs } from "@/components/JapaneseCarAuctionsPage";
import JsonLd from "@/components/JsonLd";
import { getAvailableCars } from "@/lib/inventory";
import { toFrontendCar } from "@/lib/cars";
import {
    buildBreadcrumbListSchema,
    buildFaqPageSchema,
} from "@/lib/structuredData";

export const metadata: Metadata = {
    title: "Japanese Car Auctions Australia | Source Cars from Japan",
    description:
        "Source vehicles through Japanese car auctions with Elite Motor Cars. Tell us the model, specification and budget and get support with auction checks, inspections, bidding, shipping and Australian import requirements.",
    alternates: {
        canonical: "/japanese-car-auctions-australia",
    },
};

export default async function JapaneseCarAuctionsPageRoute() {
    const initialAvailableCars = (await getAvailableCars()).map(toFrontendCar);

    return (
        <>
            <JsonLd
                id="japanese-car-auctions-breadcrumb-schema"
                data={buildBreadcrumbListSchema([
                    { name: "Home", path: "/" },
                    {
                        name: "Japanese Car Auctions Australia",
                        path: "/japanese-car-auctions-australia",
                    },
                ])}
            />
            <JsonLd
                id="japanese-car-auctions-faq-schema"
                data={buildFaqPageSchema(auctionFaqs)}
            />
            <JapaneseCarAuctionsPage initialAvailableCars={initialAvailableCars} />
        </>
    );
}
