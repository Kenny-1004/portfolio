import type { Milestone } from "@/types";

/**
 * Development journey — areas of focus, in roughly the order they were explored.
 * `period` is intentionally a chapter label; swap in real dates (e.g. "2024 — 2025")
 * whenever you like. Add new milestones to the end of the array.
 */
export const milestones: Milestone[] = [
  {
    period: "Chapter 01",
    area: "Frontend Development",
    title: "Learning the interface",
    description:
      "Starting where users meet software — structure, styling, and interaction with HTML, CSS, and JavaScript, then React and TypeScript.",
    tags: ["HTML", "CSS", "JavaScript", "React", "TypeScript"],
  },
  {
    period: "Chapter 02",
    area: "Backend Engineering",
    title: "Going beneath the surface",
    description:
      "Moving server-side to understand how requests, routing, and business logic work — building APIs with Node.js, Express, and Python.",
    tags: ["Node.js", "Express", "Python", "REST"],
  },
  {
    period: "Chapter 03",
    area: "Database Management",
    title: "Modeling data",
    description:
      "Designing how information is stored and queried, and learning when a relational model or a document model fits better.",
    tags: ["PostgreSQL", "MongoDB", "Schema design"],
  },
  {
    period: "Chapter 04",
    area: "Full-Stack Projects",
    title: "Connecting the layers",
    description:
      "Bringing interface, server, and database together into complete applications that run end-to-end.",
    tags: ["Architecture", "Integration"],
  },
  {
    period: "Chapter 05",
    area: "Financial Technology",
    title: "Where code meets markets",
    description:
      "Applying engineering to a personal interest in financial markets — journaling, statistics, and performance analysis.",
    tags: ["Trading systems", "Data analysis"],
  },
  {
    period: "Now",
    area: "AI-Assisted Development",
    title: "Building with intelligent systems",
    description:
      "Exploring AI as both a development partner and a building block — from assisted workflows to multi-agent analysis systems.",
    tags: ["LLMs", "Agents", "Tooling"],
  },
];
