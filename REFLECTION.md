# Reflection

## 1. Hardest Bug Encountered

The most difficult issue during development was handling persistent report routing while keeping the application frontend-first.

Initially, generated reports only existed in temporary React state, which caused data loss after page refreshes. I solved this by introducing a hybrid persistence strategy using both Supabase and localStorage fallback caching.

Another challenge was ensuring React Router routes worked correctly after deployment on Vercel. Refreshing dynamic routes like `/report/:id` initially produced 404 errors, which required configuring SPA rewrite rules through `vercel.json`.

---

## 2. Decision Reversals

One major decision reversal was around backend complexity.

Early in development, I considered introducing authentication and a larger database structure immediately. However, I intentionally scaled the scope back to focus on:
- core audit workflows
- believable recommendation logic
- product polish
- deployment stability

This helped keep the MVP realistic within the 7-day timeline.

I also initially explored adding more “AI-generated” recommendation behavior, but later shifted toward deterministic financial logic because it produced more believable and trustworthy outputs.

---

## 3. Planned Week 2 Improvements

If development continued beyond the assignment scope, the next priorities would be:

- Authentication and organization accounts
- Real invoice ingestion workflows
- Team collaboration features
- Better analytics visualizations
- AI-assisted recommendation tuning
- Automated SaaS spend categorization
- Email-based report delivery
- Full database-backed reporting dashboards

---

## 4. AI Tool Usage Reflection

AI tools significantly accelerated:
- debugging
- UI iteration
- architectural brainstorming
- copy refinement
- documentation writing

However, all major engineering decisions, scope control, product direction, and implementation tradeoffs still required manual judgment.

One key lesson was that AI is most useful for speeding up execution, but product realism and engineering prioritization still depend heavily on human decision-making.

---

## 5. Self-Rating

### Engineering: 8/10
Strengths:
- frontend architecture
- UI implementation
- MVP execution speed
- product-focused development

Areas to improve:
- backend systems
- automated testing
- large-scale state management

### Product Thinking: 8.5/10
Strengths:
- balancing realism with scope
- prioritizing UX polish
- maintaining believable business logic
- avoiding overengineering

### Overall Reflection

This project improved my understanding of how real MVP products are built under time constraints. The biggest takeaway was learning how to balance:
- engineering quality
- product polish
- technical scope
- deployment stability

while still shipping a believable and usable product experience.