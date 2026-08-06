'use client'

import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { AlertTriangle, RefreshCw, Home } from 'lucide-react'
import Link from 'next/link'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('App Root Error:', error)
  }, [error])

  return (
    <div className="min-h-screen w-full bg-[#0A0E1A] text-white flex flex-col items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-red-600/15 rounded-full blur-[140px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full glass p-8 rounded-3xl border border-white/10 text-center relative z-10 shadow-2xl space-y-6"
      >
        <div className="w-16 h-16 rounded-2xl bg-red-500/20 border border-red-500/30 flex items-center justify-center mx-auto shadow-glow-accent">
          <AlertTriangle size={32} className="text-red-400" />
        </div>

        <div>
          <h2 className="text-2xl font-bold font-heading text-white mb-2">Something Went Wrong</h2>
          <p className="text-xs text-white/60 leading-relaxed">
            {error?.message || 'An unexpected error occurred while rendering the page component.'}
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => reset()}
            className="px-5 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-semibold shadow-glow-primary transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <RefreshCw size={16} />
            <span>Try Again</span>
          </button>
          <Link
            href="/dashboard"
            className="px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white text-xs font-semibold transition-all flex items-center justify-center gap-2 border border-white/10"
          >
            <Home size={16} />
            <span>Reload Dashboard</span>
          </Link>
        </div>
      </motion.div>
    </div>
  )
}
