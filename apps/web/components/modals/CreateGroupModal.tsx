'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Upload, Sparkles, Users } from 'lucide-react'
import { useUIStore } from '@/store/ui.store'
import toast from 'react-hot-toast'

export function CreateGroupModal() {
  const { isCreateGroupModalOpen, setCreateGroupModal } = useUIStore()
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) {
      toast.error('Please enter a group name')
      return
    }
    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      toast.success(`Group "${name}" created successfully! 🎉`)
      setCreateGroupModal(false)
      setName('')
      setDescription('')
    }, 500)
  }

  return (
    <AnimatePresence>
      {isCreateGroupModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            className="w-full max-w-lg rounded-2xl bg-[#0D1222] border border-white/10 p-6 shadow-2xl relative overflow-hidden"
          >
            {/* Top glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-1 bg-gradient-to-r from-violet-500 via-cyan-400 to-indigo-500 rounded-full blur-xs" />

            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-violet-600/20 border border-violet-500/30 flex items-center justify-center text-violet-400">
                  <Users size={20} />
                </div>
                <div>
                  <h2 className="text-xl font-bold font-heading text-white">Create a New Hangout</h2>
                  <p className="text-xs text-white/50">Give your squad a private digital home</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setCreateGroupModal(false)}
                className="w-8 h-8 rounded-lg hover:bg-white/10 flex items-center justify-center text-white/50 hover:text-white transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Group Icon Upload */}
              <div className="flex justify-center my-2">
                <div className="relative group cursor-pointer">
                  <div className="w-20 h-20 rounded-2xl bg-white/5 border-2 border-dashed border-white/20 flex flex-col items-center justify-center text-white/40 group-hover:border-violet-500 group-hover:text-violet-400 transition-all">
                    <Upload size={24} className="mb-1" />
                    <span className="text-[10px] font-semibold">UPLOAD</span>
                  </div>
                </div>
              </div>

              {/* Name Input */}
              <div>
                <label className="block text-xs font-semibold text-white/70 uppercase tracking-wider mb-1.5">
                  Group Name <span className="text-violet-400">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. The Late Night Squad 🌙"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all"
                  autoFocus
                />
              </div>

              {/* Description Input */}
              <div>
                <label className="block text-xs font-semibold text-white/70 uppercase tracking-wider mb-1.5">
                  Description (Optional)
                </label>
                <textarea
                  rows={3}
                  placeholder="What's this group about? Memories, gaming, movie nights..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all resize-none"
                />
              </div>

              {/* Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/5">
                <button
                  type="button"
                  onClick={() => setCreateGroupModal(false)}
                  className="px-4 py-2 rounded-xl text-sm font-medium text-white/70 hover:bg-white/5 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2 rounded-xl text-sm font-semibold bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white shadow-glow-primary transition-all flex items-center gap-2 cursor-pointer"
                >
                  {isSubmitting ? (
                    <span>Creating...</span>
                  ) : (
                    <>
                      <Sparkles size={16} />
                      <span>Create Hangout</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
