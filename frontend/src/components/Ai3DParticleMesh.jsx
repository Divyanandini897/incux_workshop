import React, { useRef, useEffect } from 'react';

/**
 * Ai3DParticleMesh - Inspired directly by Pinterest Reference 1 (mxnncreates 3D particle mesh)
 * Renders a genuine 3D perspective point-cloud of 850+ luminous particles with 3D rotation,
 * depth fog, multi-colored celestial/neural nodes (gold, cyan, electric blue),
 * and interactive mouse-responsive rotation.
 */
export default function Ai3DParticleMesh({ className = "" }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener('resize', handleResize);

    // Mouse coordinates with smooth damping
    let mouseX = 0;
    let mouseY = 0;
    let targetRotX = 0;
    let targetRotY = 0;
    let currentRotX = 0;
    let currentRotY = 0;

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left - width / 2;
      const y = e.clientY - rect.top - height / 2;
      targetRotY = (x / width) * 1.2;
      targetRotX = -(y / height) * 0.8;
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Generate 3D Particle Cloud (Sphere core + Torus ring + Neural filament nodes)
    const PARTICLE_COUNT = 750;
    const particles = [];
    const colors = [
      { r: 6, g: 182, b: 212 },   // Cyber Cyan
      { r: 245, g: 158, b: 11 },  // Warm Amber / Gold (Ref 1)
      { r: 59, g: 130, b: 246 },  // Electric Blue
      { r: 204, g: 255, b: 0 },   // Accent Lime
      { r: 255, g: 255, b: 255 }  // Pure White core
    ];

    const baseRadius = Math.min(width, height) * 0.38;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      let x, y, z;
      const type = Math.random();

      if (type < 0.55) {
        // Core 3D Neural Sphere
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(Math.random() * 2 - 1);
        const r = baseRadius * (0.65 + Math.random() * 0.35);
        x = r * Math.sin(phi) * Math.cos(theta);
        y = r * Math.sin(phi) * Math.sin(theta);
        z = r * Math.cos(phi);
      } else if (type < 0.85) {
        // Orbiting 3D Torus Ring (like planetary data ring)
        const angle = Math.random() * Math.PI * 2;
        const ringRadius = baseRadius * (1.1 + Math.random() * 0.4);
        const tubeRadius = baseRadius * 0.2;
        const tubeAngle = Math.random() * Math.PI * 2;

        x = (ringRadius + tubeRadius * Math.cos(tubeAngle)) * Math.cos(angle);
        z = (ringRadius + tubeRadius * Math.cos(tubeAngle)) * Math.sin(angle);
        y = tubeRadius * Math.sin(tubeAngle) * 0.5;
      } else {
        // Free-floating cosmic/data nodes
        const r = baseRadius * (1.2 + Math.random() * 0.6);
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(Math.random() * 2 - 1);
        x = r * Math.sin(phi) * Math.cos(theta);
        y = r * Math.sin(phi) * Math.sin(theta);
        z = r * Math.cos(phi);
      }

      const color = colors[Math.floor(Math.random() * colors.length)];
      particles.push({
        origX: x,
        origY: y,
        origZ: z,
        color,
        size: Math.random() * 2.2 + 0.8,
        pulseSpeed: Math.random() * 0.03 + 0.01,
        pulseOffset: Math.random() * Math.PI * 2
      });
    }

    let time = 0;
    const focalLength = 450;

    const render = () => {
      time += 0.008;

      // Damped mouse rotation
      currentRotX += (targetRotX - currentRotX) * 0.05;
      currentRotY += (targetRotY - currentRotY) * 0.05;

      const autoRotY = time * 0.35;
      const totalRotY = currentRotY + autoRotY;
      const totalRotX = currentRotX + Math.sin(time * 0.5) * 0.12;

      const cosY = Math.cos(totalRotY);
      const sinY = Math.sin(totalRotY);
      const cosX = Math.cos(totalRotX);
      const sinX = Math.sin(totalRotX);

      ctx.clearRect(0, 0, width, height);

      const centerX = width * 0.65; // Place on the right side of hero for editorial balance
      const centerY = height * 0.48;

      // Project particles to 2D screen space
      const projected = [];

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // 3D Rotation around Y axis
        let x1 = p.origX * cosY - p.origZ * sinY;
        let z1 = p.origZ * cosY + p.origX * sinY;
        let y1 = p.origY;

        // 3D Rotation around X axis
        let y2 = y1 * cosX - z1 * sinX;
        let z2 = z1 * cosX + y1 * sinX;
        let x2 = x1;

        // Perspective scale & depth
        const scale = focalLength / (focalLength + z2 + 350);
        if (scale <= 0) continue;

        const screenX = centerX + x2 * scale;
        const screenY = centerY + y2 * scale;
        const depthAlpha = Math.min(1, Math.max(0.12, (z2 + 250) / 500));
        const pulse = 0.8 + 0.2 * Math.sin(time * 3 + p.pulseOffset);

        projected.push({
          x: screenX,
          y: screenY,
          z: z2,
          scale,
          color: p.color,
          radius: p.size * scale * pulse,
          alpha: depthAlpha
        });
      }

      // Sort by Z for true painter's depth
      projected.sort((a, b) => a.z - b.z);

      // Draw subtle connecting filaments between nearby particles in 3D
      ctx.lineWidth = 0.6;
      const connectDist = 38;
      for (let i = 0; i < projected.length; i += 3) {
        for (let j = i + 1; j < Math.min(i + 15, projected.length); j++) {
          const dx = projected[i].x - projected[j].x;
          const dy = projected[i].y - projected[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectDist) {
            const lineAlpha = (1 - dist / connectDist) * 0.18 * projected[i].alpha;
            ctx.strokeStyle = `rgba(6, 182, 212, ${lineAlpha})`;
            ctx.beginPath();
            ctx.moveTo(projected[i].x, projected[i].y);
            ctx.lineTo(projected[j].x, projected[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw glowing particles
      for (let i = 0; i < projected.length; i++) {
        const p = projected[i];
        ctx.fillStyle = `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${p.alpha})`;

        ctx.beginPath();
        ctx.arc(p.x, p.y, Math.max(0.6, p.radius), 0, Math.PI * 2);
        ctx.fill();

        // Extra specular glow on front-most prominent particles
        if (p.z > 80 && p.radius > 1.8) {
          ctx.fillStyle = `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${p.alpha * 0.35})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius * 2.2, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none select-none z-[2] ${className}`}
      aria-hidden="true"
    />
  );
}
