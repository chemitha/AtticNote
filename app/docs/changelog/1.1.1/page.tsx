import type { Metadata } from 'next';
import { getUser } from "@/lib/auth";
import ChangelogClient from "./ChangelogClient";

export const metadata: Metadata = {
  title: 'Changelog v1.1.1',
  description: 'See the latest updates, features, and improvements in AtticNote version 1.1.1. Production custom domain migration, smart idle timeout fixes, layout adjustments, and error routing refinements.',
};

export default async function Page() {
  const user = await getUser();
  return <ChangelogClient user={user} />;
}