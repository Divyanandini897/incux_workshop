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
        className="group relative flex flex-col justify-between w-[320px] sm:w-[400px] lg:w-[440px] flex-shrink-0 h-[500px] rounded-3xl bg-white/95 dark:bg-[#1c0707]/95 backdrop-blur-2xl border border-[#A5A79B]/40 dark:border-[#590907]/50 hover:border-[#590907] dark:hover:border-[#E8D2B5] hover:shadow-glow-burgundy transition-colors duration-500 p-7 sm:p-8 overflow-hidden shadow-2xl"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Layer 0: Visual Image Background with Mask Reveal & Smooth Zoom on Hover */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none rounded-3xl">
          <img
            src={bgImage}
            alt={card.title}
            className="w-full h-full object-cover object-center filter saturate-125 opacity-20 dark:opacity-30 group-hover:scale-115 group-hover:opacity-40 transition-all duration-700 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-white/85 to-transparent dark:from-[#1c0707] dark:via-[#1c0707]/90 dark:to-transparent" />
        </div>

        {/* Ambient Gradient Glow */}
        <div
          className="absolute -top-24 -right-24 w-56 h-56 rounded-full blur-3xl opacity-20 dark:opacity-30 bg-gradient-to-br from-[#590907] to-[#E8D2B5] pointer-events-none group-hover:opacity-50 transition-opacity"
        />

        {/* Layer 1: Top Header floating in 3D space */}
        <div className="relative z-10" style={{ transform: 'translateZ(25px)' }}>
          <div className="flex items-center justify-between text-xs font-mono mb-4 text-[#590907]/70 dark:text-[#E8D2B5]/70">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#590907] dark:bg-[#E8D2B5]" />
              <span className="text-[#590907] dark:text-[#E8D2B5] font-black text-lg tracking-wider">
                {card.number || '01'}
              </span>
            </div>
            <span className="px-3.5 py-1 rounded-full bg-white/90 dark:bg-[#250a09] text-[#1C0707] dark:text-[#E8D2B5] border border-[#A5A79B]/40 dark:border-[#590907]/40 font-medium text-xs shadow-sm">
              {card.category}
            </span>
          </div>

          <h3 className="font-headline font-bold text-2xl sm:text-3xl text-[#1C0707] dark:text-[#F7F1E6] group-hover:text-[#590907] dark:group-hover:text-[#E8D2B5] transition-colors leading-tight">
            {card.title}
          </h3>

          <div className="flex items-center gap-2 mt-3 text-xs font-mono text-[#590907]/80 dark:text-[#E8D2B5]/80">
            <MapPin className="w-3.5 h-3.5 text-[#A5A79B] flex-shrink-0" />
            <span>{card.location}</span>
          </div>
        </div>

        {/* Layer 2: Visual / Technical Specs Box with 3D Depth */}
        <div className="relative z-10 my-auto py-2" style={{ transform: 'translateZ(35px)' }}>
          <div className="p-4 rounded-2xl bg-white/85 dark:bg-[#140303]/90 backdrop-blur-md border border-[#A5A79B]/30 dark:border-[#590907]/40 text-xs font-mono space-y-2.5 shadow-inner group-hover:border-[#590907]/50 transition-colors">
            <div className="flex items-center justify-between text-[#590907]/70 dark:text-[#E8D2B5]/70 text-[11px]">
              <span className="uppercase tracking-wider font-semibold">FORMAT SPECS</span>
              <span className="text-[#590907] dark:text-[#E8D2B5] font-bold bg-[#590907]/10 dark:bg-[#E8D2B5]/10 px-2.5 py-0.5 rounded-full">
                {card.highlight}
              </span>
            </div>
            <p className="text-[#1C0707] dark:text-[#F7F1E6] text-xs sm:text-sm leading-relaxed font-body">
              {card.description}
            </p>
            <div className="pt-2 flex items-center justify-between text-[11px] text-[#590907]/70 dark:text-[#E8D2B5]/70 border-t border-[#A5A79B]/20 dark:border-[#590907]/30">
              <span className="flex items-center gap-1.5 text-[#1C0707] dark:text-[#F7F1E6] font-semibold">
                <BookmarkCheck className="w-3.5 h-3.5 text-[#590907] dark:text-[#E8D2B5]" />
                {card.tag}
              </span>
              <span className="text-[#590907] dark:text-[#E8D2B5] font-mono font-bold">[HANDS-ON FORMAT]</span>
            </div>
          </div>
        </div>

        {/* Layer 3: Card Footer with Interactive Action */}
        <div className="relative z-10 flex items-center justify-between pt-4 border-t border-[#A5A79B]/30 dark:border-[#590907]/40" style={{ transform: 'translateZ(20px)' }}>
          <span className="text-xs font-mono text-[#590907]/80 dark:text-[#E8D2B5]/80 font-medium">
            IncuxAI Workshop Series
          </span>
          <a
            href="#contact"
            className="w-11 h-11 rounded-full bg-[#E8D2B5]/30 dark:bg-[#250a09] border border-[#A5A79B]/40 dark:border-[#590907]/50 group-hover:bg-[#590907] group-hover:text-[#E8D2B5] text-[#590907] dark:text-[#E8D2B5] flex items-center justify-center transition-all duration-300 shadow-md group-hover:scale-110"
            aria-label={`Inquire about ${card.title}`}
          >
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>
      </div>
    </TiltCard>
  );
}
