import type { MetadataRoute } from 'next';

const BASE_URL = 'https://losereasp.com';

export default function sitemap(): MetadataRoute.Sitemap {
  return ['/', '/work', '/about'].map((route) => ({
    url: new URL(route, BASE_URL).toString(),
  }));
}
