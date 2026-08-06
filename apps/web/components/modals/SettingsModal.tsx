'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X, User, Shield, Bell, Palette, LogOut, Check } from 'lucide-react'
import { useUIStore } from '@/store/ui.store'
import { useAuthStore } from '@/store/auth.store'
import toast from 'react-hot-toast'

export function SettingsModal() {
  const { isSettingsOpen, setSettingsOpen, activeSettingsTab } = useUIStore()
  const { user, signOut } = useAuthStore()

  const tabs = [
    { id: 'profile', label: 'My Profile', icon: User },
    { id: 'security', label: 'Security & 2FA', icon: Shield },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'appearance', label: 'Appearance', icon: Palette },
  ]

  const handleLogout = () => {
    signOut()
    setSettingsOpen(false)
    toast.success('Logged out successfully')
  }

  return (
    <AnimatePresence>
      {isSettingsOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            className="w-full max-w-3xl h-[560px] rounded-2xl bg-[#0D1222] border border-white/10 shadow-2xl flex overflow-hidden relative"
          >
            {/* Close button */}
            <button
              type="button"
              onClick={() => setSettingsOpen(false)}
              className="absolute top-4 right-4 z-10 w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/50 hover:text-white transition-colors cursor-pointer"
            >
              <X size={18} />
            </button>

            {/* Left Tab Sidebar */}
            <div className="w-56 bg-black/30 border-r border-white/5 p-4 flex flex-col justify-between">
              <div>
                <h2 className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-4 px-3">
                  User Settings
                </h2>
                <div className="space-y-1">
                  {tabs.map((tab) => {
                    const isActive = activeSettingsTab === tab.id
                    return (
                      <button
                        key={tab.id}
                        type="button"
                        onClick={() => setSettingsOpen(true, tab.id)}
                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                          isActive
                            ? 'bg-violet-600/20 text-violet-400 border border-violet-500/30'
                            : 'text-white/60 hover:bg-white/5 hover:text-white'
                        }`}
                      >
                        <tab.icon size={16} />
                        <span>{tab.label}</span>
                      </button>
                    )
                  })}
                </div>
              </div>

              <button
                type="button"
                onClick={handleLogout}
                className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-semibold text-rose-400 hover:bg-rose-500/10 transition-colors w-full cursor-pointer"
              >
                <LogOut size={16} />
                <span>Log Out</span>
              </button>
            </div>

            {/* Tab Content Panel */}
            <div className="flex-1 p-6 overflow-y-auto">
              {activeSettingsTab === 'profile' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-bold text-white mb-1">Profile Overview</h3>
                    <p className="text-xs text-white/50">Manage your avatar, display name, and bio</p>
                  </div>

                  <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5">
                    <img
                      src={user?.avatarUrl || 'https://i.pravatar.cc/150?u=a042581f4e29026704d'}
                      className="w-16 h-16 rounded-full border-2 border-violet-500/50 object-cover"
                      alt="Avatar"
                    />
                    <div>
                      <h4 className="font-bold text-white text-sm">{user?.displayName || 'Alice Smith'}</h4>
                      <p className="text-xs text-white/40">@{user?.username || 'alice'}</p>
                      <button
                        type="button"
                        onClick={() => toast.success('Avatar updated!')}
                        className="mt-2 text-xs text-violet-400 hover:text-violet-300 font-semibold cursor-pointer"
                      >
                        Change Avatar
                      </button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-white/70 uppercase mb-1">Display Name</label>
                      <input
                        type="text"
                        defaultValue={user?.displayName || 'Alice Smith'}
                        className="w-full px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-violet-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-white/70 uppercase mb-1">Status Message</label>
                      <input
                        type="text"
                        defaultValue="Chilling in the Lounge 🎧"
                        className="w-full px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-violet-500"
                      />
                    </div>
                  </div>
                </div>
              )}

              {activeSettingsTab === 'security' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-bold text-white mb-1">Security & 2FA</h3>
                    <p className="text-xs text-white/50">Protect your account with Two-Factor Authentication</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-semibold text-white">Authenticator App (2FA)</h4>
                      <p className="text-xs text-white/40">Use Google Authenticator or 1Password</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => toast.success('2FA configured!')}
                      className="px-3 py-1.5 rounded-lg bg-violet-600 text-white text-xs font-semibold hover:bg-violet-500 transition-colors cursor-pointer"
                    >
                      Enable 2FA
                    </button>
                  </div>
                </div>
              )}

              {activeSettingsTab === 'notifications' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-bold text-white mb-1">Notification Preferences</h3>
                    <p className="text-xs text-white/50">Customize alerts for chat messages and events</p>
                  </div>
                  <div className="space-y-3">
                    {['Direct Message Alerts', 'Group Mentions', 'Event Reminders', 'Voice Room Invites'].map((item) => (
                      <div key={item} className="flex items-center justify-between p-3 rounded-xl bg-white/5">
                        <span className="text-xs text-white font-medium">{item}</span>
                        <div className="w-4 h-4 rounded bg-violet-600 flex items-center justify-center text-white">
                          <Check size={12} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeSettingsTab === 'appearance' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-bold text-white mb-1">Appearance Settings</h3>
                    <p className="text-xs text-white/50">Hangout is designed in Dark Mode with Aurora accents</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-violet-600/10 border border-violet-500/30">
                    <span className="text-xs font-semibold text-violet-300">Active Theme: Deep Navy & Electric Violet</span>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
