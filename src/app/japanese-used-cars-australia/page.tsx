import type { Metadata } from "next";
import SeoLandingPage from "@/components/SeoLandingPage";

export const metadata: Metadata = {
  title: "Japanese Used Cars Australia",
  description: "Browse Japanese used cars available in Australia and learn what to check when buying or sourcing a used vehicle from Japan.",
  alternates: { canonical: "/japanese-used-cars-australia" },
};

export default function JapaneseUsedCarsPage() {
  return <SeoLandingPage
    eyebrow="Used vehicles from Japan"
    title="Japanese Used Cars Australia"
    introduction="Japanese used cars can offer Australian buyers access to hybrids, family vehicles, luxury models and specialist variants. Assess every vehicle on its own condition, history, documentation and Australian compliance status."
    sections={[
      { heading: "Condition and History", body: "Review auction information, mileage evidence, service records, previous repairs, corrosion, modifications and mechanical condition." },
      { heading: "Australian Documentation", body: "Confirm the vehicle’s import approval, RAV and compliance position, registration status and transfer requirements." },
      { heading: "Available Cars in Australia", body: "Buying available stock can provide a faster route, local inspection and more certainty about the final purchase price." },
      { heading: "Source a Specific Used Car", body: "Custom sourcing can target a preferred year, variant, colour, mileage, condition and budget when current stock is unsuitable." },
    ]}
  />;
}
