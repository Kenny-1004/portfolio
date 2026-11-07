import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { ArrowDown } from "lucide-react";
import { useMemo, useRef, type PointerEvent } from "react";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { ease, fadeUp, spring, stagger } from "@/components/animations/variants";
import { site } from "@/data/site";
import { useFinePointer } from "@/hooks/useMediaQuery";
import { useLocalTime } from "@/hooks/useLocalTime";
import { scrollToId } from "@/lib/utils";

interface HeroProps {
  /** Becomes true once the preloader has lifted, triggering the entrance. */
  ready: boolean;
}

const disciplines = ["Interface", "Server", "Data", "Intelligence"];

/** Deterministic random walk — a quiet nod to price action, drawn behind the name. */
function useSignalPath(points = 64, seed = 7) {
  return useMemo(() => {
    let s = seed;
    const rand = () => ((s = (s * 16807) % 2147483647) - 1) / 2147483646;
    let y = 260;
    const step = 1200 / (points - 1);
    const coords: Array<[number, number]> = [];
    for (let i = 0; i < points; i++) {
      // Gentle upward drift with noise.
      y += (rand() - 0.56) * 34;
      y = Math.max(60, Math.min(340, y));
      coords.push([i * step, y]);
    }
    const d = coords.map(([x, yy], i) => `${i ? "L" : "M"}${x.toFixed(1)} ${yy.toFixed(1)}`).join(" ");
    return { d, end: coords[coords.length - 1] };
  }, [points, seed]);
}

/** A display word whose letters lift and tint individually on hover. */
function HoverWord({ word, className }: { word: string; className?: string }) {
  return (
    <span className={className} aria-hidden>
      {word.split("").map((ch, i) => (
        <motion.span
          key={i}
          className="inline-block"
          whileHover={{ y: "-0.06em", color: "var(--color-accent)" }}
          transition={spring.soft}
        >
          {ch}
        </motion.span>
      ))}
    </span>
  );
}

const nameLine = {
  hidden: { y: "105%" },
  visible: (i: number) => ({
    y: "0%",
    transition: { duration: 1.4, ease: ease.expo, delay: 0.1 + i * 0.12 },
  }),
};

