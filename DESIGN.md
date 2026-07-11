# Design

## Theme

Dark mode only — cozy pixel-game dev den, not corporate dark UI. Near-black charcoal surfaces, muted pastel accents, soft glows instead of hard neon.

## Color Palette (OKLCH)

```css
--bg-void: oklch(0.06 0.005 285);      /* #0B0B0F equivalent */
--bg-base: oklch(0.09 0.005 285);      /* #111111 equivalent */
--bg-surface: oklch(0.13 0.008 285);   /* #18181B equivalent */
--bg-surface-2: oklch(0.17 0.01 285);  /* slightly lifted card bg */

--ink: oklch(0.94 0.01 280);           /* primary text */
--ink-muted: oklch(0.72 0.015 280);    /* secondary text, still >=4.5:1 on bg-base */
--ink-faint: oklch(0.52 0.015 280);    /* tertiary/meta text only, large text use */

--lavender: oklch(0.78 0.09 290);      /* soft lavender accent */
--pink: oklch(0.80 0.10 350);          /* pastel pink accent */
--purple: oklch(0.62 0.16 305);        /* neon purple, used sparingly for glow/CTA */
--cyan: oklch(0.78 0.09 210);          /* muted cyan accent */

--border-hair: oklch(1 0 0 / 0.08);
--border-hover: oklch(0.78 0.09 290 / 0.4);
```

Strategy: **restrained-to-committed** — near-black neutrals carry the surface, the four pastel accents rotate per-section (lavender = primary/links, pink = secondary CTA/hover, purple = glow/emphasis only, cyan = code/tech accents) rather than all four competing on one element. No saturated neon; every accent glow uses `color/0.25-0.4` opacity blur, never full-strength fill.

## Typography

- Display/headings: **Space Grotesk** (geometric, slightly futuristic, pairs with pixel motif)
- Body: **Space Grotesk** regular/medium (single-family system, weight does the differentiation — 700/600 headings, 400/500 body)
- Mono accents (terminal contact box, tech badges, code snippets): **JetBrains Mono** or **Space Mono**
- Scale: hero clamp(2.75rem, 6vw, 5.5rem) [≤6rem ceiling], section titles clamp(2rem, 4vw, 3.25rem), body 1rem-1.125rem, line length capped ~65ch in prose blocks
- Letter-spacing floor -0.03em on display (never below -0.04em)
- `text-wrap: balance` on all h1-h3, `text-wrap: pretty` on paragraph copy

## Components

- **Cards**: `bg-surface`, 1px `border-hair`, radius 1rem-1.25rem, backdrop-blur only on floating/overlapping cards (glassmorphism used purposefully, not everywhere — flat surfaces on the base grid, glass on hero photo frame + floating nav + toasts). Hover: pixel-notched border animates in (steps of 2px offset corners), soft glow shadow in the section's accent color, 2-4px lift via transform.
- **Project cards**: same base + animated conic-gradient border on hover (accent-colored, slow rotate), tech badges as small mono pills with 1px border, live/GitHub as icon+label ghost buttons.
- **Skill pills**: floating glass pills, subtle idle float animation (staggered per-pill), glow ring in per-category accent color, no percentage/progress-bar metaphor anywhere.
- **Buttons**: primary = solid `ink`-on-`purple/pink` gradient-free (single flat accent + glow shadow), secondary = ghost with accent border. Magnetic pull on desktop pointer proximity, disabled under reduced-motion.
- **Custom cursor**: replaces native cursor on pointer:fine devices only; 48-64px pixel-art glyph, squish (scaleY 0.8) on mousedown, rotates toward velocity vector, leaves a decaying trail of 4-8px glowing pixel squares, swaps glyph (e.g. open hand/target reticle) over `[data-cursor="interactive"]` elements. Falls back to native cursor on touch/coarse pointers and under reduced-motion (trail disabled, glyph static).
- **Contact terminal**: mono-font dark glass window with macOS-style traffic-light dots (muted, not red/yellow/green — accent-tinted), blinking block cursor `_` via `steps()` animation, content typed/revealed once on scroll-into-view (not looping).

## Layout

- Paginated, not continuous-scroll: each section is a full-viewport "slide" (`Slide.tsx`, `100dvh`, `position:fixed`). Wheel/touch/keyboard (Arrow/PageUp/PageDown/Home/End) advance one section at a time via `SectionPagerContext`; the page itself never scrolls, only the active slide swaps in with a translateY + opacity transition. A section whose content overflows `100dvh` scrolls internally first (`[data-scroll-region]`) and only hands off to the next slide once the user hits that internal scroll boundary.
- Section title cadence: large left/center-aligned oversized title, no numbered eyebrows, no uppercase-tracked kicker on every section — vary the intro treatment per section (Hero = name lockup, About = short pull-quote style line, Projects = title + one-line framing, etc.) so it doesn't read as one repeated template
- Content max-width ~1200-1280px per slide, vertically centered (`flex + justify-center`) when it fits one viewport
- Projects: `repeat(auto-fit, minmax(320px,1fr))` grid. Skills: flex-wrap pill cloud, not a grid.
- Nav: minimal floating pill nav, glass, always visible; a secondary vertical dot-pager (`SectionDots.tsx`) on the right shows/controls the current slide index, mirrored by a top progress bar keyed to slide index (not scroll position)

## Motion

- Scroll reveals: staggered per-section (fade + 12-16px translateY + slight scale 0.98→1), each section's stagger shaped to its content (cards stagger by index, hero elements stagger by role: badge → name → subtitle → CTAs)
- Ease: expo/quart ease-out, no bounce/elastic anywhere except the cursor squish (which is a deliberate springy exception) and the easter-egg cat bob
- Background: slow parallax star/pixel-square drift (60-120s loops), grain texture via animated SVG turbulence at very low opacity, occasional sparkle bursts (randomized interval, not per-frame)
- `prefers-reduced-motion: reduce`: disable cursor trail + rotation, disable parallax/float loops (crossfade only), disable magnetic buttons, keep scroll reveals as instant-or-simple-fade
- Easter eggs (all opt-in/rare, never blocking content): Konami code → brief full-screen pixel-burst + toast; floating cat crosses screen on a long randomized timer; interaction-count secret achievement toast; cursor spawns tiny star particles on click

## Anti-patterns to avoid here specifically

No gradient text, no side-stripe borders, no uniform numbered eyebrows on every section, no identical icon+heading+text card grid for About/Skills/Achievements (each section gets a distinct layout shape), no percentage progress bars for skills.
