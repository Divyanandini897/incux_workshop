import React, { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { impactStatsData } from '../data/statistics';
import { Sparkles, Activity, MoveHorizontal } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

function SwipeableCounterCard({ stat, index, activeHoveredIndex, setActiveHoveredIndex }) {
  const [currentValue, setCurrentValue] = useState(stat.value);
  const cardRef = useRef(null);

  // Motion values for cursor-following swipe physics
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for fluid swiping glide
  const springConfig = { damping: 18, stiffness: 180, mass: 0.6 };
  const swipeX = useSpring(mouseX, springConfig);
  const swipeY = useSpring(mouseY, springConfig);
  const rotateZ = useTransform(swipeX, [-50, 50], [-4, 4]);

  const isHovered = activeHoveredIndex === index;
  // If a neighboring card is hovered, this card shifts slightly away to simulate deck swiping
  const neighborShift =
    activeHoveredIndex !== null && activeHoveredIndex !== index
      ? index < activeHoveredIndex
        ? -14
        : 14
      : 0;

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    // Reset to 0 and count up when triggered
    setCurrentValue(0);
    const statTarget = { val: 0 };
    const tween = gsap.to(statTarget, {
      val: stat.value,
      duration: 1.5,
      delay: index * 0.08,
      ease: "power2.out",
      scrollTrigger: {
        trigger: card,
        start: "top 95%",
        toggleActions: "play none none none"
      },
      onUpdate: () => {
        setCurrentValue(Math.floor(statTarget.val));
      }
    });

    return () => {
      tween.kill();
    };
  }, [stat.value, index]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    // Calculate displacement towards the cursor (swipe motion)
    const offsetX = Math.max(-45, Math.min(45, (e.clientX - centerX) * 0.35));
    const offsetY = Math.max(-25, Math.min(25, (e.clientY - centerY) * 0.25));
    mouseX.set(offsetX);
    mouseY.set(offsetY);
  };

  const handleMouseEnter = () => {
    setActiveHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setActiveHoveredIndex(null);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      animate={{
        x: neighborShift,
        scale: isHovered ? 1.04 : 1
      }}
      style={{
        x: swipeX,
        y: swipeY,
        rotateZ: rotateZ
      }}
      drag="x"
      dragConstraints={{ left: -40, right: 40 }}
      dragElastic={0.2}
      className="cursor-grab active:cursor-grabbing select-none h-full"
    >
      <div
        className={`impact-card flex flex-col justify-between p-8 rounded-3xl bg-white dark:bg-[#0c1228] border transition-all duration-300 shadow-xl group relative overflow-hidden h-full min-h-[230px] ${
          isHovered
            ? 'border-blue-500/80 dark:border-cyan-400 shadow-glow-cyan shadow-2xl'
            : 'border-neutral-300 dark:border-white/20'
        }`}
      >
        {/* Glow orb following swipe */}
        <div className="absolute top-0 right-0 w-36 h-36 bg-blue-500/10 dark:bg-cyan-500/10 rounded-full blur-2xl pointer-events-none group-hover:scale-125 transition-transform" />

        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-mono uppercase tracking-widest text-blue-700 dark:text-cyan-300 block font-bold flex items-center gap-1.5 bg-blue-50 dark:bg-blue-950/80 px-2.5 py-1 rounded-md border border-blue-400/30">
              <span className="w-2 h-2 rounded-full bg-blue-500 dark:bg-cyan-400 animate-pulse" />
              VERIFIED OUTCOME
            </span>
            <Activity className="w-4 h-4 text-blue-600 dark:text-cyan-400 opacity-80 group-hover:opacity-100 transition-opacity" />
          </div>

          <div className="font-headline font-extrabold text-5xl sm:text-6xl text-neutral-950 dark:text-white tracking-tight flex items-baseline">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neutral-950 via-blue-700 to-cyan-600 dark:from-white dark:via-cyan-300 dark:to-blue-400">
              {currentValue}
            </span>
            <span className="text-amber-500 font-mono ml-1 text-4xl font-bold">{stat.suffix}</span>
          </div>
        </div>

        <div className="relative z-10 mt-8 pt-5 border-t border-neutral-200 dark:border-white/10">
          <h4 className="font-headline font-bold text-xl text-neutral-950 dark:text-white leading-snug group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition-colors">
            {stat.label}
          </h4>
          <p className="text-sm text-neutral-700 dark:text-neutral-300 mt-1.5 leading-relaxed font-body font-medium">
            {stat.caption}
          </p>
        </div>

        {/* Dynamic Swipe Indicator Cue on Hover */}
        <div className="absolute bottom-2 right-4 text-[10px] font-mono text-blue-600 dark:text-cyan-400/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
          <MoveHorizontal className="w-3 h-3" />
          <span>Swipeable</span>
        </div>
      </div>
    </motion.div>
  );
}

export default function ImpactStats({ data = impactStatsData }) {
  const sectionRef = useRef(null);
  const [activeHoveredIndex, setActiveHoveredIndex] = useState(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Use gentle entrance that clears props so elements are NEVER left stuck hidden
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".impact-card",
        { opacity: 0.3, y: 25 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.6,
          ease: "power2.out",
          clearProps: "all",
          scrollTrigger: {
            trigger: section,
            start: "top 95%",
            once: true
          }
        }
      );
    }, section);

    return () => ctx.revert();
  }, [data]);

  return (
    <section
      id="impact"
      ref={sectionRef}
      className="relative w-full bg-[#f8f7f2] dark:bg-[#070b1a] py-24 sm:py-32 border-t border-neutral-300 dark:border-white/15 overflow-hidden transition-colors duration-200"
      aria-label="Our Impact"
    >
      {/* Background ambient orbs */}
      <div className="absolute top-1/2 left-1/4 w-96 h-96 rounded-full bg-blue-600/10 dark:bg-blue-500/15 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-cyan-500/10 dark:bg-cyan-500/15 blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/80 border border-blue-400/40 text-xs font-mono text-blue-700 dark:text-cyan-300 uppercase tracking-widest mb-4 font-bold shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-blue-600 dark:text-cyan-400" />
            <span>Section 05 // Verified Reach</span>
          </div>
          <h2 className="font-headline font-extrabold text-4xl sm:text-5xl md:text-6xl text-neutral-950 dark:text-white tracking-tight leading-tight">
            {data.headline}
          </h2>
          <p className="mt-4 text-base sm:text-xl text-neutral-700 dark:text-neutral-200 font-medium leading-relaxed">
            {data.subtitle}
          </p>
        </div>

        {/* 4 Statistics Cards with Cursor-Driven Swiping Physics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 [perspective:1400px]">
          {data.stats.map((stat, index) => (
            <SwipeableCounterCard
              key={stat.id}
              stat={stat}
              index={index}
              activeHoveredIndex={activeHoveredIndex}
              setActiveHoveredIndex={setActiveHoveredIndex}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
