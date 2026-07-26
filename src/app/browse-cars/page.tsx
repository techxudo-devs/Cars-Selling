import type { Metadata } from "next";

import BrowseCarsClient from "./BrowseCarsClient";

export const metadata: Metadata = {
  title: "Browse Cars Available to Import from Japan",
  description:
    "Browse cars available to import from Japan through Elite Motor Cars, including Japanese makes, models and specialist vehicles.",
  alternates: {
    canonical: "/browse-cars",
  },
};

export default function Page() {
  return <BrowseCarsClient page={1} />;
}
