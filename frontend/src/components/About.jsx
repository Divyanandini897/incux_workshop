import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { siteConfig } from '../data/config';
import TiltCard from './TiltCard';
import { Target, Code, Compass, Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const { brand } = siteConfig;
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.from(".about-content", {
        x: -40,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top 75%",
          toggleActions: "play none none none"
        }
      });

      gsap.from(".about-pillar-card", {
        x: 40,
        opacity: 0,
        stagger: 0.12,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top 75%",
          toggleActions: "play none none none"
        }
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative w-full bg-[#faf9f5] dark:bg-[#050814] py-24 border-t border-neutral-200 dark:border-white/10 overflow-hidden transition-colors duration-200"
      aria-label="About IncuxAI"
    >
      {/* Background ambient orbs */}
      <div className="absolute top-1/3 -right-24 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-electric-600/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Heading and Mission */}
          <div className="about-content lg:col-span-7">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 dark:bg-navy-900/90 backdrop-blur-md border border-neutral-200 dark:border-white/10 text-xs font-mono text-cyan-600 dark:text-cyan-400 uppercase tracking-widest mb-4 font-semibold shadow-sm">
              <span className="w-2 h-2 rounded-full bg-cyan-500 animate-ping" />
              <span>Section 09 // Mission Statement</span>
            </div>

            <h2 className="font-headline font-bold text-3xl sm:text-5xl md:text-6xl text-neutral-950 dark:text-white tracking-tight leading-tight">
              Bridging Education <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-electric-600 to-accent-emerald dark:from-cyan-400 dark:via-electric-500 dark:to-accent-lime drop-shadow-sm">
                and Industry.
              </span>
            </h2>

            {/* Official Mission Statement as per PDF */}
            <TiltCard maxTilt={5} scale={1.02}>
              <div className="mt-8 p-7 sm:p-9 rounded-3xl bg-white/95 dark:bg-[#0a0f24]/90 backdrop-blur-xl border border-neutral-200 dark:border-white/10 text-lg sm:text-xl text-neutral-800 dark:text-neutral-200 leading-relaxed font-body relative shadow-2xl hover:border-cyan-500/50 transition-all hover:shadow-glow-cyan">
                <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />
                <span className="relative z-10 font-headline font-bold text-cyan-600 dark:text-cyan-400 block text-xs uppercase tracking-widest mb-3">
                  // Official Mission Charter
                </span>
                <p className="relative z-10 italic">"{brand.mission}"</p>
              </div>
            </TiltCard>

            <p className="mt-6 text-sm sm:text-base text-neutral-600 dark:text-neutral-300 font-normal leading-relaxed">
              Academic curriculums provide deep theoretical rigour, but enterprise tech stacks evolve at lightning speed.
              IncuxAI bridges this divide by embedding active engineering leads and researchers directly into university auditoriums
              and digital lab environments.
            </p>
          </div>

          {/* Right Column: 3 Core Pillars */}
          <div className="lg:col-span-5 space-y-4">
            <TiltCard maxTilt={6} scale={1.02}>
              <div className="about-pillar-card p-6 sm:p-7 rounded-3xl bg-white/90 dark:bg-[#0a0f24]/90 backdrop-blur-md border border-neutral-200 dark:border-white/10 shadow-lg hover:border-cyan-500/60 dark:hover:border-cyan-400/60 transition-all duration-300">
                <div className="flex items-center gap-3 mb-2 text-cyan-600 dark:text-cyan-400">
                  <Target className="w-5 h-5" />
                  <h4 className="font-headline font-bold text-lg text-neutral-900 dark:text-white">Practitioner Rigour</h4>
                </div>
                <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  Every workshop session is led by working domain leads, architects, and PhD research scholars who solve these problems daily.
                </p>
              </div>
            </TiltCard>

            <TiltCard maxTilt={6} scale={1.02}>
              <div className="about-pillar-card p-6 sm:p-7 rounded-3xl bg-white/90 dark:bg-[#0a0f24]/90 backdrop-blur-md border border-neutral-200 dark:border-white/10 shadow-lg hover:border-cyan-500/60 dark:hover:border-cyan-400/60 transition-all duration-300">
                <div className="flex items-center gap-3 mb-2 text-cyan-600 dark:text-cyan-400">
                  <Code className="w-5 h-5" />
                  <h4 className="font-headline font-bold text-lg text-neutral-900 dark:text-white">Code &amp; System First</h4>
                </div>
                <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  Zero generic slide decks. Students spend hours directly within interactive notebooks, local terminal runs, and git repos.
                </p>
              </div>
            </TiltCard>

            <TiltCard maxTilt={6} scale={1.02}>
              <div className="about-pillar-card p-6 sm:p-7 rounded-3xl bg-white/90 dark:bg-[#0a0f24]/90 backdrop-blur-md border border-neutral-200 dark:border-white/10 shadow-lg hover:border-cyan-500/60 dark:hover:border-cyan-400/60 transition-all duration-300">
                <div className="flex items-center gap-3 mb-2 text-cyan-600 dark:text-cyan-400">
                  <Compass className="w-5 h-5" />
                  <h4 className="font-headline font-bold text-lg text-neutral-900 dark:text-white">Regional Scalability</h4>
                </div>
                <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  From premier institutes like IIT Hyderabad to tier-2 and tier-3 colleges across Andhra Pradesh and Telangana.
                </p>
              </div>
            </TiltCard>
          </div>
        </div>
      </div>
    </section>
  );
}
