import { motion, useScroll, useSpring, useTransform, type MotionValue } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { useRef } from "react";
import { spring } from "@/components/animations/variants";
import { useIsDesktop } from "@/hooks/useMediaQuery";
import { cn } from "@/lib/utils";
import type { Project } from "@/types";
import { CoverCaption, ProjectCover } from "./ProjectCover";

interface ProjectCardProps {
  project: Project;
  i: number;
  total: number;
  /** Scroll progress of the whole project list, drives the stacking scale-down. */
  listProgress: MotionValue<number>;
  onOpen: (p: Project) => void;
}

export function StatusPill({ status }: { status: Project["status"] }) {
  const dot = status === "Live" ? "bg-emerald-400" : status === "In development" ? "bg-amber-300" : "bg-mute";
  return (
    <span className="label inline-flex items-center gap-2 rounded-full border border-line px-3 py-1.5 text-mute">
      <span className={cn("size-1.5 rounded-full", dot)} />
      {status}
    </span>
  );
}

/**
 * A large, editorial project card.
 * Desktop: cards are sticky and stack — each one gently recedes (scale + dim)
 * as the next slides over it. Mobile: a simple vertical sequence.
 */
export function ProjectCard({ project, i, total, listProgress, onOpen }: ProjectCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const desktop = useIsDesktop();
  const reversed = i % 2 === 1;

  // Inner image parallax as the card crosses the viewport.
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imgY = useSpring(useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]), spring.scroll);

  // Stacking: the card scales down once later cards begin to cover it.
  const targetScale = 1 - (total - i - 1) * 0.035;
  const scale = useTransform(listProgress, [i / total, 1], [1, targetScale]);
  const dim = useTransform(listProgress, [i / total, Math.min(1, (i + 1) / total)], [0, i === total - 1 ? 0 : 0.45]);

  return (
    <div ref={ref} className="lg:sticky lg:top-24 lg:h-[calc(100svh-7rem)] lg:min-h-[560px]" style={{ zIndex: i + 1 }}>
      <motion.article
        style={desktop ? { scale, transformOrigin: "50% 0%" } : undefined}
        className="group relative h-full overflow-hidden border border-line bg-ink transition-colors duration-700 hover:bg-ink-2"
      >
        <motion.div aria-hidden style={desktop ? { opacity: dim } : undefined} className="pointer-events-none absolute inset-0 z-20 bg-ink opacity-0" />

        <div className={cn("grid h-full lg:grid-cols-12", reversed && "lg:[direction:rtl]")}>
          {/* ── Cover ── */}
          <button
            type="button"
            onClick={() => onOpen(project)}
            data-cursor="label"
            data-cursor-label="View"
            aria-label={`Open details for ${project.title}`}
            className="relative aspect-[4/3] overflow-hidden border-b border-line [direction:ltr] lg:col-span-7 lg:aspect-auto lg:h-full lg:border-b-0"
          >
            <motion.div
              style={{ y: imgY }}
              className="absolute -inset-y-[9%] inset-x-0 transition-transform duration-[1.4s] ease-[var(--ease-expo)] group-hover:scale-[1.045]"
            >
              <ProjectCover project={project} labels={false} />
            </motion.div>
            {!project.image && <CoverCaption />}
          </button>

          {/* ── Information ── */}
          <div className="flex flex-col justify-between gap-10 p-5 [direction:ltr] sm:p-8 lg:col-span-5 lg:p-10 xl:p-12">
            <div className="flex items-start justify-between gap-4">
              <span className="font-serif text-[clamp(3.5rem,6vw,6.5rem)] leading-[0.8] text-paper/15 italic transition-colors duration-700 group-hover:text-accent/60">
                {project.index}
              </span>
              <StatusPill status={project.status} />
            </div>

            <div>
              <p className="label mb-4 text-accent">{project.category}</p>
              <h3 className="text-[clamp(2rem,3.4vw,3.6rem)] leading-[0.95] font-medium tracking-[-0.045em]">
                <button
                  type="button"
                  onClick={() => onOpen(project)}
                  className="text-left transition-transform duration-700 ease-[var(--ease-expo)] group-hover:translate-x-1.5"
                  data-cursor="hover"
                >
                  {project.title}
                </button>
              </h3>
              <p className="mt-5 max-w-md text-[0.96rem] leading-relaxed text-mute">{project.summary}</p>

              <ul className="mt-7 flex flex-wrap gap-2" aria-label="Technologies">
                {project.stack.map((t) => (
                  <li key={t} className="label rounded-full border border-line px-3 py-1.5 text-paper/70">
                    {t}
                  </li>
                ))}
              </ul>
            </div>

            <button
              type="button"
              onClick={() => onOpen(project)}
              data-cursor="hover"
              className="flex items-center justify-between border-t border-line pt-5 text-left"
            >
              <span className="text-sm tracking-tight">View project details</span>
              <span className="relative grid size-11 place-items-center overflow-hidden rounded-full border border-line transition-colors duration-500 group-hover:border-paper group-hover:bg-paper group-hover:text-ink">
                <motion.span className="block transition-transform duration-700 ease-[var(--ease-expo)] group-hover:translate-x-6 group-hover:-translate-y-6">
                  <ArrowUpRight size={18} strokeWidth={1.5} />
                </motion.span>
                <span className="absolute -translate-x-6 translate-y-6 transition-transform duration-700 ease-[var(--ease-expo)] group-hover:translate-x-0 group-hover:translate-y-0">
                  <ArrowUpRight size={18} strokeWidth={1.5} />
                </span>
              </span>
            </button>
          </div>
        </div>
      </motion.article>
    </div>
  );
}

