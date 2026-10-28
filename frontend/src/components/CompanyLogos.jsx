import React from 'react';

// Authentic, high-fidelity SVGs for the 8 companies
export function GoogleLogo({ className = "w-8 h-8" }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z" fill="#FFC107"/>
      <path d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z" fill="#FF3D00"/>
      <path d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0124 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z" fill="#4CAF50"/>
      <path d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 01-4.087 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z" fill="#1976D2"/>
    </svg>
  );
}

export function MicrosoftLogo({ className = "w-7 h-7" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="1" y="1" width="10.5" height="10.5" fill="#F25022"/>
      <rect x="12.5" y="1" width="10.5" height="10.5" fill="#7FBA00"/>
      <rect x="1" y="12.5" width="10.5" height="10.5" fill="#00A4EF"/>
      <rect x="12.5" y="12.5" width="10.5" height="10.5" fill="#FFB900"/>
    </svg>
  );
}

export function WalmartLogo({ className = "w-8 h-8" }) {
  return (
    <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* 6 rays of Walmart sunburst spark */}
      <g fill="#FFC220">
        <path d="M50 8c-3 0-5.5 8-5.5 18s2.5 18 5.5 18 5.5-8 5.5-18S53 8 50 8z" />
        <path d="M50 92c-3 0-5.5-8-5.5-18s2.5-18 5.5-18 5.5 8 5.5 18S53 92 50 92z" />
        <path d="M14 29c-1.5 2.6 3 9.6 11.7 14.6s17 4.5 18.5 1.9-3-9.6-11.7-14.6S15.5 26.4 14 29z" />
        <path d="M86 71c-1.5 2.6-9.8.7-18.5-4.3S56 54.8 57.5 52.2s9.8-.7 18.5 4.3S87.5 68.4 86 71z" />
        <path d="M14 71c1.5 2.6 9.8.7 18.5-4.3s14-11.9 12.5-14.5-9.8-.7-18.5 4.3S12.5 68.4 14 71z" />
        <path d="M86 29c1.5 2.6-3 9.6-11.7 14.6S57.3 48.1 55.8 45.5s3-9.6 11.7-14.6S84.5 26.4 86 29z" />
      </g>
    </svg>
  );
}

export function DeloitteLogo({ className = "h-7" }) {
  return (
    <div className="flex items-baseline font-bold font-headline tracking-tight text-neutral-900 dark:text-white text-2xl sm:text-3xl">
      <span>Deloitte</span>
      <span className="w-2.5 h-2.5 rounded-full bg-[#86BC25] ml-1 inline-block" />
    </div>
  );
}

export function TCSLogo({ className = "h-10" }) {
  return (
    <div className="flex items-center gap-2.5">
      <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#003875] via-[#0051a8] to-[#0072ce] flex items-center justify-center font-black text-white text-sm font-headline shadow-md border border-blue-400/30">
        TCS
      </div>
      <div className="flex flex-col">
        <span className="text-base font-bold font-headline text-neutral-900 dark:text-white leading-tight tracking-wider">
          TATA
        </span>
        <span className="text-[10px] font-mono font-medium text-neutral-600 dark:text-neutral-300 tracking-tight leading-none">
          CONSULTANCY SERVICES
        </span>
      </div>
    </div>
  );
}

export function GenpactLogo({ className = "w-7 h-7" }) {
  return (
    <div className="flex items-center gap-2">
      <div className="w-7 h-7 rounded-full bg-[#FF5800] flex items-center justify-center shadow-sm">
        <div className="w-2.5 h-2.5 rounded-full bg-white" />
      </div>
      <span className="font-bold text-xl text-neutral-900 dark:text-white font-headline tracking-tight">genpact</span>
    </div>
  );
}

export function JohnsonAndJohnsonLogo({ className = "h-6" }) {
  return (
    <div className="flex items-center gap-2">
      <div className="w-6 h-6 rounded bg-[#D51900] flex items-center justify-center text-white font-bold text-xs shadow-sm">
        +
      </div>
      <div className="flex flex-col">
        <span className="font-bold text-sm text-[#D51900] tracking-tight leading-tight font-serif italic">
          Johnson &amp; Johnson
        </span>
        <span className="text-[9px] font-mono text-neutral-500 dark:text-neutral-400 leading-none">INNOVATIVE MEDICINE</span>
      </div>
    </div>
  );
}

export function TechMahindraLogo({ className = "h-7" }) {
  return (
    <div className="flex items-center gap-2">
      <div className="w-7 h-7 rounded-lg bg-neutral-900 border border-neutral-700 flex items-center justify-center shadow-sm">
        <div className="w-3.5 h-3.5 rotate-45 border-2 border-red-500 bg-red-500/20" />
      </div>
      <div className="flex flex-col">
        <span className="font-bold text-sm text-neutral-900 dark:text-white font-headline leading-tight">Tech</span>
        <span className="text-xs font-bold text-red-500 font-headline leading-none -mt-0.5">Mahindra</span>
      </div>
    </div>
  );
}
