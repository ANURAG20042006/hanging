"use client";

import { Sparkles, Tag, Calendar, CheckCircle2, Rocket } from "lucide-react";

export default function ChangelogPage() {
  const releases = [
    {
      version: "v2.4.0",
      date: "August 6, 2026",
      tag: "Public Release",
      title: "Cloud-Native Infrastructure & Global Public Release",
      highlights: [
        "Kubernetes 12-manifest cluster configuration with HPA & PDB.",
        "Prometheus & Grafana telemetry endpoints for real-time latency profiling.",
        "Kafka event message broker for asynchronous multi-region notifications.",
        "Deterministic per-user feature flags engine with sticky hash bucketing.",
        "Full PWA offline sync engine for draft messages and local biometric login.",
      ],
    },
    {
      version: "v2.3.0",
      date: "July 24, 2026",
      tag: "Ecosystem & Apps",
      title: "Native Android & iOS Apps with Dynamic Island & Haptics",
      highlights: [
        "Flutter & React Native cross-platform apps with biometric FaceID sign-in.",
        "iOS Dynamic Island widget showing active spatial audio voice participants.",
        "Android Home Screen widget for today's friend group birthdays.",
        "Electron & Tauri Desktop builds with hardware-accelerated WebGL rendering.",
      ],
    },
    {
      version: "v2.2.0",
      date: "July 10, 2026",
      tag: "3D Clubhouse",
      title: "React Three Fiber Spatial WebGL Clubhouse & Physics",
      highlights: [
        "Rapier 3D physics collision engine for clubhouse walking & mini-games.",
        "Spatial WebGL audio dampening when stepping into side rooms.",
        "Synchronized 4K Cinema video player with floating emoji reactions.",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-[#0A0E1A] text-white p-8 space-y-8 max-w-5xl mx-auto">
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-mono border border-cyan-500/20 mb-3">
          <Rocket className="w-3.5 h-3.5" /> What’s New
        </div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
          Product Changelog & Updates
        </h1>
        <p className="text-white/40 text-sm mt-1">Track all platform improvements, new features, and bug fixes.</p>
      </div>

      <div className="space-y-8 relative before:absolute before:left-[17px] before:top-4 before:bottom-4 before:w-0.5 before:bg-white/10">
        {releases.map((rel) => (
          <div key={rel.version} className="relative pl-10 space-y-4">
            <div className="absolute left-2 top-1.5 w-5 h-5 rounded-full bg-gradient-to-tr from-violet-600 to-cyan-400 p-0.5 shadow-lg">
              <div className="w-full h-full bg-[#0A0E1A] rounded-full flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-cyan-400" />
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
                <div className="flex items-center gap-3">
                  <span className="font-mono font-bold text-lg text-white">{rel.version}</span>
                  <span className="text-xs text-white/40 font-mono flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" /> {rel.date}
                  </span>
                </div>
                <span className="bg-violet-500/20 text-violet-300 text-xs px-3 py-1 rounded-full border border-violet-500/30 font-mono font-semibold">
                  {rel.tag}
                </span>
              </div>

              <h2 className="text-lg font-bold text-cyan-300">{rel.title}</h2>

              <ul className="space-y-2">
                {rel.highlights.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-xs text-white/70">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
