import type { Metadata } from "next";

import BrowseCarsClient from "./BrowseCarsClient";

export const metadata: Metadata = {
  title: "Browse Cars We Can Import to Australia",
  description:
    "Explore the cars Elite Motor Cars can import to Australia, with a searchable catalogue of makes and models.",
  alternates: {
    canonical: "/browse-cars",
  },
};

export default function Page() {
  return <BrowseCarsClient />;
}
