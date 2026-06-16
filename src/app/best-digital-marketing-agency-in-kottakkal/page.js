'use client';

import React, { useState, useEffect, useRef } from 'react';

export default function KottakkalLocalPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const toggleMenu = () => setIsMenuOpen(prevState => !prevState);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const whatsappUrl = "https://wa.me/yournumber?text=Hi%20👋,%20I%20found%20EnMate%20on%20Google.%20We%20need%20the%20best%20digital%20marketing%20services%20in%20Kottakkal.";

  return (
    <div className="min-h-screen w-full bg-cover bg-fixed bg-center bg-no-repeat bg-[url('/images/bg-images/home-mobile-bg.webp')] md:bg-[url('/images/bg-images/home-lap-bg.webp')]">
      <div className="min-h-screen w-full bg-gradient-to-b from-[#05030a]/45 via-[#05030a]/30 to-[#0b0410]/45">

        {/* Header Link Tracking System */}
        <header className="main-header" ref={menuRef}>
          <div className="container nav-flex">
            <a href="/" className="logo-container">
              <img src="/logos/site-logo.png" alt="EnMate Logo" className="logo-img" />
              <span className="logo-text font-anokha">EnMate</span>
            </a>
            <nav className="navbar">
              <ul className={`nav-menu ${isMenuOpen ? 'active !flex' : 'hidden lg:flex'}`}>
                <li><a href="/" onClick={() => setIsMenuOpen(false)}>Home Base</a></li>
                <li><a href="#services" onClick={() => setIsMenuOpen(false)}>Expertise</a></li>
                <li><a href="#process" onClick={() => setIsMenuOpen(false)}>Our Strategy</a></li>
                <li className="nav-cta-mobile flex justify-center mt-3">
                  <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary px-12 py-3" style={{ paddingLeft: '45px', paddingRight: '45px' }}>Connect Us</a>
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

        <main className="pt-24">
          <section className="hero">
            <div className="container hero-grid">
              <div className="hero-content">
                <span className="badge reveal-fast">Top Rated Agency Hub in Malappuram</span>
                <h1>
                  <span className="font-anokha gradient-text">EnMate</span>{' '}
                  <span className="hero-light">Best Digital Marketing Agency in Kottakkal</span>
                </h1>
                <p className="hero-subtitle">Premium Performance Frameworks Built for Local & Export Brands</p>
                <p className="hero-description">
                  Based in Kottakkal, we empower local healthcare industries, hospitality properties, enterprise builders, and global export businesses with custom high-speed web apps, targeted lead acquisition systems, and data-driven organic ranking search marketing.
                </p>
                <div className="hero-btns">
                  <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary">Grow My Business</a>
                </div>
              </div>
            </div>
          </section>
        </main>

      </div>
    </div>
  );
}