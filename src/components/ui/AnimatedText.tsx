import { motion, type Variants } from "motion/react";
import type { ElementType } from "react";
import { ease, inView } from "@/components/animations/variants";
import { cn } from "@/lib/utils";

interface AnimatedTextProps {
  text: string;
  as?: ElementType;
  className?: string;
  /** Split granularity. Characters suit short display words; words suit sentences. */
  by?: "word" | "char";
  delay?: number;
  stagger?: number;
  /** "view" reveals when scrolled into view; "mount" reveals immediately. */
  trigger?: "view" | "mount";
  /** Extra classes for each masked segment (e.g. serif-italic on one word). */
  segmentClassName?: (segment: string, index: number) => string | undefined;
}

const segment: Variants = {
  hidden: { y: "105%", rotate: 4 },
  visible: { y: "0%", rotate: 0, transition: { duration: 1.1, ease: ease.expo } },
};

/**
 * Masked text reveal. Each segment slides up from behind an overflow mask.
 * The full string is exposed to assistive tech once via aria-label, and the
 * split spans are hidden from it so screen readers don't read letter by letter.
 */
export function AnimatedText({
  text,
  as: Tag = "span",
  className,
  by = "word",
  delay = 0,
  stagger = by === "char" ? 0.035 : 0.06,
  trigger = "view",
  segmentClassName,
}: AnimatedTextProps) {
  const words = text.split(" ");
  const triggerProps =
    trigger === "view"
      ? { initial: "hidden", whileInView: "visible", viewport: inView }
      : { initial: "hidden", animate: "visible" };

  let charIndex = 0;

  return (
    <Tag className={className} aria-label={text}>
      <motion.span
        aria-hidden
        className="inline"
        variants={{ hidden: {}, visible: { transition: { staggerChildren: stagger, delayChildren: delay } } }}
        {...triggerProps}
      >
        {words.map((word, wi) => (
          <span key={`${word}-${wi}`} className="inline-block whitespace-nowrap">
            {by === "word" ? (
              <span className="-mb-[0.12em] inline-block overflow-hidden pb-[0.12em] align-bottom">
                <motion.span variants={segment} className={cn("inline-block origin-bottom-left", segmentClassName?.(word, wi))}>
                  {word}
                </motion.span>
              </span>
            ) : (
              word.split("").map((char) => {
                const i = charIndex++;
                return (
                  <span key={i} className="-mb-[0.12em] inline-block overflow-hidden pb-[0.12em] align-bottom">
                    <motion.span variants={segment} className={cn("inline-block origin-bottom-left", segmentClassName?.(char, i))}>
                      {char}
                    </motion.span>
                  </span>
                );
              })
            )}
            {wi < words.length - 1 && <span className="inline-block">&nbsp;</span>}
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}
