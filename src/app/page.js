'use client';

import React, { useState, useEffect, useRef } from 'react';


function CountUp({ end, suffix = '', duration = 1400 }) {
  const [value, setValue] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const start = performance.now();
        const animate = (now) => {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setValue(Math.floor(eased * end));
          if (progress < 1) requestAnimationFrame(animate);
          else setValue(end);
        };
        requestAnimationFrame(animate);
      }
    }, { threshold: 0.4 });
    observer.observe(node);
    return () => observer.disconnect();
  }, [end, duration]);

  return <span ref={ref}>{value}{suffix}</span>;
}

export default function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const toggleMenu = () => setIsMenuOpen(prevState => !prevState);

  // 🛠️ PATH A INTEGRATION: IMMEDIATE INVITATION HASH INTERCEPTOR
  useEffect(() => {
    if (window.location.hash && (window.location.hash.includes('type=invite') || window.location.hash.includes('type=recovery') || window.location.hash.includes('access_token='))) {
      window.location.href = `/auth/confirm${window.location.hash}`;
    }
  }, []);

  // 1. DYNAMIC MOUSE-TRACKING ACCENT GLOW + 3D TILT CONTROLLER
  useEffect(() => {
    const handleMouseMove = (e) => {
      const cards = document.querySelectorAll('.service-card');
      cards.forEach(card => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);

        // ─── 3D TILT (Option A) ───
        const isInside = x >= 0 && x <= rect.width && y >= 0 && y <= rect.height;
        if (isInside) {
          const centerX = rect.width / 2;
          const centerY = rect.height / 2;
          const rotateX = ((y - centerY) / centerY) * -6;
          const rotateY = ((x - centerX) / centerX) * 6;
          card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px) scale(1.01)`;
        } else {
          card.style.transform = '';
        }
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

    // Reset tilt cleanly when the mouse leaves a card
    const onCardLeave = (e) => {
      e.currentTarget.style.transform = '';
    };

    const addHoverListeners = () => {
      document.querySelectorAll('a, button, .service-card, .btn').forEach(item => {
        item.addEventListener('mouseenter', onMouseEnterLink);
        item.addEventListener('mouseleave', onMouseLeaveLink);
      });
      document.querySelectorAll('.service-card').forEach(card => {
        card.addEventListener('mouseleave', onCardLeave);
      });
    };

    window.addEventListener('mousemove', onMouseMove);
    const animId = requestAnimationFrame(tick);
    addHoverListeners();

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(animId);
      document.querySelectorAll('.service-card').forEach(card => {
        card.removeEventListener('mouseleave', onCardLeave);
      });
    };
  }, []);

  // 2. PREMIUM SCROLL REVEAL INTERSECTION CONTROLLER
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      });
    }, { 
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    const targets = document.querySelectorAll('.reveal-on-scroll');
    targets.forEach(target => observer.observe(target));

    return () => observer.disconnect();
  }, []);

  const whatsappUrl = "https://wa.me/918138881132?text=Hi%20👋,%20I%20found%20EnMate%20online.%20I%20want%20to%20scale%20our%20business%20with%20the%20best%20digital%20marketing%20services.";

  return (
    <>
      {/* Dynamic Cursor Nodes */}
      <div id="cursor-dot" className="custom-cursor-dot" />
      <div id="cursor-ring" className="custom-cursor-ring" />

      <div className="min-h-screen w-full bg-cover bg-fixed bg-center bg-no-repeat bg-[url('/images/bg-images/home-mobile-bg.webp')] md:bg-[url('/images/bg-images/home-lap-bg.webp')]">
        <div className="min-h-screen w-full bg-gradient-to-b from-[#05030a]/45 via-[#05030a]/30 to-[#0b0410]/45">

          {/* Fixed Header Navbar Layout */}
          <header className="main-header" ref={menuRef}>
            <div className="container nav-flex">
              <a href="#" className="logo-container">
                <img src="/logos/site-logo.png" alt="EnMate Logo" className="logo-img" />
                <span className="logo-text font-anokha">EnMate</span>
              </a>

              <nav className="navbar">
                <ul className={`nav-menu ${isMenuOpen ? 'active !flex' : 'hidden lg:flex'}`}>
                  <li><a href="#home" onClick={() => setIsMenuOpen(false)}>Home</a></li>
                  <li><a href="/services" onClick={() => setIsMenuOpen(false)}>Services</a></li>
                  <li><a href="/about">About Us</a></li>
                  <li><a href="/blog" onClick={() => setIsMenuOpen(false)}>Blog</a></li>
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

          <main>
            {/* Hero Section */}
            <section id="home" className="hero">
              <div className="container">
                <div className="max-w-[850px] reveal-on-scroll">
                  <span className="badge">Based in Kottakkal, Kerala, India | Serving Clients Locally & Worldwide</span>
                  <h1>
                    <span className="font-anokha gradient-text">EnMate</span>{' '}
                    <span className="hero-light">
                      {"Worldwide Digital Marketing Service".split(' ').map((word, i) => (
                        <span className="word-reveal-wrap" key={i}>
                          <span
                            className="word-reveal"
                            style={{ animationDelay: `${0.15 + i * 0.08}s` }}
                          >
                            {word}&nbsp;
                          </span>
                        </span>
                      ))}
                    </span>
                  </h1>
                  <p className="hero-subtitle hero-fade-in" style={{ animationDelay: '0.6s' }}>Premium Digital Assets Engineered for Market Dominance</p>
                  <p className="hero-description hero-fade-in" style={{ animationDelay: '0.75s' }}>
                    We don't just run standard ad campaigns; We engineer high-performance conversion funnels, custom web apps, search engine optimization visibility models, and premium visual branding systems designed to capture audience intent and scale your business operations globally.
                  </p>
                  <div className="hero-btns hero-fade-in" style={{ animationDelay: '0.9s' }}>
                    <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary">Connect Us</a>
                    <a href="#services" className="btn btn-outline">Explore Services</a>
                  </div>
                </div>
              </div>
            </section>

            {/* Services Matrix Section */}
            <section id="services" className="services-section">
              <div className="container">
                <div className="text-center mb-16 reveal-on-scroll">
                  <span className="section-tag">Our Services</span>
                  <h2 className="section-title">Digital Solutions Built to Grow Modern Businesses</h2>
                  <p className="text-[var(--text-muted)] max-w-[750px] mx-auto text-sm md:text-base leading-relaxed">
                    From custom website development and branding identity layouts to performance marketing, business automation systems, and video production, EnMate delivers end-to-end solutions that help brands build credibility and scale with confidence.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                  <div className="service-card reveal-on-scroll stagger-1">
                    <div className="curtain-panel"></div>
                    <div className="card-content">
                      <div className="icon"><i className="fas fa-laptop-code"></i></div>
                      <h3>Website Development</h3>
                      <p>Custom business websites, landing pages, and web applications designed for performance, credibility, lead generation, and long-term scalability.</p>
                    </div>
                  </div>
                  <div className="service-card reveal-on-scroll stagger-2">
                    <div className="curtain-panel"></div>
                    <div className="card-content">
                      <div className="icon"><i className="fas fa-palette"></i></div>
                      <h3>Branding & Graphic Design</h3>
                      <p>Professional branding, visual identity systems, marketing materials, and creative designs that establish a premium brand presence.</p>
                    </div>
                  </div>
                  <div className="service-card reveal-on-scroll stagger-3">
                    <div className="curtain-panel"></div>
                    <div className="card-content">
                      <div className="icon"><i className="fas fa-chart-line"></i></div>
                      <h3>Digital Marketing & Growth</h3>
                      <p>Social media management, content strategy, growth planning, and data-driven ad campaigns focused on customer acquisition and revenue expansion.</p>
                    </div>
                  </div>
                  <div className="service-card reveal-on-scroll stagger-1">
                    <div className="curtain-panel"></div>
                    <div className="card-content">
                      <div className="icon"><i className="fas fa-video"></i></div>
                      <h3>Video & Creative Production</h3>
                      <p>Cinematic promotional ads, social media reels, and high-impact motion graphics designed to engage modern audiences.</p>
                    </div>
                  </div>
                  <div className="service-card reveal-on-scroll stagger-2">
                    <div className="curtain-panel"></div>
                    <div className="card-content">
                      <div className="icon"><i className="fas fa-diagram-project"></i></div>
                      <h3>Business Systems & Portals</h3>
                      <p>Custom employee management portals, internal workflow structures, and automated frameworks built to optimize business operations.</p>
                    </div>
                  </div>
                  <div className="service-card reveal-on-scroll stagger-3">
                    <div className="curtain-panel"></div>
                    <div className="card-content">
                      <div className="icon"><i className="fas fa-globe"></i></div>
                      <h3>Business Presence & Support</h3>
                      <p>Google Business Profile optimization, continuous SEO enhancements, and dedicated technical support to keep your digital infrastructure ahead of competitors.</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* ─── ADVANCED PROCESS BLOCK SECTION ─── */}
            <section id="process" className="process-advanced">
              <div className="container">
                <div className="process-wrapper reveal-on-scroll">
                  
                  <div className="process-left">
                    <span className="section-tag">How We Execute</span>
                    <h2>Our 3-Step Execution Framework</h2>
                  </div>

                  <div className="process-right">
                    <div className="process-step">
                      <span>01. Strategy</span>
                      <p>Deep tactical market research, audience search intent mapping, and high-converting structural target layouts before typing a line of code.</p>
                    </div>
                    <div className="process-step">
                      <span>02. Design</span>
                      <p>Crafting custom premium visuals, fast response interfaces, and high-performance system dashboards structured cleanly for absolute growth optimization.</p>
                    </div>
                    <div className="process-step">
                      <span>03. Growth</span>
                      <p>Deploying automated data tracking metrics, rigorous SEO search engine visibility indexing layers, and scalable ad campaign matrices to lock in market authority.</p>
                    </div>
                  </div>

                </div>
              </div>
            </section>

            {/* Homepage About Summary Section */}
            <section id="about-summary" className="py-16 md:py-24 relative overflow-hidden">
              <div className="container">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center reveal-on-scroll">
                  <div className="lg:col-span-7 text-left">
                    <span className="section-tag">Who We Are</span>
                    <h2 className="section-title">The Brains Driving Global Growth</h2>
                    <p className="text-sm md:text-base text-[var(--text-main)] mb-4 leading-relaxed">
                      EnMate is a high-performance digital marketing agency bridging localized regional authority in Kottakkal with scalable worldwide marketing operations. We don't just execute basic setups; we build custom, high-speed digital architectures designed to win market dominance.
                    </p>
                    <p className="text-sm text-[var(--text-muted)] mb-6 leading-relaxed">
                      Our unified mission is simple: to transform ambitious brands into highly visible market leaders through rigorous optimization, elite creative layouts, and absolute engineering transparency.
                    </p>
                    <div className="flex justify-center md:justify-start">
                      <a href="/about" className="btn btn-outline text-xs tracking-wider uppercase font-bold" style={{ paddingLeft: '35px', paddingRight: '35px' }}>
                        Learn More About Us <i className="fas fa-arrow-right ml-2 text-[var(--accent-soft)]"></i>
                      </a>
                    </div>
                  </div>

                  <div className="lg:col-span-5 grid grid-cols-2 gap-4">
                    <div className="p-6 bg-[var(--card-bg)] border border-[var(--card-border)] rounded-2xl text-center transition-all duration-300 hover:border-[var(--accent-soft)] hover:shadow-[0_0_20px_rgba(207,4,102,0.15)]">
                      <span className="text-[var(--accent-soft)] text-2xl md:text-3xl font-bold block mb-1">
                        <CountUp end={4} suffix="+" />
                      </span>
                      <span className="text-xs text-[var(--text-muted)] font-medium uppercase tracking-wider">Core Disciplines</span>
                    </div>
                    <div className="p-6 bg-[var(--card-bg)] border border-[var(--card-border)] rounded-2xl text-center transition-all duration-300 hover:border-[var(--accent-soft)] hover:shadow-[0_0_20px_rgba(207,4,102,0.15)]">
                      <span className="text-[var(--accent-soft)] text-2xl md:text-3xl font-bold block mb-1">
                        <CountUp end={100} suffix="%" />
                      </span>
                      <span className="text-xs text-[var(--text-muted)] font-medium uppercase tracking-wider">Custom Code</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* High-Intent CTA Segment */}
            <section className="cta-section">
              <div className="container reveal-on-scroll">
                <div className="cta-card">
                  <div className="cta-split">
                    <div className="cta-text text-center md:text-left">
                      <h2>Ready to scale your brand with a premium digital marketing agency?</h2>
                      <p className="mt-2">Let’s build something powerful together with EnMate.</p>
                    </div>
                    <div className="cta-action flex justify-center md:justify-start mt-6 md:mt-0">
                      <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn btn-accent">Connect Us</a>
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
                  <i className="fas fa-envelope mr-2 text-[var(--accent-soft)]"></i> enmate.digital@gmail.com<br />
                  <i className="fas fa-phone mr-2 text-[var(--accent-soft)]"></i> +91 81388 81132
                </p>
                <div className="footer-socials">
                  <a href="https://www.instagram.com/enmate.in" target="_blank" rel="noopener noreferrer" className="remove-link-underline" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
                  <a href="https://www.linkedin.com/company/enmate" target="_blank" rel="noopener noreferrer" className="remove-link-underline" aria-label="LinkedIn"><i className="fab fa-linkedin-in"></i></a>
                  <a href="https://www.youtube.com/@enmate.official" target="_blank" rel="noopener noreferrer" className="remove-link-underline" aria-label="YouTube"
>
  <i className="fab fa-youtube"></i>
</a>
                </div>
              </div>
              <div className="footer-nav">
                <h6>Core Operations</h6>
                <ul className="footer-links">
                  <li><a href="/services">Digital Marketing</a></li>
                  <li><a href="/services">SEO Optimization</a></li>
                  <li><a href="/services">Web Architecture</a></li>
                </ul>
              </div>
              <div className="footer-nav">
                <h6>Company Info</h6>
                <ul className="footer-links">
                  <li><a href="#home">Home Base</a></li>
                  <li><a href="/about">Our Team</a></li>
                  <li><a href="/blog">Our Publications</a></li>
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