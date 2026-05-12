# ARCHITECTURE

## Overview

SpendPilot is a lightweight AI Spend Audit platform designed to help startups identify unnecessary spending across AI subscriptions and developer tooling.

The architecture prioritizes:
- simplicity
- scalability
- fast iteration
- clean deployment
- beginner-friendly maintainability

---

# Frontend Stack

- React + Vite
- JavaScript
- Tailwind CSS
- shadcn/ui
- React Router DOM

## Why This Stack?

React + Vite was chosen because:
- fast development experience
- minimal configuration
- optimized build performance
- easier debugging and learning curve

Tailwind CSS and shadcn/ui were selected to rapidly build a clean SaaS-style UI while maintaining consistency and responsiveness.

---

# Backend (Active)

The backend uses **Supabase** for:

- **Audit Persistence**: storing generated audit reports
- **Shareable Report URLs**: enabling report retrieval through dynamic routes
- **Cross-Device Accessibility**: ensuring reports remain accessible after refreshes or browser changes

## Why Supabase?

Supabase was selected because:
- simple PostgreSQL-based setup
- fast frontend integration
- lightweight SDK
- ideal balance between MVP speed and SaaS realism

The implementation intentionally avoids unnecessary backend complexity while still providing real persistence functionality.

---

# Planned Data Flow

```text
User Input
   ↓
Audit Form
   ↓
Validation Layer
   ↓
Audit Engine Logic
   ↓
Savings Calculation
   ↓
Recommendation Engine
   ↓
Store Audit in Supabase
   ↓
Generate Dynamic Report URL
```

---

# Architecture Philosophy: "Simulation First"

To deliver a high-quality SaaS MVP within a constrained timeline, SpendPilot uses a **Simulation First** architecture.

Instead of relying on expensive AI APIs or complex backend systems, the application uses deterministic financial logic powered by benchmark pricing data.

This approach provides:
- instant report generation
- predictable outputs
- reliable UX
- faster iteration
- deployment stability

---

# Hybrid Persistence Strategy

SpendPilot uses a hybrid persistence architecture:

- **Supabase** acts as the primary persistence layer for globally accessible audit reports.
- **localStorage** acts as a lightweight fallback cache to improve resilience during refreshes or temporary network interruptions.

This strategy balances SaaS realism with MVP simplicity.

---

# Audit Engine Logic (`src/lib/auditEngine.js`)

The audit engine is a lightweight rule-based recommendation system designed to simulate realistic SaaS financial optimization workflows.

The engine applies five primary optimization rules:

## 1. Benchmark Audit
Compares submitted pricing against estimated retail benchmarks to detect overpayment or legacy billing tiers.

## 2. Tier Optimization
Flags unnecessary enterprise/team plans for very small teams.

## 3. Redundancy Sweep
Detects overlapping general-purpose LLM tools (e.g. ChatGPT + Claude).

## 4. Use-Case Mapping
Identifies opportunities to reduce spending on broad AI tooling when specialized tools already satisfy the primary workflow.

## 5. Headcount Analysis
Flags potential unused or excessive license allocations based on submitted team size and seat counts.

---

# Deployment

The application is deployed on **Vercel** using SPA rewrite handling configured through `vercel.json`.

This ensures React Router dynamic routes such as:

```bash
/report/:id
```

work correctly in production environments, including browser refresh behavior.

---

# Current Structure

```bash
src/
 ├── assets/
 ├── components/
 │    └── ui/
 ├── layouts/
 ├── lib/
 │    ├── auditEngine.js
 │    ├── pricing.js
 │    ├── schema.js
 │    └── supabase.js
 ├── pages/
 │    ├── LandingPage.jsx
 │    ├── AuditPage.jsx
 │    ├── AuditReportPage.jsx
 │    └── DocsPage.jsx
 ├── App.jsx
 └── main.jsx
```

---

# Engineering Priorities

Throughout development, the project intentionally prioritized:

- believable business logic
- product polish
- responsive UX
- deployment stability
- maintainable frontend architecture
- MVP execution speed

over unnecessary enterprise-level abstractions.

---

# Future Roadmap

## Planned Production Improvements

- Authentication and organization accounts
- Team collaboration workflows
- Automated invoice ingestion
- Real billing analytics integrations
- AI-assisted recommendation tuning
- Multi-report dashboards
- Email-based report delivery
- Full analytics infrastructure

---

# Final Notes

SpendPilot was designed as a realistic startup-style MVP rather than a feature-heavy prototype.

The architecture intentionally balances:
- speed
- maintainability
- realism
- UX quality
- engineering simplicity

to demonstrate practical product-focused frontend engineering within a limited execution timeline.