import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "motion/react";
import { useRef } from "react";

interface MarqueeProps {
  items: string[];
  /** Base speed in % of one copy-width per second. */
  speed?: number;
}

const wrap = (min: number, max: number, v: number) => {
  const range = max - min;
  return ((((v - min) % range) + range) % range) + min;
};

/**
 * Infinite marquee whose speed and direction respond to scroll velocity —
 * scroll faster and it accelerates; scroll up and it reverses.
 * Becomes a static row with reduced motion.
 */
export function Marquee({ items, speed = 2.2 }: MarqueeProps) {
  const reduce = useReducedMotion();
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const velocity = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 400 });
  const factor = useTransform(velocity, [-1000, 0, 1000], [-4, 0, 4], { clamp: false });
  const direction = useRef(1);

  // Four copies; we translate across one copy-width (25%) then wrap.
  const x = useTransform(baseX, (v) => `${wrap(-25, 0, v)}%`);

  useAnimationFrame((_, delta) => {
    if (reduce) return;
    let move = direction.current * speed * (delta / 1000);
    const f = factor.get();
    if (f < 0) direction.current = -1;
    else if (f > 0) direction.current = 1;
    move += direction.current * move * f;
    baseX.set(baseX.get() - Math.abs(move) * direction.current);
  });

  const row = (
    <>
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-8 pr-8 sm:gap-12 sm:pr-12">
          <span className={i % 2 ? "serif-italic text-mute" : "font-medium tracking-[-0.04em]"}>{item}</span>
          <span aria-hidden className="size-2 rotate-45 border border-accent/70 sm:size-2.5" />
        </span>
      ))}
    </>
  );

  return (
    <div className="relative overflow-hidden border-y border-line py-6 sm:py-8" aria-label={items.join(", ")} role="marquee">
      <motion.div
        aria-hidden
        style={reduce ? undefined : { x }}
        className="flex w-max text-[clamp(2.2rem,5.5vw,5rem)] leading-none whitespace-nowrap"
      >
        <div className="flex">{row}</div>
        <div className="flex">{row}</div>
        <div className="flex">{row}</div>
        <div className="flex">{row}</div>
      </motion.div>
    </div>
  );
}
