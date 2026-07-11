import { useState } from "react";
import { Menu, X } from "lucide-react";
import { PixelSparkle } from "./PixelIcons";
import { profile } from "../lib/data";
import { useSectionPager } from "../lib/SectionPagerContext";

const LINKS = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "achievements", label: "Achievements" },
  { id: "stack", label: "Stack" },
  { id: "contact", label: "Contact" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const { ids, index, goToId } = useSectionPager();
  const activeId = ids[index];

  return (
    <>
      <a
        href="#main-content"
        onClick={(e) => {
          e.preventDefault();
          document.getElementById("main-content")?.focus();
        }}
        className="fixed left-4 top-4 z-[100] -translate-y-24 focus:translate-y-0 rounded-lg px-4 py-2 font-mono text-sm font-semibold transition-transform"
        style={{ background: "var(--color-lavender)", color: "var(--color-void)" }}
      >
        Skip to content
      </a>

      <header className="fixed inset-x-0 top-0 z-50 py-4">
        <nav
          aria-label="Primary"
          className="glass mx-auto flex max-w-5xl items-center justify-between rounded-2xl px-4 py-2.5 sm:px-6"
        >
          <button
            type="button"
            onClick={() => goToId("hero")}
            data-cursor-interactive
            data-cursor-label="home"
            className="flex items-center gap-2 font-display text-sm font-semibold tracking-tight"
          >
            <PixelSparkle size={16} color="var(--color-pink)" />
            <span style={{ color: "var(--color-ink)" }}>{profile.firstName}</span>
            <span className="hidden font-mono text-xs font-normal sm:inline" style={{ color: "var(--color-ink-faint)" }}>
              ~/portfolio
            </span>
          </button>

          <ul className="hidden items-center gap-1 md:flex">
            {LINKS.map((link) => (
              <li key={link.id}>
                <button
                  type="button"
                  onClick={() => goToId(link.id)}
                  data-cursor-interactive
                  aria-current={activeId === link.id ? "true" : undefined}
                  className="rounded-lg px-3 py-1.5 font-mono text-xs transition-colors"
                  style={{
                    color: activeId === link.id ? "var(--color-lavender)" : "var(--color-ink-muted)",
                    background: activeId === link.id ? "color-mix(in oklch, var(--color-lavender) 12%, transparent)" : "transparent",
                  }}
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>

          <a
            href={profile.resumeUrl}
            download
            data-cursor-interactive
            data-cursor-label="download"
            className="hidden rounded-lg px-3 py-1.5 font-mono text-xs font-semibold md:inline-block"
            style={{ background: "var(--color-pink)", color: "var(--color-void)" }}
          >
            Resume
          </a>

          <button
            type="button"
            className="rounded-lg p-2 md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            data-cursor-interactive
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </nav>

        {open && (
          <div className="glass mx-4 mt-2 rounded-2xl p-4 md:hidden">
            <ul className="flex flex-col gap-1">
              {LINKS.map((link) => (
                <li key={link.id}>
                  <button
                    type="button"
                    onClick={() => {
                      setOpen(false);
                      goToId(link.id);
                    }}
                    aria-current={activeId === link.id ? "true" : undefined}
                    className="block w-full rounded-lg px-3 py-2 text-left font-mono text-sm"
                    style={{ color: activeId === link.id ? "var(--color-lavender)" : "var(--color-ink-muted)" }}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
              <li>
                <a
                  href={profile.resumeUrl}
                  download
                  className="mt-1 block rounded-lg px-3 py-2 text-center font-mono text-sm font-semibold"
                  style={{ background: "var(--color-pink)", color: "var(--color-void)" }}
                >
                  Resume
                </a>
              </li>
            </ul>
          </div>
        )}
      </header>
    </>
  );
}
