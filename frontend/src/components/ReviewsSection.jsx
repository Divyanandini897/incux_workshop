import React from 'react';
import { Star, Quote, CheckCircle2, Sparkles, Award, MapPin } from 'lucide-react';
import { studentReviews } from '../data/reviews';

function ReviewCard({ review }) {
  return (
    <div className="shrink-0 w-[360px] sm:w-[420px] p-6 sm:p-7 rounded-3xl bg-white/95 dark:bg-navy-900/90 backdrop-blur-xl border border-neutral-200 dark:border-white/10 hover:border-cyan-500/60 dark:hover:border-cyan-400/60 shadow-xl hover:shadow-glow-cyan hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group">
      {/* Card Header: Avatar, Name, College, Verified Badge */}
      <div>
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-electric-600 via-cyan-500 to-accent-lime flex items-center justify-center font-headline font-bold text-dark-950 text-sm shadow-sm shrink-0">
              {review.avatar}
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h4 className="font-headline font-bold text-base text-neutral-900 dark:text-white leading-tight">
                  {review.name}
                </h4>
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-500 dark:text-cyan-400 shrink-0" />
              </div>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 font-mono leading-tight mt-0.5">
                {review.branch}
              </p>
              <p className="text-[11px] text-cyan-700 dark:text-cyan-300 font-mono font-medium leading-tight">
                {review.college}
              </p>
            </div>
          </div>

          <div className="p-2 rounded-xl bg-neutral-100 dark:bg-navy-950 text-neutral-400 dark:text-cyan-400 group-hover:text-cyan-500 transition-colors shrink-0">
            <Quote className="w-4 h-4" />
          </div>
        </div>

        {/* Rating and Workshop Badge */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3.5 pt-2 border-t border-neutral-100 dark:border-white/10">
          <div className="flex items-center gap-1">
            {[...Array(review.rating)].map((_, i) => (
              <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            ))}
            <span className="text-xs font-mono font-bold text-neutral-800 dark:text-neutral-200 ml-1">
              5.0
            </span>
          </div>

          <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-cyan-50 dark:bg-cyan-950/60 border border-cyan-200 dark:border-cyan-500/30 text-cyan-700 dark:text-cyan-300 font-semibold tracking-wider uppercase">
            {review.tag}
          </span>
        </div>

        {/* Headline Quote */}
        <h5 className="font-headline font-bold text-sm sm:text-base text-neutral-900 dark:text-neutral-100 leading-snug mb-2 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
          "{review.headline}"
        </h5>

        {/* Detailed Review Text */}
        <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 font-normal leading-relaxed">
          {review.review}
        </p>
      </div>

      {/* Card Footer: Attended Workshop & Date */}
      <div className="mt-4 pt-3 border-t border-neutral-100 dark:border-white/10 flex items-center justify-between text-[11px] font-mono text-neutral-500 dark:text-neutral-400">
        <span className="truncate max-w-[240px]">
          Attended: <strong className="text-neutral-700 dark:text-neutral-200 font-semibold">{review.workshop}</strong>
        </span>
        <span className="shrink-0">{review.date}</span>
      </div>
    </div>
  );
}

export default function ReviewsSection() {
  const rowOne = studentReviews.slice(0, 4);
  const rowTwo = studentReviews.slice(4, 8);

  return (
    <section
      id="reviews"
      className="relative w-full bg-[#faf9f5] dark:bg-navy-950 py-24 sm:py-32 border-t border-neutral-200 dark:border-white/10 overflow-hidden transition-colors duration-200"
      aria-label="Student Reviews and Campus Outcomes"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 sm:mb-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 dark:bg-navy-900/90 backdrop-blur-md border border-neutral-200 dark:border-white/10 text-xs font-mono text-cyan-600 dark:text-cyan-400 uppercase tracking-widest mb-4 font-semibold shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-cyan-500 animate-pulse" />
              <span>Section // Verified Campus Experiences</span>
            </div>
            <h2 className="font-headline font-bold text-3xl sm:text-5xl md:text-6xl text-neutral-950 dark:text-white tracking-tight leading-tight">
              What 950+ Engineers <br className="hidden sm:inline" />
              Are Saying.
            </h2>
            <p className="mt-4 text-base sm:text-lg text-neutral-600 dark:text-neutral-300 font-normal leading-relaxed">
              Real testimonials from student developers, researchers, and campus leads who experienced our hands-on engineering immersions.
            </p>
          </div>

          {/* Quick Metrics Badge Banner */}
          <div className="flex flex-wrap items-center gap-3 font-mono text-xs">
            <div className="px-4 py-2.5 rounded-2xl bg-white/90 dark:bg-navy-900/90 backdrop-blur-md border border-neutral-200 dark:border-white/10 shadow-md flex items-center gap-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="font-bold text-neutral-900 dark:text-white">4.96 / 5.0</span>
              <span className="text-neutral-500 dark:text-neutral-400">Average Rating</span>
            </div>

            <div className="px-4 py-2.5 rounded-2xl bg-white/90 dark:bg-navy-900/90 backdrop-blur-md border border-neutral-200 dark:border-white/10 shadow-md flex items-center gap-2">
              <Award className="w-4 h-4 text-cyan-500" />
              <span className="font-bold text-neutral-900 dark:text-white">100% Practical Labs</span>
            </div>
          </div>
        </div>
      </div>

      {/* Infinite Scrolling Reviews Marquee Stream */}
      <div className="space-y-6 select-none">
        {/* Row 1: Scrolling Left */}
        <div className="relative w-full overflow-hidden mask-gradient-x py-1">
          <div className="animate-marquee-infinite flex gap-6 px-4">
            {rowOne.concat(rowOne).concat(rowOne).map((review, idx) => (
              <ReviewCard key={`row1-${review.id}-${idx}`} review={review} />
            ))}
          </div>
        </div>

        {/* Row 2: Scrolling Right (Reverse) */}
        <div className="relative w-full overflow-hidden mask-gradient-x py-1">
          <div className="animate-marquee-reverse flex gap-6 px-4">
            {rowTwo.concat(rowTwo).concat(rowTwo).map((review, idx) => (
              <ReviewCard key={`row2-${review.id}-${idx}`} review={review} />
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Hint */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 text-center">
        <p className="text-xs font-mono text-neutral-500 dark:text-neutral-400 inline-flex items-center gap-1.5 bg-white/90 dark:bg-navy-900/90 px-4 py-2 rounded-full border border-neutral-200 dark:border-white/10 shadow-sm">
          <span>💡 Hover over any student review card to pause and read detailed feedback</span>
        </p>
      </div>
    </section>
  );
}
