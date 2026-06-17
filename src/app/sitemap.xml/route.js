import { supabase } from '../../lib/supabase';

export async function GET() {
  const { data: posts } = await supabase.from('blogs').select('slug, updated_at').eq('status', 'published');

  const staticPages = [
    'https://enmate.in',
    'https://enmate.in/about',
    'https://enmate.in/blog'
  ];

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${staticPages.map(url => `
      <url>
        <loc>${url}</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>${url.endsWith('.in') ? '1.0' : '0.8'}</priority>
      </url>
    `).join('')}
    ${posts?.map(post => `
      <url>
        <loc>https://enmate.in/blog/${post.slug}</loc>
        <lastmod>${new Date(post.updated_at).toISOString()}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.6</priority>
      </url>
    `).join('') || ''}
  </urlset>`;

  return new Response(sitemapXml, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' }
  });
}