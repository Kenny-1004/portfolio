import { ArrowUpRight } from "lucide-react";
import type { MouseEvent, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Magnetic } from "./Magnetic";

type Variant = "solid" | "outline" | "ghost";

interface ButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: (e: MouseEvent<HTMLElement>) => void;
  variant?: Variant;
  icon?: ReactNode | false;
  className?: string;
  external?: boolean;
  magnetic?: boolean;
  ariaLabel?: string;
}

const base =
  "group relative inline-flex h-12 items-center gap-3 overflow-hidden rounded-full px-6 text-[0.8125rem] font-medium tracking-tight transition-colors duration-500 ease-[var(--ease-expo)] sm:h-13 sm:px-7";

const variants: Record<Variant, string> = {
  solid: "bg-paper text-ink",
  outline: "border border-line text-paper hover:border-paper/40",
  ghost: "text-paper",
};

/** Fill colour that wipes up from the bottom on hover. */
const fills: Record<Variant, string> = {
  solid: "bg-accent",
  outline: "bg-paper",
  ghost: "bg-ink-3",
};

/**
 * Pill button with a bottom-up colour wipe, a rolling label, and an arrow that
 * exits top-right and re-enters bottom-left. Renders an <a> when given an href.
 */
export function Button({
  children,
  href,
  onClick,
  variant = "solid",
  icon,
  className,
  external,
  magnetic = true,
  ariaLabel,
}: ButtonProps) {
  const inner = (
    <>
      <span
        aria-hidden
        className={cn(
          "absolute inset-0 translate-y-full rounded-[inherit] transition-transform duration-700 ease-[var(--ease-expo)] group-hover:translate-y-0",
          fills[variant],
        )}
      />
      <span className="relative block overflow-hidden">
        <span className="block transition-transform duration-700 ease-[var(--ease-expo)] group-hover:-translate-y-full">
          {children}
        </span>
        <span
          aria-hidden
          className={cn(
            "absolute inset-0 block translate-y-full transition-transform duration-700 ease-[var(--ease-expo)] group-hover:translate-y-0",
            variant === "outline" && "text-ink",
          )}
        >
          {children}
        </span>
      </span>
      {icon !== false && (
        <span
          className={cn(
            "relative grid size-5 place-items-center overflow-hidden transition-colors duration-500",
            variant === "outline" && "group-hover:text-ink",
          )}
        >
          <span className="block transition-transform duration-500 ease-[var(--ease-expo)] group-hover:translate-x-5 group-hover:-translate-y-5">
            {icon ?? <ArrowUpRight size={16} strokeWidth={1.5} />}
          </span>
          <span className="absolute -translate-x-5 translate-y-5 transition-transform duration-500 ease-[var(--ease-expo)] group-hover:translate-x-0 group-hover:translate-y-0">
            {icon ?? <ArrowUpRight size={16} strokeWidth={1.5} />}
          </span>
        </span>
      )}
    </>
  );

  const classes = cn(base, variants[variant], className);
  const el = href ? (
    <a
      href={href}
      onClick={onClick}
      className={classes}
      aria-label={ariaLabel}
      data-cursor="hover"
      {...(external ? { target: "_blank", rel: "noreferrer noopener" } : {})}
    >
      {inner}
    </a>
  ) : (
    <button type="button" onClick={onClick} className={classes} aria-label={ariaLabel} data-cursor="hover">
      {inner}
    </button>
  );

  return magnetic ? <Magnetic strength={0.25}>{el}</Magnetic> : el;
}
