import type { Metadata } from 'next';
import { getUser } from "@/lib/auth";
import ChangelogClient from "./ChangelogClient";

export const metadata: Metadata = {
  title: 'Changelog v1.1.0 | AtticNote',
  description: 'See the latest updates, features, and improvements in AtticNote version 1.1.0. Nestable sub-pages, block storage dynamic API integration, layout changes, and user experience enhancements.',
};

export default async function Page() {
  const user = await getUser();
  return <ChangelogClient user={user} />;
}
