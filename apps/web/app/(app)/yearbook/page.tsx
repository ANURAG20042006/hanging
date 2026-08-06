"use client";

import { motion } from "framer-motion";
import { Sparkles, Heart, Lock, PenTool, Image, MessageSquare } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

export default function YearbookPage() {
  const [signatureText, setSignatureText] = useState("");
  const [signatures, setSignatures] = useState([
    { id: 1, author: "Sarah Jenkins", avatar: "https://i.pravatar.cc/150?u=2", text: "You are the anchor of this squad! ⚓ Never change!" },
    { id: 2, author: "Mike Ross", avatar: "https://i.pravatar.cc/150?u=3", text: "Best gaming partner and late-night movie buddy 🎮🍿" },
    { id: 3, author: "Emma Watson", avatar: "https://i.pravatar.cc/150?u=4", text: "To 100 more trip memories and reunions! 🥂" },
  ]);

  const handleAddSignature = () => {
    if (!signatureText.trim()) return;
    setSignatures([
      ...signatures,
      { id: Date.now(), author: "Alice Smith", avatar: "https://i.pravatar.cc/150?u=1", text: signatureText }
    ]);
    setSignatureText("");
    toast.success("Signed Yearbook! 🖊️");
  };

  return (
    <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-heading font-bold text-white mb-2 flex items-center gap-3">
              <Sparkles className="text-amber-400" size={32} /> Squad Digital Yearbook 2026
            </h1>
            <p className="text-white/60 text-sm">Every friend has a permanent yearbook page. Leave messages, upload memories, and sign pages.</p>
          </div>
          <div className="px-4 py-2 bg-amber-500/20 text-amber-400 border border-amber-500/30 rounded-xl text-xs font-bold flex items-center gap-2">
            <Lock size={14} /> Open for Signatures
          </div>
        </div>

        {/* Yearbook Page Cover */}
        <div className="glass p-8 rounded-3xl border border-white/10 space-y-6 relative overflow-hidden bg-gradient-to-r from-amber-950/20 via-violet-950/20 to-cyan-950/20">
          <div className="flex items-center gap-6">
            <img src="https://i.pravatar.cc/150?u=1" alt="Profile" className="w-24 h-24 rounded-full object-cover border-4 border-amber-500/50 shadow-glow-accent" />
            <div>
              <h2 className="text-2xl font-bold text-white font-heading">Alice Smith's Yearbook Page 📖</h2>
              <p className="text-xs text-amber-400 font-semibold mt-1">Class of 2026 • Squad Founder 🏆</p>
              <p className="text-xs text-white/60 mt-1">"Memories fade, but squad bonds remain forever."</p>
            </div>
          </div>

          {/* Signatures Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-white/10">
            {signatures.map((sig) => (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} key={sig.id} className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                <div className="flex items-center gap-3">
                  <img src={sig.avatar} alt={sig.author} className="w-8 h-8 rounded-full border border-white/10" />
                  <span className="font-bold text-cyan-400 text-xs">{sig.author}</span>
                </div>
                <p className="text-xs text-white/90 italic font-serif">"{sig.text}"</p>
              </motion.div>
            ))}
          </div>

          {/* Sign Input */}
          <div className="pt-4 border-t border-white/10 flex gap-3">
            <input
              type="text"
              placeholder="Write a message to sign Alice's yearbook..."
              value={signatureText}
              onChange={(e) => setSignatureText(e.target.value)}
              className="flex-1 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs"
            />
            <button onClick={handleAddSignature} className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs rounded-xl cursor-pointer">
              Sign Yearbook 🖊️
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
