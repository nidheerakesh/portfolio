import { useState, useEffect, useCallback, useRef } from "react";

const CONVEX_URL = "https://adamant-mink-316.convex.cloud/api/query";

// === Type Definitions ===

export interface StudySyncData {
  completed: number;
  total: number;
  activeMilestone: string;
  status: "connected" | "disconnected";
}

export interface TaskEntry {
  id: string;
  xpEarned: number;
  completedAt?: string;
}

export interface BuildLogEntry {
  taskId: string;
  completedAt: string;
  xpEarned: number;
}

export interface CategoryBreakdown {
  completed: number;
  total: number;
}

export interface PortfolioData {
  status: string;
  overview: {
    completed: number;
    total: number;
    xp: number;
    level: number;
    streak: number;
    completedBosses?: number;
  };
  today: {
    completed: number;
    active: number;
    tasks: TaskEntry[];
  };
  weeklySnapshot: {
    completed: number;
    building: number;
    next: string;
  };
  categories: Record<string, CategoryBreakdown>;
  currentFocus: string | null;
  buildLog: BuildLogEntry[];
  activeMilestone: string;
}

export interface UseStudySyncReturn {
  // Basic sync data (backward compatible)
  data: StudySyncData | null;
  // Rich portfolio data
  portfolioData: PortfolioData | null;
  // State
  isLoading: boolean;
  isSyncing: boolean;
  error: string | null;
  lastSynced: string | null;
  syncNow: () => Promise<void>;
  connectionStatus: "connected" | "disconnected" | "syncing" | "error";
}

/**
 * Fetches data from a Convex query endpoint.
 */
async function convexQuery<T>(path: string, args: Record<string, unknown> = {}): Promise<T> {
  const response = await fetch(CONVEX_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ path, args }),
  });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
  }

  const json = await response.json();
  if (json.status === "success" && json.value !== undefined) {
    return json.value as T;
  }
  throw new Error(json.errorMessage || "Unexpected response from Convex");
}

/**
 * Custom hook to fetch live study progress from the AEON Convex backend.
 * Uses the public `progress:getPortfolioData` (rich) and falls back to
 * `progress:getStudySync` (basic) if the rich endpoint isn't deployed yet.
 * Polls every `intervalMs` when active (default: 30 seconds).
 */
export function useStudySync(
  isActive: boolean,
  intervalMs: number = 30000
): UseStudySyncReturn {
  const [data, setData] = useState<StudySyncData | null>(null);
  const [portfolioData, setPortfolioData] = useState<PortfolioData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSyncing, setIsSyncing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastSynced, setLastSynced] = useState<string | null>(null);
  const [connectionStatus, setConnectionStatus] = useState<
    "connected" | "disconnected" | "syncing" | "error"
  >("disconnected");

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const fetchStudyData = useCallback(async (silent = false) => {
    if (!silent) setIsSyncing(true);
    setConnectionStatus("syncing");

    try {
      // Try the rich portfolio endpoint first
      try {
        const rich = await convexQuery<PortfolioData>("progress:getPortfolioData");
        setPortfolioData(rich);
        // Also populate backward-compatible basic data
        setData({
          completed: rich.overview.completed,
          total: rich.overview.total,
          activeMilestone: rich.activeMilestone,
          status: "connected",
        });
      } catch {
        // Fall back to basic endpoint
        const basic = await convexQuery<StudySyncData>("progress:getStudySync");
        setData({
          completed: basic.completed ?? 0,
          total: basic.total ?? 0,
          activeMilestone: basic.activeMilestone ?? "Ready to start",
          status: "connected",
        });
        setPortfolioData(null);
      }

      setError(null);
      setConnectionStatus("connected");
      setLastSynced(
        new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    } catch (err: any) {
      console.error("[useStudySync] Fetch error:", err);
      setError(err.message || "Failed to connect to AEON backend");
      setConnectionStatus("error");
    } finally {
      setIsSyncing(false);
      setIsLoading(false);
    }
  }, []);

  // Initial fetch + polling when active
  useEffect(() => {
    if (!isActive) {
      setConnectionStatus("disconnected");
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    // Initial fetch
    fetchStudyData();

    // Set up polling
    intervalRef.current = setInterval(() => {
      fetchStudyData(true);
    }, intervalMs);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isActive, intervalMs, fetchStudyData]);

  const syncNow = useCallback(async () => {
    await fetchStudyData(false);
  }, [fetchStudyData]);

  return {
    data,
    portfolioData,
    isLoading,
    isSyncing,
    error,
    lastSynced,
    syncNow,
    connectionStatus,
  };
}
