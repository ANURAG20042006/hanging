"use client";

import { ShieldAlert, Heart, Users } from "lucide-react";

export default function GuidelinesPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16 space-y-8 text-white/80 text-sm leading-relaxed">
      <div className="space-y-3 border-b border-white/10 pb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/10 text-pink-400 text-xs font-mono border border-pink-500/20">
          <Heart className="w-3.5 h-3.5" /> Community Code
        </div>
        <h1 className="text-4xl font-extrabold text-white">Community Guidelines</h1>
        <p className="text-white/50 text-xs">Keeping Hangout safe, respectful, and joyful for every friend group.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 space-y-3">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Users className="w-5 h-5 text-cyan-400" /> Respect Your Friends
          </h2>
          <p className="text-white/60 text-xs leading-relaxed">Treat your group members with care. No harassment, hate speech, or unwanted non-consensual content sharing.</p>
        </div>

        <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 space-y-3">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-amber-400" /> Zero Tolerance Spam
          </h2>
          <p className="text-white/60 text-xs leading-relaxed">Invite links must not be spammed in public forums. Automated bot spam accounts are permanently banned.</p>
        </div>
      </div>
    </div>
  );
}
