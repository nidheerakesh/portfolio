import { Braces, Cpu, Layers, Wrench } from "lucide-react";
import { techStack, type TechStackItem } from "../lib/data";
import Reveal from "./Reveal";

const CATEGORY_META: Record<TechStackItem["category"], { label: string; icon: typeof Braces; accent: string }> = {
  language: { label: "languages", icon: Braces, accent: "var(--color-lavender)" },
  "ai-ml": { label: "ai / ml", icon: Cpu, accent: "var(--color-purple)" },
  framework: { label: "frameworks", icon: Layers, accent: "var(--color-cyan)" },
  tool: { label: "tools", icon: Wrench, accent: "var(--color-pink)" },
};

export default function TechStack() {
  const grouped = (Object.keys(CATEGORY_META) as TechStackItem["category"][]).map((cat) => ({
    cat,
    items: techStack.filter((t) => t.category === cat),
  }));

  return (
    <div className="relative mx-auto flex min-h-full max-w-6xl flex-col justify-center px-6 py-24 sm:px-10 sm:py-20">
      <Reveal>
        <h2 className="font-display text-balance text-[clamp(2rem,4.5vw,3.25rem)] font-bold" style={{ color: "var(--color-ink)" }}>
          My desk, digitally
        </h2>
        <p className="mt-3 max-w-xl text-base" style={{ color: "var(--color-ink-muted)" }}>
          Folders on my dev-den desk — everything I keep reaching for.
        </p>
      </Reveal>

      <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2">
        {grouped.map(({ cat, items }, gi) => {
          const meta = CATEGORY_META[cat];
          const Icon = meta.icon;
          return (
            <Reveal key={cat} delay={gi * 0.1}>
              <div className="relative">
                <div
                  className="ml-4 inline-flex items-center gap-1.5 rounded-t-lg px-3 py-1.5 font-mono text-[11px] font-semibold uppercase tracking-wide"
                  style={{ background: "var(--color-surface-2)", color: meta.accent }}
                >
                  <Icon size={12} /> {meta.label}
                </div>
                <div
                  className="rounded-2xl rounded-tl-none p-5"
                  style={{ background: "var(--color-surface-2)", border: "1px solid color-mix(in oklch, white 8%, transparent)" }}
                >
                  <div className="flex flex-wrap gap-2">
                    {items.map((item) => (
                      <span
                        key={item.name}
                        data-cursor-interactive
                        className="rounded-lg px-3 py-1.5 font-mono text-sm transition-transform hover:-translate-y-0.5"
                        style={{
                          background: "var(--color-surface)",
                          color: "var(--color-ink)",
                          border: `1px solid color-mix(in oklch, ${meta.accent} 30%, transparent)`,
                        }}
                      >
                        {item.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </div>
  );
}
