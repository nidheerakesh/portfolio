import { ArrowRight, BookOpen, Terminal, Sparkles, Smile, GraduationCap, MapPin, Code, Activity, CheckCircle2 } from "lucide-react";
import { useStudySync } from "../hooks/useStudySync";

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

interface AboutPanelProps {
  onNotify: (msg: string, type: "success" | "info" | "bubble") => void;
  onSetTab: (tab: string) => void;
}

export default function AboutPanel({ onNotify, onSetTab }: AboutPanelProps) {
  const { portfolioData } = useStudySync(true);

  return (
    <div className="w-full text-[#2B2B2B] font-sans">
      {/* Editorial Heading */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b-4 border-[#2B2B2B] pb-4 mb-6">
        <div>
          <h2 className="font-heading text-3xl font-extrabold flex items-center gap-3">
            <span className="text-4xl">📝</span> README.md
          </h2>
          <p className="text-sm font-mono text-[#2B2B2B]/75 mt-1">
            src/portfolio/about/ - introducing Nidhi Rakesh
          </p>
        </div>
        <div className="flex bg-white border-2 border-[#2B2B2B] rounded-lg p-1.5 shadow-[2px_2px_0px_0px_#2B2B2B] text-xs font-mono">
          <Terminal size={14} className="mr-1.5 text-rose-pink" />
          <span>cat nidhi_profile.sh</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Rich Text & Bullet Lists */}
        <div className="lg:col-span-8 bg-white border-4 border-[#2B2B2B] rounded-2xl p-6 shadow-[4px_4px_0px_0px_#2B2B2B] relative overflow-hidden">
          {/* Spirals */}
          <div className="absolute top-0 left-6 right-6 flex justify-between">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="w-3 h-5 bg-soft-gray border-2 border-[#2B2B2B] rounded-b-md shadow-inner"
              ></div>
            ))}
          </div>

          <div className="mt-4 prose prose-neutral max-w-none">
            <h3 className="font-heading text-2xl font-bold flex items-center gap-2 text-rose-pink pb-2 border-b-2 border-dashed border-[#2B2B2B]/10">
              <Smile size={22} /> Hey there, I&apos;m Nidhi!
            </h3>

            <p className="text-sm md:text-base leading-relaxed mt-4">
              I am a passionate <strong>2nd-year B.Tech Student at IIIT Kottayam</strong> deeply engrossed in creating neat digital products, exploring complex Machine Learning landscapes, and sharpening my algorithmic thinking.
            </p>

            <div className="my-6 p-4 bg-cream border-2 border-[#2B2B2B] rounded-xl shadow-[3px_3px_0px_0px_#2B2B2B] relative">
              <div className="absolute top-2 right-2 bg-rose-pink text-[#2B2B2B] font-mono text-[9px] px-1.5 py-0.5 border border-[#2B2B2B] rounded">
                STUDENT NOTE
              </div>
              <h4 className="font-mono text-xs font-bold text-[#2B2B2B] mb-2 uppercase tracking-wide">
                My Core Engineering Philosophy:
              </h4>
              <p className="text-xs font-hand text-base md:text-base text-[#2B2B2B]/90 leading-relaxed font-semibold">
                &ldquo;Engineering isn&apos;t just about writing micro-optimized algorithms; it&apos;s about creating accessible systems that anyone - from a five-year-old child to a veteran researcher - can understand and utilize to build a better future.&rdquo;
              </p>
            </div>

            <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-[#2B2B2B]/60 mt-6 mb-3">
              WHAT I SPEND MY TIME ON:
            </h4>

            <ul className="space-y-3 font-sans text-sm md:text-sm text-[#2B2B2B]/90 pl-0 list-none">
              <li className="flex gap-3 items-start p-2.5 hover:bg-[#FFF7F8] border border-transparent hover:border-[#2B2B2B]/10 rounded-xl transition-all">
                <span className="w-5 h-5 flex items-center justify-center bg-blush-pink rounded-full border border-[#2B2B2B] text-xs font-bold shrink-0 mt-0.5">1</span>
                <div>
                  <strong>B.Tech Studies @ IIIT Kottayam:</strong> Diving deep into core topics like Data Structures, Analysis of Algorithms, Databases, and Signal Filtering pathways.
                </div>
              </li>
              <li className="flex gap-3 items-start p-2.5 hover:bg-[#FFF7F8] border border-transparent hover:border-[#2B2B2B]/10 rounded-xl transition-all">
                <span className="w-5 h-5 flex items-center justify-center bg-rose-pink rounded-full border border-[#2B2B2B] text-xs font-bold shrink-0 mt-0.5">2</span>
                <div>
                  <strong>AI & Intelligent Tools:</strong> Creating practical web solutions utilizing modern LLMs (e.g., our personalized Explain-It engine) & clinical signals diagnostics (ECG classification models).
                </div>
              </li>
              <li className="flex gap-3 items-start p-2.5 hover:bg-[#FFF7F8] border border-transparent hover:border-[#2B2B2B]/10 rounded-xl transition-all">
                <span className="w-5 h-5 flex items-center justify-center bg-dusty-lavender rounded-full border border-[#2B2B2B] text-xs font-bold shrink-0 mt-0.5">3</span>
                <div>
                  <strong>Community & Team Coordination:</strong> Managing core PR and outreach operations for Google Developer Groups and student-focused technical clubs.
                </div>
              </li>
            </ul>
          </div>

          <div className="mt-8 pt-4 border-t-2 border-dashed border-[#2B2B2B]/10 flex flex-wrap gap-4 items-center justify-between">
            <div className="flex gap-2">
              <span className="px-2.5 py-1 bg-soft-gray border border-[#2B2B2B]/20 rounded-md font-mono text-[11px] text-[#2B2B2B]/80 flex items-center gap-1">
                <GraduationCap size={12} /> B.Tech CSE (Hons)
              </span>
              <span className="px-2.5 py-1 bg-soft-gray border border-[#2B2B2B]/20 rounded-md font-mono text-[11px] text-[#2B2B2B]/80 flex items-center gap-1">
                <MapPin size={12} /> Kerala, India
              </span>
            </div>
            <button
              onClick={() => {
                onSetTab("projects");
                onNotify("Loaded her notebook projects!", "success");
              }}
              className="brutal-btn bg-rose-pink text-[#2B2B2B] font-mono text-xs font-bold px-4 py-2 rounded-xl flex items-center gap-1.5"
            >
              Learn More <ArrowRight size={14} />
            </button>
          </div>
        </div>

        {/* Right Column: Mini Stickers, Study Status Indicators */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          {/* Currently Learning Note Card */}
          <div className="bg-[#2B2B2B] text-white border-4 border-[#2B2B2B] rounded-2xl p-5 shadow-[4px_4px_0px_0px_#2B2B2B] relative transform rotate-1 hover:rotate-0 transition-transform">
            <div className="absolute top-2 right-2 flex gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-pink border border-[#2B2B2B]"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-white"></span>
            </div>
            <h4 className="font-heading text-lg font-bold flex items-center gap-1">
              📌 Status Journal
            </h4>
            <p className="text-[10px] font-mono text-white/60 border-b border-white/10 pb-2 mb-3">
              LAST LOG: MAY 2026
            </p>

            <div className="space-y-3 font-mono text-xs">
              {portfolioData?.currentFocus ? (
                <div className="p-2 bg-white/10 border border-rose-pink/40 rounded-xl">
                  <span className="text-rose-pink font-bold flex items-center gap-1.5 mb-0.5">
                    <Activity size={12} className="animate-pulse" /> ACTIVE FOCUS:
                  </span>
                  <div className="font-sans font-bold text-sm mt-0.5 text-white/90">
                    {getTaskName(portfolioData.currentFocus)}
                  </div>
                </div>
              ) : (
                <div className="p-2 bg-white/10 border border-white/10 rounded-xl">
                  <span className="text-rose-pink font-bold">→ </span> LEARNING:
                  <div className="font-sans font-medium text-sm mt-0.5 text-white/90">
                    React 19 & Complex Signal Analysis
                  </div>
                </div>
              )}

              {portfolioData?.buildLog && portfolioData.buildLog.length > 0 ? (
                portfolioData.buildLog.slice(0, 2).map((log, i) => (
                  <div key={i} className="p-2 bg-white/10 border border-white/10 rounded-xl">
                    <span className="text-green-400 font-bold flex items-center gap-1.5 mb-0.5">
                      <CheckCircle2 size={12} /> COMPLETED:
                    </span>
                    <div className="font-sans font-medium text-sm mt-0.5 text-white/90 flex justify-between items-start">
                      <span className="pr-2 leading-tight">{getTaskName(log.taskId)}</span>
                      <span className="text-[10px] text-green-400 font-mono font-bold shrink-0 pt-0.5">+{log.xpEarned} XP</span>
                    </div>
                  </div>
                ))
              ) : (
                <>
                  <div className="p-2 bg-white/10 border border-white/10 rounded-xl">
                    <span className="text-dusty-lavender font-bold">→ </span> EXPLORING:
                    <div className="font-sans font-medium text-sm mt-0.5 text-white/90">
                      AI/ML Convolutional Pipelines
                    </div>
                  </div>
                  <div className="p-2 bg-white/10 border border-white/10 rounded-xl">
                    <span className="text-blush-pink font-bold">→ </span> BUILDING:
                    <div className="font-sans font-medium text-sm mt-0.5 text-white/90">
                      B.Tech Exam Hack planners
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Linux Terminal / Code forces Badge */}
          <div className="bg-[#2B2B2B] text-white border-4 border-[#2B2B2B] rounded-2xl p-5 shadow-[4px_4px_0px_0px_#2B2B2B] font-mono text-xs relative overflow-hidden">
            <div className="flex justify-between items-center bg-[#1E1E1E] -mx-5 -mt-5 p-2 px-4 border-b border-[#2B2B2B]">
              <div className="flex gap-1.5">
                <span className="w-2.5 h-2.5 bg-red-400 rounded-full"></span>
                <span className="w-2.5 h-2.5 bg-yellow-400 rounded-full"></span>
                <span className="w-2.5 h-2.5 bg-green-400 rounded-full"></span>
              </div>
              <span className="text-[10px] text-gray-400">nidhi@iiitk: ~</span>
            </div>

            <div className="space-y-2 mt-3">
              <div className="flex gap-1">
                <span className="text-green-400">$</span>
                <span>whoami</span>
              </div>
              <div className="text-purple-300">Nidhi Rakesh • CSE '28</div>

              <div className="flex gap-1 pt-2">
                <span className="text-green-400">$</span>
                <span>cat tools.json | grep &quot;active&quot;</span>
              </div>
              <div className="text-yellow-200">
                [&quot;Neovim&quot;, &quot;Arch&quot;, &quot;Vim-motion&quot;]
              </div>

              <div className="flex gap-1 pt-2">
                <span className="text-green-400">$</span>
                <span>leetcode --stats</span>
              </div>
              <div className="text-blue-300">
                → Solving algorithms daily
                <br />
                → DS: Array, Graph, Trees
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
