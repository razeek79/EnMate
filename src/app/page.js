'use client';

import React, { useState, useEffect, useRef } from 'react';

export default function HomePage() {
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

    const addHoverListeners = () => {
      document.querySelectorAll('a, button, .service-card, .btn').forEach(item => {
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

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('is-visible');
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('.reveal-on-scroll').forEach(target => observer.observe(target));
    return () => observer.disconnect();
  }, []);

  const whatsappUrl = "https://wa.me/917510514464?text=Hi%20👋,%20I%20found%20EnMate%20online.%20I%20want%20to%20scale%20our%20business%20with%20the%20best%20digital%20marketing%20services.";

  return (
    <>
      <div id="cursor-dot" className="custom-cursor-dot" />
      <div id="cursor-ring" className="custom-cursor-ring" />

      <div className="min-h-screen w-full bg-cover bg-fixed bg-center bg-no-repeat bg-[url('/images/bg-images/home-mobile-bg.webp')] md:bg-[url('/images/bg-images/home-lap-bg.webp')]">
        <div className="min-h-screen w-full bg-gradient-to-b from-[#05030a]/45 via-[#05030a]/30 to-[#0b0410]/45">

          <header className="main-header" ref={menuRef}>
            <div className="container nav-flex">
              <a href="#" className="logo-container">
                <img src="/logos/site-logo.png" alt="EnMate Logo" className="logo-img" />
                <span className="logo-text font-anokha">EnMate</span>
              </a>

              <nav className="navbar">
                <ul className={`nav-menu ${isMenuOpen ? 'active !flex' : 'hidden lg:flex'}`}>
                  <li><a href="#home" onClick={() => setIsMenuOpen(false)}>Home</a></li>
                  <li><a href="#services" onClick={() => setIsMenuOpen(false)}>Services</a></li>
                  <li><a href="/about">About Us</a></li>
                  <li><a href="/blog" className="text-[var(--accent-soft)]">Blog</a></li> {/* Updated Route link map */}
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

          <main>
            <section id="home" className="hero">
              <div className="container">
                <div className="max-w-[850px] reveal-on-scroll">
                  <span className="badge">Based in Kottakkal, Kerala, India | Serving Clients Locally & Worldwide</span>
                  <h1>
                    <span className="font-anokha gradient-text">EnMate</span>{' '}
                    <span className="hero-light">Worldwide Digital Marketing Service</span>
                  </h1>
                  <p className="hero-subtitle">Premium Digital Assets Engineered for Market Dominance</p>
                  <p className="hero-description">
                    We don't just run standard ad campaigns; We engineer high-performance conversion funnels, custom web apps, search engine optimization visibility models, and premium visual branding systems designed to capture audience intent and scale your business operations globally.
                  </p>
                  <div className="hero-btns">
                    <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary">Connect Us</a>
                    <a href="#services" className="btn btn-outline">Explore Services</a>
                  </div>
                </div>
              </div>
            </section>

            <section id="services" className="services-section">
              <div className="container">
                <div className="text-center mb-16 reveal-on-scroll">
                  <span className="section-tag">Our Services</span>
                  <h2 className="section-title">Digital Solutions Built to Grow Modern Businesses</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                  <div className="service-card reveal-on-scroll stagger-1"><div className="card-content"><div className="icon"><i className="fas fa-laptop-code"></i></div><h3>Website Development</h3><p>Custom business websites, landing pages, and web applications designed for performance, credibility, lead generation, and long-term scalability.</p></div></div>
                  <div className="service-card reveal-on-scroll stagger-2"><div className="card-content"><div className="icon"><i className="fas fa-palette"></i></div><h3>Branding & Graphic Design</h3><p>Professional branding, visual identity systems, marketing materials, and creative designs that establish a premium brand presence.</p></div></div>
                  <div className="service-card reveal-on-scroll stagger-3"><div className="card-content"><div className="icon"><i className="fas fa-chart-line"></i></div><h3>Digital Marketing & Growth</h3><p>Social media management, content strategy, growth planning, and data-driven ad campaigns focused on customer acquisition and revenue expansion.</p></div></div>
                  <div className="service-card reveal-on-scroll stagger-1"><div className="card-content"><div className="icon"><i className="fas fa-video"></i></div><h3>Video & Creative Production</h3><p>Cinematic promotional ads, social media reels, and high-impact motion graphics designed to engage modern audiences.</p></div></div>
                  <div className="service-card reveal-on-scroll stagger-2"><div className="card-content"><div className="icon"><i className="fas fa-diagram-project"></i></div><h3>Business Systems & Portals</h3><p>Custom employee management portals, internal workflow structures, and automated frameworks built to optimize business operations.</p></div></div>
                  <div className="service-card reveal-on-scroll stagger-3"><div className="card-content"><div className="icon"><i className="fas fa-globe"></i></div><h3>Business Presence & Support</h3><p>Google Business Profile optimization, continuous SEO enhancements, and dedicated technical support to keep your digital infrastructure ahead of competitors.</p></div></div>
                </div>
              </div>
            </section>
          </main>

          <footer className="footer">
            <div className="container footer-grid">
              <div className="footer-brand">
                <span className="font-anokha footer-logo">EnMate</span>
                <p>EnMate – Premium performance growth structures and full-stack system software solutions serving clients locally and worldwide.</p>
                <p className="footer-global">Location: Kottakkal, Kerala, India 🇮🇳 | Globally Distributed 🌍</p>
                <p className="text-sm text-[var(--text-muted)] mt-2"><i className="fas fa-envelope mr-2 text-[var(--accent-soft)]"></i> contact@enmate.in<br /><i className="fas fa-phone mr-2 text-[var(--accent-soft)]"></i> +91 75105 14464</p>
              </div>
              <div className="footer-nav">
                <h6>Core Operations</h6>
                <ul className="footer-links">
                  <li><a href="#services">Digital Marketing</a></li>
                  <li><a href="#services">SEO Optimization</a></li>
                  <li><a href="#services">Web Architecture</a></li>
                </ul>
              </div>
              <div className="footer-nav">
                <h6>Company Insights</h6>
                <ul className="footer-links">
                  <li><a href="/about">Meet the Team</a></li>
                  <li><a href="/blog">Our Publications</a></li>
                </ul>
              </div>
            </div>
            <div className="copyright">&copy; {new Date().getFullYear()} <span className="font-anokha">EnMate</span> Digital Marketing Agency. All rights reserved.</div>
          </footer>

        </div>
      </div>
    </>
  );
}