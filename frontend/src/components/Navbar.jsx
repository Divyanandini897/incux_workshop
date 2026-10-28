import React, { useState, useEffect } from 'react';
import { Menu, Sun, Moon, User, Shield, LogIn, Sparkles } from 'lucide-react';
import { siteConfig } from '../data/config';
import { useTheme } from '../context/ThemeContext';

export default function Navbar({ onOpenMenu, currentUser, onOpenAuth, onOpenPortal }) {
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const { theme, toggleTheme, isDark } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 25);
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress((window.scrollY / totalScroll) * 100);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Top Edge Real-Time Scroll Progress Indicator */}
      <div
        className="fixed top-0 left-0 right-0 h-[3px] z-50 pointer-events-none transition-all duration-75"
        style={{
          background: 'linear-gradient(90deg, #2563eb 0%, #06b6d4 50%, #10b981 80%, #ccff00 100%)',
          width: `${scrollProgress}%`,
          boxShadow: '0 0 12px rgba(6, 182, 212, 0.6)'
        }}
        aria-hidden="true"
      />

      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'bg-white/85 dark:bg-navy-950/85 backdrop-blur-xl border-b border-neutral-200/80 dark:border-white/10 py-3.5 shadow-lg dark:shadow-2xl'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Wordmark with AI Pulsing Emblem */}
          <a
            href="#hero"
            className="group flex items-center gap-3 focus-visible:outline-accent-lime"
            aria-label="IncuxAI Home"
          >
            <div className="relative w-9 h-9 rounded-xl bg-gradient-to-tr from-electric-600 via-cyan-500 to-accent-lime p-[1px] shadow-sm group-hover:shadow-glow-cyan transition-all">
              <div className="w-full h-full rounded-[11px] bg-white dark:bg-navy-950 flex items-center justify-center">
                <span className="font-headline font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-electric-600 dark:from-cyan-400 dark:to-accent-lime text-lg leading-none">
                  I
                </span>
              </div>
              <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-cyan-400 animate-ping opacity-75" />
            </div>

            <div className="flex flex-col">
              <span className="font-headline font-bold text-xl tracking-tighter text-neutral-900 dark:text-white group-hover:text-cyan-500 dark:group-hover:text-cyan-400 transition-colors">
                {siteConfig.brand.wordmark}
              </span>
              <span className="text-[10px] font-mono tracking-widest text-neutral-500 dark:text-cyan-400/80 uppercase -mt-1 hidden sm:block">
                Workshop Initiative
              </span>
            </div>
          </a>

          {/* Actions: Portals, Theme Toggle & Menu Button */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* User Auth / Portal Status Button */}
            {currentUser ? (
              <button
                onClick={onOpenPortal}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-full border text-xs font-mono font-bold transition-all shadow-sm cursor-pointer bg-blue-50/80 hover:bg-blue-100/90 dark:bg-blue-950/70 dark:hover:bg-blue-900/80 border-blue-400/40 dark:border-blue-500/50 text-blue-700 dark:text-cyan-300 hover:border-blue-500 hover:shadow-md hover:shadow-blue-500/20 active:scale-95"
              >
                {currentUser.role === 'admin' ? (
                  <Shield className="w-3.5 h-3.5 text-blue-600 dark:text-cyan-400" />
                ) : (
                  <User className="w-3.5 h-3.5 text-blue-600 dark:text-cyan-400" />
                )}
                <span className="max-w-[120px] truncate">{currentUser.name.split(' ')[0]} (Portal)</span>
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onOpenAuth('candidate')}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-full border text-xs font-mono font-bold transition-all shadow-sm cursor-pointer bg-blue-50/80 hover:bg-blue-100/80 dark:bg-blue-950/70 dark:hover:bg-blue-900/80 border-blue-400/40 dark:border-blue-500/40 text-blue-700 dark:text-cyan-300 hover:border-blue-500 hover:shadow-md hover:shadow-blue-500/20 active:scale-95"
                >
                  <LogIn className="w-3.5 h-3.5 text-blue-600 dark:text-cyan-400" />
                  <span className="hidden sm:inline">Candidate</span> Login
                </button>
                <button
                  onClick={() => onOpenAuth('admin')}
                  className="hidden md:flex items-center gap-1.5 px-3 py-2 rounded-full border text-xs font-mono font-bold transition-all cursor-pointer bg-blue-50/50 hover:bg-blue-100/60 dark:bg-blue-950/40 dark:hover:bg-blue-900/60 border-blue-400/30 dark:border-cyan-500/30 text-blue-600 dark:text-cyan-400 hover:text-blue-700 dark:hover:text-cyan-200 shadow-sm active:scale-95"
                  title="Admin Portal"
                >
                  <Shield className="w-3.5 h-3.5 text-blue-600 dark:text-cyan-400" />
                  <span>Admin</span>
                </button>
              </div>
            )}

            {/* Light / Dark Mode Toggle Button */}
            <button
              onClick={toggleTheme}
              type="button"
              aria-label={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
              title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
              className="flex items-center gap-1.5 px-3 py-2 rounded-full border text-xs font-mono font-medium transition-all duration-200 cursor-pointer shadow-sm bg-neutral-100/90 dark:bg-navy-900/90 border-neutral-300/80 dark:border-white/10 text-neutral-800 dark:text-neutral-200 hover:border-cyan-500 dark:hover:border-cyan-400"
            >
              {isDark ? (
                <>
                  <Sun className="w-4 h-4 text-amber-400" />
                  <span className="hidden sm:inline">Light</span>
                </>
              ) : (
                <>
                  <Moon className="w-4 h-4 text-electric-600" />
                  <span className="hidden sm:inline">Dark</span>
                </>
              )}
            </button>

            {/* Refined blue rounded menu button */}
            <button
              onClick={onOpenMenu}
              aria-label="Open full-screen navigation menu"
              className="group flex items-center gap-2 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-headline font-bold text-xs uppercase tracking-wider shadow-lg shadow-blue-500/25 hover:shadow-cyan-500/35 transition-all duration-200 active:scale-95 cursor-pointer"
            >
              <span className="hidden sm:inline">Menu</span>
              <Menu className="w-4 h-4 stroke-[2.5] group-hover:rotate-90 transition-transform duration-300" />
            </button>
          </div>
        </div>
      </header>
    </>
  );
}
