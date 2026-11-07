import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import { useLayoutEffect, useRef, useState } from "react";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { fadeUp, inViewEarly, spring, stagger } from "@/components/animations/variants";
import { interests } from "@/data/interests";
import { useIsDesktop } from "@/hooks/useMediaQuery";
import type { Interest } from "@/types";

function Panel({ item, i }: { item: Interest; i: number }) {
  return (
    <article className="group relative flex h-full flex-col justify-between overflow-hidden border border-line bg-ink p-6 transition-colors duration-700 hover:bg-ink-2 sm:p-8 lg:p-10">
      <span
        aria-hidden
        className="absolute -right-6 -bottom-16 font-serif text-[16rem] leading-none text-paper/[0.03] italic transition-all duration-1000 ease-[var(--ease-expo)] group-hover:-translate-y-4 group-hover:text-accent/10"
      >
        {String(i + 1).padStart(2, "0")}
      </span>

      <div className="relative flex items-center justify-between">
        <span className="label text-dim">{String(i + 1).padStart(2, "0")}</span>
        <span className="relative flex size-2">
          <span className="absolute inset-0 rounded-full bg-accent/60 motion-safe:animate-ping" style={{ animationDelay: `${i * 0.4}s`, animationDuration: "2.4s" }} />
          <span className="relative size-2 rounded-full bg-accent" />
        </span>
      </div>

      <div className="relative mt-16 lg:mt-0">
        <h3 className="text-[clamp(2.2rem,3.6vw,3.9rem)] leading-[0.95] tracking-[-0.04em]">
          {item.title.split(" ").map((w, wi) => (
            <span key={w} className={wi === 0 ? "block font-medium" : "serif-italic block text-paper/85"}>
              {w}
            </span>
          ))}
        </h3>
        <p className="mt-6 max-w-sm leading-relaxed text-mute transition-colors duration-500 group-hover:text-paper/80">{item.note}</p>
        <ul className="mt-8 flex flex-wrap gap-2 border-t border-line pt-5">
          {item.keywords.map((k, ki) => (
            <li key={k} className="label text-paper/55">
              {k}
              {ki < item.keywords.length - 1 && <span className="ml-2 text-dim">·</span>}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

/**
 * "Currently exploring" — on desktop the section pins and its panels travel
 * horizontally as you scroll vertically. On touch/smaller screens, or with
 * reduced motion, it becomes a calm vertical list.
 */
export function Interests() {
  const desktop = useIsDesktop();
  const reduce = useReducedMotion();
  const horizontal = desktop && !reduce;

  const wrapRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);

  useLayoutEffect(() => {
    if (!horizontal || !trackRef.current) return;
    const el = trackRef.current;
    const measure = () => setDistance(Math.max(0, el.scrollWidth - window.innerWidth));
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [horizontal]);

  const { scrollYProgress } = useScroll({ target: wrapRef, offset: ["start start", "end end"] });
  const smooth = useSpring(scrollYProgress, spring.scroll);
  const x = useTransform(smooth, [0, 1], [0, -distance]);
  const bar = useTransform(smooth, [0, 1], [0, 1]);

  const heading = (
    <SectionHeading
      index="05"
      eyebrow="Currently exploring"
      title="What’s on my desk lately."
      emphasis={["desk", "lately"]}
      aside={<p>Topics I keep returning to — where curiosity about software, data, and markets overlaps.</p>}
    />
  );

  if (!horizontal) {
    return (
      <section id="interests" aria-label="Current interests" className="py-28 sm:py-36">
        <Container>
          {heading}
          <motion.div
            variants={stagger(0.08)}
            initial="hidden"
            whileInView="visible"
            viewport={inViewEarly}
            className="mt-16 grid gap-4 sm:grid-cols-2"
          >
            {interests.map((it, i) => (
              <motion.div key={it.title} variants={fadeUp} className="min-h-[24rem]">
                <Panel item={it} i={i} />
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </section>
    );
  }

  return (
    <section id="interests" aria-label="Current interests" className="pt-44">
      <Container>{heading}</Container>
      <div ref={wrapRef} style={{ height: `calc(100svh + ${distance}px)` }} className="relative mt-24">
        <div className="sticky top-0 flex h-svh flex-col justify-center overflow-hidden">
          <motion.div ref={trackRef} style={{ x }} className="flex w-max gap-5 px-12 will-change-transform">
            {interests.map((it, i) => (
              <div key={it.title} className="h-[68svh] max-h-[640px] w-[min(34rem,36vw)] shrink-0">
                <Panel item={it} i={i} />
              </div>
            ))}
            <div className="flex h-[68svh] max-h-[640px] w-[22vw] shrink-0 flex-col justify-end pb-2">
              <p className="serif-italic text-4xl text-mute">…and whatever comes next.</p>
            </div>
          </motion.div>
          <Container className="mt-10">
            <div className="flex items-center gap-6">
              <span className="label text-dim">Scroll</span>
              <div className="h-px flex-1 bg-line">
                <motion.div style={{ scaleX: bar }} className="h-px origin-left bg-paper" />
              </div>
              <span className="label text-dim">{String(interests.length).padStart(2, "0")}</span>
            </div>
          </Container>
        </div>
      </div>
    </section>
  );
}
