import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import MenuOverlay from './components/MenuOverlay';
import IntroAnimation from './components/IntroAnimation';
import Hero from './components/Hero';
import OurWork from './components/OurWork';
import UpcomingWorkshopsSection from './components/UpcomingWorkshopsSection';
import CompanyGrid from './components/CompanyGrid';
import ImpactStats from './components/ImpactStats';
import FeaturedWorkshops from './components/FeaturedWorkshops';
import Expertise from './components/Expertise';
import HowWeWork from './components/HowWeWork';
import About from './components/About';
import ReviewsSection from './components/ReviewsSection';
import Footer from './components/Footer';
import FloatingConnectWidget from './components/FloatingConnectWidget';

import AuthModal from './components/AuthModal';
import PortalModal from './components/PortalModal';

import { workshopCards, featuredWorkshops } from './data/workshops';
import { companiesData } from './data/companies';
import { impactStatsData } from './data/statistics';
import { expertiseData } from './data/expertise';
import { fetchWorkshops, fetchCompanies, fetchStats, fetchExpertise } from './services/api';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [introFinished, setIntroFinished] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    // Whenever intro finishes or layout settles, recalculate scroll triggers
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 400);
    return () => clearTimeout(timer);
  }, [introFinished]);

  // Authentication & Portal state
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem('incuxai_user');
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      return null;
    }
  });

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authDefaultRole, setAuthDefaultRole] = useState('candidate');
  const [isPortalOpen, setIsPortalOpen] = useState(false);

  // App data state (defaults to local data, updates from backend if available)
  const [cards, setCards] = useState(workshopCards);
  const [featured, setFeatured] = useState(featuredWorkshops);
  const [companies, setCompanies] = useState(companiesData);
  const [stats, setStats] = useState(impactStatsData);
  const [expertise, setExpertise] = useState(expertiseData);

  useEffect(() => {
    // Fetch dynamic data from Express backend API
    const loadBackendData = async () => {
      try {
        const workshopsRes = await fetchWorkshops();
        if (workshopsRes?.cards) setCards(workshopsRes.cards);
        if (workshopsRes?.featured) setFeatured(workshopsRes.featured);

        const compRes = await fetchCompanies();
        if (compRes) setCompanies(compRes);

        const statsRes = await fetchStats();
        if (statsRes) setStats(statsRes);

        const expRes = await fetchExpertise();
        if (expRes) setExpertise(expRes);
      } catch (err) {
        console.log('[IncuxAI] Operating with local static datasets.');
      }
    };

    loadBackendData();
  }, []);

  const handleAuthSuccess = (user) => {
    setCurrentUser(user);
    localStorage.setItem('incuxai_user', JSON.stringify(user));
    setIsAuthModalOpen(false);
    setIsPortalOpen(true);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('incuxai_user');
    setIsPortalOpen(false);
  };

  const openAuthWithRole = (role) => {
    setAuthDefaultRole(role);
    setIsAuthModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#FAF6F0] dark:bg-[#140303] text-[#1C0707] dark:text-[#F7F1E6] selection:bg-[#E8D2B5] selection:text-[#590907] transition-colors duration-200">
      {/* 1. Intro Animation (Plays once per page load, character/word reveal, 2-3s) */}
      {!introFinished && (
        <IntroAnimation onComplete={() => setIntroFinished(true)} />
      )}

      {/* Full-screen Overlay Menu */}
      <MenuOverlay
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        onOpenAuth={openAuthWithRole}
        onOpenPortal={() => setIsPortalOpen(true)}
        currentUser={currentUser}
      />

      {/* Global Sticky Navbar with Login/Portal, Theme Toggle, & Menu button */}
      <Navbar
        onOpenMenu={() => setIsMenuOpen(true)}
        currentUser={currentUser}
        onOpenAuth={openAuthWithRole}
        onOpenPortal={() => setIsPortalOpen(true)}
      />

      {/* Authentication Modal (Candidate & Admin) */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onAuthSuccess={handleAuthSuccess}
        defaultRole={authDefaultRole}
      />

      {/* Interactive Candidate & Admin Management Portal */}
      <PortalModal
        isOpen={isPortalOpen}
        onClose={() => setIsPortalOpen(false)}
        user={currentUser}
        onLogout={handleLogout}
      />

      {/* Main Content: 11 Sections in Exact Fixed Order + Live Registration Portal */}
      <main>
        {/* Section 2: Hero */}
        <Hero />

        {/* Section: Bridging Education & Industry (Directly below landing page) */}
        <About />

        {/* Section 3: Our Work ("Where Ideas Become Experience" with fluid horizontal scrolling) */}
        <OurWork cards={cards} />

        {/* Live Workshop Registration & Location Request Portal Section */}
        <UpcomingWorkshopsSection
          onOpenPortal={() => setIsPortalOpen(true)}
          onOpenAuth={openAuthWithRole}
          currentUser={currentUser}
        />

        {/* Section 4: Industry Connections (8 typographic wordmarks + official logos) */}
        <CompanyGrid data={companies} />

        {/* Section 5: Our Impact (Contrasting background, count-up) */}
        <ImpactStats data={stats} />

        {/* Section 6: Featured Workshops (Asymmetric editorial layout) */}
        <FeaturedWorkshops workshops={featured} />

        {/* Section 7: Workshop Expertise (15 topics in 5 groups with crystal-clear tabs) */}
        <Expertise data={expertise} />

        {/* Section 8: How We Work (Understand, Design, Deliver, Extend) */}
        <HowWeWork />

        {/* Creative Scrolling Student Reviews Section */}
        <ReviewsSection />
      </main>

      {/* Section 11: Footer (With giant subtle incuxai watermark) */}
      <Footer />

      {/* Floating Interactive Connect Widget (Inspired by glowlogics.in) */}
      <FloatingConnectWidget
        onOpenAuth={openAuthWithRole}
        onOpenPortal={() => setIsPortalOpen(true)}
        currentUser={currentUser}
      />
    </div>
  );
}
