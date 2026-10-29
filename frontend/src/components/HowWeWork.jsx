import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { siteConfig } from '../data/config';
import {
  Search,
  PenTool,
  Radio,
  Rocket,
  RotateCw,
  RotateCcw,
  CheckCircle2,
  Sparkles,
  ArrowRight
} from 'lucide-react';

const stepIcons = [Search, PenTool, Radio, Rocket];

export default function HowWeWork() {
  const { subtitle, steps } = siteConfig.howWeWork;
  const [activeStepIdx, setActiveStepIdx] = useState(0);
  const [isAutoTurning, setIsAutoTurning] = useState(false);
  const sectionRef = useRef(null);

  const totalSteps = steps.length;

  const nextStep = () => {
    setActiveStepIdx((prev) => (prev + 1) % totalSteps);
  };

  const prevStep = () => {
    setActiveStepIdx((prev) => (prev - 1 + totalSteps) % totalSteps);
  };

  // Auto-rotate the cards step by step for every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStepIdx((prev) => (prev + 1) % totalSteps);
    }, 3000);
    return () => clearInterval(interval);
  }, [totalSteps]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') nextStep();
      if (e.key === 'ArrowLeft') prevStep();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Compute 3D circular positions for the 4 steps
  // Radius for circular orbit
  const radius = 280;

  return (
    <section
      id="how-we-work"
      ref={sectionRef}
      className="relative w-full bg-[#FAF6F0] dark:bg-[#140303] py-24 sm:py-32 border-t border-[#A5A79B]/30 dark:border-[#590907]/40 overflow-hidden transition-colors duration-200 select-none"
      aria-label="How We Work"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[#590907]/10 dark:bg-[#E8D2B5]/10 blur-[150px] pointer-events-none rounded-full" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E8D2B5]/30 dark:bg-[#590907]/40 border border-[#590907]/20 dark:border-[#E8D2B5]/30 text-xs font-mono text-[#590907] dark:text-[#E8D2B5] uppercase tracking-widest mb-4 font-bold shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#590907] dark:bg-[#E8D2B5]" />
              <span>Section 08 // Operational Delivery</span>
            </div>
            <h2 className="font-headline font-extrabold text-3xl sm:text-5xl md:text-6xl text-neutral-950 dark:text-[#FAF6F0] tracking-tight leading-tight">
              From Collaboration to <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#590907] via-[#851614] to-[#590907] dark:from-[#E8D2B5] dark:via-white dark:to-[#E8D2B5] drop-shadow-sm">
                Practical Learning
              </span>
            </h2>
            <p className="mt-4 text-base sm:text-lg text-neutral-700 dark:text-neutral-300 font-medium leading-relaxed">
              {subtitle}
            </p>
          </div>

          {/* Step Selector Dial Tabs */}
          <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-2xl bg-white dark:bg-[#200807] border border-[#A5A79B]/30 dark:border-[#590907]/40 shadow-sm">
            {steps.map((step, idx) => (
              <button
                key={`tab-${step.step}`}
                onClick={() => setActiveStepIdx(idx)}
                className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                  activeStepIdx === idx
                    ? 'bg-gradient-to-r from-[#590907] to-[#7a1210] dark:from-[#590907] dark:to-[#3a0605] text-[#FAF6F0] shadow-md shadow-[#590907]/25 scale-105'
                    : 'text-neutral-700 dark:text-[#FAF6F0] hover:text-[#590907] dark:hover:text-[#E8D2B5] hover:bg-[#FAF6F0] dark:hover:bg-[#140303]'
                }`}
              >
                {step.step} {step.tag.split(' ')[0]}
              </button>
            ))}
          </div>
        </div>

        {/* 3D CIRCULAR CAROUSEL REVOLVING STAGE */}
        <div className="relative w-full max-w-5xl mx-auto min-h-[540px] flex flex-col items-center justify-center [perspective:1800px] my-6">
          
          {/* Circular Orbit Ring in the center */}
          <div className="absolute w-[440px] sm:w-[560px] h-[440px] sm:h-[560px] rounded-full border border-[#590907]/20 dark:border-[#E8D2B5]/20 pointer-events-none flex items-center justify-center">
            {/* Center hub */}
            <div className="w-20 h-20 rounded-full bg-[#590907]/5 dark:bg-[#E8D2B5]/5 border border-[#590907]/30 dark:border-[#E8D2B5]/30 flex items-center justify-center">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#590907] to-[#851614] dark:from-[#E8D2B5] dark:to-[#FAF6F0] shadow-sm" />
            </div>
            
            {/* 4 Orbital Node Markers on the Circle */}
            {[0, 1, 2, 3].map((nodeIdx) => {
              const nodeAngle = nodeIdx * 90;
              const rad = (nodeAngle * Math.PI) / 180;
              const nx = Math.cos(rad) * 220;
              const ny = Math.sin(rad) * 220;
              const isCurrent = nodeIdx === activeStepIdx;
              return (
                <div
                  key={`node-${nodeIdx}`}
                  style={{ transform: `translate(${nx}px, ${ny}px)` }}
                  className={`absolute w-4 h-4 rounded-full border-2 transition-all duration-500 flex items-center justify-center ${
                    isCurrent
                      ? 'bg-[#590907] dark:bg-[#E8D2B5] border-white dark:border-[#140303] scale-150 shadow-glow-burgundy dark:shadow-glow-cream'
                      : 'bg-[#A5A79B]/40 dark:bg-[#590907]/40 border-white dark:border-[#140303]'
                  }`}
                />
              );
            })}
          </div>

          {/* Cards turning in a circular way */}
          <div className="relative w-full max-w-4xl h-[420px] flex items-center justify-center">
            {steps.map((step, idx) => {
              const Icon = stepIcons[idx] || Rocket;
              // Circular offset angle relative to active step
              const stepOffset = (idx - activeStepIdx + totalSteps) % totalSteps;
              
              // Map circular stepOffset (0 = center front, 1 = right, 2 = back, 3 = left)
              let xPos = 0;
              let zPos = 0;
              let scale = 1;
              let opacity = 1;
              let zIndex = 10;
              let rotateY = 0;

              if (stepOffset === 0) {
                // Front active step
                xPos = 0;
                zPos = 120;
                scale = 1.05;
                opacity = 1;
                zIndex = 30;
                rotateY = 0;
              } else if (stepOffset === 1) {
                // Right step in the circular orbit
                xPos = 260;
                zPos = -40;
                scale = 0.82;
                opacity = 0.55;
                zIndex = 20;
                rotateY = -28;
              } else if (stepOffset === 2) {
                // Back step opposite
                xPos = 0;
                zPos = -160;
                scale = 0.65;
                opacity = 0.25;
                zIndex = 10;
                rotateY = 0;
              } else if (stepOffset === 3) {
                // Left step in the circular orbit
                xPos = -260;
                zPos = -40;
                scale = 0.82;
                opacity = 0.55;
                zIndex = 20;
                rotateY = 28;
              }

              const isCurrent = stepOffset === 0;

              return (
                <motion.div
                  key={step.step}
                  animate={{
                    x: xPos,
                    z: zPos,
                    scale: scale,
                    opacity: opacity,
                    rotateY: rotateY
                  }}
                  transition={{
                    duration: 0.65,
                    ease: [0.25, 1, 0.5, 1]
                  }}
                  style={{
                    position: 'absolute',
                    zIndex: zIndex,
                    transformStyle: 'preserve-3d'
                  }}
                  onClick={() => setActiveStepIdx(idx)}
                  className="w-[320px] sm:w-[380px] md:w-[420px] cursor-pointer"
                >
                  <div
                    className={`process-step-card flex flex-col justify-between p-8 rounded-3xl bg-white dark:bg-[#200807] border transition-all duration-300 shadow-2xl relative overflow-hidden min-h-[360px] ${
                      isCurrent
                        ? 'border-[#590907] dark:border-[#E8D2B5] ring-4 ring-[#590907]/20 dark:ring-[#E8D2B5]/25 shadow-glow-burgundy dark:shadow-glow-cream'
                        : 'border-[#A5A79B]/30 dark:border-[#590907]/40 hover:border-[#590907] dark:hover:border-[#E8D2B5]'
                    }`}
                  >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-[#590907]/10 dark:bg-[#E8D2B5]/10 rounded-full blur-xl pointer-events-none" />

                    <div>
                      {/* Step Header */}
                      <div className="flex items-center justify-between text-xs font-mono mb-5">
                        <span
                          className={`font-bold text-3xl font-headline transition-colors ${
                            isCurrent
                              ? 'text-[#590907] dark:text-[#E8D2B5] font-black'
                              : 'text-neutral-500 dark:text-neutral-400'
                          }`}
                        >
                          {step.step}
                        </span>
                        <div
                          className={`w-12 h-12 rounded-2xl border flex items-center justify-center transition-all ${
                            isCurrent
                              ? 'bg-[#590907]/20 dark:bg-[#E8D2B5]/20 border-[#590907]/50 dark:border-[#E8D2B5]/50 text-[#590907] dark:text-[#E8D2B5] scale-110 shadow-glow-burgundy'
                              : 'bg-[#FAF6F0] dark:bg-[#140303] border-[#A5A79B]/30 dark:border-[#590907]/30 text-neutral-800 dark:text-neutral-200'
                          }`}
                        >
                          <Icon className="w-6 h-6" />
                        </div>
                      </div>

                      <span className="text-xs font-mono text-[#590907] dark:text-[#E8D2B5] uppercase tracking-widest block mb-2 font-bold bg-[#E8D2B5]/30 dark:bg-[#590907]/40 px-2.5 py-1 rounded-md border border-[#590907]/20 dark:border-[#E8D2B5]/20 w-fit">
                        {step.tag}
                      </span>

                      <h3 className="font-headline font-extrabold text-2xl sm:text-3xl text-neutral-950 dark:text-[#FAF6F0] mt-3">
                        {step.title}
                      </h3>

                      <p className="mt-3.5 text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed font-body font-medium">
                        {step.detail}
                      </p>
                    </div>

                    <div
                      className={`relative z-10 pt-5 mt-6 border-t flex items-center justify-between text-xs font-mono font-bold transition-colors ${
                        isCurrent
                          ? 'border-[#590907]/20 dark:border-[#E8D2B5]/20 text-[#590907] dark:text-[#E8D2B5]'
                          : 'border-[#A5A79B]/20 dark:border-[#590907]/20 text-neutral-600 dark:text-neutral-400'
                      }`}
                    >
                      <span className="flex items-center gap-1.5">
                        {isCurrent && <CheckCircle2 className="w-4 h-4 text-[#590907] dark:text-[#E8D2B5]" />}
                        <span>Step {step.step} of 04</span>
                      </span>
                      {isCurrent ? (
                        <span className="text-[11px] font-mono text-[#590907] dark:text-[#E8D2B5] uppercase tracking-wider">
                          Active Phase ●
                        </span>
                      ) : (
                        <span className="text-[11px] text-neutral-400 font-mono">Stage 0{step.step}</span>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
