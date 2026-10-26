import type { Metadata } from "next";
import LandingPageController from "./controller/index.controller";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Cuidado integral em saúde mental e bem-estar",
  path: "/",
});

export default LandingPageController;
