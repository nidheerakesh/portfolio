import { motion } from "motion/react";
import { useSectionPager } from "../lib/SectionPagerContext";
import { useReducedMotion } from "../hooks/useReducedMotion";

export default function ScrollProgress() {
  const { index, count } = useSectionPager();
  const reducedMotion = useReducedMotion();
  const progress = count > 1 ? index / (count - 1) : 0;

  return (
    <div className="fixed inset-x-0 top-0 z-[60] h-[3px]" aria-hidden="true">
      <motion.div
        className="h-full origin-left"
        animate={{ scaleX: progress }}
        transition={{ duration: reducedMotion ? 0.1 : 0.5, ease: [0.16, 1, 0.3, 1] }}
        style={{
          background: "linear-gradient(90deg, var(--color-lavender), var(--color-pink), var(--color-cyan))",
          boxShadow: "0 0 12px -1px var(--color-purple)",
        }}
      />
    </div>
  );
}
