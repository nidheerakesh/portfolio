import { useEffect, useState } from "react";
import {
  CheckCircle2,
  RotateCw,
  Lock,
  Wifi,
  WifiOff,
  AlertTriangle,
  TrendingUp,
  Zap,
  Activity,
  Flame,
  Trophy,
  Target,
} from "lucide-react";
import { useStudySync } from "../hooks/useStudySync";

interface StudyProgressCardProps {
  isActive: boolean;
  onToggleActive: (active: boolean) => void;
  onNotify: (msg: string, type: "success" | "info" | "bubble") => void;
}

export default function StudyProgressCard({
  isActive,
  onToggleActive,
  onNotify,
}: StudyProgressCardProps) {
  const {
    data,
    portfolioData,
    isLoading,
    isSyncing,
    error,
    lastSynced,
    syncNow,
    connectionStatus,
  } = useStudySync(isActive, 30000);

  const [hasNotifiedConnection, setHasNotifiedConnection] = useState(false);

  useEffect(() => {
    if (connectionStatus === "connected" && !hasNotifiedConnection && data) {
      onNotify(
        `⚡ AEON Backend Connected! ${data.completed}/${data.total} tasks synced`,
        "success"
      );
      setHasNotifiedConnection(true);
    }
  }, [connectionStatus, hasNotifiedConnection, data, onNotify]);

  const pct =
    data && data.total > 0
      ? Math.round((data.completed / data.total) * 100)
      : 0;

  const handleManualSync = async () => {
    if (!isActive) {
      onNotify("Enable live sync to fetch database updates! 🔒", "info");
      return;
    }
    onNotify("Pinging AEON Convex backend...", "info");
    await syncNow();
    if (connectionStatus !== "error") {
      onNotify("Live sync complete — data refreshed from AEON ⚡", "success");
    }
  };

  const handleToggle = (active: boolean) => {
    onToggleActive(active);
    setHasNotifiedConnection(false);
    onNotify(
      active
        ? "Web integration pipelines activated 🔓"
        : "Integration disabled. Offline sandbox mode active",
      "info"
    );
  };

  const statusBadge = () => {
    switch (connectionStatus) {
      case "connected":
        return (
          <span className="px-1.5 rounded text-[8px] font-bold bg-green-100 text-green-700 border border-green-300 flex items-center gap-1">
            <Wifi size={8} /> 🟢 Live
          </span>
        );
      case "syncing":
        return (
          <span className="px-1.5 rounded text-[8px] font-bold bg-blue-100 text-blue-700 border border-blue-300 flex items-center gap-1">
            <Activity size={8} className="animate-pulse" /> Syncing...
          </span>
        );
      case "error":
        return (
          <span className="px-1.5 rounded text-[8px] font-bold bg-red-100 text-red-700 border border-red-300 flex items-center gap-1">
            <AlertTriangle size={8} /> Error
          </span>
        );
      default:
        return (
          <span className="px-1.5 rounded text-[8px] font-bold bg-gray-100 text-gray-500 border border-gray-300 flex items-center gap-1">
            <WifiOff size={8} /> Offline
          </span>
        );
    }
  };

  return (
    <div className="lg:col-span-12 xl:col-span-5 bg-[#FFF7F8] border-4 border-[#2B2B2B] rounded-2xl p-6 shadow-[6px_6px_0px_0px_rgba(43,43,43,1)] relative transform rotate-1 hover:rotate-0 transition-all select-text">
      {/* Paper Clip decor */}
      <div className="absolute -top-4 right-10 w-6 h-12 bg-gray-300 rounded-b border-x-2 border-b-2 border-[#2B2B2B] z-10"></div>

      <h3 className="font-mono text-[10px] font-black text-rose-pink uppercase tracking-widest border-b-2 border-dashed border-[#2B2B2B]/20 pb-2 mb-3.5 flex items-center justify-between">
        <span className="flex items-center gap-1">
          <Zap size={10} /> AEON Study Engine — Live Integration
        </span>
        <span
          className={`w-2 h-2 rounded-full border border-[#2B2B2B] ${
            isActive && connectionStatus === "connected"
              ? "bg-green-500 animate-pulse"
              : connectionStatus === "error"
              ? "bg-red-500 animate-pulse"
              : "bg-gray-400"
          }`}
        ></span>
      </h3>

      <div className="space-y-4 text-xs font-mono text-[#2B2B2B]">
        {/* Info blurb */}
        <p className="text-[10.5px] text-[#2B2B2B]/70 leading-normal bg-white p-2.5 border-2 border-dashed border-[#2B2B2B]/20 rounded-xl">
          Live integration with Nidhi&apos;s AEON study engine — powered by Convex
          cloud backend. Task progress, milestones, and learning metrics are
          fetched in real-time from her private curriculum tracker.
        </p>

        {/* Toggle */}
        <div className="flex items-center gap-2 pt-1">
          <input
            type="checkbox"
            id="sync-pipeline-checkbox"
            checked={isActive}
            onChange={(e) => handleToggle(e.target.checked)}
            className="w-4 h-4 rounded border-[#2B2B2B] text-rose-pink focus:ring-rose-pink cursor-pointer accent-rose-pink"
          />
          <label
            htmlFor="sync-pipeline-checkbox"
            className="text-[10px] font-bold text-[#2B2B2B]/80 uppercase tracking-wide cursor-pointer"
          >
            Enable Live Pipeline Integration
          </label>
        </div>

        {/* Sync Button */}
        <button
          type="button"
          onClick={handleManualSync}
          disabled={isSyncing || !isActive}
          className={`w-full text-center py-2.5 border-2 border-[#2B2B2B] rounded-xl font-bold font-mono text-[10px] uppercase shadow-[2.5px_2.5px_0px_#2B2B2B] active:translate-y-[1px] transition-all cursor-pointer ${
            !isActive
              ? "bg-gray-100 text-gray-400 border-gray-300 shadow-none cursor-not-allowed transform-none"
              : "bg-dusty-lavender hover:bg-[#C9B6E4] text-[#2B2B2B]"
          }`}
        >
          {isSyncing ? (
            <span className="flex items-center justify-center gap-1.5 font-bold">
              <RotateCw size={12} className="animate-spin text-purple-600" />
              [ Fetching from Convex... ]
            </span>
          ) : (
            <span>[ ⚡ Sync Now — Fetch Live Data ]</span>
          )}
        </button>

        {/* Console */}
        <div className="border-t border-dashed border-[#2B2B2B]/20 pt-3 space-y-3">
          <div className="flex justify-between items-center text-[9px] font-bold text-[#2B2B2B]/40 uppercase tracking-wider">
            <span>AEON Backend Console:</span>
            {statusBadge()}
          </div>

          {isActive ? (
            isLoading ? (
              <div className="bg-white p-4 border-2 border-[#2B2B2B] rounded-xl flex items-center justify-center gap-2">
                <RotateCw size={14} className="animate-spin text-rose-pink" />
                <span className="text-[10px] font-mono font-bold text-[#2B2B2B]/60">
                  Establishing connection to AEON...
                </span>
              </div>
            ) : error ? (
              <div className="bg-red-50 p-3.5 border-2 border-dashed border-red-300 rounded-xl text-center space-y-1">
                <AlertTriangle size={14} className="mx-auto text-red-400" />
                <p className="font-mono text-[10px] uppercase font-bold text-red-600">
                  Connection Error
                </p>
                <p className="text-[10px] text-red-500">{error}</p>
                <button
                  onClick={handleManualSync}
                  className="mt-2 px-3 py-1 bg-white border border-red-300 rounded-lg text-[9px] font-mono font-bold text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                >
                  Retry Connection
                </button>
              </div>
            ) : data ? (
              <div className="space-y-3">
                {/* Main Progress */}
                <div className="bg-white p-3 border-2 border-[#2B2B2B] rounded-xl space-y-3">
                  <div className="flex justify-between font-bold mb-1 font-mono text-[9px]">
                    <span className="uppercase text-[#2B2B2B]/60 flex items-center gap-1">
                      <TrendingUp size={10} /> Live Study Sync:
                    </span>
                    <span className="text-[#2B2B2B] bg-[#FFF7F8] px-1.5 border border-black rounded text-[10px]">
                      {data.completed} / {data.total} Tasks
                    </span>
                  </div>
                  {/* Progress Bar */}
                  <div className="w-full bg-[#FFF7F8] border border-[#2B2B2B] h-3.5 rounded-md overflow-hidden p-0.5 flex">
                    <div
                      className="bg-rose-pink h-full transition-all duration-700 ease-out rounded"
                      style={{ width: `${pct}%` }}
                    ></div>
                  </div>
                  <div className="text-right text-[9px] font-bold text-rose-pink font-mono">
                    {pct}% Complete
                  </div>

                  {/* Stats row */}
                  {portfolioData && (
                    <div className="grid grid-cols-3 gap-2 pt-1 border-t border-gray-100">
                      <div className="text-center">
                        <div className="flex items-center justify-center gap-0.5 text-[#2B2B2B]/40">
                          <Zap size={9} />
                        </div>
                        <div className="text-[11px] font-bold font-sans">
                          {portfolioData.overview.xp.toLocaleString()}
                        </div>
                        <div className="text-[8px] text-[#2B2B2B]/50 uppercase">
                          XP
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="flex items-center justify-center gap-0.5 text-[#2B2B2B]/40">
                          <Flame size={9} />
                        </div>
                        <div className="text-[11px] font-bold font-sans">
                          {portfolioData.overview.streak}
                        </div>
                        <div className="text-[8px] text-[#2B2B2B]/50 uppercase">
                          Streak
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="flex items-center justify-center gap-0.5 text-[#2B2B2B]/40">
                          <Trophy size={9} />
                        </div>
                        <div className="text-[11px] font-bold font-sans">
                          Lv {portfolioData.overview.level}
                        </div>
                        <div className="text-[8px] text-[#2B2B2B]/50 uppercase">
                          Level
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Today Widget */}
                {portfolioData && (
                  <div className="bg-white p-3 border-2 border-[#2B2B2B] rounded-xl">
                    <div className="text-[9px] font-bold uppercase text-[#2B2B2B]/50 tracking-wider mb-2 flex items-center gap-1">
                      <Target size={9} /> TODAY
                    </div>
                    <div className="flex gap-3">
                      <div className="flex-1 bg-blush-pink/30 rounded-lg p-2 text-center border border-[#2B2B2B]/10">
                        <div className="text-lg font-black font-sans">
                          {portfolioData.today.completed}
                        </div>
                        <div className="text-[8px] uppercase font-bold text-[#2B2B2B]/60">
                          Completed
                        </div>
                      </div>
                      <div className="flex-1 bg-dusty-lavender/30 rounded-lg p-2 text-center border border-[#2B2B2B]/10">
                        <div className="text-lg font-black font-sans">
                          {portfolioData.today.active}
                        </div>
                        <div className="text-[8px] uppercase font-bold text-[#2B2B2B]/60">
                          Active
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Milestone + Meta */}
                <div className="space-y-1.5 text-[10.5px]">
                  <div className="flex gap-1.5 items-start bg-white p-2 border border-[#2B2B2B]/10 rounded-lg">
                    <CheckCircle2 size={12} className="text-emerald-500 mt-0.5" />
                    <div>
                      <span className="text-[8px] text-[#2B2B2B]/50 block uppercase font-bold">
                        Active Milestone:
                      </span>
                      <span className="font-sans font-bold text-xs leading-none">
                        {data.activeMilestone}
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center text-[9px] text-[#2B2B2B]/60 border-t border-gray-100 pt-1.5">
                    <span className="flex items-center gap-1">
                      <Wifi size={8} className="text-green-500" />
                      CONVEX: Real-time Sync
                    </span>
                    <span>Last Ping: {lastSynced || "—"}</span>
                  </div>
                </div>
              </div>
            ) : null
          ) : (
            <div className="bg-[#FFF2F5] p-3.5 border-2 border-dashed border-rose-pink/20 rounded-xl text-center space-y-1">
              <Lock
                size={14}
                className="mx-auto text-rose-pink/60 animate-pulse"
              />
              <p className="font-mono text-[10px] uppercase font-bold text-rose-pink">
                External Integration Locked
              </p>
              <p className="text-[10px] text-gray-500">
                Enable the toggle above to fetch live progress from AEON&apos;s
                Convex backend. No API key needed — read-only public endpoint.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
