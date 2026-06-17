'use client';

import React, { useState, useEffect, useRef } from 'react';

export default function AboutPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const toggleMenu = () => setIsMenuOpen(prevState => !prevState);

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
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('is-visible');
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('.reveal-on-scroll').forEach(target => observer.observe(target));
    return () => observer.disconnect();
  }, []);

  const whatsappUrl = "https://wa.me/917510514464?text=Hi%20👋,%20I%20visited%20the%20EnMate%20About%20Page.";

  return (
    <>
      <div id="cursor-dot" className="custom-cursor-dot" />
      <div id="cursor-ring" className="custom-cursor-ring" />

      <div className="min-h-screen w-full bg-cover bg-fixed bg-center bg-no-repeat bg-[url('/images/bg-images/home-mobile-bg.webp')] md:bg-[url('/images/bg-images/home-lap-bg.webp')]">
        <div className="min-h-screen w-full bg-gradient-to-b from-[#05030a]/45 via-[#05030a]/30 to-[#0b0410]/45">

          <header className="main-header" ref={menuRef}>
            <div className="container nav-flex">
              <a href="/" className="logo-container">
                <img src="/logos/site-logo.png" alt="EnMate Logo" className="logo-img" />
                <span className="logo-text font-anokha">EnMate</span>
              </a>

              <nav className="navbar">
                <ul className={`nav-menu ${isMenuOpen ? 'active !flex' : 'hidden lg:flex'}`}>
                  <li><a href="/">Home</a></li>
                  <li><a href="/#services">Services</a></li>
                  <li><a href="#" className="text-[var(--accent-soft)]">About Us</a></li>
                  <li><a href="/blog">Blog</a></li>
                  <li className="nav-cta-mobile flex justify-center mt-4">
                    <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary text-center text-xs font-bold tracking-wider" style={{ paddingLeft: '45px', paddingRight: '45px', paddingTop: '12px', paddingBottom: '12px' }}>Connect Us</a>
                  </li>
                </ul>
              </nav>

              <div className="header-actions">
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary nav-cta-desktop">Connect Us</a>
                <button className={`menu-toggle ${isMenuOpen ? 'is-active' : ''}`} onClick={toggleMenu} aria-label="Toggle Navigation">
                  <span className="bar"></span><span className="bar"></span><span className="bar"></span>
                </button>
              </div>
            </div>
          </header>

          <main className="pt-28 md:pt-36">
            <section className="py-12">
              <div className="container">
                <div className="max-w-[800px] mb-16 reveal-on-scroll">
                  <span className="section-tag">Based in Kottakkal, Kerala, India | Serving Clients Locally & Worldwide</span>
                  <h1 className="mb-6"><span className="font-anokha gradient-text">Next-Gen</span> Growth Systems</h1>
                  <p className="text-sm md:text-base text-[var(--text-main)] mb-4 leading-relaxed">
                    Born to rewrite the rules of performance branding, EnMate was founded on a simple truth: businesses don't need pretty, passive portfolios—they need high-converting digital acquisition funnels.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20 reveal-on-scroll tag-1">
                  <div className="p-6 bg-[var(--card-bg)] border border-[var(--card-border)] rounded-2xl transition-all duration-300 hover:border-[var(--accent-soft)] hover:shadow-[0_0_25px_rgba(207,4,102,0.2)]">
                    <span className="text-[var(--accent-soft)] text-xl font-bold block mb-2">01 / Innovation</span>
                    <p className="text-xs text-[var(--text-muted)] leading-relaxed">We build native, fast-loading, state-of-the-art web architectures that maximize modern SEO visibility algorithms perfectly.</p>
                  </div>
                  <div className="p-6 bg-[var(--card-bg)] border border-[var(--card-border)] rounded-2xl transition-all duration-300 hover:border-[var(--accent-soft)] hover:shadow-[0_0_25px_rgba(207,4,102,0.2)]">
                    <span className="text-[var(--accent-soft)] text-xl font-bold block mb-2">02 / Aesthetics</span>
                    <p className="text-xs text-[var(--text-muted)] leading-relaxed">Every configuration layout, typography selection, and interface sheen we release is tailored to look premium and project absolute industry authority.</p>
                  </div>
                  <div className="p-6 bg-[var(--card-bg)] border border-[var(--card-border)] rounded-2xl transition-all duration-300 hover:border-[var(--accent-soft)] hover:shadow-[0_0_25px_rgba(207,4,102,0.2)]">
                    <span className="text-[var(--accent-soft)] text-xl font-bold block mb-2">03 / Integrity</span>
                    <p className="text-xs text-[var(--text-muted)] leading-relaxed">No vanity metrics or bloated code bases. We track, evaluate, and deliver hard conversion milestones built purely on performance data.</p>
                  </div>
                </div>
              </div>
            </section>
          </main>
        </div>
      </div>
    </>
  );
}