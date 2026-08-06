"use client";

import { motion, AnimatePresence } from "framer-motion";
import { 
  Home, Gamepad2, Film, Music, Image as ImageIcon, Calendar, Bot, 
  Flame, Coffee, Sparkles, Trophy, BookOpen, Lock, MapPin, Users, 
  Volume2, Settings, Zap, ArrowUp, ArrowDown, ArrowLeft, ArrowRight, Play, RefreshCw, X
} from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";
import toast from "react-hot-toast";

export default function ClubhousePage() {
  // 3D Avatar Position State (x, y, z)
  const [posX, setPosX] = useState(0);
  const [posZ, setPosZ] = useState(0);
  const [currentRoom, setCurrentRoom] = useState("Living Room 🛋️");
  const [activeEmote, setActiveEmote] = useState<string | null>(null);

  // Room Customizer State
  const [lightingMode, setLightingMode] = useState("Sunset Amber");
  const [wallpaperTheme, setWallpaperTheme] = useState("Deep Neon Navy");
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);
  const [isTeleportOpen, setIsTeleportOpen] = useState(false);

  // 16 Interactive Rooms List
  const rooms = [
    { id: "living", name: "Living Room 🛋️", desc: "Fireplace, lounge couches & squad chat", icon: "🛋️", target: "/channels/general" },
    { id: "cinema", name: "Cinema Hall 🍿", desc: "Theater screen & Watch Together", icon: "🍿", target: "/cinema" },
    { id: "arcade", name: "Arcade 🎮", desc: "UNO, Chess, Ludo, Tic-Tac-Toe cabinets", icon: "🎮", target: "/arcade" },
    { id: "music", name: "Music Lounge 🎵", desc: "Animated speakers & dance floor", icon: "🎵", target: "/music" },
    { id: "gallery", name: "Gallery Hall 📸", desc: "3D photo memory frames on walls", icon: "📸", target: "/gallery" },
    { id: "rooftop", name: "Rooftop 🌇", desc: "Starry sky, campfire & voice circle", icon: "🌇", target: "#rooftop" },
    { id: "planning", name: "Planning Room 📅", desc: "Collaborative whiteboard & trips", icon: "📅", target: "/planning" },
    { id: "ai", name: "AI Room 🤖", desc: "3D Virtual AI NPC guide & memory brain", icon: "🤖", target: "/ai-assistant" },
    { id: "coffee", name: "Coffee Corner ☕", desc: "Espresso machine & quiet talks", icon: "☕", target: "#coffee" },
    { id: "trophy", name: "Trophy Room 🏆", desc: "Squad achievements & win history", icon: "🏆", target: "/arcade" },
    { id: "library", name: "Library 📚", desc: "Digital Yearbook bookshelf", icon: "📚", target: "/yearbook" },
    { id: "birthday", name: "Birthday Hall 🎂", desc: "Confetti cannons & cake slideshow", icon: "🎂", target: "/planning" },
    { id: "capsule", name: "Time Capsule Vault 🕰️", desc: "Sealed 1/5/10 year memory safe", icon: "🕰️", target: "/time-capsule" },
    { id: "garden", name: "Garden 🌳", desc: "Gazebo, tree lights & lawn games", icon: "🌳", target: "#garden" },
    { id: "entrance", name: "Entrance 🏠", desc: "Grand lobby & squad plaque", icon: "🏠", target: "/dashboard" },
    { id: "private", name: "Private Lounge 🔒", desc: "Password protected squad room", icon: "🔒", target: "#private" },
  ];

  // WASD Key Movement Controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const step = 8;
      if (e.key === "w" || e.key === "W" || e.key === "ArrowUp") setPosZ((z) => Math.max(-120, z - step));
      if (e.key === "s" || e.key === "S" || e.key === "ArrowDown") setPosZ((z) => Math.min(120, z + step));
      if (e.key === "a" || e.key === "A" || e.key === "ArrowLeft") setPosX((x) => Math.max(-160, x - step));
      if (e.key === "d" || e.key === "D" || e.key === "ArrowRight") setPosX((x) => Math.min(160, x + step));
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const triggerEmote = (emoteName: string, emoji: string) => {
    setActiveEmote(`${emoteName} ${emoji}`);
    toast.success(`Triggered Emote: ${emoteName} ${emoji}`);
    setTimeout(() => setActiveEmote(null), 3000);
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-[#060913] text-white relative overflow-hidden">
      
      {/* 3D WebGL Canvas Viewport Simulation */}
      <div className="flex-1 relative flex items-center justify-center overflow-hidden bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-violet-950/30 via-[#060913] to-[#04060C]">
        
        {/* Environment Grid / Wall Overlay */}
        <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,#06B6D4_1px,transparent_1px),linear-gradient(to_bottom,#06B6D4_1px,transparent_1px)] [background-size:40px_40px]" />

        {/* Lighting Atmosphere Effect */}
        <div className={`absolute inset-0 transition-opacity duration-1000 ${
          lightingMode === "Sunset Amber" ? "bg-amber-500/10" : lightingMode === "Disco Violet" ? "bg-violet-600/15" : "bg-cyan-500/10"
        }`} />

        {/* Interactive 3D Room Landmark Visualizers */}
        <div className="absolute inset-0 p-8 grid grid-cols-4 gap-8 pointer-events-none opacity-40">
          {rooms.slice(0, 16).map((r) => (
            <div key={r.id} className="border border-white/10 rounded-3xl p-4 flex flex-col justify-between bg-black/40 backdrop-blur-sm">
              <span className="text-3xl">{r.icon}</span>
              <div>
                <h5 className="font-bold text-white text-xs">{r.name}</h5>
                <p className="text-[10px] text-white/50">{r.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* 3D Avatar Character representation */}
        <motion.div
          animate={{ x: posX, y: posZ }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="relative z-20 flex flex-col items-center cursor-pointer"
        >
          {/* Active Emote Speech Bubble */}
          <AnimatePresence>
            {activeEmote && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.8 }}
                className="absolute -top-12 px-3 py-1 rounded-full bg-cyan-500 text-black font-bold text-xs shadow-glow-accent whitespace-nowrap"
              >
                {activeEmote}
              </motion.div>
            )}
          </AnimatePresence>

          {/* 3D Player Avatar Circle */}
          <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-cyan-500 to-violet-600 border-4 border-white shadow-glow-primary flex items-center justify-center font-bold text-white text-xl">
            👤
          </div>
          <span className="mt-2 text-xs font-bold text-white bg-black/80 px-2.5 py-0.5 rounded-full border border-white/10">
            Alice Smith (You)
          </span>
        </motion.div>

        {/* 3D Virtual AI Guide NPC Character */}
        <div className="absolute top-1/3 right-1/4 z-10 flex flex-col items-center cursor-pointer group" onClick={() => toast.success("AI Guide NPC: Welcome to Squad Digital Home! 🤖")}>
          <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-amber-400 to-pink-500 border-2 border-amber-300 shadow-glow-accent flex items-center justify-center text-xl animate-bounce">
            🤖
          </div>
          <span className="mt-1 text-[10px] font-bold text-amber-300 bg-black/80 px-2 py-0.5 rounded-full border border-amber-500/30">
            AI Guide NPC
          </span>
        </div>

      </div>

      {/* TOP BAR OVERLAY: Room Title & Navigation */}
      <div className="absolute top-6 left-6 right-6 z-30 flex justify-between items-center pointer-events-none">
        <div className="glass p-3 px-5 rounded-2xl border border-white/10 flex items-center gap-3 pointer-events-auto shadow-2xl">
          <span className="text-2xl">🏠</span>
          <div>
            <h2 className="text-base font-bold text-white font-heading">3D Squad Clubhouse — {currentRoom}</h2>
            <p className="text-[11px] text-cyan-400 font-mono">Position: X({posX}) Z({posZ}) • 4 Friends Online 🟢</p>
          </div>
        </div>

        <div className="flex items-center gap-3 pointer-events-auto">
          <button
            onClick={() => setIsTeleportOpen(true)}
            className="px-4 py-2 bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-500 hover:to-cyan-500 text-white rounded-xl text-xs font-bold shadow-glow-primary transition-all cursor-pointer flex items-center gap-2"
          >
            <MapPin size={15} /> Teleport Map
          </button>
          <button
            onClick={() => setIsCustomizerOpen(true)}
            className="p-2.5 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-colors cursor-pointer"
          >
            <Settings size={18} />
          </button>
        </div>
      </div>

      {/* BOTTOM HUD: WASD Touch Controls & Emote Selector */}
      <div className="absolute bottom-6 left-6 right-6 z-30 flex flex-col md:flex-row justify-between items-end gap-4 pointer-events-none">
        
        {/* Emote Selector Bar */}
        <div className="glass p-2.5 rounded-2xl border border-white/10 flex items-center gap-2 pointer-events-auto shadow-2xl overflow-x-auto custom-scrollbar">
          {[
            { name: "Dance", icon: "💃" },
            { name: "Wave", icon: "👋" },
            { name: "High Five", icon: "✋" },
            { name: "Handshake", icon: "🤝" },
            { name: "Celebrate", icon: "🎉" },
            { name: "Sit", icon: "🛋️" },
          ].map((e) => (
            <button
              key={e.name}
              onClick={() => triggerEmote(e.name, e.icon)}
              className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-violet-600/30 text-xs font-bold text-white border border-white/10 transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap"
            >
              <span>{e.icon}</span>
              <span>{e.name}</span>
            </button>
          ))}
        </div>

        {/* WASD Touch D-Pad Controls */}
        <div className="glass p-3 rounded-2xl border border-white/10 grid grid-cols-3 gap-1 pointer-events-auto shadow-2xl w-36 h-36">
          <div />
          <button onClick={() => setPosZ((z) => Math.max(-120, z - 12))} className="bg-white/10 hover:bg-cyan-600 rounded-xl flex items-center justify-center text-white cursor-pointer">
            <ArrowUp size={18} />
          </button>
          <div />
          <button onClick={() => setPosX((x) => Math.max(-160, x - 12))} className="bg-white/10 hover:bg-cyan-600 rounded-xl flex items-center justify-center text-white cursor-pointer">
            <ArrowLeft size={18} />
          </button>
          <div className="bg-cyan-600/20 rounded-xl flex items-center justify-center text-[10px] font-bold text-cyan-400">WASD</div>
          <button onClick={() => setPosX((x) => Math.min(160, x + 12))} className="bg-white/10 hover:bg-cyan-600 rounded-xl flex items-center justify-center text-white cursor-pointer">
            <ArrowRight size={18} />
          </button>
          <div />
          <button onClick={() => setPosZ((z) => Math.min(120, z + 12))} className="bg-white/10 hover:bg-cyan-600 rounded-xl flex items-center justify-center text-white cursor-pointer">
            <ArrowDown size={18} />
          </button>
          <div />
        </div>
      </div>

      {/* TELEPORT WORLD MAP MODAL */}
      <AnimatePresence>
        {isTeleportOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-lg">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="max-w-3xl w-full rounded-3xl bg-[#0D1222] border border-white/10 p-6 shadow-2xl space-y-6 relative">
              <button onClick={() => setIsTeleportOpen(false)} className="absolute top-4 right-4 p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer">
                <X size={20} />
              </button>

              <h3 className="text-xl font-bold text-white font-heading flex items-center gap-2"><MapPin className="text-cyan-400" /> Teleport Between 16 Clubhouse Rooms</h3>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-h-[400px] overflow-y-auto custom-scrollbar p-1">
                {rooms.map((r) => (
                  <Link
                    key={r.id}
                    href={r.target.startsWith("#") ? "#" : r.target}
                    onClick={() => {
                      setCurrentRoom(r.name);
                      setIsTeleportOpen(false);
                      toast.success(`Teleported to ${r.name}! 🌀`);
                    }}
                    className="p-4 rounded-2xl bg-white/5 hover:bg-cyan-600/20 border border-white/10 hover:border-cyan-500/40 transition-all cursor-pointer space-y-2 group"
                  >
                    <span className="text-3xl">{r.icon}</span>
                    <h4 className="font-bold text-white text-xs group-hover:text-cyan-300">{r.name}</h4>
                    <p className="text-[10px] text-white/50">{r.desc}</p>
                  </Link>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ROOM CUSTOMIZER MODAL */}
      <AnimatePresence>
        {isCustomizerOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-lg">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="max-w-md w-full rounded-3xl bg-[#0D1222] border border-white/10 p-6 shadow-2xl space-y-6 relative">
              <button onClick={() => setIsCustomizerOpen(false)} className="absolute top-4 right-4 p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer">
                <X size={20} />
              </button>

              <h3 className="text-xl font-bold text-white font-heading flex items-center gap-2"><Settings className="text-violet-400" /> Room Lighting & Wallpaper Customizer</h3>

              <div className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-white/70 block mb-2">Atmospheric Lighting Mode</label>
                  <div className="grid grid-cols-3 gap-2">
                    {["Sunset Amber", "Disco Violet", "Neon Cyan"].map((mode) => (
                      <button
                        key={mode}
                        onClick={() => { setLightingMode(mode); toast.success(`Lighting updated: ${mode}`); }}
                        className={`py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${lightingMode === mode ? "bg-amber-500 text-black" : "bg-white/5 text-white/60"}`}
                      >
                        {mode}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-white/70 block mb-2">Wallpaper Theme</label>
                  <div className="grid grid-cols-2 gap-2">
                    {["Deep Neon Navy", "Cyber Grid", "Warm Wood", "Acoustic Velvet"].map((theme) => (
                      <button
                        key={theme}
                        onClick={() => { setWallpaperTheme(theme); toast.success(`Wallpaper updated: ${theme}`); }}
                        className={`py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${wallpaperTheme === theme ? "bg-cyan-600 text-white" : "bg-white/5 text-white/60"}`}
                      >
                        {theme}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
