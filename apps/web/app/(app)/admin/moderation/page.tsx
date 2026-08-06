"use client";

import { useState, useEffect } from "react";
import { ShieldAlert, Check, X, AlertTriangle, UserX } from "lucide-react";

interface Report {
  id: string;
  reportedUser: string;
  reporterUser: string;
  reason: string;
  contentType: string;
  contentSnippet: string;
  status: string;
  createdAt: string;
}

export default function ModerationToolsPage() {
  const [reports, setReports] = useState<Report[]>([]);
  const [actionReason, setActionReason] = useState("Violation of community standards");

  useEffect(() => {
    fetch("http://localhost:3001/admin/moderation/reports")
      .then((res) => res.json())
      .then((data) => setReports(data))
      .catch(() => {
        setReports([
          {
            id: "mod-201",
            reportedUser: "Alex Vance (@alex_v)",
            reporterUser: "Sarah Connor (@sarah_c)",
            reason: "Inappropriate language in public game lobby",
            contentType: "chat",
            contentSnippet: "Hey everyone stop ruining the game state...",
            status: "pending",
            createdAt: new Date().toISOString(),
          },
          {
            id: "mod-202",
            reportedUser: "Dave Miller (@dave_m)",
            reporterUser: "Elena Rostova (@elena_r)",
            reason: "Spam invite code links",
            contentType: "chat",
            contentSnippet: "Join my channel fast: https://hangout.app/invite/spamm123",
            status: "pending",
            createdAt: new Date().toISOString(),
          },
        ]);
      });
  }, []);

  const handleAction = async (reportId: string, action: "warn" | "suspend" | "ban" | "dismiss") => {
    fetch("http://localhost:3001/admin/moderation/action", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ reportId, action, reason: actionReason }),
    }).catch(() => {});

    setReports((prev) =>
      prev.map((r) => (r.id === reportId ? { ...r, status: action === "dismiss" ? "dismissed" : "actioned" } : r))
    );
  };

  return (
    <div className="min-h-screen bg-[#0A0E1A] text-white p-8 space-y-8 max-w-6xl mx-auto">
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs font-mono border border-amber-500/20 mb-2">
          <ShieldAlert className="w-3.5 h-3.5" /> Moderation Console
        </div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-amber-400 to-red-400 bg-clip-text text-transparent">
          Content Moderation & Reports Queue
        </h1>
        <p className="text-white/40 text-sm mt-1">Review flagged user content, issue warnings, or suspend accounts.</p>
      </div>

      <div className="space-y-4">
        {reports.map((report) => (
          <div key={report.id} className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs text-amber-400 font-bold">{report.id}</span>
                <span className="text-xs font-bold text-white">Reported: {report.reportedUser}</span>
                <span className="text-xs text-white/40">by {report.reporterUser}</span>
              </div>
              <span className={`text-[11px] px-3 py-0.5 rounded-full font-mono uppercase font-semibold ${
                report.status === "pending" ? "bg-amber-500/20 text-amber-400 border border-amber-500/30" : "bg-white/10 text-white/40"
              }`}>
                {report.status}
              </span>
            </div>

            <div className="space-y-2">
              <div className="text-xs text-white/60">
                <strong>Reason:</strong> {report.reason}
              </div>
              <div className="p-3 rounded-xl bg-black/40 border border-white/5 font-mono text-xs text-cyan-300">
                "{report.contentSnippet}"
              </div>
            </div>

            {report.status === "pending" && (
              <div className="flex flex-wrap items-center justify-end gap-3 pt-2">
                <button
                  onClick={() => handleAction(report.id, "dismiss")}
                  className="px-4 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold text-white transition-colors"
                >
                  Dismiss Report
                </button>
                <button
                  onClick={() => handleAction(report.id, "warn")}
                  className="px-4 py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/40 text-amber-300 border border-amber-500/30 text-xs font-bold transition-colors"
                >
                  Issue Warning
                </button>
                <button
                  onClick={() => handleAction(report.id, "suspend")}
                  className="px-4 py-1.5 rounded-xl bg-red-600/30 hover:bg-red-600/50 text-red-300 border border-red-500/30 text-xs font-bold transition-colors"
                >
                  Suspend Account
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
