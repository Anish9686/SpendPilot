# DEVLOG

## Day 1 — 2026-05-07

**Hours worked:** 5

**What I did:**
- Initialized the project using React + Vite with JavaScript
- Configured Tailwind CSS and shadcn/ui
- Created a scalable folder structure for components, layouts, pages, and utilities
- Built the responsive landing page for SpendPilot
- Added navbar, hero section, feature cards, CTA section, footer, and placeholder audit form
- Focused on creating a clean startup-style SaaS UI inspired by Stripe and Vercel
- Structured the project to support future audit logic, Supabase integration, and public audit routes

**What I learned:**
- How to structure a React project for scalability without overengineering
- Better Tailwind utility usage for responsive layouts and spacing
- Importance of building an MVP foundation before adding complex features
- How modern SaaS landing pages use typography and spacing to improve UX

**Blockers / what I'm stuck on:**
- Deciding the best structure for the audit engine recommendation logic
- Thinking about how to make the AI spending recommendations financially believable without making the logic overly complicated

**Plan for tomorrow:**
- Build the dynamic AI audit form
- Add React Hook Form and Zod validation
- Start implementing audit recommendation logic
- Add localStorage persistence for form data

## Day 2 — 2026-05-08

**Hours worked:** 3

**What I did:**
- Configured `react-hook-form` and `zod` for the dynamic AI audit form.
- Created `src/lib/schema.js` to validate AI tool entries, team size, and usage inputs.
- Built a dynamic `AuditForm` component supporting multiple AI tools (ChatGPT, Claude, Cursor, etc.) using `useFieldArray`.
- Implemented `localStorage` persistence so audit data survives accidental refreshes.
- Created a dedicated `/audit` route and updated navigation flow from the landing page.
- Improved the overall form UX with a cleaner SaaS-style layout and responsive spacing.
- Kept the implementation simple and beginner-friendly without introducing unnecessary state management or backend complexity.

**What I learned:**
- How to manage dynamic form arrays cleanly using React Hook Form.
- Better ways to structure nested form validation with Zod.
- How small UX details can make a form feel much more like a real startup product instead of a basic student project.
- The importance of building scalable form data structures early to simplify future audit calculations.

**Blockers / what I'm stuck on:**
- Designing the audit recommendation logic in a way that feels financially believable without making the implementation overly complicated.
- Thinking about how to structure pricing data for multiple AI tools while keeping the logic maintainable.

**Plan for tomorrow:**
- Build the audit recommendation engine.
- Create pricing data structures for supported AI tools.
- Implement monthly and annual savings calculations.
- Build the audit results page for displaying recommendations and savings insights.

## Day 3 — 2026-05-09

**Hours worked:** 4

**What I did:**
- Created `src/lib/pricing.js` to centralize pricing estimates for supported AI tools like ChatGPT, Claude, Cursor, and GitHub Copilot.
- Built a lightweight audit recommendation engine inside `src/lib/auditEngine.js` using pure JavaScript business logic.
- Implemented savings calculations for:
  - monthly spend
  - projected annual savings
  - potential overpayment detection
- Added recommendation generation for:
  - oversized plans
  - unnecessary spending
  - redundant AI tooling
  - inefficient seat allocation
- Created `AuditReportPage.jsx` to display audit insights in a startup-style SaaS dashboard layout.
- Added summary cards for:
  - total monthly spend
  - estimated monthly savings
  - projected annual savings
- Built recommendation cards with actionable optimization suggestions and realistic financial messaging.
- Added a simulated “Analyzing...” loading state before navigating users from the audit form to the report page.
- Improved CTA routing so primary actions navigate correctly to the audit experience.
- Added a more believable recommendation structure to avoid exaggerated “AI savings” claims.

**What I learned:**
- Structuring pricing and recommendation logic separately makes frontend business logic much easier to maintain.
- Realistic SaaS products rely more on trustworthy UX and believable recommendations than flashy AI terminology.
- Simple deterministic recommendation systems can still feel valuable when paired with strong UI and clean presentation.
- Small UX improvements like loading states and cleaner recommendation wording significantly improve product perception.

**Blockers / what I'm stuck on:**
- Thinking about the cleanest way to support report sharing/exporting later without introducing backend complexity too early.
- Deciding how far to push the recommendation engine while still keeping the MVP simple and believable.

**Plan for tomorrow:**
- Add report sharing/export preparation.
- Improve report persistence and state handling.
- Refine recommendation edge cases and “already optimized” scenarios.
- Perform UI polish and responsiveness testing across pages.