"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Sparkles } from "lucide-react";
import { useState } from "react";

export default function MagicLinkPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="glass-card p-8 w-full"
    >
      <div className="flex flex-col items-center mb-8">
        <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-4 backdrop-blur-md border border-white/20">
          <Sparkles className="w-6 h-6 text-yellow-400" />
        </div>
        <h1 className="text-3xl font-heading font-semibold text-white mb-2 text-gradient">Magic Link</h1>
        <p className="text-white/60 text-sm text-center">Sign in instantly without a password</p>
      </div>

      {!sent ? (
        <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
          <div className="space-y-1">
            <label className="text-xs text-white/60 ml-1">Email</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-yellow-500/50 focus:ring-1 focus:ring-yellow-500/50 transition-all placeholder:text-white/30"
              placeholder="name@example.com"
              required
            />
          </div>
          <button type="submit" className="w-full py-3 px-4 bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-500 hover:to-orange-500 text-white rounded-lg text-sm font-medium transition-all shadow-[0_0_20px_-5px_rgba(234,179,8,0.5)]">
            Send Magic Link
          </button>
        </form>
      ) : (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center space-y-4">
          <p className="text-sm text-white/80">
            We've sent a magic link to <span className="font-semibold text-white">{email}</span>.
            Check your inbox and click the link to sign in.
          </p>
          <button onClick={() => setSent(false)} className="text-xs text-white/40 hover:text-white/70 transition-colors">
            Try a different email
          </button>
        </motion.div>
      )}

      <div className="mt-8 text-center">
        <Link href="/login" className="text-sm text-white/50 hover:text-white transition-colors">
          Back to login
        </Link>
      </div>
    </motion.div>
  );
}
