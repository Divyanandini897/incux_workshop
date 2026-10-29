import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { siteConfig } from '../data/config';
import TiltCard from './TiltCard';
import { Mic, Trophy, Code, Sparkles, Users, Award } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const { brand } = siteConfig;
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.from(".about-content", {
        x: -30,
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
        y: 30,
        opacity: 0,
        stagger: 0.15,
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
      className="relative w-full bg-[#FAF6F0] dark:bg-[#140303] py-20 sm:py-28 border-t border-[#A5A79B]/30 dark:border-[#590907]/40 overflow-hidden transition-colors duration-200"
      aria-label="Bridging Education and Industry"
    >
      {/* Ambient background glows */}
      <div className="absolute top-1/4 -right-24 w-96 h-96 bg-[#590907]/10 dark:bg-[#590907]/20 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 -left-20 w-80 h-80 bg-[#E8D2B5]/15 dark:bg-[#E8D2B5]/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="about-content max-w-3xl mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 dark:bg-[#200807]/90 backdrop-blur-md border border-[#A5A79B]/40 dark:border-[#590907]/50 text-xs font-mono text-[#590907] dark:text-[#E8D2B5] uppercase tracking-widest mb-4 font-semibold shadow-xs">
            <span className="w-2 h-2 rounded-full bg-[#590907] dark:bg-[#E8D2B5]" />
            <span>Academic &amp; Industry Initiative</span>
          </div>

          <h2 className="font-headline font-bold text-3xl sm:text-5xl md:text-6xl text-[#1C0707] dark:text-[#F7F1E6] tracking-tight leading-tight">
            Bridging Education <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#590907] via-[#851614] to-[#590907] dark:from-[#E8D2B5] dark:via-white dark:to-[#E8D2B5] drop-shadow-sm">
              and Industry.
            </span>
          </h2>

          <p className="mt-5 text-base sm:text-lg text-[#590907]/80 dark:text-[#E8D2B5]/85 font-normal leading-relaxed">
            Academic curriculums build essential theoretical foundations, but enterprise technology stacks evolve at lightning speed.
            IncuxAI bridges this divide through high-impact guest lectures by global engineering leaders, competitive hackathons,
            and intensive hands-on workshops that prepare students for real production engineering.
          </p>
        </div>

        {/* 3 Core Highlight Cards: Guest Lectures (Highlighted!), Hackathons (Highlighted!), Industry Workshops */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {/* Card 1: Distinguished Guest Lectures & Keynotes (Highlighted!) */}
          <TiltCard maxTilt={6} scale={1.02}>
            <div className="about-pillar-card h-full p-7 sm:p-8 rounded-3xl bg-white/95 dark:bg-[#200807]/95 backdrop-blur-xl border border-[#A5A79B]/40 dark:border-[#590907]/50 shadow-xl hover:border-[#590907] dark:hover:border-[#E8D2B5] hover:shadow-glow-burgundy transition-all duration-300 flex flex-col justify-between group">
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-2xl bg-[#590907]/10 dark:bg-[#E8D2B5]/15 text-[#590907] dark:text-[#E8D2B5] border border-[#590907]/20 dark:border-[#E8D2B5]/30 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Mic className="w-6 h-6" />
                  </div>
                  <span className="text-[11px] font-mono px-3 py-1 rounded-full bg-[#590907]/10 dark:bg-[#E8D2B5]/15 text-[#590907] dark:text-[#E8D2B5] font-bold border border-[#590907]/20 dark:border-[#E8D2B5]/30 uppercase tracking-wider">
                    Executive Keynotes
                  </span>
                </div>

                <h3 className="font-headline font-bold text-2xl text-[#1C0707] dark:text-[#F7F1E6] tracking-tight group-hover:text-[#590907] dark:group-hover:text-[#E8D2B5] transition-colors">
                  Distinguished Guest Lectures
                </h3>

                <p className="mt-3 text-xs sm:text-sm text-[#590907]/75 dark:text-[#E8D2B5]/80 leading-relaxed font-body">
                  High-profile keynote sessions and interactive tech talks delivered by Staff AI Researchers, Engineering Directors, and Startup Founders from top technology institutions.
                </p>

                <div className="mt-5 space-y-2 border-t border-[#A5A79B]/25 dark:border-[#590907]/35 pt-4 text-xs font-mono text-[#590907]/80 dark:text-[#E8D2B5]/85">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#590907] dark:bg-[#E8D2B5]" />
                    <span>Real-world system design &amp; scale</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#590907] dark:bg-[#E8D2B5]" />
                    <span>Direct Q&amp;A with engineering leadership</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#590907] dark:bg-[#E8D2B5]" />
                    <span>Emerging AI frontiers &amp; industry trends</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-[#A5A79B]/20 dark:border-[#590907]/30 flex items-center justify-between text-xs font-mono text-[#590907] dark:text-[#E8D2B5] font-bold">
                <span>Practitioner Dialogue</span>
                <Users className="w-4 h-4 opacity-70" />
              </div>
            </div>
          </TiltCard>

          {/* Card 2: Innovation Hackathons & Build Sprints (Highlighted!) */}
          <TiltCard maxTilt={6} scale={1.02}>
            <div className="about-pillar-card h-full p-7 sm:p-8 rounded-3xl bg-white/95 dark:bg-[#200807]/95 backdrop-blur-xl border border-[#A5A79B]/40 dark:border-[#590907]/50 shadow-xl hover:border-[#590907] dark:hover:border-[#E8D2B5] hover:shadow-glow-burgundy transition-all duration-300 flex flex-col justify-between group">
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-2xl bg-[#590907]/10 dark:bg-[#E8D2B5]/15 text-[#590907] dark:text-[#E8D2B5] border border-[#590907]/20 dark:border-[#E8D2B5]/30 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Trophy className="w-6 h-6" />
                  </div>
                  <span className="text-[11px] font-mono px-3 py-1 rounded-full bg-[#590907]/10 dark:bg-[#E8D2B5]/15 text-[#590907] dark:text-[#E8D2B5] font-bold border border-[#590907]/20 dark:border-[#E8D2B5]/30 uppercase tracking-wider">
                    Build Challenges
                  </span>
                </div>

                <h3 className="font-headline font-bold text-2xl text-[#1C0707] dark:text-[#F7F1E6] tracking-tight group-hover:text-[#590907] dark:group-hover:text-[#E8D2B5] transition-colors">
                  Hackathons &amp; Sprints
                </h3>

                <p className="mt-3 text-xs sm:text-sm text-[#590907]/75 dark:text-[#E8D2B5]/80 leading-relaxed font-body">
                  High-energy 24-hour and 48-hour competitive engineering hackathons where student developer squads tackle real corporate challenge statements with live code commits.
                </p>

                <div className="mt-5 space-y-2 border-t border-[#A5A79B]/25 dark:border-[#590907]/35 pt-4 text-xs font-mono text-[#590907]/80 dark:text-[#E8D2B5]/85">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#590907] dark:bg-[#E8D2B5]" />
                    <span>Real-time mentor debugging &amp; code reviews</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#590907] dark:bg-[#E8D2B5]" />
                    <span>Cash awards &amp; incubation grants</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#590907] dark:bg-[#E8D2B5]" />
                    <span>Direct recruitment &amp; internship pipelines</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-[#A5A79B]/20 dark:border-[#590907]/30 flex items-center justify-between text-xs font-mono text-[#590907] dark:text-[#E8D2B5] font-bold">
                <span>Competitive Coding</span>
                <Award className="w-4 h-4 opacity-70" />
              </div>
            </div>
          </TiltCard>

          {/* Card 3: Intensive Hands-on Workshops */}
          <TiltCard maxTilt={6} scale={1.02}>
            <div className="about-pillar-card h-full p-7 sm:p-8 rounded-3xl bg-white/95 dark:bg-[#200807]/95 backdrop-blur-xl border border-[#A5A79B]/40 dark:border-[#590907]/50 shadow-xl hover:border-[#590907] dark:hover:border-[#E8D2B5] hover:shadow-glow-burgundy transition-all duration-300 flex flex-col justify-between group">
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-2xl bg-[#590907]/10 dark:bg-[#E8D2B5]/15 text-[#590907] dark:text-[#E8D2B5] border border-[#590907]/20 dark:border-[#E8D2B5]/30 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Code className="w-6 h-6" />
                  </div>
                  <span className="text-[11px] font-mono px-3 py-1 rounded-full bg-[#590907]/10 dark:bg-[#E8D2B5]/15 text-[#590907] dark:text-[#E8D2B5] font-bold border border-[#590907]/20 dark:border-[#E8D2B5]/30 uppercase tracking-wider">
                    Practical Immersions
                  </span>
                </div>

                <h3 className="font-headline font-bold text-2xl text-[#1C0707] dark:text-[#F7F1E6] tracking-tight group-hover:text-[#590907] dark:group-hover:text-[#E8D2B5] transition-colors">
                  Technical Workshops
                </h3>

                <p className="mt-3 text-xs sm:text-sm text-[#590907]/75 dark:text-[#E8D2B5]/80 leading-relaxed font-body">
                  Deep offline and online multi-day workshops focusing on Agentic AI, Autonomous Workflows, LLMOps, Cloud Security, and Distributed Systems with hands-on lab deployments.
                </p>

                <div className="mt-5 space-y-2 border-t border-[#A5A79B]/25 dark:border-[#590907]/35 pt-4 text-xs font-mono text-[#590907]/80 dark:text-[#E8D2B5]/85">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#590907] dark:bg-[#E8D2B5]" />
                    <span>Zero slide decks — live IDE code execution</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#590907] dark:bg-[#E8D2B5]" />
                    <span>Curriculum aligned with industry demand</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#590907] dark:bg-[#E8D2B5]" />
                    <span>Skill credentialing &amp; GitHub repos</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-[#A5A79B]/20 dark:border-[#590907]/30 flex items-center justify-between text-xs font-mono text-[#590907] dark:text-[#E8D2B5] font-bold">
                <span>Production Learning</span>
                <Sparkles className="w-4 h-4 opacity-70" />
              </div>
            </div>
          </TiltCard>
        </div>
      </div>
    </section>
  );
}
