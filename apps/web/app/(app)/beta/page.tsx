"use client";

import { useState } from "react";
import { Sparkles, CheckCircle2, Shield, Radio, FlaskConical } from "lucide-react";

export default function BetaProgramPage() {
  const [enrolled, setEnrolled] = useState(false);
  const [experimentalVoice, setExperimentalVoice] = useState(true);
  const [canaryClubhouse, setCanaryClubhouse] = useState(false);

  return (
    <div className="min-h-screen bg-[#0A0E1A] text-white p-8 space-y-8 max-w-4xl mx-auto">
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 text-xs font-mono border border-purple-500/20 mb-3">
          <FlaskConical className="w-3.5 h-3.5" /> Beta Lab
        </div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
          Hangout Beta Program & Experimental Features
        </h1>
        <p className="text-white/40 text-sm mt-1">Get early access to unreleased features and test cutting-edge updates.</p>
      </div>

      {/* Program Card */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-purple-900/30 to-violet-900/30 border border-purple-500/30 space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-xl font-bold text-white">Beta Tester Badge</h2>
            <p className="text-xs text-white/60">Unlock experimental feature flags and direct chat with core engineers.</p>
          </div>
          <button
            onClick={() => setEnrolled(!enrolled)}
            className={`px-5 py-2.5 rounded-xl font-bold text-xs transition-all ${
              enrolled
                ? "bg-emerald-500 text-black shadow-lg shadow-emerald-500/20"
                : "bg-purple-600 hover:bg-purple-500 text-white"
            }`}
          >
            {enrolled ? "Enrolled in Beta ✓" : "Join Beta Program"}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-white/10 pt-6 text-xs text-white/80">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Early access to 3D room themes
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Dedicated #beta-feedback channel
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Higher Gemini AI prompt limits
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Exclusive Beta Tester profile ring
          </div>
        </div>
      </div>

      {/* Feature Flag Toggles */}
      <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 space-y-4">
        <h2 className="text-base font-bold text-white flex items-center gap-2">
          <Radio className="w-4 h-4 text-cyan-400" /> Experimental Feature Toggles
        </h2>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5">
            <div>
              <h3 className="text-xs font-bold text-white">Spatial Audio 3D Reverb Engine</h3>
              <p className="text-[11px] text-white/40">Simulate room acoustics inside WebGL clubhouse walls.</p>
            </div>
            <button
              onClick={() => setExperimentalVoice(!experimentalVoice)}
              className={`w-12 h-6 rounded-full p-1 transition-colors ${
                experimentalVoice ? "bg-cyan-500" : "bg-white/10"
              }`}
            >
              <div className={`w-4 h-4 rounded-full bg-black transition-transform ${experimentalVoice ? "translate-x-6" : ""}`} />
            </button>
          </div>

          <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5">
            <div>
              <h3 className="text-xs font-bold text-white">Canary 4K Screen Sharing Stream</h3>
              <p className="text-[11px] text-white/40">High-bitrate LiveKit WEBRTC stream profile.</p>
            </div>
            <button
              onClick={() => setCanaryClubhouse(!canaryClubhouse)}
              className={`w-12 h-6 rounded-full p-1 transition-colors ${
                canaryClubhouse ? "bg-cyan-500" : "bg-white/10"
              }`}
            >
              <div className={`w-4 h-4 rounded-full bg-black transition-transform ${canaryClubhouse ? "translate-x-6" : ""}`} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
