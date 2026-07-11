import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { about } from "../lib/data";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { useSectionPager } from "../lib/SectionPagerContext";

export default function About() {
  const reducedMotion = useReducedMotion();
  const { ids, index, goToId } = useSectionPager();
  const isActive = ids[index] === "about";

  // Content reveals as the slide activates (the photo is growing/rotating in from
  // the hero via the shared MorphImage, so the text should arrive with it).
  const appear = (delay: number) =>
    reducedMotion
      ? { initial: { opacity: 0 }, animate: { opacity: isActive ? 1 : 0 }, transition: { duration: 0.2 } }
      : {
          initial: { opacity: 0, y: 24 },
          animate: { opacity: isActive ? 1 : 0, y: isActive ? 0 : 24 },
          transition: { duration: 0.7, delay: isActive ? delay : 0, ease: [0.16, 1, 0.3, 1] as const },
        };

  return (
    <div className="relative mx-auto flex min-h-full max-w-6xl flex-col justify-center px-6 py-24 sm:px-10">
      <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1fr_minmax(240px,380px)_1fr]">
        {/* Left — greeting + short bio */}
        <div className="flex flex-col justify-between gap-16 lg:h-[420px]">
          <motion.h2
            {...appear(0.05)}
            className="font-display text-[clamp(3rem,7vw,5rem)] font-bold leading-none"
            style={{ color: "var(--color-ink)" }}
          >
            Hey!
          </motion.h2>
          <motion.p
            {...appear(0.15)}
            className="max-w-[34ch] text-lg font-medium leading-relaxed"
            style={{ color: "var(--color-ink)" }}
          >
            {about.paragraphs[0]}
          </motion.p>
        </div>

        {/* Center — reserved space for the morphing photo (rendered by MorphImage) */}
        <div className="hidden lg:block" aria-hidden="true" />

        {/* Right — intro + CTA */}
        <div className="flex flex-col justify-end gap-6 lg:h-[420px]">
          <motion.p {...appear(0.25)} className="text-base leading-relaxed" style={{ color: "var(--color-ink-muted)" }}>
            {about.paragraphs[1]}
          </motion.p>
          <motion.p {...appear(0.32)} className="text-base leading-relaxed" style={{ color: "var(--color-ink-muted)" }}>
            {about.paragraphs[2]}
          </motion.p>
          <motion.div {...appear(0.4)}>
            <button
              type="button"
              onClick={() => goToId("projects")}
              data-cursor-interactive
              data-cursor-label="let's go"
              className="group inline-flex items-center gap-2 font-display text-lg font-semibold"
              style={{ color: "var(--color-ink)" }}
            >
              Get Started
              <span
                className="flex h-8 w-8 items-center justify-center rounded-full transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                style={{ background: "var(--color-lavender)", color: "var(--color-void)" }}
              >
                <ArrowUpRight size={16} />
              </span>
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
