import React, { useState } from "react";
import { skillsData } from "../data";
import { Check, Star, BadgeCheck, Terminal, Award, Plus, Layers, Flame } from "lucide-react";
import { PortfolioData } from "../hooks/useStudySync";

interface SkillsPanelProps {
  onNotify: (msg: string, type: "success" | "info" | "bubble") => void;
  portfolioData: PortfolioData | null;
}

export default function SkillsPanel({ onNotify, portfolioData }: SkillsPanelProps) {
  const [pinnedSkills, setPinnedSkills] = useState<string[]>([
    "C++", 
    "AI / ML", 
    "Competitive Programming", 
    "React"
  ]);

  const [customSkill, setCustomSkill] = useState("");

  // Derive dynamic skills based on AEON task completion
  const displaySkills = React.useMemo(() => {
    const cloned = JSON.parse(JSON.stringify(skillsData));
    
    if (portfolioData && portfolioData.completedTasks) {
      const completedStr = portfolioData.completedTasks.join(" ").toLowerCase();
      
      const mapSkill = (categoryName: string, keywordMatch: string[], skillName: string) => {
        const cat = cloned.find((c: any) => c.title === categoryName);
        if (cat && !cat.items.includes(skillName) && keywordMatch.some(kw => completedStr.includes(kw))) {
          cat.items.push(skillName);
        }
      };

      // --- ML & Data Science (Domains) ---
      mapSkill("Domains", ["matplotlib", "seaborn", "w1d6_ml"], "Matplotlib & Seaborn");
      mapSkill("Domains", ["numpy", "pandas", "w1d5_ml"], "NumPy & Pandas");
      mapSkill("Domains", ["scikit-learn", "regression", "classification", "w2d2_ml", "w2d3_ml"], "Scikit-Learn");
      mapSkill("Domains", ["cnn", "convolutional", "cifar", "w3d4_ml"], "Computer Vision (CNN)");
      mapSkill("Domains", ["rnn", "lstm", "gru", "w3d5_ml"], "Time Series & RNNs");
      mapSkill("Domains", ["transformer", "bert", "huggingface", "w3d6_ml", "w4d2_ml"], "NLP & Transformers");
      mapSkill("Domains", ["autoencoder", "gan", "generative", "w3d7_ml"], "Generative AI");
      mapSkill("Domains", ["reinforcement", "q-learning", "w4d1_ml"], "Reinforcement Learning");
      mapSkill("Domains", ["shap", "lime", "explainable", "w4d4_ml"], "Explainable AI (XAI)");

      // --- Backend & Cloud (Tools & OS) ---
      mapSkill("Tools & OS", ["node.js", "express", "w1d3_backend"], "Node.js");
      mapSkill("Tools & OS", ["fastapi", "w3d2_mlops"], "FastAPI");
      mapSkill("Tools & OS", ["postgres", "sql", "w2d1_backend", "w2d2_backend"], "PostgreSQL");
      mapSkill("Tools & OS", ["mongodb", "nosql", "w4d3_backend"], "MongoDB");
      mapSkill("Tools & OS", ["redis", "caching", "w2d7_backend"], "Redis");
      mapSkill("Tools & OS", ["docker", "container", "w3d5_backend", "w2d1_mlops"], "Docker");
      mapSkill("Tools & OS", ["kubernetes", "minikube", "w2d2_mlops"], "Kubernetes");
      mapSkill("Tools & OS", ["terraform", "iac", "w1d6_mlops"], "Terraform");
      mapSkill("Tools & OS", ["aws", "gcp", "azure", "w1d5_mlops"], "Cloud (AWS/GCP)");

      // --- MLOps (Tools & OS) ---
      mapSkill("Tools & OS", ["mlflow", "experiment tracking", "w2d3_mlops"], "MLflow");
      mapSkill("Tools & OS", ["airflow", "kubeflow", "dag", "w2d6_mlops"], "Apache Airflow");
      mapSkill("Tools & OS", ["dvc", "data version", "w1d3_mlops"], "DVC");
      mapSkill("Tools & OS", ["prometheus", "grafana", "monitoring", "w3d3_mlops"], "Prometheus & Grafana");
      mapSkill("Tools & OS", ["kafka", "rabbitmq", "w3d6_backend", "w2d5_mlops"], "Kafka/RabbitMQ");
    }
    
    return cloned;
  }, [portfolioData]);

  const handleTogglePin = (skill: string) => {
    if (pinnedSkills.includes(skill)) {
      setPinnedSkills(pinnedSkills.filter((s) => s !== skill));
      onNotify(`Removed "${skill}" from your pinned list`, "info");
    } else {
      setPinnedSkills([...pinnedSkills, skill]);
      onNotify(`Pinned "${skill}" to core competencies list!`, "success");
    }
  };

  const handleAddCustomSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customSkill.trim()) return;
    const name = customSkill.trim();
    if (pinnedSkills.includes(name)) {
      onNotify(`"${name}" is already in your notebook!`, "info");
    } else {
      setPinnedSkills([...pinnedSkills, name]);
      onNotify(`Stamped custom skill: "${name}"!`, "success");
    }
    setCustomSkill("");
  };

  return (
    <div className="w-full text-[#2B2B2B] font-sans">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b-4 border-[#2B2B2B] pb-4 mb-6">
        <div>
          <h2 className="font-heading text-3xl font-extrabold flex items-center gap-3">
            <span className="text-4xl">🏅</span> Skills Index
          </h2>
          <p className="text-sm font-mono text-[#2B2B2B]/75 mt-1">
            src/portfolio/skills/ - languages, domains, toolchains
          </p>
        </div>
        <div className="flex bg-white border-2 border-[#2B2B2B] rounded-lg p-2 shadow-[2px_2px_0px_0px_#2B2B2B] items-center gap-2">
          <Flame size={16} className="text-rose-pink animate-pulse" />
          <span className="font-mono text-xs font-bold">Algorithms & Systems</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {displaySkills.map((category: any, idx: number) => (
          <div
            key={idx}
            className="bg-white border-4 border-[#2B2B2B] rounded-2xl shadow-[4px_4px_0px_0px_#2B2B2B] overflow-hidden"
          >
            {/* Header / Spiral top margin */}
            <div className={`p-4 border-b-4 border-[#2B2B2B] ${category.color} flex items-center justify-between`}>
              <h3 className="font-heading text-lg font-bold flex items-center gap-2">
                <span>⚡</span> {category.title}
              </h3>
              <span className="text-xs font-mono px-2 py-0.5 bg-white border border-[#2B2B2B] rounded-full">
                {category.items.length} items
              </span>
            </div>

            {/* Notebook grid list content */}
            <div className="p-4 bg-white divide-y-2 divide-[#2B2B2B]/5 notebook-grid min-h-[220px]">
              {category.items.map((skill, sIdx) => {
                const isPinned = pinnedSkills.includes(skill);
                return (
                  <div
                    key={sIdx}
                    onClick={() => handleTogglePin(skill)}
                    className="py-3 flex items-center justify-between cursor-pointer group hover:bg-[#FFF7F8]/40 px-1 transition-all"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className={`w-5 h-5 rounded-md border-2 border-[#2B2B2B] flex items-center justify-center transition-all ${
                        isPinned ? "bg-rose-pink" : "bg-white group-hover:bg-soft-gray"
                      }`}>
                        {isPinned && <Check size={12} className="text-[#2B2B2B]" />}
                      </div>
                      <span className="text-xs md:text-sm font-mono tracking-tight font-medium text-[#2B2B2B] group-hover:translate-x-1 transition-all">
                        {skill}
                      </span>
                    </div>

                    <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <Star
                        size={14}
                        className={isPinned ? "fill-rose-pink text-[#2B2B2B]" : "text-[#2B2B2B]/50"}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* AEON Verified Skills Tracker */}
      {portfolioData && Object.keys(portfolioData.categories).length > 0 && (
        <div className="bg-white border-4 border-[#2B2B2B] rounded-2xl p-6 shadow-[5px_5px_0px_0px_#2B2B2B] mb-8">
          <div className="flex items-center gap-2 mb-4 border-b-2 border-dashed border-[#2B2B2B]/20 pb-3">
            <Award size={20} className="text-rose-pink" />
            <h3 className="font-heading text-xl font-bold">AEON Verified Progress</h3>
            <span className="text-[10px] font-mono bg-green-100 text-green-700 px-2 py-0.5 rounded border border-green-300 ml-auto flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span> LIVE SYNC
            </span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(portfolioData.categories).map(([category, stats], idx) => (
              <div key={idx} className="bg-[#FFF7F8] p-3 rounded-xl border-2 border-[#2B2B2B] flex flex-col justify-center items-center text-center shadow-[2px_2px_0px_#2B2B2B]">
                <div className="font-mono font-bold text-xs mb-1 uppercase tracking-tight">{category}</div>
                <div className="flex items-baseline gap-1 text-[#2B2B2B]/70">
                  <span className="text-xl font-black text-rose-pink">{stats.completed}</span>
                  <span className="text-[10px] font-bold uppercase">/ {stats.total} Tasks</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recruiter Custom Pinned Hub */}
      <div className="bg-dusty-lavender/50 border-4 border-[#2B2B2B] rounded-2xl p-6 shadow-[5px_5px_0px_0px_#2B2B2B] relative overflow-hidden">
        {/* Binder Rings */}
        <div className="absolute top-0 left-6 right-6 flex justify-between">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="w-3 h-5 bg-soft-gray border-2 border-[#2B2B2B] rounded-b-md shadow-inner"
            ></div>
          ))}
        </div>

        <div className="mt-4 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="flex-1">
            <h4 className="font-heading text-xl font-bold flex items-center gap-2">
              🎯 Recruiter Skill Clipboard
            </h4>
            <p className="text-xs text-[#2B2B2B]/85 mt-1 leading-relaxed">
              Create your customized core competencies stamp list! Click on any skills index above or add your own team tech stack (e.g. Kotlin, Docker, AWS) to see how Nidhi integrates it!
            </p>

            <div className="flex flex-wrap gap-2 mt-4">
              {pinnedSkills.length === 0 ? (
                <div className="text-xs font-mono text-[#2B2B2B]/50 italic p-1 bg-white/50 rounded">
                  Clipboard is empty... pick some skills above!
                </div>
              ) : (
                pinnedSkills.map((pinned, i) => (
                  <span
                    key={i}
                    onClick={() => handleTogglePin(pinned)}
                    className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border-2 border-[#2B2B2B] font-mono text-xs font-bold rounded-lg shadow-[2px_2px_0px_0px_#2B2B2B] hover:translate-y-0.5 hover:shadow-none hover:bg-rose-pink/10 cursor-pointer transition-all"
                  >
                    <BadgeCheck size={13} className="text-rose-pink shrink-0" />
                    {pinned}
                    <span className="text-[10px] text-red-500 hover:text-red-700 ml-1 font-bold">×</span>
                  </span>
                ))
              )}
            </div>
          </div>

          <form onSubmit={handleAddCustomSkill} className="w-full lg:w-[320px] bg-white border-3 border-[#2B2B2B] p-4 rounded-xl shadow-[3px_3px_0px_0px_#2B2B2B]">
            <label className="block text-xs font-mono font-bold mb-1.5 uppercase">Stamp custom skill:</label>
            <div className="flex gap-1.5">
              <input
                type="text"
                placeholder="e.g. Next.js, Django"
                value={customSkill}
                onChange={(e) => setCustomSkill(e.target.value)}
                className="flex-1 bg-[#FFF7F8] border-2 border-[#2B2B2B] rounded-lg p-2 font-mono text-xs focus:outline-none focus:ring-1 focus:ring-rose-pink"
              />
              <button
                type="submit"
                className="px-3 bg-blush-pink border-2 border-[#2B2B2B] rounded-lg hover:bg-rose-pink transition-colors font-bold text-xs"
              >
                <Plus size={16} />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
