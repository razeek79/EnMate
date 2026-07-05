'use client';

import React, { useState, useEffect, useTransition } from 'react';
import Image from 'next/image';
import { supabase } from '../../lib/supabase';

export default function PremiumPortfolioShowcase() {
  const [categories, setCategories] = useState([]);
  const [projects, setProjects] = useState([]);
  const [activeTab, setActiveTab] = useState('all');
  const [isPending, startTransition] = useTransition();
  const [dbLoading, setDbLoading] = useState(true);

  // 1. Optimized Data Fetching using React Concurrent Staging
  useEffect(() => {
    const fetchPortfolioData = async () => {
      try {
        const [catRes, portRes] = await Promise.all([
          supabase.from('portfolio_categories').select('*').order('name', { ascending: true }),
          supabase.from('portfolio').select('*, portfolio_categories(name, slug)').order('created_at', { ascending: false })
        ]);

        // Wrap updates in a transition state to prevent rendering thread freeze
        startTransition(() => {
          if (catRes.data) setCategories(catRes.data);
          if (portRes.data) setProjects(portRes.data);
        });
      } catch (err) {
        console.error('Data matrix bottleneck:', err);
      } finally {
        setDbLoading(false);
      }
    };

    fetchPortfolioData();
  }, []);

  // 2. Secured 3D Tilt Hover Optimization (Delayed until load lifecycle completely clears)
  useEffect(() => {
    if (dbLoading || isPending) return;

    // Use a lightweight timeout to give the browser layout thread a moment to relax
    const timeoutId = setTimeout(() => {
      const cards = document.querySelectorAll('.portfolio-tilt-card');

      const handleMouseMove = (e) => {
        const card = e.currentTarget;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const percentX = (x / rect.width) - 0.5;
        const percentY = (y / rect.height) - 0.5;

        card.style.setProperty('--tilt-x', `${percentY * -8}deg`);
        card.style.setProperty('--tilt-y', `${percentX * 8}deg`);
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
      };

      const handleMouseLeave = (e) => {
        const card = e.currentTarget;
        card.style.setProperty('--tilt-x', '0deg');
        card.style.setProperty('--tilt-y', '0deg');
      };

      cards.forEach(card => {
        card.addEventListener('mousemove', handleMouseMove, { passive: true });
        card.addEventListener('mouseleave', handleMouseLeave, { passive: true });
      });

      return () => {
        cards.forEach(card => {
          card.removeEventListener('mousemove', handleMouseMove);
          card.removeEventListener('mouseleave', handleMouseLeave);
        });
      };
    }, 50);

    return () => clearTimeout(timeoutId);
  }, [dbLoading, isPending, activeTab]);

  const filteredProjects = activeTab === 'all'
    ? projects
    : projects.filter(p => p.portfolio_categories?.slug === activeTab);

  const jsonLdSchema = {
    "@context": "https://schema.org",
    "@type": "CreativeWorkSeries",
    "name": "EnMate Digital Production Showroom",
    "description": "Premium case studies detailing high-performance web engineering, luxury brand design, visual packaging, and corporate customer acquisition architectures.",
    "url": "https://www.enmate.in/portfolio",
    "provider": {
      "@type": "Organization",
      "name": "EnMate",
      "url": "https://www.enmate.in"
    },
    "hasPart": filteredProjects.map(project => ({
      "@type": "CreativeWork",
      "name": project.title,
      "description": project.description,
      "image": project.thumbnail_url
    }))
  };

  if (dbLoading) {
    return (
      <div className="min-h-screen bg-[#05030a] flex items-center justify-center font-mono text-xs text-neutral-500 tracking-widest">
        COMPILING PREMIUM SHOWROOM PIPELINES...
      </div>
    );
  }

  return (
    <div className="w-full bg-[#05030a] font-sans text-white selection:bg-[var(--accent)] selection:text-white">
      <script 
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
      />

      <div className="w-full bg-gradient-to-b from-[#05030a] via-[#090514] to-[#05030a] pt-36 pb-24 px-4 md:px-8">
        <div className="w-full max-w-[1400px] mx-auto space-y-12">
          
          {/* Header Typography Elements */}
          <div className="text-left space-y-3 max-w-[700px]">
            <span className="section-tag font-mono text-[10px]">Our Production Showroom</span>
            <h1 className="text-4xl md:text-6xl font-bold font-anokha gradient-text leading-none tracking-tight uppercase">
              Proven Case Frameworks
            </h1>
            <p className="text-xs md:text-sm text-[var(--text-muted)] font-light leading-relaxed">
              We don't deal in conceptual promises; we deploy functional market infrastructure. Explore our luxury visual identities, high-speed architectures, and global conversion deployment grids.
            </p>
          </div>

          {/* Dynamic Category Navigation Filtering Bar */}
          <div className="w-full border-b border-white/5 pb-4 overflow-x-auto scrollbar-none flex items-center gap-2 font-mono text-xs font-bold whitespace-nowrap">
            <button
              onClick={() => setActiveTab('all')}
              className={`btn px-5 py-2.5 rounded-xl border transition-all duration-300 uppercase tracking-wider ${
                activeTab === 'all'
                  ? 'bg-[var(--accent)] text-white border-[var(--accent-soft)] shadow-lg shadow-[#cf0466]/10'
                  : 'bg-white/5 text-neutral-400 border-white/5 hover:border-white/10 hover:text-white'
              }`}
            >
              All Production
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.slug)}
                className={`btn px-5 py-2.5 rounded-xl border transition-all duration-300 uppercase tracking-wider ${
                  activeTab === cat.slug
                    ? 'bg-[var(--accent)] text-white border-[var(--accent-soft)] shadow-lg shadow-[#cf0466]/10'
                    : 'bg-white/5 text-neutral-400 border-white/5 hover:border-white/10 hover:text-white'
              }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Premium Portfolio Content Rendering Canvas */}
          {filteredProjects.length === 0 ? (
            <div className="h-64 flex flex-col items-center justify-center font-mono text-xs text-neutral-500 italic border border-dashed border-white/5 rounded-3xl">
              <i className="fas fa-folder-open text-xl mb-2 text-neutral-600"></i>
              <span>New projects are currently inside the staging pipeline for this classification...</span>
            </div>
          ) : (
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 md:gap-8 space-y-6 md:space-y-8 [column-fill:_balance] pt-4">
              {filteredProjects.map((project) => (
                <div
                  key={project.id}
                  className="portfolio-tilt-card btn group relative break-inside-avoid w-full bg-[#07040f]/90 border border-white/5 hover:border-[var(--accent-soft)] rounded-3xl overflow-hidden transition-all duration-300 shadow-xl flex flex-col text-left"
                  style={{
                    transform: 'perspective(1000px) rotateX(var(--tilt-x, 0deg)) rotateY(var(--tilt-y, 0deg)) translateZ(0)'
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-[#cf0466]/0 via-[#cf0466]/0 to-[#cf0466]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                  {/* Clean Image Elements with Native Next-Gen Performance Compressions */}
                  <div className="relative w-full overflow-hidden aspect-[4/3] sm:aspect-auto bg-neutral-900 border-b border-white/5 pointer-events-none">
                    <Image
                      src={project.thumbnail_url}
                      alt={project.alt_text || `${project.title} Case study breakdown`}
                      width={600}
                      height={450}
                      sizes="(max-w-768px) 100vw, (max-w-1200px) 50vw, 33vw"
                      priority={project.is_featured}
                      loading={project.is_featured ? undefined : "lazy"}
                      className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700 ease-out"
                    />
                    {project.is_featured && (
                      <span className="absolute top-3 left-3 bg-[var(--accent)] border border-[var(--accent-soft)] text-[9px] font-mono font-bold tracking-widest text-white px-2 py-0.5 rounded-md uppercase shadow-md">
                        Featured Strategy
                      </span>
                    )}
                  </div>

                  {/* Card Descriptive Meta Elements */}
                  <div className="p-6 space-y-3 pointer-events-none flex-grow flex flex-col justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[10px] font-mono font-bold text-[var(--accent-soft)] uppercase tracking-widest">
                          {project.portfolio_categories?.name}
                        </span>
                        {project.client_name && (
                          <span className="text-[9px] font-mono text-neutral-500 font-light truncate max-w-[150px]">
                            @{project.client_name}
                          </span>
                        )}
                      </div>
                      <h3 className="text-lg font-bold text-white tracking-tight group-hover:text-[var(--accent-soft)] transition-colors duration-300">
                        {project.title}
                      </h3>
                      <p className="text-xs text-[var(--text-muted)] font-light leading-relaxed">
                        {project.description}
                      </p>
                    </div>

                    {project.project_url && (
                      <div className="pt-4 border-t border-white/5 mt-2 flex items-center justify-end text-[11px] font-mono text-neutral-400 group-hover:text-white transition-colors duration-300 gap-1 font-bold">
                        <span>Analyze System Layout</span>
                        <i className="fas fa-arrow-right text-[9px] transform group-hover:translate-x-1 transition-transform" />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}