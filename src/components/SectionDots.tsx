import { useSectionPager } from "../lib/SectionPagerContext";

const LABELS: Record<string, string> = {
  hero: "Intro",
  about: "About",
  skills: "Skills",
  projects: "Projects",
  experience: "Experience",
  achievements: "Achievements",
  stack: "Tech stack",
  contact: "Contact",
};

export default function SectionDots() {
  const { index, ids, goTo } = useSectionPager();

  return (
    <nav
      aria-label="Section navigation"
      className="fixed right-4 top-1/2 z-[70] hidden -translate-y-1/2 flex-col items-end gap-3 sm:flex md:right-6"
    >
      {ids.map((id, i) => {
        const active = i === index;
        return (
          <button
            key={id}
            type="button"
            onClick={() => goTo(i)}
            data-cursor-interactive
            data-cursor-label={LABELS[id]}
            aria-label={`Go to ${LABELS[id]} section`}
            aria-current={active ? "true" : undefined}
            className="group flex items-center gap-2"
          >
            <span
              className="pointer-events-none whitespace-nowrap rounded-md px-2 py-1 font-mono text-[10px] opacity-0 transition-opacity duration-200 group-hover:opacity-100"
              style={{ background: "var(--color-surface-2)", color: "var(--color-ink)" }}
            >
              {LABELS[id]}
            </span>
            <span
              className="block rounded-full transition-all duration-300"
              style={{
                width: active ? 10 : 7,
                height: active ? 10 : 7,
                background: active ? "var(--color-lavender)" : "var(--color-ink-faint)",
                boxShadow: active ? "0 0 10px var(--color-lavender)" : "none",
              }}
            />
          </button>
        );
      })}
    </nav>
  );
}
