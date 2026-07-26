import type { MetadataRoute } from "next";

import { allCars } from "@/data/cars";
import { blogs, slugifyBlogSlug } from "@/data/blogs";
import { slugifyCarRoute } from "@/lib/cars";
import browseCars from "../../browse_all_cars.json";

export const dynamic = "force-static";

const siteUrl = "https://elitemotorcars.com.au";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    "/",
    "/available-cars",
    "/sold-cars",
    "/browse-cars",
    "/blogs",
    "/list-of-cars",
    "/faqs",
    "/why-choose-us",
    "/how-we-deliver",
    "/compliance-and-customs-handling-australia",
    "/import-cars-from-japan-to-australia",
    "/japanese-imported-cars-for-sale-australia",
    "/japanese-used-cars-australia",
    "/jdm-imports-australia",
    "/cost-to-import-car-from-japan-to-australia",
  ].map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: path === "/" ? 1 : 0.8,
  }));

  const carRoutes = allCars.map((car) => ({
    url: `${siteUrl}/${car.price === "SOLD" ? "sold-cars" : "available-cars"}/${encodeURIComponent(slugifyCarRoute(car.name, String(car.id)))}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const blogRoutes = blogs.map((blog) => ({
    url: `${siteUrl}/blogs/${encodeURIComponent(slugifyBlogSlug(blog.slug ?? blog.title))}`,
    lastModified: blog.createdAt ? new Date(blog.createdAt) : new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const browsePaginationRoutes = Array.from(
    { length: Math.max(Math.ceil(browseCars.length / 20) - 1, 0) },
    (_, index) => ({
      url: `${siteUrl}/browse-cars/page/${index + 2}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }),
  );

  return [...staticRoutes, ...browsePaginationRoutes, ...carRoutes, ...blogRoutes];
}
