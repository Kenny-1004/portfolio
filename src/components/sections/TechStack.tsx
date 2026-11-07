import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { Container } from "@/components/layout/Container";
import { Icon } from "@/components/ui/Icon";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ease, fadeUp, inViewEarly, spring, stagger } from "@/components/animations/variants";
import { techCategories } from "@/data/technologies";
import { cn } from "@/lib/utils";
import type { TechCategory, Technology } from "@/types";

const total = techCategories.reduce((n, c) => n + c.items.length, 0);

/* ── Data-model glyphs: make the two databases visually distinct at a glance ── */

function RelationalGlyph({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 120 64" className="h-20 w-auto sm:h-24" aria-hidden>
      {[0, 1, 2, 3].map((r) => (
        <g key={r}>
          {[0, 1, 2].map((c) => (
            <rect
              key={c}
              x={c * 40 + 0.5}
              y={r * 16 + 0.5}
              width={39}
              height={15}
              fill={r === 0 ? color : "transparent"}
              fillOpacity={r === 0 ? 0.22 : 0}
              stroke="currentColor"
              strokeOpacity={0.35}
            />
          ))}
        </g>
      ))}
    </svg>
  );
}

function DocumentGlyph({ color }: { color: string }) {
  return (
    <pre aria-hidden className="font-mono text-[0.78rem] leading-[1.5] text-mute sm:text-[0.85rem]">
      <span style={{ color }}>{"{"}</span>
      {"\n  _id: ObjectId,\n  tags: [ … ],\n  meta: { … }\n"}
      <span style={{ color }}>{"}"}</span>
    </pre>
  );
}

/* ── Tile ─────────────────────────────────────────────────────────────── */

function TechTile({ tech, index, wide }: { tech: Technology; index: number; wide: boolean }) {
  const isPg = tech.name === "PostgreSQL";
  const isMongo = tech.name === "MongoDB";

  return (
    <motion.li
      variants={fadeUp}
      className={cn(
        "group relative flex flex-col justify-between overflow-hidden border-r border-b border-line bg-ink p-5 sm:p-6",
        wide ? "min-h-64 sm:min-h-80" : "min-h-44 sm:min-h-52",
      )}
      style={{ ["--brand" as string]: tech.color }}
    >
      {/* Brand-tinted wash that rises on hover */}
      <span
        aria-hidden
        className="absolute inset-0 translate-y-full bg-[linear-gradient(to_top,color-mix(in_oklab,var(--brand)_14%,transparent),transparent_70%)] transition-transform duration-700 ease-[var(--ease-expo)] group-hover:translate-y-0"
      />
      <span
        aria-hidden
        className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-[var(--brand)] transition-transform duration-700 ease-[var(--ease-expo)] group-hover:scale-x-100"
      />

      <div className="relative flex items-start justify-between">
        <span
          className={cn(
            "transition-colors duration-500 group-hover:text-[var(--brand)]",
            // Databases wear their brand colour at rest so they're distinguishable at a glance.
            wide ? "text-[var(--brand)]" : "text-paper/70",
          )}
        >
          <Icon icon={tech.icon} size={wide ? 36 : 28} />
        </span>
        <span className="label text-dim">{String(index + 1).padStart(2, "0")}</span>
      </div>

      {wide && (
        <div className="relative my-6 text-paper/80">
          {isPg && <RelationalGlyph color={tech.color} />}
          {isMongo && <DocumentGlyph color={tech.color} />}
        </div>
      )}

      <div className="relative">
        <h4 className={cn("font-medium tracking-[-0.03em]", wide ? "text-3xl sm:text-4xl" : "text-lg sm:text-xl")}>
          {tech.name}
        </h4>
        {wide && (
          <p className="label mt-3" style={{ color: tech.color }}>
            {isPg ? "Relational model" : isMongo ? "Document model" : tech.name}
          </p>
        )}
        <p
          className={cn(
            "mt-2 text-[0.82rem] leading-snug text-mute",
            // On hover devices the description slides in; on touch it is always visible.
            !wide &&
              "[@media(hover:hover)]:translate-y-2 [@media(hover:hover)]:opacity-0 [@media(hover:hover)]:transition-all [@media(hover:hover)]:duration-500 [@media(hover:hover)]:group-hover:translate-y-0 [@media(hover:hover)]:group-hover:opacity-100",
          )}
        >
          {tech.description}
        </p>
      </div>
    </motion.li>
  );
}

/* ── Category panel ───────────────────────────────────────────────────── */

