import type { Project } from "@/types";

/**
 * Featured projects.
 *
 * To add a project, append an object below. To use a real screenshot,
 * drop it in /public/projects and set `image: "/projects/name.webp"`.
 * Without an image, an abstract generative cover is drawn instead —
 * it's clearly illustrative and never pretends to be a screenshot.
 *
 * Statuses, highlights, and links are placeholders drawn from each
 * project's description — confirm or rewrite them before publishing.
 */
export const projects: Project[] = [
  {
    slug: "trading-journal",
    index: "01",
    title: "Trading Journal Platform",
    category: "Full-Stack · FinTech",
    status: "In development",
    summary:
      "A locally hosted trading journal designed to track trading performance, analyze statistics, visualize trade history, and monitor profitability.",
    details: [
      "A private, self-hosted journal for recording trades and turning them into a clear picture of performance over time.",
      "The focus is on fast data entry, honest statistics, and visualizations that make patterns in trade history easy to see.",
    ],
    highlights: [
      "Trade logging and history",
      "Performance statistics",
      "Equity & profitability visualization",
      "Runs locally — data stays on your machine",
    ],
    stack: ["React", "TypeScript", "Node.js", "PostgreSQL"],
    cover: "equity",
    github: "",
    live: "",
  },
  {
    slug: "ai-trading-assistant",
    index: "02",
    title: "AI Trading Assistant",
    category: "AI · Multi-Agent Systems",
    status: "In development",
    summary:
      "An intelligent multi-agent analysis system designed to evaluate market structure, trading confluences, and financial market opportunities.",
    details: [
      "A system of cooperating agents, each responsible for one lens of analysis, whose findings are combined into a single structured assessment.",
    ],
    highlights: [
      "Agent-per-concern architecture",
      "Market structure evaluation",
      "Confluence scoring",
      "Structured, explainable output",
    ],
    stack: ["Python", "Claude", "REST APIs"],
    cover: "agents",
    github: "",
    live: "",
  },
  {
    slug: "financial-data-analysis",
    index: "03",
    title: "Financial Data Analysis",
    category: "Data · Analytics",
    status: "Planned",
    summary:
      "A data-driven application focused on financial market analysis, statistical evaluation, and trading performance.",
    details: [
      "An exploration of market and performance data through statistics: distributions, drawdowns, and the numbers behind a strategy.",
    ],
    highlights: ["Statistical evaluation", "Distribution & risk metrics", "Clear visual reporting"],
    stack: ["Python", "PostgreSQL", "React"],
    cover: "distribution",
    github: "",
    live: "",
  },
  {
    slug: "full-stack-applications",
    index: "04",
    title: "Full-Stack Applications",
    category: "Collection · Engineering",
    status: "In development",
    summary:
      "A collection of applications demonstrating frontend engineering, backend development, API integration, and database management.",
    details: [
      "A growing set of builds that each exercise a different part of the stack — interface, API layer, and persistence.",
    ],
    highlights: ["Frontend engineering", "API design & integration", "Relational and document databases"],
    stack: ["React", "Express.js", "MongoDB", "PostgreSQL"],
    cover: "stack",
    github: "https://github.com/Kenny-1004",
    live: "",
  },
];
