import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useRef } from "react";
import { cn } from "@/lib/utils";

interface ScrollRevealTextProps {
  text: string;
  className?: string;
  /** Words (punctuation-insensitive) to set in the italic serif. */
  emphasis?: string[];
}

function Word({
  children,
  progress,
  range,
  serif,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
  serif: boolean;
}) {
  const opacity = useTransform(progress, range, [0.14, 1]);
  return (
    <motion.span style={{ opacity }} className={cn("inline-block", serif && "serif-italic text-accent")}>
      {children}
    </motion.span>
  );
}

/**
 * Paragraph whose words brighten one by one as it scrolls through the viewport —
 * reading pace becomes scroll pace. Pure opacity, so it's cheap and never reflows.
 */
export function ScrollRevealText({ text, className, emphasis = [] }: ScrollRevealTextProps) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.45"] });
  const words = text.split(" ");

  return (
    <p ref={ref} className={className}>
      {words.map((w, i) => {
        const start = i / words.length;
        return (
          <span key={i}>
            <Word
              progress={scrollYProgress}
              range={[start, start + 1 / words.length]}
              serif={emphasis.includes(w.replace(/[.,’']/g, ""))}
            >
              {w}
            </Word>{" "}
          </span>
        );
      })}
    </p>
  );
}
