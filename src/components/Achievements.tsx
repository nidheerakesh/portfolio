import { Award } from "lucide-react";
import { achievements, achievementStats } from "../lib/data";
import Reveal from "./Reveal";
import { PixelStar } from "./PixelIcons";

export default function Achievements() {
  return (
    <div className="relative mx-auto flex min-h-full max-w-6xl flex-col justify-center px-6 py-24 sm:px-10 sm:py-20">
      <Reveal>
        <h2 className="font-display text-balance text-[clamp(2rem,4.5vw,3.25rem)] font-bold" style={{ color: "var(--color-ink)" }}>
          A few things I'm proud of
        </h2>
      </Reveal>

      <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {achievementStats.map((stat, i) => (
          <Reveal key={stat.label} delay={i * 0.08}>
            <div className="glass rounded-2xl p-6 text-center">
              <div className="font-display text-4xl font-bold" style={{ color: "var(--color-lavender)" }}>
                {stat.value}
              </div>
              <p className="mt-2 text-sm" style={{ color: "var(--color-ink-muted)" }}>
                {stat.label}
              </p>
            </div>
          </Reveal>
        ))}
      </div>

      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2">
        {achievements.map((a, i) => (
          <Reveal key={`${a.title}-${a.org}`} delay={0.1 + i * 0.08}>
            <div
              data-cursor-interactive
              className="group flex gap-4 rounded-2xl p-5 transition-colors"
              style={{ background: "var(--color-surface)", border: "1px solid color-mix(in oklch, white 8%, transparent)" }}
            >
              <div
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-transform group-hover:scale-110 group-hover:rotate-6"
                style={{ background: "color-mix(in oklch, var(--color-pink) 16%, transparent)" }}
              >
                <Award size={19} color="var(--color-pink)" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="font-display font-semibold" style={{ color: "var(--color-ink)" }}>
                    {a.title} · {a.org}
                  </h3>
                  {a.ongoing && <PixelStar size={12} color="var(--color-cyan)" />}
                </div>
                <p className="mt-1 text-sm leading-relaxed" style={{ color: "var(--color-ink-muted)" }}>
                  {a.description}
                </p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
