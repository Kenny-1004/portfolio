import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import { useRef, type PointerEvent, type ReactNode } from "react";
import { spring } from "@/components/animations/variants";
import { useFinePointer } from "@/hooks/useMediaQuery";

interface MagneticProps {
  children: ReactNode;
  /** 0–1: how far the element follows the pointer relative to its offset. */
  strength?: number;
  className?: string;
}

/**
 * Pulls its child toward the pointer while hovered, then springs back.
 * Inert on touch devices and with reduced motion.
 */
export function Magnetic({ children, strength = 0.35, className }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const fine = useFinePointer();
  const reduce = useReducedMotion();
  const x = useSpring(useMotionValue(0), spring.soft);
  const y = useSpring(useMotionValue(0), spring.soft);
  const enabled = fine && !reduce;

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (!enabled || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={reset}
      style={enabled ? { x, y } : undefined}
      className={className ?? "inline-block"}
    >
      {children}
    </motion.div>
  );
}
