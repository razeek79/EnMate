'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { supabase } from '../../lib/supabase';

export default function BlogListingPage() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  // 1. DATA FETCHING MATRIX LAYER
  useEffect(() => {
    async function fetchPublishedPosts() {
      try {
        const { data, error: dbError } = await supabase
          .from('blogs')
          .select(`
            id, title, slug, excerpt, featured_image, featured_image_width, featured_image_height, alt_text, reading_time, published_at,
            categories ( name )
          `)
          .eq('status', 'published')
          .order('published_at', { ascending: false });

        if (dbError) throw dbError;
        setPosts(data || []);
      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchPublishedPosts();
  }, []);

  // 2. SITE-WIDE INTERACTIVE CURSOR MOUSE-TRACKING MODULE
  useEffect(() => {
    const handleMouseMove = (e) => {
      const cards = document.querySelectorAll('.service-card');
      cards.forEach(card => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
      });
    };

    useEffect(() => {
    // Catch the default Supabase invitation token from the URL hash
    if (window.location.hash && window.location.hash.includes('type=invite')) {
      const router = require('next/navigation').useRouter;
      // Redirect them directly to your password creation screen with their token intact
      window.location.href = `/auth/confirm${window.location.hash}`;
    }
  }, []);
    const dot = document.getElementById('cursor-dot');
    const ring = document.getElementById('cursor-ring');
    if (!dot || !ring) return;

    let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;

    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.left = `${mouseX}px`;
      dot.style.top = `${mouseY}px`;
      handleMouseMove(e);
    };

    const tick = () => {
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;
      ring.style.left = `${ringX}px`;
      ring.style.top = `${ringY}px`;
      requestAnimationFrame(tick);
    };

    const onMouseEnterLink = () => ring.classList.add('cursor-hovered');
    const onMouseLeaveLink = () => ring.classList.remove('cursor-hovered');

    window.addEventListener('mousemove', onMouseMove);
    const animId = requestAnimationFrame(tick);

    document.querySelectorAll('a, button, .service-card, .btn').forEach(item => {
      item.addEventListener('mouseenter', onMouseEnterLink);
      item.addEventListener('mouseleave', onMouseLeaveLink);
    });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(animId);
    };
  }, [posts]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#05030a] flex items-center justify-center text-[var(--text-muted)] font-mono text-xs">
        <p>Loading the intelligence feed matrix...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#05030a] flex items-center justify-center text-[var(--text-muted)]">
        <p>Failed to load articles. Please check database connectivity.</p>
      </div>
    );
  }

  return (
    <>
      <div id="cursor-dot" className="custom-cursor-dot" />
      <div id="cursor-ring" className="custom-cursor-ring" />

      <div className="min-h-screen bg-[#05030a] text-[var(--text-main)] pt-32 pb-24">
        <div className="container">
          
          <div className="text-center max-w-[700px] mx-auto mb-16">
            <span className="section-tag">Knowledge Platform</span>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 font-anokha gradient-text">The EnMate Intelligence Feed</h1>
            <p className="text-[var(--text-muted)] text-sm md:text-base leading-relaxed">
              Data-driven execution methodologies, premium branding frameworks, and technical web architectures engineered to scale business operations globally.
            </p>
          </div>

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
                    {/* Fixed image wrapper layout bounding */}
                    <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden mb-5 bg-neutral-900 border border-[var(--card-border)]">
                      <Image
                        src={post.featured_image}
                        alt={post.alt_text || post.title}
                        fill
                        sizes="(max-w-768px) 100vw, (max-w-1200px) 50vw, 33vw"
                        className="object-cover transform transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                      {post.categories && (
                        <span className="absolute top-3 left-3 bg-black/70 text-[var(--accent-soft)] text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border border-white/10 backdrop-blur-md z-20">
                          {post.categories.name}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-4 text-xs text-[var(--text-muted)] mb-3">
                      <span>{new Date(post.published_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                      <span className="w-1 h-1 rounded-full bg-white/20"></span>
                      <span>{post.reading_time} min read</span>
                    </div>

                    <h3 className="text-lg font-bold text-[var(--text-main)] mb-2 group-hover:text-[var(--accent-soft)] transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-xs text-[var(--text-muted)] leading-relaxed line-clamp-3 mb-5">
                      {post.excerpt}
                    </p>

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
    </>
  );
}