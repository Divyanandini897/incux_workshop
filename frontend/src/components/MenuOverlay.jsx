import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowUpRight, Sparkles, User, Shield } from 'lucide-react';
import { siteConfig } from '../data/config';

export default function MenuOverlay({ isOpen, onClose, onOpenAuth, onOpenPortal, currentUser }) {
  const closeBtnRef = useRef(null);

  // Lock background scroll when open & handle Escape key
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      closeBtnRef.current?.focus();
    } else {
      document.body.style.overflow = '';
    }

    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  const handleLinkClick = (href) => {
    onClose();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navListVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.07,
        delayChildren: 0.15
      }
    }
  };

  const navItemVariants = {
    hidden: { opacity: 0, y: 35 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.3 } }}
          role="dialog"
          aria-modal="true"
          aria-label="Navigation Menu"
          className="fixed inset-0 z-50 bg-[#FAF6F0]/98 dark:bg-[#140303]/98 backdrop-blur-3xl flex flex-col justify-between p-6 sm:p-12 md:p-16 overflow-y-auto"
        >
          {/* Ambient background glow */}
          <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-[#590907]/15 dark:bg-[#590907]/30 blur-[140px] pointer-events-none rounded-full" />

          {/* Top Header inside overlay */}
          <div className="relative z-10 flex items-center justify-between border-b border-[#A5A79B]/30 dark:border-[#590907]/40 pb-6">
            <a
              href="#hero"
              onClick={() => handleLinkClick('#hero')}
              className="font-headline font-bold text-2xl tracking-tighter text-[#1C0707] dark:text-[#F7F1E6] flex items-center gap-2"
            >
              <span className="w-3 h-3 rounded-sm bg-[#590907] dark:bg-[#E8D2B5]" />
              {siteConfig.brand.wordmark}
            </a>

            <div className="flex items-center gap-4">
              <span className="text-xs font-mono text-[#590907]/70 dark:text-[#E8D2B5]/70 uppercase hidden sm:inline">
                Press [ESC] to close
              </span>
              <motion.button
                ref={closeBtnRef}
                onClick={onClose}
                whileHover={{ rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Close menu"
                className="w-12 h-12 rounded-full bg-[#E8D2B5]/30 dark:bg-[#200807] border border-[#A5A79B]/40 dark:border-[#590907]/50 text-[#1C0707] dark:text-[#E8D2B5] hover:bg-[#590907] hover:text-[#E8D2B5] transition-colors duration-200 flex items-center justify-center cursor-pointer shadow-sm"
              >
                <X className="w-5 h-5" />
              </motion.button>
            </div>
          </div>

          {/* Center Nav Links - Staggered Motion */}
          <nav className="relative z-10 my-auto py-8">
            <motion.ul
              variants={navListVariants}
              initial="hidden"
              animate="visible"
              className="space-y-3 sm:space-y-5"
            >
              {siteConfig.navigation.map((item, idx) => (
                <motion.li key={item.label} variants={navItemVariants} className="overflow-hidden">
                  <a
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleLinkClick(item.href);
                    }}
                    className="group flex items-center justify-between py-1.5 text-4xl sm:text-6xl md:text-7xl font-headline font-bold text-[#1C0707] dark:text-[#F7F1E6] hover:text-[#590907] dark:hover:text-[#E8D2B5] transition-all tracking-tight"
                  >
                    <span className="flex items-center gap-4 sm:gap-6">
                      <span className="text-xs sm:text-sm font-mono text-[#590907] dark:text-[#E8D2B5] font-bold">
                        0{idx + 1}
                      </span>
                      <span className="group-hover:translate-x-3 transition-transform duration-200">
                        {item.label}
                      </span>
                    </span>
                    <ArrowUpRight className="w-8 h-8 sm:w-10 sm:h-10 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-200 text-[#590907] dark:text-[#E8D2B5]" />
                  </a>
                </motion.li>
              ))}

              {/* Portal Action Inside Menu */}
              <motion.li variants={navItemVariants} className="pt-6 border-t border-[#A5A79B]/30 dark:border-[#590907]/40">
                {currentUser ? (
                  <button
                    onClick={() => {
                      onClose();
                      onOpenPortal();
                    }}
                    className="w-full text-left py-2 text-2xl sm:text-3xl font-headline font-bold text-[#590907] dark:text-[#E8D2B5] flex items-center justify-between cursor-pointer"
                  >
                    <span>Open {currentUser.role === 'admin' ? 'Admin Hub' : 'Candidate Portal'}</span>
                    <span className="text-xs font-mono px-3.5 py-1.5 rounded-full bg-[#590907]/10 dark:bg-[#E8D2B5]/10 border border-[#590907]/30 dark:border-[#E8D2B5]/40 text-[#590907] dark:text-[#E8D2B5] font-bold">
                      Active Session
                    </span>
                  </button>
                ) : (
                  <div className="flex flex-wrap items-center gap-4 py-2">
                    <button
                      onClick={() => {
                        onClose();
                        onOpenAuth('candidate');
                      }}
                      className="px-6 py-3.5 rounded-full bg-[#590907] hover:bg-[#781210] text-[#E8D2B5] font-headline font-bold text-sm uppercase tracking-wider shadow-lg shadow-[#590907]/30 hover:scale-105 transition-all cursor-pointer flex items-center gap-2"
                    >
                      <User className="w-4 h-4" />
                      <span>Candidate Login / Register</span>
                    </button>
                    <button
                      onClick={() => {
                        onClose();
                        onOpenAuth('admin');
                      }}
                      className="px-5 py-3.5 rounded-full bg-[#E8D2B5]/30 dark:bg-[#200807] border border-[#A5A79B]/40 dark:border-[#590907]/50 text-[#590907] dark:text-[#E8D2B5] hover:border-[#590907] dark:hover:border-[#E8D2B5] text-xs font-mono uppercase tracking-wider flex items-center gap-2 cursor-pointer shadow-sm hover:scale-105 transition-all"
                    >
                      <Shield className="w-3.5 h-3.5 text-[#590907] dark:text-[#E8D2B5]" />
                      <span>Admin Login</span>
                    </button>
                  </div>
                )}
              </motion.li>
            </motion.ul>
          </nav>

          {/* Bottom Footer inside overlay */}
          <div className="relative z-10 pt-6 border-t border-[#A5A79B]/30 dark:border-[#590907]/40 grid grid-cols-1 md:grid-cols-2 gap-6 text-xs font-mono">
            <div>
              <span className="text-[#590907]/70 dark:text-[#E8D2B5]/70 block mb-1 font-bold text-[11px] tracking-wider uppercase">
                DIRECT INQUIRY &amp; MOBILE
              </span>
              <p className="text-[#1C0707] dark:text-[#F7F1E6] text-sm font-semibold">
                info@incuxai.com • +91 7665061289
              </p>
            </div>
            <div className="flex items-center justify-start md:justify-end gap-2 text-[#590907] dark:text-[#E8D2B5]">
              <Sparkles className="w-4 h-4 text-[#590907] dark:text-[#E8D2B5]" />
              <span className="text-[#1C0707] dark:text-[#F7F1E6] font-medium text-sm">
                IncuxAI Workshop Initiative 2026
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
