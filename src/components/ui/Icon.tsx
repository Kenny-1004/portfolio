import { brandIcons } from "@/assets/brand-icons";
import type { IconRef } from "@/types";

interface IconProps {
  icon: IconRef;
  size?: number;
  className?: string;
  title?: string;
}

/** Renders either a local brand glyph (filled path) or a Lucide icon. */
export function Icon({ icon, size = 20, className, title }: IconProps) {
  if (icon.kind === "lucide") {
    const Lucide = icon.icon;
    return <Lucide size={size} strokeWidth={1.5} className={className} aria-hidden={!title} aria-label={title} />;
  }
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="currentColor"
      className={className}
      role={title ? "img" : undefined}
      aria-hidden={!title}
      aria-label={title}
    >
      <path d={brandIcons[icon.name]} />
    </svg>
  );
}
