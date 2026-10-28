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
  submitCollaborationRequest,
  fetchCollaborationRequests,
  approveCollaborationRequest,
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
  const [collaborationRequests, setCollaborationRequests] = useState([]);
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

  // Collaboration request form (Candidate / Partner)
  const [customRequest, setCustomRequest] = useState({
    institution: user.institution || '',
    preferredLocation: '',
    topic: 'Generative AI & Agentic Workflows',
    targetAudience: '3rd & 4th Year B.Tech CSE',
    estimatedStudents: 150,
    preferredDates: '',
    specialRequirements: '',
    phone: ''
  });

  // Load portal data
  const loadData = async () => {
    setLoading(true);
    try {
      const wsList = await fetchUpcomingWorkshops();
      setWorkshops(wsList);

      if (isAdmin) {
        const reqList = await fetchCollaborationRequests();
        setCollaborationRequests(reqList);
        const regs = await fetchAllRegistrations();
        setAllRegistrations(regs);
      } else {
        const myRegs = await fetchCandidateRegistrations(user.email);
        setMyRegistrations(myRegs);
        const allReqs = await fetchCollaborationRequests();
        setCollaborationRequests(allReqs.filter(r => r.email === user.email));
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

  // --- Candidate Action: Submit Custom Location Workshop Request ---
  const handleCustomRequestSubmit = async (e) => {
    e.preventDefault();
    try {
      await submitCollaborationRequest({
        requestedBy: user.name,
        email: user.email,
        phone: customRequest.phone || '7665061289',
        institution: customRequest.institution,
        preferredLocation: customRequest.preferredLocation,
        topic: customRequest.topic,
        targetAudience: customRequest.targetAudience,
        estimatedStudents: customRequest.estimatedStudents,
        preferredDates: customRequest.preferredDates,
        specialRequirements: customRequest.specialRequirements
      });
      notify('success', 'Collaboration request submitted! IncuxAI Admin will review your location and requirements.');
      setCustomRequest({
        institution: user.institution || '',
        preferredLocation: '',
        topic: 'Generative AI & Agentic Workflows',
        targetAudience: '3rd & 4th Year B.Tech CSE',
        estimatedStudents: 150,
        preferredDates: '',
        specialRequirements: '',
        phone: ''
      });
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

  // --- Admin Action: Approve Collaboration Request and Post Workshop Live ---
  const handleApproveRequest = async (requestId) => {
    try {
      const res = await approveCollaborationRequest(requestId);
      notify('success', res.message || 'Collaboration request approved and published as an active workshop!');
      loadData();
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-navy-950/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-5xl h-[92vh] flex flex-col rounded-3xl bg-white dark:bg-navy-900 border border-neutral-200 dark:border-white/10 shadow-2xl overflow-hidden">
        {/* Top Header */}
        <div className="p-5 sm:p-6 border-b border-neutral-200 dark:border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-neutral-50 dark:bg-navy-950">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl flex items-center justify-center bg-blue-600/15 text-blue-600 dark:text-cyan-400 border border-blue-500/30">
              {isAdmin ? <Shield className="w-6 h-6" /> : <User className="w-6 h-6" />}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-headline font-bold text-xl sm:text-2xl text-neutral-900 dark:text-white">
                  {user.name}
                </h3>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-blue-500/20 text-blue-700 dark:text-cyan-300 border border-blue-400/30">
                  {user.role}
                </span>
              </div>
              <p className="text-xs text-neutral-500 dark:text-textMuted font-mono">
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
              className="w-10 h-10 rounded-xl bg-neutral-200 dark:bg-dark-800 flex items-center justify-center text-neutral-600 dark:text-neutral-300 hover:text-neutral-950 dark:hover:text-white transition-colors cursor-pointer"
              aria-label="Close portal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Action Flash Alert */}
        {actionMessage.text && (
          <div className={`p-3 px-6 text-xs font-mono flex items-center gap-2 border-b ${actionMessage.type === 'error' ? 'bg-rose-100 dark:bg-rose-950 border-rose-300 text-rose-800 dark:text-rose-200' : 'bg-blue-50 dark:bg-blue-950 border-blue-300 dark:border-blue-500/40 text-blue-800 dark:text-cyan-200'}`}>
            {actionMessage.type === 'error' ? <AlertCircle className="w-4 h-4 flex-shrink-0" /> : <CheckCircle2 className="w-4 h-4 flex-shrink-0 text-cyan-500" />}
            <span>{actionMessage.text}</span>
          </div>
        )}

        {/* Tab Navigation */}
        <div className="flex overflow-x-auto no-scrollbar border-b border-neutral-200 dark:border-surface-border bg-white dark:bg-dark-900 px-4 sm:px-6">
          {isAdmin ? (
            <>
              <button
                onClick={() => setActiveTab('post-workshop')}
                className={`py-3.5 px-4 text-xs font-mono font-semibold border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap cursor-pointer ${activeTab === 'post-workshop' ? 'border-blue-600 text-blue-600 dark:text-cyan-400 font-bold' : 'border-transparent text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-200'}`}
              >
                <PlusCircle className="w-4 h-4" />
                <span>Post Workshop</span>
              </button>
              <button
                onClick={() => setActiveTab('collab-requests')}
                className={`py-3.5 px-4 text-xs font-mono font-semibold border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap cursor-pointer ${activeTab === 'collab-requests' ? 'border-blue-600 text-blue-600 dark:text-cyan-400 font-bold' : 'border-transparent text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-200'}`}
              >
                <Clock className="w-4 h-4" />
                <span>Location Collaboration Requests ({collaborationRequests.filter(r => r.status === 'Pending').length})</span>
              </button>
              <button
                onClick={() => setActiveTab('manage-workshops')}
                className={`py-3.5 px-4 text-xs font-mono font-semibold border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap cursor-pointer ${activeTab === 'manage-workshops' ? 'border-blue-600 text-blue-600 dark:text-cyan-400 font-bold' : 'border-transparent text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-200'}`}
              >
                <Layers className="w-4 h-4" />
                <span>Active Live Workshops ({workshops.length})</span>
              </button>
              <button
                onClick={() => setActiveTab('all-registrations')}
                className={`py-3.5 px-4 text-xs font-mono font-semibold border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap cursor-pointer ${activeTab === 'all-registrations' ? 'border-blue-600 text-blue-600 dark:text-cyan-400 font-bold' : 'border-transparent text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-200'}`}
              >
                <Users className="w-4 h-4" />
                <span>Candidate Registrations ({allRegistrations.length})</span>
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setActiveTab('browse-workshops')}
                className={`py-3.5 px-4 text-xs font-mono font-semibold border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap cursor-pointer ${activeTab === 'browse-workshops' ? 'border-blue-600 text-blue-600 dark:text-cyan-400 font-bold' : 'border-transparent text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-200'}`}
              >
                <Layers className="w-4 h-4" />
                <span>Available Workshops ({workshops.length})</span>
              </button>
              <button
                onClick={() => setActiveTab('my-workshops')}
                className={`py-3.5 px-4 text-xs font-mono font-semibold border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap cursor-pointer ${activeTab === 'my-workshops' ? 'border-blue-600 text-blue-600 dark:text-cyan-400 font-bold' : 'border-transparent text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-200'}`}
              >
                <BookmarkCheck className="w-4 h-4" />
                <span>My Enrolled Workshops ({myRegistrations.length})</span>
              </button>
              <button
                onClick={() => setActiveTab('request-location')}
                className={`py-3.5 px-4 text-xs font-mono font-semibold border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap cursor-pointer ${activeTab === 'request-location' ? 'border-blue-600 text-blue-600 dark:text-cyan-400 font-bold' : 'border-transparent text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-200'}`}
              >
                <MapPin className="w-4 h-4" />
                <span>Request Workshop at Your Campus</span>
              </button>
            </>
          )}
        </div>

        {/* Tab Content Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-8 bg-neutral-100/50 dark:bg-dark-950/60">
          {/* ========================================================= */}
          {/* CANDIDATE VIEW: BROWSE & REGISTER FOR WORKSHOPS           */}
          {/* ========================================================= */}
          {!isAdmin && activeTab === 'browse-workshops' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h4 className="font-headline font-bold text-2xl text-neutral-900 dark:text-white">
                    Live Upcoming Workshops
                  </h4>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400">
                    Posted and verified by IncuxAI Admin. Select any workshop to register.
                  </p>
                </div>
                <button
                  onClick={() => setActiveTab('request-location')}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-50 dark:bg-blue-950/80 text-blue-700 dark:text-cyan-300 border border-blue-300 dark:border-blue-500/40 text-xs font-mono font-bold hover:bg-blue-100 dark:hover:bg-blue-900/60 cursor-pointer"
                >
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Want this at your location? Request here</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {workshops.map((ws) => {
                  const isRegistered = myRegistrations.some((r) => r.workshopId === ws.id);
                  const seatsLeft = Math.max(0, ws.seats - (ws.registered || 0));

                  return (
                    <div
                      key={ws.id}
                      className="p-6 rounded-3xl bg-white dark:bg-surface-card border border-neutral-200 dark:border-surface-border flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow"
                    >
                      <div>
                        <div className="flex items-center justify-between text-xs font-mono mb-3">
                          <span className="px-2.5 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/80 text-blue-700 dark:text-cyan-300 border border-blue-400/20 font-bold">
                            {ws.category}
                          </span>
                          <span className="px-2 py-0.5 rounded bg-neutral-100 dark:bg-dark-800 text-neutral-600 dark:text-neutral-400 text-[10px] font-semibold">
                            {ws.mode}
                          </span>
                        </div>

                        <h5 className="font-headline font-bold text-xl text-neutral-900 dark:text-white leading-snug">
                          {ws.title}
                        </h5>

                        <div className="my-4 space-y-2 text-xs font-mono text-neutral-600 dark:text-neutral-300">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-3.5 h-3.5 text-blue-600 dark:text-cyan-400" />
                            <span>{ws.dates}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="w-3.5 h-3.5 text-accent-orange" />
                            <span>{ws.location}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <User className="w-3.5 h-3.5 text-neutral-400" />
                            <span>{ws.speaker}</span>
                          </div>
                        </div>

                        <p className="text-xs text-neutral-600 dark:text-neutral-400 line-clamp-2 mb-4 font-body">
                          {ws.description}
                        </p>
                      </div>

                      <div className="pt-4 border-t border-neutral-200 dark:border-surface-border flex items-center justify-between">
                        <div className="text-xs font-mono">
                          <span className="text-neutral-500 block text-[10px]">SEATS STATUS</span>
                          <span className="font-bold text-neutral-900 dark:text-white">
                            {seatsLeft} remaining / {ws.seats}
                          </span>
                        </div>

                        {isRegistered ? (
                          <div className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-50 dark:bg-blue-950/80 text-blue-700 dark:text-cyan-300 border border-blue-300 dark:border-blue-500/40 text-xs font-mono font-bold">
                            <CheckCheck className="w-4 h-4" />
                            <span>Enrolled</span>
                          </div>
                        ) : (
                          <button
                            onClick={() => handleRegister(ws.id)}
                            disabled={seatsLeft === 0}
                            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-headline font-bold text-xs uppercase tracking-wider shadow-md shadow-blue-500/25 transition-all cursor-pointer disabled:opacity-40"
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
                <h4 className="font-headline font-bold text-2xl text-neutral-900 dark:text-white">
                  My Enrolled Workshops
                </h4>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">
                  Confirmed participation passes for your registered cohorts.
                </p>
              </div>

              {myRegistrations.length === 0 ? (
                <div className="p-12 text-center rounded-3xl bg-white dark:bg-surface-card border border-neutral-200 dark:border-surface-border">
                  <BookmarkCheck className="w-12 h-12 text-neutral-400 mx-auto mb-3" />
                  <h5 className="font-headline font-bold text-lg text-neutral-900 dark:text-white">
                    No Workshops Enrolled Yet
                  </h5>
                  <p className="text-xs text-neutral-500 mt-1 max-w-sm mx-auto">
                    Browse the available workshops catalog and click 'Register Now' to secure your seat.
                  </p>
                  <button
                    onClick={() => setActiveTab('browse-workshops')}
                    className="mt-4 px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold text-xs font-headline uppercase shadow-md shadow-blue-500/25 transition-all"
                  >
                    Browse Workshops
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {myRegistrations.map((reg) => (
                    <div
                      key={reg.id}
                      className="p-6 rounded-3xl bg-white dark:bg-surface-card border border-neutral-200 dark:border-surface-border shadow-sm flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between text-xs font-mono mb-2">
                          <span className="text-blue-600 dark:text-cyan-400 font-bold">
                            PASS #{reg.id}
                          </span>
                          <span className="px-2.5 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-cyan-300 border border-blue-400/30 font-bold text-[10px]">
                            {reg.status}
                          </span>
                        </div>

                        <h5 className="font-headline font-bold text-xl text-neutral-900 dark:text-white leading-snug">
                          {reg.workshopTitle}
                        </h5>

                        <div className="my-4 space-y-1.5 text-xs font-mono text-neutral-600 dark:text-neutral-300">
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

                      <div className="pt-3 border-t border-neutral-200 dark:border-surface-border text-[11px] font-mono text-neutral-500">
                        Registered on: {new Date(reg.registeredAt).toLocaleDateString()}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ========================================================= */}
          {/* CANDIDATE VIEW: REQUEST WORKSHOP AT YOUR LOCATION         */}
          {/* ========================================================= */}
          {!isAdmin && activeTab === 'request-location' && (
            <div className="max-w-3xl mx-auto space-y-6">
              <div>
                <h4 className="font-headline font-bold text-2xl text-neutral-900 dark:text-white">
                  Request a Workshop at Your Campus / Location
                </h4>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">
                  Ask IncuxAI Admin to conduct an expert-led workshop in your college or preferred city with your custom syllabus requirements.
                </p>
              </div>

              <form onSubmit={handleCustomRequestSubmit} className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-surface-card border border-neutral-200 dark:border-surface-border space-y-4 shadow-sm">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-neutral-700 dark:text-neutral-300 mb-1 font-semibold">
                      College / Institution Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={customRequest.institution}
                      onChange={(e) => setCustomRequest({ ...customRequest, institution: e.target.value })}
                      placeholder="e.g. GRIET / Gayatri Vidya Parishad"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 dark:bg-dark-800 border border-neutral-300 dark:border-surface-border text-sm text-neutral-900 dark:text-white outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-neutral-700 dark:text-neutral-300 mb-1 font-semibold">
                      Preferred Location / Campus Address *
                    </label>
                    <input
                      type="text"
                      required
                      value={customRequest.preferredLocation}
                      onChange={(e) => setCustomRequest({ ...customRequest, preferredLocation: e.target.value })}
                      placeholder="e.g. GRIET Main Auditorium, Bachupally, Hyderabad"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 dark:bg-dark-800 border border-neutral-300 dark:border-surface-border text-sm text-neutral-900 dark:text-white outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-neutral-700 dark:text-neutral-300 mb-1 font-semibold">
                      Workshop Topic Requirements *
                    </label>
                    <input
                      type="text"
                      required
                      value={customRequest.topic}
                      onChange={(e) => setCustomRequest({ ...customRequest, topic: e.target.value })}
                      placeholder="e.g. Generative AI, Agentic Workflows, or Cloud Security"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 dark:bg-dark-800 border border-neutral-300 dark:border-surface-border text-sm text-neutral-900 dark:text-white outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-neutral-700 dark:text-neutral-300 mb-1 font-semibold">
                      Expected Student Count
                    </label>
                    <select
                      value={customRequest.estimatedStudents}
                      onChange={(e) => setCustomRequest({ ...customRequest, estimatedStudents: parseInt(e.target.value, 10) })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 dark:bg-dark-800 border border-neutral-300 dark:border-surface-border text-sm text-neutral-900 dark:text-white outline-none focus:border-blue-500"
                    >
                      <option value={80}>50–80 Students (Departmental)</option>
                      <option value={150}>100–180 Students (Multi-Batch)</option>
                      <option value={300}>200–350 Students (Auditorium)</option>
                      <option value={500}>500+ Students (Symposium)</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-neutral-700 dark:text-neutral-300 mb-1 font-semibold">
                      Preferred Dates / Timeline
                    </label>
                    <input
                      type="text"
                      value={customRequest.preferredDates}
                      onChange={(e) => setCustomRequest({ ...customRequest, preferredDates: e.target.value })}
                      placeholder="e.g. December 18–19, 2026 or 1st week of Jan"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 dark:bg-dark-800 border border-neutral-300 dark:border-surface-border text-sm text-neutral-900 dark:text-white outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-neutral-700 dark:text-neutral-300 mb-1 font-semibold">
                      Contact Phone Number
                    </label>
                    <input
                      type="text"
                      value={customRequest.phone}
                      onChange={(e) => setCustomRequest({ ...customRequest, phone: e.target.value })}
                      placeholder="7665061289"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 dark:bg-dark-800 border border-neutral-300 dark:border-surface-border text-sm text-neutral-900 dark:text-white outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-neutral-700 dark:text-neutral-300 mb-1 font-semibold">
                    Specific Technical &amp; Infrastructure Requirements
                  </label>
                  <textarea
                    rows={3}
                    value={customRequest.specialRequirements}
                    onChange={(e) => setCustomRequest({ ...customRequest, specialRequirements: e.target.value })}
                    placeholder="Describe specific lab setup needs, code repositories, student year levels, or certification requirements..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 dark:bg-dark-800 border border-neutral-300 dark:border-surface-border text-sm text-neutral-900 dark:text-white outline-none focus:border-blue-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-headline font-bold text-sm uppercase tracking-wider shadow-lg shadow-blue-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Transmit Location Workshop Request to Admin</span>
                </button>
              </form>

              {/* Status of previously submitted requests */}
              {collaborationRequests.length > 0 && (
                <div className="mt-8 space-y-3">
                  <h5 className="font-headline font-bold text-lg text-neutral-900 dark:text-white">
                    Your Submitted Location Requests ({collaborationRequests.length})
                  </h5>
                  <div className="space-y-3">
                    {collaborationRequests.map((req) => (
                      <div
                        key={req.id}
                        className="p-4 rounded-2xl bg-white dark:bg-surface-card border border-neutral-200 dark:border-surface-border flex items-center justify-between text-xs font-mono"
                      >
                        <div>
                          <span className="font-bold text-neutral-900 dark:text-white block text-sm">
                            {req.topic} @ {req.institution}
                          </span>
                          <span className="text-neutral-500">
                            Location: {req.preferredLocation} • Dates: {req.preferredDates}
                          </span>
                        </div>
                        <span className={`px-2.5 py-1 rounded-full font-bold ${req.status === 'Approved & Published' ? 'bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-cyan-300 border border-blue-400/30' : 'bg-cyan-50 text-cyan-800 dark:bg-cyan-950/80 dark:text-cyan-400 border border-cyan-400/30'}`}>
                          {req.status}
                        </span>
                      </div>
                    ))}
                  </div>
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
                <h4 className="font-headline font-bold text-2xl text-neutral-900 dark:text-white">
                  Post New Live Workshop
                </h4>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">
                  Once published, this workshop will immediately appear in the candidate registration catalog.
                </p>
              </div>

              <form onSubmit={handlePostWorkshop} className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-surface-card border border-neutral-200 dark:border-surface-border space-y-4 shadow-sm">
                <div>
                  <label className="block text-xs font-mono text-neutral-700 dark:text-neutral-300 mb-1 font-semibold">
                    Workshop Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={newWorkshop.title}
                    onChange={(e) => setNewWorkshop({ ...newWorkshop, title: e.target.value })}
                    placeholder="e.g. Agentic AI & Autonomous Multi-Agent Workflows"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 dark:bg-dark-800 border border-neutral-300 dark:border-surface-border text-sm text-neutral-900 dark:text-white outline-none focus:border-blue-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-neutral-700 dark:text-neutral-300 mb-1 font-semibold">
                      Category *
                    </label>
                    <select
                      value={newWorkshop.category}
                      onChange={(e) => setNewWorkshop({ ...newWorkshop, category: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 dark:bg-dark-800 border border-neutral-300 dark:border-surface-border text-sm text-neutral-900 dark:text-white outline-none focus:border-blue-500"
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
                    <label className="block text-xs font-mono text-neutral-700 dark:text-neutral-300 mb-1 font-semibold">
                      Delivery Mode
                    </label>
                    <select
                      value={newWorkshop.mode}
                      onChange={(e) => setNewWorkshop({ ...newWorkshop, mode: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 dark:bg-dark-800 border border-neutral-300 dark:border-surface-border text-sm text-neutral-900 dark:text-white outline-none focus:border-blue-500"
                    >
                      <option value="Offline">Offline (On-Campus)</option>
                      <option value="Online">Online (Interactive Remote)</option>
                      <option value="Hybrid">Hybrid Cohort</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-neutral-700 dark:text-neutral-300 mb-1 font-semibold">
                      Dates *
                    </label>
                    <input
                      type="text"
                      required
                      value={newWorkshop.dates}
                      onChange={(e) => setNewWorkshop({ ...newWorkshop, dates: e.target.value })}
                      placeholder="e.g. December 19–20, 2026"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 dark:bg-dark-800 border border-neutral-300 dark:border-surface-border text-sm text-neutral-900 dark:text-white outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-neutral-700 dark:text-neutral-300 mb-1 font-semibold">
                      Location / Campus *
                    </label>
                    <input
                      type="text"
                      required
                      value={newWorkshop.location}
                      onChange={(e) => setNewWorkshop({ ...newWorkshop, location: e.target.value })}
                      placeholder="e.g. GRIET Campus, Hyderabad"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 dark:bg-dark-800 border border-neutral-300 dark:border-surface-border text-sm text-neutral-900 dark:text-white outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-neutral-700 dark:text-neutral-300 mb-1 font-semibold">
                      Max Seats Capacity
                    </label>
                    <input
                      type="number"
                      value={newWorkshop.seats}
                      onChange={(e) => setNewWorkshop({ ...newWorkshop, seats: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 dark:bg-dark-800 border border-neutral-300 dark:border-surface-border text-sm text-neutral-900 dark:text-white outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-neutral-700 dark:text-neutral-300 mb-1 font-semibold">
                      Lead Speaker / Mentor
                    </label>
                    <input
                      type="text"
                      value={newWorkshop.speaker}
                      onChange={(e) => setNewWorkshop({ ...newWorkshop, speaker: e.target.value })}
                      placeholder="e.g. Dilip Sir (Walmart Lead) or Anvesh G"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 dark:bg-dark-800 border border-neutral-300 dark:border-surface-border text-sm text-neutral-900 dark:text-white outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-neutral-700 dark:text-neutral-300 mb-1 font-semibold">
                    Description &amp; Syllabus Overview
                  </label>
                  <textarea
                    rows={3}
                    value={newWorkshop.description}
                    onChange={(e) => setNewWorkshop({ ...newWorkshop, description: e.target.value })}
                    placeholder="Hands-on coding, live lab repos, architecture overview..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 dark:bg-dark-800 border border-neutral-300 dark:border-surface-border text-sm text-neutral-900 dark:text-white outline-none focus:border-blue-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-headline font-bold text-sm uppercase tracking-wider shadow-lg shadow-blue-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>Publish Workshop Live</span>
                </button>
              </form>
            </div>
          )}

          {/* ========================================================= */}
          {/* ADMIN VIEW: COLLABORATION REQUESTS REVIEW & APPROVAL      */}
          {/* ========================================================= */}
          {isAdmin && activeTab === 'collab-requests' && (
            <div className="space-y-6">
              <div>
                <h4 className="font-headline font-bold text-2xl text-neutral-900 dark:text-white">
                  Location Collaboration Requests
                </h4>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">
                  Institutions &amp; candidates requesting workshops at their specific campuses. Review their requirements and click "Approve &amp; Post Live" to publish the workshop for candidates.
                </p>
              </div>

              {collaborationRequests.length === 0 ? (
                <div className="p-12 text-center rounded-3xl bg-white dark:bg-surface-card border border-neutral-200 dark:border-surface-border">
                  <p className="text-sm text-neutral-500">No collaboration requests pending at this time.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {collaborationRequests.map((req) => (
                    <div
                      key={req.id}
                      className="p-6 rounded-3xl bg-white dark:bg-surface-card border border-neutral-200 dark:border-surface-border shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-6"
                    >
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-xs font-mono">
                          <span className="px-2.5 py-0.5 rounded-full bg-neutral-100 dark:bg-dark-800 text-neutral-700 dark:text-neutral-300 font-bold">
                            REQ #{req.id}
                          </span>
                          <span className={`px-2.5 py-0.5 rounded-full font-bold ${req.status === 'Approved & Published' ? 'bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-cyan-300 border border-blue-400/30' : 'bg-cyan-50 text-cyan-800 dark:bg-cyan-950/80 dark:text-cyan-400 border border-cyan-400/30'}`}>
                            {req.status}
                          </span>
                        </div>

                        <h5 className="font-headline font-bold text-xl text-neutral-900 dark:text-white">
                          {req.topic}
                        </h5>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1 text-xs font-mono text-neutral-600 dark:text-neutral-300 pt-1">
                          <p>
                            <strong>Institution:</strong> {req.institution}
                          </p>
                          <p>
                            <strong>Requested By:</strong> {req.requestedBy} ({req.email})
                          </p>
                          <p>
                            <strong>Location:</strong> {req.preferredLocation}
                          </p>
                          <p>
                            <strong>Preferred Dates:</strong> {req.preferredDates}
                          </p>
                          <p>
                            <strong>Expected Batch:</strong> {req.estimatedStudents} Students
                          </p>
                          {req.phone && (
                            <p>
                              <strong>Phone:</strong> {req.phone}
                            </p>
                          )}
                        </div>

                        {req.specialRequirements && (
                          <div className="p-3 rounded-xl bg-neutral-50 dark:bg-dark-800 border border-neutral-200 dark:border-surface-border text-xs text-neutral-700 dark:text-neutral-300 font-body">
                            <strong>Custom Requirements:</strong> {req.specialRequirements}
                          </div>
                        )}
                      </div>

                      {/* Approval CTA */}
                      <div className="flex flex-col gap-2 flex-shrink-0">
                        {req.status === 'Approved & Published' ? (
                          <div className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-cyan-300 border border-blue-300 dark:border-blue-500/40 text-xs font-mono font-bold">
                            <CheckCheck className="w-4 h-4" />
                            <span>Published Live</span>
                          </div>
                        ) : (
                          <button
                            onClick={() => handleApproveRequest(req.id)}
                            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-headline font-bold text-xs uppercase tracking-wider shadow-md shadow-blue-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
                          >
                            <Sparkles className="w-4 h-4" />
                            <span>Approve &amp; Post Live Workshop</span>
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ========================================================= */}
          {/* ADMIN VIEW: MANAGE ACTIVE WORKSHOPS                       */}
          {/* ========================================================= */}
          {isAdmin && activeTab === 'manage-workshops' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-headline font-bold text-2xl text-neutral-900 dark:text-white">
                    Active Live Workshops
                  </h4>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400">
                    Currently visible to candidates for online registration.
                  </p>
                </div>
                <button
                  onClick={() => setActiveTab('post-workshop')}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white text-xs font-mono font-bold flex items-center gap-1.5 shadow-md shadow-blue-500/20 cursor-pointer"
                >
                  <PlusCircle className="w-3.5 h-3.5" />
                  <span>Post Workshop</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {workshops.map((ws) => (
                  <div
                    key={ws.id}
                    className="p-6 rounded-3xl bg-white dark:bg-surface-card border border-neutral-200 dark:border-surface-border shadow-sm flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between text-xs font-mono mb-2">
                        <span className="text-blue-600 dark:text-cyan-400 font-bold">{ws.category}</span>
                        <span className="px-2 py-0.5 rounded bg-neutral-100 dark:bg-dark-800 text-[10px] text-neutral-500">
                          {ws.mode}
                        </span>
                      </div>

                      <h5 className="font-headline font-bold text-xl text-neutral-900 dark:text-white leading-snug">
                        {ws.title}
                      </h5>

                      <div className="my-3 space-y-1 text-xs font-mono text-neutral-600 dark:text-neutral-300">
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

                    <div className="pt-3 border-t border-neutral-200 dark:border-surface-border flex items-center justify-between">
                      <span className="text-[11px] font-mono text-blue-600 dark:text-cyan-400 font-bold">
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
                <h4 className="font-headline font-bold text-2xl text-neutral-900 dark:text-white">
                  All Candidate Registrations ({allRegistrations.length})
                </h4>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">
                  Comprehensive roster of students and candidates registered across workshops.
                </p>
              </div>

              {allRegistrations.length === 0 ? (
                <div className="p-8 text-center rounded-2xl bg-white dark:bg-surface-card border border-neutral-200 dark:border-surface-border">
                  <p className="text-sm text-neutral-500">No registrations recorded yet.</p>
                </div>
              ) : (
                <div className="overflow-x-auto rounded-2xl border border-neutral-200 dark:border-surface-border bg-white dark:bg-surface-card shadow-sm">
                  <table className="w-full text-left text-xs font-mono">
                    <thead className="bg-neutral-100 dark:bg-dark-800 text-neutral-700 dark:text-neutral-300 border-b border-neutral-200 dark:border-surface-border">
                      <tr>
                        <th className="p-3">Ref ID</th>
                        <th className="p-3">Candidate</th>
                        <th className="p-3">Email</th>
                        <th className="p-3">Institution</th>
                        <th className="p-3">Workshop</th>
                        <th className="p-3">Date</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-200 dark:divide-surface-border text-neutral-800 dark:text-neutral-200">
                      {allRegistrations.map((reg) => (
                        <tr key={reg.id} className="hover:bg-neutral-50 dark:hover:bg-dark-850">
                          <td className="p-3 font-bold text-blue-600 dark:text-cyan-400">{reg.id}</td>
                          <td className="p-3 font-semibold text-neutral-900 dark:text-white">{reg.candidateName}</td>
                          <td className="p-3 text-neutral-500">{reg.candidateEmail}</td>
                          <td className="p-3">{reg.candidateInstitution}</td>
                          <td className="p-3 font-medium">{reg.workshopTitle}</td>
                          <td className="p-3 text-neutral-500">{new Date(reg.registeredAt).toLocaleDateString()}</td>
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
