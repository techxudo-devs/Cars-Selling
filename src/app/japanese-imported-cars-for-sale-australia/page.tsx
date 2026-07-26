import type { Metadata } from "next";
import SeoLandingPage from "@/components/SeoLandingPage";

export const metadata: Metadata = {
  title: "Japanese Imported Cars for Sale in Australia",
  description: "Browse Japanese imported cars available for sale in Australia or ask Elite Motor Cars to source a specific vehicle from Japan.",
  alternates: { canonical: "/japanese-imported-cars-for-sale-australia" },
};

export default function JapaneseImportedCarsForSalePage() {
  return <SeoLandingPage
    eyebrow="Imported-car dealer and sourcing specialist"
    title="Japanese Imported Cars for Sale in Australia"
    introduction="Explore Japanese and premium imported vehicles currently available through Elite Motor Cars. If the right model is not in stock, ask our team to discuss sourcing a specific new or used vehicle from Japan."
    sections={[
      { heading: "Available Imported Stock", body: "Browse vehicle pages for current price, availability, year, mileage, engine, transmission, images and condition information." },
      { heading: "Japanese Vehicle Categories", body: "Available and sourced vehicles may include hybrids, family cars, luxury sedans, people movers, SUVs and specialist performance models." },
      { heading: "Buy with Clear Vehicle Information", body: "Confirm the exact vehicle identity, condition, history, compliance position, registration status, warranty terms and final purchase price." },
      { heading: "Can’t Find the Right Car?", body: "Provide your preferred model, year, colour, specification, mileage and budget so the team can discuss a custom Japan search." },
    ]}
    secondaryCta={{ label: "Read the Buyer Guide", href: "/blogs/how-to-buy-a-japanese-imported-car-australia/" }}
  />;
}
