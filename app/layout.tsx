import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from '@/components/Providers';

const inter = Inter({ subsets: ['latin'], display: 'swap' });

export const viewport: Viewport = {
  themeColor: '#7C5CFF',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: {
    default: 'AtticNote - Fast Markdown Workspace for Developers',
    template: '%s | AtticNote',
  },
  description: 'A fast, block-based Markdown workspace with GitHub sync, Google Drive integration, and rich embeds. Built for developers who think faster than they click.',
  keywords: ['Markdown note app', 'GitHub synced notes', 'block editor with embeds', 'Notion alternative for developers', 'developer workspace', 'Markdown editor'],
  authors: [{ name: 'Chemitha Sathsilu' }],
  creator: 'Chemitha Sathsilu',
  metadataBase: new URL('https://atticnote.vercel.app'),
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: '/logo_curved.svg',
    apple: '/logo_curved.svg',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://atticnote.vercel.app',
    siteName: 'AtticNote',
    title: 'AtticNote - Fast Markdown Workspace for Developers',
    description: 'Markdown note-taking app with GitHub sync, block editor, and seamless exports. Built for speed.',
    images: [
      {
        url: '/logo.svg',
        width: 800,
        height: 600,
        alt: 'AtticNote Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AtticNote - Fast Markdown Workspace',
    description: 'A block-based Markdown workspace with GitHub sync and rich embeds. Built for developers.',
    images: ['/logo.svg'],
  },
  category: 'productivity',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={inter.className}>
      <body suppressHydrationWarning>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
