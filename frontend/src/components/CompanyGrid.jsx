import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft,
  ChevronRight,
  Info,
  BookOpen,
  Sparkles,
  ArrowRight,
  Bookmark
} from 'lucide-react';
import { companiesData } from '../data/companies';
import {
  GoogleLogo,
  MicrosoftLogo,
  WalmartLogo,
  DeloitteLogo,
  TCSLogo,
  GenpactLogo,
  JohnsonAndJohnsonLogo,
  TechMahindraLogo
} from './CompanyLogos';

const logoMap = {
  Google: GoogleLogo,
  Walmart: WalmartLogo,
  Microsoft: MicrosoftLogo,
  Deloitte: DeloitteLogo,
  TCS: TCSLogo,
  Genpact: GenpactLogo,
  "Johnson & Johnson": JohnsonAndJohnsonLogo,
  "Tech Mahindra": TechMahindraLogo
};

export default function CompanyGrid({ data = companiesData }) {
  const { headline, disclaimer, companies } = data;
  const [currentPage, setCurrentPage] = useState(0);
  const [direction, setDirection] = useState(1);
  const bookRef = useRef(null);
  const lastTurnTimeRef = useRef(0);

  const totalPages = companies.length;
  const currentCompany = companies[currentPage] || companies[0];
  const LogoComponent = logoMap[currentCompany.name];

  const goToPage = (pageIndex) => {
    if (pageIndex === currentPage) return;
    setDirection(pageIndex > currentPage ? 1 : -1);
    setCurrentPage(pageIndex);
  };

  const nextPage = () => {
    const now = Date.now();
    if (now - lastTurnTimeRef.current < 450) return; // Prevent over-rapid firing
    lastTurnTimeRef.current = now;
    setDirection(1);
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const prevPage = () => {
    const now = Date.now();
    if (now - lastTurnTimeRef.current < 450) return;
    lastTurnTimeRef.current = now;
    setDirection(-1);
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  // Keyboard navigation for page turning
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') nextPage();
      if (e.key === 'ArrowLeft') prevPage();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentPage]);

  return (
    <section
      id="industry"
      ref={bookRef}
      className="relative w-full bg-[#f8f7f2] dark:bg-[#060919] py-20 md:py-28 border-t border-neutral-300 dark:border-white/15 overflow-hidden transition-colors duration-200"
      aria-label="Industry Connections"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-10 w-96 h-96 bg-blue-500/10 dark:bg-blue-500/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-cyan-500/10 dark:bg-cyan-500/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/80 border border-blue-400/40 text-xs font-mono text-blue-700 dark:text-cyan-300 uppercase tracking-widest mb-4 font-bold shadow-xs">
            <BookOpen className="w-3.5 h-3.5 text-blue-600 dark:text-cyan-400" />
            <span>Section 04 // Practitioner Pedigree</span>
          </div>

          <h2 className="font-headline font-extrabold text-3xl sm:text-5xl text-neutral-950 dark:text-white tracking-tight leading-tight">
            {headline}
          </h2>

          <p className="mt-4 text-base sm:text-lg text-neutral-700 dark:text-neutral-200 font-medium leading-relaxed">
            Our curriculum and mentorship draw directly from engineers, tech leads, and researchers
            with deep production backgrounds across premier technology institutions.
          </p>

          {/* Compliance Callout / Editorial Disclaimer */}
          <div className="mt-5 flex items-start gap-3 p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#0c1229] border border-neutral-300 dark:border-white/15 text-xs text-neutral-700 dark:text-neutral-300 leading-relaxed shadow-sm">
            <Info className="w-4 h-4 text-blue-600 dark:text-cyan-400 flex-shrink-0 mt-0.5" />
            <p className="font-mono text-[11px] sm:text-xs">
              <strong className="text-neutral-950 dark:text-white font-bold">Editorial Note:</strong> {disclaimer}
            </p>
          </div>
        </div>

        {/* 3D BOOK SHOWCASE CONTAINER */}
        <div className="relative mx-auto max-w-5xl [perspective:1800px]">
          {/* Book Spine Center Glow & Shadow */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/10 to-transparent blur-xl pointer-events-none" />

          {/* Main Book Shell */}
          <div className="relative rounded-3xl bg-neutral-900/10 dark:bg-black/40 p-2 sm:p-4 border border-neutral-300 dark:border-white/20 shadow-2xl backdrop-blur-xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[520px] rounded-2xl overflow-hidden bg-white dark:bg-[#0b1026] border border-neutral-300 dark:border-white/15 shadow-2xl">
              
              {/* LEFT PAGE: Folio Index & Hover-Turn Links (5 Columns on Desktop) */}
              <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-neutral-200 dark:border-white/10 bg-[#faf9f5] dark:bg-[#080d20] relative">
                {/* Book Gutter Shadow on the right edge */}
                <div className="hidden lg:block absolute top-0 right-0 w-8 h-full bg-gradient-to-l from-black/15 to-transparent pointer-events-none" />

                <div>
                  <div className="flex items-center justify-between pb-4 border-b border-neutral-200 dark:border-white/10">
                    <span className="text-xs font-mono font-bold uppercase tracking-widest text-blue-700 dark:text-cyan-400 flex items-center gap-1.5">
                      <Bookmark className="w-3.5 h-3.5 fill-current" />
                      Pedigree Folio
                    </span>
                    <span className="text-xs font-mono font-bold text-neutral-800 dark:text-neutral-200 bg-neutral-200 dark:bg-white/10 px-2.5 py-1 rounded-full">
                      PAGE 0{currentPage + 1} // 0{totalPages}
                    </span>
                  </div>

                  <h3 className="font-headline font-bold text-xl sm:text-2xl text-neutral-950 dark:text-white mt-4 tracking-tight">
                    Industry Records
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 mt-1 leading-relaxed">
                    Move your mouse over any company below to automatically turn to its page.
                  </p>

                  {/* Bookmark Navigation Links (8 Companies) with AUTOMATIC HOVER TURN */}
                  <div className="mt-5 space-y-1.5">
                    {companies.map((c, idx) => {
                      const isActive = idx === currentPage;
                      return (
                        <button
                          key={c.name}
                          onMouseEnter={() => goToPage(idx)}
                          onClick={() => goToPage(idx)}
                          className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-left font-mono text-xs transition-all duration-200 cursor-pointer ${
                            isActive
                              ? 'bg-blue-600/15 text-blue-700 dark:text-cyan-300 font-bold border border-blue-500/40 shadow-xs translate-x-1.5'
                              : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200/70 dark:hover:bg-white/5 hover:translate-x-1 border border-transparent'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <span className="w-5 text-[11px] opacity-70">0{idx + 1}</span>
                            <span className="font-headline font-semibold text-sm text-neutral-900 dark:text-white">
                              {c.name}
                            </span>
                          </div>
                          {isActive && (
                            <span className="flex items-center gap-1 text-[10px] text-blue-600 dark:text-cyan-400 font-bold">
                              OPEN
                              <ArrowRight className="w-3 h-3" />
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Left Page Bottom Controls with Automatic Turn on Mouse Hover */}
                <div className="pt-6 mt-6 border-t border-neutral-200 dark:border-white/10">
                  <div className="flex items-center justify-between gap-3">
                    <button
                      onMouseEnter={prevPage}
                      onClick={prevPage}
                      className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-white dark:bg-white/10 hover:bg-neutral-100 dark:hover:bg-white/20 text-neutral-900 dark:text-white font-mono text-xs font-bold border border-neutral-300 dark:border-white/15 transition-all shadow-xs active:scale-95 cursor-pointer"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      Prev Page
                    </button>
                    <button
                      onMouseEnter={nextPage}
                      onClick={nextPage}
                      className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-mono text-xs font-bold border border-blue-400/30 transition-all shadow-md active:scale-95 cursor-pointer"
                    >
                      Next Page
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="mt-3 text-center text-[11px] font-mono text-neutral-500 dark:text-neutral-400">
                    Hover over list or buttons to turn page automatically
                  </div>
                </div>
              </div>

              {/* RIGHT PAGE: ONLY Company Name & Logo (No Extra Matter) */}
              <div 
                onMouseEnter={nextPage}
                className="lg:col-span-7 p-8 sm:p-12 md:p-16 flex flex-col justify-between bg-white dark:bg-[#0b1026] relative overflow-hidden [perspective:1200px]"
              >
                {/* Book Gutter Shadow on the left edge */}
                <div className="hidden lg:block absolute top-0 left-0 w-8 h-full bg-gradient-to-r from-black/15 to-transparent pointer-events-none z-20" />

                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentPage}
                    initial={{
                      rotateY: direction > 0 ? 70 : -70,
                      opacity: 0,
                      transformOrigin: direction > 0 ? 'left center' : 'right center'
                    }}
                    animate={{
                      rotateY: 0,
                      opacity: 1,
                      transformOrigin: 'center center'
                    }}
                    exit={{
                      rotateY: direction > 0 ? -70 : 70,
                      opacity: 0,
                      transformOrigin: direction > 0 ? 'right center' : 'left center'
                    }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="flex flex-col justify-between h-full relative z-10 my-auto"
                  >
                    {/* Page Top Minimal Meta */}
                    <div className="flex items-center justify-between pb-6 border-b border-neutral-200 dark:border-white/10">
                      <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 dark:bg-blue-950/80 border border-blue-400/40 text-blue-700 dark:text-cyan-300 font-mono text-xs font-bold">
                        <Sparkles className="w-3.5 h-3.5 text-blue-600 dark:text-cyan-400" />
                        <span>RECORD 0{currentPage + 1} OF 0{totalPages}</span>
                      </div>
                      <span className="font-mono text-xs text-neutral-500 dark:text-neutral-400 font-semibold">
                        INCUXAI INDUSTRY PEDIGREE
                      </span>
                    </div>

                    {/* ONLY COMPANY LOGO & NAME (NO EXTRA MATTER) */}
                    <div className="my-auto py-12 flex flex-col items-center justify-center text-center">
                      {/* Prominent, Centered Official Logo */}
                      <div className="p-8 sm:p-10 rounded-3xl bg-neutral-50 dark:bg-white/[0.04] border border-neutral-200 dark:border-white/10 inline-flex items-center justify-center shadow-lg mb-8 hover:scale-105 transition-transform duration-300">
                        {LogoComponent && (
                          <div className="scale-125 sm:scale-150 transform">
                            <LogoComponent />
                          </div>
                        )}
                      </div>

                      {/* Prominent Company Name */}
                      <h3 className="font-headline font-black text-4xl sm:text-5xl md:text-6xl text-neutral-950 dark:text-white tracking-tight leading-tight">
                        {currentCompany.name}
                      </h3>
                    </div>

                    {/* Page Footer Navigation Cue */}
                    <div className="pt-6 border-t border-neutral-200 dark:border-white/10 flex items-center justify-between text-xs font-mono text-neutral-500 dark:text-neutral-400">
                      <span>PAGE {currentPage + 1} OF {totalPages}</span>
                      <span className="text-blue-600 dark:text-cyan-400 font-bold flex items-center gap-1">
                        Move mouse to turn page ⤵
                      </span>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
