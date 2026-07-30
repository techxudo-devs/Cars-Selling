import type { Metadata } from "next";

import Contact from "@/components/Contact";

export const metadata: Metadata = {
  title: "Contact Elite Motor Cars Australia",
  description:
    "Contact Elite Motor Cars about an available imported vehicle or request help sourcing a specific new or used car from Japan.",
  alternates: {
    canonical: "/contact-us",
  },
};

export default function ContactUsPage() {
  return (
    <main>
      <section className="bg-black px-4 pb-2 pt-12 text-center text-white">
        <h1 className="orb text-3xl font-extrabold uppercase text-[#f23410] md:text-5xl">
          Contact Elite Motor Cars
        </h1>
        <p className="mx-auto mt-4 max-w-3xl leading-7 text-gray-300">
          Ask about an imported vehicle currently available in Australia or
          tell our team which make, model, specification and budget you want
          sourced from Japan.
        </p>
      </section>
      <Contact />
    </main>
  );
}
