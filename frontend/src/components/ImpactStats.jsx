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
        className={`impact-card flex flex-col justify-between p-8 rounded-3xl bg-white dark:bg-[#200807] border transition-all duration-300 shadow-xl group relative overflow-hidden h-full min-h-[230px] ${
          isHovered
            ? 'border-[#590907] dark:border-[#E8D2B5] shadow-glow-burgundy shadow-2xl'
            : 'border-[#A5A79B]/30 dark:border-[#590907]/50'
        }`}
      >
        {/* Glow orb following swipe */}
        <div className="absolute top-0 right-0 w-36 h-36 bg-[#590907]/10 dark:bg-[#E8D2B5]/10 rounded-full blur-2xl pointer-events-none group-hover:scale-125 transition-transform" />

        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-mono uppercase tracking-widest text-[#590907] dark:text-[#E8D2B5] block font-bold flex items-center gap-1.5 bg-[#FAF6F0] dark:bg-[#140303] px-2.5 py-1 rounded-md border border-[#A5A79B]/30 dark:border-[#590907]/40">
              <span className="w-2 h-2 rounded-full bg-[#590907] dark:bg-[#E8D2B5]" />
              PROGRAM OUTCOME
            </span>
            <Activity className="w-4 h-4 text-[#590907] dark:text-[#E8D2B5] opacity-80 group-hover:opacity-100 transition-opacity" />
          </div>

          <div className="font-headline font-extrabold text-5xl sm:text-6xl text-[#1C0707] dark:text-[#F7F1E6] tracking-tight flex items-baseline">
            <span>
              {currentValue}
            </span>
            <span className="text-[#590907] dark:text-[#E8D2B5] font-mono ml-1 text-4xl font-bold">{stat.suffix}</span>
          </div>
        </div>

        <div className="relative z-10 mt-8 pt-5 border-t border-[#A5A79B]/20 dark:border-[#590907]/30">
          <h4 className="font-headline font-bold text-xl text-[#1C0707] dark:text-[#F7F1E6] leading-snug group-hover:text-[#590907] dark:group-hover:text-[#E8D2B5] transition-colors">
            {stat.label}
          </h4>
          <p className="text-sm text-[#590907]/75 dark:text-[#E8D2B5]/75 mt-1.5 leading-relaxed font-body font-medium">
            {stat.caption}
          </p>
        </div>

        {/* Dynamic Swipe Indicator Cue on Hover */}
        <div className="absolute bottom-2 right-4 text-[10px] font-mono text-[#590907] dark:text-[#E8D2B5]/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
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
      className="relative w-full bg-[#FAF6F0] dark:bg-[#140303] py-24 sm:py-32 border-t border-[#A5A79B]/30 dark:border-[#590907]/40 overflow-hidden transition-colors duration-200"
      aria-label="Our Impact"
    >
      {/* Background ambient orbs */}
      <div className="absolute top-1/2 left-1/4 w-96 h-96 rounded-full bg-[#590907]/15 dark:bg-[#590907]/25 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-[#E8D2B5]/20 dark:bg-[#E8D2B5]/10 blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 dark:bg-[#200807]/90 border border-[#A5A79B]/40 dark:border-[#590907]/50 text-xs font-mono text-[#590907] dark:text-[#E8D2B5] uppercase tracking-widest mb-4 font-bold shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#590907] dark:text-[#E8D2B5]" />
            <span>Section 05 // Student Reach</span>
          </div>
          <h2 className="font-headline font-extrabold text-4xl sm:text-5xl md:text-6xl text-[#1C0707] dark:text-[#F7F1E6] tracking-tight leading-tight">
            {data.headline}
          </h2>
          <p className="mt-4 text-base sm:text-xl text-[#590907]/80 dark:text-[#E8D2B5]/85 font-medium leading-relaxed">
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
