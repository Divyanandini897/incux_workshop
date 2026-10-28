const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const morgan = require('morgan');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Data paths
const DATA_DIR = path.join(__dirname, 'data');
const USERS_FILE = path.join(DATA_DIR, 'users.json');
const UPCOMING_WORKSHOPS_FILE = path.join(DATA_DIR, 'upcoming_workshops.json');
const CUSTOM_REQUESTS_FILE = path.join(DATA_DIR, 'custom_requests.json');
const REGISTRATIONS_FILE = path.join(DATA_DIR, 'registrations.json');
const INQUIRIES_FILE = path.join(DATA_DIR, 'inquiries.json');

// Ensure required files exist
const initFiles = [
  { path: USERS_FILE, default: [] },
  { path: UPCOMING_WORKSHOPS_FILE, default: [] },
  { path: CUSTOM_REQUESTS_FILE, default: [] },
  { path: REGISTRATIONS_FILE, default: [] },
  { path: INQUIRIES_FILE, default: [] }
];

initFiles.forEach(f => {
  if (!fs.existsSync(f.path)) {
    fs.writeFileSync(f.path, JSON.stringify(f.default, null, 2), 'utf-8');
  }
});

// Helper to safely read JSON
const readJson = (filename) => {
  const filePath = path.join(DATA_DIR, filename);
  const data = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(data);
};

// Helper to write JSON
const writeJson = (filename, data) => {
  const filePath = path.join(DATA_DIR, filename);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
};

// ==========================================
// 1. HEALTH & EXISTING MVP ROUTES
// ==========================================
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'IncuxAI Workshop Backend API',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

app.get('/api/workshops', (req, res) => {
  try {
    const data = readJson('workshops.json');
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to load workshops data' });
  }
});

app.get('/api/companies', (req, res) => {
  try {
    const data = readJson('companies.json');
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to load companies data' });
  }
});

app.get('/api/stats', (req, res) => {
  try {
    const data = readJson('statistics.json');
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to load statistics data' });
  }
});

app.get('/api/expertise', (req, res) => {
  try {
    const data = readJson('expertise.json');
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to load expertise data' });
  }
});

app.get('/api/config', (req, res) => {
  try {
    const data = readJson('config.json');
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to load configuration data' });
  }
});

app.get('/api/news', (req, res) => {
  try {
    const data = readJson('config.json');
    res.json(data.newsPlaceholder);
  } catch (err) {
    res.status(500).json({ error: 'Failed to load news placeholder' });
  }
});

