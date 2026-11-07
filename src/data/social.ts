import { Mail } from "lucide-react";
import type { SocialLink } from "@/types";
import { site } from "./site";

/**
 * Social links. Remove an entry to hide it everywhere (contact + footer).
 * Entries with an empty href are hidden automatically.
 */
export const socials: SocialLink[] = [
  {
    label: "GitHub",
    handle: "@Kenny-1004",
    href: "https://github.com/Kenny-1004",
    icon: { kind: "brand", name: "github" },
  },
  {
    label: "LinkedIn",
    handle: "in/your-handle", // PLACEHOLDER
    href: "https://www.linkedin.com/", // PLACEHOLDER
    icon: { kind: "brand", name: "linkedin" },
  },
  {
    label: "X / Twitter",
    handle: "@your-handle", // PLACEHOLDER
    href: "", // PLACEHOLDER — add a URL to show it
    icon: { kind: "brand", name: "x" },
  },
  {
    label: "Email",
    handle: site.email,
    href: `mailto:${site.email}`,
    icon: { kind: "lucide", icon: Mail },
  },
];

export const visibleSocials = socials.filter((s) => s.href.length > 0);
