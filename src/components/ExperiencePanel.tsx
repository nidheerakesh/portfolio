import { experienceData } from "../data";
import { Briefcase, Calendar, GraduationCap, MapPin, Sparkles, Pin } from "lucide-react";

interface ExperiencePanelProps {
  onNotify: (msg: string, type: "success" | "info" | "bubble") => void;
}

export default function ExperiencePanel({ onNotify }: ExperiencePanelProps) {
  return (
    <div className="w-full text-[#2B2B2B] font-sans">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b-4 border-[#2B2B2B] pb-4 mb-6">
        <div>
          <h2 className="font-heading text-3xl font-extrabold flex items-center gap-3">
            <span className="text-4xl">🌸</span> Experience Timeline
          </h2>
          <p className="text-sm font-mono text-[#2B2B2B]/75 mt-1">
            src/portfolio/experience/ - event organization, public relations, and developer support
          </p>
        </div>
        <div className="flex gap-2">
          <span className="px-3 py-1 bg-blush-pink font-mono text-xs border-2 border-[#2B2B2B] rounded-full shadow-[2px_2px_0px_0px_#2B2B2B]">
            PR & Outreach Focused
          </span>
        </div>
      </div>

      <div className="relative border-l-4 border-[#2B2B2B] ml-4 md:ml-8 pl-6 md:pl-10 space-y-8 py-4">
        {experienceData.map((exp, idx) => (
          <div key={exp.id} className="relative group">
            {/* Timeline pin/bullet design */}
            <div className="absolute -left-[37px] md:-left-[53px] top-1.5 w-6 h-6 rounded-full bg-white border-4 border-[#2B2B2B] flex items-center justify-center shadow-[2px_2px_0px_0px_#2B2B2B] group-hover:bg-rose-pink transition-colors">
              <span className="w-2 h-2 rounded-full bg-[#2B2B2B]"></span>
            </div>

            {/* Notebook Experience Card */}
            <div className="bg-white border-4 border-[#2B2B2B] rounded-2xl p-6 shadow-[5px_5px_0px_0px_#2B2B2B] hover:shadow-[8px_8px_0px_0px_#2B2B2B] hover:-translate-y-1 transition-all relative overflow-hidden">
              {/* Torn binder paper spirals at the top */}
              <div className="absolute top-0 left-6 right-6 flex justify-between">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="w-3 h-5 bg-soft-gray border-2 border-[#2B2B2B] rounded-b-md shadow-inner"
                  ></div>
                ))}
              </div>

              {/* Tag/Color Header strip */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mt-2 border-b-2 border-dashed border-[#2B2B2B]/10 pb-3 mb-4">
                <div>
                  <h3 className="font-heading text-xl font-bold text-[#2B2B2B] flex items-center gap-1.5">
                    {exp.role}
                  </h3>
                  <div className="flex flex-wrap items-center gap-2 mt-1 text-xs font-mono font-bold text-[#2B2B2B]/70">
                    <span className="text-[#2B2B2B]">{exp.organization}</span>
                    <span className="px-1.5 py-0.5 bg-gray-100 rounded border border-[#2B2B2B]/10 flex items-center gap-1">
                      <Calendar size={11} /> {exp.duration}
                    </span>
                  </div>
                </div>

                <span className={`self-start md:self-center px-3 py-1 font-mono text-xs font-bold border-2 border-[#2B2B2B] rounded-lg shadow-[2px_2px_0px_0px_#2B2B2B] uppercase ${exp.color}`}>
                  ROLE {idx + 1}
                </span>
              </div>

              <p className="text-sm text-[#2B2B2B] leading-relaxed mb-4 font-sans font-medium">
                {exp.description}
              </p>

              {/* Achievements with handwritten style arrows */}
              <div className="space-y-2">
                <p className="text-xs font-mono font-bold text-[#2B2B2B] tracking-wider uppercase">Key Achievements & Initiatives:</p>
                {exp.highlights.map((highlight, hIdx) => (
                  <div key={hIdx} className="flex gap-2.5 items-start text-xs font-sans text-[#2B2B2B]/90 leading-relaxed">
                    <span className="text-rose-pink font-bold mt-0.5">📌</span>
                    <span>{highlight}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Extracurricular Highlights box */}
      <div className="bg-blush-pink border-4 border-[#2B2B2B] rounded-2xl p-6 shadow-[5px_5px_0px_0px_#2B2B2B] mt-8 relative transform -rotate-1">
        <h4 className="font-heading text-xl font-bold flex items-center gap-2">
          ⭐ Student Leadership & Contributions
        </h4>
        <p className="text-xs text-[#2B2B2B]/85 mt-2 leading-relaxed">
          At IIIT Kottayam, Nidhi bridges communication between technical organizers and student cohorts. Her PR guidelines and promotional newsletters help build vibrant technology tracks and boost general engagement across on-campus developer programs.
        </p>
      </div>
    </div>
  );
}
