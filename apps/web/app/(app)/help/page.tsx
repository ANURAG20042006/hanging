"use client";

import { useState } from "react";
import { HelpCircle, Search, BookOpen, MessageSquare, Shield, Video, Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function HelpCenterPage() {
  const [search, setSearch] = useState("");

  const categories = [
    { title: "Getting Started", icon: <Sparkles className="w-5 h-5 text-violet-400" />, count: "6 guides", desc: "Setting up your first 3D clubhouse and inviting friends." },
    { title: "Planning Hub", icon: <BookOpen className="w-5 h-5 text-cyan-400" />, count: "8 guides", desc: "Managing trip itineraries, Notion docs, and Splitwise expense splitting." },
    { title: "Cinema & Voice", icon: <Video className="w-5 h-5 text-emerald-400" />, count: "5 guides", desc: "Streaming 4K video watch parties & troubleshooting audio devices." },
    { title: "Account & Security", icon: <Shield className="w-5 h-5 text-amber-400" />, count: "7 guides", desc: "2FA biometric security, active session revocation, and data export." },
  ];

  return (
    <div className="min-h-screen bg-[#0A0E1A] text-white p-8 space-y-10 max-w-6xl mx-auto">
      <div className="text-center space-y-4">
        <h1 className="text-3xl md:text-5xl font-extrabold bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
          How can we help you today?
        </h1>
        <p className="text-white/60 text-sm max-w-lg mx-auto">Search knowledge base guides or open a ticket with our 24/7 support team.</p>

        <div className="relative max-w-xl mx-auto pt-2">
          <Search className="w-5 h-5 text-white/40 absolute left-4 top-5" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search help articles, keyboard shortcuts, error codes..."
            className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white/[0.04] border border-white/10 text-sm text-white placeholder-white/40 focus:outline-none focus:border-cyan-400"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {categories.map((cat) => (
          <div key={cat.title} className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-violet-500/40 transition-all cursor-pointer group">
            <div className="flex items-center justify-between mb-3">
              <div className="p-2.5 rounded-xl bg-white/5">{cat.icon}</div>
              <span className="text-xs font-mono text-white/40">{cat.count}</span>
            </div>
            <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">{cat.title}</h3>
            <p className="text-white/50 text-xs mt-1 leading-relaxed">{cat.desc}</p>
          </div>
        ))}
      </div>

      {/* Support Direct Action Banner */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-violet-900/30 to-cyan-900/30 border border-white/15 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-1">
          <h3 className="text-xl font-bold text-white">Can’t find what you’re looking for?</h3>
          <p className="text-white/60 text-xs">Our platform support engineers respond within 15 minutes.</p>
        </div>
        <Link
          href="/tickets"
          className="px-6 py-3 rounded-xl bg-cyan-500 text-black font-bold text-xs hover:bg-cyan-400 transition-colors shrink-0 flex items-center gap-2"
        >
          Submit Support Ticket <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
