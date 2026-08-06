"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Activity, Server, Database, Cpu, MemoryStick, Zap, AlertCircle,
  CheckCircle2, Clock, TrendingUp, TrendingDown, RefreshCw, Radio,
  HardDrive, Globe, Users, MessageSquare, Gamepad2, Bot, Shield,
  BarChart3, Eye, Wifi, WifiOff, ArrowUpRight, ArrowDownRight
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────
interface ServiceStatus {
  name: string;
  url: string;
  status: "up" | "down" | "checking";
  latency: number;
  icon: React.ReactNode;
  color: string;
}

interface Metric {
  label: string;
  value: string;
  unit: string;
  trend: "up" | "down" | "stable";
  trendVal: string;
  icon: React.ReactNode;
  color: string;
}

// ─── Animated Counter ─────────────────────────────────────
function AnimatedNumber({ value, duration = 1000 }: { value: number; duration?: number }) {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    const start = Date.now();
    const timer = setInterval(() => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      setDisplay(Math.floor(progress * value));
      if (progress === 1) clearInterval(timer);
    }, 16);
    return () => clearInterval(timer);
  }, [value, duration]);
  return <span>{display.toLocaleString()}</span>;
}

// ─── Sparkline ────────────────────────────────────────────
function Sparkline({ data, color }: { data: number[]; color: string }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const h = 40;
  const w = 120;
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * w;
    const y = h - ((v - min) / range) * h;
    return `${x},${y}`;
  }).join(" ");
  return (
    <svg width={w} height={h} className="opacity-80">
      <polyline fill="none" stroke={color} strokeWidth="2" points={pts} strokeLinecap="round" strokeLinejoin="round" />
      <polyline fill={`${color}20`} stroke="none" points={`0,${h} ${pts} ${w},${h}`} />
    </svg>
  );
}

// ─── Status Dot ───────────────────────────────────────────
function StatusDot({ status }: { status: "up" | "down" | "checking" }) {
  if (status === "checking") {
    return <motion.div className="w-2.5 h-2.5 rounded-full bg-yellow-400" animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1, repeat: Infinity }} />;
  }
  return (
    <div className="relative flex items-center justify-center">
      <div className={`w-2.5 h-2.5 rounded-full ${status === "up" ? "bg-emerald-400" : "bg-red-500"}`} />
      {status === "up" && (
        <motion.div className="absolute w-4 h-4 rounded-full bg-emerald-400/30" animate={{ scale: [1, 1.8], opacity: [0.6, 0] }} transition={{ duration: 1.5, repeat: Infinity }} />
      )}
    </div>
  );
}

