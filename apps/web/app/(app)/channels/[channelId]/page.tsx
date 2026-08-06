"use client";

import { motion } from "framer-motion";
import { Hash, Bell, Pin, Users, Search, HelpCircle, MoreVertical, SmilePlus, Reply, Share } from "lucide-react";
import { MessageInput } from "@/components/chat/MessageInput";

export default function ChannelPage({ params }: { params: { channelId: string } }) {
  const messages = [
    { id: 1, author: "Alex", avatar: "https://i.pravatar.cc/150?u=1", content: "Hey everyone! Are we still on for the movie night?", timestamp: "Today at 5:23 PM" },
    { id: 2, author: "Sarah", avatar: "https://i.pravatar.cc/150?u=2", content: "Yes! I already got the snacks 🍿", timestamp: "Today at 5:25 PM" },
    { id: 3, author: "Mike", avatar: "https://i.pravatar.cc/150?u=3", content: "I'll be there around 8. Can't wait!", timestamp: "Today at 5:30 PM" },
  ];

  return (
    <div className="flex flex-col h-full bg-[#0A0E1A]">
      {/* Header */}
      <div className="h-12 border-b border-white/5 flex items-center justify-between px-4 shrink-0 bg-white/5 backdrop-blur-md z-10">
        <div className="flex items-center gap-2">
          <Hash size={20} className="text-white/40" />
          <h2 className="font-semibold text-white">general</h2>
          <div className="w-1 h-1 bg-white/20 rounded-full mx-2" />
          <span className="text-sm text-white/50 line-clamp-1">General chatter and announcements</span>
        </div>
        <div className="flex items-center gap-4 text-white/50">
          <Bell size={20} className="hover:text-white cursor-pointer transition-colors" />
          <Pin size={20} className="hover:text-white cursor-pointer transition-colors" />
          <Users size={20} className="hover:text-white cursor-pointer transition-colors" />
          <div className="relative">
            <Search size={16} className="absolute left-2 top-1/2 -translate-y-1/2 text-white/40" />
            <input 
              type="text" 
              placeholder="Search" 
              className="bg-black/20 border border-white/10 rounded-md pl-8 pr-2 py-1 text-sm focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/50 w-36 focus:w-48 transition-all"
            />
          </div>
          <HelpCircle size={20} className="hover:text-white cursor-pointer transition-colors" />
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 flex flex-col justify-end custom-scrollbar">
        <div className="space-y-6">
          {/* Channel Intro */}
          <div className="mb-8">
            <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mb-4">
              <Hash size={32} className="text-white/80" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Welcome to #general!</h1>
            <p className="text-white/60">This is the start of the #general channel.</p>
          </div>

          <div className="flex items-center gap-4 py-2">
            <div className="h-[1px] flex-1 bg-white/10" />
            <span className="text-xs font-semibold text-white/40">August 6, 2026</span>
            <div className="h-[1px] flex-1 bg-white/10" />
          </div>

          {messages.map((msg) => (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              key={msg.id} 
              className="group flex gap-4 hover:bg-white/5 -mx-4 px-4 py-1 rounded-sm transition-colors relative"
            >
              <img src={msg.avatar} className="w-10 h-10 rounded-full mt-0.5 object-cover" alt={msg.author} />
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline gap-2">
                  <span className="font-semibold text-white hover:underline cursor-pointer">{msg.author}</span>
                  <span className="text-xs text-white/40">{msg.timestamp}</span>
                </div>
                <p className="text-white/90 text-[15px] leading-relaxed break-words">
                  {msg.content}
                </p>
              </div>

              {/* Hover actions */}
              <div className="absolute right-4 -top-2 opacity-0 group-hover:opacity-100 bg-[#0A0E1A] border border-white/10 rounded-md shadow-lg flex items-center overflow-hidden transition-opacity">
                <button className="p-1.5 hover:bg-white/10 text-white/60 hover:text-white transition-colors"><SmilePlus size={16} /></button>
                <button className="p-1.5 hover:bg-white/10 text-white/60 hover:text-white transition-colors"><Reply size={16} /></button>
                <button className="p-1.5 hover:bg-white/10 text-white/60 hover:text-white transition-colors"><Share size={16} /></button>
                <button className="p-1.5 hover:bg-white/10 text-white/60 hover:text-white transition-colors"><MoreVertical size={16} /></button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <MessageInput />
    </div>
  );
}
