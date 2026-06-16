'use client';

import React, { useState, useEffect, useRef } from 'react';

export default function AboutPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const toggleMenu = () => setIsMenuOpen(prevState => !prevState);

  // Custom Cursor Script Mount Loop
  useEffect(() => {
    const dot = document.getElementById('cursor-dot');
    const ring = document.getElementById('cursor-ring');
    if (!dot || !ring) return;

    let mouseX = 0;
    let mouseY = 0;
    let ringX = 0;
    let ringY = 0;

    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.left = `${mouseX}px`;
      dot.style.top = `${mouseY}px`;

      const cards = document.querySelectorAll('.service-card');
      cards.forEach(card => {
        const rect = card.getBoundingClientRect();
        const cardX = e.clientX - rect.left;
        const cardY = e.clientY - rect.top;
        card.style.setProperty('--mouse-x', `${cardX}px`);
        card.style.setProperty('--mouse-y', `${cardY}px`);
      });
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

    const addHoverListeners = () => {
      const clickables = document.querySelectorAll('a, button, .service-card, .btn');
      clickables.forEach(item => {
        item.addEventListener('mouseenter', onMouseEnterLink);
        item.addEventListener('mouseleave', onMouseLeaveLink);
      });
    };

    window.addEventListener('mousemove', onMouseMove);
    const animId = requestAnimationFrame(tick);
    addHoverListeners();

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(animId);
    };
  }, []);

  // Scroll Observer
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    const targets = document.querySelectorAll('.reveal-on-scroll');
    targets.forEach(target => observer.observe(target));
    return () => targets.forEach(target => observer.unobserve(target));
  }, []);

  const whatsappUrl = "https://wa.me/917510514464?text=Hi%20👋,%20I%20visited%20the%20EnMate%20About%20Page.%20I%20would%20like%20to%20consult%20with%20your%20expert%20team.";

  return (
    <>
      <div id="cursor-dot" className="custom-cursor-dot" />
      <div id="cursor-ring" className="custom-cursor-ring" />

      <div className="min-h-screen w-full bg-cover bg-fixed bg-center bg-no-repeat bg-[url('/images/bg-images/home-mobile-bg.webp')] md:bg-[url('/images/bg-images/home-lap-bg.webp')]">
        <div className="min-h-screen w-full bg-gradient-to-b from-[#05030a]/45 via-[#05030a]/30 to-[#0b0410]/45">

          {/* Header */}
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
                  <li><a href="/#process">Process</a></li>
                  <li className="nav-cta-mobile flex justify-center mt-4">
                    <a 
                      href={whatsappUrl} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="btn btn-primary text-center text-xs font-bold tracking-wider"
                      style={{ paddingLeft: '45px', paddingRight: '45px', paddingTop: '12px', paddingBottom: '12px' }}
                    >
                      Connect Us
                    </a>
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
                  <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                    We bridge the absolute highest standard of custom web architecture with tactical search engine optimization model engineering. From local regional ecosystems to multi-national operations, we scale enterprises by designing robust business infrastructures that consistently generate real traffic, high-intent client pipelines, and unparalleled visual credibility.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20 reveal-on-scroll stagger-1">
                  <div className="p-6 bg-[var(--card-bg)] border border-[var(--card-border)] rounded-2xl transition-all duration-300 hover:border-[var(--accent-soft)] hover:shadow-[0_0_25px_rgba(207,4,102,0.2)]">
                    <span className="text-[var(--accent-soft)] text-xl font-bold block mb-2">01 / Innovation</span>
                    <p className="text-xs text-[var(--text-muted)] leading-relaxed">We bypass outdated frameworks completely. We build native, fast-loading, state-of-the-art web architectures that maximize modern SEO visibility algorithms perfectly.</p>
                  </div>
                  <div className="p-6 bg-[var(--card-bg)] border border-[var(--card-border)] rounded-2xl transition-all duration-300 hover:border-[var(--accent-soft)] hover:shadow-[0_0_25px_rgba(207,4,102,0.2)]">
                    <span className="text-[var(--accent-soft)] text-xl font-bold block mb-2">02 / Aesthetics</span>
                    <p className="text-xs text-[var(--text-muted)] leading-relaxed">First impressions matter. Every configuration layout, typo setting, and interface sheen we release is tailored to look premium and project absolute industry authority.</p>
                  </div>
                  <div className="p-6 bg-[var(--card-bg)] border border-[var(--card-border)] rounded-2xl transition-all duration-300 hover:border-[var(--accent-soft)] hover:shadow-[0_0_25px_rgba(207,4,102,0.2)]">
                    <span className="text-[var(--accent-soft)] text-xl font-bold block mb-2">03 / Integrity</span>
                    <p className="text-xs text-[var(--text-muted)] leading-relaxed">No vanity metrics, no hidden fine-print, and no bloated plugins. We track, evaluate, and deliver hard conversion milestones built purely on performance data.</p>
                  </div>
                </div>

                <div className="mb-12 reveal-on-scroll stagger-2">
                  <div className="text-center md:text-left mb-12">
                    <span className="section-tag">The Masters Behind EnMate</span>
                    <h2 className="section-title">The Strategic Mindset Matrix</h2>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                    <div className="service-card group relative overflow-hidden">
                      <div className="card-content">
                        <div className="w-12 h-12 bg-gradient-to-br from-[var(--accent)] to-[var(--accent-dark)] flex items-center justify-center rounded-xl mb-4 group-hover:rotate-6 transition-transform">
                          <i className="fas fa-crown text-lg text-white"></i>
                        </div>
                        <h3 className="text-lg font-bold">Razeek Fariz</h3>
                        <span className="text-xs font-bold text-[var(--accent-soft)] uppercase tracking-wider block mb-2">Founder & CEO</span>
                        <p className="text-xs text-[var(--text-muted)] leading-relaxed">Architecting high-level brand strategies, engineering cross-platform digital sales engines, and leading enterprise execution metrics across local and global markets.</p>
                      </div>
                    </div>
                    <div className="service-card group relative overflow-hidden">
                      <div className="card-content">
                        <div className="w-12 h-12 bg-gradient-to-br from-[var(--accent)] to-[var(--accent-dark)] flex items-center justify-center rounded-xl mb-4 group-hover:rotate-6 transition-transform">
                          <i className="fas fa-bezier-curve text-lg text-white"></i>
                        </div>
                        <h3 className="text-lg font-bold">Muhammed Hanoon</h3>
                        <span className="text-xs font-bold text-[var(--accent-soft)] uppercase tracking-wider block mb-2">Creative Designer</span>
                        <p className="text-xs text-[var(--text-muted)] leading-relaxed">Crafting premium aesthetic visual brand languages, custom user interface design systems, and distinct typography layouts that help businesses stand out globally.</p>
                      </div>
                    </div>
                    <div className="service-card group relative overflow-hidden">
                      <div className="card-content">
                        <div className="w-12 h-12 bg-gradient-to-br from-[var(--accent)] to-[var(--accent-dark)] flex items-center justify-center rounded-xl mb-4 group-hover:rotate-6 transition-transform">
                          <i className="fas fa-bullseye text-lg text-white"></i>
                        </div>
                        <h3 className="text-lg font-bold">Sahina</h3>
                        <span className="text-xs font-bold text-[var(--accent-soft)] uppercase tracking-wider block mb-2">Digital Marketing Strategist</span>
                        <p className="text-xs text-[var(--text-muted)] leading-relaxed">Formulating targeted performance marketing funnels, search marketing scalability workflows, data analytics configurations, and continuous user acquisition growth campaigns.</p>
                      </div>
                    </div>
                    <div className="service-card group relative overflow-hidden">
                      <div className="card-content">
                        <div className="w-12 h-12 bg-gradient-to-br from-[var(--accent)] to-[var(--accent-dark)] flex items-center justify-center rounded-xl mb-4 group-hover:rotate-6 transition-transform">
                          <i className="fas fa-clapperboard text-lg text-white"></i>
                        </div>
                        <h3 className="text-lg font-bold">Muhammed Najad</h3>
                        <span className="text-xs font-bold text-[var(--accent-soft)] uppercase tracking-wider block mb-2">Video Editor & Motion Designer</span>
                        <p className="text-xs text-[var(--text-muted)] leading-relaxed">Directing cinematic commercial content reels, conversion-focused promotional ads, complex motion graphic architectures, and viral-ready media distributions.</p>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </section>
          </main>

          {/* Footer Ecosystem */}
          <footer className="footer">
            <div className="container footer-grid">
              <div className="footer-brand">
                <span className="font-anokha footer-logo">EnMate</span>
                <p>EnMate – Premium performance growth structures and full-stack system software solutions serving clients locally and worldwide.</p>
                <p className="footer-global">Location: Kottakkal, Kerala, India 🇮🇳 | Globally Distributed 🌍</p>
                <p className="text-sm text-[var(--text-muted)] mt-2">
                  <i className="fas fa-envelope mr-2 text-[var(--accent-soft)]"></i> contact@enmate.in<br />
                  <i className="fas fa-phone mr-2 text-[var(--accent-soft)]"></i> +91 75105 14464
                </p>
                <div className="footer-socials">
                  <a href="#" className="remove-link-underline"><i className="fab fa-instagram"></i></a>
                  <a href="#" className="remove-link-underline"><i className="fab fa-linkedin-in"></i></a>
                  <a href="#" className="remove-link-underline"><i className="fab fa-x-twitter"></i></a>
                </div>
              </div>
              <div className="footer-nav">
                <h6>Core Operations</h6>
                <ul className="footer-links">
                  <li><a href="/#services">Digital Marketing</a></li>
                  <li><a href="/#services">SEO & Discoverability</a></li>
                  <li><a href="/#services">Web Architecture</a></li>
                </ul>
              </div>
              <div className="footer-nav">
                <h6>Company Info</h6>
                <ul className="footer-links">
                  <li><a href="/">Home Base</a></li>
                  <li><a href="#">Our Team</a></li>
                  <li><a href="/#process">Our Flow</a></li>
                </ul>
              </div>
            </div>
            <div className="copyright">
              &copy; {new Date().getFullYear()} <span className="font-anokha">EnMate</span> Digital Marketing Agency. All rights reserved.
            </div>
          </footer>

        </div>
      </div>
    </>
  );
}