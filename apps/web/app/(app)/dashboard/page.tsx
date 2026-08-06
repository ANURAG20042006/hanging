'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  Sparkles,
  Calendar,
  Gamepad2,
  Image as ImageIcon,
  MessageSquare,
  Clock,
  Mic,
  Users,
  Trophy,
  ChevronRight,
  Cake,
  Music,
  Film,
  Zap,
  Plus,
  TrendingUp,
  Star,
} from 'lucide-react'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.05 } as const,
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring' as const, stiffness: 260, damping: 24 },
  },
}

// ── Mock Data ─────────────────────────────────────────────────
const onlineFriends = [
  { name: 'Alice', status: 'online', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=alice' },
  { name: 'Bob', status: 'online', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=bob' },
  { name: 'Charlie', status: 'idle', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=charlie' },
  { name: 'Diana', status: 'dnd', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=diana' },
  { name: 'Eve', status: 'online', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=eve' },
]

const recentMessages = [
  { author: 'Alice', text: "Let's plan the Goa trip! 🏖️", time: '2m ago', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=alice' },
  { author: 'Bob', text: "I'm in! When are you all free?", time: '5m ago', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=bob' },
  { author: 'Charlie', text: 'Chess anyone? 🎮', time: '12m ago', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=charlie' },
]

const games = [
  { name: 'Chess', emoji: '♟️', players: '1v1', color: 'from-amber-600/20 to-amber-500/10', border: 'border-amber-500/20' },
  { name: 'UNO', emoji: '🃏', players: '2-10', color: 'from-red-600/20 to-red-500/10', border: 'border-red-500/20' },
  { name: 'Pictionary', emoji: '🎨', players: '3-8', color: 'from-emerald-600/20 to-emerald-500/10', border: 'border-emerald-500/20' },
]

const upcomingEvents = [
  { title: 'Movie Night', subtitle: 'Interstellar • Tonight 9PM', icon: '🎬', color: 'bg-violet-500/20 text-violet-300', date: 'Tonight' },
  { title: "Bob's Birthday! 🎂", subtitle: 'In 3 days', icon: '🎂', color: 'bg-rose-500/20 text-rose-300', date: 'Sep 9' },
  { title: 'Goa Trip Planning', subtitle: 'September 15', icon: '✈️', color: 'bg-teal-500/20 text-teal-300', date: 'Sep 15' },
]

const groupStats = [
  { label: 'Days Together', value: '847', icon: Star, color: 'text-amber-400' },
  { label: 'Messages Sent', value: '24.6K', icon: MessageSquare, color: 'text-violet-400' },
  { label: 'Photos Shared', value: '1,204', icon: ImageIcon, color: 'text-pink-400' },
  { label: 'Games Played', value: '183', icon: Gamepad2, color: 'text-teal-400' },
]

const statusColors: Record<string, string> = {
  online: 'bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]',
  idle: 'bg-amber-400',
  dnd: 'bg-rose-500',
  offline: 'bg-gray-500',
}

export default function DashboardPage() {
  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening'
  const greetingEmoji = hour < 12 ? '☀️' : hour < 17 ? '👋' : '🌙'

  return (
    <div className="flex-1 overflow-y-auto">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-6xl mx-auto p-6 lg:p-8 space-y-6"
      >
        {/* ── Hero Greeting ──────────────────────────────────── */}
        <motion.div variants={cardVariants} className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h1 className="text-4xl lg:text-5xl font-heading font-bold text-white mb-2 leading-tight">
              {greeting}, Alice{' '}
              <span className="animate-wave inline-block">{greetingEmoji}</span>
            </h1>
            <p className="text-white/50 text-base">
              4 friends online in{' '}
              <span className="text-violet-400 font-medium">Hostel Squad 🏠</span>
            </p>
          </div>
          <div className="flex items-center gap-2">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-2 px-4 py-2.5 bg-violet-600/20 hover:bg-violet-600/30 border border-violet-500/30 rounded-xl text-sm text-violet-300 font-medium transition-all"
            >
              <Plus className="w-4 h-4" />
              Invite Friends
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-2 px-4 py-2.5 btn-primary text-sm rounded-xl"
            >
              <Zap className="w-4 h-4" />
              Start Hangout
            </motion.button>
          </div>
        </motion.div>

        {/* ── Online Friends ─────────────────────────────────── */}
        <motion.div variants={cardVariants} className="glass-card p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <h2 className="text-sm font-semibold text-white/90">Online Now</h2>
              <span className="text-xs text-white/40">({onlineFriends.filter(f => f.status === 'online').length})</span>
            </div>
            <Link href="/members" className="text-xs text-white/40 hover:text-violet-400 transition-colors flex items-center gap-1">
              See all <ChevronRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="flex gap-5 overflow-x-auto pb-1 scrollbar-hide">
            {onlineFriends.map((friend, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -2 }}
                className="flex flex-col items-center gap-2 group cursor-pointer flex-shrink-0"
              >
                <div className="relative">
                  <div className="w-14 h-14 rounded-full overflow-hidden ring-2 ring-transparent group-hover:ring-violet-500/60 transition-all duration-200 p-0.5">
                    <img
                      src={friend.avatar}
                      alt={friend.name}
                      className="w-full h-full rounded-full object-cover bg-white/10"
                    />
                  </div>
                  <div className={`absolute bottom-0.5 right-0.5 w-3.5 h-3.5 rounded-full border-2 border-[#0F1525] ${statusColors[friend.status]}`} />
                </div>
                <span className="text-xs font-medium text-white/60 group-hover:text-white transition-colors">
                  {friend.name}
                </span>
              </motion.div>
            ))}
            {/* Add friend button */}
            <motion.div
              whileHover={{ y: -2 }}
              className="flex flex-col items-center gap-2 cursor-pointer flex-shrink-0 group"
            >
              <div className="w-14 h-14 rounded-full border-2 border-dashed border-white/10 group-hover:border-violet-500/50 flex items-center justify-center transition-all">
                <Plus className="w-5 h-5 text-white/30 group-hover:text-violet-400 transition-colors" />
              </div>
              <span className="text-xs text-white/30 group-hover:text-white/60 transition-colors">Invite</span>
            </motion.div>
          </div>
        </motion.div>

        {/* ── Main Bento Grid ────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5">

          {/* Memory Highlight — spans 2x2 */}
          <motion.div
            variants={cardVariants}
            className="col-span-1 md:col-span-2 row-span-2 glass-card overflow-hidden relative min-h-[320px] group cursor-pointer card-hover"
          >
            <img
              src="https://images.unsplash.com/photo-1511895426328-dc8714191300?q=80&w=2070"
              alt="Summer Memory"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0E1A] via-[#0A0E1A]/50 to-transparent" />
            <div className="absolute top-4 left-4">
              <div className="glass px-3 py-1.5 rounded-full flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-rose-400" />
                <span className="text-xs font-semibold text-rose-400 uppercase tracking-wider">On This Day</span>
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <div className="flex items-center gap-2 text-white/60 mb-2 text-xs">
                <Clock className="w-3.5 h-3.5" />
                <span>1 year ago • 14 photos</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-1">Summer Trip to Goa 🏖️</h3>
              <p className="text-white/60 text-sm line-clamp-2">
                The night we got stranded at that hilltop and watched the sunrise together...
              </p>
              <div className="flex items-center gap-2 mt-4">
                <div className="flex -space-x-2">
                  {onlineFriends.slice(0, 3).map((f, i) => (
                    <img
                      key={i}
                      src={f.avatar}
                      alt={f.name}
                      className="w-7 h-7 rounded-full border-2 border-[#0A0E1A] bg-white/10"
                    />
                  ))}
                </div>
                <span className="text-xs text-white/50">Alice, Bob and 2 others</span>
              </div>
            </div>
          </motion.div>

          {/* Quick Actions */}
          <motion.div variants={cardVariants} className="col-span-1 glass-card p-5">
            <h2 className="text-sm font-semibold text-white/70 mb-4 uppercase tracking-wider">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-3">
              {[
                { href: '/channels/general', icon: MessageSquare, label: 'Chat', color: 'text-violet-400', bg: 'bg-violet-500/10 hover:bg-violet-500/20 border-violet-500/20' },
                { href: '/arcade', icon: Gamepad2, label: 'Game', color: 'text-teal-400', bg: 'bg-teal-500/10 hover:bg-teal-500/20 border-teal-500/20' },
                { href: '/cinema', icon: Film, label: 'Cinema', color: 'text-rose-400', bg: 'bg-rose-500/10 hover:bg-rose-500/20 border-rose-500/20' },
                { href: '/gallery', icon: ImageIcon, label: 'Photos', color: 'text-pink-400', bg: 'bg-pink-500/10 hover:bg-pink-500/20 border-pink-500/20' },
                { href: '/music', icon: Music, label: 'Music', color: 'text-emerald-400', bg: 'bg-emerald-500/10 hover:bg-emerald-500/20 border-emerald-500/20' },
                { href: '/planning', icon: Calendar, label: 'Plan', color: 'text-amber-400', bg: 'bg-amber-500/10 hover:bg-amber-500/20 border-amber-500/20' },
              ].map((action) => (
                <Link
                  key={action.href}
                  href={action.href}
                  className={`flex flex-col items-center justify-center gap-2 rounded-xl p-3 border transition-all duration-200 group ${action.bg}`}
                >
                  <action.icon className={`w-5 h-5 ${action.color} group-hover:scale-110 transition-transform duration-200`} />
                  <span className="text-xs font-medium text-white/60 group-hover:text-white transition-colors">{action.label}</span>
                </Link>
              ))}
            </div>
          </motion.div>

          {/* Today's Birthday */}
          <motion.div variants={cardVariants} className="col-span-1 glass-card p-5 bg-gradient-to-br from-rose-500/10 to-transparent">
            <div className="flex items-center gap-2 mb-3">
              <Cake className="w-4 h-4 text-rose-400" />
              <h2 className="text-sm font-semibold text-white/70 uppercase tracking-wider">Birthday!</h2>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative">
                <img
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=bob"
                  alt="Bob"
                  className="w-12 h-12 rounded-full bg-white/10"
                />
                <span className="absolute -top-1 -right-1 text-lg">🎂</span>
              </div>
              <div>
                <p className="text-white font-semibold">Bob Smith</p>
                <p className="text-white/50 text-xs">Turning 25 today! 🎉</p>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full mt-4 py-2 px-3 bg-rose-500/20 hover:bg-rose-500/30 border border-rose-500/30 text-rose-300 text-xs font-medium rounded-xl transition-all"
            >
              🎊 Wish Bob!
            </motion.button>
          </motion.div>

          {/* Recent Chat */}
          <motion.div variants={cardVariants} className="col-span-1 md:col-span-2 glass-card p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-semibold text-white/70 uppercase tracking-wider">Recent Messages</h2>
              <Link href="/channels/general" className="text-xs text-violet-400 hover:text-violet-300 flex items-center gap-1">
                View all <ChevronRight className="w-3 h-3" />
              </Link>
            </div>
            <div className="space-y-3">
              {recentMessages.map((msg, i) => (
                <motion.div
                  key={i}
                  whileHover={{ x: 2 }}
                  className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-white/[0.03] cursor-pointer transition-all group"
                >
                  <img
                    src={msg.avatar}
                    alt={msg.author}
                    className="w-8 h-8 rounded-full bg-white/10 flex-shrink-0"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-xs font-semibold text-white/80 group-hover:text-white">{msg.author}</span>
                      <span className="text-[10px] text-white/30">{msg.time}</span>
                    </div>
                    <p className="text-xs text-white/50 group-hover:text-white/70 truncate">{msg.text}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Upcoming Events */}
          <motion.div variants={cardVariants} className="col-span-1 md:col-span-2 glass-card p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-teal-400" />
                <h2 className="text-sm font-semibold text-white/70 uppercase tracking-wider">Coming Up</h2>
              </div>
              <Link href="/planning" className="text-xs text-violet-400 hover:text-violet-300 flex items-center gap-1">
                Plan <ChevronRight className="w-3 h-3" />
              </Link>
            </div>
            <div className="space-y-2.5">
              {upcomingEvents.map((event, i) => (
                <motion.div
                  key={i}
                  whileHover={{ x: 2 }}
                  className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-white/[0.03] cursor-pointer transition-all group"
                >
                  <div className={`w-9 h-9 rounded-xl ${event.color} flex items-center justify-center text-lg flex-shrink-0`}>
                    {event.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white/80 group-hover:text-white truncate">{event.title}</p>
                    <p className="text-xs text-white/40">{event.subtitle}</p>
                  </div>
                  <span className="text-[10px] font-medium text-white/30 whitespace-nowrap">{event.date}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Active Games */}
          <motion.div variants={cardVariants} className="col-span-1 glass-card p-5">
            <div className="flex items-center gap-2 mb-4">
              <Gamepad2 className="w-4 h-4 text-teal-400" />
              <h2 className="text-sm font-semibold text-white/70 uppercase tracking-wider">Arcade</h2>
            </div>
            <div className="space-y-2.5">
              {games.map((game, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`flex items-center gap-3 p-2.5 rounded-xl bg-gradient-to-r ${game.color} border ${game.border} cursor-pointer transition-all`}
                >
                  <span className="text-xl">{game.emoji}</span>
                  <div className="flex-1">
                    <p className="text-xs font-semibold text-white/80">{game.name}</p>
                    <p className="text-[10px] text-white/40 flex items-center gap-1">
                      <Users className="w-3 h-3" /> {game.players} players
                    </p>
                  </div>
                  <button className="text-[10px] font-bold text-white/50 hover:text-white border border-white/10 hover:border-white/20 rounded-lg px-2 py-1 transition-all">
                    Play
                  </button>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Voice Room */}
          <motion.div variants={cardVariants} className="col-span-1 glass-card p-5 bg-gradient-to-br from-emerald-500/10 to-transparent border-emerald-500/20">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
              <h2 className="text-sm font-semibold text-emerald-300 uppercase tracking-wider">Voice Lounge</h2>
              <span className="text-xs text-white/40">2 inside</span>
            </div>
            <div className="flex -space-x-2 mb-4">
              {onlineFriends.slice(0, 2).map((f, i) => (
                <img key={i} src={f.avatar} alt={f.name} className="w-8 h-8 rounded-full border-2 border-[#0F1525] bg-white/10 avatar-speaking" />
              ))}
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-2.5 px-3 bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/30 text-emerald-300 text-xs font-semibold rounded-xl transition-all flex items-center justify-center gap-2"
            >
              <Mic className="w-3.5 h-3.5" />
              Join Lounge
            </motion.button>
          </motion.div>

          {/* Group Stats */}
          <motion.div variants={cardVariants} className="col-span-1 md:col-span-4 glass-card p-5">
            <div className="flex items-center gap-2 mb-5">
              <TrendingUp className="w-4 h-4 text-violet-400" />
              <h2 className="text-sm font-semibold text-white/70 uppercase tracking-wider">Hostel Squad Stats</h2>
              <span className="glass px-2 py-0.5 rounded-full text-[10px] text-white/40">All time</span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {groupStats.map((stat, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -2 }}
                  className="glass rounded-xl p-4 text-center transition-all hover:border-white/20"
                >
                  <stat.icon className={`w-5 h-5 mx-auto mb-2 ${stat.color}`} />
                  <p className="text-2xl font-bold text-white font-heading">{stat.value}</p>
                  <p className="text-xs text-white/40 mt-0.5">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* AI Assistant Promo */}
          <motion.div
            variants={cardVariants}
            className="col-span-1 md:col-span-4 glass-card p-5 bg-gradient-to-r from-violet-500/10 via-transparent to-teal-500/10 border-violet-500/20 hover:border-violet-500/40 transition-all cursor-pointer group"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center shadow-glow text-lg">
                  🤖
                </div>
                <div>
                  <p className="text-white font-semibold group-hover:text-violet-200 transition-colors">
                    AI Assistant
                    <span className="ml-2 text-[10px] font-bold bg-violet-500/30 text-violet-300 border border-violet-500/30 px-1.5 py-0.5 rounded-full uppercase tracking-wider">
                      Gemini
                    </span>
                  </p>
                  <p className="text-white/50 text-xs">
                    Search memories, generate recaps, find that photo from Manali...
                  </p>
                </div>
              </div>
              <Link href="/ai-assistant">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center gap-2 px-4 py-2 bg-violet-600/30 hover:bg-violet-600/50 border border-violet-500/40 text-violet-300 text-xs font-medium rounded-xl transition-all"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  Ask AI
                </motion.button>
              </Link>
            </div>
          </motion.div>

        </div>
      </motion.div>
    </div>
  )
}
