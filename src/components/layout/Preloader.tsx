import { animate, motion, useMotionValue, useTransform } from "motion/react";
import { useEffect } from "react";
import { ease } from "@/components/animations/variants";
import { site } from "@/data/site";

interface PreloaderProps {
  onComplete: () => void;
}

/**
 * Opening curtain: a counter runs 0 → 100 beside the monogram, then the panel
 * lifts away. Kept short (~1.8s) so it frames the entrance rather than delaying it.
 * Rendered inside AnimatePresence by App; skipped entirely for reduced motion.
 */
export function Preloader({ onComplete }: PreloaderProps) {
  const progress = useMotionValue(0);
  const rounded = useTransform(progress, (v) => String(Math.round(v)).padStart(3, "0"));
  const barScale = useTransform(progress, [0, 100], [0, 1]);

  useEffect(() => {
    const controls = animate(progress, 100, {
      duration: 1.5,
      ease: [0.65, 0, 0.35, 1],
      onComplete: () => window.setTimeout(onComplete, 180),
    });
    return () => controls.stop();
  }, [progress, onComplete]);

  return (
    <motion.div
      role="status"
      aria-label="Loading"
      exit={{ clipPath: "inset(0% 0% 100% 0%)" }}
      transition={{ duration: 1, ease: ease.quart }}
      className="fixed inset-0 z-[80] flex flex-col justify-between bg-ink-2 px-4 py-6 sm:px-8 lg:px-12"
      style={{ clipPath: "inset(0% 0% 0% 0%)" }}
    >
      <div className="flex justify-between text-mute">
        <span className="label">Portfolio</span>
        <span className="label">{new Date().getFullYear()}</span>
      </div>

      <div className="flex items-end justify-between gap-6">
        <div className="overflow-hidden">
          <motion.p
            initial={{ y: "100%" }}
            animate={{ y: "0%" }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.9, ease: ease.expo }}
            className="text-h2 tight font-medium"
          >
            {site.firstName}
            <span className="serif-italic text-mute"> {site.lastName}</span>
          </motion.p>
        </div>
        <motion.span className="font-mono text-h2 leading-none tabular-nums text-paper/90">{rounded}</motion.span>
      </div>

      <motion.div style={{ scaleX: barScale }} className="absolute inset-x-0 bottom-0 h-px origin-left bg-accent" />
    </motion.div>
  );
}
