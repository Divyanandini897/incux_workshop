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

  // Optional auto-rotation
  useEffect(() => {
    if (!isAutoTurning) return;
    const interval = setInterval(() => {
      nextStep();
    }, 4500);
    return () => clearInterval(interval);
  }, [isAutoTurning]);

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
      className="relative w-full bg-[#f8f7f2] dark:bg-[#070b1a] py-24 sm:py-32 border-t border-neutral-300 dark:border-white/15 overflow-hidden transition-colors duration-200 select-none"
      aria-label="How We Work"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-blue-500/10 dark:bg-cyan-500/15 blur-[150px] pointer-events-none rounded-full" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/80 border border-blue-400/40 text-xs font-mono text-blue-700 dark:text-cyan-300 uppercase tracking-widest mb-4 font-bold shadow-xs">
              <span className="w-2 h-2 rounded-full bg-blue-500 dark:bg-cyan-400 animate-ping" />
              <span>Section 08 // Operational Delivery</span>
            </div>
            <h2 className="font-headline font-extrabold text-3xl sm:text-5xl md:text-6xl text-neutral-950 dark:text-white tracking-tight leading-tight">
              From Collaboration to <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-400 dark:from-cyan-400 dark:via-blue-400 dark:to-cyan-300 drop-shadow-sm">
                Practical Learning
              </span>
            </h2>
            <p className="mt-4 text-base sm:text-lg text-neutral-700 dark:text-neutral-200 font-medium leading-relaxed">
              {subtitle}
            </p>
          </div>

          {/* Step Selector Dial Tabs */}
          <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-2xl bg-white dark:bg-[#0c1228] border border-neutral-300 dark:border-white/15 shadow-sm">
            {steps.map((step, idx) => (
              <button
                key={`tab-${step.step}`}
                onClick={() => setActiveStepIdx(idx)}
                className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                  activeStepIdx === idx
                    ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-md shadow-blue-500/25 scale-105'
                    : 'text-neutral-700 dark:text-neutral-300 hover:text-neutral-950 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-white/5'
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
          <div className="absolute w-[440px] sm:w-[560px] h-[440px] sm:h-[560px] rounded-full border border-blue-500/20 dark:border-cyan-500/20 pointer-events-none flex items-center justify-center">
            {/* Pulsing center hub */}
            <div className="w-20 h-20 rounded-full bg-blue-500/5 dark:bg-cyan-500/10 border border-blue-500/30 dark:border-cyan-500/30 flex items-center justify-center">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 to-cyan-400 animate-pulse" />
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
                      ? 'bg-blue-600 dark:bg-cyan-400 border-white dark:border-navy-950 scale-150 shadow-glow-cyan'
                      : 'bg-neutral-300 dark:bg-navy-800 border-white dark:border-navy-950'
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
                    className={`process-step-card flex flex-col justify-between p-8 rounded-3xl bg-white dark:bg-[#0c1228] border transition-all duration-300 shadow-2xl relative overflow-hidden min-h-[360px] ${
                      isCurrent
                        ? 'border-blue-500/80 dark:border-cyan-400 ring-4 ring-blue-500/20 dark:ring-cyan-400/25 shadow-glow-cyan'
                        : 'border-neutral-300 dark:border-white/15 hover:border-blue-500/50'
                    }`}
                  >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 dark:bg-cyan-500/10 rounded-full blur-xl pointer-events-none" />

                    <div>
                      {/* Step Header */}
                      <div className="flex items-center justify-between text-xs font-mono mb-5">
                        <span
                          className={`font-bold text-3xl font-headline transition-colors ${
                            isCurrent
                              ? 'text-blue-600 dark:text-cyan-400 font-black'
                              : 'text-neutral-500 dark:text-neutral-400'
                          }`}
                        >
                          {step.step}
                        </span>
                        <div
                          className={`w-12 h-12 rounded-2xl border flex items-center justify-center transition-all ${
                            isCurrent
                              ? 'bg-blue-600/20 dark:bg-cyan-500/20 border-blue-500/50 dark:border-cyan-400/50 text-blue-600 dark:text-cyan-400 scale-110 shadow-glow-cyan'
                              : 'bg-neutral-100 dark:bg-white/5 border-neutral-300 dark:border-white/10 text-neutral-800 dark:text-neutral-200'
                          }`}
                        >
                          <Icon className="w-6 h-6" />
                        </div>
                      </div>

                      <span className="text-xs font-mono text-blue-700 dark:text-cyan-300 uppercase tracking-widest block mb-2 font-bold bg-blue-50 dark:bg-blue-950/80 px-2.5 py-1 rounded-md border border-blue-400/20 w-fit">
                        {step.tag}
                      </span>

                      <h3 className="font-headline font-extrabold text-2xl sm:text-3xl text-neutral-950 dark:text-white mt-3">
                        {step.title}
                      </h3>

                      <p className="mt-3.5 text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed font-body font-medium">
                        {step.detail}
                      </p>
                    </div>

                    <div
                      className={`relative z-10 pt-5 mt-6 border-t flex items-center justify-between text-xs font-mono font-bold transition-colors ${
                        isCurrent
                          ? 'border-blue-200 dark:border-cyan-500/30 text-blue-600 dark:text-cyan-400'
                          : 'border-neutral-200 dark:border-white/10 text-neutral-600 dark:text-neutral-400'
                      }`}
                    >
                      <span className="flex items-center gap-1.5">
                        {isCurrent && <CheckCircle2 className="w-4 h-4 text-blue-500 dark:text-cyan-400 animate-pulse" />}
                        <span>Step {step.step} of 04</span>
                      </span>
                      {isCurrent ? (
                        <span className="text-[11px] font-mono text-blue-600 dark:text-cyan-400 uppercase tracking-wider">
                          Active Phase ●
                        </span>
                      ) : (
                        <span className="text-[11px] text-neutral-400">Click to Turn ⤵</span>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Circular Turning Navigation Controls */}
          <div className="flex items-center gap-4 mt-6 z-30">
            <button
              onClick={prevStep}
              className="flex items-center gap-2 px-5 py-3 rounded-full bg-white dark:bg-white/10 hover:bg-neutral-100 dark:hover:bg-white/20 text-neutral-900 dark:text-white font-mono text-xs font-bold border border-neutral-300 dark:border-white/15 transition-all shadow-md active:scale-95 cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Turn Previous Step</span>
            </button>

            <button
              onClick={nextStep}
              className="flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-mono text-xs font-bold border border-blue-400/30 transition-all shadow-lg shadow-blue-500/25 active:scale-95 cursor-pointer"
            >
              <span>Turn Next Step</span>
              <RotateCw className="w-4 h-4" />
            </button>

            <button
              onClick={() => setIsAutoTurning(!isAutoTurning)}
              className={`px-4 py-3 rounded-full border text-xs font-mono font-medium transition-all ${
                isAutoTurning
                  ? 'bg-blue-50 dark:bg-blue-950/80 border-blue-500 text-blue-600 dark:text-cyan-400 font-bold'
                  : 'bg-white dark:bg-white/5 border-neutral-300 dark:border-white/15 text-neutral-600 dark:text-neutral-400'
              }`}
            >
              {isAutoTurning ? '● Auto-Rotating' : '○ Auto-Rotate'}
            </button>
          </div>

          <div className="mt-3 text-xs font-mono text-neutral-500 dark:text-neutral-400">
            Steps revolve in a circular orbit // Use buttons, arrow keys, or click any card
          </div>

        </div>
      </div>
    </section>
  );
}
