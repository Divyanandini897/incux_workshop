import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowDownRight, Sparkles, Terminal, Cpu, ShieldCheck, CheckCircle2, Play, Activity } from 'lucide-react';
import { siteConfig } from '../data/config';
import Ai3DParticleMesh from './Ai3DParticleMesh';
import TiltCard from './TiltCard';
import heroCinematicImage from '../assets/hero_cinematic_ai.jpg';

export default function Hero() {
  const [mouseParallax, setMouseParallax] = useState({ x: 0, y: 0 });

  // Mouse Parallax movement across layered elements (Inspired by Reference 2)
  useEffect(() => {
    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 20;
      const y = (e.clientY / innerHeight - 0.5) * 20;
      setMouseParallax({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const scrollToWork = () => {
    document.querySelector('#our-work')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToUpcoming = () => {
    document.querySelector('#upcoming-workshops')?.scrollIntoView({ behavior: 'smooth' });
  };

  const lineVariants = {
    hidden: { opacity: 0, y: 40, filter: "blur(8px)" },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        delay: 0.15 + i * 0.14,
        duration: 0.75,
        ease: [0.22, 1, 0.36, 1]
      }
    })
  };

  return (
    <section
      id="hero"
      className="relative min-h-[100svh] w-full flex flex-col justify-between overflow-hidden bg-[#FAF6F0] dark:bg-[#140303] pt-28 pb-4 sm:pb-8 transition-colors duration-200"
      aria-label="Hero Section"
    >
      {/* Layer 0: Cinematic Workshop Auditorium Background with Aperture Reveal Mask */}
      <motion.div
        initial={{ clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)", opacity: 0 }}
        animate={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)", opacity: 1 }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0 z-0 overflow-hidden pointer-events-none"
      >
        <motion.img
          initial={{ scale: 1.15 }}
          animate={{ scale: 1.0 }}
          transition={{ duration: 2.2, ease: "easeOut" }}
          src={heroCinematicImage}
          alt="IncuxAI Cinematic Workshop Auditorium"
          className="w-full h-full object-cover object-center filter saturate-125 opacity-25 dark:opacity-35 mix-blend-luminosity dark:mix-blend-overlay will-change-transform"
          style={{
            transform: `translate3d(${mouseParallax.x * -0.3}px, ${mouseParallax.y * -0.3}px, 0)`
          }}
        />
        {/* Layered Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#FAF6F0]/85 via-[#FAF6F0]/70 to-[#FAF6F0] dark:from-[#140303]/90 dark:via-[#140303]/80 dark:to-[#140303]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(89,9,7,0.18)_0%,transparent_65%)]" />
      </motion.div>

      {/* Layer 1: 3D Point-Cloud Particle Mesh */}
      <Ai3DParticleMesh className="opacity-70 dark:opacity-90" />

      {/* Cyber Grid Pattern Background */}
      <div className="absolute inset-0 bg-cyber-grid-light dark:bg-cyber-grid-dark [mask-image:radial-gradient(ellipse_75%_65%_at_50%_35%,#000_65%,transparent_100%)] pointer-events-none z-[1]" />

      {/* Futuristic Glowing Ambient Orbs */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 rounded-full bg-[#590907]/15 dark:bg-[#590907]/25 blur-[120px] pointer-events-none animate-pulse-ring" />
      <div className="absolute top-1/3 -right-20 w-96 h-96 rounded-full bg-[#E8D2B5]/25 dark:bg-[#E8D2B5]/10 blur-[120px] pointer-events-none" />

      {/* Layer 2: Floating 3D Geometric Light Elements with Mouse Parallax */}
      <motion.div
        animate={{ y: [-10, 12, -10], rotate: [0, 8, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-36 right-16 hidden lg:block w-16 h-16 rounded-2xl border border-[#E8D2B5]/40 bg-gradient-to-br from-[#E8D2B5]/15 to-transparent backdrop-blur-sm pointer-events-none z-[3] shadow-glow-burgundy"
        style={{
          transform: `translate3d(${mouseParallax.x * 0.8}px, ${mouseParallax.y * 0.8}px, 0)`
        }}
      />
      <motion.div
        animate={{ y: [8, -12, 8], rotate: [0, -10, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-40 left-12 hidden lg:block w-20 h-20 rounded-3xl border border-[#590907]/30 bg-gradient-to-tr from-[#590907]/15 to-transparent backdrop-blur-sm pointer-events-none z-[3]"
        style={{
          transform: `translate3d(${mouseParallax.x * -0.6}px, ${mouseParallax.y * -0.6}px, 0)`
        }}
      />

      {/* Layer 3: Main Editorial Content Area */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full my-auto py-8 sm:py-12">
        <div className="max-w-4xl lg:max-w-5xl">
            {/* Headline: "WORKSHOPS" (Outline Contrast) + "THAT TURN KNOWLEDGE" + Gradient Skills */}
            <h1 className="font-headline font-black text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tighter text-[#1C0707] dark:text-[#F7F1E6] leading-[1.02]">
              <motion.span
                custom={0}
                initial="hidden"
                animate="visible"
                variants={lineVariants}
                className="block uppercase tracking-wider text-transparent [-webkit-text-stroke:1.8px_#590907] dark:[-webkit-text-stroke:1.8px_#E8D2B5] opacity-95 drop-shadow-sm"
              >
                Workshops
              </motion.span>
              <motion.span
                custom={1}
                initial="hidden"
                animate="visible"
                variants={lineVariants}
                className="block text-[#1C0707] dark:text-[#F7F1E6]"
              >
                that turn knowledge
              </motion.span>
              <motion.span
                custom={2}
                initial="hidden"
                animate="visible"
                variants={lineVariants}
                className="block"
              >
                into{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#590907] via-[#9e2320] to-[#A5A79B] dark:from-[#E8D2B5] dark:via-[#d4bea0] dark:to-[#A5A79B] drop-shadow-sm">
                  real-world skills.
                </span>
              </motion.span>
            </h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.55 }}
              className="mt-6 sm:mt-8 text-base sm:text-xl text-[#590907]/80 dark:text-[#E8D2B5]/85 font-normal leading-relaxed max-w-2xl"
            >
              IncuxAI bridges academic foundations and enterprise engineering demands through intensive,
              practitioner-led workshops at colleges, universities, and technical research institutions.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.85 }}
              className="mt-8 sm:mt-10 flex flex-wrap items-center gap-4"
            >
              <button
                onClick={scrollToWork}
                className="group px-7 py-4 rounded-full bg-[#590907] hover:bg-[#781210] text-[#E8D2B5] font-headline font-bold text-sm uppercase tracking-wider shadow-xl shadow-[#590907]/30 hover:scale-105 active:scale-95 transition-all duration-200 flex items-center gap-2 cursor-pointer"
              >
                <span>Explore Our Work</span>
                <ArrowDownRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
              </button>
            </motion.div>
          </div>
        </div>

      {/* Prominent Upcoming Workshops Scrolling Marquee (Layered directly ON TOP OF Oversized "WORKSHOPS") */}
      <div className="relative z-10 w-full mt-6 sm:mt-10 pt-6 sm:pt-8 border-t border-[#A5A79B]/30 dark:border-[#590907]/40 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-3 sm:mb-4 flex items-center justify-between relative z-20">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#590907] dark:bg-[#E8D2B5] shadow-xs shrink-0"></span>
            <span className="text-xs sm:text-sm font-mono font-bold uppercase tracking-wider text-[#590907] dark:text-[#E8D2B5]">
              Upcoming Workshops // Open For Registration
            </span>
          </div>
          <button
            onClick={() => {
              document.querySelector('#upcoming-workshops')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="text-xs sm:text-sm font-mono font-semibold text-[#590907]/70 dark:text-[#E8D2B5]/80 hover:text-[#590907] dark:hover:text-[#E8D2B5] transition-colors hidden sm:inline-flex items-center gap-1 cursor-pointer"
          >
            <span>View All Cohorts &amp; Register</span>
            <span>→</span>
          </button>
        </div>

        {/* Scrolling track layered directly ON TOP OF oversized "WORKSHOPS" watermark */}
        <div className="relative w-full overflow-hidden py-6 sm:py-12 select-none flex items-center justify-center">
          {/* Oversized "WORKSHOPS" Background Layer */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, delay: 0.6, ease: "easeOut" }}
              className="text-center font-headline font-black uppercase text-[17vw] sm:text-[15vw] md:text-[14vw] leading-none tracking-tighter text-[#590907]/[0.08] dark:text-[#E8D2B5]/[0.08] whitespace-nowrap block w-full drop-shadow-sm select-none"
              aria-hidden="true"
              style={{
                transform: `translate3d(${mouseParallax.x * -0.5}px, 0px, 0)`
              }}
            >
              {siteConfig.brand.heroOversized}
            </motion.div>
          </div>

          {/* Marquee scrolling track running directly ON TOP of the WORKSHOPS text */}
          <div className="relative z-10 w-full animate-marquee-infinite py-2 gap-4 sm:gap-6 flex items-center">
            {[
              "Enterprise Generative AI & LLMOps Pipeline",
              "Autonomous AI Agents & LangGraph Deep Dive",
              "Defensive Cloud Security & Zero-Trust Engineering",
              "5-Day Full-Stack AI System Bootcamp",
              "Enterprise Agentic AI & Autonomous Workflows",
              "High-Scale Microservices & Distributed Systems",
              "Applied Deep Learning & SLM Fine-Tuning"
            ].concat([
              "Enterprise Generative AI & LLMOps Pipeline",
              "Autonomous AI Agents & LangGraph Deep Dive",
              "Defensive Cloud Security & Zero-Trust Engineering",
              "5-Day Full-Stack AI System Bootcamp",
              "Enterprise Agentic AI & Autonomous Workflows",
              "High-Scale Microservices & Distributed Systems",
              "Applied Deep Learning & SLM Fine-Tuning"
            ]).map((workshopName, idx) => (
              <button
                key={`${workshopName}-${idx}`}
                onClick={() => {
                  document.querySelector('#upcoming-workshops')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="shrink-0 group inline-flex items-center gap-3 sm:gap-4 px-6 sm:px-9 py-4 sm:py-5 rounded-2xl sm:rounded-3xl bg-white/95 dark:bg-[#200807]/95 backdrop-blur-md border border-[#A5A79B]/30 dark:border-[#590907]/50 hover:border-[#590907] dark:hover:border-[#E8D2B5] hover:shadow-glow-burgundy hover:-translate-y-1 transition-all duration-300 shadow-md cursor-pointer"
              >
                <span className="w-2.5 sm:w-3 h-2.5 sm:h-3 rounded-full bg-[#590907] dark:bg-[#E8D2B5] shrink-0 shadow-sm" />
                <span className="font-headline font-bold text-base sm:text-xl md:text-2xl text-[#1C0707] dark:text-[#F7F1E6] group-hover:text-[#590907] dark:group-hover:text-[#E8D2B5] transition-colors tracking-tight whitespace-nowrap">
                  {workshopName}
                </span>
                <span className="px-2.5 py-1 rounded-full bg-[#FAF6F0] dark:bg-[#140303] text-[10px] sm:text-xs font-mono font-medium text-[#590907] dark:text-[#E8D2B5] group-hover:text-[#590907] dark:group-hover:text-[#FAF6F0] transition-colors ml-1 hidden sm:inline-block border border-[#A5A79B]/20 dark:border-[#590907]/30">
                  Live Cohort
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
