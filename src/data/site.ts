import type { NavItem, SiteConfig } from "@/types";

/**
 * ─── Edit me ───────────────────────────────────────────────
 * All personal copy lives here. Components read from this file,
 * so you never need to touch JSX to update your details.
 * Values marked PLACEHOLDER need your real information.
 */
export const site: SiteConfig = {
  firstName: "Kent",
  lastName: "Labastida",
  role: "Software Developer",
  location: "City, Country", // PLACEHOLDER — or "" to hide
  timezone: "", // PLACEHOLDER — e.g. "Asia/Manila"; "" hides the clock
  availability: { open: true, label: "Open to opportunities" },
  email: "hello@example.com", // PLACEHOLDER
  headline: {
    lead: "Engineering ideas",
    emphasis: "into digital",
    tail: "experiences.",
  },
  supporting: "Building applications. Exploring technology. Creating possibilities.",
  description:
    "I’m a software developer passionate about building meaningful digital experiences, intelligent systems, and scalable applications.",
  about: {
    paragraphs: [
      "I’m passionate about understanding how technology works and transforming ideas into functional digital experiences.",
      "From designing intuitive interfaces to developing backend systems and managing databases, I enjoy working across different layers of software engineering.",
      "Beyond software development, I’m also interested in financial markets, data analysis, and intelligent systems.",
    ],
    focus: [
      "Full-Stack Engineering",
      "Software Architecture",
      "Database Systems",
      "Financial Technology",
      "Artificial Intelligence",
      "Data-Driven Solutions",
    ],
  },
  contact: {
    headline: ["Have an interesting idea?", "Let’s build something meaningful."],
    description:
      "I’m always interested in exploring new ideas, collaborating on interesting projects, and connecting with people who share a passion for technology.",
  },
};

export const navItems: NavItem[] = [
  { id: "about", label: "About" },
  { id: "stack", label: "Stack" },
  { id: "work", label: "Work" },
  { id: "journey", label: "Journey" },
  { id: "contact", label: "Contact" },
];

export const fullName = `${site.firstName} ${site.lastName}`;
