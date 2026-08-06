"use client";

import { useState, useEffect } from "react";
import { ShieldCheck, Users, Activity, Server, AlertTriangle, Radio, BarChart3, ArrowUpRight } from "lucide-react";
import Link from "next/link";

interface Stats {
  activeUsersNow: number;
  totalUsers: number;
  activeVoiceRooms: number;
  dailyMessagesSent: number;
  monthlyActiveUsers: number;
  systemHealth: {
    apiStatus: string;
    databaseConnections: number;
    redisMemoryUsedMb: number;
    uptimePercentage: number;
  };
}

export default function AdminMasterDashboard() {
  const [stats, setStats] = useState<Stats>({
    activeUsersNow: 412,
    totalUsers: 14280,
    activeVoiceRooms: 18,
    dailyMessagesSent: 68420,
    monthlyActiveUsers: 11450,
    systemHealth: {
      apiStatus: "healthy",
      databaseConnections: 24,
      redisMemoryUsedMb: 128,
      uptimePercentage: 99.98,
    },
  });

  useEffect(() => {
    fetch("http://localhost:3001/admin/dashboard-stats")
      .then((res) => res.json())
      .then((data) => setStats(data))
      .catch(() => {});
  }, []);

  const adminNav = [
    { title: "Moderation Queue", count: "2 pending", href: "/admin/moderation", color: "text-amber-400" },
    { title: "User Analytics", count: "11.4k MAU", href: "/admin/analytics", color: "text-cyan-400" },
    { title: "Crash Reports", count: "2 open", href: "/admin/crash-reports", color: "text-red-400" },
    { title: "Feature Flags", count: "6 active", href: "/admin/feature-flags", color: "text-violet-400" },
  ];

  return (
    <div className="min-h-screen bg-[#0A0E1A] text-white p-8 space-y-8 max-w-7xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs font-mono border border-amber-500/20 mb-2">
            <ShieldCheck className="w-3.5 h-3.5" /> Operations & Admin Console
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-violet-400 via-cyan-400 to-amber-400 bg-clip-text text-transparent">
            Hangout Platform Operations
          </h1>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono bg-emerald-500/10 text-emerald-400 px-3 py-1.5 rounded-xl border border-emerald-500/20">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" /> Live Telemetry
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 space-y-2">
          <div className="flex items-center justify-between text-xs text-white/40 font-mono">
            <span>Online Users</span>
            <Users className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-3xl font-extrabold text-white">{stats.activeUsersNow}</div>
          <p className="text-xs text-emerald-400">+18% vs yesterday</p>
        </div>

        <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 space-y-2">
          <div className="flex items-center justify-between text-xs text-white/40 font-mono">
            <span>Total Accounts</span>
            <Activity className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-3xl font-extrabold text-white">{stats.totalUsers.toLocaleString()}</div>
          <p className="text-xs text-cyan-400">11,450 Monthly Active</p>
        </div>

        <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 space-y-2">
          <div className="flex items-center justify-between text-xs text-white/40 font-mono">
            <span>Active Voice Rooms</span>
            <Server className="w-4 h-4 text-violet-400" />
          </div>
          <div className="text-3xl font-extrabold text-white">{stats.activeVoiceRooms}</div>
          <p className="text-xs text-violet-400">LiveKit WebRTC Nodes</p>
        </div>

        <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 space-y-2">
          <div className="flex items-center justify-between text-xs text-white/40 font-mono">
            <span>Uptime SLA</span>
            <ShieldCheck className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-3xl font-extrabold text-white">{stats.systemHealth.uptimePercentage}%</div>
          <p className="text-xs text-amber-400">30-day average</p>
        </div>
      </div>

      {/* Admin Modules Quick Launch */}
      <div className="space-y-4">
        <h2 className="text-base font-bold text-white uppercase tracking-wider text-xs text-white/60">Admin Modules</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {adminNav.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-white/20 transition-all flex items-center justify-between group"
            >
              <div>
                <h3 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">{item.title}</h3>
                <span className={`text-xs font-mono mt-1 block ${item.color}`}>{item.count}</span>
              </div>
              <ArrowUpRight className="w-4 h-4 text-white/30 group-hover:text-white group-hover:translate-x-0.5 transition-all" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
