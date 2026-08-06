'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Copy, Check, UserPlus, Share2, Sparkles } from 'lucide-react'
import { useUIStore } from '@/store/ui.store'
import toast from 'react-hot-toast'

export function InviteModal() {
  const { isInviteModalOpen, setInviteModal } = useUIStore()
  const [copied, setCopied] = useState(false)
  const inviteCode = 'hangout.app/join/squad-2026-x8z'

  const handleCopy = () => {
    navigator.clipboard.writeText(`https://${inviteCode}`)
    setCopied(true)
    toast.success('Invite link copied to clipboard!')
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <AnimatePresence>
      {isInviteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            className="w-full max-w-md rounded-2xl bg-[#0D1222] border border-white/10 p-6 shadow-2xl relative overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-cyan-600/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                  <UserPlus size={20} />
                </div>
                <div>
                  <h2 className="text-xl font-bold font-heading text-white">Invite Friends</h2>
                  <p className="text-xs text-white/50">Share this invite link with your squad</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setInviteModal(false)}
                className="w-8 h-8 rounded-lg hover:bg-white/10 flex items-center justify-center text-white/50 hover:text-white transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Link box */}
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-white/70 uppercase tracking-wider mb-2">
                  Invite Link (Never Expires)
                </label>
                <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl p-2 pl-3">
                  <span className="text-xs text-white/80 font-mono truncate flex-1">{inviteCode}</span>
                  <button
                    type="button"
                    onClick={handleCopy}
                    className="px-3 py-1.5 rounded-lg bg-violet-600 hover:bg-violet-500 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-glow-primary cursor-pointer"
                  >
                    {copied ? <Check size={14} /> : <Copy size={14} />}
                    <span>{copied ? 'Copied!' : 'Copy'}</span>
                  </button>
                </div>
              </div>

              {/* Quick Share Buttons */}
              <div className="pt-2">
                <label className="block text-xs font-semibold text-white/50 uppercase tracking-wider mb-2">
                  Quick Share
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={handleCopy}
                    className="px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 text-xs text-white/80 font-medium flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    <Share2 size={14} className="text-cyan-400" />
                    <span>Share via App</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleCopy}
                    className="px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 text-xs text-white/80 font-medium flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    <Sparkles size={14} className="text-violet-400" />
                    <span>Copy Code Only</span>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
