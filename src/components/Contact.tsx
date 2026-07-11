import { Download, Github, Linkedin, Mail, Phone } from "lucide-react";
import { profile } from "../lib/data";
import Reveal from "./Reveal";
import { PixelHeart } from "./PixelIcons";

const LINES = [
  { icon: Mail, label: "email", value: profile.email, href: `mailto:${profile.email}` },
  { icon: Github, label: "github", value: profile.githubHandle, href: profile.github },
  { icon: Linkedin, label: "linkedin", value: profile.linkedinHandle, href: profile.linkedin },
  { icon: Phone, label: "phone", value: profile.phone, href: `tel:${profile.phone.replace(/[^+\d]/g, "")}` },
];

export default function Contact() {
  return (
    <div className="relative mx-auto flex min-h-full max-w-3xl flex-col justify-center px-6 py-24 sm:px-10 sm:py-20">
      <Reveal>
        <h2 className="font-display text-balance text-center text-[clamp(2rem,4.5vw,3.25rem)] font-bold" style={{ color: "var(--color-ink)" }}>
          Let's talk
        </h2>
        <p className="mt-3 text-center text-base" style={{ color: "var(--color-ink-muted)" }}>
          Open to internships, collabs, and interesting graph-shaped problems.
        </p>
      </Reveal>

      <Reveal delay={0.15} className="mt-12">
        <div className="glass overflow-hidden rounded-2xl" style={{ boxShadow: "0 0 60px -20px color-mix(in oklch, var(--color-purple) 60%, transparent)" }}>
          <div className="flex items-center gap-1.5 border-b px-4 py-3" style={{ borderColor: "color-mix(in oklch, white 10%, transparent)" }}>
            <span className="h-2.5 w-2.5 rounded-full" style={{ background: "var(--color-pink)" }} />
            <span className="h-2.5 w-2.5 rounded-full" style={{ background: "var(--color-lavender)" }} />
            <span className="h-2.5 w-2.5 rounded-full" style={{ background: "var(--color-cyan)" }} />
            <span className="ml-2 font-mono text-xs" style={{ color: "var(--color-ink-faint)" }}>
              contact.sh
            </span>
          </div>

          <div className="p-6 font-mono text-sm sm:p-8">
            <p style={{ color: "var(--color-ink-faint)" }}>
              <span style={{ color: "var(--color-cyan)" }}>nidhi@portfolio</span>:~$ ./reach-me.sh
            </p>

            <ul className="mt-5 space-y-3">
              {LINES.map((line, i) => (
                <Reveal as="li" key={line.label} delay={0.2 + i * 0.1}>
                  <a
                    href={line.href}
                    target={line.href.startsWith("http") ? "_blank" : undefined}
                    rel={line.href.startsWith("http") ? "noreferrer" : undefined}
                    data-cursor-interactive
                    data-cursor-label={line.label}
                    className="group flex items-center gap-3 rounded-lg px-2 py-1.5 transition-colors hover:bg-[color-mix(in_oklch,white_6%,transparent)]"
                  >
                    <line.icon size={15} style={{ color: "var(--color-lavender)" }} />
                    <span style={{ color: "var(--color-ink-faint)" }}>{line.label}:</span>
                    <span
                      className="underline-offset-4 group-hover:underline"
                      style={{ color: "var(--color-ink)" }}
                    >
                      {line.value}
                    </span>
                  </a>
                </Reveal>
              ))}
            </ul>

            <Reveal delay={0.65}>
              <a
                href={profile.resumeUrl}
                download
                data-cursor-interactive
                data-cursor-label="download"
                className="mt-6 inline-flex items-center gap-2 rounded-lg px-4 py-2.5 font-mono text-xs font-semibold"
                style={{ background: "var(--color-pink)", color: "var(--color-void)" }}
              >
                <Download size={13} /> download resume.pdf
              </a>
            </Reveal>

            <p className="mt-6" style={{ color: "var(--color-ink-faint)" }}>
              <span style={{ color: "var(--color-cyan)" }}>nidhi@portfolio</span>:~${" "}
              <span aria-hidden="true" style={{ animation: "blink-cursor 1s steps(1) infinite" }}>
                █
              </span>
              <span className="sr-only">Terminal ready for input.</span>
            </p>
          </div>
        </div>
      </Reveal>

      <p className="mt-10 text-center font-mono text-xs" style={{ color: "var(--color-ink-faint)" }}>
        built with React, Tailwind &amp; way too many pixel sparkles.
      </p>

      <p
        className="mt-3 inline-flex items-center justify-center gap-1.5 self-center font-mono text-xs"
        style={{ color: "var(--color-ink-faint)" }}
      >
        made with <PixelHeart size={12} color="var(--color-pink)" /> in Kottayam · try the Konami code
      </p>
    </div>
  );
}
