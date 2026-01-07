import { redirect } from "next/navigation";
import HomeController from "./controller/index.controller";
import { getSessionCookie } from "@/auth/services/sessionService";
import { RoutesUrls } from "@/utils/enum/routes-url";

export default async function Page() {
  const session = await getSessionCookie();

  if (!session || !session.user || session.user.role !== "CLIENT") {
    redirect(RoutesUrls.LOGIN);
  }

  return <HomeController />;
}
