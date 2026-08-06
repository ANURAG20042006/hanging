'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Home, Compass, ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen w-full bg-[#0A0E1A] text-white flex flex-col items-center justify-center relative overflow-hidden p-6">
      {/* Background Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-600/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-600/20 rounded-full blur-[120px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full glass p-8 rounded-3xl border border-white/10 text-center relative z-10 shadow-2xl space-y-6"
      >
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-violet-600 to-cyan-500 flex items-center justify-center mx-auto shadow-glow-primary">
          <Compass size={32} className="text-white animate-spin-slow" />
        </div>

        <div>
          <h1 className="text-6xl font-bold font-heading text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-cyan-400 to-indigo-400 mb-2">
            404
          </h1>
          <h2 className="text-xl font-bold text-white mb-2">Lost in Cyberspace?</h2>
          <p className="text-xs text-white/60 leading-relaxed">
            The page you are looking for does not exist or has been moved to another Hangout channel.
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/dashboard"
            className="px-5 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-semibold shadow-glow-primary transition-all flex items-center justify-center gap-2"
          >
            <Home size={16} />
            <span>Return to Dashboard</span>
          </Link>
          <button
            onClick={() => window.history.back()}
            className="px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white text-xs font-semibold transition-all flex items-center justify-center gap-2 border border-white/10"
          >
            <ArrowLeft size={16} />
            <span>Go Back</span>
          </button>
        </div>
      </motion.div>
    </div>
  )
}
