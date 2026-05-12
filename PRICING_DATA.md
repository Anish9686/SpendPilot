```md id="h24lze"
# 📊 Pricing Data & Benchmark Logic

SpendPilot uses a deterministic “Benchmark Audit” engine to identify potential savings opportunities across common AI subscriptions and developer tooling.

This document explains:
- pricing assumptions
- benchmark methodology
- recommendation logic
- optimization rules used in the MVP

The current implementation intentionally prioritizes:
- simplicity
- explainability
- predictable outputs
- believable financial recommendations

rather than opaque AI-generated scoring systems.

---

# 1. Benchmark Pricing Data (MVP Baseline)

The following pricing estimates are used as the “Fair Market Value” baseline for audit comparisons.

| Tool | Pro Tier (Monthly) | Team / Business Tier | Notes |
| :--- | :--- | :--- | :--- |
| **ChatGPT** | $20 / seat | $30 / seat | Plus vs Team pricing |
| **Claude** | $20 / seat | $30 / seat | Claude Pro vs Team |
| **Cursor** | $20 / seat | $40 / seat | Business tier benchmark |
| **GitHub Copilot** | $10 / seat | $19 / seat | Individual vs Business |
| **Midjourney** | $30 / user | $60 / user | Approximate plan averages |

These pricing assumptions are intentionally simplified to support:
- rapid recommendation generation
- predictable calculations
- recruiter-friendly demonstration logic

---

# 2. Benchmark Audit Logic

The audit engine (`src/lib/auditEngine.js`) applies several lightweight optimization rules to generate recommendations.

---

## A. Redundancy Sweep

If users subscribe to multiple overlapping general-purpose LLM tools (e.g. ChatGPT + Claude), the engine flags potential redundancy.

### Example
- ChatGPT Plus
- Claude Pro

### Recommendation
> Consolidate overlapping AI assistants to reduce duplicate spend.

The logic assumes that many startups over-subscribe during rapid experimentation phases.

---

## B. Tier Optimization

If a very small team is paying for:
- Team plans
- Enterprise tiers
- Business subscriptions

the engine recommends downgrading to more appropriate pricing tiers.

### Example
- Team size: 1
- Subscription: Team Plan

### Recommendation
> Downgrade to individual/pro tier.

---

## C. Ghost License Detection

The engine compares:
- seat count
- reported employee count

If seat allocation exceeds likely usage, the system flags potential unused licenses.

### Example
- Employees: 5
- Active seats: 10

### Recommendation
> Review inactive or duplicate subscriptions.

---

## D. Benchmark Pricing Comparison

The engine compares submitted monthly spend against estimated benchmark pricing.

If submitted spend significantly exceeds expected pricing assumptions, the engine identifies possible:
- legacy billing
- overpayment
- inefficient procurement

---

# 3. Recommendation Priority Levels

Recommendations are categorized by severity and expected savings impact.

| Priority | Description |
| :--- | :--- |
| **High** | Significant redundancy or major overspending |
| **Medium** | Unnecessary team/business plans |
| **Low** | Minor benchmark inefficiencies or optimization opportunities |

This hierarchy helps the final report feel more realistic and actionable.

---

# 4. Why Deterministic Logic?

The MVP intentionally avoids:
- black-box AI scoring
- unpredictable recommendations
- external LLM dependencies

Instead, SpendPilot uses:
- transparent rules
- benchmark assumptions
- explainable calculations

This improves:
- reliability
- trustworthiness
- demo stability
- engineering simplicity

---

# 5. Accuracy Disclaimer

## Approximate Pricing

AI tool pricing changes frequently.

The current benchmark assumptions are based on:
- public pricing pages
- commonly available retail plans
- estimated 2024–2026 averages

---

## Enterprise Agreements

Large organizations may negotiate:
- custom pricing
- annual contracts
- bundled enterprise deals

These scenarios are intentionally outside the scope of the MVP.

---

## Currency & Regional Variations

The current system assumes:
- USD pricing
- monthly billing
- standard public subscription models

Regional taxes, discounts, and exchange-rate adjustments are not included.

---

# 6. Current MVP Limitations

The current recommendation system does not yet account for:
- real usage analytics
- API token consumption
- behavioral AI usage patterns
- invoice ingestion
- organization-wide permission structures

The goal of the MVP is to simulate believable financial optimization workflows rather than deliver enterprise-grade procurement analysis.

---

# 7. Future Improvements

Potential future enhancements include:

- Live pricing synchronization
- Real invoice integrations
- AI-assisted recommendation tuning
- Usage-based optimization scoring
- Historical spend trend analysis
- Organization-wide benchmark comparisons

---

# 8. Pricing Philosophy

SpendPilot is intentionally designed around:
- explainable financial recommendations
- realistic optimization opportunities
- operational simplicity

The focus is helping startups quickly identify obvious AI spending inefficiencies before they scale into larger operational problems.
```
