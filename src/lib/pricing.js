export const TOOL_PRICING = {
  "ChatGPT": {
    "Plus": 20,
    "Team": 25,
    "Enterprise": 60
  },
  "Claude": {
    "Pro": 20,
    "Team": 30,
    "Enterprise": 60
  },
  "Cursor": {
    "Pro": 20,
    "Business": 40
  },
  "GitHub Copilot": {
    "Individual": 10,
    "Business": 19
  },
  "Gemini": {
    "Advanced": 20,
    "Business": 30
  },
  "Windsurf": {
    "Pro": 20,
    "Team": 30
  },
  "v0": {
    "Pro": 20,
    "Team": 30
  }
};

// Helper function to get standard price for a tool and plan
export function getStandardPrice(toolName, planName) {
  if (!TOOL_PRICING[toolName]) return null;
  // Try to find exact match
  if (TOOL_PRICING[toolName][planName]) {
    return TOOL_PRICING[toolName][planName];
  }
  // Try case insensitive match
  const planKey = Object.keys(TOOL_PRICING[toolName]).find(
    k => k.toLowerCase() === planName.toLowerCase()
  );
  if (planKey) {
    return TOOL_PRICING[toolName][planKey];
  }
  return null;
}
