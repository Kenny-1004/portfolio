import type { Interest } from "@/types";

/** What's on the desk right now. Reorder, edit, or add freely. */
export const interests: Interest[] = [
  {
    title: "Software Architecture",
    note: "How systems are shaped — boundaries, trade-offs, and the decisions that keep software easy to change.",
    keywords: ["Boundaries", "Patterns", "Trade-offs"],
  },
  {
    title: "Artificial Intelligence",
    note: "Language models as reasoning components, and how to compose them into reliable tools.",
    keywords: ["LLMs", "Agents", "Evaluation"],
  },
  {
    title: "Financial Markets",
    note: "Market structure, price behaviour, and the discipline required to read them objectively.",
    keywords: ["Structure", "Liquidity", "Risk"],
  },
  {
    title: "Algorithmic Trading",
    note: "Turning rules into code — and testing whether those rules hold up against data.",
    keywords: ["Systems", "Backtesting", "Execution"],
  },
  {
    title: "Data Analysis",
    note: "Asking better questions of data, and letting statistics replace intuition where it should.",
    keywords: ["Statistics", "Visualization", "Insight"],
  },
  {
    title: "Backend Engineering",
    note: "APIs, data flow, and the infrastructure that quietly makes applications work.",
    keywords: ["APIs", "Performance", "Reliability"],
  },
];