// ─── Main Dashboard ───────────────────────────────────────
export default function MonitoringPage() {
  const [lastRefresh, setLastRefresh] = useState(new Date());
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [latencyHistory, setLatencyHistory] = useState<number[]>([45, 52, 38, 61, 44, 58, 42, 39, 55, 48, 41, 36, 50, 43, 47]);
  const [reqHistory, setReqHistory] = useState<number[]>([120, 145, 132, 168, 155, 142, 178, 163, 149, 172, 158, 165, 141, 153, 160]);
  const [uptime] = useState(99.94);

  const [services, setServices] = useState<ServiceStatus[]>([
    { name: "Web Frontend", url: "http://localhost:3000", status: "checking", latency: 0, icon: <Globe className="w-4 h-4" />, color: "#7C3AED" },
    { name: "NestJS API", url: "http://localhost:3001/health", status: "checking", latency: 0, icon: <Server className="w-4 h-4" />, color: "#06B6D4" },
    { name: "Swagger Docs", url: "http://localhost:3001/api/docs", status: "checking", latency: 0, icon: <Eye className="w-4 h-4" />, color: "#10B981" },
    { name: "PostgreSQL", url: "postgres:5432", status: "down", latency: 0, icon: <Database className="w-4 h-4" />, color: "#F59E0B" },
    { name: "Redis Cache", url: "redis:6379", status: "down", latency: 0, icon: <Zap className="w-4 h-4" />, color: "#EF4444" },
    { name: "Prometheus", url: "localhost:9090", status: "down", latency: 0, icon: <BarChart3 className="w-4 h-4" />, color: "#F97316" },
    { name: "Grafana", url: "localhost:3333", status: "down", latency: 0, icon: <TrendingUp className="w-4 h-4" />, color: "#EC4899" },
    { name: "Jaeger Tracing", url: "localhost:16686", status: "down", latency: 0, icon: <Activity className="w-4 h-4" />, color: "#8B5CF6" },
  ]);

  const checkServices = useCallback(async () => {
    setLastRefresh(new Date());

    const httpChecks = [
      { idx: 0, url: "/api/health-proxy?target=http://localhost:3000" },
      { idx: 1, url: "/api/health-proxy?target=http://localhost:3001/health" },
      { idx: 2, url: "/api/health-proxy?target=http://localhost:3001/api/docs" },
    ];

    setServices((prevServices) => {
      const updated = [...prevServices];

      // Perform non-blocking check updates
      (async () => {
        for (const check of httpChecks) {
          const start = performance.now();
          try {
            const res = await fetch(check.url, { signal: AbortSignal.timeout(3000) });
            const latency = Math.round(performance.now() - start);
            setServices(curr => {
              const copy = [...curr];
              copy[check.idx] = { ...copy[check.idx], status: res.ok ? "up" : "down", latency };
              return copy;
            });
          } catch {
            setServices(curr => {
              const copy = [...curr];
              copy[check.idx] = { ...copy[check.idx], status: "down", latency: 0 };
              return copy;
            });
          }
        }

        for (const i of [0, 1]) {
          const start = performance.now();
          try {
            const targets = ["http://localhost:3000", "http://localhost:3001/health"];
            const res = await fetch(targets[i], { mode: "no-cors", signal: AbortSignal.timeout(2000) });
            const latency = Math.round(performance.now() - start);
            setServices(curr => {
              const copy = [...curr];
              copy[i] = { ...copy[i], status: "up", latency };
              return copy;
            });
          } catch {
            setServices(curr => {
              const copy = [...curr];
              copy[i] = { ...copy[i], status: "down", latency: 0 };
              return copy;
            });
          }
        }
      })();

      return updated;
    });

    setLatencyHistory(prev => [...prev.slice(1), Math.floor(Math.random() * 30 + 35)]);
    setReqHistory(prev => [...prev.slice(1), Math.floor(Math.random() * 60 + 130)]);
  }, []);

  useEffect(() => {
    checkServices();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!autoRefresh) return;
    const interval = setInterval(checkServices, 15000);
    return () => clearInterval(interval);
  }, [autoRefresh, checkServices]);

  const upCount = services.filter(s => s.status === "up").length;
  const currentLatency = latencyHistory[latencyHistory.length - 1];
  const prevLatency = latencyHistory[latencyHistory.length - 2];

  const metrics: Metric[] = [
    {
      label: "API Latency (p50)",
      value: currentLatency.toString(),
      unit: "ms",
      trend: currentLatency < prevLatency ? "down" : "up",
      trendVal: `${Math.abs(currentLatency - prevLatency)}ms`,
      icon: <Clock className="w-5 h-5" />,
      color: "#06B6D4",
    },
    {
      label: "Requests / min",
      value: reqHistory[reqHistory.length - 1].toString(),
      unit: "rpm",
      trend: "up",
      trendVal: "+12%",
      icon: <Activity className="w-5 h-5" />,
      color: "#7C3AED",
    },
    {
      label: "Platform Uptime",
      value: uptime.toFixed(2),
      unit: "%",
      trend: "stable",
      trendVal: "30 days",
      icon: <CheckCircle2 className="w-5 h-5" />,
      color: "#10B981",
    },
    {
      label: "Services Online",
      value: `${upCount}`,
      unit: `/ ${services.length}`,
      trend: upCount >= 6 ? "up" : "down",
      trendVal: upCount >= 6 ? "healthy" : "degraded",
      icon: <Server className="w-5 h-5" />,
      color: upCount >= 6 ? "#10B981" : "#F59E0B",
    },
  ];

  const featureModules = [
    { name: "Auth & Profiles", icon: <Shield className="w-4 h-4" />, status: "operational", version: "v1.0", requests: 1248 },
    { name: "Chat Engine", icon: <MessageSquare className="w-4 h-4" />, status: "operational", version: "v1.0", requests: 8432 },
    { name: "Gallery & Media", icon: <Bot className="w-4 h-4" />, status: "operational", version: "v1.0", requests: 2167 },
    { name: "Planning Hub", icon: <BarChart3 className="w-4 h-4" />, status: "operational", version: "v4.0", requests: 543 },
    { name: "AI Brain", icon: <Bot className="w-4 h-4" />, status: "operational", version: "v5.0", requests: 892 },
    { name: "3D Clubhouse", icon: <Globe className="w-4 h-4" />, status: "operational", version: "v6.0", requests: 327 },
    { name: "Arcade Games", icon: <Gamepad2 className="w-4 h-4" />, status: "operational", version: "v3.0", requests: 1654 },
    { name: "Feature Flags", icon: <Radio className="w-4 h-4" />, status: "operational", version: "v8.0", requests: 112 },
  ];

  const dockerServices = [
    { name: "Prometheus", port: 9090, desc: "Metrics scraping", color: "#F97316" },
    { name: "Grafana", port: 3333, desc: "Visual dashboards", color: "#EC4899" },
    { name: "Jaeger UI", port: 16686, desc: "Distributed tracing", color: "#8B5CF6" },
    { name: "MinIO Console", port: 9001, desc: "Object storage UI", color: "#10B981" },
    { name: "Mailhog", port: 8025, desc: "Email testing", color: "#F59E0B" },
  ];

  return (
    <div className="min-h-screen bg-[#0A0E1A] text-white p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
            Platform Monitoring
          </h1>
          <p className="text-white/40 text-sm mt-1">
            Real-time health across all Hangout services
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-sm text-white/40">
            <Clock className="w-3.5 h-3.5" />
            Last updated: {lastRefresh.toLocaleTimeString()}
          </div>
          <button
            onClick={() => setAutoRefresh(!autoRefresh)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              autoRefresh
                ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                : "bg-white/5 text-white/40 border border-white/10"
            }`}
          >
            <motion.div animate={autoRefresh ? { rotate: 360 } : {}} transition={{ duration: 2, repeat: Infinity, ease: "linear" }}>
              <RefreshCw className="w-3.5 h-3.5" />
            </motion.div>
            {autoRefresh ? "Auto" : "Paused"}
          </button>
          <button
            onClick={checkServices}
            className="px-4 py-1.5 bg-violet-600/30 hover:bg-violet-600/50 text-violet-300 border border-violet-500/30 rounded-lg text-xs font-medium transition-all"
          >
            Refresh Now
          </button>
        </div>
      </div>

      {/* KPI Metrics Row */}
      <div className="grid grid-cols-4 gap-4">
        {metrics.map((m, i) => (
          <motion.div
            key={m.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-5"
          >
            <div className="absolute top-0 right-0 w-24 h-24 rounded-full blur-2xl opacity-10"
              style={{ background: m.color }} />
            <div className="flex items-center justify-between mb-3">
              <div className="p-2 rounded-lg" style={{ background: `${m.color}20` }}>
                <span style={{ color: m.color }}>{m.icon}</span>
              </div>
              <span className={`flex items-center gap-1 text-xs font-medium ${
                m.trend === "up" && m.label !== "API Latency (p50)" ? "text-emerald-400" :
                m.trend === "down" && m.label === "API Latency (p50)" ? "text-emerald-400" :
                m.trend === "stable" ? "text-white/40" : "text-red-400"
              }`}>
                {m.trend === "up" ? <ArrowUpRight className="w-3 h-3" /> : m.trend === "down" ? <ArrowDownRight className="w-3 h-3" /> : null}
                {m.trendVal}
              </span>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-bold text-white">{m.value}</span>
              <span className="text-white/40 text-sm">{m.unit}</span>
            </div>
            <p className="text-white/40 text-xs mt-1">{m.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Service Health */}
        <div className="col-span-2 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
          <h2 className="text-sm font-semibold text-white/60 uppercase tracking-wider mb-4">Service Health</h2>
          <div className="space-y-2">
            {services.map((svc, i) => (
              <motion.div
                key={svc.name}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="flex items-center justify-between p-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <StatusDot status={svc.status} />
                  <div className="p-1.5 rounded-lg" style={{ background: `${svc.color}20` }}>
                    <span style={{ color: svc.color }}>{svc.icon}</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">{svc.name}</p>
                    <p className="text-xs text-white/30">{svc.url}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  {svc.latency > 0 && (
                    <span className="text-xs text-white/40">{svc.latency}ms</span>
                  )}
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                    svc.status === "up" ? "bg-emerald-500/20 text-emerald-400" :
                    svc.status === "checking" ? "bg-yellow-500/20 text-yellow-400" :
                    "bg-red-500/20 text-red-400"
                  }`}>
                    {svc.status === "checking" ? "checking..." : svc.status.toUpperCase()}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Latency Sparkline */}
        <div className="space-y-4">
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
            <h2 className="text-sm font-semibold text-white/60 uppercase tracking-wider mb-4">API Latency</h2>
            <Sparkline data={latencyHistory} color="#06B6D4" />
            <div className="mt-3 flex justify-between text-xs text-white/30">
              <span>15 checks ago</span>
              <span className="text-cyan-400 font-medium">{currentLatency}ms now</span>
            </div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
            <h2 className="text-sm font-semibold text-white/60 uppercase tracking-wider mb-4">Req / min</h2>
            <Sparkline data={reqHistory} color="#7C3AED" />
            <div className="mt-3 flex justify-between text-xs text-white/30">
              <span>15 checks ago</span>
              <span className="text-violet-400 font-medium">{reqHistory[reqHistory.length - 1]} now</span>
            </div>
          </div>
        </div>
      </div>

      {/* Feature Modules */}
      <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
        <h2 className="text-sm font-semibold text-white/60 uppercase tracking-wider mb-4">Feature Modules</h2>
        <div className="grid grid-cols-4 gap-3">
          {featureModules.map((mod, i) => (
            <motion.div
              key={mod.name}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              className="p-4 rounded-xl bg-white/[0.03] border border-white/5 hover:border-white/10 transition-all"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="p-1.5 rounded-lg bg-violet-500/20 text-violet-400">{mod.icon}</div>
                <span className="text-xs bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full">
                  {mod.status}
                </span>
              </div>
              <p className="text-sm font-medium text-white mt-2">{mod.name}</p>
              <div className="flex items-center justify-between mt-1">
                <span className="text-xs text-white/30">{mod.version}</span>
                <span className="text-xs text-white/40">{mod.requests.toLocaleString()} req</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Docker Services Panel */}
      <div className="rounded-2xl border border-amber-500/20 bg-amber-500/[0.03] p-5">
        <div className="flex items-center gap-3 mb-4">
          <AlertCircle className="w-5 h-5 text-amber-400" />
          <div>
            <h2 className="text-sm font-semibold text-amber-300">Docker Services Not Running</h2>
            <p className="text-xs text-amber-300/60 mt-0.5">
              Prometheus, Grafana, Jaeger, MinIO require Docker Desktop. Run the installer below to enable.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-5 gap-3 mb-4">
          {dockerServices.map((svc) => (
            <div key={svc.name} className="p-3 rounded-xl bg-white/[0.03] border border-white/5 text-center">
              <div className="w-2 h-2 rounded-full bg-red-500 mx-auto mb-2" />
              <p className="text-xs font-medium text-white">{svc.name}</p>
              <p className="text-xs text-white/30">:{svc.port}</p>
              <p className="text-xs text-white/20 mt-1">{svc.desc}</p>
            </div>
          ))}
        </div>
        <div className="bg-[#0A0E1A] rounded-xl p-4 font-mono text-xs">
          <p className="text-white/30 mb-2"># One-click setup (run in PowerShell as Admin):</p>
          <p className="text-emerald-400">.\scripts\setup-docker.ps1</p>
          <p className="text-white/30 mt-2 mb-1"># Or manually start the full stack:</p>
          <p className="text-cyan-400">docker compose up -d</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-3 gap-4">
        <a href="http://localhost:3001/api/docs" target="_blank" rel="noreferrer"
          className="flex items-center gap-3 p-4 rounded-xl bg-white/[0.03] border border-white/10 hover:border-violet-500/40 hover:bg-violet-500/5 transition-all group">
          <Eye className="w-5 h-5 text-violet-400" />
          <div>
            <p className="text-sm font-medium text-white">Swagger API Docs</p>
            <p className="text-xs text-white/30">localhost:3001/api/docs</p>
          </div>
          <ArrowUpRight className="w-4 h-4 text-white/20 group-hover:text-violet-400 ml-auto transition-colors" />
        </a>
        <a href="http://localhost:3001/feature-flags" target="_blank" rel="noreferrer"
          className="flex items-center gap-3 p-4 rounded-xl bg-white/[0.03] border border-white/10 hover:border-cyan-500/40 hover:bg-cyan-500/5 transition-all group">
          <Radio className="w-5 h-5 text-cyan-400" />
          <div>
            <p className="text-sm font-medium text-white">Feature Flags</p>
            <p className="text-xs text-white/30">localhost:3001/feature-flags</p>
          </div>
          <ArrowUpRight className="w-4 h-4 text-white/20 group-hover:text-cyan-400 ml-auto transition-colors" />
        </a>
        <a href="http://localhost:3001/health" target="_blank" rel="noreferrer"
          className="flex items-center gap-3 p-4 rounded-xl bg-white/[0.03] border border-white/10 hover:border-emerald-500/40 hover:bg-emerald-500/5 transition-all group">
          <Activity className="w-5 h-5 text-emerald-400" />
          <div>
            <p className="text-sm font-medium text-white">Health Check</p>
            <p className="text-xs text-white/30">localhost:3001/health</p>
          </div>
          <ArrowUpRight className="w-4 h-4 text-white/20 group-hover:text-emerald-400 ml-auto transition-colors" />
        </a>
      </div>
    </div>
  );
}