app.post('/api/inquiries', (req, res) => {
  try {
    const { name, institution, role, email, phone, workshopInterest, estimatedStudents, mode, message } = req.body;
    if (!name || !institution || !email) {
      return res.status(400).json({ error: 'Please provide name, institution, and email.' });
    }
    const inquiries = readJson('inquiries.json');
    const newInquiry = {
      id: `INQ-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      createdAt: new Date().toISOString(),
      name: name.trim(),
      institution: institution.trim(),
      role: role ? role.trim() : 'Academic / Administrator',
      email: email.trim().toLowerCase(),
      phone: phone ? phone.trim() : 'Not provided',
      workshopInterest: workshopInterest || 'General AI & Tech Exploration',
      estimatedStudents: estimatedStudents || '50-100',
      mode: mode || 'Offline Campus Experience',
      message: message ? message.trim() : '',
      status: 'Received'
    };
    inquiries.unshift(newInquiry);
    writeJson('inquiries.json', inquiries);
    res.status(201).json({ success: true, message: 'Inquiry received.', inquiryId: newInquiry.id });
  } catch (err) {
    res.status(500).json({ error: 'Failed to process inquiry' });
  }
});

app.get('/api/inquiries', (req, res) => {
  try {
    const inquiries = readJson('inquiries.json');
    res.json({ count: inquiries.length, inquiries });
  } catch (err) {
    res.status(500).json({ error: 'Failed to read inquiries' });
  }
});

// ==========================================
// 2. AUTHENTICATION (ADMIN & CANDIDATE)
// ==========================================
app.post('/api/auth/login', (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Please enter both email and password.' });
    }
    const users = readJson('users.json');
    const user = users.find(u => u.email.toLowerCase() === email.trim().toLowerCase() && u.password === password.trim());
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }
    // Return sanitized user object
    res.json({
      success: true,
      user: {
        id: user.id,
        role: user.role,
        name: user.name,
        email: user.email,
        institution: user.institution || ''
      }
    });
  } catch (err) {
    res.status(500).json({ error: 'Authentication error.' });
  }
});

app.post('/api/auth/register', (req, res) => {
  try {
    const { name, email, password, institution, phone } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Name, email, and password are required.' });
    }
    const users = readJson('users.json');
    const exists = users.some(u => u.email.toLowerCase() === email.trim().toLowerCase());
    if (exists) {
      return res.status(409).json({ error: 'An account with this email already exists. Please log in.' });
    }
    const newUser = {
      id: `USR-CAND-${Date.now()}`,
      role: 'candidate',
      name: name.trim(),
      email: email.trim().toLowerCase(),
      password: password.trim(),
      institution: institution ? institution.trim() : 'Independent Candidate',
      phone: phone ? phone.trim() : ''
    };
    users.push(newUser);
    writeJson('users.json', users);
    res.status(201).json({
      success: true,
      message: 'Account created successfully!',
      user: {
        id: newUser.id,
        role: newUser.role,
        name: newUser.name,
        email: newUser.email,
        institution: newUser.institution
      }
    });
  } catch (err) {
    res.status(500).json({ error: 'Registration error.' });
  }
});

// ==========================================
// 3. WORKSHOPS MANAGEMENT (UPCOMING & POSTING)
// ==========================================
// Get all active upcoming workshops for candidates
app.get('/api/workshops/upcoming', (req, res) => {
  try {
    const workshops = readJson('upcoming_workshops.json');
    res.json({ success: true, count: workshops.length, workshops });
  } catch (err) {
    res.status(500).json({ error: 'Failed to read upcoming workshops.' });
  }
});

// Admin posts a new workshop
app.post('/api/workshops', (req, res) => {
  try {
    const { title, category, dates, location, seats, mode, speaker, description } = req.body;
    if (!title || !category || !dates || !location) {
      return res.status(400).json({ error: 'Title, category, dates, and location are required.' });
    }
    const workshops = readJson('upcoming_workshops.json');
    const newWorkshop = {
      id: `WS-${Date.now()}`,
      title: title.trim(),
      category: category.trim(),
      dates: dates.trim(),
      location: location.trim(),
      seats: parseInt(seats, 10) || 100,
      registered: 0,
      mode: mode || 'Offline',
      speaker: speaker ? speaker.trim() : 'IncuxAI Technical Mentor',
      description: description ? description.trim() : 'Comprehensive hands-on workshop track.',
      status: 'Active',
      postedAt: new Date().toISOString()
    };
    workshops.unshift(newWorkshop);
    writeJson('upcoming_workshops.json', workshops);
    res.status(201).json({
      success: true,
      message: 'Workshop posted successfully!',
      workshop: newWorkshop
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to post workshop.' });
  }
});

// Admin deletes a workshop
app.delete('/api/workshops/:id', (req, res) => {
  try {
    const { id } = req.params;
    let workshops = readJson('upcoming_workshops.json');
    const beforeCount = workshops.length;
    workshops = workshops.filter(w => w.id !== id);
    if (workshops.length === beforeCount) {
      return res.status(404).json({ error: 'Workshop not found.' });
    }
    writeJson('upcoming_workshops.json', workshops);
    res.json({ success: true, message: 'Workshop removed.' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete workshop.' });
  }
});

// ==========================================
// 4. CANDIDATE WORKSHOP REGISTRATION
// ==========================================
app.post('/api/workshops/:id/register', (req, res) => {
  try {
    const { id } = req.params;
    const { candidateName, candidateEmail, candidateInstitution, candidatePhone } = req.body;
    if (!candidateName || !candidateEmail) {
      return res.status(400).json({ error: 'Candidate name and email are required.' });
    }
    const workshops = readJson('upcoming_workshops.json');
    const workshop = workshops.find(w => w.id === id);
    if (!workshop) {
      return res.status(404).json({ error: 'Workshop not found.' });
    }
    if (workshop.registered >= workshop.seats) {
      return res.status(400).json({ error: 'Sorry, this workshop is already at full capacity!' });
    }
    const registrations = readJson('registrations.json');
    // Check if already registered
    const alreadyRegistered = registrations.some(
      r => r.workshopId === id && r.candidateEmail.toLowerCase() === candidateEmail.trim().toLowerCase()
    );
    if (alreadyRegistered) {
      return res.status(409).json({ error: 'You are already registered for this workshop!' });
    }
    const newReg = {
      id: `REG-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      workshopId: id,
      workshopTitle: workshop.title,
      workshopCategory: workshop.category,
      workshopDates: workshop.dates,
      workshopLocation: workshop.location,
      workshopMode: workshop.mode,
      candidateName: candidateName.trim(),
      candidateEmail: candidateEmail.trim().toLowerCase(),
      candidateInstitution: candidateInstitution ? candidateInstitution.trim() : 'Not provided',
      candidatePhone: candidatePhone ? candidatePhone.trim() : 'Not provided',
      registeredAt: new Date().toISOString(),
      status: 'Confirmed'
    };
    registrations.unshift(newReg);
    writeJson('registrations.json', registrations);

    // Increment workshop attendance counter
    workshop.registered = (workshop.registered || 0) + 1;
    writeJson('upcoming_workshops.json', workshops);

    res.status(201).json({
      success: true,
      message: `Registration confirmed for "${workshop.title}"!`,
      registration: newReg
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to register for workshop.' });
  }
});

// Candidate view their registered workshops
app.get('/api/candidates/:email/registrations', (req, res) => {
  try {
    const email = req.params.email.toLowerCase().trim();
    const registrations = readJson('registrations.json');
    const userRegs = registrations.filter(r => r.candidateEmail === email);
    res.json({ success: true, count: userRegs.length, registrations: userRegs });
  } catch (err) {
    res.status(500).json({ error: 'Failed to get registrations.' });
  }
});

// ==========================================
// 5. COLLABORATION / CUSTOM WORKSHOP REQUESTS
// ==========================================
// Candidate or Institution asks admin to conduct workshop at their location with requirements
app.post('/api/collaboration-requests', (req, res) => {
  try {
    const {
      requestedBy,
      email,
      phone,
      institution,
      preferredLocation,
      topic,
      targetAudience,
      estimatedStudents,
      preferredDates,
      specialRequirements
    } = req.body;

    if (!requestedBy || !email || !institution || !preferredLocation || !topic) {
      return res.status(400).json({
        error: 'Requester name, email, institution, location, and topic requirements are required.'
      });
    }

    const requests = readJson('custom_requests.json');
    const newRequest = {
      id: `REQ-${Date.now()}`,
      requestedBy: requestedBy.trim(),
      email: email.trim().toLowerCase(),
      phone: phone ? phone.trim() : '',
      institution: institution.trim(),
      preferredLocation: preferredLocation.trim(),
      topic: topic.trim(),
      targetAudience: targetAudience ? targetAudience.trim() : 'Undergraduate & Graduate Engineers',
      estimatedStudents: parseInt(estimatedStudents, 10) || 100,
      preferredDates: preferredDates ? preferredDates.trim() : 'Flexible / TBD',
      specialRequirements: specialRequirements ? specialRequirements.trim() : '',
      status: 'Pending',
      submittedAt: new Date().toISOString()
    };

    requests.unshift(newRequest);
    writeJson('custom_requests.json', requests);

    res.status(201).json({
      success: true,
      message: 'Collaboration request submitted successfully! IncuxAI Admin will review your location and requirements.',
      request: newRequest
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to submit collaboration request.' });
  }
});

// Admin view all custom location requests
app.get('/api/collaboration-requests', (req, res) => {
  try {
    const requests = readJson('custom_requests.json');
    res.json({ success: true, count: requests.length, requests });
  } catch (err) {
    res.status(500).json({ error: 'Failed to load collaboration requests.' });
  }
});

// Admin approves a request -> Automatically converts to a posted workshop that candidates can see and register for!
app.post('/api/collaboration-requests/:id/approve', (req, res) => {
  try {
    const { id } = req.params;
    const requests = readJson('custom_requests.json');
    const requestItem = requests.find(r => r.id === id);

    if (!requestItem) {
      return res.status(404).json({ error: 'Request not found.' });
    }

    // Mark request as Approved
    requestItem.status = 'Approved & Published';
    requestItem.approvedAt = new Date().toISOString();
    writeJson('custom_requests.json', requests);

    // Create the new active workshop
    const workshops = readJson('upcoming_workshops.json');
    const newWorkshop = {
      id: `WS-${Date.now()}`,
      title: `${requestItem.topic} @ ${requestItem.institution}`,
      category: requestItem.topic.includes('AI') ? 'Agentic & Generative AI' : 'Campus Immersion',
      dates: requestItem.preferredDates || 'Upcoming Cohort',
      location: requestItem.preferredLocation,
      seats: requestItem.estimatedStudents || 120,
      registered: 0,
      mode: 'Offline',
      speaker: 'IncuxAI Senior Practitioner Lead',
      description: requestItem.specialRequirements || `Specially architected for ${requestItem.targetAudience} at ${requestItem.institution}.`,
      status: 'Active',
      postedAt: new Date().toISOString(),
      convertedFromRequestId: requestItem.id
    };

    workshops.unshift(newWorkshop);
    writeJson('upcoming_workshops.json', workshops);

    res.json({
      success: true,
      message: `Request approved! Workshop "${newWorkshop.title}" is now published and open for candidate registrations.`,
      workshop: newWorkshop,
      request: requestItem
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to approve request.' });
  }
});

// Admin view all registrations
app.get('/api/registrations', (req, res) => {
  try {
    const registrations = readJson('registrations.json');
    res.json({ success: true, count: registrations.length, registrations });
  } catch (err) {
    res.status(500).json({ error: 'Failed to load registrations.' });
  }
});

// Start server
const server = app.listen(PORT, () => {
  console.log(`[IncuxAI Backend] Server listening at http://localhost:${PORT}`);
  console.log(`[IncuxAI Backend] Health check: http://localhost:${PORT}/api/health`);
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`[IncuxAI Backend] Port ${PORT} is currently in use. Stop the existing process or set PORT in the environment.`);
  } else {
    console.error('[IncuxAI Backend] Server error:', err);
  }
});
