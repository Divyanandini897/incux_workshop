# IncuxAI Workshop Website Platform

A modern, animation-rich website MVP for **IncuxAI** structured with separate **frontend** and **backend** layers, engineered in strict accordance with the **IncuxAI Workshop Website MVP Specification**.

---

## 🏗️ Architecture & Project Structure

The project is split into clean, modular frontend and backend codebases:

```
d:\Incux_workshop\
├── frontend\                         # React.js + Vite + Tailwind CSS + GSAP
│   ├── src\
│   │   ├── components\
│   │   │   ├── IntroAnimation.jsx    # Section 01: Character reveal (2-3s)
│   │   │   ├── Navbar.jsx            # Header with bright rounded menu button
│   │   │   ├── MenuOverlay.jsx       # Full-screen overlay menu (Escape/focus lock)
│   │   │   ├── Hero.jsx              # Section 02: 100svh hero, 2 CTAs, oversized WORKSHOPS
│   │   │   ├── OurWork.jsx           # Section 03: Pinned horizontal scroll on desktop
│   │   │   ├── WorkshopCard.jsx      # Individual workshop format cards
│   │   │   ├── CompanyGrid.jsx       # Section 04: 8 typographic wordmarks + disclaimer
│   │   │   ├── ImpactStats.jsx       # Section 05: Warm cream background, count-up stats
│   │   │   ├── FeaturedWorkshops.jsx # Section 06: 5 documented achievements (asymmetric layout)
│   │   │   ├── Expertise.jsx         # Section 07: 15 topics in 5 groups with category switcher
│   │   │   ├── HowWeWork.jsx         # Section 08: 4 delivery phases
│   │   │   ├── About.jsx             # Section 09: Official mission statement
│   │   │   ├── NewsSection.jsx       # Honest transparency placeholder
│   │   │   ├── ContactCTA.jsx        # Section 10: Backend inquiry form + config placeholders
│   │   │   └── Footer.jsx            # Section 11: Navigation, categories, and copyright
│   │   ├── data\                     # Local static datasets (offline fallback)
│   │   │   ├── config.js
│   │   │   ├── workshops.js
│   │   │   ├── companies.js
│   │   │   ├── statistics.js
│   │   │   └── expertise.js
│   │   ├── services\
│   │   │   └── api.js                # API client with automatic fallback
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.js
│
├── backend\                          # Node.js + Express REST API
│   ├── data\
│   │   ├── workshops.json            # Structured workshop cards & featured events
│   │   ├── companies.json            # 8 practitioner companies
│   │   ├── statistics.json           # Documented attendance metrics
│   │   ├── expertise.json            # 15 topics across 5 tracks
│   │   ├── config.json               # Central configuration placeholders
│   │   └── inquiries.json            # Persisted institutional inquiry submissions
│   ├── server.js                     # Express server, CORS, input validation, endpoints
│   └── package.json
│
└── package.json                      # Root workspace orchestrator
```

---

## 🚀 Quick Start Guide

### 1. Run the Backend API Server
```bash
cd backend
npm install
npm run dev
# Server listening at http://localhost:5000
```

### 2. Run the Frontend Client
```bash
cd frontend
npm install
npm run dev
# Vite client ready at http://localhost:5173
```

---

## 🔌 Backend REST API Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/health` | Health check, server uptime, and timestamp |
| `GET` | `/api/workshops` | Returns the 5 overview cards and 5 documented workshop achievements |
| `GET` | `/api/companies` | Returns the 8 practitioner companies with compliance note |
| `GET` | `/api/stats` | Returns verified impact statistics and attendance footnote |
| `GET` | `/api/expertise` | Returns the 5 expertise tracks and 15 individual modules |
| `GET` | `/api/config` | Returns brand mission and central contact placeholders |
| `GET` | `/api/news` | Returns the honest news placeholder status |
| `POST` | `/api/inquiries` | Receives and validates institutional collaboration inquiries |
| `GET` | `/api/inquiries` | Inspects stored inquiries in `inquiries.json` |

---

## 🎨 Design & Data Accuracy Highlights

1. **Aesthetics Inspired by workshop.com**:
   - Deep graphite `#0e0f12` and charcoal `#14151a` canvases.
   - Vivid lime/chartreuse `#ccff00` accents for buttons and interactive details.
   - Contrasting warm cream `#f7f5f0` for Section 05 (Our Impact).
   - Space Grotesk headline typography with intentional line breaks and Inter for body text.
   - Oversized "WORKSHOPS" rising typography with zero horizontal overflow.
2. **Strict Data Compliance**:
   - 950+ counts cumulative verified workshop participations (200 + 150 + 500 + 100), never claiming 950 unique individuals.
   - GITAM bootcamp is not added into attendance total.
   - No fabricated dates or testimonials.
   - The 8 company names (Google, Walmart, Microsoft, Deloitte, TCS, Genpact, Johnson & Johnson, Tech Mahindra) are rendered as typographic wordmarks without logos, accurately describing practitioner experience without claiming false sponsorships.
3. **Accessibility**:
   - Keyboard accessible full-screen menu with Escape listener and scroll locking.
   - Dedicated `prefers-reduced-motion` toggle switch on navbar and OS detection.
