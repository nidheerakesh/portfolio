# Connect AEON Study Progress to Your Portfolio

## What This Does
Fetches your real-time study progress from your AEON learning engine (backed by Convex) and displays it on your portfolio website.

## The Endpoint

You have **two options** to fetch your progress:

### Option A: Direct Convex Query (Recommended — no CORS issues, works from any domain)

```
POST https://adamant-mink-316.convex.cloud/api/query
Content-Type: application/json

Body: {"path":"progress:getStudySync","args":{}}
```

### Option B: Your AEON API Route (requires your Vercel domain to be deployed)

```
GET https://<your-vercel-domain>/api/study-sync
```

---

## Response Shape

```json
{
  "completed": 16,
  "total": 252,
  "activeMilestone": "Level 3 Student",
  "status": "connected"
}
```

| Field | Type | Description |
|-------|------|-------------|
| `completed` | number | Total tasks you've completed |
| `total` | number | Total tasks in the curriculum |
| `activeMilestone` | string | Current focus or level |
| `status` | string | "connected" or "disconnected" |

---

## Ready-to-Paste React Component

Drop this into your portfolio project. Works with any React setup (Next.js, Vite, CRA):

```tsx
// components/StudyProgress.tsx
"use client";

import { useEffect, useState } from "react";

interface StudyData {
  completed: number;
  total: number;
  activeMilestone: string;
  status: string;
}

export default function StudyProgress() {
  const [data, setData] = useState<StudyData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://adamant-mink-316.convex.cloud/api/query", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        path: "progress:getStudySync",
        args: {},
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.status === "success") {
          setData(json.value);
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="study-progress loading">Loading progress...</div>;
  if (!data || data.status !== "connected") return null;

  const pct = data.total > 0 ? Math.round((data.completed / data.total) * 100) : 0;

  return (
    <div className="study-progress" style={{
      padding: "24px",
      borderRadius: "12px",
      background: "rgba(255,255,255,0.03)",
      border: "1px solid rgba(255,255,255,0.08)",
      maxWidth: "400px",
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
        <span style={{ fontSize: "13px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "1px", color: "#a0a0a0" }}>
          Study Progress
        </span>
        <span style={{ fontSize: "11px", color: "#10b981", fontWeight: 600, display: "flex", alignItems: "center", gap: "4px" }}>
          <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#10b981", display: "inline-block" }} />
          Live
        </span>
      </div>

      {/* Progress Bar */}
      <div style={{ width: "100%", height: "8px", background: "rgba(255,255,255,0.06)", borderRadius: "4px", overflow: "hidden", marginBottom: "12px" }}>
        <div style={{
          width: `${pct}%`,
          height: "100%",
          background: "linear-gradient(90deg, #6366f1, #a855f7)",
          borderRadius: "4px",
          transition: "width 0.8s ease",
        }} />
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px" }}>
        <span style={{ color: "#e0e0e0", fontWeight: 600 }}>
          {data.completed}/{data.total} tasks
        </span>
        <span style={{ color: "#a855f7", fontWeight: 700, fontFamily: "monospace" }}>
          {pct}%
        </span>
      </div>

      <div style={{ fontSize: "11px", color: "#888", marginTop: "8px" }}>
        {data.activeMilestone}
      </div>
    </div>
  );
}
```

## Usage

```tsx
// In your portfolio page
import StudyProgress from "@/components/StudyProgress";

export default function AboutPage() {
  return (
    <div>
      <h2>What I'm Learning</h2>
      <StudyProgress />
    </div>
  );
}
```

## Vanilla JS / HTML Version

If your portfolio isn't React:

```html
<div id="study-progress"></div>

<script>
  fetch("https://adamant-mink-316.convex.cloud/api/query", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ path: "progress:getStudySync", args: {} }),
  })
    .then(r => r.json())
    .then(json => {
      if (json.status !== "success") return;
      const d = json.value;
      const pct = d.total > 0 ? Math.round((d.completed / d.total) * 100) : 0;
      document.getElementById("study-progress").innerHTML = `
        <div style="padding:20px;border-radius:12px;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);max-width:400px">
          <div style="font-size:13px;font-weight:700;margin-bottom:12px;color:#a0a0a0">STUDY PROGRESS</div>
          <div style="width:100%;height:8px;background:rgba(255,255,255,0.06);border-radius:4px;overflow:hidden;margin-bottom:12px">
            <div style="width:${pct}%;height:100%;background:linear-gradient(90deg,#6366f1,#a855f7);border-radius:4px;transition:width 0.8s ease"></div>
          </div>
          <div style="display:flex;justify-content:space-between;font-size:13px">
            <span style="color:#e0e0e0;font-weight:600">${d.completed}/${d.total} tasks</span>
            <span style="color:#a855f7;font-weight:700;font-family:monospace">${pct}%</span>
          </div>
          <div style="font-size:11px;color:#888;margin-top:8px">${d.activeMilestone}</div>
        </div>
      `;
    });
</script>
```

## Key Details

- **No API key needed** — the study-sync endpoint is public (read-only)
- **No CORS issues** — Convex allows cross-origin by default
- **Real-time** — data updates within seconds of completing tasks in AEON
- **Convex Dashboard**: https://dashboard.convex.dev/t/nidhirakesh2712/aeon
