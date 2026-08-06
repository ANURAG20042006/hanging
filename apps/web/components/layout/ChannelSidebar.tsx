"use client";

import { motion } from "framer-motion";
import { ChevronDown, Hash, Volume2, Plus, Settings, UserPlus } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils/cn";
import { usePathname } from "next/navigation";
import { useUIStore } from "@/store/ui.store";

export function ChannelSidebar() {
  const pathname = usePathname();
  const { setSettingsOpen, setCreateGroupModal, setInviteModal } = useUIStore();

  const channels = [
    { id: "general", name: "general", type: "text", unread: false },
    { id: "memes", name: "memes", type: "text", unread: true },
    { id: "gaming", name: "gaming", type: "text", unread: false },
    { id: "announcements", name: "announcements", type: "text", unread: false },
  ];

  const voiceRooms = [
    { id: "lounge", name: "Lounge 🎧", participants: 3 },
    { id: "gaming-room", name: "Gaming Room 🎮", participants: 1 },
    { id: "chill-vibes", name: "Chill Vibes ✨", participants: 0 },
  ];

  return (
    <div className="w-64 h-screen bg-black/20 border-r border-white/5 flex flex-col flex-shrink-0">
      {/* Header */}
      <div className="h-12 border-b border-white/5 flex items-center justify-between px-4 hover:bg-white/5 transition-colors group">
        <div className="flex items-center gap-2 flex-1 min-w-0 cursor-pointer" onClick={() => setInviteModal(true)}>
          <h2 className="font-semibold text-white/90 truncate text-sm">The Squad 🚀</h2>
          <ChevronDown size={16} className="text-white/50 group-hover:text-white transition-colors" />
        </div>
        <button 
          onClick={() => setInviteModal(true)}
          className="w-7 h-7 rounded hover:bg-white/10 flex items-center justify-center text-white/50 hover:text-white transition-colors"
          title="Invite Friends"
        >
          <UserPlus size={15} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto py-3 px-2 space-y-4 custom-scrollbar">
        {/* Text Channels */}
        <div>
          <div className="flex items-center justify-between px-2 mb-1 group cursor-pointer" onClick={() => setCreateGroupModal(true)}>
            <h3 className="text-xs font-semibold text-white/40 uppercase tracking-wider group-hover:text-white/70 transition-colors">Text Channels</h3>
            <Plus size={14} className="text-white/40 opacity-0 group-hover:opacity-100 hover:text-white transition-all" />
          </div>
          <div className="space-y-0.5">
            {channels.map((channel) => {
              const isActive = pathname === `/channels/${channel.id}`;
              return (
                <Link key={channel.id} href={`/channels/${channel.id}`}>
                  <div className={cn(
                    "flex items-center gap-2 px-2 py-1.5 rounded-md cursor-pointer group transition-colors",
                    isActive ? "bg-white/10 text-white" : "text-white/60 hover:bg-white/5 hover:text-white/90"
                  )}>
                    <Hash size={18} className="text-white/40" />
                    <span className={cn("text-sm truncate font-medium", channel.unread && !isActive && "text-white font-bold")}>
                      {channel.name}
                    </span>
                    {channel.unread && !isActive && (
                      <div className="w-1.5 h-1.5 rounded-full bg-violet-400 ml-auto shadow-glow-sm" />
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Voice Channels */}
        <div>
          <div className="flex items-center justify-between px-2 mb-1 group cursor-pointer" onClick={() => setCreateGroupModal(true)}>
            <h3 className="text-xs font-semibold text-white/40 uppercase tracking-wider group-hover:text-white/70 transition-colors">Voice Rooms</h3>
            <Plus size={14} className="text-white/40 opacity-0 group-hover:opacity-100 hover:text-white transition-all" />
          </div>
          <div className="space-y-1">
            {voiceRooms.map((room) => (
              <Link key={room.id} href={`/voice/${room.id}`}>
                <div className="flex flex-col rounded-md cursor-pointer group hover:bg-white/5 transition-colors p-1">
                  <div className="flex items-center gap-2 px-1 py-1 text-white/60 group-hover:text-white/90">
                    <Volume2 size={18} className="text-white/40 group-hover:text-green-400 transition-colors" />
                    <span className="text-sm truncate font-medium">{room.name}</span>
                  </div>
                  {room.participants > 0 && (
                    <div className="flex -space-x-2 px-6 pb-1 pt-1">
                      {[...Array(room.participants)].map((_, i) => (
                        <div key={i} className="w-6 h-6 rounded-full border-2 border-[#121624]">
                          <img src={`https://i.pravatar.cc/150?u=${i + 10}`} className="w-full h-full rounded-full" alt="Participant" />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
      
      {/* User Status Area - Bottom */}
      <div className="h-[52px] bg-black/40 border-t border-white/5 flex items-center px-2 gap-2">
        <div 
          onClick={() => setSettingsOpen(true, 'profile')}
          className="relative w-8 h-8 rounded-full overflow-hidden cursor-pointer hover:ring-2 hover:ring-violet-500 transition-all"
        >
          <img src="https://i.pravatar.cc/150?u=a042581f4e29026704d" alt="Me" />
          <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-black rounded-full" />
        </div>
        <div 
          onClick={() => setSettingsOpen(true, 'profile')}
          className="flex-1 min-w-0 flex flex-col justify-center cursor-pointer"
        >
          <div className="text-sm font-semibold text-white truncate text-xs">Alice Smith</div>
          <div className="text-[10px] text-white/50 truncate">Online 🟢</div>
        </div>
        <div className="flex items-center gap-1">
          <button 
            onClick={() => setSettingsOpen(true, 'profile')}
            className="w-7 h-7 rounded hover:bg-white/10 flex items-center justify-center text-white/60 hover:text-white transition-colors"
            title="Settings"
          >
            <Settings size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
