"use client";

import { useState } from "react";
import { HelpCircle, Search, ChevronDown } from "lucide-react";

export default function FAQPage() {
  const [search, setSearch] = useState("");
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    { q: "What makes Hangout different from Discord or WhatsApp?", a: "Hangout is built specifically for close friend groups (15-50 people). Rather than separate chat, photos, and calendar apps, Hangout merges 3D WebGL rooms, Notion trip planning, synchronized cinema, Splitwise expenses, and a shared AI memory engine in one private space." },
    { q: "Is my data private and secure?", a: "Yes. All group messages, uploaded photos, and financial planning records are encrypted. We do not show ads, track your behavior across the web, or sell your data to third parties." },
    { q: "What platforms does Hangout support?", a: "Hangout runs seamlessly across Web, iOS, Android, macOS, Windows Desktop (Electron), and PWA offline mode." },
    { q: "How does the AI Memory Assistant work?", a: "Our AI Memory Engine uses Google Gemini API to analyze your group's uploaded photos, chat history, and trip itineraries. You can ask questions like 'Show all photos from our 2023 Goa trip' or 'Who owes the most for dinner last Friday?'" },
    { q: "Can I host movie watch parties with custom videos?", a: "Yes! Cinema Room supports YouTube, HLS streams, direct MP4 URLs, and LiveKit screen sharing up to 4K resolution." },
    { q: "How do I invite my friends?", a: "Go to your group settings and copy your unique invite code (e.g. HANGOUT-ALEX-8821) or shareable link. Anyone with the link can join instantly." },
  ];

  const filteredFaqs = faqs.filter(f => f.q.toLowerCase().includes(search.toLowerCase()) || f.a.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="max-w-4xl mx-auto px-6 py-16 space-y-10">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-extrabold text-white">Frequently Asked Questions</h1>
        <p className="text-white/60 text-base">Everything you need to know about Hangout platform and features.</p>
        <div className="relative max-w-md mx-auto pt-4">
          <Search className="w-4 h-4 text-white/40 absolute left-4 top-7" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search questions or keywords..."
            className="w-full pl-10 pr-4 py-3 rounded-2xl bg-white/[0.03] border border-white/10 text-sm text-white placeholder-white/40 focus:outline-none focus:border-cyan-400/50"
          />
        </div>
      </div>

      <div className="space-y-4">
        {filteredFaqs.map((faq, i) => {
          const isOpen = openIdx === i;
          return (
            <div key={faq.q} className="rounded-2xl bg-white/[0.02] border border-white/10 overflow-hidden transition-colors">
              <button
                onClick={() => setOpenIdx(isOpen ? null : i)}
                className="w-full p-6 text-left flex items-center justify-between gap-4 font-semibold text-white text-base hover:bg-white/[0.02]"
              >
                <span className="flex items-center gap-3">
                  <HelpCircle className="w-5 h-5 text-cyan-400 shrink-0" /> {faq.q}
                </span>
                <ChevronDown className={`w-5 h-5 text-white/40 transition-transform ${isOpen ? "rotate-180 text-cyan-400" : ""}`} />
              </button>
              {isOpen && (
                <div className="px-6 pb-6 pt-2 text-white/60 text-sm leading-relaxed border-t border-white/5 pl-14">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
