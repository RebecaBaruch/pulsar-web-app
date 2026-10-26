export function getSiteUrl(): string {
  const url =
    process.env.NEXT_PUBLIC_SITE_URL?.trim() || "https://soupulsar.com";
  return url.replace(/\/$/, "");
}
