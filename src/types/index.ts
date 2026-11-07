import type { LucideIcon } from "lucide-react";
import type { BrandIconName } from "@/assets/brand-icons";

/** An icon is either a local brand glyph or a Lucide icon component. */
export type IconRef =
  | { kind: "brand"; name: BrandIconName }
  | { kind: "lucide"; icon: LucideIcon };

export interface SiteConfig {
  firstName: string;
  lastName: string;
  role: string;
  /** Shown in the hero meta row. Leave empty ("") to hide. */
  location: string;
  /** IANA timezone for the live clock in the hero, e.g. "Europe/London". Empty hides it. */
  timezone: string;
  availability: { open: boolean; label: string };
  email: string;
  headline: { lead: string; emphasis: string; tail: string };
  supporting: string;
  description: string;
  about: { paragraphs: string[]; focus: string[] };
  contact: { headline: [string, string]; description: string };
}

export interface NavItem {
  id: string;
  label: string;
}

export interface SocialLink {
  label: string;
  href: string;
  handle: string;
  icon: IconRef;
}

export interface Technology {
  name: string;
  description: string;
  icon: IconRef;
  /** Brand color revealed on hover. */
  color: string;
}

export interface TechCategory {
  id: string;
  index: string;
  title: string;
  layer: string;
  summary: string;
  items: Technology[];
}

export type ProjectStatus = "In development" | "Planned" | "Live";

/** Which generative cover to render when no real screenshot is provided. */
export type CoverVariant = "equity" | "agents" | "distribution" | "stack";

export interface Project {
  slug: string;
  index: string;
  title: string;
  category: string;
  status: ProjectStatus;
  summary: string;
  /** Longer copy shown in the project detail modal. */
  details: string[];
  highlights: string[];
  stack: string[];
  /** Real screenshot path (e.g. "/projects/journal.webp"). Omit to show the generative cover. */
  image?: string;
  cover: CoverVariant;
  /** Leave as empty string until the link exists — the UI shows "Coming soon". */
  github: string;
  live: string;
}

export interface Milestone {
  /** Free-form period label. Replace with a real date range when you add one. */
  period: string;
  title: string;
  area: string;
  description: string;
  tags: string[];
}

export interface Interest {
  title: string;
  note: string;
  keywords: string[];
}
