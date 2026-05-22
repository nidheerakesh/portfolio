import { FileText, Download, Eye, ExternalLink, Award, Sparkles, BookOpen } from "lucide-react";

interface ResumePanelProps {
  onNotify: (msg: string, type: "success" | "info" | "bubble") => void;
}

export default function ResumePanel({ onNotify }: ResumePanelProps) {
  const resumeSnapshot = {
    education: {
      degree: "B.Tech in Computer Science and Engineering (CSE Hons)",
      institution: "Indian Institute of Information Technology (IIIT), Kottayam",
      period: "2024 - 2028 (Currently in 2nd Year)",
      gpa: "Current B.Tech coursework pursuing"
    },
    projects: [
      { name: "Explain-It AI Chatbot", desc: "A smart explanation interface using Gemini endpoints designed for scalable cognitive translation levels." },
      { name: "ECG Arrhythmia Signal Classifier", desc: "Automated ML diagnostics pipeline featuring bandpass filters and MIT-BIH classification." },
      { name: "React Student Study Planner", desc: "Interactive frontend application featuring dynamic local state coordination and calendar templates." }
    ],
    skills: {
      languages: "C, C++, Python, JavaScript, HTML & CSS",
      domains: "Competitive Programming, AI / ML, Frontend, Web Engineering, DSA",
      tools: "Linux Workspace, Git, VS Code, Figma, Jupyter"
    },
    involvement: [
      "Coordinator PR & Venue Operations - On-Campus Google Developer Group",
      "PR Operations Lead - Technical Club of IIIT Kottayam",
      "Active Competitive Solver - IIITK CP & Algorithms Guild"
    ]
  };

  const handleDownload = () => {
    onNotify("Preparing Nidhi_BTech_Resume.pdf download... Generation completed!", "success");
    // Trigger download of a mock resume text or open print window
    const textContent = `
NIDHI RAKESH - B.Tech CSE Student @ IIIT Kottayam
AI • Web Development • Competitive Programming
Email: nidhirakesh2712@gmail.com
=========================================

EDUCATION:
IIIT Kottayam - B.Tech CSE (Hons) | 2024 - 2028 | 2nd Year

TECHNICAL SKILLS:
- Languages: C, C++, Python, JavaScript, HTML & CSS
- Domains: CP, AI/ML, Frontend, Software Engineering
- Tools: Git, Linux (Bash), VS Code, Figma

PROJECTS:
1. Explain-It AI Chatbot (React, Express, Gemini SDK)
2. ECG Arrhythmia Signal detection (Python, TensorFlow, wavelets)
3. React Planner App (React, localStorage, Motion)

STUDENT LEADERSHIP / COMMUNITY:
- Core Coordinator at Google Developer Groups (GDG) IIIT Kottayam
- Lead Event PR Coordinator at Technical Club of IIIT Kottayam
- Active problem solver across coding platforms
    `;
    const blob = new Blob([textContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "Nidhi_IIITK_Resume.txt";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handlePrintView = () => {
    onNotify("Opening secure printer snapshot of Nidhi's Resume!", "success");
    const printWindow = window.open("", "_blank");
    if (!printWindow) {
      onNotify("Popup blocked! Accessing resume preview on-screen instead.", "info");
      return;
    }
    printWindow.document.write(`
      <html>
        <head>
          <title>Nidhi Rakesh - B.Tech CSE Resume</title>
          <style>
            body { font-family: monospace; padding: 40px; color: #2B2B2B; background: #FFF7F8; }
            h1 { font-border-bottom: 2px solid #2B2B2B; padding-bottom: 8px;}
            h2 { color: #F3B6CF; outline: 1px;}
            pre { background: white; padding: 20px; border: 2px solid #2B2B2B; word-break: break-all; }
          </style>
        </head>
        <body>
          <h1>Nidhi Rakesh - IIIT Kottayam B.Tech</h1>
          <p>Email: nidhirakesh2712@gmail.com | 2nd Year Computer Science & Engineering</p>
          <hr/>
          <h2>Core Education</h2>
          <p><strong>IIIT Kottayam:</strong> B.Tech in CSE (GPA: Coursework Active)</p>
          <h2>Key Deliverable Projects</h2>
          <ul>
            <li><strong>Explain-It AI Chatbot:</strong> Multi-mode Gemini explain proxy.</li>
            <li><strong>ECG Arrhythmia Signal Detection:</strong> Wavelet filters ML classifier.</li>
            <li><strong>React Planner:</strong> Local study trackers.</li>
          </ul>
          <h2>Involvements</h2>
          <p>GDG Core PR & Events organizer, Technical club communication operative.</p>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  return (
    <div className="w-full text-[#2B2B2B] font-sans">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b-4 border-[#2B2B2B] pb-4 mb-6">
        <div>
          <h2 className="font-heading text-3xl font-extrabold flex items-center gap-3">
            <span className="text-4xl text-rose-pink">📎</span> Notebook Attachment
          </h2>
          <p className="text-sm font-mono text-[#2B2B2B]/75 mt-1">
            src/portfolio/resume.pdf - recruiter copy
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handlePrintView}
            className="brutal-btn bg-white hover:bg-[#FFF7F8] font-mono text-xs font-bold px-4 py-2 border-2 border-[#2B2B2B] rounded-xl flex items-center gap-1.5 shadow-[2px_2px_0px_0px_#2B2B2B]"
          >
            <Eye size={14} /> [ VIEW ]
          </button>
          <button
            onClick={handleDownload}
            className="brutal-btn bg-blush-pink hover:bg-rose-pink font-mono text-xs font-bold px-4 py-2 border-2 border-[#2B2B2B] rounded-xl flex items-center gap-1.5 shadow-[2px_2px_0px_0px_#2B2B2B]"
          >
            <Download size={14} /> [ DOWNLOAD ]
          </button>
        </div>
      </div>

      {/* Styled Physical Folder Interface */}
      <div className="bg-white border-4 border-[#2B2B2B] rounded-2xl p-6 shadow-[5px_5px_0px_0px_#2B2B2B] relative overflow-hidden">
        {/* Metal paper clip visual element */}
        <div className="absolute top-2 right-10 w-8 h-20 bg-gray-300 rounded-b-xl border-x-4 border-b-4 border-[#2B2B2B] z-10 z-[2] opacity-80 shadow"></div>

        {/* Spirals */}
        <div className="absolute top-0 left-6 right-6 flex justify-between">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="w-3 h-5 bg-soft-gray border-2 border-[#2B2B2B] rounded-b-md shadow-inner"
            ></div>
          ))}
        </div>

        <div className="mt-6 border-4 border-[#2B2B2B] bg-[#FFF7F8] rounded-xl p-6 notebook-grid">
          {/* Header */}
          <div className="text-center pb-6 border-b-3 border-dashed border-[#2B2B2B]/20">
            <h3 className="font-heading text-3xl font-extrabold tracking-tight">Nidhi Rakesh</h3>
            <p className="font-mono text-sm font-bold text-rose-pink mt-1">B.Tech Student @ IIIT Kottayam</p>
            <p className="font-mono text-xs text-[#2B2B2B]/60 mt-1">
              AI / ML enthusiast • Web Engineer • Competitive CP Solver
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            {/* Left Resume Col */}
            <div className="space-y-6">
              <div>
                <h4 className="font-mono text-xs font-bold text-rose-pink uppercase tracking-wide border-b border-[#2B2B2B]/10 pb-1 mb-2">
                  🎓 EDUCATION:
                </h4>
                <div className="bg-white border-2 border-[#2B2B2B] p-3 rounded-lg text-xs md:text-sm shadow-[2px_2px_0px_0px_#2B2B2B]">
                  <p className="font-bold">{resumeSnapshot.education.degree}</p>
                  <p className="text-xs font-mono text-[#2B2B2B]/70 mt-1">{resumeSnapshot.education.institution}</p>
                  <div className="flex justify-between items-center text-[10px] font-mono text-[#2B2B2B]/60 mt-2">
                    <span>{resumeSnapshot.education.period}</span>
                    <span className="font-bold text-rose-pink">{resumeSnapshot.education.gpa}</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-mono text-xs font-bold text-rose-pink uppercase tracking-wide border-b border-[#2B2B2B]/10 pb-1 mb-2">
                  🛠️ TECHNICAL SKILLS Snapshot:
                </h4>
                <div className="bg-white border-2 border-[#2B2B2B] p-3 rounded-lg text-xs font-mono space-y-2 shadow-[2px_2px_0px_0px_#2B2B2B]">
                  <div>
                    <span className="font-bold">[ languages ]: </span>
                    <span className="text-[#2B2B2B]/80">{resumeSnapshot.skills.languages}</span>
                  </div>
                  <div>
                    <span className="font-bold">[ domains ]: </span>
                    <span className="text-[#2B2B2B]/80">{resumeSnapshot.skills.domains}</span>
                  </div>
                  <div>
                    <span className="font-bold">[ tools & OS ]: </span>
                    <span className="text-[#2B2B2B]/80">{resumeSnapshot.skills.tools}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Resume Col */}
            <div className="space-y-6">
              <div>
                <h4 className="font-mono text-xs font-bold text-rose-pink uppercase tracking-wide border-b border-[#2B2B2B]/10 pb-1 mb-2">
                  📂 FEATURED DEVELOPMENT PROJECTS:
                </h4>
                <div className="space-y-3">
                  {resumeSnapshot.projects.map((proj, i) => (
                    <div key={i} className="bg-white border-2 border-[#2B2B2B] p-3 rounded-lg text-xs shadow-[2px_2px_0px_0px_#2B2B2B]">
                      <p className="font-bold flex items-center justify-between">
                        <span>{proj.name}</span>
                        <span className="text-[10px] font-mono bg-blush-pink px-1 border border-[#2B2B2B] rounded">Active</span>
                      </p>
                      <p className="text-[#2B2B2B]/80 mt-1 leading-relaxed">{proj.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-mono text-xs font-bold text-rose-pink uppercase tracking-wide border-b border-[#2B2B2B]/10 pb-1 mb-2">
                  🏆 LEADERSHIP & PARTICIPATION:
                </h4>
                <div className="bg-white border-2 border-[#2B2B2B] p-3 rounded-lg text-xs space-y-2 shadow-[2px_2px_0px_0px_#2B2B2B]">
                  {resumeSnapshot.involvement.map((inv, i) => (
                    <div key={i} className="flex gap-2 items-start">
                      <span className="text-rose-pink">✦</span>
                      <span>{inv}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
