import { motion, type Variants } from "motion/react";
import type { ReactNode } from "react";
import { useReducedMotion } from "../hooks/useReducedMotion";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  as?: "div" | "li";
};

export default function Reveal({ children, className, delay = 0, y = 18, as = "div" }: RevealProps) {
  const reducedMotion = useReducedMotion();

  const variants: Variants = reducedMotion
    ? { hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 0.01 } } }
    : {
        hidden: { opacity: 0, y, scale: 0.98 },
        show: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] },
        },
      };

  if (as === "li") {
    return (
      <motion.li
        className={className}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-60px" }}
        variants={variants}
      >
        {children}
      </motion.li>
    );
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      variants={variants}
    >
      {children}
    </motion.div>
  );
}

export function staggerContainer(stagger = 0.09, delayChildren = 0): Variants {
  return {
    hidden: {},
    show: {
      transition: { staggerChildren: stagger, delayChildren },
    },
  };
}
