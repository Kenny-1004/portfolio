import { Network } from "lucide-react";
import type { TechCategory } from "@/types";

/** The technology showcase. Add or remove items freely — the grid adapts. */
export const techCategories: TechCategory[] = [
  {
    id: "frontend",
    index: "01",
    title: "Frontend Development",
    layer: "Interface",
    summary: "Interfaces that feel considered: typed, accessible, and responsive by default.",
    items: [
      {
        name: "React",
        description: "Component-driven UIs with predictable state and composable logic.",
        icon: { kind: "brand", name: "react" },
        color: "#61DAFB",
      },
      {
        name: "TypeScript",
        description: "Type-safe code that scales and documents itself.",
        icon: { kind: "brand", name: "typescript" },
        color: "#3178C6",
      },
      {
        name: "JavaScript",
        description: "The language of the web, from DOM to runtime.",
        icon: { kind: "brand", name: "javascript" },
        color: "#F7DF1E",
      },
      {
        name: "HTML5",
        description: "Semantic, accessible document structure.",
        icon: { kind: "brand", name: "html5" },
        color: "#E34F26",
      },
      {
        name: "CSS3",
        description: "Layout, motion, and responsive systems.",
        icon: { kind: "brand", name: "css3" },
        color: "#7B5CD6",
      },
      {
        name: "Tailwind CSS",
        description: "Utility-first styling built around a design-token system.",
        icon: { kind: "brand", name: "tailwind" },
        color: "#06B6D4",
      },
    ],
  },
  {
    id: "backend",
    index: "02",
    title: "Backend Development",
    layer: "Server",
    summary: "Services and APIs that move data reliably between people and systems.",
    items: [
      {
        name: "Node.js",
        description: "Event-driven JavaScript on the server.",
        icon: { kind: "brand", name: "node" },
        color: "#5FA04E",
      },
      {
        name: "Express.js",
        description: "Minimal, composable HTTP routing and middleware.",
        icon: { kind: "brand", name: "express" },
        color: "#D4D4D4",
      },
      {
        name: "Python",
        description: "Scripting, data analysis, and automation.",
        icon: { kind: "brand", name: "python" },
        color: "#FFD43B",
      },
      {
        name: "REST APIs",
        description: "Resource-oriented contracts between client and server.",
        icon: { kind: "lucide", icon: Network },
        color: "#8FA8C8",
      },
    ],
  },
  {
    id: "databases",
    index: "03",
    title: "Databases",
    layer: "Data",
    summary: "Two models of persistence, chosen per problem — relational structure or document flexibility.",
    items: [
      {
        name: "PostgreSQL",
        description: "Relational · SQL · strong consistency, joins, and constraints.",
        icon: { kind: "brand", name: "postgresql" },
        color: "#4169E1",
      },
      {
        name: "MongoDB",
        description: "Document · NoSQL · flexible schemas for evolving data.",
        icon: { kind: "brand", name: "mongodb" },
        color: "#47A248",
      },
    ],
  },
  {
    id: "tools",
    index: "04",
    title: "Development Tools",
    layer: "Workflow",
    summary: "The environment where ideas get designed, versioned, and shipped.",
    items: [
      {
        name: "Claude",
        description: "AI pair-programming for reasoning through problems.",
        icon: { kind: "brand", name: "claude" },
        color: "#D97757",
      },
      {
        name: "Figma",
        description: "Designing interfaces before writing them.",
        icon: { kind: "brand", name: "figma" },
        color: "#F24E1E",
      },
      {
        name: "Git",
        description: "Version control and a clean history.",
        icon: { kind: "brand", name: "git" },
        color: "#F03C2E",
      },
      {
        name: "GitHub",
        description: "Repositories, reviews, and collaboration.",
        icon: { kind: "brand", name: "github" },
        color: "#F5F5F5",
      },
      {
        name: "VS Code",
        description: "The everyday editor.",
        icon: { kind: "brand", name: "vscode" },
        color: "#2F9BF0",
      },
      {
        name: "Cursor",
        description: "An AI-native editor for fast iteration.",
        icon: { kind: "brand", name: "cursor" },
        color: "#E6E6E6",
      },
    ],
  },
];
