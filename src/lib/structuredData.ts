import type { StaticImageData } from "next/image";

import type { BlogPost } from "@/data/blogs";
import { slugifyBlogSlug } from "@/data/blogs";
import { slugifyCarRoute } from "@/lib/cars";
import type { FrontendCar } from "@/types/car";

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://elitemotorcars.com.au"
).replace(/\/$/, "");

export const BUSINESS_NAME = "Elite Motor Cars";
export const BUSINESS_SCHEMA_NAME = "Elite Motor Cars Australia";
export const BUSINESS_PHONE = "+61 466 318 074";
export const BUSINESS_EMAIL = "sales@elitemotorcars.com.au";
export const BUSINESS_STREET = "";
export const BUSINESS_CITY = "Sydney";
export const BUSINESS_REGION = "NSW";
export const BUSINESS_POSTCODE = "2000";
export const BUSINESS_COUNTRY = "AU";
export const BUSINESS_DEALER_LICENCE = "MD100405";

const businessId = SITE_URL + "/#autodealer";
const organizationId = SITE_URL + "/#organization";
const websiteId = SITE_URL + "/#website";

type BreadcrumbItem = {
  name: string;
  path: string;
};

type ListItem = {
  name: string;
  path: string;
};

function absoluteUrl(path = "/") {
  if (/^https?:\/\//i.test(path)) {
    return path;
  }

  return SITE_URL + (path.startsWith("/") ? path : "/" + path);
}

function imageUrl(image?: string | StaticImageData) {
  if (!image) {
    return undefined;
  }

  if (typeof image === "string") {
    return absoluteUrl(image);
  }

  return absoluteUrl(image.src);
}

function cleanPrice(price: string) {
  const numericPrice = Number(price.replace(/[^\d.]/g, ""));
  return Number.isFinite(numericPrice) && numericPrice > 0 ? numericPrice : undefined;
}

export function buildOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": organizationId,
    name: BUSINESS_SCHEMA_NAME,
    alternateName: BUSINESS_NAME,
    url: SITE_URL,
    email: BUSINESS_EMAIL,
    identifier: BUSINESS_DEALER_LICENCE,
    telephone: BUSINESS_PHONE,
    contactPoint: buildContactPointSchema(),
    address: buildPostalAddressSchema(),
  };
}

export function buildLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "AutoDealer"],
    "@id": businessId,
    name: BUSINESS_SCHEMA_NAME,
    alternateName: BUSINESS_NAME,
    url: SITE_URL,
    telephone: BUSINESS_PHONE,
    email: BUSINESS_EMAIL,
    identifier: BUSINESS_DEALER_LICENCE,
    priceRange: "$$",
    address: buildPostalAddressSchema(),
    openingHoursSpecification: buildOpeningHoursSpecificationSchema(),
    contactPoint: buildContactPointSchema(),
    areaServed: {
      "@type": "Country",
      name: "Australia",
    },
    parentOrganization: {
      "@id": organizationId,
    },
  };
}

export function buildWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": websiteId,
    name: BUSINESS_NAME,
    url: SITE_URL,
    publisher: {
      "@id": organizationId,
    },
  };
}

export function buildContactPointSchema() {
  return {
    "@type": "ContactPoint",
    telephone: BUSINESS_PHONE,
    contactType: "sales",
    email: BUSINESS_EMAIL,
    areaServed: BUSINESS_COUNTRY,
    availableLanguage: ["English"],
  };
}

export function buildPostalAddressSchema() {
  const address: Record<string, string> = {
    "@type": "PostalAddress",
    addressLocality: BUSINESS_CITY,
    addressRegion: BUSINESS_REGION,
    postalCode: BUSINESS_POSTCODE,
    addressCountry: BUSINESS_COUNTRY,
  };

  if (BUSINESS_STREET) {
    address.streetAddress = BUSINESS_STREET;
  }

  return address;
}

export function buildOpeningHoursSpecificationSchema() {
  return [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "09:00",
      closes: "18:00",
    },
  ];
}

export function buildBreadcrumbListSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function buildItemListSchema(items: ListItem[], name: string) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      url: absoluteUrl(item.path),
    })),
  };
}

export function buildFaqPageSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function buildBlogPostingSchema(blog: BlogPost) {
  const url = absoluteUrl(
    "/blogs/" + encodeURIComponent(slugifyBlogSlug(blog.slug ?? blog.title)),
  );

  return {
    "@context": "https://schema.org",
    "@type": ["BlogPosting", "Article"],
    headline: blog.metaTitle || blog.title,
    name: blog.title,
    description: blog.metaDescription || blog.description,
    image: imageUrl(blog.image),
    datePublished: blog.createdAt || blog.postedDate,
    dateModified: blog.createdAt || blog.postedDate,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    author: {
      "@id": organizationId,
    },
    publisher: {
      "@id": organizationId,
    },
  };
}

export function buildVehicleSchema(car: FrontendCar) {
  const sold = car.status === "sold" || car.price === "SOLD";
  const price = cleanPrice(car.price);

  // Google requires a real numeric price for every Product Offer. Sold vehicles
  // no longer have an advertised price, so describe them as vehicles only.
  // This avoids publishing an invalid Offer with its price omitted by JSON.stringify.
  const productTypes = price && !sold
    ? ["Product", "Vehicle", "Car"]
    : ["Vehicle", "Car"];

  return {
    "@context": "https://schema.org",
    "@type": productTypes,
    name: car.name,
    description: car.description,
    image: car.images.map((image) => imageUrl(image)).filter(Boolean),
    brand: car.name.split(" ")[0],
    model: car.name,
    vehicleModelDate: car.specs.year,
    mileageFromOdometer: {
      "@type": "QuantitativeValue",
      value: Number(car.specs.mileage.replace(/[^\d.]/g, "")) || undefined,
      unitCode: "KMT",
    },
    fuelType: car.specs.fuel,
    vehicleTransmission: car.specs.transmission,
    color: car.specs.color,
    ...(price && !sold
      ? {
          offers: {
            "@type": "Offer",
            url: absoluteUrl(
              "/available-cars/" +
                encodeURIComponent(slugifyCarRoute(car.name, car.id)),
            ),
            priceCurrency: "AUD",
            price,
            availability: "https://schema.org/InStock",
            seller: {
              "@id": businessId,
            },
          },
        }
      : {}),
  };
}
