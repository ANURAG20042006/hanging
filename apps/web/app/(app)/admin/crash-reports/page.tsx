"use client";

import { useState, useEffect } from "react";
import { AlertCircle, CheckCircle2, Clock, Bug, Terminal } from "lucide-react";

interface CrashReport {
  id: string;
  error: string;
  stack?: string;
  appVersion: string;
  platform: string;
  timestamp: string;
  occurrences: number;
  status: "open" | "investigating" | "resolved";
}

export default function CrashReportsPage() {
  const [reports, setReports] = useState<CrashReport[]>([]);

  useEffect(() => {
    fetch("http://localhost:3001/admin/crash-reports")
      .then((res) => res.json())
      .then((data) => setReports(data))
      .catch(() => {
        setReports([
          {
            id: "crash-101",
            error: "TypeError: Cannot read properties of undefined (reading `webSocket`)",
            stack: "Error at SocketService.connect (socket.ts:42:15)\n  at ClubhouseRoom.tsx:118:2",
            appVersion: "v2.4.0",
            platform: "Web (Chrome 124)",
            timestamp: new Date().toISOString(),
            occurrences: 14,
            status: "open",
          },
          {
            id: "crash-102",
            error: "RenderError: WebGL context lost during spatial audio graph build",
            stack: "WebGLContextLost at Canvas.tsx:89:10\n  at ThreeCanvas.tsx:44",
            appVersion: "v2.3.9",
            platform: "Windows Desktop (Electron)",
            timestamp: new Date().toISOString(),
            occurrences: 3,
            status: "investigating",
          },
        ]);
      });
  }, []);

  return (
    <div className="min-h-screen bg-[#0A0E1A] text-white p-8 space-y-8 max-w-6xl mx-auto">
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 text-red-400 text-xs font-mono border border-red-500/20 mb-2">
          <Bug className="w-3.5 h-3.5" /> Crash Telemetry
        </div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-red-400 to-amber-400 bg-clip-text text-transparent">
          Client & Server Crash Reports
        </h1>
        <p className="text-white/40 text-sm mt-1">Real-time error stack traces and unhandled exceptions.</p>
      </div>

      <div className="space-y-4">
        {reports.map((report) => (
          <div key={report.id} className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs text-red-400 font-bold">{report.id}</span>
                <span className="text-xs font-mono text-white/50">{report.platform} • {report.appVersion}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-amber-400 font-mono font-semibold">{report.occurrences} occurrences</span>
                <span className={`text-[11px] px-2.5 py-0.5 rounded-full font-mono uppercase font-semibold ${
                  report.status === "open" ? "bg-red-500/20 text-red-400 border border-red-500/30" : "bg-yellow-500/20 text-yellow-400"
                }`}>
                  {report.status}
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="font-mono text-xs font-bold text-white leading-relaxed">{report.error}</h3>
              {report.stack && (
                <pre className="p-4 rounded-xl bg-black/60 border border-white/5 font-mono text-[11px] text-red-300 overflow-x-auto">
                  <code>{report.stack}</code>
                </pre>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
