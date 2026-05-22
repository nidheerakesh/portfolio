export interface Project {
  id: string;
  title: string;
  type: string;
  stack: string[];
  description: string;
  details: string[];
  link?: string;
  github?: string;
  emoji: string;
  syncCategory?: string; // Links this project to an AEON planner category
}

export interface Experience {
  id: string;
  role: string;
  organization: string;
  duration: string;
  description: string;
  highlights: string[];
  color: string;
}

export interface SkillCategory {
  title: string;
  items: string[];
  color: string;
}

export type ExplanationLevel = "child" | "student" | "expert" | "chat";

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  text: string;
  timestamp: Date;
}
