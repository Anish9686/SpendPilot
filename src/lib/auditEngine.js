import { getStandardPrice } from "./pricing";

export function runAuditEngine(formData) {
  const { teamSize, primaryUseCase, tools } = formData;

  let totalSpend = 0;
  let totalSavings = 0;
  const recommendations = [];

  const toolNames = tools.map(t => t.name.toLowerCase());
  const hasChatGPT = toolNames.includes("chatgpt");
  const hasClaude = toolNames.includes("claude");
  const hasCodingAI = toolNames.includes("cursor") || toolNames.includes("github copilot") || toolNames.includes("windsurf");

  let totalSeats = 0;

  tools.forEach((tool) => {
    const { name, plan, spend, seats } = tool;
    
    // Sanitize inputs
    const currentCost = Math.max(0, parseFloat(spend) || 0);
    const seatCount = Math.max(1, parseInt(seats, 10) || 1);
    
    totalSpend += currentCost;
    totalSeats += seatCount;

    const standardPricePerSeat = getStandardPrice(name, plan);

    // Rule 1: General Overpaying (paying more than standard cost)
    if (standardPricePerSeat) {
      const expectedCost = standardPricePerSeat * seatCount;
      if (currentCost > expectedCost * 1.1) { // 10% tolerance for taxes/fees
        const potentialSavings = Math.min(currentCost - expectedCost, currentCost);
        recommendations.push({
          tool: name,
          currentPlan: plan,
          recommendedPlan: plan,
          savings: potentialSavings,
          reason: `We detected a premium over standard retail pricing. You are spending $${currentCost}/mo, but benchmarks indicate ~$${expectedCost}. We recommend an invoice audit to identify unutilized add-ons or legacy billing tiers.`
        });
        totalSavings += potentialSavings;
        return; // Don't stack recommendations for the same tool unnecessarily
      }
    }

    // Rule 2: Unnecessary Team Plans for Small Teams
    const isTeamPlan = plan.toLowerCase().includes("team") || plan.toLowerCase().includes("business") || plan.toLowerCase().includes("enterprise");
    if (isTeamPlan && seatCount <= 2) {
      // For instance, ChatGPT Team is 25, Plus is 20. 
      const individualPrice = getStandardPrice(name, "Plus") || getStandardPrice(name, "Pro") || getStandardPrice(name, "Individual") || 20;
      const expectedCost = individualPrice * seatCount;
      if (currentCost > expectedCost) {
        const potentialSavings = Math.min(currentCost - expectedCost, currentCost);
        recommendations.push({
          tool: name,
          currentPlan: plan,
          recommendedPlan: "Individual / Pro",
          savings: potentialSavings,
          reason: `Team tiers typically carry a premium per seat. For a micro-deployment of ${seatCount} user(s), downgrading to individual Pro licenses provides identical core utility while immediately optimizing spend.`
        });
        totalSavings += potentialSavings;
      }
    }
  });

  // Rule 3: Redundant General LLMs (ChatGPT + Claude)
  if (hasChatGPT && hasClaude) {
    const chatgpt = tools.find(t => t.name.toLowerCase() === "chatgpt");
    const claude = tools.find(t => t.name.toLowerCase() === "claude");
    
    // Suggest dropping the cheaper one to be conservative, or dropping Claude
    const cheaperTool = parseFloat(chatgpt.spend) < parseFloat(claude.spend) ? chatgpt : claude;
    
    recommendations.push({
      tool: cheaperTool.name,
      currentPlan: cheaperTool.plan,
      recommendedPlan: "Cancel / Pause",
      savings: parseFloat(cheaperTool.spend),
      reason: `Your stack shows overlapping capabilities across general-purpose LLMs. Standardizing on a single vendor for non-specialized tasks improves knowledge sharing and immediately recovers budget.`
    });
    totalSavings += parseFloat(cheaperTool.spend);
  }

  // Rule 4: Coding Overlap
  if (primaryUseCase === "coding" && hasCodingAI && (hasChatGPT || hasClaude)) {
    const generalTool = tools.find(t => t.name.toLowerCase() === "chatgpt" || t.name.toLowerCase() === "claude");
    
    // We suggest migrating 50% of the seats as a realistic recommendation
    const potentialSavings = Math.min((parseFloat(generalTool.spend) / 2), parseFloat(generalTool.spend));
    
    recommendations.push({
      tool: generalTool.name,
      currentPlan: generalTool.plan,
      recommendedPlan: "Reduce Seats",
      savings: potentialSavings,
      reason: `Given your primary use case is engineering, dedicated AI IDEs often fulfill most LLM needs. We recommend scaling down general-purpose ${generalTool.name} seats for your developer cohort to eliminate redundancy.`
    });
    totalSavings += potentialSavings;
  }

  // Rule 5: Seat hoarding
  if (totalSeats > teamSize * 1.5 && teamSize > 0) {
    recommendations.push({
      tool: "Multiple Tools",
      currentPlan: "Various",
      recommendedPlan: "Audit Access",
      savings: 0, // Hard to estimate exact savings without knowing which ones
      reason: `Your license-to-headcount ratio is unusually high (${totalSeats} seats for ${teamSize} employees). We flagged a surplus of allocated seats, indicating potential ghost licenses from offboarded employees or inactive users.`
    });
  }

  // If no savings found, give a positive reinforcement recommendation
  if (totalSavings === 0) {
    recommendations.push({
      tool: "Entire Stack",
      currentPlan: "Highly Optimized",
      recommendedPlan: "Keep Current",
      savings: 0,
      reason: `Excellent work! Your current AI stack is exceptionally lean. Based on our benchmarked startup data, your license utilization and pricing tiers are fully optimized. No immediate actions are required to reduce spend.`
    });
  }

  return {
    totalSpend: Math.round(totalSpend),
    totalSavings: Math.round(totalSavings),
    annualSavings: Math.round(totalSavings * 12),
    recommendations,
  };
}
