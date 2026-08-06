"use client";

import { motion } from "framer-motion";
import { Users, Plus, Gamepad2, Calendar, Film, Image as ImageIcon, Archive, Bot, MessageSquare, Music, Laugh, ShoppingBag, Sparkles, Globe, Home, ShieldCheck, BarChart3 } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils/cn";
import { useUIStore } from "@/store/ui.store";

export function Sidebar() {
  const pathname = usePathname();
  const { setCreateGroupModal, setSettingsOpen, setShopOpen } = useUIStore();

  const navItems = [
    { icon: Home, label: "3D Digital Home", href: "/clubhouse" },
    { icon: Users, label: "Dashboard", href: "/dashboard" },
    { icon: MessageSquare, label: "Chat", href: "/channels/general" },
    { icon: ImageIcon, label: "Gallery", href: "/gallery" },
    { icon: Calendar, label: "Planning", href: "/planning" },
    { icon: Gamepad2, label: "Arcade", href: "/arcade" },
    { icon: Film, label: "Cinema", href: "/cinema" },
    { icon: Music, label: "Music Lounge", href: "/music" },
    { icon: Laugh, label: "Meme Center", href: "/memes" },
    { icon: Sparkles, label: "Digital Yearbook", href: "/yearbook" },
    { icon: Globe, label: "World Map", href: "/world-map" },
    { icon: Archive, label: "Time Capsule", href: "/time-capsule" },
    { icon: Bot, label: "AI Assistant", href: "/ai-assistant" },
    { icon: ShieldCheck, label: "Device Security", href: "/settings" },
    { icon: BarChart3, label: "Monitoring", href: "/monitoring" },
  ];

  return (
    <div className="w-[72px] h-screen glass border-r border-white/5 flex flex-col items-center py-4 flex-shrink-0 z-20">
      {/* App Logo / Home */}
      <Link href="/dashboard" className="mb-4 relative group">
        <div className="w-12 h-12 rounded-[24px] hover:rounded-[16px] bg-gradient-to-tr from-violet-600 to-cyan-500 flex items-center justify-center transition-all duration-300 shadow-glow-primary group-hover:scale-105">
          <span className="text-white font-bold text-xl">H</span>
        </div>
        <div className="absolute left-16 top-1/2 -translate-y-1/2 bg-black/90 text-white text-xs font-semibold px-2.5 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-lg border border-white/10 z-50">
          Hangout Home
        </div>
      </Link>

      <div className="w-8 h-[2px] bg-white/10 rounded-full mb-3" />

      {/* Main Nav */}
      <div className="flex-1 w-full flex flex-col items-center gap-2.5 overflow-y-auto overflow-x-hidden custom-scrollbar py-1">
        {navItems.map((item) => {
          const isActive = pathname.startsWith(item.href);
          return (
            <div key={item.href} className="relative group w-full flex justify-center">
              <div className={cn(
                "absolute left-0 top-[50%] -translate-y-1/2 w-1 bg-white rounded-r-full transition-all duration-300",
                isActive ? "h-8" : "h-0 group-hover:h-5 opacity-50"
              )} />
              <Link href={item.href}>
                <div className={cn(
                  "w-11 h-11 flex items-center justify-center transition-all duration-300 cursor-pointer",
                  isActive 
                    ? "rounded-[16px] bg-violet-600 text-white shadow-glow-primary" 
                    : "rounded-[24px] hover:rounded-[16px] bg-white/5 hover:bg-violet-500/20 text-white/50 hover:text-white"
                )}>
                  <item.icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                </div>
              </Link>

              {/* Tooltip */}
              <div className="absolute left-16 top-1/2 -translate-y-1/2 bg-black/90 text-white text-xs font-semibold px-2.5 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-lg border border-white/10 z-50">
                {item.label}
              </div>
            </div>
          );
        })}

        <div className="w-8 h-[2px] bg-white/10 rounded-full my-1" />
        
        {/* Virtual Shop & Missions Modal Trigger */}
        <div 
          onClick={() => setShopOpen && setShopOpen(true)}
          className="group relative w-full flex justify-center cursor-pointer"
        >
          <div className="w-11 h-11 rounded-[24px] group-hover:rounded-[16px] bg-white/5 group-hover:bg-amber-500/20 text-amber-400 flex items-center justify-center transition-all duration-300">
            <ShoppingBag size={20} />
          </div>
          <div className="absolute left-16 top-1/2 -translate-y-1/2 bg-black/90 text-white text-xs font-semibold px-2.5 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-lg border border-white/10 z-50">
            Virtual Shop & Missions
          </div>
        </div>

        {/* Add Group Modal Trigger */}
        <div 
          onClick={() => setCreateGroupModal(true)}
          className="group relative w-full flex justify-center cursor-pointer"
        >
          <div className="w-11 h-11 rounded-[24px] group-hover:rounded-[16px] bg-white/5 group-hover:bg-green-500/20 text-green-500 flex items-center justify-center transition-all duration-300">
            <Plus size={22} />
          </div>
          <div className="absolute left-16 top-1/2 -translate-y-1/2 bg-black/90 text-white text-xs font-semibold px-2.5 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-lg border border-white/10 z-50">
            Create Hangout Group
          </div>
        </div>
      </div>

      {/* User Controls / Settings Trigger */}
      <div className="mt-auto flex flex-col gap-3 pt-2 items-center w-full">
        <div 
          onClick={() => setSettingsOpen(true, 'profile')}
          className="w-11 h-11 rounded-full bg-white/10 p-0.5 cursor-pointer hover:ring-2 hover:ring-violet-500 transition-all relative group"
        >
          <img src="https://i.pravatar.cc/150?u=a042581f4e29026704d" alt="User" className="w-full h-full rounded-full object-cover" />
          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-[#0A0E1A] rounded-full" />
          
          <div className="absolute left-16 top-1/2 -translate-y-1/2 bg-black/90 text-white text-xs font-semibold px-2.5 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-lg border border-white/10 z-50">
            User Settings
          </div>
        </div>
      </div>
    </div>
  );
}
