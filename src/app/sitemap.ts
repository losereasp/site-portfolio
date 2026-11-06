import type { MetadataRoute } from 'next';

const BASE_URL = 'https://losereasp.com';

const PROJECT_SLUGS = [
  'echoes-of-kalyazin',
  'last-mechanic',
  'frost-core',
  'the-visit',
  'rampage-rally',
  'stanley-bottle',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = ['', '/work', '/about'].map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  const projectRoutes: MetadataRoute.Sitemap = PROJECT_SLUGS.map((slug) => ({
    url: `${BASE_URL}/work/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.9,
  }));

  return [...staticRoutes, ...projectRoutes];
}
