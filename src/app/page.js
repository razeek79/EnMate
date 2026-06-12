'use client';

import React, { useState, useEffect } from 'react';

export default function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = (e) => {
    e.stopPropagation();
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleOutsideClick = () => setIsMenuOpen(false);
    document.addEventListener('click', handleOutsideClick);
    return () => document.removeEventListener('click', handleOutsideClick);
  }, []);

  const whatsappUrl = "https://wa.me/yournumber?text=Hi%20👋,%20I’m%20interested%20in%20EnMate%20agency%20services.%20Can%20I%20know%20more?";

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "Do you provide marketing services outside Kerala?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, EnMate Digital Marketing Agency works with clients across India and worldwide."
                }
              },
              {
                "@type": "Question",
                "name": "What services does EnMate offer?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "We provide premium website development, professional design, visual branding identity solutions, search engine optimization (SEO), and conversion-driven digital marketing growth campaigns."
                }
              }
            ]
          })
        }}
      />

      <header className="main-header">
        <div className="container nav-flex">
          <a href="#" className="logo-container">
            <img src="/logos/site-logo.png" alt="EnMate Logo" className="logo-img" />
            <span className="logo-text font-anokha">EnMate</span>
          </a>

          <nav className="navbar">
            <ul className={`nav-menu ${isMenuOpen ? 'active' : ''}`} onClick={(e) => e.stopPropagation()}>
              <li><a href="#home" onClick={() => setIsMenuOpen(false)}>Home</a></li>
              <li><a href="#services" onClick={() => setIsMenuOpen(false)}>Services</a></li>
              <li><a href="#process" onClick={() => setIsMenuOpen(false)}>Process</a></li>
              <li><a href="#faq" onClick={() => setIsMenuOpen(false)}>FAQ</a></li>
              <li className="nav-cta-mobile">
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary">Connect Us</a>
              </li>
            </ul>
          </nav>

          <div className="header-actions">
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary nav-cta-desktop">Connect Us</a>
            <button className={`menu-toggle ${isMenuOpen ? 'is-active' : ''}`} onClick={toggleMenu} aria-label="Toggle Navigation">
              <span className="bar"></span>
              <span className="bar"></span>
              <span className="bar"></span>
            </button>
          </div>
        </div>
      </header>

      <main>
        {/* Hero Block Section */}
        <section id="home" className="hero">
          <div className="container hero-grid">
            <div className="hero-content">
              <span className="badge reveal-fast">EnMate Digital Marketing Agency</span>
              <h1>
                <span className="font-anokha gradient-text">EnMate</span>{' '}
                <span className="hero-light">Digital Marketing Agency</span>
              </h1>
              <p className="hero-subtitle">Scale Globally with Our Strategic Marketing Ecosystems</p>
              <p className="hero-description">
                We don't just build websites; We craft high-performance digital marketing funnels, search engine optimization visibility models, and premium web systems designed to acquire customers and scale operations for your business online.
              </p>
              <div className="hero-btns">
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary">Connect Us</a>
                <a href="#services" className="btn btn-outline">Explore Services</a>
              </div>
            </div>
          </div>
        </section>

        {/* Updated Services Section (Matching Your Exact Blueprint Layout) */}
        <section id="services" className="services-section relative overflow-hidden">
          <video 
            className="services-bg-video absolute top-0 left-0 w-full h-full object-cover opacity-20 pointer-events-none z-0" 
            autoPlay 
            muted 
            loop 
            playsInline 
            preload="none" 
            aria-hidden="true"
          >
            <source src="video/home-bg-video.webm" type="video/webm" />
          </video>

          <div className="services-overlay absolute top-0 left-0 w-full h-full bg-gradient-to-b from-[#05030a]/90 via-transparent to-[#0b0410]/90 pointer-events-none z-0" aria-hidden="true"></div>

          <div className="container relative z-10">
            <div className="section-header text-center mb-12">
              <span className="section-tag">Our Services</span>
              <h2 className="section-title">
                Digital Solutions Designed to Grow Modern Businesses
              </h2>
              <p className="section-description text-[var(--text-muted)] max-w-[750px] mx-auto text-sm md:text-base leading-relaxed">
                From professional websites and branding to marketing, business systems, and digital growth strategies, EnMate provides end-to-end solutions that help businesses build credibility, increase visibility, and scale with confidence.
              </p>
            </div>

            <div className="services-grid">
              
              {/* Website Development Card */}
              <div className="service-card featured-service group relative overflow-hidden transform transition-all duration-500 hover:scale-[1.03] hover:shadow-[0_0_50px_rgba(207,4,102,0.2)]">
                <div className="card-glass-sheen absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" aria-hidden="true"></div>
                <div className="icon"><i className="fas fa-laptop-code"></i></div>
                <h3>Website Development</h3>
                <p>
                  Custom business websites, landing pages, and web applications designed for performance, credibility, lead generation, and long-term scalability.
                </p>
              </div>

              {/* Branding & Design Card */}
              <div className="service-card featured-service group relative overflow-hidden transform transition-all duration-500 hover:scale-[1.03] hover:shadow-[0_0_50px_rgba(207,4,102,0.2)]">
                <div className="card-glass-sheen absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" aria-hidden="true"></div>
                <div className="icon"><i className="fas fa-palette"></i></div>
                <h3>Branding & Graphic Design</h3>
                <p>
                  Professional branding, visual identity systems, brochures, posters, marketing materials, and creative designs that strengthen your brand presence.
                </p>
              </div>

              {/* Digital Marketing Card */}
              <div className="service-card featured-service group relative overflow-hidden transform transition-all duration-500 hover:scale-[1.03] hover:shadow-[0_0_50px_rgba(207,4,102,0.2)]">
                <div className="card-glass-sheen absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" aria-hidden="true"></div>
                <div className="icon"><i className="fas fa-chart-line"></i></div>
                <h3>Digital Marketing & Growth</h3>
                <p>
                  Social media management, content strategy, growth planning, and digital campaigns focused on attracting customers and driving measurable results.
                </p>
              </div>

              {/* Video Production Card */}
              <div className="service-card group relative overflow-hidden transform transition-all duration-500 hover:scale-[1.03] hover:shadow-[0_0_50px_rgba(207,4,102,0.15)]">
                <div className="card-glass-sheen absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" aria-hidden="true"></div>
                <div className="icon"><i className="fas fa-video"></i></div>
                <h3>Video & Creative Production</h3>
                <p>
                  Reels, promotional videos, ad creatives, video editing, and AI-powered content creation designed to engage modern audiences.
                </p>
              </div>

              {/* Business Systems Card */}
              <div className="service-card group relative overflow-hidden transform transition-all duration-500 hover:scale-[1.03] hover:shadow-[0_0_50px_rgba(207,4,102,0.15)]">
                <div className="card-glass-sheen absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" aria-hidden="true"></div>
                <div className="icon"><i className="fas fa-diagram-project"></i></div>
                <h3>Business Systems & Infrastructure</h3>
                <p>
                  Employee portals, management systems, workflow automation, and technical infrastructure solutions that improve efficiency and operations.
                </p>
              </div>

              {/* Google Presence & Support Card */}
              <div className="service-card group relative overflow-hidden transform transition-all duration-500 hover:scale-[1.03] hover:shadow-[0_0_50px_rgba(207,4,102,0.15)]">
                <div className="card-glass-sheen absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" aria-hidden="true"></div>
                <div className="icon"><i className="fas fa-globe"></i></div>
                <h3>Business Presence & Support</h3>
                <p>
                  Google Business Profile optimization, online visibility enhancement, technical support, and continuous improvements to keep your business growing.
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* Workflow Timeline Section */}
        <section id="process" className="process-advanced">
          <div className="container process-wrapper">
            <div className="process-left">
              <h2>HOW OUR<br />AGENCY<br />WORKS</h2>
            </div>
            <div className="process-right">
              <div className="process-step transition-transform duration-300 hover:-translate-y-1">
                <span>01.</span>
                <p>Auditing your market, audience intent, and technical growth targets</p>
              </div>
              <div className="process-step transition-transform duration-300 hover:-translate-y-1">
                <span>02.</span>
                <p>Deploying performance assets and executing high-intent conversion engines</p>
              </div>
              <div className="process-step transition-transform duration-300 hover:-translate-y-1">
                <span>03.</span>
                <p>Scaling acquisition campaigns, optimization checks, and scaling real sales</p>
              </div>
            </div>
          </div>
        </section>

        {/* High-Intent CTA Segment */}
        <section className="cta-section">
          <div className="container">
            <div className="cta-card relative overflow-hidden transition-all duration-500 hover:shadow-[0_0_60px_rgba(129,4,106,0.3)]">
              <div className="cta-split">
                <div className="cta-text">
                  <h2>Ready to scale your brand with a premium digital marketing agency?</h2>
                  <p>Let’s build something powerful together with EnMate.</p>
                </div>
                <div className="cta-action">
                  <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn btn-accent transition-transform transform hover:scale-105 duration-300">Connect Us</a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <section id="faq" className="faq">
        <div className="container">
          <h2 className="section-title text-center">Frequently Asked Questions</h2>
          <details className="faq-item group transition-all duration-300">
            <summary className="group-open:text-[var(--accent-soft)]">Do you provide marketing services outside Kerala?</summary>
            <p>Yes, EnMate Digital Marketing Agency provides growth frameworks and solutions for clients across India and globally.</p>
          </details>
          <details className="faq-item group transition-all duration-300">
            <summary className="group-open:text-[var(--accent-soft)]">What solutions does EnMate offer?</summary>
            <p>We are a full-scale digital agency offering target marketing operations, full-stack SEO implementations, conversion landing pages, and automated management software systems.</p>
          </details>
          <details className="faq-item group transition-all duration-300">
            <summary className="group-open:text-[var(--accent-soft)]">How can I connect with the agency team?</summary>
            <p>You can instantly connect with our strategies and engineering specialists by hitting the WhatsApp live portal triggers or dropping an address directly to hello@enmate.in.</p>
          </details>
        </div>
      </section>

      <footer className="footer">
        <div className="container footer-grid">
          <div className="footer-brand">
            <span className="font-anokha footer-logo">EnMate</span>
            <p>EnMate – Premium Digital Marketing Agency & Performance Software Development.</p>
            <p className="footer-global">Scaling companies across Kerala, India, and Worldwide 🌍</p>
            <a href="mailto:hello@enmate.in" className="footer-email">hello@enmate.in</a>
            <div className="footer-socials">
              <a href="#" className="remove-link-underline"><i className="fab fa-instagram"></i></a>
              <a href="#" className="remove-link-underline"><i className="fab fa-linkedin-in"></i></a>
              <a href="#" className="remove-link-underline"><i className="fab fa-x-twitter"></i></a>
            </div>
          </div>
          <div className="footer-nav">
            <h6>Core Operations</h6>
            <ul className="footer-links">
              <li><a href="#services">Digital Marketing</a></li>
              <li><a href="#services">SEO & Discoverability</a></li>
              <li><a href="#services">Web Architecture</a></li>
              <li><a href="#services">Branding Layouts</a></li>
            </ul>
          </div>
          <div className="footer-nav">
            <h6>Company Info</h6>
            <ul className="footer-links">
              <li><a href="#home">Home Base</a></li>
              <li><a href="#process">Our Flow</a></li>
              <li><a href="#faq">FAQ Help</a></li>
            </ul>
          </div>
        </div>
        <div className="copyright">
          &copy; {new Date().getFullYear()} <span className="font-anokha">EnMate</span> Digital Marketing Agency. All rights reserved.
        </div>
      </footer>
    </>
  );
}