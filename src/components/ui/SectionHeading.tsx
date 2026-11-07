import { motion } from "motion/react";
import type { ReactNode } from "react";
import { drawLine, fadeUp, inView, stagger } from "@/components/animations/variants";
import { cn } from "@/lib/utils";
import { AnimatedText } from "./AnimatedText";

interface SectionHeadingProps {
  index: string;
  eyebrow: string;
  title: string;
  /** Word(s) in the title rendered in the italic serif for contrast. */
  emphasis?: string[];
  aside?: ReactNode;
  className?: string;
}

/**
 * Editorial section header: a hairline rule, an index + eyebrow row,
 * then a large masked title with optional serif-italic emphasis words.
 */
export function SectionHeading({ index, eyebrow, title, emphasis = [], aside, className }: SectionHeadingProps) {
  return (
    <header className={cn("relative", className)}>
      <motion.div
        variants={drawLine}
        initial="hidden"
        whileInView="visible"
        viewport={inView}
        className="h-px origin-left bg-line"
      />
      <motion.div
        variants={stagger(0.08)}
        initial="hidden"
        whileInView="visible"
        viewport={inView}
        className="mt-5 flex items-center justify-between text-mute"
      >
        <motion.span variants={fadeUp} className="label">
          ({index})
        </motion.span>
        <motion.span variants={fadeUp} className="label">
          {eyebrow}
        </motion.span>
      </motion.div>

      <div className="mt-14 grid gap-10 md:mt-20 lg:grid-cols-12 lg:items-end">
        <AnimatedText
          as="h2"
          text={title}
          className="text-h1 tight font-medium lg:col-span-8"
          segmentClassName={(w) =>
            emphasis.includes(w.replace(/[.,]/g, "")) ? "serif-italic tracking-[-0.02em] text-paper/90" : undefined
          }
        />
        {aside && (
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={inView}
            className="max-w-md text-mute lg:col-span-4 lg:justify-self-end"
          >
            {aside}
          </motion.div>
        )}
      </div>
    </header>
  );
}
