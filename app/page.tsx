import { getUser } from "@/lib/auth";
import LandingPageClient from "@/components/LandingPageClient";

export default async function Page() {
  const user = await getUser();
  return <LandingPageClient user={user} />;
}
