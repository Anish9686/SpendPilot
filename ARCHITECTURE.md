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

## Frontend Stack

- React + Vite
- JavaScript
- Tailwind CSS
- shadcn/ui
- React Router

### Why This Stack?

React + Vite was chosen because:
- fast development experience
- minimal configuration
- optimized build performance
- easier debugging and learning curve

Tailwind CSS and shadcn/ui were selected to rapidly build a clean SaaS-style UI while maintaining consistency and responsiveness.

---

## Planned Backend

The backend will use Supabase for:
- audit storage
- lead capture
- public audit sharing

Supabase was chosen because:
- simple setup
- PostgreSQL support
- fast integration with React
- serverless-friendly architecture

---

## Planned Data Flow

```text
User Input
   ↓
Audit Form
   ↓
Audit Engine Logic
   ↓
Savings Calculation
   ↓
AI Summary Generation
   ↓
Store Audit in Supabase
   ↓
Generate Public Audit URL
```

---

## Current Structure

```bash
src/
 ├── components/
 ├── layouts/
 ├── lib/
 ├── pages/
 └── assets/
```

---

## Future Improvements

- Dynamic audit engine
- AI-generated recommendations
- Shareable reports
- Automated pricing optimization
- Unit testing for audit logic