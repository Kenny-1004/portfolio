import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, Check, Copy } from "lucide-react";
import { useState } from "react";
import { Container } from "@/components/layout/Container";
import { AnimatedText } from "@/components/ui/AnimatedText";
import { Icon } from "@/components/ui/Icon";
import { Magnetic } from "@/components/ui/Magnetic";
import { drawLine, ease, fadeUp, inView, stagger } from "@/components/animations/variants";
import { site } from "@/data/site";
import { visibleSocials } from "@/data/social";

function CopyEmail() {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${site.email}`;
    }
  };
  return (
    <button
      type="button"
      onClick={copy}
      data-cursor="hover"
      className="group inline-flex items-center gap-2 rounded-full border border-line px-3.5 py-2 text-mute transition-colors hover:border-paper/40 hover:text-paper"
      aria-label={copied ? "Email copied" : "Copy email address"}
    >
      <span className="relative grid size-4 place-items-center">
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={copied ? "y" : "n"}
            initial={{ scale: 0.4, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.4, opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} strokeWidth={1.5} />}
          </motion.span>
        </AnimatePresence>
      </span>
      <span className="label" aria-live="polite">
        {copied ? "Copied" : "Copy"}
      </span>
    </button>
  );
}

export function Contact() {
  const [l1, l2] = site.contact.headline;
  return (
    <section id="contact" aria-label="Contact" className="relative overflow-hidden py-28 sm:py-36 lg:py-44">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[70%] bg-[radial-gradient(60%_60%_at_50%_0%,rgb(143_168_200/0.07),transparent_70%)]"
      />
      <Container className="relative">
        <motion.div variants={drawLine} initial="hidden" whileInView="visible" viewport={inView} className="h-px origin-left bg-line" />
        <div className="mt-5 flex items-center justify-between text-mute">
          <span className="label">(06)</span>
          <span className="label">Contact</span>
        </div>

        <h2 className="mt-16 text-[clamp(2.6rem,7.6vw,8.4rem)] leading-[0.92] font-medium tracking-[-0.055em] sm:mt-24">
          <AnimatedText text={l1} className="block" />
          <AnimatedText text={l2} className="serif-italic block tracking-[-0.03em] text-accent" delay={0.25} />
        </h2>

        <div className="mt-16 grid items-end gap-14 sm:mt-24 lg:grid-cols-12 lg:gap-6">
          <motion.div
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="visible"
            viewport={inView}
            className="lg:col-span-5"
          >
            <motion.p variants={fadeUp} className="max-w-md text-lg leading-relaxed text-mute">
              {site.contact.description}
            </motion.p>
            <motion.div variants={fadeUp} className="mt-10 flex flex-wrap items-center gap-4">
              <a
                href={`mailto:${site.email}`}
                className="link-underline text-[clamp(1.25rem,2vw,1.75rem)] tracking-[-0.03em]"
                data-cursor="hover"
              >
                {site.email}
              </a>
              <CopyEmail />
            </motion.div>
          </motion.div>

          {/* Prominent CTA */}
          <motion.div
            initial={{ scale: 0.6, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={inView}
            transition={{ duration: 1.2, ease: ease.expo }}
            className="flex justify-start lg:col-span-3 lg:col-start-7 lg:justify-center"
          >
            <Magnetic strength={0.45}>
              <a
                href={`mailto:${site.email}?subject=${encodeURIComponent("Let’s build something")}`}
                data-cursor="hover"
                className="group relative grid size-40 place-items-center overflow-hidden rounded-full bg-paper text-ink sm:size-48"
              >
                <span
                  aria-hidden
                  className="absolute inset-0 scale-0 rounded-full bg-accent transition-transform duration-700 ease-[var(--ease-expo)] group-hover:scale-100"
                />
                <span className="relative flex flex-col items-center gap-2 text-center">
                  <ArrowUpRight
                    size={22}
                    strokeWidth={1.5}
                    className="transition-transform duration-700 ease-[var(--ease-expo)] group-hover:rotate-45"
                  />
                  <span className="text-[0.95rem] font-medium tracking-tight">Get in touch</span>
                </span>
              </a>
            </Magnetic>
          </motion.div>

          <motion.ul
            variants={stagger(0.07)}
            initial="hidden"
            whileInView="visible"
            viewport={inView}
            className="border-t border-line lg:col-span-3 lg:col-start-10"
            aria-label="Social links"
          >
            {visibleSocials.map((s) => (
              <motion.li key={s.label} variants={fadeUp}>
                <a
                  href={s.href}
                  target={s.href.startsWith("mailto:") ? undefined : "_blank"}
                  rel="noreferrer noopener"
                  data-cursor="hover"
                  className="group flex items-center justify-between gap-4 border-b border-line py-4"
                >
                  <span className="flex items-center gap-3">
                    <span className="text-mute transition-colors duration-500 group-hover:text-paper">
                      <Icon icon={s.icon} size={16} />
                    </span>
                    <span className="text-sm">{s.label}</span>
                  </span>
                  <span className="flex items-center gap-2 overflow-hidden">
                    <span className="label hidden truncate text-dim sm:inline">{s.handle}</span>
                    <ArrowUpRight
                      size={16}
                      strokeWidth={1.5}
                      className="shrink-0 text-mute transition-all duration-500 ease-[var(--ease-expo)] group-hover:rotate-45 group-hover:text-accent"
                    />
                  </span>
                </a>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </Container>
    </section>
  );
}
