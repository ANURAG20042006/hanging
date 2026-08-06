"use client";

import { Cookie } from "lucide-react";

export default function CookiePolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16 space-y-8 text-white/80 text-sm leading-relaxed">
      <div className="space-y-3 border-b border-white/10 pb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 text-xs font-mono border border-purple-500/20">
          <Cookie className="w-3.5 h-3.5" /> Cookie Policy
        </div>
        <h1 className="text-4xl font-extrabold text-white">Cookie Policy</h1>
        <p className="text-white/50 text-xs">Last updated: August 6, 2026</p>
      </div>

      <div className="space-y-6">
        <p>Hangout uses strictly necessary cookies and local storage tokens to maintain user authentication state and UI preferences (such as dark mode theme and audio mute settings).</p>

        <section className="space-y-2">
          <h2 className="text-xl font-bold text-white">Essential Cookies Only</h2>
          <ul className="list-disc pl-5 space-y-1 text-white/70">
            <li><strong>Authentication Token:</strong> Secure HttpOnly JWT session cookie.</li>
            <li><strong>UI Store Preferences:</strong> Local storage for active group & dark mode theme tokens.</li>
            <li><strong>No Third-Party Tracker Cookies:</strong> We do not use Google Analytics or Facebook Pixel advertising cookies.</li>
          </ul>
        </section>
      </div>
    </div>
  );
}
