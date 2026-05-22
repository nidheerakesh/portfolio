import { useState, useEffect } from "react";
import { 
  FolderGit2, 
  Sparkles, 
  Award, 
  Terminal, 
  FileText, 
  Check, 
  ChevronRight, 
  Info, 
  Heart, 
  Lock, 
  RotateCw, 
  ArrowLeft, 
  ArrowRight, 
  Sliders, 
  CheckCircle2, 
  BookOpen, 
  UserPlus,
  Calendar,
  Zap,
  TrendingUp
} from "lucide-react";

import AboutPanel from "./components/AboutPanel";
import ProjectsPanel from "./components/ProjectsPanel";
import SkillsPanel from "./components/SkillsPanel";
import ExperiencePanel from "./components/ExperiencePanel";
import ResumePanel from "./components/ResumePanel";
import ContactPanel from "./components/ContactPanel";
import AiCompanionWidget from "./components/AiCompanionWidget";

type ActiveTab = "about" | "projects" | "skills" | "experience" | "resume" | "contact";
type BackgroundTheme = "dots" | "ruled" | "grid";

interface Toast {
  id: string;
  msg: string;
  type: "success" | "info" | "bubble";
}

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>("about");
  const [bgTheme, setBgTheme] = useState<BackgroundTheme>("dots");
  const [toasts, setToasts] = useState<Toast[]>([]);
  
  // Retro-Brutalist Dark Mode State (defaulting to dark mode)
  const [isDark, setIsDark] = useState<boolean>(() => {
    return localStorage.getItem("nidhi_portfolio_dark") !== "false";
  });
  
  // Recruiter Mode Toggle
  const [isRecruiterMode, setIsRecruiterMode] = useState<boolean>(() => {
    return localStorage.getItem("nidhi_recruiter_mode") === "true";
  });

  // Show a gorgeous Neo-Brutalist notification toast in the corner
  const showNotification = (msg: string, type: "success" | "info" | "bubble" = "success") => {
    const id = Math.random().toString();
    setToasts((prev) => [...prev, { id, msg, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const handleTabChange = (tab: ActiveTab) => {
    setActiveTab(tab);
    showNotification(`Opened: [ ${tab.toUpperCase()} ] notebook section`, "info");
  };

  // Welcome message helper on load
  useEffect(() => {
    showNotification("Welcome! Explore Nidhi's Engineering Workspace 🌸", "success");
    const timer = setTimeout(() => {
      showNotification("Tip: You can change the background pattern using the top sliders!", "bubble");
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`min-h-screen relative font-sans text-[#2B2B2B] overflow-x-hidden select-none pb-12 transition-all ${isDark ? "dark-mode" : ""}`}>
      {/* Background Wrapper */}
      <div 
        className={`fixed inset-0 -z-10 transition-all ${
          bgTheme === "dots" 
            ? "high-density-dots" 
            : bgTheme === "ruled" 
              ? "bg-[#FFF7F8] notebook-ruled" 
              : "bg-[#FFF7F8] notebook-grid"
        }`}
      />

      {/* Main Core Container */}
      <div className="w-full max-w-[95%] 2xl:max-w-[1600px] mx-auto px-4 pt-6 space-y-8">
        
        {/* UPPER CUSTOMIZER HEADER (Macaron Toolbelt Drawer) */}
        <div className="bg-white border-4 border-[#2B2B2B] rounded-2xl p-4 shadow-[6px_6px_0px_0px_rgba(43,43,43,1)] flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="p-1 px-2.5 bg-rose-pink text-xs font-mono font-bold border-2 border-[#2B2B2B] rounded-lg shadow-[1.5px_1.5px_0px_#2B2B2B]">
              MACARON COMPANION v1.0
            </span>
            <span className="text-xs font-mono text-[#2B2B2B]/70 hidden sm:inline">
              Configure notebook canvas background live!
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Recruiter Mode Toggle */}
            <button
              onClick={() => {
                const nextMode = !isRecruiterMode;
                setIsRecruiterMode(nextMode);
                localStorage.setItem("nidhi_recruiter_mode", String(nextMode));
                if (nextMode) handleTabChange("resume");
                showNotification(nextMode ? "👔 Recruiter Mode Activated! Clean layout enabled." : "🌸 Normal Mode Restored!", "success");
              }}
              title="Toggle Recruiter Mode"
              className={`brutal-btn px-3 py-1 text-xs font-mono font-bold rounded-lg transition-all flex items-center gap-1 cursor-pointer ${
                isRecruiterMode ? "bg-green-300 text-black" : "bg-white text-[#2B2B2B]"
              }`}
            >
              {isRecruiterMode ? "👔 RECRUITER" : "👤 NORMAL"}
            </button>

            {/* Ink Theme Select Toggle */}
            <button
              onClick={() => {
                const nextDark = !isDark;
                setIsDark(nextDark);
                localStorage.setItem("nidhi_portfolio_dark", String(nextDark));
                showNotification(nextDark ? "🌙 Midnight Ink Theme Activated!" : "☀️ Sunlight Minimalist Restored!", "success");
              }}
              title="Toggle Dark Mode"
              className="brutal-btn px-3 py-1 bg-dusty-lavender text-xs font-mono font-bold rounded-lg transition-all flex items-center gap-1 cursor-pointer"
            >
              {isDark ? "☀️ LIGHT INK" : "🌙 DARK INK"}
            </button>

            <Sliders size={14} className="text-[#2B2B2B]/60" />
            <div className="flex bg-gray-100 border-2 border-[#2B2B2B] rounded-xl p-1 gap-1">
              <button
                onClick={() => {
                  setBgTheme("dots");
                  showNotification("Switched theme back to High Density Dots!", "success");
                }}
                className={`px-3 py-1 text-xs font-mono font-bold rounded-lg transition-all ${
                  bgTheme === "dots"
                    ? "bg-rose-pink text-[#2B2B2B] border border-[#2B2B2B]/30"
                    : "text-[#2B2B2B]/75 hover:bg-white"
                }`}
              >
                Dense Dots
              </button>
              <button
                onClick={() => {
                  setBgTheme("ruled");
                  showNotification("Switched theme to Notebook Ruled!", "success");
                }}
                className={`px-3 py-1 text-xs font-mono font-bold rounded-lg transition-all ${
                  bgTheme === "ruled"
                    ? "bg-dusty-lavender text-[#2B2B2B] border border-[#2B2B2B]/30"
                    : "text-[#2B2B2B]/75 hover:bg-white"
                }`}
              >
                Ruled Lines
              </button>
              <button
                onClick={() => {
                  setBgTheme("grid");
                  showNotification("Switched theme to Engineering Grid!", "success");
                }}
                className={`px-3 py-1 text-xs font-mono font-bold rounded-lg transition-all ${
                  bgTheme === "grid"
                    ? "bg-blush-pink text-[#2B2B2B] border border-[#2B2B2B]/30"
                    : "text-[#2B2B2B]/75 hover:bg-white"
                }`}
              >
                Graph Grid
              </button>
            </div>
          </div>
        </div>

        {/* HERO SECTION */}
        <div className="bg-white border-4 border-[#2B2B2B] rounded-3xl p-6 md:p-8 shadow-[6px_6px_0px_0px_#2B2B2B] relative overflow-hidden transition-all hover:shadow-[8px_8px_0px_0px_#2B2B2B]">
          
          {/* Spirals tore off effect along top */}
          <div className="absolute top-0 left-8 right-8 flex justify-between z-10">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="w-4 h-6 bg-soft-gray border-2 border-[#2B2B2B] rounded-b-md shadow-inner"></div>
            ))}
          </div>

          <div className="flex flex-col gap-8 mt-4">
            
            {/* Big Bio */}
            <div className="space-y-5">
              <div className="space-y-1">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-dusty-lavender font-mono text-xs font-bold border-2 border-[#2B2B2B] rounded-xl shadow-[2px_2px_0px_0px_#2B2B2B]">
                  <Sparkles size={12} className="text-purple-600 animate-pulse" /> 
                  B.Tech Student @ IIIT Kottayam
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-blush-pink font-mono text-xs font-bold border-2 border-[#2B2B2B] rounded-xl shadow-[2px_2px_0px_0px_#2B2B2B] ml-2">
                  CSE Major (2024-2028)
                </span>
              </div>

              {/* Big Editorial Display Name */}
              <div className="relative inline-block">
                <h1 className="font-heading text-6xl md:text-8xl font-black tracking-tighter text-[#2B2B2B] relative select-text">
                  NIDHI
                </h1>
                {/* Visual marker highlighter pen block behind or below */}
                <div className="absolute -bottom-1.5 left-2 right-2 h-4 bg-rose-pink/50 -z-10 rounded"></div>
              </div>

              <p className="text-base md:text-xl font-mono text-[#2B2B2B]/85 font-medium leading-relaxed">
                AI • Web Development • Competitive Programming
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap gap-3 pt-2">
                <button
                  onClick={() => handleTabChange("projects")}
                  className="brutal-btn bg-[#2B2B2B] hover:bg-[#3d3d3d] text-white font-mono font-bold text-sm py-3 px-6 rounded-xl flex items-center gap-2"
                >
                  [ VIEW PROJECTS ]
                </button>
                <button
                  onClick={() => handleTabChange("resume")}
                  className="brutal-btn bg-blush-pink hover:bg-rose-pink text-[#2B2B2B] font-mono font-bold text-sm py-3 px-6 rounded-xl border-3 border-[#2B2B2B] flex items-center gap-2"
                >
                  [ DOWNLOAD RESUME ]
                </button>
              </div>
            </div>

          </div>

        {/* HIGH-FIDELITY MACARON BROWSER WINDOW WRAPPER */}
        <div className="bg-white border-4 border-[#2B2B2B] rounded-3xl shadow-[8px_8px_0px_0px_#2B2B2B] overflow-hidden transition-all flex flex-col">
          
          {/* 1. Browser Top Bar (Visual Frame) */}
          <div className="bg-[#2B2B2B] p-4 flex flex-col md:flex-row items-center justify-between gap-4 border-b-4 border-[#2B2B2B]">
            {/* Macaron Dots + Browser Actions */}
            <div className="flex items-center justify-between w-full md:w-auto gap-4">
              <div className="flex gap-2">
                <span className="w-3.5 h-3.5 rounded-full bg-rose-pink border-2 border-black" title="Blush Close"></span>
                <span className="w-3.5 h-3.5 rounded-full bg-dusty-lavender border-2 border-black" title="Lavender Minimize"></span>
                <span className="w-3.5 h-3.5 rounded-full bg-blush-pink border-2 border-black" title="Cream Zoom"></span>
              </div>
              <div className="flex gap-1.5 font-mono text-xs text-white">
                <button 
                  onClick={() => showNotification("Navigating backward securely is handled on local stack", "info")}
                  className="p-1 px-2 bg-gray-700/50 hover:bg-gray-700 rounded border border-gray-600 transition-colors"
                >
                  <ArrowLeft size={12} className="inline mr-0.5" /> Prev
                </button>
                <button 
                  onClick={() => showNotification("Reloading portfolio database...", "info")}
                  className="p-1 px-2 bg-gray-700/50 hover:bg-gray-700 rounded border border-gray-600 transition-colors"
                >
                  <RotateCw size={11} className="inline mr-0.5" /> Reload
                </button>
              </div>
            </div>

            {/* Browser Safe URL Bar */}
            <div className="flex-1 max-w-sm md:max-w-md w-full bg-[#1E1E1E] text-rose-pink p-2 px-3 rounded-xl flex items-center justify-between border-2 border-black text-xs font-mono shadow-inner">
              <div className="flex items-center gap-1.5 overflow-hidden">
                <Lock size={12} className="text-green-400 shrink-0" />
                <span className="text-green-400 font-bold shrink-0">https://</span>
                <span className="text-gray-300 truncate font-semibold">nidhi.iiitkottayam.dev/workspace#{activeTab}</span>
              </div>
              <div className="text-[10px] bg-green-500/20 text-green-400 px-1 border border-green-500/20 rounded shrink-0">
                SSL ACTIVE
              </div>
            </div>

            {/* Quick status message */}
            <div className="text-white text-xs font-mono hidden lg:block">
              IIITK Student Sandbox v2.0
            </div>
          </div>

          {/* 2. Visual Browser Tab strip (Pink/Lavender Palette) */}
          <div className="bg-[#FFF7F8] p-2 flex flex-wrap border-b-4 border-[#2B2B2B] gap-1.5">
            {[
              { id: "about", emoji: "📝", label: "about" },
              { id: "projects", emoji: "📁", label: "projects" },
              { id: "skills", emoji: "🏅", label: "skills" },
              { id: "experience", emoji: "🌸", label: "experience" },
              { id: "resume", emoji: "📎", label: "resume" },
              { id: "contact", emoji: "📬", label: "contact" }
            ].map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id as ActiveTab)}
                  className={`brutal-btn p-2 px-4 rounded-xl flex items-center gap-2 font-mono text-xs font-bold uppercase transition-all ${
                    isActive
                      ? "bg-rose-pink border-3 border-[#2B2B2B] text-[#2B2B2B] shadow-[3px_3px_0px_#2B2B2B]"
                      : "bg-white border-2 border-[#2B2B2B]/60 text-[#2B2B2B]/70 hover:bg-cream hover:text-[#2B2B2B]"
                  }`}
                >
                  <span className="text-sm shrink-0">{tab.emoji}</span>
                  <span>[{tab.label}]</span>
                </button>
              );
            })}
          </div>

          {/* 3. Panel Content Hub (Notebook Sheet layout) */}
          <div className="bg-[#FFF7F8] p-6 lg:p-8 min-h-[460px] notebook-grid flex flex-col relative">
            
            {/* Visual Red vertical margin line mimicking ruled paperwork paper sheets */}
            <div className="absolute left-6 top-0 bottom-0 w-[2px] bg-red-400/30 -z-0 pointer-events-none"></div>

            {/* Main view injection */}
            <div className="z-10 flex-1 flex flex-col">
              {activeTab === "about" && (
                <AboutPanel onNotify={showNotification} onSetTab={(tab) => handleTabChange(tab as ActiveTab)} />
              )}
              {activeTab === "projects" && (
                <ProjectsPanel onNotify={showNotification} />
              )}
              {activeTab === "skills" && (
                <SkillsPanel onNotify={showNotification} />
              )}
              {activeTab === "experience" && (
                <ExperiencePanel onNotify={showNotification} />
              )}
              {activeTab === "resume" && (
                <ResumePanel onNotify={showNotification} />
              )}
              {activeTab === "contact" && (
                <ContactPanel onNotify={showNotification} />
              )}
            </div>

          </div>

          {/* Footer Notebook Line info */}
          <div className="bg-white border-t-4 border-[#2B2B2B] p-4 text-center font-mono text-xs text-[#2B2B2B]/60 flex flex-col sm:flex-row justify-between items-center gap-2">
            <div>
              Designed with <Heart size={12} className="inline text-rose-pink fill-rose-pink" /> for B.Tech Recruiters • IIIT Kottayam
            </div>
            <div className="bg-[#2B2B2B] text-white p-1 px-2 text-[10px] rounded border border-black font-semibold uppercase">
              NODE_ENV = production
            </div>
          </div>

        </div>

      </div>

      {/* Floating AI Sticky note assistant in corner */}
      <AiCompanionWidget onNotify={showNotification} />

      {/* Floating Toast notifications systems */}
      <div className="fixed bottom-6 left-6 z-50 space-y-2 pointer-events-none max-w-sm">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`pointer-events-auto p-4 border-3 border-[#2B2B2B] rounded-xl flex items-center gap-3 shadow-[3px_3px_0px_0px_#2B2B2B] transition-transform animate-bounce ${
              toast.type === "success"
                ? "bg-blush-pink"
                : toast.type === "info"
                  ? "bg-dusty-lavender"
                  : "bg-cream"
            }`}
          >
            <div className="p-1.5 bg-white border-2 border-[#2B2B2B] rounded-lg">
              <CheckCircle2 size={16} className="text-green-600" />
            </div>
            <div className="text-xs font-mono font-bold leading-tight">
              {toast.msg}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
