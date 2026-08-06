"use client";

import { useState, useEffect } from "react";
import { BarChart3, TrendingUp, Users, Calendar, ArrowUpRight } from "lucide-react";

export default function UserAnalyticsPage() {
  const [data, setData] = useState({
    range: "30d",
    userGrowth: [
      { date: "Mon", dau: 3400, mau: 10200, newSignups: 240 },
      { date: "Tue", dau: 3620, mau: 10450, newSignups: 280 },
      { date: "Wed", dau: 3890, mau: 10700, newSignups: 310 },
      { date: "Thu", dau: 4100, mau: 10950, newSignups: 340 },
      { date: "Fri", dau: 4450, mau: 11200, newSignups: 420 },
      { date: "Sat", dau: 4890, mau: 11350, newSignups: 510 },
      { date: "Sun", dau: 5120, mau: 11450, newSignups: 490 },
    ],
    retentionRates: { day1: "78%", day7: "64%", day30: "49%" },
  });

  return (
    <div className="min-h-screen bg-[#0A0E1A] text-white p-8 space-y-8 max-w-6xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">
          User Analytics & Retention Telemetry
        </h1>
        <p className="text-white/40 text-sm mt-1">DAU/MAU trends, cohort retention, and group activity metrics.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 space-y-2">
          <span className="text-xs text-white/40 font-mono">Day 1 Retention</span>
          <div className="text-3xl font-bold text-emerald-400">{data.retentionRates.day1}</div>
          <p className="text-xs text-white/40">New signups active on Day 2</p>
        </div>

        <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 space-y-2">
          <span className="text-xs text-white/40 font-mono">Day 7 Retention</span>
          <div className="text-3xl font-bold text-cyan-400">{data.retentionRates.day7}</div>
          <p className="text-xs text-white/40">Weekly returning users</p>
        </div>

        <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 space-y-2">
          <span className="text-xs text-white/40 font-mono">Day 30 Retention</span>
          <div className="text-3xl font-bold text-violet-400">{data.retentionRates.day30}</div>
          <p className="text-xs text-white/40">Monthly retained active friends</p>
        </div>
      </div>

      {/* Growth Table */}
      <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 space-y-4">
        <h2 className="text-base font-bold text-white">Daily Active Users (DAU) & Signups</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left font-mono text-xs">
            <thead>
              <tr className="border-b border-white/10 text-white/40">
                <th className="pb-3 font-semibold">Day</th>
                <th className="pb-3 font-semibold">DAU</th>
                <th className="pb-3 font-semibold">MAU</th>
                <th className="pb-3 font-semibold">New Signups</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {data.userGrowth.map((row) => (
                <tr key={row.date} className="hover:bg-white/5">
                  <td className="py-3 font-bold text-white">{row.date}</td>
                  <td className="py-3 text-cyan-400">{row.dau.toLocaleString()}</td>
                  <td className="py-3 text-violet-400">{row.mau.toLocaleString()}</td>
                  <td className="py-3 text-emerald-400">+{row.newSignups}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
