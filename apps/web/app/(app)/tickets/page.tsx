"use client";

import { useState, useEffect } from "react";
import { MessageSquare, Plus, CheckCircle2, Clock, AlertCircle, Send } from "lucide-react";

interface Ticket {
  id: string;
  subject: string;
  category: string;
  description: string;
  status: "open" | "in_progress" | "resolved";
  priority: "low" | "medium" | "high";
  createdAt: string;
}

export default function SupportTicketsPage() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [subject, setSubject] = useState("");
  const [category, setCategory] = useState("Bug Report");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("http://localhost:3001/support/tickets")
      .then((res) => res.json())
      .then((data) => setTickets(data))
      .catch(() => {
        setTickets([
          {
            id: "t-1001",
            subject: "Screen sharing resolution cap issue",
            category: "Bug Report",
            description: "Stream is locked at 720p even on 4K display setting.",
            status: "in_progress",
            priority: "medium",
            createdAt: new Date().toISOString(),
          },
        ]);
      });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject || !description) return;
    setLoading(true);
    try {
      const res = await fetch("http://localhost:3001/support/tickets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subject, category, description }),
      });
      const newTicket = await res.json();
      setTickets([newTicket, ...tickets]);
      setSubject("");
      setDescription("");
    } catch {
      const fallback: Ticket = {
        id: `t-${Date.now()}`,
        subject,
        category,
        description,
        status: "open",
        priority: "medium",
        createdAt: new Date().toISOString(),
      };
      setTickets([fallback, ...tickets]);
      setSubject("");
      setDescription("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0E1A] text-white p-8 space-y-8 max-w-6xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
          Support Tickets
        </h1>
        <p className="text-white/40 text-sm mt-1">Submit support requests or view status of existing issues.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Create Ticket Form */}
        <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 space-y-4">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Plus className="w-4 h-4 text-cyan-400" /> New Support Ticket
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs text-white/60 block mb-1">Subject</label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Brief summary of issue"
                required
                className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-white/30 focus:outline-none focus:border-cyan-400"
              />
            </div>

            <div>
              <label className="text-xs text-white/60 block mb-1">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-[#0A0E1A] border border-white/10 text-xs text-white focus:outline-none focus:border-cyan-400"
              >
                <option>Bug Report</option>
                <option>Billing & Account</option>
                <option>Feature Request</option>
                <option>3D Clubhouse Performance</option>
              </select>
            </div>

            <div>
              <label className="text-xs text-white/60 block mb-1">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Detailed steps to reproduce or issue description..."
                rows={4}
                required
                className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-white/30 focus:outline-none focus:border-cyan-400 resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-xs transition-colors flex items-center justify-center gap-2"
            >
              <Send className="w-3.5 h-3.5" /> {loading ? "Submitting..." : "Submit Ticket"}
            </button>
          </form>
        </div>

        {/* Existing Tickets List */}
        <div className="col-span-2 space-y-4">
          <h2 className="text-base font-bold text-white">Your Tickets ({tickets.length})</h2>

          <div className="space-y-3">
            {tickets.map((t) => (
              <div key={t.id} className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs text-cyan-400">{t.id}</span>
                    <span className="text-xs font-semibold text-white">{t.subject}</span>
                  </div>
                  <p className="text-xs text-white/50">{t.description}</p>
                  <div className="flex items-center gap-3 text-[11px] text-white/30 pt-2 font-mono">
                    <span>Category: {t.category}</span>
                    <span>Created: {new Date(t.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>

                <span className={`text-[11px] px-2.5 py-1 rounded-full font-mono shrink-0 uppercase font-semibold ${
                  t.status === "resolved" ? "bg-emerald-500/20 text-emerald-400" :
                  t.status === "in_progress" ? "bg-yellow-500/20 text-yellow-400" :
                  "bg-cyan-500/20 text-cyan-400"
                }`}>
                  {t.status.replace("_", " ")}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
