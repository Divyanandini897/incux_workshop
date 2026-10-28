import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function IntroAnimation({ onComplete }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      handleComplete();
    }, 2600);

    const handleKeyDown = (e) => {
      if (e.key === 'Escape' || e.key === ' ') {
        handleComplete();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleComplete = () => {
    setIsVisible(false);
    setTimeout(() => {
      onComplete();
    }, 600); // Allow exit animation to finish
  };

  const line1Words = "WORKSHOPS WITH".split(" ");
  const brandWord = "INCUXAI";

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.2
      }
    },
    exit: {
      opacity: 0,
      y: -40,
      filter: "blur(12px)",
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    }
  };

  const wordVariants = {
    hidden: { opacity: 0, y: 30, filter: "blur(8px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    }
  };

  const charVariants = {
    hidden: { opacity: 0, y: 25, scale: 0.8 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: 0.5 + i * 0.06,
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1]
      }
    })
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.04,
            transition: { duration: 0.7, ease: [0.43, 0.13, 0.23, 0.96] }
          }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#050814] text-white overflow-hidden select-none"
          aria-live="polite"
        >
          {/* Ambient Cyber Grid & Glow Orbs */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_40%,rgba(6,182,212,0.15)_0%,rgba(5,8,20,0.95)_75%)] pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-cyan-500/10 blur-[140px] pointer-events-none animate-pulse-slow" />

          {/* Futuristic corner brackets */}
          <div className="absolute top-8 left-8 w-8 h-8 border-t-2 border-l-2 border-cyan-500/40" />
          <div className="absolute top-8 right-8 w-8 h-8 border-t-2 border-r-2 border-cyan-500/40" />
          <div className="absolute bottom-8 left-8 w-8 h-8 border-b-2 border-l-2 border-cyan-500/40" />
          <div className="absolute bottom-8 right-8 w-8 h-8 border-b-2 border-r-2 border-cyan-500/40" />

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="relative z-10 px-6 text-center max-w-4xl mx-auto flex flex-col items-center"
          >
            {/* Top Eyebrow Badge */}
            <motion.div
              variants={wordVariants}
              className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-navy-900/80 backdrop-blur-md border border-cyan-500/30 text-xs uppercase tracking-widest text-cyan-300 font-mono mb-8 shadow-glow-cyan"
            >
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              <span>INCUXAI IMMERSIVE LEARNING</span>
            </motion.div>

            {/* Word-by-Word & Character-by-Character Main Title */}
            <h1 className="font-headline text-4xl sm:text-6xl md:text-8xl font-black tracking-tight leading-[1.05] text-white">
              <span className="inline-flex flex-wrap justify-center gap-x-4 sm:gap-x-6">
                {line1Words.map((word, idx) => (
                  <motion.span key={idx} variants={wordVariants} className="inline-block">
                    {word}
                  </motion.span>
                ))}
              </span>
              <br />
              <span className="inline-flex justify-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-electric-400 to-accent-lime drop-shadow-[0_0_35px_rgba(6,182,212,0.4)]">
                {brandWord.split("").map((char, i) => (
                  <motion.span
                    key={i}
                    custom={i}
                    variants={charVariants}
                    className="inline-block"
                  >
                    {char}
                  </motion.span>
                ))}
              </span>
            </h1>

            {/* Subtext reveal */}
            <motion.p
              variants={wordVariants}
              className="mt-6 sm:mt-8 text-sm sm:text-lg text-neutral-300 max-w-xl mx-auto font-light leading-relaxed tracking-wide"
            >
              Bridging academic depth with production engineering realities.
            </motion.p>

            {/* Animated Cyber Progress Scanner */}
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: "240px", opacity: 1 }}
              transition={{ delay: 0.4, duration: 1.8, ease: "easeInOut" }}
              className="h-1 bg-navy-800 rounded-full mt-10 overflow-hidden relative"
            >
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
                className="w-1/2 h-full bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
              />
            </motion.div>
          </motion.div>

          {/* Skip Button */}
          <button
            onClick={handleComplete}
            className="absolute bottom-8 right-8 text-xs font-mono uppercase tracking-wider text-neutral-400 hover:text-cyan-300 transition-colors px-4 py-2 rounded-full border border-white/10 hover:border-cyan-500/50 bg-navy-900/60 backdrop-blur-md cursor-pointer"
          >
            Skip [ESC]
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
