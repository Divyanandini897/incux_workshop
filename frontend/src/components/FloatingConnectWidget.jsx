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
        <div className="mb-4 w-80 sm:w-88 rounded-3xl bg-[#FAF6F0] dark:bg-[#1c0707] backdrop-blur-xl border border-[#A5A79B]/40 dark:border-[#590907]/50 shadow-2xl p-5 animate-in fade-in slide-in-from-bottom-5 duration-200">
          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b border-[#A5A79B]/30 dark:border-[#590907]/40">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#590907] dark:bg-[#E8D2B5]"></span>
              <span className="font-headline font-bold text-sm text-[#1C0707] dark:text-[#F7F1E6]">
                Connect with IncuxAI
              </span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-full text-[#590907]/60 dark:text-[#E8D2B5]/60 hover:text-[#590907] dark:hover:text-[#E8D2B5] hover:bg-[#E8D2B5]/30 dark:hover:bg-[#250a09] transition-colors"
              aria-label="Close widget"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Quick Body */}
          <p className="mt-3 text-xs text-[#590907]/80 dark:text-[#E8D2B5]/80 leading-relaxed font-normal">
            Looking to register for upcoming cohorts or get in touch with IncuxAI?
          </p>

          {/* Direct Actions */}
          <div className="mt-4 space-y-2">
            <button
              onClick={scrollToUpcoming}
              className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl bg-white dark:bg-[#250a09] hover:bg-[#E8D2B5]/30 dark:hover:bg-[#300c0b] border border-[#A5A79B]/30 dark:border-[#590907]/40 hover:border-[#590907] dark:hover:border-[#E8D2B5] transition-all text-left group cursor-pointer"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-xl bg-[#590907]/10 dark:bg-[#E8D2B5]/15 text-[#590907] dark:text-[#E8D2B5] flex items-center justify-center">
                  <Calendar className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-[#1C0707] dark:text-[#F7F1E6] group-hover:text-[#590907] dark:group-hover:text-[#E8D2B5] transition-colors">
                    Browse Upcoming Cohorts
                  </div>
                  <div className="text-[10px] text-[#590907]/70 dark:text-[#E8D2B5]/70 font-mono">
                    Candidate Live Enrollment
                  </div>
                </div>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-[#A5A79B] group-hover:translate-x-0.5 transition-transform" />
            </button>

            <button
              onClick={scrollToContact}
              className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl bg-white dark:bg-[#250a09] hover:bg-[#E8D2B5]/30 dark:hover:bg-[#300c0b] border border-[#A5A79B]/30 dark:border-[#590907]/40 hover:border-[#590907] dark:hover:border-[#E8D2B5] transition-all text-left group cursor-pointer"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-xl bg-[#590907]/10 dark:bg-[#E8D2B5]/15 text-[#590907] dark:text-[#E8D2B5] flex items-center justify-center">
                  <Sparkles className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-[#1C0707] dark:text-[#F7F1E6] group-hover:text-[#590907] dark:group-hover:text-[#E8D2B5] transition-colors">
                    Direct Contact &amp; Inquiries
                  </div>
                  <div className="text-[10px] text-[#590907]/70 dark:text-[#E8D2B5]/70 font-mono">
                    Reach Out Directly
                  </div>
                </div>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-[#A5A79B] group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          {/* Quick Contacts Footer */}
          <div className="mt-4 pt-3 border-t border-[#A5A79B]/30 dark:border-[#590907]/40 flex items-center justify-between text-[11px] font-mono text-[#590907]/80 dark:text-[#E8D2B5]/80">
            <a
              href="mailto:info@incuxai.com"
              className="flex items-center gap-1.5 hover:text-[#590907] dark:hover:text-[#E8D2B5] transition-colors"
            >
              <Mail className="w-3 h-3" />
              <span>info@incuxai.com</span>
            </a>
            <a
              href="https://wa.me/917665061289"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 hover:text-[#781210] dark:hover:text-[#FAF6F0] transition-colors text-[#590907] dark:text-[#E8D2B5] font-semibold"
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
        className="group relative flex items-center gap-2.5 px-4 sm:px-5 py-3 rounded-full bg-[#590907] hover:bg-[#781210] text-[#E8D2B5] font-headline font-bold text-xs uppercase tracking-wider shadow-2xl shadow-[#590907]/40 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer border border-[#E8D2B5]/30"
        aria-label="Toggle quick connect widget"
      >
        <span className="w-2.5 h-2.5 rounded-full bg-[#E8D2B5]"></span>
        <span>{isOpen ? 'Close' : 'Connect with Us'}</span>
        <MessageSquare className="w-4 h-4 ml-0.5 transition-transform group-hover:rotate-12" />
      </button>
    </div>
  );
}
