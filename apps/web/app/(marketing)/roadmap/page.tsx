"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Compass, CheckCircle2, Clock, ThumbsUp, Sparkles, MessageSquare } from "lucide-react";

export default function RoadmapPage() {
  const [votes, setVotes] = useState<Record<string, number>>({
    "item-1": 342,
    "item-2": 289,
    "item-3": 194,
    "item-4": 412,
  });

  const handleVote = (id: string) => {
    setVotes((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  };

  const columns = [
    {
      title: "Recently Launched (v2.4)",
      badge: "Completed",
      color: "border-emerald-500/40 bg-emerald-500/5 text-emerald-400",
      items: [
        { id: "item-101", title: "Cloud-Native Infrastructure & Kafka Stream", desc: "Redis cluster, Prometheus metrics, canary deployments, 99.98% uptime SLA.", votes: 512 },
        { id: "item-102", title: "Universal Sync & Offline PWA Mode", desc: "Background sync for offline chat draft messages and local biometric auth.", votes: 428 },
        { id: "item-103", title: "3D Spatial Clubhouse Audio", desc: "Three.js WebGL spatial audio zone with physical wall dampening.", votes: 380 },
      ],
    },
    {
      title: "In Development (Q3 2026)",
      badge: "In Progress",
      color: "border-cyan-500/40 bg-cyan-500/5 text-cyan-400",
      items: [
        { id: "item-1", title: "Apple TV & Android TV Cinema Client", desc: "Native television app for synchronized 4K movie watch parties from your couch.", votes: votes["item-1"] },
        { id: "item-2", title: "Custom AI Persona Training", desc: "Train your group AI to talk like a former roommate or group legend.", votes: votes["item-2"] },
      ],
    },
    {
      title: "Under Consideration (Q4 2026)",
      badge: "Planned",
      color: "border-violet-500/40 bg-violet-500/5 text-violet-400",
      items: [
        { id: "item-3", title: "Physical Memory Book Export", desc: "One-click print book compilation of all group time capsules & photos.", votes: votes["item-3"] },
        { id: "item-4", title: "VR Clubhouse for Meta Quest 3", desc: "Immersive virtual reality clubhouse experience with avatars.", votes: votes["item-4"] },
      ],
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-16 space-y-12">
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-mono border border-cyan-500/20">
          <Compass className="w-3.5 h-3.5" /> Public Product Roadmap
        </div>
        <h1 className="text-4xl font-extrabold text-white">Help us shape the future of Hangout</h1>
        <p className="text-white/60 text-sm">Vote on feature requests or see what our engineering team is building next.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {columns.map((col) => (
          <div key={col.title} className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h2 className="font-bold text-white text-base">{col.title}</h2>
              <span className={`text-xs font-mono px-2.5 py-0.5 rounded-full border ${col.color}`}>
                {col.badge}
              </span>
            </div>

            <div className="space-y-4">
              {col.items.map((item) => (
                <div key={item.id} className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-white/20 transition-all space-y-3">
                  <h3 className="font-semibold text-white text-sm">{item.title}</h3>
                  <p className="text-white/50 text-xs leading-relaxed">{item.desc}</p>

                  <div className="flex items-center justify-between pt-2 border-t border-white/5 text-xs text-white/40">
                    <button
                      onClick={() => handleVote(item.id)}
                      className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/5 hover:bg-violet-500/20 hover:text-violet-300 transition-colors font-mono"
                    >
                      <ThumbsUp className="w-3.5 h-3.5 text-violet-400" />
                      <span>{item.votes} votes</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
