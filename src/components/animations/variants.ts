import type { Transition, Variants } from "motion/react";

/* ─────────────────────────────────────────────
   Easing curves
   expo-out: fast start, long graceful settle — the "expensive" feel.
   quart-in-out: symmetric, used for curtains and wipes.
   ───────────────────────────────────────────── */
export const ease = {
  expo: [0.16, 1, 0.3, 1],
  quart: [0.76, 0, 0.24, 1],
  smooth: [0.43, 0.13, 0.23, 0.96],
} as const satisfies Record<string, [number, number, number, number]>;

/* ─────────────────────────────────────────────
   Springs
   ───────────────────────────────────────────── */
export const spring = {
  /** Cursor-follow, magnetic pulls: light and responsive. */
  soft: { type: "spring", stiffness: 160, damping: 18, mass: 0.4 },
  /** Layout indicators (nav pill, active tab). */
  snappy: { type: "spring", stiffness: 420, damping: 36 },
  /** Scroll-linked smoothing for parallax values. */
  scroll: { stiffness: 90, damping: 24, mass: 0.6 },
} as const satisfies Record<string, Transition | object>;

export const duration = { fast: 0.35, base: 0.7, slow: 1.1, cinematic: 1.4 } as const;

/* ─────────────────────────────────────────────
   Variants
   ───────────────────────────────────────────── */

/** Parent that staggers its children. */
export const stagger = (staggerChildren = 0.08, delayChildren = 0): Variants => ({
  hidden: {},
  visible: { transition: { staggerChildren, delayChildren } },
});

/** Soft rise + fade. The workhorse for paragraphs and meta rows. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: duration.base, ease: ease.expo } },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: duration.base, ease: ease.smooth } },
};

/** Line / word that slides up from behind an overflow-hidden mask. */
export const maskUp: Variants = {
  hidden: { y: "110%" },
  visible: { y: "0%", transition: { duration: duration.slow, ease: ease.expo } },
};

/** Horizontal rule that draws from left to right. */
export const drawLine: Variants = {
  hidden: { scaleX: 0 },
  visible: { scaleX: 1, transition: { duration: duration.cinematic, ease: ease.expo } },
};

/** Image reveal: a clip-path wipe from the bottom with a slight settle-in scale. */
export const clipReveal: Variants = {
  hidden: { clipPath: "inset(100% 0% 0% 0%)", scale: 1.12 },
  visible: {
    clipPath: "inset(0% 0% 0% 0%)",
    scale: 1,
    transition: { duration: duration.cinematic, ease: ease.quart },
  },
};

/** Shared viewport config for whileInView triggers. */
export const inView = { once: true, amount: 0.3 } as const;
export const inViewEarly = { once: true, amount: 0.12 } as const;
