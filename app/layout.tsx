import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from '@/components/Providers';
import { Analytics } from '@vercel/analytics/react';

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans', // Creates a global CSS variable rule
  fallback: ['Noto Color Emoji', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'] // Injects fallbacks into the compiled bundle
});

export const viewport: Viewport = {
  themeColor: '#7C5CFF',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: {
    default: 'AtticNote - Your personal workspace, everywhere.',
    template: '%s | AtticNote',
  },
  description: 'A lightweight cloud workspace designed for people who switch devices often. Instant access to your notes and files from any computer, with seamless export options.',
  keywords: ['lightweight workspace', 'cloud notes', 'digital backpack', 'markdown editor', 'device sync', 'portable workspace'],
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
  other: {
    rel: 'stylesheet',
    url: 'https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&family=Noto+Color+Emoji&display=swap&req=0',
  },
  openGraph: {
    title: 'AtticNote - Your personal workspace, everywhere.',
    description:
      'A lightweight cloud workspace designed for people who switch devices often. Instant access to your notes from any computer.',
    url: 'https://atticnote.vercel.app',
    siteName: 'AtticNote',
    images: [
      {
        url: 'https://atticnote.vercel.app/og-image.png',
        width: 1080,
        height: 1080,
        alt: 'AtticNote',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AtticNote - Your personal workspace, everywhere.',
    description:
      'A lightweight cloud workspace designed for people who switch devices often.',
    images: ['https://atticnote.vercel.app/og-image.png'],
  },
  category: 'productivity',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    // Switch from inter.className to inter.variable to load the theme variable safely
    <html lang="en" className={inter.variable}>
      <body suppressHydrationWarning>
        <Providers>
          {children}
        </Providers>
        <Analytics />
      </body>
    </html>
  );
}