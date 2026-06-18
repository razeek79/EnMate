'use client';

import React, { useEffect } from 'react';

export default function BlogCursor() {
  useEffect(() => {
    // Dynamic Mouse Tracking Listeners
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

    // Bind hover states cleanly to all links and navigation buttons on the article layout
    document.querySelectorAll('a, button, .service-card, .btn').forEach(item => {
      item.addEventListener('mouseenter', onMouseEnterLink);
      item.addEventListener('mouseleave', onMouseLeaveLink);
    });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <>
      <div id="cursor-dot" className="custom-cursor-dot" />
      <div id="cursor-ring" className="custom-cursor-ring" />
    </>
  );
}