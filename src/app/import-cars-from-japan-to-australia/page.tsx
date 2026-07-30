import type { Metadata } from "next";
import SeoLandingPage from "@/components/SeoLandingPage";

export const metadata: Metadata = {
  title: "Import Cars from Japan to Australia",
  description: "Ask Elite Motor Cars to source, inspect and import a specific new or used vehicle from Japan, with support through shipping, customs, compliance and delivery.",
  alternates: { canonical: "/import-cars-from-japan-to-australia" },
};

export default function ImportCarsFromJapanPage() {
  return <SeoLandingPage
    eyebrow="Custom vehicle sourcing"
    title="Import Cars from Japan to Australia"
    introduction="Tell Elite Motor Cars which make, model, specification and budget you need. Our team can discuss suitable Japan sourcing options and the approval, inspection, shipping, customs, compliance and delivery process for the selected vehicle."
    sections={[
      { heading: "Japan Auction and Dealer Search", body: "Searches can be based on your preferred model, year, variant, colour, mileage, condition, features and total budget." },
      { heading: "Vehicle Checks Before Purchase", body: "Available auction information, condition reports, mileage evidence and vehicle identity should be reviewed before a purchase decision." },
      { heading: "Import Approval and Shipping", body: "The correct Australian approval pathway must be confirmed before shipment. Shipping and supporting documentation can then be coordinated." },
      { heading: "Customs, Compliance and Handover", body: "The process may include customs, biosecurity, workshop compliance, registration support and final delivery in Australia." },
    ]}
    primaryCta={{ label: "Request Custom Vehicle Sourcing", href: "/how-we-deliver/" }}
    secondaryCta={{ label: "Read the Import Guide", href: "/blogs/how-to-import-a-car-from-japan-to-australia/" }}
  />;
}
