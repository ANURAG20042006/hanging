"use client";

import { useState, useEffect } from "react";
import { ThumbsUp, Plus, Sparkles, MessageSquare } from "lucide-react";

interface FeedbackItem {
  id: string;
  title: string;
  category: string;
  description: string;
  upvotes: number;
  status: "under_review" | "planned" | "in_progress" | "completed";
  createdAt: string;
}

export default function FeedbackPortalPage() {
  const [items, setItems] = useState<FeedbackItem[]>([]);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Integrations");
  const [description, setDescription] = useState("");

  useEffect(() => {
    fetch("http://localhost:3001/support/feedback")
      .then((res) => res.json())
      .then((data) => setItems(data))
      .catch(() => {
        setItems([
          {
            id: "fb-201",
            title: "Spotify & Apple Music Watch Party Integration",
            category: "Integrations",
            description: "Synchronized music playback inside 3D clubhouse audio zone.",
            upvotes: 142,
            status: "in_progress",
            createdAt: new Date().toISOString(),
          },
          {
            id: "fb-202",
            title: "Mobile Widget for Today’s Friend Birthdays",
            category: "Mobile App",
            description: "iOS Lock Screen and Android Home Screen widget showing upcoming birthdays.",
            upvotes: 98,
            status: "planned",
            createdAt: new Date().toISOString(),
          },
        ]);
      });
  }, []);

  const handleUpvote = (id: string) => {
    fetch(`http://localhost:3001/support/feedback/${id}/upvote`, { method: "POST" })
      .catch(() => {});
    setItems((prev) => prev.map((item) => (item.id === id ? { ...item, upvotes: item.upvotes + 1 } : item)));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description) return;
    const newItem: FeedbackItem = {
      id: `fb-${Date.now()}`,
      title,
      category,
      description,
      upvotes: 1,
      status: "under_review",
      createdAt: new Date().toISOString(),
    };
    fetch("http://localhost:3001/support/feedback", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, category, description }),
    }).catch(() => {});
    setItems([newItem, ...items]);
    setTitle("");
    setDescription("");
  };

  return (
    <div className="min-h-screen bg-[#0A0E1A] text-white p-8 space-y-8 max-w-6xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
          Feedback & Feature Ideas
        </h1>
        <p className="text-white/40 text-sm mt-1">Vote on feature ideas or submit your own suggestions for Hangout.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Submission Form */}
        <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 space-y-4">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Plus className="w-4 h-4 text-violet-400" /> Suggest Feature
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs text-white/60 block mb-1">Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Discord Bot integration"
                required
                className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-white/30 focus:outline-none focus:border-violet-400"
              />
            </div>

            <div>
              <label className="text-xs text-white/60 block mb-1">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-[#0A0E1A] border border-white/10 text-xs text-white focus:outline-none focus:border-violet-400"
              >
                <option>Integrations</option>
                <option>Mobile App</option>
                <option>3D Clubhouse</option>
                <option>Planning Hub</option>
                <option>Arcade Games</option>
              </select>
            </div>

            <div>
              <label className="text-xs text-white/60 block mb-1">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Explain what feature you'd like to see..."
                rows={4}
                required
                className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-white/30 focus:outline-none focus:border-violet-400 resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-bold text-xs transition-colors flex items-center justify-center gap-2"
            >
              <Sparkles className="w-3.5 h-3.5" /> Submit Suggestion
            </button>
          </form>
        </div>

        {/* Feature Ideas Grid */}
        <div className="col-span-2 space-y-4">
          <h2 className="text-base font-bold text-white">Community Ideas ({items.length})</h2>

          <div className="space-y-3">
            {items.map((item) => (
              <div key={item.id} className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 flex items-start justify-between gap-4">
                <div className="flex items-start gap-4">
                  <button
                    onClick={() => handleUpvote(item.id)}
                    className="flex flex-col items-center px-3 py-2 rounded-xl bg-white/5 hover:bg-violet-500/20 hover:text-violet-300 border border-white/10 transition-colors"
                  >
                    <ThumbsUp className="w-4 h-4 text-violet-400" />
                    <span className="text-xs font-mono font-bold mt-1 text-white">{item.upvotes}</span>
                  </button>
                  <div className="space-y-1">
                    <h3 className="text-sm font-bold text-white">{item.title}</h3>
                    <p className="text-xs text-white/50">{item.description}</p>
                    <span className="inline-block text-[10px] font-mono text-cyan-300 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
                      {item.category}
                    </span>
                  </div>
                </div>

                <span className={`text-[11px] px-2.5 py-1 rounded-full font-mono uppercase font-semibold shrink-0 ${
                  item.status === "completed" ? "bg-emerald-500/20 text-emerald-400" :
                  item.status === "in_progress" ? "bg-cyan-500/20 text-cyan-400" :
                  "bg-white/10 text-white/60"
                }`}>
                  {item.status.replace("_", " ")}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
