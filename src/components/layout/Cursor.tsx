import { AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import { useEffect, useState } from "react";
import { ease } from "@/components/animations/variants";
import { useFinePointer } from "@/hooks/useMediaQuery";

type CursorState = { mode: "default" | "hover" | "label"; label?: string };

/**
 * Desktop-only custom cursor: a precise dot plus a trailing ring.
 * Elements opt in to states via data attributes:
 *   data-cursor="hover"               → ring expands
 *   data-cursor="label" data-cursor-label="View" → ring becomes a labelled disc
 * Disabled on touch devices and when the user prefers reduced motion,
 * in which case the native cursor is left untouched.
 */
export function Cursor() {
  const fine = useFinePointer();
  const reduce = useReducedMotion();
  const enabled = fine && !reduce;

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 260, damping: 28, mass: 0.5 });
  const ringY = useSpring(y, { stiffness: 260, damping: 28, mass: 0.5 });

  const [state, setState] = useState<CursorState>({ mode: "default" });
  const [visible, setVisible] = useState(false);
  const [pressed, setPressed] = useState(false);

  useEffect(() => {
    if (!enabled) return;
    document.documentElement.classList.add("has-custom-cursor");

    const onMove = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
      const target = (e.target as Element | null)?.closest<HTMLElement>("[data-cursor], a, button");
      if (!target) return setState((s) => (s.mode === "default" ? s : { mode: "default" }));
      const mode = target.dataset.cursor;
      if (mode === "label") setState({ mode: "label", label: target.dataset.cursorLabel ?? "View" });
      else setState((s) => (s.mode === "hover" ? s : { mode: "hover" }));
    };
    const onLeave = () => setVisible(false);
    const onDown = () => setPressed(true);
    const onUp = () => setPressed(false);

    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    return () => {
      document.documentElement.classList.remove("has-custom-cursor");
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  const size = state.mode === "label" ? 96 : state.mode === "hover" ? 56 : 32;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[70]">
      <motion.div
        style={{ x: ringX, y: ringY }}
        animate={{ opacity: visible ? 1 : 0 }}
        className="absolute top-0 left-0"
      >
        <motion.div
          animate={{
            width: size,
            height: size,
            scale: pressed ? 0.85 : 1,
            backgroundColor: state.mode === "label" ? "rgba(245,245,245,1)" : "rgba(245,245,245,0)",
            borderColor: state.mode === "default" ? "rgba(245,245,245,0.35)" : "rgba(245,245,245,0.8)",
          }}
          transition={{ duration: 0.45, ease: ease.expo }}
          className="grid -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border mix-blend-difference"
          style={{ mixBlendMode: state.mode === "label" ? "normal" : "difference" }}
        >
          <AnimatePresence>
            {state.mode === "label" && (
              <motion.span
                key={state.label}
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.6 }}
                transition={{ duration: 0.3, ease: ease.expo }}
                className="label text-ink"
              >
                {state.label}
              </motion.span>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
      <motion.div
        style={{ x, y }}
        animate={{ opacity: visible && state.mode !== "label" ? 1 : 0 }}
        className="absolute top-0 left-0 size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-paper"
      />
    </div>
  );
}
