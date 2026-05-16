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
    default: 'Attic - Your personal workspace, everywhere.',
    template: '%s | Attic',
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
openGraph: {
  title: 'Attic - Your personal workspace, everywhere.',
  description:
    'A lightweight cloud workspace designed for people who switch devices often. Instant access to your notes from any computer.',
  url: 'https://atticnote.vercel.app',
  siteName: 'Attic',
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
  title: 'Attic - Your personal workspace, everywhere.',
  description:
    'A lightweight cloud workspace designed for people who switch devices often.',
  images: ['https://atticnote.vercel.app/og-image.png'],
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
