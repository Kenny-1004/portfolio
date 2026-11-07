import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { ScrollRevealText } from "@/components/ui/ScrollRevealText";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { fadeUp, inView, inViewEarly, stagger } from "@/components/animations/variants";
import { fullName, site } from "@/data/site";

const [lead, ...rest] = site.about.paragraphs;

/** A small spec-sheet in place of a profile card — information as typography. */
const facts: Array<[string, string]> = [
  ["Name", fullName],
  ["Role", site.role],
  ["Works across", "Interface · Server · Data"],
  ["Drawn to", "Markets · Intelligent systems"],
  ...(site.location ? ([["Based in", site.location]] as Array<[string, string]>) : []),
  ["Status", site.availability.label],
];

export function About() {
  return (
    <section id="about" aria-label="About" className="relative py-28 sm:py-36 lg:py-44">
      <Container>
        <SectionHeading
          index="01"
          eyebrow="About"
          title="Curious by nature, precise by practice."
          emphasis={["precise", "practice"]}
        />

        <div className="mt-16 grid gap-16 lg:mt-24 lg:grid-cols-12 lg:gap-6">
          {/* Spec sheet — sticky on desktop so it frames the reading column */}
          <motion.dl
            variants={stagger(0.06)}
            initial="hidden"
            whileInView="visible"
            viewport={inViewEarly}
            className="self-start lg:sticky lg:top-28 lg:col-span-4"
          >
            {facts.map(([k, v]) => (
              <motion.div
                key={k}
                variants={fadeUp}
                className="grid grid-cols-[7.5rem_1fr] gap-4 border-b border-line py-3.5 first:border-t"
              >
                <dt className="label pt-0.5 text-dim">{k}</dt>
                <dd className="text-sm text-paper/85">{v}</dd>
              </motion.div>
            ))}
          </motion.dl>

          <div className="lg:col-span-7 lg:col-start-6">
            <ScrollRevealText
              text={lead}
              emphasis={["technology", "digital", "experiences"]}
              className="text-[clamp(1.65rem,3.1vw,3rem)] leading-[1.12] font-medium tracking-[-0.035em]"
            />

            <motion.div
              variants={stagger(0.12)}
              initial="hidden"
              whileInView="visible"
              viewport={inView}
              className="mt-14 grid gap-8 text-[1.02rem] leading-relaxed text-mute sm:grid-cols-2 sm:gap-10"
            >
              {rest.map((p, i) => (
                <motion.p key={i} variants={fadeUp} className="relative pl-6">
                  <span className="label absolute top-1 left-0 text-dim">{String(i + 1).padStart(2, "0")}</span>
                  {p}
                </motion.p>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Focus areas — an editorial index rather than a skill list */}
        <div className="mt-28 lg:mt-36">
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={inView}
            className="label mb-6 text-mute"
          >
            Areas of focus
          </motion.p>
          <motion.ul
            variants={stagger(0.06)}
            initial="hidden"
            whileInView="visible"
            viewport={inViewEarly}
            className="grid border-t border-line md:grid-cols-2"
          >
            {site.about.focus.map((item, i) => (
              <motion.li
                key={item}
                variants={fadeUp}
                className="group relative overflow-hidden border-b border-line md:odd:border-r md:odd:pr-8 md:even:pl-8"
              >
                <span
                  aria-hidden
                  className="absolute inset-0 origin-bottom scale-y-0 bg-ink-2 transition-transform duration-700 ease-[var(--ease-expo)] group-hover:scale-y-100"
                />
                <div className="relative flex items-center justify-between gap-6 py-6 sm:py-7">
                  <div className="flex items-baseline gap-5 sm:gap-8">
                    <span className="label w-6 text-dim">{String(i + 1).padStart(2, "0")}</span>
                    <span className="text-[clamp(1.35rem,2.2vw,2.1rem)] tracking-[-0.035em] transition-[letter-spacing,transform] duration-700 ease-[var(--ease-expo)] group-hover:translate-x-2">
                      {item}
                    </span>
                  </div>
                  <ArrowUpRight
                    size={20}
                    strokeWidth={1.25}
                    className="shrink-0 -translate-x-3 translate-y-3 text-accent opacity-0 transition-all duration-700 ease-[var(--ease-expo)] group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100"
                  />
                </div>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </Container>
    </section>
  );
}
