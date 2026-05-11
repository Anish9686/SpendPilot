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

## Architecture Philosophy: "Simulation First"

To deliver a high-quality SaaS MVP without backend complexity, SpendPilot uses a **Simulation First** architecture:
- **Rule-Based Engine**: Replaces expensive LLM calls with deterministic financial logic for instant, reliable recommendations.
- **LocalStorage as DB**: Simulates a persistence layer, allowing reports to be saved, retrieved, and "shared" (locally).
- **Dynamic Routing**: Uses URL parameters to create a professional application flow.

---

## Current Structure

```bash
src/
 ├── components/  # Atomic UI and complex form components
 ├── layouts/     # Shared page wrappers (Navbar/Footer)
 ├── lib/         # Business logic (Audit Engine, Pricing data)
 ├── pages/       # Route-level view components
 └── ui/          # shadcn/ui primitives
```

---

## Future Roadmap (Production Ready)

- **Supabase Migration**: Replace LocalStorage with a real-time database.
- **OAuth Integration**: Connect directly to Stripe/Quickbooks for automated audits.
- **Real LLM Integration**: Use Anthropic/OpenAI for behavioral analysis of usage logs.
- **Team Dashboards**: Multi-user workspaces and organizational hierarchies.