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

  // Check scroll position for navigation buttons and progress bar
  const checkScroll = () => {
    if (!trackRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = trackRef.current;
    setCanScrollLeft(scrollLeft > 20);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 20);

    const maxScroll = scrollWidth - clientWidth;
    if (maxScroll > 0) {
      const progress = (scrollLeft / maxScroll) * 100;
      setScrollProgress(progress);
      if (progressBarRef.current) {
        progressBarRef.current.style.width = `${Math.max(15, progress)}%`;
      }
    }
  };

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    track.addEventListener('scroll', checkScroll, { passive: true });
    checkScroll();
    return () => track.removeEventListener('scroll', checkScroll);
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
      className="relative w-full bg-[#F4EFE6] dark:bg-[#180404] py-16 sm:py-24 overflow-hidden border-t border-[#A5A79B]/30 dark:border-[#590907]/40 transition-colors duration-200"
      aria-label="Our Work Section"
    >
      {/* Background ambient orbs */}
      <div className="absolute top-1/2 -right-32 w-80 h-80 rounded-full bg-[#590907]/15 dark:bg-[#590907]/25 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 rounded-full bg-[#E8D2B5]/20 dark:bg-[#E8D2B5]/10 blur-[120px] pointer-events-none" />

      {/* Header Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 sm:mb-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 dark:bg-[#200807]/90 backdrop-blur-md border border-[#A5A79B]/40 dark:border-[#590907]/50 text-xs font-mono text-[#590907] dark:text-[#E8D2B5] uppercase tracking-widest mb-4 font-semibold shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#590907] dark:bg-[#E8D2B5]" />
              <span>Section 03 // Workshop Formats</span>
            </div>
            <h2 className="font-headline font-bold text-3xl sm:text-5xl md:text-6xl text-[#1C0707] dark:text-[#F7F1E6] tracking-tight leading-tight">
              Where Ideas Become <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#590907] via-[#9e2320] to-[#A5A79B] dark:from-[#E8D2B5] dark:via-[#d4bea0] dark:to-[#A5A79B] drop-shadow-sm">
                Experience
              </span>
            </h2>
          </div>

          <div className="flex items-center gap-3">
            {/* Navigation Scroll Buttons (Visible on all screen sizes) */}
            <button
              onClick={() => scrollManual('left')}
              disabled={!canScrollLeft}
              aria-label="Scroll left"
              className="w-11 h-11 rounded-full bg-white dark:bg-[#200807] border border-[#A5A79B]/40 dark:border-[#590907]/50 flex items-center justify-center text-[#1C0707] dark:text-[#E8D2B5] hover:bg-[#590907] hover:text-[#E8D2B5] disabled:opacity-30 disabled:pointer-events-none transition-all cursor-pointer shadow-md"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scrollManual('right')}
              disabled={!canScrollRight}
              aria-label="Scroll right"
              className="w-11 h-11 rounded-full bg-white dark:bg-[#200807] border border-[#A5A79B]/40 dark:border-[#590907]/50 flex items-center justify-center text-[#1C0707] dark:text-[#E8D2B5] hover:bg-[#590907] hover:text-[#E8D2B5] disabled:opacity-30 disabled:pointer-events-none transition-all cursor-pointer shadow-md"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scroll Progress Bar */}
        <div className="w-full h-1.5 bg-[#A5A79B]/20 dark:bg-[#200807] rounded-full mt-6 overflow-hidden">
          <div
            ref={progressBarRef}
            className="h-full bg-gradient-to-r from-[#590907] via-[#781210] to-[#E8D2B5] transition-all duration-100 rounded-full"
            style={{ width: `${Math.max(15, scrollProgress)}%` }}
          />
        </div>
      </div>

      {/* Fluid Horizontal Scrolling Track */}
      <div className="w-full">
        <div
          ref={trackRef}
          className="flex gap-6 sm:gap-8 px-4 sm:px-6 lg:px-12 overflow-x-auto no-scrollbar scroll-smooth pb-8 cursor-grab active:cursor-grabbing snap-x snap-mandatory"
        >
          {cards.map((card) => (
            <div key={card.id} className="shrink-0">
              <WorkshopCard card={card} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
