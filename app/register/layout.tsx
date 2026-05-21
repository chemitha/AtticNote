import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Create Account',
  description: 'Join AtticNote to start building your fast, Markdown-powered workspace.',
};

import { getUser } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function RegisterLayout({ children }: { children: React.ReactNode }) {
  const user = await getUser();
  if (user) {
    redirect("/dashboard");
  }
  return <>{children}</>;
}
