import { useEffect, useRef, useState, type ComponentType, type PointerEvent as ReactPointerEvent } from "react";
import { ArrowLeft, ArrowRight, ExternalLink, Github, Info, X } from "lucide-react";
import { projects, profile, type Project } from "../lib/data";
import { PixelDoc, PixelNetwork, PixelShield, PixelStar } from "./PixelIcons";
import { useReducedMotion } from "../hooks/useReducedMotion";
import Reveal from "./Reveal";

type GlyphProps = { size?: number; color?: string; className?: string };

const COVERS: Record<string, { glyph: ComponentType<GlyphProps>; accent: string }> = {
  sentinelgraph: { glyph: PixelShield, accent: "var(--color-lavender)" },
  "elliptic-fraud-detection": { glyph: PixelNetwork, accent: "var(--color-cyan)" },
  gitresume: { glyph: PixelDoc, accent: "var(--color-pink)" },
};

// Repeating-glyph wallpaper, like a trading-card back pattern.
function CoverPattern({ glyph: Glyph, accent }: { glyph: ComponentType<GlyphProps>; accent: string }) {
  return (
    <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
      {Array.from({ length: 12 }).map((_, i) => {
        const col = i % 4;
        const row = Math.floor(i / 4);
        return (
          <div
            key={i}
            className="absolute"
            style={{
              left: `${col * 28 + (row % 2 === 1 ? 14 : 0) - 6}%`,
              top: `${row * 34 - 4}%`,
              opacity: 0.1,
            }}
          >
            <Glyph size={44} color={accent} />
          </div>
        );
      })}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(70% 80% at 50% 100%, color-mix(in oklch, ${accent} 22%, transparent), transparent)`,
        }}
      />
    </div>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const [detailsOpen, setDetailsOpen] = useState(false);
  const cover = COVERS[project.slug] ?? { glyph: PixelStar, accent: "var(--color-purple)" };
  const Glyph = cover.glyph;

  return (
    <article className="group relative w-[290px] shrink-0 rounded-3xl p-[1.5px] sm:w-[330px]">
      <div className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-within:opacity-100 project-border" />
      <div className="relative flex h-full flex-col overflow-hidden rounded-3xl" style={{ background: "var(--color-surface)" }}>
        {/* Cover art */}
        <div className="relative h-[190px] shrink-0 overflow-hidden" style={{ background: "var(--color-surface-2)" }}>
          <CoverPattern glyph={Glyph} accent={cover.accent} />
          <div
            className="absolute inset-0 flex items-center justify-center transition-transform duration-500 group-hover:scale-110"
            style={{ filter: `drop-shadow(0 0 18px color-mix(in oklch, ${cover.accent} 70%, transparent))` }}
          >
            <Glyph size={84} color={cover.accent} />
          </div>

          <span
            className="absolute left-4 top-4 rounded-full px-2.5 py-1 font-mono text-[10px] font-semibold"
            style={{ background: "color-mix(in oklch, var(--color-void) 70%, transparent)", color: cover.accent }}
          >
            {project.year} · {project.type}
          </span>

          <button
            type="button"
            data-cursor-interactive
            onClick={() => setDetailsOpen((o) => !o)}
            aria-expanded={detailsOpen}
            aria-label={detailsOpen ? `Hide details for ${project.title}` : `Show details for ${project.title}`}
            className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full transition-colors"
            style={{
              background: "color-mix(in oklch, var(--color-void) 70%, transparent)",
              color: "var(--color-ink)",
            }}
          >
            {detailsOpen ? <X size={14} /> : <Info size={14} />}
          </button>

          {/* Highlights overlay */}
          <div
            className={`absolute inset-0 flex flex-col justify-center gap-2 p-5 transition-opacity duration-300 ${
              detailsOpen ? "opacity-100" : "pointer-events-none opacity-0"
            }`}
            style={{ background: "color-mix(in oklch, var(--color-void) 88%, transparent)" }}
          >
            {project.highlights.map((h) => (
              <p key={h} className="flex gap-2 text-xs leading-relaxed" style={{ color: "var(--color-ink-muted)" }}>
                <span aria-hidden="true" style={{ color: cover.accent }}>
                  ▸
                </span>
                {h}
              </p>
            ))}
          </div>
        </div>

        {/* Info */}
        <div className="flex flex-1 flex-col p-5">
          <h3 className="font-display text-lg font-bold leading-tight" style={{ color: "var(--color-ink)" }}>
            {project.title}
          </h3>
          <p className="mt-0.5 font-mono text-xs" style={{ color: cover.accent }}>
            {project.subtitle}
          </p>
          <p className="mt-3 text-sm leading-relaxed" style={{ color: "var(--color-ink-muted)" }}>
            {project.description}
          </p>

          <div className="mt-4 flex flex-wrap gap-1.5">
            {project.tech.map((t) => (
              <span
                key={t}
                className="rounded-md px-2 py-0.5 font-mono text-[11px]"
                style={{
                  background: "var(--color-surface-2)",
                  color: "var(--color-ink-muted)",
                  border: "1px solid color-mix(in oklch, white 8%, transparent)",
                }}
              >
                {t}
              </span>
            ))}
          </div>

          <div
            className="mt-auto flex items-center gap-3 border-t pt-4"
            style={{ borderColor: "color-mix(in oklch, white 8%, transparent)", marginTop: "auto" }}
          >
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              data-cursor-interactive
              data-cursor-label="code"
              className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 font-mono text-xs font-medium"
              style={{ background: "var(--color-surface-2)", color: "var(--color-ink)" }}
            >
              <Github size={13} /> GitHub
            </a>
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noreferrer"
                data-cursor-interactive
                data-cursor-label="visit"
                className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 font-mono text-xs font-medium"
                style={{ background: cover.accent, color: "var(--color-void)" }}
              >
                <ExternalLink size={13} /> Live Demo
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

function MoreCard() {
  return (
    <article className="group relative w-[290px] shrink-0 rounded-3xl p-[1.5px] sm:w-[330px]">
      <div className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-within:opacity-100 project-border" />
      <a
        href={profile.github}
        target="_blank"
        rel="noreferrer"
        data-cursor-interactive
        data-cursor-label="github"
        className="relative flex h-full min-h-[420px] flex-col items-center justify-center gap-4 overflow-hidden rounded-3xl p-8 text-center"
        style={{ background: "var(--color-surface-2)" }}
      >
        <CoverPattern glyph={PixelStar} accent="var(--color-purple)" />
        <PixelStar size={64} color="var(--color-purple)" className="relative transition-transform duration-500 group-hover:scale-110" />
        <p className="relative font-display text-lg font-bold" style={{ color: "var(--color-ink)" }}>
          More on GitHub
        </p>
        <p className="relative max-w-[24ch] text-sm" style={{ color: "var(--color-ink-muted)" }}>
          Experiments, coursework, and whatever I'm currently nerd-sniped by.
        </p>
        <span
          className="relative inline-flex items-center gap-1.5 rounded-lg px-4 py-2 font-mono text-xs font-semibold"
          style={{ background: "var(--color-purple)", color: "var(--color-ink)" }}
        >
          <Github size={13} /> {profile.githubHandle}
        </span>
      </a>
    </article>
  );
}

export default function Projects() {
  const reducedMotion = useReducedMotion();
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  const drag = useRef({ active: false, startX: 0, startLeft: 0, moved: false });

  const updateScrollState = () => {
    const el = scrollerRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setProgress(max > 0 ? el.scrollLeft / max : 0);
    setAtStart(el.scrollLeft <= 1);
    setAtEnd(el.scrollLeft >= max - 1);
  };

  useEffect(() => {
    updateScrollState();
    window.addEventListener("resize", updateScrollState);
    return () => window.removeEventListener("resize", updateScrollState);
  }, []);

  const scrollByCards = (dir: 1 | -1) => {
    scrollerRef.current?.scrollBy({ left: dir * 354, behavior: reducedMotion ? "auto" : "smooth" });
  };

  // Mouse drag-to-scroll (touch already pans natively).
  const onPointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse" || e.button !== 0) return;
    const el = scrollerRef.current;
    if (!el) return;
    drag.current = { active: true, startX: e.clientX, startLeft: el.scrollLeft, moved: false };
  };
  const onPointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!drag.current.active) return;
    const dx = e.clientX - drag.current.startX;
    if (Math.abs(dx) > 5) drag.current.moved = true;
    if (drag.current.moved && scrollerRef.current) {
      scrollerRef.current.scrollLeft = drag.current.startLeft - dx;
    }
  };
  const endDrag = () => {
    drag.current.active = false;
  };
  const onClickCapture = (e: React.MouseEvent) => {
    if (drag.current.moved) {
      e.preventDefault();
      e.stopPropagation();
      drag.current.moved = false;
    }
  };

  return (
    <div className="relative mx-auto flex min-h-full w-full max-w-6xl flex-col justify-center px-6 py-24 sm:px-10 sm:py-20">
      <Reveal>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-balance text-[clamp(2rem,4.5vw,3.25rem)] font-bold" style={{ color: "var(--color-ink)" }}>
              Things I've shipped
            </h2>
            <p className="mt-3 max-w-xl text-base" style={{ color: "var(--color-ink-muted)" }}>
              Collect the whole set — scroll, drag, or use the arrows to flip through.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => scrollByCards(-1)}
              disabled={atStart}
              data-cursor-interactive
              aria-label="Previous cards"
              className="glass flex h-10 w-10 items-center justify-center rounded-full transition-opacity disabled:opacity-30"
              style={{ color: "var(--color-ink)" }}
            >
              <ArrowLeft size={16} />
            </button>
            <button
              type="button"
              onClick={() => scrollByCards(1)}
              disabled={atEnd}
              data-cursor-interactive
              aria-label="Next cards"
              className="glass flex h-10 w-10 items-center justify-center rounded-full transition-opacity disabled:opacity-30"
              style={{ color: "var(--color-ink)" }}
            >
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </Reveal>

      <Reveal delay={0.12}>
        <div className="relative mt-10 -mx-6 sm:-mx-10">
          {/* Edge fades */}
          <div
            className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 transition-opacity duration-300 sm:w-16"
            style={{ background: "linear-gradient(90deg, var(--color-void), transparent)", opacity: atStart ? 0 : 1 }}
          />
          <div
            className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 transition-opacity duration-300 sm:w-16"
            style={{ background: "linear-gradient(270deg, var(--color-void), transparent)", opacity: atEnd ? 0 : 1 }}
          />

          <div
            ref={scrollerRef}
            data-hscroll-region
            role="region"
            aria-label="Project cards, scroll horizontally"
            tabIndex={0}
            onScroll={updateScrollState}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={endDrag}
            onPointerLeave={endDrag}
            onClickCapture={onClickCapture}
            className="no-scrollbar flex gap-6 overflow-x-auto px-6 py-2 sm:px-10"
            style={{ overscrollBehaviorX: "contain" }}
          >
            {projects.map((p) => (
              <ProjectCard key={p.slug} project={p} />
            ))}
            <MoreCard />
          </div>
        </div>
      </Reveal>

      {/* Scroll progress */}
      <Reveal delay={0.2}>
        <div className="mx-auto mt-6 h-[3px] w-40 overflow-hidden rounded-full" style={{ background: "var(--color-surface-2)" }} aria-hidden="true">
          <div
            className="h-full rounded-full transition-transform duration-150 ease-out"
            style={{
              width: "40%",
              background: "linear-gradient(90deg, var(--color-lavender), var(--color-pink))",
              transform: `translateX(${progress * 150}%)`,
            }}
          />
        </div>
      </Reveal>
    </div>
  );
}
