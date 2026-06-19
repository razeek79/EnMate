export async function GET() {
  const baseUrl = 'https://enmate.in';

  const staticPages = [
    { url: '', priority: '1.0', changefreq: 'weekly' },
    { url: '/about', priority: '0.8', changefreq: 'monthly' },
    { url: '/blog', priority: '0.8', changefreq: 'weekly' },
  ];

  const servicePages = [
    'web-development',
    'graphic-design',
    'video-editing',
    'social-media-marketing',
    'seo',
  ].map((slug) => ({
    url: `/services/${slug}`,
    priority: '0.9',
    changefreq: 'monthly',
  }));

  const allPages = [...staticPages, ...servicePages];

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages
  .map(
    (page) => `  <url>
    <loc>${baseUrl}${page.url}</loc>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

  return new Response(sitemapXml, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
}