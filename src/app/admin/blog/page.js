'use client';

import React, { useState } from 'react';

export default function AdminBlogCreator() {
  const [formData, setFormData] = useState({
    title: '', slug: '', excerpt: '', content: '', focusKeyword: '',
    metaTitle: '', metaDescription: '', altText: '', authorName: 'EnMate Team'
  });

  const handleTitleChange = (e) => {
    const val = e.target.value;
    const derivedSlug = val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    setFormData(prev => ({
      ...prev,
      title: val,
      slug: derivedSlug,
      metaTitle: val.substring(0, 60) // Automatic SEO layout suggestion mapping
    }));
  };

  const calculateReadingTime = (text) => {
    const words = text.trim().split(/\s+/).length;
    return Math.max(1, Math.ceil(words / 225)); // High fidelity programmatic estimation
  };

  return (
    <div className="min-h-screen bg-[#05030a] text-white p-8 md:p-12">
      <div className="max-w-[900px] mx-auto bg-white/[0.02] border border-white/10 rounded-3xl p-6 md:p-10">
        <h2 className="text-2xl font-bold font-anokha mb-8 gradient-text">Publish Core Strategic Intelligence</h2>
        
        <form className="space-y-6 text-left">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] mb-2">Article Core Title</label>
            <input type="text" value={formData.title} onChange={handleTitleChange} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-[var(--accent-soft)] outline-none" placeholder="e.g., SEO Tactics for Small Businesses" required />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] mb-2">Programmatic Slug URL Prefix</label>
            <input type="text" value={formData.slug} onChange={(e) => setFormData(p => ({ ...p, slug: e.target.value }))} className="w-full bg-black/20 border border-white/5 text-[var(--text-muted)] rounded-xl px-4 py-3 text-sm outline-none" readOnly />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] mb-2">
                Meta Title ({formData.metaTitle.length}/60 chars)
              </label>
              <input type="text" value={formData.metaTitle} onChange={(e) => setFormData(p => ({ ...p, metaTitle: e.target.value.substring(0, 60) }))} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-[var(--accent-soft)] outline-none" />
              {formData.metaTitle.length < 45 && <span className="text-[10px] text-amber-400 font-medium mt-1 block">💡 Target length: 50-60 characters for full search page visibility.</span>}
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] mb-2">
                Meta Description ({formData.metaDescription.length}/160 chars)
              </label>
              <input type="text" value={formData.metaDescription} onChange={(e) => setFormData(p => ({ ...p, metaDescription: e.target.value.substring(0, 160) }))} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-[var(--accent-soft)] outline-none" placeholder="Provide summary..." />
              {formData.metaDescription.length < 130 && <span className="text-[10px] text-amber-400 font-medium mt-1 block">💡 Target length: 140-160 characters to optimize click-through rates.</span>}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] mb-2">Target Search Focus Keyword</label>
            <input type="text" value={formData.focusKeyword} onChange={(e) => setFormData(p => ({ ...p, focusKeyword: e.target.value }))} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-[var(--accent-soft)] outline-none" placeholder="e.g., SEO Tips Kottakkal" />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] mb-2">Article Content Frame (HTML Standard String Format)</label>
            <textarea value={formData.content} onChange={(e) => setFormData(p => ({ ...p, content: e.target.value }))} rows={12} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm font-mono focus:border-[var(--accent-soft)] outline-none" placeholder="<h2>Your heading</h2> <p>Your structural content copy...</p>" required />
            <span className="text-[10px] text-[var(--text-muted)] block mt-1">Calculated Estimate: {calculateReadingTime(formData.content)} minute(s) reading experience index value.</span>
          </div>

          <div className="flex justify-end gap-4 pt-4">
            <button type="button" className="btn btn-outline text-xs uppercase tracking-wider font-bold px-8 py-3">Save Draft</button>
            <button type="submit" className="btn btn-primary text-xs uppercase tracking-wider font-bold px-8 py-3">Publish Live</button>
          </div>
        </form>
      </div>
    </div>
  );
}