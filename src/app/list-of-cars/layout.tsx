import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cars You Can Import from Japan to Australia",
  description:
    "Review cars that may be eligible to import from Japan to Australia. Confirm the exact model, variant and build date before purchase.",
  alternates: {
    canonical: "/list-of-cars",
  },
};

export default function ListOfCarsLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
