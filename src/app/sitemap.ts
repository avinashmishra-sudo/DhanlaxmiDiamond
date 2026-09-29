import { MetadataRoute } from "next";
import { initialDiamonds } from "@/lib/data/diamonds";
import { initialJewelry } from "@/lib/data/jewelry";
import { initialBlogPosts } from "@/lib/data/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://dhanlaxmidiamond.com";

  // Static routes
  const staticRoutes = [
    "",
    "/about",
    "/natural-diamonds",
    "/lab-grown-diamonds",
    "/diamonds",
    "/jewelry",
    "/collections",
    "/custom-jewelry",
    "/quality",
    "/sustainability",
    "/contact",
    "/request-quote",
    "/blog",
    "/privacy",
    "/terms",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  // Diamond detail pages
  const diamondRoutes = initialDiamonds.map((d) => ({
    url: `${baseUrl}/diamonds/${d.id}`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: 0.9,
  }));

  // Jewelry detail pages
  const jewelryRoutes = initialJewelry.map((j) => ({
    url: `${baseUrl}/jewelry/${j.id}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  // Blog article pages
  const blogRoutes = initialBlogPosts.map((b) => ({
    url: `${baseUrl}/blog/${b.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...diamondRoutes, ...jewelryRoutes, ...blogRoutes];
}
