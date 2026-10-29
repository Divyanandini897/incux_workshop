import React, { useState } from 'react';
import { X, User, Shield, Lock, Mail, Building, Phone, ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react';
import { loginUser, registerCandidate } from '../services/api';

export default function AuthModal({ isOpen, onClose, onAuthSuccess, defaultRole = 'candidate' }) {
  const [role, setRole] = useState(defaultRole); // 'candidate' or 'admin'
  const [isRegistering, setIsRegistering] = useState(false); // for candidate signup

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    institution: '',
    phone: ''
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (role === 'candidate' && isRegistering) {
        const res = await registerCandidate(formData);
        onAuthSuccess(res.user);
        onClose();
      } else {
        const res = await loginUser({ email: formData.email, password: formData.password });
        onAuthSuccess(res.user);
        onClose();
      }
    } catch (err) {
      setError(err.message || 'Operation failed');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickLogin = (email, password, loginRole) => {
    setRole(loginRole);
    setIsRegistering(false);
    setFormData((prev) => ({ ...prev, email, password }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#140303]/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-md p-6 sm:p-8 rounded-3xl bg-[#FAF6F0] dark:bg-[#1c0707] backdrop-blur-xl border border-[#A5A79B]/40 dark:border-[#590907]/50 shadow-2xl">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-9 h-9 rounded-full bg-[#E8D2B5]/40 dark:bg-[#250a09] flex items-center justify-center text-[#590907] dark:text-[#E8D2B5] hover:bg-[#590907] hover:text-[#E8D2B5] transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E8D2B5]/40 dark:bg-[#250a09] text-xs font-mono text-[#590907] dark:text-[#E8D2B5] font-semibold mb-2">
            <span>Authentication Hub</span>
          </div>
          <h3 className="font-headline font-bold text-2xl text-[#1C0707] dark:text-[#F7F1E6]">
            {role === 'admin'
              ? 'Administrator Portal'
              : isRegistering
              ? 'Create Candidate Account'
              : 'Candidate Sign In'}
          </h3>
          <p className="text-xs text-[#590907]/70 dark:text-[#E8D2B5]/70 mt-1">
            {role === 'admin'
              ? 'Manage workshops, approve collaboration requests, and view candidates.'
              : 'Register for live workshops or request custom programs at your campus.'}
          </p>
        </div>

        {/* Role Switcher Tabs */}
        <div className="flex p-1 rounded-xl bg-[#E8D2B5]/30 dark:bg-[#140303] mb-6 border border-[#A5A79B]/20 dark:border-[#590907]/30">
          <button
            type="button"
            onClick={() => {
              setRole('candidate');
              setIsRegistering(false);
              setError('');
            }}
            className={`flex-1 py-2 rounded-lg text-xs font-mono font-medium flex items-center justify-center gap-2 transition-all cursor-pointer ${
              role === 'candidate'
                ? 'bg-[#590907] text-[#E8D2B5] shadow-md shadow-[#590907]/30 font-bold'
                : 'text-[#590907]/70 dark:text-[#E8D2B5]/70 hover:text-[#590907] dark:hover:text-[#E8D2B5]'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>Candidate</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setRole('admin');
              setIsRegistering(false);
              setError('');
            }}
            className={`flex-1 py-2 rounded-lg text-xs font-mono font-medium flex items-center justify-center gap-2 transition-all cursor-pointer ${
              role === 'admin'
                ? 'bg-[#781210] text-[#FAF6F0] shadow-md shadow-[#590907]/30 font-bold'
                : 'text-[#590907]/70 dark:text-[#E8D2B5]/70 hover:text-[#590907] dark:hover:text-[#E8D2B5]'
            }`}
          >
            <Shield className="w-3.5 h-3.5" />
            <span>Administrator</span>
          </button>
        </div>

        {/* Quick Demo Login Presets */}
        <div className="mb-5 p-3 rounded-xl bg-white/80 dark:bg-[#140303]/80 border border-[#A5A79B]/30 dark:border-[#590907]/40 text-xs font-mono">
          <span className="text-[10px] text-[#590907]/70 dark:text-[#E8D2B5]/70 block uppercase font-bold mb-1.5">
            // Quick Demo Credentials:
          </span>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => handleQuickLogin('admin@incuxai.com', 'admin123', 'admin')}
              className="px-2.5 py-1 rounded bg-[#E8D2B5]/40 dark:bg-[#250a09] hover:bg-[#590907] hover:text-[#E8D2B5] text-[#1C0707] dark:text-[#E8D2B5] text-[11px] transition-colors"
            >
              Demo Admin
            </button>
            <button
              type="button"
              onClick={() => handleQuickLogin('rahul@student.edu', 'password123', 'candidate')}
              className="px-2.5 py-1 rounded bg-[#E8D2B5]/40 dark:bg-[#250a09] hover:bg-[#590907] hover:text-[#E8D2B5] text-[#1C0707] dark:text-[#E8D2B5] text-[11px] transition-colors"
            >
              Demo Candidate
            </button>
          </div>
        </div>

        {/* Error Notification */}
        {error && (
          <div className="mb-4 p-3 rounded-xl bg-rose-50 dark:bg-rose-950/60 border border-rose-300 dark:border-rose-500/40 text-rose-700 dark:text-rose-200 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Auth Form */}
        <form onSubmit={handleSubmit} className="space-y-3.5">
          {role === 'candidate' && isRegistering && (
            <div>
              <label className="block text-xs font-mono text-[#590907]/80 dark:text-[#E8D2B5]/80 mb-1">
                Full Name *
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Rahul Varma"
                  className="w-full px-3.5 py-2.5 pl-9 rounded-xl bg-white dark:bg-[#140303] border border-[#A5A79B]/40 dark:border-[#590907]/50 text-sm text-[#1C0707] dark:text-[#F7F1E6] focus:border-[#590907] dark:focus:border-[#E8D2B5] outline-none"
                />
                <User className="w-4 h-4 text-[#A5A79B] absolute left-3 top-3" />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-mono text-[#590907]/80 dark:text-[#E8D2B5]/80 mb-1">
              Email Address *
            </label>
            <div className="relative">
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder={role === 'admin' ? 'admin@incuxai.com' : 'candidate@college.edu'}
                className="w-full px-3.5 py-2.5 pl-9 rounded-xl bg-white dark:bg-[#140303] border border-[#A5A79B]/40 dark:border-[#590907]/50 text-sm text-[#1C0707] dark:text-[#F7F1E6] focus:border-[#590907] dark:focus:border-[#E8D2B5] outline-none"
              />
              <Mail className="w-4 h-4 text-[#A5A79B] absolute left-3 top-3" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono text-[#590907]/80 dark:text-[#E8D2B5]/80 mb-1">
              Password *
            </label>
            <div className="relative">
              <input
                type="password"
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full px-3.5 py-2.5 pl-9 rounded-xl bg-white dark:bg-[#140303] border border-[#A5A79B]/40 dark:border-[#590907]/50 text-sm text-[#1C0707] dark:text-[#F7F1E6] focus:border-[#590907] dark:focus:border-[#E8D2B5] outline-none"
              />
              <Lock className="w-4 h-4 text-[#A5A79B] absolute left-3 top-3" />
            </div>
          </div>

          {role === 'candidate' && isRegistering && (
            <div>
              <label className="block text-xs font-mono text-[#590907]/80 dark:text-[#E8D2B5]/80 mb-1">
                College / Institution Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="institution"
                  value={formData.institution}
                  onChange={handleChange}
                  placeholder="e.g. IIT Hyderabad"
                  className="w-full px-3.5 py-2.5 pl-9 rounded-xl bg-white dark:bg-[#140303] border border-[#A5A79B]/40 dark:border-[#590907]/50 text-sm text-[#1C0707] dark:text-[#F7F1E6] focus:border-[#590907] dark:focus:border-[#E8D2B5] outline-none"
                />
                <Building className="w-4 h-4 text-[#A5A79B] absolute left-3 top-3" />
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 mt-2 rounded-xl bg-[#590907] hover:bg-[#781210] text-[#E8D2B5] font-headline font-bold text-sm uppercase tracking-wider shadow-lg shadow-[#590907]/30 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {loading ? (
              <span>Authenticating...</span>
            ) : (
              <>
                <span>
                  {role === 'admin'
                    ? 'Enter Admin Console'
                    : isRegistering
                    ? 'Complete Registration'
                    : 'Sign In to Workshops'}
                </span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Toggle between Login and Register for Candidates */}
        {role === 'candidate' && (
          <div className="mt-5 pt-4 border-t border-[#A5A79B]/30 dark:border-[#590907]/40 text-center text-xs font-mono">
            {isRegistering ? (
              <p className="text-[#590907]/80 dark:text-[#E8D2B5]/80">
                Already registered?{' '}
                <button
                  type="button"
                  onClick={() => setIsRegistering(false)}
                  className="text-[#590907] dark:text-[#E8D2B5] font-bold underline ml-1 hover:opacity-80"
                >
                  Sign in here
                </button>
              </p>
            ) : (
              <p className="text-[#590907]/80 dark:text-[#E8D2B5]/80">
                New candidate?{' '}
                <button
                  type="button"
                  onClick={() => setIsRegistering(true)}
                  className="text-[#590907] dark:text-[#E8D2B5] font-bold underline ml-1 hover:opacity-80"
                >
                  Create free account
                </button>
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
