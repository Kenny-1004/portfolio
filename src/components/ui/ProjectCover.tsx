import { motion } from "motion/react";
import { useMemo } from "react";
import { ease } from "@/components/animations/variants";
import { cn } from "@/lib/utils";
import type { CoverVariant, Project } from "@/types";

/**
 * Project preview. Uses a real screenshot when `project.image` is set;
 * otherwise draws an abstract, clearly illustrative cover for the project's theme.
 * The generative covers carry no numbers or UI that could pass as real output.
 */
export function ProjectCover({
  project,
  className,
  animate = true,
  labels = true,
}: {
  project: Project;
  className?: string;
  animate?: boolean;
  /** Corner captions. Disable when the parent positions its own (e.g. under parallax). */
  labels?: boolean;
}) {
  if (project.image) {
    return (
      <img
        src={project.image}
        alt={`${project.title} preview`}
        loading="lazy"
        decoding="async"
        className={cn("size-full object-cover", className)}
      />
    );
  }
  return (
    <div className={cn("relative size-full overflow-hidden bg-ink-2", className)} role="img" aria-label={`Illustrative cover for ${project.title}`}>
      <div className="hairline-grid absolute inset-0 opacity-70" />
      <div className="absolute inset-0 bg-[radial-gradient(80%_60%_at_70%_20%,rgb(143_168_200/0.10),transparent_70%)]" />
      <Motif variant={project.cover} animate={animate} />
      {labels && <CoverCaption />}
    </div>
  );
}

/** "Illustrative" caption so a generative cover is never mistaken for a screenshot. */
export function CoverCaption() {
  return (
    <span className="label absolute bottom-4 left-4 z-10 flex items-center gap-2 text-dim sm:bottom-5 sm:left-5">
      <span className="size-1 rounded-full bg-dim" />
      Illustrative preview — screenshots coming soon
    </span>
  );
}

const draw = (delay = 0) => ({
  initial: { pathLength: 0, opacity: 0 },
  whileInView: { pathLength: 1, opacity: 1 },
  viewport: { once: true, amount: 0.4 },
  transition: { duration: 2, ease: ease.smooth, delay },
});

function seeded(seed: number) {
  let s = seed;
  return () => ((s = (s * 16807) % 2147483647) - 1) / 2147483646;
}

