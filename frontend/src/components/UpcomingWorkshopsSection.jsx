import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, Users, Sparkles, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { fetchUpcomingWorkshops } from '../services/api';

const categoryImages = {
  default: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80",
  "Agentic AI": "https://images.unsplash.com/photo-1677442136019-21780efad99a?w=600&auto=format&fit=crop&q=80",
  "Generative AI": "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=600&auto=format&fit=crop&q=80",
  "Cloud Security": "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&auto=format&fit=crop&q=80",
  "Full Stack": "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&auto=format&fit=crop&q=80"
};

export default function UpcomingWorkshopsSection({ onOpenPortal, onOpenAuth, currentUser }) {
  const [workshops, setWorkshops] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const scrollContainerRef = React.useRef(null);

  useEffect(() => {
    const load = async () => {
      const data = await fetchUpcomingWorkshops();
      setWorkshops(data);
    };
    load();
  }, []);

  const handleAction = (ws) => {
    if (!currentUser) {
      onOpenAuth('candidate');
    } else {
      onOpenPortal();
    }
  };

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 380;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const categories = ['All', 'Agentic AI', 'Generative AI', 'Cloud Security', 'Full Stack'];

  const filteredWorkshops = activeCategory === 'All'
    ? workshops
    : workshops.filter(ws => ws.category?.toLowerCase().includes(activeCategory.toLowerCase().split(' ')[0]));

  const displayList = filteredWorkshops.length > 0 ? filteredWorkshops : workshops;

  return (
    <section
      id="upcoming-workshops"
      className="relative w-full bg-[#FAF6F0] dark:bg-[#140303] py-20 sm:py-24 border-t border-[#A5A79B]/30 dark:border-[#590907]/40 overflow-hidden transition-colors duration-200"
      aria-label="Upcoming Workshops and Registrations"
    >
      {/* Background ambient glow */}
      <div className="absolute top-1/4 -left-32 w-80 h-80 rounded-full bg-[#590907]/15 dark:bg-[#590907]/25 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-80 h-80 rounded-full bg-[#E8D2B5]/20 dark:bg-[#E8D2B5]/10 blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 sm:mb-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 dark:bg-[#1c0707]/90 backdrop-blur-md border border-[#A5A79B]/40 dark:border-[#590907]/50 text-xs font-mono text-[#590907] dark:text-[#E8D2B5] uppercase tracking-widest mb-4 font-semibold shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-[#590907] dark:text-[#E8D2B5]" />
              <span>Upcoming Workshops // Open For Registration</span>
            </div>
            <h2 className="font-headline font-bold text-3xl sm:text-5xl md:text-6xl text-[#1C0707] dark:text-[#F7F1E6] tracking-tight leading-tight">
              Upcoming Workshops &amp; <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#590907] via-[#9e2320] to-[#A5A79B] dark:from-[#E8D2B5] dark:via-[#d4bea0] dark:to-[#A5A79B]">
                Open For Registration
              </span>
            </h2>
            <p className="mt-4 text-sm sm:text-base text-[#590907]/80 dark:text-[#E8D2B5]/85 font-normal leading-relaxed max-w-xl">
              Workshop cohorts actively accepting candidate registrations. Scroll horizontally to explore all workshops.
            </p>
          </div>

          {/* Scroll Navigation Buttons */}
          <div className="flex items-center gap-2.5 shrink-0">
            <button
              onClick={() => scroll('left')}
              aria-label="Scroll workshops left"
              className="w-11 h-11 rounded-full bg-white dark:bg-[#200807] border border-[#A5A79B]/40 dark:border-[#590907]/50 flex items-center justify-center text-[#1C0707] dark:text-[#E8D2B5] hover:bg-[#590907] hover:text-[#E8D2B5] transition-all shadow-md cursor-pointer active:scale-95"
            >
              <ArrowRight className="w-5 h-5 rotate-180" />
            </button>
            <button
              onClick={() => scroll('right')}
              aria-label="Scroll workshops right"
              className="w-11 h-11 rounded-full bg-[#590907] hover:bg-[#781210] text-[#E8D2B5] border border-[#590907] flex items-center justify-center transition-all shadow-md cursor-pointer active:scale-95"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Workshop Names Auto-Scrolling Ticker */}
        {workshops.length > 0 && (
          <div className="w-full overflow-hidden bg-white/70 dark:bg-[#200807]/70 backdrop-blur-md rounded-2xl border border-[#A5A79B]/30 dark:border-[#590907]/40 py-2.5 px-4 mb-8 select-none">
            <div className="animate-marquee flex gap-8 whitespace-nowrap text-xs font-mono font-bold text-[#590907] dark:text-[#E8D2B5]">
              {workshops.concat(workshops).map((w, i) => (
                <span key={`${w.id || i}-${i}`} className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#590907] dark:bg-[#E8D2B5]" />
                  <span>{w.title}</span>
                  <span className="text-[#A5A79B] font-normal">({w.dates})</span>
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2.5 sm:gap-3 overflow-x-auto pb-4 mb-6 sm:mb-8 no-scrollbar">
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 rounded-full font-headline font-bold text-xs uppercase tracking-wider transition-all duration-200 whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-[#590907] text-[#E8D2B5] shadow-md shadow-[#590907]/30'
                    : 'bg-white/90 dark:bg-[#200807]/90 backdrop-blur-md text-[#1C0707] dark:text-[#E8D2B5] border border-[#A5A79B]/40 dark:border-[#590907]/50 hover:border-[#590907] dark:hover:border-[#E8D2B5]'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Live Workshop Cards in a Fluid Horizontal Scroll Track */}
        <div
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto no-scrollbar scroll-smooth pb-6 pt-2 snap-x snap-mandatory"
        >
          {displayList.map((ws, idx) => {
            const seatsLeft = Math.max(0, ws.seats - (ws.registered || 0));
            const percentFilled = Math.min(100, Math.round(((ws.registered || 0) / ws.seats) * 100));
            const thumbnail = categoryImages[ws.category] || categoryImages.default;

            return (
              <div
                key={ws.id || idx}
                className="w-[300px] sm:w-[340px] lg:w-[360px] shrink-0 snap-start group rounded-3xl bg-white/95 dark:bg-[#1c0707]/95 backdrop-blur-xl border border-[#A5A79B]/30 dark:border-[#590907]/50 hover:border-[#590907] dark:hover:border-[#E8D2B5] hover:shadow-glow-burgundy hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-xl"
              >
                {/* Visual Header with LIVE Badge & Mode Pill */}
                <div className="relative h-44 w-full overflow-hidden bg-neutral-900">
                  <img
                    src={thumbnail}
                    alt={ws.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-85"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent pointer-events-none" />

                  {/* Top Status Badge */}
                  <div className="absolute top-3.5 left-3.5">
                    {seatsLeft > 0 ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#590907] text-[#E8D2B5] text-[10px] font-mono font-bold tracking-wider shadow-sm border border-[#E8D2B5]/30">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#E8D2B5]" />
                        LIVE COHORT
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#A5A79B] text-[#140303] text-[10px] font-mono font-bold tracking-wider shadow-sm">
                        FULL
                      </span>
                    )}
                  </div>

                  {/* Mode Pill */}
                  <div className="absolute top-3.5 right-3.5">
                    <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[10px] font-mono font-medium border border-white/20">
                      {ws.mode || 'In-Person Lab'}
                    </span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-xs font-mono mb-2 text-[#590907]/70 dark:text-[#E8D2B5]/70">
                      <span className="px-2.5 py-0.5 rounded-full bg-[#FAF6F0] dark:bg-[#140303] text-[#590907] dark:text-[#E8D2B5] font-bold text-[11px] border border-[#A5A79B]/20 dark:border-[#590907]/30">
                        {ws.category}
                      </span>
                      <span className="text-[11px] font-mono text-[#590907]/70 dark:text-[#E8D2B5]/70">
                        {ws.mode}
                      </span>
                    </div>

                    <h3 className="font-headline font-bold text-xl text-[#1C0707] dark:text-[#F7F1E6] group-hover:text-[#590907] dark:group-hover:text-[#E8D2B5] transition-colors leading-snug line-clamp-2">
                      {ws.title}
                    </h3>

                    <div className="my-3.5 space-y-1.5 text-xs font-mono text-[#590907]/80 dark:text-[#E8D2B5]/80">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-3.5 h-3.5 text-[#590907] dark:text-[#E8D2B5] flex-shrink-0" />
                        <span>{ws.dates}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-3.5 h-3.5 text-[#A5A79B] flex-shrink-0" />
                        <span className="truncate">{ws.location}</span>
                      </div>
                    </div>

                    <p className="text-xs text-[#590907]/70 dark:text-[#E8D2B5]/70 font-body line-clamp-2 leading-relaxed">
                      {ws.description}
                    </p>
                  </div>

                  {/* Capacity Bar & Quick Enroll Button */}
                  <div className="mt-5 pt-4 border-t border-[#A5A79B]/20 dark:border-[#590907]/30">
                    {/* Capacity Progress Bar */}
                    <div className="mb-3">
                      <div className="flex items-center justify-between text-[11px] font-mono mb-1">
                        <span className="text-[#590907]/70 dark:text-[#E8D2B5]/70">SEATS STATUS</span>
                        <span className="font-bold text-[#1C0707] dark:text-[#F7F1E6]">
                          {seatsLeft} / {ws.seats} left
                        </span>
                      </div>
                      <div className="w-full h-1.5 bg-[#A5A79B]/20 dark:bg-[#140303] rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-[#590907] via-[#781210] to-[#E8D2B5] rounded-full transition-all duration-500"
                          style={{ width: `${percentFilled}%` }}
                        />
                      </div>
                    </div>

                    <button
                      onClick={() => handleAction(ws)}
                      className="w-full py-2.5 rounded-xl bg-[#590907] hover:bg-[#781210] text-[#E8D2B5] font-headline font-bold text-xs uppercase tracking-wider shadow-md shadow-[#590907]/30 transition-all flex items-center justify-center gap-1.5 cursor-pointer active:scale-98"
                    >
                      <span>Enroll in Cohort</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
