import type { MetadataRoute } from "next";

import { allCars } from "@/data/cars";
import { blogs } from "@/data/blogs";

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
  ].map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: path === "/" ? 1 : 0.8,
  }));

  const carRoutes = allCars.map((car) => ({
    url: `${siteUrl}/${car.price === "SOLD" ? "sold-cars" : "available-cars"}/${encodeURIComponent(String(car.id))}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const blogRoutes = blogs.map((blog) => ({
    url: `${siteUrl}/blogs/${encodeURIComponent(blog.slug ?? blog.title)}`,
    lastModified: blog.createdAt ? new Date(blog.createdAt) : new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...carRoutes, ...blogRoutes];
}
