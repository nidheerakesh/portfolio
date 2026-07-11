import { createContext, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { useReducedMotion } from "../hooks/useReducedMotion";

export const SECTION_IDS = [
  "hero",
  "about",
  "skills",
  "projects",
  "experience",
  "achievements",
  "stack",
  "contact",
] as const;

type PagerContextValue = {
  index: number;
  count: number;
  ids: readonly string[];
  isAnimating: boolean;
  goTo: (i: number) => void;
  goToId: (id: string) => void;
  next: () => void;
  prev: () => void;
};

const PagerContext = createContext<PagerContextValue | null>(null);

export function useSectionPager() {
  const ctx = useContext(PagerContext);
  if (!ctx) throw new Error("useSectionPager must be used within SectionPagerProvider");
  return ctx;
}

const TRANSITION_LOCK_MS = 760;
const WHEEL_THRESHOLD = 12;
const WHEEL_RESET_MS = 220;
const TOUCH_THRESHOLD = 55;

function getActiveScrollRegion(activeId: string): HTMLElement | null {
  const section = document.getElementById(activeId);
  return section?.querySelector<HTMLElement>("[data-scroll-region]") ?? null;
}

export function SectionPagerProvider({ children }: { children: ReactNode }) {
  const reducedMotion = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const indexRef = useRef(0);
  const lockRef = useRef(false);
  const touchStartY = useRef<number | null>(null);
  const wheelAccum = useRef(0);
  const wheelResetTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    indexRef.current = index;
  }, [index]);

  const count = SECTION_IDS.length;

  const goTo = (i: number) => {
    const clamped = Math.max(0, Math.min(count - 1, i));
    if (clamped === indexRef.current || lockRef.current) return;
    indexRef.current = clamped;
    setIndex(clamped);
    lockRef.current = true;
    setIsAnimating(true);
    setTimeout(
      () => {
        lockRef.current = false;
        setIsAnimating(false);
      },
      reducedMotion ? 140 : TRANSITION_LOCK_MS,
    );
    history.replaceState(null, "", `#${SECTION_IDS[clamped]}`);
  };

  const goToId = (id: string) => {
    const i = SECTION_IDS.indexOf(id as (typeof SECTION_IDS)[number]);
    if (i >= 0) goTo(i);
  };

  const next = () => goTo(indexRef.current + 1);
  const prev = () => goTo(indexRef.current - 1);

  useEffect(() => {
    function onWheel(e: WheelEvent) {
      if (lockRef.current) {
        e.preventDefault();
        return;
      }

      // A slide can expose a horizontal card strip: vertical wheel input pans
      // it sideways, and pagination only resumes once the strip hits its edge.
      const activeSection = document.getElementById(SECTION_IDS[indexRef.current]);
      const hRegion = activeSection?.querySelector<HTMLElement>("[data-hscroll-region]");
      if (hRegion && Math.abs(e.deltaY) >= Math.abs(e.deltaX)) {
        const { scrollLeft, scrollWidth, clientWidth } = hRegion;
        if (scrollWidth > clientWidth + 1) {
          const atStart = scrollLeft <= 1;
          const atEnd = scrollLeft + clientWidth >= scrollWidth - 1;
          if ((e.deltaY > 0 && !atEnd) || (e.deltaY < 0 && !atStart)) {
            e.preventDefault();
            hRegion.scrollLeft += e.deltaY;
            return;
          }
        }
      }

      const region = getActiveScrollRegion(SECTION_IDS[indexRef.current]);
      if (region) {
        const { scrollTop, scrollHeight, clientHeight } = region;
        const scrollable = scrollHeight > clientHeight + 1;
        if (scrollable) {
          const atTop = scrollTop <= 1;
          const atBottom = scrollTop + clientHeight >= scrollHeight - 1;
          if (e.deltaY > 0 && !atBottom) return;
          if (e.deltaY < 0 && !atTop) return;
        }
      }

      wheelAccum.current += e.deltaY;
      clearTimeout(wheelResetTimer.current);
      wheelResetTimer.current = setTimeout(() => {
        wheelAccum.current = 0;
      }, WHEEL_RESET_MS);

      if (Math.abs(wheelAccum.current) < WHEEL_THRESHOLD) return;

      e.preventDefault();
      const dir = wheelAccum.current > 0 ? 1 : -1;
      wheelAccum.current = 0;
      dir > 0 ? next() : prev();
    }

    function onKeydown(e: KeyboardEvent) {
      const target = e.target;
      if (target instanceof Element && target.closest("input, textarea, select, [contenteditable='true']")) return;
      if (e.metaKey || e.ctrlKey || e.altKey) return;

      if (e.key === "ArrowDown" || e.key === "PageDown") {
        e.preventDefault();
        next();
      } else if (e.key === "ArrowUp" || e.key === "PageUp") {
        e.preventDefault();
        prev();
      } else if (e.key === "Home") {
        e.preventDefault();
        goTo(0);
      } else if (e.key === "End") {
        e.preventDefault();
        goTo(count - 1);
      }
    }

    function onTouchStart(e: TouchEvent) {
      touchStartY.current = e.touches[0]?.clientY ?? null;
    }

    function onTouchMove(e: TouchEvent) {
      if (touchStartY.current === null || lockRef.current) return;
      const currentY = e.touches[0]?.clientY;
      if (currentY === undefined) return;
      const deltaY = touchStartY.current - currentY;

      const region = getActiveScrollRegion(SECTION_IDS[indexRef.current]);
      if (region) {
        const { scrollTop, scrollHeight, clientHeight } = region;
        const scrollable = scrollHeight > clientHeight + 1;
        if (scrollable) {
          const atTop = scrollTop <= 1;
          const atBottom = scrollTop + clientHeight >= scrollHeight - 1;
          if (deltaY > 0 && !atBottom) return;
          if (deltaY < 0 && !atTop) return;
        }
      }

      if (Math.abs(deltaY) < TOUCH_THRESHOLD) return;
      e.preventDefault();
      const dir = deltaY > 0 ? 1 : -1;
      touchStartY.current = null;
      dir > 0 ? next() : prev();
    }

    function onTouchEnd() {
      touchStartY.current = null;
    }

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("keydown", onKeydown);
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("touchend", onTouchEnd);

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("keydown", onKeydown);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
      clearTimeout(wheelResetTimer.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const value = useMemo<PagerContextValue>(
    () => ({ index, count, ids: SECTION_IDS, isAnimating, goTo, goToId, next, prev }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [index, count, isAnimating],
  );

  return <PagerContext.Provider value={value}>{children}</PagerContext.Provider>;
}
