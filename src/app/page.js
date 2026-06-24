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
  useEffect(() => {
    if (window.location.hash && (window.location.hash.includes('type=invite') || window.location.hash.includes('type=recovery') || window.location.hash.includes('access_token='))) {
      window.location.href = `/auth/confirm${window.location.hash}`;
    }
  }, []);

  // MAXIMUM 3D TILT RESPONSIVENESS PIPELINE
  useEffect(() => {
    const cards = document.querySelectorAll('.service-card');

    const handleMouseMove = (e) => {
      const card = e.currentTarget;
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const percentX = (x / rect.width) - 0.5;
      const percentY = (y / rect.height) - 0.5;

      card.style.setProperty('--tilt-x', `${percentY * -12}deg`);
      card.style.setProperty('--tilt-y', `${percentX * 12}deg`);
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
  }, []);

  // SCROLL INTERSECTION OBSERVERS
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
    return () => observer.disconnect();
  }, []);

  const whatsappUrl = "https://wa.me/918138881132?text=Hi%20👋,%20I%20found%20EnMate%20online.%20I%20want%20to%20scale%20our%20business%20with%20the%20best%20digital%20marketing%20services.";

  return (
    <div className="w-full bg-cover bg-fixed bg-center bg-no-repeat bg-[url('/images/bg-images/home-mobile-bg.webp')] md:bg-[url('/images/bg-images/home-lap-bg.webp')] font-sans selection:bg-[var(--accent)] selection:text-white">
      <div className="w-full bg-gradient-to-b from-[#05030a]/55 via-[#05030a]/50 to-[#0b0410]/65">
        
        {/* 🧼 CLEANED UP DUPLICATE EVENT CURSOR DIV NODES FOR PERFORMANCE 🧼 */}

        <main>
          {/* Hero Section */}
          <section id="home" className="hero pt-32 text-left">
            <div className="container">
              <div className="max-w-[850px] reveal-on-scroll space-y-4">
                <span className="badge font-mono text-[10px]">Based in Kottakkal, Kerala, India | Serving Clients Locally & Worldwide</span>
                <h1 className="leading-tight tracking-tight">
                  <span className="font-anokha gradient-text block md:inline">EnMate</span>{' '}
                  <span className="hero-light">
                    {"Digital Marketing Agency".split(' ').map((word, i) => (
                      <span className="word-reveal-wrap" key={i}>
                        <span className="word-reveal" style={{ animationDelay: `${0.15 + i * 0.08}s` }}>
                          {word}&nbsp;
                        </span>
                      </span>
                    ))}
                  </span>
                </h1>
                <p className="hero-subtitle hero-fade-in font-medium text-[var(--accent-soft)]" style={{ animationDelay: '0.6s' }}>Premium Digital Assets Engineered for Market Dominance</p>
                <p className="hero-description hero-fade-in text-xs md:text-sm text-[var(--text-muted)] font-light leading-relaxed max-w-[760px]" style={{ animationDelay: '0.75s' }}>
                  We don't just run standard ad campaigns; We engineer high-performance conversion funnels, custom web apps, search engine optimization visibility models, and premium visual branding systems designed to capture audience intent and scale your business operations globally.
                </p>
                <div className="hero-btns hero-fade-in pt-4" style={{ animationDelay: '0.9s' }}>
                  <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary text-xs uppercase tracking-wider font-bold">
                    <div className="btn-glow-layer" />
                    <span className="btn-content-nodes">Connect Us</span>
                  </a>
                  <a href="/services" className="btn btn-outline text-xs uppercase tracking-wider font-bold">
                    <div className="btn-glow-layer" />
                    <span className="btn-content-nodes">Explore Services</span>
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* Services Matrix Section */}
          <section id="services" className="services-section py-16 md:py-24">
            <div className="container">
              <div className="text-left mb-12 md:mb-16 reveal-on-scroll space-y-2 max-w-[800px]">
                <span className="section-tag font-mono text-[10px]">Our Services</span>
                <h2 className="text-xl md:text-3xl font-bold text-white tracking-tight">Digital Solutions Built to Grow Modern Businesses</h2>
                <p className="text-[var(--text-muted)] text-xs md:text-sm leading-relaxed font-light pt-1">
                  From custom website development and branding identity layouts to performance marketing, business automation systems, and video production, EnMate delivers end-to-end solutions that help brands build credibility and scale with confidence.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {[
                  { icon: 'fa-laptop-code', title: 'Website Development', desc: 'Custom business websites, landing pages, and web applications designed for performance, credibility, lead generation, and long-term scalability.' },
                  { icon: 'fa-palette', title: 'Branding & Graphic Design', desc: 'Professional branding, visual identity systems, marketing materials, and creative designs that establish a premium brand presence.' },
                  { icon: 'fa-chart-line', title: 'Digital Marketing & Growth', desc: 'Social media management, content strategy, growth planning, and data-driven ad campaigns focused on customer acquisition and revenue expansion.' },
                  { icon: 'fa-video', title: 'Video & Creative Production', desc: 'Cinematic promotional ads, social media reels, and high-impact motion graphics designed to engage modern audiences.' },
                  { icon: 'fa-diagram-project', title: 'Business Systems & Portals', desc: 'Custom employee management portals, internal workflow structures, and automated frameworks built to optimize business operations.' },
                  { icon: 'fa-globe', title: 'Business Presence & Support', desc: 'Google Business Profile optimization, continuous SEO enhancements, and dedicated technical support to keep your digital infrastructure ahead of competitors.' }
                ].map((srv, i) => (
                  <div 
                    key={i} 
                    className="service-card reveal-on-scroll text-left" 
                    style={{ 
                      animationDelay: `${0.05 * (i + 1)}s`,
                      transform: 'perspective(1000px) rotateX(var(--tilt-x, 0deg)) rotateY(var(--tilt-y, 0deg)) translateZ(0)'
                    }}
                  >
                    <div className="curtain-panel" />
                    <div className="card-content p-6 space-y-3">
                      <div className="icon w-10 h-10 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center text-sm text-[var(--accent-soft)]"><i className={`fas ${srv.icon}`}></i></div>
                      <h3 className="text-base font-bold text-white tracking-tight">{srv.title}</h3>
                      <p className="text-xs text-[var(--text-muted)] leading-relaxed font-light">{srv.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Execution Framework */}
          <section id="process" className="process-advanced py-16">
            <div className="container">
              <div className="process-wrapper reveal-on-scroll text-left grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <div className="process-left lg:col-span-4 space-y-1">
                  <span className="section-tag font-mono text-[10px]">How We Execute</span>
                  <h2 className="text-xl md:text-3xl font-bold text-white tracking-tight">Our 3-Step Execution Framework</h2>
                </div>
                <div className="process-right lg:col-span-8 space-y-6">
                  <div className="process-step border-l border-white/10 pl-6 space-y-1">
                    <span className="text-xs font-mono font-bold text-[var(--accent-soft)] tracking-wider block">01 / STRATEGY</span>
                    <p className="text-xs md:text-sm text-[var(--text-muted)] font-light leading-relaxed">Deep tactical market research, audience search intent mapping, and high-converting structural target layouts before typing a line of code.</p>
                  </div>
                  <div className="process-step border-l border-white/10 pl-6 space-y-1">
                    <span className="text-xs font-mono font-bold text-[var(--accent-soft)] tracking-wider block">02 / DESIGN</span>
                    <p className="text-xs md:text-sm text-[var(--text-muted)] font-light leading-relaxed">Crafting custom premium visuals, fast response interfaces, and high-performance system dashboards structured cleanly for absolute growth optimization.</p>
                  </div>
                  <div className="process-step border-l border-white/10 pl-6 space-y-1">
                    <span className="text-xs font-mono font-bold text-[var(--accent-soft)] tracking-wider block">03 / GROWTH</span>
                    <p className="text-xs md:text-sm text-[var(--text-muted)] font-light leading-relaxed">Deploying automated data tracking metrics, rigorous SEO search engine visibility indexing layers, and scalable ad campaign matrices to lock in market authority.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Summary Section */}
          <section id="about-summary" className="py-16 md:py-24 relative overflow-hidden text-left">
            <div className="container">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center reveal-on-scroll">
                <div className="lg:col-span-7 space-y-3">
                  <span className="section-tag font-mono text-[10px]">Who We Are</span>
                  <h2 className="text-xl md:text-3xl font-bold text-white tracking-tight">The Brains Driving Global Growth</h2>
                  <p className="text-xs md:text-sm text-[var(--text-main)] leading-relaxed font-light">
                    EnMate is a high-performance digital marketing agency bridging localized regional authority in Kottakkal with scalable worldwide marketing operations. We don't just execute basic setups; we build custom, high-speed digital architectures designed to win market dominance.
                  </p>
                  <p className="text-xs text-[var(--text-muted)] leading-relaxed font-light">
                    Our unified mission is simple: to transform ambitious brands into highly visible market leaders through rigorous optimization, elite creative layouts, and absolute engineering transparency.
                  </p>
                  <div className="pt-2">
                    <a href="/about" className="btn btn-outline text-xs tracking-wider uppercase font-bold">
                      <div className="btn-glow-layer" />
                      <span className="btn-content-nodes inline-flex items-center gap-1.5">Learn More About Us <i className="fas fa-arrow-right text-[10px] text-[var(--accent-soft)]"></i></span>
                    </a>
                  </div>
                </div>

                <div className="lg:col-span-5 grid grid-cols-2 gap-4">
                  <div className="p-5 bg-[var(--card-bg)] border border-[var(--card-border)] rounded-2xl text-center space-y-1">
                    <span className="text-[var(--accent-soft)] text-xl md:text-2xl font-bold font-mono block">
                      <CountUp end={4} suffix="+" />
                    </span>
                    <span className="text-[10px] text-[var(--text-muted)] font-mono uppercase tracking-wider block">Core Disciplines</span>
                  </div>
                  <div className="p-5 bg-[var(--card-bg)] border border-[var(--card-border)] rounded-2xl text-center space-y-1">
                    <span className="text-[var(--accent-soft)] text-xl md:text-2xl font-bold font-mono block">
                      <CountUp end={100} suffix="%" />
                    </span>
                    <span className="text-[10px] text-[var(--text-muted)] font-mono uppercase tracking-wider block">Custom Code</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="cta-section py-12">
            <div className="container reveal-on-scroll">
              <div className="cta-card p-6 md:p-12 bg-gradient-to-br from-[#07040f] via-[#cf0466]/5 to-[#07040f] border border-white/10 rounded-2xl text-center md:text-left">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                  <div className="space-y-1 max-w-[600px]">
                    <h2 className="text-lg md:text-2xl font-bold text-white tracking-tight">Ready to scale your brand with a premium digital marketing agency?</h2>
                    <p className="text-xs md:text-sm text-[var(--text-muted)] font-light leading-relaxed">Let’s build something powerful together with EnMate.</p>
                  </div>
                  <div className="shrink-0 flex justify-center">
                    <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn btn-accent text-xs uppercase tracking-wider font-bold">
                      <div className="btn-glow-layer" />
                      <span className="btn-content-nodes">Connect Us</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>

      </div>
    </div>
  );
}