import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import WorkshopCard from './WorkshopCard';
import TiltCard from './TiltCard';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function OurWork({ cards = [] }) {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const progressBarRef = useRef(null);

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);

  // GSAP Pinned Horizontal Scroll on Desktop
  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    // Use GSAP context for proper cleanup in React
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // Only pin and horizontal-scroll on desktop screens (>= 1024px)
      mm.add("(min-width: 1024px)", () => {
        // Calculate the total horizontal distance the track needs to travel
        const getScrollDistance = () => track.scrollWidth - window.innerWidth + 120;

        const tween = gsap.to(track, {
          x: () => -getScrollDistance(),
          ease: "none",
          scrollTrigger: {
            trigger: section,
            pin: true,
            scrub: 0.8,
            start: "top top",
            end: () => `+=${getScrollDistance() + 400}`,
            invalidateOnRefresh: true,
            anticipatePin: 1,
            onUpdate: (self) => {
              if (progressBarRef.current) {
                progressBarRef.current.style.width = `${Math.max(15, self.progress * 100)}%`;
              }
            }
          }
        });

        return () => {
          tween.kill();
        };
      });
    }, section);

    return () => ctx.revert();
  }, [cards]);

  // Touch and button scroll support for mobile/tablet
  const checkMobileScroll = () => {
    if (!trackRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = trackRef.current;
    setCanScrollLeft(scrollLeft > 20);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 20);

    const maxScroll = scrollWidth - clientWidth;
    if (maxScroll > 0) {
      setScrollProgress((scrollLeft / maxScroll) * 100);
      if (progressBarRef.current) {
        progressBarRef.current.style.width = `${Math.max(15, (scrollLeft / maxScroll) * 100)}%`;
      }
    }
  };

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    track.addEventListener('scroll', checkMobileScroll, { passive: true });
    return () => track.removeEventListener('scroll', checkMobileScroll);
  }, [cards]);

  const scrollManual = (direction) => {
    if (!trackRef.current) return;
    const scrollAmount = 440;
    trackRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth'
    });
  };

  return (
    <section
      ref={sectionRef}
      id="our-work"
      className="relative w-full bg-[#f4f2ec] dark:bg-[#070a14] py-16 sm:py-24 overflow-hidden border-t border-neutral-200 dark:border-white/10 transition-colors duration-200"
      aria-label="Our Work Section"
    >
      {/* Background ambient orbs */}
      <div className="absolute top-1/2 -right-32 w-80 h-80 rounded-full bg-cyan-500/10 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 rounded-full bg-electric-600/10 blur-[120px] pointer-events-none" />

      {/* Header Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 sm:mb-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 dark:bg-navy-900/90 backdrop-blur-md border border-neutral-200 dark:border-white/10 text-xs font-mono text-cyan-600 dark:text-cyan-400 uppercase tracking-widest mb-4 font-semibold shadow-sm">
              <span className="w-2 h-2 rounded-full bg-cyan-500 animate-ping" />
              <span>Section 03 // Workshop Formats</span>
            </div>
            <h2 className="font-headline font-bold text-3xl sm:text-5xl md:text-6xl text-neutral-950 dark:text-white tracking-tight leading-tight">
              Where Ideas Become <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-electric-600 to-accent-emerald dark:from-cyan-400 dark:via-electric-500 dark:to-accent-lime drop-shadow-sm">
                Experience
              </span>
            </h2>
          </div>

          <div className="flex flex-col md:items-end gap-3">
            <span className="text-xs font-mono text-neutral-500 dark:text-neutral-400 hidden lg:inline-block">
              [Scroll vertically to explore formats]
            </span>
            {/* Navigation Scroll Buttons (Visible on mobile/tablet or manual nudge) */}
            <div className="flex items-center gap-2 lg:hidden">
              <button
                onClick={() => scrollManual('left')}
                disabled={!canScrollLeft}
                aria-label="Scroll left"
                className="w-11 h-11 rounded-full bg-white dark:bg-navy-900 border border-neutral-300 dark:border-white/10 flex items-center justify-center text-neutral-800 dark:text-white hover:bg-cyan-500 hover:text-dark-950 disabled:opacity-30 disabled:pointer-events-none transition-all cursor-pointer shadow-md"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => scrollManual('right')}
                disabled={!canScrollRight}
                aria-label="Scroll right"
                className="w-11 h-11 rounded-full bg-white dark:bg-navy-900 border border-neutral-300 dark:border-white/10 flex items-center justify-center text-neutral-800 dark:text-white hover:bg-cyan-500 hover:text-dark-950 disabled:opacity-30 disabled:pointer-events-none transition-all cursor-pointer shadow-md"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Scroll Progress Bar Synchronized with GSAP Pinned Scroll */}
        <div className="w-full h-1.5 bg-neutral-200 dark:bg-navy-900 rounded-full mt-6 overflow-hidden">
          <div
            ref={progressBarRef}
            className="h-full bg-gradient-to-r from-electric-600 via-cyan-500 to-accent-lime transition-all duration-100 rounded-full"
            style={{ width: `${Math.max(15, scrollProgress)}%` }}
          />
        </div>
      </div>

      {/* Pinned Horizontal Scrolling Track */}
      <div className="w-full">
        <div
          ref={trackRef}
          className="flex gap-6 sm:gap-8 px-4 sm:px-6 lg:px-12 overflow-x-auto lg:overflow-visible no-scrollbar pb-8 cursor-grab active:cursor-grabbing will-change-transform"
          style={{ scrollSnapType: 'none' }}
        >
          {cards.map((card) => (
            <div key={card.id} className="shrink-0">
              <WorkshopCard card={card} />
            </div>
          ))}

          {/* End card with CTA to connect */}
          <TiltCard maxTilt={6} scale={1.02}>
            <div
              className="w-[320px] sm:w-[380px] lg:w-[420px] flex-shrink-0 h-[500px] rounded-3xl bg-white dark:bg-[#0a0f24] border border-dashed border-neutral-300 dark:border-cyan-500/30 p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden group hover:border-cyan-400 transition-colors"
            >
              <div className="absolute top-0 right-0 w-36 h-36 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />
              <div className="space-y-4 relative z-10">
                <span className="text-xs font-mono text-blue-600 dark:text-cyan-400 uppercase tracking-widest block font-bold">
                  // Custom Cohorts
                </span>
                <h3 className="font-headline font-bold text-2xl sm:text-3xl text-neutral-900 dark:text-white leading-tight">
                  Need a Custom Program for Your Institution?
                </h3>
                <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed font-body">
                  We structure syllabus-aligned modules, credit-linked workshops, and hackathon series with faculty boards.
                </p>
              </div>

              <a
                href="#contact"
                className="relative z-10 inline-flex items-center justify-between px-6 py-4 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-headline font-bold text-xs uppercase tracking-wider shadow-lg shadow-blue-500/25 hover:shadow-cyan-500/35 transition-all shadow-md group-hover:scale-105"
              >
                <span>Request Curriculum</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </TiltCard>
        </div>
      </div>
    </section>
  );
}
