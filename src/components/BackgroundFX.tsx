import { useMemo } from "react";
import { useReducedMotion } from "../hooks/useReducedMotion";

const WINDOW_COLORS = ["var(--color-cyan)", "var(--color-pink)", "var(--color-lavender)"];

function seededRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

type Building = { x: number; w: number; h: number };
type Win = { x: number; y: number; color: string; opacity: number };

const VIEW_W = 480;
const VIEW_H = 200;

function makeSkyline(seed: number, minW: number, maxW: number, minH: number, maxH: number): Building[] {
  const rand = seededRandom(seed);
  const buildings: Building[] = [];
  let x = -8;
  while (x < VIEW_W + 8) {
    const w = Math.round(minW + rand() * (maxW - minW));
    const h = Math.round(minH + rand() * (maxH - minH));
    buildings.push({ x, w, h });
    x += w + (rand() < 0.35 ? Math.round(rand() * 8) : 0);
  }
  return buildings;
}

// Still pixel-art night city — the backdrop never moves; slides swap in front of it.
export default function BackgroundFX() {
  const reducedMotion = useReducedMotion();

  const stars = useMemo(() => {
    const rand = seededRandom(42);
    return Array.from({ length: 70 }).map((_, i) => ({
      id: i,
      left: rand() * 100,
      top: rand() * 55,
      size: 1 + rand() * 2,
      duration: 3 + rand() * 5,
      delay: rand() * 6,
    }));
  }, []);

  const far = useMemo(() => makeSkyline(11, 18, 46, 45, 105), []);
  const near = useMemo(() => makeSkyline(23, 24, 54, 70, 165), []);

  const windows = useMemo(() => {
    const rand = seededRandom(77);
    const wins: Win[] = [];
    near.forEach((b) => {
      const cols = Math.floor((b.w - 8) / 8);
      const rows = Math.floor((b.h - 12) / 11);
      for (let c = 0; c < cols; c++) {
        for (let r = 0; r < rows; r++) {
          if (rand() < 0.14) {
            wins.push({
              x: b.x + 4 + c * 8,
              y: VIEW_H - b.h + 6 + r * 11,
              color: WINDOW_COLORS[Math.floor(rand() * WINDOW_COLORS.length)],
              opacity: 0.35 + rand() * 0.5,
            });
          }
        }
      }
    });
    return wins;
  }, [near]);

  const signs = useMemo(() => {
    const rand = seededRandom(5);
    const picks = [2, 6, 11, 15];
    return picks
      .filter((i) => i < near.length)
      .map((i) => {
        const b = near[i];
        return {
          x: b.x + 4,
          y: VIEW_H - b.h + 8 + Math.round(rand() * 14),
          w: Math.min(14, b.w - 8),
          h: 6,
          color: rand() < 0.5 ? "var(--color-pink)" : "var(--color-cyan)",
        };
      });
  }, [near]);

  const antennas = useMemo(() => {
    const rand = seededRandom(9);
    return near
      .filter((_, i) => i % 5 === 2)
      .map((b) => ({
        x: b.x + Math.round(b.w / 2),
        top: VIEW_H - b.h - 12 - Math.round(rand() * 8),
        h: 12 + Math.round(rand() * 8),
      }));
  }, [near]);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none" aria-hidden="true">
      {/* Night sky */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(90% 60% at 50% 108%, color-mix(in oklch, var(--color-purple) 34%, transparent), transparent 70%), radial-gradient(55% 40% at 15% 0%, color-mix(in oklch, var(--color-purple) 10%, transparent), transparent), var(--color-void)",
        }}
      />

      {/* Stars — twinkle in place, never drift */}
      <div className="absolute inset-0">
        {stars.map((s) => (
          <div
            key={s.id}
            className="absolute rounded-full bg-white"
            style={{
              left: `${s.left}%`,
              top: `${s.top}%`,
              width: s.size,
              height: s.size,
              opacity: 0.55,
              animation: reducedMotion ? "none" : `twinkle ${s.duration}s ease-in-out ${s.delay}s infinite`,
            }}
          />
        ))}
      </div>

      {/* Pixel city skyline */}
      <svg
        className="absolute inset-x-0 bottom-0 h-[42%] w-full"
        viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
        preserveAspectRatio="xMidYMax slice"
        shapeRendering="crispEdges"
      >
        <defs>
          <linearGradient id="horizon-glow" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="100%" stopColor="color-mix(in oklch, var(--color-pink) 38%, transparent)" />
          </linearGradient>
          <filter id="neon-blur" x="-80%" y="-80%" width="260%" height="260%">
            <feGaussianBlur stdDeviation="3.5" />
          </filter>
        </defs>

        {/* Horizon neon wash behind the skyline */}
        <rect x="0" y={VIEW_H - 110} width={VIEW_W} height="110" fill="url(#horizon-glow)" opacity="0.5" />

        {/* Far silhouettes */}
        {far.map((b, i) => (
          <rect key={`f${i}`} x={b.x} y={VIEW_H - b.h} width={b.w} height={b.h} fill="#171230" />
        ))}

        {/* Near buildings */}
        {near.map((b, i) => (
          <rect key={`n${i}`} x={b.x} y={VIEW_H - b.h} width={b.w} height={b.h} fill="#0c0a18" />
        ))}

        {/* Antennas with warning lights */}
        {antennas.map((a, i) => (
          <g key={`a${i}`}>
            <rect x={a.x} y={a.top} width={1.5} height={a.h} fill="#171230" />
            <rect x={a.x - 0.8} y={a.top - 2.5} width={3} height={3} fill="var(--color-pink)" opacity={0.9}>
              {!reducedMotion && (
                <animate attributeName="opacity" values="0.9;0.2;0.9" dur={`${2.4 + i * 0.7}s`} repeatCount="indefinite" />
              )}
            </rect>
          </g>
        ))}

        {/* Lit windows */}
        {windows.map((w, i) => (
          <rect key={`w${i}`} x={w.x} y={w.y} width={4} height={5} fill={w.color} opacity={w.opacity} />
        ))}

        {/* Neon signs */}
        {signs.map((s, i) => (
          <g key={`s${i}`}>
            <rect x={s.x} y={s.y} width={s.w} height={s.h} fill={s.color} opacity={0.55} filter="url(#neon-blur)" />
            <rect x={s.x} y={s.y} width={s.w} height={s.h} fill={s.color} opacity={0.85} />
            <rect x={s.x + 2} y={s.y + 2} width={s.w - 4} height={s.h - 4} fill="var(--color-void)" opacity={0.75} />
          </g>
        ))}
      </svg>

      <div className="grain-layer" />
    </div>
  );
}
