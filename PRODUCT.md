# Product

## Register

brand

## Users

Recruiters, hiring managers, fellow devs, and event/club organizers landing on Nidhi Rakesh's personal site — usually from a resume link, GitHub profile, or LinkedIn. They're scanning fast (10-30s) to answer: "is this person technically sharp, and do I want to talk to them?" Job to be done: quickly verify real project depth (not tutorial clones), skim skills/experience, and get a way to reach out or grab the resume — while coming away remembering the site, not just the resume bullet points.

## Product Purpose

A personal portfolio for a CS (AI & Data Science) student at IIIT Kottayam that proves technical craft through the site itself, not just its content list. Success = a visitor spends longer than they planned to, notices the custom cursor/motion system unprompted, and still finds the actual info (projects, experience, contact) in under a minute despite the heavy visual personality.

## Brand Personality

Cozy, playful, technically sharp — "indie hacker's late-night pixel-game dev den," not "corporate dark-mode SaaS." Confident but not flashy-for-its-own-sake; every animation should feel handcrafted and a little mischievous (easter eggs, pixel sparkles, a wandering cat) rather than generic "AI startup" polish. Should read as unmistakably made-by-a-person, not templated.

## Anti-references

- Generic dark-mode SaaS landing pages (gradient-text hero, hero-metric blocks, identical icon+heading+text card grids)
- Cream/beige "safe minimalist" resume-template sites
- Bootstrap-y default portfolio templates with stock hero photos and generic Bootstrap cards
- Loud neon cyberpunk (saturated magenta/electric blue) — this is *muted*, cozy-dark, not arcade-bright

## Design Principles

1. The cursor and particle system are functional signature elements, not decoration bolted on last — build them first-class, not as an afterthought layer.
2. Every animation must earn its place and degrade gracefully under `prefers-reduced-motion` — polish, not distraction.
3. Content stays scannable and real (actual projects/experience/links) despite heavy visual personality — recruiters must find substance fast.
4. Dark + cozy, not dark + corporate: muted pastel accents (lavender/pink/cyan) on near-black, never saturated neon.
5. Full keyboard navigation and screen-reader support are hard requirements, not nice-to-haves, given the custom-cursor/motion-heavy UI.

## Accessibility & Inclusion

WCAG AA minimum. Explicit hard requirement (per user): full keyboard navigability (visible focus states, logical tab order, all interactive elements reachable without a mouse) and screen-reader support (semantic landmarks, alt text, aria-labels on icon-only buttons, live-region announcements kept minimal/non-intrusive). Custom cursor must never be the only way to perceive interactive state — hover/focus states must also show via standard CSS focus/hover, and the OS cursor must remain functional (custom cursor is additive, not a replacement that breaks native accessibility tooling). Every decorative/looping animation (particles, floating cat, parallax, sparkles) needs a `prefers-reduced-motion: reduce` fallback that removes motion, not just slows it.
