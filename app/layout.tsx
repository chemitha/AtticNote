import type {Metadata} from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'AtticNote',
  description: 'A lightweight Notion-style workspace',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
