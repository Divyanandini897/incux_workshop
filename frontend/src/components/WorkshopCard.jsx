import React from 'react';
import { MapPin, ArrowUpRight, BookmarkCheck, Sparkles } from 'lucide-react';
import TiltCard from './TiltCard';
import campusHallImg from '../assets/campus_hall_card.jpg';
import aiNetworkImg from '../assets/ai_network_card.jpg';
import auditoriumImg from '../assets/hero_cinematic_ai.jpg';

export default function WorkshopCard({ card }) {
  // Associate curated atmospheric visuals with each card format
  const getCardImage = (id) => {
    switch (id) {
      case 'iit-workshops':
        return campusHallImg;
      case 'online-workshops':
        return aiNetworkImg;
      case 'offline-colleges':
        return auditoriumImg;
      case 'guest-lectures':
        return campusHallImg;
      case 'ai-bootcamps':
        return aiNetworkImg;
      default:
        return auditoriumImg;
    }
  };

  const bgImage = getCardImage(card.id);

  return (
    <TiltCard maxTilt={6} scale={1.02} glare={true}>
      <div
        className="group relative flex flex-col justify-between w-[320px] sm:w-[400px] lg:w-[440px] flex-shrink-0 h-[500px] rounded-3xl bg-white/95 dark:bg-[#0a0f24]/95 backdrop-blur-2xl border border-neutral-200 dark:border-white/10 hover:border-cyan-500/80 dark:hover:border-cyan-400 hover:shadow-glow-cyan transition-colors duration-500 p-7 sm:p-8 overflow-hidden shadow-2xl"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Layer 0: Visual Image Background with Mask Reveal & Smooth Zoom on Hover */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none rounded-3xl">
          <img
            src={bgImage}
            alt={card.title}
            className="w-full h-full object-cover object-center filter saturate-125 opacity-20 dark:opacity-30 group-hover:scale-115 group-hover:opacity-40 transition-all duration-700 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-white/85 to-transparent dark:from-[#0a0f24] dark:via-[#0a0f24]/90 dark:to-transparent" />
        </div>

        {/* Ambient Gradient Glow */}
        <div
          className="absolute -top-24 -right-24 w-56 h-56 rounded-full blur-3xl opacity-20 dark:opacity-30 bg-gradient-to-br from-cyan-500 to-electric-600 pointer-events-none group-hover:opacity-50 transition-opacity"
        />

        {/* Layer 1: Top Header floating in 3D space */}
        <div className="relative z-10" style={{ transform: 'translateZ(25px)' }}>
          <div className="flex items-center justify-between text-xs font-mono mb-4 text-neutral-500 dark:text-textMuted">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-500 animate-ping" />
              <span className="text-cyan-600 dark:text-cyan-400 font-black text-lg tracking-wider">
                {card.number || '01'}
              </span>
            </div>
            <span className="px-3.5 py-1 rounded-full bg-white/90 dark:bg-navy-800/90 text-neutral-800 dark:text-cyan-200 border border-neutral-200 dark:border-white/10 font-medium text-xs shadow-sm">
              {card.category}
            </span>
          </div>

          <h3 className="font-headline font-bold text-2xl sm:text-3xl text-neutral-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors leading-tight">
            {card.title}
          </h3>

          <div className="flex items-center gap-2 mt-3 text-xs font-mono text-neutral-600 dark:text-neutral-300">
            <MapPin className="w-3.5 h-3.5 text-accent-orange flex-shrink-0" />
            <span>{card.location}</span>
          </div>
        </div>

        {/* Layer 2: Visual / Technical Specs Box with 3D Depth */}
        <div className="relative z-10 my-auto py-2" style={{ transform: 'translateZ(35px)' }}>
          <div className="p-4 rounded-2xl bg-white/85 dark:bg-[#070a14]/90 backdrop-blur-md border border-neutral-200 dark:border-white/10 text-xs font-mono space-y-2.5 shadow-inner group-hover:border-cyan-500/50 transition-colors">
            <div className="flex items-center justify-between text-neutral-500 dark:text-textMuted text-[11px]">
              <span className="uppercase tracking-wider font-semibold">FORMAT SPECS</span>
              <span className="text-cyan-600 dark:text-cyan-400 font-bold bg-cyan-500/10 dark:bg-cyan-400/10 px-2.5 py-0.5 rounded-full">
                {card.highlight}
              </span>
            </div>
            <p className="text-neutral-700 dark:text-neutral-300 text-xs sm:text-sm leading-relaxed font-body">
              {card.description}
            </p>
            <div className="pt-2 flex items-center justify-between text-[11px] text-neutral-500 dark:text-textMuted border-t border-neutral-200 dark:border-white/10">
              <span className="flex items-center gap-1.5 text-neutral-800 dark:text-neutral-200 font-semibold">
                <BookmarkCheck className="w-3.5 h-3.5 text-emerald-500 dark:text-accent-lime" />
                {card.tag}
              </span>
              <span className="text-cyan-600 dark:text-cyan-400 font-mono font-bold">[VERIFIED FORMAT]</span>
            </div>
          </div>
        </div>

        {/* Layer 3: Card Footer with Interactive Action */}
        <div className="relative z-10 flex items-center justify-between pt-4 border-t border-neutral-200 dark:border-white/10" style={{ transform: 'translateZ(20px)' }}>
          <span className="text-xs font-mono text-neutral-600 dark:text-neutral-400 font-medium">
            IncuxAI Workshop Series
          </span>
          <a
            href="#contact"
            className="w-11 h-11 rounded-full bg-neutral-100 dark:bg-navy-800 border border-neutral-300 dark:border-white/10 group-hover:bg-cyan-500 group-hover:text-dark-950 text-neutral-700 dark:text-neutral-300 flex items-center justify-center transition-all duration-300 shadow-md group-hover:scale-110"
            aria-label={`Inquire about ${card.title}`}
          >
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>
      </div>
    </TiltCard>
  );
}
