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
          background: 'linear-gradient(90deg, #590907 0%, #781210 35%, #A5A79B 70%, #E8D2B5 100%)',
          width: `${scrollProgress}%`,
          boxShadow: '0 0 12px rgba(89, 9, 7, 0.6)'
        }}
        aria-hidden="true"
      />

      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'bg-[#FAF6F0]/90 dark:bg-[#140303]/90 backdrop-blur-xl border-b border-[#A5A79B]/30 dark:border-[#590907]/40 py-3.5 shadow-lg dark:shadow-2xl'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Wordmark with AI Pulsing Emblem */}
          <a
            href="#hero"
            className="group flex items-center gap-3 focus-visible:outline-[#590907]"
            aria-label="IncuxAI Home"
          >
            <div className="relative w-9 h-9 rounded-xl bg-gradient-to-tr from-[#590907] via-[#A5A79B] to-[#E8D2B5] p-[1px] shadow-sm group-hover:shadow-glow-burgundy transition-all">
              <div className="w-full h-full rounded-[11px] bg-[#FAF6F0] dark:bg-[#140303] flex items-center justify-center">
                <span className="font-headline font-black text-transparent bg-clip-text bg-gradient-to-r from-[#590907] to-[#781210] dark:from-[#E8D2B5] dark:to-[#A5A79B] text-lg leading-none">
                  I
                </span>
              </div>
              <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-[#590907] dark:bg-[#E8D2B5]" />
            </div>

            <div className="flex flex-col">
              <span className="font-headline font-bold text-xl tracking-tighter text-[#1C0707] dark:text-[#F7F1E6] group-hover:text-[#590907] dark:group-hover:text-[#E8D2B5] transition-colors">
                {siteConfig.brand.wordmark}
              </span>
              <span className="text-[10px] font-mono tracking-widest text-[#590907]/70 dark:text-[#E8D2B5]/80 uppercase -mt-1 hidden sm:block">
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
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-full border text-xs font-mono font-bold transition-all shadow-sm cursor-pointer bg-[#590907]/10 hover:bg-[#590907]/20 dark:bg-[#E8D2B5]/10 dark:hover:bg-[#E8D2B5]/20 border-[#590907]/30 dark:border-[#E8D2B5]/30 text-[#590907] dark:text-[#E8D2B5] hover:border-[#590907] dark:hover:border-[#E8D2B5] hover:shadow-md active:scale-95"
              >
                {currentUser.role === 'admin' ? (
                  <Shield className="w-3.5 h-3.5 text-[#590907] dark:text-[#E8D2B5]" />
                ) : (
                  <User className="w-3.5 h-3.5 text-[#590907] dark:text-[#E8D2B5]" />
                )}
                <span className="max-w-[120px] truncate">{currentUser.name.split(' ')[0]} (Portal)</span>
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onOpenAuth('candidate')}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-full border text-xs font-mono font-bold transition-all shadow-sm cursor-pointer bg-[#590907] hover:bg-[#781210] border-[#590907] text-[#E8D2B5] hover:shadow-md hover:shadow-[#590907]/30 active:scale-95"
                >
                  <LogIn className="w-3.5 h-3.5 text-[#E8D2B5]" />
                  <span className="hidden sm:inline">Candidate</span> Login
                </button>
                <button
                  onClick={() => onOpenAuth('admin')}
                  className="hidden md:flex items-center gap-1.5 px-3 py-2 rounded-full border text-xs font-mono font-bold transition-all cursor-pointer bg-[#FAF6F0] hover:bg-[#E8D2B5]/40 dark:bg-[#1c0707] dark:hover:bg-[#250a09] border-[#A5A79B]/50 dark:border-[#590907]/60 text-[#590907] dark:text-[#E8D2B5] hover:text-[#781210] dark:hover:text-[#FAF6F0] shadow-sm active:scale-95"
                  title="Admin Portal"
                >
                  <Shield className="w-3.5 h-3.5 text-[#590907] dark:text-[#E8D2B5]" />
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
              className="flex items-center gap-1.5 px-3 py-2 rounded-full border text-xs font-mono font-medium transition-all duration-200 cursor-pointer shadow-sm bg-[#E8D2B5]/30 dark:bg-[#1c0707] border-[#A5A79B]/50 dark:border-[#590907]/50 text-[#1C0707] dark:text-[#E8D2B5] hover:border-[#590907] dark:hover:border-[#E8D2B5]"
            >
              {isDark ? (
                <>
                  <Sun className="w-4 h-4 text-[#E8D2B5]" />
                  <span className="hidden sm:inline">Light</span>
                </>
              ) : (
                <>
                  <Moon className="w-4 h-4 text-[#590907]" />
                  <span className="hidden sm:inline">Dark</span>
                </>
              )}
            </button>

            {/* Menu button themed in Deep Burgundy and Warm Cream Beige */}
            <button
              onClick={onOpenMenu}
              aria-label="Open full-screen navigation menu"
              className="group flex items-center gap-2 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-full bg-[#590907] hover:bg-[#781210] text-[#E8D2B5] border border-[#590907] font-headline font-bold text-xs uppercase tracking-wider shadow-lg shadow-[#590907]/30 hover:shadow-[#590907]/50 transition-all duration-200 active:scale-95 cursor-pointer"
            >
              <span className="hidden sm:inline">Menu</span>
              <Menu className="w-4 h-4 stroke-[2.5] text-[#E8D2B5] group-hover:rotate-90 transition-transform duration-300" />
            </button>
          </div>
        </div>
      </header>
    </>
  );
}
