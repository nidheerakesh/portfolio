import { useEffect, useRef, type ReactNode } from "react";
import { motion } from "motion/react";
import { useSectionPager } from "../lib/SectionPagerContext";
import { useReducedMotion } from "../hooks/useReducedMotion";

type SlideProps = {
  id: string;
  index: number;
  label: string;
  children: ReactNode;
};

export default function Slide({ id, index: slideIndex, label, children }: SlideProps) {
  const { index: activeIndex } = useSectionPager();
  const reducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  const offset = slideIndex - activeIndex;
  const isActive = offset === 0;

  useEffect(() => {
    const el = sectionRef.current as (HTMLElement & { inert: boolean }) | null;
    if (!el) return;
    el.inert = !isActive;
    if (isActive) {
      el.querySelector<HTMLElement>("[data-scroll-region]")?.scrollTo({ top: 0, behavior: "instant" });
    }
  }, [isActive]);

  return (
    <motion.section
      ref={sectionRef}
      id={id}
      aria-label={label}
      aria-hidden={!isActive}
      className="fixed inset-0 h-[100dvh] w-full"
      initial={false}
      animate={{
        y: reducedMotion ? 0 : `${offset * 100}%`,
        opacity: isActive ? 1 : reducedMotion ? 0 : 0,
      }}
      transition={{ duration: reducedMotion ? 0.18 : 0.75, ease: [0.76, 0, 0.24, 1] }}
      style={{ pointerEvents: isActive ? "auto" : "none", zIndex: isActive ? 10 : 1 }}
    >
      <div data-scroll-region className="h-full w-full overflow-y-auto overscroll-none">
        {children}
      </div>
    </motion.section>
  );
}
