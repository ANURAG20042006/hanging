"use client";

import { motion } from "framer-motion";
import { Archive, Lock, Clock } from "lucide-react";

export default function TimeCapsulePage() {
  return (
    <div className="flex-1 overflow-y-auto p-8 custom-scrollbar relative">
      {/* Background Effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-yellow-500/10 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-6xl mx-auto space-y-8 relative z-10">
        
        {/* Header */}
        <div className="flex items-center justify-between text-center flex-col pt-12 pb-8">
          <div className="w-20 h-20 bg-yellow-500/20 rounded-2xl flex items-center justify-center mb-6 border border-yellow-500/30 shadow-[0_0_40px_-10px_rgba(234,179,8,0.4)]">
             <Archive className="text-yellow-400" size={40} />
          </div>
          <h1 className="text-4xl font-heading font-bold text-white mb-4">Time Capsule</h1>
          <p className="text-white/60 max-w-lg text-lg">
            Bury memories, messages, and predictions today. Open them together in the future.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
           {/* Create New */}
           <motion.div 
             whileHover={{ scale: 1.02 }}
             className="glass-card p-8 border-dashed border-2 border-yellow-500/30 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-yellow-500/5 transition-all min-h-[300px]"
           >
              <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mb-4 text-white/50">
                 <PlusIcon />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Seal a new Capsule</h3>
              <p className="text-white/50 text-sm">Add photos, voice notes, and letters to be opened on a specific future date.</p>
           </motion.div>

           {/* Active Capsule */}
           <motion.div 
             whileHover={{ scale: 1.02 }}
             className="glass-card p-0 overflow-hidden relative min-h-[300px] border-yellow-500/20 shadow-[0_0_30px_-10px_rgba(234,179,8,0.2)]"
           >
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1603504383186-b48c668b556b?q=80&w=2070')] bg-cover bg-center opacity-30 mix-blend-overlay" />
              <div className="absolute inset-0 bg-gradient-to-b from-[#0A0E1A]/80 to-[#0A0E1A] p-8 flex flex-col items-center justify-center text-center">
                 <Lock size={32} className="text-yellow-400 mb-4" />
                 <h3 className="text-2xl font-bold text-white mb-2">Summer 2025 Memories</h3>
                 <p className="text-white/60 text-sm mb-6">Sealed by Alex on Aug 1, 2025</p>
                 
                 <div className="bg-black/40 backdrop-blur-md border border-white/10 rounded-xl p-4 w-full">
                    <div className="text-xs text-yellow-400 font-bold uppercase tracking-wider mb-2 flex items-center justify-center gap-1">
                       <Clock size={14} /> Unlocks In
                    </div>
                    <div className="flex justify-center gap-4 text-white">
                       <div className="flex flex-col"><span className="text-2xl font-bold">142</span><span className="text-[10px] text-white/50">DAYS</span></div>
                       <div className="text-2xl font-bold text-white/20">:</div>
                       <div className="flex flex-col"><span className="text-2xl font-bold">12</span><span className="text-[10px] text-white/50">HOURS</span></div>
                    </div>
                 </div>
              </div>
           </motion.div>
        </div>

      </div>
    </div>
  );
}

function PlusIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 5v14M5 12h14"/>
    </svg>
  );
}
