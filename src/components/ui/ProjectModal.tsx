import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, X } from "lucide-react";
import { useEffect, useRef } from "react";
import { ease, fadeUp, stagger } from "@/components/animations/variants";
import { Icon } from "@/components/ui/Icon";
import { isRealLink } from "@/lib/utils";
import type { Project } from "@/types";
import { StatusPill } from "./ProjectCard";
import { ProjectCover } from "./ProjectCover";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

function LinkRow({ label, href, brand }: { label: string; href: string; brand?: boolean }) {
  const real = isRealLink(href);
  const content = (
    <>
      <span className="flex items-center gap-3">
        {brand ? <Icon icon={{ kind: "brand", name: "github" }} size={18} /> : <ArrowUpRight size={18} strokeWidth={1.5} />}
        <span>{label}</span>
      </span>
      <span className="label text-mute">{real ? "Open ↗" : "Coming soon"}</span>
    </>
  );
  const cls = "flex items-center justify-between border-b border-line py-4 text-sm transition-colors";
  return real ? (
    <a href={href} target="_blank" rel="noreferrer noopener" className={`${cls} hover:text-accent`} data-cursor="hover">
      {content}
    </a>
  ) : (
    <span className={`${cls} cursor-not-allowed text-dim`} aria-disabled="true">
      {content}
    </span>
  );
}

/**
 * Project detail sheet. Slides up over the page, traps focus loosely
 * (focus moves in on open and returns to the trigger on close),
 * closes on Escape or backdrop click, and locks background scroll.
 */
export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!project) return;
    lastFocus.current = document.activeElement as HTMLElement;
    document.documentElement.style.overflow = "hidden";
    const t = window.setTimeout(() => closeRef.current?.focus(), 50);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      window.clearTimeout(t);
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      lastFocus.current?.focus({ preventScroll: true });
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div key="modal" className="fixed inset-0 z-[65]" initial="hidden" animate="visible" exit="hidden">
          <motion.div
            variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
            transition={{ duration: 0.5 }}
            onClick={onClose}
            className="absolute inset-0 bg-ink/80 backdrop-blur-sm"
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-title"
            variants={{ hidden: { y: "100%" }, visible: { y: "0%" } }}
            transition={{ duration: 0.9, ease: ease.quart }}
            className="absolute inset-x-0 bottom-0 top-6 overflow-y-auto overscroll-contain border-t border-line bg-ink sm:top-10 lg:inset-x-6 lg:rounded-t-2xl lg:border-x"
          >
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-line bg-ink/85 px-4 py-4 backdrop-blur-md sm:px-8">
              <span className="label text-mute">
                Project {project.index} — {project.category}
              </span>
              <button
                ref={closeRef}
                type="button"
                onClick={onClose}
                data-cursor="hover"
                aria-label="Close project details"
                className="group grid size-10 place-items-center rounded-full border border-line transition-colors hover:bg-paper hover:text-ink"
              >
                <X size={16} strokeWidth={1.5} className="transition-transform duration-500 group-hover:rotate-90" />
              </button>
            </div>

            <motion.div
              variants={stagger(0.08, 0.35)}
              className="mx-auto grid max-w-[1400px] gap-12 px-4 py-10 sm:px-8 sm:py-14 lg:grid-cols-12 lg:gap-10"
            >
              <motion.div variants={fadeUp} className="lg:col-span-12">
                <h2 id="project-title" className="text-[clamp(2.4rem,6vw,6rem)] leading-[0.9] font-medium tracking-[-0.05em]">
                  {project.title}
                </h2>
              </motion.div>

              <motion.div variants={fadeUp} className="overflow-hidden border border-line lg:col-span-12">
                <div className="aspect-[16/9] max-h-[70vh] w-full">
                  <ProjectCover project={project} />
                </div>
              </motion.div>

              <motion.div variants={fadeUp} className="space-y-5 text-[1.05rem] leading-relaxed text-paper/80 lg:col-span-6">
                <StatusPill status={project.status} />
                <p className="text-[clamp(1.25rem,1.8vw,1.6rem)] leading-snug tracking-[-0.02em] text-paper">{project.summary}</p>
                {project.details.map((d, i) => (
                  <p key={i} className="text-mute">
                    {d}
                  </p>
                ))}
              </motion.div>

              <motion.div variants={fadeUp} className="space-y-10 lg:col-span-5 lg:col-start-8">
                <div>
                  <p className="label mb-4 text-dim">Focus</p>
                  <ul className="border-t border-line">
                    {project.highlights.map((h, i) => (
                      <li key={h} className="flex gap-5 border-b border-line py-3.5 text-sm">
                        <span className="label pt-0.5 text-dim">{String(i + 1).padStart(2, "0")}</span>
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="label mb-4 text-dim">Stack</p>
                  <ul className="flex flex-wrap gap-2">
                    {project.stack.map((t) => (
                      <li key={t} className="label rounded-full border border-line px-3 py-1.5 text-paper/75">
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="border-t border-line">
                  <LinkRow label="Source code" href={project.github} brand />
                  <LinkRow label="Live demo" href={project.live} />
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
