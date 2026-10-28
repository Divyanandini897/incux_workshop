import React from 'react';
import { ArrowUp } from 'lucide-react';
import { siteConfig } from '../data/config';

// Clean inline SVGs for social platforms
function InstagramIcon({ className = "w-4 h-4" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
    </svg>
  );
}

function LinkedinIcon({ className = "w-4 h-4" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
      <rect width="4" height="12" x="2" y="9"/>
      <circle cx="4" cy="4" r="2"/>
    </svg>
  );
}

function FacebookIcon({ className = "w-4 h-4" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
    </svg>
  );
}

function WhatsAppIcon({ className = "w-4 h-4" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21"/>
      <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1"/>
    </svg>
  );
}

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      className="relative w-full bg-[#fbf9f5] dark:bg-navy-950 text-neutral-800 dark:text-neutral-300 pt-20 pb-12 border-t border-neutral-200 dark:border-white/10 overflow-hidden select-none transition-colors duration-200"
      aria-label="Footer"
    >
      {/* 
        Giant Oversized Background Watermark "incuxai"
        Directly inspired by the user's reference image (glowlogics style in light & dark modes)
      */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden z-0">
        <span className="font-headline font-black text-[22vw] tracking-tighter text-blue-600/[0.12] dark:text-blue-500/[0.15] lowercase whitespace-nowrap select-none drop-shadow-sm">
          incuxai
        </span>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 4 Clean Columns Aligned with User Reference Design */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10 pb-16">
          {/* Column 1: Our Products / Workshops */}
          <div>
            <h4 className="font-headline font-bold text-sm sm:text-base text-neutral-900 dark:text-white tracking-tight mb-4">
              Our Products
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 font-body">
              <li>
                <a href="#our-work" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
                  Learning Programs
                </a>
              </li>
              <li>
                <a href="#our-work" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
                  Workshops
                </a>
              </li>
              <li>
                <a href="#featured" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
                  Hackathons
                </a>
              </li>
              <li>
                <a href="#expertise" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
                  Certifications
                </a>
              </li>
            </ul>
          </div>

          {/* Column 2: Our Company */}
          <div>
            <h4 className="font-headline font-bold text-sm sm:text-base text-neutral-900 dark:text-white tracking-tight mb-4">
              Our Company
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 font-body">
              <li>
                <a href="#about" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#how-we-work" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
                  Careers
                </a>
              </li>
              <li>
                <a href="#featured" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
                  Event Hub
                </a>
              </li>
              <li className="flex items-center gap-2">
                <a href="#news" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
                  IncuxAI Blog
                </a>
                <span className="px-1.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 text-[10px] font-mono font-semibold">
                  New
                </span>
              </li>
            </ul>
          </div>

          {/* Column 3: Help Resources */}
          <div>
            <h4 className="font-headline font-bold text-sm sm:text-base text-neutral-900 dark:text-white tracking-tight mb-4">
              Help Resources
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 font-body">
              <li>
                <a href="#contact" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
                  Support
                </a>
              </li>
              <li>
                <a href="#news" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#how-we-work" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
                  Terms of Use
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Connect with Us */}
          <div>
            <h4 className="font-headline font-bold text-sm sm:text-base text-neutral-900 dark:text-white tracking-tight mb-4">
              Connect with Us
            </h4>

            {/* Social Icons row */}
            <div className="flex items-center gap-3 mb-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="w-8 h-8 rounded-xl bg-white dark:bg-navy-900 border border-neutral-300 dark:border-white/10 flex items-center justify-center text-neutral-700 dark:text-neutral-300 hover:text-cyan-600 dark:hover:text-cyan-400 hover:border-cyan-500 dark:hover:border-cyan-400 transition-all shadow-sm"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="w-8 h-8 rounded-xl bg-white dark:bg-navy-900 border border-neutral-300 dark:border-white/10 flex items-center justify-center text-neutral-700 dark:text-neutral-300 hover:text-cyan-600 dark:hover:text-cyan-400 hover:border-cyan-500 dark:hover:border-cyan-400 transition-all shadow-sm"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="w-8 h-8 rounded-xl bg-white dark:bg-navy-900 border border-neutral-300 dark:border-white/10 flex items-center justify-center text-neutral-700 dark:text-neutral-300 hover:text-cyan-600 dark:hover:text-cyan-400 hover:border-cyan-500 dark:hover:border-cyan-400 transition-all shadow-sm"
              >
                <FacebookIcon className="w-4 h-4" />
              </a>
              <a
                href="https://wa.me/917665061289"
                target="_blank"
                rel="noreferrer"
                aria-label="WhatsApp"
                className="w-8 h-8 rounded-xl bg-white dark:bg-navy-900 border border-neutral-300 dark:border-white/10 flex items-center justify-center text-neutral-700 dark:text-neutral-300 hover:text-cyan-600 dark:hover:text-cyan-400 hover:border-cyan-500 dark:hover:border-cyan-400 transition-all shadow-sm"
              >
                <WhatsAppIcon className="w-4 h-4" />
              </a>
            </div>

            {/* Address & Verified Contact Channels */}
            <div className="space-y-2 text-xs text-neutral-600 dark:text-neutral-400 font-body leading-relaxed">
              <p>
                <strong className="text-neutral-900 dark:text-white block font-mono text-[11px] mb-0.5">Contact:</strong>
                <a href="mailto:info@incuxai.com" className="text-neutral-800 dark:text-neutral-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors block font-medium">
                  info@incuxai.com
                </a>
                <a href="tel:7665061289" className="text-neutral-800 dark:text-neutral-300 hover:text-orange-600 dark:hover:text-accent-orange transition-colors block mt-0.5 font-medium">
                  +91 7665061289
                </a>
              </p>
              <p className="pt-1.5 border-t border-neutral-200 dark:border-white/10">
                <strong className="text-neutral-900 dark:text-white block font-mono text-[11px] mb-0.5">Address:</strong>
                Building No: 148, 2nd Floor, Outer Ring Rd, Regional Tech Corridor, Hyderabad, Telangana &amp; Andhra Pradesh 500081
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Horizontal Line & Copyright Bar */}
        <div className="pt-8 border-t border-neutral-200 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-body text-neutral-500 dark:text-neutral-400">
          <div>
            © 2026 IncuxAI. All rights reserved.
          </div>

          <div className="flex items-center gap-6">
            <a href="#how-we-work" className="hover:text-neutral-900 dark:hover:text-white transition-colors">
              Terms of Use
            </a>
            <a href="#news" className="hover:text-neutral-900 dark:hover:text-white transition-colors">
              Privacy Policy
            </a>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors ml-2 cursor-pointer font-medium"
              aria-label="Back to top of page"
            >
              <span>Back to top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
