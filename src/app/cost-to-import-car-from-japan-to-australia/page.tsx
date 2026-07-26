import type { Metadata } from "next";
import SeoLandingPage from "@/components/SeoLandingPage";

export const metadata: Metadata = {
  title: "Cost to Import a Car from Japan to Australia",
  description: "Understand the cost areas involved when importing a car from Japan to Australia, from purchase and shipping to taxes, compliance and registration.",
  alternates: { canonical: "/cost-to-import-car-from-japan-to-australia" },
};

export default function ImportCostPage() {
  return <SeoLandingPage
    eyebrow="Vehicle-specific landed cost"
    title="Cost to Import a Car from Japan to Australia"
    introduction="There is no single import price that applies to every vehicle. Calculate the complete landed and registered cost for the exact model rather than comparing only the Japanese auction or dealer price."
    sections={[
      { heading: "Vehicle and Japan-Side Costs", body: "Allow for the purchase price, auction or agent charges, inland transport, export documents and inspections." },
      { heading: "Shipping and Border Costs", body: "Freight, marine insurance, customs processing, applicable duty, GST, possible Luxury Car Tax, port and biosecurity charges may apply." },
      { heading: "Compliance and Registration", body: "Budget for the applicable workshop work, verification, state inspection, registration, insurance and duty." },
      { heading: "Request a Written Estimate", body: "Ask for a vehicle-specific estimate stating what is included, what remains variable and which charges are payable separately." },
    ]}
    primaryCta={{ label: "Discuss a Vehicle and Budget", href: "/how-we-deliver/" }}
    secondaryCta={{ label: "Browse Available Cars", href: "/available-cars/" }}
  />;
}
