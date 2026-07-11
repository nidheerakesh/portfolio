import { motion } from "motion/react";
import { useSectionPager } from "../lib/SectionPagerContext";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { profile } from "../lib/data";
import { PixelCat } from "./PixelIcons";

// The single photo that travels between the Hero and About slides — small at the
// bottom of the hero, then rotating + growing into the About portrait as you
// advance. Driven by the pager index, not raw scroll (the site is paginated).
const HERO = { y: "31vh", scale: 0.92, rotateY: 0, opacity: 1 };
const ABOUT = { y: "1vh", scale: 1.85, rotateY: 360, opacity: 1 };
const GONE = { y: "-8vh", scale: 1.85, rotateY: 360, opacity: 0 };

const BOX_W = 200;
const BOX_H = 244;

export default function MorphImage() {
  const { index, ids } = useSectionPager();
  const reducedMotion = useReducedMotion();
  const active = ids[index];

  const target = active === "hero" ? HERO : active === "about" ? ABOUT : GONE;

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-1/2 top-1/2 z-[5]"
      style={{
        width: BOX_W,
        height: BOX_H,
        marginLeft: -BOX_W / 2,
        marginTop: -BOX_H / 2,
        transformPerspective: 1100,
        transformStyle: "preserve-3d",
      }}
      initial={false}
      animate={{
        y: target.y,
        scale: target.scale,
        rotateY: reducedMotion ? 0 : target.rotateY,
        opacity: target.opacity,
      }}
      transition={
        reducedMotion
          ? { duration: 0.25, ease: "easeOut" }
          : { type: "spring", stiffness: 55, damping: 17, mass: 0.9 }
      }
    >
      <div
        className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-[1.75rem]"
        style={{
          background: "linear-gradient(155deg, var(--color-surface-2), var(--color-void))",
          border: "1px solid color-mix(in oklch, var(--color-lavender) 40%, transparent)",
          boxShadow: "0 24px 70px -20px color-mix(in oklch, var(--color-purple) 75%, transparent)",
        }}
      >
        {profile.photoUrl ? (
          <img src={profile.photoUrl} alt={`Portrait of ${profile.name}`} className="h-full w-full object-cover" />
        ) : (
          <>
            <div
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(70% 60% at 50% 30%, color-mix(in oklch, var(--color-pink) 22%, transparent), transparent 70%)",
              }}
            />
            <div className="relative flex flex-col items-center gap-3">
              <PixelCat size={72} color="var(--color-lavender)" />
              <span className="font-mono text-[9px] tracking-widest" style={{ color: "var(--color-ink-faint)" }}>
                YOUR PHOTO
              </span>
            </div>
          </>
        )}
      </div>
    </motion.div>
  );
}
