import { Suspense } from "react";
import type { Metadata } from "next";
import CarDetailsByQuery from "./CarDetailsByQuery";

// Legacy query-string route. Production redirects it in .htaccess; noindex is
// a fallback for hosts that do not apply the Apache redirect rules.
export const metadata: Metadata = {
  robots: { index: false, follow: true },
};

export default function CarDetailsStaticPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-black px-4 py-16 text-white">Loading vehicle...</div>}>
      <CarDetailsByQuery />
    </Suspense>
  );
}
