import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { featuredWorkshops } from '../data/workshops';
import {
  Calendar,
  Users,
  User,
  MapPin,
  Sparkles,
  RotateCw,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Award
} from 'lucide-react';
import campusHallImg from '../assets/campus_hall_card.jpg';
import auditoriumImg from '../assets/hero_cinematic_ai.jpg';

gsap.registerPlugin(ScrollTrigger);

function TurningWorkshopCard({ item, index, isProminent }) {
  const [isTurned, setIsTurned] = useState(false);
  const cardBg = index === 0 ? campusHallImg : auditoriumImg;

  return (
    <div
      onMouseEnter={() => setIsTurned(true)}
      onMouseLeave={() => setIsTurned(false)}
      onClick={() => setIsTurned(!isTurned)}
      className="featured-card [perspective:1400px] h-[460px] sm:h-[480px] w-full select-none cursor-pointer"
    >
      {/* 3D Rotating Inner Card Body */}
      <div
        style={{
          transform: isTurned ? 'rotateY(180deg)' : 'rotateY(0deg)',
          transformStyle: 'preserve-3d',
          transition: 'transform 0.75s cubic-bezier(0.25, 1, 0.5, 1)'
        }}
        className="relative w-full h-full rounded-3xl"
      >
        {/* ================= FRONT FACE ================= */}
        <div
          style={{ backfaceVisibility: 'hidden' }}
          className={`absolute inset-0 rounded-3xl p-7 sm:p-8 bg-white dark:bg-[#0c1228] border transition-all duration-300 shadow-xl flex flex-col justify-between overflow-hidden ${
            isTurned
              ? 'border-blue-500/80 shadow-glow-cyan'
              : 'border-neutral-300 dark:border-white/20 hover:border-blue-500/60'
          }`}
        >
          {/* Subtle Image Reveal in background */}
          <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-10">
            <img
              src={cardBg}
              alt={item.title}
              className="w-full h-full object-cover filter saturate-120"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-transparent dark:from-[#0c1228] dark:via-[#0c1228]/80 dark:to-transparent" />
          </div>

          {/* Oversized Ghost Watermark Number */}
          <div className="absolute top-2 right-4 text-6xl sm:text-7xl font-headline font-black text-neutral-900/[0.04] dark:text-white/[0.04] select-none pointer-events-none">
            0{index + 1}
          </div>

          {/* Top Meta */}
          <div className="relative z-10">
            <div className="flex items-center justify-between text-xs font-mono mb-4 text-neutral-600 dark:text-neutral-300">
              <span className="px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/80 text-blue-700 dark:text-cyan-300 border border-blue-400/30 font-bold">
                {item.badge}
              </span>
              <span className="text-blue-600 dark:text-cyan-400 font-bold font-mono">0{index + 1}</span>
            </div>

            <h3 className="font-headline font-extrabold text-2xl sm:text-3xl text-neutral-950 dark:text-white leading-tight">
              {item.title}
            </h3>

            {item.association && (
              <div className="mt-3.5 p-3 rounded-2xl bg-neutral-100 dark:bg-white/5 border border-neutral-300 dark:border-white/10 text-xs font-mono text-neutral-800 dark:text-neutral-200">
                <span className="text-blue-600 dark:text-cyan-400 block font-bold mb-0.5">Partnership:</span>
                {item.association}
              </div>
            )}
          </div>

          {/* Technical Facts Box */}
          <div className="relative z-10 my-4 space-y-2.5 py-3 border-y border-neutral-200 dark:border-white/10 text-xs font-mono">
            <div className="flex items-start gap-2.5 text-neutral-800 dark:text-neutral-200">
              <Calendar className="w-4 h-4 text-blue-600 dark:text-cyan-400 flex-shrink-0 mt-0.5" />
              <div>
                <span className="text-neutral-600 dark:text-neutral-400 block text-[10px] font-bold">DATES</span>
                <span className="font-bold text-neutral-950 dark:text-white">{item.dates}</span>
              </div>
            </div>

            <div className="flex items-start gap-2.5 text-neutral-800 dark:text-neutral-200">
              <Users className="w-4 h-4 text-blue-600 dark:text-cyan-400 flex-shrink-0 mt-0.5" />
              <div>
                <span className="text-neutral-600 dark:text-neutral-400 block text-[10px] font-bold">PARTICIPANTS</span>
                <span className="font-bold text-blue-600 dark:text-cyan-400 text-sm">{item.participants} Students</span>
              </div>
            </div>

            <div className="flex items-start gap-2.5 text-neutral-800 dark:text-neutral-200">
              <User className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
              <div>
                <span className="text-neutral-600 dark:text-neutral-400 block text-[10px] font-bold">SPEAKER / PRACTITIONER</span>
                <span className="font-bold text-neutral-950 dark:text-white">{item.speaker}</span>
              </div>
            </div>
          </div>

          {/* Bottom Turn Hint */}
          <div className="relative z-10 flex items-center justify-between text-xs font-mono pt-1 text-neutral-600 dark:text-neutral-400">
            <span className="flex items-center gap-1.5 text-neutral-800 dark:text-neutral-200 font-semibold truncate max-w-[180px]">
              <MapPin className="w-3.5 h-3.5 text-blue-600 dark:text-cyan-400" />
              {item.location}
            </span>
            <span className="inline-flex items-center gap-1.5 text-blue-600 dark:text-cyan-400 font-bold bg-blue-50 dark:bg-blue-950/80 px-2.5 py-1 rounded-full border border-blue-400/30">
              <RotateCw className="w-3.5 h-3.5 animate-spin-slow" />
              <span>Hover to Turn ↻</span>
            </span>
          </div>
        </div>

        {/* ================= BACK FACE (REVEALED WHEN TURNED) ================= */}
        <div
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)'
          }}
          className="absolute inset-0 rounded-3xl p-7 sm:p-8 bg-gradient-to-br from-blue-950 via-[#0c163b] to-[#070d24] text-white border border-blue-400/60 shadow-2xl flex flex-col justify-between overflow-hidden"
        >
          {/* Subtle Ambient Back Glow */}
          <div className="absolute top-0 right-0 w-44 h-44 bg-cyan-500/20 rounded-full blur-2xl pointer-events-none" />

          {/* Back Face Header */}
          <div className="relative z-10">
            <div className="flex items-center justify-between pb-3 border-b border-white/10 text-xs font-mono">
              <span className="text-cyan-300 font-bold uppercase tracking-wider flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-cyan-400" />
                Syllabus Verification
              </span>
              <span className="bg-cyan-500/20 text-cyan-200 px-2.5 py-0.5 rounded-full text-[10px] font-bold border border-cyan-400/30">
                AUDITED OUTCOME
              </span>
            </div>

            <h4 className="font-headline font-extrabold text-xl sm:text-2xl text-white mt-4 leading-tight">
              {item.title}
            </h4>
            <p className="text-xs font-mono text-cyan-300 mt-1">
              Location: {item.location}
            </p>
          </div>

          {/* Practitioner Syllabus Takeaways */}
          <div className="relative z-10 my-auto py-2 space-y-3">
            <div className="text-[11px] font-mono uppercase tracking-wider text-neutral-300 font-bold">
              Cohort Engineering Deliverables:
            </div>
            <ul className="space-y-2 text-xs font-body text-neutral-200">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span>Hands-on industrial architecture teardown &amp; sandbox environments</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span>Direct practitioner mentoring led by verified enterprise leads</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span>Enduring code repositories and project capstone reviews</span>
              </li>
            </ul>
          </div>

          {/* Back Face Action & Turn-Back Cue */}
          <div className="relative z-10 pt-4 border-t border-white/10 flex items-center justify-between">
            <a
              href="#contact"
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-mono text-xs font-bold shadow-md shadow-blue-500/30 transition-all hover:scale-105"
            >
              <span>Inquire Format</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>

            <span className="text-[11px] font-mono text-cyan-300/80 flex items-center gap-1">
              <span>Move away to return ↺</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function FeaturedWorkshops({ workshops = featuredWorkshops }) {
  const sectionRef = useRef(null);
  const prominent = workshops.filter((w) => w.prominent);
  const secondary = workshops.filter((w) => !w.prominent);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Use gentle fromTo with clearProps so cards are NEVER stuck at opacity:0
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".featured-card",
        { opacity: 0.3, y: 25 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.08,
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
  }, [workshops]);

  return (
    <section
      id="featured"
      ref={sectionRef}
      className="relative w-full bg-[#f8f7f2] dark:bg-[#070b1a] py-24 border-t border-neutral-300 dark:border-white/15 overflow-hidden transition-colors duration-200"
      aria-label="Featured Workshops"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/80 border border-blue-400/40 text-xs font-mono text-blue-700 dark:text-cyan-300 uppercase tracking-widest mb-4 font-bold shadow-xs">
            <span className="w-2 h-2 rounded-full bg-blue-500 dark:bg-cyan-400 animate-ping" />
            <span>Section 06 // Verified Cohorts</span>
          </div>
          <h2 className="font-headline font-extrabold text-3xl sm:text-5xl md:text-6xl text-neutral-950 dark:text-white tracking-tight leading-tight">
            Workshops That <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-400 dark:from-cyan-400 dark:via-blue-400 dark:to-cyan-300 drop-shadow-sm">
              Make an Impact
            </span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-neutral-700 dark:text-neutral-200 font-medium leading-relaxed">
            Five verified engineering workshops and university immersions with reported participation,
            speaker leadership, and hands-on laboratory outcomes. Move cursor over any card to turn it.
          </p>
        </div>

        {/* 1. Prominent Row: 3 Featured Turning Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 mb-8">
          {prominent.map((item, idx) => (
            <TurningWorkshopCard
              key={item.id}
              item={item}
              index={idx}
              isProminent={true}
            />
          ))}
        </div>

        {/* 2. Secondary Row: 2 Turning Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {secondary.map((item, idx) => (
            <TurningWorkshopCard
              key={item.id}
              item={item}
              index={prominent.length + idx}
              isProminent={false}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
