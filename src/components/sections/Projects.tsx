import { useScroll } from "motion/react";
import { useCallback, useRef, useState } from "react";
import { Container } from "@/components/layout/Container";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { ProjectModal } from "@/components/ui/ProjectModal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { projects } from "@/data/projects";
import type { Project } from "@/types";

export function Projects() {
  const listRef = useRef<HTMLDivElement>(null);
  const [selected, setSelected] = useState<Project | null>(null);
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start start", "end end"] });
  const close = useCallback(() => setSelected(null), []);

  return (
    <section id="work" aria-label="Featured projects" className="relative py-28 sm:py-36 lg:py-44">
      <Container>
        <SectionHeading
          index="03"
          eyebrow="Selected work"
          title="Things I’m building right now."
          emphasis={["building"]}
          aside={
            <p>
              Fintech, intelligent systems, and full-stack engineering. Each project is labelled with its current status —
              open one to see what it’s about.
            </p>
          }
        />

        <div ref={listRef} className="mt-16 flex flex-col gap-6 lg:mt-24 lg:gap-[12vh]">
          {projects.map((p, i) => (
            <ProjectCard key={p.slug} project={p} i={i} total={projects.length} listProgress={scrollYProgress} onOpen={setSelected} />
          ))}
        </div>
      </Container>

      <ProjectModal project={selected} onClose={close} />
    </section>
  );
}
