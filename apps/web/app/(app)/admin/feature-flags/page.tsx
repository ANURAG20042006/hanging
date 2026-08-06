"use client";

import { useState, useEffect } from "react";
import { Radio, RefreshCw, CheckCircle2, Sliders, Shield } from "lucide-react";

interface Flag {
  key: string;
  enabled: boolean;
  percentage: number;
  description: string;
}

export default function FeatureFlagsAdminPage() {
  const [flags, setFlags] = useState<Flag[]>([
    { key: "ai_assistant_v2", enabled: true, percentage: 100, description: "Gemini 2.5 multimodal memory graph query engine." },
    { key: "spatial_voice", enabled: true, percentage: 100, description: "Three.js WebGL spatial audio dampening in 3D clubhouses." },
    { key: "kafka_events", enabled: true, percentage: 100, description: "Asynchronous multi-region notification message broker." },
    { key: "canary_clubhouse_v2", enabled: true, percentage: 5, description: "Canary rollout of 4K WebRTC video stream profile." },
    { key: "biometric_login", enabled: true, percentage: 100, description: "Local WebAuthn FaceID / TouchID biometric login." },
  ]);

  const toggleFlag = (key: string) => {
    setFlags((prev) =>
      prev.map((f) => (f.key === key ? { ...f, enabled: !f.enabled } : f))
    );
  };

  const updatePercentage = (key: string, val: number) => {
    setFlags((prev) =>
      prev.map((f) => (f.key === key ? { ...f, percentage: val } : f))
    );
  };

  return (
    <div className="min-h-screen bg-[#0A0E1A] text-white p-8 space-y-8 max-w-5xl mx-auto">
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 text-violet-400 text-xs font-mono border border-violet-500/20 mb-2">
          <Radio className="w-3.5 h-3.5" /> Feature Flags Engine
        </div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
          Feature Flags & Canary Rollout Management
        </h1>
        <p className="text-white/40 text-sm mt-1">Control instant feature toggles and percentage-based user rollouts in production.</p>
      </div>

      <div className="space-y-4">
        {flags.map((flag) => (
          <div key={flag.key} className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-sm font-bold text-white">{flag.key}</span>
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                    flag.enabled ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30" : "bg-white/10 text-white/40"
                  }`}>
                    {flag.enabled ? "ACTIVE" : "DISABLED"}
                  </span>
                </div>
                <p className="text-xs text-white/50 mt-1">{flag.description}</p>
              </div>

              <button
                onClick={() => toggleFlag(flag.key)}
                className={`w-12 h-6 rounded-full p-1 transition-colors ${
                  flag.enabled ? "bg-violet-600" : "bg-white/10"
                }`}
              >
                <div className={`w-4 h-4 rounded-full bg-white transition-transform ${flag.enabled ? "translate-x-6" : ""}`} />
              </button>
            </div>

            {flag.enabled && (
              <div className="pt-3 border-t border-white/5 flex items-center gap-4 text-xs font-mono">
                <Sliders className="w-4 h-4 text-cyan-400" />
                <span className="text-white/60">Target Population:</span>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={flag.percentage}
                  onChange={(e) => updatePercentage(flag.key, parseInt(e.target.value))}
                  className="w-48 accent-cyan-400"
                />
                <span className="text-cyan-300 font-bold w-12">{flag.percentage}%</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
