import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'AtticNote',
    short_name: 'AtticNote',
    description: 'A fast, block-based Markdown workspace with GitHub sync and rich embeds.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0B0D12',
    theme_color: '#7C5CFF',
    icons: [
      {
        src: '/logo.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
    ],
  };
}