export function Hero({ ready }: HeroProps) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const fine = useFinePointer();
  const time = useLocalTime(site.timezone);
  const signal = useSignalPath();
  const state = ready ? "visible" : "hidden";

  // Scroll-out choreography: the two name lines drift apart and the hero dims.
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const progress = useSpring(scrollYProgress, spring.scroll);
  const lineAX = useTransform(progress, [0, 1], ["0%", reduce ? "0%" : "-18%"]);
  const lineBX = useTransform(progress, [0, 1], ["0%", reduce ? "0%" : "14%"]);
  const fade = useTransform(progress, [0, 0.7], [1, 0]);
  const sink = useTransform(progress, [0, 1], [0, reduce ? 0 : 120]);

  // Pointer spotlight (desktop only).
  const mx = useMotionValue(50);
  const my = useMotionValue(40);
  const sx = useSpring(mx, { stiffness: 60, damping: 20 });
  const sy = useSpring(my, { stiffness: 60, damping: 20 });
  const spotlight = useMotionTemplate`radial-gradient(42rem circle at ${sx}% ${sy}%, rgb(143 168 200 / 0.09), transparent 65%)`;

  const onPointerMove = (e: PointerEvent<HTMLElement>) => {
    if (!fine || reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    mx.set(((e.clientX - r.left) / r.width) * 100);
    my.set(((e.clientY - r.top) / r.height) * 100);
  };

  return (
    <section
      id="top"
      ref={ref}
      onPointerMove={onPointerMove}
      aria-label="Introduction"
      className="relative isolate flex min-h-svh flex-col overflow-hidden pt-20 sm:pt-24"
    >
      {/* ── Background layers ───────────────────────── */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="hairline-grid absolute inset-0 [mask-image:linear-gradient(to_bottom,black_30%,transparent)]" />
        <motion.div className="absolute inset-0" style={{ background: spotlight }} />
        <svg
          viewBox="0 0 1200 400"
          preserveAspectRatio="none"
          className="absolute inset-x-0 top-[30%] h-[42%] w-full [mask-image:linear-gradient(to_right,transparent,black_25%,black_85%,transparent)]"
        >
          <motion.path
            d={signal.d}
            fill="none"
            stroke="var(--color-accent)"
            strokeOpacity={0.3}
            strokeWidth={1}
            vectorEffect="non-scaling-stroke"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: ready ? 1 : 0 }}
            transition={{ duration: 2.8, ease: ease.smooth, delay: 0.4 }}
          />
        </svg>
      </div>

      {/* ── Meta row ────────────────────────────────── */}
      <Container>
        <motion.div
          variants={stagger(0.08, 0.5)}
          initial="hidden"
          animate={state}
          className="grid grid-cols-2 gap-y-3 border-t border-line pt-4 text-mute md:grid-cols-4"
        >
          <motion.span variants={fadeUp} className="label hidden md:block">
            {site.role}
          </motion.span>
          <motion.span variants={fadeUp} className="label flex items-center gap-2">
            <span className="relative flex size-1.5">
              {site.availability.open && (
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400/70" />
              )}
              <span
                className={`relative inline-flex size-1.5 rounded-full ${site.availability.open ? "bg-emerald-400" : "bg-mute"}`}
              />
            </span>
            {site.availability.label}
          </motion.span>
          {site.location && (
            <motion.span variants={fadeUp} className="label hidden md:block">
              {site.location}
            </motion.span>
          )}
          <motion.span variants={fadeUp} className="label justify-self-end tabular-nums">
            {time ? `Local ${time}` : `© ${new Date().getFullYear()}`}
          </motion.span>
        </motion.div>
      </Container>

      {/* ── Name ────────────────────────────────────── */}
      <motion.div style={{ opacity: fade }} className="flex flex-1 flex-col justify-center py-10 sm:py-14">
        <Container>
          <h1 aria-label={`${site.firstName} ${site.lastName}`} className="text-[23vw] leading-[0.82] select-none sm:text-display">
            <motion.span style={{ x: lineAX }} className="block overflow-hidden pb-[0.04em]">
              <motion.span custom={0} variants={nameLine} initial="hidden" animate={state} className="block">
                <HoverWord word={site.firstName} className="font-medium tracking-[-0.065em]" />
                <span aria-hidden className="ml-[0.06em] inline-block size-[0.12em] rounded-full bg-accent align-baseline" />
              </motion.span>
            </motion.span>
            <motion.span style={{ x: lineBX }} className="block overflow-hidden pr-[0.04em] pb-[0.08em] text-right">
              <motion.span custom={1} variants={nameLine} initial="hidden" animate={state} className="block">
                <HoverWord word={site.lastName} className="serif-italic tracking-[-0.03em] text-paper/95" />
              </motion.span>
            </motion.span>
          </h1>
        </Container>
      </motion.div>

      {/* ── Headline, copy, CTAs ────────────────────── */}
      <motion.div style={{ y: sink, opacity: fade }}>
        <Container className="pb-8 sm:pb-10">
          <motion.div
            variants={stagger(0.1, 0.75)}
            initial="hidden"
            animate={state}
            className="grid gap-8 border-t border-line pt-6 lg:grid-cols-12 lg:gap-6 lg:pt-8"
          >
            <motion.p variants={fadeUp} className="max-w-xl text-[clamp(1.6rem,2.7vw,2.75rem)] leading-[1.02] font-medium tracking-[-0.04em] lg:col-span-5">
              {site.headline.lead} <span className="serif-italic text-[1.12em] text-accent">{site.headline.emphasis}</span>{" "}
              {site.headline.tail}
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-col gap-6 lg:col-span-5 lg:col-start-7">
              <p className="max-w-md text-[0.98rem] leading-relaxed text-mute">
                {site.description}
                <span className="mt-2 block text-paper/70">{site.supporting}</span>
              </p>
              <div className="flex flex-wrap gap-3">
                <Button href="#work" onClick={(e) => (e.preventDefault(), scrollToId("work"))}>
                  View Projects
                </Button>
                <Button
                  href="#about"
                  variant="outline"
                  icon={false}
                  onClick={(e) => (e.preventDefault(), scrollToId("about"))}
                >
                  About Me
                </Button>
                <Button href="#contact" variant="ghost" onClick={(e) => (e.preventDefault(), scrollToId("contact"))}>
                  Contact Me
                </Button>
              </div>
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="hidden flex-col items-end justify-between lg:col-span-1 lg:col-start-12 lg:flex"
            >
              <ul className="space-y-1 text-right">
                {disciplines.map((d) => (
                  <li key={d} className="label text-dim">
                    {d}
                  </li>
                ))}
              </ul>
              <button
                type="button"
                onClick={() => scrollToId("about")}
                aria-label="Scroll to About"
                data-cursor="hover"
                className="group grid size-12 place-items-center rounded-full border border-line transition-colors duration-500 hover:border-paper/50"
              >
                <motion.span
                  animate={reduce ? undefined : { y: [0, 5, 0] }}
                  transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                >
                  <ArrowDown size={16} strokeWidth={1.5} />
                </motion.span>
              </button>
            </motion.div>
          </motion.div>
        </Container>
      </motion.div>
    </section>
  );
}
