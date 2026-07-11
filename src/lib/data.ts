export const profile = {
  name: "Nidhi Rakesh",
  firstName: "Nidhi",
  role: "B.Tech CS (AI & Data Science)",
  school: "IIIT Kottayam",
  tagline:
    "I build graph ML systems, healthcare AI, and LLM-integrated apps — the kind of things that ship, not just tutorial clones.",
  location: "Kottayam, India",
  email: "nidhirakesh2712@gmail.com",
  phone: "+91-8848856497",
  github: "https://github.com/nidheerakesh",
  githubHandle: "github.com/nidheerakesh",
  linkedin: "https://linkedin.com/in/nidhi-rakesh-677a28311",
  linkedinHandle: "linkedin.com/in/nidhi-rakesh",
  resumeUrl: "/NidhiRakesh_Resume.pdf",
  // Drop a photo at public/profile.jpg and set this to "/profile.jpg" to
  // replace the pixel-cat placeholder in the hero ring.
  photoUrl: "",
};

export const education = {
  institution: "Indian Institute of Information Technology Kottayam",
  degree: "B.Tech in Computer Science (AI and Data Science)",
  period: "Aug 2024 – May 2028",
};

export const about = {
  paragraphs: [
    "I'm a CS undergrad at IIIT Kottayam specializing in AI & Data Science — currently deep in graph neural networks, healthcare AI, and LLM-integrated tooling.",
    "I like projects that touch a real, messy dataset: a 200K-node Bitcoin transaction graph, a decompiled APK's call graph, a pile of GitHub repos to summarize. Production over polish-in-theory — I'd rather ship something that works and iterate.",
    "Outside of coursework, I co-lead an open-source study group, help run AI workshops on campus, and occasionally build things purely because a UI idea won't leave me alone (see: this cursor).",
  ],
  focusAreas: ["Graph Neural Networks", "Full-Stack Engineering", "LLM Applications", "Healthcare AI"],
};

export type SkillCategory = {
  label: string;
  accent: "lavender" | "pink" | "purple" | "cyan";
  skills: string[];
};

export const skillCategories: SkillCategory[] = [
  {
    label: "Languages",
    accent: "lavender",
    skills: ["Python", "C++", "C", "JavaScript", "TypeScript", "Java"],
  },
  {
    label: "AI / ML",
    accent: "purple",
    skills: [
      "Graph Neural Networks",
      "GraphSAGE",
      "Graph Attention Networks",
      "XGBoost",
      "Machine Learning",
    ],
  },
  {
    label: "Frameworks & Tools",
    accent: "cyan",
    skills: ["React", "Node.js", "FastAPI", "Firebase", "Docker", "GitHub API", "Jinja2"],
  },
  {
    label: "Currently exploring",
    accent: "pink",
    skills: ["LLM agents", "PyTorch Geometric", "Vector search", "Edge inference"],
  },
];

export type Project = {
  slug: string;
  title: string;
  subtitle: string;
  year: string;
  type: string;
  description: string;
  highlights: string[];
  tech: string[];
  github: string;
  demo?: string;
};

export const projects: Project[] = [
  {
    slug: "sentinelgraph",
    title: "SentinelGraph",
    subtitle: "Android Malware Detector",
    year: "2026",
    type: "Hackathon project",
    description:
      "An end-to-end APK analysis pipeline that extracts call graphs, DEX bytecode, and AndroidManifest metadata through static reverse engineering, then classifies apps as malicious or benign.",
    highlights: [
      "Built static analysis pipeline with Androguard for call-graph & bytecode extraction",
      "Trained a 2-layer Graph Attention Network over function call graphs (methods, permissions, APIs as nodes)",
      "Added a GenAI layer to turn model output into human-readable threat narratives + risk scores",
    ],
    tech: ["Python", "Androguard", "GAT", "PyTorch", "GenAI"],
    github: "https://github.com/nidheerakesh",
  },
  {
    slug: "elliptic-fraud-detection",
    title: "Elliptic Bitcoin Fraud Detection",
    subtitle: "Graph ML Project",
    year: "2025",
    type: "Graph ML project",
    description:
      "A fraud detection system on the Elliptic dataset — a real-world temporal Bitcoin transaction graph with 200K+ nodes — built to flag illicit transactions.",
    highlights: [
      "Applied GraphSAGE for inductive node embedding on a 200K+ node transaction graph",
      "Combined graph representations with XGBoost for final classification",
      "Engineered temporal features to catch time-evolving fraud clusters",
    ],
    tech: ["Python", "GraphSAGE", "XGBoost", "PyTorch Geometric", "Pandas"],
    github: "https://github.com/nidheerakesh",
  },
  {
    slug: "gitresume",
    title: "GitResume",
    subtitle: "AI-Powered Resume Generator",
    year: "2025",
    type: "Full-stack application",
    description:
      "A full-stack system that scrapes your GitHub repos and synthesizes ATS-optimized resume bullet points, then compiles a professional LaTeX resume automatically.",
    highlights: [
      "FastAPI backend scraping repos via the GitHub API to auto-generate accomplishments",
      "Groq/OpenAI LLM integration with a local fallback engine for offline generation",
      "Jinja2-based LaTeX compiler; Dockerized and deployed to Vercel as a serverless monorepo",
    ],
    tech: ["FastAPI", "React", "TypeScript", "Docker", "LaTeX", "Vercel"],
    github: "https://github.com/nidheerakesh",
  },
];

