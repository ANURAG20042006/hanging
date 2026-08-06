"use client";

import { ShieldCheck, Lock, Eye, Server } from "lucide-react";

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16 space-y-8 text-white/80 text-sm leading-relaxed">
      <div className="space-y-3 border-b border-white/10 pb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-mono border border-emerald-500/20">
          <ShieldCheck className="w-3.5 h-3.5" /> Privacy & Data Protection
        </div>
        <h1 className="text-4xl font-extrabold text-white">Privacy Policy</h1>
        <p className="text-white/50 text-xs">Last updated: August 6, 2026 • Effective Version 2.4</p>
      </div>

      <div className="space-y-6">
        <section className="space-y-2">
          <h2 className="text-xl font-bold text-white">1. Our Fundamental Commitment</h2>
          <p>Hangout is built on a simple premise: your friend group’s memories, conversations, and trip plans belong exclusively to you. We do not show ads, sell user data to brokers, or train public AI models on your private communications.</p>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-bold text-white">2. Information We Collect</h2>
          <p>We collect minimal information necessary to deliver our real-time services:</p>
          <ul className="list-disc pl-5 space-y-1 text-white/70">
            <li><strong>Account Data:</strong> Email address, hashed password, display name, and avatar image.</li>
            <li><strong>Group Content:</strong> Chat messages, uploaded photos, trip itineraries, and expense records stored securely in PostgreSQL and S3/MinIO.</li>
            <li><strong>Device Telemetry:</strong> Anonymized crash logs and app version metrics used solely for bug fixes and system performance monitoring.</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-bold text-white">3. How We Use Gemini AI</h2>
          <p>Our AI Memory Assistant processes your group’s uploaded photos and chat context strictly on demand via encrypted Google Gemini API endpoints. Your data is never retained by third-party model providers for training.</p>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-bold text-white">4. Data Deletion & Export</h2>
          <p>You can export your complete group history, time capsules, and high-resolution photo archives at any time. Account deletion immediately purges your personal records from our active databases.</p>
        </section>
      </div>
    </div>
  );
}
