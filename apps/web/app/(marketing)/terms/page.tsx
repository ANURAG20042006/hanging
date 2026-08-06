"use client";

import { FileText } from "lucide-react";

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16 space-y-8 text-white/80 text-sm leading-relaxed">
      <div className="space-y-3 border-b border-white/10 pb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-mono border border-cyan-500/20">
          <FileText className="w-3.5 h-3.5" /> Legal Terms
        </div>
        <h1 className="text-4xl font-extrabold text-white">Terms of Service</h1>
        <p className="text-white/50 text-xs">Last updated: August 6, 2026 • Version 2.4</p>
      </div>

      <div className="space-y-6">
        <section className="space-y-2">
          <h2 className="text-xl font-bold text-white">1. Acceptance of Terms</h2>
          <p>By creating a Hangout account or accessing any 3D clubhouse room, you agree to comply with these Terms of Service and our Community Guidelines.</p>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-bold text-white">2. Acceptable Use</h2>
          <p>Hangout is designed for friendly, legal collaboration. Harassment, unauthorized automated scraping, distribution of malware, or illegal content distribution will result in immediate group suspension.</p>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-bold text-white">3. Service Availability SLA</h2>
          <p>We strive to maintain 99.9% uptime for our core API and voice streaming infrastructure. Scheduled maintenance will be announced 48 hours in advance in the In-App Changelog.</p>
        </section>
      </div>
    </div>
  );
}
