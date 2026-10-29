import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { expertiseData } from '../data/expertise';
import { Code2, Brain, Database, Shield, Briefcase, Sparkles, CheckCircle2 } from 'lucide-react';

const icons = {
  ai: Brain,
  'ai-emerging': Brain,
  software: Code2,
  'software-dev': Code2,
  data: Database,
  'data-analytics': Database,
  'cloud-sec': Shield,
  'cloud-cyber': Shield,
  professional: Briefcase,
  'professional-comm': Briefcase
};

export default function Expertise({ data = expertiseData }) {
  const groups = data?.groups && data.groups.length > 0 ? data.groups : expertiseData.groups;
  const [activeGroupId, setActiveGroupId] = useState(groups[0]?.id || 'ai');

  const currentGroup = groups.find((g) => g.id === activeGroupId) || groups[0];
  const IconComponent = icons[currentGroup?.id] || Brain;
  const currentCategoryName = currentGroup?.category || currentGroup?.name || "Curriculum Track";
  const currentGroupNumber = currentGroup?.index || currentGroup?.number || "01";

  return (
    <section
      id="expertise"
      className="relative w-full bg-[#FAF6F0] dark:bg-[#140303] py-24 border-t border-[#A5A79B]/30 dark:border-[#590907]/40 overflow-hidden transition-colors duration-200"
      aria-label="Workshop Expertise"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E8D2B5]/30 dark:bg-[#590907]/40 backdrop-blur-md border border-[#590907]/20 dark:border-[#E8D2B5]/30 text-xs font-mono text-[#590907] dark:text-[#E8D2B5] uppercase tracking-widest mb-4 font-semibold shadow-xs">
            <span className="w-2 h-2 rounded-full bg-[#590907] dark:bg-[#E8D2B5]" />
            <span>Section 07 // Curriculum Matrix</span>
          </div>
          <h2 className="font-headline font-bold text-3xl sm:text-5xl md:text-6xl text-neutral-950 dark:text-[#FAF6F0] tracking-tight leading-tight">
            Skills That Matter <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#590907] via-[#851614] to-[#590907] dark:from-[#E8D2B5] dark:via-white dark:to-[#E8D2B5] drop-shadow-sm">
              Beyond the Classroom
            </span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-neutral-700 dark:text-neutral-300 font-normal leading-relaxed">
            15 specialized modules spanning frontier AI, systems engineering, cloud security, and career execution.
          </p>
        </div>

        {/* 5 Group Selectors / Tabs with Animated Highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 mb-10">
          {groups.map((grp) => {
            const GroupIcon = icons[grp.id] || Brain;
            const isSelected = grp.id === activeGroupId;
            const label = grp.category || grp.name || 'Category';
            const num = grp.index || grp.number || '01';

            return (
              <button
                key={grp.id}
                type="button"
                onClick={() => setActiveGroupId(grp.id)}
                className={`relative group p-4 sm:p-5 rounded-2xl text-left border transition-all duration-300 flex flex-col justify-between min-h-[125px] cursor-pointer shadow-md overflow-hidden ${
                  isSelected
                    ? 'border-[#590907] dark:border-[#E8D2B5] shadow-glow-burgundy dark:shadow-glow-cream text-white'
                    : 'bg-white/90 dark:bg-[#200807]/90 backdrop-blur-md text-neutral-900 dark:text-[#FAF6F0] border-[#A5A79B]/30 dark:border-[#590907]/40 hover:border-[#590907] dark:hover:border-[#E8D2B5] hover:bg-neutral-50 dark:hover:bg-[#2a0b0a]'
                }`}
              >
                {/* Framer Motion Shared Layout Background for smooth tab pill sliding */}
                {isSelected && (
                  <motion.div
                    layoutId="activeExpertiseHighlight"
                    className="absolute inset-0 bg-gradient-to-r from-[#590907] to-[#7a1210] dark:from-[#590907] dark:to-[#3a0605] z-0"
                    transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
                  />
                )}

                <div className="relative z-10 flex items-center justify-between text-xs font-mono w-full">
                  <span className={`font-mono font-bold text-sm ${isSelected ? 'text-[#E8D2B5]' : 'text-[#590907] dark:text-[#E8D2B5]'}`}>
                    {num}
                  </span>
                  <GroupIcon className={`w-4 h-4 ${isSelected ? 'text-[#E8D2B5] stroke-[2.5]' : 'text-neutral-500 dark:text-neutral-400 group-hover:text-[#590907] dark:group-hover:text-[#E8D2B5]'}`} />
                </div>
                <div className="relative z-10 mt-3">
                  <span className={`font-headline font-bold text-sm leading-snug block ${
                    isSelected ? 'text-[#FAF6F0] font-extrabold' : 'text-neutral-900 dark:text-neutral-100 group-hover:text-[#590907] dark:group-hover:text-[#E8D2B5]'
                  }`}>
                    {label}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Group Showcase with Smooth AnimatePresence */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeGroupId}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
            className="p-8 sm:p-12 rounded-3xl bg-white/95 dark:bg-[#200807]/95 backdrop-blur-xl border border-[#A5A79B]/30 dark:border-[#590907]/40 shadow-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#590907]/10 dark:bg-[#E8D2B5]/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 border-b border-[#A5A79B]/30 dark:border-[#590907]/40">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-[#FAF6F0] dark:bg-[#140303] border border-[#A5A79B]/30 dark:border-[#590907]/40 flex items-center justify-center text-[#590907] dark:text-[#E8D2B5] shadow-inner">
                  <IconComponent className="w-7 h-7" />
                </div>
                <div>
                  <span className="text-xs font-mono text-[#590907] dark:text-[#E8D2B5] uppercase tracking-wider block font-bold">
                    Track {currentGroupNumber}
                  </span>
                  <h3 className="font-headline font-bold text-2xl sm:text-3xl text-neutral-900 dark:text-[#FAF6F0]">
                    {currentCategoryName}
                  </h3>
                </div>
              </div>

              <p className="max-w-md text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed font-body">
                {currentGroup?.description}
              </p>
            </div>

            {/* Topics Grid */}
            <div className="relative z-10 mt-8">
              <span className="text-xs font-mono text-[#590907] dark:text-[#E8D2B5] uppercase tracking-widest block mb-4 font-semibold">
                Core Modules &amp; Technical Focus:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {currentGroup?.topics?.map((topic, i) => (
                  <motion.div
                    key={topic}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.3 }}
                    className="p-4 rounded-2xl bg-[#FAF6F0] dark:bg-[#140303]/80 border border-[#A5A79B]/30 dark:border-[#590907]/30 flex items-start gap-3 hover:border-[#590907] dark:hover:border-[#E8D2B5] hover:-translate-y-0.5 transition-all shadow-xs"
                  >
                    <div className="w-2 h-2 rounded-full bg-[#590907] dark:bg-[#E8D2B5] mt-1.5 shrink-0" />
                    <div>
                      <h5 className="font-headline font-semibold text-sm text-neutral-900 dark:text-[#FAF6F0]">
                        {topic}
                      </h5>
                      <span className="text-[10px] font-mono text-neutral-500 dark:text-neutral-400 mt-0.5 block">
                        Hands-On Lab Curriculum
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