function CategoryPanel({ category }: { category: TechCategory }) {
  const wide = category.items.length <= 2;
  return (
    <motion.div
      key={category.id}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.55, ease: ease.expo }}
    >
      <div className="mb-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
        <p className="max-w-md text-mute">{category.summary}</p>
        <p className="label shrink-0 text-dim">
          {category.items.length} {category.items.length === 1 ? "tool" : "tools"} · {category.layer} layer
        </p>
      </div>
      <motion.ul
        variants={stagger(0.05)}
        initial="hidden"
        animate="visible"
        className={cn(
          "grid border-t border-l border-line",
          wide ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-2 lg:grid-cols-3",
        )}
      >
        {category.items.map((t, i) => (
          <TechTile key={t.name} tech={t} index={i} wide={wide} />
        ))}
      </motion.ul>
    </motion.div>
  );
}

/* ── Section ──────────────────────────────────────────────────────────── */

export function TechStack() {
  const [activeId, setActiveId] = useState(techCategories[0].id);
  const active = techCategories.find((c) => c.id === activeId) ?? techCategories[0];

  return (
    <section id="stack" aria-label="Technology stack" className="relative bg-ink-2/40 py-28 sm:py-36 lg:py-44">
      <Container>
        <SectionHeading
          index="02"
          eyebrow="Technology"
          title="From interface to infrastructure."
          emphasis={["infrastructure"]}
          aside={
            <p>
              Comfortable across every layer of an application — the screen people touch, the services behind it, and
              the data underneath. {total} tools, four layers.
            </p>
          }
        />

        <div className="mt-16 grid gap-10 lg:mt-24 lg:grid-cols-12 lg:gap-6">
          {/* Layer selector — reads as a stack: interface on top, workflow at the base */}
          <motion.div
            variants={stagger(0.07)}
            initial="hidden"
            whileInView="visible"
            viewport={inViewEarly}
            role="tablist"
            aria-label="Technology categories"
            aria-orientation="vertical"
            className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 sm:-mx-8 sm:px-8 lg:mx-0 lg:flex-col lg:gap-0 lg:overflow-visible lg:px-0 lg:col-span-4"
          >
            {techCategories.map((c) => {
              const isActive = c.id === activeId;
              return (
                <motion.button
                  key={c.id}
                  variants={fadeUp}
                  type="button"
                  role="tab"
                  id={`tab-${c.id}`}
                  aria-selected={isActive}
                  aria-controls="stack-panel"
                  onClick={() => setActiveId(c.id)}
                  onMouseEnter={() => setActiveId(c.id)}
                  onKeyDown={(e) => {
                    const i = techCategories.findIndex((x) => x.id === c.id);
                    const next =
                      e.key === "ArrowDown" || e.key === "ArrowRight"
                        ? techCategories[(i + 1) % techCategories.length]
                        : e.key === "ArrowUp" || e.key === "ArrowLeft"
                          ? techCategories[(i - 1 + techCategories.length) % techCategories.length]
                          : null;
                    if (next) {
                      e.preventDefault();
                      setActiveId(next.id);
                      document.getElementById(`tab-${next.id}`)?.focus();
                    }
                  }}
                  tabIndex={isActive ? 0 : -1}
                  data-cursor="hover"
                  className={cn(
                    "group relative shrink-0 rounded-full border px-4 py-2.5 text-left transition-colors duration-500",
                    "lg:rounded-none lg:border-x-0 lg:border-t-0 lg:border-b lg:px-0 lg:py-7 lg:first:border-t",
                    isActive ? "border-paper/60 text-paper lg:border-line" : "border-line text-mute hover:text-paper",
                  )}
                >
                  {isActive && (
                    <motion.span
                      layoutId="stack-indicator"
                      transition={spring.snappy}
                      className="absolute top-0 left-0 hidden h-full w-px bg-accent lg:block"
                    />
                  )}
                  <span className="flex items-baseline gap-4 transition-transform duration-500 ease-[var(--ease-expo)] lg:group-aria-selected:translate-x-6">
                    <span className="label text-dim">{c.index}</span>
                    <span className="text-sm whitespace-nowrap lg:text-[clamp(1.4rem,2vw,2rem)] lg:tracking-[-0.035em]">
                      {c.title}
                    </span>
                  </span>
                  <span className="label mt-2 hidden pl-[calc(1.5rem+1rem)] text-dim lg:block lg:group-aria-selected:translate-x-6 lg:transition-transform lg:duration-500">
                    {c.layer}
                  </span>
                </motion.button>
              );
            })}
          </motion.div>

          <div
            id="stack-panel"
            role="tabpanel"
            aria-labelledby={`tab-${active.id}`}
            className="min-h-[26rem] lg:col-span-8"
          >
            <AnimatePresence mode="wait">
              <CategoryPanel key={active.id} category={active} />
            </AnimatePresence>
          </div>
        </div>
      </Container>
    </section>
  );
}
