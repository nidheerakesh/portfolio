import { MapPin } from "lucide-react";
import { experience } from "../lib/data";
import Reveal from "./Reveal";

export default function Experience() {
  return (
    <div className="relative mx-auto flex min-h-full max-w-4xl flex-col justify-center px-6 py-24 sm:px-10 sm:py-20">
      <Reveal>
        <h2 className="font-display text-balance text-[clamp(2rem,4.5vw,3.25rem)] font-bold" style={{ color: "var(--color-ink)" }}>
          Where I've been building
        </h2>
      </Reveal>

      <ol className="relative mt-16 space-y-12 border-l pl-8 sm:pl-10" style={{ borderColor: "color-mix(in oklch, var(--color-lavender) 25%, transparent)" }}>
        {experience.map((item, i) => (
          <Reveal as="li" key={item.org} delay={i * 0.12} className="relative">
            <span
              className="absolute -left-[calc(2rem+7px)] top-1.5 h-3.5 w-3.5 rounded-full sm:-left-[calc(2.5rem+7px)]"
              style={{
                background: "var(--color-lavender)",
                boxShadow: "0 0 0 4px var(--color-void), 0 0 14px var(--color-lavender)",
              }}
              aria-hidden="true"
            />
            <div className="glass rounded-2xl p-6">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="font-display text-lg font-bold" style={{ color: "var(--color-ink)" }}>
                  {item.role}
                </h3>
                <span className="font-mono text-xs" style={{ color: "var(--color-cyan)" }}>
                  {item.period}
                </span>
              </div>
              <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1">
                <span className="font-medium" style={{ color: "var(--color-pink)" }}>
                  {item.org}
                </span>
                <span className="inline-flex items-center gap-1 font-mono text-xs" style={{ color: "var(--color-ink-faint)" }}>
                  <MapPin size={11} /> {item.location}
                </span>
              </div>
              <ul className="mt-4 space-y-2">
                {item.bullets.map((b) => (
                  <li key={b} className="flex gap-2 text-sm leading-relaxed" style={{ color: "var(--color-ink-muted)" }}>
                    <span aria-hidden="true" style={{ color: "var(--color-lavender)" }}>
                      ▸
                    </span>
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </ol>
    </div>
  );
}
