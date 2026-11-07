import { AnimatePresence, motion, useScroll, useSpring } from "motion/react";
import { useRef, useState } from "react";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ease, fadeUp, spring, stagger } from "@/components/animations/variants";
import { milestones } from "@/data/journey";
import { cn } from "@/lib/utils";

/**
 * Development journey as a scroll-driven timeline.
 * A spine fills as you read; each milestone's node lights when it reaches the
 * centre of the viewport, and the sticky counter on the left follows along.
 */
export function Journey() {
  const listRef = useRef<HTMLOListElement>(null);
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 0.6", "end 0.6"] });
  const fill = useSpring(scrollYProgress, spring.scroll);
  const current = milestones[active];

  return (
    <section id="journey" aria-label="Development journey" className="relative bg-ink-2/40 py-28 sm:py-36 lg:py-44">
      <Container>
        <SectionHeading
          index="04"
          eyebrow="Journey"
          title="Learning the stack, one layer at a time."
          emphasis={["layer", "at", "a", "time"]}
          aside={<p>Not a résumé — a record of what I’ve been learning and in which order. New chapters get added as they happen.</p>}
        />

        <div className="mt-16 grid gap-12 lg:mt-24 lg:grid-cols-12 lg:gap-6">
          {/* Sticky chapter indicator (desktop) */}
          <div className="hidden lg:col-span-4 lg:block">
            <div className="sticky top-32">
              <div className="flex items-baseline gap-3 font-mono text-mute">
                <span className="relative inline-block h-[1.1em] w-[2ch] overflow-hidden text-6xl leading-none text-paper tabular-nums">
                  <AnimatePresence mode="popLayout" initial={false}>
                    <motion.span
                      key={active}
                      initial={{ y: "100%" }}
                      animate={{ y: "0%" }}
                      exit={{ y: "-100%" }}
                      transition={{ duration: 0.6, ease: ease.expo }}
                      className="absolute inset-0"
                    >
                      {String(active + 1).padStart(2, "0")}
                    </motion.span>
                  </AnimatePresence>
                </span>
                <span className="text-sm">/ {String(milestones.length).padStart(2, "0")}</span>
              </div>
              <div className="mt-6 h-[3.5rem] overflow-hidden">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.p
                    key={current.area}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -16 }}
                    transition={{ duration: 0.45, ease: ease.expo }}
                    className="serif-italic text-4xl text-paper/90"
                  >
                    {current.area}
                  </motion.p>
                </AnimatePresence>
              </div>
              <ul className="mt-10 space-y-2">
                {milestones.map((m, i) => (
                  <li key={m.area} className="flex items-center gap-3">
                    <span
                      className={cn(
                        "h-px transition-all duration-700 ease-[var(--ease-expo)]",
                        i === active ? "w-10 bg-accent" : "w-4 bg-line",
                      )}
                    />
                    <span className={cn("label transition-colors duration-500", i === active ? "text-paper" : "text-dim")}>
                      {m.area}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Timeline */}
          <ol ref={listRef} className="relative lg:col-span-7 lg:col-start-6">
            <span aria-hidden className="absolute top-0 bottom-0 left-[5px] w-px bg-line" />
            <motion.span
              aria-hidden
              style={{ scaleY: fill }}
              className="absolute top-0 bottom-0 left-[5px] w-px origin-top bg-accent"
            />
            {milestones.map((m, i) => (
              <motion.li
                key={m.area}
                variants={stagger(0.08)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.4 }}
                onViewportEnter={() => setActive(i)}
                className="relative pb-20 pl-10 last:pb-0 sm:pl-14"
              >
                <motion.span
                  aria-hidden
                  className="absolute top-1.5 left-0 size-[11px] rounded-full border border-line bg-ink"
                  animate={i <= active ? { borderColor: "#8fa8c8", backgroundColor: "#8fa8c8" } : {}}
                  transition={{ duration: 0.5 }}
                />
                <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-x-4 gap-y-2">
                  <span className="label text-mute">{m.period}</span>
                  <span className="h-px w-6 bg-line" />
                  <span className="label text-accent">{m.area}</span>
                </motion.div>
                <motion.h3
                  variants={fadeUp}
                  className="mt-5 text-[clamp(1.8rem,3.2vw,3rem)] leading-[1] font-medium tracking-[-0.04em]"
                >
                  {m.title}
                </motion.h3>
                <motion.p variants={fadeUp} className="mt-5 max-w-xl leading-relaxed text-mute">
                  {m.description}
                </motion.p>
                <motion.ul variants={fadeUp} className="mt-6 flex flex-wrap gap-x-5 gap-y-2" aria-label="Topics">
                  {m.tags.map((t) => (
                    <li key={t} className="label text-paper/60">
                      <span className="mr-2 text-dim">/</span>
                      {t}
                    </li>
                  ))}
                </motion.ul>
              </motion.li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
