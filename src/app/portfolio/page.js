'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { supabase } from '../../lib/supabase';

export default function UltimatePortfolioShowcase() {
  const [categories, setCategories] = useState([]);
  const [projects, setProjects] = useState([]);
  const [activeTab, setActiveTab] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchShowcaseData = async () => {
      try {
        const [catRes, portRes] = await Promise.all([
          supabase.from('portfolio_categories').select('*').order('name', { ascending: true }),
          supabase.from('portfolio').select('*, portfolio_categories(name, slug)').order('created_at', { ascending: false })
        ]);

        if (catRes.data) setCategories(catRes.data);
        if (portRes.data) setProjects(portRes.data);
      } catch (err) {
        console.error('Data pipeline exception:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchShowcaseData();
  }, []);

  useEffect(() => {
    if (loading) return;
    const cards = document.querySelectorAll('.portfolio-tilt-card');

    const handleMouseMove = (e) => {
      const card = e.currentTarget;
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      card.style.setProperty('--tilt-x', `${((y / rect.height) - 0.5) * -6}deg`);
      card.style.setProperty('--tilt-y', `${((x / rect.width) - 0.5) * 6}deg`);
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    };

    const handleMouseLeave = (e) => {
      const card = e.currentTarget;
      card.style.setProperty('--tilt-x', '0deg');
      card.style.setProperty('--tilt-y', '0deg');
    };

    cards.forEach(card => {
      card.addEventListener('mousemove', handleMouseMove);
      card.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      cards.forEach(card => {
        card.removeEventListener('mousemove', handleMouseMove);
        card.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, [loading, activeTab]);

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
      "image": project.thumbnail_url,
      "creator": { "@type": "Organization", "name": "EnMate" }
    }))
  };

  if (loading) {
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

      <div className="w-full bg-gradient-to-b from-[#05030a] via-[#090514] to-[#05030a] pt-28 md:pt-36 pb-24 px-3 md:px-8">
        <div className="w-full max-w-[1400px] mx-auto space-y-8 md:space-y-12">
          
          {/* Responsive Header Section */}
          <div className="text-left space-y-2 md:space-y-3 max-w-[700px]">
            <span className="section-tag font-mono text-[9px] md:text-[10px]">Our Production Showroom</span>
            <h1 className="text-3xl md:text-6xl font-bold font-anokha gradient-text leading-tight tracking-tight uppercase">
              Proven Case Frameworks
            </h1>
            <p className="text-[11px] md:text-sm text-neutral-400 font-light leading-relaxed">
              We don't deal in conceptual promises; we deploy functional market infrastructure. Explore our luxury visual identities, high-speed architectures, and global conversion deployment grids.
            </p>
          </div>

          {/* 🎯 ULTRA-COMPACT SLICK FILTER NAVIGATION */}
          {/* 🎯 LUXURY DYNAMIC HORIZONTAL SCROLL TRACK - FIXED TEXT BREAKING */}
          <div className="w-full border-b border-white/5 pb-3">
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none snap-x snap-mandatory touch-pan-x">
              
              <button
                onClick={() => setActiveTab('all')}
                className={`btn snap-start px-5 py-2.5 rounded-full text-[10px] md:text-xs font-mono font-bold tracking-wider uppercase transition-all duration-300 border shrink-0 whitespace-nowrap ${
                  activeTab === 'all'
                    ? 'bg-gradient-to-r from-[#cf0466] to-[#9c034e] text-white border-[#cf0466] shadow-md'
                    : 'bg-white/[0.02] text-neutral-400 border-white/5 hover:border-white/10 hover:text-white'
                }`}
              >
                All
              </button>
              
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveTab(cat.slug)}
                  className={`btn snap-start px-5 py-2.5 rounded-full text-[10px] md:text-xs font-mono font-bold tracking-wider uppercase transition-all duration-300 border shrink-0 whitespace-nowrap ${
                    activeTab === cat.slug
                      ? 'bg-gradient-to-r from-[#cf0466] to-[#9c034e] text-white border-[#cf0466] shadow-md'
                      : 'bg-white/[0.02] text-neutral-400 border-white/5 hover:border-white/10 hover:text-white'
                  }`}
                >
                  {cat.name}
                </button>
              ))}

            </div>
          </div>

          {/* 🎯 BALANCED GRID ARCHITECTURE: 2 COLUMNS ON MOBILE, 3 COLUMNS ON DESKTOP */}
          {filteredProjects.length === 0 ? (
            <div className="h-48 flex flex-col items-center justify-center font-mono text-[11px] text-neutral-500 italic border border-dashed border-white/5 rounded-2xl">
              <i className="fas fa-folder-open text-base mb-1 text-neutral-600"></i>
              <span>Staging pipeline active...</span>
            </div>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-8 pt-2">
              {filteredProjects.map((project, index) => (
                <div
                  key={project.id}
                  className="portfolio-tilt-card btn group relative w-full bg-[#07040f]/90 border border-white/5 hover:border-[var(--accent-soft)] rounded-2xl md:rounded-3xl overflow-hidden transition-all duration-300 shadow-lg flex flex-col text-left"
                  style={{
                    transform: 'perspective(1000px) rotateX(var(--tilt-x, 0deg)) rotateY(var(--tilt-y, 0deg)) translateZ(0)'
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-[#cf0466]/0 to-[#cf0466]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                  {/* Image Container with Fixed Proportions */}
                  <div className="relative w-full overflow-hidden aspect-[4/3] bg-neutral-900 border-b border-white/5 pointer-events-none">
                    <Image
                      src={project.thumbnail_url}
                      alt={project.alt_text || project.title}
                      width={project.img_width || 600}
                      height={project.img_height || 450}
                      priority={index < 2 || project.is_featured}
                      loading={index < 2 || project.is_featured ? undefined : "lazy"}
                      className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500 ease-out"
                    />
                    
                    {project.is_featured && (
                      <span className="absolute top-2 left-2 bg-[var(--accent)] text-[8px] font-mono font-bold tracking-wider text-white px-1.5 py-0.5 rounded uppercase shadow-sm">
                        Featured
                      </span>
                    )}
                  </div>

                  {/* Clean Content Stack */}
                  <div className="p-3 md:p-6 space-y-2 pointer-events-none flex-grow flex flex-col justify-between">
                    <div className="space-y-1 md:space-y-2">
                      <div className="flex items-center justify-between gap-1">
                        <span className="text-[8px] md:text-[10px] font-mono font-bold text-[#cf0466] uppercase tracking-wider block truncate">
                          {project.portfolio_categories?.name}
                        </span>
                        {project.client_name && (
                          <span className="hidden sm:inline text-[9px] font-mono text-neutral-500 font-light truncate max-w-[100px]">
                            @{project.client_name}
                          </span>
                        )}
                      </div>
                      <h3 className="text-sm md:text-xl font-bold text-white tracking-tight group-hover:text-[var(--accent-soft)] transition-colors duration-300 truncate">
                        {project.title}
                      </h3>
                      <p className="text-[10px] md:text-xs text-neutral-400 font-light leading-relaxed line-clamp-2 md:line-clamp-none">
                        {project.description}
                      </p>
                    </div>

                    {project.project_url && (
                      <div className="pt-2 md:pt-4 border-t border-white/5 mt-1 hidden sm:flex items-center justify-end text-[10px] md:text-[11px] font-mono text-neutral-400 group-hover:text-white transition-colors duration-300 gap-1 font-bold">
                        <span>Case Link</span>
                        <i className="fas fa-arrow-right text-[8px] transform group-hover:translate-x-1 transition-transform" />
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