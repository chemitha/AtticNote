import { ReactNode } from "react";
import { getUser } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function RegisterLayout({ children }: { children: ReactNode }) {
  const user = await getUser();
  if (user) {
    redirect("/dashboard");
  }
  return children;
}
