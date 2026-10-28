import React, { useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';

export default function AiNeuralCanvas({ className = "absolute inset-0 pointer-events-none" }) {
  const canvasRef = useRef(null);
  const { isDark } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let width = (canvas.width = canvas.parentElement?.offsetWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.offsetHeight || window.innerHeight);

    // Check reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Node Count scaled to screen size
    const nodeCount = Math.floor(Math.min(width * height / 18000, 55));
    const nodes = [];

    const colors = isDark
      ? ['rgba(6, 182, 212, ', 'rgba(59, 130, 246, ', 'rgba(139, 92, 246, ', 'rgba(16, 185, 129, ']
      : ['rgba(15, 23, 42, ', 'rgba(8, 145, 178, ', 'rgba(37, 99, 235, ', 'rgba(13, 148, 136, '];

    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * (prefersReducedMotion ? 0 : 0.65),
        vy: (Math.random() - 0.5) * (prefersReducedMotion ? 0 : 0.65),
        radius: Math.random() * 2.2 + 1.2,
        colorBase: colors[Math.floor(Math.random() * colors.length)],
        alpha: Math.random() * 0.45 + 0.25,
        pulseSpeed: Math.random() * 0.03 + 0.01,
        pulseOffset: Math.random() * Math.PI * 2,
      });
    }

    let mouse = { x: null, y: null, radius: 140 };

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.offsetWidth || window.innerWidth;
      height = canvas.height = canvas.parentElement.offsetHeight || window.innerHeight;
    };

    window.addEventListener('resize', handleResize, { passive: true });

    let time = 0;
    const render = () => {
      ctx.clearRect(0, 0, width, height);
      time += 0.02;

      // Draw connections
      const maxDistance = 135;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDistance) {
            const lineAlpha = (1 - dist / maxDistance) * (isDark ? 0.22 : 0.12);
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = isDark
              ? `rgba(6, 182, 212, ${lineAlpha})`
              : `rgba(15, 23, 42, ${lineAlpha})`;
            ctx.lineWidth = 0.85;
            ctx.stroke();
          }
        }
      }

      // Update & Draw nodes
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];

        if (!prefersReducedMotion) {
          node.x += node.vx;
          node.y += node.vy;

          // Bounce off bounds
          if (node.x < 0 || node.x > width) node.vx *= -1;
          if (node.y < 0 || node.y > height) node.vy *= -1;

          // Gentle mouse reaction
          if (mouse.x !== null && mouse.y !== null) {
            const mdx = mouse.x - node.x;
            const mdy = mouse.y - node.y;
            const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
            if (mdist < mouse.radius) {
              const force = (1 - mdist / mouse.radius) * 0.8;
              node.x -= (mdx / mdist) * force * 1.5;
              node.y -= (mdy / mdist) * force * 1.5;
            }
          }
        }

        // Pulse size
        const currentRadius = node.radius + Math.sin(time * 2 + node.pulseOffset) * 0.4;

        ctx.beginPath();
        ctx.arc(node.x, node.y, Math.max(0.8, currentRadius), 0, Math.PI * 2);
        ctx.fillStyle = `${node.colorBase}${node.alpha})`;
        ctx.fill();

        // Subtle glow halo in dark mode
        if (isDark && node.radius > 2.0) {
          ctx.beginPath();
          ctx.arc(node.x, node.y, currentRadius * 2.2, 0, Math.PI * 2);
          ctx.fillStyle = `${node.colorBase}0.06)`;
          ctx.fill();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
    };
  }, [isDark]);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}
