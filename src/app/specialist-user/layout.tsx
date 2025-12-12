import { redirect } from "next/navigation";
import { getSession } from "@/utils/auth";
import { RoutesUrls } from "@/utils/enum/routes-url";

export default async function SpecialistLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();

  if (!session) redirect(RoutesUrls.USER_TYPE);
  if (session.type !== "specialist") redirect(RoutesUrls.CLIENT_HOME);
  return <>{children}</>;
}
