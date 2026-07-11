import { useEffect, useRef, useState } from "react";
import { useFinePointer, useReducedMotion } from "../hooks/useReducedMotion";

// 10x16 pixel-grid glyph, hand-drawn to read as a chunky retro pointer.
const GLYPH = [
  "#.........",
  "##........",
  "#.#.......",
  "#..#......",
  "#...#.....",
  "#....#....",
  "#.....#...",
  "#......#..",
  "#.......#.",
  "#....####.",
  "#.##......",
  "##..#.....",
  "#....#....",
  "......#...",
  ".......#..",
  ".......#..",
];

const TRAIL_COLORS = ["var(--color-lavender)", "var(--color-pink)", "var(--color-cyan)", "var(--color-purple)"];

type Particle = { id: number; x: number; y: number; color: string };

let particleId = 0;

export default function CustomCursor() {
  const finePointer = useFinePointer();
  const reducedMotion = useReducedMotion();

  const wrapperRef = useRef<HTMLDivElement>(null);
  const glyphRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: -100, y: -100 });
  const target = useRef({ x: -100, y: -100 });
  const rotation = useRef(0);
  const lastSpawn = useRef(0);
  const lastMove = useRef({ x: -100, y: -100, t: 0 });

  const [hovering, setHovering] = useState(false);
  const [hoverLabel, setHoverLabel] = useState<string | null>(null);
  const [down, setDown] = useState(false);
  const [visible, setVisible] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    if (!finePointer) return;
    document.body.classList.add("cursor-active");
    return () => document.body.classList.remove("cursor-active");
  }, [finePointer]);

  useEffect(() => {
    if (!finePointer) return;

    const handleMove = (e: MouseEvent) => {
      target.current.x = e.clientX;
      target.current.y = e.clientY;
      setVisible(true);

      if (!reducedMotion) {
        const now = performance.now();
        const dt = now - lastMove.current.t;
        if (dt > 30) {
          const dx = e.clientX - lastMove.current.x;
          const dy = e.clientY - lastMove.current.y;
          const speed = Math.hypot(dx, dy);
          if (speed > 4) {
            rotation.current = (Math.atan2(dy, dx) * 180) / Math.PI + 90;
          }
          if (speed > 14 && now - lastSpawn.current > 45) {
            lastSpawn.current = now;
            const color = TRAIL_COLORS[particleId % TRAIL_COLORS.length];
            const p: Particle = { id: particleId++, x: e.clientX, y: e.clientY, color };
            setParticles((prev) => [...prev.slice(-18), p]);
          }
          lastMove.current = { x: e.clientX, y: e.clientY, t: now };
        }
      }
    };

    const handleOver = (e: MouseEvent) => {
      const el = (e.target as HTMLElement)?.closest?.(
        'a, button, input, textarea, select, [role="button"], [data-cursor-interactive]',
      );
      if (el) {
        setHovering(true);
        setHoverLabel(el.getAttribute("data-cursor-label"));
      }
    };
    const handleOut = (e: MouseEvent) => {
      const el = (e.target as HTMLElement)?.closest?.(
        'a, button, input, textarea, select, [role="button"], [data-cursor-interactive]',
      );
      if (el) {
        setHovering(false);
        setHoverLabel(null);
      }
    };

    const handleDown = () => {
      setDown(true);
      window.dispatchEvent(new CustomEvent("portfolio:click"));
    };
    const handleUp = () => setDown(false);
    const handleLeave = () => setVisible(false);

    window.addEventListener("mousemove", handleMove, { passive: true });
    window.addEventListener("mouseover", handleOver, { passive: true });
    window.addEventListener("mouseout", handleOut, { passive: true });
    window.addEventListener("mousedown", handleDown);
    window.addEventListener("mouseup", handleUp);
    document.documentElement.addEventListener("mouseleave", handleLeave);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseover", handleOver);
      window.removeEventListener("mouseout", handleOut);
      window.removeEventListener("mousedown", handleDown);
      window.removeEventListener("mouseup", handleUp);
      document.documentElement.removeEventListener("mouseleave", handleLeave);
    };
  }, [finePointer, reducedMotion]);

  useEffect(() => {
    if (!finePointer) return;
    let raf: number;
    const lerp = reducedMotion ? 1 : 0.25;
    const loop = () => {
      pos.current.x += (target.current.x - pos.current.x) * lerp;
      pos.current.y += (target.current.y - pos.current.y) * lerp;
      if (wrapperRef.current) {
        const rot = reducedMotion ? 0 : rotation.current;
        wrapperRef.current.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0) translate(-30%, -20%) rotate(${rot}deg)`;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [finePointer, reducedMotion]);

  if (!finePointer) return null;

  const size = hovering ? 68 : 56;

  return (
    <>
      <div
        ref={wrapperRef}
        aria-hidden="true"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: 2147483647,
          pointerEvents: "none",
          opacity: visible ? 1 : 0,
          transition: "opacity 200ms ease",
          willChange: "transform",
        }}
      >
        <div
          ref={glyphRef}
          style={{
            transform: `scale(${down ? 1.15 : 1}) scaleY(${down ? 0.72 : 1})`,
            transition: reducedMotion
              ? "none"
              : "transform 160ms cubic-bezier(0.22, 1, 0.36, 1)",
            filter: hovering
              ? "drop-shadow(0 0 14px var(--color-pink)) drop-shadow(0 0 26px color-mix(in oklch, var(--color-purple) 60%, transparent))"
              : "drop-shadow(0 0 10px color-mix(in oklch, var(--color-lavender) 70%, transparent))",
          }}
        >
          <svg
            width={size}
            height={size * 1.6}
            viewBox="0 0 10 16"
            shapeRendering="crispEdges"
            style={{ transition: reducedMotion ? "none" : "width 180ms ease, height 180ms ease" }}
          >
            <defs>
              <linearGradient id="cursor-fill" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor={hovering ? "var(--color-pink)" : "var(--color-lavender)"} />
                <stop offset="100%" stopColor="var(--color-purple)" />
              </linearGradient>
            </defs>
            {GLYPH.map((row, r) =>
              row.split("").map((cell, c) =>
                cell === "#" ? (
                  <rect key={`${r}-${c}`} x={c} y={r} width={1} height={1} fill="url(#cursor-fill)" />
                ) : null,
              ),
            )}
          </svg>
          {hovering && (
            <div
              className="pixel-corners"
              style={{
                position: "absolute",
                inset: "-10px",
                border: "2px solid var(--color-cyan)",
                opacity: 0.55,
                animation: reducedMotion ? "none" : "spin-slow 6s linear infinite",
              }}
            />
          )}
        </div>
        {hoverLabel && (
          <div
            className="font-mono"
            style={{
              position: "absolute",
              left: 44,
              top: 4,
              fontSize: 11,
              padding: "3px 8px",
              borderRadius: 999,
              background: "var(--color-surface-2)",
              border: "1px solid color-mix(in oklch, var(--color-lavender) 40%, transparent)",
              color: "var(--color-ink)",
              whiteSpace: "nowrap",
            }}
          >
            {hoverLabel}
          </div>
        )}
      </div>

      {!reducedMotion &&
        particles.map((p) => (
          <span
            key={p.id}
            aria-hidden="true"
            onAnimationEnd={() => setParticles((prev) => prev.filter((x) => x.id !== p.id))}
            style={{
              position: "fixed",
              left: p.x,
              top: p.y,
              width: 5,
              height: 5,
              background: p.color,
              boxShadow: `0 0 8px ${p.color}`,
              pointerEvents: "none",
              zIndex: 2147483646,
              animation: "trail-fade 650ms ease-out forwards",
            }}
          />
        ))}
      <style>{`
        @keyframes trail-fade {
          0% { opacity: 0.9; transform: translate(-50%, -50%) scale(1); }
          100% { opacity: 0; transform: translate(-50%, -50%) translateY(-14px) scale(0.3); }
        }
      `}</style>
    </>
  );
}
