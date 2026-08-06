"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { UserPlus } from "lucide-react";

export default function SignupPage() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="glass-card p-8 w-full"
    >
      <div className="flex flex-col items-center mb-8">
        <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-4 backdrop-blur-md border border-white/20">
          <UserPlus className="w-6 h-6 text-cyan-400" />
        </div>
        <h1 className="text-3xl font-heading font-semibold text-white mb-2 text-gradient">Create Account</h1>
        <p className="text-white/60 text-sm text-center">Join your friends on Hangout</p>
      </div>

      <div className="space-y-4">
        {step === 1 && (
          <motion.form 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4" 
            onSubmit={(e) => { e.preventDefault(); setStep(2); }}
          >
            <div className="space-y-1">
              <label className="text-xs text-white/60 ml-1">Email</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all placeholder:text-white/30"
                placeholder="name@example.com"
                required
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs text-white/60 ml-1">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all placeholder:text-white/30"
                placeholder="Create a strong password"
                required
              />
            </div>
            <button type="submit" className="w-full py-3 px-4 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white rounded-lg text-sm font-medium transition-all shadow-[0_0_20px_-5px_rgba(6,182,212,0.5)]">
              Continue
            </button>
          </motion.form>
        )}

        {step === 2 && (
          <motion.form 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="flex justify-center mb-4">
              <div className="w-20 h-20 rounded-full bg-white/5 border border-white/10 flex items-center justify-center cursor-pointer hover:bg-white/10 transition-colors">
                <span className="text-xs text-white/40">Upload</span>
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-xs text-white/60 ml-1">Display Name</label>
              <input 
                type="text" 
                className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all"
                placeholder="How should we call you?"
                required
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs text-white/60 ml-1">Username</label>
              <input 
                type="text" 
                className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all"
                placeholder="@username"
                required
              />
            </div>
            <div className="flex gap-3">
              <button type="button" onClick={() => setStep(1)} className="py-3 px-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-lg text-sm font-medium transition-all">
                Back
              </button>
              <button type="submit" className="flex-1 py-3 px-4 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white rounded-lg text-sm font-medium transition-all shadow-[0_0_20px_-5px_rgba(6,182,212,0.5)]">
                Create Account
              </button>
            </div>
          </motion.form>
        )}
      </div>

      <p className="mt-6 text-center text-xs text-white/50">
        Already have an account?{" "}
        <Link href="/login" className="text-violet-400 hover:text-violet-300 transition-colors">
          Sign in
        </Link>
      </p>
    </motion.div>
  );
}
