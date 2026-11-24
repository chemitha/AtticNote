import type { Metadata } from 'next';
import { getUser } from "@/lib/auth";
import ChangelogClient from "./ChangelogClient";

export const metadata: Metadata = {
  title: 'Changelog v1.2.0',
  description: 'See the latest updates in AtticNote version 1.2.0: Full Profile Hub with Manage Account, custom avatars, security settings, and Multi-Workspace Isolation.',
};

export default async function Page() {
  const user = await getUser();
  return <ChangelogClient user={user} />;
}
