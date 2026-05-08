import { z } from "zod";

export const toolSchema = z.object({
  name: z.string().min(1, "Tool name is required"),
  plan: z.string().min(1, "Plan name is required"),
  spend: z.coerce.number().min(0, "Spend must be a positive number"),
  seats: z.coerce.number().min(1, "Must have at least 1 seat"),
});

export const auditSchema = z.object({
  teamSize: z.coerce.number().min(1, "Team size must be at least 1"),
  primaryUseCase: z.enum(["coding", "writing", "research", "mixed", "data analysis"], {
    errorMap: () => ({ message: "Please select a valid use case" }),
  }),
  tools: z.array(toolSchema).min(1, "Please add at least one AI tool"),
});

// Predefined AI tools for the dropdown
export const AI_TOOLS = [
  "ChatGPT",
  "Claude",
  "Cursor",
  "GitHub Copilot",
  "Gemini",
  "OpenAI API",
  "Anthropic API",
  "Windsurf",
  "v0"
];

// Use Cases for dropdown
export const USE_CASES = [
  { value: "coding", label: "Coding" },
  { value: "writing", label: "Writing" },
  { value: "research", label: "Research" },
  { value: "mixed", label: "Mixed" },
  { value: "data analysis", label: "Data Analysis" },
];

export const defaultToolValues = {
  name: "",
  plan: "",
  spend: 0,
  seats: 1,
};

export const defaultFormValues = {
  teamSize: 1,
  primaryUseCase: "mixed",
  tools: [{ ...defaultToolValues }],
};
