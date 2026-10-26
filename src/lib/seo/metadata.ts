import type { Metadata } from "next";
import { getSiteUrl } from "@/lib/site";

const defaultTitle =
  "Pulsar | Cuidado integral em saúde mental e bem-estar";
const defaultDescription =
  "Apoio emocional, físico e financeiro com especialistas qualificados. Agende online com psicólogos e profissionais multidisciplinares na Pulsar.";

export const rootMetadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: defaultTitle,
    template: "%s | Pulsar",
  },
  description: defaultDescription,
  applicationName: "Pulsar",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: "Pulsar",
    title: defaultTitle,
    description: defaultDescription,
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: defaultDescription,
  },
  robots: {
    index: true,
    follow: true,
  },
};

type PageMetadataOptions = {
  title?: string;
  description?: string;
  path?: string;
};

export function createPageMetadata(options: PageMetadataOptions = {}): Metadata {
  const title = options.title;
  const description = options.description ?? defaultDescription;
  const url = options.path ? `${getSiteUrl()}${options.path}` : getSiteUrl();

  return {
    title,
    description,
    alternates: options.path ? { canonical: url } : undefined,
    openGraph: {
      title: title ?? defaultTitle,
      description,
      url,
    },
    twitter: {
      title: title ?? defaultTitle,
      description,
    },
  };
}
