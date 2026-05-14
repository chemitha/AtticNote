import { getUser } from "@/lib/auth";
import LandingPageClient from "@/components/LandingPageClient";

export default async function Page() {
  const user = await getUser();
  
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'AtticNote',
    description: 'A fast, block-based Markdown workspace with GitHub sync, Google Drive integration, and rich embeds. Optimized for developer workflows.',
    applicationCategory: 'ProductivityApplication',
    operatingSystem: 'Web',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    author: {
      '@type': 'Person',
      name: 'Chemitha Sathsilu',
      url: 'https://github.com/chemitha',
    },
    featureList: [
      'Block-based Markdown editor',
      'Native GitHub synchronization',
      'Google Drive and Notion exports',
      'Rich link embedding',
      'Keyboard-first design',
      'Local-first performance',
    ],
    screenshot: 'https://atticnote.vercel.app/logo.svg',
    softwareVersion: '1.0.0',
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <LandingPageClient user={user} />
    </>
  );
}
