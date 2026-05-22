import React, { useState, useRef, useEffect } from "react";
import { Sparkles, Send, X, MessageSquare, ArrowDown, HelpCircle, UserCheck } from "lucide-react";
import { ChatMessage } from "../types";

interface AiCompanionWidgetProps {
  onNotify: (msg: string, type: "success" | "info" | "bubble") => void;
}

export default function AiCompanionWidget({ onNotify }: AiCompanionWidgetProps) {
  const [isOpen, setIsOpen] = useState(true);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "assistant",
      text: "Hii! I am Nidhi's Interactive Notebook Assistant. 🌸 Ask me questions about her B.Tech focus at IIIT Kottayam, CGPA status, GDG coordinator highlights, or specific ML signal projects!",
      timestamp: new Date(),
    },
  ]);
  const [inputVal, setInputVal] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim()) return;

    const userMsg: ChatMessage = {
      id: Math.random().toString(),
      role: "user",
      text: inputVal,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputVal("");
    setIsTyping(true);

    try {
      // Map current messages to brief context list for server endpoint
      const conversationHistory = messages.map((m) => ({
        role: m.role,
        text: m.text,
      }));

      const response = await fetch("/api/explain", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          concept: userMsg.text,
          level: "chat",
          conversationHistory: conversationHistory,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed key processing");
      }

      setMessages((prev) => [
        ...prev,
        {
          id: Math.random().toString(),
          role: "assistant",
          text: data.text,
          timestamp: new Date(),
        },
      ]);
      onNotify("Notebook companion responded!", "success");
    } catch (err: any) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        {
          id: Math.random().toString(),
          role: "assistant",
          text: "Oops, local server failed to sync securely with my internal brain. Try double checking if GEMINI_API_KEY is configured in the Secrets panel! 🌸",
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleQuickQuestion = (question: string) => {
    setInputVal(question);
    onNotify(`Selected: "${question}"`, "info");
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => {
          setIsOpen(true);
          onNotify("Opened her AI Sticky Notebook companion!", "success");
        }}
        className="fixed bottom-6 right-6 z-40 brutal-btn bg-rose-pink text-[#2B2B2B] p-4 rounded-full flex items-center justify-center gap-2 font-mono font-bold text-xs"
        id="btn-open-sticky-ai"
      >
        <Sparkles className="animate-pulse" size={16} />
        <span>[ CHAT WITH notebook ]</span>
      </button>
    );
  }

  return (
    <div
      className="fixed bottom-6 right-6 z-40 w-full max-w-[340px] bg-blush-pink border-4 border-[#2B2B2B] rounded-2xl shadow-[6px_6px_0px_0px_#2B2B2B] p-4 relative font-sans text-[#2B2B2B] transform rotate-1 transition-all hover:rotate-0"
      id="ai-sticky-companion-module"
    >
      {/* Tape decoration at the top center */}
      <div className="absolute -top-3.5 left-1/2 transform -translate-x-1/2 w-28 h-7 bg-cream/70 border-x-2 border-b-2 border-[#2B2B2B]/20 shadow-sm rounded-b"></div>

      {/* Header bar */}
      <div className="flex items-center justify-between border-b-2 border-dashed border-[#2B2B2B]/20 pb-2 mb-3 mt-1.5">
        <div className="flex items-center gap-1.5 font-mono text-[11px] font-bold">
          <Sparkles size={14} className="text-rose-pink" />
          <span>AI Companion.md</span>
        </div>
        <button
          onClick={() => {
            setIsOpen(false);
            onNotify("Minimized companion widget.", "info");
          }}
          className="w-5 h-5 bg-white border border-[#2B2B2B] rounded flex items-center justify-center hover:bg-rose-pink transition-colors text-xs font-bold"
        >
          <X size={12} />
        </button>
      </div>

      {/* Messages layout */}
      <div className="h-[210px] bg-[#FFF7F8]/80 border-2 border-[#2B2B2B] rounded-xl p-2.5 overflow-y-auto space-y-3 shadow-inner">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex flex-col max-w-[90%] ${
              m.role === "user" ? "ml-auto items-end" : "mr-auto items-start"
            }`}
          >
            <div
              className={`p-2.5 rounded-xl border-2 border-[#2B2B2B] text-xs font-sans leading-relaxed shadow-[1.5px_1.5px_0px_#2B2B2B] ${
                m.role === "user"
                  ? "bg-dusty-lavender text-right"
                  : "bg-white text-left"
              }`}
            >
              <div className="font-sans whitespace-pre-line">{m.text}</div>
            </div>
            <span className="text-[9px] font-mono text-[#2B2B2B]/40 mt-1">
              {m.role === "assistant" ? "📓 Notebook" : "🕵️ Recruiter"}
            </span>
          </div>
        ))}

        {isTyping && (
          <div className="flex items-center gap-1.5 p-2 bg-white rounded-lg border border-[#2B2B2B]/10 w-[70px]">
            <div className="w-1.5 h-1.5 bg-rose-pink rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
            <div className="w-1.5 h-1.5 bg-dusty-lavender rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
            <div className="w-1.5 h-1.5 bg-blush-pink rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Suggestions list */}
      <div className="mt-2.5 flex flex-wrap gap-1 font-mono text-[9px]">
        <button
          onClick={() => handleQuickQuestion("Which B.Tech branch are you in?")}
          className="bg-white hover:bg-cream border border-[#2B2B2B] px-1.5 py-0.5 rounded transition-all text-[#2B2B2B]/85 cursor-pointer"
        >
          Branch?
        </button>
        <button
          onClick={() => handleQuickQuestion("Tell me about your GDG club involvement")}
          className="bg-white hover:bg-cream border border-[#2B2B2B] px-1.5 py-0.5 rounded transition-all text-[#2B2B2B]/85 cursor-pointer"
        >
          GDG?
        </button>
        <button
          onClick={() => handleQuickQuestion("Summarize your ECG project")}
          className="bg-white hover:bg-cream border border-[#2B2B2B] px-1.5 py-0.5 rounded transition-all text-[#2B2B2B]/85 cursor-pointer"
        >
          ECG Classifier?
        </button>
      </div>

      {/* Message submit form */}
      <form onSubmit={handleSubmit} className="mt-3 flex gap-1.5">
        <input
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          placeholder="Ask something about Nidhi..."
          className="flex-1 bg-white border-2 border-[#2B2B2B] rounded-lg p-2 text-xs focus:outline-none focus:ring-1 focus:ring-rose-pink text-[#2B2B2B]"
        />
        <button
          type="submit"
          className="px-3 bg-rose-pink hover:bg-[#F3B6CF] border-2 border-[#2B2B2B] rounded-lg flex items-center justify-center shadow-[1px_1px_0px_#2B2B2B] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all cursor-pointer"
        >
          <Send size={12} fill="currentColor" />
        </button>
      </form>
    </div>
  );
}
