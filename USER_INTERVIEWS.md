```md id="77nr9q"
# 👥 User Research & Interview Insights

To make SpendPilot feel like a realistic startup MVP, the product direction was guided by lightweight simulated user research sessions representing common startup roles.

The goal of this research was not formal enterprise validation, but rather understanding:
- operational pain points
- AI subscription behavior
- purchasing friction
- optimization expectations

The findings directly influenced:
- recommendation logic
- report structure
- onboarding flow
- product positioning
- UX priorities

---

# 1. Simulated Research Participants

The simulated interviews represented common early-stage startup profiles:

| Role | Company Type | Team Size |
| :--- | :--- | :--- |
| Founder | SaaS Startup | 2–5 employees |
| Engineering Lead | FinTech Startup | 20–50 employees |
| Operations Manager | AI Startup | 15–40 employees |
| Product Designer | Remote Startup | 5–10 employees |
| Fractional CFO | Multi-startup Consultant | Various |

The conversations focused on:
- AI subscription management
- operational visibility
- purchasing behavior
- optimization workflows

---

# 2. Key Pain Points Identified

## “The Hidden Subscription Tax”

Founders frequently mentioned:
- forgotten subscriptions
- overlapping AI tools
- unused seats
- ex-employee accounts still being billed

Many startups lacked a centralized view of AI spending.

### Product Impact
This insight directly influenced:
- benchmark pricing logic
- seat analysis rules
- savings summary cards

---

## “Tool FOMO”

Developers often subscribed to multiple tools simultaneously:
- ChatGPT
- Claude
- Cursor
- Copilot

even when actual usage heavily favored one platform.

### Product Impact
This led to:
- the “Redundancy Sweep” recommendation logic
- overlapping tool detection
- consolidation recommendations

---

## “Reporting Anxiety”

Operations and finance stakeholders explained that:
- spreadsheets feel difficult to present
- AI costs are fragmented across departments
- stakeholders want quick visual summaries

### Product Impact
This influenced:
- KPI cards
- Health Score system
- shareable report URLs
- export functionality
- startup-style report presentation

---

# 3. Example Simulated Feedback

## Solo Founder (SaaS Startup, 2 Employees)

> “I’m paying for ChatGPT, Claude, and Gemini because I keep experimenting. I know I probably don’t need all of them, but I don’t want to manually compare plans every month.”

### Product Decision
Implemented:
- overlapping tool detection
- recommendation prioritization
- estimated savings summaries

---

## Engineering Lead (FinTech Startup, 45 Employees)

> “We have more Cursor licenses than active developers. The problem isn’t buying tools — it’s tracking who actually uses them.”

### Product Decision
Implemented:
- seat count analysis
- headcount comparison logic
- ghost-license recommendations

---

## Operations Manager (AI Startup)

> “I don’t need another complicated dashboard. I need something I can run quickly before budget meetings.”

### Product Decision
Prioritized:
- fast onboarding
- no-login workflow
- under-60-second audit flow
- lightweight SaaS UX

---

# 4. Validated Product Assumptions

## Speed Matters More Than Perfect Accuracy

Most users preferred:
- instant insights
over
- highly detailed enterprise reporting

This strongly influenced the:
- deterministic audit engine
- frontend-first architecture
- simulation-first product strategy

---

## Shareability Is Important

The person generating the audit is often:
- not the budget owner
- not the finance stakeholder

This validated the importance of:
- shareable report URLs
- export functionality
- presentation-friendly layouts

---

## No-Login UX Builds Trust

Several simulated participants expressed hesitation around:
- connecting billing accounts
- giving financial permissions
- onboarding complexity

This reinforced the decision to:
- avoid forced authentication
- use manual audits first
- prioritize low-friction onboarding

---

# 5. Product Decisions Influenced by Research

| Insight | Product Decision |
| :--- | :--- |
| AI tool overlap is common | Redundancy detection |
| Teams over-purchase seats | Headcount analysis |
| Fast results are preferred | Lightweight audit flow |
| Shareability matters | Dynamic report URLs |
| Trust is important | No-login onboarding |
| Startups dislike complexity | Simple SaaS UI |

---

# 6. Current Research Limitations

The current research process was intentionally lightweight and simulated due to the assignment scope.

Limitations include:
- no formal survey infrastructure
- no live production user data
- small sample size
- no behavioral analytics

However, the simulated interviews helped guide:
- realistic UX priorities
- believable recommendations
- practical startup positioning

---

# 7. Future Research Opportunities

Potential future validation areas include:
- AI usage frequency tracking
- startup procurement workflows
- invoice management pain points
- team-level AI adoption behavior
- recurring optimization needs

Future iterations would ideally include:
- live founder interviews
- analytics-driven validation
- onboarding funnel analysis
- retention tracking

---

# 8. Research Philosophy

The user research process intentionally focused on:
- practical startup pain points
- operational simplicity
- realistic product behavior
- actionable optimization workflows

rather than building theoretical enterprise functionality too early.

The goal was to create a believable MVP that solves a recognizable startup problem in a simple and accessible way.
```
