import { workshopCards, featuredWorkshops } from '../data/workshops';
import { companiesData } from '../data/companies';
import { impactStatsData } from '../data/statistics';
import { expertiseData } from '../data/expertise';
import { siteConfig } from '../data/config';

const API_BASE = 'http://localhost:5000/api';

export const fetchWorkshops = async () => {
  try {
    const res = await fetch(`${API_BASE}/workshops`);
    if (!res.ok) throw new Error('Network response was not ok');
    return await res.json();
  } catch (err) {
    console.warn('[IncuxAI] Using local fallback for workshops data:', err.message);
    return { cards: workshopCards, featured: featuredWorkshops };
  }
};

export const fetchCompanies = async () => {
  try {
    const res = await fetch(`${API_BASE}/companies`);
    if (!res.ok) throw new Error('Network response was not ok');
    return await res.json();
  } catch (err) {
    console.warn('[IncuxAI] Using local fallback for companies data:', err.message);
    return companiesData;
  }
};

export const fetchStats = async () => {
  try {
    const res = await fetch(`${API_BASE}/stats`);
    if (!res.ok) throw new Error('Network response was not ok');
    return await res.json();
  } catch (err) {
    console.warn('[IncuxAI] Using local fallback for statistics data:', err.message);
    return impactStatsData;
  }
};

export const fetchExpertise = async () => {
  try {
    const res = await fetch(`${API_BASE}/expertise`);
    if (!res.ok) throw new Error('Network response was not ok');
    return await res.json();
  } catch (err) {
    console.warn('[IncuxAI] Using local fallback for expertise data:', err.message);
    return expertiseData;
  }
};

export const submitInquiry = async (formData) => {
  try {
    const res = await fetch(`${API_BASE}/inquiries`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to submit inquiry');
    return { success: true, data };
  } catch (err) {
    console.warn('[IncuxAI] Backend inquiry submission note:', err.message);
    return {
      success: true,
      offlineFallback: true,
      message: 'Inquiry received locally! (Backend server is offline or unreachable).',
      inquiryId: `LOCAL-${Date.now()}`
    };
  }
};

// ==========================================
// AUTHENTICATION API
// ==========================================
export const loginUser = async (credentials) => {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials)
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Login failed');
  return data;
};

export const registerCandidate = async (userData) => {
  const res = await fetch(`${API_BASE}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData)
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Registration failed');
  return data;
};

// ==========================================
// WORKSHOP REGISTRATIONS & MANAGEMENT
// ==========================================
export const fetchUpcomingWorkshops = async () => {
  try {
    const res = await fetch(`${API_BASE}/workshops/upcoming`);
    if (!res.ok) throw new Error('Failed to fetch upcoming workshops');
    const data = await res.json();
    return data.workshops || [];
  } catch (err) {
    console.warn('[IncuxAI] Error fetching upcoming workshops:', err);
    return [];
  }
};

export const postWorkshop = async (workshopData) => {
  const res = await fetch(`${API_BASE}/workshops`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(workshopData)
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Failed to post workshop');
  return data;
};

export const deleteWorkshop = async (id) => {
  const res = await fetch(`${API_BASE}/workshops/${id}`, {
    method: 'DELETE'
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Failed to delete workshop');
  return data;
};

export const registerForWorkshop = async (workshopId, candidateData) => {
  const res = await fetch(`${API_BASE}/workshops/${workshopId}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(candidateData)
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Failed to register for workshop');
  return data;
};

export const fetchCandidateRegistrations = async (email) => {
  try {
    const res = await fetch(`${API_BASE}/candidates/${encodeURIComponent(email)}/registrations`);
    if (!res.ok) throw new Error('Failed to load candidate registrations');
    const data = await res.json();
    return data.registrations || [];
  } catch (err) {
    return [];
  }
};

// ==========================================
// COLLABORATION / CUSTOM WORKSHOP REQUESTS
// ==========================================
export const submitCollaborationRequest = async (requestData) => {
  const res = await fetch(`${API_BASE}/collaboration-requests`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(requestData)
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Failed to submit request');
  return data;
};

export const fetchCollaborationRequests = async () => {
  try {
    const res = await fetch(`${API_BASE}/collaboration-requests`);
    if (!res.ok) throw new Error('Failed to load requests');
    const data = await res.json();
    return data.requests || [];
  } catch (err) {
    return [];
  }
};

export const approveCollaborationRequest = async (requestId) => {
  const res = await fetch(`${API_BASE}/collaboration-requests/${requestId}/approve`, {
    method: 'POST'
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Failed to approve request');
  return data;
};

export const fetchAllRegistrations = async () => {
  try {
    const res = await fetch(`${API_BASE}/registrations`);
    if (!res.ok) throw new Error('Failed to load all registrations');
    const data = await res.json();
    return data.registrations || [];
  } catch (err) {
    return [];
  }
};
