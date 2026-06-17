import Link from 'next/link';
import Image from 'next/image';
import { supabase } from '../../lib/supabase';

// High-Performance Optimization: Forces Vercel Edge networks to invalidate the cache every hour (ISR)
export const revalidate = 3600;

export const metadata = {
  title: 'EnMate Blog | Authority Insights on Digital Growth, Web Engineering & SEO',
  description: 'Deep dive into tactical articles crafted by the EnMate Team to scale your local presence, design high-converting applications, and capture traffic globally.',
  alternates: { canonical: 'https://enmate.in/blog' }
};

export default async function BlogListingPage() {
  // Query only published posts, sorting from newest to oldest
  const { data: posts, error } = await supabase
    .from('blogs')
    .select(`
      id, title, slug, excerpt, featured_image, featured_image_width, featured_image_height, alt_text, reading_time, published_at,
      categories ( name )
    `)
    .eq('status', 'published')
    .order('published_at', { ascending: false });

  if (error || !posts) {
    return (
      <div className="min-h-screen bg-[#05030a] flex items-center justify-center text-[var(--text-muted)]">
        <p>Failed to load articles. Please check database connectivity.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#05030a] text-[var(--text-main)] pt-32 pb-24">
      <div className="container">
        
        {/* Header Content Section */}
        <div className="text-center max-w-[700px] mx-auto mb-16">
          <span className="section-tag">Knowledge Platform</span>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 font-anokha gradient-text">The EnMate Intelligence Feed</h1>
          <p className="text-[var(--text-muted)] text-sm md:text-base leading-relaxed">
            Data-driven execution methodologies, premium branding frameworks, and technical web architectures engineered to scale business operations globally.
          </p>
        </div>

        {/* Dynamic Multi-Column Grid System */}
        {posts.length === 0 ? (
          <p className="text-center text-[var(--text-muted)] mt-12">No articles published yet. Check back soon!</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <Link 
                href={`/blog/${post.slug}`} 
                key={post.id} 
                className="group service-card block relative overflow-hidden transition-all duration-300 hover:-translate-y-2 text-left"
              >
                <div className="card-content">
                  {/* Next.js Optimized WebP Feature Image Wrapper */}
                  <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden mb-5 bg-neutral-900 border border-[var(--card-border)]">
                    <Image
                      src={post.featured_image}
                      alt={post.alt_text || post.title}
                      width={post.featured_image_width || 1200}
                      height={post.featured_image_height || 630}
                      className="object-cover w-full h-full transform transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    {post.categories && (
                      <span className="absolute top-3 left-3 bg-black/70 text-[var(--accent-soft)] text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border border-white/10 backdrop-blur-md">
                        {post.categories.name}
                      </span>
                    )}
                  </div>

                  {/* Core Article Metadata Details */}
                  <div className="flex items-center gap-4 text-xs text-[var(--text-muted)] mb-3">
                    <span>{new Date(post.published_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                    <span className="w-1 h-1 rounded-full bg-white/20"></span>
                    <span>{post.reading_time} min read</span>
                  </div>

                  {/* Title and Summary Modules */}
                  <h3 className="text-lg font-bold text-[var(--text-main)] mb-2 group-hover:text-[var(--accent-soft)] transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-xs text-[var(--text-muted)] leading-relaxed line-clamp-3 mb-5">
                    {post.excerpt}
                  </p>

                  {/* Interactive Button */}
                  <span className="text-xs font-bold text-[var(--accent-soft)] uppercase tracking-wider inline-flex items-center group-hover:underline">
                    Read Full Article <i className="fas fa-arrow-right ml-2 text-xs transition-transform group-hover:translate-x-1"></i>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}