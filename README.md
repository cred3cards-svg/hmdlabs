# HMD Labs – West Bengal

> **Fully NABL Accredited · 24×7 Operations · West Bengal's Most Trusted Diagnostic Laboratory**

Production-grade web application for HMD Labs, a NABL-accredited diagnostic laboratory chain serving all 23 districts of West Bengal. Built with Next.js 14 App Router, TypeScript, Tailwind CSS, Prisma ORM, and PostgreSQL.

---

## Table of Contents

1. [Tech Stack](#tech-stack)
2. [Quick Start](#quick-start)
3. [Environment Variables](#environment-variables)
4. [Database Setup](#database-setup)
5. [Project Structure](#project-structure)
6. [Modules & Pages](#modules--pages)
7. [Franchise Module (Flagship)](#franchise-module-flagship)
8. [API Routes](#api-routes)
9. [Prisma Schema Overview](#prisma-schema-overview)
10. [West Bengal Coverage](#west-bengal-coverage)
11. [Deployment](#deployment)
12. [Development Commands](#development-commands)
13. [Phase 2 Roadmap](#phase-2-roadmap)

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript 5.4 |
| Styling | Tailwind CSS 3.4 |
| ORM | Prisma 5.10 |
| Database | PostgreSQL 15+ |
| Auth | NextAuth.js 4.x + Prisma Adapter |
| Forms | React Hook Form + Zod |
| SMS/OTP | Twilio / MSG91 (configurable) |
| Storage | AWS S3 |
| Payments | Razorpay |
| Animation | Framer Motion |
| Icons | Lucide React |

---

## Quick Start

### Prerequisites

- Node.js 18.17+ (LTS recommended)
- npm 9+ or yarn 4+
- PostgreSQL 14+ running locally or hosted (Neon, Supabase, Railway, RDS)
- Git

### 1. Clone the repository

```bash
git clone https://github.com/your-org/hmd-labs.git
cd hmd-labs
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

```bash
cp .env.example .env.local
```

Edit `.env.local` and fill in at minimum:

```env
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/hmd_labs?schema=public"
NEXTAUTH_SECRET="generate-with-openssl-rand-base64-32"
NEXTAUTH_URL="http://localhost:3000"
```

See [Environment Variables](#environment-variables) for full list.

### 4. Set up the database

```bash
# Push schema to database (development)
npm run db:push

# OR run migrations (recommended for production/CI)
npm run db:migrate

# Generate Prisma client
npm run db:generate

# Optional: seed with demo data
npm run db:seed
```

### 5. Start development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Environment Variables

Copy `.env.example` to `.env.local` and configure:

| Variable | Required | Description |
|---|---|---|
| `DATABASE_URL` | ✅ | PostgreSQL connection string |
| `NEXTAUTH_SECRET` | ✅ | 32+ char random secret |
| `NEXTAUTH_URL` | ✅ | App base URL |
| `TWILIO_ACCOUNT_SID` | For OTP | Twilio Account SID |
| `TWILIO_AUTH_TOKEN` | For OTP | Twilio Auth Token |
| `MSG91_AUTH_KEY` | Alt OTP | MSG91 API key (India-recommended) |
| `AWS_ACCESS_KEY_ID` | For uploads | AWS credentials |
| `AWS_SECRET_ACCESS_KEY` | For uploads | AWS secret |
| `AWS_S3_BUCKET_REPORTS` | For reports | S3 bucket for report PDFs |
| `RAZORPAY_KEY_ID` | For payments | Razorpay Key ID |
| `RAZORPAY_KEY_SECRET` | For payments | Razorpay secret |
| `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` | Lab locator | Google Maps JS API key |
| `CRM_SLACK_WEBHOOK_URL` | Optional | Franchise lead notifications |

See `.env.example` for full documentation.

---

## Database Setup

### Local Docker (recommended for development)

```bash
# Start PostgreSQL with Docker
docker run --name hmdlabs-pg \
  -e POSTGRES_USER=hmdlabs \
  -e POSTGRES_PASSWORD=hmdlabs \
  -e POSTGRES_DB=hmd_labs \
  -p 5432:5432 \
  -d postgres:15-alpine

# DATABASE_URL: postgresql://hmdlabs:hmdlabs@localhost:5432/hmd_labs
```

### Cloud Options

- **[Neon](https://neon.tech)** — Serverless PostgreSQL, generous free tier
- **[Supabase](https://supabase.com)** — PostgreSQL with dashboard, free tier
- **[Railway](https://railway.app)** — Simple deployment + PostgreSQL
- **AWS RDS** — Production-grade managed PostgreSQL

### Migrations

```bash
# Development: push schema changes directly
npm run db:push

# Create a named migration
npm run db:migrate -- --name init

# Deploy migrations in CI/production
npx prisma migrate deploy

# Reset database (⚠️ destroys all data)
npx prisma migrate reset
```

---

## Project Structure

```
hmd-labs/
├── prisma/
│   ├── schema.prisma          # Full DB schema (23 models, 15 enums)
│   └── seed.ts                # Demo seed data
├── public/
│   └── brochure/              # Franchise brochure PDFs
├── src/
│   ├── app/
│   │   ├── layout.tsx         # Root layout (fonts, metadata, toaster)
│   │   ├── globals.css        # Tailwind + custom component classes
│   │   ├── (public)/          # Route group - public-facing pages
│   │   │   ├── layout.tsx     # Header + AnnouncementBar + Footer
│   │   │   ├── page.tsx       # Homepage
│   │   │   ├── book-test/
│   │   │   ├── health-packages/
│   │   │   ├── upload-prescription/
│   │   │   ├── download-report/
│   │   │   ├── track-sample/
│   │   │   ├── lab-locator/
│   │   │   ├── partner-with-us/   # Franchise flagship
│   │   │   ├── doctors-clinics/
│   │   │   ├── company/
│   │   │   ├── knowledge-hub/
│   │   │   └── contact/
│   │   └── api/
│   │       ├── reports/
│   │       │   ├── request-otp/route.ts
│   │       │   └── verify-and-fetch/route.ts
│   │       ├── franchise/
│   │       │   ├── apply/route.ts
│   │       │   └── brochure-otp/route.ts
│   │       ├── orders/route.ts
│   │       ├── tests/route.ts
│   │       ├── labs/route.ts
│   │       ├── doctors/register/route.ts
│   │       └── prescriptions/upload/route.ts
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx         # Sticky nav with trust badges
│   │   │   ├── Footer.tsx         # Full footer with WB districts
│   │   │   └── AnnouncementBar.tsx
│   │   ├── sections/              # Homepage sections
│   │   │   ├── HeroSection.tsx
│   │   │   ├── TrustSection.tsx
│   │   │   ├── PopularTestsSection.tsx
│   │   │   ├── HealthPackagesSection.tsx
│   │   │   ├── HowItWorksSection.tsx
│   │   │   ├── WBCoverageSection.tsx
│   │   │   ├── FranchiseCTASection.tsx
│   │   │   ├── TestimonialsSection.tsx
│   │   │   └── KnowledgeHubPreview.tsx
│   │   └── modules/
│   │       └── franchise/
│   │           ├── FranchiseHero.tsx
│   │           ├── FranchiseTypes.tsx
│   │           ├── FranchiseProcess.tsx
│   │           ├── FranchiseApplicationForm.tsx  # 4-step form + lead scoring
│   │           └── FranchiseBrochureGate.tsx     # OTP-gated download
│   └── lib/
│       ├── utils.ts           # Helpers, WB_DISTRICTS, lead scoring
│       └── prisma.ts          # Prisma client singleton
```

---

## Modules & Pages

| Module | URL | Key Features |
|---|---|---|
| **Homepage** | `/` | Hero, trust badges, popular tests, WB coverage, franchise CTA |
| **Book Test** | `/book-test` | 800+ tests, filter by category/price/type, home collection |
| **Health Packages** | `/health-packages` | Curated packages (Full Body, Cardiac, Diabetic, etc.) |
| **Upload Prescription** | `/upload-prescription` | File upload (PDF/JPG/PNG), doctor notes, auto test detection |
| **Download Report** | `/download-report` | OTP-secured report access, multi-report download |
| **Track Sample** | `/track-sample` | Live timeline: Booked → Collected → Lab → Report |
| **Lab Locator** | `/lab-locator` | Map view, filter by WB district, 24×7/NABL filter |
| **Partner With Us** | `/partner-with-us` | 🏆 Franchise flagship (see below) |
| **Doctors & Clinics** | `/doctors-clinics` | Doctor tie-up form, referral commission info |
| **Company** | `/company` | About, NABL cert, team, CSR |
| **Knowledge Hub** | `/knowledge-hub` | Health articles, test guides, disease info |
| **Contact** | `/contact` | Multi-channel contact, 24×7 support info |

---

## Franchise Module (Flagship)

The franchise module is designed to be the strongest lead-generation tool on the platform.

### Features

**1. Multi-Step Application Form** (`/partner-with-us`)
- Step 1: Personal information (name, phone, email)
- Step 2: Business intent (franchise type, district, investment, space)
- Step 3: Background (occupation, experience, current address)
- Step 4: Declaration & terms acceptance
- Full Zod validation at each step
- Progress indicator with step completion state

**2. Lead Scoring Algorithm** (`src/lib/utils.ts → calculateFranchiseLeadScore`)
```
Investment Capacity:  0-30 pts  (≥50L → 30, ≥20L → 20, ≥5L → 10)
Existing Space:       0-20 pts  (Has space → 20)
Business Experience:  0-25 pts  (≥10yr → 25, ≥5yr → 15, ≥2yr → 8)
Franchise Type:       0-25 pts  (Full Lab → 25, Mini Lab → 18, CC → 12)
─────────────────────────────
Total:                0-100 pts → HOT (≥65) | WARM (≥35) | COLD (<35)
```

**3. CRM-Ready Schema** (`prisma/schema.prisma → FranchiseLead`)
- Full lead lifecycle: NEW → CONTACTED → DEMO → PROPOSAL → AGREEMENT → LIVE
- Activity log table (`FranchiseActivity`)
- UTM parameter capture
- Assigned staff tracking
- Follow-up scheduling
- Brochure download tracking

**4. OTP-Gated Brochure** (`FranchiseBrochureGate` component)
- Mobile OTP required before brochure download
- Lead captured before gate
- Download tracked per lead

**5. Phase 2: Partner Portal** (stub at `/partner-portal`)
- Franchisee dashboard
- Daily order stats
- Revenue tracking
- Payout history

### Franchise Types

| Type | Investment | Revenue Potential |
|---|---|---|
| Collection Center | ₹3–8L | ₹3–5L/month |
| Mini Lab | ₹15–30L | ₹6–8L/month |
| Full Lab | ₹40–80L | ₹10–12L/month |
| Mobile Unit | ₹8–15L | ₹3–4L/month |

---

## API Routes

All routes are under `/src/app/api/`:

| Route | Method | Purpose |
|---|---|---|
| `/api/reports/request-otp` | POST | Send OTP for report download |
| `/api/reports/verify-and-fetch` | POST | Verify OTP, return report list |
| `/api/franchise/apply` | POST | Submit franchise application + lead scoring |
| `/api/franchise/brochure-otp` | POST | OTP gate for brochure download |
| `/api/orders` | POST | Create a new test/package order |
| `/api/tests` | GET | Search/list tests with filters |
| `/api/labs` | GET | List labs by WB district |
| `/api/doctors/register` | POST | Doctor/clinic registration |
| `/api/prescriptions/upload` | POST | Upload prescription file |

All production routes should be protected by NextAuth middleware for authenticated endpoints.

---

## Prisma Schema Overview

```
Users ──────────── Orders ──────── OrderItems ─── Tests
  │                  │                          └── Packages
  ├── FamilyMembers  ├── SampleTrackingEvents
  ├── OTPTokens      ├── Reports
  └── Prescriptions  └── Prescription

Labs ────────────── Orders
  └── FranchiseLeads ── FranchiseActivities

FranchiseLead (CRM)     DoctorLead        CorporateLead
KnowledgeHubArticle     Testimonial       Banner
ContactInquiry
```

**Key Enums:**
- `WBDistrict` — All 23 West Bengal districts
- `FranchiseLeadStatus` — Full CRM pipeline (NEW → LIVE)
- `FranchiseLeadScore` — HOT / WARM / COLD
- `SampleTrackingStatus` — 9-stage tracking pipeline
- `OrderStatus` — Full order lifecycle

---

## West Bengal Coverage

The application is specifically built for West Bengal:
- All 23 districts listed in `WBDistrict` enum and `WB_DISTRICTS` constant
- District selector in hero, lab locator, franchise form, booking
- SEO metadata with WB-specific keywords
- Footer links to district-specific lab pages
- Phone/address uses Kolkata/WB conventions

Districts covered:
Alipurduar · Bankura · Birbhum · Cooch Behar · Dakshin Dinajpur · Darjeeling · Hooghly · Howrah · Jalpaiguri · Jhargram · Kalimpong · Kolkata · Malda · Murshidabad · Nadia · North 24 Parganas · Paschim Bardhaman · Paschim Medinipur · Purba Bardhaman · Purba Medinipur · Purulia · South 24 Parganas · Uttar Dinajpur

---

## Deployment

### Production (Vercel — recommended)

```bash
# 1. Push to GitHub
git push origin main

# 2. Import in Vercel dashboard
# 3. Add all environment variables from .env.example
# 4. Set DATABASE_URL to production PostgreSQL

# 5. Run DB migrations before deploying
npx prisma migrate deploy
```

### Environment-specific builds

```bash
# Production build locally
npm run build
npm run start

# Analyze bundle size
npx @next/bundle-analyzer
```

### Docker (optional)

```dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npx prisma generate
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV production
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public
EXPOSE 3000
CMD ["node", "server.js"]
```

---

## Development Commands

```bash
# Start dev server
npm run dev

# Type check
npx tsc --noEmit

# Lint
npm run lint

# Format code
npm run format

# Database commands
npm run db:generate    # Generate Prisma client after schema changes
npm run db:push        # Push schema to DB (dev only, no migration file)
npm run db:migrate     # Create + run migration
npm run db:seed        # Seed demo data
npm run db:studio      # Open Prisma Studio (visual DB browser)

# Build
npm run build
npm run start
```

---

## Phase 2 Roadmap

- [ ] **Partner Portal** — franchisee dashboard with order stats, revenue, payouts
- [ ] **Patient Portal** — profile, order history, family members, report vault
- [ ] **Admin Dashboard** — CRM, lead management, order ops, lab staff tools
- [ ] **Razorpay Integration** — full payment flow with webhooks
- [ ] **SMS/WhatsApp Automation** — booking confirmations, report alerts, reminders
- [ ] **Real-time Sample Tracking** — WebSocket/SSE for live updates
- [ ] **Google Maps Integration** — visual lab locator with route to nearest center
- [ ] **Corporate Portal** — bulk booking, employee health reports, billing
- [ ] **Mobile App** — React Native (share API layer)
- [ ] **AI Symptom Checker** — "Which test should I take?" guide
- [ ] **Report Analytics** — trend analysis over multiple reports

---

## Trust & Compliance

- **NABL Accreditation** — ISO 15189:2022 certified. Badge displayed on header, footer, and all relevant pages.
- **24×7 Operations** — prominently communicated throughout the app.
- **OTP Security** — reports and brochures are gated behind mobile OTP verification.
- **Data Security** — HTTPS enforced, security headers set in `next.config.js`, passwords hashed with bcrypt, no plaintext sensitive data.
- **DPDP Compliance** — privacy policy, data deletion on request (implement in Phase 2).

---

## Support

- **Website Support**: support@hmdlabs.in
- **Phone**: 033-1234-5678 (24×7)
- **Corporate**: corporate@hmdlabs.in
- **Franchise**: franchise@hmdlabs.in

---

*HMD Labs – Serving West Bengal with precision diagnostics, round the clock.*
