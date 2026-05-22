import React, { useState, useEffect } from "react";
import { Mail, Linkedin, Github, Send, MessageSquare, StickyNote, Sparkles } from "lucide-react";

interface ContactPanelProps {
  onNotify: (msg: string, type: "success" | "info" | "bubble") => void;
}

interface StickerMessage {
  id: string;
  name: string;
  role: string;
  message: string;
  sticker: string;
  color: string;
  date: string;
}

export default function ContactPanel({ onNotify }: ContactPanelProps) {
  const [stickers, setStickers] = useState<StickerMessage[]>([
    {
      id: "s-01",
      name: "Prof. CSE",
      role: "Advisor @ IIITK",
      message: "Brilliant UI styling and clever use of signal analysis in Arrhythmia detection!",
      sticker: "🌟",
      color: "bg-[#FFF7F8]",
      date: "May 2026",
    },
    {
      id: "s-02",
      name: "GDG Lead",
      role: "Student Community",
      message: "Nidhi's PR strategies and newsletters made our workshops reach maximum student capacity!",
      sticker: "🚀",
      color: "bg-blush-pink",
      date: "May 2026",
    },
  ]);

  const [signer, setSigner] = useState("");
  const [title, setTitle] = useState("");
  const [remark, setRemark] = useState("");
  const [selectedSticker, setSelectedSticker] = useState("✨");
  const [selectedColor, setSelectedColor] = useState("bg-dusty-lavender");

  // Load from local storage if available so peer signatures stay persistent
  useEffect(() => {
    const saved = localStorage.getItem("nidhi_portfolio_stickers");
    if (saved) {
      try {
        setStickers(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse local signatures list", e);
      }
    }
  }, []);

  const handleLeaveSticker = (e: React.FormEvent) => {
    e.preventDefault();
    if (!signer.trim() || !remark.trim()) {
      onNotify("Please provide both your name and an encouraging note!", "info");
      return;
    }

    const newSticker: StickerMessage = {
      id: Math.random().toString(),
      name: signer.trim(),
      role: title.trim() || "Visiting Recruiter",
      message: remark.trim(),
      sticker: selectedSticker,
      color: selectedColor,
      date: "Today",
    };

    const updated = [newSticker, ...stickers];
    setStickers(updated);
    localStorage.setItem("nidhi_portfolio_stickers", JSON.stringify(updated));

    setSigner("");
    setTitle("");
    setRemark("");
    onNotify("Thank you! Your sticker was stamped onto Nidhi's dashboard board! 🌸", "success");
  };

  return (
    <div className="w-full text-[#2B2B2B] font-sans">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b-4 border-[#2B2B2B] pb-4 mb-6">
        <div>
          <h2 className="font-heading text-3xl font-extrabold flex items-center gap-3">
            <span className="text-4xl">📬</span> Drop a Sticker & Connect
          </h2>
          <p className="text-sm font-mono text-[#2B2B2B]/75 mt-1">
            src/portfolio/contact/ - official links & visitor whiteboard
          </p>
        </div>
        <div className="flex gap-2">
          <span className="px-3 py-1 bg-rose-pink font-mono text-xs border-2 border-[#2B2B2B] rounded-full shadow-[2px_2px_0px_0px_#2B2B2B]">
            Internship Open
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Col: Social Links & Sticker Form */}
        <div className="lg:col-span-5 space-y-6">
          {/* Quick Connect Board */}
          <div className="bg-white border-4 border-[#2B2B2B] rounded-2xl p-5 shadow-[4px_4px_0px_0px_#2B2B2B]">
            <h3 className="font-heading text-xl font-bold mb-4 flex items-center gap-2">
              <span>🔗</span> Official Coordinates
            </h3>

            <div className="space-y-3 font-mono text-xs">
              <a
                href="mailto:nidhirakesh2712@gmail.com"
                className="flex items-center gap-3 p-3 bg-cream border-2 border-[#2B2B2B] rounded-xl hover:-translate-y-0.5 hover:shadow-[2px_2px_0px_0px_#2B2B2B] transition-all"
              >
                <div className="p-1.5 bg-rose-pink/20 border border-[#2B2B2B] rounded">
                  <Mail size={16} />
                </div>
                <div>
                  <div className="text-[9px] text-[#2B2B2B]/55 font-bold uppercase">EMAIL</div>
                  <div className="text-sm font-sans font-bold select-all">nidhirakesh2712@gmail.com</div>
                </div>
              </a>

              <a
                href="https://linkedin.com"
                target="_blank"
                referrerPolicy="no-referrer"
                rel="noopener noreferrer"
                onClick={(e) => {
                  onNotify("Redirecting to her LinkedIn profile!", "success");
                }}
                className="flex items-center gap-3 p-3 bg-cream border-2 border-[#2B2B2B] rounded-xl hover:-translate-y-0.5 hover:shadow-[2px_2px_0px_0px_#2B2B2B] transition-all"
              >
                <div className="p-1.5 bg-rose-pink/20 border border-[#2B2B2B] rounded">
                  <Linkedin size={16} />
                </div>
                <div>
                  <div className="text-[9px] text-[#2B2B2B]/55 font-bold uppercase">LINKEDIN</div>
                  <div className="text-sm font-sans font-bold">Nidhi Rakesh GDG</div>
                </div>
              </a>

              <a
                href="https://github.com"
                target="_blank"
                referrerPolicy="no-referrer"
                rel="noopener noreferrer"
                onClick={(e) => {
                  onNotify("Redirecting to her GitHub code hub!", "success");
                }}
                className="flex items-center gap-3 p-3 bg-cream border-2 border-[#2B2B2B] rounded-xl hover:-translate-y-0.5 hover:shadow-[2px_2px_0px_0px_#2B2B2B] transition-all"
              >
                <div className="p-1.5 bg-rose-pink/20 border border-[#2B2B2B] rounded">
                  <Github size={16} />
                </div>
                <div>
                  <div className="text-[9px] text-[#2B2B2B]/55 font-bold uppercase">GITHUB</div>
                  <div className="text-sm font-sans font-bold">nidhi-developer</div>
                </div>
              </a>
            </div>
          </div>

          {/* Form to leave sticker on the dashboard board */}
          <div className="bg-cream border-4 border-[#2B2B2B] rounded-2xl p-5 shadow-[4px_4px_0px_0px_#2B2B2B]">
            <h3 className="font-heading text-lg font-bold mb-3 flex items-center gap-2">
              <StickyNote size={18} /> Sign Visitor Board
            </h3>

            <form onSubmit={handleLeaveSticker} className="space-y-4">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[10px] font-mono font-bold mb-1 uppercase">Your Name:</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Recruiters / Peer"
                    value={signer}
                    onChange={(e) => setSigner(e.target.value)}
                    className="w-full bg-white border-2 border-[#2B2B2B] rounded-lg p-2 text-xs focus:outline-none focus:ring-1 focus:ring-rose-pink text-[#2B2B2B]"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-mono font-bold mb-1 uppercase">Your Role/Organization:</label>
                  <input
                    type="text"
                    placeholder="e.g. Google / Student Tech"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full bg-white border-2 border-[#2B2B2B] rounded-lg p-2 text-xs focus:outline-none focus:ring-1 focus:ring-rose-pink text-[#2B2B2B]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-mono font-bold mb-1 uppercase">Encouragement Remark:</label>
                <textarea
                  required
                  rows={2}
                  maxLength={180}
                  placeholder="Leave Nidhi an encouraging review or job invitation!"
                  value={remark}
                  onChange={(e) => setRemark(e.target.value)}
                  className="w-full bg-white border-2 border-[#2B2B2B] rounded-lg p-2 text-xs focus:outline-none focus:ring-1 focus:ring-rose-pink text-[#2B2B2B]"
                />
              </div>

              {/* Sticker Selector & Colors selector side-by-side */}
              <div className="grid grid-cols-2 gap-3 pb-2 border-b-2 border-dashed border-[#2B2B2B]/10">
                <div>
                  <label className="block text-[10px] font-mono font-bold mb-1 uppercase font-bold">Select Symbol:</label>
                  <div className="flex gap-1.5 bg-white p-1 rounded-md border-2 border-[#2B2B2B]">
                    {["✨", "🔥", "🌸", "🌟"].map((st) => (
                      <button
                        key={st}
                        type="button"
                        onClick={() => setSelectedSticker(st)}
                        className={`text-sm flex-1 text-center rounded transition-all ${
                          selectedSticker === st ? "bg-rose-pink/40 font-bold border border-[#2B2B2B]/20" : ""
                        }`}
                      >
                        {st}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-mono font-bold mb-1 uppercase font-bold">Sticker Color:</label>
                  <div className="flex gap-1.5 bg-white p-1 rounded-md border-2 border-[#2B2B2B]">
                    {["bg-blush-pink", "bg-dusty-lavender", "bg-cream"].map((col) => (
                      <button
                        key={col}
                        type="button"
                        onClick={() => setSelectedColor(col)}
                        className={`w-4 h-4 rounded-full border border-[#2B2B2B] mx-auto transition-all ${col} ${
                          selectedColor === col ? "ring-2 ring-rose-pink" : ""
                        }`}
                      ></button>
                    ))}
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full brutal-btn bg-[#2B2B2B] text-[#FFF7F8] font-mono font-bold text-xs p-2.5 rounded-lg flex items-center justify-center gap-1.5"
              >
                <Send size={12} fill="currentColor" /> STAMP MY STICKER Note!
              </button>
            </form>
          </div>
        </div>

        {/* Right Col: The Sticker corkboard where visitor stickers pins onto */}
        <div className="lg:col-span-7 bg-[#FFF7F8] border-4 border-[#2B2B2B] rounded-2xl p-6 shadow-[4px_4px_0px_0px_#2B2B2B] relative overflow-hidden min-h-[480px] notebook-grid">
          {/* Wooden border outline effect */}
          <div className="absolute top-0 left-0 right-0 h-3.5 bg-amber-800 border-b-2 border-[#2B2B2B]"></div>

          <h3 className="font-heading text-xl font-bold text-[#2B2B2B] flex items-center gap-2 mt-2">
            📌 Visitor Whiteboard
          </h3>
          <p className="font-mono text-[10px] text-[#2B2B2B]/50 mt-0.5 border-b border-[#2B2B2B]/15 pb-2">
            Encouragements left by recruiters and campus developers. Type yours on the left!
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            {stickers.map((st, idx) => (
              <div
                key={st.id}
                className={`${st.color} border-3 border-[#2B2B2B] rounded-xl p-4 shadow-[3px_3px_0px_0px_#2B2B2B] transform relative hover:scale-[1.02] hover:rotate-0 transition-transform`}
                style={{
                  transform: `rotate(${(parseInt(st.id) || idx) % 2 === 0 ? "1.5" : "-1.5"}deg)`,
                }}
              >
                {/* Visual red drawing pins */}
                <div className="absolute -top-1.5 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-red-500 rounded-full border-2 border-[#2B2B2B] shadow"></div>

                <div className="flex justify-between items-start mt-1">
                  <span className="text-xl">{st.sticker}</span>
                  <span className="font-mono text-[9px] text-[#2B2B2B]/40 uppercase font-bold">{st.date}</span>
                </div>

                <p className="text-xs font-hand text-[#2B2B2B] font-bold leading-relaxed mt-2.5 break-words max-h-24 overflow-y-auto">
                  &ldquo;{st.message}&rdquo;
                </p>

                <div className="mt-4 pt-2 border-t border-[#2B2B2B]/10 flex items-center justify-between text-[10px] font-mono">
                  <span className="font-bold text-[#2B2B2B] truncate max-w-[120px]">{st.name}</span>
                  <span className="text-[#2B2B2B]/50 truncate max-w-[100px]">{st.role}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