function Motif({ variant, animate }: { variant: CoverVariant; animate: boolean }) {
  const a = (delay?: number) => (animate ? draw(delay) : {});

  // Pre-compute geometry once per variant.
  const geo = useMemo(() => {
    const r = seeded(variant.length * 97);
    // Equity: upward-drifting walk.
    let y = 230;
    const eq = Array.from({ length: 48 }, (_, i) => {
      y += (r() - 0.62) * 18;
      y = Math.max(60, Math.min(250, y));
      return [40 + i * (520 / 47), y] as const;
    });
    // Distribution: bell-shaped bars.
    const bars = Array.from({ length: 23 }, (_, i) => {
      const x = (i - 11) / 4.2;
      return Math.exp(-(x * x) / 2) * (0.85 + r() * 0.3);
    });
    return { eq, bars };
  }, [variant]);

  const stroke = "var(--color-accent)";

  if (variant === "equity") {
    const line = geo.eq.map(([x, yy], i) => `${i ? "L" : "M"}${x.toFixed(1)} ${yy.toFixed(1)}`).join(" ");
    const area = `${line} L560 280 L40 280 Z`;
    return (
      <svg viewBox="0 0 600 340" className="absolute inset-0 size-full" preserveAspectRatio="xMidYMid meet" aria-hidden>
        <defs>
          <linearGradient id="eq-fill" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="#8fa8c8" stopOpacity="0.22" />
            <stop offset="1" stopColor="#8fa8c8" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[100, 160, 220].map((yy) => (
          <line key={yy} x1="40" x2="560" y1={yy} y2={yy} stroke="#f5f5f5" strokeOpacity="0.06" strokeDasharray="2 6" />
        ))}
        <motion.path d={area} fill="url(#eq-fill)" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1.6, delay: 0.8 }} />
        <motion.path d={line} fill="none" stroke={stroke} strokeWidth="1.5" {...a()} />
        {geo.eq.filter((_, i) => i % 6 === 3).map(([x, yy], i) => (
          <motion.line key={i} x1={x} x2={x} y1={yy - 14} y2={yy + 14} stroke="#f5f5f5" strokeOpacity="0.25" {...a(0.4 + i * 0.08)} />
        ))}
        <rect x="40" y="40" width="120" height="26" rx="13" fill="none" stroke="#f5f5f5" strokeOpacity="0.12" />
        <text x="100" y="57" textAnchor="middle" fill="#888" fontFamily="Geist Mono" fontSize="10" letterSpacing="1.5">
          EQUITY · —
        </text>
      </svg>
    );
  }

  if (variant === "agents") {
    const hub = [300, 175] as const;
    const nodes = [
      [130, 85],
      [470, 85],
      [130, 265],
      [470, 265],
    ] as const;
    return (
      <svg viewBox="0 0 600 340" className="absolute inset-0 size-full" aria-hidden>
        {nodes.map(([x, y], i) => (
          <motion.path key={i} d={`M${x} ${y} C ${(x + hub[0]) / 2} ${y}, ${(x + hub[0]) / 2} ${hub[1]}, ${hub[0]} ${hub[1]}`} fill="none" stroke={stroke} strokeOpacity="0.55" strokeWidth="1" {...a(i * 0.15)} />
        ))}
        {nodes.map(([x, y], i) => (
          <g key={`n${i}`}>
            <circle cx={x} cy={y} r="26" fill="#111" stroke="#f5f5f5" strokeOpacity="0.18" />
            <text x={x} y={y + 4} textAnchor="middle" fill="#888" fontFamily="Geist Mono" fontSize="10" letterSpacing="1">
              A{i + 1}
            </text>
          </g>
        ))}
        <motion.circle
          cx={hub[0]}
          cy={hub[1]}
          r="46"
          fill="none"
          stroke={stroke}
          strokeOpacity="0.35"
          animate={animate ? { r: [46, 58, 46], strokeOpacity: [0.35, 0, 0.35] } : undefined}
          transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
        />
        <circle cx={hub[0]} cy={hub[1]} r="40" fill="#161616" stroke={stroke} strokeOpacity="0.8" />
        <text x={hub[0]} y={hub[1] + 4} textAnchor="middle" fill="#f5f5f5" fontFamily="Geist Mono" fontSize="10" letterSpacing="1.5">
          SYNTHESIS
        </text>
      </svg>
    );
  }

  if (variant === "distribution") {
    const w = 400 / geo.bars.length;
    const curve = geo.bars
      .map((_, i) => {
        const x = (i - 11) / 4.2;
        const h = Math.exp(-(x * x) / 2) * 190;
        return `${i ? "L" : "M"}${(100 + i * w + w / 2).toFixed(1)} ${(270 - h).toFixed(1)}`;
      })
      .join(" ");
    return (
      <svg viewBox="0 0 600 340" className="absolute inset-0 size-full" aria-hidden>
        <line x1="80" x2="520" y1="270" y2="270" stroke="#f5f5f5" strokeOpacity="0.2" />
        <line x1="300" x2="300" y1="50" y2="270" stroke={stroke} strokeOpacity="0.5" strokeDasharray="3 5" />
        {geo.bars.map((b, i) => (
          <motion.rect
            key={i}
            x={100 + i * w + 2}
            width={w - 4}
            y={270 - b * 190}
            height={b * 190}
            fill="#f5f5f5"
            fillOpacity={0.08 + b * 0.12}
            style={{ transformOrigin: `0 270px`, transformBox: "view-box" }}
            initial={animate ? { scaleY: 0 } : undefined}
            whileInView={animate ? { scaleY: 1 } : undefined}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 1.1, ease: ease.expo, delay: 0.2 + Math.abs(i - 11) * 0.04 }}
          />
        ))}
        <motion.path d={curve} fill="none" stroke={stroke} strokeWidth="1.5" {...a(0.6)} />
        <text x="306" y="62" fill="#888" fontFamily="Geist Mono" fontSize="10" letterSpacing="1.5">
          μ
        </text>
      </svg>
    );
  }

  // stack
  const layers = ["Interface", "API", "Database"];
  return (
    <svg viewBox="0 0 600 340" className="absolute inset-0 size-full" aria-hidden>
      {/* Painted bottom-up so the top layer overlaps the ones beneath it. */}
      {layers
        .map((label, i) => ({ label, i }))
        .reverse()
        .map(({ label, i }) => {
        const y = 60 + i * 70;
        return (
          <motion.g
            key={label}
            initial={animate ? { opacity: 0, y: -20 } : undefined}
            whileInView={animate ? { opacity: 1, y: 0 } : undefined}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 1, ease: ease.expo, delay: 0.15 * i }}
          >
            <path
              d={`M300 ${y} L470 ${y + 40} L300 ${y + 80} L130 ${y + 40} Z`}
              fill={i === 0 ? "rgb(143 168 200 / 0.12)" : "#111"}
              stroke={i === 0 ? stroke : "#f5f5f5"}
              strokeOpacity={i === 0 ? 0.8 : 0.18}
            />
            <text x="490" y={y + 44} fill="#888" fontFamily="Geist Mono" fontSize="10" letterSpacing="1.5">
              {label.toUpperCase()}
            </text>
          </motion.g>
        );
      })}
    </svg>
  );
}
