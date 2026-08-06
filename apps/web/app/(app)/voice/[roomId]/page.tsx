"use client";

import { motion } from "framer-motion";
import { Mic, MicOff, Video, VideoOff, MonitorUp, PhoneOff, Settings, Users, MessageSquare } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils/cn";

export default function VoiceRoomPage({ params }: { params: { roomId: string } }) {
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(false);

  const participants = [
    { id: 1, name: "NJ542WS", avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d", speaking: true, muted: false },
    { id: 2, name: "Alex", avatar: "https://i.pravatar.cc/150?u=1", speaking: false, muted: true },
    { id: 3, name: "Sarah", avatar: "https://i.pravatar.cc/150?u=2", speaking: false, muted: false },
  ];

  return (
    <div className="flex flex-col h-full bg-[#0A0E1A]">
      {/* Header */}
      <div className="h-14 border-b border-white/5 flex items-center justify-between px-6 bg-white/5 backdrop-blur-md z-10">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.8)]" />
          <h2 className="font-semibold text-white">Lounge Room</h2>
          <span className="text-sm text-white/50 px-2 py-0.5 rounded bg-white/5 border border-white/10">Voice</span>
        </div>
        <div className="flex items-center gap-4 text-white/50">
          <button className="hover:text-white transition-colors flex items-center gap-2">
            <Users size={18} />
            <span className="text-sm">3</span>
          </button>
          <button className="hover:text-white transition-colors">
            <MessageSquare size={18} />
          </button>
        </div>
      </div>

      {/* Main Stage */}
      <div className="flex-1 p-8 flex items-center justify-center relative overflow-hidden">
        {/* Background glow based on speaking */}
        <div className="absolute inset-0 bg-green-500/5 blur-[150px] pointer-events-none transition-opacity duration-300" />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl relative z-10">
          {participants.map((p) => (
            <motion.div
              key={p.id}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="flex flex-col items-center gap-4"
            >
              <div className={cn(
                "relative w-40 h-40 rounded-full transition-all duration-300",
                p.speaking ? "ring-4 ring-green-500 shadow-[0_0_30px_rgba(34,197,94,0.3)]" : "ring-4 ring-white/5"
              )}>
                <img src={p.avatar} alt={p.name} className="w-full h-full rounded-full object-cover" />
                {p.muted && (
                  <div className="absolute bottom-2 right-2 bg-red-500 rounded-full p-2 border-2 border-[#0A0E1A]">
                    <MicOff size={16} className="text-white" />
                  </div>
                )}
              </div>
              <div className="bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/5">
                <span className="font-medium text-white shadow-sm">{p.name}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Control Bar */}
      <div className="h-24 border-t border-white/5 flex items-center justify-center gap-4 px-6 bg-black/40 backdrop-blur-md shrink-0">
        <button 
          onClick={() => setIsMuted(!isMuted)}
          className={cn(
            "w-12 h-12 rounded-full flex items-center justify-center transition-all",
            isMuted ? "bg-red-500/20 text-red-500 hover:bg-red-500/30" : "bg-white/10 text-white hover:bg-white/20"
          )}
        >
          {isMuted ? <MicOff size={24} /> : <Mic size={24} />}
        </button>
        <button 
          onClick={() => setIsVideoOn(!isVideoOn)}
          className={cn(
            "w-12 h-12 rounded-full flex items-center justify-center transition-all",
            !isVideoOn ? "bg-red-500/20 text-red-500 hover:bg-red-500/30" : "bg-white/10 text-white hover:bg-white/20"
          )}
        >
          {!isVideoOn ? <VideoOff size={24} /> : <Video size={24} />}
        </button>
        <button className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all">
          <MonitorUp size={24} />
        </button>
        <div className="w-[1px] h-8 bg-white/10 mx-2" />
        <button className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all">
          <Settings size={24} />
        </button>
        <button className="px-6 h-12 rounded-full bg-red-600 hover:bg-red-500 text-white font-semibold flex items-center gap-2 transition-all shadow-[0_0_20px_-5px_rgba(220,38,38,0.5)] ml-4">
          <PhoneOff size={20} />
          Leave
        </button>
      </div>
    </div>
  );
}
