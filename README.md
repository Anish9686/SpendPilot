# SpendPilot

SpendPilot is an AI Spend Audit platform that helps startups and teams identify unnecessary spending across AI tools like ChatGPT, Claude, Cursor, GitHub Copilot, and more.

Users can audit their AI stack, receive optimization recommendations, estimate monthly and annual savings, and generate shareable audit reports.

---

## Features

- AI tool spending audit
- Monthly + annual savings estimation
- Personalized AI-generated summaries
- Shareable public audit reports
- Lead capture for high-savings opportunities
- Responsive startup-style UI

---

## Tech Stack

Frontend:
- React + Vite
- JavaScript
- Tailwind CSS
- shadcn/ui
- React Router

Backend (planned):
- Supabase

Deployment:
- Vercel

AI:
- OpenAI API / Anthropic API

---

## Current Progress

### Completed
- Project setup
- Tailwind configuration
- shadcn/ui setup
- Responsive landing page
- Basic folder architecture
- Dynamic AI Audit Form (React Hook Form + Zod)
- LocalStorage state persistence
- Form array logic for multiple AI tools
- React Router integration for `/audit` page

### In Progress
- Dynamic audit engine
- Savings recommendation logic
- AI summary generation
- Supabase integration

---

## Project Structure

```bash
src/
 ├── components/
 ├── layouts/
 ├── lib/
 ├── pages/
 └── assets/
```

---

## Design Goals

- Clean SaaS-style UI
- Startup-focused product experience
- Minimal and modern interface
- Mobile responsive
- Fast-loading MVP architecture

---

## Deployment

Deployment will be done using Vercel.

---

## Status

Day 2 completed — dynamic AI audit form, validation, and local storage persistence implemented.