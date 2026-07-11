import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useKonami } from "../hooks/useKonami";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { useSectionPager } from "../lib/SectionPagerContext";
import { PixelCat } from "./PixelIcons";
import { quotes } from "../lib/data";

type Toast = { id: number; text: string };
let toastId = 0;

const BURST_COLORS = ["var(--color-lavender)", "var(--color-pink)", "var(--color-cyan)", "var(--color-purple)"];

export default function EasterEggs() {
  const reducedMotion = useReducedMotion();
  const { index } = useSectionPager();
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [catVisible, setCatVisible] = useState(false);
  const [konamiBurst, setKonamiBurst] = useState(false);
  const clickCount = useRef(0);
  const achievementUnlocked = useRef(false);
  const quoteShown = useRef(false);

  const pushToast = useCallback((text: string) => {
    const id = toastId++;
    setToasts((prev) => [...prev, { id, text }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 5200);
  }, []);

  const onKonami = useCallback(() => {
    pushToast("🎮 Konami code unlocked! You know the ways of old.");
    if (!reducedMotion) {
      setKonamiBurst(true);
      setTimeout(() => setKonamiBurst(false), 1100);
    }
  }, [pushToast, reducedMotion]);

  useKonami(onKonami);

  useEffect(() => {
    const onClick = () => {
      clickCount.current += 1;
      if (clickCount.current === 25 && !achievementUnlocked.current) {
        achievementUnlocked.current = true;
        pushToast("🏆 Achievement unlocked: Curious Cursor — 25 clicks and counting.");
      }
    };
    window.addEventListener("portfolio:click", onClick);
    return () => window.removeEventListener("portfolio:click", onClick);
  }, [pushToast]);

  useEffect(() => {
    if (!quoteShown.current && index >= 2) {
      quoteShown.current = true;
      pushToast(quotes[Math.floor(Math.random() * quotes.length)]);
    }
  }, [index, pushToast]);

  useEffect(() => {
    if (reducedMotion) return;
    let timer: ReturnType<typeof setTimeout>;
    const schedule = () => {
      const delay = 45000 + Math.random() * 45000;
      timer = setTimeout(() => {
        setCatVisible(true);
        setTimeout(() => setCatVisible(false), 7200);
        schedule();
      }, delay);
    };
    schedule();
    return () => clearTimeout(timer);
  }, [reducedMotion]);

  return (
    <>
      {catVisible && !reducedMotion && (
        <div aria-hidden="true" className="pointer-events-none fixed bottom-6 left-0 z-40" style={{ animation: "walk-across 7s linear forwards" }}>
          <div style={{ animation: "cat-bob 0.5s ease-in-out infinite" }}>
            <PixelCat size={40} color="var(--color-pink)" />
          </div>
        </div>
      )}

      {konamiBurst && (
        <div className="pointer-events-none fixed inset-0 z-[90] flex items-center justify-center" aria-hidden="true">
          {Array.from({ length: 20 }).map((_, i) => (
            <div key={i} className="absolute" style={{ transform: `rotate(${i * 18}deg)` }}>
              <span
                className="block h-2 w-2 rounded-sm"
                style={{
                  background: BURST_COLORS[i % BURST_COLORS.length],
                  boxShadow: `0 0 8px ${BURST_COLORS[i % BURST_COLORS.length]}`,
                  animation: "burst-out 900ms ease-out forwards",
                  animationDelay: `${(i % 5) * 15}ms`,
                }}
              />
            </div>
          ))}
        </div>
      )}

      <div
        className="pointer-events-none fixed bottom-5 right-5 z-[95] flex w-[calc(100%-2.5rem)] max-w-sm flex-col gap-2"
        aria-live="polite"
        role="status"
      >
        <AnimatePresence>
          {toasts.map((t) => (
            <motion.div
              key={t.id}
              initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 12, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 8, scale: 0.96 }}
              className="glass pointer-events-auto rounded-xl px-4 py-3 font-mono text-xs leading-relaxed"
              style={{ color: "var(--color-ink)" }}
            >
              {t.text}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </>
  );
}
