"use client";

import Link from "next/link";
import { Sparkles, Calendar, Clock, ArrowRight, User } from "lucide-react";

export default function BlogPage() {
  const posts = [
    {
      id: "blog-1",
      title: "Introducing Hangout v2.4: Cloud-Native Infrastructure & Spatial 3D Rooms",
      excerpt: "Today we are thrilled to announce our global public release with Redis cluster integration, LiveKit 4K video watch parties, and Gemini memory search.",
      date: "August 6, 2026",
      readTime: "5 min read",
      author: "Alex Vance",
      role: "Lead Engineer",
      category: "Release Notes",
      image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=800",
    },
    {
      id: "blog-2",
      title: "Why We Built a Digital Home for Friends (Not Another Social Feed)",
      excerpt: "Modern social media rewards public performance and outrage. Hangout is designed for intimate 15-person friend groups to plan reunions and store real memories.",
      date: "July 28, 2026",
      readTime: "8 min read",
      author: "Sarah Connor",
      role: "Product Founder",
      category: "Vision",
      image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800",
    },
    {
      id: "blog-3",
      title: "How Gemini AI Graph Understands 5 Years of Group Reunion Memories",
      excerpt: "A deep dive into our vector memory architecture that lets you search photos, trips, and chat quotes with natural language context.",
      date: "July 14, 2026",
      readTime: "12 min read",
      author: "Dr. Elena Rostova",
      role: "AI Architect",
      category: "Engineering",
      image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-16 space-y-12">
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <h1 className="text-4xl font-extrabold text-white">Engineering & Product Blog</h1>
        <p className="text-white/60 text-sm">Latest updates, architecture deep dives, and product release notes.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {posts.map((post) => (
          <div key={post.id} className="rounded-3xl bg-white/[0.02] border border-white/10 overflow-hidden hover:border-white/20 transition-all group flex flex-col justify-between">
            <div>
              <div className="aspect-[16/10] overflow-hidden relative">
                <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <span className="absolute top-4 left-4 bg-[#0A0E1A]/80 backdrop-blur-md text-cyan-300 border border-cyan-500/30 text-[10px] font-mono px-3 py-1 rounded-full uppercase">
                  {post.category}
                </span>
              </div>
              <div className="p-6 space-y-3">
                <div className="flex items-center gap-4 text-xs text-white/40 font-mono">
                  <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {post.date}</span>
                  <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {post.readTime}</span>
                </div>
                <h2 className="text-lg font-bold text-white leading-snug group-hover:text-cyan-300 transition-colors">{post.title}</h2>
                <p className="text-white/50 text-xs leading-relaxed line-clamp-3">{post.excerpt}</p>
              </div>
            </div>
            <div className="p-6 pt-0 flex items-center justify-between border-t border-white/5 mt-4">
              <div className="flex items-center gap-2 text-xs text-white/60">
                <User className="w-3.5 h-3.5 text-violet-400" />
                <span>{post.author}</span>
              </div>
              <span className="text-xs text-cyan-400 font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                Read Article <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
