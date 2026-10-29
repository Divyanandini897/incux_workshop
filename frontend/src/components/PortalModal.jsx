import React, { useState, useEffect } from 'react';
import {
  X,
  PlusCircle,
  CheckCircle2,
  Calendar,
  MapPin,
  Users,
  User,
  Shield,
  Layers,
  Sparkles,
  Send,
  Trash2,
  CheckCheck,
  Clock,
  ArrowRight,
  BookmarkCheck,
  Building,
  AlertCircle
} from 'lucide-react';
import {
  fetchUpcomingWorkshops,
  postWorkshop,
  deleteWorkshop,
  registerForWorkshop,
  fetchCandidateRegistrations,
  fetchAllRegistrations
} from '../services/api';

export default function PortalModal({ isOpen, onClose, user, onLogout }) {
  if (!isOpen || !user) return null;

  const isAdmin = user.role === 'admin';

  // Navigation tab
  const [activeTab, setActiveTab] = useState(isAdmin ? 'post-workshop' : 'browse-workshops');

  // Datasets
  const [workshops, setWorkshops] = useState([]);
  const [myRegistrations, setMyRegistrations] = useState([]);
  const [allRegistrations, setAllRegistrations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [actionMessage, setActionMessage] = useState({ type: '', text: '' });

  // Post workshop form (Admin)
  const [newWorkshop, setNewWorkshop] = useState({
    title: '',
    category: 'Agentic AI',
    dates: '',
    location: '',
    seats: 120,
    mode: 'Offline',
    speaker: '',
    description: ''
  });

  // Load portal data
  const loadData = async () => {
    setLoading(true);
    try {
      const wsList = await fetchUpcomingWorkshops();
      setWorkshops(wsList);

      if (isAdmin) {
        const regs = await fetchAllRegistrations();
        setAllRegistrations(regs);
      } else {
        const myRegs = await fetchCandidateRegistrations(user.email);
        setMyRegistrations(myRegs);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [user]);

  // Flash message helper
  const notify = (type, text) => {
    setActionMessage({ type, text });
    setTimeout(() => setActionMessage({ type: '', text: '' }), 4500);
  };

  // --- Candidate Action: Register for Workshop ---
  const handleRegister = async (workshopId) => {
    try {
      await registerForWorkshop(workshopId, {
        candidateName: user.name,
        candidateEmail: user.email,
        candidateInstitution: user.institution || 'Independent Candidate',
        candidatePhone: '7665061289'
      });
      notify('success', 'Successfully registered for workshop! View it in "My Enrolled Workshops".');
      loadData();
    } catch (err) {
      notify('error', err.message);
    }
  };

  // --- Admin Action: Post New Workshop ---
  const handlePostWorkshop = async (e) => {
    e.preventDefault();
    try {
      await postWorkshop(newWorkshop);
      notify('success', `Workshop "${newWorkshop.title}" posted successfully! Candidates can now register.`);
      setNewWorkshop({
        title: '',
        category: 'Agentic AI',
        dates: '',
        location: '',
        seats: 120,
        mode: 'Offline',
        speaker: '',
        description: ''
      });
      loadData();
      setActiveTab('manage-workshops');
    } catch (err) {
      notify('error', err.message);
    }
  };

  // --- Admin Action: Delete Workshop ---
  const handleDeleteWorkshop = async (id) => {
    if (!window.confirm('Are you sure you want to remove this workshop?')) return;
    try {
      await deleteWorkshop(id);
      notify('success', 'Workshop removed.');
      loadData();
    } catch (err) {
      notify('error', err.message);
    }
  };

  return (
    <div className="fixed inset-0 z-50 w-screen h-screen min-h-screen flex flex-col bg-[#FAF6F0] dark:bg-[#1c0707] text-[#1C0707] dark:text-[#F7F1E6] animate-in fade-in duration-200 overflow-hidden">
      <div className="relative w-full h-full flex flex-col overflow-hidden">
        {/* Top Header */}
        <div className="p-5 sm:p-6 border-b border-[#A5A79B]/30 dark:border-[#590907]/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#F4EFE6] dark:bg-[#140303] shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl flex items-center justify-center bg-[#590907]/15 dark:bg-[#E8D2B5]/15 text-[#590907] dark:text-[#E8D2B5] border border-[#590907]/30 dark:border-[#E8D2B5]/30">
              {isAdmin ? <Shield className="w-6 h-6" /> : <User className="w-6 h-6" />}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-headline font-bold text-xl sm:text-2xl text-[#1C0707] dark:text-[#F7F1E6]">
                  {user.name}
                </h3>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-[#590907]/15 dark:bg-[#E8D2B5]/15 text-[#590907] dark:text-[#E8D2B5] border border-[#590907]/30 dark:border-[#E8D2B5]/30">
                  {user.role}
                </span>
              </div>
              <p className="text-xs text-[#590907]/70 dark:text-[#E8D2B5]/70 font-mono">
                {user.email} • {user.institution || 'IncuxAI Platform'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onLogout}
              className="px-3.5 py-1.5 rounded-xl border border-rose-300 dark:border-rose-500/40 text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 text-xs font-mono font-semibold transition-colors cursor-pointer"
            >
              Sign Out
            </button>
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-xl bg-[#E8D2B5]/40 dark:bg-[#250a09] flex items-center justify-center text-[#590907] dark:text-[#E8D2B5] hover:bg-[#590907] hover:text-[#E8D2B5] transition-colors cursor-pointer"
              aria-label="Close portal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Action Flash Alert */}
        {actionMessage.text && (
          <div className={`p-3 px-6 text-xs font-mono flex items-center gap-2 border-b shrink-0 ${actionMessage.type === 'error' ? 'bg-rose-100 dark:bg-rose-950 border-rose-300 text-rose-800 dark:text-rose-200' : 'bg-[#E8D2B5]/30 dark:bg-[#250a09] border-[#A5A79B]/40 dark:border-[#590907]/60 text-[#590907] dark:text-[#E8D2B5]'}`}>
            {actionMessage.type === 'error' ? <AlertCircle className="w-4 h-4 flex-shrink-0" /> : <CheckCircle2 className="w-4 h-4 flex-shrink-0 text-[#590907] dark:text-[#E8D2B5]" />}
            <span>{actionMessage.text}</span>
          </div>
        )}

        {/* Tab Navigation */}
        <div className="flex overflow-x-auto no-scrollbar border-b border-[#A5A79B]/30 dark:border-[#590907]/40 bg-[#FAF6F0] dark:bg-[#1c0707] px-4 sm:px-6 shrink-0">
          {isAdmin ? (
            <>
              <button
                onClick={() => setActiveTab('post-workshop')}
                className={`py-3.5 px-4 text-xs font-mono font-semibold border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap cursor-pointer ${activeTab === 'post-workshop' ? 'border-[#590907] dark:border-[#E8D2B5] text-[#590907] dark:text-[#E8D2B5] font-bold' : 'border-transparent text-[#590907]/70 dark:text-[#E8D2B5]/70 hover:text-[#590907] dark:hover:text-[#E8D2B5]'}`}
              >
                <PlusCircle className="w-4 h-4" />
                <span>Post Workshop</span>
              </button>
              <button
                onClick={() => setActiveTab('manage-workshops')}
                className={`py-3.5 px-4 text-xs font-mono font-semibold border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap cursor-pointer ${activeTab === 'manage-workshops' ? 'border-[#590907] dark:border-[#E8D2B5] text-[#590907] dark:text-[#E8D2B5] font-bold' : 'border-transparent text-[#590907]/70 dark:text-[#E8D2B5]/70 hover:text-[#590907] dark:hover:text-[#E8D2B5]'}`}
              >
                <Layers className="w-4 h-4" />
                <span>Active Live Workshops ({workshops.length})</span>
              </button>
              <button
                onClick={() => setActiveTab('all-registrations')}
                className={`py-3.5 px-4 text-xs font-mono font-semibold border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap cursor-pointer ${activeTab === 'all-registrations' ? 'border-[#590907] dark:border-[#E8D2B5] text-[#590907] dark:text-[#E8D2B5] font-bold' : 'border-transparent text-[#590907]/70 dark:text-[#E8D2B5]/70 hover:text-[#590907] dark:hover:text-[#E8D2B5]'}`}
              >
                <Users className="w-4 h-4" />
                <span>Candidate Registrations ({allRegistrations.length})</span>
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setActiveTab('browse-workshops')}
                className={`py-3.5 px-4 text-xs font-mono font-semibold border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap cursor-pointer ${activeTab === 'browse-workshops' ? 'border-[#590907] dark:border-[#E8D2B5] text-[#590907] dark:text-[#E8D2B5] font-bold' : 'border-transparent text-[#590907]/70 dark:text-[#E8D2B5]/70 hover:text-[#590907] dark:hover:text-[#E8D2B5]'}`}
              >
                <Layers className="w-4 h-4" />
                <span>Available Workshops ({workshops.length})</span>
              </button>
              <button
                onClick={() => setActiveTab('my-workshops')}
                className={`py-3.5 px-4 text-xs font-mono font-semibold border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap cursor-pointer ${activeTab === 'my-workshops' ? 'border-[#590907] dark:border-[#E8D2B5] text-[#590907] dark:text-[#E8D2B5] font-bold' : 'border-transparent text-[#590907]/70 dark:text-[#E8D2B5]/70 hover:text-[#590907] dark:hover:text-[#E8D2B5]'}`}
              >
                <BookmarkCheck className="w-4 h-4" />
                <span>My Enrolled Workshops ({myRegistrations.length})</span>
              </button>
            </>
          )}
        </div>

        {/* Tab Content Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-8 bg-[#FAF6F0]/60 dark:bg-[#140303]/70">
          {/* ========================================================= */}
          {/* CANDIDATE VIEW: BROWSE & REGISTER FOR WORKSHOPS           */}
          {/* ========================================================= */}
          {!isAdmin && activeTab === 'browse-workshops' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h4 className="font-headline font-bold text-2xl text-[#1C0707] dark:text-[#F7F1E6]">
                    Live Upcoming Workshops
                  </h4>
                  <p className="text-xs text-[#590907]/70 dark:text-[#E8D2B5]/70">
                    Posted by IncuxAI Admin. Select any workshop to register.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {workshops.map((ws) => {
                  const isRegistered = myRegistrations.some((r) => r.workshopId === ws.id);
                  const seatsLeft = Math.max(0, ws.seats - (ws.registered || 0));

                  return (
                    <div
                      key={ws.id}
                      className="p-6 rounded-3xl bg-white dark:bg-[#200807] border border-[#A5A79B]/30 dark:border-[#590907]/50 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow"
                    >
                      <div>
                        <div className="flex items-center justify-between text-xs font-mono mb-3">
                          <span className="px-2.5 py-0.5 rounded-full bg-[#590907]/10 dark:bg-[#E8D2B5]/10 text-[#590907] dark:text-[#E8D2B5] border border-[#590907]/20 dark:border-[#E8D2B5]/20 font-bold">
                            {ws.category}
                          </span>
                          <span className="px-2 py-0.5 rounded bg-[#E8D2B5]/30 dark:bg-[#140303] text-[#590907] dark:text-[#E8D2B5] text-[10px] font-semibold">
                            {ws.mode}
                          </span>
                        </div>

                        <h5 className="font-headline font-bold text-xl text-[#1C0707] dark:text-[#F7F1E6] leading-snug">
                          {ws.title}
                        </h5>

                        <div className="my-4 space-y-2 text-xs font-mono text-[#590907]/80 dark:text-[#E8D2B5]/80">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-3.5 h-3.5 text-[#590907] dark:text-[#E8D2B5]" />
                            <span>{ws.dates}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="w-3.5 h-3.5 text-[#A5A79B]" />
                            <span>{ws.location}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <User className="w-3.5 h-3.5 text-[#A5A79B]" />
                            <span>{ws.speaker}</span>
                          </div>
                        </div>

                        <p className="text-xs text-[#590907]/70 dark:text-[#E8D2B5]/70 line-clamp-2 mb-4 font-body">
                          {ws.description}
                        </p>
                      </div>

                      <div className="pt-4 border-t border-[#A5A79B]/30 dark:border-[#590907]/40 flex items-center justify-between">
                        <div className="text-xs font-mono">
                          <span className="text-[#590907]/60 dark:text-[#E8D2B5]/60 block text-[10px]">SEATS STATUS</span>
                          <span className="font-bold text-[#1C0707] dark:text-[#F7F1E6]">
                            {seatsLeft} remaining / {ws.seats}
                          </span>
                        </div>

                        {isRegistered ? (
                          <div className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#590907]/10 dark:bg-[#E8D2B5]/10 text-[#590907] dark:text-[#E8D2B5] border border-[#590907]/30 dark:border-[#E8D2B5]/30 text-xs font-mono font-bold">
                            <CheckCheck className="w-4 h-4" />
                            <span>Enrolled</span>
                          </div>
                        ) : (
                          <button
                            onClick={() => handleRegister(ws.id)}
                            disabled={seatsLeft === 0}
                            className="px-5 py-2.5 rounded-xl bg-[#590907] hover:bg-[#781210] text-[#E8D2B5] font-headline font-bold text-xs uppercase tracking-wider shadow-md shadow-[#590907]/30 transition-all cursor-pointer disabled:opacity-40"
                          >
                            {seatsLeft === 0 ? 'Full' : 'Register Now'}
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* CANDIDATE VIEW: MY REGISTERED WORKSHOPS                   */}
          {/* ========================================================= */}
          {!isAdmin && activeTab === 'my-workshops' && (
            <div className="space-y-6">
              <div>
                <h4 className="font-headline font-bold text-2xl text-[#1C0707] dark:text-[#F7F1E6]">
                  My Enrolled Workshops
                </h4>
                <p className="text-xs text-[#590907]/70 dark:text-[#E8D2B5]/70">
                  Confirmed participation passes for your registered cohorts.
                </p>
              </div>

              {myRegistrations.length === 0 ? (
                <div className="p-12 text-center rounded-3xl bg-white dark:bg-[#200807] border border-[#A5A79B]/30 dark:border-[#590907]/40">
                  <BookmarkCheck className="w-12 h-12 text-[#A5A79B] mx-auto mb-3" />
                  <h5 className="font-headline font-bold text-lg text-[#1C0707] dark:text-[#F7F1E6]">
                    No Workshops Enrolled Yet
                  </h5>
                  <p className="text-xs text-[#590907]/70 dark:text-[#E8D2B5]/70 mt-1 max-w-sm mx-auto">
                    Browse the available workshops catalog and click 'Register Now' to secure your seat.
                  </p>
                  <button
                    onClick={() => setActiveTab('browse-workshops')}
                    className="mt-4 px-5 py-2.5 rounded-xl bg-[#590907] hover:bg-[#781210] text-[#E8D2B5] font-bold text-xs font-headline uppercase shadow-md shadow-[#590907]/30 transition-all"
                  >
                    Browse Workshops
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {myRegistrations.map((reg) => (
                    <div
                      key={reg.id}
                      className="p-6 rounded-3xl bg-white dark:bg-[#200807] border border-[#A5A79B]/30 dark:border-[#590907]/50 shadow-sm flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between text-xs font-mono mb-2">
                          <span className="text-[#590907] dark:text-[#E8D2B5] font-bold">
                            PASS #{reg.id}
                          </span>
                          <span className="px-2.5 py-0.5 rounded-full bg-[#590907]/10 dark:bg-[#E8D2B5]/10 text-[#590907] dark:text-[#E8D2B5] border border-[#590907]/30 dark:border-[#E8D2B5]/30 font-bold text-[10px]">
                            {reg.status}
                          </span>
                        </div>

                        <h5 className="font-headline font-bold text-xl text-[#1C0707] dark:text-[#F7F1E6] leading-snug">
                          {reg.workshopTitle}
                        </h5>

                        <div className="my-4 space-y-1.5 text-xs font-mono text-[#590907]/80 dark:text-[#E8D2B5]/80">
                          <p>
                            <strong>Dates:</strong> {reg.workshopDates}
                          </p>
                          <p>
                            <strong>Location:</strong> {reg.workshopLocation}
                          </p>
                          <p>
                            <strong>Candidate:</strong> {reg.candidateName} ({reg.candidateInstitution})
                          </p>
                        </div>
                      </div>

                      <div className="pt-3 border-t border-[#A5A79B]/30 dark:border-[#590907]/40 text-[11px] font-mono text-[#590907]/60 dark:text-[#E8D2B5]/60">
                        Registered on: {new Date(reg.registeredAt).toLocaleDateString()}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}



          {/* ========================================================= */}
          {/* ADMIN VIEW: POST WORKSHOP                                 */}
          {/* ========================================================= */}
          {isAdmin && activeTab === 'post-workshop' && (
            <div className="max-w-3xl mx-auto space-y-6">
              <div>
                <h4 className="font-headline font-bold text-2xl text-[#1C0707] dark:text-[#F7F1E6]">
                  Post New Live Workshop
                </h4>
                <p className="text-xs text-[#590907]/70 dark:text-[#E8D2B5]/70">
                  Once published, this workshop will immediately appear in the candidate registration catalog.
                </p>
              </div>

              <form onSubmit={handlePostWorkshop} className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#200807] border border-[#A5A79B]/30 dark:border-[#590907]/50 space-y-4 shadow-sm">
                <div>
                  <label className="block text-xs font-mono text-[#590907] dark:text-[#E8D2B5] mb-1 font-semibold">
                    Workshop Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={newWorkshop.title}
                    onChange={(e) => setNewWorkshop({ ...newWorkshop, title: e.target.value })}
                    placeholder="e.g. Agentic AI & Autonomous Multi-Agent Workflows"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF6F0] dark:bg-[#140303] border border-[#A5A79B]/40 dark:border-[#590907]/50 text-sm text-[#1C0707] dark:text-[#F7F1E6] outline-none focus:border-[#590907] dark:focus:border-[#E8D2B5]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-[#590907] dark:text-[#E8D2B5] mb-1 font-semibold">
                      Category *
                    </label>
                    <select
                      value={newWorkshop.category}
                      onChange={(e) => setNewWorkshop({ ...newWorkshop, category: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF6F0] dark:bg-[#140303] border border-[#A5A79B]/40 dark:border-[#590907]/50 text-sm text-[#1C0707] dark:text-[#F7F1E6] outline-none focus:border-[#590907] dark:focus:border-[#E8D2B5]"
                    >
                      <option value="Agentic AI">Agentic AI</option>
                      <option value="Generative AI">Generative AI</option>
                      <option value="Cloud & Cybersecurity">Cloud &amp; Cybersecurity</option>
                      <option value="Software Development">Software Development</option>
                      <option value="AI Bootcamps">AI Bootcamps</option>
                      <option value="Data & Analytics">Data &amp; Analytics</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-[#590907] dark:text-[#E8D2B5] mb-1 font-semibold">
                      Delivery Mode
                    </label>
                    <select
                      value={newWorkshop.mode}
                      onChange={(e) => setNewWorkshop({ ...newWorkshop, mode: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF6F0] dark:bg-[#140303] border border-[#A5A79B]/40 dark:border-[#590907]/50 text-sm text-[#1C0707] dark:text-[#F7F1E6] outline-none focus:border-[#590907] dark:focus:border-[#E8D2B5]"
                    >
                      <option value="Offline">Offline (On-Campus)</option>
                      <option value="Online">Online (Interactive Remote)</option>
                      <option value="Hybrid">Hybrid Cohort</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-[#590907] dark:text-[#E8D2B5] mb-1 font-semibold">
                      Dates *
                    </label>
                    <input
                      type="text"
                      required
                      value={newWorkshop.dates}
                      onChange={(e) => setNewWorkshop({ ...newWorkshop, dates: e.target.value })}
                      placeholder="e.g. December 19–20, 2026"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF6F0] dark:bg-[#140303] border border-[#A5A79B]/40 dark:border-[#590907]/50 text-sm text-[#1C0707] dark:text-[#F7F1E6] outline-none focus:border-[#590907] dark:focus:border-[#E8D2B5]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-[#590907] dark:text-[#E8D2B5] mb-1 font-semibold">
                      Location / Campus *
                    </label>
                    <input
                      type="text"
                      required
                      value={newWorkshop.location}
                      onChange={(e) => setNewWorkshop({ ...newWorkshop, location: e.target.value })}
                      placeholder="e.g. GRIET Campus, Hyderabad"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF6F0] dark:bg-[#140303] border border-[#A5A79B]/40 dark:border-[#590907]/50 text-sm text-[#1C0707] dark:text-[#F7F1E6] outline-none focus:border-[#590907] dark:focus:border-[#E8D2B5]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-[#590907] dark:text-[#E8D2B5] mb-1 font-semibold">
                      Max Seats Capacity
                    </label>
                    <input
                      type="number"
                      value={newWorkshop.seats}
                      onChange={(e) => setNewWorkshop({ ...newWorkshop, seats: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF6F0] dark:bg-[#140303] border border-[#A5A79B]/40 dark:border-[#590907]/50 text-sm text-[#1C0707] dark:text-[#F7F1E6] outline-none focus:border-[#590907] dark:focus:border-[#E8D2B5]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-[#590907] dark:text-[#E8D2B5] mb-1 font-semibold">
                      Lead Speaker / Mentor
                    </label>
                    <input
                      type="text"
                      value={newWorkshop.speaker}
                      onChange={(e) => setNewWorkshop({ ...newWorkshop, speaker: e.target.value })}
                      placeholder="e.g. Dilip Sir (Walmart Lead) or Anvesh G"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF6F0] dark:bg-[#140303] border border-[#A5A79B]/40 dark:border-[#590907]/50 text-sm text-[#1C0707] dark:text-[#F7F1E6] outline-none focus:border-[#590907] dark:focus:border-[#E8D2B5]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-[#590907] dark:text-[#E8D2B5] mb-1 font-semibold">
                    Description &amp; Syllabus Overview
                  </label>
                  <textarea
                    rows={3}
                    value={newWorkshop.description}
                    onChange={(e) => setNewWorkshop({ ...newWorkshop, description: e.target.value })}
                    placeholder="Hands-on coding, live lab repos, architecture overview..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF6F0] dark:bg-[#140303] border border-[#A5A79B]/40 dark:border-[#590907]/50 text-sm text-[#1C0707] dark:text-[#F7F1E6] outline-none focus:border-[#590907] dark:focus:border-[#E8D2B5]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-[#590907] hover:bg-[#781210] text-[#E8D2B5] font-headline font-bold text-sm uppercase tracking-wider shadow-lg shadow-[#590907]/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>Publish Workshop Live</span>
                </button>
              </form>
            </div>
          )}



          {/* ========================================================= */}
          {/* ADMIN VIEW: MANAGE ACTIVE WORKSHOPS                       */}
          {/* ========================================================= */}
          {isAdmin && activeTab === 'manage-workshops' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-headline font-bold text-2xl text-[#1C0707] dark:text-[#F7F1E6]">
                    Active Live Workshops
                  </h4>
                  <p className="text-xs text-[#590907]/70 dark:text-[#E8D2B5]/70">
                    Currently visible to candidates for online registration.
                  </p>
                </div>
                <button
                  onClick={() => setActiveTab('post-workshop')}
                  className="px-4 py-2 rounded-xl bg-[#590907] hover:bg-[#781210] text-[#E8D2B5] text-xs font-mono font-bold flex items-center gap-1.5 shadow-md shadow-[#590907]/30 cursor-pointer"
                >
                  <PlusCircle className="w-3.5 h-3.5" />
                  <span>Post Workshop</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {workshops.map((ws) => (
                  <div
                    key={ws.id}
                    className="p-6 rounded-3xl bg-white dark:bg-[#200807] border border-[#A5A79B]/30 dark:border-[#590907]/50 shadow-sm flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between text-xs font-mono mb-2">
                        <span className="text-[#590907] dark:text-[#E8D2B5] font-bold">{ws.category}</span>
                        <span className="px-2 py-0.5 rounded bg-[#E8D2B5]/30 dark:bg-[#140303] text-[10px] text-[#590907] dark:text-[#E8D2B5]">
                          {ws.mode}
                        </span>
                      </div>

                      <h5 className="font-headline font-bold text-xl text-[#1C0707] dark:text-[#F7F1E6] leading-snug">
                        {ws.title}
                      </h5>

                      <div className="my-3 space-y-1 text-xs font-mono text-[#590907]/80 dark:text-[#E8D2B5]/80">
                        <p>
                          <strong>Dates:</strong> {ws.dates}
                        </p>
                        <p>
                          <strong>Location:</strong> {ws.location}
                        </p>
                        <p>
                          <strong>Registrations:</strong> {ws.registered || 0} / {ws.seats} candidates
                        </p>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-[#A5A79B]/30 dark:border-[#590907]/40 flex items-center justify-between">
                      <span className="text-[11px] font-mono text-[#590907] dark:text-[#E8D2B5] font-bold">
                        Status: Active Live
                      </span>
                      <button
                        onClick={() => handleDeleteWorkshop(ws.id)}
                        className="p-2 rounded-lg text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                        title="Remove workshop"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* ADMIN VIEW: ALL CANDIDATE REGISTRATIONS                   */}
          {/* ========================================================= */}
          {isAdmin && activeTab === 'all-registrations' && (
            <div className="space-y-6">
              <div>
                <h4 className="font-headline font-bold text-2xl text-[#1C0707] dark:text-[#F7F1E6]">
                  All Candidate Registrations ({allRegistrations.length})
                </h4>
                <p className="text-xs text-[#590907]/70 dark:text-[#E8D2B5]/70">
                  Comprehensive roster of students and candidates registered across workshops.
                </p>
              </div>

              {allRegistrations.length === 0 ? (
                <div className="p-8 text-center rounded-2xl bg-white dark:bg-[#200807] border border-[#A5A79B]/30 dark:border-[#590907]/40">
                  <p className="text-sm text-[#590907]/70 dark:text-[#E8D2B5]/70">No registrations recorded yet.</p>
                </div>
              ) : (
                <div className="overflow-x-auto rounded-2xl border border-[#A5A79B]/30 dark:border-[#590907]/50 bg-white dark:bg-[#200807] shadow-sm">
                  <table className="w-full text-left text-xs font-mono">
                    <thead className="bg-[#FAF6F0] dark:bg-[#140303] text-[#590907] dark:text-[#E8D2B5] border-b border-[#A5A79B]/30 dark:border-[#590907]/40">
                      <tr>
                        <th className="p-3">Ref ID</th>
                        <th className="p-3">Candidate</th>
                        <th className="p-3">Email</th>
                        <th className="p-3">Institution</th>
                        <th className="p-3">Workshop</th>
                        <th className="p-3">Date</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#A5A79B]/20 dark:divide-[#590907]/30 text-[#1C0707] dark:text-[#F7F1E6]">
                      {allRegistrations.map((reg) => (
                        <tr key={reg.id} className="hover:bg-[#FAF6F0]/50 dark:hover:bg-[#140303]/60">
                          <td className="p-3 font-bold text-[#590907] dark:text-[#E8D2B5]">{reg.id}</td>
                          <td className="p-3 font-semibold text-[#1C0707] dark:text-[#F7F1E6]">{reg.candidateName}</td>
                          <td className="p-3 text-[#590907]/70 dark:text-[#E8D2B5]/70">{reg.candidateEmail}</td>
                          <td className="p-3">{reg.candidateInstitution}</td>
                          <td className="p-3 font-medium">{reg.workshopTitle}</td>
                          <td className="p-3 text-[#590907]/70 dark:text-[#E8D2B5]/70">{new Date(reg.registeredAt).toLocaleDateString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
