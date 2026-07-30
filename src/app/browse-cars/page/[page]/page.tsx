import type { Metadata } from "next";
import { notFound } from "next/navigation";

import carsData from "../../../../../browse_all_cars.json";
import BrowseCarsClient from "../../BrowseCarsClient";

const PAGE_SIZE = 20;
const totalPages = Math.ceil(carsData.length / PAGE_SIZE);

type Params = {
  params: Promise<{ page: string }>;
};

export function generateStaticParams() {
  return Array.from({ length: Math.max(totalPages - 1, 0) }, (_, index) => ({
    page: String(index + 2),
  }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const page = Number((await params).page);

  return {
    title: `Browse Cars Available to Import from Japan - Page ${page}`,
    description:
      "Browse cars available to import from Japan through Elite Motor Cars, including Japanese makes, models and specialist vehicles.",
    alternates: {
      canonical: `/browse-cars/page/${page}`,
    },
  };
}

export default async function BrowseCarsPaginatedPage({ params }: Params) {
  const page = Number((await params).page);

  if (!Number.isInteger(page) || page < 2 || page > totalPages) {
    notFound();
  }

  return <BrowseCarsClient page={page} />;
}
