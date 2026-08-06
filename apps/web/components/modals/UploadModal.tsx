'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, UploadCloud, Image as ImageIcon, Sparkles } from 'lucide-react'
import { useUIStore } from '@/store/ui.store'
import toast from 'react-hot-toast'

export function UploadModal() {
  const { isUploadModalOpen, setUploadModal } = useUIStore()
  const [caption, setCaption] = useState('')
  const [isUploading, setIsUploading] = useState(false)

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault()
    setIsUploading(true)
    setTimeout(() => {
      setIsUploading(false)
      toast.success('Memory uploaded to gallery! 📸')
      setUploadModal(false)
      setCaption('')
    }, 800)
  }

  return (
    <AnimatePresence>
      {isUploadModalOpen && (
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
                <div className="w-10 h-10 rounded-xl bg-violet-600/20 border border-violet-500/30 flex items-center justify-center text-violet-400">
                  <ImageIcon size={20} />
                </div>
                <div>
                  <h2 className="text-xl font-bold font-heading text-white">Upload Memory</h2>
                  <p className="text-xs text-white/50">Add a photo or video to your squad album</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setUploadModal(false)}
                className="w-8 h-8 rounded-lg hover:bg-white/10 flex items-center justify-center text-white/50 hover:text-white transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleUpload} className="space-y-4">
              {/* Dropzone */}
              <div className="border-2 border-dashed border-white/15 hover:border-violet-500/50 rounded-2xl p-8 flex flex-col items-center justify-center cursor-pointer bg-white/5 hover:bg-violet-500/5 transition-all text-center group">
                <div className="w-12 h-12 rounded-full bg-violet-600/20 text-violet-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <UploadCloud size={24} />
                </div>
                <p className="text-sm font-medium text-white mb-1">Drag and drop photo here</p>
                <p className="text-xs text-white/40">PNG, JPG, MP4 or GIF up to 50MB</p>
              </div>

              {/* Caption */}
              <div>
                <label className="block text-xs font-semibold text-white/70 uppercase tracking-wider mb-1.5">
                  Caption
                </label>
                <input
                  type="text"
                  placeholder="e.g. Summer beach trip 2026 🏖️"
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-violet-500 transition-all"
                />
              </div>

              {/* Submit */}
              <div className="flex justify-end gap-3 pt-4 border-t border-white/5">
                <button
                  type="button"
                  onClick={() => setUploadModal(false)}
                  className="px-4 py-2 rounded-xl text-sm font-medium text-white/70 hover:bg-white/5 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isUploading}
                  className="px-5 py-2 rounded-xl text-sm font-semibold bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 text-white shadow-glow-primary transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Sparkles size={16} />
                  <span>{isUploading ? 'Uploading...' : 'Save Memory'}</span>
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
