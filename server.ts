import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini server-side client
let ai: GoogleGenAI | null = null;
if (process.env.GEMINI_API_KEY) {
  try {
    ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  } catch (err) {
    console.error("Failed to initialize GoogleGenAI client:", err);
  }
}

// API Routes
app.post("/api/explain", async (req, res) => {
  try {
    const { concept, level, conversationHistory } = req.body;
    if (!concept) {
      return res.status(400).json({ error: "Concept or prompt is required" });
    }

    if (!ai) {
      // Allow fallback instructions if API key is not yet set
      return res.status(400).json({
        error: "AI Assistant is not configured. Please add your GEMINI_API_KEY in the Settings > Secrets panel to unlock live AI explanations."
      });
    }

    let instruction = "";
    if (level === "child") {
      instruction = "Explain this concept precisely like I'm a 5-year-old child using gentle metaphors, sweet illustrations, bakery or candy comparisons, and colorful analogies. Keep it simple and adorable.";
    } else if (level === "student") {
      instruction = "Explain this concept like a fellow B.Tech / engineering college student. Use relatable college exam Cramming-style, simple definitions, and small pseudocode samples. Keep it enthusiastic and peer-focused.";
    } else if (level === "expert") {
      instruction = "Explain this concept like a Principal Software Engineer / Senior Researcher. Use advanced industry terms, performance considerations, hardware/system limitations, and architectural best practices.";
    } else if (level === "chat") {
      instruction = "You are Nidhi's Interactive Portfolio Assistant. Speak from Nidhi's notebook workspace. You have complete information about her: Second-year B.Tech in Computer Science & Engineering at IIIT Kottayam, passionate about AI/ML, fine-frontend UI development, and competitive programming in C++/Python. Highlight her GDG PR coordinator role, active web/ML projects (arrhythmia ECG signal detection, React Planner app, Explain-It AI chatbot). Be warm, extremely polite, cheerful, notebook-themed, and recruitment-ready. Keep explanations concise, scannable, and clean.";
    } else {
      instruction = "Provide a general overview of this query in a friendly notebook-companion style.";
    }

    const contents: any[] = [];
    if (conversationHistory && Array.isArray(conversationHistory)) {
      // Map history to standard structure
      conversationHistory.forEach((msg: any) => {
        contents.push({
          role: msg.role === "assistant" ? "model" : "user",
          parts: [{ text: msg.text }],
        });
      });
    }

    contents.push({
      role: "user",
      parts: [
        {
          text: `${instruction}\n\nUser Input / Concept: ${concept}`,
        },
      ],
    });

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: contents,
    });

    res.json({ text: response.text });
  } catch (error: any) {
    console.error("Error calling Gemini API:", error);
    res.status(500).json({ error: error?.message || "Internal server error" });
  }
});

// Handle Vite middleware & static distribution serving
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server is running at http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Vite startup crash:", err);
});
