import { Project, Experience, SkillCategory } from "./types";

export const projectsData: Project[] = [
  {
    id: "01",
    title: "Explain-It AI Chatbot",
    type: "AI & Education",
    stack: ["React", "Express", "Gemini API", "Tailwind CSS"],
    emoji: "💡",
    description: "An AI-powered system designed to explain sophisticated technical concepts in multiple personalized cognitive depths.",
    details: [
      "Custom educational filters for Child (metaphors), Student (peer-focused pseudocode), and Expert (deep architecture).",
      "Full-stack layout using native Google GenAI SDK.",
      "Beautiful Neo-brutalist interaction log with message save/export features."
    ],
    github: "https://github.com",
    link: "#",
    syncCategory: "ML"
  },
  {
    id: "02",
    title: "ECG Arrhythmia Detection",
    type: "Machine Learning / Research",
    stack: ["Python", "TensorFlow", "Scipy", "Matplotlib"],
    emoji: "❤️",
    description: "An automated Machine Learning pipeline for the detection and classification of heart arrhythmias from ECG signals.",
    details: [
      "Processes noisy clinical electrocardiogram signal files (MIT-BIH Database).",
      "Features signal denoising (bandpass wavelet filter) and visual baseline correction.",
      "Achieved high metrics classification of abnormal PVC, PAC, and Normal heart cycles."
    ],
    github: "https://github.com",
    link: "#",
    syncCategory: "COLLEGE"
  },
  {
    id: "03",
    title: "React Planner App",
    type: "Web Application",
    stack: ["React 19", "Local Storage", "Lucide React", "Motion"],
    emoji: "📅",
    description: "Interactive visual calendar and study planner for college students to map coursework, labs, and preparation deadlines.",
    details: [
      "Intuitive schedule scheduler with auto-reminders and progress level stats.",
      "Client-side persistence using robust localStorage structures.",
      "Responsive drag-and-drop support for easy rescheduling."
    ],
    github: "https://github.com",
    link: "#",
    syncCategory: "BUILD"
  },
  {
    id: "04",
    title: "Next-Gen Hackathon Project",
    type: "Research & Innovation",
    stack: ["Next.js", "Computer Vision", "FastAPI"],
    emoji: "🚀",
    description: "Upcoming conceptual hackathon submission featuring edge computing, intelligent spatial categorization, or LLM agents.",
    details: [
      "Drafting conceptual proposals for student utilities and educational tools.",
      "Open to research collaboration and hackathon invitations!"
    ],
    github: "https://github.com",
    link: "#",
    syncCategory: "BACKEND"
  }
];

export const skillsData: SkillCategory[] = [
  {
    title: "Languages",
    items: ["C", "C++", "Python", "JavaScript", "HTML5 & CSS3"],
    color: "bg-blush-pink"
  },
  {
    title: "Domains",
    items: [
      "Competitive Programming",
      "AI / ML",
      "Frontend Development",
      "Web Development",
      "Data Structures & Algorithms"
    ],
    color: "bg-dusty-lavender"
  },
  {
    title: "Tools & OS",
    items: ["Git & GitHub", "Linux (Bash workspace)", "VS Code", "Figma", "Nvidia CUDA"],
    color: "bg-cream"
  }
];

export const experienceData: Experience[] = [
  {
    id: "exp-01",
    role: "Core Organizer / GDG Coordinator",
    organization: "GDG (Google Developer Groups / On-Campus)",
    duration: "2025 - Present",
    description: "Spearheading multi-disciplinary developer events, hands-on workshops, and tech hackathons on-campus.",
    highlights: [
      "Coordinated venue, Speaker PR, and event outreach for over 250+ aspiring engineering students.",
      "Fostered peer support for student developers across AI, mobile, and web tracks.",
      "Crafted promotional branding resources and speaker communications."
    ],
    color: "bg-blush-pink"
  },
  {
    id: "exp-02",
    role: "PR & Event Operations Lead",
    organization: "IIIT Kottayam Technical Club",
    duration: "2024 - 2025",
    description: "Managed external relations, university communication pipelines, and public announcements.",
    highlights: [
      "Maintained engagement levels across official communication forums (Discord, WhatsApp).",
      "Drafted newsletters, technical summaries, and competitive programming highlights.",
      "Successfully negotiated sponsorships/perks for student hackathon participants."
    ],
    color: "bg-dusty-lavender"
  },
  {
    id: "exp-03",
    role: "Active Member & Problem Solver",
    organization: "IIITK Coding Club & AI Club",
    duration: "2024 - Present",
    description: "Deepened engineering skills through internal competitions, algorithm design, and ML research papers.",
    highlights: [
      "Participated in weekly Codeforces and LeetCode simulation rounds (C++ implementation focus).",
      "Collaborated on small student developer utility prototypes.",
      "Presented introductory micro-sessions on linear regression and gradient descent."
    ],
    color: "bg-cream"
  }
];
