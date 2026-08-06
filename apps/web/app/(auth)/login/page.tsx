'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { Eye, EyeOff, Loader2, ArrowRight, Mail, Sparkles } from 'lucide-react'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 } as const,
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring' as const, stiffness: 300, damping: 24 } },
}

const orbs = [
  { cx: '20%', cy: '30%', r: '300px', color: 'rgba(124, 58, 237, 0.15)' },
  { cx: '80%', cy: '70%', r: '250px', color: 'rgba(6, 182, 212, 0.10)' },
  { cx: '60%', cy: '10%', r: '200px', color: 'rgba(244, 63, 94, 0.08)' },
]

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isGoogleLoading, setIsGoogleLoading] = useState(false)
  const [activeTab, setActiveTab] = useState<'email' | 'magic'>('email')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // Auth logic would go here
    await new Promise((r) => setTimeout(r, 1500))
    setIsLoading(false)
  }

  const handleGoogle = async () => {
    setIsGoogleLoading(true)
    await new Promise((r) => setTimeout(r, 1000))
    setIsGoogleLoading(false)
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full"
    >
      {/* Logo + Branding */}
      <motion.div variants={itemVariants} className="text-center mb-8">
        <div className="inline-flex items-center justify-center mb-4">
          <div className="relative">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center shadow-glow">
              <span className="text-2xl">🏠</span>
            </div>
            <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-gradient-to-br from-teal-400 to-cyan-400 flex items-center justify-center shadow-glow-teal">
              <Sparkles className="w-2.5 h-2.5 text-white" />
            </div>
          </div>
        </div>
        <h1 className="text-3xl font-heading font-semibold text-white mb-1">
          Welcome back
        </h1>
        <p className="text-white/50 text-sm">
          Your friends are waiting for you 💙
        </p>
      </motion.div>

      {/* Glass Card */}
      <motion.div variants={itemVariants} className="glass-card p-8 space-y-6">
        {/* Google OAuth */}
        <motion.button
          whileHover={{ scale: 1.01, y: -1 }}
          whileTap={{ scale: 0.99 }}
          onClick={handleGoogle}
          disabled={isGoogleLoading}
          className="w-full py-3 px-4 bg-white/[0.07] hover:bg-white/[0.11] border border-white/[0.12] hover:border-white/20 rounded-xl flex items-center justify-center gap-3 transition-all duration-200 group disabled:opacity-50 disabled:cursor-not-allowed"
          id="google-login-btn"
        >
          {isGoogleLoading ? (
            <Loader2 className="w-5 h-5 animate-spin text-white/60" />
          ) : (
            <>
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              <span className="text-sm font-medium text-white/80 group-hover:text-white transition-colors">
                Continue with Google
              </span>
              <ArrowRight className="w-4 h-4 text-white/30 group-hover:text-white/60 group-hover:translate-x-0.5 transition-all ml-auto" />
            </>
          )}
        </motion.button>

        {/* Divider */}
        <div className="relative flex items-center">
          <div className="flex-grow border-t border-white/[0.08]" />
          <span className="flex-shrink-0 mx-4 text-white/30 text-xs tracking-widest uppercase">
            or
          </span>
          <div className="flex-grow border-t border-white/[0.08]" />
        </div>

        {/* Tab Switcher: Email vs Magic Link */}
        <div className="flex bg-black/20 rounded-xl p-1 gap-1">
          {(['email', 'magic'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-medium transition-all duration-200 ${
                activeTab === tab
                  ? 'bg-violet-600/40 text-violet-300 border border-violet-500/30 shadow-glow-sm'
                  : 'text-white/40 hover:text-white/70'
              }`}
            >
              {tab === 'email' ? (
                <>
                  <Mail className="w-3.5 h-3.5" />
                  Email &amp; Password
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5" />
                  Magic Link
                </>
              )}
            </button>
          ))}
        </div>

        {/* Form */}
        <AnimatePresence mode="wait">
          {activeTab === 'email' ? (
            <motion.form
              key="email"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.2 }}
              onSubmit={handleSubmit}
              className="space-y-4"
            >
              {/* Email field */}
              <div className="space-y-1.5">
                <label className="text-xs text-white/50 font-medium ml-1">
                  Email address
                </label>
                <div className="relative">
                  <input
                    id="email-input"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full bg-black/20 border border-white/[0.10] hover:border-white/20 focus:border-violet-500/60 focus:bg-violet-500/5 rounded-xl px-4 py-3 text-sm text-white outline-none transition-all duration-200 placeholder:text-white/25"
                    placeholder="alice@example.com"
                    autoComplete="email"
                  />
                </div>
              </div>

              {/* Password field */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between ml-1">
                  <label className="text-xs text-white/50 font-medium">Password</label>
                  <Link
                    href="/magic-link"
                    className="text-xs text-violet-400/80 hover:text-violet-300 transition-colors"
                  >
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <input
                    id="password-input"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full bg-black/20 border border-white/[0.10] hover:border-white/20 focus:border-violet-500/60 focus:bg-violet-500/5 rounded-xl px-4 py-3 pr-11 text-sm text-white outline-none transition-all duration-200 placeholder:text-white/25"
                    placeholder="••••••••••"
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
                    tabIndex={-1}
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Submit */}
              <motion.button
                whileHover={{ scale: 1.01, y: -1 }}
                whileTap={{ scale: 0.99 }}
                type="submit"
                disabled={isLoading || !email || !password}
                id="login-submit-btn"
                className="w-full py-3 px-4 bg-gradient-to-r from-violet-600 to-violet-500 hover:from-violet-500 hover:to-violet-400 disabled:from-violet-800 disabled:to-violet-700 disabled:opacity-50 text-white rounded-xl text-sm font-semibold transition-all duration-200 shadow-[0_4px_20px_rgba(124,58,237,0.4)] hover:shadow-[0_4px_30px_rgba(124,58,237,0.6)] disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  <>
                    Sign in
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </motion.button>
            </motion.form>
          ) : (
            <motion.div
              key="magic"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
              className="space-y-4"
            >
              <p className="text-xs text-white/50 text-center">
                We'll send a magic link to your email — no password needed ✨
              </p>
              <div className="space-y-1.5">
                <label className="text-xs text-white/50 font-medium ml-1">
                  Email address
                </label>
                <input
                  id="magic-email-input"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-black/20 border border-white/[0.10] hover:border-white/20 focus:border-teal-500/60 focus:bg-teal-500/5 rounded-xl px-4 py-3 text-sm text-white outline-none transition-all duration-200 placeholder:text-white/25"
                  placeholder="alice@example.com"
                />
              </div>
              <motion.button
                whileHover={{ scale: 1.01, y: -1 }}
                whileTap={{ scale: 0.99 }}
                disabled={!email}
                id="magic-link-btn"
                className="w-full py-3 px-4 bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-500 hover:to-cyan-500 disabled:opacity-50 text-white rounded-xl text-sm font-semibold transition-all duration-200 shadow-glow-teal flex items-center justify-center gap-2 disabled:cursor-not-allowed"
              >
                <Mail className="w-4 h-4" />
                Send Magic Link
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Footer */}
      <motion.p variants={itemVariants} className="mt-6 text-center text-xs text-white/40">
        New to Hangout?{' '}
        <Link
          href="/signup"
          className="text-violet-400 hover:text-violet-300 font-medium transition-colors"
        >
          Create your account
        </Link>
      </motion.p>

      <motion.p variants={itemVariants} className="mt-3 text-center text-[10px] text-white/25 leading-relaxed">
        By signing in, you agree to our{' '}
        <span className="text-white/40 hover:text-white/60 cursor-pointer transition-colors">
          Terms of Service
        </span>{' '}
        and{' '}
        <span className="text-white/40 hover:text-white/60 cursor-pointer transition-colors">
          Privacy Policy
        </span>
      </motion.p>
    </motion.div>
  )
}
