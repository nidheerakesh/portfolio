import React from "react";
import { PortfolioData } from "../hooks/useStudySync";

// Helper to map backend task IDs to human-readable names
const getTaskName = (taskId: string) => {
  const titles: Record<string, string> = {
    "w1d5_ml": "NumPy & Pandas",
    "w1d6_ml": "Matplotlib & Seaborn",
    "w2d2_ml": "Classification Algos",
    "w3d4_ml": "Computer Vision (CNN)",
    "w3d6_ml": "NLP & Transformers",
    "w4d1_ml": "Reinforcement Learning",
  };
  
  if (titles[taskId]) return titles[taskId];
  
  // Generic fallback: w1d6_ml -> W1 D6 (ML)
  const match = taskId.match(/^w(\d+)d(\d+)_(.+)$/);
  if (match) {
    const [, w, d, track] = match;
    return `Week ${w} Day ${d} (${track.toUpperCase()})`;
  }
  return taskId;
};

interface LiveStatusBarProps {
  portfolioData: PortfolioData | null;
  connectionStatus: string;
}

export default function LiveStatusBar({ portfolioData, connectionStatus }: LiveStatusBarProps) {
  if (!portfolioData || connectionStatus !== "connected") return null;

  const { overview, currentFocus } = portfolioData;
  const progressPercent = overview.total > 0 ? (overview.completed / overview.total) * 100 : 0;
  const focusName = currentFocus ? getTaskName(currentFocus) : "Planning next milestone";

  return (
    <div className="bg-[#2B2B2B] text-white font-mono text-xs border-4 border-[#2B2B2B] rounded-xl shadow-[4px_4px_0px_0px_rgba(43,43,43,1)] overflow-hidden w-full">
      <div className="p-3 px-4 flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center relative">
            <span className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse absolute"></span>
            <span className="w-2.5 h-2.5 bg-green-500 rounded-full"></span>
          </div>
          <span className="font-bold tracking-wide">
            {currentFocus ? "ACTIVE:" : "STATUS:"} <span className="text-green-400">{focusName}</span>
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-4 text-white/80">
          <div className="flex items-center gap-1.5">
            <span className="bg-white/10 px-2 py-0.5 rounded border border-white/20 text-white font-bold">
              Level {overview.level}
            </span>
            <span>({overview.xp} XP)</span>
          </div>
          <div className="flex items-center gap-1">
            <span>Tasks:</span>
            <span className="font-bold text-white">
              {overview.completed}/{overview.total}
            </span>
          </div>
          <div className="flex items-center gap-1 text-orange-400 font-bold">
            🔥 {overview.streak} Day Streak
          </div>
        </div>
      </div>
      
      {/* Thin full-width progress bar */}
      <div className="h-1.5 w-full bg-[#1E1E1E]">
        <div 
          className="h-full bg-green-500 transition-all duration-1000 ease-out" 
          style={{ width: `${progressPercent}%` }}
        ></div>
      </div>
    </div>
  );
}
