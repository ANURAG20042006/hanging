'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, X, Hash, Image as ImageIcon, Calendar, User } from 'lucide-react'
import { useUIStore } from '@/store/ui.store'

export function SearchModal() {
  const { isSearchOpen, setSearchOpen } = useUIStore()
  const [query, setQuery] = useState('')

  const mockResults = [
    { type: 'channel', title: '#general', category: 'Channels', icon: Hash },
    { type: 'photo', title: 'Beach Vacation 2026.jpg', category: 'Gallery', icon: ImageIcon },
    { type: 'event', title: 'Movie Night (Inception)', category: 'Events', icon: Calendar },
    { type: 'user', title: 'Sarah Jenkins (@sarah)', category: 'Members', icon: User },
  ].filter((item) => !query || item.title.toLowerCase().includes(query.toLowerCase()))

  return (
    <AnimatePresence>
      {isSearchOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-black/75 backdrop-blur-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            className="w-full max-w-xl rounded-2xl bg-[#0D1222] border border-white/10 shadow-2xl overflow-hidden relative"
          >
            {/* Search Input Bar */}
            <div className="flex items-center px-4 py-3.5 border-b border-white/5">
              <Search size={20} className="text-white/40 mr-3" />
              <input
                type="text"
                placeholder="Search messages, photos, events, or members..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full bg-transparent text-white placeholder-white/40 text-sm focus:outline-none"
                autoFocus
              />
              <button
                type="button"
                onClick={() => setSearchOpen(false)}
                className="w-7 h-7 rounded-lg hover:bg-white/10 flex items-center justify-center text-white/50 hover:text-white transition-colors cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            {/* Results list */}
            <div className="max-h-80 overflow-y-auto p-2">
              {mockResults.length === 0 ? (
                <div className="p-8 text-center text-white/40 text-xs">
                  No results found for &quot;{query}&quot;
                </div>
              ) : (
                <div className="space-y-1">
                  {mockResults.map((item, index) => (
                    <div
                      key={index}
                      onClick={() => setSearchOpen(false)}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/5 cursor-pointer text-white/80 hover:text-white transition-colors group"
                    >
                      <div className="w-8 h-8 rounded-lg bg-white/5 group-hover:bg-violet-600/20 text-white/50 group-hover:text-violet-400 flex items-center justify-center transition-colors">
                        <item.icon size={16} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="text-sm font-medium block truncate">{item.title}</span>
                        <span className="text-[10px] text-white/40 uppercase tracking-wider">{item.category}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="px-4 py-2 bg-black/40 border-t border-white/5 flex items-center justify-between text-[11px] text-white/30">
              <span>Press ESC to exit</span>
              <span>Global Hangout Search</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
