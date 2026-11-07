import { motion, useScroll, useTransform } from "motion/react";
import { ArrowUp } from "lucide-react";
import { useRef } from "react";
import { ease } from "@/components/animations/variants";
import { Magnetic } from "@/components/ui/Magnetic";
import { fullName, navItems, site } from "@/data/site";
import { visibleSocials } from "@/data/social";
import { scrollToId } from "@/lib/utils";
import { Container } from "./Container";

/**
 * Minimal closing frame. The oversized wordmark rises into place as the
 * footer scrolls into view, as if the page is settling onto its signature.
 */
export function Footer() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  const y = useTransform(scrollYProgress, [0, 1], ["45%", "0%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [0, 1]);
  const year = new Date().getFullYear();

  return (
    <footer ref={ref} className="relative overflow-hidden border-t border-line bg-ink pt-16 sm:pt-20">
      <Container>
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="text-h3 leading-tight font-medium tracking-[-0.035em]">
              Thanks for <span className="serif-italic text-mute">scrolling</span> this far.
            </p>
          </div>

          <nav aria-label="Footer" className="lg:col-span-2 lg:col-start-7">
            <p className="label mb-5 text-dim">Index</p>
            <ul className="space-y-2.5">
              {navItems.map((n) => (
                <li key={n.id}>
                  <a
                    href={`#${n.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToId(n.id);
                    }}
                    className="link-underline text-sm text-mute transition-colors hover:text-paper"
                  >
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-2">
            <p className="label mb-5 text-dim">Elsewhere</p>
            <ul className="space-y-2.5">
              {visibleSocials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target={s.href.startsWith("mailto:") ? undefined : "_blank"}
                    rel="noreferrer noopener"
                    className="link-underline text-sm text-mute transition-colors hover:text-paper"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex items-start sm:justify-end lg:col-span-2 lg:col-start-11">
            <Magnetic strength={0.4}>
              <button
                type="button"
                onClick={() => scrollToId("top")}
                data-cursor="hover"
                className="group flex items-center gap-3 text-sm"
                aria-label="Back to top"
              >
                <span className="label text-mute transition-colors group-hover:text-paper">Back to top</span>
                <span className="relative grid size-11 place-items-center overflow-hidden rounded-full border border-line transition-colors duration-500 group-hover:border-paper group-hover:bg-paper group-hover:text-ink">
                  <ArrowUp
                    size={16}
                    strokeWidth={1.5}
                    className="transition-transform duration-500 ease-[var(--ease-expo)] group-hover:-translate-y-8"
                  />
                  <ArrowUp
                    size={16}
                    strokeWidth={1.5}
                    className="absolute translate-y-8 transition-transform duration-500 ease-[var(--ease-expo)] group-hover:translate-y-0"
                  />
                </span>
              </button>
            </Magnetic>
          </div>
        </div>

        <div className="mt-16 flex flex-col justify-between gap-2 border-t border-line pt-5 text-dim sm:flex-row">
          <span className="label">
            © {year} {fullName}
          </span>
          <span className="label">Designed & built with React, TypeScript & Motion</span>
        </div>
      </Container>

      <div aria-hidden className="mt-6 overflow-hidden">
        <motion.p
          style={{ y, opacity }}
          transition={{ ease: ease.expo }}
          className="text-center text-[14.2vw] leading-[0.8] font-medium tracking-[-0.06em] whitespace-nowrap text-ink-3 select-none"
        >
          {site.firstName} <span className="serif-italic tracking-[-0.02em]">{site.lastName}</span>
        </motion.p>
      </div>
    </footer>
  );
}
