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
    const currentCost = parseFloat(spend) || 0;
    totalSpend += currentCost;
    totalSeats += parseInt(seats, 10) || 0;

    const standardPricePerSeat = getStandardPrice(name, plan);

    // Rule 1: General Overpaying (paying more than standard cost)
    if (standardPricePerSeat) {
      const expectedCost = standardPricePerSeat * seats;
      if (currentCost > expectedCost * 1.1) { // 10% tolerance for taxes/fees
        const potentialSavings = Math.min(currentCost - expectedCost, currentCost);
        recommendations.push({
          tool: name,
          currentPlan: plan,
          recommendedPlan: plan,
          savings: potentialSavings,
          reason: `You are currently spending $${currentCost}/mo for ${seats} seats, but the public standard pricing is ~$${expectedCost}. Consider reviewing your invoice for hidden fees or unused add-ons.`
        });
        totalSavings += potentialSavings;
        return; // Don't stack recommendations for the same tool unnecessarily
      }
    }

    // Rule 2: Unnecessary Team Plans for Small Teams
    const isTeamPlan = plan.toLowerCase().includes("team") || plan.toLowerCase().includes("business") || plan.toLowerCase().includes("enterprise");
    if (isTeamPlan && seats <= 2) {
      // For instance, ChatGPT Team is 25, Plus is 20. 
      const individualPrice = getStandardPrice(name, "Plus") || getStandardPrice(name, "Pro") || getStandardPrice(name, "Individual") || 20;
      const expectedCost = individualPrice * seats;
      if (currentCost > expectedCost) {
        const potentialSavings = Math.min(currentCost - expectedCost, currentCost);
        recommendations.push({
          tool: name,
          currentPlan: plan,
          recommendedPlan: "Individual / Pro",
          savings: potentialSavings,
          reason: `Team plans often have higher per-seat costs. For just ${seats} user(s), downgrading to an individual Pro plan might be more cost-efficient without losing core features.`
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
      reason: `You are currently paying for both ChatGPT and Claude. Consider standardizing on a single general-purpose LLM. This can improve team collaboration while reducing overlapping costs.`
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
      reason: `Since your team focuses on coding with dedicated AI IDEs, you might not need a separate ${generalTool.name} subscription for every developer. Consider auditing usage and reducing seats.`
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
      reason: `You have ${totalSeats} total AI seats for a team of ${teamSize}. Consider performing an access review—you might be paying for inactive users or former employees.`
    });
  }

  // If no savings found, give a positive reinforcement recommendation
  if (totalSavings === 0) {
    recommendations.push({
      tool: "Entire Stack",
      currentPlan: "Highly Optimized",
      recommendedPlan: "Keep Current",
      savings: 0,
      reason: `Your current AI stack already appears cost-efficient. We didn't find any obvious waste based on standard pricing models.`
    });
  }

  return {
    totalSpend: Math.round(totalSpend),
    totalSavings: Math.round(totalSavings),
    annualSavings: Math.round(totalSavings * 12),
    recommendations,
  };
}
