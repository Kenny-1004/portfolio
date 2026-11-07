/** Tiny className joiner — avoids pulling in a dependency for one function. */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

/** Smooth-scroll to a section id, honouring reduced-motion preferences. */
export function scrollToId(id: string): void {
  const el = id === "top" ? document.body : document.getElementById(id);
  if (!el) return;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (id === "top") window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  else el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  // Move focus for keyboard and screen-reader users without a second jump.
  if (id !== "top") {
    el.setAttribute("tabindex", "-1");
    el.focus({ preventScroll: true });
  }
}

/** True when an href is a real, usable link (not empty and not a "#" stub). */
export const isRealLink = (href: string): boolean => href.length > 0 && href !== "#";
