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