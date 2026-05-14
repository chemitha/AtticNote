import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Create Account',
  description: 'Join AtticNote to start building your fast, Markdown-powered workspace.',
};

export default function RegisterLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
