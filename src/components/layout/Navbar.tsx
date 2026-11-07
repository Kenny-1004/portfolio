import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { useEffect, useState } from "react";
import { ease, spring } from "@/components/animations/variants";
import { useActiveSection } from "@/hooks/useActiveSection";
import { fullName, navItems, site } from "@/data/site";
import { visibleSocials } from "@/data/social";
import { cn, scrollToId } from "@/lib/utils";
import { Container } from "./Container";

const sectionIds = navItems.map((n) => n.id);

/**
 * Minimal top bar.
 * - Hides on scroll-down, returns on scroll-up (never hidden near the top).
 * - Active section indicator is a shared-layout pill that glides between links.
 * - On small screens, links collapse into a full-screen editorial menu.
 */
export function Navbar() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const active = useActiveSection(sectionIds);

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 40);
    setHidden(!open && y > 400 && y > prev + 4);
    if (y < prev - 4) setHidden(false);
  });

  // Lock body scroll while the mobile menu is open; close on Escape.
  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const go = (id: string) => {
    setOpen(false);
    // Let the menu begin closing before scrolling for a smoother hand-off.
    window.setTimeout(() => scrollToId(id), open ? 350 : 0);
  };

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: hidden ? -100 : 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: ease.expo }}
        className="fixed inset-x-0 top-0 z-50"
      >
        <div
          className={cn(
            "absolute inset-0 -z-10 border-b transition-[background-color,border-color,backdrop-filter] duration-700",
            scrolled && !open ? "border-line-soft bg-ink/75 backdrop-blur-md" : "border-transparent bg-transparent",
          )}
        />
        <Container className="flex h-16 items-center justify-between sm:h-20">
          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              go("top");
            }}
            className="group flex items-center gap-3"
            aria-label={`${fullName} — back to top`}
            data-cursor="hover"
          >
            <span className="grid size-9 place-items-center rounded-full border border-line font-serif text-lg italic transition-colors duration-500 group-hover:border-paper/50">
              {site.firstName[0]}
            </span>
            <span className="relative hidden overflow-hidden text-sm font-medium tracking-tight sm:block">
              <span className="block transition-transform duration-700 ease-[var(--ease-expo)] group-hover:-translate-y-full">
                {fullName}
              </span>
              <span
                aria-hidden
                className="absolute inset-x-0 top-full block text-mute transition-transform duration-700 ease-[var(--ease-expo)] group-hover:-translate-y-full"
              >
                {site.role}
              </span>
            </span>
          </a>

          <nav aria-label="Primary" className="hidden md:block">
            <ul className="flex items-center gap-1 rounded-full border border-line-soft bg-ink-2/60 p-1 backdrop-blur-md">
              {navItems.map((item) => {
                const isActive = active === item.id;
                return (
                  <li key={item.id} className="relative">
                    {isActive && (
                      <motion.span
                        layoutId="nav-pill"
                        transition={spring.snappy}
                        className="absolute inset-0 rounded-full bg-paper"
                      />
                    )}
                    <a
                      href={`#${item.id}`}
                      onClick={(e) => {
                        e.preventDefault();
                        go(item.id);
                      }}
                      aria-current={isActive ? "true" : undefined}
                      data-cursor="hover"
                      className={cn(
                        "relative block rounded-full px-4 py-2 text-[0.8125rem] tracking-tight transition-colors duration-300",
                        isActive ? "text-ink" : "text-mute hover:text-paper",
                      )}
                    >
                      {item.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-4">
            <a
              href={`mailto:${site.email}`}
              className="link-underline hidden text-[0.8125rem] tracking-tight lg:block"
              data-cursor="hover"
            >
              Let’s talk
            </a>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="relative grid size-10 place-items-center rounded-full border border-line md:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
            >
              <motion.span
                animate={open ? { rotate: 45, y: 0 } : { rotate: 0, y: -3 }}
                transition={{ duration: 0.5, ease: ease.expo }}
                className="absolute h-px w-4 bg-paper"
              />
              <motion.span
                animate={open ? { rotate: -45, y: 0 } : { rotate: 0, y: 3 }}
                transition={{ duration: 0.5, ease: ease.expo }}
                className="absolute h-px w-4 bg-paper"
              />
            </button>
          </div>
        </Container>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            initial={{ clipPath: "inset(0% 0% 100% 0%)" }}
            animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
            exit={{ clipPath: "inset(0% 0% 100% 0%)" }}
            transition={{ duration: 0.8, ease: ease.quart }}
            className="fixed inset-0 z-40 flex flex-col bg-ink-2 pt-24 md:hidden"
          >
            <Container className="flex flex-1 flex-col justify-between pb-10">
              <nav aria-label="Mobile">
                <ul className="flex flex-col">
                  {navItems.map((item, i) => (
                    <li key={item.id} className="overflow-hidden border-b border-line">
                      <motion.a
                        href={`#${item.id}`}
                        onClick={(e) => {
                          e.preventDefault();
                          go(item.id);
                        }}
                        initial={{ y: "100%" }}
                        animate={{ y: "0%" }}
                        exit={{ y: "100%" }}
                        transition={{ duration: 0.8, ease: ease.expo, delay: 0.15 + i * 0.06 }}
                        className="flex items-baseline justify-between py-4"
                      >
                        <span className="text-[2.6rem] leading-none font-medium tracking-[-0.04em]">{item.label}</span>
                        <span className="label text-mute">0{i + 1}</span>
                      </motion.a>
                    </li>
                  ))}
                </ul>
              </nav>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { delay: 0.5 } }}
                exit={{ opacity: 0 }}
                className="flex flex-wrap gap-x-6 gap-y-3"
              >
                {visibleSocials.map((s) => (
                  <a key={s.label} href={s.href} className="label text-mute" target="_blank" rel="noreferrer noopener">
                    {s.label}
                  </a>
                ))}
              </motion.div>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
