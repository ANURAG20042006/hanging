"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Sparkles, Shield, Heart, ArrowRight, CheckCircle2, Play, Users, MessageSquare,
  Film, Gamepad2, Calendar, Bot, Globe, Zap, Radio, Layers, Compass, Star
} from "lucide-react";

export default function LandingPage() {
  const featurePillars = [
    {
      title: "3D Digital Clubhouse",
      desc: "Walk, talk, stream movies, and play arcade games together in spatial WebGL 3D rooms.",
      icon: <Globe className="w-6 h-6 text-violet-400" />,
      tag: "Spatial audio & physics",
    },
    {
      title: "Real-Time Planning Hub",
      desc: "Collaborative trip planner, Notion-style docs, splitwise expense tracker & time capsules.",
      icon: <Calendar className="w-6 h-6 text-cyan-400" />,
      tag: "Notion + Splitwise",
    },
    {
      title: "AI Memory Engine",
      desc: "Gemini-powered group AI that remembers shared memories, trips, photos, and group jokes.",
      icon: <Bot className="w-6 h-6 text-purple-400" />,
      tag: "Gemini Memory Graph",
    },
    {
      title: "Cinema & Music Lounge",
      desc: "Synchronized HD video watch parties with real-time floating reactions & voice overlay.",
      icon: <Film className="w-6 h-6 text-emerald-400" />,
      tag: "Low-latency streaming",
    },
    {
      title: "Multiplayer Arcade",
      desc: "Play Ludo, Chess, Trivia Quiz Arena & Poker inside voice channels with live leaderboards.",
      icon: <Gamepad2 className="w-6 h-6 text-amber-400" />,
      tag: "Real-time Socket.IO",
    },
    {
      title: "End-to-End Ecosystem",
      desc: "Seamless universal sync across Web, iOS, Android, Desktop app, and PWA offline mode.",
      icon: <Layers className="w-6 h-6 text-pink-400" />,
      tag: "Universal Sync Engine",
    },
  ];

  const stats = [
    { label: "Active Friend Groups", val: "25,000+" },
    { label: "Memories Saved", val: "4.2M+" },
    { label: "Voice Hours Streamed", val: "1.8M hrs" },
    { label: "System Uptime SLA", val: "99.98%" },
  ];

  const testimonials = [
    {
      quote: "Hangout feels like walking back into our college apartment living room. We use it every night for games and movie watch parties.",
      author: "Alex Rivera",
      role: "Alumni Group Host",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150",
    },
    {
      quote: "The Planning Hub saved our Goa reunion trip! We calculated expenses, voted on venues, and stored all photos in the Memory Capsule.",
      author: "Priya Sharma",
      role: "Travel Lead",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150",
    },
    {
      quote: "The AI Assistant actually remembers jokes from our 2022 trip photos. It’s like having an extra friend in the chat group.",
      author: "David Kim",
      role: "Group Creator",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150",
    },
  ];

  return (
    <div className="space-y-32 pb-24 overflow-hidden">
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 px-6 max-w-7xl mx-auto text-center">
        {/* Glow backdrop */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-r from-violet-600/30 via-cyan-500/20 to-purple-600/30 blur-[120px] rounded-full pointer-events-none -z-10" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-cyan-300 text-xs font-semibold uppercase tracking-wider mb-8"
        >
          <Sparkles className="w-4 h-4 text-cyan-400 animate-spin-slow" />
          The World’s First Digital Home for Close Friends
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl md:text-7xl font-extrabold tracking-tight max-w-4xl mx-auto leading-tight"
        >
          Plan, celebrate, remember, and{" "}
          <span className="bg-gradient-to-r from-violet-400 via-cyan-300 to-purple-400 bg-clip-text text-transparent">
            hang out together.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 text-lg md:text-xl text-white/60 max-w-2xl mx-auto font-normal leading-relaxed"
        >
          A private virtual clubhouse combining Discord voice, 3D WebGL rooms, Notion trip planning, synchronized cinema, and a shared AI memory engine.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="/dashboard"
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-violet-600 to-cyan-500 text-white font-bold text-base shadow-xl shadow-violet-600/30 hover:shadow-violet-600/50 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3"
          >
            Create Free Clubhouse <ArrowRight className="w-5 h-5" />
          </Link>
          <Link
            href="/clubhouse"
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 text-white font-semibold text-base transition-all flex items-center justify-center gap-3"
          >
            <Play className="w-5 h-5 text-cyan-400 fill-cyan-400" /> Explore 3D Demo
          </Link>
        </motion.div>

        {/* Hero Interactive App Mockup Frame */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 rounded-3xl border border-white/15 bg-white/[0.02] backdrop-blur-2xl p-4 shadow-2xl shadow-violet-900/40 relative overflow-hidden"
        >
          <div className="flex items-center justify-between px-4 py-2 border-b border-white/10 bg-white/5 rounded-t-2xl text-xs text-white/40">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500/80" />
              <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
            </div>
            <span className="font-mono text-white/60">hangout.app/clubhouse/alumni-reunion</span>
            <span className="flex items-center gap-1.5 text-emerald-400 font-mono text-[11px]">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" /> 8 Friends Online
            </span>
          </div>

          <div className="relative aspect-[16/9] w-full rounded-b-2xl overflow-hidden bg-[#0A0E1A] flex items-center justify-center border border-white/5">
            <div className="absolute inset-0 bg-gradient-to-tr from-violet-950/40 via-transparent to-cyan-950/40" />
            
            {/* Mock Clubhouse Preview Grid */}
            <div className="grid grid-cols-3 gap-6 p-8 w-full max-w-4xl relative z-10 text-left">
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md hover:border-violet-500/50 transition-all">
                <div className="w-10 h-10 rounded-xl bg-violet-500/20 text-violet-400 flex items-center justify-center mb-3">
                  <Film className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-white text-base">Cinema Room</h3>
                <p className="text-xs text-white/50 mt-1">Watching Interstellar 4K with spatial audio overlay.</p>
                <div className="mt-4 flex -space-x-2">
                  <span className="w-7 h-7 rounded-full border border-violet-500 bg-violet-600 text-[10px] flex items-center justify-center font-bold">AR</span>
                  <span className="w-7 h-7 rounded-full border border-cyan-500 bg-cyan-600 text-[10px] flex items-center justify-center font-bold">PS</span>
                  <span className="w-7 h-7 rounded-full border border-purple-500 bg-purple-600 text-[10px] flex items-center justify-center font-bold">DK</span>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md hover:border-cyan-500/50 transition-all">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center mb-3">
                  <Calendar className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-white text-base">Goa Trip Planner</h3>
                <p className="text-xs text-white/50 mt-1">₹42,500 split between 6 members. 4 days left!</p>
                <div className="mt-4 text-xs font-mono text-cyan-300 bg-cyan-500/10 px-3 py-1.5 rounded-lg border border-cyan-500/20">
                  Splitwise Synced ✓
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md hover:border-purple-500/50 transition-all">
                <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center mb-3">
                  <Bot className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-white text-base">AI Memory Graph</h3>
                <p className="text-xs text-white/50 mt-1">“Show all beach photos from Summer 2023”</p>
                <div className="mt-4 text-xs font-mono text-purple-300 bg-purple-500/10 px-3 py-1.5 rounded-lg border border-purple-500/20">
                  Gemini Flash 2.5 Active
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Stats Counter */}
      <section className="border-y border-white/10 bg-white/[0.01] py-12">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((s) => (
            <div key={s.label}>
              <div className="text-3xl md:text-4xl font-extrabold text-white bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
                {s.val}
              </div>
              <div className="text-xs text-white/50 uppercase tracking-wider mt-1 font-medium">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Feature Pillars Grid */}
      <section id="features" className="max-w-7xl mx-auto px-6 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold">Built for deep friendship, not vanity metrics.</h2>
          <p className="text-white/60 text-base">No public followers. No algorithmic feeds. Just you and your real inner circle.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featurePillars.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="p-8 rounded-3xl bg-white/[0.02] border border-white/10 hover:border-white/20 transition-all hover:bg-white/[0.04] group"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="p-3 rounded-2xl bg-white/5 border border-white/10 group-hover:scale-110 transition-transform">
                  {f.icon}
                </div>
                <span className="text-[11px] font-mono text-white/40 bg-white/5 px-3 py-1 rounded-full border border-white/10">
                  {f.tag}
                </span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{f.title}</h3>
              <p className="text-white/60 text-sm leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="max-w-7xl mx-auto px-6 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <h2 className="text-3xl font-bold">Loved by friend groups around the world</h2>
          <p className="text-white/50 text-sm">See how Hangout keeps friends connected across time zones.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <div key={t.author} className="p-8 rounded-3xl bg-white/[0.02] border border-white/10 space-y-6">
              <div className="flex items-center gap-1 text-amber-400">
                {[...Array(5)].map((_, idx) => (
                  <Star key={idx} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <p className="text-white/80 text-sm leading-relaxed italic">“{t.quote}”</p>
              <div className="flex items-center gap-3 pt-2">
                <img src={t.avatar} alt={t.author} className="w-10 h-10 rounded-full object-cover border border-white/20" />
                <div>
                  <h4 className="text-sm font-bold text-white">{t.author}</h4>
                  <p className="text-xs text-white/40">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action Card */}
      <section className="max-w-5xl mx-auto px-6">
        <div className="relative rounded-3xl border border-white/15 bg-gradient-to-r from-violet-900/40 via-purple-900/30 to-cyan-900/40 p-12 text-center overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/20 rounded-full blur-[100px] pointer-events-none" />
          <h2 className="text-3xl md:text-5xl font-extrabold text-white">Ready to bring your group back together?</h2>
          <p className="mt-4 text-white/70 max-w-xl mx-auto text-base">
            Free forever for up to 15 friends per group. Set up your 3D digital clubhouse in under 60 seconds.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Link
              href="/signup"
              className="px-8 py-4 rounded-2xl bg-white text-black font-bold text-base hover:bg-white/90 shadow-xl transition-all"
            >
              Get Started for Free
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
