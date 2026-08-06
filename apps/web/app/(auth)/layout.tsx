'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

// Floating orb positions
const orbs = [
  { x: '-10%', y: '-15%', size: '55%', color: 'from-violet-600/25 to-violet-900/0', delay: 0 },
  { x: '65%', y: '60%', size: '50%', color: 'from-cyan-500/15 to-teal-900/0', delay: 2 },
  { x: '40%', y: '-20%', size: '35%', color: 'from-indigo-600/15 to-indigo-900/0', delay: 4 },
  { x: '-5%', y: '60%', size: '30%', color: 'from-fuchsia-600/10 to-fuchsia-900/0', delay: 1.5 },
]

// Floating particles
const particles = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 3 + 1,
  duration: Math.random() * 8 + 6,
  delay: Math.random() * 4,
  opacity: Math.random() * 0.3 + 0.05,
}))

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center relative overflow-hidden bg-[#0A0E1A]">

      {/* Aurora orbs */}
      {orbs.map((orb, i) => (
        <motion.div
          key={i}
          className={`absolute rounded-full bg-gradient-radial ${orb.color} blur-3xl pointer-events-none`}
          style={{
            left: orb.x,
            top: orb.y,
            width: orb.size,
            paddingBottom: orb.size,
          }}
          animate={{
            scale: [1, 1.08, 1],
            opacity: [0.6, 1, 0.6],
          }}
          transition={{
            duration: 8 + orb.delay,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: orb.delay,
          }}
        />
      ))}

      {/* Floating particles */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-white pointer-events-none"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            opacity: p.opacity,
          }}
          animate={{
            y: [-10, 10, -10],
            opacity: [p.opacity, p.opacity * 2, p.opacity],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: p.delay,
          }}
        />
      ))}

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Top nav */}
      <nav className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center shadow-glow group-hover:shadow-glow-lg transition-all">
            <span className="text-sm font-bold text-white">H</span>
          </div>
          <span className="font-heading font-semibold text-white text-sm hidden sm:block">
            Hangout
          </span>
        </Link>
        <div className="flex items-center gap-3">
          <span className="text-xs text-white/40 hidden sm:block">
            {"Need help? "}
          </span>
          <a
            href="mailto:support@hangout.app"
            className="text-xs text-violet-400 hover:text-violet-300 transition-colors"
          >
            Support
          </a>
        </div>
      </nav>

      {/* Content */}
      <div className="z-10 w-full max-w-md px-4 sm:px-6 py-20">
        {children}
      </div>

      {/* Footer */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center z-10">
        <p className="text-[10px] text-white/20">
          © 2025 Hangout. Made with 💜 for friends.
        </p>
      </div>
    </div>
  )
}
