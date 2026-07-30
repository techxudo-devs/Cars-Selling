import type { Metadata } from "next";
import SeoLandingPage from "@/components/SeoLandingPage";

export const metadata: Metadata = {
  title: "JDM Imports Australia",
  description: "Explore JDM imports in Australia, including specialist and performance vehicles available for sale or sourced from Japan.",
  alternates: { canonical: "/jdm-imports-australia" },
};

export default function JdmImportsPage() {
  return <SeoLandingPage
    eyebrow="Japanese Domestic Market vehicles"
    title="JDM Imports Australia"
    introduction="Elite Motor Cars can help Australian buyers explore available JDM vehicles or discuss sourcing an eligible specialist model from Japan. The exact variant, build date, condition and approval pathway must be checked before purchase."
    sections={[
      { heading: "Performance and Specialist Models", body: "JDM searches may focus on rare variants, enthusiast vehicles, performance models and specifications not officially sold in Australia." },
      { heading: "Eligibility Before Purchase", body: "A model appearing on the SEVs Register is not by itself an individual import approval. Confirm the pathway for the exact vehicle." },
      { heading: "Modifications and Condition", body: "Identify accident repairs, track use and non-standard parts because they can affect compliance, insurance, reliability and value." },
      { heading: "Available or Custom Sourced", body: "Browse current imported stock first, or request a Japan search when the required model and specification are not available." },
    ]}
    secondaryCta={{ label: "Read the JDM Guide", href: "/blogs/jdm-imports-australia/" }}
  />;
}
