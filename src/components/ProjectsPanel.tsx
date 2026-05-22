import React, { useState, useEffect } from "react";
import { projectsData } from "../data";
import { Project, ExplanationLevel } from "../types";
import { FolderGit2, ArrowUpRight, Github, Sparkles, BookOpen, UserCheck, Cpu, Code2, Play } from "lucide-react";
import { useStudySync } from "../hooks/useStudySync";

interface ProjectsPanelProps {
  onNotify: (msg: string, type: "success" | "info" | "bubble") => void;
}

export default function ProjectsPanel({ onNotify }: ProjectsPanelProps) {
  // Reactive Sync state from the planner website integration pipeline
  const [isSyncActive, setIsSyncActive] = useState<boolean>(() => {
    return localStorage.getItem("nidhi_planner_active") !== "false";
  });

  useEffect(() => {
    const checkState = () => {
      setIsSyncActive(localStorage.getItem("nidhi_planner_active") !== "false");
    };
    window.addEventListener("planner_sync_state_toggled", checkState as EventListener);
    return () => {
      window.removeEventListener("planner_sync_state_toggled", checkState as EventListener);
    };
  }, []);

  const { portfolioData } = useStudySync(isSyncActive, 30000);

  // Explain-It AI Interactive Bench State
  const [selectedLevel, setSelectedLevel] = useState<ExplanationLevel>("student");
  const [conceptInput, setConceptInput] = useState("");
  const [aiResult, setAiResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleAiExplain = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!conceptInput.trim()) {
      onNotify("Please enter a concept to explain!", "info");
      return;
    }

    setIsLoading(true);
    setErrorMsg("");
    setAiResult("");

    try {
      const response = await fetch("/api/explain", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          concept: conceptInput,
          level: selectedLevel,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch AI explanation");
      }

      setAiResult(data.text);
      onNotify("AI Explanation generated successfully!", "success");
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || "Something went wrong.");
      onNotify("Failed to fetch AI explanation.", "info");
    } finally {
      setIsLoading(false);
    }
  };

  const loadPresetConcept = (concept: string) => {
    setConceptInput(concept);
    onNotify(`Selected: "${concept}"`, "info");
  };

  return (
    <div className="w-full h-full text-[#2B2B2B] h-auto font-sans">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b-4 border-[#2B2B2B] pb-4 mb-6">
        <div>
          <h2 className="font-heading text-3xl font-extrabold flex items-center gap-3">
            <span className="text-4xl">📁</span> Projects Notebook
          </h2>
          <p className="text-sm font-mono text-[#2B2B2B]/75 mt-1">
            src/portfolio/projects/ - engineering solutions & learning prototypes
          </p>
        </div>
        <div className="flex gap-2">
          <span className="px-3 py-1 bg-blush-pink font-mono text-xs border-2 border-[#2B2B2B] rounded-full shadow-[2px_2px_0px_0px_#2B2B2B]">
            4 Active Repos
          </span>
          <span className="px-3 py-1 bg-dusty-lavender font-mono text-xs border-2 border-[#2B2B2B] rounded-full shadow-[2px_2px_0px_0px_#2B2B2B]">
            B.Tech 2nd Year
          </span>
        </div>
      </div>

      {/* Grid of Projects */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
        {projectsData.map((project: Project, idx: number) => {
          const isPrimary = project.id === "01"; // Explain-it AI
          return (
            <div
              key={project.id}
              className={`bg-white border-4 border-[#2B2B2B] rounded-2xl shadow-[5px_5px_0px_0px_#2B2B2B] hover:shadow-[8px_8px_0px_0px_#2B2B2B] hover:-translate-y-1 transition-all p-5 relative overflow-hidden ${
                isPrimary ? "bg-[#FFF7F8]" : ""
              }`}
            >
              {/* Notebook Spiral Accent - Top margin tore off effect */}
              <div className="absolute top-0 left-6 right-6 flex justify-between">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="w-3 h-5 bg-soft-gray border-2 border-[#2B2B2B] rounded-b-md shadow-inner"
                  ></div>
                ))}
              </div>

              {/* Card content start */}
              <div className="mt-4 flex justify-between items-start">
                <div>
                  <span className="px-2 py-0.5 bg-[#2B2B2B] text-white font-mono text-xs rounded-md">
                    PROJECT {project.id}
                  </span>
                  <h3 className="font-heading text-2xl font-bold flex items-center gap-2 mt-2">
                    <span>{project.emoji}</span> {project.title}
                  </h3>
                </div>
                <div className="text-xs font-mono px-2 py-1 bg-rose-pink/40 border-2 border-[#2B2B2B] rounded-lg">
                  {project.type}
                </div>
              </div>

              <div className="mt-4 mb-4 font-mono text-xs text-[#2B2B2B]/70 flex flex-wrap gap-1.5 border-b-2 border-dashed border-[#2B2B2B]/20 pb-3">
                <span className="font-bold text-[#2B2B2B]">STACK:</span>
                {project.stack.map((t, i) => (
                  <span key={i} className="bg-soft-gray px-1.5 py-0.5 rounded border border-[#2B2B2B]/20">
                    {t}
                  </span>
                ))}
              </div>

              <p className="text-sm text-[#2B2B2B] leading-relaxed mb-4">
                {project.description}
              </p>

              {/* Project Progress Sync widget with Planner database */}
              {(() => {
                let pct = 0;
                let statusText = "Offline Sandbox Mode";
                
                if (isSyncActive && portfolioData && project.syncCategory) {
                  const catData = portfolioData.categories[project.syncCategory];
                  if (catData && catData.total > 0) {
                    pct = Math.round((catData.completed / catData.total) * 100);
                    statusText = `${pct}% (${catData.completed}/${catData.total} Tasks) — Live`;
                  } else {
                    statusText = "0% (Awaiting Tasks)";
                  }
                } else if (isSyncActive && !portfolioData) {
                  statusText = "Syncing from AEON...";
                } else if (!isSyncActive) {
                  pct = project.id === "01" ? 80 : project.id === "02" ? 65 : project.id === "03" ? 95 : 30;
                  statusText = `${pct}% (Offline Demo)`;
                }

                return (
                  <div className="mb-5 bg-cream p-3 border-2 border-[#2B2B2B] rounded-xl text-xs font-mono">
                    <div className="flex justify-between font-bold mb-1 items-center">
                      <span className="text-[10px] tracking-tight uppercase text-[#2B2B2B]/60">📈 planner milestone progress:</span>
                      <span className="text-[10px] bg-white border border-[#2B2B2B] rounded px-1.5 font-bold">
                        {statusText}
                      </span>
                    </div>
                    <div className="w-full bg-white h-4 border-2 border-[#2B2B2B] rounded-md overflow-hidden p-0.5 flex">
                      <div 
                        className={`h-full rounded transition-all duration-500 ${
                          !isSyncActive ? "bg-gray-400/80" :
                          project.id === "01" ? "bg-rose-pink" :
                          project.id === "02" ? "bg-dusty-lavender" :
                          project.id === "03" ? "bg-emerald-400" : "bg-amber-300"
                        }`}
                        style={{ width: `${pct}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-[8px] text-[#2B2B2B]/50 mt-1 uppercase">
                      <span>Setup</span>
                      <span>{isSyncActive ? "Active Pipeline" : "Sync Disabled"}</span>
                    </div>
                  </div>
                );
              })()}

              <div className="space-y-1.5 mb-5">
                <p className="text-xs font-mono font-bold text-[#2B2B2B]">KEY DELIVERABLES:</p>
                {project.details.map((detail, idx) => (
                  <div key={idx} className="flex gap-2 items-start text-xs text-[#2B2B2B]/90 font-sans">
                    <span className="text-rose-pink font-bold mt-0.5">↳</span>
                    <span>{detail}</span>
                  </div>
                ))}
              </div>

              {/* Card Footer Links */}
              <div className="flex justify-between items-center bg-white border-2 border-[#2B2B2B] p-2.5 rounded-xl shadow-[3px_3px_0px_0px_#2B2B2B]">
                <div className="flex gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-blush-pink border border-[#2B2B2B]"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-pink border border-[#2B2B2B]"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-dusty-lavender border border-[#2B2B2B]"></span>
                </div>
                <div className="flex gap-2 font-mono text-xs">
                  <a
                    href={project.github}
                    target="_blank"
                    referrerPolicy="no-referrer"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 hover:text-rose-pink border-r border-[#2B2B2B] pr-3"
                    onClick={(e) => {
                      if (project.github === "https://github.com") {
                        e.preventDefault();
                        onNotify("Code is securely archived in her GitHub repo!", "success");
                      }
                    }}
                  >
                    <Github size={14} /> [ github ]
                  </a>
                  <a
                    href={project.link}
                    className="flex items-center gap-1 text-[#2B2B2B] hover:text-rose-pink font-bold"
                    onClick={(e) => {
                      e.preventDefault();
                      if (isPrimary) {
                        onNotify("Look below! You can test our Live AI demo directly! 👇", "bubble");
                        const playground = document.getElementById("ai-interactive-playground");
                        if (playground) {
                          playground.scrollIntoView({ behavior: "smooth" });
                        }
                      } else {
                        onNotify(`Mock link selected for: ${project.title}. Real live deployment ready soon!`, "success");
                      }
                    }}
                  >
                    <ArrowUpRight size={14} /> [ open ]
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Flagship Feature: Live Interactive Sandbox of Project 01 */}
      <div
        id="ai-interactive-playground"
        className="bg-cream border-4 border-[#2B2B2B] rounded-2xl shadow-[6px_6px_0px_0px_#2B2B2B] p-6 mb-6"
      >
        <div className="flex items-center gap-3 border-b-2 border-dashed border-[#2B2B2B]/30 pb-4 mb-4">
          <div className="p-2 bg-rose-pink/30 border-2 border-[#2B2B2B] rounded-lg">
            <Sparkles className="text-rose-pink animate-pulse" size={24} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 bg-rose-pink text-[#2B2B2B] font-mono text-[10px] border border-[#2B2B2B] rounded font-bold uppercase tracking-wider">
                Live Prototype
              </span>
              <h3 className="font-heading text-xl font-bold">
                Project 01: Explain-It AI Sandbox
              </h3>
            </div>
            <p className="text-xs font-mono text-[#2B2B2B]/75 mt-0.5">
              Live testing of Nidhi&apos;s multi-tier explanation engine - type any term!
            </p>
          </div>
        </div>

        {/* Form controls */}
        <form onSubmit={handleAiExplain} className="grid grid-cols-1 md:grid-cols-12 gap-4">
          <div className="md:col-span-8 flex flex-col gap-1">
            <label className="text-xs font-mono font-bold">Enter a tech concept/term to translate:</label>
            <div className="relative">
              <input
                type="text"
                value={conceptInput}
                onChange={(e) => setConceptInput(e.target.value)}
                placeholder="e.g., Fourier Transform, REST API, Recursion, Convolution"
                className="w-full bg-white border-3 border-[#2B2B2B] p-3 pr-20 rounded-xl font-sans text-sm focus:outline-none focus:ring-2 focus:ring-rose-pink/50 placeholder-[#2B2B2B]/40 shadow-inner"
              />
              <div className="absolute right-2 top-2 flex gap-1">
                <button
                  type="button"
                  onClick={() => loadPresetConcept("ECG Arrhythmia Signal")}
                  className="px-2 py-1 bg-dusty-lavender border-2 border-[#2B2B2B] rounded text-[10px] font-mono hover:bg-[#cbbbed] transition-colors"
                >
                  ECG ML
                </button>
                <button
                  type="button"
                  onClick={() => loadPresetConcept("Recursion")}
                  className="px-2 py-1 bg-blush-pink border-2 border-[#2B2B2B] rounded text-[10px] font-mono hover:bg-[#fcaecb] transition-colors"
                >
                  Recursion
                </button>
              </div>
            </div>
          </div>

          <div className="md:col-span-4 flex flex-col gap-1">
            <label className="text-xs font-mono font-bold">Select Explanation Depth Level:</label>
            <div className="grid grid-cols-3 gap-1 bg-[#2B2B2B]/5 p-1 rounded-xl border-2 border-[#2B2B2B]">
              <button
                type="button"
                onClick={() => setSelectedLevel("child")}
                className={`py-2 px-1 text-xs font-mono font-bold rounded-lg transition-all flex flex-col items-center justify-center gap-0.5 ${
                  selectedLevel === "child"
                    ? "bg-blush-pink text-[#2B2B2B] border-2 border-[#2B2B2B] shadow-[1px_1px_0px_#2B2B2B]"
                    : "text-[#2B2B2B]/70 hover:bg-white/30"
                }`}
              >
                <BookOpen size={14} />
                <span>Child</span>
              </button>
              <button
                type="button"
                onClick={() => setSelectedLevel("student")}
                className={`py-2 px-1 text-xs font-mono font-bold rounded-lg transition-all flex flex-col items-center justify-center gap-0.5 ${
                  selectedLevel === "student"
                    ? "bg-rose-pink text-[#2B2B2B] border-2 border-[#2B2B2B] shadow-[1px_1px_0px_#2B2B2B]"
                    : "text-[#2B2B2B]/70 hover:bg-white/30"
                }`}
              >
                <Code2 size={14} />
                <span>Student</span>
              </button>
              <button
                type="button"
                onClick={() => setSelectedLevel("expert")}
                className={`py-2 px-1 text-xs font-mono font-bold rounded-lg transition-all flex flex-col items-center justify-center gap-0.5 ${
                  selectedLevel === "expert"
                    ? "bg-dusty-lavender text-[#2B2B2B] border-2 border-[#2B2B2B] shadow-[1px_1px_0px_#2B2B2B]"
                    : "text-[#2B2B2B]/70 hover:bg-white/30"
                }`}
              >
                <Cpu size={14} />
                <span>Expert</span>
              </button>
            </div>
          </div>

          <div className="md:col-span-12 flex justify-end">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full sm:w-auto brutal-btn bg-[#2B2B2B] hover:bg-[#3d3d3d] text-[#FFF7F8] font-mono font-bold text-sm py-3 px-6 rounded-xl flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                  Processing AI Synthesis...
                </>
              ) : (
                <>
                  <Play size={14} fill="currentColor" /> Let&apos;s Explain This!
                </>
              )}
            </button>
          </div>
        </form>

        {/* Result Area */}
        {(aiResult || errorMsg || isLoading) && (
          <div className="mt-5 border-3 border-[#2B2B2B] rounded-xl bg-white p-4 shadow-[4px_4px_0px_0px_#2B2B2B] relative overflow-hidden min-h-24">
            {/* Visual Header of the result output paper */}
            <div className="flex items-center justify-between border-b border-[#2B2B2B]/10 pb-2 mb-3">
              <span className="font-mono text-[10px] font-bold text-[#2B2B2B]/50 flex items-center gap-1">
                📁 explanation_output.md
              </span>
              <span className="font-mono text-[10px] font-bold text-rose-pink">
                AI Mode: {selectedLevel.toUpperCase()}
              </span>
            </div>

            {isLoading && (
              <div className="flex flex-col items-center justify-center py-6 gap-2">
                <div className="flex space-x-1.5">
                  <div className="w-2.5 h-2.5 bg-rose-pink rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
                  <div className="w-2.5 h-2.5 bg-dusty-lavender rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
                  <div className="w-2.5 h-2.5 bg-blush-pink rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
                </div>
                <span className="text-xs font-mono text-[#2B2B2B]/60">Nidhi&apos;s server is processing request...</span>
              </div>
            )}

            {errorMsg && (
              <div className="text-red-500 font-mono text-xs p-3 bg-red-50 rounded-lg border border-red-200">
                ⚠️ {errorMsg}
              </div>
            )}

            {aiResult && !isLoading && (
              <div className="text-sm text-[#2B2B2B] leading-relaxed notebook-ruled font-sans whitespace-pre-wrap pl-6 relative">
                {/* Visual red line mimicking real notebook margins on the left */}
                <div className="absolute left-3 top-0 bottom-0 w-[2px] bg-red-400"></div>
                {aiResult}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
