import { skillCategories } from "../lib/data";
import Reveal, { staggerContainer } from "./Reveal";
import { motion } from "motion/react";
import { useReducedMotion } from "../hooks/useReducedMotion";

const ACCENT_MAP: Record<string, string> = {
  lavender: "var(--color-lavender)",
  pink: "var(--color-pink)",
  purple: "var(--color-purple)",
  cyan: "var(--color-cyan)",
};

export default function Skills() {
  const reducedMotion = useReducedMotion();

  return (
    <div className="relative mx-auto flex min-h-full max-w-6xl flex-col justify-center px-6 py-24 sm:px-10 sm:py-20">
      <Reveal>
        <h2 className="font-display text-balance text-[clamp(2rem,4.5vw,3.25rem)] font-bold" style={{ color: "var(--color-ink)" }}>
          What I reach for
        </h2>
        <p className="mt-3 max-w-xl text-base" style={{ color: "var(--color-ink-muted)" }}>
          Not a progress bar in sight — just the stuff I actually use, grouped by where it shows up.
        </p>
      </Reveal>

      <div className="mt-14 space-y-10">
        {skillCategories.map((cat, ci) => {
          const accent = ACCENT_MAP[cat.accent];
          return (
            <Reveal key={cat.label} delay={ci * 0.08}>
              <h3 className="mb-4 font-mono text-xs font-semibold uppercase tracking-wider" style={{ color: accent }}>
                {cat.label}
              </h3>
              <motion.ul
                className="flex flex-wrap gap-3"
                variants={staggerContainer(0.05)}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-60px" }}
              >
                {cat.skills.map((skill, i) => (
                  <motion.li
                    key={skill}
                    variants={
                      reducedMotion
                        ? { hidden: { opacity: 0 }, show: { opacity: 1 } }
                        : { hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }
                    }
                    data-cursor-interactive
                    className="glass rounded-full px-4 py-2 font-mono text-sm"
                    style={{
                      color: "var(--color-ink)",
                      boxShadow: `0 0 0 1px color-mix(in oklch, ${accent} 25%, transparent) inset`,
                      animation: reducedMotion ? "none" : `float-y ${4 + (i % 4) * 0.7}s ease-in-out ${i * 0.15}s infinite`,
                    }}
                  >
                    <span
                      className="mr-2 inline-block h-1.5 w-1.5 rounded-full"
                      style={{ background: accent, boxShadow: `0 0 6px ${accent}` }}
                    />
                    {skill}
                  </motion.li>
                ))}
              </motion.ul>
            </Reveal>
          );
        })}
      </div>
    </div>
  );
}
