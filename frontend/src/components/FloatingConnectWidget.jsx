import React, { useState } from 'react';
import { MessageSquare, X, Mail, Phone, Calendar, ArrowRight, Sparkles, Send } from 'lucide-react';

export default function FloatingConnectWidget({ onOpenAuth, onOpenPortal, currentUser }) {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToContact = () => {
    setIsOpen(false);
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToUpcoming = () => {
    setIsOpen(false);
    document.querySelector('#upcoming-workshops')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 font-body select-none">
      {/* Expanded Popover */}
      {isOpen && (
        <div className="mb-4 w-80 sm:w-88 rounded-3xl bg-white/95 dark:bg-navy-900/95 backdrop-blur-xl border border-neutral-200 dark:border-white/10 shadow-2xl p-5 animate-in fade-in slide-in-from-bottom-5 duration-200">
          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b border-neutral-100 dark:border-white/10">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-500"></span>
              </span>
              <span className="font-headline font-bold text-sm text-neutral-900 dark:text-white">
                Connect with IncuxAI
              </span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-full text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-navy-800 transition-colors"
              aria-label="Close widget"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Quick Body */}
          <p className="mt-3 text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed font-normal">
            Looking to register for upcoming cohorts or schedule a hands-on tech workshop at your campus?
          </p>

          {/* Direct Actions */}
          <div className="mt-4 space-y-2">
            <button
              onClick={scrollToUpcoming}
              className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl bg-neutral-50 dark:bg-navy-950/90 hover:bg-cyan-50/70 dark:hover:bg-navy-800 border border-neutral-200 dark:border-white/10 hover:border-cyan-500 transition-all text-left group"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 flex items-center justify-center">
                  <Calendar className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-neutral-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                    Browse Upcoming Cohorts
                  </div>
                  <div className="text-[10px] text-neutral-500 dark:text-neutral-400 font-mono">
                    Candidate Live Enrollment
                  </div>
                </div>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-neutral-400 group-hover:translate-x-0.5 transition-transform" />
            </button>

            <button
              onClick={scrollToContact}
              className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl bg-neutral-50 dark:bg-navy-950/90 hover:bg-cyan-50/70 dark:hover:bg-navy-800 border border-neutral-200 dark:border-white/10 hover:border-cyan-500 transition-all text-left group"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 flex items-center justify-center">
                  <Sparkles className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-neutral-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                    Request Campus Workshop
                  </div>
                  <div className="text-[10px] text-neutral-500 dark:text-neutral-400 font-mono">
                    Colleges &amp; Universities
                  </div>
                </div>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-neutral-400 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          {/* Quick Contacts Footer */}
          <div className="mt-4 pt-3 border-t border-neutral-100 dark:border-white/10 flex items-center justify-between text-[11px] font-mono text-neutral-600 dark:text-neutral-400">
            <a
              href="mailto:info@incuxai.com"
              className="flex items-center gap-1.5 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
            >
              <Mail className="w-3 h-3" />
              <span>info@incuxai.com</span>
            </a>
            <a
              href="https://wa.me/917665061289"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors text-cyan-600 dark:text-cyan-400 font-semibold"
            >
              <Phone className="w-3 h-3" />
              <span>+91 7665061289</span>
            </a>
          </div>
        </div>
      )}

      {/* Floating Trigger Pill */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group relative flex items-center gap-2.5 px-4 sm:px-5 py-3 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-headline font-bold text-xs uppercase tracking-wider shadow-2xl shadow-blue-500/25 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer border border-white/20"
        aria-label="Toggle quick connect widget"
      >
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white"></span>
        </span>
        <span>{isOpen ? 'Close' : 'Connect with Us'}</span>
        <MessageSquare className="w-4 h-4 ml-0.5 transition-transform group-hover:rotate-12" />
      </button>
    </div>
  );
}
