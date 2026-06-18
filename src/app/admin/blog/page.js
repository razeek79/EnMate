'use client';

import React, { useState, useEffect, useRef } from 'react';
import { supabase } from '../../../lib/supabase';

export default function NextGenProductionAdminBlog() {
  const [categories, setCategories] = useState([]);
  const [availableTags, setAvailableTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadStatus, setUploadStatus] = useState('');
  const [seoScore, setSeoScore] = useState(0);
  const [seoWarnings, setSeoWarnings] = useState([]);
  const editorRef = useRef(null);

  const [formData, setFormData] = useState({
    title: '', slug: '', excerpt: '', content: '', focusKeyword: '',
    metaTitle: '', metaDescription: '', altText: '', authorName: 'EnMate Team',
    categoryId: '', status: 'draft', featuredImage: '', imgWidth: 0, imgHeight: 0
  });

  // 1. DYNAMIC MOUSE-TRACKING ACCENT GLOW & POINTER INSTANTIATION
  useEffect(() => {
    const dot = document.getElementById('cursor-dot');
    const ring = document.getElementById('cursor-ring');
    if (!dot || !ring) return;

    let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;

    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.left = `${mouseX}px`;
      dot.style.top = `${mouseY}px`;
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

    // Bind reactive hover listeners securely to custom interface nodes
    const refreshHoverBindings = () => {
      document.querySelectorAll('a, button, .service-card, .btn').forEach(item => {
        item.removeEventListener('mouseenter', onMouseEnterLink);
        item.removeEventListener('mouseleave', onMouseLeaveLink);
        item.addEventListener('mouseenter', onMouseEnterLink);
        item.addEventListener('mouseleave', onMouseLeaveLink);
      });
    };
    
    refreshHoverBindings();

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(animId);
    };
  }, [categories, availableTags, selectedTags, seoWarnings]);

  // 2. DYNAMIC SYSTEM SEED LOADER (CATEGORIES & TAGS)
  useEffect(() => {
    async function seedAdminMetadata() {
      const [catRes, tagRes] = await Promise.all([
        supabase.from('categories').select('id, name'),
        supabase.from('tags').select('id, name')
      ]);
      if (catRes.data) setCategories(catRes.data);
      if (tagRes.data) setAvailableTags(tagRes.data);
    }
    seedAdminMetadata();
  }, []);

  // 3. RUN REAL-TIME SEO CRADLE SCORING ALGORITHM
  useEffect(() => {
    let score = 0;
    let warnings = [];

    if (!formData.title) {
      setSeoScore(0);
      setSeoWarnings(['Provide a primary article title framework to kick off auditing.']);
      return;
    }

    // Title Parameter Checks
    if (formData.metaTitle.length >= 50 && formData.metaTitle.length <= 60) { score += 20; }
    else { warnings.push('Meta Title length is out of optimal search boundary (50-60 characters).'); }

    // Description Parameter Checks
    if (formData.metaDescription.length >= 130 && formData.metaDescription.length <= 160) { score += 20; }
    else { warnings.push('Meta Description length is out of optimal click boundary (130-160 characters).'); }

    // Focus Keyword Density Evaluation
    if (formData.focusKeyword) {
      score += 15;
      const cleanContent = formData.content.toLowerCase();
      const keywordCount = (cleanContent.match(new RegExp(formData.focusKeyword.toLowerCase(), 'g')) || []).length;
      if (keywordCount >= 3) { score += 15; }
      else { warnings.push(`Focus Keyword density low (${keywordCount} matches). Aim for at least 3 appearances.`); }
    } else { warnings.push('Target Search Focus Keyword is missing.'); }

    // Media Alternate Parsing Checks
    if (formData.altText && formData.altText.length > 10) { score += 15; }
    else { warnings.push('Image Alternate validation text is missing or too brief for screen readers.'); }

    // Document Semantic Tag Checks
    if (formData.content.includes('<h2') || formData.content.includes('<h3')) { score += 15; }
    else { warnings.push('Semantic structure layout missing: Incorporate at least one secondary H2 or H3 anchor point.'); }

    setSeoScore(score);
    setSeoWarnings(warnings);
  }, [formData.title, formData.metaTitle, formData.metaDescription, formData.focusKeyword, formData.altText, formData.content]);

  const handleTitleChange = (e) => {
    const val = e.target.value;
    const cleanSlug = val.toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();

    setFormData(prev => ({
      ...prev,
      title: val,
      slug: cleanSlug,
      metaTitle: val.substring(0, 60)
    }));
  };

  const toggleTagSelection = (tagId) => {
    setSelectedTags(prev => 
      prev.includes(tagId) ? prev.filter(id => id !== tagId) : [...prev, tagId]
    );
  };

  const getReadingTime = (htmlText) => {
    if (!htmlText) return 1;
    const cleanText = htmlText.replace(/<[^>]*>/g, '');
    const words = cleanText.trim().split(/\s+/).length;
    return Math.max(1, Math.ceil(words / 220));
  };

  // Deprecation-proof structural block insertion engine
  const handleToolbarFormat = (tag) => {
    const selection = window.getSelection();
    if (!selection.rangeCount) return;
    
    const range = selection.getRangeAt(0);
    const selectedText = range.toString();
    
    if (selectedText.length > 0) {
      const element = document.createElement(tag);
      element.textContent = selectedText;
      range.deleteContents();
      range.insertNode(element);
    } else {
      const element = document.createElement(tag);
      element.innerHTML = '&#8203;'; // Hidden spacer element to stabilize carriage vectors
      range.insertNode(element);
    }
    
    if (editorRef.current) {
      setFormData(prev => ({ ...prev, content: editorRef.current.innerHTML }));
    }
  };

  // 4. SECURE DIMENSIONAL & WEBP SPECIFICATION PROOFING
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploadStatus('Analyzing graphic parameters...');

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function (event) {
      const imageInstance = new Image();
      imageInstance.src = event.target.result;
      
      imageInstance.onload = async function () {
        const width = this.width;
        const height = this.height;

        if (width < 1200 || height < 630) {
          alert(`🚨 PROOFING FAILURE: Featured assets must measure at least 1200×630px for high-density displays. Chosen file dimensions: ${width}×${height}px.`);
          setUploadStatus('Asset rejected: Under minimum dimensions.');
          e.target.value = ''; 
          return;
        }

        try {
          setUploadStatus('Pushing verified asset file to bucket root...');
          const fileExt = file.name.split('.').pop();
          const uniqueName = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExt}`;
          const filePath = `featured/${uniqueName}`;

          const { error: uploadError } = await supabase.storage
            .from('blog-images')
            .upload(filePath, file, { cacheControl: '3600', upsert: true });

          if (uploadError) throw uploadError;

          const { data: { publicUrl } } = supabase.storage
            .from('blog-images')
            .getPublicUrl(filePath);

          setFormData(prev => ({
            ...prev,
            featuredImage: publicUrl,
            imgWidth: width,
            imgHeight: height,
            altText: prev.altText || `${prev.title || 'EnMate Blog'} Featured Strategy Document`
          }));
          setUploadStatus('Asset verified and launched live.');
        } catch (err) {
          console.error(err);
          setUploadStatus('Authorization error processing storage array maps.');
        }
      };
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.featuredImage) {
      alert('A verified 1200x630 pixel graphic asset header is mandatory.');
      return;
    }

    setIsSubmitting(true);
    let targetSlug = formData.slug;

    try {
      // 5. INFINITE ACCIDENT SLUG COLLISION LOOP SAFEGUARD
      let absoluteUniqueFound = false;
      let counter = 0;

      while (!absoluteUniqueFound) {
        const currentCheckSlug = counter === 0 ? targetSlug : `${targetSlug}-${counter}`;
        const { data: duplicateMatch } = await supabase
          .from('blogs')
          .select('slug')
          .eq('slug', currentCheckSlug)
          .maybeSingle();

        if (!duplicateMatch) {
          targetSlug = currentCheckSlug;
          absoluteUniqueFound = true;
        } else {
          counter++;
        }
      }

      const { data: newPost, error: postError } = await supabase
        .from('blogs')
        .insert([{
          title: formData.title,
          slug: targetSlug,
          excerpt: formData.excerpt,
          content: formData.content,
          featured_image: formData.featuredImage,
          featured_image_width: formData.imgWidth,
          featured_image_height: formData.imgHeight,
          alt_text: formData.altText,
          meta_title: formData.metaTitle,
          meta_description: formData.metaDescription,
          focus_keyword: formData.focusKeyword,
          author_name: formData.authorName,
          reading_time: getReadingTime(formData.content),
          status: formData.status,
          category_id: formData.categoryId || null,
          published_at: formData.status === 'published' ? new Date().toISOString() : null
        }])
        .select()
        .single();

      if (postError) throw postError;

      if (selectedTags.length > 0 && newPost) {
        const tagJunctionRows = selectedTags.map(tagId => ({
          blog_id: newPost.id,
          tag_id: tagId
        }));
        const { error: junctionError } = await supabase
          .from('blog_tags')
          .insert(tagJunctionRows);
        if (junctionError) throw junctionError;
      }

      alert(`Success! Content fully integrated using clean dynamic URL routing address: /blog/${targetSlug}`);
      
      if (editorRef.current) editorRef.current.innerHTML = '';
      setSelectedTags([]);
      setFormData({
        title: '', slug: '', excerpt: '', content: '', focusKeyword: '',
        metaTitle: '', metaDescription: '', altText: '', authorName: 'EnMate Team',
        categoryId: '', status: 'draft', featuredImage: '', imgWidth: 0, imgHeight: 0
      });
    } catch (err) {
      alert(`Database rejected layer transaction map: ${err.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Target core pointer nodes */}
      <div id="cursor-dot" className="custom-cursor-dot" />
      <div id="cursor-ring" className="custom-cursor-ring" />

      <div className="min-h-screen bg-[#05030a] text-[var(--text-main)] pt-24 pb-12 px-4 md:px-8">
        <div className="w-full max-w-[1700px] mx-auto">
          
          <div className="mb-8 border-b border-white/5 pb-4 flex flex-wrap justify-between items-center gap-4">
            <div>
              <span className="section-tag">Internal Content CMS Control Desk</span>
              <h1 className="text-3xl md:text-4xl font-bold font-anokha gradient-text">EnMate Authority Content Composer</h1>
            </div>
            
            {/* REAL-TIME SEO INSIGHT INTERACTION CARD BLOCK */}
            <div className="bg-[#0e0a1a] border border-white/10 rounded-2xl p-4 flex items-center gap-4 shadow-lg min-w-[240px]">
              <div className="relative flex items-center justify-center">
                <svg className="w-16 h-16 transform -rotate-90">
                  <circle cx="32" cy="32" r="28" stroke="rgba(255,255,255,0.03)" strokeWidth="4" fill="transparent" />
                  <circle cx="32" cy="32" r="28" stroke={seoScore >= 80 ? '#22c55e' : seoScore >= 50 ? '#f59e0b' : '#ef4444'} strokeWidth="4" fill="transparent" 
                          strokeDasharray={2 * Math.PI * 28} strokeDashoffset={2 * Math.PI * 28 * (1 - seoScore / 100)} className="transition-all duration-500" />
                </svg>
                <span className="absolute font-mono text-sm font-bold text-white">{seoScore}</span>
              </div>
              <div className="text-left">
                <span className="text-[10px] uppercase font-bold tracking-widest text-[var(--text-muted)] block">Real-time SEO Matrix</span>
                <span className={`text-xs font-bold ${seoScore >= 80 ? 'text-green-400' : seoScore >= 50 ? 'text-amber-400' : 'text-red-400'}`}>
                  {seoScore >= 80 ? 'Production Ready' : seoScore >= 50 ? 'Needs Tweaking' : 'Optimization Required'}
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
            
            {/* LEFT INTERACTIVE FIELD COMPONENT CONTROLLER COLUMN */}
            <form onSubmit={handleSubmit} className="xl:col-span-7 bg-[#07040f]/80 border border-white/5 rounded-3xl p-6 md:p-8 space-y-6 shadow-xl backdrop-blur-xl text-left">
              
              {seoWarnings.length > 0 && (
                <div className="p-4 bg-amber-500/5 border border-amber-500/20 rounded-2xl space-y-1">
                  <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block">⚠️ Search Engine Compliance Optimization Tips:</span>
                  <ul className="list-disc pl-5 space-y-1 text-[11px] text-amber-200/70 font-light">
                    {seoWarnings.slice(0, 3).map((warn, i) => <li key={i}>{warn}</li>)}
                  </ul>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[var(--text-muted)] mb-2">Content Master Title</label>
                  <input type="text" value={formData.title} onChange={handleTitleChange} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-[var(--accent-soft)] outline-none" placeholder="e.g., Tactical Local SEO Implementation Blueprints" required />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[var(--text-muted)] mb-2">Target URL Slug Address Prefix</label>
                  <input type="text" value={formData.slug} className="w-full bg-black/20 border border-white/5 rounded-xl px-4 py-3 text-sm text-neutral-400 font-mono outline-none cursor-not-allowed" placeholder="auto-generated-slug-path" readOnly />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[var(--text-muted)] mb-2">Assign Core Category Hub</label>
                  <select value={formData.categoryId} onChange={(e) => setFormData(p => ({ ...p, categoryId: e.target.value }))} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-[var(--accent-soft)] outline-none" required>
                    <option value="">-- Choose Vertical Area Hub --</option>
                    {categories.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[var(--text-muted)] mb-2">Target Strategy Focus Keyword</label>
                  <input type="text" value={formData.focusKeyword} onChange={(e) => setFormData(p => ({ ...p, focusKeyword: e.target.value }))} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-[var(--accent-soft)] outline-none" placeholder="e.g., SEO Tips Kottakkal" required />
                </div>
              </div>

              {/* RELATIONAL TAG LINKAGE MULTI-SELECT BOX GRIDS */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[var(--text-muted)] mb-2.5">Map Relational Structural Tags Index</label>
                <div className="flex flex-wrap gap-2 bg-black/20 p-3 rounded-2xl border border-white/5">
                  {availableTags.map(tag => {
                    const isActive = selectedTags.includes(tag.id);
                    return (
                      <button type="button" key={tag.id} onClick={() => toggleTagSelection(tag.id)} className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${isActive ? 'bg-[var(--accent)] text-white border border-[var(--accent-soft)] shadow-md' : 'bg-white/5 text-neutral-400 border border-white/5 hover:border-white/10'}`}>
                        {isActive ? `✓ ${tag.name}` : `+ ${tag.name}`}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* WebP DIMENSIONAL FILTER INTERACTIVE ASSIGNMENT FIELD */}
              <div className="p-5 bg-white/[0.02] border border-dashed border-white/10 rounded-2xl">
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[var(--text-muted)] mb-3">Featured Landing Image (Mandatory: Strict WebP format | Min: 1200×630px)</label>
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <input type="file" accept=".webp" onChange={handleImageUpload} className="text-xs text-neutral-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-[var(--accent)] file:text-white" />
                  {uploadStatus && <span className="text-xs text-[var(--accent-soft)] font-medium font-mono">{uploadStatus}</span>}
                </div>
                
                {/* FIXED UX VISUALS: IMMEDIATE RETRIEVAL PREVIEW BOX NODE FRAME */}
                {formData.featuredImage && (
                  <div className="mt-4 p-2 bg-black/40 border border-white/10 rounded-xl max-w-sm">
                    <span className="text-[9px] uppercase font-bold tracking-wider text-green-400 mb-2 block">✓ Active Upload Source Asset Preview ({formData.imgWidth}×{formData.imgHeight}px)</span>
                    <img src={formData.featuredImage} alt="Live active input preview asset node instance source tracking" className="w-full aspect-[21/9] object-cover rounded-lg border border-white/5 shadow-inner" />
                  </div>
                )}
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[var(--text-muted)] mb-2">Media Alt Validation Text</label>
                <input type="text" value={formData.altText} onChange={(e) => setFormData(p => ({ ...p, altText: e.target.value }))} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-[var(--accent-soft)] outline-none" placeholder="Provide accurate alternate descriptive parameters..." required />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="flex justify-between text-[11px] font-bold uppercase tracking-wider text-[var(--text-muted)] mb-2">
                    <span>Meta Title Index</span>
                    <span className={formData.metaTitle.length >= 50 && formData.metaTitle.length <= 60 ? 'text-green-400' : 'text-amber-400'}>{formData.metaTitle.length}/60</span>
                  </label>
                  <input type="text" value={formData.metaTitle} onChange={(e) => setFormData(p => ({ ...p, metaTitle: e.target.value }))} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-[var(--accent-soft)] outline-none" required />
                </div>

                <div>
                  <label className="flex justify-between text-[11px] font-bold uppercase tracking-wider text-[var(--text-muted)] mb-2">
                    <span>Meta Description Index</span>
                    <span className={formData.metaDescription.length >= 130 && formData.metaDescription.length <= 160 ? 'text-green-400' : 'text-amber-400'}>{formData.metaDescription.length}/160</span>
                  </label>
                  <input type="text" value={formData.metaDescription} onChange={(e) => setFormData(p => ({ ...p, metaDescription: e.target.value }))} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-[var(--accent-soft)] outline-none" required />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[var(--text-muted)] mb-2">Article Brief Excerpt Summary</label>
                <textarea value={formData.excerpt} onChange={(e) => setFormData(p => ({ ...p, excerpt: e.target.value }))} rows={2} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-[var(--accent-soft)] outline-none resize-none" placeholder="Summary snippet for main listings card layout blocks..." required />
              </div>

              {/* WORD PROCESSING SELECTION TRACKING ENGINE TRAY */}
              <div className="flex flex-col border border-white/10 rounded-2xl overflow-hidden bg-black/20">
                <div className="editor-toolbar flex flex-wrap items-center gap-1 p-2 bg-neutral-900/90 border-b border-white/10">
                  <button type="button" onClick={() => handleToolbarFormat('h2')} className="px-3 py-1.5 rounded bg-white/5 hover:bg-[var(--accent)] text-xs font-bold text-white transition-all">[H2]</button>
                  <button type="button" onClick={() => handleToolbarFormat('h3')} className="px-3 py-1.5 rounded bg-white/5 hover:bg-[var(--accent)] text-xs font-bold text-white transition-all">[H3]</button>
                  <button type="button" onClick={() => handleToolbarFormat('p')} className="px-3 py-1.5 rounded bg-white/5 hover:bg-[var(--accent)] text-xs font-bold text-white transition-all">[P]</button>
                  <div className="w-px h-5 bg-white/10 mx-1"></div>
                  <button type="button" onClick={() => { document.execCommand('bold'); }} className="px-3 py-1.5 rounded bg-white/5 hover:bg-[var(--accent)] text-xs font-bold text-white transition-all"><i className="fas fa-bold"></i></button>
                  <button type="button" onClick={() => { document.execCommand('italic'); }} className="px-3 py-1.5 rounded bg-white/5 hover:bg-[var(--accent)] text-xs italic text-white transition-all"><i className="fas fa-italic"></i></button>
                </div>

                <div 
                  ref={editorRef}
                  contentEditable={true}
                  onInput={() => setFormData(prev => ({ ...prev, content: editorRef.current.innerHTML }))}
                  className="w-full min-h-[350px] max-h-[600px] overflow-y-auto p-4 bg-black/40 text-sm text-neutral-200 outline-none focus:ring-1 focus:ring-[var(--accent-soft)] blog-rich-surface font-sans leading-relaxed text-left"
                  placeholder="Type natively. Highlight text streams to bind top styles matrix anchors smoothly..."
                  style={{ WebkitUserSelect: 'text', userSelect: 'text' }}
                />
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/5">
                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2 text-xs text-neutral-300 font-medium cursor-pointer">
                    <input type="radio" name="status" value="draft" checked={formData.status === 'draft'} onChange={() => setFormData(p => ({ ...p, status: 'draft' }))} className="accent-[var(--accent)]" /> Keep Draft
                  </label>
                  <label className="flex items-center gap-2 text-xs text-neutral-300 font-medium cursor-pointer">
                    <input type="radio" name="status" value="published" checked={formData.status === 'published'} onChange={() => setFormData(p => ({ ...p, status: 'published' }))} className="accent-[var(--accent)]" /> Publish Live
                  </label>
                </div>

                <button type="submit" disabled={isSubmitting} className="btn btn-primary text-xs uppercase tracking-wider font-bold px-8 py-3 disabled:opacity-50">
                  {isSubmitting ? 'Syncing Tables...' : 'Execute Data Injection'}
                </button>
              </div>
            </form>

            {/* RIGHT COLUMN: HIGH-FIDELITY LIVE RECONSTRUCT PREVIEW CANVAS */}
            <aside className="xl:col-span-5 bg-[#040208]/90 border border-white/5 rounded-3xl p-6 lg:p-8 lg:sticky lg:top-24 h-auto max-h-[85vh] overflow-y-auto shadow-2xl text-left hidden xl:block">
              <span className="text-[10px] font-bold text-[var(--accent-soft)] uppercase tracking-widest block mb-4 border-b border-white/5 pb-2">✨ Live Workspace Canvas Preview Rendering</span>
              
              {formData.title ? (
                <article className="space-y-6">
                  <div>
                    <span className="text-[11px] font-bold bg-white/5 px-3 py-1 rounded-full text-[var(--accent-soft)] border border-white/5 uppercase tracking-wider">
                      {categories.find(c => c.id === formData.categoryId)?.name || 'Unassigned Hub'}
                    </span>
                    <h1 className="text-2xl font-bold font-anokha mt-4 leading-tight text-white">{formData.title}</h1>
                    
                    {selectedTags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {selectedTags.map(id => (
                          <span key={id} className="text-[9px] font-mono text-[var(--text-muted)] bg-white/5 border border-white/5 px-2 py-0.5 rounded-md">
                            #{availableTags.find(t => t.id === id)?.name}
                          </span>
                        ))}
                      </div>
                    )}
                    
                    <div className="text-[11px] text-neutral-400 font-mono mt-3">
                      <span>By {formData.authorName}</span> • <span>{getReadingTime(formData.content)} min read optimization</span>
                    </div>
                  </div>

                  {formData.featuredImage && (
                    <div className="w-full aspect-[21/9] rounded-xl overflow-hidden border border-white/10 bg-neutral-900">
                      <img src={formData.featuredImage} alt="Preview" className="w-full h-full object-cover" />
                    </div>
                  )}

                  {formData.excerpt && (
                    <div className="p-4 bg-white/[0.02] border-l-2 border-[var(--accent-soft)] rounded-r-xl text-xs text-neutral-300 italic leading-relaxed">
                      {formData.excerpt}
                    </div>
                  )}

                  <div 
                    className="prose prose-invert max-w-none text-xs text-neutral-300 space-y-4 leading-relaxed font-light font-sans border-t border-white/5 pt-4 blog-rich-surface"
                    dangerouslySetInnerHTML={{ __html: formData.content || '<p className="text-neutral-500 font-mono italic">[Body stream visualization text layers will compile dynamically here...]</p>' }}
                  />
                </article>
              ) : (
                <div className="h-48 flex flex-col items-center justify-center text-center text-neutral-500 font-mono text-xs">
                  <i className="fas fa-file-signature text-2xl mb-2 text-neutral-600"></i>
                  <span>Populate field items on the form configuration arrays to compile live preview data sets...</span>
                </div>
              )}
            </aside>

          </div>
        </div>
      </div>
    </>
  );
}