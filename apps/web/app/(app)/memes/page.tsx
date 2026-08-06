"use client";

import { motion } from "framer-motion";
import { Laugh, Flame, ThumbsUp, MessageSquare, Plus, Trophy, Sparkles, Share2 } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

interface MemeItem {
  id: string;
  title: string;
  url: string;
  author: string;
  upvotes: number;
  comments: number;
  isMemeOfTheWeek?: boolean;
}

export default function MemeCenterPage() {
  const [memes, setMemes] = useState<MemeItem[]>([
    { id: "m1", title: "When the code compiles on the first try 🚀", url: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=2070", author: "Sarah", upvotes: 42, comments: 9, isMemeOfTheWeek: true },
    { id: "m2", title: "Me waiting for squad movie night at 8 PM 🍿", url: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?q=80&w=2070", author: "Mike", upvotes: 28, comments: 4 },
    { id: "m3", title: "When you draw in Pictionary and no one guesses it 🎨", url: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070", author: "Emma", upvotes: 19, comments: 2 },
  ]);

  const handleUpvote = (id: string) => {
    setMemes(memes.map(m => m.id === id ? { ...m, upvotes: m.upvotes + 1 } : m));
    toast.success("Meme Upvoted! 😂");
  };

  return (
    <div className="flex-1 overflow-y-auto p-8 custom-scrollbar bg-[#0A0E1A]">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-heading font-bold text-white mb-2 flex items-center gap-3">
              <Laugh className="text-pink-400" size={32} /> Meme Center
            </h1>
            <p className="text-white/60 text-sm">Squad meme wall, reactions, upvotes, and Meme of the Week trophy.</p>
          </div>
          <button
            onClick={() => toast.success("Upload Meme modal opened! 📸")}
            className="bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 text-white px-5 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2 shadow-glow-accent transition-all cursor-pointer"
          >
            <Plus size={18} /> Post Meme
          </button>
        </div>

        {/* Meme of the Week Spotlight Card */}
        {memes.find(m => m.isMemeOfTheWeek) && (
          <div className="glass p-6 rounded-3xl border-l-4 border-l-amber-500 bg-gradient-to-r from-amber-950/20 via-[#0A0E1A] to-pink-950/20 relative overflow-hidden">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="w-full md:w-64 h-48 rounded-2xl overflow-hidden shadow-2xl flex-shrink-0 border border-white/10">
                <img src={memes[0].url} alt="Meme of the week" className="w-full h-full object-cover" />
              </div>
              <div className="space-y-3 flex-1">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 text-xs font-bold border border-amber-500/30">
                  <Trophy size={14} /> MEME OF THE WEEK 🏆
                </div>
                <h3 className="text-2xl font-bold font-heading text-white">{memes[0].title}</h3>
                <p className="text-xs text-white/60">Posted by {memes[0].author} • {memes[0].upvotes} Upvotes</p>
                <div className="flex gap-3 pt-2">
                  <button onClick={() => handleUpvote(memes[0].id)} className="px-4 py-2 rounded-xl bg-amber-500/20 hover:bg-amber-500 text-amber-300 hover:text-black font-semibold text-xs transition-colors cursor-pointer flex items-center gap-1.5">
                    <ThumbsUp size={14} /> Upvote ({memes[0].upvotes})
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Squad Meme Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {memes.map((meme) => (
            <div key={meme.id} className="glass p-4 rounded-2xl border border-white/10 space-y-4 hover:border-pink-500/40 transition-all">
              <div className="h-64 rounded-xl overflow-hidden border border-white/10 relative">
                <img src={meme.url} alt={meme.title} className="w-full h-full object-cover" />
              </div>
              <h4 className="font-bold text-white text-base">{meme.title}</h4>
              <div className="flex justify-between items-center text-xs text-white/50 border-t border-white/5 pt-3">
                <span>By {meme.author}</span>
                <div className="flex items-center gap-3">
                  <button onClick={() => handleUpvote(meme.id)} className="flex items-center gap-1 hover:text-pink-400 transition-colors cursor-pointer">
                    <ThumbsUp size={14} /> {meme.upvotes}
                  </button>
                  <button onClick={() => toast.success("Comments opened!")} className="flex items-center gap-1 hover:text-white transition-colors cursor-pointer">
                    <MessageSquare size={14} /> {meme.comments}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
