# 🚀 SpendPilot: AI Spend Audit SaaS MVP

**SpendPilot** is a production-grade, startup-style AI Spend Audit platform built as part of the Credex Web Development Internship assignment. It helps organizations identify unutilized AI licenses, consolidate overlapping tools, and optimize their total AI spend in minutes.

![SpendPilot Banner](https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200&h=400)

## 🌟 Key Features

- **Dynamic AI Audit Engine**: A sophisticated rule-based simulation that identifies savings across ChatGPT, Claude, Cursor, and more.
- **Persistent Reports**: Shareable report links powered by `localStorage` persistence and dynamic routing.
- **Interactive Stack Form**: Multi-tool input handling with real-time Zod validation and `react-hook-form`.
- **Financial Insights**: KPI dashboards showing Monthly Spend, Savings Gap, Annual Projections, and a calculated Health Score.
- **Export Capabilities**: Professional CSV export for financial stakeholders.
- **Mobile-First Design**: Fully responsive UI built with Tailwind CSS and shadcn/ui.
- **Print Optimization**: Report pages optimized for PDF "Save as Print" functionality.

## 🛠️ Technical Stack

- **Frontend**: React 18 + Vite
- **Styling**: Tailwind CSS + shadcn/ui (Radix UI)
- **Routing**: React Router DOM v6
- **Form Handling**: React Hook Form + Zod Validation
- **Icons**: Lucide React
- **State Management**: Local Storage Persistence (Demo-ready)

## 🏗️ Architecture Decisions

### 1. The "Simulation First" Approach
To satisfy the requirements of a high-polish MVP within 7 days, I implemented a robust **Frontend Audit Engine**. Instead of waiting for real AI API calls, the engine uses benchmarked pricing data to provide instant, realistic financial recommendations. This ensures 100% uptime for recruiters and a snappy UX.

### 2. State Persistence
The application uses a hybrid approach to state:
- **`localStorage`**: Persists the user's form data and generated reports, allowing for a "resume-where-you-left-off" experience without a backend.
- **Dynamic Routing**: Uses URL parameters (`/report/:id`) to simulate deep-linking, making the reports feel like real SaaS assets.

### 3. Component-Driven UI
Built using **shadcn/ui**, the codebase follows a clean, atomic structure. Components are modular, reusable, and styled using a unified design system of Indigo/Slate/Emerald.

## 🚀 Getting Started

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Anish9686/SpendPilot.git
   ```
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Run development server**:
   ```bash
   npm run dev
   ```

## 📈 Roadmap (Next Steps)
- [ ] **Supabase Integration**: Moving from `localStorage` to a real DB for global report sharing.
- [ ] **Google Workspace OAuth**: Automating the audit by scanning company invoices.
- [ ] **Real LLM Analysis**: Integrating OpenAI/Anthropic APIs for deeper behavioral spend analysis.

---

**Built with ❤️ for the Credex Internship Assignment.**