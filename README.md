# QLLEX Technologies — Modern IT Services & Software Engineering Platform

> **Tagline:** *Build Smarter. Scale Faster.*  
> **Visual Theme:** Charcoal Black (`#333333`), Warm Cream (`#FCF1D0`), Pure White (`#FFFFFF`), Light Grey (`#F5F5F3`), and Accent Pastels (`#DCE7FF`, `#C6E7D7`, `#F1DDF5`)  
> **Architecture:** Modular TypeScript Monorepo (`apps/web`, `apps/api`, `packages/shared`)  
> **Brand & Configuration:** Centralized single source of truth in [`packages/shared/src/brand.ts`](packages/shared/src/brand.ts)  
> **Official Contact:** Phone / WhatsApp: `+91 9313188307` | Email: `qllextechnologies@gmail.com`

A clean, minimal, premium IT services company website with a production-grade REST backend, MongoDB persistence via Mongoose, automated Email and WhatsApp notifications on enquiry submission, and a secure private admin enquiry management dashboard.

---

## 1. Project Architecture

The repository is structured as a type-safe TypeScript monorepo using npm workspaces:

```
├── apps/
│   ├── api/          # Express REST API, MongoDB/Mongoose, JWT auth, Nodemailer & WhatsApp alerts
│   └── web/          # Next.js 14 App Router, Tailwind CSS, GSAP ScrollTrigger
├── packages/
│   └── shared/       # Shared TypeScript types, Zod schemas, and BRAND_CONFIG
└── scripts/          # Playwright E2E browser tests and verification scripts
```

---

## 2. Core Features & Capabilities

### Simple, Premium UI & Design System
- **Color Palette:**
  - Charcoal black: `#333333` (text, navigation, primary buttons, headers)
  - Warm cream: `#FCF1D0` (accents, active pills, highlighted badges)
  - Pure white: `#FFFFFF` and Soft grey `#F5F5F3` (main backgrounds and cards)
  - Soft pastels: `#DCE7FF` (blue), `#C6E7D7` (sage green), `#F1DDF5` (lavender)
- **Minimalist Aesthetic:** Clear headings, generous whitespace, zero visual clutter.
- **Responsive Across All Devices:** Verified with 0px horizontal page overflow across standard viewports (320px–1920px).

### Customer Website Architecture
- **Main Navigation:** `Home | Services | Work | About | Contact` + high-contrast **Start a Project** CTA button.
- **Scroll-Driven Horizontal Portfolio:** Pinned horizontal showcase driven by vertical scroll via GSAP ScrollTrigger on desktop and touch-friendly viewports, with unpinned release into the enquiry form.
- **Customer Enquiry Form:** Type-safe Zod schema validation, real MongoDB persistence, unique Reference IDs, and automated notification alerts.

### Private Admin Control Center (`/admin`)
- Real-time database metrics (Total, New, Contacted, In Progress, Closed).
- Search, filter, status management, internal notes editor, and enquiry management.
- Secure admin credentials management with current password protection.

---

## 3. Local Development

```powershell
# 1. Install dependencies
npm install

# 2. Compile all monorepo workspaces
npm run build

# 3. Start the Express REST API (Port 4000)
npm run start:api

# 4. Start the Next.js Web Server (Port 3000)
npm run start:web
```

- **Frontend Website:** `http://localhost:3000`
- **Admin Dashboard:** `http://localhost:3000/admin`
  - Default Admin Email: `admin@qllex.example.com`
  - Default Admin Password: `ChangeMeInProduction!2026` (Must be overridden in production)
- **API Health Check:** `http://localhost:4000/api/v1/health`

---

## 4. Automated Testing & Verification

```powershell
# Typecheck across all workspaces
npm run typecheck

# Code quality & ESLint audit
npm run lint

# Backend API & platform verification
npm run test:verify

# Playwright browser verification (multi-viewport, form submission, and admin CMS)
npm run test:browser

# Run full test suite
npm run test
```

---

## 5. Deployment Setup

### Environment Variables
Copy `.env.example` to create your local `.env`:
- **Production Secrets:** In production, generate a cryptographically strong 64-character `JWT_SECRET` (`node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`).
- **Database:** Connect your MongoDB Atlas connection string in `MONGODB_URI`.
- **Admin Password:** Set a secure `ADMIN_BOOTSTRAP_PASSWORD`.
- **Notifications:** Configure `SMTP_*` or Meta WhatsApp Cloud API credentials to receive instant enquiry alerts.
