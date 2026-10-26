import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/site";
import { RoutesUrls } from "@/utils/enum/routes-url";

const publicPaths: string[] = [
  RoutesUrls.BASE_URL,
  RoutesUrls.FIND_SPECIALIST,
  RoutesUrls.LOGIN,
  RoutesUrls.CLIENT_REGISTER,
];

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();
  const lastModified = new Date();

  return publicPaths.map((path) => ({
    url: path === "/" ? siteUrl : `${siteUrl}${path}`,
    lastModified,
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : 0.7,
  }));
}
