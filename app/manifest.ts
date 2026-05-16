import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'AtticNote',
    short_name: 'AtticNote',
    description: 'A fast, lightweight workspace you can access from any device. Notes, files, and ideas that follow you everywhere.',
    start_url: '/dashboard',
    scope: '/',
    display: 'standalone',
    background_color: '#0B0D12',
    theme_color: '#7C5CFF',
    icons: [
      {
        src: '/logo_curved.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
    ],
  };
}