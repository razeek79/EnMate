'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';

export default function ServicesGrid({ serviceList }) {
  
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

        // ─── 3D TILT (Option A) Mirror Sync ───
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
  }, [serviceList]);

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
  }, [serviceList]);

  return (
    <>
      {/* Structural Cursor Nodes */}
      <div id="cursor-dot" className="custom-cursor-dot" />
      <div id="cursor-ring" className="custom-cursor-ring" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {serviceList.map(([slug, service], i) => (
          <Link
            href={`/services/${slug}`}
            key={slug}
            className={`service-card reveal-on-scroll stagger-${(i % 3) + 1} block`}
          >
            {/* Added Option B Curtain Element */}
            <div className="curtain-panel"></div>
            <div className="card-content">
              <div className="icon"><i className={service.icon}></i></div>
              <h3>{service.title}</h3>
              <p>{service.overview}</p>
              <span className="inline-flex items-center gap-2 mt-4 text-sm font-bold text-[var(--accent-soft)]">
                Learn More <i className="fas fa-arrow-right text-xs"></i>
              </span>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}