# NovaSathi Landing Page — MERN Stack

A **premium, psychologically persuasive, conversion-focused landing page** for [NovaSathi](https://novasathi.com/) — India's spiritual & wellness platform.

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React.js + Vite |
| Styling | Tailwind CSS v3 + Custom CSS |
| Animations | Framer Motion |
| Backend | Node.js + Express.js |
| Database | MongoDB (Mongoose) |

## 📁 Project Structure

```
novasathi-landing/
├── client/          # React + Vite frontend (port 5173)
│   └── src/components/
│       ├── Navbar.jsx
│       ├── Hero.jsx
│       ├── PainPoints.jsx
│       ├── Transformation.jsx
│       ├── Features.jsx
│       ├── Benefits.jsx
│       ├── HowItWorks.jsx
│       ├── WhyNovaSathi.jsx
│       ├── SocialProof.jsx
│       ├── ProductShowcase.jsx
│       ├── Pricing.jsx
│       ├── Objections.jsx
│       ├── FAQ.jsx
│       ├── FinalCTA.jsx
│       ├── ContactForm.jsx
│       ├── Footer.jsx
│       └── WhatsAppButton.jsx
└── server/          # Express backend (port 5001)
    ├── models/      # MongoDB schemas
    ├── routes/      # API routes
    └── config/      # DB connection
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- MongoDB (local or Atlas)

### Setup

1. **Clone & Install**
```bash
# Install client dependencies
cd client && npm install

# Install server dependencies
cd ../server && npm install
```

2. **Configure Server**
Edit `server/.env`:
```
MONGODB_URI=mongodb://localhost:27017/novasathi
PORT=5001
CLIENT_URL=http://localhost:5173
```

3. **Run Development Servers**
```bash
# Terminal 1 — Backend
cd server && npm run dev

# Terminal 2 — Frontend
cd client && npm run dev
```

Or use the startup script:
```bash
chmod +x start-dev.sh && ./start-dev.sh
```

4. **Open** http://localhost:5173

## 🔌 API Endpoints

| Method | Route | Description |
|---|---|---|
| POST | `/api/contact` | Submit contact/lead form |
| GET | `/api/contact` | List all leads (admin) |
| GET | `/api/testimonials` | Fetch testimonials |
| GET | `/api/faqs` | Fetch FAQs |
| GET | `/api/plans` | Fetch pricing plans |
| GET | `/api/health` | Health check |

## 🎨 Design System

- **Background**: Deep space navy (`#05060f`)
- **Primary**: Cosmic violet (`#8b5cf6`)
- **Accent**: Divine gold (`#f59e0b`)
- **Font**: Inter (main) + Cinzel (display)
- **Style**: Glassmorphism + Cosmic aesthetic

## 📱 Features

- ✅ 17 conversion-optimized sections
- ✅ Mobile-first responsive design
- ✅ Framer Motion animations
- ✅ Floating WhatsApp button
- ✅ FAQ accordion (loads from MongoDB)
- ✅ Contact form → saves to MongoDB
- ✅ Dynamic testimonials/plans from API
- ✅ Full SEO meta tags + OG tags
- ✅ Smooth scroll navigation
- ✅ Sticky compact navbar
