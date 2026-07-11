import { motion } from "motion/react";
import { ArrowDown } from "lucide-react";
import { profile } from "../lib/data";
import { PixelBolt, PixelDiamond } from "./PixelIcons";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { useSectionPager } from "../lib/SectionPagerContext";

export default function Hero() {
  const reducedMotion = useReducedMotion();
  const { goToId } = useSectionPager();

  return (
    <div className="relative flex h-full flex-col items-center justify-center overflow-hidden px-6 sm:px-10">
      {/* Giant name lockup */}
      <div className="relative mt-[-6vh]">
        <motion.div
          className="absolute -left-8 -top-6 sm:-left-14 sm:-top-8"
          initial={reducedMotion ? { opacity: 1 } : { opacity: 0, rotate: -40, scale: 0.6 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        >
          <PixelDiamond
            size={40}
            color="var(--color-lavender)"
            style={{ filter: "drop-shadow(0 0 14px var(--color-purple))" }}
          />
        </motion.div>

        <motion.h1
          initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center font-display font-bold uppercase leading-[0.86] tracking-tight"
          style={{ fontSize: "clamp(3.25rem, 12vw, 9rem)", color: "var(--color-ink)", letterSpacing: "-0.04em" }}
        >
          Nidhi
          <br />
          Rakesh
        </motion.h1>

        <motion.div
          className="absolute -bottom-6 -right-6 sm:-bottom-8 sm:-right-12"
          initial={reducedMotion ? { opacity: 1 } : { opacity: 0, rotate: 40, scale: 0.6 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
        >
          <PixelBolt
            size={44}
            color="var(--color-pink)"
            style={{ filter: "drop-shadow(0 0 14px var(--color-pink))" }}
          />
        </motion.div>
      </div>

      <motion.p
        initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="mt-6 text-center font-mono text-xs uppercase tracking-[0.35em] sm:text-sm"
        style={{ color: "var(--color-ink-muted)" }}
      >
        {profile.role}
      </motion.p>

      {/* Corner meta */}
      <div
        className="absolute bottom-6 left-6 font-display text-2xl font-bold sm:bottom-8 sm:left-10 sm:text-3xl"
        style={{ color: "var(--color-ink)" }}
      >
        ©2026
      </div>
      <div
        className="absolute bottom-6 right-6 hidden font-mono text-xs uppercase tracking-widest sm:bottom-8 sm:right-10 sm:block"
        style={{ color: "var(--color-ink-muted)" }}
      >
        /building since 2024
      </div>

      {/* Scroll cue */}
      <motion.button
        type="button"
        onClick={() => goToId("about")}
        data-cursor-interactive
        aria-label="Go to About section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="absolute bottom-24 left-1/2 flex -translate-x-1/2 flex-col items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest"
        style={{ color: "var(--color-ink-faint)" }}
      >
        scroll
        <ArrowDown size={13} style={reducedMotion ? undefined : { animation: "float-y 2s ease-in-out infinite" }} />
      </motion.button>
    </div>
  );
}
