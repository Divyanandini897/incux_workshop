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

  const categories = ['All', 'Agentic AI', 'Generative AI', 'Cloud Security', 'Full Stack'];

  const filteredWorkshops = activeCategory === 'All'
    ? workshops
    : workshops.filter(ws => ws.category?.toLowerCase().includes(activeCategory.toLowerCase().split(' ')[0]));

  return (
    <section
      id="upcoming-workshops"
      className="relative w-full bg-[#faf9f5] dark:bg-navy-950 py-24 border-t border-neutral-200 dark:border-white/10 overflow-hidden transition-colors duration-200"
      aria-label="Upcoming Workshops and Registrations"
    >
      {/* Background ambient glow */}
      <div className="absolute top-1/4 -left-32 w-80 h-80 rounded-full bg-electric-600/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-80 h-80 rounded-full bg-cyan-500/10 blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header (Original exact text preserved) */}
        <div className="max-w-3xl mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 dark:bg-navy-900/90 backdrop-blur-md border border-neutral-200 dark:border-white/10 text-xs font-mono text-cyan-600 dark:text-cyan-400 uppercase tracking-widest mb-4 font-semibold shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-cyan-500 animate-pulse" />
            <span>Live Registration Portal</span>
          </div>
          <h2 className="font-headline font-bold text-3xl sm:text-5xl md:text-6xl text-neutral-950 dark:text-white tracking-tight leading-tight">
            Upcoming Workshops &amp; <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-electric-600 to-accent-emerald dark:from-cyan-400 dark:to-accent-lime">
              Candidate Enrollment
            </span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-neutral-600 dark:text-neutral-300 font-normal leading-relaxed max-w-xl">
            Verified workshop cohorts actively accepting candidate registrations.
            Colleges and universities can also request workshops tailored to their specific campus location.
          </p>
        </div>

        {/* Category Filter Pills (Creative interactive addition) */}
        <div className="flex items-center gap-2.5 sm:gap-3 overflow-x-auto pb-4 mb-8 sm:mb-10 no-scrollbar">
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 rounded-full font-headline font-bold text-xs uppercase tracking-wider transition-all duration-200 whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-electric-600 to-cyan-500 text-white shadow-glow-cyan shadow-md'
                    : 'bg-white/90 dark:bg-navy-900/90 backdrop-blur-md text-neutral-700 dark:text-neutral-300 border border-neutral-300/80 dark:border-white/10 hover:border-cyan-500 dark:hover:border-cyan-400'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Live Workshop Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {(filteredWorkshops.length > 0 ? filteredWorkshops : workshops).map((ws, idx) => {
            const seatsLeft = Math.max(0, ws.seats - (ws.registered || 0));
            const percentFilled = Math.min(100, Math.round(((ws.registered || 0) / ws.seats) * 100));
            const thumbnail = categoryImages[ws.category] || categoryImages.default;

            return (
              <div
                key={ws.id || idx}
                className="group rounded-3xl bg-white/95 dark:bg-navy-900/90 backdrop-blur-xl border border-neutral-200 dark:border-white/10 hover:border-cyan-500/60 dark:hover:border-cyan-400/60 hover:shadow-glow-cyan hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-xl"
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
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-600/95 text-white text-[10px] font-mono font-bold tracking-wider shadow-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                        LIVE COHORT
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-3 py-1 rounded-full bg-amber-500 text-neutral-950 text-[10px] font-mono font-bold tracking-wider shadow-sm">
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
                    <div className="flex items-center justify-between text-xs font-mono mb-2 text-neutral-500">
                      <span className="px-2.5 py-0.5 rounded-full bg-neutral-100 dark:bg-navy-800 text-cyan-600 dark:text-cyan-300 font-bold text-[11px]">
                        {ws.category}
                      </span>
                      <span className="text-[11px] font-mono text-neutral-500 dark:text-neutral-400">
                        {ws.mode}
                      </span>
                    </div>

                    <h3 className="font-headline font-bold text-xl text-neutral-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors leading-snug">
                      {ws.title}
                    </h3>

                    <div className="my-3.5 space-y-1.5 text-xs font-mono text-neutral-600 dark:text-neutral-300">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400 flex-shrink-0" />
                        <span>{ws.dates}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-3.5 h-3.5 text-accent-orange flex-shrink-0" />
                        <span className="truncate">{ws.location}</span>
                      </div>
                    </div>

                    <p className="text-xs text-neutral-600 dark:text-neutral-400 font-body line-clamp-2 leading-relaxed">
                      {ws.description}
                    </p>
                  </div>

                  {/* Capacity Bar & Quick Enroll Button */}
                  <div className="mt-5 pt-4 border-t border-neutral-100 dark:border-white/10">
                    {/* Capacity Progress Bar */}
                    <div className="mb-3">
                      <div className="flex items-center justify-between text-[11px] font-mono mb-1">
                        <span className="text-neutral-500 dark:text-neutral-400">SEATS STATUS</span>
                        <span className="font-bold text-neutral-900 dark:text-white">
                          {seatsLeft} / {ws.seats} left
                        </span>
                      </div>
                      <div className="w-full h-1.5 bg-neutral-100 dark:bg-navy-950 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-electric-600 via-cyan-500 to-accent-lime rounded-full transition-all duration-500"
                          style={{ width: `${percentFilled}%` }}
                        />
                      </div>
                    </div>

                    <button
                      onClick={() => handleAction(ws)}
                      className="w-full py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-headline font-bold text-xs uppercase tracking-wider shadow-md shadow-blue-500/20 hover:shadow-cyan-500/30 transition-all flex items-center justify-center gap-1.5 cursor-pointer active:scale-98"
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

        {/* Campus Location Collaboration Card */}
        <div className="mt-12 sm:mt-16 p-8 rounded-3xl bg-gradient-to-r from-electric-600/10 via-cyan-500/15 to-violet-600/10 dark:from-navy-900/90 dark:via-navy-850/90 dark:to-navy-900/90 backdrop-blur-xl border border-cyan-500/30 dark:border-cyan-500/30 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="max-w-2xl">
            <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-600 dark:text-cyan-400 font-bold block mb-1">
              CAMPUS &amp; COLLEGE COLLABORATIONS
            </span>
            <h3 className="font-headline font-bold text-xl sm:text-2xl text-neutral-900 dark:text-white">
              Want These Workshops Conducted at Your College?
            </h3>
            <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 mt-2 leading-relaxed">
              Academic deans, faculty coordinators, and student tech clubs can request tailored workshops at their campus location.
              Our Admin team reviews requirements and approves scheduling within 24 hours.
            </p>
          </div>

          <button
            onClick={() => {
              if (!currentUser) {
                onOpenAuth('candidate');
              } else {
                onOpenPortal();
              }
            }}
            className="px-7 py-3.5 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-headline font-bold text-xs uppercase tracking-wider shadow-lg shadow-blue-500/25 hover:shadow-cyan-500/35 transition-all active:scale-95 shrink-0 cursor-pointer"
          >
            Request Campus Workshop
          </button>
        </div>
      </div>
    </section>
  );
}