export type ExperienceItem = {
  org: string;
  role: string;
  period: string;
  location: string;
  bullets: string[];
};

export const experience: ExperienceItem[] = [
  {
    org: "InLighnX Global Pvt. Ltd.",
    role: "Full Stack Development Intern",
    period: "May 2025 – Aug 2025",
    location: "Remote",
    bullets: [
      "Built and shipped full-stack features across multiple production web applications using React, Node.js, and REST APIs, directly improving end-user workflows.",
      "Designed and implemented Firebase-backed real-time data pipelines and JSON-based API contracts between frontend and backend services, ensuring consistent data integrity across the stack.",
    ],
  },
  {
    org: "Amazon ML Summer School",
    role: "Selected Participant",
    period: "2026",
    location: "Amazon",
    bullets: [
      "Selected for Amazon ML Summer School 2026, an intensive machine learning program covering core ML concepts and industry applications.",
    ],
  },
];

export type Achievement = {
  title: string;
  org: string;
  description: string;
  ongoing?: boolean;
};

export const achievements: Achievement[] = [
  {
    title: "Co-Lead",
    org: "OpenVerse Club",
    description: "Lead study groups and mentor junior students on open-source projects at IIIT Kottayam.",
    ongoing: true,
  },
  {
    title: "Core Member",
    org: "GDG IIIT Kottayam",
    description: "Organize Google Developer Group technical sessions and AI-focused workshops for the campus community.",
    ongoing: true,
  },
  {
    title: "Core Member",
    org: "Enigma — AI/ML Club",
    description: "Participate in research discussions, ML paper reviews, and club-led AI project initiatives.",
    ongoing: true,
  },
  {
    title: "Core Team",
    org: "TEDxIIIT Kottayam",
    description: "Support speaker curation and event production for a licensed TEDx event on campus.",
    ongoing: true,
  },
];

export const achievementStats = [
  { value: "200K+", label: "graph nodes processed (Elliptic dataset)" },
  { value: "3", label: "production-grade ML systems shipped" },
  { value: "4", label: "student communities co-run" },
];

export type TechStackItem = {
  name: string;
  category: "language" | "ai-ml" | "framework" | "tool";
};

export const techStack: TechStackItem[] = [
  { name: "Python", category: "language" },
  { name: "TypeScript", category: "language" },
  { name: "C++", category: "language" },
  { name: "Java", category: "language" },
  { name: "React", category: "framework" },
  { name: "Node.js", category: "framework" },
  { name: "FastAPI", category: "framework" },
  { name: "PyTorch", category: "ai-ml" },
  { name: "GraphSAGE", category: "ai-ml" },
  { name: "XGBoost", category: "ai-ml" },
  { name: "Firebase", category: "tool" },
  { name: "Docker", category: "tool" },
  { name: "Git / GitHub", category: "tool" },
  { name: "Vite", category: "tool" },
  { name: "Tailwind CSS", category: "tool" },
  { name: "LaTeX", category: "tool" },
];

export const quotes = [
  "“Premature optimization is the root of all evil.” — Donald Knuth",
  "“The best error message is the one that never shows up.” — Thomas Fuchs",
  "“Code is like humor. When you have to explain it, it's bad.” — Cory House",
  "“First, solve the problem. Then, write the code.” — John Johnson",
  "“A graph is just a diagram until you make it lie to you honestly.” — unknown grad student, probably",
];
