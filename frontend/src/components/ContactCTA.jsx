import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { siteConfig } from '../data/config';
import { submitInquiry } from '../services/api';
import { Send, CheckCircle2, AlertCircle, Mail, Phone, MapPin, Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function ContactCTA() {
  const { contactPlaceholders } = siteConfig;
  const sectionRef = useRef(null);

  const [formData, setFormData] = useState({
    name: '',
    institution: '',
    role: 'Faculty Coordinator / Dean',
    email: '',
    phone: '',
    workshopInterest: 'Generative AI & Agentic Systems',
    estimatedStudents: '100-250 Students',
    mode: 'Offline Campus Experience',
    message: ''
  });

  const [status, setStatus] = useState({
    loading: false,
    success: false,
    message: '',
    inquiryId: null
  });

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.from(".contact-left-col", {
        x: -40,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top 75%",
          toggleActions: "play none none none"
        }
      });

      gsap.from(".contact-right-form", {
        x: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top 75%",
          toggleActions: "play none none none"
        }
      });
    }, section);

    return () => ctx.revert();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, success: false, message: '', inquiryId: null });

    const result = await submitInquiry(formData);

    if (result.success) {
      setStatus({
        loading: false,
        success: true,
        message: 'Your institutional collaboration inquiry has been successfully received by our academic outreach team!',
        inquiryId: result.data?.inquiryId || result.inquiryId
      });
      setFormData({
        name: '',
        institution: '',
        role: 'Faculty Coordinator / Dean',
        email: '',
        phone: '',
        workshopInterest: 'Generative AI & Agentic Systems',
        estimatedStudents: '100-250 Students',
        mode: 'Offline Campus Experience',
        message: ''
      });
    } else {
      setStatus({
        loading: false,
        success: false,
        message: result.error || 'Failed to submit inquiry. Please try again.',
        inquiryId: null
      });
    }
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative w-full bg-[#faf9f5] dark:bg-[#050814] py-24 border-t border-neutral-200 dark:border-white/10 overflow-hidden transition-colors duration-200"
      aria-label="Collaboration and Contact"
    >
      {/* Background ambient orbs */}
      <div className="absolute top-1/3 -right-20 w-96 h-96 rounded-full bg-cyan-500/10 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 rounded-full bg-electric-600/10 blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: CTA Pitch & Direct Verified Channels */}
          <div className="contact-left-col lg:col-span-5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 dark:bg-navy-900/90 backdrop-blur-md border border-neutral-200 dark:border-white/10 text-xs font-mono text-cyan-600 dark:text-cyan-400 uppercase tracking-widest mb-4 font-semibold shadow-sm">
              <span className="w-2 h-2 rounded-full bg-cyan-500 animate-ping" />
              <span>Section 10 // Institutional Partnership</span>
            </div>

            <h2 className="font-headline font-bold text-3xl sm:text-5xl text-neutral-950 dark:text-white tracking-tight leading-tight">
              Let's Create the Next <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-electric-600 to-accent-emerald dark:from-cyan-400 dark:via-electric-500 dark:to-accent-lime drop-shadow-sm">
                Learning Experience.
              </span>
            </h2>

            <p className="mt-4 text-base text-neutral-600 dark:text-neutral-300 font-normal leading-relaxed">
              Whether you are an engineering college dean planning an on-campus AI symposium,
              a university department seeking guest lectures from tech leaders, or an industry expert
              wishing to mentor, let's collaborate.
            </p>

            {/* Direct Official Contact Cards */}
            <div className="mt-8 p-6 sm:p-7 rounded-3xl bg-white/95 dark:bg-[#0a0f24]/90 backdrop-blur-xl border border-neutral-200 dark:border-white/10 space-y-4 shadow-xl">
              <span className="text-xs font-mono text-cyan-600 dark:text-cyan-400 uppercase tracking-wider block font-bold">
                Direct Contact Channels:
              </span>

              {/* Email */}
              <a
                href="mailto:info@incuxai.com"
                className="group flex items-center gap-3.5 p-3.5 rounded-2xl bg-neutral-50 dark:bg-navy-950/90 border border-neutral-200 dark:border-white/10 hover:border-cyan-500/80 dark:hover:border-cyan-400 hover:shadow-glow-cyan hover:-translate-y-1 transition-all shadow-sm"
              >
                <div className="w-10 h-10 rounded-xl bg-cyan-100 dark:bg-cyan-950/60 border border-cyan-300/40 dark:border-cyan-500/30 flex items-center justify-center text-cyan-700 dark:text-cyan-400 group-hover:bg-cyan-500 group-hover:text-dark-950 transition-colors">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-mono text-neutral-500 dark:text-neutral-400 block font-medium">OFFICIAL INQUIRY EMAIL</span>
                  <span className="text-sm font-semibold text-neutral-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                    info@incuxai.com
                  </span>
                </div>
              </a>

              {/* Mobile Phone */}
              <a
                href="tel:7665061289"
                className="group flex items-center gap-3.5 p-3.5 rounded-2xl bg-neutral-50 dark:bg-navy-950/90 border border-neutral-200 dark:border-white/10 hover:border-accent-orange/80 hover:-translate-y-1 transition-all shadow-sm"
              >
                <div className="w-10 h-10 rounded-xl bg-orange-100 dark:bg-accent-orange/10 border border-orange-300/40 dark:border-accent-orange/20 flex items-center justify-center text-orange-600 dark:text-accent-orange group-hover:bg-accent-orange group-hover:text-white transition-colors">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-mono text-neutral-500 dark:text-neutral-400 block font-medium">DIRECT MOBILE &amp; WHATSAPP</span>
                  <span className="text-sm font-semibold text-neutral-900 dark:text-white group-hover:text-accent-orange transition-colors">
                    +91 7665061289
                  </span>
                </div>
              </a>

              {/* Location */}
              <div className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-neutral-50/60 dark:bg-navy-950/60 border border-neutral-200 dark:border-white/5">
                <div className="w-10 h-10 rounded-xl bg-neutral-100 dark:bg-navy-900 border border-neutral-200 dark:border-white/10 flex items-center justify-center text-neutral-600 dark:text-neutral-400">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-mono text-neutral-500 dark:text-neutral-400 block font-medium">REGIONAL HEADQUARTERS</span>
                  <span className="text-sm text-neutral-800 dark:text-neutral-300">
                    Hyderabad &amp; Regional Centers, India
                  </span>
                </div>
              </div>

              <p className="pt-2 text-xs font-mono text-neutral-500 dark:text-neutral-400 border-t border-neutral-200 dark:border-white/10 leading-relaxed">
                {contactPlaceholders.notice}
              </p>
            </div>
          </div>

          {/* Right Column: Interactive Collaboration Inquiry Form */}
          <div className="contact-right-form lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-3xl bg-white/95 dark:bg-[#0a0f24]/90 backdrop-blur-xl border border-neutral-200 dark:border-white/10 relative shadow-2xl">
              <div className="flex items-center justify-between pb-6 border-b border-neutral-200 dark:border-white/10 mb-6">
                <div>
                  <h3 className="font-headline font-bold text-2xl text-neutral-900 dark:text-white">
                    Submit Workshop Collaboration
                  </h3>
                  <p className="text-xs text-neutral-500 dark:text-cyan-400 mt-1">
                    Connects directly to the IncuxAI Express backend API.
                  </p>
                </div>
                <Sparkles className="w-5 h-5 text-cyan-500 animate-pulse" />
              </div>

              {status.success && (
                <div className="mb-6 p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/70 border border-emerald-300 dark:border-emerald-500/40 text-emerald-900 dark:text-emerald-200 text-xs font-mono flex items-start gap-3 shadow-sm">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold block text-sm">Inquiry Dispatched</span>
                    <p className="mt-1">{status.message}</p>
                    {status.inquiryId && (
                      <span className="text-[11px] text-emerald-700 dark:text-emerald-300 mt-2 block font-semibold">
                        Reference ID: {status.inquiryId}
                      </span>
                    )}
                  </div>
                </div>
              )}

              {status.message && !status.success && (
                <div className="mb-6 p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/70 border border-rose-300 dark:border-rose-500/40 text-rose-900 dark:text-rose-200 text-xs font-mono flex items-start gap-3 shadow-sm">
                  <AlertCircle className="w-5 h-5 text-rose-600 dark:text-rose-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold block">Submission Note</span>
                    <p className="mt-1">{status.message}</p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-neutral-700 dark:text-neutral-300 mb-1.5 uppercase font-medium">
                      Contact Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Dr. K. Raman / Prof. Priya"
                      className="w-full px-4 py-3 rounded-xl bg-neutral-50 dark:bg-navy-950/90 border border-neutral-300 dark:border-white/10 text-neutral-900 dark:text-white text-sm focus:border-cyan-500 dark:focus:border-cyan-400 transition-colors outline-none shadow-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-neutral-700 dark:text-neutral-300 mb-1.5 uppercase font-medium">
                      College / Institution Name *
                    </label>
                    <input
                      type="text"
                      name="institution"
                      required
                      value={formData.institution}
                      onChange={handleChange}
                      placeholder="e.g. Engineering Institute / Campus"
                      className="w-full px-4 py-3 rounded-xl bg-neutral-50 dark:bg-navy-950/90 border border-neutral-300 dark:border-white/10 text-neutral-900 dark:text-white text-sm focus:border-cyan-500 dark:focus:border-cyan-400 transition-colors outline-none shadow-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-neutral-700 dark:text-neutral-300 mb-1.5 uppercase font-medium">
                      Official Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="dean@college.edu.in"
                      className="w-full px-4 py-3 rounded-xl bg-neutral-50 dark:bg-navy-950/90 border border-neutral-300 dark:border-white/10 text-neutral-900 dark:text-white text-sm focus:border-cyan-500 dark:focus:border-cyan-400 transition-colors outline-none shadow-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-neutral-700 dark:text-neutral-300 mb-1.5 uppercase font-medium">
                      Phone Number (Optional)
                    </label>
                    <input
                      type="text"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+91-XXXXXXXXXX"
                      className="w-full px-4 py-3 rounded-xl bg-neutral-50 dark:bg-navy-950/90 border border-neutral-300 dark:border-white/10 text-neutral-900 dark:text-white text-sm focus:border-cyan-500 dark:focus:border-cyan-400 transition-colors outline-none shadow-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-neutral-700 dark:text-neutral-300 mb-1.5 uppercase font-medium">
                      Workshop Domain Focus
                    </label>
                    <select
                      name="workshopInterest"
                      value={formData.workshopInterest}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl bg-neutral-50 dark:bg-navy-950/90 border border-neutral-300 dark:border-white/10 text-neutral-900 dark:text-white text-sm focus:border-cyan-500 dark:focus:border-cyan-400 transition-colors outline-none shadow-sm"
                    >
                      <option value="Generative AI & Agentic Systems">Generative AI &amp; Agentic Systems</option>
                      <option value="Machine Learning & NLP">Machine Learning &amp; NLP</option>
                      <option value="Full-Stack Engineering & Java">Full-Stack Engineering &amp; Java</option>
                      <option value="Cloud & Defensive Cybersecurity">Cloud &amp; Defensive Cybersecurity</option>
                      <option value="5-Day Intensive AI Bootcamp">5-Day Intensive AI Bootcamp</option>
                      <option value="Custom Academic Track">Custom Academic Track</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-neutral-700 dark:text-neutral-300 mb-1.5 uppercase font-medium">
                      Expected Student Count
                    </label>
                    <select
                      name="estimatedStudents"
                      value={formData.estimatedStudents}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl bg-neutral-50 dark:bg-navy-950/90 border border-neutral-300 dark:border-white/10 text-neutral-900 dark:text-white text-sm focus:border-cyan-500 dark:focus:border-cyan-400 transition-colors outline-none shadow-sm"
                    >
                      <option value="50-100 Students">50–100 Students (Departmental)</option>
                      <option value="150-300 Students">150–300 Students (Multi-Batch)</option>
                      <option value="500+ Students">500+ Students (Full Auditorium)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-neutral-700 dark:text-neutral-300 mb-1.5 uppercase font-medium">
                    Proposed Format / Remarks
                  </label>
                  <textarea
                    rows={3}
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Mention tentative dates, specific department branches, or lab infrastructure..."
                    className="w-full px-4 py-3 rounded-xl bg-neutral-50 dark:bg-navy-950/90 border border-neutral-300 dark:border-white/10 text-neutral-900 dark:text-white text-sm focus:border-cyan-500 dark:focus:border-cyan-400 transition-colors outline-none shadow-sm"
                  />
                </div>

                <button
                  type="submit"
                  disabled={status.loading}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-headline font-bold text-sm uppercase tracking-wider shadow-lg shadow-blue-500/25 hover:shadow-cyan-500/35 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
                >
                  {status.loading ? (
                    <span>Submitting Inquiry...</span>
                  ) : (
                    <>
                      <span>Transmit Collaboration Request</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
