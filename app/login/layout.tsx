import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Log In',
  description: 'Log in to your AtticNote account to access your workspace.',
};

import { getUser } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function LoginLayout({ children }: { children: React.ReactNode }) {
  const user = await getUser();
  if (user) {
    redirect("/dashboard");
  }
  return <>{children}</>;
}
