import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowDownRight, Sparkles, Terminal, Cpu, ShieldCheck, ChevronDown, CheckCircle2, Play, Activity } from 'lucide-react';
import { siteConfig } from '../data/config';
import Ai3DParticleMesh from './Ai3DParticleMesh';
import TiltCard from './TiltCard';
import heroCinematicImage from '../assets/hero_cinematic_ai.jpg';

export default function Hero() {
  const [selectedDomain, setSelectedDomain] = useState('all');
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

  const scrollToContact = () => {
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToUpcoming = () => {
    document.querySelector('#upcoming-workshops')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleDomainSelect = (e) => {
    setSelectedDomain(e.target.value);
    scrollToUpcoming();
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
      className="relative min-h-[100svh] w-full flex flex-col justify-between overflow-hidden bg-[#faf9f5] dark:bg-[#050814] pt-28 pb-4 sm:pb-8 transition-colors duration-200"
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
        <div className="absolute inset-0 bg-gradient-to-b from-[#faf9f5]/85 via-[#faf9f5]/70 to-[#faf9f5] dark:from-[#050814]/90 dark:via-[#050814]/80 dark:to-[#050814]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(6,182,212,0.15)_0%,transparent_65%)]" />
      </motion.div>

      {/* Layer 1: 3D Point-Cloud Particle Mesh (Directly Inspired by Pinterest Reference 1) */}
      <Ai3DParticleMesh className="opacity-70 dark:opacity-90" />

      {/* Cyber Grid Pattern Background */}
      <div className="absolute inset-0 bg-cyber-grid-light dark:bg-cyber-grid-dark [mask-image:radial-gradient(ellipse_75%_65%_at_50%_35%,#000_65%,transparent_100%)] pointer-events-none z-[1]" />

      {/* Futuristic Glowing Ambient Orbs */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 rounded-full bg-electric-600/10 dark:bg-electric-500/15 blur-[120px] pointer-events-none animate-pulse-ring" />
      <div className="absolute top-1/3 -right-20 w-96 h-96 rounded-full bg-cyan-500/10 dark:bg-cyan-400/15 blur-[120px] pointer-events-none" />

      {/* Layer 2: Floating 3D Geometric Light Elements with Mouse Parallax */}
      <motion.div
        animate={{ y: [-10, 12, -10], rotate: [0, 8, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-36 right-16 hidden lg:block w-16 h-16 rounded-2xl border border-cyan-400/30 bg-gradient-to-br from-cyan-400/10 to-transparent backdrop-blur-sm pointer-events-none z-[3] shadow-glow-cyan"
        style={{
          transform: `translate3d(${mouseParallax.x * 0.8}px, ${mouseParallax.y * 0.8}px, 0)`
        }}
      />
      <motion.div
        animate={{ y: [8, -12, 8], rotate: [0, -10, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-40 left-12 hidden lg:block w-20 h-20 rounded-3xl border border-electric-500/20 bg-gradient-to-tr from-electric-500/10 to-transparent backdrop-blur-sm pointer-events-none z-[3]"
        style={{
          transform: `translate3d(${mouseParallax.x * -0.6}px, ${mouseParallax.y * -0.6}px, 0)`
        }}
      />

      {/* Layer 3: Main Editorial Content Area */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full my-auto py-8 sm:py-12">
        <div className="max-w-4xl lg:max-w-5xl">
            {/* Eyebrow badge with glowing pulse dot */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/90 dark:bg-navy-900/90 backdrop-blur-md border border-neutral-200/90 dark:border-white/10 mb-6 sm:mb-8 shadow-sm"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-500"></span>
              </span>
              <span className="text-xs font-mono uppercase tracking-widest text-neutral-700 dark:text-cyan-300 font-medium">
                Technology Education &amp; Practical Immersions
              </span>
            </motion.div>

            {/* Headline with Reference 1 Outline Contrast: "WORKSHOPS" (Hollow Stroke) + "THAT TURN KNOWLEDGE" + Gradient Skills */}
            <h1 className="font-headline font-black text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tighter text-neutral-950 dark:text-white leading-[1.02]">
              <motion.span
                custom={0}
                initial="hidden"
                animate="visible"
                variants={lineVariants}
                className="block uppercase tracking-wider text-transparent [-webkit-text-stroke:1.5px_#2563eb] dark:[-webkit-text-stroke:1.8px_#22d3ee] opacity-90 drop-shadow-sm"
              >
                Workshops
              </motion.span>
              <motion.span
                custom={1}
                initial="hidden"
                animate="visible"
                variants={lineVariants}
                className="block text-neutral-950 dark:text-white"
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
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-electric-600 to-accent-emerald dark:from-cyan-400 dark:via-electric-500 dark:to-accent-lime drop-shadow-sm">
                  real-world skills.
                </span>
              </motion.span>
            </h1>

            {/* Description (Original exact text preserved) */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.55 }}
              className="mt-6 sm:mt-8 text-base sm:text-xl text-neutral-600 dark:text-neutral-300 font-normal leading-relaxed max-w-2xl"
            >
              IncuxAI bridges academic foundations and enterprise engineering demands through intensive,
              practitioner-led workshops at colleges, universities, and technical research institutions.
            </motion.p>

            {/* Quick Domain Search Pill */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="mt-6 max-w-md"
            >
              <div className="flex items-center justify-between bg-white/95 dark:bg-navy-900/90 backdrop-blur-md border border-neutral-200 dark:border-white/10 rounded-full py-1.5 pl-4 pr-1.5 shadow-md hover:border-cyan-500 dark:hover:border-cyan-400 hover:shadow-glow-cyan transition-all">
                <div className="relative flex-1 flex items-center pr-2">
                  <select
                    aria-label="Select Workshop Domain"
                    value={selectedDomain}
                    onChange={handleDomainSelect}
                    className="w-full bg-transparent text-xs sm:text-sm font-mono text-neutral-700 dark:text-neutral-200 focus:outline-none appearance-none cursor-pointer pr-6"
                  >
                    <option value="all" className="dark:bg-navy-900">Explore Workshop Tracks...</option>
                    <option value="agentic" className="dark:bg-navy-900">Agentic AI &amp; LangGraph Systems</option>
                    <option value="genai" className="dark:bg-navy-900">Enterprise Generative AI &amp; LLMOps</option>
                    <option value="cloud" className="dark:bg-navy-900">Defensive Cloud Security &amp; Zero Trust</option>
                    <option value="bootcamp" className="dark:bg-navy-900">5-Day Full-Stack AI System Bootcamp</option>
                  </select>
                  <ChevronDown className="w-3.5 h-3.5 text-neutral-400 absolute right-1 pointer-events-none" />
                </div>
                <button
                  onClick={scrollToUpcoming}
                  className="bg-blue-600 hover:bg-blue-700 dark:bg-gradient-to-r dark:from-blue-600 dark:to-cyan-500 text-white font-mono font-bold text-xs uppercase px-4 py-2 rounded-full shadow-sm transition-all cursor-pointer shrink-0"
                >
                  View
                </button>
              </div>
            </motion.div>

            {/* CTAs (Original exact buttons preserved with spring hover transitions) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.85 }}
              className="mt-8 sm:mt-10 flex flex-wrap items-center gap-4"
            >
              <button
                onClick={scrollToWork}
                className="group px-7 py-4 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-headline font-bold text-sm uppercase tracking-wider shadow-xl shadow-blue-500/25 hover:shadow-cyan-500/35 hover:scale-105 active:scale-95 transition-all duration-200 flex items-center gap-2 cursor-pointer"
              >
                <span>Explore Our Work</span>
                <ArrowDownRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
              </button>

              <button
                onClick={scrollToContact}
                className="px-7 py-4 rounded-full bg-white dark:bg-navy-900/90 text-neutral-900 dark:text-white font-headline font-semibold text-sm uppercase tracking-wider border border-neutral-300 dark:border-white/10 hover:bg-neutral-100 dark:hover:bg-navy-850 hover:border-cyan-500 dark:hover:border-cyan-400 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer shadow-sm"
              >
                <span>Partner With Us</span>
              </button>
            </motion.div>
          </div>
        </div>

      {/* Prominent Upcoming Workshops Scrolling Marquee (Full Width) */}
      <div className="relative z-10 w-full mt-6 sm:mt-10 pt-6 sm:pt-8 border-t border-neutral-200/90 dark:border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-4 sm:mb-5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="relative flex h-3.5 w-3.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-cyan-500"></span>
            </span>
            <span className="text-xs sm:text-sm font-mono font-bold uppercase tracking-wider text-cyan-700 dark:text-cyan-400">
              Upcoming Workshops // Open For Registration
            </span>
          </div>
          <button
            onClick={() => {
              document.querySelector('#upcoming-workshops')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="text-xs sm:text-sm font-mono font-semibold text-neutral-600 dark:text-neutral-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors hidden sm:inline-flex items-center gap-1 cursor-pointer"
          >
            <span>View All Cohorts &amp; Register</span>
            <span>→</span>
          </button>
        </div>

        {/* Scrolling track with glowing hover states */}
        <div className="relative w-full overflow-hidden py-2 select-none">
          <div className="animate-marquee-infinite py-2 gap-4 sm:gap-6 flex items-center">
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
                className="shrink-0 group inline-flex items-center gap-3 sm:gap-4 px-6 sm:px-9 py-4 sm:py-5 rounded-2xl sm:rounded-3xl bg-white/90 dark:bg-navy-900/90 backdrop-blur-md border border-neutral-200 dark:border-white/10 hover:border-cyan-500 dark:hover:border-cyan-400 hover:shadow-glow-cyan hover:-translate-y-1 transition-all duration-300 shadow-md cursor-pointer"
              >
                <span className="w-2.5 sm:w-3 h-2.5 sm:h-3 rounded-full bg-cyan-500 dark:bg-cyan-400 shrink-0 shadow-sm shadow-cyan-500/50" />
                <span className="font-headline font-bold text-base sm:text-xl md:text-2xl text-neutral-900 dark:text-neutral-100 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors tracking-tight whitespace-nowrap">
                  {workshopName}
                </span>
                <span className="px-2.5 py-1 rounded-full bg-neutral-100 dark:bg-navy-800 text-[10px] sm:text-xs font-mono font-medium text-neutral-500 dark:text-cyan-300 group-hover:text-neutral-900 dark:group-hover:text-white transition-colors ml-1 hidden sm:inline-block">
                  Live Cohort
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Layer 4: Oversized "WORKSHOPS" Rising with Parallax Depth and Ghost Outline */}
      <div className="relative w-full overflow-hidden select-none pointer-events-none mt-auto pt-2">
        <motion.div
          initial={{ y: 60, opacity: 0 }}
          animate={{ y: 15, opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.8, ease: "easeOut" }}
          className="text-center font-headline font-black uppercase text-[15vw] sm:text-[14vw] md:text-[13vw] leading-[0.8] tracking-tighter text-neutral-950/[0.05] dark:text-white/[0.05] whitespace-nowrap block w-full drop-shadow-sm select-none"
          aria-hidden="true"
          style={{
            transform: `translate3d(${mouseParallax.x * -0.5}px, 15px, 0)`
          }}
        >
          {siteConfig.brand.heroOversized}
        </motion.div>
      </div>
    </section>
  );
}
